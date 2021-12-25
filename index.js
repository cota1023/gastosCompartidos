import { ListaGastos } from "./listaGastos.js";
import { Gasto } from "./gasto.js";
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
let cantidadPersonas = 0
let montoTotalGastado = 0.00
let montoDividido = 0.00

const conceptos = new Conceptos()
//carga inicial si el local storage tiene datos
let listaConceptos = conceptos.listarTodos()
renderSelect("select-gasto", listaConceptos)
//


let validador = false

//const participantes = new Participantes()

/* while (!validador) {
    const persona = new Persona()
    participantes.agregarPersona(persona)
    let mensaje = prompt("Querés agregar otra persona?")
    if(mensaje.toUpperCase()=="S"){
        validador=false
    }else {
        validador=true
    }
}
 */

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
    } else return montoTotalGastado / cantidadPersonas
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

const participantes = new Participantes()
const gastos = new ListaGastos()
const btnCantidad = document.getElementById("btnCantidad")



btnCantidad.onclick = () => {

    const cantidadPersonas = document.getElementById("select-cantidad")
    for (let index = 1; index <= cantidadPersonas.value; index++) {
        let nombrePersona = prompt("Ingrese el nombre de la persona " + index + ": ")
        participantes.agregarPersona(nombrePersona)
    }
    const listaParticipantes = participantes.listarTodos()
    renderList("lista-participantes", listaParticipantes)
    btnCantidad.disabled = true
    renderSelect("select-nombre", listaParticipantes)
}


const btnConcepto = document.getElementById("boton-concepto")
btnConcepto.onclick = () => {
    const inputConcepto = document.getElementById("input-concepto")
    let concepto = inputConcepto.value
    conceptos.agregarConcepto(concepto)
    inputConcepto.value = ""
    alert("Elemento agregado correctamente")
}

const btnFinalizaCarga = document.getElementById("btnConceptos")
btnFinalizaCarga.onclick = () =>{
    let listaConceptos = conceptos.listarTodos()
    renderList("lista-conceptos", listaConceptos)
    btnFinalizaCarga.disabled=true
    renderSelect("select-gasto",listaConceptos)
}

const btnAgregarGasto = document.getElementById("btn-agregar-gasto")
btnAgregarGasto.onclick=()=>{
    const inputNombre = document.getElementById("select-nombre")
    let nombre =inputNombre.value
    const inputGasto = document.getElementById("select-gasto")
    let gasto =inputGasto.value
    const inputImporte = document.getElementById("input-importe")
    let importe = +inputImporte.value
    let nuevoGasto = new Gasto(nombre, gasto, importe)

    gastos.agregarGasto(nuevoGasto)

}

