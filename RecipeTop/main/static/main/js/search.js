
  let parent = document.getElementsByClassName('gallery-item');
  let input = document.getElementById('input');
  let title = document.getElementsByClassName('title');

  const recipe_search =()=>{
      filter = input.value.toUpperCase();
      
      for(let i=0;i<parent.length;i++){
        let txt= title[i].textContent;
      if(txt.toUpperCase().indexOf(filter) > -1){
            parent[i].style.display="";
        }   
        else{
            parent[i].style.display='none';
        }  
    }

  };

let cakes = document.getElementsByClassName("difficulty_button");
var num_cakes = 0;
let cake_field = document.createElement('input');
cake_field.value=0;

for (let i = 0, len = cakes.length; i < len; i++) {
    cakes[i].onclick = function (){
        
        let difficulty_container = document.getElementById("difficulty_container")
        num_cakes = cakes[i].id-1000;
        //alert(num_stars.toString());
        cake_field.type = "hidden";
        cake_field.name = "difficulty";
        cake_field.value = num_cakes.toString();
        difficulty_container.appendChild(cake_field);
        for (var l = 1001; l <= num_cakes*1 +1000; l++){
            let cake_icon = document.getElementById(l.toString());
            //alert(l)
            cake_icon.innerHTML = '<i class="small material-icons icon-teal">cake</i>'; 
        }
        for (var p = num_cakes*1 +1001; p <= 1005; p++){
            let cake_icon = document.getElementById(p.toString());
            //alert(p)
            cake_icon.innerHTML = '<i class="small material-icons icon-grey">cake</i>'; 
        }
    }
}

let num_stars = 0;
let star_field = document.createElement('input');
star_field.value=0;
let stars = document.getElementsByClassName("star_button");
for (let i = 0, len = stars.length; i < len; i++) {
    stars[i].onclick = function (){
        
        let rating_container = document.getElementById("rating_container")
        num_stars = stars[i].id;

        //alert(num_stars.toString());
        star_field.type = "hidden";
        star_field.name = "rating";
        star_field.value = num_stars.toString() -10000;
        rating_container.appendChild(star_field);
        for (let j = 10001; j <= num_stars*1; j++){
            let star_icon = document.getElementById(j.toString());
            //alert(j);
            star_icon.innerHTML = '<i class="small material-icons icon-teal">star</i>'; 
        }
        for (let k = num_stars*1+1; k <= 10005; k++){
            let star_icon = document.getElementById(k.toString());
            //alert(star_icon);
            star_icon.innerHTML = '<i class="small material-icons icon-teal">star_outline</i>'; 
        }
    }
}