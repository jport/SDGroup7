let key_word_input= document.getElementById("key_word_input");


document.addEventListener('DOMContentLoaded', function() {
    let chips = document.querySelectorAll('.chips');
    let instances = M.Chips.init(chips, "");
    // var instance = M.Chips.getInstance(elems);

    let select = document.querySelectorAll('select');
    let select_instances = M.FormSelect.init(select);
  });




  
  let tables = document.getElementById('table');

  const table =()=>{
    let tr= document.createElement('tr');
    for(let i=0;i<2;i++){
        let td = document.createElement('td');
        let input =document.createElement('input');
        if(i==0){
            input.name="ingredient";
            input.placeholder="Enter your ingredient";
        }
        else if(i==1){
            input.name="quantity";
            input.placeholder="Enter your quantity";
        }
        td.appendChild(input);
        tr.appendChild(td);
    }
    let select= document.createElement('select');
    let td = document.createElement('td');
    td.classList.add('input-field');

    for(let i=0;i<4;i++){
        let option =document.createElement('option');
        if(i==0){
            option.innerHTML='Choose the unit';
            option.setAttribute('selected',true)
            option.setAttribute('disabled',true) 
        }
        if(i==1){
            option.innerHTML='option 1';
        }
        if(i==2){
            option.innerHTML='option 2';
        }
        if(i==3){
            option.innerHTML='option 3';
        }
        select.appendChild(option);
    }
    
    td.appendChild(select);
    tr.appendChild(td);
    tables.appendChild(tr);
    let instance = M.FormSelect.init(select);
  }

let steps = document.getElementById('steps');
let trial = document.getElementById('in');

const addSteps=()=>{
    let input = document.createElement('input');
    input.type="text";
    input.name='step';

    steps.append(input);
}

let checker = document.querySelectorAll('#example > td');


let salt = document.getElementById('chip');











