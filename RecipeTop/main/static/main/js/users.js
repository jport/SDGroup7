// let user_selection = document.getElementsByClassName("person");


// for (let i = 0; i < user_selection.length; i++) {
//     user_selection[i].addEventListener("click", function() {
//       window.location.href="home/" + user_selection[i].id;
//     });
//   };

let user_selection = document.getElementsByClassName("user_profile");
let user_names=document.getElementsByClassName('names');
let continue_btn = document.getElementById("msg");
let url;

for (let i = 0; i < user_selection.length; i++) {
  user_selection[i].addEventListener("click", function() {
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
  };
}

const addAnimate=(index)=>{
      user_selection[index].classList.add('animate');
      user_names[index].classList.add('highlight');
      continue_btn.classList.add('glow');
}

  // setInterval(() => {
  //   if (error_message.innerHTML=='')
  //   console.log("ys");
  // }, 01);


