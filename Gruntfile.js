module.exports = function(grunt) {

    var wf_config           = grunt.file.readJSON('config.json');

    /**
     * Css Vars
     */
    var compile_css_path    = '../..' + wf_config.COMPILE_CSS_PATH, 
        wysiwyg_css_path    = '../..' + wf_config.WYSIWYG_CSS_PATH
        less_path           = '../..' + wf_config.LESS_PATH,
        wysiwyg_path        = '../..' + wf_config.WYSIWYG_LESS_PATH,
        fontawesome_fontpath= '\'' + wf_config.FONTAWESOME_PATH.substring(1) + '/fonts\'',
        
        lessc_files         = {};
    
    lessc_files[compile_css_path] = less_path;
    lessc_files[wysiwyg_css_path] = wysiwyg_path;

    /**
     * Prepend / Append files
     */
    var prependThis  = '/* \n' +
            'Theme Name: '+wf_config.THEME_NAME +'\n' +
            'Author: '+wf_config.AUTHOR+ '\n' +
            'Author URI: '+wf_config.AUTHOR_URI + '\n' +
            'Description: '+wf_config.DESCRIPTION+ '\n' +
            'Version: ' +wf_config.VERSION+ '\n' +
            'Text Domain: ' +wf_config.TEXT_DOMAIN + '\n' +
            '*/ \n';

    var date = new Date();
    var appendThis  = '/* \n' +
            'Compiled on ' + date + '\n'+
        '*/';

    /**
     * Requirejs Options
     */
    var requirejsOptions    = wf_config.REQUIREJS_OPTS;

    grunt.initConfig({ 
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Compile CSS
         */
        less: {
            production: {
                options: {
                    paths: ['../../css'],
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
                        new (require('less-plugin-clean-css'))({
                            advanced: true
                        })
                    ],
                    modifyVars: {
                        "fa-font-path" : fontawesome_fontpath
                    }
                },
                files: lessc_files
            }
        },

        /**
         * Compile JavaScript
         */
        requirejs: {
            compile: {
                options: requirejsOptions
            }
        },
        
        prepend: {
            prepend : {
                options: {
                    content: prependThis
                },
                files: [{
                    src     : '../../style.css'
                }, {
                    src     : '../../js/main-compiled.js'
                }]
            },
            append : {
                options : {
                    content: appendThis
                },
                files: [{
                    src     : '../../style.css'
                }, {
                    src     : '../../js/main-compiled.js'
                }]
            }
        }
        
    
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-prepend');

    grunt.registerTask('default', ['requirejs', 'less', 'prepend']);
};