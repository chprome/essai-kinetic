module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({

        jshint: {
            all: ['src/js/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        copy: {
          main: {
            src: 'src/css/*',
            dest: 'dist/',
            expand: true,
            flatten: true,
            filter: 'isFile'
          },
        },

        browserify: {
            'dist/app.js': ['src/js/app.js']
        },

        clean: {
            css: ['dist/*.css'],
            js: ['dist/*.js']
        },

        watch: {
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['clean:js', 'browserify'],
                options: {
                    spawn: false,
                }    
            },
            css: {
                files: ['src/css/*.css'],
                tasks: ['clean:css', 'copy'],
                options: {
                    spawn: false,
                }    
            }
        }

    });

    grunt.registerTask('build', ['clean', /*'jshint',*/ 'copy', 'browserify', 'watch']);
    grunt.registerTask('default', ['build']);
};
