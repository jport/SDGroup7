

let hearted = document.getElementsByClassName('hearted');

for(let i=0;i<hearted.length;i++){
    hearted[i].addEventListener("click",function(){
        let curId = hearted[i].id;
        let curRecipeId = curId.replace("hearted_", "").replace("_prop", "");//hearted[i].parentElement.parentElement.parentElement.id;
        let jsonPayload = {
            RecipeID: curRecipeId,
            Status: 0
        };

        let otherId = curId + "_prop";
        if(curId.includes("_prop"))
            otherId = curId.replace("_prop", "");

        let otherHeart = $("#" + otherId)[0];
        console.log(otherId);
        console.log(otherHeart);
        console.log(curRecipeId);

        if(hearted[i].innerHTML==='favorite_border')
        {
            //favorite
            hearted[i].innerHTML = 'favorite';
            otherHeart.innerHTML = 'favorite';
            jsonPayload.Status = 1;
        }
        else
        {
            //unfavorite
            hearted[i].innerHTML = 'favorite_border';
            otherHeart.innerHTML = 'favorite_border';
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