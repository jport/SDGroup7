let stars = document.getElementsByClassName('stars');
let cakes = document.getElementsByClassName('cakes');

for(let i=0;i<stars.length;i++){
    stars[i].addEventListener('click',function(){
        icon_pic(i,stars);
    });
}
for(let i=0;i<cakes.length;i++){
    cakes[i].addEventListener('click',function(){
        icon_pic(i,cakes);
    });
}

const icon_pic=(index,element)=>{
    // let img_src =stars[index].src;
    let index_src=element[index].src;
    if(index_src.indexOf('1')!=-1){
        let img_src=index_src.replace('1','2');
        for(let i=index;i<element.length;i++)
        element[i].src= img_src;
    }
    else{
        let img_src =index_src.replace('2','1');
        for(let i=0;i<=index;i++){
                element[i].src=img_src;
        }
    }
};

