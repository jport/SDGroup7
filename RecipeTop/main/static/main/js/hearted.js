

let hearted = document.getElementsByClassName('hearted');

for(let i=0;i<hearted.length;i++){
    hearted[i].addEventListener("click",function(){
        let curRecipeId = hearted[i].parentElement.parentElement.parentElement.id;
        let jsonPayload = {
            RecipeID: curRecipeId,
            Status: 0
        };

        if(hearted[i].innerHTML==='favorite_border')
        {
            //favorite
            hearted[i].innerHTML='favorite';
            jsonPayload.Status = 1;
        }
        else
        {
            //unfavorite
            hearted[i].innerHTML='favorite_border';
        }

        payloadString = JSON.stringify(jsonPayload);
        console.log(payloadString);
        $.ajax({
            type: 'POST',
            url: '/API/changeHeartStatus',
            data: payloadString,
            success: function(data){
                if(data.error)
                    alert(error);
            },
            error: function(error){
                alert("Error: " + error)
            }
        });
    });
}