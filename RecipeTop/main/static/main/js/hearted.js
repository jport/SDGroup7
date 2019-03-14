

let hearted = document.getElementsByClassName('hearted');

for(let i=0;i<hearted.length;i++){
    hearted[i].addEventListener("click",function(){
        if(hearted[i].innerHTML==='favorite_border')
        {
            //favorite
            let curId = hearted[i].parentElement.parentElement.parentElement.id;
            hearted[i].innerHTML='favorite';

            
        }
        else
        {
            //unfavorite
            hearted[i].innerHTML='favorite_border';
        }
    });
}