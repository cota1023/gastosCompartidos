import {
    ListaGastos
} from "./listaGastos.js";
import {
    Gasto
} from "./gasto.js";
import {
    Participantes
} from "./participantes.js";
import {
    renderTotales,
    renderSelect
} from "./utils.js";
import {
    Conceptos
} from "./conceptos.js";
import {
    validarStringONulo,
    validarSelect
} from "./validadores.js"
let cantidadDePersonas = 0
let montoTotalGastado = 0.00
let montoDividido = 0.00
let paginaActual = 1

//carga inicial si el local storage tiene datos
const conceptos = new Conceptos()
/* let listaConceptos = conceptos.listarTodos()
renderSelect("select-gasto", listaConceptos) */
//


let validador = false
const arrayAgrupado = []

// Carga de imagen de la rata

const URL_Json = 'db/data.json'

$("#imagen-rata").click(() => {

    const imagenAleatoria = Math.floor((Math.random() * (5 - 1 + 1)) + 1)


    $.getJSON(URL_Json, (response, status) => {
        if (status !== 'success') {
            throw new Error('Se produjo un error al cargar la imagen')

        } else {
            for (const rata of response) {
                if (rata.id == imagenAleatoria) {
                    document.getElementById("imagen-rata").src = `${rata.source}`
                }
            }
        }
    })
})


function CalcularCantidadPersonas(array) {
    cantidadDePersonas = array.length
}

function CalcularImporteTotal(array) {

    array.forEach(element => {
        montoTotalGastado += element.importeGastado
    });
}

function CalcularImporteDivido() {
    if (montoTotalGastado < 0) {
        alert("Ocurrió un error al realizar el cálculo.")
    } else montoDividido = montoTotalGastado / cantidadDePersonas
}

function AgruparArray(array) {

    for (const gasto of array) {

        const i = arrayAgrupado.findIndex(n => {
            return n.nombre === gasto.nombre
        })

        if (i !== -1) {
            let importeNuevo = arrayAgrupado[i].importeGastado += gasto.importeGastado
            let nuevoItem = {
                nombre: gasto.nombre,
                importeGastado: importeNuevo,
                concepto: 'N/A'
            }

            arrayAgrupado[i] = nuevoItem
        } else {
            arrayAgrupado.push(gasto)
        }
    }


    CalcularImporteTotal(arrayAgrupado)
    CalcularImporteDivido()


    renderTotales("seccion4-total", montoTotalGastado, "T")
    renderTotales("seccion4-dividido", montoDividido, "D")
    renderTotales("seccion4-detalle-lista", 0, "L", arrayAgrupado, montoDividido)


}


//declaro lista de participantes que se inicializa como lista vacía
const participantes = new Participantes()
//declaro lista de gastos que se inicializa como lista vacía
const gastos = new ListaGastos()

//sección para seleccionar la cantidad de personas mediante select

//con Vanilla JS
/* const btnCantidad = document.getElementById("btnCantidad")
btnCantidad.onclick = () => { */

// Jquery
$("#btnCantidad").click(() => {

    const cantidadPersonas = document.getElementById("select-cantidad")

    let validadorSelect = validarSelect(cantidadPersonas.selectedIndex)
    if (validadorSelect) {
        let validador = true
        let nombrePersona = ""
        for (let index = 1; index <= cantidadPersonas.value; index++) {
            nombrePersona = prompt("Ingrese el nombre de la persona " + index + ": ")
            do {
                validador = validarStringONulo(nombrePersona)
                if (!validador) {
                    alert("El nombre ingresado no es válido. Ingrese otro nombre")
                    nombrePersona = prompt("Ingrese el nombre de la persona " + index + ": ")
                } else participantes.agregarPersona(nombrePersona)
            } while (!validador)

        }
        const listaParticipantes = participantes.listarTodos()

        renderSelect("select-nombre", listaParticipantes)

        CalcularCantidadPersonas(listaParticipantes)



    } else {
        alert("Ingrese una cantidad válida")
    }

})

//Paso 2 - Botón Agregar conceptos

const btnConcepto = document.getElementById("boton-concepto")
btnConcepto.onclick = () => {
    let validador = true
    const inputConcepto = document.getElementById("input-concepto")
    let concepto = inputConcepto.value

    validador = validarStringONulo(concepto)
    if (!validador) {
        alert("El concepto ingresado no es válido. Intente nuevamente")
    } else {
        conceptos.agregarConcepto(concepto)
        inputConcepto.value = ""
        alert(`El concepto ${concepto} se agregó correctamente`)
    }

}

//Paso 2 - Animaciones sobre el botón de agregar concepto

$('#boton-concepto').mouseout(function () {
    $(".img-agregar").css('width', '4rem')
});

$('#boton-concepto').mouseenter(function () {
    $(".img-agregar").css('width', '4.1rem')
});



//Paso 3 -  Boton Guardar Gasto

