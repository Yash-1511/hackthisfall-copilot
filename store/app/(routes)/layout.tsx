import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Urbanist } from 'next/font/google'

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
    <div className={font.className}>
        <Navbar />
        {children}
        <Footer />
    </div>
  )
}
