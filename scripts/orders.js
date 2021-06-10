const combo = document.getElementById('combo');

let comboCounter = 1;
let comboIdNumber = 0;

function addNewCombo() {

    const btnAddCombo = document.getElementById('addCombo');
    const newComboId = "combo" + (comboIdNumber + 1);

    let newCombo = combo.cloneNode(true);
    newCombo.id = newComboId;
    btnAddCombo.before(newCombo);

    let deleteButtons = document.getElementsByClassName("delete");
    deleteButtons[deleteButtons.length-1].setAttribute("onclick", "deleteCombo('"+newComboId+"');");

    comboIdNumber++;
    comboCounter++;
}

function deleteCombo(comboId) {

    if (comboCounter > 1) {

        const orderArea = document.getElementById("orderArea");
        const combo = document.getElementById(comboId);
        
        orderArea.removeChild(combo);
        comboCounter--;
    }

}

function setDeliveryDisabled(disabled) {

    let address = document.getElementById('address');
    address.disabled = disabled;

}