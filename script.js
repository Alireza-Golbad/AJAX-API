"use strict";
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const request = new XMLHttpRequest();
request.open("GET", "https://restcountries.eu/rest/v2/name/iran");
request.send();

request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
        <img src="${data.flag}" alt="" class="country_img">
        <div class="country_data">
            <h3 class="country_name">${data.name}</h3>
            <h4 class="country_region">${data.region}</h4>
            <p class="country_row"><span>👫</span>${(
                +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country_row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country_row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    </article> 
    `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
});
