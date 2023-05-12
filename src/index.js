import "./style.scss"
import Chart from 'chart.js/auto'

import BtcLogo from './imgs/bitcoin.png'
import EthLogo from './imgs/ethereum.png'
import PolkaLogo from './imgs/polkadot.png'
import TetherLogo from './imgs/tether.png'
import BinanceCoinLogo from './imgs/binance-coin.png'
import MaticLogo from './imgs/matic.png'
const btcImg = document.getElementById('btcImg');
btcImg.src=BtcLogo;

const ethImg = document.getElementById('ethImg');
ethImg.src=EthLogo;

const polkaImg = document.getElementById('dotImg');
polkaImg.src=PolkaLogo;

const tetherImg = document.getElementById('usdtImg');
tetherImg.src=TetherLogo;

const binanceCoinImg = document.getElementById('bnbImg');
binanceCoinImg.src=BinanceCoinLogo;

const MaticImg = document.getElementById('maticImg');
MaticImg.src=MaticLogo;

import conversationLogo from './imgs/conversation.png';
import customersLogo from './imgs/customers.png';
import faqLogo from './imgs/faq.png';
import homeLogo from './imgs/home.png';

const conversationImg = document.getElementById("conversation");
conversationImg.src = conversationLogo;

const customersImg = document.getElementById("customers");
customersImg.src = customersLogo;

const careersImg=document.getElementById("careers")
careersImg.src = customersLogo;

const faqImg = document.getElementById("faq");
faqImg.src = faqLogo;

const homeImg=document.getElementById("home");
homeImg.src=homeLogo;



import arrow from './imgs/dropdown-arrow.jpg'

const dropdownArrowImgs = document.querySelectorAll('#dropdown-arrow');

for (const element of dropdownArrowImgs) {
  element.src = arrow;
}


dropdownArrowImgs.forEach(image => {
  const parentListItem = image.closest('div');
  
  parentListItem.addEventListener('mouseover', () => {
    image.classList.remove('unrotate');
    image.classList.add('rotate');
  });

  parentListItem.addEventListener('mouseout', () => {
    image.classList.remove('rotate');
    image.classList.add('unrotate');
  });
});



function createHoverPopupTrigger(element, popup) {
  let isPopupHovered = false;

  element.addEventListener("mouseover", (event)=> {
    event.preventDefault();
    popup.style.display = "block";
  });

  element.addEventListener("mouseout", (event)=> {
    event.preventDefault();
    setTimeout(()=> {
      if(!isMouseOver(element,event) && !isPopupHovered ){
        popup.style.display = "none";
      }     
    }, 100);
  });

  popup.addEventListener("mouseover",(event)=>{
    isPopupHovered = true;
    popup.style.display = "block";
  })

  popup.addEventListener("mouseout",(event)=>{
    isPopupHovered = false;
    popup.style.display = "none";
  })

  function isMouseOver(element,event) {
    return element.contains(event.relatedTarget);
  }
}

// Usage example
const cryptoCurrenciesTrigger = document.getElementById("currency-popup-trigger");
const popupStock = document.getElementById("currency-popup");
createHoverPopupTrigger(cryptoCurrenciesTrigger, popupStock);

const companyInfoTrigger = document.getElementById("company-popup-trigger");
const popupCompany = document.getElementById("company-popup");
createHoverPopupTrigger(companyInfoTrigger, popupCompany);




fetch('https://api.coingecko.com/api/v3/simple/supported_vs_currencies')
  .then(response => response.json())
  .then(data => {
    const currencies = data.slice(0, 18); // Get first 20 currencies
    const currencyList = document.createElement('ul'); // Create list element
    currencyList.classList.add('column-list'); // Add class for multiple columns

    // Create list item element for each currency and append to list
    currencies.forEach(currency => {
      const li = document.createElement('li');
      li.textContent = currency.toUpperCase();
      currencyList.appendChild(li);
    });
    
    const currencyPopup = document.querySelector('#currency-popup'); // Get reference to currency popup element
    currencyPopup.appendChild(currencyList); // Add list of currencies to currency popup
    
    // Update text of Stocks link to include the number of currencies
    const cryptoCurrenciesLink = document.querySelector('#cryptoCurrencies');
    cryptoCurrenciesLink.textContent = `Top Currencies (${currencies.length})`;
  })
  .catch(error => {
    console.error(error);
    // If there's an error, display the basic currencies
    const currencies = ['BTC', 'ETH', 'DOT', 'USDT','BNB','MATIC'];
    const currencyList = document.createElement('ul');
    currencyList.classList.add('column-list');

    currencies.forEach(currency => {
      const li = document.createElement('li');
      li.textContent = currency;
      currencyList.appendChild(li);
    });

    const currencyPopup = document.querySelector('#currency-popup');
    currencyPopup.appendChild(currencyList);

    const cryptoCurrenciesLink = document.querySelector('#cryptoCurrencies');
    cryptoCurrenciesLink.textContent = `Top Currencies (${currencies.length})`;
  });

/*
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
*/