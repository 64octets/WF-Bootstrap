<?php
/**
 * Useful Functions
 */
include_once(__DIR__ . '/use/_move_array_element.php');

/**
 * Config
 *
 * Stores config from config.json in transient
 * If transient config does not exist, creates it from config.json
 * If config.json created time > transient created time, re-cache the config
 */
$config                     = get_transient('wf_config');
$config_created_date        = get_option('wf_config_transient_created');
$config_file_relpath        = get_stylesheet_directory() . '/functions/WF/config.json';
$config_file_modified_date  = filemtime($config_file_relpath);

// Set config to false forcing it to recreate if
//  * no created date option
//  * config.json modified date is greater than transient created date
if(!$config_created_date || ($config_file_modified_date > $config_created_date)) {
    $config = false;
}

// If no config exists, load the json file and
// insert data into transient
if(!$config) {
    set_transient('wf_config', file_get_contents($config_file_relpath, true), 1 * HOUR_IN_SECONDS);
    update_option('wf_config_transient_created', time(), true);
    $config = get_transient('wf_config');
}

// Once config exists convert it to PHP Object
$jsonIterator = new RecursiveIteratorIterator(
    new RecursiveArrayIterator(json_decode($config, TRUE)),
    RecursiveIteratorIterator::SELF_FIRST);

// Add global config rules to variable
global $wf_config;
$wf_config = array();
foreach ($jsonIterator as $key => $val) {
    $wf_config[$key] = $val;
}

/**
 * Assets (dev & live)
 */
include_once(__DIR__ . '/assets/_dev_scripts.php');
include_once(__DIR__ . '/assets/_dev_styles.php');
include_once(__DIR__ . '/assets/_live_scripts.php');
include_once(__DIR__ . '/assets/_live_styles.php');

if($wf_config['DEVELOPMENT_MODE']==1) {
    add_action('wp_head',   '_dev_styles');
    add_action('wp_footer', '_dev_scripts', 30, 1);
} else {
    add_action( 'init',                 '_live_styles' );
    add_action( 'wp_enqueue_scripts',   '_live_scripts');
}

/**
 * Upgrade to jQuery 2.x
 */
function _upgrade_jquery() {
    if (!is_admin() && !in_array( $GLOBALS['pagenow'], array( 'wp-login.php', 'wp-register.php'))) {
        wp_deregister_script('jquery');
        wp_register_script('jquery', 'https://code.jquery.com/jquery-2.2.3.min.js', false, '2.2.3');
        wp_enqueue_script('jquery');
    }
}
if($wf_config['USE_JQUERY_2x']) {
    add_action('init', '_upgrade_jquery');
}

