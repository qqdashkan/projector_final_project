const button = document.querySelector('.btn');

const firstDate = document.querySelector('.data1-input');
const secondDate = document.querySelector('.data2-input');
const radioWeek = document.querySelector('.week');
const radioMonth = document.querySelector('.month');

const radioAllDays = document.querySelector('.all-days');
const radioDaysOn = document.querySelector('.days-on');
const radioDaysOff = document.querySelector('.days-off');

const radioDays = document.querySelector('.days');
const radioHours = document.querySelector('.hours');
const radioMinutes = document.querySelector('.minutes');
const radioSeconds = document.querySelector('.seconds');

const table = document.getElementById('table');

document.addEventListener('DOMContentLoaded', function () {

    setDefaultSettingsDate();

    let array = JSON.parse(localStorage.getItem('resultsArray')) || [];
    if (array.length) {
        array.forEach((item) => {
            showHistory(item);
        })
    }
});

button.addEventListener('click', function () {

    const result = getResult();
    storeResultInLocalStorage(result);
    showHistory(result);
});

function storeResultInLocalStorage(result) {

        let resArray = JSON.parse(localStorage.getItem('resultsArray')) || [];
        resArray.push(result);
        if (resArray.length > 10) {
            document.getElementsByTagName( "tr" )[1].remove();
            resArray.splice(0, 1);
            localStorage.setItem('resultsArray', JSON.stringify(resArray));
        } else localStorage.setItem('resultsArray', JSON.stringify(resArray));
}

function showHistory(result) {

        document.getElementById("result").innerHTML = result.result;
        const tbody = table.querySelector('tbody');
        const row = document.createElement('tr');
        const dateOne = document.createElement('td');
        dateOne.innerHTML = new Date(result.first).toISOString().slice(0,10);
        const dateTwo = document.createElement('td');
        dateTwo.innerHTML = new Date(result.second).toISOString().slice(0,10);
        const res = document.createElement('td');
        res.innerHTML = result.result;
    
        row.appendChild(dateOne);
        row.appendChild(dateTwo);
        row.appendChild(res);
        tbody.appendChild(row);
}

function setDefaultSettingsDate() {
    let today = new Date().toISOString().slice(0,10);
    
    firstDate.setAttribute('value', today);
    secondDate.setAttribute('min', today);

    radioAllDays.checked = true;
    radioDays.checked = true;
};

firstDate.addEventListener('input', function () {
    secondDate.setAttribute('min', firstDate.value);
});

secondDate.addEventListener('input', function () {
    firstDate.setAttribute('max', secondDate.value);
});

radioWeek.addEventListener('click', function () {
    if (radioWeek.checked) {
        let first = new Date(firstDate.value);
        let second = new Date(first.setDate(first.getDate() + 7)).toISOString().slice(0,10);
        secondDate.setAttribute('value', second);
    }
});

radioMonth.addEventListener('click', function () {
    if (radioMonth.checked) {
        let first = new Date(firstDate.value);
        let second = new Date(first.setDate(first.getDate() + 30)).toISOString().slice(0,10);
        secondDate.setAttribute('value', second);
    }
});

function getAllDays() {
    if (radioAllDays.checked) {
        let first = new Date(firstDate.value);
        let second = new Date(secondDate.value);
        let days = ((Math.floor((second - first) / (1000 * 60 * 60 * 24))));
        let day = new Date(firstDate.value);
        let daysArray = [];
    
        for (let i = 0; i < days; i++) {
        let nextDay = new Date(day.setDate(day.getDate() + 1));
        daysArray.push(nextDay);
        }

        return {
            first,
            second,
            result: daysArray.length,
        };
    }
};

function getOnlyDaysOn() {
        let first = new Date(firstDate.value);
        let second = new Date(secondDate.value);
        let days = ((Math.floor((second - first) / (1000 * 60 * 60 * 24))));
        let daysArray = [];
        let daysOnArray = [];
    
        for (let i = 0; i < days; i++) {
        let nextDay = new Date(first.setDate(first.getDate() + 1));
        daysArray.push(nextDay);
        }

        daysArray.forEach((day) => {
            if (day.getDay() !== 6 && day.getDay() !== 0) {
            daysOnArray.push(day); 
            }
        });

        return {
            first: first,
            second: second,
            result: daysOnArray.length,
        };
}    

function getOnlyDaysOff() {
    if (radioDaysOff.checked) {
        let first = new Date(firstDate.value);
        let second = new Date(secondDate.value);
        let days = ((Math.floor((second - first) / (1000 * 60 * 60 * 24))));
        let daysArray = [];
        let daysOffArray = [];

        for (let i = 0; i < days; i++) {
        let nextDay = new Date(first.setDate(first.getDate() + 1));
        daysArray.push(nextDay);
        }

        daysArray.forEach((day) => {
            if (day.getDay() === 0 || day.getDay() === 6) {
            daysOffArray.push(day); 
            }
        });
        
        return {
            first,
            second,
            result: daysOffArray.length,
        };
    }
};

function getResult() {
    if(radioDays.checked) {
        if(radioAllDays.checked) {
            return getAllDays();
        }
        if(radioDaysOn.checked) {
            return getOnlyDaysOn();
        }
        if(radioDaysOff.checked) {
            return getOnlyDaysOff();
        }
    }
    if (radioHours.checked) {
        if(radioAllDays.checked) {
            const days = getAllDays();
            days.result = days.result * 24;
            return days;
            }
        if (radioDaysOn.checked) {
            const days = getOnlyDaysOn();
            days.result = days.result * 24;
            return days;
            }
        if (radioDaysOff.checked) {
            const days = getOnlyDaysOff();
            days.result = days.result * 24;
            return days;
            }
    }
    if (radioMinutes.checked) {
        if(radioAllDays.checked) {
            const days = getAllDays();
            days.result = days.result * 24 * 60;
            return days;
            }
        if (radioDaysOn.checked) {
            const days = getOnlyDaysOn();
            days.result = days.result * 24 * 60;
            return days;
            }
        if (radioDaysOff.checked) {
            const days = getOnlyDaysOff();
            days.result = days.result * 24 * 60;
            return days;
            }
    }
    if (radioSeconds.checked) {
        if(radioAllDays.checked) {
            const days = getAllDays();
            days.result = days.result * 24 * 60 * 60;
            return days;
            }
        if (radioDaysOn.checked) {
            const days = getOnlyDaysOn();
            days.result = days.result * 24 * 60 * 60;
            return days;
            }
        if (radioDaysOff.checked) {
            const days = getOnlyDaysOff();
            days.result = days.result * 24 * 60 * 60;
            return days;
            }
    }

};








