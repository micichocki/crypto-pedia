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


const cryptoCurrenciesTrigger = document.getElementById("currency-popup-trigger");
const popupStock = document.getElementById("currency-popup");
createHoverPopupTrigger(cryptoCurrenciesTrigger, popupStock);

const companyInfoTrigger = document.getElementById("company-popup-trigger");
const popupCompany = document.getElementById("company-popup");
createHoverPopupTrigger(companyInfoTrigger, popupCompany);


fetch('https://api.coingecko.com/api/v3/simple/supported_vs_currencies')
  .then(response => response.json())
  .then(data => {
    const currencies = data.slice(0, 18); 
    const currencyList = document.createElement('ul'); 
    currencyList.classList.add('column-list'); 

   
    currencies.forEach(currency => {
      const li = document.createElement('li');
      li.textContent = currency.toUpperCase();
      currencyList.appendChild(li);
    });
    
    const currencyPopup = document.querySelector('#currency-popup'); 
    currencyPopup.appendChild(currencyList); 
    
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


  const bitcoinData = [28809.23, 30394.19, 29449.09, 30317.15, 30315.98];
  const apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';

  const today = new Date();
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const price = data.bitcoin.usd;
      console.log(price);
    })
    .catch(error => {
      console.error('Error fetching Bitcoin price', error);
    });




(async function() {
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  new Chart(
    document.getElementById('crypto-prices'),
    {
      type: 'line',
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count)
          }
        ]
      }
    }
  );
})();

  // Call updateAndStoreData() every 35 minutes
  //setInterval(updateAndStoreData, 35 * 60 * 1000);
  //updateAndStoreData();
