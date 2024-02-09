/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    if(options.method === 'GET') {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.onload = function() {
            options.callback(null, xhr.response);
        }
        try {
            if(options.data) {
                xhr.open(options.method, `${options.url}?mail=${options.data.email}&password=${options.data.password}`);
                xhr.send();
            } else {
                xhr.open(options.method, `${options.url}`);
                xhr.send();
            }
            
        } 
        catch(e) {
            options.callback(e, null);
        }
        
    }
    if(options.method === 'POST') {
        const xhr = new XMLHttpRequest(),
        formData = new FormData();
        formData.append( 'mail',  options.data.email);
        formData.append( 'password', options.data.password );
        
        xhr.onload = function() {
            options.callback(null, xhr.response);
        }
        xhr.responseType = 'json';
        try {
            xhr.open(options.method, options.url);
            xhr.send(formData);
        }
        catch(e) {  
            options.callback(e, null)
        }
        
    }
    if(options.method === 'PUT') {
        const xhr = new XMLHttpRequest(),
        formData = new FormData();
        formData.append( 'mail',  options.data.email);
        formData.append( 'password', options.data.password );
        
        xhr.onload = function() {
            options.callback(null, xhr.response);
        }
        xhr.responseType = 'json';
        try {
            xhr.open(options.method, options.url);
            xhr.send(formData);
        }
        catch(e) {  
            options.callback(e, null)
        }
        
    }
    if(options.method === 'DELETE') {
        const xhr = new XMLHttpRequest(),
        formData = new FormData();
        formData.append( 'mail',  options.data.email);
        formData.append( 'password', options.data.password );
        
        xhr.onload = function() {
            options.callback(null, xhr.response);
        }
        xhr.responseType = 'json';
        try {
            xhr.open(options.method, options.url);
            xhr.send(formData);
        }
        catch(e) {  
            options.callback(e, null)
        }
        
    }
    
};
