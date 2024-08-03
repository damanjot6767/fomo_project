import type { Metadata } from 'next'
import { Oswald } from 'next/font/google'
import './globals.css'
import StoreProviders from './store/storeProvider'
import { ScrollToTop } from '@/components/scrollToTop/scrollToTop';
import { Toaster } from '@/components/ui/toaster';

const inter = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'YOLO Backpackers » Sociable And Unique Stays in Himachal',
  description: 'YOLO Backpackers Home page',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={`${inter.className} p-0 m-0`}>
        <StoreProviders>
          <ScrollToTop />
          {children}
          <Toaster />
        </StoreProviders>
      </body>
    </html>
  )
}
