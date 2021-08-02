//Add item
function setAddItemListener() {
    $('.itemOptions').on('click', 'li', addItem);
}

function startListeners() {

    //Open cart
    $('.cartButton').on('click', openCart);
    $('.cartGoBackButton').on('click', openCart);
    //Close cart
    $('.cartSection').on('click', closeCart);
    $('.cartCloseButton').on('click', closeCart);

    //Clean order
    $('.cleanButton').on('click', deleteOrder);
    //Open delivery menu
    $('.continueButton').on('click', openDelivery);

    //Name input
    $('#name').on('change', saveDeliveryData);
    //Phone input
    $('#phone').on('change', saveDeliveryData);
    //Delivery input
    $('#delivery').on('click', {
        disabled: false
    }, setDeliveryDisabled);
    $('#delivery').on('change', saveDeliveryData);
    //Takeaway input
    $('#takeAway').on('click', {
        disabled: true
    }, setDeliveryDisabled);
    $('#takeAway').on('change', saveDeliveryData);
    //Address input
    $('#address').on('change', saveDeliveryData);

    //Pay order
    $('.payButton').on('click', payOrder);

}