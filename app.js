const time = document.querySelector('.time')
const date = document.querySelector('.date')

const greeting = document.querySelector('.greeting')
const name = document.querySelector('.name')
const focus = document.querySelector('.focus')
const previous = document.querySelector('.previous')
const next = document.querySelector('.next')
const nameCityInput = document.querySelector('.nameCityInput')
const nameCity = document.querySelector('.nameCity')
const quote__block = document.querySelector('.quote__block')


function showTime() {
	const locale = 'en-US';
	
    let today = new Date(),
        hour = today.getHours(),
        minutes = today.getMinutes(),
        seconds = today.getSeconds(),
        weekDay = today.toLocaleString(locale, {weekday: 'long'}),
        day = today.toLocaleString(locale, {day: 'numeric'}),
        month = today.toLocaleString(locale, {month: 'long'}),
		year = today.getFullYear();

	let convhms = (nn) => nn < 10 ? '0' + nn : nn.toString();
		
	date.innerHTML = weekDay + ', ' + month + ' ' + day + ', ' + year;
	time.innerHTML = convhms(hour) + ':' + convhms(minutes) + ':' + convhms(seconds);

    setTimeout(showTime, 1000);
}

function getName() 
{
	name.textContent = localStorage.getItem('name') === null ? '[Enter Name]' : localStorage.getItem('name');
}

