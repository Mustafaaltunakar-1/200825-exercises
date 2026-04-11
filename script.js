// 1. Sabitler ve Global Değişkenler
const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=true";
const listContainer = document.getElementById("coin-list");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("coinModal");
const modalBody = document.getElementById("modal-body");
const closeButton = document.querySelector(".close-button");
const themeToggle = document.getElementById("theme-toggle");

let coinsData = []; 
let currentMarket = "crypto"; 

// 2. Emtia (Commodity) Verileri
const commodityData = [

  {
    id: "gold",
    name: "Gold",
    symbol: "GC=F",
    current_price: 2320.5,
    price_change_percentage_24h: 0.45,
    image: "https://cdn-icons-png.flaticon.com/128/362/362944.png",
    high_24h: 2335,
    low_24h: 2310,
    market_cap: 14000000000000,
    market_cap_rank: 1,
    sparkline_in_7d: { price: [2290, 2305, 2310, 2300, 2315, 2320, 2320.5] },
  },
  {
    id: "silver",
    name: "Silver",
    symbol: "SI=F",
    current_price: 28.15,
    price_change_percentage_24h: -0.2,
    image: "https://cdn-icons-png.flaticon.com/128/14438/14438380.png",
    high_24h: 28.8,
    low_24h: 27.9,
    market_cap: 1300000000,
    market_cap_rank: 2,
    sparkline_in_7d: { price: [28.5, 28.3, 28.6, 28.1, 28.0, 28.1, 28.15] },
  },
  {
    id: "platinum",
    name: "Platinum",
    symbol: "PL=F",
    current_price: 960.4,
    price_change_percentage_24h: 0.3,
    image: "https://cdn-icons-png.flaticon.com/128/9323/9323310.png",
    high_24h: 975,
    low_24h: 950,
    market_cap: 250000000,
    market_cap_rank: 3,
    sparkline_in_7d: { price: [940, 950, 955, 945, 960, 958, 960.4] },
  },
  {
    id: "palladium",
    name: "Palladium",
    symbol: "PA=F",
    current_price: 1020.0,
    price_change_percentage_24h: -1.2,
    image: "https://cdn-icons-png.flaticon.com/128/8137/8137335.png",
    high_24h: 1045,
    low_24h: 1010,
    market_cap: 100000000,
    market_cap_rank: 4,
    sparkline_in_7d: { price: [1050, 1040, 1035, 1030, 1025, 1022, 1020] },
  },
  {
    id: "copper",
    name: "Copper",
    symbol: "HG=F",
    current_price: 4.25,
    price_change_percentage_24h: 1.5,
    image: "https://cdn-icons-png.flaticon.com/128/8052/8052425.png",
    high_24h: 4.3,
    low_24h: 4.15,
    market_cap: 150000000,
    market_cap_rank: 5,
    sparkline_in_7d: { price: [4.1, 4.15, 4.18, 4.2, 4.22, 4.24, 4.25] },
  },
  {
    id: "oil",
    name: "Crude Oil",
    symbol: "CL=F",
    current_price: 85.3,
    price_change_percentage_24h: 1.1,
    image: "https://cdn-icons-png.flaticon.com/128/8809/8809381.png",
    high_24h: 86.5,
    low_24h: 84.1,
    market_cap: 2100000000,
    market_cap_rank: 6,
    sparkline_in_7d: { price: [83.0, 84.5, 84.0, 85.0, 84.8, 85.2, 85.3] },
  },
  {
    id: "brent-oil",
    name: "Brent Oil",
    symbol: "BZ=F",
    current_price: 89.4,
    price_change_percentage_24h: 0.9,
    image: "https://cdn-icons-png.flaticon.com/128/9146/9146197.png",
    high_24h: 90.2,
    low_24h: 88.5,
    market_cap: 2200000000,
    market_cap_rank: 7,
    sparkline_in_7d: { price: [87.5, 88.2, 89.0, 88.8, 89.1, 89.3, 89.4] },
  },
  {
    id: "natural-gas",
    name: "Natural Gas",
    symbol: "NG=F",
    current_price: 1.95,
    price_change_percentage_24h: -1.5,
    image: "https://cdn-icons-png.flaticon.com/128/4535/4535728.png",
    high_24h: 2.05,
    low_24h: 1.85,
    market_cap: 500000000,
    market_cap_rank: 8,
    sparkline_in_7d: { price: [2.1, 2.0, 1.9, 1.98, 1.92, 1.96, 1.95] },
  },
  {
    id: "corn",
    name: "Corn",
    symbol: "ZC=F",
    current_price: 435.5,
    price_change_percentage_24h: 0.1,
    image: "https://cdn-icons-png.flaticon.com/128/1147/1147593.png",
    high_24h: 440,
    low_24h: 432,
    market_cap: 50000000,
    market_cap_rank: 9,
    sparkline_in_7d: { price: [430, 432, 431, 433, 434, 436, 435.5] },
  },
  {
    id: "wheat",
    name: "Wheat",
    symbol: "ZW=F",
    current_price: 560.2,
    price_change_percentage_24h: 2.4,
    image: "https://cdn-icons-png.flaticon.com/128/8524/8524310.png",
    high_24h: 570,
    low_24h: 550,
    market_cap: 60000000,
    market_cap_rank: 10,
    sparkline_in_7d: { price: [540, 545, 550, 552, 555, 558, 560.2] },
  },
  {
    id: "coffee",
    name: "Coffee",
    symbol: "KC=F",
    current_price: 188.4,
    price_change_percentage_24h: -0.8,
    image: "https://cdn-icons-png.flaticon.com/128/3219/3219300.png",
    high_24h: 192,
    low_24h: 186,
    market_cap: 30000000,
    market_cap_rank: 11,
    sparkline_in_7d: { price: [195, 192, 193, 190, 189, 187, 188.4] },
  },
  {
    id: "sugar",
    name: "Sugar",
    symbol: "SB=F",
    current_price: 21.4,
    price_change_percentage_24h: 1.1,
    image: "https://cdn-icons-png.flaticon.com/128/10552/10552057.png",
    high_24h: 21.8,
    low_24h: 21.1,
    market_cap: 20000000,
    market_cap_rank: 12,
    sparkline_in_7d: { price: [20.5, 20.8, 21.0, 20.9, 21.2, 21.3, 21.4] },
  },
  {
    id: "cotton",
    name: "Cotton",
    symbol: "CT=F",
    current_price: 82.5,
    price_change_percentage_24h: -0.2,
    image: "https://cdn-icons-png.flaticon.com/128/3174/3174960.png",
    high_24h: 83.5,
    low_24h: 81.8,
    market_cap: 15000000,
    market_cap_rank: 13,
    sparkline_in_7d: { price: [83.0, 82.8, 83.2, 82.5, 82.7, 82.6, 82.5] },
  },
  {
    id: "cocoa",
    name: "Cocoa",
    symbol: "CC=F",
    current_price: 10450.0,
    price_change_percentage_24h: 4.5,
    image: "https://cdn-icons-png.flaticon.com/128/3855/3855809.png",
    high_24h: 10600,
    low_24h: 9900,
    market_cap: 10000000,
    market_cap_rank: 14,
    sparkline_in_7d: { price: [9200, 9500, 9800, 9700, 10100, 10300, 10450] },
  },
  {
    id: "soybeans",
    name: "Soybeans",
    symbol: "ZS=F",
    current_price: 1180.5,
    price_change_percentage_24h: -0.5,
    image: "https://cdn-icons-png.flaticon.com/128/9861/9861876.png",
    high_24h: 1200,
    low_24h: 1170,
    market_cap: 40000000,
    market_cap_rank: 15,
    sparkline_in_7d: { price: [1190, 1185, 1188, 1182, 1186, 1184, 1180.5] },
  },
];

