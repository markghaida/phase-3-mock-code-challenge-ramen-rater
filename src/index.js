const ramenMenu = document.querySelector("#ramen-menu");
// let ramenTest 

getAllRamen();
formEventListener();

function getAllRamen(){
    fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(ramenItems)
}

function ramenItems(ramenArr){
    ramenArr.forEach(ramen => {
       //helper function to create image
        renderImage(ramen);
    })
}

function renderImage(ramen){
    const img = document.createElement("img")
    img.src = ramen.image 
    img.alt = ramen.name 
    img.dataset.id = ramen.id 
    ramenMenu.append(img)

    img.addEventListener("click", function(e){
        //helper method to get fetch with id request 
        getRamen(e.target.dataset.id);
    })
}

function getRamen(ramenId){
    fetch(`http://localhost:3000/ramens/${ramenId}`)
    .then(response => response.json())
    .then(ramen => {
        renderDetails(ramen)
    })
}

function renderDetails(ramen){
    // const ramenDetail = document.querySelector("#ramen-detail");
    const img = document.querySelector(".detail-image");
    const h2 = document.querySelector(".name");
    const h3 = document.querySelector(".restaurant");
    const ratingInput = document.querySelector("#rating")
    ratingInput.value = ramen.rating 
    const commentInput = document.querySelector("#comment")
    commentInput.value = ramen.comment
    img.src = ramen.image;
    img.alt = ramen.name; 
    h2.textContent = ramen.name
    h3.textContent = ramen.restaurant 
    const ramenForm = document.querySelector("#ramen-rating")
    ramenForm.dataset.id = ramen.id;
}

function formEventListener(){

    const ramenForm = document.querySelector("#ramen-rating")
    ramenForm.addEventListener("submit", function(e) {
        e.preventDefault();
        // console.log(e);
        const newRating = document.querySelector("#rating").value
        const newComment = document.querySelector("#comment").value
        // const r = e.target.rating.value    
        const updatedObj = {
            id: parseInt(ramenForm.dataset.id),
            rating: newRating,
            comment: newComment
        }

        updateRamen(updatedObj);
        e.target.reset();
    })
}

function updateRamen(updatedObj){

    fetch(`http://localhost:3000/ramens/${updatedObj.id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updatedObj),
})
.then(response => response.json())
.then(updatedObj => {
    const ratingInput = document.querySelector("#rating")
    const commentInput = document.querySelector("#comment")
    ratingInput.value = updatedObj.rating
    commentInput.value = updatedObj.comment
    
})

}