const whatsappNumber = '3546458987'; // Replace with your actual number
let cart = [];

const menuCategories = [
    { id: 'all', name: 'Todo' },
    { id: 'cocktails', name: 'Cócteles' },
    { id: 'beers', name: 'Cervezas' },
    { id: 'wines', name: 'Vinos' },
    { id: 'tapas', name: 'Tapas' },
    { id: 'main', name: 'Platos Principales' }
];

const menuItems = [
    {
        category: 'cocktails',
        name: 'Martini Clásico',
        description: 'Gin o vodka, vermut seco, aceituna o twist de limón',
        price: 12.00
    },
    {
        category: 'cocktails',
        name: 'Mojito',
        description: 'Ron blanco, menta fresca, lima, azúcar, soda',
        price: 10.00
    },
    {
        category: 'cocktails',
        name: 'Margarita',
        description: 'Tequila, triple sec, jugo de limón',
        price: 11.00
    },
    {
        category: 'beers',
        name: 'Cerveza Nacional',
        price: 5.00
    },
    {
        category: 'beers',
        name: 'Cerveza Importada',
        price: 7.00
    },
    {
        category: 'beers',
        name: 'Cerveza Artesanal',
        price: 8.00
    },
    {
        category: 'wines',
        name: 'Vino Tinto',
        description: 'Copa de casa',
        price: 8.00
    },
    {
        category: 'wines',
        name: 'Vino Blanco',
        description: 'Copa de casa',
        price: 8.00
    },
    {
        category: 'tapas',
        name: 'Patatas Bravas',
        description: 'Patatas fritas con salsa picante',
        price: 8.00
    },
    {
        category: 'tapas',
        name: 'Tabla de Quesos',
        description: 'Selección de quesos con pan y mermelada',
        price: 15.00
    },
    {
        category: 'tapas',
        name: 'Calamares Fritos',
        description: 'Con salsa alioli',
        price: 12.00
    },
    {
        category: 'main',
        name: 'Paella de Mariscos',
        description: 'Arroz con variedad de mariscos y azafrán',
        price: 22.00
    },
    {
        category: 'main',
        name: 'Filete de Ternera',
        description: 'Con salsa de vino tinto y patatas',
        price: 25.00
    },
    {
        category: 'main',
        name: 'Pasta Mediterránea',
        description: 'Pasta con tomates cherry, aceitunas y queso feta',
        price: 18.00
    }
];

function initializeMenu() {
    createMenuTabs();
    createMenuSections();
    filterMenu('all');
}

function createMenuTabs() {
    const menuTabsContainer = document.getElementById('menu-tabs');
    menuCategories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'menu-tab';
        button.textContent = category.name;
        button.onclick = () => filterMenu(category.id);
        menuTabsContainer.appendChild(button);
    });
}

function createMenuSections() {
    const menuSectionsContainer = document.getElementById('menu-sections');
    menuCategories.slice(1).forEach(category => {
        const section = document.createElement('section');
        section.className = 'menu-section';
        section.dataset.category = category.id;
        section.innerHTML = `
            <h2>${category.name}</h2>
            ${menuItems
                .filter(item => item.category === category.id)
                .map(item => createMenuItemHTML(item))
                .join('')}
        `;
        menuSectionsContainer.appendChild(section);
    });
}

function createMenuItemHTML(item) {
    return `
        <div class="menu-item">
            <div class="item-info">
                <span class="item-name">${item.name}</span>
                ${item.description ? `<p class="item-description">${item.description}</p>` : ''}
            </div>
            <span class="item-price">$${item.price.toFixed(2)}</span>
            <button class="add-to-cart" onclick="addToCart('${item.name}', ${item.price})">+</button>
        </div>
    `;
}

function filterMenu(category) {
    const sections = document.querySelectorAll('.menu-section');
    const tabs = document.querySelectorAll('.menu-tab');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'all') {
        sections.forEach(section => section.style.display = 'block');
    } else {
        sections.forEach(section => {
            if (section.dataset.category === category) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function openCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <span>${item.name} x${item.quantity}</span>
                <span>$${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });

    cartTotalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    document.getElementById('cart-modal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function openReservationModal() {
    document.getElementById('reservation-modal').style.display = 'block';
}

function closeReservationModal() {
    document.getElementById('reservation-modal').style.display = 'none';
}

function sendWhatsAppOrder() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    const tableNumber = document.getElementById('table-number').value;
    if (!tableNumber) {
        alert('Por favor selecciona un número de mesa');
        return;
    }

    const orderDetails = cart.map(item => 
        `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const notes = document.getElementById('order-notes').value;

    let message = `🍸 *NUEVO PEDIDO ROSOL*\n\n`;
    message += `Mesa: ${tableNumber}\n\n`;
    message += `*PEDIDO:*\n${orderDetails}\n\n`;
    message += `*TOTAL: $${total.toFixed(2)}*`;

    if (notes) {
        message += `\n\n*NOTAS:*\n${notes}`;
    }

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    cart = [];
    updateCartDisplay();
    closeCart();
}

function sendWhatsAppReservation() {
    const date = document.getElementById('reservation-date').value;
    const time = document.getElementById('reservation-time').value;
    const people = document.getElementById('reservation-people').value;
    const notes = document.getElementById('reservation-notes').value;

    if (!date || !time || !people) {
        alert('Por favor completa todos los campos de la reserva');
        return;
    }

    let message = `🍸 *SOLICITUD DE RESERVA ROSOL*\n\n`;
    message += `Fecha: ${date}\n`;
    message += `Hora: ${time}\n`;
    message += `Personas: ${people}\n`;

    if (notes) {
        message += `\n*NOTAS:*\n${notes}`;
    }

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    closeReservationModal();
}

// Initialize the menu when the page loads
window.onload = initializeMenu;

