const weatherFrom = document.getElementById('location-input')
const searchInput = document.getElementById('search')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')
const can1 = document.getElementById('icon1')
const can2 = document.getElementById('icon2')
const skycons = new Skycons({"color": "pink"});


weatherFrom.addEventListener('submit', (e) => {
    // prevent submit button changing urls
    e.preventDefault()
    // get content of input from location field
    const searchString = encodeURI(searchInput.value)
    // construct url with query string
    const url = `/weather?address=${searchString}`

    skycons.remove('icon1')

    messageOne.textContent = 'loading local weather forecast...'
    messageTwo.textContent = ''
    fetch(url).then((res) => {
        res.json().then((data) => {
            
            if(data.error) {
                return messageOne.textContent = data.error

            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast

            switch(data.icon) {
                case 'wind':
                    skycons.add("icon1", Skycons.WIND);
                break;
                case 'clear-day':
                    skycons.add("icon1", Skycons.CLEAR_DAY);
                break;
                case 'clear-night':
                    skycons.add("icon1", Skycons.CLEAR_NIGHT);
                break;
                case 'partly-cloudy-day':
                    skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
                break;
                case 'partly-cloudy-night':
                    skycons.add("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
                break;
                case 'rain':
                    skycons.add("icon1", Skycons.RAIN);
                break;
                case 'sleet':
                    skycons.add("icon1", Skycons.SLEET);
                break;
                case 'snow':
                    skycons.add("icon1", Skycons.SNOW);
                break;
                case 'cloudy':
                    skycons.add("icon1", Skycons.CLOUDY);
                break;
                case 'fog':
                    skycons.add("icon1", Skycons.FOG);
                break;
                default:
                    skycons.add("icon1", Skycons.CLEAR_DAY);
              }

            // start animation!
            skycons.play();

        })
    })

})