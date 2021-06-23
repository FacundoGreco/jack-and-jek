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
            savedCombo = document.querySelector(`#combo0`);
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

    return combo;
}