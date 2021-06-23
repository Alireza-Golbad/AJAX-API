"use strict";
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

// const getCountryData = function (country) {
//     const request = new XMLHttpRequest();
//     request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();

//     request.addEventListener("load", function () {
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         const html = `
//     <article class="country">
//         <img src="${data.flag}" alt="" class="country_img">
//         <div class="country_data">
//             <h3 class="country_name">${data.name}</h3>
//             <h4 class="country_region">${data.region}</h4>
//             <p class="country_row"><span>👫</span>${(
//                 +data.population / 1000000
//             ).toFixed(1)}M people</p>
//             <p class="country_row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country_row"><span>💰</span>${data.currencies[0].name}</p>
//         </div>
//     </article>
//     `;
//         countriesContainer.insertAdjacentHTML("beforeend", html);
//         countriesContainer.style.opacity = 1;
//     });
// };

// getCountryData("iran");
// getCountryData("usa");
// getCountryData("nigeria");

const renderCountry = function (data, className = "") {
    const html = `
    <article class="country ${className}">
        <img src="${data.flag}" alt="" class="country_img">
        <div class="country_data">
            <h3 class="country_name">${data.name}</h3>
            <h4 class="country_region">${data.region}</h4>
            <p class="country_row"><span>👫</span>${(
                +data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country_row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country_row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    </article> 
    `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
    // AJAX Call country 1c
    const request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.eu/rest/v2/name/${country}`);
    request.send();

    request.addEventListener("load", function () {
        const [data] = JSON.parse(this.responseText);
        console.log(data);

        //Render country 1
        renderCountry(data);

        // Get neighbour country (2)
        const [neighbour] = data.borders;

        if (!neighbour) return;

        // AJAX Call country 2
        const request2 = new XMLHttpRequest();
        request2.open(
            "GET",
            `https://restcountries.eu/rest/v2/alpha/${neighbour}`
        );
        request2.send();

        request2.addEventListener("load", function () {
            const data2 = JSON.parse(this.responseText);
            console.log(data2);

            renderCountry(data2, "neighbour");
        });
    });
};

getCountryAndNeighbour("usa");
