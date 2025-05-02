'use strict';

const cartUtils = {

    /* Begin - handle Quantity */
    handleQuantityBtn: (target) => {
        const increaseBtn = target.closest('.increase');
        if(increaseBtn){
            cartUtils.handleQuantityChange(target, 'increase');
        }

        const decreaseBtn = target.closest('.decrease');
        if(decreaseBtn){
            cartUtils.handleQuantityChange(target, 'decrease');
        }
    },

    handleQuantityChange: (target, type) => {
        const quantityDiv = target.closest('.quantity-selector');
        const quantityInput = quantityDiv.querySelector('input');

        if(type === 'increase'){
            quantityInput.value++;
        } else if(type === 'decrease' && quantityInput.value > 1) {
            quantityInput.value--;
        }
    },
    /* end - handle Quantity */


    // calculate price for element without tax
    calculatePriceWithoutTax: (price, quantity) => {
        return price * quantity;
    },
    
    //calculate total price with tax
    calculateTotalPrice: (itemList) => {
        let subtotalPrice = 0;
        for(let item of itemList){
            subtotalPrice += +item.price;
        }

        const tax = subtotalPrice * 0.19;

        return subtotalPrice + tax;
    },

    /* Begin - create DOM elements for quantity */ 
    createContainerForQuantity: () => {
        const divForQuantity = document.createElement('div');
        divForQuantity.classList.add('quantity-selector');

        const decreaseQuantity = cartUtils.createBtnDecreaseQuantity();
        const inputQuantity = cartUtils.createInputQuantity();
        const increaseQuantity = cartUtils.createBtnIncreaseQuantity();

        divForQuantity.append(decreaseQuantity, inputQuantity, increaseQuantity);

        return divForQuantity;
    }, 

    createBtnDecreaseQuantity: () => {
        const btnDecrease = document.createElement('button');
        btnDecrease.classList.add('quantity-btn', 'decrease');
        btnDecrease.innerText = '-';

        return btnDecrease;
    },

    createInputQuantity: () => {
        const inputQuantity = document.createElement('input');
        inputQuantity.classList.add('quantity');
        inputQuantity.type = 'number';
        inputQuantity.value = '1';
        inputQuantity.min = '1';

        return inputQuantity;
    },

    createBtnIncreaseQuantity: () => {
        const btnIncrease = document.createElement('button');
        btnIncrease.classList.add('quantity-btn', 'increase');
        btnIncrease.innerText = '+';

        return btnIncrease;
    },
    /* End - create DOM elements for quantity */
}