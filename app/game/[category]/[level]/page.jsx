"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Clock, Trophy, Home } from "lucide-react"
import { ScenarioAnimation } from "@/components/scenario-animation"
import { SuccessAnimation } from "@/components/success-animation"
import { PunishmentAnimation } from "@/components/punishment-animation"

const gameData = {
  "fundamental-rights": {
    title: "Fundamental Rights",
    levels: {
      1: {
        title: "Right to Equality",
        scenario:
          "You are applying for a government job. The interviewer asks about your caste and says they prefer candidates from certain communities.",
        question: "What should you do in this situation?",
        options: [
          { id: "a", text: "Accept it as normal practice", correct: false },
          { id: "b", text: "Report this discrimination under Article 16", correct: true },
          { id: "c", text: "Lie about your caste", correct: false },
          { id: "d", text: "Leave quietly without complaining", correct: false },
        ],
        explanation:
          "Article 16 guarantees equality of opportunity in public employment. Discrimination based on caste is unconstitutional and should be reported.",
        punishment: "Accepting discrimination perpetuates inequality and violates constitutional principles.",
        timeLimit: 30,
        scenarioType: "job-interview",
      },
      2: {
        title: "Freedom of Speech",
        scenario: "You want to organize a peaceful protest against a government policy in a public park.",
        question: "What is your constitutional right in this situation?",
        options: [
          { id: "a", text: "You need government permission first", correct: false },
          { id: "b", text: "You can protest peacefully under Article 19(1)(a) and (b)", correct: true },
          { id: "c", text: "Protests are not allowed in public places", correct: false },
          { id: "d", text: "Only political parties can organize protests", correct: false },
        ],
        explanation:
          "Article 19(1)(a) guarantees freedom of speech and expression, and Article 19(1)(b) guarantees the right to assemble peacefully without arms.",
        punishment: "Not knowing your rights means you might miss opportunities to express your views democratically.",
        timeLimit: 30,
        scenarioType: "protest",
      },
    },
  },
  "criminal-law": {
    title: "Criminal Law",
    levels: {
      1: {
        title: "Police Encounter",
        scenario: "Police stop you on the street and ask for your documents without stating any reason.",
        question: "What are your rights in this situation?",
        options: [
          { id: "a", text: "You must show documents immediately", correct: false },
          { id: "b", text: "You can ask for the reason and their identification", correct: true },
          { id: "c", text: "You should run away", correct: false },
          { id: "d", text: "You have no rights during police checking", correct: false },
        ],
        explanation:
          "Police must have reasonable suspicion to check documents. You have the right to know the reason and ask for their identification.",
        punishment:
          "Not knowing your rights during police encounters can lead to harassment and violation of your dignity.",
        timeLimit: 25,
        scenarioType: "police-stop",
      },
      2: {
        title: "Arrest Rights",
        scenario:
          "You are being arrested by police. They refuse to tell you the charges and don't allow you to call anyone.",
        question: "What rights are being violated?",
        options: [
          { id: "a", text: "No rights are violated", correct: false },
          { id: "b", text: "Right to know charges and inform family (Article 22)", correct: true },
          { id: "c", text: "Only the right to remain silent", correct: false },
          { id: "d", text: "Police can do whatever they want", correct: false },
        ],
        explanation:
          "Article 22 guarantees the right to know grounds of arrest and the right to inform family/friends. These are fundamental protections.",
        punishment: "Ignorance of arrest rights can lead to prolonged detention and violation of due process.",
        timeLimit: 25,
        scenarioType: "arrest",
      },
    },
  },
  "consumer-rights": {
    title: "Consumer Rights",
    levels: {
      1: {
        title: "Defective Product",
        scenario:
          "You bought a smartphone that stopped working after 2 days. The shopkeeper refuses to replace it saying 'no returns'.",
        question: "What can you do under consumer law?",
        options: [
          { id: "a", text: "Accept the loss", correct: false },
          { id: "b", text: "File complaint in Consumer Forum for replacement/refund", correct: true },
          { id: "c", text: "Buy a new phone", correct: false },
          { id: "d", text: "Complain on social media only", correct: false },
        ],
        explanation:
          "Consumer Protection Act 2019 gives you the right to seek redressal for defective goods. You can file a complaint in the Consumer Forum.",
        punishment:
          "Not knowing consumer rights means losing money on defective products and encouraging unfair trade practices.",
        timeLimit: 30,
        scenarioType: "shopping",
      },
      2: {
        title: "Service Deficiency",
        scenario: "A restaurant served you contaminated food that made you sick. They refuse to take responsibility.",
        question: "What legal action can you take?",
        options: [
          { id: "a", text: "Just avoid the restaurant", correct: false },
          { id: "b", text: "File consumer complaint and claim compensation", correct: true },
          { id: "c", text: "Only post negative reviews", correct: false },
          { id: "d", text: "Accept it as bad luck", correct: false },
        ],
        explanation:
          "Service deficiency causing harm is covered under Consumer Protection Act. You can claim compensation for medical expenses and suffering.",
        punishment:
          "Not taking action against service deficiency allows businesses to continue harming other consumers.",
        timeLimit: 30,
        scenarioType: "restaurant",
      },
    },
  },
}

