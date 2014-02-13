// http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
module.exports = function(grunt) {

  /**
   * Saves having to declare each dependency
   */
  require( "matchdep" ).filterDev( "grunt-*" ).forEach( grunt.loadNpmTasks );

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        compress: true,
        mangle: true,
        report: 'min',
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },

      build: {
        files: {
          "assets/js/all.min.js": ["assets/js/plugins/*.js", "assets/js/main.js"]
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions'] // more codenames at https://github.com/ai/autoprefixer#browsers
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/css',
          src: '{,*/}*.css',
          dest: 'assets/css'
        }]
      }
    },

    watch: {
      scripts: {
        files: ['assets/js/plugins/*.js', 'assets/js/main.js'],
        tasks: ['uglify'],
        options: {
          spawn: false
        }
      },

      css: {
        files: ['assets/scss/**/*.scss'],
        tasks: ['compass', 'autoprefixer']
      }
    },

    compass: {
      config: 'config.rb'
    },

    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            // Set to true to enable the following options…
            expand: true,
            // cwd is 'current working directory'
            cwd: 'images/',
            src: ['*.png'],
            // Could also match cwd line above. i.e. project-directory/img/
            dest: 'images/',
            ext: '.png'
          }
        ]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [
          {
            // Set to true to enable the following options…
            expand: true,
            // cwd is 'current working directory'
            cwd: 'assets/images/',
            src: ['*.jpg', '**/*.jpg'],
            // Could also match cwd. i.e. project-directory/img/
            dest: 'assets/images/',
            ext: '.jpg'
          }
        ]
      }
    }

  });

};
