// const axios = require("axios")
const amount = document.querySelector("#amount")
const firstCurrency = document.querySelector("#firstCurrency")
const convert = document.querySelector("#convert")
const result = document.querySelector(".result h3")
async function getOptions() {
    try {
        const response = await fetch("https://v6.exchangerate-api.com/v6/c260713e80b076aa379cdf2a/codes")
        const resOptions = await response.json();
        const options = resOptions.supported_codes.slice(0, 70);
        // console.log(options);
        for (let i = 0; i < options.length; i++) {
            let option = options[i];
            var optionEle = document.createElement("option");
            optionEle.value = option
            optionEle.text = option
            firstCurrency.appendChild(optionEle)
        }

    } catch (err) {
        console.log(err);
    }
}

getOptions();

const secondCurrency = document.querySelector("#secondCurrency")
let results;
let CR;
firstCurrency.addEventListener("change", async (e) => {
    try {
        console.log("changed");
        const response = await fetch(`https://v6.exchangerate-api.com/v6/c260713e80b076aa379cdf2a/latest/${e.target.value.slice(0, 3)}`)
        const resOptions = await response.json();
        results = resOptions.conversion_rates;
        const options = Object.keys(resOptions.conversion_rates).slice(0, 70);
        console.log(options);
        for (let i = 0; i < options.length; i++) {
            var optionEle = document.createElement("option");
            optionEle.value = options[i]
            optionEle.text = options[i]
            secondCurrency.appendChild(optionEle)
        }
        if (secondCurrency.value !== "Dummy") {
            CR = results[secondCurrency.value];

        }
    } catch (err) {
        console.log(err);
    }
})

secondCurrency.addEventListener("change", (e) => {
    CR = results[e.target.value];
    console.log(CR);
})

convert.addEventListener("click", () => {
    if (amount.value !== "" && firstCurrency.value !== "Select a value" && secondCurrency.value !=="Dummy") {
        if(result.classList.contains("error")){
            result.classList.remove("error")
        }
        result.innerHTML = `<h3> ${amount.value} ${firstCurrency.value.slice(0, 3)} is equal to ${amount.value * CR} ${secondCurrency.value}</h3>`
        console.log(amount.value * CR)

    } else {
        result.classList.add("error")
        result.innerHTML="<h3>Please Enter some amount first and also select the required fields</h3>"

    }
})