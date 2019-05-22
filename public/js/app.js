const weatherFrom = document.getElementById('location-input')
const searchInput = document.getElementById('search')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

weatherFrom.addEventListener('submit', (e) => {
    // prevent submit button changing urls
    e.preventDefault()
    // get content of input from location field
    const searchString = encodeURI(searchInput.value)
    // construct url with query string
    const url = `http://localhost:3000/weather?address=${searchString}`


    messageOne.textContent = 'loading local weather forecast...'
    messageTwo.textContent = ''
    fetch(url).then((res) => {
        res.json().then((data) => {
            
            if(data.error) {
                return messageOne.textContent = data.error

            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast

        })
    })


})