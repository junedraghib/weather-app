console.log("this is js file being served from express srver")

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value
    msg1.textContent = 'Loading....'
    msg2.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
           
            if (data.error) {
                // console.log(data.error)
                msg1.textContent = data.error
            }

            msg1.textContent = data.location
            msg2.textContent = data.forecast
        })
    })
    
})