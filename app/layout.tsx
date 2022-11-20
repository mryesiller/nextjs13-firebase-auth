import "../styles/globals.css"
import { Roboto } from "@next/font/google"
import ThemeProvider from "../providers/theme-provider"

const roboto = Roboto({
  weight: "400",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <head />
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
