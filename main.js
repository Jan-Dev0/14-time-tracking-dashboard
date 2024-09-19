const url = "data.json";
const navItems = document.querySelectorAll(".dashboard__nav-item");
const container = document.querySelector(".dashboard__content");

async function processData(timeframe) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    Array.from(container.children).forEach((el) => el.remove());
    data.forEach((item) => {
      let last;
      const article = document.createElement("article");
      const category = item.title.toLowerCase().replace(/\s+/g, "-");
      article.classList.add("dashboard__card", `dashboard__card--${category}`);
      if (timeframe === "daily") {
        last = "yesterday";
      } else if (timeframe === "weekly") {
        last = "last week";
      } else {
        last = "last month";
      }
      article.innerHTML = `
                  <div class="dashboard__card-top">
          </div>
          <div class="dashboard__card-body">
            <header class="dashboard__card-header">
              <h2 class="dashboard__card-title">${item.title}</h2>
              <img
                src="./images/icon-ellipsis.svg"
                alt="Ellipsis icon"
                class="dashboard__card-ellipses"
              />
            </header>
            <div class="dashboard__card-timeframes">
              <div class="dashboard__timeframe">
                <p class="dashboard__timeframe-current">${item.timeframes[timeframe].current}hrs</p>
                <p class="dashboard__timeframe-previous">${last} - ${item.timeframes[timeframe].previous}hrs</p>
              </div>
            </div>
          </div>
        `;
      container.append(article);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
}

let currentActiveTimeframe = "daily";
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    navItems.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    const timeframe = e.target.dataset.timeframe;
    if (currentActiveTimeframe !== timeframe) {
      currentActiveTimeframe = timeframe;
      processData(timeframe);
    }
  });
});

document.querySelector(`[data-timeframe=${currentActiveTimeframe}]`).classList.add('active');
processData(currentActiveTimeframe);
