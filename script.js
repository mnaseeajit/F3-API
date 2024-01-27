

const apiurl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
let responseData;

async function fetchDataAsync(){
    const responce = await fetch(apiurl);
    const data = await responce.json();
    console.log(data);
    responseData = data;
    renderTable(data);
}

function fetchDataThen(){
    fetch(apiurl)
    .then(res => res.json())
    .then((data)=>{
        console.log(data);
        responseData = data;
        return renderTable(data);
    })
}

//fetchDataThen();
fetchDataAsync();

function renderTable(data){
       const tableBody = document.getElementById("table");
       tableBody.innerHTML = '';

       data.forEach((coin) => {
            const row = document.createElement("tr");
              row.innerHTML = `
              <td><img class="img1" src="${coin.image}" alt="${coin.name}"></td>
              <td>${coin.name}</td>
             
              <td>${coin.symbol}</td>
             
              <td>$${coin.current_price}</td>
              <td>$${coin.total_supply}</td>
              <td>${coin.market_cap_change_percentage_24h}</td>
              <td>Mkt cap: $${coin.total_volume}</td>
              `
              
              tableBody.appendChild(row);
       });
}

function filterData() {
    const searchInput = document.getElementById('input');
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = responseData.filter(coin => coin.name.toLowerCase().includes(searchTerm));
    renderTable(filteredData);
  }

  function sortData(sortBy) {
    const sortedData = responseData.sort((a, b) => {
      if (sortBy === 'marketCap') {
        return b.market_cap - a.market_cap;
      } else if (sortBy === 'percentageChange') {
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      }
    });

    renderTable(sortedData);
  }