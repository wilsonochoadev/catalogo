const catalogo = async () => {
    try {
        const res = await fetch('catalogo.json');
        const data = await res.json();
        let catalogoSection = ''

        data.map(ropa => {
            catalogoSection += `
                <div 
                    class="max-w-[260px] min-w-[260px] cursor-pointer hover:scale-105 duration-300" 
                    onclick="mostrarModal('${ropa.nombre}','${ropa.precio}','${ropa.imagen}')">
                    <div class="overflow-hidden h-[256px] bg-red">
                        <img src=${ropa.imagen} alt=${ropa.nombre} />
                    </div>
                    <div class="p-1 text-[15px]">
                        <h3 class="font-semibold">${ropa.nombre}</h3>
                        <span class="font-[400]">${ropa.precio}</span>
                    </div>
                </div>
            `
        });

        document.getElementById('catalogo').innerHTML = catalogoSection;
    } catch (error) {
        console.log(error)
    }
}
catalogo();

const mostrarModal = (nombre, precio, imagen) => {
    const modal = document.getElementById('modal');
    modal.style.display = "flex";

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.body.style.overflow = "hidden";

    document.getElementById('modal-nombre').textContent = nombre;
    document.getElementById('modal-precio').textContent = precio;
    document.getElementById('modal-imagen').src = imagen;
    const miniImagenes = document.querySelectorAll('img.mini-imagen-modal')

    miniImagenes.forEach(imagenMini => {
        imagenMini.addEventListener('click', () => {
            document.getElementById('modal-imagen').src = imagenMini.src
        })
    })
    const modalImagen = document.getElementById('modal-imagen');

    modalImagen.addEventListener('mousemove', () => { mouseZoom(modalImagen) })
    modalImagen.addEventListener('mouseleave', () => {
        modalImagen.style.transform = "scale(1)";
        modalImagen.style.transition = "transform 0.3s ease-out";
    });

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
    modalImagen.style.transformOrigin = `${percentX}% ${percentY}%`;
    modalImagen.style.transition = "transform 0.1s ease-out";
}


const closeModal = () => {
    const modal = document.getElementById('modal');
    modal.style.display = "none";

    document.body.style.overflow = "visible";
    document.body.style.paddingRight = "0px";
}



const whatsappButton = document.getElementById('whatsapp-button');
whatsappButton.addEventListener('click', () => {
    const nombre = document.getElementById('modal-nombre').textContent;
    const precio = document.getElementById('modal-precio').textContent;
    const imagen = document.getElementById('modal-imagen').src;

    const numero = '3144287794';
    const mensaje = `Me encuentro interesado en comprar el producto:\nNombre: ${nombre}\nPrecio: ${precio}`;
    const mensajeSalto = encodeURIComponent(mensaje);
    const whatsappUrl = `https://wa.me/${numero}?text=${mensajeSalto}`;
    window.open(whatsappUrl, '_blank');
    console.log(`Nombre: ${nombre}, Precio: ${precio} , Precio: ${imagen}`);
});
