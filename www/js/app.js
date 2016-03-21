// Todo App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('todo', ['ionic', 'todo.services', 'todo.controllers'])

   .config(function($stateProvider, $urlRouterProvider) {

       // Ionic uses AngularUI Router which uses the concept of states
       // Learn more here: https://github.com/angular-ui/ui-router
       // Set up the various states which the app can be in.
       // Each state's controller can be found in controllers.js
       $stateProvider

       .state('home', {
           url: '/',
           templateUrl: 'templates/todo-list.html',
           controller: 'todoCtrl'
       });

       // if none of the above states are matched, use this as the fallback
       $urlRouterProvider.otherwise('/');

   });


// OLD FILES

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

// angular.module('todo', ['ionic'])

// Code block moved to services.js
// /**
//  * The Projects factory handles saving and loading projects
//  * from local storage, and also lets us save and load the
//  * last active project index.
//  */
//
// .factory('Projects', function() {
//   return {
//
//     // show all projects
//     all: function() {
//       var projectString = window.localStorage['projects'];
//       if(projectString) {
//         return angular.fromJson(projectString);
//       }
//       return [];
//     },
//
//     // save a projects
//     save: function(projects) {
//       window.localStorage['projects'] = angular.toJson(projects);
//     },
//
//     // add a new project
//     newProject: function(projectTitle) {
//
//       return {
//         title: projectTitle,
//         tasks: []
//       };
//     },
//
//     // return last project index
//     getLastActiveIndex: function() {
//       return parseInt(window.localStorage['lastActiveProject']) || 0;
//     },
//
//     // set the last project index
//     setLastActiveIndex: function(index) {
//       window.localStorage['lastActiveProject'] = index;
//     }
//   }
// })


/*
.controller('todoCtrl', function($scope) {
  $scope.tasks = [
    { title: 'Collect coins' },
    { title: 'Eats mushrooms' }
  ];
})
*/

// Code block moved to controllers.js
// .controller('todoCtrl', function($scope, $ionicModal, Projects, $ionicSideMenuDelegate, $timeout, $ionicPopup) {
//
//   // A utility function for creating a new project
//   // with the given projectTitle
//   var createProject = function(projectTitle) {
//     var newProject = Projects.newProject(projectTitle);
//     $scope.projects.push(newProject);
//     Projects.save($scope.projects);
//     $scope.selectProject(newProject, $scope.projects.length-1);
//   }
//
//
//   // Load or initialize projects
//   $scope.projects = Projects.all();
//
//   // Grab the last active, or the first project
//   $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];
//
//   // Called to create a new project
//   $scope.newProject = function() {
//     var projectTitle = prompt('Project name');
//     if(projectTitle) {
//       createProject(projectTitle);
//     }
//   };
//
//   // Called to select the given project
//   $scope.selectProject = function(project, index) {
//     $scope.activeProject = project;
//     Projects.setLastActiveIndex(index);
//     $ionicSideMenuDelegate.toggleLeft(false);
//   };
//
//   // MODALS
//   // load templates
//   // new task modal
//   $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
//     $scope.taskModal = modal;
//   }, {
//     scope: $scope
//   });ionic 
//
//   // Edit and load the Modal
//   $ionicModal.fromTemplateUrl('edit-task.html', function(modal) {
//     $scope.editTaskModal = modal;
//   }, {
//     scope: $scope,
//     animation: 'slide-in-up'
//   });
//
//
//   $scope.createTask = function(task) {
//     if(!$scope.activeProject || !task) {
//       return;
//     }
//     $scope.activeProject.tasks.push({
//       title: task.title
//     });
//     $scope.taskModal.hide();
//
//     // Inefficient, but save all the projects
//     Projects.save($scope.projects);
//     task.title = "";
//   };
//
//   // Open create task modal
//   $scope.newTask = function() {
//     $scope.taskModal.show();
//     task.title = "";
//   };
//
//   // Open new task modal
//   $scope.editTask = function(i, task) {
//     $scope.task = {title: task.title, isDone: task.isDone};
//     $scope.taskIndex = i;
//     $scope.editTaskModal.show();
//   };
//
//   // Update new task modal
//   // Called when the form is submitted
//   $scope.updateTask = function(i, task) {
//     if (!$scope.activeProject || !task) {
//       return;
//     }
//     $scope.activeProject.tasks[i] = task;
//     $scope.editTaskModal.hide();
//
//     // Inefficient, but save all the projects
//     Projects.save($scope.projects);
//
//   };
//
//   // delete selected task
//   $scope.deleteTask = function(i, task) {
//     if (!$scope.activeProject || !task ) {
//       return;
//     }
//     console.log("start deleting");
//     $scope.showConfirm(function() {
//       console.log("confirmed to delete task "+i);
//       $scope.activeProject.tasks.splice(i,1);
//       Projects.save($scope.projects);
//     });
//   }
//
//   // A confirm dialog
//   $scope.showConfirm = function(onYes, onNo) {
//    var confirmPopup = $ionicPopup.confirm({
//      title: 'Delete Task',
//      template: 'Are you sure you want to delete this task?'
//    });
//    confirmPopup.then(function(res) {
//      if(res) {
//        onYes();
//      } else {
//        if (onNo)
//         onNo();
//      }
//    });
//   };
//
//   // "Cancel" button on new task page
//   $scope.closeNewTask = function() {
//     $scope.taskModal.hide();
//   }
//   // "Cancel" button on edit task page
//   $scope.closeEditTask = function() {
//     $scope.editTaskModal.hide();
//   }
//
//   $scope.toggleProjects = function() {
//     $ionicSideMenuDelegate.toggleLeft();
//   };
//
//
//   // Try to create the first project, make sure to defer
//   // this by using $timeout so everything is initialized
//   // properly
//   $timeout(function() {
//     if($scope.projects.length == 0) {
//       while(true) {
//         var projectTitle = prompt('Your first project title:');
//         if(projectTitle) {
//           createProject(projectTitle);
//           break;
//         }
//       }
//     }
//   });
//
// })

/*
.controller('todoCtrl', function($scope, $ionicModal) {
  // No need for testing data anymore
  $scope.tasks = [];

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createTask = function(task) {
    $scope.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();
    task.title = "";
  };

  // Open our new task modal
  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  // Close the new task modal
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };
})
*/

/*
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
*/
