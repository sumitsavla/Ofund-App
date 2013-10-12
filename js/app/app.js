$(function() {
	var util, segmentedOptions = {
		id: 'bizCategories',
      	labels : ["Home Services", "Health", "Restaurants", "Business Services", "Shopping", "Travel"],
		selected: 1
	};

	var segmentedResponse = function(e) {
		var selectedPanel = $('.segmented').find('.selected').index();
		e.stopPropagation();
		$("#pageHeader h1").html(segmentedOptions.labels[selectedPanel]);
	};
//	var newSegmented = $.UICreateSegmented(segmentedOptions);
	$('.segmented').UISegmented({callback:segmentedResponse});
	$('.segmented').UIPanelToggle('#toggle-panels',function(){$.noop;});

	$.UISlideout();
	$('.slide-out > section').append(
		'<h2>Your Stuff</h2>\
		<ul class="list">\
			<li data-show-article="music"><h3>Music</h3></li>\
			<li data-show-article="pictures"><h3>Pictures</h3></li>\
			<li data-show-article="recipes"><h3>Recipes</h3></li>\
			<li data-show-article="contacts"><h3>Contacts</h3></li>\
			</ul>'
	);

	util = {
		getLocalListings: function() {
			if (navigator.geolocation) {
  			   navigator.geolocation.getCurrentPosition(this.getLatLong);
    		} else {
    			alert("Geolocation is not supported by this browser.");
			}
		},

		getLatLong: function(position) {
		//	util.displayLocalListings(position);
			API.listByLocation(position.coords.latitude, position.coords.longitude, this.displayLocalListings, 1);
		},

		displayLocalListings: function(listingsArr) {
			var i, listingContent = "";
		/*	listingsArr = [
    {
      "phoneNumber1": 5107341676,
      "city": "EL CERRITO",
      "code": 488510,
      "name": "MANUEL BALTAZAR DE DIOS",
      "zip": "94530-2379",
      "loc": {
        "lat": 37.917215,
        "lon": -122.311445
      },
      "phone2": "",
      "codeDescription": "FREIGHT TRANSPORTATION ARRANGEMENT ",
      "phone1Label": "Home",
      "county": "CONTRA COSTA",
      "street": "10944 SAN PABLO AVE APT 712",
      "productServiceDescription": "CONTRACTOR",
      "phone2Label": null,
      "_id": "52592f7e4f6614b81a000001"
    },
    {
      "phoneNumber1": 5109789542,
      "city": "OAKLAND",
      "code": 454390,
      "name": "LA VERBENA LLC II",
      "zip": "94603",
      "loc": {
        "lat": 37.730335,
        "lon": -122.1828625
      },
      "phone2": "MOBILE",
      "codeDescription": "FRUIT STANDS TEMPORARY",
      "phone1Label": "MOBILE",
      "county": "ALAMEDA",
      "street": "219 KERWIN AVE",
      "productServiceDescription": "FOOD/RESTAURANT",
      "phone2Label": 5109789542,
      "_id": "52592f7e4f6614b81a000002"
    },
    {
      "phoneNumber1": null,
      "city": "SAUSALITO",
      "code": 722511,
      "name": "MANGIA E. BEVI, INC DBA DIVINO SAUSALITO",
      "zip": "94965-2116",
      "loc": {
        "lat": 37.85838750000001,
        "lon": -122.4849474
      },
      "phone2": "Mobile",
      "codeDescription": "FULL SERVICE  RESTAURANTS",
      "phone1Label": "Home",
      "county": "MARIN",
      "street": "37 CALEDONIA ST",
      "productServiceDescription": "FOOD/RESTAURANT",
      "phone2Label": 4152332978,
      "_id": "52592f7e4f6614b81a000003"
    }];*/
			console.log(listingsArr);
			for(i = 0; i < listingsArr.length; i++){
				listingContent = listingContent + "<li class='comp'>\
							<aside>\
								<img title='Hurry and Harm' src='css/images/music/Hurry and Harm.png' height='80px'>\
							</aside>\
							<div>\
								<h3>"+util.toTitleCase(listingsArr[i].name)+"</h3>\
								<h4>"+util.toTitleCase(listingsArr[i].codeDescription)+"</h4>\
							</div>\
						</li>";
				
			}
			$("#nearby .list").append(listingContent)
			$("#nearby").show();
		},

		displayListings: function(data){

		},

		toTitleCase: function(str) {
    		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}
	};

	util.getLocalListings();

	$('#home').on('click', function() {
		API.listByCategory("home_services", util.displayListings, 1);
	});
	$('#health').on('click', function() {
		API.listByCategory("home_services", util.displayListings, 1);
	});
	$('#biz').on('click', function() {
		API.listByCategory("home_services", util.displayListings, 1);
	});
	$('#restaurants').on('click', function() {
		API.listByCategory("home_services", util.displayListings, 1);
	});
	$('#shopping').on('click', function() {
		API.listByCategory("home_services", util.displayListings, 1);
	});
	$('#travel').on('click', function() {
		API.listByCategory("home_services", util.displayListings, 1);
	});
	
});