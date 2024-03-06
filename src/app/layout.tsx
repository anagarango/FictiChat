import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'FictiChat',
  description: 'Chat with your favourite movie, video games, and tv show characters.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
