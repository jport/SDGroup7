let stars = document.getElementsByClassName('stars');
let cakes = document.getElementsByClassName('cakes');

for(let i=0;i<stars.length;i++){
    stars[i].addEventListener('click',function(){
        icon_pic(i,stars);
        check_stars(stars);
        btn_watcher();
    });
}
for(let i=0;i<cakes.length;i++){
    cakes[i].addEventListener('click',function(){
        icon_pic(i,cakes);
        check_cakes(cakes);
        btn_watcher();
    });
}

const icon_pic=(index,element)=>{
    let index_src=element[index].src;
    //if the selected item is a 'chosen' item then clear everything to the right and that one as well
    if(index_src.indexOf('chk')!=-1){
        let img_src=index_src.replace('chk','un');
        for(let i=index+1;i<element.length;i++)
        element[i].src= img_src;
    }
    else{
        //When nothing is chosen select everything to it's left
        let img_src =index_src.replace('un','chk');
        for(let i=0;i<=index;i++){
                element[i].src=img_src;
        }
    }
};


//disabled buttons stuff
let btns=document.getElementsByClassName('dis_btn');
var cakes_counter=0;
var star_counter=0;

const btn_watcher=()=>{
    if((cakes_counter<1) || (star_counter<1)){
       for(let index =0;index<btns.length;index++){
        if(btns[index].classList.contains('disabled')==false){
            btns[index].classList.add('disabled');
            }
        }
    }
    else{
        for(let index =0;index<btns.length;index++){
            btns[index].classList.remove('disabled');
        }
    }
}



//function for checking ratings
const check_cakes=(element)=>{
    var new_counter=0;
    for(let i=0;i<element.length;i++){
        if(element[i].src.indexOf('chk')!=-1){
            new_counter++;
        }
    }
    cakes_counter=new_counter;
}

const check_stars=(element)=>{
    var new_counter=0;
    for(let i=0;i<element.length;i++){
        if(element[i].src.indexOf('chk')!=-1){
            new_counter++;
        }
    }
    star_counter=new_counter;
}

function editClick(){
    let jsonPayload = {
        RecipeID: recipe_id,
        Rating: star_counter,
        Diff: cakes_counter
    }

    let payloadString = JSON.stringify(jsonPayload)
    $.ajax({
        type: 'POST',
        url: '/API/finishRecipe',
        data: payloadString,
        success: function(data){
            if(data.error)
                alert(error);

            window.location.href = "/edit/" + recipe_id
        },
        error: function(error){
            alert("Error: " + error)
        }
    });
}

function homeClick(){
  let jsonPayload = {
        RecipeID: recipe_id,
        Rating: star_counter,
        Diff: cakes_counter
    }

    let payloadString = JSON.stringify(jsonPayload)
    $.ajax({
        type: 'POST',
        url: '/API/finishRecipe',
        data: payloadString,
        success: function(data){
            if(data.error)
                alert(data.error);
            else
                window.location.href = "/home"
        },
        error: function(error){
            alert("Error: " + error)
        }
    });
}
