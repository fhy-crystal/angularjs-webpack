import '../../assets/style/slideFollow.less'
ctrl.$inject = ['$scope', '$timeout', 'toastSrv'];
export default function ctrl($scope, $timeout, toastSrv) {
    $scope.slideData = [
        {option: '张三中了一等奖'},
        {option: '李四中了二等奖'},
        {option: '王五中了三等奖'},
        {option: '赵六中了四等奖'},

    ]
    
}