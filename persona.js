let idPersona = 0
export class Persona {
/*     constructor() {
        this.id = idPersona
        this.nombre = prompt("Ingrese el nombre de la persona")
        this.importeGastado = +prompt("Ingrese el monto gastado")
        idPersona++
    } */
    constructor(nombre, importeGastado) {
        this.id = idPersona
        this.nombre = nombre
        this.importeGastado = +importeGastado
        idPersona++
    }



}