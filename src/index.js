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
  const DOTData = { ATHprice: '54.98', ATHdate: '2021-11-04' };
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
      const tableContainer=document.querySelector(".crypto-table-container")
      const data = response.data;
      const table = createCryptoTable(data);
      tableContainer.appendChild(table);
      appendDataToMainDisplay(data);
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
        nameCell.classList.add('bolder-table-cell');
    
        // Create image element
        const image = document.createElement('img');
        image.src = getLogoByAssetId(item.asset_id);
        image.alt = item.name;
        image.classList.add('table-img');
        nameCell.appendChild(image);
    
        const nameText = document.createElement('span');
        nameText.textContent = item.name;
        nameCell.appendChild(nameText);
        nameText.classList.add("name-cell")
    
        row.appendChild(nameCell);
    
        const idCell = document.createElement('td');
        idCell.textContent = item.asset_id;
        row.appendChild(idCell);
    
        const priceCell = document.createElement('td');
        priceCell.textContent = "$" + item.price_usd;
        row.appendChild(priceCell);
    
        const athCell = document.createElement('td');
        athCell.textContent = "$" + assetDataMap[item.asset_id].ATHprice;
        row.appendChild(athCell);
    
        const athDateCell = document.createElement('td');
        athDateCell.textContent = assetDataMap[item.asset_id].ATHdate;
        row.appendChild(athDateCell);
    
        const volumeCell = document.createElement('td');
        volumeCell.textContent = item.volume_1day_usd;
        row.appendChild(volumeCell);
    
        table.appendChild(row);
      });
    
      return table;
    }

  function getLogoByAssetId(assetId) {
    switch (assetId) {
      case 'BTC':
        return BtcLogo;
      case 'ETH':
        return EthLogo;
      case 'DOT':
        return PolkaLogo;
      case 'USDT':
        return TetherLogo;
      case 'BNB':
        return BinanceCoinLogo;
      case 'MATIC':
        return MaticLogo;
      default:
        return '';
    }
  }
  function appendDataToMainDisplay(data) {
    const cryptoDropDown = document.getElementById("crypto-list");
    
    function updateMainDisplay() {
      const selectedValue = cryptoDropDown.value;
    
      const formName = document.querySelector(".main-name");
      const formAbbrev = document.querySelector(".main-abbrev");
      const formPrice = document.querySelector(".form-stats-price");
      const formAth = document.querySelector(".form-stats-ath");
      const formDiff = document.querySelector(".form-stats-diff");
      const chosenImg = document.querySelector("#chosenImg");
    
      switch (selectedValue) {
        case 'BTC':
          formName.textContent = "BITCOIN";
          formAbbrev.textContent = "BTC";
          formPrice.textContent = "Price: $" + parseFloat(data[0].price_usd).toFixed(2);
          formAth.textContent = "ATH: $" + parseFloat(BTCData.ATHprice).toFixed(2);
          formDiff.textContent = "DIFF: -" + parseFloat((1 - data[0].price_usd / BTCData.ATHprice)).toFixed(2) + "%";
          chosenImg.src = BtcLogo;
          break;
        case 'ETH':
          formName.textContent = "ETHEREUM";
          formAbbrev.textContent = "ETH";
          formPrice.textContent = "Price: $" + parseFloat(data[2].price_usd).toFixed(2);
          formAth.textContent = "ATH: $" + parseFloat(ETHData.ATHprice).toFixed(2);
          formDiff.textContent = "DIFF: -" + parseFloat((1 - data[2].price_usd / ETHData.ATHprice)).toFixed(2) + "%";
          chosenImg.src = EthLogo;
          break;
        case 'DOT':
          formName.textContent = "POLKADOT";
          formAbbrev.textContent = "DOT";
          formPrice.textContent = "Price: $" + parseFloat(data[4].price_usd).toFixed(2);
          formAth.textContent = "ATH: $" + parseFloat(DOTData.ATHprice).toFixed(2);
          formDiff.textContent = "DIFF: -" + parseFloat((1 - data[4].price_usd / DOTData.ATHprice)).toFixed(2) + "%";
          chosenImg.src = PolkaLogo;
          break;
        case 'USDT':
          formName.textContent = "TETHER";
          formAbbrev.textContent = "USDT";
          formPrice.textContent = "Price: $" + parseFloat(data[1].price_usd).toFixed(2);
          formAth.textContent = "ATH: $" + parseFloat(USDTData.ATHprice).toFixed(2);
          formDiff.textContent = "DIFF: -" + parseFloat((1 - data[1].price_usd / USDTData.ATHprice)).toFixed(2) + "%";
          chosenImg.src = TetherLogo;
          break;
        case 'BNB':
          formName.textContent = "BINANCE COIN";
          formAbbrev.textContent = "BNB";
          formPrice.textContent = "Price: $" + parseFloat(data[3].price_usd).toFixed(2);
          formAth.textContent = "ATH: " + parseFloat(BNBData.ATHprice).toFixed(2);
          formDiff.textContent = "DIFF: -" + parseFloat((1 - data[3].price_usd / BNBData.ATHprice)).toFixed(2) + "%";
          chosenImg.src = BinanceCoinLogo;
          break;
        case 'MATIC':
          formName.textContent = "POLYGON";
          formAbbrev.textContent = "MATIC";
          formPrice.textContent = "Price: $" + parseFloat(data[5].price_usd).toFixed(2);
          formAth.textContent = "ATH: $" + parseFloat(MATICData.ATHprice).toFixed(2);
          formDiff.textContent = "DIFF: -" + parseFloat((1 - data[5].price_usd / MATICData.ATHprice)).toFixed(2) + "%";
          chosenImg.src = MaticLogo;
          break;
        default:
          formName.textContent = "POLYGON";
          formAbbrev.textContent = "MATIC";
          formPrice.textContent = "Price: $" + parseFloat(data[5].price_usd).toFixed(2);
          formAth.textContent = "ATH: $" + parseFloat(MATICData.ATHprice).toFixed(2);
          formDiff.textContent = "DIFF: -" + parseFloat((1 - data[5].price_usd / MATICData.ATHprice)).toFixed(2) + "%";
          chosenImg.src = MaticLogo;
      }
    } 
    cryptoDropDown.addEventListener('change', updateMainDisplay);  
    updateMainDisplay();
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
