// variables

const InputNameProduct = document.getElementById("InputNameProduct")
const InputCategory = document.getElementById("InputCategory")
const InputPrice = document.getElementById("InputPrice")
const InputDiscount = document.getElementById("InputDiscount")
const InputQuantity = document.getElementById("InputQuantity")
const addProduct = document.getElementById("addProduct")
const Total = document.getElementById("total")
const UpdateProduct = document.getElementById("UpdateProduct")
const SearchProduct = document.getElementById("SearchProduct")
let InputDescription=document.getElementById("InputDescription");
const row = document.getElementById("row")
// AddProduct
let arr = [] ;
function addproduct2(){
 let data= {
    name:InputNameProduct.value,
    category:InputCategory.value,
    price:InputPrice.value,
    discount:InputDiscount.value,
    Quantity:InputQuantity.value,
    total:Total.innerHTML,
    Description:InputDescription.value,
 }
 arr.push(data);
 console.log(arr)
 localStorage.setItem("items" , JSON.stringify(arr))
 Display();
 clear();


}


function sum(){
    if(InputPrice.value != ""){
     let res = (+InputPrice.value * +InputQuantity.value)-+InputDiscount.value
      Total.innerHTML=res+"$";
      Total.style.background="#040"
    }else{
        Total.innerHTML=" ";

        Total.style.background="#a00d02"

    }
}
if(localStorage.getItem("items")){
   arr=JSON.parse(localStorage.getItem("items"))

   Display();

}

addProduct.addEventListener("click" , addproduct2)

// Display

function Display(){

    let rowView; 

    for(let i=0;i<arr.length;i++){
        rowView+=`<tr class=text-white>
        <td>${arr[i].name}</td>
        <td>${arr[i].category}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].discount}</td>
        <td>${arr[i].Quantity}</td>
        <td>${arr[i].total}</td>
        <td>${arr[i].Description}</td>
        <td><div onclick="setItems(${i})" class="fa-solid fa-pen-to-square btn btn-success" id="btn-del"></div></td>
        <td><div onclick="Delete(${i})" class="fa-solid fa-trash btn btn-danger"></div></td>
      </tr>`  
       
    }
    row.innerHTML=rowView;
}

// clear

function clear(){

    InputNameProduct.value="";
    InputCategory.value="";
    InputQuantity.value="";
    InputPrice.value="";
    InputDiscount.value="";
    InputDescription.value="";
    Total.innerHTML="";
 }


 // search 

 function search(value){
    let rowView; 

    for(let i=0;i<arr.length;i++){
        if(arr[i].name.toLowerCase().includes(value.toLowerCase())){

        rowView+=`<tr class=text-white>
        <td>${arr[i].name}</td>
        <td>${arr[i].category}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].discount}</td>
        <td>${arr[i].Quantity}</td>
        <td>${arr[i].total}</td>
        <td>${arr[i].Description}</td>
        <td><div class="fa-solid fa-pen-to-square btn btn-success" id="btn-del"></div></td>
        <td><div class="fa-solid fa-trash btn btn-danger"></div></td>
      </tr>`  
       
    }
    row.innerHTML=rowView;
}
 }

 SearchProduct.addEventListener("input" , ()=>{
     search(SearchProduct.value);
 })

 // update
let x = 0 ;
 function setItems(prodID){
    x=prodID
    InputNameProduct.value=arr[prodID].name;
    InputCategory.value=arr[prodID].category;
    InputQuantity.value=arr[prodID].Quantity;
    InputPrice.value=arr[prodID].price;
    InputDiscount.value=arr[prodID].discount;
    InputDescription.value=arr[prodID].Description;
    Total.innerHTML=arr[prodID].total;
    addProduct.classList.add("d-none")
    UpdateProduct.classList.remove("d-none")

 }
 function Update(){
    arr[x].name=InputNameProduct.value;
    arr[x].category=InputNameProduct.value;
    arr[x].Quantity=InputQuantity.value
    arr[x].price=InputPrice.value
    arr[x].discount=InputDiscount.value
    arr[x].Description=InputDescription.value
    arr[x].total=Total.innerHTML
    localStorage.setItem("items" , JSON.stringify(arr))
    addProduct.classList.remove("d-none")
    UpdateProduct.classList.add("d-none")
    Display();
    clear();

 }
 UpdateProduct.addEventListener("click",Update)

 






 function Delete(prodId){
    arr.shift(prodId);
    localStorage.setItem("items",JSON.stringify(arr))
    Display();

 }
