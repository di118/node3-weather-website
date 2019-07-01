const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading .....'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location.toString()).then((response) =>{
    response.json().then((data) =>{
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            console.log(data)
            messageOne.textContent = "The temperature in "  + data.location + " is " + data.forecast.temperature
            messageTwo.textContent = "Precipitation probability " + data.forecast.precipProbability
   
        }
    })
})
})