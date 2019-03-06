

let hearted = document.getElementsByClassName('hearted');

for(let i=0;i<hearted.length;i++){
    hearted[i].addEventListener("click",function(){
        if(hearted[i].innerHTML==='favorite_border')
            hearted[i].innerHTML='favorite';
        else
            hearted[i].innerHTML='favorite_border';
    });
}