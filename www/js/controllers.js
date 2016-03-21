angular.module('todo.controllers', [])

// FYI this code was originally in app.js
.controller('todoCtrl', function($scope, $ionicModal, Projects, $ionicSideMenuDelegate, $timeout, $ionicPopup) {

  // A utility function for creating a new project
  // with the given projectTitle
    // creates the initial project on startup
  var createProject = function(projectTitle) {
    var newProject = Projects.newProject(projectTitle);
    $scope.projects.push(newProject);
    Projects.save($scope.projects);
    $scope.selectProject(newProject, $scope.projects.length-1);
    console.log("createProject Function - Initial Creation")
    console.log("Create Project "+$scope.projects.length)
  }


  // Load or initialize projects
  $scope.projects = Projects.all();

  // Grab the last active, or the first project
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

  // Called to create a new project
  $scope.newProject = function() {
    var projectTitle = prompt('Project name');
    if(projectTitle) {
      createProject(projectTitle);
    }
    console.log("newProject Function");
  };

  // Called to select the given project
  $scope.selectProject = function(project, index) {
      if($scope.projects.length == 0) {
         $scope.activeProject.title = "";
     } else {
        $scope.activeProject = project;
    }
    Projects.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  // MODALS
  // load templates
  // New Task Modal
  $ionicModal.fromTemplateUrl('templates/new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope
  });

  // Edit Task Modal
  $ionicModal.fromTemplateUrl('templates/edit-task.html', function(modal) {
    $scope.editTaskModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Edit and load the Modal for edit project
    $ionicModal.fromTemplateUrl('templates/edit-project.html', function(modal) {
      $scope.editProjectModal = modal;
    }, {
      scope: $scope,
      animation: 'slide-in-up'
    });

    // ***** Projects ***** //
    // Open our new Project modal
    $scope.editProject = function(i, project) {
        $scope.project = {title: $scope.projects[i].title, tasks: $scope.projects[i].tasks};
        $scope.projectIndex = i;
        $scope.editProjectModal.show();
    };

    // Close the edit Project modal
    $scope.closeEditProject = function() {
        $scope.editProjectModal.hide();
        //
        $scope.initialProject();
    };

    // Called when the form is submitted
    $scope.updateProject = function(i, project) {
        if (!$scope.projects || !project) {
            return;
        }
        $scope.projects[i] = project;
        $scope.editProjectModal.hide();

        // Inefficient, but save all the projects
        Projects.save($scope.projects);

    };

    // delete selected project
    $scope.deleteProject = function(i, project) {
        if (!$scope.activeProject || !project ) {
            return;
        }
        console.log("start deleting");
        $scope.showConfirm('Delete Project', 'Are you sure you want to delete this project?',function() {
            console.log("confirmed to delete project and all its tasks "+i);
            $scope.projects.splice(i,1);
            Projects.save($scope.projects);
        });

    }

    // A confirm dialog box
    $scope.showConfirm = function(title, message, onYes, onNo) {
        var confirmPopup = $ionicPopup.confirm({
            title: title,
            template: message
        });
        confirmPopup.then(function(res) {
            if(res) {
                onYes();
                $scope.closeEditProject();
                //$scope.newInitialProject();
                console.log("Confirm Popup");
            } else {
            if (onNo)
                onNo();
            }
        });
    };

    // $scope.newInitialProject = function() {
    //     if ($scope.projects.length == 0) {
    //         console.log($scope.projects.length);
    //         console.log("Empty Projects");
    //         $scope.newProject();
    //     }
    //     console.log("newInitialProject");
    // };

    // ***** TASKS ***** //
  // Opens the Task Modal
  $scope.newTask = function() {
    $scope.taskModal.show();
    console.log("newTask Function");

  };

  // create Task Data
  $scope.createTask = function(task) {
    if(!$scope.activeProject || !task) {
      return;
    }
    $scope.activeProject.tasks.push({
      title: task.title
    });
    // reset task title back to blank
    task.title = "";
    $scope.taskModal.hide();

    // Inefficient, but save all the projects
    Projects.save($scope.projects);
    console.log("createTask Function");

  };

  // Closes the Task Modal
  // "Cancel" button on new task page
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
    //console.log("closeNewTask Function");
    //console.log(callback.toString());
  }

  // Opens the Edit Task Modal
  $scope.editTask = function(i, task) {
    $scope.task = {title: task.title, isDone: task.isDone};
    $scope.taskIndex = i;
    $scope.editTaskModal.show();
    console.log("editTask Function");
  };

  // Updates Task Data
  // Called when the form is submitted
  $scope.updateTask = function(i, task) {
    if (!$scope.activeProject || !task) {
      return;
    }
    $scope.activeProject.tasks[i] = task;
    $scope.editTaskModal.hide();

    // Inefficient, but save all the projects
    Projects.save($scope.projects);
    console.log("updateTask Function");

  };

  // delete selected task
  $scope.deleteTask = function(i, task) {
      if (!$scope.activeProject || !task ) {
          return;
      }
      console.log("start deleting");
      $scope.showConfirm('Delete Task', 'Are you sure you want to delete this task?', function() {
          console.log("confirmed to delete task "+i);
          $scope.activeProject.tasks.splice(i,1);
          Projects.save($scope.projects);
      });
  }

  // "Cancel" button on edit task page
  $scope.closeEditTask = function() {
    $scope.editTaskModal.hide();
  }

  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };


  // Try to create the first project, make sure to defer
  // this by using $timeout so everything is initialized
  // properly

  // $timeout(function() {
  //   if($scope.projects.length == 0) {
  //     while(true) {
  //       var projectTitle = prompt('Your first project title:');
  //       if(projectTitle) {
  //         createProject(projectTitle);
  //         break;
  //       }
  //     }
  //   }
  // });

  $scope.initialProject = function() {
      $timeout(function() {
        // runs only if there are no other projects
        if($scope.projects.length == 0) {
            //$scope.activeProject.title = "";
          while(true) {
            var projectTitle = prompt('Your first project title:');
            if(projectTitle) {
              createProject(projectTitle);
              break;
            }
          }
        }
      });
    }

// run the initial project on launch
$scope.initialProject();

})
