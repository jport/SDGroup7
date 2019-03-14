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