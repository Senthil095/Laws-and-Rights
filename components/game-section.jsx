"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Scale, Shield, ShoppingCart, Play, Star, Clock, TrafficCone, Lock, Users, Heart, Baby, HeartHandshake, GraduationCap, Leaf } from "lucide-react"
import Link from "next/link"

const gameCategories = [
  {
    id: "fundamental-rights",
    title: "Fundamental Rights",
    description: "Learn about your constitutional rights and how to protect them",
    icon: Shield,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-900/50",
    levels: 12,
    difficulty: "Beginner",
    estimatedTime: "45 min",
  },
  {
    id: "human-rights",
    title: "Human Rights",
    description: "Understand universal human rights including equality, education, privacy, and justice",
    icon: Users,
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
    borderColor: "border-pink-200 dark:border-pink-900/50",
    levels: 10,
    difficulty: "Beginner",
    estimatedTime: "30 min",
  },
  {
    id: "womens-rights",
    title: "Women's Rights",
    description: "Learn about workplace safety, equal pay, domestic violence protection, and legal rights for women",
    icon: Heart,
    color: "from-rose-500 to-rose-600",
    bgColor: "bg-rose-50 dark:bg-rose-950/20",
    borderColor: "border-rose-200 dark:border-rose-900/50",
    levels: 10,
    difficulty: "Beginner",
    estimatedTime: "30 min",
  },
  {
    id: "criminal-law",
    title: "Criminal Law",
    description: "Understand your rights during police encounters and arrests",
    icon: Scale,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    borderColor: "border-red-200 dark:border-red-900/50",
    levels: 12,
    difficulty: "Intermediate",
    estimatedTime: "40 min",
  },
  {
    id: "consumer-rights",
    title: "Consumer Rights",
    description: "Know your rights as a consumer and how to seek redressal",
    icon: ShoppingCart,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    borderColor: "border-green-200 dark:border-green-900/50",
    levels: 12,
    difficulty: "Beginner",
    estimatedTime: "45 min",
  },
  {
    id: "traffic-rules",
    title: "Traffic Rules",
    description: "Master key road safety rules and penalties under the Motor Vehicles Act",
    icon: TrafficCone,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    borderColor: "border-orange-200 dark:border-orange-900/50",
    levels: 10,
    difficulty: "Beginner–Intermediate",
    estimatedTime: "35 min",
  },
  {
    id: "cyber-security",
    title: "Cyber Security",
    description: "Stay safe online: Learn to identify scams, protect your data, and know your rights",
    icon: Lock,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    borderColor: "border-purple-200 dark:border-purple-900/50",
    levels: 10,
    difficulty: "Beginner",
    estimatedTime: "35 min",
  },
  {
    id: "child-rights",
    title: "Child Rights",
    description: "Understand children's fundamental rights including education, protection from abuse, and dignity",
    icon: Baby,
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
    borderColor: "border-indigo-200 dark:border-indigo-900/50",
    levels: 10,
    difficulty: "Beginner",
    estimatedTime: "30 min",
  },
  {
    id: "family-marriage-laws",
    title: "Family & Marriage Laws",
    description: "Learn about marriage registration, divorce, maintenance, inheritance, and family rights under Indian law",
    icon: HeartHandshake,
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    borderColor: "border-amber-200 dark:border-amber-900/50",
    levels: 12,
    difficulty: "Intermediate",
    estimatedTime: "40 min",
  },
  {
    id: "educational-rights",
    title: "Educational Rights",
    description: "Understand the Right to Education, non-discrimination, quality education, and protection of students",
    icon: GraduationCap,
    color: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50 dark:bg-teal-950/20",
    borderColor: "border-teal-200 dark:border-teal-900/50",
    levels: 10,
    difficulty: "Beginner",
    estimatedTime: "30 min",
  },
  {
    id: "environmental-laws",
    title: "Environmental Laws",
    description: "Learn about environmental protection laws, pollution control, wildlife conservation, and citizen duties",
    icon: Leaf,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    borderColor: "border-green-200 dark:border-green-900/50",
    levels: 10,
    difficulty: "Beginner",
    estimatedTime: "30 min",
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
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Interactive Learning Games</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
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
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                    {category.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{category.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
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
                    <Link href={`/game/${category.id}`}>
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
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-purple-100 dark:border-purple-800">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">98+</div>
              <div className="text-gray-600 dark:text-gray-300">Interactive Scenarios</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-purple-100 dark:border-purple-800">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">11</div>
              <div className="text-gray-600 dark:text-gray-300">Legal Categories</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-purple-100 dark:border-purple-800">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-300">Free to Learn</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
