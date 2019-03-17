// DOM elements
const degree = document.querySelector('.temperature-degree');
const timezoneSection = document.querySelector('.location-timezone');
const temperatureDescription = document.querySelector('.temperature-description');
const temperatureSection = document.querySelector('.degree-section');
const temperatureSpan = document.querySelector('.degree-section span');

window.addEventListener('load', () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lang = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/7662b8b38f509c88b29b9a467b430e3d/${lat},${lang}`;

            fetch(api)
            .then(response => response.json())
            .then(data => {
                const { timezone } = data;
                const { temperature, summary, icon }  = data.currently;
                let celsius = (temperature - 32) * (5 / 9);
                degree.textContent = temperature.toFixed(0);
                timezoneSection.textContent = timezone;
                temperatureDescription.textContent = summary;
                temperatureSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        degree.textContent = celsius.toFixed(0);
                    }
                    else {
                        temperatureSpan.textContent = "F";
                        degree.textContent = temperature.toFixed(0);
                    }
                });
                setIcons(icon, document.querySelector('.icon'));
            }).catch(error => console.log('Error', error));
        });
    }
    function setIcons(icon, iconId) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }
});