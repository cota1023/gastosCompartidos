import {
    ListaGastos
} from "./listaGastos.js";
import {
    Gasto
} from "./gasto.js";
import {
    Participantes
} from "./participantes.js";
import {
    renderList,
    renderTotales,
    renderSelect,
    getIndexPersonaByNombre
} from "./utils.js";
import {
    Conceptos
} from "./conceptos.js";
import {
    validarStringONulo,
    validarSelect
} from "./validadores.js"
let cantidadPersonas = 0
let montoTotalGastado = 0.00
let montoDividido = 0.00

//carga inicial si el local storage tiene datos
const conceptos = new Conceptos()
/* let listaConceptos = conceptos.listarTodos()
renderSelect("select-gasto", listaConceptos) */
//


let validador = false
const arrayAgrupado = []

// Carga de imagen de la rata

const URL_Json = 'db/data.json'

$("#imagen-rata").click(() => {

    const imagenAleatoria = Math.floor((Math.random() * (5 - 1 + 1)) + 1)


    $.getJSON(URL_Json, (response, status) => {
        if (status !== 'success') {
            throw new Error('Se produjo un error al cargar la imagen')

        } else {
            for (const rata of response) {
                console.log(rata.id + '' + rata.source)
                if (rata.id == imagenAleatoria) {
                    document.getElementById("imagen-rata").src = `${rata.source}`
                }
            }
        }
    })
})


function CalcularCantidadPersonas(array) {
    cantidadPersonas = array.length
}

function CalcularImporteTotal(array) {

    array.forEach(element => {
        montoTotalGastado += element.importeGastado
    });
}

function CalcularImporteDivido() {
    if (montoTotalGastado < 0) {
        alert("Ocurrió un error al realizar el cálculo.")
    } else montoDividido = montoTotalGastado / cantidadPersonas
}

function AgruparArray(array) {

    //ordeno array de menor a mayor
    /*     let arrayOrdenado = []
        arrayOrdenado = array.sort(function (a, b) {
            return (a.importeGastado - b.importeGastado)
        }) */

    for (const gasto of array) {
        console.log(gasto)
        //if (arrayAgrupado.indexOf(n => n.nombre === gasto.nombre)) {
            console.log(arrayAgrupado.findIndex(n => {
                return n.nombre === gasto.nombre
            }))

            const i = arrayAgrupado.findIndex(n => {
                return n.nombre === gasto.nombre
            })

        if (i !== -1) {
/*             const index = getIndexPersonaByNombre(gasto.nombre, arrayAgrupado)
            console.log(index) */
            let importeNuevo = arrayAgrupado[i].importeGastado += gasto.importeGastado
            let nuevoItem = {
                nombre: gasto.nombre,
                importeGastado: importeNuevo,
                concepto: 'N/A'
            }
            console.log(nuevoItem)
            arrayAgrupado[i] = nuevoItem
        } else {
            arrayAgrupado.push(gasto)
        }
    }
    console.log(arrayAgrupado)

    CalcularImporteTotal(arrayAgrupado)
    CalcularCantidadPersonas(arrayAgrupado)
    CalcularImporteDivido()

    console.log(montoDividido)
    alert(`Cada uno debe poner ${montoDividido.toString()}.`)


    arrayAgrupado.forEach(element => {
        if (element.importeGastado < montoDividido) {
            let montoAPagar = montoDividido - element.importeGastado
            alert(`${element.nombre} debe pagar ${montoAPagar}. `)
        } else if (element.importeGastado > montoDividido) {
            let montoARecibir = element.importeGastado - montoDividido
            alert(`${element.nombre} debe recibir ${montoARecibir}. `)
        }
    })


}


//declaro lista de participantes que se inicializa como lista vacía
const participantes = new Participantes()
//declaro lista de gastos que se inicializa como lista vacía
const gastos = new ListaGastos()

//sección para seleccionar la cantidad de personas mediante select

//con Vanilla JS
/* const btnCantidad = document.getElementById("btnCantidad")
btnCantidad.onclick = () => { */

