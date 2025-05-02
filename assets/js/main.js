'use strict';

// Object elements
const elements = {
    productCatalog: document.querySelector('#product-catalog'),
    cartSection: document.querySelector('#cart-content'),
    cartSummary: document.querySelector('#cart-summary'),
    cartTotalPrice: document.querySelector('#cart-total'),
    removeInfoFromCart: document.querySelector('#no-products-msg'),
    cartElements: [],
}

// function init
const init = () => {
    catalog.fetchProducts();
    addEvents();
    cart.loadLocalStorage();
}

/* ##### Catalog Event Handling ##### */ 
const handleProductCatalogClicks = (event) => {
    const elementTarget = event.target;

    if(elementTarget.closest('button.add-to-cart')){
        cart.createProduct(elementTarget);
    }
    cartUtils.handleQuantityBtn(elementTarget);
}

/* #### Events for buttons increase, decrease & delete #### */
const handleCartSectionInteractions = (event) => {
    const elementTarget = event.target;
    
    // click events to increase or decrease quantities
    if(elementTarget.closest('.increase') || elementTarget.closest('.decrease')){
        cartUtils.handleQuantityBtn(elementTarget);

        const cartItem = elementTarget.closest('.cart-item');
        const inputQuantity = cartItem.querySelector('input.quantity');

        const itemId = cartItem.dataset.id;
        const item = elements.cartElements.find(p => p.id === itemId);
        item.amount = +inputQuantity.value;
        
        const price = cartUtils.calculatePriceWithoutTax(item.basePrice, item.amount);
        item.price = +price.toFixed(2);
        const cartItemTotalPrice = cartItem.querySelector('.cart-item-total');
        cartItemTotalPrice.innerText = `${price.toFixed(2)} €`;
        //update the total price in DOM
        cart.updateDivForTotalPrice();

        // save the cart into the localstorage
        localStorage.setItem('shoppingCart', JSON.stringify(elements.cartElements));
    }

    // click event to remove items from the cart
    if(elementTarget.classList.contains('remove-element')){
        const itemElementToRemove = elementTarget.closest('.cart-item');
        if(itemElementToRemove){
            cart.removeProduct(itemElementToRemove);
        }
    }
}

const addEvents = () => {
    elements.productCatalog.addEventListener('click', handleProductCatalogClicks);
    elements.cartSection.addEventListener('click', handleCartSectionInteractions);
}

init();
