"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Scale, Shield, ShoppingCart, Play, Star, Clock } from "lucide-react"
import Link from "next/link"

const gameCategories = [
  {
    id: "fundamental-rights",
    title: "Fundamental Rights",
    description: "Learn about your constitutional rights and how to protect them",
    icon: Shield,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    levels: 2,
    difficulty: "Beginner",
    estimatedTime: "15 min",
  },
  {
    id: "criminal-law",
    title: "Criminal Law",
    description: "Understand your rights during police encounters and arrests",
    icon: Scale,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    levels: 2,
    difficulty: "Intermediate",
    estimatedTime: "20 min",
  },
  {
    id: "consumer-rights",
    title: "Consumer Rights",
    description: "Know your rights as a consumer and how to seek redressal",
    icon: ShoppingCart,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    levels: 2,
    difficulty: "Beginner",
    estimatedTime: "12 min",
  },
]

export function GameSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Interactive Learning Games</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about Indian laws through engaging scenarios and real-world situations. Each game teaches you
            practical legal knowledge you can use in daily life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {gameCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card
                className={`h-full ${category.bgColor} ${category.borderColor} border-2 hover:shadow-xl transition-all duration-300 group`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.levels} Levels
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                    {category.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {category.difficulty}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {category.estimatedTime}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link href={`/game/${category.id}/1`}>
                      <Button
                        className={`w-full bg-gradient-to-r ${category.color} hover:opacity-90 transition-all duration-300 group-hover:scale-105`}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start Learning
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">6+</div>
              <div className="text-gray-600">Interactive Scenarios</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
              <div className="text-gray-600">Legal Categories</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Free to Learn</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
