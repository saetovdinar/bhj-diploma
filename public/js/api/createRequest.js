/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let url = options.url;
    formData = new FormData();
    xhr.onload = function() {
        options.callback(null, xhr.response);
        
    }
    if(options.method === 'GET') {
        if(options.data) {
            url += '?';
            for(let key in options.data) {
                url += `${key}=${options.data[key]}&`;
            }
            url = url.slice(0, -1);
        }
        xhr.open('GET', url);
        xhr.send()
    } else {
        for(let key in options.data) {
            formData.append( key,  options.data[key]);
        }
        xhr.open(options.method, url);
        xhr.send(formData)
    }  
};
