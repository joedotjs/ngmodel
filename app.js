var app = angular.module('Lecture', []);

app.factory('SongFactory', function ($http) {

    return {
        postNewSong : function (data) {
            return $http.post('/song', { song: data }).then(function (response) {
                return response.data;
            });
        }
    };

});

app.controller('MainCtrl', function ($scope, SongFactory) {

    // question String
    $scope.song = {};

    $scope.categories = [
        'MongoDB',
        'Express',
        'Angular',
        'Node'
    ];

    $scope.submitSong = function (theSong) {

        SongFactory.postNewSong(theSong).then(function () {
            $scope.song = {};
        });

    };

});