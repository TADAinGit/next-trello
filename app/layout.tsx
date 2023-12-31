import './globals.css'

export const metadata = {
  title: 'Trello',
  description: 'Trello by TADA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-[#f5f6f8]'>{children}</body>
    </html>
  )
}