// 3. Borsa Hisse Verileri (Stocks)
const stockData = [
  {
    id: "apple",
    name: "Apple Inc.",
    symbol: "AAPL",
    current_price: 175.2,
    price_change_percentage_24h: 1.15,
    image: "https://cdn-icons-png.flaticon.com/512/831/831276.png",
    high_24h: 178,
    low_24h: 173,
    market_cap: 2700000000000,
    market_cap_rank: 1,
    sparkline_in_7d: { price: [170, 172, 171, 174, 173, 175, 175.2] },
  },
  {
    id: "microsoft",
    name: "Microsoft",
    symbol: "MSFT",
    current_price: 420.5,
    price_change_percentage_24h: 0.45,
    image: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
    high_24h: 425,
    low_24h: 418,
    market_cap: 3100000000000,
    market_cap_rank: 2,
    sparkline_in_7d: { price: [415, 418, 417, 419, 421, 420, 420.5] },
  },
  {
    id: "google",
    name: "Google LLC",
    symbol: "GOOGL",
    current_price: 155.1,
    price_change_percentage_24h: 1.2,
    image: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png",
    high_24h: 158,
    low_24h: 153,
    market_cap: 1900000000000,
    market_cap_rank: 3,
    sparkline_in_7d: { price: [150, 152, 151, 153, 154, 155, 155.1] },
  },
  {
    id: "amazon",
    name: "Amazon.com",
    symbol: "AMZN",
    current_price: 180.3,
    price_change_percentage_24h: -0.6,
    image: "https://cdn-icons-png.flaticon.com/512/732/732177.png",
    high_24h: 185,
    low_24h: 178,
    market_cap: 1800000000000,
    market_cap_rank: 4,
    sparkline_in_7d: { price: [178, 182, 184, 183, 181, 179, 180.3] },
  },
  {
    id: "meta",
    name: "Meta Platforms",
    symbol: "META",
    current_price: 495.2,
    price_change_percentage_24h: 2.1,
    image: "https://cdn-icons-png.flaticon.com/512/6033/6033716.png",
    high_24h: 505,
    low_24h: 485,
    market_cap: 1200000000000,
    market_cap_rank: 5,
    sparkline_in_7d: { price: [470, 480, 485, 490, 488, 492, 495.2] },
  },
  {
    id: "tesla",
    name: "Tesla, Inc.",
    symbol: "TSLA",
    current_price: 163.5,
    price_change_percentage_24h: -2.4,
    image: "https://cdn-icons-png.flaticon.com/128/16183/16183663.png",
    high_24h: 168,
    low_24h: 160,
    market_cap: 520000000000,
    market_cap_rank: 6,
    sparkline_in_7d: { price: [175, 170, 168, 165, 164, 162, 163.5] },
  },
  {
    id: "netflix",
    name: "Netflix",
    symbol: "NFLX",
    current_price: 610.1,
    price_change_percentage_24h: -1.5,
    image: "https://cdn-icons-png.flaticon.com/512/732/732228.png",
    high_24h: 625,
    low_24h: 605,
    market_cap: 260000000000,
    market_cap_rank: 7,
    sparkline_in_7d: { price: [630, 625, 620, 615, 612, 608, 610.1] },
  },
  {
    id: "amd",
    name: "AMD",
    symbol: "AMD",
    current_price: 170.4,
    price_change_percentage_24h: 3.2,
    image: "https://cdn-icons-png.flaticon.com/128/1724/1724638.png",
    high_24h: 175,
    low_24h: 165,
    market_cap: 275000000000,
    market_cap_rank: 8,
    sparkline_in_7d: { price: [160, 162, 165, 168, 167, 172, 170.4] },
  },
  {
    id: "intel",
    name: "Intel",
    symbol: "INTC",
    current_price: 35.2,
    price_change_percentage_24h: -0.9,
    image: "https://cdn-icons-png.flaticon.com/128/882/882700.png",
    high_24h: 37,
    low_24h: 34,
    market_cap: 150000000000,
    market_cap_rank: 9,
    sparkline_in_7d: { price: [38, 37, 36, 36.5, 35.8, 35.5, 35.2] },
  },
  {
    id: "nvidia",
    name: "Nvidia Corp.",
    symbol: "NVDA",
    current_price: 880.3,
    price_change_percentage_24h: 3.8,
    image: "https://cdn-icons-png.flaticon.com/128/732/732230.png",
    high_24h: 890,
    low_24h: 850,
    market_cap: 2200000000000,
    market_cap_rank: 10,
    sparkline_in_7d: { price: [820, 835, 850, 840, 860, 875, 880.3] },
  },
  {
    id: "disney",
    name: "Disney",
    symbol: "DIS",
    current_price: 112.4,
    price_change_percentage_24h: 0.8,
    image: "https://s3-symbol-logo.tradingview.com/walt-disney--big.svg",
    high_24h: 115,
    low_24h: 110,
    market_cap: 200000000000,
    market_cap_rank: 11,
    sparkline_in_7d: { price: [108, 110, 109, 111, 113, 112, 112.4] },
  },
  {
    id: "visa",
    name: "Visa Inc.",
    symbol: "V",
    current_price: 280.5,
    price_change_percentage_24h: 0.1,
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968397.png",
    high_24h: 283,
    low_24h: 278,
    market_cap: 500000000000,
    market_cap_rank: 12,
    sparkline_in_7d: { price: [278, 279, 280, 281, 280, 280, 280.5] },
  },
  {
    id: "coca-cola",
    name: "Coca-Cola",
    symbol: "KO",
    current_price: 60.5,
    price_change_percentage_24h: 0.3,
    image: "https://cdn-icons-png.flaticon.com/128/16183/16183588.png",
    high_24h: 62,
    low_24h: 59,
    market_cap: 260000000000,
    market_cap_rank: 13,
    sparkline_in_7d: { price: [59, 60, 59.5, 60.2, 60.4, 60.1, 60.5] },
  },
  {
    id: "mcdonalds",
    name: "McDonald's",
    symbol: "MCD",
    current_price: 282.1,
    price_change_percentage_24h: -0.4,
    image: "https://cdn-icons-png.flaticon.com/512/732/732217.png",
    high_24h: 285,
    low_24h: 279,
    market_cap: 205000000000,
    market_cap_rank: 14,
    sparkline_in_7d: { price: [280, 281, 283, 282, 284, 281, 282.1] },
  },
  {
    id: "starbucks",
    name: "Starbucks",
    symbol: "SBUX",
    current_price: 88.4,
    price_change_percentage_24h: 0.2,
    image: "https://cdn-icons-png.flaticon.com/512/5977/5977591.png",
    high_24h: 90,
    low_24h: 86,
    market_cap: 100000000000,
    market_cap_rank: 15,
    sparkline_in_7d: { price: [85, 87, 86, 88, 89, 88, 88.4] },
  },
];

