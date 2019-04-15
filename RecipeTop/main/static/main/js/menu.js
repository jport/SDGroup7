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

if(event.target!=menu
    && event.target!=logo && event.target!=uls && event.target.parentNode.parentNode!=icon 
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

});



//color stuff
let color_array=['teal','orange','purple'];
let color_text_array=['teal-text','orange-text','purple-text'];
let logo_style_array=['2.5px solid teal','2.5px solid orange','2.5px solid purple'];

let color_items=document.getElementsByClassName('color_items');
let color_links=document.getElementsByClassName('color_links');
let logo=document.getElementById('logo');

 
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
    let selected_color_text;
    let selected_logo;
    for(let i=0;i<color_choices.length;i++){
        if(color_choices[i].classList.contains('selected')){
            color_choices[i].classList.remove('selected');
        }
    }
    if(color_choices[index].classList.contains('selected')){
        color_choices[index].classList.remove('selected');
        selected_color=color_array[index];
        selected_color_text=color_text_array[index];
        selected_logo=logo_style_array[index];
        window.localStorage.setItem('color',selected_color);
        window.localStorage.setItem('color-text',selected_color_text);
        window.localStorage.setItem('color-logo',selected_logo);
    }
    else {
        color_choices[index].classList.add('selected');
        selected_color=color_array[index];
        selected_color_text=color_text_array[index];
        selected_logo=logo_style_array[index];
        window.localStorage.setItem('color',selected_color);
        window.localStorage.setItem('color-text',selected_color_text);
        window.localStorage.setItem('color-logo',selected_logo);
    }
}

const color_changer=()=>{
    let color;
    let color_text;
    if(window.localStorage.length===0){
         color='teal';
         color_text='teal-text';
         logo_color='2.5px solid teal';
    }
    else{
     color=window.localStorage.getItem('color');
     color_text=window.localStorage.getItem('color-text');
     logo_color=window.localStorage.getItem('logo-color');
    }
    for(let i=0;i<color_items.length;i++){
        color_items[i].classList.remove('teal');
        color_items[i].classList.remove('orange');
        color_items[i].classList.remove('purple');
        color_items[i].classList.add(color);
    }
    for(let i=0;i<color_links.length;i++){
        color_links[i].classList.remove('teal-text');
        color_links[i].classList.remove('orange-text');
        color_links[i].classList.remove('purple-text');
        color_links[i].classList.add(color_text);
    } 
    logo.style.border=window.localStorage.getItem('color-logo')
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







