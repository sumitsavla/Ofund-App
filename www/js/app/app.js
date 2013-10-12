$(function() {
	var util, selectedCatEl, bizimage,currentListingArr, segmentedOptions = {
		id: 'bizCategories',
      	labels : ["Home Services", "Health", "Restaurants", "Business Services", "Shopping", "Travel"],
		selected: 1
	};

	var segmentedResponse = function(e) {
		var selectedPanel = $('.segmented').find('.selected').index();
		e.stopPropagation();
		$("#pageHeader h1").html(segmentedOptions.labels[selectedPanel]);
	};
	$('.segmented').UISegmented({callback:segmentedResponse});
	$('.segmented').UIPanelToggle('#toggle-panels',function(){$.noop;});

	//$.UISlideout();
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
  			   navigator.geolocation.getCurrentPosition(this.getLatLong, function() {
  			   	alert("Unable to get location information!");
  			   });
    		} else {
    			util.getLatLong();
    			//alert("Geolocation is not supported by this browser.");
    			
			}
		},

		getLatLong: function(position) {
			API.listByLocation(37.376823699999996, -121.92294779999997, this.displayLocalListings, 1);
		},

		displayLocalListings: function(listingsArr) {
			console.log(listingsArr);
			currentListingArr = listingsArr;
			$("#nearby .list").empty();
			$("#nearby .list").append(util.genListingContent(listingsArr))
			$("#nearby").show();
		},

		genListingContent: function(listingsArr){
			var i, listingContent = ""; 
			for(i = 0; i < listingsArr.length; i++) {
				listingContent = listingContent + "<li class='comp'>\
							<aside>\
								<img title='Hurry and Harm' src="+bizimage+" height='80px'>\
							</aside>\
							<div>\
								<h3>"+util.toTitleCase(listingsArr[i].name)+"</h3>\
								<h4>"+util.toTitleCase(listingsArr[i].codeDescription)+"</h4>\
							</div>\
						</li>";
			}
			return listingContent;
		},

		displayListings: function(data){
			currentListingArr = data;
			$(selectedCatEl+" .list").empty();
			$(selectedCatEl+" .list").append(util.genListingContent(data))
			$(selectedCatEl).show();
		},

		toTitleCase: function(str) {
    		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		}
	};

	util.getLatLong();

	$('#homeBtn').on('click', function(evt) {
		
		selectedCatEl = $("#"+evt.target.id);
		bizimage = "css/images/icon/home.jpeg";
		API.listByCategory("home_services", util.displayListings, 1);
		$("#keyword").val("Home Services")
		selectedCatEl.css("background-color","#b5c03a");
		window.setTimeout(function(){
			console.log("dsd");
			selectedCatEl.css("background-color","#efeff4");
		}, 1000);
	});
	$('#healthBtn').on('click', function(evt) {
		selectedCatEl = $("#"+evt.target.id);
		bizimage = "css/images/icon/home.jpeg";
		selectedCatEl.css("background-color","#b5c03a");
		window.setTimeout(function(){
			console.log("dsd");
			selectedCatEl.css("background-color","#efeff4");
		}, 1000)
				$("#keyword").val("Health Services")

		API.listByCategory("health", util.displayListings, 1);

	});
	$('#bizBtn').on('click', function(evt) {
		selectedCatEl = $("#"+evt.target.id);
		bizimage = "css/images/icon/bizs.jpeg";
				$("#keyword").val("Business Services")

	selectedCatEl.css("background-color","#b5c03a");
		window.setTimeout(function(){
			console.log("dsd");
			selectedCatEl.css("background-color","#efeff4");
		}, 1000);
		API.listByCategory("business_services", util.displayListings, 1);
	});
	$('#restaurantsBtn').on('click', function(evt) {
		selectedCatEl = $("#"+evt.target.id);
		bizimage = "css/images/icon/rest.jpeg";
				$("#keyword").val("Restaurants")

	selectedCatEl.css("background-color","#b5c03a");
		window.setTimeout(function(){
			console.log("dsd");
			selectedCatEl.css("background-color","#efeff4");
		}, 1000);
		API.listByCategory("restaurant", util.displayListings, 1);
	});
	$('#shoppingBtn').on('click', function(evt) {
		selectedCatEl = $("#"+evt.target.id);
		bizimage = "css/images/icon/home.jpeg";
				$("#keyword").val("Shopping")

	selectedCatEl.css("background-color","#b5c03a");
		window.setTimeout(function(){
			console.log("dsd");
			selectedCatEl.css("background-color","#efeff4");
		}, 1000);
		API.listByCategory("shopping", util.displayListings, 1);
	});
	$('#travelBtn').on('click', function(evt) {
		selectedCatEl = $("#"+evt.target.id);
		bizimage = "css/images/icon/travel.jpeg";
				$("#keyword").val("Travel")
selectedCatEl.css("background-color","#b5c03a");
		window.setTimeout(function(){
			console.log("dsd");
			selectedCatEl.css("background-color","#efeff4");
		}, 1000);
	//	$(selectedCatEl).css("background-color","#b5c03a");
		API.listByCategory("travel", util.displayListings, 1);
	});

	$('#donateBtn').on('click', function(evt) {
		$('#donate').removeClass('previous');
		$.UIGoToArticle('#donate');
	});
	$('ul.list').on('click', function(evt) {
		$('#details').removeClass('previous');
		$.UIGoToArticle('#details');
	});
	$('#nearbyBtn').on('click', function(evt) {
		util.getLatLong();
		$('#main').attr('class',' current ');
		$.UIGoToArticle('#main');
		$('#main').attr('class',' current ');
	});
	$('#searchForm').on('submit', function(evt) {
		selectedCatEl = $("#nearby");
		API.listByKeyword($("#keyword").val(), util.displayListings, 1);
	});


	$(document).ready(function() {
		console.log('touch start');
	//	document.addEventListener("touchstart", function() {},false);
	 $("a").each(function() { // have to use an `each` here - either a jQuery `each` or a `for(...)` loop
                var onClick; // this will be a function
                var firstClick = function() {
                    onClick = secondClick;
                    return false;
                };
                var secondClick = function() {
                    onClick = firstClick;
                    return true;
                };
                onClick = firstClick;
                $(this).click(function() {
                    return onClick();
                });
            });
	});
	
});