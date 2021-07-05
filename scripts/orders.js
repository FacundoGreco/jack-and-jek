/* GLOBAL VARIABLES  */
const cartSectionNode = document.querySelector('.cartSection');
const cartContainerNode = cartSectionNode.querySelector('.cartContainer');
const deliveryContainerNode = cartSectionNode.querySelector('.deliveryContainer');
const paymentContainerNode = cartSectionNode.querySelector('.paymentContainer');
const cartTotalPrice = cartSectionNode.querySelectorAll('.totalPrice h4')[1];

let order = [];
let deliveryData = [];


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
cartTotalPrice.innerHTML = getTotalPrice(); //Refresh total price

/* FILLS DELIVERY DATA */
const date = new Date();
const day = date.toISOString().slice(0, -14);
let hour = `${date.getHours()}${date.getMinutes()}`;
const dateInput = deliveryContainerNode.querySelector('#date');
const hourOptions = [2000, 2030, 2100, 2130, 2200, 2230, 2300];

//Sets date available options
dateInput.min = day;
dateInput.value = day;
dateInput.max = getMaxDate(day);

//Sets hour available options
for(let i = 0; i < hourOptions.length; i++) {

    if (hourOptions[i] > hour) {
        deliveryContainerNode.querySelector(`#hour option[value="${hourOptions[i]}"]`).selected = true;
        break;

    } else {
        deliveryContainerNode.querySelector(`#hour option[value="${hourOptions[i]}"]`).disabled = true;
    }
};

//Sets storaged data
deliveryDataJSON = localStorage.getItem('deliveryData');
if (deliveryDataJSON != null) {

    deliveryData = JSON.parse(deliveryDataJSON);

    deliveryContainerNode.querySelector('#name').value = deliveryData[0];
    deliveryContainerNode.querySelector('#phone').value = deliveryData[1];
    if (deliveryData[2] != null) {
        deliveryContainerNode.querySelector(`#${deliveryData[2]}`).checked = true;
    }
    deliveryContainerNode.querySelector('#address').value = deliveryData[3];
    
}


/* OPEN CART */
function openCart() {
    cartSectionNode.classList = `cartSection cartSectionOpened`;
    cartContainerNode.classList = `cartContainer cartContainerOpened`;
    deliveryContainerNode.classList = `deliveryContainer deliveryContainerClosed`;
    paymentContainerNode.classList = `paymentContainer paymentContainerClosed`;
}

/* OPEN DELIVERY */
function openDelivery() {
    cartContainerNode.classList = `cartContainer cartContainerClosed`;
    deliveryContainerNode.classList = `deliveryContainer deliveryContainerOpen`;
}

/* CLOSE CART */
function closeCart(e) {
    if ((e.target == cartSectionNode) || (e.target.classList.value == 'cartCloseButton')) {

        cartSectionNode.classList = `cartSection cartSectionClosed`;

    }
}

/* ADD ITEM */
function addItem(e) {
    const selectedOptionNode = e.target.parentNode;
    const itemOptionsNode = selectedOptionNode.parentNode;
    const productNode = itemOptionsNode.parentNode;
    const itemOptionsArray = Array.from(itemOptionsNode.querySelectorAll('li'));
    const itemPricesNode = Array.from(itemOptionsNode.querySelectorAll('li p'));

    const type = productNode.classList.value;
    const name = productNode.querySelector('.itemName h4').innerHTML;
    const size = itemOptionsArray.indexOf(selectedOptionNode);

    const prices = loadPrices(itemOptionsArray.length, itemPricesNode);

    const item = new Items(type, name, size, prices, '');
    item.appendItem(); //Appends item
    cartTotalPrice.innerHTML = getTotalPrice(); //Refresh total price

    order.push(item);
    localStorage.setItem('order', JSON.stringify(order));
}

/* DELETE ITEM */
function deleteItem(e) {

    const itemNode = e.target.parentNode.parentNode;
    const itemIndex = getItemIndex(itemNode);

    itemNode.parentNode.removeChild(itemNode); //Removes item
    cartTotalPrice.innerHTML = getTotalPrice(); //Refresh total price

    order.splice(itemIndex, 1); //Removes item from order array
    localStorage.setItem('order', JSON.stringify(order));
}

/* SAVE ITEM */
function saveItem(e) {

    const itemNode = e.target.parentNode.parentNode;
    const itemIndex = getItemIndex(itemNode);

    const type = itemNode.classList.value;
    const name = itemNode.querySelector('.itemName h4').innerHTML;
    const size = itemNode.querySelector('.itemSize select option:checked').value;
    const clarifications = itemNode.querySelector('.itemClarifications input').value;
    const prices = order[itemIndex].prices;
    const sizeIndex = prices.findIndex(option => option[0] == size); //Gets index of the size of the item.
    const price = prices[sizeIndex][1];

    itemNode.querySelector('.itemPrice p').innerHTML = price; //Refresh price
    cartTotalPrice.innerHTML = getTotalPrice(); //Refresh total price 

    order[itemIndex] = new Items(type, name, sizeIndex, prices, clarifications);
    localStorage.setItem('order', JSON.stringify(order));
}

/* DELETE ORDER */
function deleteOrder() {

    cartItemsNode.innerHTML = '';
    cartContainerNode.querySelectorAll('.totalPrice h4')[1].innerHTML = '';
    order = [];
    localStorage.removeItem('order');

}

/* SAVE DELIVERY DATA */
function saveDeliveryData() {

    const name = deliveryContainerNode.querySelector('#name').value;
    const phone = deliveryContainerNode.querySelector('#phone').value;
    const address = deliveryContainerNode.querySelector('#address').value;
    const delivery = getDeliveryOption();

    deliveryData = [name, phone, delivery, address];
    localStorage.setItem('deliveryData', JSON.stringify(deliveryData));

}

/* SET DELIVERY DISABLED */
function setDeliveryDisabled(disabled) {

    const addressInput = deliveryContainerNode.querySelector('#address');
    address.disabled = disabled;

}

/* PAY ORDER */
function payOrder(e) {
    e.preventDefault();

    cartContainerNode.classList = `cartContainer cartContainerClosed`;
    deliveryContainerNode.classList = `deliveryContainer deliveryContainerClosed`;
    paymentContainerNode.classList = `paymentContainer paymentContainerOpened`;

    deleteOrder();
}