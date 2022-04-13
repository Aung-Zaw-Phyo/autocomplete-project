const downMenu = document.querySelector('.downMenu');
const downMenuDown = document.querySelector('.downMenuDown');

downMenu.addEventListener('click', ()=>{
    if (downMenuDown.classList.contains('clicked')) {
    downMenuDown.classList.remove('d-block', 'clicked');
        console.log('click')
        return;
    }
    downMenuDown.classList.add('d-block', 'clicked');

    console.log('hello')
})


// autocomplete section 

const auto = document.querySelector('.auto');
const removeAuto = document.querySelector('.removeAuto');
const autocomplete = document.querySelector('.autocomplete');
const searchInput = document.querySelector('.searchInput');
const resultProduct = document.querySelector('.resultProduct');

auto.addEventListener('click', ()=>{
    autocomplete.style.display='flex';
})

removeAuto.addEventListener('click', ()=>{
    autocomplete.style.display='none';

    searchInput.value='';
    resultProduct.innerHTML='';
})


let products ;
let productsFromApi = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    products = data;
    searchInput.style.display='block';
}
productsFromApi();
let filteredProducts=[];
searchInput.addEventListener('keyup', (event)=>{ 
    
    if (event.key==="ArrowDown" || event.key==="ArrowUp" || event.key==="Enter") {
        selectProductFunction(event.key);
        return;
    }
    indexToSlect = -1;
    resultProduct.innerHTML="";
    let inputValue = event.target.value.toLowerCase();
    if (inputValue.length===0) {
        return;
    }
    filteredProducts = products.filter((product)=>{
        return product.title.toLowerCase().includes(inputValue);
    });

    console.log(filteredProducts)


    if (filteredProducts.length > 0) {

        for (let index = 0; index < filteredProducts.length; index++) {
            const productContainer = document.createElement('div');
            productContainer.id = filteredProducts[index].id;
           
            productContainer.addEventListener('click', ()=>{
                
                const dd = filteredProducts[index].id
                const filtered = filteredProducts.filter((obj)=>{
                    return obj.id === dd
                })
                console.log( filtered[0].title);
                
                showTag.innerHTML='';
                let selContainer = document.createElement('div');
                selContainer.classList.add('selContainer')
                let title = document.createElement('div');
                title.classList.add('selTitle');
                title.append(filtered[0].title);
                let img = document.createElement('img');
                img.classList.add('selImg', 'my-3');
                img.src=filtered[0].image;
                let price = document.createElement('div');
                price.classList.add('selPrice');
                price.append(filtered[0].price)
                
                let btnCon = document.createElement('div');
                btnCon.classList.add('my-3')
                // btn btn-lg btn-danger danger 
                let btnOne = document.createElement('button');
                btnOne.append('Add To Card')
                btnOne.classList.add('btn', 'btn-sm', 'btn-danger', 'danger')
                // btn btn-lg btn-dark dark 
                let btnTwo = document.createElement('button');
                btnTwo.append('Buy Now')
                btnTwo.classList.add('btn', 'btn-sm', 'btn-dark', 'dark', 'ms-3')
                btnCon.append(btnOne, btnTwo);

                selContainer.append(title, img, price, btnCon);
                showTag.append(selContainer);
                modalBtn.click();
                searchInput.value='';
                resultProduct.innerHTML='';
                
            });

            productContainer.classList.add('productcontainer');

            const productTitle = document.createElement('div');
            productTitle.append(filteredProducts[index].title);
            productTitle.classList.add('productTitle')

            const productImg = document.createElement('img');
            productImg.src=filteredProducts[index].image;
            productImg.classList.add('productImg');
            
            productContainer.append(productTitle, productImg);
            resultProduct.append(productContainer);
        }
    }
});
let indexToSlect = -1;
let selectProductFunction =(key) => {
    if (key === "ArrowDown") {
        if (indexToSlect === filteredProducts.length-1) {
            deslectProduct();
            indexToSlect = -1;
            return;
        }
        indexToSlect += 1;
        let selectedProduct = selectProduct(indexToSlect);
        
        if (indexToSlect > 0) {
            deslectProduct();
        }
        selectedProduct.classList.add('selected');

    }else if (key === "ArrowUp") {
        if (indexToSlect === -1) {
            return;
        }
        if (indexToSlect === 0) {
            deslectProduct();
            indexToSlect = -1;
            return;
        }
        indexToSlect -=1;
        deslectProduct();
        
        let selectedProduct = selectProduct(indexToSlect);
        selectedProduct.classList.add('selected');
    } else {
        ppp(indexToSlect)
        searchInput.value='';
        resultProduct.innerHTML='';
    }
}
let selectProduct = (index) =>{
    let selectetProductId = filteredProducts[index].id.toString();
    let selectedProduct = document.getElementById(selectetProductId)
    selectedProduct.style.backgroundColor="blue";
    selectedProduct.firstChild.style.color="white";
    return selectedProduct;
}
let deslectProduct = () => {
    let selectedProduct = document.getElementsByClassName('selected')[0];
    selectedProduct.style.backgroundColor='white';
    selectedProduct.firstChild.style.color='black';
    selectedProduct.classList.remove('selected');
}
const showTag = document.querySelector('.showTag');
 const modalBtn = document.querySelector('.modalBtn');
let ppp = (index) =>{
        

        showTag.innerHTML='';
        let selectetProduct = filteredProducts[index];
        let selContainer = document.createElement('div');
        selContainer.classList.add('selContainer')
        let title = document.createElement('div');
        title.classList.add('selTitle');
        title.append(selectetProduct.title);
        let img = document.createElement('img');
        img.classList.add('selImg', 'my-3');
        img.src=selectetProduct.image;
        let price = document.createElement('div');
        price.classList.add('selPrice');
        price.append(selectetProduct.price)
        
        let btnCon = document.createElement('div');
        btnCon.classList.add('my-3')
        // btn btn-lg btn-danger danger 
        let btnOne = document.createElement('button');
        btnOne.append('Add To Card')
        btnOne.classList.add('btn', 'btn-sm', 'btn-danger', 'danger')
        // btn btn-lg btn-dark dark 
        let btnTwo = document.createElement('button');
        btnTwo.append('Buy Now')
        btnTwo.classList.add('btn', 'btn-sm', 'btn-dark', 'dark', 'ms-3')
        btnCon.append(btnOne, btnTwo);

        selContainer.append(title, img, price, btnCon);
        showTag.append(selContainer);
        modalBtn.click();
}