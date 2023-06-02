
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
        console.log("Si hay campos vacios");
    } else {
        console.log("Todos los campos estan llenos");
    }
}