ctrl.$inject = ['$scope', 'httpRequestSrv', 'toastSrv'];
export default function ctrl($scope, httpRequestSrv, toastSrv) {
    
    $scope.fileNameChanged = uploadFileHandler();

    function uploadFileHandler() {
        return function(ele) {
            httpRequestSrv.upload('/api/v1/wd/common/image', {
                image: ele.files[0]
            }).then(res => {
                console.log(res.data)
            }, err => {
                toastSrv(err)
            }).finally (() => {
                ele.value = ''; // 修复选择同一个文件无法触发onchange事件
            })
        }
    }

}