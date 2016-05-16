module.exports = function(grunt) {

    var wf_config           = grunt.file.readJSON('config.json');

    /**
     * Css Vars
     */
    var compile_css_path    = '../..' + wf_config.COMPILE_CSS_PATH,
        less_path           = '../..' + wf_config.LESS_PATH,
        fontawesome_fontpath= '\'' + wf_config.FONTAWESOME_PATH.substring(1) + '/fonts\'',
        
        lessc_files         = {};
    
    lessc_files[compile_css_path] = less_path;

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
                options: {
                    baseUrl: '../../js',
                    mainConfigFile: '../../js/build.js',
                    paths : {
                        requireLib      : 'lib/requirejs/require',
                        smoothstate     : 'lib/smoothstate/src/jquery.smoothState',
                        enquire         : 'lib/enquire/dist/enquire',
                        matchHeight     : 'lib/matchHeight/jquery.matchHeight'                        
                    },
                    name: 'main',
                    findNestedDependencies: true,
                    include: [ 'requireLib' ],
                    out: '../../js/main-compiled.js'
                }
            }
        },
        
        prepend: {
            prepend : {
                options: {
                    content: prependThis
                },
                files: [{
                    src     : '../../style.css'
                }]
            },
            append : {
                options : {
                    content: appendThis
                },
                files: [{
                    src     : '../../style.css'
                }]
            }
        }
        
    
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-prepend');

    grunt.registerTask('default', ['requirejs', 'less', 'prepend']);
};