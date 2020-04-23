const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messages = document.querySelector('#msg-1');
const weatherDetails = document.querySelector('#msg-2');
const weatherSummary = document.querySelector('#msg-3');
messages.textContent = '';
weatherDetails.innerHTML = '';
weatherSummary.innerHTML = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const address = searchInput.value;
    const url = `/weather?address=${address}`;

    messages.textContent = 'Loading...';
    messages.classList.remove('location');
    messages.classList.remove('error');
    weatherDetails.innerHTML = '';
    weatherSummary.innerHTML = '';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                messages.textContent = data.error;
                messages.classList.add('error');
            } else {
                const dailyForecastData = data.forecast.daily.data;
                messages.textContent = data.location;
                messages.classList.add('location');
                messages.classList.remove('error');
                weatherDetails.innerHTML = `Currently it is ${generateTemperatureHTML(data.forecast.currently.temperature)}. 
                <p>
                    Highest temperature: ${generateTemperatureHTML(dailyForecastData[0].temperatureHigh)} 
                </p>
                <p>
                    Lowest temperature: ${generateTemperatureHTML(dailyForecastData[0].temperatureLow)}
                </p>`;
                weatherSummary.innerHTML = `Weather Condition: <strong>${data.forecast.currently.summary}</strong>`;
            }
        })
        .catch(error => console.error(error));
});

function generateTemperatureHTML(temperature) {
    return `<strong>${temperature}<sup>o</sup>C</strong>`;
}