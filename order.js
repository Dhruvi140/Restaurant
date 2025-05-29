// Menu items data
const menuItems = [
    // Appetizers
    {
        id: 1,
        name: 'Samosa',
        price: 120,
        category: 'appetizers',
        image: 'images/samosa-7180078_1280.jpg',
        description: 'Crispy pastry filled with spiced potatoes, peas, and aromatic Indian spices'
    },
    {
        id: 2,
        name: 'Paneer Tikka',
        price: 250,
        category: 'appetizers',
        image: 'images/paneer-7043097_1280.jpg',
        description: 'Marinated cottage cheese cubes grilled with bell peppers and Indian spices'
    },
    {
        id: 3,
        name: 'Dahi Bhalla',
        price: 180,
        category: 'appetizers',
        image: 'images/Dahi-Vada-H1.webp',
        description: 'Lentil dumplings in yogurt with tangy tamarind chutney'
    },
    {
        id: 4,
        name: 'Pani Puri',
        price: 150,
        category: 'appetizers',
        image: 'images/panipuri.jfif',
        description: 'Crispy hollow puris filled with spicy mint water and potato mixture'
    },

    // Main Course
    {
        id: 5,
        name: 'Paneer Butter Masala',
        price: 380,
        category: 'main',
        image: 'images/pannerbuttermasala.jpg',
        description: 'Cottage cheese in rich tomato gravy'
    },
    {
        id: 6,
        name: 'Malai Kofta',
        price: 360,
        category: 'main',
        image: 'images/malai-kofta.webp',
        description: 'Vegetable and cheese dumplings in creamy gravy'
    },
    {
        id: 7,
        name: 'Chole Bhature',
        price: 280,
        category: 'main',
        image: 'images/chhole.webp',
        description: 'Spiced chickpeas with deep-fried bread'
    },
    {
        id: 8,
        name: 'Veg Biryani',
        price: 320,
        category: 'main',
        image: 'images/biryani.jpg',
        description: 'Aromatic rice with mixed vegetables and spices'
    },
    {
        id: 9,
        name: 'Kadai Mushroom',
        price: 340,
        category: 'main',
        image: 'images/kadhai-mushroom-sabzi-maayeka.jpg',
        description: 'Mushrooms cooked with bell peppers in spicy gravy'
    },
    {
        id: 10,
        name: 'Navratan Korma',
        price: 350,
        category: 'main',
        image: 'images/vegetable-korma-recipe-1.jpg',
        description: 'Mixed vegetables in rich cashew gravy'
    },

    // Breads & Rice
    {
        id: 11,
        name: 'Assorted Naan',
        price: 60,
        category: 'breads',
        image: 'images/naan.jpg',
        description: 'Butter, Garlic, or Plain Naan bread baked in tandoor'
    },
    {
        id: 12,
        name: 'Hyderabadi Biryani',
        price: 380,
        category: 'breads',
        image: 'images/biryani.jpg',
        description: 'Fragrant basmati rice cooked with aromatic spices and vegetables'
    },
    {
        id: 13,
        name: 'Amritsari Kulcha',
        price: 90,
        category: 'breads',
        image: 'images/amritsari-kulcha-1.jpg',
        description: 'Stuffed bread with spiced potatoes or paneer, baked in tandoor'
    },
    {
        id: 14,
        name: 'Jeera Rice',
        price: 180,
        category: 'breads',
        image: 'images/jeera-rice-recipe.webp',
        description: 'Fragrant basmati rice tempered with cumin seeds'
    },

    // Desserts
    {
        id: 15,
        name: 'Gulab Jamun',
        price: 150,
        category: 'desserts',
        image: 'images/gulab-jamun.jpg',
        description: 'Soft milk dumplings in sweet rose-flavored syrup'
    },
    {
        id: 16,
        name: 'Rasmalai',
        price: 180,
        category: 'desserts',
        image: 'images/Rasmalai.jpg',
        description: 'Soft cottage cheese patties in creamy saffron milk with nuts'
    },
    {
        id: 17,
        name: 'Gajar Ka Halwa',
        price: 200,
        category: 'desserts',
        image: 'images/Gajar-Halwa-Indian.webp',
        description: 'Traditional carrot pudding with nuts and cardamom'
    },
    {
        id: 18,
        name: 'Malai Kulfi',
        price: 140,
        category: 'desserts',
        image: 'images/kulfi.jpg',
        description: 'Traditional Indian ice cream with pistachios and saffron'
    }
];

// Cart state
let cart = [];
const DELIVERY_CHARGE = 50;
const TAX_RATE = 0.05;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the menu grid
    displayMenuItems('all');
    
    // Set up category filter buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayMenuItems(btn.dataset.category);
        });
    });
});

// Display menu items based on category
function displayMenuItems(category) {
    const menuGrid = document.querySelector('.menu-grid');
    menuGrid.innerHTML = '';

    const items = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);

    items.forEach(item => {
        const itemElement = createMenuItemElement(item);
        menuGrid.appendChild(itemElement);
    });
}

// Create menu item element
function createMenuItemElement(item) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="menu-item-content">
            <h3 class="menu-item-title">${item.name}</h3>
            <p class="menu-item-description">${item.description}</p>
            <p class="menu-item-price">₹${item.price}</p>
            <button class="add-to-cart" onclick="addToCart(${item.id})">
                Add to Cart
            </button>
        </div>
    `;
    return div;
}

// Add item to cart
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const existingItem = cart.find(i => i.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">₹${item.price}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(itemElement);
    });

    updateCartSummary();
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
}

// Update item quantity
function updateQuantity(itemId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(itemId);
    } else {
        const item = cart.find(item => item.id === itemId);
        if (item) {
            item.quantity = newQuantity;
        }
    }

    updateCartDisplay();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.length > 0 ? cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) : 0;
    const tax = subtotal * TAX_RATE;
    const total = cart.length > 0 ? (subtotal + tax + DELIVERY_CHARGE) : 0;

    document.querySelector('.subtotal-amount').textContent = `₹${subtotal.toFixed(2)}`;
    document.querySelector('.tax-amount').textContent = `₹${tax.toFixed(2)}`;
    document.querySelector('.delivery-amount').textContent = cart.length > 0 ? `₹${DELIVERY_CHARGE.toFixed(2)}` : '₹0.00';
    document.querySelector('.total-amount').textContent = `₹${total.toFixed(2)}`;

    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.disabled = cart.length === 0;

    // Update cart icon if cart is empty
    if (cart.length === 0) {
        const cartItems = document.querySelector('.cart-items');
        cartItems.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
    }
}

// Handle checkout
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) return;

    // Here you would typically integrate with a payment gateway
    alert('Thank you for your order! Proceeding to payment...');
}); 