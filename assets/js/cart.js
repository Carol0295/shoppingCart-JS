'use strict';

const cart = {

    /* Begin - create and add the product to the cart */
    createProductDOMElement: (productObject) => {
        //new div container with class for the products information
        const createCartItem = document.createElement('div');
        createCartItem.classList.add('cart-item');
        createCartItem.dataset.id = productObject.id;

        const name = cart.createItemName(productObject.name);
        const basePrice = cart.createItemPrice(productObject.basePrice);

        const quantityDiv = cartUtils.createContainerForQuantity();
        const input = quantityDiv.querySelector('input.quantity');
        input.value = productObject.amount;

        const priceWithoutTax = cart.createItemForPrice(productObject.price);
        const deleteItemBtn = cart.createDeleteBtn();

        // add the elements to the item
        createCartItem.append(name, basePrice, quantityDiv, priceWithoutTax, deleteItemBtn);
        return createCartItem;
    },

    createItemName: (itemName) => {
        // product name
        const nameDiv = document.createElement('div');
        nameDiv.classList.add('cart-item-name');
        nameDiv.textContent = itemName;
        return nameDiv;
    },

    createItemPrice: (itemPrice) => {
        // item price
        const priceDiv = document.createElement('div');
        priceDiv.classList.add('cart-item-unit-price');
        priceDiv.textContent = `${itemPrice.toFixed(2)} €`;

        return priceDiv;
    },

    createItemForPrice: (itemPriceWithoutTax) => {
        // price without Tax
        const priceDiv = document.createElement('div');
        priceDiv.classList.add('cart-item-total');
        priceDiv.textContent = `${itemPriceWithoutTax.toFixed(2)} €`;

        return priceDiv;
    },

    createDeleteBtn: () => {
        // delete button
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-element');
        removeBtn.textContent = 'X';

        return removeBtn;
    },
    /* end - create and add the product to the cart */

    // add the item in the cart
    addToCart: (productObject) => {
        //check if id is already in cart
        const productExistsInCart = cart.isProductInCart(productObject);

        productObject.price = cartUtils.calculatePriceWithoutTax(productObject.basePrice, productObject.amount);
        
        if(!productExistsInCart){
            //add object to array
            elements.cartElements.push(productObject);

            // save the cart into the localstorage
            localStorage.setItem('shoppingCart', JSON.stringify(elements.cartElements));
            // prepare DOM-element
            const cartItem = cart.createProductDOMElement(productObject);
            // hide p-Tag from cart-content
            cart.handleMsgCart();
            cart.updateDivForTotalPrice();
            elements.cartSection.append(cartItem);
        }
    },

    //verify if product exists in cart
    isProductInCart: (product) => {
        return elements.cartElements.find( p => p.id === product.id);
    },

    // msg from cart remove + can be better
    handleMsgCart: () => {
        if(elements.cartElements.length === 0){
            elements.removeInfoFromCart.classList.remove('hidden');
        } else {
            elements.removeInfoFromCart.classList.add('hidden');
        }
    },

    // get the product input from user and add to the cart
    createProduct: (addBtn) => {
        const productData = catalog.getDataProduct(addBtn);
        cart.addToCart(productData);
    },

    // delete item from DOM and update the DOM
    removeProduct: (removeItem) => {
        //delete product from array
        const productId = removeItem.dataset.id;
        cart.removeProductFromArray(productId);
        
        //delete item from DOM
        removeItem.remove();

        cart.handleMsgCart();
        cart.updateDivForTotalPrice();
        
    },

    // delete item from array
    removeProductFromArray: (idToRemove) => {
        // delete the element from the array and return a new array with the another elements
        elements.cartElements = elements.cartElements.filter( p => p.id !== idToRemove);

        // save the cart into the localstorage
        localStorage.setItem('shoppingCart', JSON.stringify(elements.cartElements));
    },

    // update the total price with tax
    updateDivForTotalPrice: () => {
        if(elements.cartElements.length === 0){
            elements.cartSummary.classList.add('hidden');
        } else {
            elements.cartSummary.classList.remove('hidden');
            const totalPrice = cartUtils.calculateTotalPrice(elements.cartElements);
            elements.cartTotalPrice.innerText = `Price (with Tax): ${totalPrice.toFixed(2)} €`;
        }
    },

    //TODO: future functionality to pay
    showBtnToPay: () => {
    },

    // get the items from localstorage and 
    loadLocalStorage: () => {
        const savedItems = localStorage.getItem('shoppingCart');

        if(savedItems){
            elements.cartElements = JSON.parse(savedItems);
            
            for(const item of elements.cartElements){
                const itemInCart = cart.createProductDOMElement(item);
                cart.handleMsgCart();
                cart.updateDivForTotalPrice();
                elements.cartSection.appendChild(itemInCart);
            }
        } else {
            elements.cartElements = [];
        }
    },

}