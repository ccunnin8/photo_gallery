//SEARCH BOX 
//********************************************************//
$searchBox = $("input");
$images = $("img");
$container = $(".container")
function showAllBoxes() {
	$.each($images,function(index,value){
			$container.append($(this));
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
			$($images[i]).show();
		}
		else {
			$($images[i]).remove();
		}
	}
	if (searchEmpty()){
		showAllBoxes();
	}
});

//PHOTOVIEWER 

//When user clicks on thumbnail
//Large image appears on screen with caption
//All other images are not visible
//User can scroll to other images using left and right arrows 