<?php
function _dev_scripts() {
    $output  = '<!-- For Dev -->' . "\n";
    $output .='<script data-main="'.get_template_directory_uri().'/js/main" src="'.get_template_directory_uri() . '/functions/WF/assets/js/requirejs/require.js"></script>' . "\n";
    $output .='<!-- END For Dev -->'  . "\n";

    echo $output;
}