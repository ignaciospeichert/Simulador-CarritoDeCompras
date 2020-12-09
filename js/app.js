//Variables
const listaCursos = document.querySelector('#lista-cursos');
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
    //Datos del carrito en el Storage
    document.addEventListener('DOMContentLoaded', traerStorage);
    // Cuando agregas un curso al carrito
    listaCursos.addEventListener('click', agregarCurso);    
    // Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    //Vaciar Carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
    });
}

//Funciones
function agregarCurso (e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);        
    }    
}

function eliminarCurso (e) {
     e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        
        //Elimina el curso del Array
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();
    }
}

//Lee contenido html al que le dimos click
function leerDatosCurso(curso) {
    
    //Crear un objeto con contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1 
    }
    //Revisar si un elemeto ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
           if (curso.id === infoCurso.id) {
               curso.cantidad++;
               return curso;
           } else {
               return curso;
           }
        });
        articulosCarrito = [...cursos];
    }
    else {
        // Agregar elementos a Array articulosCarrito        
        articulosCarrito = [...articulosCarrito, infoCurso];
        }     
    
    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML () {
    //Limpiar HTML
    limpiarHTML();

    //Recorre el Array y genero el HTML
    articulosCarrito.forEach( curso => {

        //Destructuring 
        const { titulo, imagen , precio , cantidad, id } = curso;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td style="text-align: center;">
                ${titulo}
            </td>
            <td style="text-align: center;">
                ${precio}
            </td>
            <td style="text-align: center;">
                ${cantidad}
            </td>
            <td style="text-align: center;">
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;
        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

    datosStorage();
}

function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function datosStorage () {
    localStorage.setItem('producto',JSON.stringify(articulosCarrito));    
}

function traerStorage() {
    articulosCarrito = JSON.parse(localStorage.getItem('producto')) || [];
    carritoHTML();
}