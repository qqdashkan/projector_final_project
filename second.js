'use strict';

const selectCountry = document.getElementById('countrySelect');
const yearSelect = document.getElementById('yearSelect');
const msg = document.querySelector('.msg');
const button = document.getElementById('fetchHolidays');
const holidaysTable = document.getElementById('holidaysTable');
const sortButton = document.getElementById('sortButton');
const errorBlock = document.getElementById("errorBlock");


class Countries {
    constructor() {
        this.API_KEY = 'sbC9X3HW4YxcFs1WDFofMaKCJqu0ae0o';
        this.isLoading = false;
    }

fetchData = () => {
    const url = `https://calendarific.com/api/v2/countries?api_key=${this.API_KEY}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            this.updateDOM(data);
        })
        .catch((error) => {
            errorBlock.textContent = `Error fetching countries: ${error.message}`;

        })
        .finally(() => {
            this.isLoading = false;
        })
    }


    updateDOM = (data) => {

        const {response} = data;
        let apiResponse = response.countries;
        let selectCountry = document.getElementById('countrySelect');

        apiResponse.forEach((country) => {
            const option = document.createElement('option');
            option.classList.add(country['iso-3166']);
            option.value = country.country_name;
            option.text = country.country_name;
            selectCountry.appendChild(option);
        });

            (() => {
            let arr = [];
            let year = 2001;
            while (year <= 2049) {
                arr.push(year);
                year += 1;
            }
            arr.forEach((year) => {
                const yearSelect = document.getElementById('yearSelect');
                const option = document.createElement('option');
                option.value = year;
                option.text = year;
                yearSelect.appendChild(option);
            })
        })();
    }
}

class Holidays {
    constructor() {
        this.API_KEY = 'sbC9X3HW4YxcFs1WDFofMaKCJqu0ae0o';
        this.sortTable = this.sortTable.bind(this);
    }

            fetchHolidays = (iso) => {
            const country = selectCountry.value;
            const year = yearSelect.value;
            const countryIso = iso;
            const holidaysUrl = `https://calendarific.com/api/v2/holidays?api_key=${this.API_KEY}&country=${countryIso}&year=${year}`;

            if(country && year) {
                fetch(holidaysUrl)
                    .then(response => response.json())
                    .then((holidays) => {
                        errorBlock.innerHTML = "";
                        this.renderTable(holidays);
                    })
                    .catch((error) => {
                        errorBlock.innerHTML = `Error fetching holidays: ${error.message}`;
                    })
            }
        };

renderTable = (holidays) => {
    const {response} = holidays;
    let apiResponse = response.holidays;

    const tbody = holidaysTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    apiResponse.forEach(holiday => {
        const row = document.createElement('tr');
        const dateCell = document.createElement('td');
        dateCell.textContent = holiday.date.iso;
        const nameCell = document.createElement('td');
        nameCell.textContent = holiday.name;
            
        row.appendChild(dateCell);
        row.appendChild(nameCell);
        tbody.appendChild(row);
    });
};

sortTable = () => {
    const tbody = holidaysTable.querySelector('tbody');
    const list = tbody.getElementsByTagName('tr');
    let arr = Array.from(list);
    let apiResponse = arr.reverse();
    tbody.innerHTML = '';
    
    apiResponse.forEach(holiday => {
    tbody.appendChild(holiday);
    });
};

}
        
(() => {
    const holidays = new Holidays();

    button.addEventListener('click', function(){
        let select = document.getElementById('countrySelect');
        const options = select.options;
        function getISO(){
            const index = select.selectedIndex;
            return options[index].className;
        }
        const iso = getISO();
        holidays.fetchHolidays(iso);
    })
})();

(() => {
    const countries = new Countries();

    document.addEventListener('DOMContentLoaded', function() {

        countries.fetchData();

    })
})();


selectCountry.addEventListener('change' , function () {
    const selectedCountry = selectCountry.value;
    const currentYear = new Date().getFullYear();
    yearSelect.value = currentYear;

    if (selectedCountry) {
      yearSelect.removeAttribute('disabled');

    } else {
      yearSelect.setAttribute('disabled', true);
      yearSelect.innerHTML = '';
    }
});

(() => {
    const sortList = new Holidays();
    sortButton.addEventListener('click', function(){
    sortList.sortTable();
})
})();







