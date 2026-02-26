import { MarketCandlenew } from '@/app/lib/definitions';
import { formatCurrency } from '@/app/lib/utils';

export default async function InvoicesTable(
  {stocks}: { stocks: ReadonlyArray<MarketCandlenew>}
){

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Open
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Close
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Volume
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  %Change <br/>(from previous day)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {stocks?.map((stock,index) => (
                <tr
                  key={index}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <p>{stock.date}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{formatCurrency(stock.open)}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{formatCurrency(stock.close)}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{stock.volume}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{stock.pchange}%</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
