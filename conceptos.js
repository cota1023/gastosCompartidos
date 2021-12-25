export class Conceptos {
    constructor() {
        console.log(JSON.parse(localStorage.getItem("ListaConceptos")))
        this.lista = JSON.parse(localStorage.getItem("ListaConceptos")) || []
        console.log(JSON.parse(localStorage.getItem("ListaConceptos")))
    }

    listarTodos() {
        return this.lista
    }

    agregarConcepto(item) {
        this.lista.push(item)
        localStorage.setItem("ListaConceptos", JSON.stringify(this.lista))
    }
}