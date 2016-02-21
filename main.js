//SEARCH BOX 
//********************************************************//
$searchBox = $("input");
$images = $("img");

function showAllBoxes() {
	$.each($images,function(index,value){
			$(this).show();
		});
}
function searchEmpty(){
	return ($searchBox.val() === "");
}

function imageSearch(expression,string) {
	return expression.test(string);
}
$searchBox.keyup(function(){
	var textInSearchBox = $searchBox.val();
	var tester = new RegExp(textInSearchBox,"g");
	for (var i = 0; i < $images.length; i++ ){ 
		if (imageSearch(tester,$images[i].alt) && $searchBox.val() !== "" ) {
			$($images[i]).show();
		}
		else {
			$($images[i]).hide();
		}
	}
	if (searchEmpty()){
		showAllBoxes();
	}
});
//Get information from search box
//Compare to alternative or caption of image 
//if search value = alt/caption of image 
//show image
//else hide all other none matching images 


//PHOTOVIEWER 

//When user clicks on thumbnail
//Large image appears on screen with caption
//All other images are not visible
//User can scroll to other images using left and right arrows 