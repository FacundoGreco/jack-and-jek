const notificationContainerNode = document.querySelector('.notificationContainer');
const date = new Date();
const dateInput = document.querySelector('.deliveryContainer #date');
const timeOptions = [2000, 2030, 2100, 2130, 2200, 2230, 2300];

/* GET TOTAL PRICE */
function showNotification() {

    notificationContainerNode.classList.toggle('notificationContainerOpened');

    setTimeout(() => {

        notificationContainerNode.classList.toggle('notificationContainerOpened');

    }, 1000);
}


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

/* GET TODAY */
function getToday() {

    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const today = `${date.getFullYear()}-${month}-${day}`

    return today;
}

/* GET MAX DATE */
function getMaxDate() {

    let maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    maxDate = `${maxDate.getFullYear()}-${('0' + (maxDate.getMonth() + 1)).slice(-2)}-${('0' + maxDate.getDate()).slice(-2)}`;

    return maxDate;
}

/* GET TIME */
function getTime() {

    const hour = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${hour}${minutes}`;
}

/* SET DATE AND HOUR */
function setDateAndHour() {

    const today = getToday();
    const time = getTime();

    //Sets date available options
    dateInput.min = today;
    dateInput.value = today;
    dateInput.max = getMaxDate();

    //Sets time available options
    for (let i = 0; i < timeOptions.length; i++) {

        if (timeOptions[i] > time) {
            deliveryContainerNode.querySelector(`#hour option[value="${timeOptions[i]}"]`).selected = true;
            break;

        } else {
            deliveryContainerNode.querySelector(`#hour option[value="${timeOptions[i]}"]`).disabled = true;
        }
    };

}