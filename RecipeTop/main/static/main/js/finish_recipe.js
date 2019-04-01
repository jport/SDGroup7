let stars = document.getElementsByClassName('stars');
let cakes = document.getElementsByClassName('cakes');

for(let i=0;i<stars.length;i++){
    stars[i].addEventListener('click',function(){
        icon_pic(i,stars);
        check_stars(i,stars);
        btn_watcher();
    });
}
for(let i=0;i<cakes.length;i++){
    cakes[i].addEventListener('click',function(){
        icon_pic(i,cakes);
        check_cakes(i,cakes);
        btn_watcher();
    });
}

const icon_pic=(index,element)=>{
    let index_src=element[index].src;
    //if the selected item is a 'chosen' item then clear everything to the right and that one as well
    if(index_src.indexOf('1')!=-1){
        let img_src=index_src.replace('1','2');
        for(let i=index;i<element.length;i++)
        element[i].src= img_src;
    }
    else{
        //When nothing is chosen select everything to it's left
        let img_src =index_src.replace('2','1');
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
    if(cakes_counter===0 && star_counter===0||star_counter<0){
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
const check_cakes=(index,element)=>{
    var new_counter=0;
    for(let i=0;i<=index;i++){
        if(element[i].src.indexOf('1')!=-1){
            new_counter++;
        }
        else{
            new_counter--;
        }
    }
    cakes_counter=new_counter;
}

const check_stars=(index,element)=>{
    var new_counter=0;
    for(let i=0;i<=index;i++){
        if(element[i].src.indexOf('1')!=-1){
            new_counter++;
        }
        else{
            new_counter--;
        }
    }
    star_counter=new_counter;
}


