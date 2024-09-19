   document.addEventListener('DOMContentLoaded',() => {
    let addtocart = document.getElementById('addtocart');
    let cartitems = document.getElementById('cartitems');
    let itemprice = document.getElementById('itemprice');
    let menuLinks = document.querySelectorAll('.menu-link');
    let clearorder =document.getElementById('clearorder');
    let removeorder = document.getElementById('removeorder');
    let total = document.getElementById('total');
    let paymentModal = document.getElementById('paymentModal');
    let modalCartItems = document.getElementById('modalCartItems');
    let confirmPaymentButton = document.getElementById('confirmPayment');
    let cancelPaymentButton = document.getElementById('cancelPayment');
    let payment = document.getElementById('pay');


    updateCartDisplay();

    addtocart.addEventListener('click',() => {
      let name = document.getElementById('foodname').innerText;
      let price = parseInt(( document.getElementById('price').innerText));

      let existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      
      if (existingCartItems.some(item => item.name === name)) {
    // Item already exists, do not add it again
    return;
  }
// Item does not exist, add it to the cart
existingCartItems.push({ name: name, price: price });

      localStorage.setItem('cartItems',JSON.stringify(existingCartItems));

      updateCartDisplay();
    });
    function updateCartDisplay() {
  let existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  let spend = 0;

  // Clear previous content
  cartitems.innerHTML = '';
  itemprice.textContent = '';
  //itemprice.innerHTML = '';

  existingCartItems.forEach(item => {
    cartitems.innerHTML += `${item.name} : ${item.price} ` + '<br>';
   // itemprice.textContent += `${item.price} `;
    spend += item.price;
  });

  // Display total
  total.innerText = `Total: ${spend}`;
}

clearorder.addEventListener('click',() => {
  localStorage.clear();
  cartitems.innerHTML = '';
  itemprice.textContent = '';
  total.innerText = `Total: 0`;
});


removeorder.addEventListener('click', () => {
    // Get the name of the currently displayed item
    let name = document.getElementById('foodname').innerText;

    // Remove the item from the visual display
    //clearCurrentItemDisplay();

    // Remove the item from the local storage
    removeItemFromCart(name);

    // Update the cart display after removing the item
    updateCartDisplay();
  });

function clearCurrentItemDisplay() {
    document.getElementById('image').innerHTML = '';
    document.getElementById('foodname').innerHTML = '';
    document.getElementById('info').innerHTML = '';
    document.getElementById('pricediv').innerHTML = '';
  }

  function removeItemFromCart(itemName) {
    let existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Remove the item from the cart by filtering out the item with the specified name
    existingCartItems = existingCartItems.filter(item => item.name !== itemName);

    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
  }

  function centerModal() {
    let modal = document.getElementById('paymentModal');
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
  }
   // Add an event listener to the "Proceed to Payment" button
   payment.addEventListener('click', () => {
    // Populate the modal with cart items
    populateModalCart();

    // Display the modal
    paymentModal.style.display = 'block';

    centerModal();
  });

  // Add an event listener to the close button in the modal
  document.querySelector('.close').addEventListener('click', () => {
    // Close the modal
    paymentModal.style.display = 'none';
  });

  // Add an event listener to the Cancel button in the modal
  cancelPaymentButton.addEventListener('click', () => {
    // Close the modal
    paymentModal.style.display = 'none';
  });

  // Add an event listener to the Confirm button in the modal
  confirmPaymentButton.addEventListener('click', () => {
    // Implement your logic for confirming the payment
    // ...
    let thankYouModal = document.getElementById('thankYouModal');
    thankYouModal.style.display = 'block';

    // Start the progress bar
    startProgressBar();

    // Close the modal after confirmation
    paymentModal.style.display = 'none';
  });
  function startProgressBar() {
    let progressBar = document.getElementById('progressBar');
    let width = 0;
    let intervalId = setInterval(frame, 1000);

    function frame() {
      if (width >= 100) {
        // Stop the progress bar when it reaches 100%
        clearInterval(intervalId);
        // Hide the thank you modal after the progress bar is complete
        setTimeout(() => {
          let thankYouModal = document.getElementById('thankYouModal');
          thankYouModal.style.display = 'none';
        }, 1000);
      } else {
        width += 20; // Increase the width by 20% every second
        progressBar.style.width = width + '%';
      }
    }
  }

  // Function to populate the modal with cart items
  function populateModalCart() {
    let existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let modalTotal = document.getElementById('modalTotal');
    modalCartItems.innerHTML = '';
    let total = 0;
    existingCartItems.forEach(item => {
      modalCartItems.innerHTML += `${item.name} : ${item.price} ` + '<br>';
      total += item.price;
    });
    modalTotal.innerHTML = `Total: Ksh ${total}`;
  }


  });