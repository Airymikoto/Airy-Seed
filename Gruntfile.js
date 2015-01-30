module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            dev: ["src/js/**/*.js"]
        },
        compass: {
            dev: {
                options: {
                    sassDir: "src/assets/stylesheets/main",
                    cssDir: "src/assets/",
                    outputStyle: "expanded"
                }
            },
            build: {
                options: {
                    sassDir: "src/assets/stylesheets/main",
                    cssDir: "www/assets",
                    outputStyle: "compressed"
                }
            }
        },
        connect: {
            dev: {
                options: {
                    port: 8001,
                    livereload: true,
                    base: "src"
                }
            },
            build: {
                options: {
                    port: 8000,
                    keepalive: true,
                    base: "www"
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            compass: {
                files: ["src/assets/stylesheets/**/*.scss"],
                tasks: ["compass:dev"]
            },
            jshint: {
                files: ["src/js/**/*.js"],
                tasks: ["jshint:dev"]
            },
            html: {
                files: ["src/templates/**/*.html"],
                tasks: ["env:dev", "preprocess:dev"]
            }
        },
        clean: {
            options: {
                force: true
            },
            build: {
                src: ["www"]
            }
        },
        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: "src",
                    src: ["assets/images/**"],
                    dest: "www"
                }]
            }
        },
        uglify: {
            build: {
                files: {
                    "www/app.min.js": [
                        "src/libs/jquery/dist/jquery.min.js",
                        "src/js/app.js"
                    ]
                }
            }
        },
        env: {
            dev: {
                NODE_ENV: "DEVELOPMENT"
            },
            build: {
                NODE_ENV: "PRODUCTION"
            }
        },
        preprocess: {
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: "src/templates/",
                        src: ["**/*.tpl.html"],
                        dest: "src/pages/",
                        ext: ".html"
                    }
                ]
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: "src/templates/",
                        src: ["**/*.tpl.html"],
                        dest: "www/",
                        ext: ".html"
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-compass");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-env");
    grunt.loadNpmTasks("grunt-preprocess");

    grunt.registerTask("default", ["connect:dev", "watch"]);
    grunt.registerTask("build", ["env:build", "clean:build", "preprocess:build", "compass:build", "copy:build", "uglify", "connect:build"]);
};