// 4. API'den Veri Çekme
async function fetchCryptoData() {
  showSkeletons();
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("It hit the API limit");
    const data = await response.json();
    coinsData = data;
    if (currentMarket === "crypto") {
      renderList(coinsData);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    listContainer.innerHTML = `<p class="loading-text" style="color: #ef4444;">The data could not be loaded. Please wait a moment.</p>`;
  }
}

// 5. Dinamik Listeleme 
function renderList(data) {
  const listContainer = document.getElementById("coin-list"); 
  listContainer.innerHTML = "";

  if (!data || data.length === 0) {
    listContainer.innerHTML = `<p class="loading-text">No results found.</p>`;
    return;
  }

  const favorites = getFavorites();

  const sortedData = [...data].sort((a, b) => {
    const aIsFav = favorites.includes(a.id);
    const bIsFav = favorites.includes(b.id);
    if (aIsFav && !bIsFav) return -1;
    if (!aIsFav && bIsFav) return 1;
    return 0;
  });

  sortedData.forEach((item) => {
    const isFav = favorites.includes(item.id);
    const priceColor =
      item.price_change_percentage_24h > 0 ? "text-success" : "text-danger";
    const chartColor =
      item.price_change_percentage_24h > 0 ? "#22c55e" : "#ef4444";

    const cardHTML = `
            <div class="coin-card ${isFav ? "is-favorite" : ""}" data-id="${item.id}">
                <div class="fav-icon ${isFav ? "active" : ""}" onclick="toggleFavorite('${item.id}', event)">
                    ${isFav ? "★" : "☆"}
                </div>
                <div onclick="showDetails('${item.id}')">
                    <img src="${item.image}" alt="${item.name}" class="coin-logo">
                    <h3>${item.name} <span style="font-size: 0.8rem; color: var(--text-muted);">${item.symbol.toUpperCase()}</span></h3>
                    <p class="current-price">$${item.current_price.toLocaleString()}</p>
                    <p class="${priceColor}">${item.price_change_percentage_24h > 0 ? "+" : ""}${item.price_change_percentage_24h.toFixed(2)}%</p>
                    <div class="chart-container">
                        <canvas id="chart-${item.id}"></canvas>
                    </div>
                </div>
            </div>
        `;
    listContainer.insertAdjacentHTML("beforeend", cardHTML);

    if (item.sparkline_in_7d && item.sparkline_in_7d.price) {
      drawSparkline(`chart-${item.id}`, item.sparkline_in_7d.price, chartColor);
    }
  });
}

