const modal = document.querySelector('#modal');
const screen = document.querySelector('.screen');
const sections = document.querySelectorAll('.section');
const next = document.querySelector('#next');
const span = document.getElementsByClassName("close")[0];

let currentSection = 0;

function imageOnClickModal(id) {
    let modal = document.getElementsByClassName('modalImg');

    let img = document.getElementById(id);
    let modalImg = document.getElementById("img01");

    modal[0].style.display = "block";
    modalImg.src = img.src;
}

span.onclick = function() { 
    let modal = document.getElementsByClassName('modalImg')[0];
    modal.style.display = "none"; 
}

var basket = {
    items: [],
    totalItems: 0,
    summ: 0,
    addItem: function (newItem) {

        let searchItem = this.items.find(item => item.name == newItem.name);

        if (searchItem == null) {
            this.items.push(newItem);
        } else {
            searchItem.count = searchItem.count + 1;
            searchItem.summ = searchItem.count*searchItem.price;
        }
    },
    getSumm: function(){
        let summLocal = 0;
        let totalItemLocal = 0;
        for (let i = 0; i < this.items.length; i++){ //
            price = this.items[i].price;
            count = this.items[i].count;  
            totalItemLocal = totalItemLocal + count;
            summLocal = summLocal + (count*price); //Цена * количество
        }
        this.totalItems = totalItemLocal;
        this.summ = summLocal;
    }
}

//структура элемента "Товар"        
function getItem(data){
    var item = {
        name:   data[0],
        price:  data[1],
        count:  data[2],            
        character: data[3],
        summ: data[1]*data[2]
    }
    return item;
}

function addItemOnBasket(data) {
    item = getItem(data);
    basket.addItem(item);
    basket.getSumm();
    updateBasket();
}

function updateBasketItems(id) {
    if (id<=basket.items.length) {
        let thisItemValue = document.getElementById('basket-item-count-'+id);
        basket.items[id]['count'] = Number(thisItemValue.value);
        updateBasket();
    }
}

function deleteItemFromBasket(id) {
   if (id<=basket.items.length) {
        basket.items.splice(id, 1);
        updateBasket();
    } 
}

function updateBasket(){

    let divBasket = document.getElementById("basket_id");
    divBasket.style.display = "flex";
    divBasket.style.flexDirection = "column";

    let divBasketText = "";
    let html = "";

    if (basket.items.length == 0 ){
        divBasketText = "<p>Корзина пуста!</p>";
        divBasket.innerHTML = divBasketText;
    } else {
        divBasketText = "";
        divBasket.innerHTML = divBasketText;
        
        totalItems = 0;
        totalSum = 0;
        //Выводим элементы "корзины"
        for (let i = 0; i < basket.items.length; i++){

            let itemCount = basket.items[i]['count'];       
            basket.items[i]['summ'] = itemCount * basket.items[i]['price'];
            
            totalItems = totalItems + itemCount;
            totalSum = totalSum + basket.items[i]['summ'];
            
            //получаем текущий элемент-товар
            let outputItem = basket.items[i];
    
            html = html + `<div id="item-${i}" class="basket-item">  
                    <div class="basket-item-left">
                        <p><b>Наименование: </b> ${outputItem.name} ${outputItem.character}      
                        </p>
                        <p><b>Количество: </b>
                            <input type="number" id="basket-item-count-${i}" class="basket-item-counter" value="${outputItem.count}"  onchange="updateBasketItems(${i})"></input>
                        </p>
                        <p><b>Цена: </b>
                            ${outputItem.price}
                        </p>
                        <p><b>Сумма: </b>
                            <p id="itemSum" class="basket-item-sum">${outputItem.summ}</p>
                        </p>
                        <button data-id="${i}" class="basket-item_btn" onclick="deleteItemFromBasket(${i})">Удалить</button>
                    </div>
                    <div class="basket-item-right">
                        <!--img-->
                    </div>
                </div>`;       
        }
        
        divBasket.insertAdjacentHTML('beforeend', html);
        
        basket.totalItems = totalItems;
        basket.summ = totalSum;
        
        let basketSummary = document.createElement("basketSummary");
        basketSummary.style.display = "flex";
        basketSummary.style.flexDirection = "column";
        basketSummary.innerHTML = "<hr><p>В корзине: "+basket.totalItems+" товаров на сумму: "+basket.summ+" рублей</p>";
        divBasket.appendChild(basketSummary);
  
    }

}

function openBasket() {
    modal.style.display = 'block';
    updateBasket();
}

screen.addEventListener('click', function(e) {
    modal.style.display = 'none';
})

document.addEventListener('keydown', function(e){
    if(e.key == 'Escape') {
        modal.style.display = 'none';
    }
})

function showSection(id) {
    sections[currentSection].classList.remove('opened');
    sections[id].classList.add('opened');
    currentSection = id;
}

next.addEventListener('click', function(){
    if (currentSection + 1 < sections.length) {
        showSection(currentSection + 1);
    } 
})

prev.addEventListener('click', function(){
    if (currentSection - 1 >= 0) {
        showSection(currentSection - 1);
    } 
})

showSection(0);
