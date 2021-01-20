// write your code here

//- GET `/ramens/:id`
//- PATCH `/ramens/:id`
//Constants 
const url = "http://localhost:3000/ramens/"
const ramenMenu = document.querySelector("#ramen-menu")

const ratingInput = document.querySelector("#rating")
const commentInput = document.querySelector("#comment")
const ramenForm = document.querySelector("#ramen-rating")

document.addEventListener("DOMContentLoaded", () => {

    getRamens();

})


ramenForm.addEventListener("submit", (e) => {
    // debugger
    e.preventDefault()
    const ramenId = parseInt(ramenForm.dataset.id) 
    const updatedObj = {
        rating: ratingInput.value, 
        comment: commentInput.value
    }

    updateRamen(updatedObj, e.target.dataset.id)
    e.target.reset()
    // console.log(e)
})


//See all ramen images in the `div` with the id of `ramen-menu`. 
//Then, display the image for each of the ramen using an an `img` tag inside the `#ramen-menu` div.


const renderImage = (ramen) => {
    const img = document.createElement("img")
    // console.log(ramen)
    img.src = ramen.image; 
    ramenMenu.append(img);

    img.addEventListener("click", () => {
        getRamen(ramen);
    });     
    
    
}

// get each ramen with forEach
const parseRamen = (ramens) => {
    ramens.forEach(renderImage);
}

const getRamen = (ramen) => {
    fetch(`${url}${ramen.id}`)
    .then(response => response.json())
    .then(ramenDetails);
}

// Click on an image from the `#ramen-menu` div and see all the info about that 
const ramenDetails = (ramen) => {
    // console.log(ramen)
    // const ramenDetail = document.querySelector("#ramen-detail")
    const secondImage = document.querySelector(".detail-image")
    const h2 = document.querySelector(".name")
    const h3 = document.querySelector(".restaurant")
    
    secondImage.src = ramen.image;
    secondImage.alt = ramen.name;
    h2.textContent = ramen.name;
    h3.textContent = ramen.restaurant;

    ratingInput.value = ramen.rating;
    commentInput.value = ramen.comment;
    ramenForm.dataset.id = ramen.id 


}


function updateRamen(updatedObj, id){
    // debugger
    fetch(`${url}${id}`, {
    method: 'PATCH',
    headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(updatedObj)
      })
      .then(console.log)
      
    //   .then(data => console.log(data));
      
}

// const reRender = (newObj) => {
//     console.log(newObj)
// }

//When the page loads, request the data from the server to get all the ramen objects.
function getRamens(){
    fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(parseRamen);
}



