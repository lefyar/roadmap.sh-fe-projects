document.addEventListener("DOMContentLoaded", () => {
  flatpickr("#birthdate", {
    dateFormat: "d-m-Y",
    maxDate: "today",
  });

  document.getElementById("age-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const birthdateInput = document.getElementById("birthdate").value;
    if (!birthdateInput) {
      alert("Please select a valid birthdate.");
      return;
    }

    const birthdate = luxon.DateTime.fromFormat(birthdateInput, "dd-MM-yyyy");
    if (!birthdate.isValid) {
      alert("Please enter a valid birthdate.");
      return;
    }

    const now = luxon.DateTime.now();
    const diff = now.diff(birthdate, ["years", "months", "days"]).toObject();

    const result = `You are ${Math.floor(diff.years)} years, ${Math.floor(
      diff.months
    )} months, and ${Math.floor(diff.days)} days old.`;
    document.getElementById("result").innerText = result;
  });
});
