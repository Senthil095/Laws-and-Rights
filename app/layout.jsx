import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/AuthContext"
import { Navbar } from "@/components/navbar"
import { FloatingAIButton } from "@/components/floating-ai-button"
import { FloatingFeedbackButton } from "@/components/floating-feedback-button"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Laws and Rights - Know Your Legal Rights in India",
  description:
    "Learn about Indian laws, your fundamental rights, and legal procedures through interactive games and AI assistance.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
            <FloatingAIButton />
            <FloatingFeedbackButton />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
