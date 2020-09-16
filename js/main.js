//let listaProductos = [];
//let template;

//Main Module
let main = (()=>{

    //variables y mètodos publicos
    init = () => {
        registrarServiceWorker();
        addListeners();
        renderTemplate();
    };

    Api = {

        //endpoint : 'https://5f596df68040620016ab9111.mockapi.io/lista/',
        endpoint : 'https://5f61455307c1770016c51efb.mockapi.io/api/producto/',
    
        deleteItem : (id) => {
            Api.callAction('delete',id)
        },
    
        updateItem : (id, comp, prop) => {
            const val = Number(comp.value);
            const index = listaProductos.findIndex(prod => prod.id == id);
            listaProductos[index][prop] = val;
            const nuevoProducto = listaProductos[index];
            Api.callAction('put', id, nuevoProducto);
        }, 
    
        addItem: (item) => {
            Api.callAction('post',null,item)
        },
    
        getItems: () => {
            $.get(Api.endpoint, (productosResponse) => {
                listaProductos = productosResponse;
                $('#lista').html(template({listaProductos}));
                componentHandler.upgradeElements($('#lista'));
            })
            .fail(err => {
                console.log(err);
            })
        },
    
        callAction : (action,id=null,data=null) => {
    
            var request = { url: Api.endpoint + ((id) ? id : '') , data:data , method:action };
    
            $.ajax(request)
            .done( Api.getItems() )
            .fail(err => {
                console.log(err);
            })
        }
    
    }

    //variables y métodos privados
    listaProductos = [];
    template = '';

    components = {

        addItemBtn : $('#btn_entrada_producto'),
        addItemInput : $('#ingreso_producto'),
        deleteAllBtn : $('#btn_borrar_todos_productos'),

        cleanInput : () => {
            components.addItemInput.val('');
            components.addItemInput.focus();
        }

    }

    //registramos eventos
    addListeners = () => {
        components.addItemBtn.click(() => {
    
            let prod = components.addItemInput.val();
            if (prod !== '') {
                const producto = {
                    nombre: prod,
                    cantidad: 0,
                    precio: 0
                };
    
                components.cleanInput();
    
                Api.addItem(producto);
    
            }
        });

        components.deleteAllBtn.click(() => {
            
            console.log('borrar todo');

            //listaProductos = [];
            
            /*if(listaProductos.length==0){
                console.log('No hay productos');
                return;
            }
    
            listaProductos.forEach(producto => {
                console.log(producto.nombre +' - id:'+ producto.id);
                Api.deleteItem(producto.id);
            });*/
    
        });
    }

    renderTemplate = () => {
        $.get('templates/lista-productos.hbs', source => {
            template = Handlebars.compile(source);
            
            Api.getItems();
    
        }).fail(err => {
            console.error('Error al intentar traer el template');
        })
    };

    registrarServiceWorker = () => {
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
    };

    return {
        init : init,
        Api : Api
    }

})();


$(document).ready( main.init() );