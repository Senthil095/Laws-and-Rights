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
  "traffic-rules": {
    title: "Traffic Rules",
    levels: {
      1: {
        title: "Wearing Helmet on Two-Wheeler",
        scenario:
          "Raj is riding his motorbike in town without a helmet. A traffic police officer stops him.",
        question:
          "According to the Motor Vehicles Act, who must wear a helmet while riding a two-wheeler?",
        options: [
          { id: "a", text: "Only the rider, not the pillion passenger.", correct: false },
          { id: "b", text: "Both the rider and pillion passenger (if over 4 years old).", correct: true },
          { id: "c", text: "Only when riding on highways, not in the city.", correct: false },
          { id: "d", text: "Helmets are not compulsory if riding slowly.", correct: false },
        ],
        explanation:
          "Section 129 mandates helmets for rider and pillion (over 4 years). It's mandatory everywhere and reduces head injury risk.",
        punishment:
          "Riding without a helmet attracts a ₹1,000 fine and licence disqualification for 3 months; risk of serious injury is high.",
        timeLimit: 25,
        scenarioType: "helmet",
      },
      2: {
        title: "Using Seatbelts in a Car",
        scenario:
          "Sneha is driving her car with a friend beside her. Neither of them is wearing a seatbelt.",
        question: "Under Indian traffic rules, who is required to wear a seatbelt in a moving car?",
        options: [
          { id: "a", text: "Only the driver.", correct: false },
          { id: "b", text: "The driver and the front-seat passenger.", correct: true },
          { id: "c", text: "Everyone in the car, including those in the back seats.", correct: false },
          { id: "d", text: "Seatbelt use is optional if the car is moving slowly.", correct: false },
        ],
        explanation:
          "Section 194B requires the driver and front-seat passenger to wear seatbelts; child passengers need proper restraints.",
        punishment:
          "Fine of ₹1,000 for not wearing seatbelts; higher risk of severe injury in a crash.",
        timeLimit: 25,
        scenarioType: "seatbelt",
      },
      3: {
        title: "Speeding on a Road",
        scenario:
          "Anand drives at 70 km/h on a city road with a 50 km/h limit.",
        question:
          "What is the legal consequence of exceeding the speed limit under the Motor Vehicles Act?",
        options: [
          { id: "a", text: "No penalty, as long as driving safely.", correct: false },
          { id: "b", text: "Imprisonment for 1 year regardless of speed.", correct: false },
          { id: "c", text: "A fine (up to ₹400 on first offense, ₹1,000 if repeat).", correct: true },
          { id: "d", text: "Automatic cancellation of vehicle registration.", correct: false },
        ],
        explanation:
          "Section 183 covers excessive speed: fine up to ₹400 for first offence; up to ₹1,000 for repeat. Severe cases may invoke Section 184.",
        punishment:
          "Speeding invites fines and increases accident risk, especially in school/residential zones.",
        timeLimit: 25,
        scenarioType: "speeding",
      },
      4: {
        title: "Pedestrian Zebra Crossing",
        scenario:
          "Mira walks across a zebra crossing while a car approaches. The driver does not stop.",
        question: "Who has the right of way at a zebra crossing in India?",
        options: [
          { id: "a", text: "Pedestrians crossing have right of way.", correct: true },
          { id: "b", text: "Vehicles have right of way unless a cop signals to stop.", correct: false },
          { id: "c", text: "Only ambulances have right of way; others can drive.", correct: false },
          { id: "d", text: "No specific rule; pedestrians must always wait.", correct: false },
        ],
        explanation:
          "Road Regulations (1989) give pedestrians right of way at zebra crossings; drivers must yield.",
        punishment:
          "Failing to yield can be dangerous driving (Sec 184) with fines/jail; serious crashes invite harsher penalties.",
        timeLimit: 25,
        scenarioType: "zebra",
      },
      5: {
        title: "Drunk Driving (BAC 0.04%)",
        scenario:
          "Vikram considers driving home after a party; BAC ~0.04%.",
        question:
          "What is the legal BAC limit for driving in India, and what are the penalties if exceeded?",
        options: [
          { id: "a", text: "0.05% limit; first offence ₹5,000 fine.", correct: false },
          { id: "b", text: "0.03% limit; first offence fine up to ₹10,000 and/or 6 months imprisonment.", correct: true },
          { id: "c", text: "No limit for private cars; only buses/trucks are banned.", correct: false },
          { id: "d", text: "Any detectable alcohol is illegal; detention only.", correct: false },
        ],
        explanation:
          "Section 185 sets BAC at 0.03%. First offence: up to ₹10,000 fine and/or 6 months jail; repeat stricter.",
        punishment:
          "Drunk driving can lead to licence suspension, higher fines, and severe criminal liability in crashes.",
        timeLimit: 25,
        scenarioType: "drunk-driving",
      },
      6: {
        title: "Using Mobile Phone While Driving",
        scenario:
          "Rina is at a red light and picks up her phone to send a text.",
        question:
          "What does Indian law say about using a handheld phone while driving, and what is the penalty?",
        options: [
          { id: "a", text: "Allowed if the vehicle is stationary.", correct: false },
          { id: "b", text: "Illegal; punishable by fine up to ₹5,000.", correct: true },
          { id: "c", text: "Only illegal at speeds over 60 km/h.", correct: false },
          { id: "d", text: "Not specified in law.", correct: false },
        ],
        explanation:
          "Using handheld devices is dangerous driving under Sec 184; fines up to ₹5,000; points/suspension possible.",
        punishment:
          "Fines, points, and higher crash risk; potential suspension for repeated offences.",
        timeLimit: 25,
        scenarioType: "mobile-use",
      },
      7: {
        title: "Jumping a Red Light",
        scenario:
          "Aditya crosses an intersection despite the red signal.",
        question:
          "What is the penalty for running a red light in India?",
        options: [
          { id: "a", text: "A warning by police with no fine.", correct: false },
          { id: "b", text: "₹500 first offence, ₹1,000 repeat.", correct: false },
          { id: "c", text: "Dangerous driving (Sec 184): up to ₹5,000 fine or up to 1 year jail.", correct: true },
          { id: "d", text: "Confiscation of vehicle.", correct: false },
        ],
        explanation:
          "Ignoring a red light is dangerous driving per Sec 184; first offence can attract up to ₹5,000 fine/6–12 months jail.",
        punishment:
          "Fines/jail and possible suspension; high crash risk at intersections.",
        timeLimit: 25,
        scenarioType: "red-light",
      },
      8: {
        title: "Unsafe Overtaking on a Blind Curve",
        scenario:
          "Suresh attempts to overtake on a blind curve.",
        question:
          "Is overtaking another vehicle on a blind curve allowed under Indian traffic rules?",
        options: [
          { id: "a", text: "Yes, if no oncoming traffic.", correct: false },
          { id: "b", text: "No, overtaking on a bend/curve is prohibited.", correct: true },
          { id: "c", text: "Only if the car ahead signals left.", correct: false },
          { id: "d", text: "Yes, if you honk to warn oncoming traffic.", correct: false },
        ],
        explanation:
          "Road Regulations prohibit overtaking when visibility is limited or near bends; it's inherently unsafe.",
        punishment:
          "Punishable as dangerous driving (Sec 184) with fine/jail; severe crashes can lead to harsher charges.",
        timeLimit: 25,
        scenarioType: "overtaking",
      },
      9: {
        title: "Obeying STOP Sign",
        scenario:
          "A driver approaches a STOP sign but does not stop.",
        question:
          "What does the law require at a STOP sign?",
        options: [
          { id: "a", text: "Stop only if other vehicles approach.", correct: false },
          { id: "b", text: "Come to a complete stop, then proceed when safe.", correct: true },
          { id: "c", text: "Ignore late at night with no traffic.", correct: false },
          { id: "d", text: "Slow down; no need to fully stop.", correct: false },
        ],
        explanation:
          "Sec 119 requires obeying mandatory signs; a STOP sign mandates a full stop before proceeding.",
        punishment:
          "Ignoring signs invites challans under Sec 177 or 184 depending on danger.",
        timeLimit: 25,
        scenarioType: "stop-sign",
      },
      10: {
        title: "Stopped by Traffic Police (Documents)",
        scenario:
          "A traffic officer asks Anjali to produce documents during a routine check.",
        question:
          "Which documents must a driver show when stopped by a uniformed traffic officer?",
        options: [
          { id: "a", text: "Driving licence and vehicle registration certificate (RC).", correct: true },
          { id: "b", text: "Only the driving licence.", correct: false },
          { id: "c", text: "Driving licence and Aadhar card.", correct: false },
          { id: "d", text: "No documents need to be shown.", correct: false },
        ],
        explanation:
          "Sec 130: produce licence on demand. RC and insurance must also be produced when demanded by an authorized officer.",
        punishment:
          "Failure to produce invites fines under Sec 177; driving without valid licence/RC/insurance has higher penalties.",
        timeLimit: 25,
        scenarioType: "documents-check",
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
      3: {
        title: "Online Purchase – Broken Phone",
        scenario:
          "Rahul orders a smartphone online. It arrives broken, and the seller refuses to repair or replace it. Support gives no resolution.",
        question: "What should Rahul do to protect his rights?",
        options: [
          { id: "a", text: "Give up because online purchases have no guarantee.", correct: false },
          { id: "b", text: "File a complaint with the Consumer Disputes Redressal Commission (Consumer Forum).", correct: true },
          { id: "c", text: "Approach the local police station.", correct: false },
          { id: "d", text: "Sue the seller in a civil court.", correct: false },
        ],
        explanation:
          "The Consumer Protection Act, 2019 covers e-commerce. Rahul has the Right to Seek Redressal and can file a complaint in the District Consumer Commission for repair/replacement/refund. E-commerce platforms must address grievances within stipulated timelines.",
        punishment:
          "Doing nothing lets defective sellers escape accountability and you lose money without redressal.",
        timeLimit: 30,
        scenarioType: "ecommerce-defect",
      },
      4: {
        title: "Store Purchase – No Return",
        scenario:
          "Meera buys a new laptop. It stops working within a week. The shop shows a 'no return after sale' board and refuses help.",
        question: "Which of the following is true about Meera’s situation?",
        options: [
          { id: "a", text: "She can demand repair, replacement, or refund under the Consumer Protection Act.", correct: true },
          { id: "b", text: "She must accept the broken laptop since she bought it.", correct: false },
          { id: "c", text: "She should file a criminal complaint against the shop.", correct: false },
          { id: "d", text: "The law gives her no remedy because the sale is complete.", correct: false },
        ],
        explanation:
          "CPA 2019 allows removal of defects or replacement/refund for defective goods. 'No return' cannot defeat statutory rights in case of defects.",
        punishment:
          "Accepting such refusals normalizes unfair trade practices and leaves consumers with defective products.",
        timeLimit: 30,
        scenarioType: "warranty-defect-store",
      },
      5: {
        title: "Misleading Advertisement",
        scenario:
          "An online ad claims a magic vitamin drink will reduce 10 kg in a week. Rohan buys it but nothing happens.",
        question: "What does this situation illustrate?",
        options: [
          { id: "a", text: "This is a harmless sales pitch with no legal issue.", correct: false },
          { id: "b", text: "This is a misleading advertisement and violates consumer law.", correct: true },
          { id: "c", text: "Rohan can only complain to health authorities, not under consumer law.", correct: false },
          { id: "d", text: "Such ads are protected as free speech.", correct: false },
        ],
        explanation:
          "Misleading advertisements are an unfair trade practice under CPA 2019 and attract penalties. Consumers have the Right to Be Informed with accurate product info.",
        punishment:
          "Falling for false claims wastes money and encourages deceptive marketing.",
        timeLimit: 30,
        scenarioType: "misleading-ad",
      },
      6: {
        title: "Overcharging at Restaurant",
        scenario:
          "Priya buys bottled water labelled ₹20 but is billed ₹164 at a restaurant. She has already paid.",
        question: "What should Priya do next?",
        options: [
          { id: "a", text: "File a complaint in the Consumer Forum for overcharging.", correct: true },
          { id: "b", text: "Accept it, since prices can vary.", correct: false },
          { id: "c", text: "Report the restaurant to the police.", correct: false },
          { id: "d", text: "Ask for manager approval but do nothing legally.", correct: false },
        ],
        explanation:
          "Overcharging constitutes unfair trade practice. The consumer can seek refund of the excess and compensation before the Consumer Commission.",
        punishment:
          "Not challenging overcharging incentivizes unlawful pricing and hurts other consumers too.",
        timeLimit: 30,
        scenarioType: "overcharge",
      },
      7: {
        title: "Online Course Not Delivered",
        scenario:
          "Anita paid ₹5,000 for a one-month online coaching course, but classes never happened and the tutor stopped responding.",
        question: "What recourse does Anita have?",
        options: [
          { id: "a", text: "Complain to the consumer forum for deficient service.", correct: true },
          { id: "b", text: "Nothing, since online courses are unregulated.", correct: false },
          { id: "c", text: "Sue the teacher in criminal court.", correct: false },
          { id: "d", text: "Wait and hope the tutor responds.", correct: false },
        ],
        explanation:
          "Online coaching is a service; failure to deliver is a deficiency in service. She can seek refund/compensation via Consumer Commission.",
        punishment:
          "Waiting passively risks losing money and encourages poor service providers.",
        timeLimit: 30,
        scenarioType: "online-coaching",
      },
      8: {
        title: "Warranty Denied Unfairly",
        scenario:
          "Aman’s laptop with 2-year warranty stops working after 9 months. Service center refuses repair citing 'user misuse' without proof.",
        question: "Which action is correct?",
        options: [
          { id: "a", text: "Insist on repair or replacement under warranty by filing a consumer complaint.", correct: true },
          { id: "b", text: "Buy a new laptop since warranties aren’t guaranteed.", correct: false },
          { id: "c", text: "Call the police for fraud.", correct: false },
          { id: "d", text: "Accept the service center’s decision and do nothing.", correct: false },
        ],
        explanation:
          "A valid warranty is enforceable. Unsubstantiated 'misuse' cannot defeat the promise of quality. Consumer can demand repair/replacement.",
        punishment:
          "Accepting denial forfeits your warranty rights and wastes money.",
        timeLimit: 30,
        scenarioType: "warranty-denial",
      },
      9: {
        title: "Wrong Size – No Return Policy",
        scenario:
          "Kiran receives the wrong shoe size from an online order. Seller claims 'no returns allowed' and refuses exchange.",
        question: "Is Kiran entitled to an exchange or refund?",
        options: [
          { id: "a", text: "Yes. Even with 'no returns', incorrect product allows replacement or refund.", correct: true },
          { id: "b", text: "No. She agreed to the policy.", correct: false },
          { id: "c", text: "Only if she calls the manager.", correct: false },
          { id: "d", text: "She must go to civil court.", correct: false },
        ],
        explanation:
          "A wrong/defective product overrides a 'no return' clause. Consumer can insist on correct replacement or refund under CPA 2019.",
        punishment:
          "Letting sellers hide behind policies enables systemic cheating in e-commerce.",
        timeLimit: 30,
        scenarioType: "no-return",
      },
      10: {
        title: "Failed Digital Payment",
        scenario:
          "Dev pays ₹2,000 via a payment app. The transaction fails but his account is debited. A week later, no refund.",
        question: "What should Dev do?",
        options: [
          { id: "a", text: "Lodge a complaint with the consumer forum against the bank/app as service providers.", correct: true },
          { id: "b", text: "Complain only to the merchant.", correct: false },
          { id: "c", text: "File a police complaint for fraud.", correct: false },
          { id: "d", text: "Do nothing and wait indefinitely.", correct: false },
        ],
        explanation:
          "Digital payment and banking services are 'services' under CPA. Failed transactions causing loss are service deficiencies warranting refund.",
        punishment:
          "Waiting indefinitely can forfeit timely refunds and allows poor service standards to persist.",
        timeLimit: 30,
        scenarioType: "digital-payment",
      },
      11: {
        title: "Unsafe Food – Allergy Incident",
        scenario:
          "Ayesha orders a vegetarian pizza but finds meat in it, eats it, and falls sick due to allergy. Restaurant refuses compensation.",
        question: "Which consumer right was violated?",
        options: [
          { id: "a", text: "Right to Safety (safe products).", correct: true },
          { id: "b", text: "Right to Be Heard.", correct: false },
          { id: "c", text: "Right to Choose.", correct: false },
          { id: "d", text: "Right to Consumer Education.", correct: false },
        ],
        explanation:
          "Serving unsafe/misrepresented food violates the Right to Safety. She can file a consumer complaint for refund and compensation.",
        punishment:
          "Ignoring such incidents risks health and lets eateries disregard safety standards.",
        timeLimit: 30,
        scenarioType: "food-safety",
      },
      12: {
        title: "Institute Shuts After Fees",
        scenario:
          "Vikram pays full fees for a 1-year coaching, but the institute runs only 2 months and then shuts without refund.",
        question: "What can Vikram do?",
        options: [
          { id: "a", text: "File a consumer complaint for deficiency of service to get a refund.", correct: true },
          { id: "b", text: "Nothing, since the business closed.", correct: false },
          { id: "c", text: "Write to the education board.", correct: false },
          { id: "d", text: "Demand the police arrest the owner.", correct: false },
        ],
        explanation:
          "Coaching services that stop prematurely constitute deficiency of service. The Consumer Commission can order refund and damages.",
        punishment:
          "Assuming closure ends liability leaves students uncompensated and encourages fly-by-night operations.",
        timeLimit: 30,
        scenarioType: "institute-closure",
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
