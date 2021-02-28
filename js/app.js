class Clientes {
    constructor(pos,ciudad,nombre,direccion,ferreteria) {
        this.pos = pos
        this.ciudad = ciudad
        this.nombre = nombre
        this.direccion = direccion
        this.ferreteria = ferreteria
    }
}

class UI {
    static mostrarClientes() {
        const clientes = Datos.traerClientes()
        clientes.forEach((cliente) => UI.agregarClienteLista(cliente))
    }

    static agregarClienteLista(cliente) {
        const lista = document.querySelector("#listaCliente")
        const fila = document.createElement("div")
        fila.className = "fila"
        fila.innerHTML = `
            <p><h5 class="text-info">Pos:</h5> ${cliente.pos}</p>
            <p><h5 class="text-info">Ciudad:</h5> ${cliente.ciudad}</p>
            <p><h5 class="text-info">Nombre:</h5> ${cliente.nombre}</p>
            <p><h5 class="text-info">Dirección:</h5> ${cliente.direccion}</p>
            <p><h5 class="text-info">Nombre F:</h5> ${cliente.ferreteria}</p>
            <span><a href="#" class="btn btn-warning btn-block delete">Borrar</a></span>
        `
        lista.appendChild(fila)
    }

    static eliminarCliente(e) {
        if(e.classList.contains("delete")) {
            e.parentNode.parentNode.remove()
            UI.mostrarAlerta("Cliente borrado de la lista", "warning")
        }
    }

    static mostrarAlerta(mensaje, className) {
        const div = document.createElement("div")
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(mensaje))

        const contenedor = document.querySelector(".container")
        contenedor.insertBefore(div, form)

        setTimeout(() => document.querySelector(".alert").remove(), 2000)
    }

    static limpiarCampos() {
        pos.value = ""
        ciudad.value = ""
        nombre.value = ""
        direccion.value = ""
        ferreteria.value = ""
    }

    //método para filtrar los nombres de los clientes
    static filtrarClientes(e) {
        var texto = e.target.value.toLowerCase()
        
        const filas = document.querySelectorAll(".fila")
        Array.from(filas).forEach((fila) => {
            //selecciono el nombre de cada cliente que esta en la fila
            let nombreClie = fila.childNodes[13].textContent
            if(nombreClie.toLowerCase().indexOf(texto) !== -1) {
               fila.style.display = "block"
            } else {
                fila.style.display = "none"
            }
        })
    }

    static cambiarBtn(e) {
       const textoBtn = e.target.textContent

       if(textoBtn === "Agregar Cliente nuevo") {
           e.target.textContent = "Ocultar Formulario"
           e.target.className = "btn btn-danger btn-md mb-3 text-light"
           form.style.display = "block"
       } else {
           e.target.textContent = "Agregar Cliente nuevo"
           e.target.className = "btn btn-success btn-md mb-3"
           form.style.display = "none"
       }
        
    }
}


class Datos {
    static traerClientes() {
        let clientes
        if(localStorage.getItem("clientes") === null) {
            clientes = []
        } else {
            clientes = JSON.parse(localStorage.getItem("clientes"))
        }
        return clientes
    }

    static agregarCliente(cliente) {
        const clientes = Datos.traerClientes()
        clientes.push(cliente)

        localStorage.setItem("clientes", JSON.stringify(clientes))
    }

    static removerCliente(nombre) {
        const clientes = Datos.traerClientes()
        clientes.forEach((cliente, indice) => {
            if(cliente.nombre === nombre) {
                clientes.splice(indice, 1)
            }
        })

        localStorage.setItem("clientes", JSON.stringify(clientes))
        
    }
}





const form = document.querySelector("#form")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const pos = document.querySelector("#pos").value
    const ciudad = document.querySelector("#ciudad").value
    const nombre = document.querySelector("#nombre").value
    const direccion = document.querySelector("#direccion").value
    const ferreteria = document.querySelector("#ferreteria").value

    if(pos === "" || ciudad === "" || nombre === "" || direccion === "" || ferreteria === "") {
        UI.mostrarAlerta("Por favor rellena todos los datos", "danger")
    } else {
        const cliente = new Clientes(pos,ciudad,nombre,direccion,ferreteria)
        Datos.agregarCliente(cliente)
        UI.limpiarCampos()
        UI.mostrarAlerta("Cliente agregado a tu lista", "success")
        UI.agregarClienteLista(cliente)
    }  
})

document.addEventListener("DOMContentLoaded", () => {    
    UI.mostrarClientes()
    form.style.display = "none"
})

const listaT = document.querySelector("#listaCliente")
listaT.addEventListener("click", (e) => {
    UI.eliminarCliente(e.target)
    Datos.removerCliente(e.target.parentNode.previousElementSibling.previousElementSibling.previousElementSibling.textContent)
})

//filtrar clientes
const filtro = document.querySelector("#filtro")
filtro.addEventListener("keyup", (e) => {
    UI.filtrarClientes(e)
})

//agregar clientes nuevos
const btn = document.querySelector("#cambiar")
btn.addEventListener("click", (e) =>{ 
    UI.cambiarBtn(e)
})