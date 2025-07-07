"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Scale } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-blue-400 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-56 w-56 rounded-full bg-indigo-500 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="grid lg:grid-cols-2 items-center gap-12">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Super-title */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
            >
              <Scale className="h-4 w-4" />
              Know Your Rights, Protect Your Future
            </motion.span>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-4xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
            >
              Learn Indian Laws&nbsp;
              <span className="text-blue-600 dark:text-blue-400">through Gaming</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-lg text-gray-700 dark:text-gray-300 md:text-xl"
            >
              Master your constitutional rights and legal knowledge with bite-sized, interactive scenarios. Play, learn
              and become an informed citizen of India.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                <Link href="/game/basic/1">
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 bg-transparent"
              >
                <Link href="/auth/signup">Create Account</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Custom Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <img
              src="/images/indian-laws-hero.png"
              alt="Indian Laws and Rights - Interactive learning with scales of justice, law book, and quiz character"
              className="h-72 w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
