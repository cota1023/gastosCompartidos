export class Participantes {
    constructor() {
        this.lista = JSON.parse(localStorage.getItem("ListaPersonas"))|| []
    }

    listarTodos() {
        return this.lista
    }

    agregarPersona(item) {
        this.lista.push(item)
        localStorage.setItem("ListaPersonas",JSON.stringify(this.lista))
    }

    getPersonaById(id) {
        const item = this.lista.find(element => element.id === id)

        if (!item) {
            throw new Error(`No existe el elemento con id ${id}`)
        }
        return item
    }

    borrarPersona(id) {
        const item = this.getPersonaById(id)
        const index = this.lista.indexOf(item)

        this.lista.splice(index, 1)
        console.log("Se borro")
    }

    getMontoGastadobyId() {
        return this.importeGastado
    }
}