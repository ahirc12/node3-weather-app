const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messages = document.querySelector('#msg-1');
const temperature = document.querySelector('#msg-2');
const weatherSummary = document.querySelector('#msg-3');
messages.textContent = '';
temperature.innerHTML = '';
weatherSummary.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = searchInput.value;
    const url = `http://localhost:5000/weather?address=${address}`;
    messages.textContent = 'Loading...';
    messages.classList.remove('location');
    messages.classList.remove('error');
    temperature.innerHTML = '';
    weatherSummary.textContent = '';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                messages.textContent = data.error;
                messages.classList.add('error');
            } else {
                messages.textContent = data.location;
                messages.classList.add('location');
                messages.classList.remove('error');
                temperature.innerHTML = `<h2>${data.forecast.currently.temperature}<sup>o</sup>C</h2>`;
                weatherSummary.textContent = data.forecast.currently.summary;
            }
        })
        .catch(error => console.error(error));
});