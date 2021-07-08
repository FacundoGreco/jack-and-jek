const burgersSectionNode = document.querySelector('.burgersSection');
const guarnitionSectionNode = document.querySelector('.guarnitionSection');

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
            <li onclick="addItem(event)">
                <p>${this.prices[0][0]}</p>
                <p>$${this.prices[0][1]}</p>
            </li>
            <li onclick="addItem(event)">
                <p>${this.prices[1][0]}</p>
                <p>$${this.prices[1][1]}</p>
            </li>
            <li onclick="addItem(event)">
                <p>${this.prices[2][0]}</p>
                <p>$${this.prices[2][1]}</p>
            </li>
        </ul>`;

        this.section.appendChild(productNode);
    }
}

let products = [
    new Products('burger', 'https://i.ibb.co/LxmZJfq/jack-bacon.jpg', 'Jack Bacon', [
        ['Simple', 360],
        ['Doble', 520],
        ['Triple', 670]
    ]),
    new Products('burger', 'https://i.ibb.co/0B5zmDg/jack-crispy.jpg', 'Jack Crispy', [
        ['Simple', 350],
        ['Doble', 510],
        ['Triple', 630]
    ]),
    new Products('burger', 'https://i.ibb.co/DtF67kX/jack-cuarto.jpg', 'Jack Cuarto', [
        ['Simple', 330],
        ['Doble', 480],
        ['Triple', 590]
    ]),
    new Products('burger', 'https://i.ibb.co/9wT92j3/jack-cheese.jpg', 'Jack Cheese', [
        ['Simple', 310],
        ['Doble', 470],
        ['Triple', 590]
    ]),
    new Products('burger', 'https://i.ibb.co/Z2F1tjN/jack-smoke.jpg', 'Jack Smoke', [
        ['Simple', 410],
        ['Doble', 550],
        ['Triple', 690]
    ]),
    new Products('burger', 'https://i.ibb.co/nRx27yy/jack-guacamole.jpg', 'Jack Guacamole', [
        ['Simple', 390],
        ['Doble', 530],
        ['Triple', 670]
    ]),
    new Products('guarnition', 'https://i.ibb.co/JpLHq3J/medium-potatoes.jpg', 'Papas Fritas', [
        ['Chicas', 100],
        ['Medias', 160],
        ['Grandes', 220]
    ]),
    new Products('guarnition', 'https://i.ibb.co/Fzbhvp9/onion-rings.jpg', 'Aros de Cebolla', [
        ['Chicas', 120],
        ['Medias', 180],
        ['Grandes', 240]
    ])
];