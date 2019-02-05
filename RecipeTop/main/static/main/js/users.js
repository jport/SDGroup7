let user_selection = document.getElementsByClassName("person");

for (let i = 0; i < user_selection.length; i++) {
    user_selection[i].addEventListener("click", function() {
      window.location.href="home";
    });
  }