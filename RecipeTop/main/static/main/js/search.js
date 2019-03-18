
  let parent = document.getElementsByClassName('gallery-item');
  let input = document.getElementById('input');
  let title = document.getElementsByClassName('title');

  const recipe_search =()=>{
      filter = input.value.toUpperCase();
      
      for(let i=0;i<parent.length;i++){
        let txt= title[i].textContent;
      if(txt.toUpperCase().indexOf(filter) > -1){
            parent[i].style.display="";
        }   
        else{
            parent[i].style.display='none';
        }  
    }

  };