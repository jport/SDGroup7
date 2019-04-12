let menu_icon =document.getElementById('MenuIcon');
let menu = document.getElementById('MainMenu');
let close_button= document.getElementById('close');
var counter=0;

function showmenu(){
    menu_icon.style.display="none";
    menu.style.left='0px';
    menu.style.clipPath='polygon(0 0,100% 0,100% 100%,0% 100%)';
    
}

function hidemenu(){
    menu_icon.style.display="block";
    menu.style.left="-300px";
    menu.style.clipPath="polygon(0 0,0% 0,100% 100%,0% 100%)";

}

//menu icon clicked to bring up menu
menu_icon.addEventListener('click',function(){ 
    setTimeout(showmenu,100);
});

//"close" img clicked to close menu
close_button.addEventListener('click',function(){
    setTimeout(hidemenu,100);
});

var target;
//close on click outside menu bar
window.addEventListener('mousedown',function(event){
let menu = document.getElementById('MainMenu');
let logo = document.getElementById('logo');
let uls = document.getElementById('uls');
let body = document.getElementById('body');
let icon =document.getElementById('icon');
let prf_btn = document.getElementById('prf-btn');
if(event.target!=menu
    && event.target!=logo && event.target!=uls && event.target.parentNode.parentNode!=icon && event.target.parentNode!=prf_btn
    && event.target.parentNode!=uls
    && event.target.parentNode.parentNode!=uls
    && event.target.parentNode.parentNode.parentNode!=uls
    && event.target.parentNode.parentNode.parentNode.parentNode!=uls)
    {
        setTimeout(hidemenu,100);
    }
});

function set_time(){
    let date = new Date();
    let hour = date.getHours();
    let minutes =date.getMinutes();
    if(hour>12){
        hour-=12;
    }
    if(minutes<10)
        document.getElementById("time").innerHTML=hour+":0"+minutes;
    else
        document.getElementById("time").innerHTML=hour+":"+minutes;

}

//call time function every 1 second
setInterval(() => {set_time();}, 10);




//materialize stuff
document.addEventListener('DOMContentLoaded', function() {
    //carousel initializer
    let elems = document.querySelectorAll('.carousel');
    let instances = M.Carousel.init(elems);

    //collapsible initializer
    let coll = document.querySelectorAll('.collapsible');
    let instanc = M.Collapsible.init(coll);

    //Modal initializer
    let modals = document.querySelectorAll('.modal');
    let modals_instances= M.Modal.init(modals);

    icon_checker(choices_img,icons_input);
});

//individual icons
let cheese = document.getElementById('cheese');
let steak = document.getElementById('steak');
let fast_food = document.getElementById('fast-food');
let cupcake = document.getElementById('cupcake');
let brocoli = document.getElementById('brocoli');
let apple = document.getElementById('apple');
//icons
let choices_img =document.getElementsByClassName('prefences_img');
let icons_input =[cheese,steak,fast_food,cupcake,brocoli,apple];

for(let i =0;i<choices_img.length;i++){
  choices_img[i].addEventListener("click",function(){
    icon_pic1(i,icons_input[i]);
  });
}


const icon_pic1=(index,element)=>{
    let img_src =choices_img[index].src;
    if(img_src.indexOf('un')!=-1){
      img_src=img_src.replace('un','chk');
      element.value="true";
    }
    else{
      img_src=img_src.replace('chk','un');
      element.value="false";
    }
    choices_img[index].src=img_src;
  }

  const icon_checker=(element1,element2)=>{
      size = element1.length;
    for(let i=0;i<size;i++){
        if(element1[i].src.indexOf('chk')!=-1){
            element2[i].value="true";
        }
        else{
            element2[i].value="false";
        }
      }
  }
//end of icon stuff

//color stuff
let color_array=['teal','orange','purple'];
// let color_links_array=[''];
let color_items=document.getElementsByClassName('color_items');
let color_links=document.getElementsByClassName('color_links');

 
let color_choices =document.getElementsByClassName('color_option');
for(let i=0;i<color_choices.length;i++){
    color_choices[i].addEventListener('click',function(){
        color_selector(i);
        color_changer();
    });
}
//color div selected
const color_selector=(index)=>{
    let selected_color;
    for(let i=0;i<color_choices.length;i++){
        if(color_choices[i].classList.contains('selected')){
            color_choices[i].classList.remove('selected');
        }
    }
    if(color_choices[index].classList.contains('selected')){
        color_choices[index].classList.remove('selected');
        selected_color=color_array[index];
        window.localStorage.setItem('color',selected_color);
    }
    else {
        color_choices[index].classList.add('selected');
        selected_color=color_array[index];
        window.localStorage.setItem('color',selected_color);
    }
}

const color_changer=()=>{
    let color=window.localStorage.getItem('color');
    for(let i=0;i<color_items.length;i++){
        color_items[i].classList.remove('teal');
        color_items[i].classList.remove('orange');
        color_items[i].classList.remove('purple');
        color_items[i].classList.add(color);
    }


}

color_changer();




//
  function editClick(){
    let jsonPayload = {
        RecipeID: recipe_id,
        Rating: star_counter,
        Diff: cakes_counter
    }

    let payloadString = JSON.stringify(jsonPayload)
    $.ajax({
        type: 'POST',
        url: '/API/finishRecipe',
        data: payloadString,
        success: function(data){
            if(data.error)
                alert(error);

            window.location.href = "/edit/" + recipe_id
        },
        error: function(error){
            alert("Error: " + error)
        }
    });
}







