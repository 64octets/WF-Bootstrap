<?php
function _live_styles() {
    global $wf_config;
    wp_enqueue_style(
        $wf_config['SLUG'].'-main', get_template_directory_uri() . $wf_config['COMPILE_CSS_PATH']
    );
}