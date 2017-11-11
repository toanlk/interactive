module.exports = function (grunt) {
    "use strict";

    // require it at the top and pass in the grunt instance 
    require('time-grunt')(grunt);

    const fs = require('fs');
    var EXPORT_PATH = "dist";
    var DATE = new Date().getTime().toString();

    grunt.initConfig(
        {
            clean: {
                app: [
                    EXPORT_PATH
                ]
            },

            copy: {
                app: {
                    files:
                        [
                            {
                                cwd: './scripts/',
                                src: '**/*.*',
                                dest: EXPORT_PATH + "/scripts",
                                expand: true
                            }, {
                                src: './index.html',
                                dest: EXPORT_PATH + "/index.html"
                            }
                        ]
                }
            },

            webpack: {
                app: require("./webpack.config.js"),
            },
        });

    //grunt.loadNpmTasks("grunt-sass");
    grunt.loadNpmTasks("grunt-webpack");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask("print-time", function () {
        var today = new Date();
        grunt.log.writeln("\nTime: " + today.toLocaleTimeString());
    });

    grunt.registerTask("default", [
        //"clean:app",
        //"copy:app",
        "webpack:app",
        //"print-time"
    ]);
};
