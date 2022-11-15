class carro {
    constructor(id, marca, modelo, precio, imagen){
        this.id = id,
        this.marca = marca,
        this.modelo = modelo,
        this.precio = precio,
        this.imagen = imagen

    }
    mostrarData(){
        console.log(`El carro es ${this.modelo}, es marca ${this.marca} y su precio es $${this.precio} y la imagen es ${this.imagen}`)
    }
}
//Objetos
const carro1 = new carro(01, "HotWheels", "1970 Pontiac Firebird", 2, "pontiacfirebird.jpg")
const carro2 = new carro(02, "HotWheels", "Tooned Volkswagen Golf Mk1", 2, "volkswagengolf.jpg")
const carro3 = new carro(03, "HotWheels", "Porsche 935", 2, "porsche935.jpg")
const carro4 = new carro(04, "HotWheels", "Sweet Driver", 2, "sweetdriver.jpg")
const carro5 = new carro(05, "HotWheels", "Toon'd '83 Chevy Silverado", 2, "chevysilverado.jpg")
const carro6 = new carro(06, "HotWheels", "Lolux", 2, "lolux.jpg")
const carro7 = new carro(07, "HotWheels", "1986 Toyota Van", 2, "toyotavan.jpg")
const carro8 = new carro(08, "HotWheels", "Lotus Emira", 2, "lotusemira.jpg")
const carro9 = new carro(09, "HotWheels", "Aston Martin Vantage GTE", 2, "astonmartinvantage.jpg")
const carro10 = new carro(10, "HotWheels", "'62 Corvette Gasser", 2, "corvettegasser.jpg")
const carro11 = new carro(11, "Matchbox", "1956 Jaguar", 2, "jaguar.jpg")
const carro12 = new carro(12, "Matchbox", "1957 Thunderbird", 2, "thunderbird.jpg")
const carro13 = new carro(13, "Matchbox", "1965 Ford C900", 2, "fordc900.jpg")
const carro14 = new carro(14, "Matchbox", "1956 Aston Martin", 2, "1956astonmartin.jpg")
const carro15 = new carro(15, "Matchbox", "2015 Alfa Romeo Giulia", 2, "alfaromeo.jpg")


let estanteria = []
if(localStorage.getItem("estanteria")){
    estanteria = JSON.parse(localStorage.getItem("estanteria"))
}else{
    estanteria.push(carro1, carro2, carro3, carro4, carro5, carro6, carro7, carro8, carro9, carro10, carro11, carro12, carro13, carro14, carro15)
    localStorage.setItem("estanteria", JSON.stringify(estanteria))
}

let productosEnCarrito = []
if(localStorage.getItem("carrito")){
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
}else{
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
}

function buscarPorMarca(array){
    let marcaEncontrado = array.find(
        (carro)=> carro.marca.toLowerCase() == marcaBuscado.toLowerCase()
        )
    if(marcaEncontrado == undefined){
        console.log(`La marca ${marcaBuscado} no se encuenta en catalogo`)
    }else{
        console.log(marcaEncontrado)
    }
}

//capturas DOM
let divProductos = document.getElementById("productos")
let buscador = document.getElementById("buscador")
let modalBody = document.getElementById("modal-body")
let botonCarrito = document.getElementById("botonCarrito")

function mostrarCatalogo(array){
    divProductos.innerHTML = ""
    for(let carro of array){
        let nuevoCarro = document.createElement("div")
        nuevoCarro.innerHTML = `<div id="${carro.id}" class="card" style="width: 18rem;">
                                    <img class="card-img-top img-fluid" style="height: 350px;"src="assets/${carro.imagen}" alt="${carro.modelo} de ${carro.marca}">
                                    <div class="card-body">
                                        <h4 class="card-title">${carro.modelo}</h4>
                                        <p>Marca: ${carro.marca}</p>
                                        <p class="">Precio: $${carro.precio}</p>
                                    <button id="agregarBtn${carro.id}" class="btn btn-outline-success">Agregar al carrito</button>
                                    </div>
    </div>`
        divProductos.appendChild(nuevoCarro)
        let btnAgregar = document.getElementById(`agregarBtn${carro.id}`)
        console.log(btnAgregar)
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(carro)
        })
    }
}

//function AGREGAR AL CARRITO
function agregarAlCarrito(carro){
    console.log(carro)
    productosEnCarrito.push(carro)
    console.log(productosEnCarrito)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
}

function cargarProductosCarrito(array){
    modalBody.innerHTML = ""
    array.forEach((productoCarrito)=>{
        modalBody.innerHTML += `
        <div class="card border-primary mb-3" id ="productoCarrito${productoCarrito.id}" style="max-width: 540px;">
            <img class="card-img-top" height="300px" src="assets/${productoCarrito.imagen}" alt="${productoCarrito.modelo}">
            <div class="card-body">
                    <h4 class="card-title">${productoCarrito.modelo}</h4>
                
                    <p class="card-text">$${productoCarrito.precio}</p> 
                    <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>
`
    })
    array.forEach((productoCarrito, indice)=>{
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click",()=>{
           //Eliminar del DOM
           let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
           cardProducto.remove()
           //Eliminar del array de comprar
           productosEnCarrito.splice(indice, 1) 
           console.log(productosEnCarrito)
           //Eliminar del storage
           localStorage.setItem('carrito', JSON.stringify(productosEnCarrito))

        })
    })
}

//EVENTOS PROYECTO
buscador.addEventListener("input", ()=>{console.log(buscador.value)})
botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
}) 
mostrarCatalogo(estanteria)