/* GLOBAL VARIABLES  */
const cartSectionNode = document.querySelector('.cartSection');
const cartCloseButton = document.querySelector('.cartCloseButton');

let order = [];


/* FILLS MENU WITH PRODUCTS  */
products.forEach(product => {
    product.appendProduct();
});

/* FILLS CART WITH ITEMS */
orderJSON = localStorage.getItem('order');
if (orderJSON != null) {
    
    order = JSON.parse(orderJSON);
    order.forEach(item => {
        item = new Items(item.type, item.name, item.size, item.prices, item.clarifications);
        item.appendItem();
    });

}

/* OPEN CART */
function openCart() {
    cartSectionNode.classList = `cartSection cartSectionOpened`;
}

/* CLOSE CART */
function closeCart(e) {
    if ((e.target == cartSectionNode) || (e.target == cartCloseButton)) {
        
        cartSectionNode.classList = `cartSection cartSectionClosed`;
        
    }
}

/* LOAD PRICES */
function loadPrices(optionsLength, itemPricesNode) {
    let prices = []
    let j = 0;
    for (let i = 0; i < optionsLength; i++) {

        prices[i] = [itemPricesNode[j].innerHTML, itemPricesNode[j+1].innerHTML];            
        j+=2;

    }

    return prices;
}

/* ADD ITEM */
function addItem(e) {
    const selectedOptionNode =  e.target.parentNode;
    const itemOptionsNode =  selectedOptionNode.parentNode;
    const productNode = itemOptionsNode.parentNode;
    const itemOptionsArray = Array.from(itemOptionsNode.querySelectorAll('li'));
    const itemPricesNode = Array.from(itemOptionsNode.querySelectorAll('li p'));
    
    const type = productNode.classList.value;
    const name = productNode.querySelector('.itemName h4').innerHTML;
    const size = itemOptionsArray.indexOf(selectedOptionNode);
    
    const prices = loadPrices(itemOptionsArray.length, itemPricesNode);
    
    const item = new Items(type, name, size, prices,'');
    item.appendItem();
    order.push(item);
    localStorage.setItem('order', JSON.stringify(order));
}

/* DELETE ITEM */
function deleteItem(e) {

    const itemNode = e.target.parentNode.parentNode;
    console.log(itemNode);
    const itemsInCart = Array.from(itemNode.parentNode.querySelectorAll('li'));
    console.log(itemsInCart);
    const itemIndex = itemsInCart.findIndex(li => li == itemNode);
    console.log(itemIndex);

    itemNode.parentNode.removeChild(itemNode);
    order.splice(itemIndex, 1); //Removes item from order array
    localStorage.setItem('order', JSON.stringify(order));

}
