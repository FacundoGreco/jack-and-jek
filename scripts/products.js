const burgersSectionNode = document.querySelector('.burgersSection');
const guarnitionSectionNode = document.querySelector('.guarnitionSection');
let products = [];

class Products {

    constructor(type, imgSrc, name, prices) {
        this.type = type;
        this.imgSrc = imgSrc;
        this.name = name;
        this.prices = prices;
        this.section = type === 'burger' ? burgersSectionNode : guarnitionSectionNode;
    }

    appendProduct() {

        const productNode = document.createElement('li');
        productNode.className = `${this.type}Item`;
        productNode.innerHTML = `
        <div class="itemName">
        <img class="icon" src="${this.imgSrc}" alt="${this.name}">
        <h4>${this.name}</h4>
        </div>
        <ul class="itemOptions">
            <li>
                <p>${this.prices[0][0]}</p>
                <p>$${this.prices[0][1]}</p>
            </li>
            <li>
                <p>${this.prices[1][0]}</p>
                <p>$${this.prices[1][1]}</p>
            </li>
            <li>
                <p>${this.prices[2][0]}</p>
                <p>$${this.prices[2][1]}</p>
            </li>
        </ul>`;

        this.section.appendChild(productNode);
    }
}

function loadProducts() {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5500/scripts/products.json",
        dataType: "JSON",
        success: function (response) {
            products = response;

            products.forEach(product => {
                product = new Products(product.type, product.imgSrc, product.name, product.prices);
                product.appendProduct();
            });

            setAddItemListener(); //Add Item listener
            menuContainerNode.slideDown(700); //Slides down menu

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error al cargar productos: ', errorThrown);
        }
    });
}