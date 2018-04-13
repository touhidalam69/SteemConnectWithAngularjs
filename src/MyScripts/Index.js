var App = angular.module('App', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            //#region Common
            .when('/Home', {
                templateUrl: '/SPA/Home.html',
                controller: 'HomeController'
            })
            //#endregion Common

            .otherwise({ redirectTo: '/Home' })
        $locationProvider.html5Mode(true);
    }).controller('IndexController', function ($scope, $http, $location, $rootScope) {
        $rootScope.accessToken = $location.search().access_token;
        $rootScope.expiresIn = $location.search().expires_in;
        $scope.loginURL = sc2.getLoginURL();
        if ($scope.accessToken) {
            sc2.setAccessToken($scope.accessToken);
            sc2.me(function (err, result) {
                console.log('/me', err, result);
                if (!err) {
                    $rootScope.user = result.account;
                    $rootScope.$apply();
                }
            });
        }

        $scope.isAuth = function () {
            return !!$rootScope.user;
        };

        $scope.logout = function () {
            sc2.revokeToken(function (err, result) {
                alertify.success('You successfully logged out');
                delete $rootScope.user;
                delete $rootScope.accessToken;
                $rootScope.$apply();

            });
        };
    }).controller("HomeController", function ($scope, $http) {

    });