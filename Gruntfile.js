module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Local server.
    connect: {
      server: {
        options: {
          port: 5000,
          hostname: '*',
          base: '_site',
          livereload: true,
        },
      },
    },

    concurrent: {
      dev: {
        tasks: ['watch:jekyllDev', 'watch:sass', 'watch:jsDev'],
        options: {
          logConcurrentOutput: true,
        },
      },
      prod: {
        tasks: ['watch:jekyllProd', 'watch:sass', 'watch:jsProd'],
        options: {
          logConcurrentOutput: true,
        },
      },
    },

    // Create favicon in different formats.
    favicons: {
      options: {},
      icons: {
        src: '_assets/favicon/favicon.png',
        dest: '_site/favicon',
      },
    },

    // Watch for changes.
    watch: {
      sass: {
        files: ['_scss/*.scss'],
        tasks: ['compile-css-dev'],
        options: {
          interupt: true,
          atBegin: true,
        },
      },
      jekyllDev: {
        files: [
          '**/*',
          '!node_modules/**',
          '!_site/**',
          '!_scss/**',
          '!_assets/**',
          '!_js/**',
        ],
        tasks: ['shell:jekyllDev'],
        options: {
          interupt: true,
          atBegin: true,
        },
      },
      jekyllProd: {
        files: [
          '**/*',
          '!node_modules/**',
          '!_site/**',
          '!_scss/**',
          '!_assets/**',
          '!_js/**',
        ],
        tasks: ['shell:jekyllProd'],
        options: {
          interupt: true,
          atBegin: true,
        },
      },
      jsDev: {
        files: ['_js/*.js'],
        tasks: ['shell:jsDev'],
        options: {
          interupt: true,
          atBegin: true,
        },
      },
      jsProd: {
        files: ['_js/*.js'],
        tasks: ['shell:jsProd'],
        options: {
          interupt: true,
          atBegin: true,
        },
      },
    },

    // Run shell commands.
    shell: {
      jsDev: {
        command: ['grunt webpack', 'cp -f -R _js/libs _site/js/'].join('&&'),
      },
      jsProd: {
        command: ['grunt webpack', 'cp -f -R _js/libs _site/js/'].join('&&'),
      },
      compassDev: {
        command: ['grunt compass:dev'].join('&&'),
      },
      compassProd: {
        command: ['grunt compass:prod'].join('&&'),
      },
      jekyllDev: {
        command: [
          'export JEKYLL_ENV=development',
          'bundle exec jekyll build',
        ].join('&&'),
      },
      jekyllProd: {
        command: [
          'export JEKYLL_ENV=production',
          'bundle exec jekyll build',
        ].join('&&'),
      },
      pushToS3: {
        command: ['bundle exec s3_website push'].join('&&'),
      },
    },

    //--------------------------------------
    // JS
    //--------------------------------------

    // Webpack
    webpack: {
      pack: {
        entry: './_js/main.js',
        output: {
          path: __dirname + '/_site/js/',
          publicPath: '/js/',
          filename: '[name]-bundle.js',
          chunkFilename: '[id]-bundle.js',
        },
      },
    },

    //--------------------------------------
    // Assets
    //--------------------------------------

    // Create resized mp4 and webm videos for html5.
    responsive_videos: {
      task: {
        options: {
          sizes: [
            {
              width: 500,
              poster: true,
            },
            {
              width: 750,
              poster: true,
            },
          ],
        },
        files: [
          {
            expand: true,
            src: ['**/*.{mov,mp4,m4v}'],
            cwd: '_assets/',
            dest: '_site/assets/',
          },
        ],
      },
    },

    copy: {
      images: {
        files: [
          {
            expand: true,
            src: ['**/*'],
            cwd: '_assets/',
            dest: '_site/assets/',
          },
        ],
      },
    },

    //--------------------------------------
    // CSS
    //--------------------------------------

    // Compass - Compile SASS, add utilities.
    compass: {
      dev: {
        options: {
          config: 'config.rb',
          force: true,
        },
      },
      prod: {
        options: {
          config: 'config.rb',
          force: true,
          outputStyle: 'compressed',
        },
      },
    },

    // Autoprefixer - Write CSS normally, without mixins.
    autoprefixer: {
      target: {
        src: '_site/css/styles.css',
        dest: '_site/css/styles.css',
      },
    },

    //--------------------------------------
    // HTML
    //--------------------------------------

    // Prettify html.
    prettify: {
      all: {
        expand: true,
        cwd: '_site/',
        src: '**/*.html',
        dest: '_site/',
      },
    },

    // Strip comments from html.
    htmlmin: {
      all: {
        options: {
          removeOptionalTags: false,
          removeComments: true,
          collapseWhitespace: true,
        },
        files: [
          {
            expand: true,
            cwd: '_site/',
            src: '**/*.html',
            dest: '_site/',
          },
        ],
      },
    },
  });

  // Load all tasks in packages.json beginning with grunt.
  require('load-grunt-tasks')(grunt);

  // Default task is development.
  grunt.registerTask('default', ['dev']);

  // Convert videos to HTML5 formats and copy to _site.
  grunt.registerTask('videos', ['responsive_videos']);

  // Copy images to _site.
  grunt.registerTask('images', ['copy:images']);

  grunt.registerTask('dev', ['connect', 'concurrent:dev']);

  grunt.registerTask('prod', ['connect', 'concurrent:prod']);

  // Production. Compiles with minification.
  grunt.registerTask('compile-prod', [
    'shell:jekyllProd',
    'compile-css-prod',
    'webpack',
    'htmlmin',
    'prettify',
  ]);

  grunt.registerTask('compile-css-dev', ['shell:compassDev', 'autoprefixer']);

  grunt.registerTask('compile-css-prod', ['shell:compassProd', 'autoprefixer']);

  // Push to S3.
  grunt.registerTask('deploy', ['compile-prod', 'shell:pushToS3']);
};
