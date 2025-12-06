// Productos de la farmacia
const productos = [
    {
        id: 1,
        nombre: 'Actron 600mg',
        descripcion: 'Ibuprofeno 600mg - Antiinflamatorio - 30 cápsulas',
        precio: 8.50,
        video: 'https://youtu.be/3Q_5FCKOXXU?si=DK3gx6WxE3kdoU-D',
    },
    {
        id: 2,
        nombre: 'Tafirol 500mg',
        descripcion: 'Paracetamol 500mg - Analgésico y antipirético - 20 tabletas',
        precio: 5.99,
        imagen: 'Img/Tafirol.jpg',  
    },
    {
        id: 3,
        nombre: 'Redoxon 1000mg',
        descripcion: 'Vitamina C 1000mg - Suplemento vitamínico - 60 tabletas',
        precio: 12.99,
        imagen: 'Img/Redoxon.jpg',
    },
    {
        id: 4,
        nombre: 'Bisolvon Jarabe',
        descripcion: 'Jarabe para la tos - Expectorante natural - 120ml',
        precio: 7.25,
        imagen: 'Img/Bisolvon.jpg',
    },
    {
        id: 5,
        nombre: 'Bialcohol Gel',
        descripcion: 'Alcohol en Gel - Desinfectante de manos - 250ml',
        precio: 4.50,
        imagen: 'Img/Bialcohol.jpg',
    },
    {
        id: 6,
        nombre: 'Termómetro Digital',
        descripcion: 'Medición rápida y precisa',
        precio: 15.99,
        imagen: 'Img/Termometro.jpg',
    },
    {
        id: 7,
        nombre: 'Rango',
        descripcion: 'Vendas Elasticas - Pack de 3 unidades - 10cm x 4.5m',
        precio: 6.75,
        imagen: 'Img/Rango.jpg',
    },
    {
        id: 8,
        nombre: 'Betafar Solución Salina',
        descripcion: 'Suero Fisiologico - Solución salina - 500ml',
        precio: 3.99,
        imagen: 'Img/Betafar.jpg',
    },
    {
        id: 9,
        nombre: 'Hepatalgina',
        descripcion: 'Antiacido - Alivio de acidez estomacal - 40 tabletas',
        precio: 9.99,
        imagen: 'Img/Hepatalgina.jpg',
    },
    {
        id: 10,
        nombre: 'Adermicina',
        descripcion: 'Crema Anticeptica - Cuidado de heridas menores - 30g',
        precio: 5.49,
        imagen: 'Img/Adermicina.jpg',
    },
    {
        id: 11,
        nombre: 'Nasalmer Spray',
        descripcion: 'Spray Nasal - Alivio de congestión nasal - 15ml',
        precio: 6.89,
        imagen: 'Img/Nasalmer.jpg',
    },
    {
        id: 12,
        nombre: 'Supradyn Energía',
        descripcion: 'Multivitamínico - Suplemento diario - 30 tabletas',
        precio: 14.99,
        imagen: 'Img/Supradyn.jpg',
    },
    {
        id: 13,
        nombre: 'Dolex Forte',
        descripcion: 'Analgésico - Alivio rápido del dolor - 20 tabletas',
        precio: 7.49,
        imagen: 'Img/Dolex.jpg',
    },
    {
        id: 14,
        nombre: 'Curitas Antibacterial',
        descripcion: 'Curitas con Antibacterial - Pack de 20 unidades',
        precio: 4.25,
        imagen: 'Img/Curitas.jpg',
    },
    {
        id: 15,
        nombre: 'Vick Vaporub',
        descripcion: 'Ungüento para el alivio de la congestión - 50g',
        precio: 5.75,
        imagen: 'Img/VickVaporub.jpg',
    },

];

// Carrito de compras
let carrito = [];

// Renderizar productos
function renderizarProductos() {
    const grid = document.getElementById('productosGrid');
    
    grid.innerHTML = productos.map(producto => {
        // Verificamos si es Actron (ID 1)
        const esActron = producto.id === 1;
        
        // Si es Actron, agregamos la clase 'span-2', si no, nada.
        const clasesCard = esActron ? 'producto-card span-2' : 'producto-card';

        return `
        <div class="${clasesCard}">
            
            ${esActron 
                ? `<div class="video-container">
                     <iframe src="${producto.video}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                   </div>`
                : `<img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">`
            }

            <h3>${producto.nombre}</h3>
            <p class="descripcion">${producto.descripcion}</p>
            <p class="precio">$${producto.precio.toFixed(2)}</p>

            <button class="btn" onclick="agregarAlCarrito(${producto.id})">
                Agregar al Carrito
            </button>
        </div>
        `;
    }).join('');
}

// Agregar producto al carrito
function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    const itemEnCarrito = carrito.find(item => item.id === productoId);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    actualizarCarrito();
}

// Remover producto del carrito
function removerDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    actualizarCarrito();
}

// Cambiar cantidad
function cambiarCantidad(productoId, cambio) {
    const item = carrito.find(item => item.id === productoId);
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            removerDelCarrito(productoId);
        } else {
            actualizarCarrito();
        }
    }
}

// Actualizar vista del carrito
function actualizarCarrito() {
    const contenido = document.getElementById('carritoContenido');

    if (carrito.length === 0) {
        contenido.innerHTML = '<p class="carrito-vacio">El carrito está vacío</p>';
        return;
    }

    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    contenido.innerHTML = `
                <div class="carrito-items">
                    ${carrito.map(item => `
                        <div class="carrito-item">
                            <div class="carrito-item-info">
                                <h4>${item.nombre}</h4>
                                <p class="item-precio">$${item.precio.toFixed(2)} c/u</p>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <div class="carrito-item-cantidad">
                                    <button class="btn-cantidad" onclick="cambiarCantidad(${item.id}, -1)">-</button>
                                    <span>${item.cantidad}</span>
                                    <button class="btn-cantidad" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                                </div>
                                <button class="btn-remover" onclick="removerDelCarrito(${item.id})">
                                    Remover
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="carrito-total">
                    <div class="carrito-total-row">
                        <span>Total:</span>
                        <span class="carrito-total-precio">$${total.toFixed(2)}</span>
                    </div>
                </div>
            `;
}

// Inicializar la aplicación
renderizarProductos();