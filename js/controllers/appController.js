app.controller('AppController', ['swInfo', function( swInfo ) {
        var vm = this;
        vm.nav = [
            {
                url:"#/",
                title:"Home"
            },{
                url:"#/tasks",
                title:"Tasks"
            }
        ];
        vm.ver = swInfo.version;
        vm.today = new Date();
    }]);