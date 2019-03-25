let key_word_input= document.getElementById("key_word_input");
let unitOptions = ["cup(s)", "kg", "grams", "lbs", "ounces", "ml", "units", "tbsp", "tsp", "handfuls"];
let instances = null
var utensil_modal_instance;
let added = false;
let focusChipInput = false;

document.addEventListener('DOMContentLoaded', function() {
    let chips = document.querySelectorAll('.chips');
    instances = M.Chips.init(chips, {placeholder:"Comma seperated", secondaryPlaceholder:"+Tag"});
    // var instance = M.Chips.getInstance(elems);

    let select = document.querySelectorAll('select');
    let select_instances = M.FormSelect.init(select);

    var utensil_modals = document.getElementById("utensil_modal");
    //alert(utensil_modals);
    utensil_modal_instance = M.Modal.init(utensil_modals);

    let ch = M.Chips.getInstance(chip);
    ch.$input[0].onfocus = function(){
        focusChipInput = true;
        if(added) return;
        added = true;

        let comma = $("[_key='\,']")[0];
        comma.onclick = function(){
            if(!focusChipInput) return;
            let val = ch.$input[0].value;
            val = val.replace(",", "");

            ch.addChip({tag:val});
            ch.$input[0].value = "";
        }
    }

    ch.$input[0].addEventListener("focusout", function(){focusChipInput = false;});
  });

let stars = document.getElementsByClassName("star_button");


var num_stars = 0;
let star_field = document.createElement('input');
star_field.required=true;
for (let i = 0, len = stars.length; i < len; i++) {
    stars[i].onclick = function (){
        
        let rating_container = document.getElementById("rating_container")
        num_stars = stars[i].id;
        //alert(num_stars.toString());
        star_field.type = "hidden";
        star_field.name = "rating";
        star_field.value = num_stars.toString();
        rating_container.appendChild(star_field);
        for (var j = 1; j <= num_stars; j++){
            let star_icon = document.getElementById(j.toString());
            //alert(star_icon);
            star_icon.innerHTML = '<i class="medium material-icons icon-teal">star</i>'; 
        }
        for (var k = num_stars*1 +1; k <= 5; k++){
            let star_icon = document.getElementById(k.toString());
            //alert(star_icon);
            star_icon.innerHTML = '<i class="medium material-icons icon-teal">star_outline</i>'; 
        }
    }
}
let cakes = document.getElementsByClassName("difficulty_button");
var num_cakes = 0;
let cake_field = document.createElement('input');
for (let i = 0, len = cakes.length; i < len; i++) {
    cakes[i].onclick = function (){
        
        let difficulty_container = document.getElementById("difficulty_container")
        num_cakes = cakes[i].id-100;
        //alert(num_stars.toString());
        cake_field.type = "hidden";
        cake_field.name = "difficulty";
        cake_field.value = num_cakes.toString();
        difficulty_container.appendChild(cake_field);
        for (var l = 101; l <= num_cakes*1 +100; l++){
            let cake_icon = document.getElementById(l.toString());
            //alert(l)
            cake_icon.innerHTML = '<i class="medium material-icons icon-teal">cake</i>'; 
        }
        for (var p = num_cakes*1 +101; p <= 105; p++){
            let cake_icon = document.getElementById(p.toString());
            //alert(p)
            cake_icon.innerHTML = '<i class="medium material-icons icon-grey">cake</i>'; 
        }
    }
}

  
let tables = document.getElementById('table');

const table =()=>{
    let tr= document.createElement('tr');
    for(let i=0;i<2;i++){
        let td = document.createElement('td');
        let input =document.createElement('input');
        if(i==0){
            input.name="ingredient";
            input.placeholder="Enter your ingredient";
            input.id = "autocomplete-input";
            input.className = "autocomplete"

            div = document.createElement('div');
            div.className = "input-field"
            div.appendChild(input);
            input = div;
        }
        else if(i==1){
            input.name="quantity";
            input.placeholder="Enter your quantity";
        }
        td.appendChild(input);
        tr.appendChild(td);
    }
    let select= document.createElement('select');
    select.name = "unit";
    let td = document.createElement('td');
    td.classList.add('input-field');

    for(let i = 0;i <= unitOptions.length; i++){
        let option = document.createElement('option');
        if(i==0)
        {
            option.innerHTML='Choose the unit';
            option.setAttribute('selected',true)
            option.setAttribute('disabled',true)
        }
        else
        {
            option.value = i
            option.innerHTML = unitOptions[i-1];
        }

        select.appendChild(option);
    }
    
    td.appendChild(select);
    tr.appendChild(td);
    tables.appendChild(tr);

    let instance = M.FormSelect.init(select);
    loadAutoComplete()
  }

var steps = document.getElementById('table_steps');
let trial = document.getElementById('in');

let num_steps=2;

const addSteps=()=>{
    let new_row = document.createElement('tr');
    let td1 = document.createElement('td');
    td1.classList.add("step_number")
    let step_num = document.createTextNode(num_steps.toString()+".");
    td1.appendChild(step_num);
    new_row.appendChild(td1)
    let td2 = document.createElement('td');
    td2.classList.add("step_field")
    let input = document.createElement('input');
    td2.appendChild(input);
    new_row.appendChild(td2);

    num_steps++;
    input.type="text";
    input.name='step';

    steps.appendChild(new_row);
}



//let list_of_utensils = []
let table_of_utensils = $('#utensils_table')//document.getElementById('utensils_table');

const addUtensil=()=>{
    utensil_field = document.getElementById('new_utensil');
    //list_of_utensils.push(utensil_field.value);

    let rows = table_of_utensils.children().children();
    let len = rows.length;

    let added = false;
    for(let i = 0; i < len && !added; i++)
    {
        let row = rows[i];
        if(row.childElementCount == 4) continue;

        rows[i].appendChild(createNewUtensil(utensil_field.value));
        added = true;
    }

    if(!added)
    {
        // Add new row
        table_of_utensils.append("<tr></tr>");
        table_of_utensils.children().children()[len].appendChild(createNewUtensil(utensil_field.value));
    }

    utensil_field.value = "";
    utensil_modal_instance.close()
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


let chip = document.getElementById('chip');

function addChips()
{
    let tags = M.Chips.getInstance(chip).chipsData;
    let createForm = $('form')

    for(let i = 0; i < tags.length; i++)
    {
        let input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'tags';
        input.value = tags[i].tag;

        createForm.append(input);
    }

    /*for(let y = 0; y < list_of_utensils.length; y++){
        let utensils_field = document.createElement('input');
        utensils_field.type = 'hidden';
        utensils_field.name = 'utensils';
        utensils_field.value = list_of_utensils[y];
        createForm.append(utensils_field);
    }*/

}

function saveForm(){
    //TODO check if form is not valid
    //return false;
    addChips();
    return true;

}

   