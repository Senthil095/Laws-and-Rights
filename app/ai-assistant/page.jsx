"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Sparkles, BookOpen, Scale, Shield } from "lucide-react"

export default function AIAssistantPage() {
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

  const quickQuestions = [
    { icon: Shield, text: "What are my fundamental rights?", category: "Rights" },
    { icon: Scale, text: "How to file a consumer complaint?", category: "Consumer" },
    { icon: BookOpen, text: "What to do if arrested?", category: "Criminal" },
    { icon: Sparkles, text: "Property dispute resolution", category: "Civil" },
  ]

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

    // Workplace harassment or issues
    if (
      lowerQuestion.includes("workplace") ||
      lowerQuestion.includes("office") ||
      lowerQuestion.includes("boss") ||
      lowerQuestion.includes("harassment") ||
      lowerQuestion.includes("salary") ||
      lowerQuestion.includes("fired") ||
      lowerQuestion.includes("terminated")
    ) {
      return `**Workplace Rights & Legal Solutions:**

**Your Employment Rights:**
• Right to fair wages and timely payment (Payment of Wages Act, 1936)
• Right to safe working environment (Factories Act, 1948)
• Protection against sexual harassment (POSH Act, 2013)
• Right to form unions and collective bargaining
• Protection against wrongful termination

**Sexual Harassment Solutions:**
• File complaint with Internal Complaints Committee (ICC)
• If no ICC, approach Local Complaints Committee (LCC)
• File police complaint under IPC Section 354A
• Approach Women's Commission for support

**Salary/Wage Issues:**
• File complaint with Labor Commissioner
• Approach Labor Court for wage disputes
• File case under Payment of Wages Act
• Contact Employees' Provident Fund Organization (EPFO)

**Wrongful Termination:**
• Notice period as per employment contract required
• File complaint with Labor Court
• Claim compensation for illegal termination
• Approach Industrial Tribunal for reinstatement

**Legal Remedies:**
• Conciliation through Labor Department
• Industrial Dispute resolution
• Civil suit for damages
• Criminal complaint if harassment involved

**Emergency Contacts:**
• Labor Helpline: 1800-11-1234
• Women Helpline: 181
• National Commission for Women: 011-26944880`
    }

    // Domestic violence or family issues
    if (
      lowerQuestion.includes("domestic") ||
      lowerQuestion.includes("husband") ||
      lowerQuestion.includes("wife") ||
      lowerQuestion.includes("violence") ||
      lowerQuestion.includes("abuse") ||
      lowerQuestion.includes("beating") ||
      lowerQuestion.includes("family") ||
      lowerQuestion.includes("dowry")
    ) {
      return `**Protection from Domestic Violence - Legal Solutions:**

**Your Rights under Domestic Violence Act, 2005:**
• Right to live free from violence in shared household
• Right to protection orders against abuser
• Right to residence orders (cannot be evicted)
• Right to monetary relief and compensation
• Right to custody of children

**Immediate Actions:**
1. File complaint with nearest police station
2. Approach Protection Officer in your district
3. File application under Section 12 of DV Act
4. Seek medical treatment and preserve evidence
5. Contact women's helpline for immediate support

**Legal Remedies Available:**
• **Protection Order**: Restrains abuser from violence
• **Residence Order**: Right to continue living in shared household
• **Monetary Relief**: Maintenance, medical expenses, compensation
• **Custody Order**: Temporary custody of children
• **Compensation**: For mental torture and emotional distress

**Criminal Remedies:**
• FIR under IPC Section 498A (cruelty by husband/relatives)
• Section 323 IPC (voluntarily causing hurt)
• Section 506 IPC (criminal intimidation)
• Dowry Prohibition Act, 1961 (if dowry harassment)

**Support Services:**
• One Stop Centre (OSC) for integrated services
• Shelter homes for immediate protection
• Legal aid services (free legal representation)
• Counseling and rehabilitation services

**Emergency Contacts:**
• Women Helpline: 181
• Domestic Violence Helpline: 1091
• Police: 100
• National Commission for Women: 011-26944880`
    }

    // Consumer issues
    if (
      lowerQuestion.includes("product") ||
      lowerQuestion.includes("service") ||
      lowerQuestion.includes("defective") ||
      lowerQuestion.includes("refund") ||
      lowerQuestion.includes("warranty") ||
      lowerQuestion.includes("shop") ||
      lowerQuestion.includes("online") ||
      lowerQuestion.includes("delivery")
    ) {
      return `**Consumer Rights & Legal Solutions:**

**Your Consumer Rights (Consumer Protection Act 2019):**
• Right to Safety from hazardous goods/services
• Right to Information about quality, quantity, price
• Right to Choose from variety at competitive prices
• Right to be Heard and voice complaints
• Right to Seek Redressal for grievances
• Right to Consumer Education

**Step-by-Step Solution:**
1. **Document Everything**: Keep bills, photos, correspondence, warranty cards
2. **Direct Resolution**: Contact seller/service provider first
3. **Consumer Forum**: File complaint based on claim amount:
   - District Forum: Up to ₹1 crore
   - State Commission: ₹1 crore to ₹10 crore
   - National Commission: Above ₹10 crore

**Online Solutions:**
• E-Daakhil portal: edaakhil.nic.in (online complaint filing)
• National Consumer Helpline: 1915
• Consumer helpline portal: consumerhelpline.gov.in

**Legal Remedies:**
• Replacement of defective goods
• Refund of amount paid
• Compensation for deficiency in service
• Punitive damages for negligence
• Removal of defects in goods

**Time Limit:**
• File complaint within 2 years from cause of action
• Can be extended if sufficient cause shown

**Emergency Contacts:**
• National Consumer Helpline: 1915
• Consumer Forum Helpline: 1800-11-4000`
    }

    // Property disputes
    if (
      lowerQuestion.includes("property") ||
      lowerQuestion.includes("land") ||
      lowerQuestion.includes("house") ||
      lowerQuestion.includes("rent") ||
      lowerQuestion.includes("landlord") ||
      lowerQuestion.includes("tenant") ||
      lowerQuestion.includes("eviction") ||
      lowerQuestion.includes("possession")
    ) {
      return `**Property Rights & Legal Solutions:**

**Your Property Rights:**
• Right to peaceful enjoyment of property
• Protection against unlawful dispossession
• Right to fair compensation for acquisition
• Right to clear and marketable title

**Property Dispute Solutions:**
1. **Gather Documents**: Sale deed, title documents, survey records, tax receipts
2. **Legal Notice**: Send notice to opposite party stating your claim
3. **Mediation**: Try Lok Adalat for amicable settlement
4. **Civil Suit**: File appropriate suit in civil court

**Types of Property Suits:**
• **Title Suit**: To establish ownership rights
• **Possession Suit**: To recover possession of property
• **Injunction Suit**: To prevent interference with property rights
• **Partition Suit**: To divide joint property
• **Specific Performance**: To enforce sale agreement

**Landlord-Tenant Issues:**
• **Rent Control Act**: Protection against arbitrary eviction
• **Notice Period**: Landlord must give proper notice
• **Rent Receipt**: Right to demand rent receipts
• **Maintenance**: Landlord's duty to maintain property

**Legal Remedies:**
• Declaratory decree establishing title
• Possession decree with mesne profits
• Permanent injunction against trespass
• Damages for unlawful dispossession
• Partition by metes and bounds

**Important Laws:**
• Transfer of Property Act, 1882
• Registration Act, 1908
• Limitation Act, 2019 (12 years for property suits)
• State Rent Control Acts

**Emergency Contacts:**
• District Collector for revenue matters
• Sub-Registrar for registration issues
• Legal Aid Services for free legal help`
    }

    // Traffic violations or accidents
    if (
      lowerQuestion.includes("traffic") ||
      lowerQuestion.includes("accident") ||
      lowerQuestion.includes("vehicle") ||
      lowerQuestion.includes("driving") ||
      lowerQuestion.includes("license") ||
      lowerQuestion.includes("challan") ||
      lowerQuestion.includes("fine") ||
      lowerQuestion.includes("hit")
    ) {
      return `**Traffic Laws & Accident Rights - Legal Solutions:**

**Your Rights During Traffic Stops:**
• Right to see police officer's identification
• Right to know reason for stopping vehicle
• Right to see challan/fine details clearly
• Right to legal representation if arrested
• Right to contest challan in court

**Traffic Violation Solutions:**
1. **Pay Online**: Use parivahan.gov.in or state transport portals
2. **Contest in Court**: File application within 30 days
3. **Legal Representation**: Hire lawyer for serious violations
4. **Evidence Collection**: Gather photos, witness statements

**Accident Rights & Procedures:**
• **Immediate Action**: Call 108 for medical emergency
• **Police Report**: File FIR within 24 hours (mandatory)
• **Insurance Claim**: Inform insurance company immediately
• **Medical Treatment**: Right to treatment at government hospital
• **Compensation**: Claim through Motor Accident Claims Tribunal (MACT)

**Legal Remedies for Accidents:**
• **Compensation under Motor Vehicles Act**: For injury/death
• **Third-party Insurance Claims**: Against at-fault driver
• **Criminal Case**: If accident due to negligence (IPC Section 279, 304A)
• **Civil Suit**: For damages beyond insurance coverage

**Hit and Run Cases:**
• **Solatium Scheme**: ₹25,000 for death, ₹12,500 for grievous injury
• **Police Investigation**: Under IPC Section 304A (causing death by negligence)
• **Victim Compensation**: Through State Victim Compensation Scheme

**Motor Vehicle Act Penalties:**
• Driving without license: ₹5,000
• Driving under influence: ₹10,000 + imprisonment
• Overspeeding: ₹1,000-₹2,000
• Not wearing helmet: ₹1,000 + license suspension

**Emergency Contacts:**
• Traffic Police: 103
• Accident Emergency: 108
• Highway Emergency: 1033`
    }

    // Cyber crimes or online fraud
    if (
      lowerQuestion.includes("cyber") ||
      lowerQuestion.includes("online") ||
      lowerQuestion.includes("fraud") ||
      lowerQuestion.includes("hacking") ||
      lowerQuestion.includes("phishing") ||
      lowerQuestion.includes("scam") ||
      lowerQuestion.includes("digital") ||
      lowerQuestion.includes("internet")
    ) {
      return `**Cyber Crime & Online Fraud - Legal Solutions:**

**Your Digital Rights:**
• Right to privacy in digital space
• Protection against unauthorized access to data
• Right to report cyber crimes
• Compensation for financial losses due to cyber fraud

**Types of Cyber Crimes & Solutions:**
• **Online Fraud**: Report to Cyber Crime Cell, file FIR
• **Identity Theft**: Contact banks, file police complaint
• **Phishing**: Report to Anti-Phishing Working Group
• **Hacking**: File complaint under IT Act Section 66
• **Cyberbullying**: Report to platform, file police complaint

**Immediate Actions:**
1. **Preserve Evidence**: Take screenshots, save emails, URLs
2. **Report to Platform**: Use reporting mechanisms on social media/websites
3. **File Complaint**: Visit cybercrime.gov.in for online complaint
4. **Contact Bank**: If financial fraud, inform bank immediately
5. **Police Complaint**: File FIR at nearest police station

**Legal Remedies under IT Act 2000:**
• **Section 66**: Computer-related offenses (imprisonment up to 3 years)
• **Section 66A**: Sending offensive messages (struck down but similar provisions exist)
• **Section 66C**: Identity theft (imprisonment up to 3 years)
• **Section 66D**: Cheating by personation using computer (imprisonment up to 3 years)
• **Section 67**: Publishing obscene material (imprisonment up to 3 years)

**Financial Fraud Solutions:**
• **Report to Bank**: Immediately block cards/accounts
• **RBI Ombudsman**: For banking-related complaints
• **SEBI**: For investment fraud complaints
• **Chargeback**: Request reversal of fraudulent transactions

**Compensation:**
• Recovery of lost money through court orders
• Damages for mental harassment
• Compensation under Victim Compensation Scheme

**Emergency Contacts:**
• Cyber Crime Helpline: 1930
• National Cyber Crime Reporting Portal: cybercrime.gov.in
• Banking Ombudsman: 14448`
    }

    // Medical negligence or healthcare issues
    if (
      lowerQuestion.includes("doctor") ||
      lowerQuestion.includes("hospital") ||
      lowerQuestion.includes("medical") ||
      lowerQuestion.includes("treatment") ||
      lowerQuestion.includes("negligence") ||
      lowerQuestion.includes("medicine") ||
      lowerQuestion.includes("surgery")
    ) {
      return `**Medical Negligence & Healthcare Rights - Legal Solutions:**

**Your Healthcare Rights:**
• Right to quality medical care
• Right to informed consent before treatment
• Right to medical records and reports
• Right to second opinion
• Right to compensation for medical negligence

**Medical Negligence Solutions:**
1. **Gather Evidence**: Medical records, prescriptions, bills, witness statements
2. **Medical Opinion**: Get expert medical opinion on negligence
3. **Consumer Forum**: File complaint for deficiency in medical service
4. **Medical Council**: File complaint with State/National Medical Council
5. **Civil Suit**: For compensation beyond consumer forum limits

**Legal Remedies:**
• **Consumer Protection Act**: Medical service as 'service' under the Act
• **Indian Medical Council Act**: Professional misconduct proceedings
• **IPC Section 304A**: Criminal negligence causing death
• **Tort Law**: Civil liability for negligence

**Compensation Available:**
• Medical expenses incurred
• Loss of income due to prolonged treatment
• Pain and suffering compensation
• Punitive damages in gross negligence cases

**Consumer Forum Approach:**
• District Forum: Claims up to ₹1 crore
• State Commission: ₹1 crore to ₹10 crore
• National Commission: Above ₹10 crore
• File within 2 years of cause of action

**Medical Council Complaints:**
• Professional misconduct by doctors
• Violation of medical ethics
• Inadequate treatment standards
• Can result in suspension/cancellation of license

**Emergency Actions:**
• Preserve all medical documents
• Get treated at another hospital if needed
• File police complaint if criminal negligence suspected
• Contact patient rights groups for support

**Emergency Contacts:**
• Medical Council Helpline: State-specific numbers
• Consumer Helpline: 1915
• Patient Rights Groups: Contact local organizations`
    }

    // Education related issues
    if (
      lowerQuestion.includes("school") ||
      lowerQuestion.includes("college") ||
      lowerQuestion.includes("education") ||
      lowerQuestion.includes("admission") ||
      lowerQuestion.includes("fee") ||
      lowerQuestion.includes("student") ||
      lowerQuestion.includes("teacher") ||
      lowerQuestion.includes("exam")
    ) {
      return `**Education Rights & Legal Solutions:**

**Your Education Rights:**
• Right to Education (Article 21A) - Free and compulsory education for children 6-14 years
• Right to quality education without discrimination
• Right to safe learning environment
• Protection against ragging and harassment

**School/College Issues Solutions:**
1. **Fee Disputes**: Approach Fee Regulatory Committee
2. **Admission Issues**: File complaint with Education Department
3. **Harassment**: Report to Internal Complaints Committee
4. **Ragging**: File complaint under Anti-Ragging Act
5. **Discrimination**: Approach Human Rights Commission

**Legal Remedies:**
• **RTE Act 2009**: Free education for children 6-14 years
• **UGC Regulations**: For higher education issues
• **Consumer Protection Act**: Educational service as 'service'
• **Anti-Ragging Laws**: Criminal liability for ragging

**Fee-Related Issues:**
• Fee regulation by state committees
• Refund of excess fees charged
• Transparent fee structure requirement
• No capitation fees allowed

**Harassment/Discrimination:**
• File complaint with institution's grievance committee
• Approach State/National Commission for minorities (if applicable)
• File complaint under SC/ST Prevention of Atrocities Act (if applicable)
• Criminal complaint for serious harassment

**Examination Issues:**
• Right to fair evaluation
• Re-evaluation/re-checking facility
• Appeal against unfair practices
• Compensation for procedural lapses

**Ragging Solutions:**
• **Anti-Ragging Helpline**: 1800-180-5522
• **UGC Regulations**: Strict punishment for ragging
• **Criminal Liability**: IPC provisions for assault, harassment
• **Institutional Action**: Suspension/expulsion of students

**Emergency Contacts:**
• Anti-Ragging Helpline: 1800-180-5522
• Education Department: State-specific numbers
• UGC Grievance Portal: ugc.ac.in`
    }

    // Banking and financial issues
    if (
      lowerQuestion.includes("bank") ||
      lowerQuestion.includes("loan") ||
      lowerQuestion.includes("credit") ||
      lowerQuestion.includes("atm") ||
      lowerQuestion.includes("account") ||
      lowerQuestion.includes("money") ||
      lowerQuestion.includes("transaction") ||
      lowerQuestion.includes("insurance")
    ) {
      return `**Banking & Financial Rights - Legal Solutions:**

**Your Banking Rights:**
• Right to banking services without discrimination
• Right to transparent charges and fees
• Right to grievance redressal
• Right to compensation for deficient service
• Protection against unfair practices

**Banking Issues Solutions:**
1. **Unauthorized Transactions**: Report immediately to bank
2. **Loan Harassment**: File complaint with Banking Ombudsman
3. **Service Deficiency**: Approach Consumer Forum
4. **ATM Issues**: Report to bank and RBI if not resolved
5. **Insurance Claims**: File complaint with Insurance Ombudsman

**Legal Remedies:**
• **Banking Ombudsman Scheme**: Free grievance redressal
• **Consumer Protection Act**: Banking as 'service'
• **RBI Guidelines**: Various customer protection measures
• **SARFAESI Act**: For loan recovery issues

**Loan Recovery Harassment:**
• **RBI Guidelines**: Prohibit harassment by recovery agents
• **Police Complaint**: If physical threats or violence
• **Banking Ombudsman**: For unfair recovery practices
• **Consumer Forum**: For mental harassment compensation

**ATM/Card Fraud:**
• **Zero Liability**: For unauthorized transactions if reported within 3 days
• **Limited Liability**: ₹10,000 if reported within 4-7 days
• **Chargeback**: For disputed transactions
• **Police Complaint**: For card cloning/skimming

**Insurance Claim Disputes:**
• **Insurance Ombudsman**: Free dispute resolution
• **IRDAI Complaints**: Online portal for insurance complaints
• **Consumer Forum**: For claim rejection disputes
• **Civil Suit**: For large claim amounts

**Compensation Available:**
• Refund of wrongly debited amounts
• Interest on delayed refunds
• Compensation for mental harassment
• Punitive damages for gross negligence

**Emergency Contacts:**
• Banking Ombudsman: 14448
• RBI Complaint Portal: rbi.org.in
• Insurance Ombudsman: State-specific numbers
• Cyber Crime Helpline: 1930 (for online fraud)`
    }

    // Default comprehensive response for any other situation
    return `**Legal Guidance for Your Situation:**

Based on your query, here's how Indian law can help you:

**Immediate Steps:**
1. **Document Everything**: Preserve all evidence, communications, receipts, photos
2. **Legal Notice**: Send a formal legal notice to the other party
3. **Police Complaint**: If criminal elements involved, file FIR immediately
4. **Seek Legal Advice**: Consult a lawyer for specific guidance

**Your Fundamental Rights (Always Applicable):**
• **Article 14**: Right to equality before law
• **Article 19**: Freedom of speech, expression, movement, profession
• **Article 21**: Right to life and personal liberty
• **Article 32**: Right to constitutional remedies

**Legal Remedies Available:**
• **Civil Suit**: For monetary compensation and damages
• **Criminal Complaint**: If any criminal offense involved
• **Consumer Forum**: If service deficiency involved
• **Writ Petition**: If fundamental rights violated
• **Arbitration**: For contractual disputes

**Specialized Forums:**
• **Human Rights Commission**: For human rights violations
• **Women's Commission**: For women-related issues
• **SC/ST Commission**: For caste-based discrimination
• **Minority Commission**: For minority rights issues

**Compensation You Can Claim:**
• Actual financial losses incurred
• Mental agony and harassment compensation
• Punitive damages for gross negligence
• Interest on delayed payments
• Legal costs and expenses

**Time Limitations:**
• Most civil suits: 3 years from cause of action
• Consumer complaints: 2 years from cause of action
• Criminal complaints: No limitation for serious offenses
• Service matters: 1 year from cause of action

**Free Legal Aid:**
• **Legal Services Authority**: Free legal representation for eligible persons
• **Lok Adalat**: Free mediation and settlement
• **Legal Aid Clinics**: Available in most districts

**Emergency Contacts:**
• Police: 100
• Women Helpline: 181
• Legal Aid: Contact District Legal Services Authority
• Human Rights Commission: 011-23385368

**Next Steps:**
Please provide more specific details about your situation for targeted legal advice and remedies under Indian law.`
  }

  const handleQuickQuestion = (question) => {
    setInput(question)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <Card className="h-[80vh] flex flex-col dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Bot className="h-6 w-6" />
                AI Legal Assistant
                <Badge variant="secondary" className="ml-auto bg-white/20 text-white">
                  Beta
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === "user"
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border dark:border-gray-600"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.type === "bot" && (
                            <Bot className="h-4 w-4 mt-0.5 text-purple-600 dark:text-purple-400" />
                          )}
                          {message.type === "user" && <User className="h-4 w-4 mt-0.5" />}
                          <div className="flex-1">
                            <div className="text-sm whitespace-pre-line">{message.content}</div>
                            <p
                              className={`text-xs mt-1 ${
                                message.type === "user" ? "text-purple-100" : "text-gray-500 dark:text-gray-400"
                              }`}
                            >
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 border dark:border-gray-600">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Quick Questions */}
              <div className="p-4 border-t bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Quick questions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickQuestions.map((q, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion(q.text)}
                      className="justify-start text-left h-auto p-2 dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                      <q.icon className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                      <div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{q.category}</div>
                        <div className="text-sm">{q.text}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t dark:border-gray-700">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Describe your situation and I'll provide legal solutions based on Indian laws..."
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
      </div>
    </div>
  )
}
