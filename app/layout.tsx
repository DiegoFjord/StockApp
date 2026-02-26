import '@/app/ui/global.css';
import { inter, lusitana } from '@/app/ui/fonts';
import SideNav from '@/app/ui/dashboard/sidenav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`dark:bg-gray-700 ${inter.className} antialiased`}>
          <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
              <SideNav />
            </div>
            <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
          </div>
        </body>
    </html>
  );
}
