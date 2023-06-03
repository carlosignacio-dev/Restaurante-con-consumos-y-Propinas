
let cliente = {
    mesa: "",
    hora: "",
    pedido: [],
}

const categorias = {
    1: "Comida",
    2: "Bebidas",
    3: "Postres"
}

const btnGuardarCliente = document.querySelector("#guardar-cliente");
btnGuardarCliente.addEventListener("click", guardarCliente);

function guardarCliente() {
    const mesa = document.querySelector("#mesa").value;
    const hora = document.querySelector("#hora").value;

    //Validacion campos vacios
    const camposVacios = [ mesa, hora ].some(campo => campo === "");

    if(camposVacios) {
        //Verificar si existe alerta
        const existeAlerta = document.querySelector(".invalid-feedback");
        if(!existeAlerta) {
            const alerta = document.createElement("DIV");
            alerta.classList.add("invalid-feedback", "d-block", "text-center");
            alerta.textContent = "Todos los campos son obligatorios";
            document.querySelector(".modal-body form").appendChild(alerta);

            setTimeout(() => {
                alerta.remove();
            }, 2500);
        }
        return;
    }
    
    //asignar datos de formulario a cliente
    cliente = { ...cliente, mesa, hora };

    //Ocultar Modal
    const modalFormulario = document.querySelector("#formulario");
    const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
    modalBootstrap.hide();

    //Mostrar secciones
    mostrarSecciones();

    //Obtener Platillos de la API de JSON server
    obtenerPlatillos();
}

function mostrarSecciones() {
    const seccionesOcultas = document.querySelectorAll(".d-none");
    seccionesOcultas.forEach(seccion => seccion.classList.remove("d-none"));
}

function obtenerPlatillos() {
    const url = "http://localhost:4000/platillos";

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarPlatillos(resultado))
        .then(error => console.log(error))
}

function mostrarPlatillos(platillos) {
    const contenido = document.querySelector("#platillos .contenido");

    platillos.forEach(platillo => {
        const row = document.createElement("DIV");
        row.classList.add("row", "py-3", "border-top");

        const nombre = document.createElement("DIV");
        nombre.classList.add("col-md-4");
        nombre.textContent = platillo.nombre;

        const precio = document.createElement("DIV");
        precio.classList.add("col-md-3", "fw-bold");
        precio.textContent = `$${platillo.precio}`;

        const categoria = document.createElement("DIV");
        categoria.classList.add("col-md-3");
        categoria.textContent = categorias[platillo.categoria];

        row.appendChild(nombre);
        row.appendChild(precio);
        row.appendChild(categoria);
        contenido.appendChild(row);
    });
}