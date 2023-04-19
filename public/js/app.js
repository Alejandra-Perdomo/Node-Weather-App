

    const weatherForm = document.querySelector('form');
    const search = document.querySelector('input');
    const message1 = document.querySelector('#location');
    const message2 = document.querySelector('#search-result');
    const error_message = document.querySelector('#error-message');


    weatherForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        fetchLocation(search.value);
    })

    
    const fetchLocation = (location) =>{

        reset();

        if(!location){
            return error_message.innerHTML='You must provide location!';
        }

    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        message1.innerHTML = 'Loading...';
        response.json().then((data)=>{
            message1.innerHTML = data.location;
            message2.innerHTML = data.forecast;
        }).catch((err)=>{
            message1.innerHTML = ''
            error_message.innerHTML = 'Unable to find location! Try another search';
        })
    })

    }

    const reset =()=>{
        message1.innerHTML = '';
        message2.innerHTML = '';
        error_message.innerHTML = '';
    }
