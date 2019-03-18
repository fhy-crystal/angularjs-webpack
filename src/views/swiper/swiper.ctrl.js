ctrl.$inject = ['$scope', '$timeout', 'toastSrv'];
export default function ctrl($scope, $timeout, toastSrv) {
	$scope.slides = [{
		imageUrl: 'https://picsum.photos/750/300'
	}, {
		imageUrl: 'https://picsum.photos/750/301'
	}, {
		imageUrl: 'https://picsum.photos/750/302'
	}];
	let mySwiper = null;
	if (mySwiper) {
		mySwiper = null;
	}
	$timeout(function() {
		// not depend on jQuery
		mySwiper = new Swiper('.swiper-container', {
			autoplay: 3000,
			loop: true,
			autoplayDisableOnInteraction: false,
			observer: true, // 修改swiper自己或者子元素时，自动初始化swiper
			observeParents: true, // 修改swiper的父元素时，自动初始化swiper
			pagination: '#swiper-pagination',
			onClick: function(swiper) {
				var item = JSON.parse(swiper.clickedSlide.attributes['data-item'].nodeValue);
				console.log(item)
			}
		})
	}, 0)
}