<?php

function _dev_styles() {
    global $wf_config;
    
    $output     = '<!-- For Dev -->' . "\n";
    $output     .= '<link rel="stylesheet/less" type="text/css" href="'.get_template_directory_uri().'/css/main.less">'  . "\n";
    $output     .= '<script type="text/javascript">less = { env: "development" };</script>' . "\n";
    $output     .='<script type="text/javascript" src="'.get_template_directory_uri() .  '/WF-Bootstrap/assets/js/less.js/dist/less.min.js"></script>'  . "\n";
    $output     .='<script>localStorage.clear(); </script>'  . "\n";
    $output     .= '<script type="text/javascript">less.modifyVars({ "@fa-font-path" : "\'../'.ltrim($wf_config['FONTAWESOME_PATH'], '/').'/fonts\'" });</script>' . "\n";

    $output     .='<!-- END For Dev -->'  . "\n";
    echo $output;
}