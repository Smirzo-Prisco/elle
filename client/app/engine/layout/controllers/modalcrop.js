(function() {

    'use strict';

    angular
        .module('app.engine.layout')
        .controller('ModalCropController', ModalCropController);

    ModalCropController.$inject = ['$scope', '$uibModalInstance', '$compile', '$window', 'crop'];

    function ModalCropController($scope, $uibModalInstance, $compile, $window, crop) {

        $scope.optionsCrop = crop;
        angular.element(".crop-wrapper").addClass("load1 csspinner");
        var imageToLoad = new Image();

        imageToLoad.src = $scope.optionsCrop.url;
        angular.element(imageToLoad).bind('load', function() {

            if (imageToLoad.width < $scope.optionsCrop.cropMinWidth) {

                $uibModalInstance.close('error-width');

            } else if (imageToLoad.height < $scope.optionsCrop.cropMinHeight) {

                $uibModalInstance.close('error-height');

            } else {

                angular.element(".crop-wrapper").removeClass("load1 csspinner");

                $scope.optionsCrop.originalWidth = imageToLoad.width;
                $scope.optionsCrop.originalHeight = imageToLoad.height;
                var boxWidth = 850, newWidth, newHeight, startPoint = $scope.optionsCrop.cropMinWidth ? $scope.optionsCrop.cropMinWidth : 1, startPointWidth, startPointHeight;

                if (boxWidth < $scope.optionsCrop.cropMinWidth)
                    boxWidth = $scope.optionsCrop.cropMinWidth;
                startPointWidth = startPoint;
                startPointHeight = imageToLoad.height * startPointWidth / imageToLoad.width;

                if (startPointHeight < $scope.optionsCrop.cropMinHeight) {
                    startPointHeight = $scope.optionsCrop.cropMinHeight;
                    startPointWidth = imageToLoad.width * startPointHeight / imageToLoad.height;

                }
                startPoint = Math.round(startPointWidth);

                if ($scope.optionsCrop.newWidth == 0) {
                    if (imageToLoad.width > boxWidth) {

                        newWidth = Math.round(boxWidth);
                        newHeight = Math.round(newWidth * imageToLoad.height / imageToLoad.width);

                        if ($scope.optionsCrop.cropMinHeight > newHeight) {
                            newHeight = $scope.optionsCrop.cropMinHeight;
                            newWidth = Math.round(newHeight * imageToLoad.width / imageToLoad.height);
                            //startPoint = newWidth;
                        }

                    } else {
                        newWidth = Math.round(imageToLoad.width);
                        newHeight = Math.round(imageToLoad.height);

                    }

                } else {
                    newWidth = Math.round($scope.optionsCrop.newWidth);
                    newHeight = Math.round(newWidth * imageToLoad.height / imageToLoad.width);

                }
                //if ($window.innerWidth <= newWidth) {
                //    newWidth = $window.innerWidth-60;
                //    newHeight = Math.round(newWidth * imageToLoad.height / imageToLoad.width);
                //}
                $scope.optionsCrop.newWidth = Math.round(newWidth);
                $scope.optionsCrop.newHeight = Math.round(newHeight);
                var resizeImage = function(value) {
                    $scope.jcrop_api.destroy();
                    var width = value;
                    var height = Math.round(width * $scope.optionsCrop.originalHeight / $scope.optionsCrop.originalWidth);
                    $scope.optionsCrop.newWidth = Math.round(width);
                    $scope.optionsCrop.newHeight = Math.round(height);
                    //$('#crop_target').width(width);
                    initJcrop(width, height);

                };

                $scope.slider = {
                    value : newWidth,
                    options : {
                        from : startPoint,
                        to : $scope.optionsCrop.originalWidth,
                        step : 1,
                        dimension : " px",
                        className : "clip-slider",
                        smooth : true,
                        css : {
                            background : {
                                "background-color" : "silver"
                            },
                            before : {
                                "background-color" : "#58748B"
                            }, // zone before default value
                            after : {
                                "background-color" : "#58748B"
                            } // zone after default value
                        },
                        callback : function(value, released) {
                            resizeImage(value);
                        }
                    }
                };

                angular.element(".btn-fit-image").on("mousedown touchstart", function() {
                    $scope.slider.value = startPoint;
                    resizeImage(startPoint);
                    $scope.$apply();
                });

                var sliderDirective = angular.element('<input ng-model="slider.value" type="text" slider options="slider.options">');
                $(".crop-tools").append(sliderDirective);
                $compile(sliderDirective)($scope);

                var initJcrop = function(w, h) {
                    var maxW = $scope.optionsCrop.cropMaxWidth, maxH = $scope.optionsCrop.cropMaxHeight, minW = $scope.optionsCrop.cropMinWidth, minH = $scope.optionsCrop.cropMinHeight, allowResize = true;
                    if (maxW == 0) {
                        maxW = $scope.optionsCrop.originalWidth;
                    }
                    if (maxH == 0) {
                        maxH = $scope.optionsCrop.originalHeight;
                    }
                    if (minW > maxW) {
                        minW = maxW;
                    }
                    if (minH > maxH) {
                        minH = maxH;
                    }

                    if (minW == maxW && minH == maxH) {
                        allowResize = false;
                    }

                    $('#crop-target').Jcrop({
                        boxWidth : w,
                        boxHeight : h,
                        allowResize : allowResize,
                        onChange : showCoords,
                        onSelect : showCoords,
                        bgColor : 'black',
                        bgOpacity : .4,
                        setSelect : [$scope.optionsCrop.cropX, $scope.optionsCrop.cropY, $scope.optionsCrop.cropX2, $scope.optionsCrop.cropY2],
                        minSize : [minW, minH],
                        maxSize : [maxW, maxH],
                        trueSize : [w, h],
                        allowSelect : false
                    }, function() {
                        $scope.jcrop_api = this;
                    });
                };

                var showCoords = function(c) {
                    $scope.optionsCrop.cropX = Math.round(c.x);
                    $scope.optionsCrop.cropX2 = Math.round(c.x2);
                    $scope.optionsCrop.cropY = Math.round(c.y);
                    $scope.optionsCrop.cropY2 = Math.round(c.y2);
                    $scope.optionsCrop.cropWidth = Math.round(c.w);
                    $scope.optionsCrop.cropHeight = Math.round(c.h);
                };

                initJcrop(newWidth, newHeight);
            }
        });

        $scope.ok = function() {
            $scope.selected = {
                item : $scope.optionsCrop
            };

            $uibModalInstance.close($scope.selected.item);
        };
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }
})();