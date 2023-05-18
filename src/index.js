import "./style.scss"
import Chart from 'chart.js/auto'
const axios = require('axios');



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

const ChosenImg = document.getElementById('chosenImg');
ChosenImg.src=MaticLogo

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



  const endpoint = 'https://rest.coinapi.io/v1/assets';
  const parameters = '?filter_asset_id=BTC;ETH;DOT;USDT;BNB,MATIC';
  
  const BTCData = { ATHprice: '68744.0314', ATHdate: '2021-11-10' };
  const ETHData = { ATHprice: '4858.8222', ATHdate: '2021-11-10' };
  const DOTData = { ATHprice: '5,4282', ATHdate: '2021-11-04' };
  const USDTData = { ATHprice: '1.149', ATHdate: '2020-03-13' };
  const BNBData = { ATHprice: '689.3504', ATHdate: '2021-05-10' };
  const MATICData = { ATHprice: '2.9102', ATHdate: '2021-12-27' };
  
  const assetDataMap = {
    BTC: BTCData,
    ETH: ETHData,
    DOT: DOTData,
    USDT: USDTData,
    BNB: BNBData,
    MATIC: MATICData,
  };
  
  const headers = {
    'X-CoinAPI-Key': process.env.COINAPI_KEY,
  };
  
  const url = endpoint + parameters;
  
  axios.get(url, { headers })
    .then(response => {
      const tableContainer=document.getElementsByClassName("crypto-table-container")
      const data = response.data;
      const table = createCryptoTable(data);
      tableContainer.appendChild(table);
    })
    .catch(error => {
      console.error(error);
    });
  
  function createCryptoTable(data) {
    const table = document.createElement('table');
    table.classList.add('crypto-table');
  
    const tableHeader = document.createElement('tr');
    const headers = ['NAME', 'ID', 'PRICE', 'ATH', 'ATH DATE', 'VOLUME'];
    headers.forEach(headerText => {
      const headerCell = document.createElement('th');
      headerCell.textContent = headerText;
      tableHeader.appendChild(headerCell);
    });
    table.appendChild(tableHeader);
  
    data.forEach(item => {
      const row = document.createElement('tr');
  
      const nameCell = document.createElement('td');
      nameCell.textContent = item.name;
      row.appendChild(nameCell);
  
      const idCell = document.createElement('td');
      idCell.textContent = item.asset_id;
      row.appendChild(idCell);
  
      const priceCell = document.createElement('td');
      row.appendChild(priceCell);
  
      const athCell = document.createElement('td');
      if (item.ATHprice) {
        athCell.textContent = item.ATHprice;
      }
      row.appendChild(athCell);
  
      const athDateCell = document.createElement('td');
      if (item.ATHdate) {
        athDateCell.textContent = item.ATHdate;
      }
      row.appendChild(athDateCell);
  
      const volumeCell = document.createElement('td');
      row.appendChild(volumeCell);
  
      table.appendChild(row);
    });
  
    return table;
  }
  

const cryptoCards=document.querySelectorAll(".crypto-item")

cryptoCards.forEach(element=>{
  element.addEventListener("mouseover",()=>{
    element.classList.add('card-hover-effect')
  })
  element.addEventListener("mouseout", () => {
    element.classList.remove('card-hover-effect');
  });
})


  // Call updateAndStoreData() every 35 minutes
  //setInterval(updateAndStoreData, 35 * 60 * 1000);
  //updateAndStoreData();
