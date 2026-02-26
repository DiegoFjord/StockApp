

import {
  Overview,
  TimeSeries,
  StockResponse,
  MarketCandlenew,
  OverviewStr
} from './definitions';

import axios from 'axios';

export async function fetchFilteredStocks(status:string) {
  try {
    let retdata: string[] = [];
    const data:string[] = ["NVDA","AAPL","MSFT","AMZN","GOOGL","META","AVGO","TSLA","WMT","LLY","JPM","XOM","JNJ","V","MU","MA","COST","ORCL","ABBV","PG","HD"]
    data.forEach(element => {
      if(element == status.toUpperCase()){
        retdata.push(element);
      }
    });

    return retdata;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchStockData(tick:string) { 

    try {
    console.log(tick)

    const API_KEY = process.env.ALPHA_API;
    //const API_KEY = "test";
    
    let daily_stock_url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${tick}&apikey=${API_KEY}`
    let overview_url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${tick}&apikey=${API_KEY}`
    console.log(daily_stock_url)

    //testing
    //daily_stock_url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo"
    //overview_url = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo"
    
    const predata:StockResponse = (await axios.get(daily_stock_url)).data;
    const overViewData:OverviewStr = (await axios.get(overview_url)).data;
    
    if(predata == null || predata["Time Series (Daily)"] == null){
        return {
            Information:"bad request",
            overview:{
                Symbol: "N/A",AssetType: "N/A",Name: "N/A",
                Description: "N/A",Exchange: "N/A", Sector: "N/A",
                Industry: "N/A",MarketCapitalization: "0"
            }, 
            stocks:[]
        };
    }

    let stockdaily:TimeSeries = predata['Time Series (Daily)']

    // initialize reponse with metadata
    let  data:{Information: string, overview: Overview ,stocks: MarketCandlenew[]}
    
    data = {
        Information: "status: good",
        overview:{
            Symbol: overViewData["Symbol"] ?? "N/As",
            AssetType: overViewData["AssetType"] ?? "N/A",
            Name: overViewData["Name"] ?? "N/A",
            Description: overViewData["Description"] ?? "N/A",
            Exchange: overViewData["Exchange"] ?? "N/A",
            Sector: overViewData["Sector"] ?? "N/A",
            Industry: overViewData["Industry"] ?? "N/A",
            MarketCapitalization: overViewData["MarketCapitalization"] ?? "0"
        }, 
        stocks:[]
    };

    //set stock values
    for (const [key, value] of Object.entries(stockdaily)) {
      let stock: MarketCandlenew = {
        date: key, 
        open: Number(value['1. open']), 
        close: Number(value['4. close']),
        low: Number(value['3. low']),
        high: Number(value['2. high']),
        volume: Number(value['5. volume']),
        pchange: "-",
      }
      data.stocks.unshift(stock)
    }

    //set the percent change
    let lastclose = 0;
    if(data.stocks.length >= 1){
        lastclose = data.stocks[0].close;
    }

    for(let i = 1; i < data.stocks.length; i++){
        data.stocks[i].pchange = (100 * ((data.stocks[i].close - lastclose)/lastclose)).toFixed(4);
        lastclose = data.stocks[i].close
    }


    // console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch stock data.');
  }
}
