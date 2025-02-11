document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi Flatpickr
  flatpickr("#birthdate", {
    dateFormat: "d-m-Y",
    maxDate: "today",
  });

  // Form submit handler
  document.getElementById("age-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah halaman refresh

    const birthdateInput = document.getElementById("birthdate").value;
    if (!birthdateInput) {
      alert("Please select a valid birthdate.");
      return;
    }

    const birthdate = luxon.DateTime.fromISO(birthdateInput);
    const now = luxon.DateTime.now();
    const diff = now.diff(birthdate, ["days", "months", "years"]).toObject();

    const result = `You are ${Math.floor(diff.years)} years, ${Math.floor(
      diff.months
    )} months, and ${Math.floor(diff.days)} days old.`;
    document.getElementById("result").innerText = result;
  });
});
