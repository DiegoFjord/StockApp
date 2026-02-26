import { fetchFilteredStocks } from '@/app/lib/data';
import Link from 'next/link';

export default async function InvoicesTable(
  {query,}: {query: string;}
  ) {
  const stocks = await fetchFilteredStocks(query);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className=" min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Available
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {stocks?.map((stock) => {
                const params = new URLSearchParams();
                params.set('query', stock);
                let link = "/stockview?" + params.toString()

                return(
                <tr
                  key={stock}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <Link
                    key={stock}
                    href={link}
                    className={
                    'flex h-[48px] grow items-center m-2 justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'}
                    >
                      <div className="flex items-center gap-3">
                        <p>{stock}</p>
                      </div>
                    </Link>
                  </td>
                </tr>

                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
