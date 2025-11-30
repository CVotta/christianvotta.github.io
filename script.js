// Productos de la farmacia
const productos = [
    {
        id: 1,
        nombre: 'Paracetamol 500mg',
        descripcion: 'Analgésico y antipirético - 20 tabletas',
        precio: 5.99
    },
    {
        id: 2,
        nombre: 'Ibuprofeno 400mg',
        descripcion: 'Antiinflamatorio - 30 cápsulas',
        precio: 8.50
    },
    {
        id: 3,
        nombre: 'Vitamina C 1000mg',
        descripcion: 'Suplemento vitamínico - 60 tabletas',
        precio: 12.99
    },
    {
        id: 4,
        nombre: 'Jarabe para la Tos',
        descripcion: 'Expectorante natural - 120ml',
        precio: 7.25
    },
    {
        id: 5,
        nombre: 'Alcohol en Gel',
        descripcion: 'Desinfectante de manos - 250ml',
        precio: 4.50
    },
    {
        id: 6,
        nombre: 'Termómetro Digital',
        descripcion: 'Medición rápida y precisa',
        precio: 15.99
    },
    {
        id: 7,
        nombre: 'Vendas Elásticas',
        descripcion: 'Pack de 3 unidades - 10cm x 4.5m',
        precio: 6.75
    },
    {
        id: 8,
        nombre: 'Suero Fisiológico',
        descripcion: 'Solución salina - 500ml',
        precio: 3.99
    },
    {
        id: 9,
        nombre: 'Antiácido',
        descripcion: 'Alivio de acidez estomacal - 40 tabletas',
        precio: 9.99
    },
    {
        id: 10,
        nombre: 'Crema Antiséptica',
        descripcion: 'Cuidado de heridas menores - 30g',
        precio: 5.49
    }
];

// Carrito de compras
let carrito = [];

// Renderizar productos
function renderizarProductos() {
    const grid = document.getElementById('productosGrid');
    grid.innerHTML = productos.map(producto => `
                <div class="producto-card">
                    <h3>${producto.nombre}</h3>
                    <p class="descripcion">${producto.descripcion}</p>
                    <p class="precio">$${producto.precio.toFixed(2)}</p>
                    <button class="btn" onclick="agregarAlCarrito(${producto.id})">
                        Agregar al Carrito
                    </button>
                </div>
            `).join('');
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