define(['angular', 'sample-module'], function (angular, controllers) {
    'use strict';

    /*
     * This is an example controller that shows how to handle events from other widgets and fetch new data.
     * Your widget needs to emit a px-dashboard-event and then you can either:
     *         1. catch it yourself in another widget
     *         2. catch it in a controller like this which must extend WidgetRendererController (the name of this controller must be specified in your view service widget object)
     *              id: 'context.myview',
     *               name: 'Timeseries View',
     *                  widgets: [
     *                  {
     *                      cardId: 'v-simplest-directive',
     *                      size: 'half',
     *                      controller: 'TimeseriesCtrl'
     *                      ...
     *                  }
     *                ...
     */
    controllers.controller('TimeseriesWidgetRendererCtrl', function ($scope, $controller) {



        // catch the px-dashboard-event
        $scope.$on('px-dashboard-event', function (event, name, args) {
            // we suggest having an additional unique name to identify your event
            if (name !== 'after-set-extremes') {
                return;
            }

            // override the datasource (to customize the method, url, or options)
            $scope.datasource.options.start_absolute = args.min;
            $scope.datasource.options.end_absolute = args.max;
            delete $scope.datasource.options.start_relative;

            // fetch new data with the modified datasource
            $scope.fetch($scope.datasource);
        });

        //$scope.beforeRequest = function(datasource, context) {
        //    // {"metrics":[{"tags":{},"name":"WIN-KFUUK53UEAV.Simulation00011","aggregators":[{"name":"sum","align_sampling":true,"sampling":{"value":"1","unit":"milliseconds"}}]}],"cache_time":0,"start_relative":{"value":"1","unit":"weeks"}}
        //    //datasource.options.start_relative = {value:"1", unit:"weeks"};
        //
        //    datasource.options = {
        //        metrics: [
        //            {
        //                tags: {},
        //                name: "WIN-KFUUK53UEAV.Simulation00011",
        //                aggregators: [
        //                    {
        //                        name: "sum",
        //                        align_sampling: true,
        //                        sampling: {
        //                            value: "1",
        //                            unit: "milliseconds"
        //                        }
        //                    }
        //                ]
        //            }
        //        ],
        //        cache_time: 0,
        //        start_relative: {
        //            value: "1",
        //            unit: "weeks"
        //        }
        //    };
        //    return datasource;
        //};

        // Extend the Predix WidgetRendererController
        angular.extend(this, $controller('WidgetRendererController', {$scope: $scope}));

    });
});
