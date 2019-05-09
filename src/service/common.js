commonJs.$inject = ['$window'];

export default function commonJs($window) {
	// get query strings in url
	this.getQueryString = () => {
		let url = decodeURI($window.location.href);
		let theRequest = new Object();
		if (url.indexOf('?') != -1) {
			let str = url.split('?')[1];
			let strs = str.split('&');
			for (let i = 0; i < strs.length; i++) {
				theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
			}
		}
	}
	// check wechat browser
	this.wechatBrowser = () => {
		let ua = navigator.userAgent.toLowerCase();
		return ua.indexOf('micromessenger') != -1;
	}
	// set session
	this.setSession = (key, value) => {
		this.removeSession(key);
		value = JSON.stringify(value);
		$window.sessionStorage.setItem(key, encodeURIComponent(value));
	}
	// get session
	this.getSession = key => JSON.parse(decodeURIComponent($window.sessionStorage.getItem(key)))
	// remove session
	this.removeSession = key => $window.sessionStorage.removeItem(key)
	// remove all session 
	this.removeAllSession = () => $window.sessionStorage.clear()
	// wechat share
	this.wxShare = (link=$window.location.href, shareTitle='angularjs-webpack', desc='descript', imgUrl="http://www.baidu.com", successcall) => {
		if (this.wechatBrowser()) {
			wx.ready(function() {
				wx.onMenuShareTimeline({
					title: shareTitle,
					link: link,
					imgUrl: imgUrl,
					trigger: function(res) {

					},
					success: function(res) {
						successcall();
					},
					cancel: function(res) {

					},
					fail: function(res) {

					}
				})
			})
		}
	}
}