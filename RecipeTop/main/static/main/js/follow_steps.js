
document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('.fixed-action-btn');
    let instances = M.FloatingActionButton.init(elems, {
      direction: 'left',
      hoverEnabled: false
    });
  });


let timerJbox = null;
let preheat_jbox = null;
let scale_jbox = null;
let tare = 0.0;
let curValue = 0.0;
let units_factor=1.0;
let unit_text=" grams";

let chatSocket = new WebSocket('ws://' + window.location.host + '/ws/scale/');

$(document).ready(function() {

  let display_scale=document.getElementById("scale_display_content");

   timer1Jbox = new jBox('Modal', {
      attach: $('#timer-1-drag-anywhere'),
      width: 250,
      title: 'Timer 1',
      overlay: false,
      createOnInit: true,
      content:$('#timer1_modal_content'),
      draggable: 'title',
      position: {
          x: 'left',
          y: 'top'
      },
      offset: {
          x: 30,
          y: 130
       },
      repositionOnOpen: false,
      repositionOnContent: false
   });

   timer2Jbox = new jBox('Modal', {
       attach: $('#timer-2-drag-anywhere'),
       width: 250,
       title: 'Timer 2',
       overlay: false,
       createOnInit: true,
       content: $('#timer2_modal_content'),
       draggable: 'title',
       position: {
          x: 'left',
          y: 'center'
       },
       offset: {
          x: 30,
          y: 120
       },
       repositionOnOpen: false,
       repositionOnContent: false
   });

   scale_jbox = new jBox('Modal', {
       attach: $('#scale-drag-anywhere'),
       width: 250,
       title: 'Start weighing...',
       overlay: false,
       createOnInit: true,
       content: $('#scale_modal_content'),
       draggable: true,
       position: {
          x: 'left',
          y: 'bottom'
       },
       offset: {
          x: 30,
          y: -30
       },
       repositionOnOpen: false,
       repositionOnContent: false
   });

   // When Floating button clicked, start scale
   $('#scale-drag-anywhere').click(function(){
      chatSocket.send(JSON.stringify({
         'message': "on"
      }))
   });

   // When jbox closed, stop scale
   $('#jBox3 > div > div.jBox-title > div.jBox-closeButton.jBox-noDrag').click(function(){
      chatSocket.send(JSON.stringify({
         'message': "off"
      }))
   });

   // Show incomming message in box
   chatSocket.onmessage = function(e) {
      let data = JSON.parse(e.data);
      let message = data['message'];

      curValue = parseFloat(message) - tare;
      let display_scale= document.getElementById("scale_display_content");
      display_scale.innerHTML  = (curValue*units_factor + unit_text);
   };

   // Check for errors
   chatSocket.onclose = function(e) {
      console.error('Chat socket closed unexpectedly');
   };
   
   let timer_button1 = document.getElementById("start_timer1");
   timer_button1.addEventListener("click", event_handler1, 1000);

   let timer_button2 = document.getElementById("start_timer2");
   timer_button2.addEventListener("click", event_handler2, 1000);

   let stop_timer1=false;
   let stop_timer2=false;


function restart_timer1(){
  document.getElementById("demo1").innerHTML = '<p class="range-field bigger_button"><input type="range" id="timer1" min="0" max="60" /></p>';
  document.getElementById("timer_button_holder1").innerHTML  ='<button class="btn-large waves-effect waves-light" type="button" name="action" id="start_timer1">Start Timer</button>'
  stop_timer1 = true;
  let timer_button1 = document.getElementById("start_timer1");
  timer_button1.addEventListener("click", event_handler1, 1000);




   // Reinitialize range slider
   M.Range.init($('input[type=range]'));
}

function restart_timer2(){
  document.getElementById("demo2").innerHTML = '<p class="range-field bigger_button"><input type="range" id="timer2" min="0" max="60" /></p>';
  document.getElementById("timer_button_holder2").innerHTML  ='<button class="btn-large waves-effect waves-light" type="button" name="action" id="start_timer2">Start Timer</button>'
  stop_timer2 = true;
  let timer_button2 = document.getElementById("start_timer2");
  timer_button2.addEventListener("click", event_handler2, 1000);




   // Reinitialize range slider
   M.Range.init($('input[type=range]'));
}

   // Reinitialize range slider
   M.Range.init($('input[type=range]'));

function event_handler1() {
    stop_timer1 = false;
   document.getElementById("timer_button_holder1").innerHTML  = '<button class="btn-large waves-effect waves-light" type="button" name="action" id="end_timer1"> Stop Timer </button>'
   let end_timer_button1 = document.getElementById("end_timer1");
   end_timer_button1.addEventListener("click", restart_timer1);
   let range_val = document.getElementById("timer1").value;
   let day = Date.now();
   let countDownDate = day + range_val*1000*60;
   let x = setInterval(function() {
         let now = new Date().getTime();
         let distance = countDownDate - now;
         let days = Math.floor(distance / (1000 * 60 * 60 * 24));
         let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
         let seconds = Math.floor((distance % (1000 * 60)) / 1000);
         if (stop_timer1){
            clearInterval(x);
            
         }
         if (!stop_timer1){
          document.getElementById("demo1").innerHTML =days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
         }
         
         if (distance < 0) {
                clearInterval(x);
                document.getElementById("demo1").innerHTML = '<strong>TIMER EXPIRED</strong>';
                timer1Jbox.open();

         }
      }
   );
  }

   function event_handler2() {
    stop_timer2 = false;
   document.getElementById("timer_button_holder2").innerHTML  = '<button class="btn-large waves-effect waves-light" type="button" name="action" id="end_timer2"> Stop Timer </button>'
   let end_timer_button2 = document.getElementById("end_timer2");
   end_timer_button2.addEventListener("click", restart_timer2);
   let range_val = document.getElementById("timer2").value;
   let day = Date.now();
   let countDownDate = day + range_val*1000*60;
   let x = setInterval(function() {
         let now = new Date().getTime();
         let distance = countDownDate - now;
         let days = Math.floor(distance / (1000 * 60 * 60 * 24));
         let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
         let seconds = Math.floor((distance % (1000 * 60)) / 1000);
         if (stop_timer2){
            clearInterval(x);
            
         }
         if (!stop_timer2){
          document.getElementById("demo2").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
         }
         
         if (distance < 0) {
                clearInterval(x);
                document.getElementById("demo2").innerHTML = '<strong>TIMER EXPIRED</strong>';
                timer2Jbox.open();

         }
      }
   );
  }
  let tare_but = document.getElementById("tare_button");
  tare_but.addEventListener("click", tareFunc);
  function tareFunc(){
    tare += curValue; 
    display_scale.innerHTML =curValue*units_factor + unit_text;
  }

  let units_but = document.getElementById("units_button");
  units_but.addEventListener("click", changeUnits);

  function changeUnits(){
    if(unit_text==" grams"){
      unit_text=" ounces";
      units_factor=0.035274;

    }
    else{
      unit_text=" grams";
      units_factor=1.0;
    }
    display_scale.innerHTML =curValue*units_factor + unit_text;
  }

});


