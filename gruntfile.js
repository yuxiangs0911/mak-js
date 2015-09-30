module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        requirejs: {
            compile: {
                options: {
                    baseUrl: "src",
                    name: "pc/js/mak",
                    out: "dist/pc/mak.min.js",
                    exclude: ["jquery", "md5"],
                    paths: {
                        jquery: "../lib/jquery/dist/jquery",
                        md5: "../lib/blueimp-md5/js/md5"
                    }
                }
            }
        }
    });
    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies',
        pattern: ['grunt-*', '!grunt-contrib-sass']
    });

    grunt.registerTask("dist-pc", ["requirejs"]);
};