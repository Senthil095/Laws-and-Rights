import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { FloatingFeedbackButton } from "@/components/floating-feedback-button"
import { FloatingAIButton } from "@/components/floating-ai-button"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Indian Laws Game - Learn Your Rights",
  description: "Interactive learning platform for Indian laws and constitutional rights",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <FloatingFeedbackButton />
          <FloatingAIButton />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
