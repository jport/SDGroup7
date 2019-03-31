let stars = document.getElementsByClassName('stars');

for(let i=0;i<stars.length;i++){
    stars[i].addEventListener('click',function(){
        icon_pic(i);
    });
}

const icon_pic=(index)=>{
    let img_src =stars[index].src;
    if(img_src.indexOf('2')!=-1){
      img_src=img_src.replace('2','1');
    }
    else{
      img_src=img_src.replace('1','2');
    }
    stars[index].src=img_src;
  };