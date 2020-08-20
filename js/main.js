let listaProductos = [

    {nombre:'Pan',cantidad:1,precio:3.4},
    {nombre:'Fideos',cantidad:1,precio:5.5},
    {nombre:'Chocolates',cantidad:5,precio:6}

]

function renderList() {

    let ul = document.createElement('ul');
    ul.classList.add('demo-list-icon','mdl-list');

    ul.innerHTML='';

    listaProductos.forEach((producto,index) => {

        ul.innerHTML +=
        `<li class="mdl-list__item">
            <span class="mdl-list__item-primary-content w-10">
                <i class="material-icons mdl-list__item-icon">shopping_cart</i>
            </span>
            <span class="mdl-list__item-primary-content w-10">
                ${producto.nombre}
            </span>
            <span class="mdl-list__item-primary-content w-30">
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4">
                    <label class="mdl-textfield__label" for="sample4">Cantidad...</label>
                    <span class="mdl-textfield__error">Input is not a number!</span>
                </div>
            </span>
            <span class="mdl-list__item-primary-content w-30">
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="sample4">
                    <label class="mdl-textfield__label" for="sample4">Precio...</label>
                    <span class="mdl-textfield__error">Input is not a number!</span>
                </div>
            </span>

            <span class="mdl-list__item-primary-content w-20">
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                    <i class="material-icons">add</i>
                </button>
            </span>

        </li>`;
    });

    document.getElementById('lista').appendChild(ul);

}

renderList();