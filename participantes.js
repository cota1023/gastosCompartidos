export class Participantes {
    constructor() {
        this.lista =  []
    }

    listarTodos() {
        return this.lista
    }

    agregarPersona(item) {
        this.lista.push(item)
        localStorage.setItem("ListaPersonas",JSON.stringify(this.lista))
    }

    borrarPersonas(){
        localStorage.removeItem("ListaPersonas")
        this.lista =  []
    }



}