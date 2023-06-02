
let cliente = {
    mesa: "",
    hora: "",
    pedido: [],
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
        row.classList.add("row");

        const nombre = document.createElement("DIV");
        nombre.classList.add("col-md-4");
        nombre.textContent = platillo.nombre;

        row.appendChild(nombre);
        contenido.appendChild(row);
    });
}