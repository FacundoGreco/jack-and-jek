const cartItemsNode = document.querySelector('.cartItems');

class Items {

    constructor(type, name, size, prices, clarifications) {
        this.type = type;
        this.name = name;
        this.size = size;
        this.prices = prices;
        this.clarifications = clarifications;
    }

    appendItem() {

        const itemNode = document.createElement('li');
        itemNode.className = `${this.type}`;
        itemNode.innerHTML = `
        <div class="itemName">
            <img class="icon deleteItem" src="https://i.ibb.co/7SGTXX5/delete-product.png"
                alt="Eliminar Producto" onclick="deleteItem(event)">
            <h4>${this.name}</h4>
        </div>

        <div class="itemSize">
            <select class="form-control" name="size" onchange="saveItem(event)">
                <option value="${this.prices[0][0]}">${this.prices[0][0]}</option>
                <option value="${this.prices[1][0]}">${this.prices[1][0]}</option>
                <option value="${this.prices[2][0]}">${this.prices[2][0]}</option>
            </select>
        </div>

        <div class="itemClarifications">
            <input class="form-control" type="text" name="clarifications" value="${this.clarifications}" onchange="saveItem(event)">
        </div>

        <div class="itemPrice">
            <p>${this.prices[this.size][1]}</p>
        </div>`;
        itemNode.querySelectorAll(`.itemSize select option`)[this.size].selected = true;

        cartItemsNode.appendChild(itemNode);
    }
}