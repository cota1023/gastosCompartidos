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
    renderSelect
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

function OrdenarArray(array) {

    //ordeno array de menor a mayor
    let arrayOrdenado = []
    arrayOrdenado = array.sort(function (a, b) {
        return (a.importeGastado - b.importeGastado)
    })

    //sumar importes por nombre

    const resumen = arrayOrdenado.reduce((p, c) => {
        if (c.nombre in p) {
            p[c.nombre] += c.importeGastado; //<-- si ya existe le sumamos el total
        } else {
            p[c.nombre] = c.importeGastado; //<-- si no existe le asignamos el total
        }
        return p;
    }, [])

    console.log(resumen)

    CalcularImporteTotal(resumen)
    CalcularCantidadPersonas(resumen)
    CalcularImporteDivido()

    console.log(montoDividido)
    alert(`Cada uno debe poner ${montoDividido.toString()}.`)


    array.forEach(element => {
        if (element.importeGastado < montoDividido) {
            let montoAPagar = montoDividido - element.importeGastado
            alert(`${element.nombre} debe pagar ${montoAPagar}. `)
        } else if (element.importeGastado > montoDividido) {
            let montoARecibir = element.importeGastado - montoDividido
            alert(`${element.nombre} debe recibir ${montoARecibir}. `)
        }
    })


}

/* function MostrarPersonasYGastos(array){
console.log("Detalle de Personas y Gastos")
    array.forEach(element => {
    console.log(element.nombre, element.importeGastado)
});
} */

//form carga de gastos

/* const formGastos = document.getElementById("form-gastos")
const inputNombre = document.getElementById("input-nombre")
const inputMonto = document.getElementById("input-monto")

formGastos.addEventListener("submit", ()=>{
    const nombre = inputNombre.value
    const monto = inputMonto.value
    const persona = new Persona(nombre,monto)
    participantes.agregarPersona(persona)

})

const listaParticipantes = participantes.listarTodos()
CalcularImporteTotal(listaParticipantes)
CalcularCantidadPersonas(listaParticipantes)
montoDividido = CalcularImporteDivido()

renderList("lista-totales", listaParticipantes)
renderTotales("contenedor-totales", montoTotalGastado, "T")
renderTotales("contenedor-totales", montoDividido, "D")
 */

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

        //con Vanilla JS
        //renderSelect("select-nombre", listaParticipantes)

        for (const item of listaParticipantes) {

            $('#select-nombre').prepend(`<option value=${item}>${item}</option>`);

        }


    } else {
        alert("Ingrese una cantidad válida")
    }

})



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

const btnFinalizaCarga = document.getElementById("btnConceptos")
btnFinalizaCarga.onclick = () => {
    let listaConceptos = conceptos.listarTodos()
    renderList("lista-conceptos", listaConceptos)
    btnFinalizaCarga.disabled = true
    renderSelect("select-gasto", listaConceptos)
}

const btnAgregarGasto = document.getElementById("btn-agregar-gasto")
btnAgregarGasto.onclick = () => {
    const inputNombre = document.getElementById("select-nombre")
    let nombre = inputNombre.value
    const inputGasto = document.getElementById("select-gasto")
    let gasto = inputGasto.value
    const inputImporte = document.getElementById("input-importe")
    let importe = +inputImporte.value
    let nuevoGasto = new Gasto(nombre, gasto, importe)

    gastos.agregarGasto(nuevoGasto)

}

const btnCalculaRapido = document.getElementById("btn-calcula-rapido")
btnCalculaRapido.onclick = () => {
    OrdenarArray(gastos.listarTodos())

}