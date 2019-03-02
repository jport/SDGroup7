let key_word_input= document.getElementById("key_word_input");


document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.chips');
    let instances = M.Chips.init(elems, "");
    var instance = M.Chips.getInstance(elems);
  });



  
  let tables = document.getElementById('table');
  const table =()=>{
      console.log('eh');
    let tr= document.createElement('tr');
    for(let i=0;i<3;i++){
        var td = document.createElement('td');
        let input =document.createElement('input');
        if(i==0){
            input.name="ingredient";
            input.placeholder="Enter your ingredient";
        }
        else if(i==1){
            input.name="quantity";
            input.placeholder="Enter your quantity";
        }
        else{
            input.name="unit";
            input.placeholder="Enter your units";
        }
        td.appendChild(input);
        tr.appendChild(td);
    }
    tables.appendChild(tr);
  }
 
let checker = document.querySelectorAll('#example > td');




