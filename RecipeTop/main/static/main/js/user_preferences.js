let cheese = document.getElementById('cheese_in');
let steak = document.getElementById('steak_in');
let fast_food = document.getElementById('fast_food_in');
let cupcake = document.getElementById('cupcake_in');
let brocoli = document.getElementById('brocoli_in');
let apple = document.getElementById('apple_in');

let icons =[cheese,steak,fast_food,cupcake,brocoli,apple];

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

