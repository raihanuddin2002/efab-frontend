import './globals.css'
import type { Metadata } from 'next'
import { Dosis } from 'next/font/google'
import StateContext from '@/context/StateContext'
import Header from './header'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import ReactToastify from '../components/ui/toast/ReactToastify'
config.autoAddCss = false;

const dosis = Dosis({
  weight: ['400', '500', '700'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'efab',
  description: 'This is personal project.',
  manifest: "/manifest.json"
}

export const viewport = {
  themeColor: "#ffffff",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>

      <body className={`${dosis.className} h-screen`}>
        <Header />

        <main>
          <StateContext>
            <ReactToastify />
            {children}
          </StateContext>
        </main>

      </body>
    </html>
  )
}
