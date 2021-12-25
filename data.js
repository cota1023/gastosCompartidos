const conceptosDefault = ["Comida", "Bebida", "Postre"]

const guardarConceptosLocal = (clave, valor) => {
    localStorage.setItem(clave, valor)
}

guardarConceptosLocal("ListaConceptos", JSON.stringify(conceptosDefault))