// 6. Grafik Çizme
function drawSparkline(canvasId, priceData, color) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let existingChart = Chart.getChart(canvasId);
  if (existingChart) existingChart.destroy();

  new Chart(ctx, {
    type: "line",
    data: {
      labels: priceData.map((_, i) => i),
      datasets: [
        {
          data: priceData,
          borderColor: color,
          borderWidth: 1.5,
          pointRadius: 0,
          fill: false,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: { x: { display: false }, y: { display: false } },
    },
  });
}

// 7. Yardımcı Görünüm Fonksiyonları
function showSkeletons() {
  listContainer.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    listContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="skeleton-card">
          <div class="skeleton-circle"></div>
          <div class="skeleton-line"></div>
          <div class="skeleton-line" style="width: 50%"></div>
      </div>
    `,
    );
  }
}

function showDetails(id) {
  const allData = [...coinsData, ...commodityData, ...stockData];
  const item = allData.find((c) => c.id === id);
  if (!item) return;

  modalBody.innerHTML = `
    <img src="${item.image}" width="70">
    <h2 style="margin: 15px 0;">${item.name} (${item.symbol.toUpperCase()})</h2>
    <div class="modal-detail-item"><span>Rank:</span> <span>#${item.market_cap_rank || "N/A"}</span></div>
    <div class="modal-detail-item"><span>Current Price:</span> <span>$${item.current_price.toLocaleString()}</span></div>
    <div class="modal-detail-item"><span>24h High:</span> <span class="text-success">$${item.high_24h.toLocaleString()}</span></div>
    <div class="modal-detail-item"><span>24h Low:</span> <span class="text-danger">$${item.low_24h.toLocaleString()}</span></div>
    <div class="modal-detail-item"><span>Market Cap:</span> <span>$${item.market_cap.toLocaleString()}</span></div>
  `;
  modal.style.display = "block";
}

// 8. Piyasa ve Arama Kontrolleri
function switchMarket(market, event) {
  currentMarket = market;
  document
    .querySelectorAll(".tab-btn")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");
  searchInput.value = "";
  if (market === "crypto") renderList(coinsData);
  else if (market === "commodities") renderList(commodityData);
  else renderList(stockData);
}

searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  let sourceData =
    currentMarket === "crypto"
      ? coinsData
      : currentMarket === "commodities"
        ? commodityData
        : stockData;
  const filtered = sourceData.filter(
    (item) =>
      item.name.toLowerCase().includes(term) ||
      item.symbol.toLowerCase().includes(term),
  );
  renderList(filtered);
});

// 9. Tema ve Favori Yönetimi
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const targetTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", targetTheme);
  themeToggle.innerHTML =
    targetTheme === "light" ? "☀️ Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("theme", targetTheme);
});

function getFavorites() {
  const favs = localStorage.getItem("favorites");
  return favs ? JSON.parse(favs) : [];
}

function toggleFavorite(id, event) {
  event.stopPropagation();
  let favs = getFavorites();
  if (favs.includes(id)) favs = favs.filter((favId) => favId !== id);
  else favs.push(id);
  localStorage.setItem("favorites", JSON.stringify(favs));
  refreshCurrentList();
}

function refreshCurrentList() {
  if (currentMarket === "crypto") renderList(coinsData);
  else if (currentMarket === "commodities") renderList(commodityData);
  else renderList(stockData);
}

// 10. Başlatma ve Event Listener'lar
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeToggle.innerHTML =
    savedTheme === "light" ? "☀️ Light Mode" : "🌙 Dark Mode";
}

closeButton.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target == modal) modal.style.display = "none";
};


fetchCryptoData();
setInterval(fetchCryptoData, 60000); 

// 11. Canlı Fiyat Simülasyonu
function simulatePrices() {
  let activeData;
  if (currentMarket === "crypto") {
    activeData = coinsData;
  } else if (currentMarket === "commodities") {
    activeData = commodityData;
  } else {
    activeData = stockData;
  }

  if (!activeData || activeData.length === 0) return;

  activeData.forEach((item) => {
    const oldPrice = item.current_price;

    const volatility = 0.0006;
    const change = Math.random() * (volatility * 2) - volatility;

    item.current_price *= 1 + change;

    const card = document.querySelector(`.coin-card[data-id="${item.id}"]`);
    if (card) {
      const priceElement = card.querySelector(".current-price");
      if (priceElement) {
        priceElement.innerText = `$${item.current_price.toLocaleString(
          undefined,
          {
            minimumFractionDigits: item.current_price < 1 ? 4 : 2,
            maximumFractionDigits: item.current_price < 1 ? 4 : 2,
          },
        )}`;

        priceElement.classList.remove("up-flash", "down-flash");
        void priceElement.offsetWidth;
        priceElement.classList.add(
          item.current_price > oldPrice ? "up-flash" : "down-flash",
        );
      }
    }
  });
}

setInterval(simulatePrices, 3000);
