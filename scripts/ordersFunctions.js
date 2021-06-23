/* GLOBAL VARIABLES */
const comboModel = document.querySelector('#combo0').cloneNode(true);
const btnAddCombo = document.querySelector('#addCombo');

let order = [];
let comboCounter = 1;
let comboIdNumber = 0;


/* ADD NEW COMBO */
function addNewCombo() {

    const newComboId = `combo${comboIdNumber+1}`;

    let newCombo = comboModel.cloneNode(true);
    newCombo.id = newComboId;
    btnAddCombo.before(newCombo);

    order.push(createCombo(newComboId));

    comboIdNumber++;
    comboCounter++;

}

/* DELETE COMBO */
function deleteCombo(deleteButton) {

    if (comboCounter > 1) {

        const comboNode = deleteButton.parentNode.parentNode;
        const comboId = comboNode.id;
        const combo = order.find(combo => combo.comboId == comboId);

        combo.deleteComboInLocalStorage();
        order.splice(order.indexOf(combo), 1); //Removes from order array
        comboNode.parentNode.removeChild(comboNode);
        comboCounter--;

    }

}

/* SAVE COMBO */
function saveCombo(element) {

    const comboId = element.parentNode.parentNode.id;
    const comboIndex = order.indexOf(order.find(combo => combo.comboId == comboId));
    const combo = order[comboIndex];

    combo.burger = document.querySelector(`#${comboId} #burger`).value;
    combo.slices = document.querySelector(`#${comboId} #slices`).value;
    combo.chips = document.querySelector(`#${comboId} #chips`).value;
    combo.clarifications = document.querySelector(`#${comboId} #clarifications`).value;

    combo.saveComboInLocalStorage();

}

/* FILL ORDER ARRAY FROM LOCAL STORAGE */
function fillOrderArray() {
    for (let i = 0; i < localStorage.length; i++) {
        const comboId = localStorage.key(i);
        const combo = JSON.parse(localStorage.getItem(comboId));
        order.push(new Combos(combo.comboId, combo.burger, combo.slices, combo.chips, combo.clarifications));
    }
}

/* SORT ORDER ARRAY */
function sortOrderArray() {
    order.sort((a, b) => parseInt(a.comboId.slice(5)) - parseInt(b.comboId.slice(5)));
}

/* LOAD ORDER */
function loadOrder() {

    if (localStorage.length == 0) {

        order.push(createCombo('combo0')); // Creates combo object and saves in order array

    } else {

        fillOrderArray();
        sortOrderArray();

        // Adds nodes
        for (let i = 0; i < order.length; i++) {
            if (i === 0) {
                order[i].appendSavedCombo(true);
            } else {
                order[i].appendSavedCombo(false);
            }
        }

        comboCounter = order.length;
        comboIdNumber = parseInt((order[order.length - 1]).comboId.slice(5));

    }

}

/* SET DELIVERY DISABLED */
function setDeliveryDisabled(disabled) {

    let address = document.querySelector('#address');
    address.disabled = disabled;

}

loadOrder();