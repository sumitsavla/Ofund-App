(function() {

	var API,
		url = "http://ofund.aws.af.cm/?",
		appid = "",
		ajax,
		serialize;

	ajax = function(query, callback) {
		console.log("Requesting... "+url + query);
		//$.body.UIBlock();
		$.ajax({
			url: url + query,
			type: "GET",
			headers: {
				appid: appid
			},
			dataType: "json",
			success: function(data) {
				$.body.UIUnblock();
				callback(data.data);
			},
			error: function() {
				//hack - 
				$.body.UIUnblock();
				callback([]);
			},
			complete: function() {
				$.body.UIUnblock();
			}
		});
	};

	serialize = function(obj) {
		var str = [];
		for(var p in obj)
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		return str.join("&");
	};

	API = {
		listByLocation: function(lat, lon, callback, page) {
			ajax(serialize({
				lat:lat,
				lon:lon,
				page:page
			}), callback);
		},

		listByKeyword: function(keyword, callback, page) {
			ajax(serialize({
				keyword:keyword,
				page:page
			}), callback);
		},

		listByCategory: function(category, callback, page) {
			ajax(serialize({
				category:category,
				page:page
			}), callback);
		}				
	};

	window.API = API;
}());