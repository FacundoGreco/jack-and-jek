/* GLOBAL VARIABLES */
const comboModel = document.querySelector('#combo').cloneNode(true);
const btnAddCombo = document.querySelector('#addCombo');

let order = [];
let comboCounter = 1;
let comboIdNumber = 0;

/* CLASS COMBOS */
class Combos {

    constructor(comboId, burger, slices, chips, clarifications) {

        this.comboId = comboId;
        this.burger = burger;
        this.slices = slices;
        this.chips = chips;
        this.clarifications = clarifications;

    }

    saveComboInLocalStorage() {

        const comboJSON = JSON.stringify(this);
        localStorage.setItem(this.comboId, comboJSON); //Saves in local storage

    }

    deleteComboInLocalStorage() {

        localStorage.removeItem(this.comboId); //Removes from local storage

    }

    appendSavedCombo(firstCombo) {

        let savedCombo;

        if (firstCombo) {
            savedCombo = document.querySelector(`#combo`);
        } else {
            savedCombo = comboModel.cloneNode(true);
            btnAddCombo.before(savedCombo);
        }
        savedCombo.id = this.comboId;

        const burger = document.querySelector(`#${this.comboId} #burger option[value=${this.burger}]`);
        const slices = document.querySelector(`#${this.comboId} #slices option[value=${this.slices}]`);
        const chips = document.querySelector(`#${this.comboId} #chips option[value=${this.chips}]`);
        const clarifications = document.querySelector(`#${this.comboId} #clarifications`);

        burger.selected = true;
        slices.selected = true;
        chips.selected = true;
        clarifications.value = this.clarifications;

    }

}

/* CREATE COMBO OBJECT */
function createCombo(comboId) {

    const burger = document.querySelector(`#${comboId} #burger`).value;
    const slices = document.querySelector(`#${comboId} #slices`).value;
    const chips = document.querySelector(`#${comboId} #chips`).value;
    const clarifications = document.querySelector(`#${comboId} #clarifications`).value;

    const combo = new Combos(comboId, burger, slices, chips, clarifications);
    combo.saveComboInLocalStorage();
    order.push(combo); //Saves in order array

}


/* ADD NEW COMBO */
function addNewCombo() {

    const newComboId = `combo${comboIdNumber+1}`;

    let newCombo = comboModel.cloneNode(true);
    newCombo.id = newComboId;
    btnAddCombo.before(newCombo);

    createCombo(newComboId);

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

/* LOAD ORDER */
function loadOrder() {

    if (localStorage.length == 0) {

        createCombo('combo');

    } else {

        comboCounter = localStorage.length;
        comboIdNumber = localStorage.length - 1;

        for (let i = 0; i < localStorage.length; i++) {

            const comboId = localStorage.key(i);
            const combo = JSON.parse(localStorage.getItem(comboId));
            order.push(new Combos(combo.comboId, combo.burger, combo.slices, combo.chips, combo.clarifications));

            if (i === 0) {
                order[i].appendSavedCombo(true);
            } else {
                order[i].appendSavedCombo(false);
            }

        }

    }

}

/* SET DELIVERY DISABLED */
function setDeliveryDisabled(disabled) {

    let address = document.querySelector('#address');
    address.disabled = disabled;

}

loadOrder();