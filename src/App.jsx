import React, { useEffect, useState } from 'react'
import "./App.css"

const App = () => {

  const api_url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
  

  const [cryptoData, setCryptoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCryptoData = async () => {
    try{
      const respond = await fetch(api_url);
      const data = await respond.json();
      setCryptoData(data);
      // console.log(data)
      setFilteredData(data);
    }catch(error){
      console.error("Error fetching data: ", error);
    }
  }

  useEffect(() =>{
    fetchCryptoData();
  },[])

  const searchData = () => {
    const filtered = cryptoData.filter(coin => 
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )

    setFilteredData(filtered);
  }

  const sortData = () => {
    const sorted = [...filteredData].sort((a,b) => b.market_cap - a.market_cap);
    setFilteredData(sorted);
  }
  // console.log(filteredData)
  const sortDataByPercentage = () => {
    const sorted = [...filteredData].sort((a,b) => a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h)
    setFilteredData(sorted)
  }
  return (
    <div className=" bg-blue-50">
      <div className='mx-9 p-6'>
        <h1 className='text-3xl font-bold text-center mb-6'>Cryptocurrency Market Data</h1>

        {/* Search Input */}
        <div className='flex justify-between space-x-4 mb-4'>
          <input className='w-[500px] h-8 text-center rounded-lg  border-gray-200 shadow-md'
            type="text"
            placeholder="Search by name or symbol"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className='w-[200px] bg-white rounded-lg border-gray-200 shadow-md ' onClick={searchData}>Search</button>
          <button className='w-[200px] bg-white rounded-lg border-gray-200 shadow-md ' onClick={sortData}>Sort by Market Cap</button>
          <button className='w-[200px] bg-white rounded-lg border-gray-200 shadow-md ' onClick={sortDataByPercentage}>Sort by percentages</button>
        </div>

        {/* Table for displaying data */}
        <div className='overflow-x-auto'>
          <table className='min-w-full bg white border border-gray-200 shadow-md rounded-lg'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='py-3 px-6 text-left text-gray-700 font-bold'>Name</th>
                <th className='py-3 px-6 text-left text-gray-700 font-bold'>Symbol</th>
                <th className='py-3 px-6 text-left text-gray-700 font-bold'>Current Price (USD)</th>
                <th className='py-3 px-6 text-left text-gray-700 font-bold'>Percentages</th>
                <th className='py-3 px-6 text-left text-gray-700 font-bold'>Total Volume</th>
                <th className='py-3 px-6 text-left text-gray-700 font-bold'>Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((coin) => (
                <tr key={coin.id} className='hover:bg-gray-100'>
                  <td className='py-3 px-6 border-b border-gray-200'>{coin.name}</td>
                  <td className='py-3 px-6 border-b border-gray-200'>{coin.symbol.toUpperCase()}</td>
                  <td className='py-3 px-6 border-b border-gray-200'>${coin.current_price.toFixed(2)}</td>
                  <td className='py-3 px-6 border-b border-gray-200'>{coin.market_cap_change_percentage_24h}%</td>
                  <td className='py-3 px-6 border-b border-gray-200'>{coin.total_volume.toLocaleString()}</td>
                  <td className='py-3 px-6 border-b border-gray-200'>{coin.market_cap.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
);
}

export default App