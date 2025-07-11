"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, BookOpen, Users, Award } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 px-4 py-2">
                🎓 Interactive Legal Education
              </Badge>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Learn Your{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Legal Rights
                </span>{" "}
                Through Games
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Master Indian laws, fundamental rights, and legal procedures through interactive scenarios. Get
                AI-powered assistance and learn practical legal knowledge for real-world situations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/game/fundamental-rights/1">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Learning
                </Button>
              </Link>

              <Link href="/ai-assistant">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-purple-200 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 bg-transparent"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  AI Assistant
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">6+</div>
                <div className="text-sm text-gray-600">Legal Scenarios</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-sm text-gray-600">Law Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">AI</div>
                <div className="text-sm text-gray-600">Powered Help</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-purple-100">
              <img
                src="/images/indian-laws-hero.png"
                alt="Indian Laws and Rights Learning"
                className="w-full h-auto rounded-xl"
              />

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full shadow-lg"
              >
                <Award className="h-6 w-6" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-3 rounded-full shadow-lg"
              >
                <Users className="h-6 w-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
