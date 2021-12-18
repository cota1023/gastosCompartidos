import {    Persona
} from "./persona.js";
import {
    Participantes
} from "./participantes.js";
import { renderList, renderTotales } from "./utils.js";

let cantidadPersonas = 0
let montoTotalGastado = 0.00
let montoDividido = 0.00


let validador = false

const participantes = new Participantes()

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

function CalcularImporteTotal(array){

    array.forEach(element => {
        montoTotalGastado += element.importeGastado
}); 
}

function CalcularImporteDivido(){
    if(montoTotalGastado <0){
        alert("Ocurrió un error al realizar el cálculo.")
    } else return montoTotalGastado/cantidadPersonas
}

/* function MostrarPersonasYGastos(array){
console.log("Detalle de Personas y Gastos")
    array.forEach(element => {
    console.log(element.nombre, element.importeGastado)
});
} */

//form carga de gastos

const formGastos = document.getElementById("form-gastos")
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

