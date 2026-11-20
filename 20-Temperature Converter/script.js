const form = document.querySelector("#temp-form");
const input = document.querySelector("#temp-value");
const from = document.querySelector("#from-unit");
const to = document.querySelector("#to-unit");
const result = document.querySelector("#result p");
const format = new Intl.NumberFormat("en", { maximumFractionDigits: 6 });
const symbols = { celsius: "°C", fahrenheit: "°F", kelvin: "K" };
const toKelvin = {
  celsius: value => value + 273.15,
  fahrenheit: value => (value + 459.67) * (5 / 9),
  kelvin: value => value,
};
const fromKelvin = {
  celsius: value => value - 273.15,
  fahrenheit: value => value * (9 / 5) - 459.67,
  kelvin: value => value,
};

function update() {
  const value = input.valueAsNumber;
  const kelvin = toKelvin[from.value](value);
  const output = from.value === to.value ? value : fromKelvin[to.value](kelvin);
  const belowZero = kelvin < 0;
  const overflow = Number.isFinite(value) && !Number.isFinite(output);
  result.classList.toggle("error", belowZero || overflow);
  input.setAttribute("aria-invalid", String(belowZero || overflow));
  if (!Number.isFinite(value)) result.textContent = "Enter a temperature to see the result.";
  else if (belowZero) result.textContent = "Enter a temperature at or above absolute zero.";
  else if (overflow) result.textContent = "The converted temperature is too large.";
  else {
    const strong = document.createElement("strong");
    strong.textContent = `${format.format(Math.abs(output) < 0.0000005 ? 0 : output)} ${symbols[to.value]}`;
    result.replaceChildren(`${format.format(value)} ${symbols[from.value]} = `, strong);
  }
}

form.addEventListener("input", update);
form.addEventListener("submit", event => { event.preventDefault(); update(); });
update();
