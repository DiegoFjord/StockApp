import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import Image from 'next/image';

export default async function StockLinks() {
  let tickers = ["NVDA","AAPL","MSFT","AMZN","GOOGL","META","AVGO","TSLA","WMT","LLY","JPM","XOM","JNJ","V","MU","MA","COST","ORCL","ABBV","PG","HD"]
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Stocks
      </h2>
      <div className="flex grow flex-col justify-between p-4">
        <div className="px-6">
          {tickers.map((tick) => {
            const params = new URLSearchParams();
            params.set('query', tick);
            let link = "/stockview?" + params.toString()
            return (
              <Link
                key={tick}
                href={link}
                className={
                  'flex h-[48px] grow items-center m-2 justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'}
                  >
                <p>{tick}</p>
              </Link>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
