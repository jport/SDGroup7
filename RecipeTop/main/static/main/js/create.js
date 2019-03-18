let key_word_input= document.getElementById("key_word_input");
let unitOptions = ["cup(s)", "kg", "grams", "lbs", "ounces", "ml", "units", "tbsp", "tsp", "handfuls"];
let instances = null

document.addEventListener('DOMContentLoaded', function() {
    let chips = document.querySelectorAll('.chips');
    instances = M.Chips.init(chips, "");
    // var instance = M.Chips.getInstance(elems);

    let select = document.querySelectorAll('select');
    let select_instances = M.FormSelect.init(select);

  });

let stars = document.getElementsByClassName("star_button");


var num_stars = 0;
for (let i = 0, len = stars.length; i < len; i++) {
    stars[i].onclick = function (){
        let star_field = document.createElement('input');
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
        for (var k = num_stars; k <= 5; k++){
            let star_icon = document.getElementById(k.toString());
            //alert(star_icon);
            star_icon.innerHTML = '<i class="medium material-icons icon-teal">star_outline</i>'; 
        }
    }
}
let cakes = document.getElementsByClassName("difficulty_button");
var num_cakes = 0;
for (let i = 0, len = cakes.length; i < len; i++) {
    cakes[i].onclick = function (){
        let cake_field = document.createElement('input');
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
}

   