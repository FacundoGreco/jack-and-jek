/* GLOBAL VARIABLES  */
let cartSectionNode;
let menuContainerNode;
let cartContainerNode;
let deliveryContainerNode;
let paymentContainerNode;
let cartTotalPrice;

let order;
let deliveryData;




/* FILLS MENU WITH PRODUCTS  */
function fillMenu() {

    menuContainerNode.slideUp(0);
    loadProducts();

}

/* FILLS CART WITH ITEMS */
function fillCart() {

    const orderJSON = localStorage.getItem('order');
    if (orderJSON != null) {

        order = JSON.parse(orderJSON);
        order.forEach(item => {
            item = new Items(item.type, item.name, item.size, item.prices, item.clarifications);
            item.appendItem();
        });

    }
    cartTotalPrice.innerHTML = getTotalPrice(); //Refresh total price

}

/* FILLS DELIVERY DATA */
function fillDeliveryData() {

    const deliveryDataJSON = localStorage.getItem('deliveryData');
    if (deliveryDataJSON != null) {

        deliveryData = JSON.parse(deliveryDataJSON);

        deliveryContainerNode.querySelector('#name').value = deliveryData[0];
        deliveryContainerNode.querySelector('#phone').value = deliveryData[1];
        if (deliveryData[2] != null) {
            deliveryContainerNode.querySelector(`#${deliveryData[2]}`).checked = true;
        }
        deliveryContainerNode.querySelector('#address').value = deliveryData[3];

    }

}


/* OPEN CART */
function openCart() {
    cartSectionNode.classList = `cartSection cartSectionOpened`;
    deliveryContainerNode.classList = `deliveryContainer`;
    cartContainerNode.classList.toggle(`cartContainerOpened`);
    $('.cartContainer').slideUp(0);
    $('.cartContainer').slideDown(300);
}

/* OPEN DELIVERY */
function openDelivery() {
    cartContainerNode.classList.toggle(`cartContainerOpened`);
    deliveryContainerNode.classList.toggle(`deliveryContainerOpened`);
    setDateAndHour();

    $('.deliveryContainer').slideUp(0);
    $('.deliveryContainer').slideDown(300);
}

/* CLOSE CART */
function closeCart(e) {
    if ((e.target == cartSectionNode) || (e.target.classList.value == 'cartCloseButton')) {

        cartSectionNode.classList = `cartSection`;
        cartContainerNode.classList = `cartContainer`;
        deliveryContainerNode.classList = `deliveryContainer`;
        paymentContainerNode.classList = `paymentContainer`;

        $('.paymentContainer').animate({
            left: -5000
        }, 0);

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

    showNotification();
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
function deleteOrder(e) {
    e ? e.preventDefault() : null;

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
function setDeliveryDisabled(e) {
    const disabled = e.data.disabled;

    const addressInput = deliveryContainerNode.querySelector('#address');
    addressInput.disabled = disabled;

}

/* PAY ORDER */
function payOrder(e) {
    e.preventDefault();

    cartContainerNode.classList = `cartContainer`;
    deliveryContainerNode.classList = `deliveryContainer`;
    paymentContainerNode.classList.toggle(`paymentContainerOpened`);

    $.post("/api/orders", JSON.stringify(order),
        function (data, textStatus, jqXHR) {
            
            console.log('Orden enviada.');
        },
        "JSON"
    );

    deleteOrder();

    $('.paymentContainer').animate({
        left: 0
    }, 300);
}



/* ON PAGE OPENED */
function ordersMain() {

    //Inicializes products variables
    burgersSectionNode = document.querySelector('.burgersSection');
    guarnitionSectionNode = document.querySelector('.guarnitionSection');
    products = [];

    //Inicializes items variables
    cartItemsNode = document.querySelector('.cartItems');

    //Inicializes ordersFunctions variables
    notificationContainerNode = $('.notificationContainer');
    date = new Date();
    dateInput = document.querySelector('.deliveryContainer #date');
    timeOptions = [2000, 2030, 2100, 2130, 2200, 2230, 2300];

    notificationContainerNode.fadeOut(0);


    //Inicializes variables
    cartSectionNode = document.querySelector('.cartSection');
    menuContainerNode = $('.menuContainer');
    cartContainerNode = cartSectionNode.querySelector('.cartContainer');
    deliveryContainerNode = cartSectionNode.querySelector('.deliveryContainer');
    paymentContainerNode = cartSectionNode.querySelector('.paymentContainer');
    cartTotalPrice = cartSectionNode.querySelectorAll('.totalPrice h4')[1];

    order = [];
    deliveryData = [];

    //Run functions
    fillMenu();
    fillCart();
    fillDeliveryData();
    startListeners();

}
ordersMain();

/* ON HASH CHANGE */
window.addEventListener('hashchange', () => {

    const userPath = parseLocation();

    if (userPath === '/orders') ordersMain();

});