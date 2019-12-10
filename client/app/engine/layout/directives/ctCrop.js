(function() {

    'use strict';

    angular.module('app.engine.layout')
        .directive('ctCrop', ctCrop);

    ctCrop.$inject = ['$uibModal']
    /**
     * ctCrop
     */
    function ctCrop($uibModal) {

        return {
            restrict : 'E',
            scope : {
                options : "=cropOptions",
                labels : "=cropLabels",
                cropCallback : '&cropCallback',
                cancelCallback : '&cancelCallback',
                errorCallback : '&errorCallback'
            },
            template : '<div class="thumbnail crop-preview">' + '<div class="preview-wrapper">' + '<canvas class="canvasImg"></canvas>' + '</div>' + '<p class="no-margin"><a class="btn btn-info btn-block" ng-show="cropActive" ng-click="openCrop()"><i ng-show="textButton.icon" ng-class="textButton.icon" class="margin-right-10"></i>{{textButton.label}}</a></p>' + '</div>' + '</div>' + '<script type="text/ng-template" id="ModalCrop.html">' + '<div class="modal-header">' + '<h3 class="modal-title margin-right-30">{{optionsCrop.textLabels.modalTitle}}</h3>' + '<button class="btn btn-transparent btn-lg modal-close-button" type="button" ng-click="cancel()" uib-tooltip="{{optionsCrop.textLabels.cancelButton}}"><i ng-show="optionsCrop.textLabels.cancelIcon" ng-class="optionsCrop.textLabels.cancelIcon"></i></button>' + '<div class="crop-tools"><button class="btn btn-red btn-fit-image" uib-tooltip="{{optionsCrop.textLabels.fitButton}}"><i ng-class="optionsCrop.textLabels.fitIcon"></i></button></div>' + '</div>' + '<div class="modal-body modal-body-crop">' + '<div class="crop-image">' + '<div class="crop-wrapper load1 csspinner">' + '<div class="crop-active">' + '<img ng-src="{{optionsCrop.url}}" id="crop-target" alt="">' + '</div>' + '</div>' + '</div>' + '</div>' + '<div class="modal-footer">' + '<button class="btn btn-primary" type="button" ng-click="ok()"><i ng-show="optionsCrop.textLabels.cropIcon" ng-class="optionsCrop.textLabels.cropIcon" class="margin-right-10"></i>{{optionsCrop.textLabels.cropButton}}</button>' + '</div>' + '</script>',
            link : function($scope, elem, attrs) {
                var cropObj, oldCropObj, oldOriginalCropObj, openModal = false, isCancel = false;
                $scope.$watch(function() {
                    return $scope.options;
                }, function(newValue, oldValue) {

                    if (!angular.equals(newValue, oldValue)) {

                        if (newValue) {
                            if ( typeof newValue.url !== "undefined" && newValue.url !== null) {

                                if ($scope.tempOptions) {
                                    oldCropObj = $scope.tempOptions;
                                } else {
                                    oldCropObj = oldValue;
                                }
                                if (!oldOriginalCropObj) {

                                    oldOriginalCropObj = oldValue;

                                }

                                cropObj = newValue;

                                if (!isCancel) {
                                    $scope.tempOptions = null;
                                }

                                if (cropObj) {
                                    if (( typeof cropObj.autoOpenModal == 'undefined' || cropObj.autoOpenModal == null)) {
                                        openModal = true;
                                    } else {
                                        openModal = cropObj.autoOpenModal;
                                    }
                                    if ($scope.tempOptions) {
                                        if ($scope.tempOptions.url !== cropObj.url) {
                                            $scope.tempOptions = cropObj;
                                            isCancel = false;
                                            loadImage(openModal);

                                        } else {
                                            // $scope.tempOptions = cropObj;
                                            isCancel = true;
                                            loadImage(openModal);
                                        }

                                    } else {
                                        loadImage(openModal);

                                    }
                                }
                            }
                        }
                    }
                });

                cropObj = $scope.tempOptions ? $scope.tempOptions : $scope.options;

                $scope.textButton = {
                    label : $scope.labels.modalButton.label ? $scope.labels.modalButton.label : "Modify",
                    icon : $scope.labels.modalButton.icon ? $scope.labels.modalButton.icon : null,
                };

                var loadImage = function(e) {

                    if (!e) {
                        var nx, ny, nw, nh, width, height;

                        var previewToLoad = new Image(), isError = false, errorType;

                        previewToLoad.src = cropObj.url;
                        angular.element(previewToLoad).bind('load', function() {
                            if (previewToLoad.width < cropObj.cropMinWidth) {
                                errorType = 'error-width';
                                isError = true;
                            } else if (previewToLoad.height < cropObj.cropMinHeight) {
                                errorType = 'error-height';
                                isError = true;
                            }
                            if (isError) {
                                if ($scope.options == oldOriginalCropObj) {
                                    isCancel = false;

                                } else {
                                    if (oldCropObj) {

                                        $scope.tempOptions = oldCropObj;

                                        $scope.options = oldOriginalCropObj;

                                        oldCropObj = null;
                                        isCancel = true;
                                    } else {
                                        if (!$scope.tempOptions)
                                            delete $scope.options;
                                    }
                                }

                                $scope.optionsCrop = $scope.options;
                                if (angular.isDefined(attrs.errorCallback)) {
                                    var expressionHandler = $scope.errorCallback();
                                    expressionHandler(errorType);
                                }

                            } else {
                                $scope.cropActive = true;
                                cropObj.cropWidth = cropObj.cropWidth ? cropObj.cropWidth : 200;
                                cropObj.cropHeight = cropObj.cropHeight ? cropObj.cropHeight : 200;
                                if (( typeof cropObj.newWidth == 'undefined' || cropObj.newWidth == null)) {
                                    width = cropObj.cropWidth;
                                    height = width * previewToLoad.height / previewToLoad.width;
                                } else {
                                    width = cropObj.newWidth;
                                    height = width * previewToLoad.height / previewToLoad.width;
                                }

                                if (cropObj.cropHeight > height) {
                                    height = parseInt(cropObj.cropHeight);
                                    width = Math.round(height * previewToLoad.width / previewToLoad.height);
                                }

                                nx = previewToLoad.width * cropObj.cropX / width;
                                ny = previewToLoad.height * cropObj.cropY / height;
                                nw = previewToLoad.width * cropObj.cropWidth / width;
                                nh = previewToLoad.height * cropObj.cropHeight / height;

                                elem.find(".crop-preview").removeClass("load1 csspinner");

                                var imageObj = previewToLoad;
                                var canvas = elem.find(".canvasImg")[0];
                                canvas.width = cropObj.cropWidth;
                                canvas.height = cropObj.cropHeight;
                                var context = canvas.getContext("2d");
                                context.drawImage(imageObj, nx, ny, nw, nh, 0, 0, canvas.width, canvas.height);

                                $scope.tempOptions = cropObj;
                                $scope.tempOptions.newWidth = Math.round(width);
                                $scope.tempOptions.newHeight = Math.round(height);

                                if (( typeof cropObj.autoOpenModal !== 'undefined' && cropObj.autoOpenModal !== null)) {
                                    cropObj.originalWidth = previewToLoad.width;
                                    cropObj.originalHeight = previewToLoad.height;
                                    if (cropObj.autoOpenModal == false) {
                                        oldOriginalCropObj = cropObj;
                                        oldCropObj = null;
                                        var expressionHandler = $scope.cropCallback();
                                        expressionHandler(cropObj);
                                        $scope.$apply();
                                    }

                                }
                            }
                        });
                    } else {
                        if (!isCancel) {
                            $scope.openCrop();
                        }
                    }
                    isCancel = false;
                    openModal = false;

                };

                if (( typeof cropObj !== 'undefined' && cropObj !== null)) {
                    if (( typeof cropObj.url !== 'undefined' && cropObj.url !== null))
                        loadImage();
                }

                $scope.openCrop = function() {
                    isCancel = false;
                    cropObj = $scope.tempOptions ? $scope.tempOptions : $scope.options;

                    $scope.optionsCrop = {
                        textLabels : {
                            modalTitle : $scope.labels.modalTitle ? $scope.labels.modalTitle : "Crop Image",
                            modalButton : $scope.labels.modalButton.label ? $scope.labels.modalButton.label : "Modify",
                            modalIcon : $scope.labels.modalButton.icon ? $scope.labels.modalButton.icon : null,
                            cropButton : $scope.labels.cropButton.label ? $scope.labels.cropButton.label : "Ok",
                            cropIcon : $scope.labels.cropButton.icon ? $scope.labels.cropButton.icon : null,
                            cancelButton : $scope.labels.cancelButton.label ? $scope.labels.cancelButton.label : "Cancel",
                            cancelIcon : $scope.labels.cancelButton.icon ? $scope.labels.cancelButton.icon : null,
                            fitButton : $scope.labels.fitButton.label ? $scope.labels.fitButton.label : "Cancel",
                            fitIcon : $scope.labels.fitButton.icon ? $scope.labels.fitButton.icon : "fa fa-compress"
                        },
                        url : cropObj.url,
                        cropX : cropObj.cropX ? cropObj.cropX : 0,
                        cropX2 : (( typeof cropObj.cropWidth !== 'undefined' || cropObj.cropWidth !== null) || ( typeof cropObj.cropX !== 'undefined' || cropObj.cropX !== null)) ? parseInt(cropObj.cropX + cropObj.cropWidth) : 100,
                        cropY : cropObj.cropY ? cropObj.cropY : 0,
                        cropY2 : (( typeof cropObj.cropHeight !== 'undefined' || cropObj.cropHeight !== null) || ( typeof cropObj.cropY !== 'undefined' || cropObj.cropY !== null)) ? parseInt(cropObj.cropY + cropObj.cropHeight) : 100,
                        cropWidth : cropObj.cropWidth ? cropObj.cropWidth : 100,
                        cropHeight : cropObj.cropHeight ? cropObj.cropHeight : 100,
                        cropMaxWidth : cropObj.cropMaxWidth ? cropObj.cropMaxWidth : 0,
                        cropMaxHeight : cropObj.cropMaxHeight ? cropObj.cropMaxHeight : 0,
                        cropMinWidth : cropObj.cropMinWidth ? cropObj.cropMinWidth : 0,
                        cropMinHeight : cropObj.cropMinHeight ? cropObj.cropMinHeight : 0,
                        newWidth : cropObj.newWidth ? cropObj.newWidth : 0,
                        newHeight : cropObj.newHeight ? cropObj.newHeight : 0
                    };
                    var modalInstance = $uibModal.open({
                        animation : false,
                        backdrop : 'static',
                        templateUrl : 'ModalCrop.html',
                        controller : 'ModalCropController',
                        size : 'lg',
                        resolve : {
                            crop : function() {

                                return $scope.optionsCrop;
                            }
                        }
                    });
                    modalInstance.result.then(function(cropItem) {

                        if (cropItem == 'error-width' || cropItem == 'error-height') {
                            if ($scope.options == oldOriginalCropObj) {
                                isCancel = false;

                            } else {
                                if (oldCropObj) {

                                    $scope.tempOptions = oldCropObj;

                                    $scope.options = oldOriginalCropObj;

                                    oldCropObj = null;
                                    isCancel = true;
                                } else {
                                    if (!$scope.tempOptions)
                                        delete $scope.options;
                                }
                            }

                            $scope.optionsCrop = $scope.options;
                            if (angular.isDefined(attrs.errorCallback)) {
                                var expressionHandler = $scope.errorCallback();
                                expressionHandler(cropItem);
                            }
                        } else {

                            $scope.cropActive = true;

                            $scope.tempOptions = cropItem;
                            var nx, ny, nw, nh;
                            var imageToCrop = new Image();
                            nx = cropItem.originalWidth * cropItem.cropX / cropItem.newWidth;
                            ny = cropItem.originalHeight * cropItem.cropY / cropItem.newHeight;
                            nw = cropItem.originalWidth * cropItem.cropWidth / cropItem.newWidth;
                            nh = cropItem.originalHeight * cropItem.cropHeight / cropItem.newHeight;

                            imageToCrop.src = cropObj.url;
                            var imageObj = imageToCrop;
                            var canvas = elem.find(".canvasImg")[0];
                            canvas.width = cropItem.cropWidth;
                            canvas.height = cropItem.cropHeight;
                            var context = canvas.getContext("2d");
                            context.drawImage(imageObj, nx, ny, nw, nh, 0, 0, canvas.width, canvas.height);

                            var expressionHandler = $scope.cropCallback();
                            delete cropItem.textLabels;
                            expressionHandler(cropItem);
                            isCancel = false;
                            oldCropObj = null;
                            oldOriginalCropObj = null;
                        }
                    }, function() {

                        if ($scope.options == oldOriginalCropObj) {
                            isCancel = false;

                        } else {
                            if (oldCropObj) {

                                $scope.tempOptions = oldCropObj;

                                $scope.options = oldOriginalCropObj;

                                oldCropObj = null;
                                isCancel = true;
                            } else {
                                if (!$scope.tempOptions)
                                    delete $scope.options;
                            }
                        }

                        $scope.optionsCrop = $scope.options;

                        if (angular.isDefined(attrs.cancelCallback)) {
                            var expressionHandler = $scope.cancelCallback();
                            expressionHandler();
                        }

                    });
                };

            }
        };
    }

})();
