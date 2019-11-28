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
		// 		deferred.resolve(res);
		// 	}, err => {
		// 		deferred.reject(err);
		// 	})
		// 	.finally(() => {
		// 		isLoad && loadingSrv.hide();
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
					if (res.data.statusCode === 200) {
						resolve(res.data);
					} else {
						reject(res.data);
					}
				}, err => {
					console.log(err)
					reject({
						desc: '网络错误，请稍后再试'
					});
				})
				.finally(() => {
					isLoad && loadingSrv.hide();
				})
		})
	};

	this.get = (url, params, header = {}, isLoad = true) => {
		config = {
			method: 'GET',
			url: /http/.test(url) ? url : `${ENV.ip}${url}`,
			params: params
		};
		return request(header, isLoad);
	};

	this.post = (url, data, header = {}, isLoad = true) => {
		config = {
			method: 'POST',
			url: /http/.test(url) ? url : `${ENV.ip}${url}`,
			data: data
		};
		return request(header, isLoad);
	};

	this.formPost = (url, data, header = {}, isLoad = true) => {
		config = {
			method: 'POST',
			url: /http/.test(url) ? url : `${ENV.ip}${url}`,
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
			url: /http/.test(url) ? url : `${ENV.ip}${url}`,
			data: data,
			transformRequest: function(data) {
				let formData = new FormData();
				if (Object.keys(data) > 0) {
					for (let key in data) {
						formData.append(key, data[key]);
					}
				}
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
			url: /http/.test(url) ? url : `${ENV.ip}${url}`,
			data: data,
			responseType: 'blob',
			headers: {
				'Content-Type': 'application/json; charset=UTF-8'
			}
		};
		isLoad && loadingSrv.show();
		$http(config)
			.then(res => {
				let url = window.URL.createObjectURL(res.data);
				let link = document.createElement('a');
				link.style.display = 'none';
				link.href = url;
				link.setAttribute('download', filename);
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}, err => {
				deferred.reject(err);
			})
			.finally(() => {
				isLoad && loadingSrv.hide();
			})
		return deferred.promise;
	}
}