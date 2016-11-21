app.controller ('TasksController', ['$scope', 'crudService','$routeParams','$http', function($scope, crudService,$routeParams,$http) {
        var vm=$scope;
        window.vm=vm;
	vm.today = new Date();
        vm.saved = localStorage.getItem('taskItems');
        vm.taskItem = (localStorage.getItem('taskItems')!==null) ? 
        JSON.parse(vm.saved) : [ {description: "Why not add a task?", date: vm.today, complete: false}];
        localStorage.setItem('taskItems', JSON.stringify(vm.taskItem));
        
        vm.newTask = null;
        vm.newTaskDate = null;
        vm.categories = [
            {name: 'Personal'},
            {name: 'Work'},
            {name: 'School'},
            {name: 'Cleaning'},
            {name: 'Other'}
        ];
        vm.newTaskCategory = vm.categories;
        vm.addNew = function () {
            if (vm.newTaskDate == null || vm.newTaskDate == '') {
                vm.taskItem.push({
                    description: vm.newTask,
                    date: "No deadline",
                    complete: false,
                    category: vm.newTaskCategory.name
                }); 
                
            } else {
                vm.taskItem.push({
                    description: vm.newTask,
                    date: vm.newTaskDate,
                    complete: false,
                    category: vm.newTaskCategory.name
                });
            };
            vm.newTask = '';
            vm.newTaskDate = '';
            vm.newTaskCategory = vm.categories;
            localStorage.setItem('taskItems', JSON.stringify(vm.taskItem));
        };
        vm.deleteTask = function () {
            var completedTask = vm.taskItem;
            vm.taskItem = [];
            angular.forEach(completedTask, function (taskItem) {
                if (!taskItem.complete) {
                    vm.taskItem.push(taskItem);
                }
            });
            localStorage.setItem('taskItems', JSON.stringify(vm.taskItem));
        };
        
        vm.save = function () {
            localStorage.setItem('taskItems', JSON.stringify(vm.taskItem));
        };

        vm.id= $routeParams && $routeParams.id || false;
        vm.data = [];
        var populateData = function(response){
            var data = response.data && response.data.docs ||[];
            vm.data=JSON.parse(JSON.stringify(data));
            if (vm.id){
                vm.d=vm.data[0] || {};
                if (!vm.d.description) vm.description=[];
                if (!vm.d.date) vm.date=[];
                if (!vm.d.complete) vm.complete=[];
                }
            vm.read = function(){
		var fnd={"category":"personal"};
		if (vm.id) fnd._id=vm.id;
                crudService.fnd(fnd, populateData);
            };	
        }]);
