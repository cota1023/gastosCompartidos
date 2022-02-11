/* export const renderList = (listaId, lista) => {
    const listaContainer = document.getElementById(listaId)

    for (const item of lista) {
        const itemList = document.createElement("li")
        itemList.className = "list-group-item"
        itemList.innerText = item
        listaContainer.appendChild(itemList)
    }

    seccion4-detalle-lista

} */



export const renderSelect = (selectId, lista) => {

    const listaContainer = document.getElementById(selectId)
    for (const item of lista) {
        const itemList = document.createElement("option")
        itemList.setAttribute("value", item)
        itemList.innerText = item
        listaContainer.appendChild(itemList)
    }



}


export const renderTotales = (contenedorId, importe, param, array = [], montoDividido = 0) => {
    const contenedor = document.getElementById(contenedorId)
    const total = document.createElement("H2")
    if (param == "T") {
        total.innerText = `Monto total gastado: ${importe.toFixed(2)}.`
        contenedor.appendChild(total)
    } else if (param == "D") {
        total.innerText = `Monto total dividido: ${importe.toFixed(2)}.`
        contenedor.appendChild(total)
    } else if (param == "L") {
        
        

        for (const element of array) {
            const listaContainer = document.getElementById(contenedorId)
            const itemList = document.createElement("li")
            itemList.className = "list-group-item"
            
            if (element.importeGastado < montoDividido) {
                let montoAPagar = montoDividido - element.importeGastado
                itemList.innerText = `${element.nombre} debe pagar ${montoAPagar.toFixed(2)}. `
                listaContainer.appendChild(itemList)
            } else if (element.importeGastado > montoDividido) {
                let montoARecibir = element.importeGastado - montoDividido
                itemList.innerText = `${element.nombre} debe recibir ${montoARecibir.toFixed(2)}. `
                listaContainer.appendChild(itemList)
            } else if(element.importeGastado > montoDividido){
                itemList.innerText = `${element.nombre} no debe poner ni recibir nada.`
                listaContainer.appendChild(itemList)
            }
            
        }
        
        
    } else {
        alert("ERROR")
    }



}