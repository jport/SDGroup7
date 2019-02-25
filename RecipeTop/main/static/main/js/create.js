let key_word_input= document.getElementById("key_word_input");


document.addEventListener('DOMContentLoaded', function() {
    console.log("i am working");
    let elems = document.querySelectorAll('.chips');
    let instances = M.Chips.init(elems, "");

    var instance = M.Chips.getInstance(elems);

  });



