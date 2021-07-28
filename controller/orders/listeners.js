//Add item
function setAddItemListener() {
    $('.itemOptions').click('li', addItem);
}

function startListeners() {

    //Open cart
    $('.cartButton').click(openCart);
    $('.cartGoBackButton').click(openCart);
    //Close cart
    $('.cartSection').click(closeCart);
    $('.cartCloseButton').click(closeCart);

    //Clean order
    $('.cleanButton').click(deleteOrder);
    //Open delivery menu
    $('.continueButton').click(openDelivery);

    //Name input
    $('#name').change(saveDeliveryData);
    //Phone input
    $('#phone').change(saveDeliveryData);
    //Delivery input
    $('#delivery').click({
        disabled: false
    }, setDeliveryDisabled);
    $('#delivery').change(saveDeliveryData);
    //Takeaway input
    $('#takeAway').click({
        disabled: true
    }, setDeliveryDisabled);
    $('#takeAway').change(saveDeliveryData);
    //Address input
    $('#address').change(saveDeliveryData);

    //Pay order
    $('.payButton').click(payOrder);

}