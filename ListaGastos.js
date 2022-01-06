export class ListaGastos {
    constructor() {
        this.lista =  []
    }

    listarTodos() {
        return this.lista
    }

    agregarGasto(item) {
        this.lista.push(item)
        localStorage.setItem("ListaGastos",JSON.stringify(this.lista))
    }

}
