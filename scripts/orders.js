const combo = document.querySelector('#combo');

let comboCounter = 1;
let comboIdNumber = 0;

function addNewCombo() {

    const btnAddCombo = document.querySelector('#addCombo');
    const newComboId = `combo${comboIdNumber+1}`;

    let newCombo = combo.cloneNode(true);
    newCombo.id = newComboId;
    btnAddCombo.before(newCombo);

    let deleteButtons = document.querySelectorAll('.delete');
    deleteButtons[deleteButtons.length-1].setAttribute('onclick', `deleteCombo('${newComboId}');`);

    comboIdNumber++;
    comboCounter++;
}

function deleteCombo(comboId) {

    if (comboCounter > 1) {

        const combo = document.querySelector(`#${comboId}`);
        
        combo.parentNode.removeChild(combo);
        comboCounter--;

    }

}

function setDeliveryDisabled(disabled) {

    let address = document.querySelector('#address');
    address.disabled = disabled;

}