document.addEventListener('DOMContentLoaded', function() {
    let title_modal = document.getElementById("title_modal");
    let title_modal_instance = M.Modal.init(title_modal, opacity=0.9,startingTop='40%');

    let description_modal = document.getElementById("description_modal");
    let description_modal_instance = M.Modal.init(description_modal, opacity=0.9,startingTop='40%');

    let ingredients_modal = document.getElementById("ingredients_modal");
    let ingredients_modal_instance = M.Modal.init(ingredients_modal, opacity=0.9,startingTop='40%');


    let title_edits= document.getElementById("edit_title");
	title_edits.onclick=function(){
		title_modal_instance.open();

	}

	let description_edits= document.getElementById("edit_description");
	description_edits.onclick=function(){
		description_modal_instance.open();
		
	}

	let ingredient_edits= document.getElementById("edit_ingredients");
	ingredient_edits.onclick=function(){
		ingredients_modal_instance.open();
	}
});




