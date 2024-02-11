import { Urbanist } from 'next/font/google'

import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Script from "next/script";

import './globals.css'
import MultipleIdProvider from '@/providers/responce-provider'

const font = Urbanist({ subsets: ['latin'] })

export const metadata = {
  title: 'Store',
  description: 'Store - The place for all your purchases.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <MultipleIdProvider>
        <ToastProvider />
        <ModalProvider />
        {children}
        </MultipleIdProvider>
        <Script src="/chat-widget.js"></Script>
        <Script>{`
window.onload = function() {
    ChatWidget.init("xx-slkUdka819...");
};
`}</Script>
      </body>
    </html>
  )
}
