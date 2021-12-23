export class Conceptos {
    constructor() {
        this.lista = []
    }

    listarTodos() {
        return this.lista
    }

    agregarConcepto(item) {
        this.lista.push(item)
        localStorage.setItem("ListaConceptos", JSON.stringify(this.lista))
    }
}