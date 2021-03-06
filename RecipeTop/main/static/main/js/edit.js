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



//let list_of_utensils = []


const addUtensil=()=>{
	let table_of_utensils =document.getElementById('edit_table_of_utensils');
    utensil_field = document.getElementById('new_utensil');
    //list_of_utensils.push(utensil_field.value);


    table_of_utensils.appendChild(createNewUtensil(utensil_field.value));

    utensil_field.value = "";
}

function createNewUtensil(value)
{
    let col = document.createElement("td");
    let label = document.createElement("label");
    let input = document.createElement("input");
    let span = document.createElement("span");

    input.type = "checkbox";
    input.value = value;
    input.name = "utensils";
    input.checked = true;
    span.innerHTML = value;

    col.appendChild(label);
    label.appendChild(input);
    label.appendChild(span);

    return col;
}

let steps = $('.recipe_steps_modal')
/*
<span class="step_number">{{step.stepNumber}}</span>
<div class="input-field">
	<input type="text" name="step_text" value="{{step.text}}">
</div> 
<span></span>
<a class="btn-floating btn-large waves-effect waves-light blue-grey "><i class="material-icons ">delete</i></a>
*/
function addStep()
{
	let stepNumber = (steps.children().length/4)+1;
	let span = document.createElement('span');
	span.className = "step_number";
	span.innerHTML = stepNumber;

	let div = document.createElement('div');
	div.className = "input-field"

	let input = document.createElement('input');
	input.type = "text"
	input.name = "step_text"
	div.appendChild(input);

	let stupidSpan = document.createElement('span');
	let a = document.createElement('a');
	a.className = "btn-floating btn-large waves-effect waves-light blue-grey"

	let iElem = document.createElement('i');
	iElem.className = "material-icons"
	iElem.innerHTML = "delete";
	iElem.onclick = function(){deleteStep(iElem)};

	a.appendChild(iElem);

	steps.append(span);
	steps.append(div);
	steps.append(stupidSpan);
	steps.append(a);	
}

function deleteStep(btn)
{
	let a = btn.parentElement;
	let stupidSpan = a.previousElementSibling;
	let div = stupidSpan.previousElementSibling;
	let span = div.previousElementSibling;

	let parent = a.parentElement;
	parent.removeChild(span);
	parent.removeChild(div);
	parent.removeChild(stupidSpan);
	parent.removeChild(a);

	for(let i = 0; i < steps.children().length; i += 4)
	{
		steps.children()[i].innerHTML = (i/4)+1;
	}
}