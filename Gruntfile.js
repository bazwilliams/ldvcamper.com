module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-wintersmith');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.initConfig({
	    wintersmith: {
	      build: {}
	    },
	    watch: {
		  scripts: {
		    files: ['**/*.js', '**/*.json', '**/*.md', '**/*.jade', '**/*.css'],
		    tasks: ['wintersmith'],
		    options: {
		      spawn: false,
		    },
		  },
		},
  	});
	grunt.registerTask('default', ['wintersmith:build']);
};
