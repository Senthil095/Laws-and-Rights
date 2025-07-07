"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Bot, User, Send, Scale, Loader2, BookOpen, Gavel, Shield, AlertCircle } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  category?: string
}

const quickQuestions = [
  "What are my fundamental rights?",
  "Police stopped me without reason",
  "My employer is not paying overtime",
  "Domestic violence - what can I do?",
  "Consumer rights for defective products",
  "How to file RTI application?",
  "Property rights in India",
  "What to do if arrested?",
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content:
        "🙏 **Namaste! Welcome to your AI Legal Assistant**\n\nI'm here to help you understand Indian laws and your constitutional rights. I have comprehensive knowledge about:\n\n**📜 Constitutional Rights**\n• Fundamental Rights (Articles 12-35)\n• Directive Principles of State Policy\n• Constitutional Remedies\n\n**⚖️ Criminal Laws**\n• Indian Penal Code (IPC)\n• Code of Criminal Procedure (CrPC)\n• Evidence Act\n\n**🏛️ Civil Rights & Laws**\n• Civil Procedure Code\n• Contract Act\n• Property Laws\n\n**👥 Social Laws**\n• Labour Laws\n• Consumer Protection\n• Women's Rights\n• Child Protection\n\n**🏢 Administrative Laws**\n• Right to Information (RTI)\n• Service Laws\n• Taxation Laws\n\nYou can describe your legal situation in Hindi or English, and I'll provide relevant guidance based on Indian laws. What would you like to know?",
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
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const message = userMessage.toLowerCase()

    // Fundamental Rights
    if (
      message.includes("fundamental right") ||
      message.includes("constitutional right") ||
      message.includes("article") ||
      message.includes("basic rights")
    ) {
      return `**🇮🇳 Fundamental Rights under Indian Constitution**

**Article 14-18: Right to Equality**
• **Article 14:** Equality before law and equal protection of laws
• **Article 15:** Prohibition of discrimination on grounds of religion, race, caste, sex, place of birth
• **Article 16:** Equality of opportunity in public employment
• **Article 17:** Abolition of untouchability (Practice punishable under law)
• **Article 18:** Abolition of titles (except military and academic)

**Article 19-22: Right to Freedom**
• **Article 19(1)(a):** Freedom of speech and expression
• **Article 19(1)(b):** Freedom to assemble peacefully without arms
• **Article 19(1)(c):** Freedom to form associations or unions
• **Article 19(1)(d):** Freedom to move freely throughout India
• **Article 19(1)(e):** Freedom to reside and settle anywhere in India
• **Article 19(1)(g):** Freedom to practice any profession, occupation, trade or business
• **Article 20:** Protection in respect of conviction for offences
• **Article 21:** Protection of life and personal liberty
• **Article 21A:** Right to education (6-14 years)
• **Article 22:** Protection against arrest and detention

**Article 23-24: Right against Exploitation**
• **Article 23:** Prohibition of traffic in human beings and forced labour
• **Article 24:** Prohibition of employment of children below 14 years in hazardous work

**Article 25-28: Right to Freedom of Religion**
• **Article 25:** Freedom of conscience and free profession, practice and propagation of religion
• **Article 26:** Freedom to manage religious affairs
• **Article 27:** Freedom from payment of taxes for promotion of any religion
• **Article 28:** Freedom from religious instruction in state-funded institutions

**Article 29-30: Cultural and Educational Rights**
• **Article 29:** Protection of language, script and culture of minorities
• **Article 30:** Right of minorities to establish and administer educational institutions

**Article 32: Right to Constitutional Remedies**
• Known as "Heart and Soul" of Constitution
• Right to directly approach Supreme Court
• Supreme Court can issue writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto

**⚖️ Legal Remedies:**
• **Supreme Court:** Article 32 (Direct approach for fundamental rights)
• **High Court:** Article 226 (Broader writ jurisdiction)
• **District Court:** For civil and criminal matters
• **Human Rights Commission:** For human rights violations

**📞 Emergency Contacts:**
• **Supreme Court Legal Aid:** 011-23388922
• **National Human Rights Commission:** 011-23385368
• **Women Helpline:** 181`
    }

    // Police Rights
    if (
      message.includes("police") ||
      message.includes("arrest") ||
      message.includes("detention") ||
      message.includes("stopped") ||
      message.includes("checking")
    ) {
      return `**👮‍♂️ Your Rights During Police Encounters**

**🛡️ Fundamental Rights During Police Interaction:**

**Right to Know (Article 22 & Section 50 CrPC):**
• Police MUST inform you of grounds for checking/arrest
• You have right to know specific charges
• Police cannot detain without stating reason
• Right to know arresting officer's name and designation

**📋 Document Checking Rights:**
• Police can check documents only with "reasonable suspicion"
• Cannot randomly check without valid reason
• You can ask "What is the reasonable suspicion?"
• If no valid reason, you can refuse and file complaint

**🚫 During Arrest - Your Rights:**
• **Right to Remain Silent:** Anything you say can be used against you
• **Right to Legal Representation:** Lawyer can be present during questioning
• **Right to Inform Family/Friends:** Police must allow you to inform someone
• **Right to Medical Examination:** If injured during arrest
• **Right to be Produced Before Magistrate:** Within 24 hours of arrest

**⚖️ Police Powers & Limitations:**

**What Police CAN Do:**
• Arrest without warrant for cognizable offenses (murder, theft, rape, etc.)
• Check documents with reasonable suspicion
• Search with warrant or in specific circumstances
• Investigate cognizable offenses

**What Police CANNOT Do:**
• Arrest without warrant for non-cognizable offenses
• Demand bribes (Report immediately)
• Use third-degree torture
• Detain beyond 24 hours without magistrate's order
• Enter house without warrant (except specific situations)
• Arrest women after sunset and before sunrise (except with female officer)

**📜 Important Legal Sections:**
• **Section 41 CrPC:** When police can arrest without warrant
• **Section 41A CrPC:** Notice of appearance before arrest
• **Section 50 CrPC:** Person arrested to be informed of grounds
• **Section 56 CrPC:** Person arrested to be taken before magistrate within 24 hours
• **Section 57 CrPC:** No detention beyond 24 hours without magistrate's order
• **Section 166 IPC:** Public servant disobeying law (punishment for police)

**🚨 If Police Misbehaves:**
• **File FIR:** Against police officer at another police station
• **Complaint to SP/Commissioner:** Senior police officer
• **Human Rights Commission:** State/National level
• **Court Complaint:** Directly to magistrate
• **Online Complaint:** State police websites

**📞 Emergency Contacts:**
• **Police Control Room:** 100
• **Women Helpline:** 181
• **Senior Citizen Helpline:** 14567
• **Child Helpline:** 1098

**💡 Pro Tips:**
• Always ask for police officer's ID
• Note down badge number and vehicle number
• If possible, record interaction (legal in public places)
• Stay calm and polite but know your rights`
    }

    // Domestic Violence
    if (
      message.includes("domestic violence") ||
      message.includes("wife") ||
      message.includes("husband") ||
      message.includes("family violence") ||
      message.includes("dowry") ||
      message.includes("498a")
    ) {
      return `**🏠 Protection from Domestic Violence - Complete Guide**

**📜 Protection of Women from Domestic Violence Act, 2005**

**🚨 What Constitutes Domestic Violence:**
• **Physical Abuse:** Hitting, slapping, pushing, burning, causing bodily harm
• **Sexual Abuse:** Forced sexual acts, marital rape
• **Verbal/Emotional Abuse:** Threats, insults, humiliation
• **Economic Abuse:** Denying money, property, basic necessities
• **Psychological Abuse:** Isolation, stalking, intimidation

**👥 Who Can File Complaint:**
• Wife, live-in partner, sister, mother, daughter
• Any woman in domestic relationship
• Any person on behalf of victim (with consent)
• Protection Officer
• Service Provider

**⚖️ Legal Remedies Available:**

**1. Protection Order:**
• Restrains abuser from committing violence
• Prohibits entry into victim's residence/workplace
• Prohibits communication with victim

**2. Residence Order:**
• Right to live in shared household
• Cannot be evicted by abuser
• Alternative accommodation if needed

**3. Monetary Relief:**
• Maintenance for victim and children
• Compensation for injuries and losses
• Medical expenses
• Loss of earnings

**4. Custody Order:**
• Temporary custody of children
• Visitation rights
• Child support

**🏛️ Where to File Complaint:**
• **Magistrate Court:** Direct complaint
• **Protection Officer:** Every district has one
• **Police Station:** Can file FIR
• **Service Provider:** NGOs, counselors

**📋 Documents Required:**
• Identity proof
• Marriage certificate
• Medical reports (if injured)
• Photos of injuries
• Witnesses statements
• Property documents

**⚡ Immediate Steps:**
1. **Ensure Safety:** Move to safe place if possible
2. **Medical Treatment:** Get injuries documented
3. **File Complaint:** Don't delay
4. **Collect Evidence:** Photos, witnesses, documents
5. **Seek Support:** Family, friends, NGOs

**📜 Related Criminal Laws:**
• **Section 498A IPC:** Cruelty by husband/relatives (3 years imprisonment)
• **Section 406 IPC:** Criminal breach of trust
• **Section 323 IPC:** Voluntarily causing hurt
• **Section 506 IPC:** Criminal intimidation
• **Dowry Prohibition Act, 1961**

**🆘 Support Services:**
• **One Stop Centres:** Integrated services for women
• **Mahila Police Stations:** Women-friendly police stations
• **Legal Aid Services:** Free legal assistance
• **Counselling Services:** Psychological support
• **Shelter Homes:** Temporary accommodation

**📞 Emergency Helplines:**
• **Women Helpline:** 181 (24x7)
• **Police Emergency:** 100
• **Domestic Violence Helpline:** 181
• **Legal Aid Helpline:** Contact District Legal Services Authority

**💡 Important Points:**
• Complaint can be filed even after separation/divorce
• No need to prove physical violence for other forms of abuse
• Maintenance can be claimed even if living separately
• Children's welfare is paramount in custody matters
• Free legal aid available for women

**🏥 Medical & Psychological Support:**
• Government hospitals provide free treatment
• Medical reports crucial for legal proceedings
• Counselling services available at family courts
• Psychiatric evaluation if needed`
    }

    // Labour Rights
    if (
      message.includes("work") ||
      message.includes("job") ||
      message.includes("employer") ||
      message.includes("salary") ||
      message.includes("overtime") ||
      message.includes("labour") ||
      message.includes("employee")
    ) {
      return `**👷‍♂️ Labour Rights in India - Comprehensive Guide**

**⏰ Working Hours & Overtime (Factories Act 1948)**
• **Maximum Working Hours:** 9 hours per day, 48 hours per week
• **Overtime Payment:** Double the ordinary rate for extra hours
• **Weekly Holiday:** Mandatory one day off per week
• **Rest Intervals:** Cannot work more than 5 hours without 30-minute break
• **Night Shift:** Additional allowances for night work

**💰 Minimum Wages Act 1948**
• **Right to Minimum Wages:** As notified by Central/State Government
• **Payment Timeline:** Wages must be paid by 7th of next month
• **Overtime Wages:** 2x normal rate for extra hours
• **No Arbitrary Deductions:** Only legal deductions allowed

**📋 Payment of Wages Act 1936**
• **Payment Method:** Must be in legal tender (cash/bank transfer)
• **Deductions:** Only authorized deductions (PF, ESI, Income Tax)
• **Delay Penalty:** Employer liable for compensation if wages delayed
• **Wage Slip:** Mandatory to provide detailed wage statement

**🛡️ Sexual Harassment Prevention (POSH Act 2013)**
• **Internal Complaints Committee:** Mandatory in workplaces with 10+ employees
• **Right to File Complaint:** Against sexual harassment
• **Protection from Retaliation:** Cannot be victimized for complaint
• **Inquiry Process:** Time-bound inquiry within 90 days

**📜 Contract Labour (Regulation & Abolition) Act 1970**
• **Equal Treatment:** Contract workers entitled to same facilities as permanent workers
• **Welfare Measures:** Canteen, rest rooms, first aid facilities
• **Registration:** Principal employer must register establishment
• **License:** Contractors must obtain license

**🏭 Industrial Relations**
• **Right to Form Trade Unions:** Industrial Disputes Act 1947
• **Collective Bargaining:** Right to negotiate wages and conditions
• **Right to Strike:** With proper notice and procedures
• **Grievance Redressal:** Internal mechanisms mandatory

**👩‍💼 Women-Specific Labour Rights**
• **Maternity Benefit Act 2017:** 26 weeks paid maternity leave
• **Equal Remuneration Act 1976:** Equal pay for equal work
• **Night Shift:** Special provisions for women's safety
• **Creche Facilities:** For establishments with 50+ women employees

**🔒 Social Security Benefits**
• **Provident Fund (PF):** 12% of basic salary
• **Employee State Insurance (ESI):** Medical benefits
• **Gratuity:** After 5 years of continuous service
• **Bonus:** Annual bonus as per Payment of Bonus Act

**⚖️ Complaint Mechanisms**

**Labour Department:**
• **Labour Commissioner:** State-level complaints
• **Assistant Labour Commissioner:** District-level
• **Labour Inspector:** Workplace inspections

**Industrial Tribunals:**
• **Labour Court:** Individual disputes
• **Industrial Tribunal:** Collective disputes
• **National Industrial Tribunal:** Inter-state disputes

**Online Portals:**
• **Shram Suvidha Portal:** shramsuvidha.gov.in
• **EPFO Portal:** epfindia.gov.in
• **ESIC Portal:** esic.nic.in

**🚨 Common Violations & Remedies**

**Non-Payment of Wages:**
• File complaint with Labour Commissioner
• Approach Labour Court
• Criminal complaint under Payment of Wages Act

**Excessive Working Hours:**
• Complaint to Factory Inspector
• Labour Department action
• Compensation for overtime

**Wrongful Termination:**
• Industrial Dispute under ID Act
• Reinstatement or compensation
• Notice pay and severance benefits

**📞 Helplines:**
• **Central Labour Helpline:** 1800-11-1234
• **Shram Suvidha Helpline:** 1800-11-0001
• **EPFO Helpline:** 1800-11-8005
• **ESIC Helpline:** 1800-11-2526

**💡 Key Tips:**
• Keep all employment documents safe
• Maintain record of working hours
• Know your salary breakup
• Join recognized trade unions
• Report violations promptly`
    }

    // Consumer Rights
    if (
      message.includes("consumer") ||
      message.includes("product") ||
      message.includes("service") ||
      message.includes("defective") ||
      message.includes("refund") ||
      message.includes("shopping")
    ) {
      return `**🛒 Consumer Protection Act 2019 - Complete Guide**

**🛡️ Six Fundamental Consumer Rights**

**1. Right to Safety**
• Protection from goods/services hazardous to life and health
• Quality standards and safety norms
• Recall of dangerous products

**2. Right to Information**
• Complete product information before purchase
• Price, quality, quantity, purity, standard and potency
• Manufacturing date, expiry date, ingredients

**3. Right to Choose**
• Access to variety of goods and services at competitive prices
• No monopolistic practices
• Freedom to select products/services

**4. Right to be Heard**
• Voice complaints and grievances
• Assured fair treatment and consideration
• Representation in consumer forums

**5. Right to Seek Redressal**
• Compensation for defective goods/services
• Replacement, refund, or repair
• Damages for loss and injury

**6. Right to Consumer Education**
• Knowledge about consumer rights and remedies
• Awareness about market practices
• Information about legal procedures

**⚖️ Consumer Forums Hierarchy**

**District Consumer Disputes Redressal Commission**
• **Jurisdiction:** Claims up to ₹1 crore
• **Composition:** President + 2 members
• **Appeal:** To State Commission within 45 days

**State Consumer Disputes Redressal Commission**
• **Jurisdiction:** ₹1 crore to ₹10 crore
• **Original Jurisdiction:** Above ₹1 crore
• **Appellate Jurisdiction:** Appeals from District Commission

**National Consumer Disputes Redressal Commission**
• **Jurisdiction:** Above ₹10 crore
• **Original Jurisdiction:** Above ₹10 crore
• **Appellate Jurisdiction:** Appeals from State Commission

**📋 What You Can Complain About**

**Defective Goods:**
• Manufacturing defects
• Design defects
• Packaging defects
• Expiry date issues

**Deficient Services:**
• Poor quality services
• Delay in service delivery
• Overcharging
• Denial of service

**Unfair Trade Practices:**
• False advertisements
• Misleading information
• Bait and switch tactics
• Pyramid schemes

**Restrictive Trade Practices:**
• Price manipulation
• Market monopolization
• Supply restrictions

**🖥️ E-commerce Consumer Rights**

**Online Shopping Protection:**
• Right to return within specified period
• Right to refund if not satisfied
• Protection from fake reviews
• Liability of marketplace for defective products

**Digital Payment Security:**
• Protection from unauthorized transactions
• Chargeback rights
• Dispute resolution mechanisms

**📝 How to File Consumer Complaint**

**Online Filing:**
• **National Portal:** edaakhil.nic.in
• **State Portals:** Available for most states
• **Upload Documents:** Digitally submit evidence

**Offline Filing:**
• Visit nearest Consumer Forum
• Submit complaint with required documents
• Pay prescribed fee (if applicable)

**📋 Required Documents:**
• Purchase receipt/invoice
• Warranty/guarantee card
• Correspondence with seller/manufacturer
• Medical reports (if applicable)
• Photos/videos of defective product

**💰 Fees Structure:**
• **Up to ₹5 lakh:** No fee
• **₹5 lakh to ₹20 lakh:** ₹200
• **₹20 lakh to ₹1 crore:** ₹400
• **Above ₹1 crore:** ₹5,000

**⚡ Reliefs Available**

**Monetary Relief:**
• Refund of amount paid
• Compensation for loss/injury
• Punitive damages
• Cost of litigation

**Non-Monetary Relief:**
• Replacement of defective goods
• Repair of defective goods
• Removal of defects in services
• Discontinuation of unfair practices

**🏥 Medical Negligence**
• Covered under Consumer Protection Act
• Compensation for medical negligence
• Deficiency in medical services
• Right to proper treatment

**📞 Consumer Helplines:**
• **National Consumer Helpline:** 1915 (Toll-free)
• **SMS:** 8130009809
• **WhatsApp:** 8130009809
• **Email:** complaints@consumerhelpline.gov.in

**💡 Tips for Effective Complaint:**
• Keep all purchase documents safe
• Take photos/videos of defective products
• Communicate in writing with seller/manufacturer
• File complaint within limitation period (2 years)
• Seek legal advice for complex cases`
    }

    // Property Rights
    if (
      message.includes("property") ||
      message.includes("land") ||
      message.includes("house") ||
      message.includes("rent") ||
      message.includes("tenant") ||
      message.includes("landlord")
    ) {
      return `**🏠 Property Rights in India - Comprehensive Guide**

**🏛️ Constitutional Framework**
• **Article 300A:** Right to property is a legal right
• **No Deprivation:** Except by authority of law
• **Compensation:** For acquisition by state
• **Due Process:** Legal procedures must be followed

**📜 Types of Property Rights**

**1. Ownership Rights**
• **Absolute Ownership:** Complete control over property
• **Conditional Ownership:** Subject to certain conditions
• **Joint Ownership:** Multiple owners with defined shares

**2. Possession Rights**
• **Actual Possession:** Physical control
• **Constructive Possession:** Legal control without physical presence
• **Adverse Possession:** 12 years continuous possession

**3. Transfer Rights**
• **Sale:** Permanent transfer for consideration
• **Gift:** Transfer without consideration
• **Lease:** Temporary transfer of possession
• **Mortgage:** Transfer as security for loan

**🏘️ Tenant-Landlord Rights**

**Tenant Rights (Rent Control Acts):**
• **Right to Fair Rent:** As per rent control laws
• **Protection from Arbitrary Eviction:** Valid grounds required
• **Right to Basic Amenities:** Water, electricity, sanitation
• **Right to Privacy:** Landlord cannot enter without notice
• **Right to Subletting:** If permitted in agreement

**Landlord Rights:**
• **Right to Receive Rent:** Timely payment as agreed
• **Right to Evict:** For non-payment, misuse, or personal necessity
• **Right to Inspect:** With reasonable notice
• **Right to Increase Rent:** As per rent control laws
• **Right to Recover Possession:** After lease expiry

**Grounds for Eviction:**
• **Non-payment of Rent:** After proper notice
• **Subletting without Permission:** Unauthorized subletting
• **Damage to Property:** Willful damage or misuse
• **Personal Necessity:** Landlord's genuine need
• **Reconstruction:** Building renovation/reconstruction

**👩‍⚖️ Women's Property Rights**

**Hindu Succession Act 2005:**
• **Equal Inheritance Rights:** Daughters have equal rights as sons
• **Ancestral Property:** Right by birth, not by father's will
• **Self-Acquired Property:** Father can will as per choice
• **Coparcenary Rights:** Women are coparceners by birth

**Muslim Personal Law:**
• **Inheritance Rights:** As per Shariat law
• **Dower Rights (Mahr):** Wife's right to dower amount
• **Maintenance Rights:** Right to maintenance from husband

**Christian/Parsi Laws:**
• **Indian Succession Act 1925:** Governs inheritance
• **Equal Rights:** Generally equal inheritance rights

**🏡 Property Purchase Rights**

**Due Diligence Rights:**
• **Clear Title:** Right to verify ownership
• **Encumbrance Certificate:** Check for loans/disputes
• **Approved Plans:** Building as per sanctioned plans
• **Possession Certificate:** Legal possession documents

**Registration Rights:**
• **Mandatory Registration:** Under Registration Act 1908
• **Stamp Duty Payment:** As per state rates
• **Document Execution:** Proper execution of sale deed
• **Mutation:** Transfer in revenue records

**📋 Essential Documents**

**For Purchase:**
• **Sale Deed:** Primary ownership document
• **Title Deed:** Chain of ownership
• **Encumbrance Certificate:** Last 30 years transactions
• **Property Tax Receipts:** Updated tax payments
• **Approved Building Plan:** Municipal approval
• **Completion Certificate:** For new constructions
• **NOC:** From relevant authorities

**For Rental:**
• **Rent Agreement:** Terms and conditions
• **Police Verification:** Tenant verification
• **Security Deposit Receipt:** Advance payment proof

**⚖️ Property Dispute Resolution**

**Civil Courts:**
• **Suit for Declaration:** Ownership disputes
• **Suit for Possession:** Recovery of property
• **Suit for Partition:** Division of joint property
• **Suit for Injunction:** Prevent illegal acts

**Revenue Courts:**
• **Mutation Disputes:** Revenue record corrections
• **Land Revenue Matters:** Agricultural land disputes
• **Survey Settlement:** Boundary disputes

**Alternative Dispute Resolution:**
• **Lok Adalats:** Quick and cost-effective
• **Arbitration:** Private dispute resolution
• **Mediation:** Mutual settlement with mediator
• **Conciliation:** Assisted negotiation

**🏛️ Government Acquisition**

**Land Acquisition Act 2013:**
• **Public Purpose:** Only for public projects
• **Consent:** 70% for PPP, 80% for private projects
• **Compensation:** 4 times market value (rural), 2 times (urban)
• **Rehabilitation:** Resettlement and rehabilitation package
• **Social Impact Assessment:** Mandatory for large projects

**📞 Helplines & Resources:**
• **District Collector Office:** Land acquisition matters
• **Sub-Registrar Office:** Registration issues
• **Municipal Corporation:** Building approvals
• **Revenue Department:** Land records
• **Consumer Forums:** Builder disputes

**💡 Property Investment Tips:**
• Verify all documents before purchase
• Check for pending litigation
• Ensure proper registration
• Get property insurance
• Maintain all payment records
• Consult legal experts for complex transactions`
    }

    // RTI and Government Information
    if (
      message.includes("rti") ||
      message.includes("information") ||
      message.includes("government") ||
      message.includes("transparency") ||
      message.includes("right to information")
    ) {
      return `**📋 Right to Information Act 2005 - Complete Guide**

**🏛️ What is RTI?**
• **Fundamental Right:** Part of Article 19(1)(a) - Freedom of Speech and Expression
• **Transparency Tool:** Promotes government accountability
• **Citizen Empowerment:** Access to government information
• **Democratic Right:** Strengthens democratic governance

**👥 Who Can Apply?**
• **Any Indian Citizen:** No age restriction
• **No Reason Required:** Don't need to justify why you want information
• **Multiple Applications:** Can file multiple RTIs
• **Representative:** Can authorize someone to file on your behalf

**🏢 Coverage of RTI Act**

**Covered Authorities:**
• **Central Government:** All ministries and departments
• **State Governments:** All state departments
• **Local Bodies:** Panchayats, municipalities, corporations
• **Public Sector Undertakings:** PSUs, banks, corporations
• **NGOs:** Substantially funded by government
• **Private Bodies:** If substantially financed by government

**📋 Information You Can Seek**

**Government Operations:**
• **Policies and Decisions:** Government policies, cabinet decisions
• **Budget and Expenditure:** How public money is spent
• **Selection Criteria:** Government job selections, admissions
• **Scheme Details:** Government welfare schemes
• **File Notings:** Internal government communications
• **Contracts and Tenders:** Government procurement details

**Personal Information:**
• **Your Government Records:** Service records, pension details
• **Application Status:** Status of your applications
• **Exam Results:** Detailed marks, evaluation process
• **Medical Records:** From government hospitals

**🚫 Exempted Information (Section 8)**

**National Security:**
• Information affecting sovereignty and integrity
• Strategic, scientific, or economic interests
• Foreign relations information

**Personal Privacy:**
• Personal information of third parties
• Medical records of others
• Educational records of others

**Other Exemptions:**
• Cabinet papers (except after decision implementation)
• Trade secrets and commercial confidence
• Information given in confidence by foreign governments
• Investigation records that may impede the process

**📝 How to File RTI Application**

**Online Filing:**
• **Central Government:** rtionline.gov.in
• **State Governments:** Respective state RTI portals
• **Upload Documents:** Scan and upload required documents

**Offline Filing:**
• **Write Application:** In plain paper or prescribed format
• **Address to PIO:** Public Information Officer of concerned department
• **Submit in Person:** Or send by post/speed post
• **Get Acknowledgment:** With unique application number

**💰 Fees Structure**

**Application Fee:**
• **Central Government:** ₹10 per application
• **State Governments:** ₹10 (most states)
• **BPL Card Holders:** Exempted from all fees

**Additional Fees:**
• **Photocopies:** ₹2 per page (A4 size)
• **Larger Size Copies:** Actual cost
• **Diskette/Floppy:** ₹50 per diskette
• **CD/DVD:** ₹50 per CD/DVD
• **Inspection:** First hour free, ₹5 per additional hour

**⏰ Time Limits**

**Normal Information:**
• **30 Days:** From receipt of application
• **48 Hours:** For life and liberty matters
• **Additional 30 Days:** If third party is involved

**Appeal Time Limits:**
• **First Appeal:** Within 30 days of reply/non-reply
• **Second Appeal:** Within 90 days of first appeal reply

**📞 Appeal Process**

**First Appeal:**
• **To:** First Appellate Authority (usually senior officer)
• **Time Limit:** 30 days from unsatisfactory reply
• **Fee:** No fee for first appeal
• **Decision:** Within 30 days

**Second Appeal:**
• **To:** State/Central Information Commission
• **Time Limit:** 90 days from first appeal reply
• **Fee:** No fee for second appeal
• **Decision:** Usually within 6 months

**⚖️ Powers of Information Commission**

**Penalties for Officials:**
• **Daily Penalty:** ₹250 per day for delay (maximum ₹25,000)
• **Disciplinary Action:** Recommendation for punishment
• **Service Matters:** Can affect promotions and increments

**Orders Commission Can Pass:**
• **Provide Information:** Direct PIO to provide information
• **Impose Penalty:** On errant officials
• **Compensation:** To applicant for harassment
• **Transfer:** Recommend transfer of non-compliant officers

**📋 Sample RTI Application Format**

**To,**
**The Public Information Officer,**
**[Department Name],**
**[Address]**

**Subject:** Application under Right to Information Act, 2005

**Sir/Madam,**

**I would like to obtain the following information under RTI Act 2005:**

**1.** [Specific information required]
**2.** [Additional information if needed]

**I am enclosing ₹10 as application fee by [mode of payment].**

**If any additional fee is required, please inform me in advance.**

**Yours faithfully,**
**[Your Name]**
**[Address]**
**[Phone Number]**
**[Date]**

**💡 Tips for Effective RTI**

**Application Tips:**
• Be specific in your questions
• Avoid asking for opinions or interpretations
• Ask for certified copies if needed
• Mention if you want inspection of documents
• Keep copy of application and acknowledgment

**Follow-up:**
• Track your application status
• File first appeal if no reply in 30 days
• Approach Information Commission if needed
• Use RTI to monitor government functioning

**📞 Contact Information:**
• **Central Information Commission:** 011-23052919
• **State Information Commissions:** Contact respective state commissions
• **RTI Helpline:** Many states have dedicated helplines

**🌐 Useful Websites:**
• **Central RTI Portal:** rtionline.gov.in
• **CIC Website:** cic.gov.in
• **State RTI Portals:** Available for most states`
    }

    // Criminal Law and FIR
    if (
      message.includes("crime") ||
      message.includes("theft") ||
      message.includes("fraud") ||
      message.includes("fir") ||
      message.includes("complaint") ||
      message.includes("criminal")
    ) {
      return `**⚖️ Criminal Law Rights & Procedures - Complete Guide**

**🚨 Right to File FIR (First Information Report)**

**What is FIR:**
• **First Information Report:** First information about cognizable offense
• **Legal Document:** Starts criminal investigation process
• **Constitutional Right:** Police cannot refuse to register FIR
• **Free Copy:** Must be provided to complainant

**When to File FIR:**
• **Cognizable Offenses:** Police can arrest without warrant
• **Serious Crimes:** Murder, rape, theft, robbery, fraud
• **Immediate Action Required:** When quick police action needed

**📋 How to File FIR**

**At Police Station:**
• **Oral Complaint:** Can give oral information
• **Written Complaint:** Police will write down your statement
• **Read and Sign:** Verify FIR content before signing
• **Get Copy:** Free copy of FIR is your right

**Online FIR:**
• **State Portals:** Many states allow online FIR filing
• **Non-Serious Offenses:** Usually for theft, lost documents
• **Follow-up Required:** May need to visit police station

**If Police Refuses:**
• **Approach SP/Commissioner:** Senior police officer
• **Written Complaint:** Submit written application
• **Court Complaint:** Directly approach magistrate
• **Online Complaint:** Use state police grievance portals

**📜 Types of Criminal Offenses**

**Cognizable vs Non-Cognizable:**
• **Cognizable:** Police can arrest without warrant (murder, theft, rape)
• **Non-Cognizable:** Police need warrant to arrest (defamation, simple hurt)

**Bailable vs Non-Bailable:**
• **Bailable:** Accused can get bail as matter of right
• **Non-Bailable:** Bail at court's discretion

**🏛️ Important Criminal Law Sections**

**Indian Penal Code (IPC) - Major Sections:**
• **Section 302:** Murder (Death penalty or life imprisonment)
• **Section 376:** Rape (7 years to life imprisonment)
• **Section 420:** Cheating (Up to 7 years + fine)
• **Section 379:** Theft (Up to 3 years + fine)
• **Section 323:** Voluntarily causing hurt (1 year + fine)
• **Section 504:** Intentional insult (2 years + fine)
• **Section 506:** Criminal intimidation (2 years + fine)
• **Section 498A:** Cruelty by husband/relatives (3 years + fine)

**Code of Criminal Procedure (CrPC) - Key Sections:**
• **Section 154:** Registration of FIR
• **Section 161:** Police power to examine witnesses
• **Section 41:** When police can arrest without warrant
• **Section 50:** Rights of arrested person
• **Section 167:** Remand procedures

**🛡️ Victim Rights in Criminal Cases**

**During Investigation:**
• **Right to Information:** About case progress
• **Right to Legal Aid:** Free lawyer if poor
• **Right to Speedy Trial:** Case should not drag unnecessarily
• **Right to Compensation:** From state victim compensation scheme

**During Trial:**
• **Right to be Present:** During court proceedings
• **Right to Legal Representation:** Engage lawyer or get free legal aid
• **Right to Cross-Examine:** Accused and witnesses
• **Right to Appeal:** Against acquittal or inadequate sentence

**Special Provisions:**
• **In-Camera Trial:** For sensitive cases (rape, child abuse)
• **Identity Protection:** Name not disclosed in certain cases
• **Victim Impact Statement:** Right to tell court about impact of crime

**💻 Cyber Crimes (Information Technology Act 2000)**

**Common Cyber Offenses:**
• **Section 66:** Computer-related offenses (hacking, virus attacks)
• **Section 66A:** Offensive messages (struck down by Supreme Court)
• **Section 66B:** Dishonestly receiving stolen computer resource
• **Section 66C:** Identity theft
• **Section 66D:** Cheating by personation using computer
• **Section 67:** Publishing obscene material in electronic form
• **Section 67A:** Publishing sexually explicit material
• **Section 67B:** Child pornography

**How to Report Cyber Crime:**
• **Cyber Crime Portal:** cybercrime.gov.in
• **Local Police:** Cyber crime cell
• **National Helpline:** 1930
• **Email:** Report at cybercrime@gov.in

**🔒 Bail Rights**

**Types of Bail:**
• **Regular Bail:** After arrest and charge sheet filing
• **Anticipatory Bail:** Before arrest (Section 438 CrPC)
• **Interim Bail:** Temporary bail for specific period
• **Default Bail:** If charge sheet not filed within 60/90 days

**Bail Conditions:**
• **Personal Bond:** Promise to appear in court
• **Surety:** Someone to guarantee your appearance
• **Passport Surrender:** In serious cases
• **Regular Reporting:** To police station

**When Bail Can Be Denied:**
• **Serious Offenses:** Murder, rape, terrorism
• **Flight Risk:** Likely to abscond
• **Witness Tampering:** May influence witnesses
• **Repeat Offender:** Previous criminal record

**⚖️ Legal Aid Services**

**Who Gets Free Legal Aid:**
• **Income Below ₹9,000 per month:** In Supreme Court
• **Income Below ₹25,000 per month:** In High Court
• **SC/ST/Women:** Special provisions
• **Disabled Persons:** Free legal aid
• **Children:** Mandatory legal representation

**Where to Get Legal Aid:**
• **National Legal Services Authority (NALSA):** nalsa.gov.in
• **State Legal Services Authority:** In each state
• **District Legal Services Authority:** In each district
• **Taluk Legal Services Committee:** At taluk level

**📞 Emergency Helplines:**
• **Police Emergency:** 100
• **Women Helpline:** 181
• **Child Helpline:** 1098
• **Senior Citizen Helpline:** 14567
• **Cyber Crime Helpline:** 1930
• **Tourist Helpline:** 1363

**💡 Important Tips:**
• **Preserve Evidence:** Don't disturb crime scene
• **Medical Examination:** Get injuries documented
• **Witness Details:** Collect witness information
• **Document Everything:** Keep records of all interactions
• **Legal Advice:** Consult lawyer for serious cases
• **Know Your Rights:** Don't let police violate your rights

**🏥 Medical-Legal Cases:**
• **Medico-Legal Certificate:** For injuries
• **Post-Mortem:** In case of unnatural death
• **DNA Testing:** For identification and evidence
• **Forensic Evidence:** Scientific investigation methods

This comprehensive guide covers your rights and procedures in criminal matters. Remember, the law is there to protect you - know your rights and use them wisely!`
    }

    // Default comprehensive response
    return `**🔍 Legal Guidance for: "${userMessage}"**

Based on your query, here's relevant information about Indian laws and your rights:

**📜 Constitutional Framework:**
• **Fundamental Rights:** Articles 12-35 of Indian Constitution
• **Directive Principles:** Articles 36-51 guide state policy
• **Fundamental Duties:** Articles 51A outlines citizen duties

**⚖️ Legal System Structure:**
• **Supreme Court:** Highest court, constitutional matters
• **High Courts:** State-level constitutional and civil matters
• **District Courts:** Civil and criminal cases
• **Specialized Courts:** Family, consumer, labor courts

**🛡️ Your Basic Rights:**
• **Right to Equality:** Equal treatment under law
• **Right to Freedom:** Speech, movement, profession
• **Right to Life:** Personal liberty and dignity
• **Right to Constitutional Remedies:** Approach courts for rights violation

**📋 Common Legal Procedures:**

**For Civil Matters:**
• **File Suit:** In appropriate civil court
• **Mediation:** Alternative dispute resolution
• **Arbitration:** Private dispute resolution
• **Lok Adalat:** Quick and economical justice

**For Criminal Matters:**
• **File FIR:** For cognizable offenses
• **Police Complaint:** For non-cognizable offenses
• **Court Complaint:** Direct complaint to magistrate
• **Anticipatory Bail:** If arrest likely

**🆘 Free Legal Aid:**
• **National Legal Services Authority (NALSA)**
• **State Legal Services Authority**
• **District Legal Services Authority**
• **Lok Adalats:** Free and quick resolution

**📞 Important Helplines:**
• **Police Emergency:** 100
• **Women Helpline:** 181
• **Child Helpline:** 1098
• **Senior Citizen:** 14567
• **Consumer Helpline:** 1915
• **Cyber Crime:** 1930

**💡 Next Steps:**
1. **Identify Specific Issue:** What exactly is your legal problem?
2. **Gather Documents:** Collect all relevant papers
3. **Seek Legal Advice:** Consult lawyer or legal aid center
4. **Know Time Limits:** Many legal actions have limitation periods
5. **Document Everything:** Keep records of all communications

**🌐 Online Resources:**
• **india.gov.in:** Official government portal
• **Supreme Court:** sci.gov.in
• **High Courts:** Individual state websites
• **Legal Services:** nalsa.gov.in

Would you like me to provide more specific information about any particular area of law? Please describe your situation in more detail, and I'll give you targeted legal guidance based on Indian laws and procedures.

**Remember:** This is general legal information. For specific legal advice, please consult a qualified lawyer or visit your nearest Legal Services Authority.`
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

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
  }

  const formatMessage = (content: string) => {
    const lines = content.split("\n")
    return lines.map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <div key={index} className="font-bold text-blue-800 dark:text-blue-300 mt-3 mb-1 text-lg">
            {line.slice(2, -2)}
          </div>
        )
      }
      if (line.startsWith("• **") && line.includes("**")) {
        const parts = line.split("**")
        return (
          <div key={index} className="ml-4 mb-1">
            • <span className="font-semibold text-blue-700 dark:text-blue-300">{parts[1]}</span>
            {parts[2] && <span>{parts[2]}</span>}
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <div className="p-3 bg-blue-600 rounded-full">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">AI Legal Assistant</h1>
                <p className="text-blue-600 dark:text-blue-400">
                  Expert guidance on Indian Laws & Constitutional Rights
                </p>
              </div>
            </motion.div>

            {/* Quick Questions */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Quick Questions</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {quickQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleQuickQuestion(question)}
                    className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <Card className="h-[70vh] flex flex-col shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Bot className="h-6 w-6" />
                </motion.div>
                <div>
                  <CardTitle className="text-xl">Legal Consultation Chat</CardTitle>
                  <p className="text-blue-100 text-sm">Ask about Indian laws, rights, and legal procedures</p>
                </div>
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
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                      )}

                      <div className={`max-w-[85%] ${message.type === "user" ? "order-1" : ""}`}>
                        <div
                          className={`p-4 rounded-lg ${
                            message.type === "user"
                              ? "bg-blue-600 text-white ml-auto"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border"
                          }`}
                        >
                          {message.type === "assistant" ? (
                            <div className="text-sm leading-relaxed">{formatMessage(message.content)}</div>
                          ) : (
                            <div className="text-sm">{message.content}</div>
                          )}
                        </div>

                        {message.category && message.category !== "welcome" && (
                          <div className="flex gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              <Gavel className="h-3 w-3 mr-1" />
                              {message.category === "legal-advice" ? "Legal Guidance" : message.category}
                            </Badge>
                          </div>
                        )}

                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>

                      {message.type === "user" && (
                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-5 w-5 text-white" />
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
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Analyzing your legal query and researching relevant Indian laws...
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              <Separator />

              <div className="p-4">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe your legal situation or ask about Indian laws and rights..."
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

                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>Confidential & Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    <span>Based on Indian Laws</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    <span>For guidance only - consult lawyer for legal advice</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
