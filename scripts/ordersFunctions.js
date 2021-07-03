/* GET TOTAL PRICE */
function getTotalPrice() {
    const itemSubTotalNodes = Array.from(cartItemsNode.querySelectorAll('li .itemPrice p'));
    let totalPrice = 0;

    itemSubTotalNodes.forEach(price => {
        const subTotal = Number(price.innerHTML.slice(1));
        totalPrice += subTotal;
    });

    return `$${totalPrice}`;
}

/* LOAD PRICES */
function loadPrices(optionsLength, itemPricesNode) {
    let prices = []
    let j = 0;
    for (let i = 0; i < optionsLength; i++) {

        prices[i] = [itemPricesNode[j].innerHTML, itemPricesNode[j + 1].innerHTML];
        j += 2;

    }

    return prices;
}

/* GET ITEM INDEX */
function getItemIndex(itemNode) {
    const itemsInCart = Array.from(itemNode.parentNode.querySelectorAll('li'));
    const itemIndex = itemsInCart.findIndex(li => li == itemNode);

    return itemIndex;
}

/* GET DELIVERY OPTION */
function getDeliveryOption() {
    
    const radioChecked = Array.from(deliveryContainerNode.querySelectorAll('input[name="delyOrTakeAway"]')).find(radio => radio.checked);
    const deliveryId = radioChecked ? radioChecked.id : false;

    if (deliveryId) {
        return deliveryId;
    } else {
        return null;
    }

}