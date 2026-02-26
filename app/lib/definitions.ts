// This file contains type definitions for my data.

export type MarketCandlenew = {
    date: string;
    open: number;
    close: number;
    low: number;
    high: number;
    volume: number;
    pchange: string;
}

export type Overview = {
    Symbol: string;
    AssetType: string;
    Name: string;
    Description: string;
    Exchange: string;
    Sector: string;
    Industry: string;
    MarketCapitalization: string;
}


export type OverviewStr = {
    "Symbol"?: string;
    "AssetType"?: string;
    "Name"?: string;
    "Description"?: string;
    "Exchange"?: string;
    "Sector"?: string;
    "Industry"?: string;
    "MarketCapitalization"?: string;
}


export type MetaData = {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Output Size": string;
    "5. Time Zone": string;
};

export type DailyEntry = {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
};

export type TimeSeries = {
  [date: string]: DailyEntry;
};

export type StockResponse = {
  "Information"?: string;
  "Meta Data": MetaData;
  "Time Series (Daily)": TimeSeries;
};