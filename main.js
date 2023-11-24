URL="https://api.currencyapi.com/v3/latest?apikey=cur_live_TJFnsmPL7RAGzfG6Vld3fnVWJUOEdHImN5np1E0I";
import CurrencyAPI from '@everapi/currencyapi-js';



const currencyApi = new CurrencyAPI('cur_live_TJFnsmPL7RAGzfG6Vld3fnVWJUOEdHImN5np1E0I');
const conversionHistory = []; // Array to store conversion history


document.addEventListener('DOMContentLoaded', function () {
    const convertButton = document.querySelector('.button');


    convertButton.addEventListener('click', () => {
        const amount = document.getElementById('amount').value.trim();
        const fromCurrency = document.getElementById('from').value;
        const toCurrency = document.getElementById('to').value;


        const fromFlag = document.querySelector('#from-flag');
        const toFlag = document.querySelector('#to-flag');

        const conversion = `${amount} ${fromCurrency} to ${toCurrency}`;
        conversionHistory.push(conversion);
        updateConversionTable();
        saveConversionHistory();


        const currencyToCountry = {
            INR: 'IN',
            USD: 'US',
            EUR: 'EU',
            JPY: 'JP',
            KGS: 'KG',
            KHR: 'KH',
            KMF: 'KM',
            KPW: 'KP',
            KRW: 'KR',
            KWD: 'KW',
            KYD: 'KY',
            KZT: 'KZ',
            LAK: 'LA',
            LBP: 'LB',
            LKR: 'LK',
            LRD: 'LR',
            LSL: 'LS',
            LTL: 'LT',
            LVL: 'LV',
            LYD: 'LY',
            MAD: 'MA',
            MDL: 'MD',
            MGA: 'MG',
            MKD: 'MK',
            MMK: 'MM'
        };
        fromFlag.src = `https://flagsapi.com/${currencyToCountry[fromCurrency]}/shiny/64.png`;
        toFlag.src = `https://flagsapi.com/${currencyToCountry[toCurrency]}/shiny/64.png`;


        currencyApi.latest({
            base_currency: fromCurrency,
            currencies: toCurrency
        }).then(response => {
            displayResult(response, amount, fromCurrency, toCurrency);
        }).catch(error => {
            console.error('API Error:', error);
        });
    });

    function displayResult(response, amount, fromCurrency, toCurrency) {
        const resultDisplay = document.querySelector('.latest_rates_display');
        const result = response.data[toCurrency].value * amount;
        resultDisplay.innerHTML = `<div>${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}</div>`;
    }

    function updateConversionTable() {
        const tableContainer = document.querySelector('.conversion-table');
        tableContainer.innerHTML = '<h3>Most Used Conversions</h3><table><tr><th>Conversion</th></tr></table>';
    
        const table = tableContainer.querySelector('table');
        const counts = {};
        conversionHistory.forEach(conversion => {
          counts[conversion] = (counts[conversion] || 0) + 1;
        });
        const sortedConversions = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    
        for (let i = 0; i < Math.min(sortedConversions.length, 5); i++) {
          const row = table.insertRow(i + 1);
          const cell = row.insertCell(0);
          cell.textContent = sortedConversions[i];
        }
      }
      function saveConversionHistory() {
        localStorage.setItem('conversionHistory', JSON.stringify(conversionHistory));
      }

      updateConversionTable();
    
});



// integrating news side now

const apiKey = '5eb06469a7464d679132c53d8ae4bf0c';
const keyword = 'MOney';
const fromDate = '2023-11-23';

const apiUrl = `https://newsapi.org/v2/everything?q=${keyword}&from=${fromDate}&apiKey=${apiKey}`;

const newsContainer = document.querySelector('.news');

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const articles = data.articles;

    // Display 4 news articles
    const numberOfArticlesToDisplay = 4;
    const articlesToDisplay = articles.slice(0, numberOfArticlesToDisplay);

    articlesToDisplay.forEach(article => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('article');

      const titleElement = document.createElement('h2');
      titleElement.textContent = article.title;

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = article.description;

      articleElement.appendChild(titleElement);
      articleElement.appendChild(descriptionElement);

      newsContainer.appendChild(articleElement);
    });

    setInterval(() => {
      const firstArticle = newsContainer.querySelector('.article');
      if (firstArticle) {
        newsContainer.removeChild(firstArticle);
        const newArticle = articles.shift(); 
        if (newArticle) {
          const newArticleElement = document.createElement('div');
          newArticleElement.classList.add('article');
          newArticleElement.innerHTML = `<h2>${newArticle.title}</h2><p>${newArticle.description}</p>`;
          newsContainer.appendChild(newArticleElement);
        }
      }
    }, 5000);//i have set the interval to 3000millisec when needed change it 
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

  