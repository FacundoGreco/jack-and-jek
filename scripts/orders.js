function addNewCombo() {
    
    let btnAddCombo = document.getElementById('addCombo');
    let combo = document.getElementById('combo');
    let newCombo = combo.cloneNode(true);

    btnAddCombo.before(newCombo);
}



function setDeliveryDisabled(disabled) {

    let address = document.getElementById('address');
    address.disabled = disabled;

}