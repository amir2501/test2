import express from 'express';
import axios from 'axios';
import bodyParser from "body-parser";

const country_code = {
    "AFG": "Afghanistan",
    "ALB": "Albania",
    "DZA": "Algeria",
    "AND": "Andorra",
    "AGO": "Angola",
    "ATG": "Antigua and Barbuda",
    "ARG": "Argentina",
    "ARM": "Armenia",
    "AUS": "Australia",
    "AUT": "Austria",
    "AZE": "Azerbaijan",
    "BHS": "Bahamas",
    "BHR": "Bahrain",
    "BGD": "Bangladesh",
    "BRB": "Barbados",
    "BLR": "Belarus",
    "BEL": "Belgium",
    "BLZ": "Belize",
    "BEN": "Benin",
    "BTN": "Bhutan",
    "BOL": "Bolivia (Plurinational State of)",
    "BIH": "Bosnia and Herzegovina",
    "BWA": "Botswana",
    "BRA": "Brazil",
    "BRN": "Brunei Darussalam",
    "BGR": "Bulgaria",
    "BFA": "Burkina Faso",
    "BDI": "Burundi",
    "CPV": "Cabo Verde",
    "KHM": "Cambodia",
    "CMR": "Cameroon",
    "CAN": "Canada",
    "CAF": "Central African Republic",
    "TCD": "Chad",
    "CHL": "Chile",
    "CHN": "China",
    "COL": "Colombia",
    "COM": "Comoros",
    "COG": "Congo",
    "COD": "Congo, Democratic Republic of the",
    "CRI": "Costa Rica",
    "CIV": "Côte d'Ivoire",
    "HRV": "Croatia",
    "CUB": "Cuba",
    "CYP": "Cyprus",
    "CZE": "Czechia",
    "DNK": "Denmark",
    "DJI": "Djibouti",
    "DMA": "Dominica",
    "DOM": "Dominican Republic",
    "ECU": "Ecuador",
    "EGY": "Egypt",
    "SLV": "El Salvador",
    "GNQ": "Equatorial Guinea",
    "ERI": "Eritrea",
    "EST": "Estonia",
    "SWZ": "Eswatini",
    "ETH": "Ethiopia",
    "FJI": "Fiji",
    "FIN": "Finland",
    "FRA": "France",
    "GAB": "Gabon",
    "GMB": "Gambia",
    "GEO": "Georgia",
    "DEU": "Germany",
    "GHA": "Ghana",
    "GRC": "Greece",
    "GRD": "Grenada",
    "GTM": "Guatemala",
    "GIN": "Guinea",
    "GNB": "Guinea-Bissau",
    "GUY": "Guyana",
    "HTI": "Haiti",
    "HND": "Honduras",
    "HUN": "Hungary",
    "ISL": "Iceland",
    "IND": "India",
    "IDN": "Indonesia",
    "IRN": "Iran (Islamic Republic of)",
    "IRQ": "Iraq",
    "IRL": "Ireland",
    "ISR": "Israel",
    "ITA": "Italy",
    "JAM": "Jamaica",
    "JPN": "Japan",
    "JOR": "Jordan",
    "KAZ": "Kazakhstan",
    "KEN": "Kenya",
    "KIR": "Kiribati",
    "PRK": "Korea (Democratic People's Republic of)",
    "KOR": "Korea, Republic of",
    "KWT": "Kuwait",
    "KGZ": "Kyrgyzstan",
    "LAO": "Lao People's Democratic Republic",
    "LVA": "Latvia",
    "LBN": "Lebanon",
    "LSO": "Lesotho",
    "LBR": "Liberia",
    "LBY": "Libya",
    "LIE": "Liechtenstein",
    "LTU": "Lithuania",
    "LUX": "Luxembourg",
    "MDG": "Madagascar",
    "MWI": "Malawi",
    "MYS": "Malaysia",
    "MDV": "Maldives",
    "MLI": "Mali",
    "MLT": "Malta",
    "MHL": "Marshall Islands",
    "MRT": "Mauritania",
    "MUS": "Mauritius",
    "MEX": "Mexico",
    "FSM": "Micronesia (Federated States of)",
    "MDA": "Moldova (Republic of)",
    "MCO": "Monaco",
    "MNG": "Mongolia",
    "MNE": "Montenegro",
    "MAR": "Morocco",
    "MOZ": "Mozambique",
    "MMR": "Myanmar",
    "NAM": "Namibia",
    "NRU": "Nauru",
    "NPL": "Nepal",
    "NLD": "Netherlands",
    "NZL": "New Zealand",
    "NIC": "Nicaragua",
    "NER": "Niger",
    "NGA": "Nigeria",
    "MKD": "North Macedonia",
    "NOR": "Norway",
    "OMN": "Oman",
    "PAK": "Pakistan",
    "PLW": "Palau",
    "PSE": "Palestine, State of",
    "PAN": "Panama",
    "PNG": "Papua New Guinea",
    "PRY": "Paraguay",
    "PER": "Peru",
    "PHL": "Philippines",
    "POL": "Poland",
    "PRT": "Portugal",
    "QAT": "Qatar",
    "ROU": "Romania",
    "RUS": "Russian Federation",
    "RWA": "Rwanda",
    "KNA": "Saint Kitts and Nevis",
    "LCA": "Saint Lucia",
    "VCT": "Saint Vincent and the Grenadines",
    "WSM": "Samoa",
    "SMR": "San Marino",
    "STP": "Sao Tome and Principe",
    "SAU": "Saudi Arabia",
    "SEN": "Senegal",
    "SRB": "Serbia",
    "SYC": "Seychelles",
    "SLE": "Sierra Leone",
    "SGP": "Singapore",
    "SVK": "Slovakia",
    "SVN": "Slovenia",
    "SLB": "Solomon Islands",
    "SOM": "Somalia",
    "ZAF": "South Africa",
    "SSD": "South Sudan",
    "ESP": "Spain",
    "LKA": "Sri Lanka",
    "SDN": "Sudan",
    "SUR": "Suriname",
    "SWE": "Sweden",
    "CHE": "Switzerland",
    "SYR": "Syrian Arab Republic",
    "TWN": "Taiwan, Province of China",
    "TJK": "Tajikistan",
    "TZA": "Tanzania, United Republic of",
    "THA": "Thailand",
    "TLS": "Timor-Leste",
    "TGO": "Togo",
    "TON": "Tonga",
    "TTO": "Trinidad and Tobago",
    "TUN": "Tunisia",
    "TUR": "Turkey",
    "TKM": "Turkmenistan",
    "TUV": "Tuvalu",
    "UGA": "Uganda",
    "UKR": "Ukraine",
    "ARE": "United Arab Emirates",
    "GBR": "United Kingdom of Great Britain and Northern Ireland",
    "USA": "United States of America",
    "URY": "Uruguay",
    "UZB": "Uzbekistan",
    "VUT": "Vanuatu",
    "VEN": "Venezuela (Bolivarian Republic of)",
    "VNM": "Viet Nam",
    "YEM": "Yemen",
    "ZMB": "Zambia",
    "ZWE": "Zimbabwe"
};


