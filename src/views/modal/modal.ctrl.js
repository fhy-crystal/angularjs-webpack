ctrl.$inject = ['$scope', '$timeout', 'toastSrv'];
export default function ctrl($scope, $timeout, toastSrv) {
    $scope.modal = {
        isShow: false,
        success: function() {
            console.log('success')
        },
        cancel: function() {
            console.log('cancel');
        }
    }
    $scope.open = function() {
        $scope.modal.isShow = true;
    }
    
}