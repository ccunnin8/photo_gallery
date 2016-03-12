//SEARCH BOX 
//********************************************************//
var $searchBox = $("input");
var $images = imageObjects;
var $container = $(".container");
var $image = $("<img class='small-img'>")

//runs through the javascript object with all the photos and displays them on the page when the page loads 
function showAllBoxes() {
	$.each($images,function(index,value){
		var url = "Photos/Thumbnails/" + this.name;
		var $new_image = $("<div class='thumbnail'><img class='small-img " + this.title + "' src=" + url + "></div>");
		$container.append($new_image);
	});
	$(".small-img").on("click",clickOnThumbnail);
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
		var $currentImage = $("." + $images[i].title);
		//if search value = alt/caption of image 
	if (!imageSearch(tester,$images[i].caption) && !imageSearch(tester,$images[i].title) && !searchEmpty() ) {
		$currentImage.parent().removeClass("thumbnail").addClass("hidden");
		}
	else {
		$currentImage.parent().addClass("thumbnail").removeClass("hidden");
		}
	} 
}
//when the search bar is completely empty, removes all current boxes and adds back all the original photos
showAllBoxes();

$searchBox.keyup(function(){
	removeNotMatchImages();
	$(".small-img").on("click",clickOnThumbnail);
})


//PHOTOVIEWER 
///******////////////////////////
var $photoviewer = $("<div class='photoviewer'></div>");
var $photoBox = $("<img class='large-img'></img>");
var $leftClick = $("<div class='left-click'><</div>");
var $rightClick = $("<div class='right-click'>></div>");
var $caption = $("<p class='caption'></p>");
var total_num_slides = 12;
//gets src of image from thumbnail, converts it to Large img src and changes 
//photobox attribute to the large img src 
function getPhotoUrl(thumbnail) {
	var photo = thumbnail.attr("src");
	photo = photo.slice(18);
	caption(parseInt(photo)-1);
	var bigger_photo = "Photos/" + photo;
	$photoBox.attr("src",bigger_photo);
}
function getBackgroundImage(img) {
	return img.attr("src");
}
function slideNumber(slide){
	return parseInt(slide.slice(-6));
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
	return 'Photos/' + insertNum + '.jpg'; 
}
//When user clicks on thumbnail large image shows

function clickOnThumbnail() {
	getPhotoUrl($(this));
	$container.append($photoviewer.append($photoBox).append($caption));
	$photoBox.after($leftClick);
	$photoBox.before($rightClick);
	$("html").css("background","gray");
	//All other images are not visible
	$(".thumbnail").addClass("greyed-out");
	$(".small-img").hide();
	$leftClick.on("click",leftClick);
	$rightClick.on("click",rightClick);
}

// $(".thumbnail").on("click",clickOnThumbnail);
//When user clicks on thumbnail
$(document).mouseup(function(e) {
	if (!$photoBox.is(e.target) && $photoBox.has(e.target).length === 0 && !$leftClick.is(e.target) && !$rightClick.is(e.target)) {
		$(".photoviewer").remove();
		$caption.remove();
		$("html").css("background","white");
		$("img").removeClass("greyed-out");
		$('.small-img').show();
	}
});
function changeImage(slideNum){
	$photoBox.attr("src",nextImageUrl(slideNum));
}
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
	changeImage(slideNum);
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
	changeImage(slideNum);
}
function caption(slideNum) {
	$caption.text($images[slideNum].caption);
}
