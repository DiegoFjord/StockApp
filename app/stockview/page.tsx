import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardSkeleton } from '@/app/ui/skeletons';
import { fetchStockData } from '@/app/lib/data';
import Stocks from '@/app/ui/dashboard/stocks';
import StockTable from '@/app/ui/tables/stocktable';
import { formatCurrency } from '../lib/utils';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const stockdata = await fetchStockData(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Stock View</h1>
      </div>
      <div className="flex w-full items-center justify-between">
        <h2>{stockdata.Information}</h2>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <div className="w-full md:col-span-4">
            <div className="rounded-xl bg-gray-50 p-4">
            <Suspense key={query} fallback={<CardSkeleton />}>
                <Stocks data={stockdata.stocks}/>
            </Suspense>

            </div>
            <Suspense key={query} fallback={<CardSkeleton />}>
              <StockTable stocks={stockdata.stocks}/>
            </Suspense>

          </div>
          <div className="w-full md:col-span-4">
            <div className="rounded-xl bg-gray-50 p-4">
              <Suspense key={query} fallback={<CardSkeleton />}>
                <div >
                  <p>Symbol: {stockdata.overview.Symbol}</p><br/>
                  <p>Asset Type: {stockdata.overview.AssetType}</p><br/>
                  <p>Name: {stockdata.overview.Name}</p><br/>
                  <p>Description: {stockdata.overview.Description}</p><br/>
                  <p>Exchange: {stockdata.overview.Exchange}</p><br/>
                  <p>Sector: {stockdata.overview.Sector}</p><br/>
                  <p>Industry: {stockdata.overview.Industry}</p><br/>
                  <p>MarketCapitalization: {formatCurrency(Number(stockdata.overview.MarketCapitalization))}</p>
                </div>
              </Suspense>
            </div>
          </div>
      </div>
    </div>
  );
}