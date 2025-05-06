/**
 * Cart Management Functionality
 * Handles shopping cart operations
 */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize cart from localStorage or create new one
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Update cart count badge
  updateCartCount();
  
  // Handle adding products to cart (on product pages)
  if (document.querySelector('.add-to-cart-form')) {
    document.querySelector('.add-to-cart-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const modal = document.getElementById('productModal');
      const modalInstance = bootstrap.Modal.getInstance(modal);
      
      // Get product data from the modal
      const productId = modal.getAttribute('data-product-id');
      const productTitle = {
        fr: document.querySelector('.modal-product-title').getAttribute('data-fr'),
        ar: document.querySelector('.modal-product-title').getAttribute('data-ar')
      };
      const productPrice = parseFloat(modal.getAttribute('data-product-price'));
      const productImage = document.querySelector('.modal-product-image').src;
      const selectedSize = document.querySelector('.modal-product-sizes').value;
      const selectedColor = document.querySelector('.modal-product-colors').value;
      const quantity = parseInt(document.querySelector('.modal-product-quantity').value);
      
      // Create cart item
      const cartItem = {
        id: productId,
        title: productTitle,
        price: productPrice,
        image: productImage,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity
      };
      
      // Check if product already exists in cart
      const existingItemIndex = cart.findIndex(item => 
        item.id === productId && 
        item.size === selectedSize && 
        item.color === selectedColor
      );
      
      if (existingItemIndex > -1) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item to cart
        cart.push(cartItem);
      }
      
      // Save cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Update cart count
      updateCartCount();
      
      // Show toast notification
      const toast = new bootstrap.Toast(document.getElementById('cartToast'));
      toast.show();
      
      // Close modal
      modalInstance.hide();
    });
  }
  
  // Handle cart page functionality
  if (window.location.pathname.includes('cart.html')) {
    renderCart();
    
    // Handle WhatsApp checkout
    document.getElementById('whatsappCheckout').addEventListener('click', function(e) {
      e.preventDefault();
      
      const lang = document.body.getAttribute('data-lang');
      const phoneNumber = '33123456789'; // Replace with actual phone number
      
      let message = '';
      
      if (lang === 'fr') {
        message = 'Bonjour, je souhaite commander les articles suivants :\n\n';
        
        cart.forEach(item => {
          message += `- ${item.title.fr} - Taille: ${item.size} - Couleur: ${item.color} - Quantité: ${item.quantity} - Prix: ${(item.price * item.quantity).toFixed(2)}€\n`;
        });
        
        message += `\nTotal: ${calculateTotal().toFixed(2)}€`;
      } else {
        message = 'مرحبا، أرغب في طلب العناصر التالية:\n\n';
        
        cart.forEach(item => {
          message += `- ${item.title.ar} - المقاس: ${item.size} - اللون: ${item.color} - الكمية: ${item.quantity} - السعر: ${(item.price * item.quantity).toFixed(2)}€\n`;
        });
        
        message += `\nالمجموع: ${calculateTotal().toFixed(2)}€`;
      }
      
      // Encode the message for WhatsApp URL
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
    });
    
    // Handle clear cart button
    document.getElementById('clearCart').addEventListener('click', function() {
      cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      renderCart();
      
      // Show toast notification
      const toastBody = document.querySelector('#cartToast .toast-body');
      const lang = document.body.getAttribute('data-lang');
      toastBody.textContent = lang === 'fr' ? 'Panier vidé avec succès!' : 'تم إفراغ السلة بنجاح!';
      const toast = new bootstrap.Toast(document.getElementById('cartToast'));
      toast.show();
    });
  }
  
  // Function to update cart count badge
  function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
      element.textContent = totalItems;
    });
  }
  
  // Function to render cart on cart page
  function renderCart() {
    const emptyCartElement = document.querySelector('.empty-cart');
    const cartWithItemsElement = document.querySelector('.cart-with-items');
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
      // Show empty cart message
      emptyCartElement.classList.remove('d-none');
      cartWithItemsElement.classList.add('d-none');
      return;
    }
    
    // Show cart with items
    emptyCartElement.classList.add('d-none');
    cartWithItemsElement.classList.remove('d-none');
    
    // Clear previous items
    cartItemsContainer.innerHTML = '';
    
    // Render each cart item
    cart.forEach((item, index) => {
      const lang = document.body.getAttribute('data-lang');
      const itemTotal = item.price * item.quantity;
      
      const cartItemRow = document.createElement('tr');
      cartItemRow.innerHTML = `
        <td>
          <div class="d-flex align-items-center">
            <img src="${item.image}" alt="${item.title[lang]}" class="img-fluid me-3" style="width: 70px; height: 70px; object-fit: cover;">
            <div>
              <h6 class="mb-0">${item.title[lang]}</h6>
              <small class="text-muted">
                ${lang === 'fr' ? 'Taille' : 'المقاس'}: ${item.size} | 
                ${lang === 'fr' ? 'Couleur' : 'اللون'}: ${item.color}
              </small>
            </div>
          </div>
        </td>
        <td>${item.price.toFixed(2)} €</td>
        <td>
          <div class="input-group input-group-sm cart-quantity">
            <button class="btn btn-outline-secondary decrease-qty" data-index="${index}">-</button>
            <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
            <button class="btn btn-outline-secondary increase-qty" data-index="${index}">+</button>
          </div>
        </td>
        <td>${itemTotal.toFixed(2)} €</td>
        <td>
          <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </td>
      `;
      
      // Fix RTL styling issue with cart items
      if (lang === 'ar') {
        const imgContainer = cartItemRow.querySelector('.d-flex');
        imgContainer.classList.remove('me-3');
        imgContainer.classList.add('ms-3');
      }
      
      cartItemsContainer.appendChild(cartItemRow);
    });
    
    // Update cart summary
    document.getElementById('subtotal').textContent = `${calculateTotal().toFixed(2)} €`;
    document.getElementById('totalPrice').textContent = `${calculateTotal().toFixed(2)} €`;
    document.getElementById('itemCount').textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Add event listeners to quantity buttons and remove buttons
    document.querySelectorAll('.decrease-qty').forEach(button => {
      button.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartCount();
          renderCart();
          showCartUpdateToast();
        }
      });
    });
    
    document.querySelectorAll('.increase-qty').forEach(button => {
      button.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        cart[index].quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
        showCartUpdateToast();
      });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
      button.addEventListener('click', function() {
        const index = parseInt(this.getAttribute('data-index'));
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
        showCartUpdateToast();
      });
    });
  }
  
  // Function to calculate total price
  function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  // Function to show cart update toast
  function showCartUpdateToast() {
    const toast = new bootstrap.Toast(document.getElementById('cartToast'));
    toast.show();
  }
});