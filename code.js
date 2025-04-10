// Product data
let products = {
    1: {
        title: "Classic T-Shirt",
        price: "$29.99",
        description: "Classic t-shirt made from 100% cotton. Perfect for everyday wear. Available in various sizes and colors.",
        image: "iloveimg-compressed/596AD61C-2C97-4751-8DA2-DDEBA4BB4E30.png"
    },
    2: {
        title: "Denim Jacket",
        price: "$89.99",
        description: "Stylish denim jacket with modern design. Made from high-quality denim with a distressed effect.",
        image: "iloveimg-compressed/D36244B5-2E4D-4866-B0B6-22EA2EB26C2F.png"
    },
    3: {
        title: "Casual Hoodie",
        price: "$59.99",
        description: "Comfortable hoodie made from soft cotton. Features a hood and kangaroo pocket. Perfect for cool weather.",
        image: "iloveimg-compressed/DA3D99A0-E583-49B9-B909-32BA4B0E845C.png"
    },
    4: {
        title: "Slim Fit Jeans",
        price: "$79.99",
        description: "Classic slim fit jeans made from stretch denim. Provides comfort and accentuates your silhouette.",
        image: "iloveimg-compressed/63450E6F-F84A-44EE-B4DC-21B4200AAB6F.png"
    },
    5: {
        title: "Leather Backpack",
        price: "$129.99",
        description: "Stylish backpack made from genuine leather. Features multiple compartments and adjustable straps.",
        image: "iloveimg-compressed/019F724B-4A8E-4FFB-A595-E6711FAE6F6E.png"
    },
    6: {
        title: "Wool Sweater",
        price: "$99.99",
        description: "Warm sweater made from merino wool. Features a classic collar and comfortable fit.",
        image: "iloveimg-compressed/0AA86FDD-6D08-4B07-AE5A-E4A379F011F7.png"
    },
    7: {
        title: "Sneakers",
        price: "$89.99",
        description: "Sports sneakers with modern design. Provides comfort and foot support.",
        image: "iloveimg-compressed/97BE2839-0437-45D9-A751-A9BCC2D0DA93.png"
    },
    8: {
        title: "Leather Jacket",
        price: "$199.99",
        description: "Classic leather jacket made from genuine leather. Features modern cut and metal hardware.",
        image: "iloveimg-compressed/470C7FFD-B1EC-427D-9C1D-F7C425209489.png"
    }
};

// Функция для добавления нового товара
function addProduct(title, price, description, image) {
    const newId = Object.keys(products).length + 1;
    products[newId] = {
        title: title,
        price: `$${parseFloat(price).toFixed(2)}`,
        description: description,
        image: image
    };
    displayProducts(); // Обновляем отображение
    return newId; // Возвращаем ID нового товара
}

// Функция для создания карточки товара
function createProductCard(productId, product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-product', productId);
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p class="price">${product.price}</p>
    `;
    
    return card;
}

// Функция для отображения всех товаров
function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = ''; // Очищаем сетку
    
    Object.entries(products).forEach(([id, product]) => {
        productsGrid.appendChild(createProductCard(id, product));
    });
}

// Инициализация мобильного меню
document.addEventListener('DOMContentLoaded', function() {
    // Отображаем товары, если есть контейнер productsGrid
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        displayProducts();
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Закрытие меню при клике на ссылку
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Код для модального окна
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close');

    if (modal && closeBtn) {
        // Закрытие модального окна
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Закрытие по клику вне модального окна
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Закрытие по нажатию клавиши Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Открытие модального окна с информацией о товаре
        if (productsGrid) {
            productsGrid.addEventListener('click', function(event) {
                const productCard = event.target.closest('.product-card');
                if (productCard) {
                    const productId = productCard.getAttribute('data-product');
                    const product = products[productId];
                    
                    modal.querySelector('.modal-image').src = product.image;
                    modal.querySelector('.modal-title').textContent = product.title;
                    modal.querySelector('.modal-price').textContent = product.price;
                    modal.querySelector('.modal-description').textContent = product.description;
                    
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        }
    }
});
