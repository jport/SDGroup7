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
	    <div> \
	    	<p>Drag me around by clicking anywhere</p>\
	    	<br>\
	    		<button class="btn waves-effect waves-light" type="button" name="action" id="start_timer"> Start Timer </button>\
	    	</div>\
	    	<script>var timer_button = document.getElementById("start_timer");</script>\
	    	<script>timer_button.addEventListener("click", function() {window.location.href="/follow_steps/" + recipe_id;});</script>\
	    	',
	    draggable: true,
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
	    title: 'jBox',
	    overlay: false,
	    createOnInit: true,
	    content: 'Drag me around by clicking anywhere',
	    draggable: true,
	    repositionOnOpen: false,
	    repositionOnContent: false
  	});
    
});




