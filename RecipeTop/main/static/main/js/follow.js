
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
    attach: $('#modal-drag-anywhere'),
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