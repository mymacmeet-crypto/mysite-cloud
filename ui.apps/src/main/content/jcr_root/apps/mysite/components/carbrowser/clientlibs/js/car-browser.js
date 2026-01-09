document.addEventListener("DOMContentLoaded", function () {

  const root = document.querySelector(".car-browser");
  if (!root) return;

  const carListUrl  = root.dataset.carList;
  const carYearsUrl = root.dataset.carYears;
  const carSpecUrl  = root.dataset.carSpec;

  const carListEl  = document.getElementById("carList");
  const yearListEl = document.getElementById("yearList");
  const specEl     = document.getElementById("specDetails");

  /* ----------------------------
     1️⃣ Load All Cars
  ----------------------------- */
  fetch(carListUrl)
    .then(res => res.json())
    .then(res => {
      const cars = res?.data?.carList?.items || [];

      cars.forEach(car => {
          const li = document.createElement("li");
          li.className = "car-item";
          li.dataset.carPath = car._path;

          const imagePath = car.image && car.image._path
            ? car.image._path
            : "/content/dam/mysite/placeholder/car.png"; // optional fallback

          li.innerHTML = `
            <div class="car-card">
              <img src="${imagePath}" alt="${car.title}" />
              <span class="car-title">${car.title}</span>
            </div>
          `;

          li.onclick = () => loadYears(car._path);
          carListEl.appendChild(li);
        });

    });

  /* ----------------------------
     2️⃣ Load Years by Car Path
  ----------------------------- */
  function loadYears(carPath) {
    yearListEl.innerHTML = "";
    specEl.innerHTML = "";

    fetch(`${carYearsUrl};carPath=${carPath}`)
      .then(res => res.json())
      .then(res => {
        const years = res?.data?.caryearList?.items || [];

        years
          .sort((a, b) => b.year - a.year) // optional sort
          .forEach(item => {
            const li = document.createElement("li");
            li.className = "year-item";
            li.textContent = `${item.year} (${item.fuelType})`;

            li.onclick = () => loadSpec(item.year);
            yearListEl.appendChild(li);
          });
      });
  }

  /* ----------------------------
     3️⃣ Load Specification by Year
  ----------------------------- */
  function loadSpec(year) {
    specEl.innerHTML = "<p>Loading specification...</p>";

    fetch(`${carSpecUrl};carYear=${year}`)
      .then(res => res.json())
      .then(res => {
        const spec =
          res?.data?.carspecificationList?.items?.[0];

        if (!spec) {
          specEl.innerHTML = "<p>No specification found.</p>";
          return;
        }

        specEl.innerHTML = `
          <h4>Specifications (${year})</h4>
          <p><strong>Engine:</strong> ${spec.engine}</p>
          <p><strong>Power:</strong> ${spec.power}</p>
          <p><strong>Torque:</strong> ${spec.torque}</p>
          <p><strong>Mileage:</strong> ${spec.milage}</p>
          <p><strong>Transmission:</strong> ${spec.transmission}</p>
          <p><strong>Safety Rating:</strong> ${spec.safetyRating}</p>

          <div class="features">
            <strong>Features:</strong>
            ${spec.features?.html || ""}
          </div>
        `;
      });
  }

});

