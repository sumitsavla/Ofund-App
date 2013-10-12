$(function() {
	var segmentedOptions = {
		id: 'bizCategories',
      	labels : ["Home Services", "Health", "Restaurants", "Business Services", "Shopping", "Travel"],
		selected: 1
	};
	var segmentedResponse = function(e) {
		var selectedPanel = $('.segmented').find('.selected').index();
		e.stopPropagation();
		$("#pageHeader h1").html(segmentedOptions.labels[selectedPanel]);
	};
	var newSegmented = $.UICreateSegmented(segmentedOptions);
	//$('#segmentedPanel').append(newSegmented);
	$('.segmented').UISegmented({callback:segmentedResponse});
	$('.segmented').UIPanelToggle('#toggle-panels',function(){$.noop;});
});