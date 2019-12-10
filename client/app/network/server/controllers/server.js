(function() {

    'use strict';

    angular
        .module('app.network.server')
        .controller('ServerController', ServerController);

    ServerController.$inject = ['$uibModal', 'SocketService', 'SweetAlert', '$translate', '$filter', 'serverDataService', 'logger', '$state'];

    function ServerController($uibModal, SocketService, SweetAlert, $translate, $filter, serverDataService, logger, $state) {

        var vm = this;

        vm.alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        vm.servers = [];
        vm.letterList = [];
        vm.originalServers = [];
        vm.loading = true;
        vm.searchFilter = '';
        vm.formInstance = null;

        vm.letterFilterPopover = {
            templateUrl: 'letterFilter.html',
            title: 'Scegli la lettera'
        };


        serverDataService.getServerList().then(function(response) {
            vm.originalServers = vm.servers = response.data.servers;
            for(var i in vm.originalServers) {
                for(var s in vm.alphabet) {
                    if(vm.alphabet[s].toLowerCase() === vm.originalServers[i].name.charAt(0).toLowerCase()) {
                        if($.inArray(vm.alphabet[s], vm.letterList) === -1) {
                            vm.letterList.push(vm.alphabet[s]);
                        }
                    }
                }
            }
            vm.letterList.sort();
            vm.loading = false;
        }).catch(function(response) {
            vm.loading = false;
        });

        //filter users on selected letter
        vm.filterLetter = function(needle) {
            vm.users = $filter('letterFilter')('server', vm.originalServers, needle);
        };

        vm.removeElem = function(server) {
            SweetAlert.swal({
                title: server.name,
                text: "Vuoi cancellare il server?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#8CC53B',
                confirmButtonText: $translate.instant('auth.YES'),
                cancelButtonText: $translate.instant('auth.NO'),
                closeOnConfirm: true,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    serverDataService.deleteServer(server).then(function(response) {
                        for (var idx in vm.servers) {
                            if (vm.servers[idx]._id === server._id) {
                                vm.servers.splice(idx, 1);
                                //SocketService.emit('send:deleteServer', servers);
                                logger.info(server.name, response.data.message);
                                break; //Stop this loop, we found it!
                            }
                        }
                    });
                }
            });
        };


        vm.openForm = function(server) {
            vm.formInstance = $uibModal.open({
                templateUrl : 'app/network/server/views/partials/serverForm.html',
                controller : 'ServerFormController',
                controllerAs: 'ServerFormCtrl',
                resolve : {
                    parent_vm: function() {
                        return vm;
                    },
                    server : function() {
                        return server;
                    }
                }
            });
        };

        /*Start socket*/

        /*Fine Socket socket*/


    }

})();


