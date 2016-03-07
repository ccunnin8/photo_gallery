//SEARCH BOX 
//********************************************************//
$searchBox = $("input");
$images = $("img");
$container = $(".container");
function showAllBoxes() {
	$.each($images,function(index,value){
		var $new_image = $("<div class='thumbnail'></div>").append($(this));
		$container.append($new_image);
	});
}
function searchEmpty(){
	return ($searchBox.val() === "");
}
//Compare to alternative or caption of image 
function imageSearch(expression,string) {
	return expression.test(string);
}
$searchBox.keyup(function(){
	//Get information from search box
	var textInSearchBox = $searchBox.val();
	var tester = new RegExp(textInSearchBox,"g");
	for (var i = 0; i < $images.length; i++ ){ 
		//if search value = alt/caption of image 
		if (imageSearch(tester,$images[i].alt) && $searchBox.val() !== "" ) {
			$($images[i]).parent().show();
		}
		else {
			$($images[i]).parent().remove();
		}
	}
	if (searchEmpty()){
		showAllBoxes();
	}
	$(".small-img").on("click",clickOnThumbnail);
});

$(".small-img").on("click",clickOnThumbnail);
//PHOTOVIEWER 
///******////////////////////////

function getPhotoUrl(thumbnail) {
	var photo = thumbnail.attr("src");
	var photo = photo.slice(17,photo.length);
	 var bigger_photo = "Photos/" + photo;
	 return bigger_photo;
}
//When user clicks on thumbnail large image shos
function clickOnThumbnail() {
	$photoBox.css("background","url(" + getPhotoUrl($(this)) + ") no-repeat");
	$photoBox.css("background-size","contain");
	$container.append($photoBox);
	$("html").css("background","gray");
	//All other images are not visible
	$(".thumbnail").addClass("greyed-out");
	$(".small-img").hide();
}

$photoBox = $("<div class='large-img'></div>");
$(".thumbnail").on("click",clickOnThumbnail);
//When user clicks on thumbnail
$(document).mouseup(function(e) {
	if (!$photoBox.is(e.target) && $photoBox.has(e.target).length === 0) {
		$photoBox.remove();
		$("html").css("background","white");
		$("img").removeClass("greyed-out");
		$('.small-img').show();
	}
});

//User can scroll to other images using left and right arrows 





















