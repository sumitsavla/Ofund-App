(function() {

	var API,
		url = "http://locahost:7007/?",
		appid = "ohack_2013_ebay_ofund",
		ajax;

	ajax = function(query, callback) {
		$.ajax({
			url: url + query,
			type: "GET",
			headers: {
				appid: appid
			},
			dataType: "json",
			success: function(data) {
				callback(data.data);
			},
			error: function() {
				//hack - 
				callback([]);
			}
		});
	};

	API = {
		listByLocation: function(lat, lon, callback, page) {
			ajax("", callback);
		}
	};

	console.log(API);

	window.API = API;
}());