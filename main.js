//SEARCH BOX 
//********************************************************//
var $searchBox = $("input");
var $images = imageObjects;
var $container = $(".container");
var $image = $("<img class='small-img'>")
showAllBoxes();
function showAllBoxes() {
	$.each($images,function(index,value){
		var url = "Photos/Thumbnails/" + this.name;
		var $new_image = $("<div class='thumbnail'><img class='small-img " + this.title + "' src=" + url + "></div>");
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
//takes value of the searchbox, compares globally to caption of all photos and shows the photos that match, removes what do not match
function removeNotMatchImages() {
	var textInSearchBox = $searchBox.val();
	var tester = new RegExp(textInSearchBox,"g");
	for (var i = 0; i < $images.length; i++ ){ 
		//if search value = alt/caption of image 
	if ((!imageSearch(tester,$images[i].caption) && !imageSearch(tester,$images[i].title)) && !searchEmpty() ) {
		$("." + $images[i].title).parent().remove();
		}
	}
}
//when the search bar is completely empty, removes all current boxes and adds back all the original photos
function reverseToOriginal(){
	if (searchEmpty()){
		$(".thumbnail").remove();
		showAllBoxes();
	}
}

$searchBox.keyup(function(){
	removeNotMatchImages();
	reverseToOriginal();
	$(".small-img").on("click",clickOnThumbnail);
})

$(".small-img").on("click",clickOnThumbnail);
//PHOTOVIEWER 
///******////////////////////////
var $photoBox = $("<div class='large-img'></div>");
var $leftClick = $("<div class='left-click'><</div>");
var $rightClick = $("<div class='right-click'>></div>");
$caption = $("<p class='caption'></p>");
var total_num_slides = 12;

function getPhotoUrl(thumbnail) {
	var photo = thumbnail.attr("src");
	photo = photo.slice(18);
	caption(parseInt(photo)-1);
	var bigger_photo = "Photos/" + photo;
	return bigger_photo;
}
function getBackgroundImage(div) {
	return div.css("background-image");
}
function slideNumber(slide){
	return parseInt(slide.slice(-7));
}
function nextImageUrl(number) {
	var oldUrl = getBackgroundImage($photoBox);
	if (number < 10 ) {
		var insertNum = "0" + number;
	}
	else {
		var insertNum = number.toString();
	}
	caption(number-1);
	return oldUrl.slice(0,-7) + insertNum + oldUrl.slice(-5); 
}
//When user clicks on thumbnail large image shows

function clickOnThumbnail() {
	$photoBox.css("background","url(" + getPhotoUrl($(this)) + ") no-repeat");
	$photoBox.css("background-size","contain");
	$container.append($photoBox);
	$photoBox.after($leftClick);
	$photoBox.before($rightClick);
	$(".container").append($caption);
	$("html").css("background","gray");
	//All other images are not visible
	$(".thumbnail").addClass("greyed-out");
	$(".small-img").hide();
	$leftClick.on("click",leftClick);
	$rightClick.on("click",rightClick);
}

$(".thumbnail").on("click",clickOnThumbnail);
//When user clicks on thumbnail
$(document).mouseup(function(e) {
	if (!$photoBox.is(e.target) && $photoBox.has(e.target).length === 0 && !$leftClick.is(e.target) && !$rightClick.is(e.target)) {
		$photoBox.remove();
		$leftClick.remove();
		$rightClick.remove();
		$caption.remove();
		$("html").css("background","white");
		$("img").removeClass("greyed-out");
		$('.small-img').show();
	}
});

//User can scroll to other images using left and right arrows 
function leftClick() {
	var slideUrl = getBackgroundImage($photoBox);
	var slideNum = slideNumber(slideUrl);
	if (slideNum - 1 === 0 ) {
		slideNum = total_num_slides;
	}
	else {
		slideNum -= 1;
	}
	$photoBox.css("background-image",nextImageUrl(slideNum));
}

function rightClick() {
	var slideUrl = getBackgroundImage($photoBox);
	var slideNum = slideNumber(slideUrl);
	if (slideNum + 1 > total_num_slides) {
		slideNum = 1;
	}
	else {
		slideNum += 1;
	}
	$photoBox.css("background-image",nextImageUrl(slideNum));
}
function caption(slideNum) {
	$caption.text($images[slideNum].caption);
}
