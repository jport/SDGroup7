//var { Timer } = require('/lib/easytimer/dist/easytimer.min.js');

let start_buttons = document.getElementById("start_steps");
//let recipe_id = 



start_buttons.addEventListener("click", function() {
      window.location.href="/follow_steps/" + recipe_id;
    });


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
      direction: 'left',
      hoverEnabled: false
    });
  });



  // Drag anywhere

$(document).ready(function() {

  
  	new jBox('Modal', {
	    attach: $('#timer-drag-anywhere'),
	    width: 220,
	    title: 'Timer',
	    overlay: false,
	    createOnInit: true,
	    content:'\
	    <div>\
	    	<div id="demo">'	    		
    			+'	<p class="range-field">\
      					<input type="range" id="test5" min="0" max="100" />\
    				</p>\
  			</div>\
	    	<br>\
	    	<button class="btn waves-effect waves-light" type="button" name="action" id="start_timer"> Start Timer </button>\
	    </div>',
	    draggable: 'title',
	    repositionOnOpen: false,
	    repositionOnContent: false
	});

	new jBox('Modal', {
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
	new jBox('Modal', {
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
});

function foo()
{
	alert("hello");
}


function event_handler() {
	alert("event_handler()");
	document.getElementById("start_timer").classList.add("hide");
	var range_val = document.getElementById("test5").value;
	var day = Date.now();
	var countDownDate = day + range_val*1000*60;
	var x = setInterval(function() {
   			var now = new Date().getTime();
			var distance = countDownDate - now;
			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);
			document.getElementById("demo").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
			if (distance < 0) {
				    clearInterval(x);
				    document.getElementById("demo").innerHTML = "EXPIRED";
			}
		}
	);
}