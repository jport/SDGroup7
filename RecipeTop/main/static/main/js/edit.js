let unitOptions = ["cup(s)", "kg", "grams", "lbs", "ounces", "ml", "units", "tbsp", "tsp", "handfuls"];

document.addEventListener('DOMContentLoaded', function() {
    let title_modal = document.getElementById("title_modal");
    let title_modal_instance = M.Modal.init(title_modal, opacity=0.9,startingTop='40%');

    let description_modal = document.getElementById("description_modal");
    let description_modal_instance = M.Modal.init(description_modal, opacity=0.9,startingTop='40%');

    let ingredients_modal = document.getElementById("ingredients_modal");
    let ingredients_modal_instance = M.Modal.init(ingredients_modal, opacity=0.9,startingTop='40%');

    let utensils_modal = document.getElementById("utensils_modal");
    let utensils_modal_instance = M.Modal.init(utensils_modal, opacity=0.9,startingTop='40%');

    let method_modal = document.getElementById("method_modal");
    let method_modal_instance = M.Modal.init(method_modal, opacity=0.9,startingTop='40%');

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

	let utensil_edits= document.getElementById("edit_utensils");
	utensil_edits.onclick=function(){
		utensils_modal_instance.open();
	}

	let method_edits= document.getElementById("edit_steps");
	method_edits.onclick=function(){
		method_modal_instance.open();
	}


	let ingredient_selector = document.getElementById('ing_select');
    let ingredient_selector_instance = M.FormSelect.init(ingredient_selector);
});

const addIngredient =()=>{
	let ingredient_table=document.getElementById("edit_ingredients_table");

	let ingredient=document.createElement("div");
	ingredient.classList.add("input-field");
	let ing=document.createElement("input");
	ing.setAttribute('type','text');
	ing.setAttribute('name','ingredient');
	ing.setAttribute('id', "autocomplete-input");
	ing.setAttribute('placeholder',"Enter your ingredient")
	ing.classList.add("autocomplete");
	ingredient.appendChild(ing)
	ingredient_table.appendChild(ingredient)

	let quantity=document.createElement("div");
	quantity.classList.add("input-field");
	let q=document.createElement("input");
	q.setAttribute("type","text");
	q.setAttribute("name",'quantity');
	q.setAttribute("placeholder", "Enter a quantity")
	quantity.appendChild(q);
	ingredient_table.appendChild(quantity);

	let unit=document.createElement("div");
	unit.classList.add("input-field");
	let u=document.createElement("select");
	u.setAttribute("id","ing_select");
	u.setAttribute("name","unit");
	let default_op=document.createElement("option");
	default_op.setAttribute("value","");
	default_op.setAttribute("selected",true);
	default_op.setAttribute("disabled",true);
	default_op.innerHTML='Choose the unit';
	u.appendChild(default_op);

	for(let i = 1;i <= unitOptions.length; i++){
        let option = document.createElement('option');
            option.value = i
            option.innerHTML = unitOptions[i-1];
        

        u.appendChild(option);
    }

	unit.appendChild(u);
	ingredient_table.appendChild(unit);

	let instance = M.FormSelect.init(u);

    loadAutoComplete()
  }



