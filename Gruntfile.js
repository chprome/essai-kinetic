module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({

        jshint: {
            all: ['src/js/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        browserify: {
            'dist/app.js': ['src/js/app.js']
        },

        clean: ['dist/*'],

        watch: {
            files: ['src/js/**/*.js'],
            tasks: ['clean', 'browserify'],
            options: {
                spawn: false,
            },
        }

    });

    grunt.registerTask('build', ['clean', 'jshint', 'browserify', 'watch']);
    grunt.registerTask('default', ['build']);
};
