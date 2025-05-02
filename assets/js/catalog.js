'use strict';

const catalog = {
    ajaxRequest: new XMLHttpRequest(),

    getDataProduct: (addToCartBtn) => {
        //find the closest div container with the class product
        const currentDivProduct = addToCartBtn.closest('.product');
        const currentProductName = currentDivProduct.querySelector('h3');
        const currentProductPrice = currentDivProduct.querySelector('button.add-to-cart');
        const currentProductQuantity = currentDivProduct.querySelector('input');
    
        // get the current data-id from the div container
        const productId = currentDivProduct.dataset.id;
        const productPrice = currentProductPrice.dataset.price;
        const productQuantity = currentProductQuantity.value;
    
        // return object
        return {
            id: productId,
            name: currentProductName.innerText,
            amount: productQuantity,
            basePrice: +productPrice,
            price: +productPrice,
        }
    },

    fetchProducts: () => {

        catalog.ajaxRequest.open('GET', 'assets/data/products.json', true);

        catalog.ajaxRequest.onreadystatechange = catalog.processResponse;

        catalog.ajaxRequest.send();

    },

    processResponse: () => {

        if(catalog.ajaxRequest.readyState === 4){
            if(catalog.ajaxRequest.status === 200){
                let ajaxResponse = catalog.ajaxRequest.responseText;

                let jsonResponse = JSON.parse(ajaxResponse);

                for (let index = 0; index < jsonResponse.length; index++) {
                    catalog.createDOMProductCatalog(jsonResponse[index]);
                }
            }
        }
    },

    createDOMProductCatalog: (product) => {
        const divProduct = catalog.createDivForSingleItem(product.id);

        // item left section
        const divLeftContainer = catalog.createDivForLeft();
        const tagName = catalog.createTagForItemName(product.name);
        const tagDescription = catalog.createTagForItemDescription(product.productDescription);
        const tagImg = catalog.createTagForImage(product.name, product.image);
        const tagPrice = catalog.createTagForPrice(product.price);
        divLeftContainer.append(tagName,tagDescription, tagImg, tagPrice);

        // item right section
        const divRightContainer = catalog.createDivForRight();
        const divQuantity = cartUtils.createContainerForQuantity();
        const btnAdd = catalog.createAddBtn(product.price);
        divRightContainer.append(divQuantity, btnAdd);

        divProduct.append(divLeftContainer, divRightContainer);

        elements.productCatalog.appendChild(divProduct);
    },

    createDivForSingleItem: (itemId) => {
        const divForItem = document.createElement('div');
        divForItem.classList.add('product');
        divForItem.dataset.id = itemId;

        return divForItem;
    },

    createDivForLeft: () => {
        const divContainerLeft = document.createElement('div');
        divContainerLeft.classList.add('product-left');
        return divContainerLeft;
    },

    createDivForRight: () => {
        const divContainerRight = document.createElement('div');
        divContainerRight.classList.add('product-right');

        return divContainerRight;
    },

    createTagForItemName: (itemName) => {
        const tagForName = document.createElement('h3');
        tagForName.innerText = itemName;

        return tagForName;
    },

    createTagForItemDescription: (itemDescription) => {
        const tagForDescription = document.createElement('p');
        tagForDescription.innerText = itemDescription;

        return tagForDescription;
    },

    createTagForImage: (itemName, itemImage) => {
        const imgTag = document.createElement('img');
        imgTag.src = itemImage;
        imgTag.alt = itemName;
        imgTag.classList.add('img-format');

        return imgTag;
    },

    createTagForPrice: (itemPrice) => {
        const tagForPrice = document.createElement('p');
        const tagForPriceStrong = document.createElement('strong');
        tagForPriceStrong.innerText = `${itemPrice} €`;
        tagForPrice.appendChild(tagForPriceStrong);

        return tagForPrice;
    },


    createAddBtn: (itemPrice) => {
        // button
        const addBtn = document.createElement('button');
        addBtn.classList.add('add-to-cart');
        addBtn.dataset.price = itemPrice;
        addBtn.innerText = 'add ';
        // tag i with icon 
        const iconForBtn = document.createElement('i');
        iconForBtn.classList.add('fas', 'fa-cart-plus');

        addBtn.appendChild(iconForBtn);

        return addBtn;
    },
}