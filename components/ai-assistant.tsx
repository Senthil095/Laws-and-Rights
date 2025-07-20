"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Send, X, Scale, Loader2 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  category?: string
}

interface AIAssistantProps {
  isOpen: boolean
  onClose: () => void
}

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content:
        "Hello! I'm your AI Legal Assistant. I can help you understand Indian laws and your rights. You can ask me about:\n\n• Constitutional Rights\n• Criminal Laws\n• Civil Rights\n• Labour Laws\n• Consumer Rights\n• Family Laws\n• Property Laws\n\nWhat legal question can I help you with today?",
      timestamp: new Date(),
      category: "welcome",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const getLegalResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const message = userMessage.toLowerCase()

    // Constitutional Rights
    if (
      message.includes("fundamental right") ||
      message.includes("constitutional right") ||
      message.includes("article")
    ) {
      return `**Fundamental Rights under Indian Constitution:**

**Article 14-18: Right to Equality**
• Equality before law and equal protection of laws
• Prohibition of discrimination on grounds of religion, race, caste, sex, or place of birth
• Equality of opportunity in public employment
• Abolition of untouchability

**Article 19-22: Right to Freedom**
• Freedom of speech and expression
• Freedom to assemble peacefully
• Freedom to form associations
• Freedom to move freely throughout India
• Freedom to reside and settle anywhere in India
• Freedom to practice any profession or trade

**Article 23-24: Right against Exploitation**
• Prohibition of traffic in human beings and forced labour
• Prohibition of employment of children in hazardous work

**Article 25-28: Right to Freedom of Religion**
• Freedom of conscience and free profession, practice and propagation of religion

**Article 29-30: Cultural and Educational Rights**
• Protection of language, script and culture of minorities
• Right of minorities to establish and administer educational institutions

**Article 32: Right to Constitutional Remedies**
• Right to approach Supreme Court for enforcement of fundamental rights
• Known as the "Heart and Soul" of the Constitution

**Legal Remedy:** If any fundamental right is violated, you can directly approach the Supreme Court under Article 32 or High Court under Article 226.`
    }

    // Police-related queries
    if (message.includes("police") || message.includes("arrest") || message.includes("detention")) {
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

    // Domestic Violence
    if (
      message.includes("domestic violence") ||
      message.includes("wife") ||
      message.includes("husband") ||
      message.includes("family violence")
    ) {
      return `**Protection from Domestic Violence Act, 2005:**

**What Constitutes Domestic Violence:**
• Physical abuse (hitting, slapping, pushing)
• Sexual abuse
• Verbal and emotional abuse
• Economic abuse (denying money, property)

**Your Rights:**
• Right to live in shared household
• Right to protection from violence
• Right to maintenance
• Right to custody of children
• Right to compensation

**Legal Remedies:**
• Protection Order: Restrains abuser from committing violence
• Residence Order: Right to live in matrimonial home
• Monetary Relief: Maintenance and compensation
• Custody Order: Temporary custody of children

**How to File Complaint:**
• Approach Magistrate directly
• File with Protection Officer
• Call Women Helpline: 181
• Any person can report on victim's behalf

**Important Sections:**
• Section 498A IPC: Cruelty by husband or relatives
• Section 406 IPC: Criminal breach of trust
• DV Act 2005: Comprehensive protection

**Support Services:**
• One Stop Centres for women
• Mahila Police Stations
• Legal Aid Services
• Counselling Services

**Emergency:** Call 100 (Police) or 181 (Women Helpline) immediately if in danger.`
    }

    // Labour Rights
    if (
      message.includes("work") ||
      message.includes("job") ||
      message.includes("employer") ||
      message.includes("salary") ||
      message.includes("overtime")
    ) {
      return `**Labour Rights in India:**

**Working Hours (Factories Act 1948):**
• Maximum 9 hours per day, 48 hours per week
• Overtime payment at double rate for extra hours
• Weekly holiday mandatory
• Cannot work more than 5 hours without break

**Minimum Wages Act 1948:**
• Right to minimum wages as notified by government
• Wages must be paid by 7th of next month
• No deduction except as per law

**Payment of Wages Act 1936:**
• Wages must be paid in legal tender
• No arbitrary deductions allowed
• Delay in payment attracts penalty

**Sexual Harassment (POSH Act 2013):**
• Every workplace must have Internal Complaints Committee
• Right to file complaint against sexual harassment
• Protection from retaliation

**Contract Labour Act 1970:**
• Equal wages for contract and permanent workers
• Proper facilities and welfare measures

**Your Rights:**
• Right to form trade unions
• Right to collective bargaining
• Right to strike (with conditions)
• Right to social security benefits
• Right to safe working conditions

**Complaint Mechanisms:**
• Labour Commissioner Office
• Industrial Tribunal
• Labour Court
• Conciliation Officer

**Key Contacts:**
• Labour Helpline: 1800-11-1234
• Shram Suvidha Portal for online complaints`
    }

    // Consumer Rights
    if (
      message.includes("consumer") ||
      message.includes("product") ||
      message.includes("service") ||
      message.includes("defective") ||
      message.includes("refund")
    ) {
      return `**Consumer Protection Act 2019:**

**Consumer Rights:**
• Right to Safety: Protection from hazardous goods/services
• Right to Information: Complete product information
• Right to Choose: Access to variety of goods at competitive prices
• Right to be Heard: Voice complaints and be assured of fair treatment
• Right to Redressal: Compensation for defective goods/services
• Right to Consumer Education: Knowledge about rights and remedies

**What You Can Complain About:**
• Defective goods
• Deficient services
• Unfair trade practices
• Misleading advertisements
• Overcharging

**Consumer Forums:**
• District Consumer Forum: Claims up to ₹1 crore
• State Consumer Commission: ₹1 crore to ₹10 crore
• National Consumer Commission: Above ₹10 crore

**How to File Complaint:**
• Online: edaakhil.nic.in
• Offline: Visit nearest consumer forum
• No court fee for claims up to ₹5 lakh
• Simple procedure, no lawyer required

**Reliefs Available:**
• Replacement of defective goods
• Refund of amount paid
• Compensation for loss/injury
• Punitive damages
• Discontinuation of unfair practices

**E-commerce Rights:**
• Right to return within specified period
• Right to refund if not satisfied
• Protection from fake reviews
• Liability of marketplace for defective products

**Helplines:**
• National Consumer Helpline: 1915
• State Consumer Helplines available`
    }

    // Property Rights
    if (
      message.includes("property") ||
      message.includes("land") ||
      message.includes("house") ||
      message.includes("rent") ||
      message.includes("tenant")
    ) {
      return `**Property Rights in India:**

**Constitutional Protection:**
• Right to property is a legal right (Article 300A)
• No person can be deprived of property except by law

**Types of Property Rights:**
• Ownership rights
• Possession rights
• Inheritance rights
• Transfer rights

**Tenant Rights (Rent Control Acts):**
• Right to fair rent
• Protection from arbitrary eviction
• Right to basic amenities
• Right to privacy

**Landlord Rights:**
• Right to receive rent
• Right to evict for non-payment (with notice)
• Right to inspect property (with notice)
• Right to increase rent as per law

**Property Purchase Rights:**
• Right to clear title
• Right to proper documentation
• Right to registration
• Protection from fraud

**Women's Property Rights:**
• Equal inheritance rights (Hindu Succession Act 2005)
• Right to matrimonial property
• Right to maintenance through property
• Right to ancestral property

**Legal Documents Required:**
• Sale Deed
• Title Deed
• Encumbrance Certificate
• Property Tax Receipts
• Approved Building Plan

**Dispute Resolution:**
• Civil Courts
• Revenue Courts
• Lok Adalats
• Arbitration

**Registration:**
• Mandatory under Registration Act 1908
• Protects against fraud
• Establishes legal ownership`
    }

    // Criminal Law
    if (
      message.includes("crime") ||
      message.includes("theft") ||
      message.includes("fraud") ||
      message.includes("fir") ||
      message.includes("complaint")
    ) {
      return `**Criminal Law Rights & Procedures:**

**Right to File FIR:**
• Police cannot refuse to register FIR for cognizable offense
• FIR copy must be given free of cost
• Can file online FIR in many states
• If police refuse, approach Superintendent of Police

**Types of Offenses:**
• Cognizable: Police can arrest without warrant (murder, theft, rape)
• Non-cognizable: Police need warrant (defamation, simple hurt)
• Bailable: Can get bail as matter of right
• Non-bailable: Bail at court's discretion

**Victim Rights:**
• Right to be informed about case progress
• Right to legal aid if poor
• Right to compensation
• Right to appeal against acquittal
• Right to in-camera trial (in certain cases)

**Common Criminal Sections:**
• Section 302: Murder (Life imprisonment/death)
• Section 376: Rape (7 years to life)
• Section 420: Cheating (7 years + fine)
• Section 379: Theft (3 years + fine)
• Section 506: Criminal intimidation (2 years)

**Cyber Crimes (IT Act 2000):**
• Section 66: Computer related offenses
• Section 67: Publishing obscene material
• Section 66A: Offensive messages (struck down)
• Cyber Crime Helpline: 1930

**Bail Rights:**
• Bailable offense: Bail as matter of right
• Non-bailable: Court discretion
• Cannot be denied if case not concluded in 60/90 days
• Anticipatory bail available

**Legal Aid:**
• Free legal aid for poor (Legal Services Authority)
• Right to lawyer during interrogation
• State must provide lawyer if accused cannot afford

**Emergency Numbers:**
• Police: 100
• Women Helpline: 181
• Cyber Crime: 1930`
    }

    // RTI and Transparency
    if (
      message.includes("rti") ||
      message.includes("information") ||
      message.includes("government") ||
      message.includes("transparency")
    ) {
      return `**Right to Information Act 2005:**

**What is RTI:**
• Fundamental right to access government information
• Promotes transparency and accountability
• Covers all government departments and PSUs

**Who Can Apply:**
• Any Indian citizen
• No need to give reason for seeking information
• Can be filed online or offline

**Information You Can Seek:**
• Government policies and decisions
• Budget allocations and expenditure
• Selection criteria for government jobs
• Details of government schemes
• Copies of government documents

**Information Exempted:**
• Information affecting national security
• Cabinet papers
• Personal information of third parties
• Trade secrets
• Information given in confidence

**How to Apply:**
• Write application to Public Information Officer (PIO)
• Pay fee: ₹10 for application + ₹2 per page for copies
• BPL card holders exempted from fee

**Time Limits:**
• 30 days for normal information
• 48 hours for life and liberty matters
• Additional 30 days if third party involved

**Appeal Process:**
• First Appeal: To Appellate Authority within 30 days
• Second Appeal: To Information Commission within 90 days
• No fee for appeals

**Penalties for Officials:**
• ₹250 per day for delay (max ₹25,000)
• Disciplinary action for willful non-compliance

**Online Portals:**
• rtionline.gov.in (Central Government)
• State government RTI portals

**RTI Helpline:** Contact respective state information commissions`
    }

    // Default response for general queries
    return `I understand you're asking about "${userMessage}". Let me provide some general guidance on Indian legal matters:

**For Specific Legal Issues:**
• **Constitutional Matters:** Approach High Court or Supreme Court
• **Criminal Cases:** File FIR at nearest police station
• **Civil Disputes:** File suit in appropriate civil court
• **Consumer Issues:** Approach Consumer Forum
• **Labour Disputes:** Contact Labour Commissioner

**Free Legal Aid:**
• National Legal Services Authority (NALSA)
• State Legal Services Authority
• District Legal Services Authority
• Lok Adalats for quick resolution

**Important Helplines:**
• Police Emergency: 100
• Women Helpline: 181
• Child Helpline: 1098
• Senior Citizen Helpline: 14567
• Legal Aid Helpline: Contact nearest DLSA

**Online Resources:**
• india.gov.in - Official government portal
• Supreme Court of India website
• High Court websites
• Legal Services Authority websites

Would you like me to provide more specific information about any particular area of law? Please describe your situation in more detail, and I'll provide relevant legal guidance.`
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await getLegalResponse(inputMessage)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response,
        timestamp: new Date(),
        category: "legal-advice",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          "I apologize, but I'm having trouble processing your request right now. Please try again or contact a legal professional for immediate assistance.",
        timestamp: new Date(),
        category: "error",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatMessage = (content: string) => {
    // Convert markdown-style formatting to JSX
    const lines = content.split("\n")
    return lines.map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <div key={index} className="font-bold text-blue-800 dark:text-blue-300 mt-3 mb-1">
            {line.slice(2, -2)}
          </div>
        )
      }
      if (line.startsWith("• ")) {
        return (
          <div key={index} className="ml-4 mb-1">
            • {line.slice(2)}
          </div>
        )
      }
      if (line.trim() === "") {
        return <div key={index} className="h-2"></div>
      }
      return (
        <div key={index} className="mb-1">
          {line}
        </div>
      )
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, x: -200 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0.8, opacity: 0, x: -200 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-4xl h-[80vh] bg-white dark:bg-gray-900 rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="h-full flex flex-col border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Scale className="h-6 w-6" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-xl">AI Legal Assistant</CardTitle>
                      <p className="text-blue-100 text-sm">Expert guidance on Indian Laws & Rights</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.type === "assistant" && (
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        )}

                        <div className={`max-w-[80%] ${message.type === "user" ? "order-1" : ""}`}>
                          <div
                            className={`p-3 rounded-lg ${
                              message.type === "user"
                                ? "bg-blue-600 text-white ml-auto"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            }`}
                          >
                            {message.type === "assistant" ? (
                              <div className="text-sm leading-relaxed">{formatMessage(message.content)}</div>
                            ) : (
                              <div className="text-sm">{message.content}</div>
                            )}
                          </div>

                          {message.category && message.category !== "welcome" && (
                            <Badge variant="secondary" className="mt-1 text-xs">
                              {message.category === "legal-advice" ? "Legal Guidance" : message.category}
                            </Badge>
                          )}

                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>

                        {message.type === "user" && (
                          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3 justify-start"
                      >
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Analyzing your legal query...
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>

                <div className="border-t dark:border-gray-700 p-4">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Describe your legal situation or ask about Indian laws..."
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    💡 Try asking: "What are my rights if police stops me?" or "My employer is not paying overtime"
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
