import {
    Persona
} from "./persona"
import {
    Participantes
} from "./participantes"

const participantes = new Participantes()
const btnCantidad = document.getElementById("btnCantidad")



btnCantidad.onclick = () => {

    const cantidadPersonas = document.getElementById("select-cantidad")
    for (let index = 1; index <= cantidadPersonas.value; index++) {
        let nombrePersona = prompt("Ingrese el nombre de la persona " + index + ": ")
        const persona = new Persona(nombrePersona, 0.00)
        participantes.agregarPersona(persona)

    }
}