toast.$inject = ['$timeout'];
export default function toast($timeout) {
	return function(data) {
		var msg = '';
		if (angular.isString(data)) {
			msg = data;
		}
		var $ele = document.getElementsByClassName('wToast')[0];
		$ele.style.display = 'block';
		$ele.innerText = msg;
		$timeout(() => {
			$ele.style.display = 'none';
		}, 3000)
	}
}