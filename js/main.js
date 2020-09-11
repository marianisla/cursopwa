let listaProductos = [];
let template;
const endpoint = 'https://5f596df68040620016ab9111.mockapi.io/lista';

function borrarProducto(id) {
    //console.log(id);
    
    /* deleteProductoWeb(id, ()=> {
        renderLista();
    }); */

    Api.deleteItem(id);
}

function cambiarCantidad(id, e) {
    const cantidad = Number(e.value);
    const index = listaProductos.findIndex(prod => prod.id == id);

    listaProductos[index].cantidad = cantidad;
    const nuevoProducto = listaProductos[index];

    updateProductoWeb(id, nuevoProducto, () => {
        console.log('Modificado correctamente');
    })
}

function cambiarPrecio(id, e) {
    const precio = Number(e.value);
    const index = listaProductos.findIndex(prod => prod.id == id);
    
    listaProductos[index]['precio'] = precio;
    const nuevoProducto = listaProductos[index];
    
    updateProductoWeb(id, nuevoProducto, () => {
        console.log('Modificado correctamente');
    })
}

function configurarListeners() {

    $('#btn_entrada_producto').click(() => {
        const inputProducto = $('#ingreso_producto');

        let prod = inputProducto.val();
        if (prod !== '') {
            const producto = {
                nombre: prod,
                cantidad: 0,
                precio: 0
            };

            inputProducto.val('');
            inputProducto.focus();
/* 
            postProductoWeb(producto, prod => {
                Api.getItems();
            }) */

            Api.addItem(producto);

        }
    });
    $('#btn_borrar_todos_productos').click(() => {
        /* listaProductos = [];
        Api.getItems(); */

        console.log('//TODO: IMPLEMENTAR');

    })
}


//function renderList() {
    /* $.get('templates/lista-productos.hbs', source => {
        const template = Handlebars.compile(source);
    */     
/*         getProductosWeb((productosResponse) => {
            listaProductos = productosResponse;
            $('#lista').html(template({listaProductos}))
            componentHandler.upgradeElements($('#lista'));
        }); */

   /*  }).fail(err => {
        console.error('Error al intentar traer el template');
    }) */
//}

function renderTemplate() {
    $.get('templates/lista-productos.hbs', source => {
        template = Handlebars.compile(source);
        Api.getItems();
    }).fail(err => {
        console.error('Error al intentar traer el template');
    })
}

function getProductosWeb(callactionback) {
    $.get(endpoint, callactionback)
    .fail(err => {
        console.log(err);
    })
}

function deleteProductoWeb(id, callactionback) {
    $.ajax({url: `${endpoint}/${id}`, method: 'delete'})
    .then(callactionback)
    .fail(err => {
        console.log(err);
    })
}

function updateProductoWeb(id, producto, callactionback) {
    $.ajax({url: `${endpoint}/${id}`, data: producto, method: 'put'})
    .then(callactionback)
    .fail(err => {
        console.log(err);
    })
}

function postProductoWeb(producto, callactionback) {
    $.ajax({url: `${endpoint}`, data: producto, method: 'post'})
    .then(callactionback)
    .fail(err => {
        console.log(err);
    })
}



function registrarServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function () {
            this.navigator.serviceWorker.register('./sw.js').then(function (reg) {
                /* console.log('El service worker se registró correctamente', reg) */
            })
                .catch(function (err) {
                    console.warn('Error al registrar el service worker', err)
                })
        })
    }
}

var Api = {

    endpoint : 'https://5f596df68040620016ab9111.mockapi.io/lista',

    deleteItem : (id) => {
        Api.callaction('delete',id);
    },

    updateItem : (id, comp, prop) => {
        const val = Number(comp.value);
        const index = listaProductos.findIndex(prod => prod.id == id);
        listaProductos[index][prop] = val;
        const nuevoProducto = listaProductos[index];
        Api.callaction('put', id, nuevoProducto);
    }, 

    addItem: (item) => {
        Api.callaction('post',null,item);
    },

    getItems: () => {
        $.get(endpoint, (productosResponse) => {
            listaProductos = productosResponse;
            $('#lista').html(template({listaProductos}));
            componentHandler.upgradeElements($('#lista'));
        })
        .fail(err => {
            console.log(err);
        })
    },

    callaction : (action,id=null,data=null) => {

        var request = { url: `${endpoint}/` + ((id) ? id : '') , data:data , method:action };

        $.ajax(request)
        .then( Api.getItems() )
        .fail(err => {
            console.log(err);
        })
    }

}

function start() {
    registrarServiceWorker();
    configurarListeners();
    //renderizamos template
    renderTemplate();
}

$(document).ready(start);