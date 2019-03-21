
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
      direction: 'left',
      hoverEnabled: false
    });
  });


$(document).ready(function() {

  
   var timerJbox = new jBox('Modal', {
       attach: $('#timer-drag-anywhere'),
       width: 220,
       title: 'Timer',
       overlay: false,
       createOnInit: true,
      content:$('#timer_modal_content'),
       draggable: 'title',
       repositionOnOpen: false,
       repositionOnContent: false
   });

   var preheat_jbox = new jBox('Modal', {
       attach: $('#preheat-drag-anywhere'),
       width: 220,
       title: 'jBox',
       overlay: false,
       createOnInit: true,
       content: 'Drag me around by clicking anywhere',
       draggable: true,
       repositionOnOpen: false,
       repositionOnContent: false
   });
   var scal_jbox = new jBox('Modal', {
       attach: $('#scale-drag-anywhere'),
       width: 220,
       title: 'Start weighing...',
       overlay: false,
       createOnInit: true,
       content: '100 grams',
       draggable: true,
       repositionOnOpen: false,
       repositionOnContent: false
   });
   
   var timer_button = document.getElementById("start_timer");
   timer_button.addEventListener("click", event_handler, 1000);

   let stop_timer=false;


function restart_timer(){
  document.getElementById("demo").innerHTML = '<p class="range-field"><input type="range" id="test5" min="0" max="100" /></p>';
  document.getElementById("timer_button_holder").innerHTML  ='<button class="btn waves-effect waves-light" type="button" name="action" id="start_timer">Start Timer</button>'
  stop_timer = true;
  var timer_button = document.getElementById("start_timer");
  timer_button.addEventListener("click", event_handler, 1000);




   // Reinitialize range slider
   M.Range.init($('input[type=range]'));
}


   // Reinitialize range slider
   M.Range.init($('input[type=range]'));

   function event_handler() {
    stop_timer = false;
   document.getElementById("timer_button_holder").innerHTML  = '<button class="btn waves-effect waves-light" type="button" name="action" id="end_timer"> Stop Timer </button>'
   var end_timer_button = document.getElementById("end_timer");
   end_timer_button.addEventListener("click", restart_timer);
   var range_val = document.getElementById("test5").value;
   var day = Date.now();
   var countDownDate = day + range_val*1000*60;
   var x = setInterval(function() {
            var now = new Date().getTime();
         var distance = countDownDate - now;
         var days = Math.floor(distance / (1000 * 60 * 60 * 24));
         var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
         var seconds = Math.floor((distance % (1000 * 60)) / 1000);
         if (stop_timer){
            clearInterval(x);
            
         }
         if (!stop_timer){
          document.getElementById("demo").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
         }
         
         if (distance < 0) {
                clearInterval(x);
                document.getElementById("demo").innerHTML = '<strong>TIMER EXPIRED</strong>';
                timerJbox.open();

         }
      }
   );
}
});




