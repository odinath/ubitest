module.exports = function(grunt) {


    // Load the include-all library in order to require all of our grunt
    // configurations and task registrations dynamically.
    var includeAll;

    try {
        includeAll = require('include-all');
    }
    catch (e) {
        console.error('Could not find `include-all` module.');
    }

    /**
     * Loads Grunt configuration modules from the specified
     * relative path. These modules should export a function
     * that, when run, should either load/configure or register
     * a Grunt task.
     */
    function loadTasks(relativePath) {
        return includeAll({
            dirname: require('path').resolve(__dirname, relativePath),
            filter:  /(.+)\.js$/
        }) || {};
    }

    /**
     * Invokes the function from a Grunt configuration module with
     * a single argument - the `grunt` object.
     */
    function invokeConfigFn(tasks) {
        for (var taskName in tasks) {
            if (tasks.hasOwnProperty(taskName)) {
                tasks[taskName](grunt);
            }
        }
    }

    // Load task functions
    var taskConfigurations  = loadTasks('./grunt/config'),
        registerDefinitions = loadTasks('./grunt/register');
    
    // Run task functions to configure Grunt.
    invokeConfigFn(taskConfigurations);
    invokeConfigFn(registerDefinitions);

};