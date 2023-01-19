const authorCredit = document.getElementById('author-credit')
const cryptoInfo = document.getElementById('crypto-info')
const cryptoPrices = document.getElementById('crypto-prices')
const time = document.getElementById('time')
const weather = document.getElementById('weather')

/* UNSPLASH API */
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=italy")
    /*  change after query to whatever for background */
        .then(res => res.json())
        .then(data => {
            // throw Error("error")
            document.body.style.backgroundImage = `url(${data.urls.full})`
            authorCredit.textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        console.log("Something went wrong! 😭")
        document.body.style.backgroundImage = "url('images/default-background.jpg')"
        authorCredit.textContent = "By: Annie Spratt"
        // This is where I can handle the error
        // report?
        // Using a default background image if error
        /* other option - document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?
        crop=entropy&cs=tinysrgb&
        fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`*/
    })

    /*
fetch("https://palabras-aleatorias-public-api.herokuapp.com/random", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
    .then((res) => res.json())
    .then(data => {
        crypto.textContent = `${data.body.word}`
    })
    */

/* CRYPTO CURRENCY API*/
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        cryptoInfo.innerHTML = `
            <img src="${data.image.small}">
            <span>${data.name}</span>
            `
        cryptoPrices.innerHTML = `
            <p>🎯: $${data.market_data.current_price.usd}</p>
            <p>👆🏽: $${data.market_data.high_24h.usd}</p>
            <p>👇🏽: $${data.market_data.low_24h.usd}</p>
            `
    })
    .catch(err => {
        console.log(err)
    })

/* SPOTIFY API */
fetch("https://api.spotify.com/v1")

/* CURRENT TIME */
function getCurrentTime(){
    const d = new Date()
    time.textContent = d.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000)

/* WEATHER API */
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            weather.innerHTML = `
                <img src="${iconUrl}">
                <p class="weather-temp">${Math.round(data.main.temp)}°</p>
                <p class="weather-city">${data.name}</p>
                `
        })
        .catch(err => console.error(err))
})

/*
navigator.geolocation.getCurrentPosition((position) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=a2ed659745e022597e9fdddaf1a57cf9&units=imperial`)
        .then((res) => res.json())
        .then(data => {
            weather.innerHTML = `${data.weather.main}`
    })
  })
  */