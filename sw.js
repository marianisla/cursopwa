self.addEventListener('install', e => {
    console.log('sw install');
});
self.addEventListener('activate', e => {
    console.log('sw activate');
})
self.addEventListener('fetch', e => {
    
    const request = e.request;
    let response;

    if(!self.navigator.onLine){
        response = new Response('NO HAY INTERNET', {headers: {'content-type': 'text/plain'}});
        e.respondWith(response);
        return;
    }

    //cambio de ícono por otro
    if (request.url.includes('logo.png')) {

        //response = fetch('images/icons/logo_offline.png');
        response = fetch(request);

    } else {
        
        // caso contrario que busque normalmente el recurso.
        response = fetch(request);
    }

    e.respondWith(response);

})