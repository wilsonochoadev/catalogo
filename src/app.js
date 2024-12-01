const catalogo = async () => {
    try {
        const res = await fetch('catalogo.json');
        const data = await res.json();
        let catalogoSection = '';

        data.map(ropa => {
            const colores = ropa.colores ? JSON.stringify(ropa.colores) : '[]';
            catalogoSection += `
                <div 
                    class="w-[150px] md:w-[260px] cursor-pointer hover:scale-105 duration-300 card"
                    data-nombre="${ropa.nombre}"
                    data-precio="${ropa.precio}"
                    data-imagen="${ropa.imagen}"
                    data-material="${ropa.material}"
                    data-estilo="${ropa.estilo}"
                    data-colores='${colores}'
                >
                    <div class="overflow-hidden md:h-[256px] bg-main">
                        <img src="${ropa.imagen}" alt="${ropa.nombre}"/>
                    </div>
                    <div class="p-1 text-[15px]">
                        <h3 class="font-semibold">${ropa.nombre}</h3>
                        <span class="font-[400]">$${ropa.precio}</span>
                    </div>
                </div>
            `;
        });

        document.getElementById('catalogo').innerHTML = catalogoSection;


        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const nombre = card.getAttribute('data-nombre');
                const precio = card.getAttribute('data-precio');
                const imagen = card.getAttribute('data-imagen');
                const material = card.getAttribute('data-material');
                const estilo = card.getAttribute('data-estilo');
                const colores = JSON.parse(card.getAttribute('data-colores'));

                mostrarModal(nombre, precio, imagen, material, estilo, colores);
            });
        });

    } catch (error) {
        console.log(error);
    }
};

catalogo();

const mostrarModal = (nombre, precio, imagen, material, estilo, colores) => {
    const modal = document.getElementById('modal');
    modal.style.display = "flex";

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.body.style.overflow = "hidden";

    if (!estilo || !material) {
        console.log("hea")
    }

    document.getElementById('modal-nombre').textContent = nombre;
    document.getElementById('modal-precio').textContent = `$${precio}`;
    document.getElementById('modal-imagen').src = imagen;
    document.getElementById('modal-material').textContent = `Material: ${material}`;
    document.getElementById('modal-estilo').textContent = `Estilo: ${estilo}`;

    const modalImagen = document.getElementById('modal-imagen');
    modalImagen.addEventListener('mousemove', () => { mouseZoom(modalImagen); });
    modalImagen.addEventListener('mouseleave', () => {
        modalImagen.style.transform = "scale(1)";
        modalImagen.style.transition = "transform 0.3s ease-out";
    });

    let coloresContainer = '';

    colores.map(color => {
        coloresContainer += `
        <div style="background-color: ${color.hex};" class="cursor-pointer w-8 h-8 rounded-full border-4 border-menus" onclick="selectColor('${color.nombre}','${color.imagen}')"></div>
        `
    })
    document.querySelector(".colores-container").innerHTML = coloresContainer;

};

function selectColor(color, imagen) {
    document.getElementById('modal-imagen').src = imagen;
    document.getElementById('modal-imagen').alt = color;
}

function mouseZoom(modalImagen) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const rect = modalImagen.getBoundingClientRect();

    const imageX = mouseX - rect.left;
    const imageY = mouseY - rect.top;

    const percentX = (imageX / rect.width) * 100;
    const percentY = (imageY / rect.height) * 100;

    modalImagen.style.transform = `scale(2)`;
    modalImagen.style.transformOrigin = `${percentX}% ${percentY}% `;
    modalImagen.style.transition = "transform 0.1s ease-out";
}

const closeModal = () => {
    const modal = document.getElementById('modal');
    modal.style.display = "none";
    document.body.style.overflow = "visible";
    document.body.style.paddingRight = "0px";
};

const whatsappButton = document.getElementById('whatsapp-button');
whatsappButton.addEventListener('click', () => {
    const nombre = document.getElementById('modal-nombre').textContent;
    const precio = document.getElementById('modal-precio').textContent;
    const imagen = document.getElementById('modal-imagen').src;
    const color = document.getElementById('modal-imagen').alt;

    const numero = '3144287794';
    const mensaje = `Me encuentro interesado en comprar el producto: \nNombre: *${nombre}* \nColor: *${color}* \nPrecio: *${precio}*  \nImagen: ${imagen}`;
    const mensajeSalto = encodeURIComponent(mensaje);
    const whatsappUrl = `https://wa.me/${numero}?text=${mensajeSalto}`;
    window.open(whatsappUrl, '_blank');
});
