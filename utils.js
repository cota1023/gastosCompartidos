export const renderList = (listaId, lista) => {
    const listaContainer = document.getElementById(listaId)

    for (const item of lista) {
        const itemList = document.createElement("li")
        itemList.innerText = item.nombre + ", Importe Gastado:  " + item.importeGastado

        listaContainer.appendChild(itemList)
    }

}

export const renderTotales = (contenedorId, importe, param) =>{
    const contenedor = document.getElementById(contenedorId)
    const total = document.createElement("H2")
    if(param=="T"){
        total.innerText = `Monto total gastado: ${importe}.`
    } else if (param=="D"){
        total.innerText = `Monto total dividido: ${importe}.`
    }else {alert("ERROR")}
    

    contenedor.appendChild(total)
}