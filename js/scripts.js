import crearTabla from "./tabla.js";
import Anuncio_Auto from "./anuncio_auto.js";

let listaAutomoviles = [];
let proximoId;
let divTabla;
let frmAutomovil;

window.addEventListener('load', inicializarManejadores);


const btnGuardar = document.getElementById("btnGuardar");

const btnModificar = document.getElementById("btnModificar");

const btnEliminar = document.getElementById("btnEliminar");

let listaAnuncios = [{
    "id": 1,
    "titulo": "GMC",
    "transaccion": "alquiler",
    "descripcion": "Savana 3500",
    "precio": 5940092,
    "num_puertas": 4,
    "num_KMs": 80352,
    "potencia": 6112,
    "colores": ["rojo", "blanco"]
}, {
    "id": 2,
    "titulo": "Ford",
    "transaccion": "alquiler",
    "descripcion": "Econoline E250",
    "precio": 5107498,
    "num_puertas": 3,
    "num_KMs": 54836,
    "potencia": 6767,
    "colores": ["rojo", "blanco"]
}, {
    "id": 3,
    "titulo": "GMC",
    "transaccion": "venta",
    "descripcion": "Savana",
    "precio": 9651916,
    "num_puertas": 2,
    "num_KMs": 64607,
    "potencia": 7271,
    "colores": ["rojo", "blanco"]
}, {
    "id": 4,
    "titulo": "Audi",
    "transaccion": "venta",
    "descripcion": "SL-Class",
    "precio": 3975066,
    "num_puertas": 3,
    "num_KMs": 18577,
    "potencia": 12830,
    "colores": ["rojo"]
}, {
    "id": 5,
    "titulo": "Mitsubishi",
    "transaccion": "alquiler",
    "descripcion": "Raider",
    "precio": 73463993,
    "num_puertas": 5,
    "num_KMs": 1283,
    "potencia": 1877,
    "colores": ["rojo"]
}, {
    "id": 6,
    "titulo": "GMC",
    "transaccion": "alquiler",
    "descripcion": "Savana 3500",
    "precio": 5940092,
    "num_puertas": 4,
    "num_KMs": 80352,
    "potencia": 6112,
    "colores": ["rojo", "negro"]
}, {
    "id": 7,
    "titulo": "Llanero",
    "transaccion": "alquiler",
    "descripcion": "Econoline E250",
    "precio": 5107498,
    "num_puertas": 3,
    "num_KMs": 54836,
    "potencia": 6767,
    "colores": ["rojo", "negro"]
}, {
    "id": 8,
    "titulo": "GMC",
    "transaccion": "venta",
    "descripcion": "Savana",
    "precio": 9651916,
    "num_puertas": 2,
    "num_KMs": 64607,
    "potencia": 7271,
    "colores": ["rojo", "negro"]
}, {
    "id": 9,
    "titulo": "Honda",
    "transaccion": "venta",
    "descripcion": "SL-Class",
    "precio": 3975066,
    "num_puertas": 3,
    "num_KMs": 52438,
    "potencia": 12830,
    "colores": ["negro"]
}, {
    "id": 10,
    "titulo": "Mitsubishi",
    "transaccion": "alquiler",
    "descripcion": "Raider",
    "precio": 7346993,
    "num_puertas": 5,
    "num_KMs": 30479,
    "potencia": 18577,
    "colores": ["blanco"]

}];


function inicializarManejadores() {
    localStorage.setItem("anuncios", JSON.stringify(listaAnuncios));

    listaAutomoviles = obtenerAutomoviles();

    divTabla = document.getElementById('divTabla');
    frmAutomovil = document.forms[0];
    if (listaAutomoviles) {
        actualizarLista();
    }
    frmAutomovil.addEventListener('submit', e => {
        e.preventDefault();
        altaAutomovil();
    });
}

function obtenerAutomoviles() {
    const automoviles = JSON.parse(localStorage.getItem('anuncios')) || [];
    localStorage.setItem('nextId', automoviles[automoviles.length - 1].id);
    return automoviles;
}

function altaAutomovil() {
    listaAutomoviles = obtenerAutomoviles();
    proximoId = obtenerId();
    proximoId++;
    const nuevoAuto = obtenerAutomovil(proximoId);
    if (nuevoAuto) {
        listaAutomoviles.push(nuevoAuto);
        guardarDatos();
        actualizarLista();
    }
}

