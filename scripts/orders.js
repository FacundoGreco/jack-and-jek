/* GLOBAL VARIABLES  */
const cartSectionNode = document.querySelector('.cartSection');
const cartCloseButton = document.querySelector('.cartCloseButton');

/* FILLS MENU WITH PRODUCTS  */
products.forEach(product => {
    product.appendProduct();
});

/* FILLS CART WITH ITEMS */

/* OPEN CART */
function openCart() {
    cartSectionNode.classList = `cartSection cartSectionOpened`;
}
/* CLOSE CART */
function closeCart(e) {
    if ((e.target == cartSectionNode) || (e.target == cartCloseButton)) {
        
        cartSectionNode.classList = `cartSection cartSectionClosed`;

    }
}