const btnAgregarGasto = document.getElementById("btn-agregar-gasto")
btnAgregarGasto.onclick = () => {
    const inputNombre = document.getElementById("select-nombre")
    let nombre = inputNombre.value
    const inputGasto = document.getElementById("select-gasto")
    let gasto = inputGasto.value
    const inputImporte = document.getElementById("input-importe")
    let importe = +inputImporte.value

    if (nombre === "Seleccionar persona.." || gasto === "Seleccionar gasto.." || importe === 0) {
        alert('Alguno de los datos que ingresaste no es válido.')
    } else {
        let nuevoGasto = new Gasto(nombre, gasto, importe)
        gastos.agregarGasto(nuevoGasto)
        alert('El gasto se guardó correctamente.')
        inputNombre.selectedIndex = 0
        inputGasto.selectedIndex = 0
        inputImporte.value = 0
    }


}


// NUEVO JS

// Jquery



$('#select-cantidad').on('change', function () {

    let personasRestantes = this.value - participantes.listarTodos().length
    let texto = `Te quedan cargar ${personasRestantes} personas`
    if (personasRestantes == 0) {
        texto = "Ya cargaste a todas las personas. Continúa en el siguiente paso."
        $('#nombresFaltantes').text(texto)
    } else if (personasRestantes < 0) {
        texto = "Vuelve a empezar para continuar"
        participantes.borrarPersonas()
    } else texto = `Te quedan cargar ${personasRestantes} personas`

    $('#nombresFaltantes').text(texto)
});

$("#btnAgregarNombres").click(() => {


    let nombrePersona = inputNombre.value
    validador = validarStringONulo(nombrePersona)
    if (!validador) {
        alert("El nombre ingresado no es válido. Ingrese otro nombre")
        inputNombre.value = ""
    } else if (participantes.listarTodos().length < $('#select-cantidad').val()) {
        participantes.agregarPersona(nombrePersona)
        inputNombre.value = ""
        let personasTotales = $('#select-cantidad').val()
        let personasCargadas = participantes.listarTodos().length
        let texto = ""
        if (personasTotales - personasCargadas == 0) {
            texto = "Ya cargaste a todas las personas. Continúa en el siguiente paso."
            $('#nombresFaltantes').text(texto)
        } else if (personasTotales - personasCargadas < 0) {
            texto = "Vuelve a empezar para continuar"
            participantes.borrarPersonas()
        } else texto = `Te quedan cargar ${personasTotales - personasCargadas} personas`

        $('#nombresFaltantes').text(texto)
    } else {
        alert("Ya cargaste a todas las personas")
    }

})

$("#img-next").click(() => {

    if (paginaActual == 1) {

        let personasTotales = $('#select-cantidad').val()
        let personasCargadas = participantes.listarTodos().length
        let texto = ""
        if (personasTotales - personasCargadas > 0) {
            alert('Todavía te faltan cargar personas')

        } else {

            document.getElementById("img2").src = "./img/2c.png"
            paginaActual = 2
            $("#seccion-1").hide()
            $("#seccion-2").show()

            const listaParticipantes = participantes.listarTodos()
            renderSelect("select-nombre", listaParticipantes)
            CalcularCantidadPersonas(listaParticipantes)
        }


    } else if (paginaActual == 2) {

        //logica de la seccion 2

        if (JSON.parse(localStorage.getItem("ListaConceptos")) == null) {
            alert('Tenés que agregar al menos un concepto para continuar!')
        } else {

            document.getElementById("img3").src = "./img/3c.png"
            paginaActual = 3
            $("#seccion-1").hide()
            $("#seccion-2").hide()
            $("#seccion-3").show()
            $("#seccion-4").hide()

            const listaConceptos = conceptos.listarTodos()

            renderSelect('select-gasto', listaConceptos)
            document.getElementById("img-next").src = "./img/finalizar.png"




        }
    } else if (paginaActual == 3) {

        if (JSON.parse(localStorage.getItem("ListaGastos")) == null) {
            alert('Tenés que asociar al menos un gasto para continuar!')
        } else {
            const listaGastos = gastos.listarTodos()

            AgruparArray(listaGastos)
            $("#seccion-1").hide()
            $("#seccion-2").hide()
            $("#seccion-3").hide()
            $("#seccion-4").show()
            $("#img-back").hide()
            $("#img-next").hide()

        }

    }

})

$("#img-back").click(() => {

    if (paginaActual == 1) {
        alert('No se puede volver atrás!')
        document.getElementById("img-next").src = "./img/next.png"
    } else if (paginaActual == 2) {
        document.getElementById("img2").src = "./img/2.png"
        document.getElementById("img-next").src = "./img/next.png"
        paginaActual = 1
        $("#seccion-1").show()
        $("#seccion-2").hide()
        $("#seccion-3").hide()
        $("#seccion-4").hide()
    } else if (paginaActual == 3) {
        document.getElementById("img3").src = "./img/3.png"
        document.getElementById("img-next").src = "./img/next.png"
        paginaActual = 2
        $("#seccion-1").hide()
        $("#seccion-2").show()
        $("#seccion-3").hide()
    }

})