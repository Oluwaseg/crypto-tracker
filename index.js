async function fetchCryptoData() {
  try {
    const response = await fetch("https://api.coincap.io/v2/assets?limit=20");
    const data = await response.json();

    const coinList = document.getElementById("coin-list");
    coinList.innerHTML = "";

    data.data.forEach((coin) => {
      const coinContainer = document.createElement("div");
      coinContainer.className = "coin";

      const coinInfo = document.createElement("div");
      coinInfo.className = "coin-info";

      const coinName = document.createElement("div");
      coinName.className = "coin-name";
      coinName.textContent = `${coin.symbol.toUpperCase()}:`;

      const coinPrice = document.createElement("div");
      coinPrice.className = "coin-price";
      coinPrice.textContent = `$${parseFloat(coin.priceUsd).toFixed(2)}`;

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        coinContainer.remove();
      });

      coinInfo.appendChild(coinName);
      coinInfo.appendChild(coinPrice);

      coinContainer.appendChild(coinInfo);
      coinContainer.appendChild(deleteButton);

      coinList.appendChild(coinContainer);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchCryptoData();
// Refresh data every 5 minutes (300000 milliseconds)
setInterval(fetchCryptoData, 300000);
