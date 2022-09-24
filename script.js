//Variaveis

const productName = document.querySelector("#product-name");
const productValue = document.querySelector("#product-value");
const productQuantity = document.querySelector("#product-quantity");
const addButton = document.querySelector("#add-product");
const productList = document.querySelector("#table-list")
const resultTotal =  document.querySelector("#total-value span");
const removeProduct =  document.querySelector("#remove-product")
const clearBtn = document.querySelector("#clear-btn");
const productContainer = document.getElementsByClassName("table-info");
let total = 0


//Funções
 function valueFinal () {
    resultTotal.innerText = total.toFixed(2)
 }

 valueFinal();

function validDigits(text) {
    return text.replace(/[^0-9,.]/g, "");
}

function createProduct(product, value, quantity, save = 1){
    if(productList === "")[
        console.log("ta vazio")
    ]
    const item = document.createElement("div")
    item.classList.add("table-info")

    const removeBtn = document.createElement("button");
    item.appendChild(removeBtn);

    const removeBtnIcon =  document.createElement("i");
    removeBtnIcon.classList.add("bi");
    removeBtnIcon.classList.add("bi-trash");
    removeBtn.appendChild(removeBtnIcon);

    const itemName = document.createElement("p");
    itemName.innerText = product;
    item.appendChild(itemName);

    const itemQuantity = document.createElement("p");
    itemQuantity.innerText = quantity;
    
    item.appendChild(itemQuantity);

    const itemValue = document.createElement("p");
    itemValue.innerText = "R$ "
    item.appendChild(itemValue);

    const spanValue = document.createElement("span");
    const newValue = (value * quantity).toFixed(2);
    spanValue.innerText = newValue;
    itemValue.appendChild(spanValue)
    
    
    productList.appendChild(item);

    total = total + parseFloat(newValue);

    if(save){
        saveProductLocalStorage({product, quantity, value});
    }

    valueFinal();

    productName.value = "";
    productValue.value = "";
    productQuantity.value = "1";
    productName.focus();
}

function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

//Eventos
[productValue].forEach((el) => {
    el.addEventListener("input", (e)=>{
        const updateValue = validDigits(e.target.value);

        e.target.value = updateValue
    })
    
});

addButton.addEventListener("click", ()=>{
    const product = productName.value;
    const value =  +productValue.value.replace(",",".");
    const quantity = +productQuantity.value;

    if(!product || !value)return;

    createProduct(product, value, quantity);

});

document.addEventListener("click", (e)=>{
    const targetEL = e.target;
    const parentEl = targetEL.closest("div");
    let productTitle = parentEl.querySelector("p").innerText

    if (targetEL.classList.contains("bi-trash")){
        const valueSpan = parentEl.querySelector("p span").innerText;

        newValue = parseFloat(valueSpan);

        total = total - newValue;

        valueFinal();

        parentEl.remove();
        removeProductLocalStorage(productTitle);
    }
    
})

clearBtn.addEventListener("click", ()=>{
    removeElementsByClass("table-info");

    total = 0;

    valueFinal();

    localStorage.clear();
})

//Local Starage

const getProductsLocalStorage = () => {
    const products = JSON.parse(localStorage.getItem("products")) || [];

    
    return products;
}

const loadProducts = () =>{
    const products = getProductsLocalStorage();

    products.forEach((product) => {
        createProduct(product.product, product.value, product.quantity, 0)
    });
}

const saveProductLocalStorage = (product) => {
    //Todos os todos da ls
    const products = getProductsLocalStorage();

    //add novo todo no arr
    products.push(product);

    // salvar tudo na ls
    localStorage.setItem('products', JSON.stringify(products));
}

const removeProductLocalStorage = (productName) => {

    const products = getProductsLocalStorage();

    const filterreadProducts = products.filter((products) => products.product !== productName);

    localStorage.setItem('products', JSON.stringify(filterreadProducts));

}

loadProducts();
