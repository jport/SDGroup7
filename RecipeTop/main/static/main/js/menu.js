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


//close on click outside menu bar
window.addEventListener('mousedown',function(event){
let menu = document.getElementById('MainMenu');
let logo = document.getElementById('logo');
let uls = document.getElementById('uls');
let body = document.getElementById('body');
if(event.target!=menu
    && event.target!=logo && event.target!=uls 
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
setInterval(() => {set_time();}, 1000);




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




