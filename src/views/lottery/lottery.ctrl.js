import '../../assets/style/sudoku.less'

ctrl.$inject = ['$scope', '$compile', 'httpRequestSrv', 'toastSrv'];
export default function ctrl($scope, $compile, httpRequestSrv, toastSrv) {
    // $scope.lotteryProds = new Array(8);
    // for (let i = 0; i < $scope.lotteryProds.length; i++) {
    //     $scope.lotteryProds[i] = {
    //         idx: i
    //     };
    // }

    // get lottery products
    httpRequestSrv.post('/api/v1/wd/lottery/activity/info', {
        "activityCode": "DOUBLE11_NEW", 
        "identityId": "330106199311103025", 
        "customerId": "a82bb97161514809b7982b902668955e"
    })
    .then(res => {
        if (res.statusCode == 200) {
            $scope.lotteryProds = res.data.products;
            var sudoku = `<sudoku-directive set-data="lotteryProds" start-click="startLottery()" finish-callback="finish()"></sudoku-directive>`;
            var $sudoku = $compile(sudoku)($scope);
            $sudoku.appendTo(".lotteryPage");
        }
        
    }, err => {
        console.log(err);
    })
    $scope.startLottery = function () {
        console.log('start click');
        return new Promise((resolve, reject) => {
            httpRequestSrv.post('/api/v1/wd/lotteryDraw/draw', {
                "loterActCode": "DOUBLE11_NEW",
                "customerId": "a82bb97161514809b7982b902668955e"
            })
            .then(res => {
                $scope.winInfo = res.data.data;
                resolve(res.data.data.order);
            }, err => {
                reject(err);
                toastSrv(err);
            })
        })
        
    }
    $scope.finish = function() {
        console.log('finish lottery', $scope.winInfo)
    }
    
}