export default function GamePage() {
  const params = useParams()
  const router = useRouter()
  const { category, level } = params

  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState("scenario") // scenario, playing, success, punishment
  const [showAnimation, setShowAnimation] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    const gameCategory = gameData[category]
    if (gameCategory && gameCategory.levels[level]) {
      const question = gameCategory.levels[level]
      setCurrentQuestion(question)
      // Don't start timer until game actually starts
    }
  }, [category, level])

  useEffect(() => {
    if (timeLeft > 0 && !showResult && gameStarted && gameState === "playing") {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !showResult && gameStarted && gameState === "playing") {
      handleTimeUp()
    }
  }, [timeLeft, showResult, gameStarted, gameState])

  const handleTimeUp = () => {
    setShowResult(true)
    setGameState("punishment")
  }

  const handleScenarioComplete = () => {
    setShowAnimation(false)
    setGameState("playing")
    setGameStarted(true)
    setTimeLeft(currentQuestion.timeLimit)
  }

  const handleOptionSelect = (optionId) => {
    if (showResult) return
    setSelectedOption(optionId)
  }

  const handleSubmit = () => {
    if (!selectedOption) return

    const isCorrect = currentQuestion.options.find((opt) => opt.id === selectedOption)?.correct
    setShowResult(true)

    if (isCorrect) {
      setScore(100)
      setGameState("success")
    } else {
      setScore(0)
      setGameState("punishment")
    }
  }

  const handleRestart = () => {
    setSelectedOption(null)
    setShowResult(false)
    setTimeLeft(currentQuestion.timeLimit)
    setScore(0)
    setGameState("scenario")
    setShowAnimation(true)
    setGameStarted(false)
  }

  const handleNextLevel = () => {
    const nextLevel = Number.parseInt(level) + 1
    const gameCategory = gameData[category]

    if (gameCategory && gameCategory.levels[nextLevel]) {
      router.push(`/game/${category}/${nextLevel}`)
    } else {
      router.push("/")
    }
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Game Not Found</h1>
          <Button onClick={() => router.push("/")} variant="outline">
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={() => router.push("/")} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">{gameData[category].title}</h1>
            <p className="text-gray-600">
              Level {level}: {currentQuestion.title}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              Score: {score}
            </Badge>
            {gameStarted && (
              <Badge variant={timeLeft <= 10 ? "destructive" : "default"} className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {timeLeft}s
              </Badge>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {gameStarted && (
          <div className="mb-8">
            <Progress
              value={showResult ? 100 : ((currentQuestion.timeLimit - timeLeft) / currentQuestion.timeLimit) * 100}
              className="h-2"
            />
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {gameState === "scenario" && (
              <motion.div
                key="scenario-animation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-8"
              >
                <ScenarioAnimation
                  scenario={currentQuestion.scenario}
                  scenarioType={currentQuestion.scenarioType}
                  onComplete={handleScenarioComplete}
                />
              </motion.div>
            )}

            {gameState === "playing" && (
              <motion.div
                key="game-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-xl">Scenario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{currentQuestion.scenario}</p>
                    <h3 className="font-semibold text-lg text-purple-800">{currentQuestion.question}</h3>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Choose your response:</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentQuestion.options.map((option) => (
                        <motion.button
                          key={option.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleOptionSelect(option.id)}
                          className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                            selectedOption === option.id
                              ? "border-purple-500 bg-purple-50"
                              : "border-gray-200 hover:border-purple-300 hover:bg-purple-25"
                          }`}
                          disabled={showResult}
                        >
                          <span className="font-medium mr-3">{option.id.toUpperCase()}.</span>
                          {option.text}
                        </motion.button>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-center">
                      <Button onClick={handleSubmit} disabled={!selectedOption || showResult} className="px-8 py-2">
                        Submit Answer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {gameState === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <SuccessAnimation
                  explanation={currentQuestion.explanation}
                  score={score}
                  scenarioType={currentQuestion.scenarioType}
                  selectedOption={selectedOption}
                  onRestart={handleRestart}
                  onNextLevel={handleNextLevel}
                  hasNextLevel={gameData[category].levels[Number.parseInt(level) + 1] !== undefined}
                />
              </motion.div>
            )}

            {gameState === "punishment" && (
              <motion.div
                key="punishment"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <PunishmentAnimation
                  punishment={currentQuestion.punishment}
                  correctAnswer={currentQuestion.options.find((opt) => opt.correct)?.text}
                  explanation={currentQuestion.explanation}
                  scenarioType={currentQuestion.scenarioType}
                  selectedOption={selectedOption}
                  onRestart={handleRestart}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
