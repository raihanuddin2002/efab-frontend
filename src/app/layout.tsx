import './globals.css'
import type { Metadata } from 'next'
import { Dosis } from 'next/font/google'
import StateContext from '@/context/StateContext'
import AuthProvider from '../components/provider/AuthProvider'
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
  title: 'efab (admin)',
  description: 'This is personal project.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className={`${dosis.className} h-screen`}>
        <Header />

        <main>
          <AuthProvider>
            <StateContext>
              <ReactToastify />
              {children}
            </StateContext>
          </AuthProvider>
        </main>

      </body>
    </html>
  )
}
