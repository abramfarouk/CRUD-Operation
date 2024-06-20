// store variables

const name =document.getElementById("name");
const Category = document.getElementById("Category");
const Price = document.getElementById("Price");
const  DisCount = document.getElementById("DisCount");
const Quantity = document.getElementById("Quantity");
const Description = document.getElementById("Description");
const addProduct = document.getElementById("addProduct");
const updateProduct =document.getElementById("UpdateProd");
let Search = document.getElementById("searchbtn")
const tb =  document.querySelector(".tb");


let arr = [];


// addproduct

addProduct.addEventListener("click" ,()=>{
    if(checkprod()){
        const data = {
            name:name.value,
            category:Category.value,
            price:Price.value,
            disCount:DisCount.value,
            description:Description.value,
            Quantity:Quantity.value  
        }
         arr.push(data);
         localStorage.setItem("product" , JSON.stringify(arr));
         Display();
         Clear();
    }else{
        alert("invalid product")
    }

    });
  
// diSPlay product

function Display(){ 
    
    let row ; 
    for(let i=0; i<arr.length ; i++){
       
        row+=`<tr class="text-white">
        <td>${arr[i].name}</td>
        <td>${arr[i].category}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].disCount}</td>
        <td>${arr[i].Quantity}</td>
        <td>${arr[i].description}</td>
        <td><div onclick="setFrom(${i})" class="fa-solid fa-pen-to-square btn btn-success" id="btn-del"></div></td>
        <td><div onclick="removeProduct(${i})" class="fa-solid fa-trash btn btn-danger"></div></td>
      </tr>`  
           
        }
        tb.innerHTML=row;
}


// localstrorage
if(localStorage.getItem("product") !==null){
    arr = JSON.parse(localStorage.getItem("product"))
    Display();
}
// delete item
function removeProduct(productID){
    arr.shift(productID);
    localStorage.setItem("product" , JSON.stringify(arr));
    Display();

}
// clear input
function Clear(){

    name.value=" "; 
    Category.value = " ";
    DisCount.value='';
    Quantity.value='';
    Description.value='';
    Price.value='';
}

// Search 


function searchInput(x){
    let row ; 
    for(let i=0; i<arr.length ; i++){
       if(arr[i].name.toLowerCase().includes(x.toLowerCase())){
        row+=`<tr class="text-white">
        <td>${arr[i].name}</td>
        <td>${arr[i].category}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].disCount}</td>
        <td>${arr[i].Quantity}</td>
        <td>${arr[i].description}</td>
        <td><div onclick="setFrom(${i})"  class="fa-solid fa-pen-to-square btn btn-success" id="btn-del"></div></td>
        <td><div onclick="removeProduct(${i})" class="fa-solid fa-trash btn btn-danger"></div></td>
      </tr>`  
           
        }
        tb.innerHTML=row;
    }
}


Search.addEventListener("input" ,()=>{
   searchInput(Search.value);
    

});


let x= 0 ; 

function setFrom(prodID){
    x=prodID
    name.value = arr[prodID].name;
    Category.value = arr[prodID].category
    DisCount.value=arr[prodID].disCount
    Quantity.value=arr[prodID].Quantity
    Description.value=arr[prodID].description
    Price.value=arr[prodID].price;
    addProduct.classList.add("d-none");
    updateProduct.classList.remove("d-none");
    

}


function update(){
    console.log(x)
    arr[x].name = name.value;
    arr[x].category=Category.value;
    arr[x].disCount=DisCount.value;
    arr[x].Quantity=Quantity.value;
    arr[x].price=Price.value;
    addProduct.classList.remove("d-none");
    updateProduct.classList.add("d-none");
    localStorage.setItem("product" , JSON.stringify(arr));

    Display();
    Clear();

}

updateProduct.addEventListener("click" ,update);



function checkprod(){
    let pattern=/^\w{4,15}$/
    if(pattern.test(name.value)){
      return true
    }else{
     return false
    }
}