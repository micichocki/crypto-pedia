import "./style.scss"
import Chart from 'chart.js/auto'
import BtcLogo from './imgs/Bitcoin.svg.png'

const btcImg = document.getElementById('btcImg')
btcImg.src=BtcLogo;

const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';

const bitcoinData = [28809.23, 30394.19, 29449.09, 30317.15, 30315.98];

// Get today's date
const today = new Date();

// Generate labels for the past 4 days in DD.MM format
const labels = Array.from({length: 4  }, (_, i) => {
  const date = new Date(today);
  date.setDate(today.getDate() - i - 1);
  return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}`;
});
const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [{
      label: 'Bitcoin Price (USD)',
      data: bitcoinData,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  }
});

function updateAndStoreData() {
  // Fetch data from API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Update data arrays
      bitcoinData.push(data.bitcoin.usd);
      labels.push(new Date().toLocaleString());

      // Keep only the last 10 values
      if (bitcoinData.length > 10) {
        bitcoinData.shift();
        labels.shift();
      }

      // Update chart data
      chart.data.labels = labels;
      chart.data.datasets[0].data = bitcoinData;
      chart.update();

      // Store data in local storage
      localStorage.setItem('bitcoinData', JSON.stringify(bitcoinData));
      localStorage.setItem('labels', JSON.stringify(labels));
    })
    .catch(error => console.error('Error fetching data from API:', error));
}

// Call updateAndStoreData() every 35 minutes
setInterval(updateAndStoreData, 35 * 60 * 1000);
updateAndStoreData();