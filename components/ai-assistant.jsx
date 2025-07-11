"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, X } from "lucide-react"

export function AIAssistant({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Hello! I'm your AI Legal Assistant. I can help you understand Indian laws, your rights, and legal procedures. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: "bot",
        content: generateResponse(input),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateResponse = (question) => {
    const lowerQuestion = question.toLowerCase()

    // Police encounter scenarios
    if (
      lowerQuestion.includes("police") ||
      lowerQuestion.includes("arrest") ||
      lowerQuestion.includes("encounter") ||
      lowerQuestion.includes("detained") ||
      lowerQuestion.includes("custody")
    ) {
      return `**Your Rights During Police Encounters:**

**Right to Know (Article 22):**
• Police must inform you of the grounds for arrest
• You have the right to know the charges against you
• Police cannot detain you without informing the reason

**During Arrest:**
• Right to remain silent (anything you say can be used against you)
• Right to legal representation
• Right to inform family/friends about arrest
• Right to medical examination if injured
• Cannot be arrested without warrant for non-cognizable offenses

**Police Powers & Limitations:**
• Police can check documents only with reasonable suspicion
• Cannot demand bribes (Report to Anti-Corruption Bureau)
• Cannot use third-degree torture (File complaint under Section 330 IPC)
• Must produce you before magistrate within 24 hours of arrest

**Legal Sections:**
• Section 41 CrPC: Conditions for arrest without warrant
• Section 50 CrPC: Right to know grounds of arrest
• Section 56 CrPC: Person arrested to be taken before magistrate

**Emergency Contacts:**
• Police Control Room: 100
• Women Helpline: 181
• Legal Aid: Contact nearest Legal Services Authority`
    }

    // Workplace issues
    if (
      lowerQuestion.includes("workplace") ||
      lowerQuestion.includes("office") ||
      lowerQuestion.includes("boss") ||
      lowerQuestion.includes("harassment") ||
      lowerQuestion.includes("salary") ||
      lowerQuestion.includes("fired")
    ) {
      return `**Workplace Rights & Legal Solutions:**

**Your Employment Rights:**
• Right to fair wages and timely payment
• Right to safe working environment
• Protection against sexual harassment
• Right to form unions and collective bargaining
• Protection against wrongful termination

**Legal Solutions:**
1. File complaint with Labor Commissioner
2. Approach Internal Complaints Committee for harassment
3. Contact Labor Court for wage disputes
4. File police complaint if criminal harassment

**Legal Remedies:**
• Compensation for wrongful termination
• Recovery of unpaid wages with interest
• Damages for harassment and mental agony
• Reinstatement in case of illegal termination

**Emergency Contacts:**
• Labor Helpline: 1800-11-1234
• Women Helpline: 181
• National Commission for Women: 011-26944880`
    }

    // Consumer issues
    if (
      lowerQuestion.includes("product") ||
      lowerQuestion.includes("service") ||
      lowerQuestion.includes("defective") ||
      lowerQuestion.includes("refund") ||
      lowerQuestion.includes("shop")
    ) {
      return `**Consumer Rights & Legal Solutions:**

**Your Consumer Rights:**
• Right to Safety from hazardous goods/services
• Right to Information about quality and price
• Right to Choose from variety at competitive prices
• Right to be Heard and voice complaints
• Right to Seek Redressal for grievances

**Step-by-Step Solution:**
1. Document everything (bills, photos, correspondence)
2. Contact seller/service provider directly first
3. File complaint in Consumer Forum based on claim amount
4. Use online portals for quick resolution

**Legal Remedies:**
• Replacement of defective goods
• Full refund of amount paid
• Compensation for deficiency in service
• Punitive damages for negligence

**Emergency Contacts:**
• National Consumer Helpline: 1915
• Consumer Forum Helpline: 1800-11-4000`
    }

    // Default comprehensive response
    return `**Legal Guidance for Your Situation:**

**Immediate Steps:**
1. Document all evidence and communications
2. Send legal notice to other party if applicable
3. File police complaint if criminal elements involved
4. Seek legal consultation for specific guidance

**Your Rights:**
• Right to equality before law (Article 14)
• Right to life and personal liberty (Article 21)
• Right to constitutional remedies (Article 32)
• Right to fair treatment and justice

**Legal Remedies Available:**
• Civil suit for compensation and damages
• Criminal complaint if offense involved
• Consumer forum for service deficiency
• Specialized forums for specific issues

**Free Legal Aid:**
• District Legal Services Authority
• Lok Adalat for mediation
• Legal aid clinics in most districts

**Emergency Contacts:**
• Police: 100
• Women Helpline: 181
• Legal Aid: Contact District Legal Services Authority

Please provide more details about your specific situation for targeted legal advice.`
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <Card className="w-full max-w-2xl h-[600px] flex flex-col dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI Legal Assistant
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.type === "bot" && <Bot className="h-4 w-4 mt-0.5 text-blue-600 dark:text-blue-400" />}
                      {message.type === "user" && <User className="h-4 w-4 mt-0.5" />}
                      <div>
                        <div className="text-sm whitespace-pre-line">{message.content}</div>
                        <p
                          className={`text-xs mt-1 ${
                            message.type === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t dark:border-gray-700">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your situation for legal solutions..."
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
