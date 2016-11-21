var app = angular.module('app',['ngRoute','ui.grid','ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav','ui.grid.selection']);
app.conf=function ($routeProvider) { 
  $routeProvider 
    .when('/', { 
      templateUrl: 'views/home.html' 
    })
    .when('/tasks', { 
      controller: 'TasksController',  
      templateUrl: 'views/tasks.html' 
    })
    .otherwise({ 
      redirectTo: '/' 
    }); 
}
app.config(app.conf);
app.constant("swInfo", {
    "version": "1.0.1"
});