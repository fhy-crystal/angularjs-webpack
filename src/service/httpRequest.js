httpRequest.$inject = ['$http', '$q', 'ENV'];

export default function httpRequest($http, $q, ENV) {
	var config = {};

	var request = (header) => {
		var deferred = $q.defer();

		config.headers = {
			'Content-Type': 'application/json; charset=UTF-8'
		};
		Object.assign(config.headers, header);

		$http(config)
			.then(res => {
				deferred.resolve(res);
			}, err => {
				deferred.reject(err);
			})
		return deferred.promise;
	};

	this.get = (url, params, header = {}) => {
		config = {
			method: 'GET',
			url: ENV.ip + url,
			params: params
		};
		return request(header);
	};

	this.post = (url, data, header = {}) => {
		config = {
			method: 'POST',
			url: ENV.ip + url,
			data: data
		};
		return request(header);
	};

	this.upload = (url, data, header = {}) => {
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
		return request(header);
	}


}