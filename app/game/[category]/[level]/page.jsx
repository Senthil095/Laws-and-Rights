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
import { setLevelCompleted } from "@/lib/progress"
import { gameData } from "@/lib/game-data"

// Using centralized game data from lib/game-data.js
const legacyGameData = {
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
      3: {
        title: "Informing Reason for Arrest",
        scenario:
          "Aman is grabbed by police and told he is under arrest, but no reason is given and no warrant is shown.",
        question: "What should Aman insist on?",
        options: [
          { id: "a", text: "Accept the arrest quietly without asking questions.", correct: false },
          { id: "b", text: "Demand that police explain the grounds of arrest and show a warrant if they have one.", correct: true },
          { id: "c", text: "Resist the arrest physically.", correct: false },
          { id: "d", text: "Call the officer’s superior to complain.", correct: false },
        ],
        explanation:
          "Article 22(1) and CrPC Sec. 50 require police to inform grounds of arrest; Sec. 75 requires showing the warrant if any. He can insist on these and consult a lawyer.",
        punishment:
          "Blindly accepting an unexplained arrest risks illegal detention; resisting physically can add offences.",
        timeLimit: 30,
        scenarioType: "inform-reason-arrest",
      },
      4: {
        title: "Right to Consult a Lawyer",
        scenario:
          "Neha is taken to a police station. When she asks to meet her lawyer, police refuse and start interrogating.",
        question: "Is the refusal legal, and what right does Neha have?",
        options: [
          { id: "a", text: "No right to a lawyer during interrogation.", correct: false },
          { id: "b", text: "She has a right to consult a lawyer (Art. 22(1)); Sec. 41D allows meeting a lawyer even during interrogation.", correct: true },
          { id: "c", text: "Only after charges are filed.", correct: false },
          { id: "d", text: "Only on paying a special fee.", correct: false },
        ],
        explanation:
          "Art. 22(1) ensures right to consult a legal practitioner; CrPC Sec. 41D permits meeting an advocate during interrogation.",
        punishment:
          "Interrogation without access to counsel risks coercion and rights violations.",
        timeLimit: 30,
        scenarioType: "right-to-lawyer",
      },
      5: {
        title: "Informing Relative or Friend",
        scenario:
          "Rakesh is arrested at night. Police do not inform his wife or any relative.",
        question: "Which statement is true?",
        options: [
          { id: "a", text: "CrPC Sec. 50A requires informing a nominated person promptly.", correct: true },
          { id: "b", text: "Police have no duty to inform anyone.", correct: false },
          { id: "c", text: "Only the magistrate must be informed.", correct: false },
          { id: "d", text: "Only employer needs to be informed.", correct: false },
        ],
        explanation:
          "CrPC Sec. 50A obligates informing a nominated friend/relative and recording details of the person informed.",
        punishment:
          "Not informing relatives increases risk of secret detention and abuse.",
        timeLimit: 30,
        scenarioType: "inform-relative",
      },
      6: {
        title: "Right to Remain Silent",
        scenario:
          "Meera refuses to answer incriminating questions during custodial interrogation.",
        question: "Which constitutional right protects her silence?",
        options: [
          { id: "a", text: "Article 20(3) – protection against self-incrimination.", correct: true },
          { id: "b", text: "Article 21 only.", correct: false },
          { id: "c", text: "Article 19(1)(a) – speech.", correct: false },
          { id: "d", text: "Article 25 – religion.", correct: false },
        ],
        explanation:
          "Article 20(3) protects against compulsion to be a witness against oneself; silence on incriminating questions is protected.",
        punishment:
          "Speaking under pressure can lead to coerced statements and rights violations.",
        timeLimit: 30,
        scenarioType: "right-to-silence",
      },
      7: {
        title: "Production Before Magistrate (24 hours)",
        scenario:
          "Sanjay is produced 26.5 hours after arrest (excluding normal travel time).",
        question: "What safeguard was violated?",
        options: [
          { id: "a", text: "Article 22(2) – produce before a magistrate within 24 hours.", correct: true },
          { id: "b", text: "Article 14 only.", correct: false },
          { id: "c", text: "Article 19(1)(g).", correct: false },
          { id: "d", text: "Article 352.", correct: false },
        ],
        explanation:
          "Article 22(2) and CrPC Sec. 167 mandate production within 24 hours (excluding travel). Beyond that is illegal detention.",
        punishment:
          "Delayed production risks unlawful custody and abuse.",
        timeLimit: 30,
        scenarioType: "produce-magistrate",
      },
      8: {
        title: "Bailable Offence – Right to Bail",
        scenario:
          "Manish is arrested for petty theft (bailable). Police refuse bail saying theft is non-bailable.",
        question: "What is Manish’s right?",
        options: [
          { id: "a", text: "He is entitled to bail as a matter of right.", correct: true },
          { id: "b", text: "He must stay in custody.", correct: false },
          { id: "c", text: "Bail only after conviction.", correct: false },
          { id: "d", text: "Only High Court can grant bail.", correct: false },
        ],
        explanation:
          "CrPC Sec. 436 and Sec. 50(2): for bailable offences, release on bond is a right; police must inform entitlement to bail.",
        punishment:
          "Wrongful denial of bail prolongs custody unlawfully.",
        timeLimit: 30,
        scenarioType: "bailable-bail",
      },
      9: {
        title: "Handcuffing the Arrestee",
        scenario:
          "Ritu cooperates peacefully but police handcuff her without cause.",
        question: "Is this permissible?",
        options: [
          { id: "a", text: "Generally no – use handcuffs only if violent/flight risk.", correct: true },
          { id: "b", text: "Yes, can handcuff anyone.", correct: false },
          { id: "c", text: "Only a magistrate can authorize.", correct: false },
          { id: "d", text: "Always allowed if officer feels like it.", correct: false },
        ],
        explanation:
          "SC jurisprudence: handcuffs are exceptional, not routine; require necessity (violence/escape risk).",
        punishment:
          "Unnecessary restraints violate dignity and lawful procedure.",
        timeLimit: 30,
        scenarioType: "handcuffing",
      },
      10: {
        title: "Medical Exam to Document Torture",
        scenario:
          "Akash alleges custodial beating and seeks immediate medical examination.",
        question: "Can he insist on an exam, and which law?",
        options: [
          { id: "a", text: "Yes – CrPC Sec. 54 permits magistrate-ordered medical exam.", correct: true },
          { id: "b", text: "No – only civil court can order.", correct: false },
          { id: "c", text: "Only if police agree.", correct: false },
          { id: "d", text: "No law for medical exam in custody.", correct: false },
        ],
        explanation:
          "CrPC Sec. 54: on accused’s request and showing it may aid proof of innocence/torture, the magistrate must order a medical exam.",
        punishment:
          "Without medical documentation, torture allegations are harder to prove.",
        timeLimit: 30,
        scenarioType: "medical-exam",
      },
      11: {
        title: "Section 41A – Notice Before Arrest",
        scenario:
          "Vijay is arrested immediately for a minor non-violent offence where notice should suffice.",
        question: "What does the law say?",
        options: [
          { id: "a", text: "Police should serve Sec. 41A notice of appearance before arrest in such cases.", correct: true },
          { id: "b", text: "Police can arrest anytime; notice is optional.", correct: false },
          { id: "c", text: "Notice is only for non-cognizable offences.", correct: false },
          { id: "d", text: "Only magistrates issue notices.", correct: false },
        ],
        explanation:
          "Arnesh Kumar guidelines: in many minor cases, issue notice under Sec. 41A instead of arrest to prevent unnecessary custody.",
        punishment:
          "Skipping notice leads to avoidable arrests and rights violations.",
        timeLimit: 30,
        scenarioType: "section-41a-notice",
      },
      12: {
        title: "Forced Confession / Blank Papers",
        scenario:
          "Inspector demands Ayesha sign a blank sheet; claims it’s routine.",
        question: "What protection applies?",
        options: [
          { id: "a", text: "Article 20(3) – cannot be compelled to self-incriminate; do not sign unknown papers.", correct: true },
          { id: "b", text: "Article 50 – (not relevant for this).", correct: false },
          { id: "c", text: "Only High Court can stop it.", correct: false },
          { id: "d", text: "If signed, no remedy.", correct: false },
        ],
        explanation:
          "Article 20(3) bars compelled self-incrimination. Signing blank papers under coercion is unsafe and unlawful.",
        punishment:
          "Coerced signatures can be misused as false confessions.",
        timeLimit: 30,
        scenarioType: "forced-confession",
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
  "cyber-security": {
    title: "Cyber Security",
    levels: {
      1: {
        title: "Suspicious Free Giveaway",
        scenario:
          "Sachin receives a WhatsApp message from an unknown number promising a 'free smartphone' if he clicks a link and completes a form. The link looks official but he isn't sure.",
        question: "What should Sachin do?",
        options: [
          { id: "a", text: "Click the link and fill in the details to claim the phone.", correct: false },
          { id: "b", text: "Ignore the message and verify the offer through official sources.", correct: true },
          { id: "c", text: "Forward the message to friends to see if they know about it.", correct: false },
          { id: "d", text: "Reply with his personal information to claim the gift.", correct: false },
        ],
        explanation:
          "This is a classic phishing scam. Phishing fraudsters create fake links or sites to steal personal information. Clicking the link or giving details can compromise Sachin's data or bank accounts. Option B is correct because he should not trust unexpected offers; instead he should verify such messages by checking the company's official website or contacting them directly. Under the Information Technology Act, cheating by impersonation (like fake websites) is punishable (IT Act §66D), so criminals could face jail.",
        punishment:
          "If Sachin clicked the link and fell victim, he might lose money or have his identity stolen. He should not share any personal details or OTPs. Instead, delete the message and block the sender. He can report the scam to the National Cyber Crime Reporting Portal (cybercrime.gov.in) or call the cyber helpline 1930. Under the IT Act, cyber fraudsters can be prosecuted (imprisonment up to 3 years under §66D).",
        timeLimit: 30,
        scenarioType: "phishing-whatsapp",
      },
      2: {
        title: "Fake Bank Call (Vishing)",
        scenario:
          "Rohit gets a call from someone claiming to be from his bank's fraud department. The caller says Rohit's account was hacked and urgently asks for the OTP that was just sent to Rohit's phone, so they can 'secure' the account.",
        question: "What should Rohit do?",
        options: [
          { id: "a", text: "Give the caller the OTP to protect his account.", correct: false },
          { id: "b", text: "Hang up and call the bank's official customer care himself.", correct: true },
          { id: "c", text: "Forward the OTP to a friend for advice.", correct: false },
          { id: "d", text: "Ask more questions and then decide.", correct: false },
        ],
        explanation:
          "This is a vishing (voice phishing) attempt. Banks never call and ask for your OTP; such calls are scams trying to steal your credentials. Option B is correct: Rohit should disconnect and independently call his bank using the official number on his debit card or bank statement. Keeping his OTP private is crucial. Under IT Act §66C, using someone else's electronic password or unique ID (like OTP) without authorization is an offense punishable by up to 3 years in jail.",
        punishment:
          "If Rohit shares the OTP, his bank account could be emptied. He could lose money and have trouble getting it back. To be safe, Rohit should never share OTPs or passwords. If in doubt, he should call official bank helplines. If money is stolen, he should contact the bank to dispute the transaction and file a police or cybercrime portal complaint. Under the IT Act, betraying such trust can lead to prosecution (misuse of OTP equals using someone else's password).",
        timeLimit: 30,
        scenarioType: "vishing-otp",
      },
      3: {
        title: "Cyberbullying by Classmates",
        scenario:
          "A group of students creates a private WhatsApp group for classmates. They post rude memes and hurtful comments about Rohit's appearance and background. Rohit feels humiliated and upset.",
        question: "Why is this behavior a concern?",
        options: [
          { id: "a", text: "It's just harmless teasing, not a legal problem.", correct: false },
          { id: "b", text: "It's a form of cyberbullying and harassment, which can be illegal.", correct: true },
          { id: "c", text: "It's OK because it's happening in a private chat, not on public pages.", correct: false },
          { id: "d", text: "It's Rohit's fault for posting photos online.", correct: false },
        ],
        explanation:
          "Mocking or insulting someone repeatedly online is cyberbullying. It is not harmless; it can cause serious emotional distress (studies report increased anxiety and even self-harm risk from online bullying). Legally, hurtful online posts can violate the law. For example, defaming someone (spreading false or humiliating information) is punishable under the Indian Penal Code (up to 2 years imprisonment). Repeated unwanted harassment may also fall under stalking laws (IPC §354D allows up to 3 years jail for such stalking). Option B correctly identifies this as illegal behavior.",
        punishment:
          "Cyberbullies can face criminal charges under the IT Act and IPC for harassment or defamation. Rohit should save evidence (screenshots) of the abuse and tell a trusted adult or teacher. The school or parents can help report this to the police or the National Cyber Crime Reporting Portal. Seeking help early is important for Rohit's safety and well-being.",
        timeLimit: 30,
        scenarioType: "cyberbullying",
      },
      4: {
        title: "Sharing Login Passwords",
        scenario:
          "Neha lets her friend use her email password for a few hours so the friend can print a document. Later, the friend uses Neha's account to send prank emails to their professor. Neha's professor thinks Neha sent them and is upset.",
        question: "Why was sharing her password a bad idea?",
        options: [
          { id: "a", text: "It's fine; friends can trust each other.", correct: false },
          { id: "b", text: "It violated security and can even be a cybercrime (illegal).", correct: true },
          { id: "c", text: "It doesn't matter, since she changed her password later.", correct: false },
          { id: "d", text: "There's no law against sharing accounts among friends.", correct: false },
        ],
        explanation:
          "Passwords and login details are private. Sharing them opens the door to misuse. Under the IT Act §66C, fraudulently or dishonestly using someone else's electronic password or unique ID is punishable (up to 3 years jail). Neha's action violated this trust and resulted in misuse. Option B is correct: sharing her password caused harm and even violates cyber law.",
        punishment:
          "Neha's friend may have committed identity theft by impersonation (using Neha's identity online), which is illegal under IT Act §66C. Neha should apologize to the professor and explain the account was compromised. She must immediately change her password and enable two-factor authentication. In serious cases, victims can report account misuse to the cybercrime portal. Sharing passwords can lead to both legal trouble and loss of personal data, so it's important never to do it.",
        timeLimit: 30,
        scenarioType: "password-sharing",
      },
      5: {
        title: "Fake Ticket Booking Site",
        scenario:
          "Rahul visits a website that looks like a legitimate concert ticket seller, offering premium tickets at much cheaper rates. He enters his credit card info to pay. After payment, he receives an email confirmation, but later the site disappears, and no tickets are sent. His money is gone.",
        question: "What best describes Rahul's situation?",
        options: [
          { id: "a", text: "A standard bank processing delay.", correct: false },
          { id: "b", text: "A phishing/online fraud scam.", correct: true },
          { id: "c", text: "A legitimate purchase with late delivery.", correct: false },
          { id: "d", text: "An error by Rahul's bank.", correct: false },
        ],
        explanation:
          "Rahul has been scammed by a fake (phishing) website pretending to be a ticket seller. Phishing is a fraud method that steals personal/financial information by mimicking real sites. Option B correctly identifies this. Under the IT Act, such fraud is considered cheating by personation (Section 66D). Criminals who operate fake shopping sites can be prosecuted.",
        punishment:
          "Rahul should immediately contact his bank to dispute the charge and request a chargeback. He should also report this cyber fraud to the police and the Cyber Crime Reporting Portal. The scammers face serious penalties under the IT Act (up to 3 years jail for §66D) and may also be charged under the IPC for cheating (Section 420). In future, he should only purchase from verified sites (look for HTTPS, official domain names) to avoid such scams.",
        timeLimit: 30,
        scenarioType: "fake-ecommerce",
      },
      6: {
        title: "Unwanted Messages (Cyberstalking)",
        scenario:
          "Priya rejects a boy, Amit's, advances online. Amit then sends her dozens of messages and calls every day, even after she ignored him, and won't stop. Priya is getting scared and doesn't know what to do.",
        question: "What should Priya do about Amit's behavior?",
        options: [
          { id: "a", text: "Keep ignoring him; he'll eventually stop.", correct: false },
          { id: "b", text: "Block his number and report to parents/police if it continues.", correct: true },
          { id: "c", text: "Talk nicely to him and ask him to stop.", correct: false },
          { id: "d", text: "Pretend to reciprocate to distract him.", correct: false },
        ],
        explanation:
          "Amit's actions are cyberstalking: repeated unwanted contact despite Priya's disinterest. The correct and safe response is Option B. Priya should block Amit on all platforms and tell a trusted adult. Indian law considers this type of stalking a crime (IPC §354D). Law enforcement can intervene if he persists.",
        punishment:
          "Priya should save any abusive messages or calls as evidence. She can report Amit's harassment to the Cyber Crime Portal or local police; cyberstalkers can be punished by up to 3 years in jail. She can also seek help from school counselors or helplines. Prompt action is important to stop harassment and protect herself.",
        timeLimit: 30,
        scenarioType: "cyberstalking",
      },
      7: {
        title: "Online Gaming Harassment",
        scenario:
          "During an online multiplayer game, a player calling himself 'DarkKnight' angrily shouts insults at younger players. Later, DarkKnight privately messages a 14-year-old asking for his real name and address.",
        question: "How should the younger player respond to DarkKnight's behavior?",
        options: [
          { id: "a", text: "Give him your address so he'll stop.", correct: false },
          { id: "b", text: "Challenge him to a high-score duel.", correct: false },
          { id: "c", text: "Report and block DarkKnight, and inform a parent or moderator.", correct: true },
          { id: "d", text: "Laugh it off as a prank; ignore it.", correct: false },
        ],
        explanation:
          "DarkKnight is behaving abusively and may be trying to groom the child (making an online connection that could lead to exploitation). The safe choice is C: stop contact immediately, report his account to the game moderators, and inform a parent or guardian. Option A (giving address) is dangerous — you should never share personal information with strangers online. In fact, 'cyber grooming' (befriending a young person online to exploit them) is explicitly defined as a crime.",
        punishment:
          "The player is violating both game rules and possibly the law (child exploitation is a crime). Parents can report this to cyber authorities. The police treat online harassment or attempts to meet minors as serious offenses. Games often have reporting tools, and one can also report to the Cyber Crime Portal. DarkKnight may face legal consequences under child protection provisions and the IT Act.",
        timeLimit: 30,
        scenarioType: "gaming-grooming",
      },
      8: {
        title: "Oversharing Personal Details",
        scenario:
          "Shreya posts her exam timetable, home address, and phone number on her public social media profile. She later notices strangers contacting her when they shouldn't.",
        question: "What is the problem with Shreya's posts?",
        options: [
          { id: "a", text: "It's fine to share all personal info on social media.", correct: false },
          { id: "b", text: "She is exposing personal data and risking privacy and security.", correct: true },
          { id: "c", text: "It will help her make many new friends safely.", correct: false },
          { id: "d", text: "She must share this info by school rules.", correct: false },
        ],
        explanation:
          "Sharing sensitive personal information publicly is dangerous. Strangers could misuse it (e.g., pretending to be her or stalking her). Legally, using someone's personal details to impersonate or defraud them is prohibited (IT Act §66C punishes using another's digital identity). Option B correctly identifies the issue: her privacy settings should be tighter. Options A/C/D are all unsafe or false.",
        punishment:
          "Shreya should immediately remove or hide that information. If someone uses her details maliciously (e.g., creates a fake account), they can be prosecuted for identity theft. She should also be cautious about accepting friend requests only from people she knows. If harassed, she can report it to the cybercrime portal or police. Personal data must be guarded to prevent stalking and fraud.",
        timeLimit: 30,
        scenarioType: "oversharing-social",
      },
      9: {
        title: "Too-Good-To-Be-True Shopping",
        scenario:
          "Riya buys branded headphones from a website offering them at 90% discount. She pays via UPI and waits. Weeks later, no headphones arrive and customer service is unreachable.",
        question: "What happened to Riya?",
        options: [
          { id: "a", text: "She experienced a bank transaction delay.", correct: false },
          { id: "b", text: "She was tricked by an online shopping scam.", correct: true },
          { id: "c", text: "The deal was real; she'll eventually get them.", correct: false },
          { id: "d", text: "It was her mistake for buying from a new store.", correct: false },
        ],
        explanation:
          "This is a scam. Offers that seem too good are often fraudulent. Riya was deceived by a fake e-commerce site. Under Indian law, this is 'cheating by personation' (using a fake identity to cheat) covered by IT Act §66D and IPC §420 (cheating). Option B correctly identifies the scam. Options A/C are incorrect interpretations of a deliberate fraud.",
        punishment:
          "Riya should immediately contact her bank to block or reverse the payment. She should report this fraud to the Cyber Crime Reporting Portal and local police, giving details like the fake website and payment info. Cybercriminals can be jailed for such offenses under IT Act §66D and other fraud laws. In the future, she should only shop on verified websites (look for HTTPS, reviews, known brands).",
        timeLimit: 30,
        scenarioType: "fake-discount-shop",
      },
      10: {
        title: "Fake Social Media Profile",
        scenario:
          "Arjun discovers someone has made a fake Facebook profile using his name and photo, pretending to be him. That fake account has been sending messages to Arjun's friends, asking for money.",
        question: "What is Arjun's situation?",
        options: [
          { id: "a", text: "It's his new official profile.", correct: false },
          { id: "b", text: "It's identity theft/impersonation, which is illegal.", correct: true },
          { id: "c", text: "It's a harmless bug.", correct: false },
          { id: "d", text: "It's a known Facebook policy.", correct: false },
        ],
        explanation:
          "This is blatant impersonation. Using Arjun's identity to trick others is illegal under the IT Act (Section 66C punishes fraudulent use of someone's unique ID). Option B is correct. Options A/C/D are incorrect or nonsensical. Impersonation is serious fraud.",
        punishment:
          "Arjun should report the fake profile to Facebook immediately and warn his friends not to respond to it. He should also file a complaint on the National Cyber Crime Portal. Under the IT Act, the impersonator can face up to 3 years imprisonment. Prompt reporting protects Arjun's friends and reputation.",
        timeLimit: 30,
        scenarioType: "identity-theft-social",
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
    // mark level completed on timeout as an attempt finished
    try {
      setLevelCompleted(category, String(level))
    } catch {}
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
      try {
        setLevelCompleted(category, String(level))
      } catch {}
    } else {
      setScore(0)
      setGameState("punishment")
      try {
        setLevelCompleted(category, String(level))
      } catch {}
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