function setName(e) 
{
    if (e.type === 'keypress') 
	{
        if (e.which == 13 || e.keyCode == 13) 
		{
            if (e.target.innerText.trim().length > 0) 
                localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    }
	
    if (e.target.innerText.length > 0 && e.target.innerText.trim().length > 0) 
        localStorage.setItem('name', e.target.innerText);
}

//get Focus
function getFocus() 
{
	focus.textContent = localStorage.getItem('focus') === null ? '[Enter Your Focus]' : localStorage.getItem('focus');
}

//set Focus
function setFocus(e) 
{
    if (e.type === 'keypress') 
	{
        if (e.which == 13 || e.keyCode == 13) 
		{
            if (e.target.innerText.trim().length > 0)
                localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    }
	
    if (e.target.innerText.length > 0 && e.target.innerText.trim().length > 0)
        localStorage.setItem('focus', e.target.innerText);
}

//check name and focus
function nameFocusCheck() 
{
	name.textContent = localStorage.getItem('name') === null && name.textContent.trim().length === 0 ? '[Enter Name]' : localStorage.getItem('name');
	focus.textContent =  localStorage.getItem('focus') === null && focus.textContent.trim().length === 0 ? '[Enter Focus]' : localStorage.getItem('focus');
}

function clearName() 
{
    name.textContent = ''
}

function clearFocus() 
{
    focus.textContent = ''
}


//set day/night and etc. folder
function setTimesOfDay() {
    let today = new Date(),
        hour = today.getHours()

    if (hour >= 6 && hour < 12) 
	{
        return 'morning';
    } 
	else if (hour >= 12 && hour < 18) 
	{
        return 'day';
    } 
	else if (hour >= 18 && hour < 24) 
	{
        document.body.style.color = 'white'
        document.querySelector('.previous').style.color = 'rgba(255, 255, 255, 0.8)'
        document.querySelector('.next').style.color = 'rgba(255, 255, 255, 0.8)'
        return 'evening';
    } 
	else
	{
        document.body.style.color = 'rgba(255, 255, 255, 0.7)'
        document.querySelector('.previous').style.color = 'rgba(255, 255, 255, 0.8)'
        document.querySelector('.next').style.color = 'rgba(255, 255, 255, 0.8)'
        document.querySelector('.quote__block').style.color = 'rgb(233,230,230)'
        return 'night';
    }
}

function setBgGreet() 
{
    greeting.textContent = `Good ${setTimesOfDay()[0].toUpperCase() + setTimesOfDay().slice(1)}, `
}

//change bg
let n = Math.floor(Math.random()*19 + 1)

function bg(n) {
    const img = document.createElement('img');

    if (n < 10) 
	{
        const src = `assets/images/${setTimesOfDay()}/0${n}.jpg`
        img.src = src
        img.onload = () => {
            document.body.style.backgroundImage = `url(${src})`;
        };
    }

    if (n >= 10) 
	{
        const src = `assets/images/${setTimesOfDay()}/${n}.jpg`
        img.src = src
        img.onload = () => {
            document.body.style.backgroundImage = `url(${src})`;
        };
    }
}

//change bg every hour
let today3 = new Date(),
    hours3 = today3.getHours(),
    minute3 = today3.getMinutes(),
    seconds3 = today3.getSeconds();

function changeEveryHour() 
{
    let today = new Date(),
        hour = today.getHours();

    setBgGreet();

    if (hours3 > 23) hours3 = 0;
	
    if (hour !== hours3) 
	{
        bg();
        hours3++;
    }

    setTimeout(changeEveryHour, 1000)
}

function nexImage() 
{
	n++;
	if (n >= 20) n = 1;
	bg(n);
}

// previous image
function previousImage() 
{
	n--;
	if (n < 1) n = 1;
	bg(n);
}

function showHidden() 
{
    let inputState = document.querySelector('.nameCityInput').style.display;
    if (inputState === 'block') 
	{
        document.querySelector('.nameCityInput').style.display = 'none'
    }
	else
	{
        document.querySelector('.nameCityInput').style.display = 'block'
        document.querySelector('.nameCityInput').focus()
    }
}


let val;

function inputCity(e) 
{
    if (e.which == 13 || e.keyCode == 13) 
	{
        if (document.querySelector('.nameCityInput').value.trim().length !== 0) 
		{
            localStorage.setItem('val', document.querySelector('.nameCityInput').value)
            showCityName(val)
            showWeather()
        }
		else 
		{
            localStorage.getItem('val')
        }

    } 
	else if (document.querySelector('.nameCityInput').value.length === 0 && document.querySelector('.nameCityInput').value.trim().length === 0)
	{
        localStorage.getItem('val')
    } 
	else if (document.querySelector('.nameCityInput').value.trim().length !== 0)
	{
        localStorage.setItem('val', document.querySelector('.nameCityInput').value)
    }
}

function showCityName() 
{
	return localStorage.getItem('val') == null || localStorage.getItem('val')== '' ? 'Minsk' : localStorage.getItem('val');
}

const weatherIcon = document.querySelector('.weather-icon');

async function showWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${showCityName()}&appid=7339018c06a4ea17cf9e14f85817b214&units=metric`)
        .then((r) => r.json())
        .then((data) => {
            console.log(data)
            weatherIcon.className = 'weather-icon owf';
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            document.querySelector('.nameCity').innerHTML = data.name
            document.querySelector('.temperature').innerHTML = `${Math.floor(data.main.temp)}&deg`
            document.querySelector('.humidity').innerHTML = `Humidity: ${data.main.humidity} %`
            document.querySelector('.wind').innerHTML = `Wind: ${data.wind.speed} km/h`
        })
        .catch((e) => {
            document.querySelector('.nameCity').innerHTML = 'Incorrect city'
            document.querySelector('.temperature').innerHTML = ''
            document.querySelector('.humidity').innerHTML = ''
            document.querySelector('.wind').innerHTML = ''
        })
}

async function showTitle() {
    fetch(`https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`)
        .then((r) => r.json())
        .then((data) => {
            console.log(data)
            document.querySelector('.quote').innerHTML = data.quoteText
            document.querySelector('.author').innerHTML = `(C) ${data.quoteAuthor}`
        })
        .catch((e) => {
            document.querySelector('.quote').innerHTML = e
            console.log(e)
        })
}

const btn__quote = document.querySelector('.btn__quote')

name.addEventListener('keypress', setName)
name.addEventListener('blur', setName)
name.addEventListener('click', clearName)
name.addEventListener('blur', nameFocusCheck)

focus.addEventListener('keypress', setFocus)
focus.addEventListener('blur', setFocus)
focus.addEventListener('click', clearFocus)
focus.addEventListener('blur', nameFocusCheck)


next.addEventListener('click', nexImage)
previous.addEventListener('click', previousImage)

nameCity.addEventListener('click', showHidden)

nameCityInput.addEventListener('keypress', inputCity)
nameCityInput.addEventListener('blur', inputCity)
nameCityInput.addEventListener('blur', showWeather)
nameCityInput.addEventListener('blur', showHidden)

btn__quote.addEventListener('click', showTitle)

showTime()
setBgGreet()
getName()
getFocus()
bg(n)
changeEveryHour()
nameFocusCheck()
showWeather()

showTitle()
showCityName(val)
