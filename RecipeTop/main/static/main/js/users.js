// let user_selection = document.getElementsByClassName("person");


let user_selection = document.getElementsByClassName("user_profile");
let user_names=document.getElementsByClassName('names');
let continue_btn = document.getElementById("msg");
let url;
let user_box =document.getElementsByClassName('user');

for (let i = 0; i < user_selection.length; i++) {
  user_selection[i].addEventListener("click", function() {
    removeAnimate();
    addAnimate(i);
    url="home/"+user_selection[i].id;
  });
  user_box[i].addEventListener("click",function(){
    removeAnimate();
    addAnimate(i);
    url="home/"+user_selection[i].id;
  });
};


continue_btn.addEventListener('click',function(){
  if(url!=undefined){
    window.location.href=url;
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

let error_message= document.getElementById("error");




const removeAnimate=()=>{
  for (let i = 0; i < user_selection.length; i++) {
      if(user_selection[i].classList.contains('animate')){
        user_selection[i].classList.remove('animate');
      } 

      if(user_names[i].classList.contains('highlight')){
        user_names[i].classList.remove('highlight');
      }
      if(user_box[i].classList.contains('border')){
        user_box[i].classList.remove('border');
      }
  };
}

const addAnimate=(index)=>{
      user_selection[index].classList.add('animate');
      user_names[index].classList.add('highlight');
      continue_btn.classList.add('glow');
      user_box[index].classList.add('border');
}


//Modal stuff

let choices_img =document.getElementsByClassName('choices_img');
for(let i =0;i<choices_img.length;i++){
  choices_img[i].addEventListener("click",function(){
    icon_pic(i,icons[i]);
  });
}

const icon_pic=(index,element)=>{
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

let cheese = document.getElementById('cheese');
let steak = document.getElementById('steak');
let fast_food = document.getElementById('fast-food');
let cupcake = document.getElementById('cupcake');
let brocoli = document.getElementById('brocoli');
let apple = document.getElementById('apple');

let icons =[cheese,steak,fast_food,cupcake,brocoli,apple];







