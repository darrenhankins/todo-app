// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// FYI this code was originally in app.js
angular.module('todo.services', [])

/**
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
.factory('Projects', function() {
  return {

    // show all projects
    all: function() {
      var projectString = window.localStorage['projects'];
      if(projectString) {
        return angular.fromJson(projectString);
      }
      return [];
    },

    // save a projects
    save: function(projects) {
      window.localStorage['projects'] = angular.toJson(projects);
    },

    // add a new project
    newProject: function(projectTitle) {

      return {
        title: projectTitle,
        tasks: []
      };
    },

    // return last project index
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveProject']) || 0;
    },

    // set the last project index
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveProject'] = index;
    }
  }
})
