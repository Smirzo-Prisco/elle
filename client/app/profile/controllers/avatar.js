(function() {

    'use strict';

    angular
        .module('app.profile')
        .controller('AvatarController', AvatarController);

    AvatarController.$inject = ['$scope', '$uibModalInstance', 'FileUploader', 'CommonService', 'CoreService', 'logger'];

    function AvatarController($scope, $uibModalInstance, FileUploader, CommonService, CoreService,  logger) {

        var vm = this;
        vm.loadingAvatarPreview = false;
        vm.avatarImage = '';
        vm.avatarCroppedImage = '';

        //AngularFileUploader object
        vm.uploader = new FileUploader({
            url: 'api/avatar' //api to upload avatar image
        });

        vm.uploader.filters.push({
            name: 'imageFilter',
            fn: function (item, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|'.indexOf(type) !== -1;
            }
        });

        vm.uploader.onAfterAddingFile = function(fileItem) {
            //Check if file added to the queue is not a croppedImage

            //This check avoid to show the cropped image on the preview div
            if(fileItem._file.name !== 'croppedBlobImage') {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    vm.loadingAvatarPreview = true;
                    $scope.$apply(function ($scope) {
                        vm.avatarImage = evt.target.result;
                    });
                };
                reader.onloadend = function() {
                    vm.loadingAvatarPreview = false;
                };
                reader.readAsDataURL(fileItem._file);
            }
        };

        vm.uploader.onWhenAddingFileFailed = function (item, filter, options) {
            logger.warning('Only png/jpeg image are allowed', 'Warning!');
        };

        vm.uploader.onSuccessItem = function(item, response, status, headers) {
            CoreService.saveUserData(response.user);
            $uibModalInstance.close();
            vm.uploader.clearQueue();
            logger.info(response.message, 'Update avatar');
        };

        vm.uploader.onErrorItem = function(item, response, status, headers) {
            $uibModalInstance.close();
            vm.uploader.clearQueue();
            logger.info('error', response.err);
        };



        vm.close = function() {
            $uibModalInstance.close();
            vm.uploader.clearQueue();
        };

        vm.convertAndUpload = function() {
            //Clear the upload queue from the original image
            vm.uploader.clearQueue();
            //convert the cropped image from Base64 to a Blob
            var blobImage = CommonService.convertDataURItoBlob(vm.avatarCroppedImage);
            //give a name to the croppedImage
            blobImage.name = 'croppedBlobImage';
            //add to the queue the croppedImage
            vm.uploader.addToQueue(blobImage);
            //upload the cropped image on the server
            vm.uploader.uploadAll();
        }

    }

})();




