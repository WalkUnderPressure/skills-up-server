"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfiles = getProfiles;
const Currency_1 = require("./Currency");
const Country_1 = require("./Country");
function getProfiles() {
    const data = {
        profiles: [
            {
                id: '1',
                user_id: '1',
                first_name: 'Oleksandr',
                last_name: 'Brynzei',
                age: 25,
                currency: Currency_1.CurrencyMap.USD,
                country: Country_1.CountryMap.USA,
                city: 'Sacramento',
                username: 'admin',
                avatar: 'https://images.pexels.com/photos/1033142/pexels-photo-1033142.jpeg',
            },
            {
                id: '2',
                user_id: '2',
                first_name: 'Vincent',
                last_name: 'Roberts',
                age: 22,
                currency: Currency_1.CurrencyMap.EUR,
                country: Country_1.CountryMap.Germany,
                city: 'Frankfurt',
                username: 'user',
                avatar: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
            },
        ],
    };
    return data;
}
