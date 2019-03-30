document.addEventListener('DOMContentLoaded', function() {
    let title_modal = document.getElementById("title_modal");
    var title_modal_instance = M.Modal.init(title_modal);


    let title_edits= document.getElementById("edit_title");
	title_edits.onclick=function(){
		title_modal_instance.open();
		image=document.getElementById("image_index");
		image.style.zIndex="-1"

	}

	let description_edits= document.getElementById("edit_description");
	description_edits.onclick=function(){
		alert("hello");
	}

	let ingredient_edits= document.getElementById("edit_ingredients");
	ingredient_edits.onclick=function(){
		alert("hello");
	}
});