function obtenerAutomovil(proximoId) {
    const colores = [];
    frmAutomovil.color.forEach(color => {
        if (color.checked) {
            colores.push(color.value);
        }
    });

    const nuevoAnuncioAuto = new Anuncio_Auto(
        proximoId,
        document.getElementById("txtTitulo").value,
        frmAutomovil.transaction.value === 'sell' ? "venta" : "alquiler",
        document.getElementById("txtDescripcion").value,
        document.getElementById("txtPrecio").value,
        document.getElementById("txtPuertas").value,
        document.getElementById("txtKMs").value,
        document.getElementById("txtPotencia").value,
        colores
    );
    return nuevoAnuncioAuto;
}


function obtenerId() {
    return JSON.parse(localStorage.getItem('nextId')) || 1000;
}

function guardarDatos() {
    localStorage.setItem('anuncios', JSON.stringify(listaAutomoviles));
    localStorage.setItem('nextId', proximoId);
}

function actualizarLista() {
    divTabla.innerHTML = "";
    let spinner = document.createElement("img");
    spinner.src = "./img/739.gif";
    divTabla.appendChild(spinner);
    setTimeout(() => {
        divTabla.removeChild(spinner);
        divTabla.appendChild(crearTabla(listaAutomoviles));
    }, 5000);
}


btnGuardar.addEventListener('click', function (e) {

    let camposCompletos = document.forms[0].checkValidity();

    let colores = [];
    frmAutomovil.color.forEach(color => {
        if (color.checked) {
            colores.push(color.value);
        }
    });

    camposCompletos = camposCompletos && colores.length > 0;

    e.preventDefault();

    if (camposCompletos) {
        altaAutomovil();
        alert("Guardado con éxito!");
        cleanInfo();
    } else {
        let msg = "";
        if(colores.length ===  0){
            msg = "Debe seleccionar al menos un color... ";
        }
        alert(msg + "Los campos no están completos, o alguno está incorrecto. No se guardó.")
    }

});


btnModificar.addEventListener('click', function (e) {


    e.preventDefault();
    const selectedId = document.getElementById("txtID").value;

    const colores = [];
    frmAutomovil.color.forEach(color => {
        if (color.checked) {
            colores.push(color.value);
        }
    });

    listaAutomoviles.forEach(element => {
        if (element.id == selectedId) {

            element['titulo'] = document.getElementById("txtTitulo").value;
            element['descripcion'] = document.getElementById("txtDescripcion").value;
            element['precio'] = document.getElementById("txtPrecio").value;
            element['num_puertas'] = document.getElementById("txtPuertas").value;
            element['num_KMs'] = document.getElementById("txtKMs").value;
            element['potencia'] = document.getElementById("txtPotencia").value;
            element['colores'] = colores;

            if (frmAutomovil.transaction.value = "rdoS") {
                element['transaccion'] = "venta";
            } else {
                element['transaccion'] = "alquiler";
            }


            if (confirm("Realmente desea modificar el anuncio?")) {
                localStorage.setItem("anuncios", JSON.stringify(listaAutomoviles));
                divTabla.removeChild(divTabla.lastChild);

                divTabla.appendChild(crearTabla(listaAutomoviles));
                alert("Modificación Exitosa!");
                cleanInfo();
            } else {
                alert("No se ha modificado el anuncio... Se limpiará la pantalla");
                cleanInfo();
            }
        }
    });
});


btnEliminar.addEventListener('click', function (e) {

    e.preventDefault();
    const selectedId = document.getElementById("txtID").value;

    listaAutomoviles.forEach(element => {

        if (element.id == selectedId) {
            const index = listaAutomoviles.indexOf(element);

            if (confirm("Seguro que desea eliminar el anuncio?")) {
                listaAutomoviles.splice(index, 1);

                localStorage.setItem("anuncios", JSON.stringify(listaAutomoviles));

                divTabla.removeChild(divTabla.lastChild);

                divTabla.appendChild(crearTabla(listaAutomoviles));
                cleanInfo();
            }
        }
    });
});


function cleanInfo() {

    document.getElementById("txtTitulo").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("txtPrecio").value = "";
    document.getElementById("txtPuertas").value = "";
    document.getElementById("txtKMs").value = "";
    document.getElementById("txtPotencia").value = "";
    document.getElementById("txtID").value = "";
    frmAutomovil.color.forEach(color => {
        color.checked = false
    });

    btnGuardar.disabled = false;
    btnModificar.disabled = true;
    btnEliminar.disabled = true;

}

