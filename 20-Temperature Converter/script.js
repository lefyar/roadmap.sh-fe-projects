document.addEventListener("DOMContentLoaded", () => {
    const tempInput = document.getElementById("temp-value");
    const fromUnit = document.getElementById("from-unit");
    const toUnit = document.getElementById("to-unit");
    const convertBtn = document.getElementById("convert-btn");
    const resultDisplay = document.getElementById("result");

    function checkInputs() {
        if (tempInput.value && fromUnit.value && toUnit.value) {
            convertBtn.disabled = false;
        } else {
            convertBtn.disabled = true;
        }
    }

    tempInput.addEventListener("input", checkInputs);
    fromUnit.addEventListener("change", checkInputs);
    toUnit.addEventListener("change", checkInputs);

    function convertTemperature(value, from, to) {
        let celsiusValue;

        if (from === "celsius") {
            celsiusValue = value;
        } else if (from === "fahrenheit") {
            celsiusValue = (value - 32) * 5/9;
        } else if (from === "kelvin") {
            celsiusValue = value - 273.15;
        }

        let result;
        if (to === "celsius") {
            result = celsiusValue;
        } else if (to === "fahrenheit") {
            result = (celsiusValue * 9/5) + 32;
        } else if (to === "kelvin") {
            result = celsiusValue + 273.15;
        }

        return result.toFixed(2);
    }

    document.getElementById("temp-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const tempValue = parseFloat(tempInput.value);
        const from = fromUnit.value;
        const to = toUnit.value;

        if (from === to) {
            resultDisplay.innerHTML = `<span style="color: red;">Please select different units!</span>`;
            return;
        }

        const convertedValue = convertTemperature(tempValue, from, to);
        resultDisplay.innerHTML = `<span style="color: green;">${tempValue} ${from} is ${convertedValue} ${to}</span>`;
    });
});