const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static("public"));

app.get('/', async (req, res) => {
    let result = await axios.get('https://restcountries.com/v3.1/all')


    res.render('index.ejs', {
        result: result.data
    });
})

app.get('/search', async (req, res) => {
    try {
        let search = req.query.search;
        let result = await axios.get(`https://restcountries.com/v3.1/name/${search}`)
        result = result.data[0]
        let currency_rate_result = await axios.get('https://v6.exchangerate-api.com/v6/785ab6563ebcbc8ef876df65/latest/USD')

        console.log(result.data)
        console.log(search);

        let lang = Object.keys(result.languages)[0];
        let native_name_array = result.name.nativeName;
        let key = Object.keys(native_name_array)[0];
        let native_name = native_name_array[key].official;
        let languages = Object.values(result.languages);
        let currencies = Object.values(result.currencies);
        let border_countries = result.borders;
        let cca3 = Object.keys(result.currencies)[0];

        let capital = result.capital[0]
        console.log(capital)

        const today_weather = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=dec2154d681dd6d6fd067f1fd922dcad&units=metric`
        );
        let current_currency = Object(currency_rate_result.data.conversion_rates)[cca3]
        let temp = today_weather.data.main.temp;
        temp = Math.floor(Number(temp))


        const current_conditon = today_weather.data.weather[0]
        console.log(temp)
        console.log(current_conditon)

        !current_currency && (current_currency = 'no information')

        // console.log(current_currency)
        // console.log(cca3)
        // console.log(today_weather.data)

        let find_country = (arr) => {
            if (arr) {
                let array = []
                for (let i = 0; i < arr.length; i++) {
                    typeof (country_code[arr[i]]) == "string" && array.push(country_code[arr[i]])
                }
                return array;
            } else {
                console.log("error")
                return ['No border countries']
            }
        }

        let countries = find_country(border_countries)

        // console.log(countries)

        res.render('more_info.ejs', {
            result: result,
            native_name: native_name,
            languages: languages,
            currencies: currencies,
            countries: countries,
            cca3: cca3,
            current_currency: current_currency,
            temp: temp,
            current_conditon: current_conditon,
        })
    } catch (error) {
        res.redirect('/')
    }


})

app.get('/detailed_info', async (req, res) => {

    let code = req.query.code;
    console.log(code)
    let result = await axios.get(`https://restcountries.com/v3.1/alpha?codes=${code}`)
    let currency_rate_result = await axios.get('https://v6.exchangerate-api.com/v6/785ab6563ebcbc8ef876df65/latest/USD')

    result = result.data[0];
    let lang = Object.keys(result.languages)[0];
    let native_name_array = result.name.nativeName;
    let key = Object.keys(native_name_array)[0];
    let native_name = native_name_array[key].official;
    let languages = Object.values(result.languages);
    let currencies = Object.values(result.currencies);
    let border_countries = result.borders;
    let cca3 = Object.keys(result.currencies)[0];

    let capital = result.capital[0]
    console.log(capital)

    const today_weather = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=dec2154d681dd6d6fd067f1fd922dcad&units=metric`
    );
    let current_currency = Object(currency_rate_result.data.conversion_rates)[cca3]
    let temp = today_weather.data.main.temp;
    temp = Math.floor(Number(temp))


    const current_conditon = today_weather.data.weather[0]
    // console.log(temp)
    // console.log(current_conditon)
    // console.log(id);
    // console.log(result)
    // console.log("---------------------")
    // console.log(native_name)
    // console.log(Object.keys(result.languages)[0]);
    // console.log(languages)
    // console.log(currencies)
    // console.log(border_countries)

    !current_currency && (current_currency = 'no information')

    // console.log(current_currency)
    // console.log(cca3)
    // console.log(today_weather.data)

    let find_country = (arr) => {
        if (arr) {
            let array = []
            for (let i = 0; i < arr.length; i++) {
                typeof (country_code[arr[i]]) == "string" && array.push(country_code[arr[i]])
            }
            return array;
        } else {
            console.log("error")
            return ['No border countries']
        }
    }

    let countries = find_country(border_countries)

    // console.log(countries)

    res.render('more_info.ejs', {
        result: result,
        native_name: native_name,
        languages: languages,
        currencies: currencies,
        countries: countries,
        cca3: cca3,
        current_currency: current_currency,
        temp: temp,
        current_conditon: current_conditon,
    })
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});