// Jquery
$("#btnCantidad").click(() => {

    const cantidadPersonas = document.getElementById("select-cantidad")

    let validadorSelect = validarSelect(cantidadPersonas.selectedIndex)
    if (validadorSelect) {
        let validador = true
        let nombrePersona = ""
        for (let index = 1; index <= cantidadPersonas.value; index++) {
            nombrePersona = prompt("Ingrese el nombre de la persona " + index + ": ")
            do {
                validador = validarStringONulo(nombrePersona)
                if (!validador) {
                    alert("El nombre ingresado no es válido. Ingrese otro nombre")
                    nombrePersona = prompt("Ingrese el nombre de la persona " + index + ": ")
                } else participantes.agregarPersona(nombrePersona)
            } while (!validador)

        }
        const listaParticipantes = participantes.listarTodos()
        renderList("lista-participantes", listaParticipantes)
        btnCantidad.disabled = true

        $('.collapse').collapse()


        renderSelect("select-nombre", listaParticipantes)


    } else {
        alert("Ingrese una cantidad válida")
    }

})

//Paso 2 - Botón Agregar conceptos

const btnConcepto = document.getElementById("boton-concepto")
btnConcepto.onclick = () => {
    let validador = true
    const inputConcepto = document.getElementById("input-concepto")
    let concepto = inputConcepto.value

    validador = validarStringONulo(concepto)
    if (!validador) {
        alert("El concepto ingresado no es válido. Intente nuevamente")
    } else {
        conceptos.agregarConcepto(concepto)
        inputConcepto.value = ""
        alert(`El concepto ${concepto} se agregó correctamente`)
    }

}

//Paso 2 - Animaciones sobre el botón de agregar concepto

$('#boton-concepto').mouseout(function () {
    $(".img-agregar").css('width', '4rem')
});

$('#boton-concepto').mouseenter(function () {
    $(".img-agregar").css('width', '4.1rem')
});

//Paso 2 - Botón Finalizar Carga

const btnFinalizarCarga = document.getElementById("btnConceptos")
btnFinalizarCarga.onclick = () => {
    if (JSON.parse(localStorage.getItem("ListaConceptos")) == null) {
        alert('Tenés que agregar al menos un concepto para continuar!')
    } else {

        const listaConceptos = conceptos.listarTodos()
        console.log(listaConceptos)
        renderSelect('select-gasto', listaConceptos)
        $('.collapse').collapse()
    }

}

//Paso 3 -  Boton Guardar Gasto

const btnAgregarGasto = document.getElementById("btn-agregar-gasto")
btnAgregarGasto.onclick = () => {
    const inputNombre = document.getElementById("select-nombre")
    let nombre = inputNombre.value
    const inputGasto = document.getElementById("select-gasto")
    let gasto = inputGasto.value
    const inputImporte = document.getElementById("input-importe")
    let importe = +inputImporte.value

    if (nombre === "Seleccionar persona.." || gasto === "Seleccionar gasto.." || importe === 0) {
        alert('Alguno de los datos que ingresaste no es válido.')
    } else {
        let nuevoGasto = new Gasto(nombre, gasto, importe)
        gastos.agregarGasto(nuevoGasto)
        alert('El gasto se guardó correctamente.')
        inputNombre.selectedIndex = 0
        inputGasto.selectedIndex = 0
        inputImporte.value = 0
    }


}

//Paso 3 -  Boton Finalizar Carga

const btnFinalizarCargaGastos = document.getElementById("btn-finalizar-gasto")
btnFinalizarCargaGastos.onclick = () => {

    if (JSON.parse(localStorage.getItem("ListaGastos")) == null) {
        alert('Tenés que asociar al menos un gasto para continuar!')
    } else {
        const listaGastos = gastos.listarTodos()
        console.log(listaGastos)
        renderList('lista-conceptos', listaGastos)
    }

}

//CALCULO - BOTON DIVISION RAPIDA

const btnCalculaRapido = document.getElementById("btn-calcula-rapido")
btnCalculaRapido.onclick = () => {
    AgruparArray(gastos.listarTodos())

}