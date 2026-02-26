import { fetchOverviewData } from '@/app/lib/data';
import { formatCurrency } from '@/app/lib/utils';

export default async function SimpleData(
    {query}: { query: string})
{
    const stockdata = await fetchOverviewData(query);

  return (
    <div >
        <p>Symbol: {stockdata.overview.Symbol}</p><br/>
        <p>Asset Type: {stockdata.overview.AssetType}</p><br/>
        <p>Name: {stockdata.overview.Name}</p><br/>
        <p>Description: {stockdata.overview.Description}</p><br/>
        <p>Exchange: {stockdata.overview.Exchange}</p><br/>
        <p>Sector: {stockdata.overview.Sector}</p><br/>
        <p>Industry: {stockdata.overview.Industry}</p><br/>
        <p>Market Capitalization: {formatCurrency(Number(stockdata.overview.MarketCapitalization))}</p>
    </div>
  );
}
