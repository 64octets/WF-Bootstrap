<?php
function _live_scripts() {
    global $wf_config;
    wp_enqueue_script( 
        $wf_config['SLUG'].'-main', get_template_directory_uri() . $wf_config['COMPILE_JS_PATH'], 
        array('jquery'), false, true);
}