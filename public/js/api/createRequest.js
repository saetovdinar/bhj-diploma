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
    } else {
        for(let key in options.data) {
            formData.append( key,  options.data[key]);
        }
        
    }
    try {
        xhr.open(options.method, url);
        xhr.send(formData);  
    } catch(error) {
        options.callback(error, null);
    }
    
};
