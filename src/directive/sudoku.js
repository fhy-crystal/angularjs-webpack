const ITEM_NUM = 8;
sudoku.$inject = ['$timeout'];
export default function sudoku($timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            setData: '=',
            winInfo: '=',
            finishCallback: '&',
            startClick: '&'
        },
        template: `<section class="sudokuComponent">
                        <div class="sudokuComponent_row">
                            <div class="sudokuComponent_item sudokuComponent_item{{item.displayOrder}}" ng-repeat="item in lotteryProdsRow1 track by $index">
                                <div class="sudokuComponent_item__content">
                                    <div class="contentTitle">
                                        {{item.idx}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="sudokuComponent_row">
                            <div class="sudokuComponent_item sudokuComponent_item{{item.displayOrder}}"
                                ng-repeat="item in lotteryProdsRow2 track by $index">
                                <div class="sudokuComponent_item__content">
                                    <div class="contentTitle">
                                        {{item.idx}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="sudokuComponent_row">
                            <div class="sudokuComponent_item sudokuComponent_item{{item.displayOrder}}"
                                ng-repeat="item in lotteryProdsRow3 track by $index">
                                <div class="sudokuComponent_item__content">
                                    <div class="contentTitle">
                                        {{item.idx}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="sudokuComponent_btn" ng-click="startLottery()">
                            <div class="sudokuComponent_item__content">
                                立即抽奖
                            </div>
                        </div>
                    </section>`,
        link: function($scope) {
            $timeout(function() {
                // 处理数据，方便布局
                // 1   2   3
                // 8  抽奖  4
                // 7   6   5
                if ($scope.setData && $scope.setData.length > 0) {
                    for (let i = 0; i < $scope.setData.length; i++) {
                        $scope.setData[i].idx = i + 1;
                        $scope.setData[i].displayOrder = 0;
                    }
                }
                $scope.lotteryProdsRow1 = $scope.setData.slice(0, 3);
                $scope.lotteryProdsRow1.forEach(item => item.displayOrder = item.idx);

                $scope.lotteryProdsRow2 = $scope.setData.slice(3, 5);
                $scope.lotteryProdsRow2[0].displayOrder = $scope.setData.length;
                $scope.lotteryProdsRow2[1].displayOrder = $scope.lotteryProdsRow2[0].idx;

                $scope.lotteryProdsRow3 = $scope.setData.slice(5, 8);
                $scope.lotteryProdsRow3.forEach(item => item.displayOrder = 13 - item.idx);

                $scope.dealedLotteryProds = [
                    ...$scope.lotteryProdsRow1,
                    ...$scope.lotteryProdsRow2,
                    ...$scope.lotteryProdsRow3
                ]
            }, 0)
            /**
             * start lottery
             */
            let startFlag = true;
            $scope.startLottery = function() {
                if (startFlag) {
                    startFlag = false;
                    $('.sudokuComponent_item').removeClass('active');
                    $scope.startClick.call(null).then(res => {
                        var prize = '';
                        $scope.dealedLotteryProds.forEach(item => {
                            if (item.order === res) {
                                prize = item.displayOrder;
                            }
                        })
                        // var prize = $scope.winInfo.prize;
                        prize += ITEM_NUM * 3; // 转三圈
                        for (let i = 0; i <= prize; i++) {
                            $timeout(time(i), 9 * i * i);
                        }
                        $timeout(function () {
                            $scope.finishCallback.call(null); //回调
                            startFlag = true;
                        }, 9 * prize * prize + 1000)
                    });
                }
                
            }

            /**
             * add active style
             */
            function time(a) {
                return function() {
                    if (a > ITEM_NUM) {
                        a = parseInt(a % ITEM_NUM);
                        if (a == 0) {
                            a = ITEM_NUM;
                        }
                    }
                    $('.sudokuComponent_item').removeClass('active');
                    $('.sudokuComponent_item' + a).addClass('active');
                }
            }
        }
    }
}