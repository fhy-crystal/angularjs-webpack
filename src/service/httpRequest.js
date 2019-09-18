// extend object
function extendObj(target, source) {
	if (Object.hasOwnProperty('assign')) {
		Object.assign(target, source);
	} else {
		for (var prop in source) {
			if (source.hasOwnProperty(prop)) {
				target[prop] = source[prop];
			}
		}
	}
}

httpRequest.$inject = ['$http', '$q', 'ENV', 'loadingSrv'];

export default function httpRequest($http, $q, ENV, loadingSrv) {
	var config = {};

	var request = (header, isLoad) => {
		// var deferred = $q.defer();

		// config.headers = {
		// 	'Content-Type': 'application/json; charset=UTF-8'
		// };
		// extendObj(config.headers, header);
		// isLoad && loadingSrv.show();
		// $http(config)
		// 	.then(res => {
		// 		isLoad && loadingSrv.hide();
		// 		deferred.resolve(res);
		// 	}, err => {
		// 		isLoad && loadingSrv.hide();
		// 		deferred.reject(err);
		// 	})
		// return deferred.promise;

		return new Promise((resolve, reject) => {
			config.headers = {
				'Content-Type': 'application/json; charset=UTF-8'
			};
			extendObj(config.headers, header);
			isLoad && loadingSrv.show();
			$http(config)
				.then(res => {
					isLoad && loadingSrv.hide();
					resolve(res);
				}, err => {
					isLoad && loadingSrv.hide();
					reject(err);
				})
		})
	};

	this.get = (url, params, header = {}, isLoad = true) => {
		config = {
			method: 'GET',
			url: ENV.ip + url,
			params: params
		};
		return request(header, isLoad);
	};

	this.post = (url, data, header = {}, isLoad = true) => {
		config = {
			method: 'POST',
			url: ENV.ip + url,
			data: data
		};
		return request(header, isLoad);
	};

	this.formPost = (url, data, header = {}, isLoad = true) => {
		config = {
			method: 'POST',
			url: ENV.ip + url,
			data: data,
			transformRequest: function(obj) {
				let str = [];
				for (let s in obj) {
					str.push(encodeURIComponent(s) + '=' + encodeURIComponent(obj[s]));
				}
				return str.join('&');
			}
		};
		header['Content-Type'] = 'application/x-www-form-urlencoded';
		return request(header, isLoad);
	};

	this.upload = (url, data, header = {}, isLoad = true) => {
		config = {
			method: 'POST',
			url: ENV.ip + url,
			data: data,
			transformRequest: function(data) {
				var formData = new FormData();
				formData.append('file', data);
				return formData;
			}
		};
		header['Content-Type'] = undefined;
		return request(header, isLoad);
	};

	this.export = (url, data, filename, isLoad) => {
		var deferred = $q.defer();
		config = {
			method: 'POST',
			url: ENV.ip + url,
			data: data,
			responseType: 'blob',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			}
		};
		isLoad && loadingSrv.show();
		$http(config)
			.then(res => {
				isLoad && loadingSrv.hide();
				let url = window.URL.createObjectURL(res.data);
				let link = document.createElement('a');
				link.style.display = 'none';
				link.href = url;
				link.setAttribute('download', filename);
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}, err => {
				isLoad && loadingSrv.hide();
				deferred.reject(err);
			})
		return deferred.promise;
	}
}