"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function StickmanDrama({ scenarioType, outcome = "setup", selectedOption, onComplete }) {
  const [currentScene, setCurrentScene] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)

  const scenarios = {
    // Updated Fundamental Rights Scenarios with unique animations
    "religious-discrimination": {
      setup: [
        { type: "fr-college-entrance", duration: 3000, description: "Rajesh enters the college campus" },
        { type: "fr-mess-line", duration: 3000, description: "Students line up at the hostel mess" },
        { type: "fr-denied-religious", duration: 3000, description: "Rajesh is stopped solely due to his religion" },
        { type: "fr-religious-exclusion", duration: 3000, description: "Staff forbid him access based on faith" },
      ],
      wrong: [
        { type: "fr-accepts-discrimination", duration: 3000, description: "Rajesh leaves without questioning" },
        { type: "fr-religious-tension-grows", duration: 3000, description: "Religious tensions increase on campus" },
        { type: "fr-discrimination-spreads", duration: 3000, description: "Discriminatory practice continues unchecked" },
        { type: "fr-equality-eroded", duration: 3000, description: "Constitutional equality is violated" },
      ],
      correct: [
        { type: "fr-challenges-denial", duration: 3000, description: "Rajesh questions the denial" },
        { type: "fr-invokes-article-15", duration: 3000, description: "Cites Article 15 prohibition on discrimination" },
        { type: "fr-files-formal-complaint", duration: 3000, description: "Files complaint with authorities" },
        { type: "fr-equal-access-restored", duration: 3000, description: "Equal access restored for all faiths" },
      ],
    },
    "gender-discrimination": {
      setup: [
        { type: "fr-professor-application", duration: 3000, description: "Suman applies for professor position" },
        { type: "fr-interview-qualified", duration: 3000, description: "She is fully qualified for the role" },
        { type: "fr-gender-rejection", duration: 3000, description: "Rejected solely because she is female" },
        { type: "fr-male-only-policy", duration: 3000, description: "College only hires male candidates" },
      ],
      wrong: [
        { type: "fr-accepts-rejection", duration: 3000, description: "Suman accepts the rejection" },
        { type: "fr-self-doubt-grows", duration: 3000, description: "Starts doubting her abilities" },
        { type: "fr-bias-continues", duration: 3000, description: "Gender bias persists in hiring" },
        { type: "fr-merit-ignored", duration: 3000, description: "Merit takes backseat to discrimination" },
      ],
      correct: [
        { type: "fr-challenges-gender-bias", duration: 3000, description: "Suman challenges the decision" },
        { type: "fr-documents-evidence", duration: 3000, description: "Documents discriminatory questions" },
        { type: "fr-legal-recourse", duration: 3000, description: "Takes legal action under Article 15" },
        { type: "fr-wins-gender-case", duration: 3000, description: "Wins case against sex discrimination" },
      ],
    },
    "press-freedom": {
      setup: [
        { type: "fr-journalist-writing", duration: 3000, description: "Journalist writes critical article" },
        { type: "fr-article-published", duration: 3000, description: "Article criticizes government policy" },
        { type: "fr-police-warning", duration: 3000, description: "Police warn her to stop writing" },
        { type: "fr-threat-to-silence", duration: 3000, description: "Ordered to stop expressing views" },
      ],
      wrong: [
        { type: "fr-self-censorship", duration: 3000, description: "Journalist censors her writing" },
        { type: "fr-public-uninformed", duration: 3000, description: "Public remains uninformed" },
        { type: "fr-democracy-weakens", duration: 3000, description: "Democratic values erode" },
        { type: "fr-voice-silenced", duration: 3000, description: "Freedom of speech suppressed" },
      ],
      correct: [
        { type: "fr-defends-article", duration: 3000, description: "Journalist defends her reporting" },
        { type: "fr-invokes-19-1-a", duration: 3000, description: "Invokes Article 19(1)(a) rights" },
        { type: "fr-court-case-filed", duration: 3000, description: "Files case for press freedom" },
        { type: "fr-press-freedom-upheld", duration: 3000, description: "Court upholds freedom of expression" },
      ],
    },
    "right-to-shelter": {
      setup: [
        { type: "fr-night-neighborhood", duration: 3000, description: "Sunita's neighborhood at night" },
        { type: "fr-bulldozers-arrive", duration: 3000, description: "Bulldozers arrive without notice" },
        { type: "fr-homes-demolished", duration: 3000, description: "Homes demolished without court order" },
        { type: "fr-families-homeless", duration: 3000, description: "Families left homeless" },
      ],
      wrong: [
        { type: "fr-accepts-eviction", duration: 3000, description: "Sunita accepts the eviction" },
        { type: "fr-moves-to-slum", duration: 3000, description: "Forced to move to temporary shelter" },
        { type: "fr-no-legal-challenge", duration: 3000, description: "No challenge to illegal eviction" },
        { type: "fr-more-evictions-follow", duration: 3000, description: "More evictions occur unchecked" },
      ],
      correct: [
        { type: "fr-documents-demolition", duration: 3000, description: "Documents the illegal demolition" },
        { type: "fr-organizes-community", duration: 3000, description: "Organizes affected families" },
        { type: "fr-invokes-article-21", duration: 3000, description: "Cites Article 21 right to life and shelter" },
        { type: "fr-court-orders-rehab", duration: 3000, description: "Court orders rehabilitation" },
      ],
    },
    "arbitrary-arrest": {
      setup: [
        { type: "fr-arrest-theft", duration: 3000, description: "Rajiv arrested on suspicion of theft" },
        { type: "fr-detained-no-info", duration: 3000, description: "Detained for a week without information" },
        { type: "fr-no-magistrate", duration: 3000, description: "Not produced before magistrate" },
        { type: "fr-no-lawyer-access", duration: 3000, description: "Denied access to lawyer" },
      ],
      wrong: [
        { type: "fr-silent-detention", duration: 3000, description: "Rajiv remains silent in detention" },
        { type: "fr-family-unaware-location", duration: 3000, description: "Family unaware of his location" },
        { type: "fr-article-22-violated", duration: 3000, description: "Article 22 rights violated" },
        { type: "fr-illegal-detention-continues", duration: 3000, description: "Illegal detention continues" },
      ],
      correct: [
        { type: "fr-demands-grounds", duration: 3000, description: "Demands grounds for arrest" },
        { type: "fr-insists-magistrate", duration: 3000, description: "Insists on magistrate production" },
        { type: "fr-lawyer-requested", duration: 3000, description: "Requests lawyer immediately" },
        { type: "fr-released-by-court", duration: 3000, description: "Court orders release for violation" },
      ],
    },
    "forced-labor": {
      setup: [
        { type: "fr-field-workers", duration: 3000, description: "Workers forced to work in fields" },
        { type: "fr-landlord-threatens", duration: 3000, description: "Landlord threatens with violence" },
        { type: "fr-no-payment-given", duration: 3000, description: "No wages paid to workers" },
        { type: "fr-no-freedom-leave", duration: 3000, description: "Workers prevented from leaving" },
      ],
      wrong: [
        { type: "fr-workers-submit", duration: 3000, description: "Workers submit to forced labor" },
        { type: "fr-bondage-continues", duration: 3000, description: "Bonded labor system persists" },
        { type: "fr-children-trapped", duration: 3000, description: "Children also forced to work" },
        { type: "fr-exploitation-cycle", duration: 3000, description: "Cycle of exploitation continues" },
      ],
      correct: [
        { type: "fr-contacts-activist", duration: 3000, description: "Worker contacts labor activist" },
        { type: "fr-authorities-raid", duration: 3000, description: "Authorities conduct raid" },
        { type: "fr-landlord-arrested", duration: 3000, description: "Landlord arrested under Article 23" },
        { type: "fr-workers-freed", duration: 3000, description: "Workers set free from bondage" },
      ],
    },
    "child-labor": {
      setup: [
        { type: "fr-meena-brick-kiln", duration: 3000, description: "12-year-old Meena at brick kiln" },
        { type: "fr-dangerous-machinery", duration: 3000, description: "Operating dangerous machinery" },
        { type: "fr-missing-school", duration: 3000, description: "Missing school entirely" },
        { type: "fr-child-exhausted", duration: 3000, description: "Child looks exhausted and weak" },
      ],
      wrong: [
        { type: "fr-child-continues-work", duration: 3000, description: "Meena continues hazardous work" },
        { type: "fr-no-education-access", duration: 3000, description: "No access to education" },
        { type: "fr-health-deteriorates", duration: 3000, description: "Health deteriorates rapidly" },
        { type: "fr-childhood-lost", duration: 3000, description: "Childhood lost to exploitation" },
      ],
      correct: [
        { type: "fr-teacher-discovers", duration: 3000, description: "Teacher notices absence" },
        { type: "fr-childline-alerted", duration: 3000, description: "Childline is alerted" },
        { type: "fr-kiln-inspected", duration: 3000, description: "Kiln inspected by authorities" },
        { type: "fr-meena-rescued", duration: 3000, description: "Meena rescued and enrolled in school" },
      ],
    },
    "religious-instruction": {
      setup: [
        { type: "fr-morning-assembly", duration: 3000, description: "Morning assembly in government school" },
        { type: "fr-hindu-prayer-forced", duration: 3000, description: "Students forced to recite Hindu prayer" },
        { type: "fr-student-refuses-prayer", duration: 3000, description: "Student refuses to participate" },
        { type: "fr-teacher-punishes", duration: 3000, description: "Teacher punishes the student" },
      ],
      wrong: [
        { type: "fr-forced-participation", duration: 3000, description: "Student forced to participate" },
        { type: "fr-religious-freedom-lost", duration: 3000, description: "Religious freedom violated" },
        { type: "fr-secular-values-erode", duration: 3000, description: "Secular education compromised" },
        { type: "fr-coercion-continues", duration: 3000, description: "Religious coercion continues" },
      ],
      correct: [
        { type: "fr-student-objects", duration: 3000, description: "Student explains objection" },
        { type: "fr-parents-complain", duration: 3000, description: "Parents file complaint" },
        { type: "fr-invokes-article-28", duration: 3000, description: "Cites Article 28 prohibition" },
        { type: "fr-secular-restored", duration: 3000, description: "School adopts secular practices" },
      ],
    },
    "minority-education": {
      setup: [
        { type: "fr-sikh-community-meets", duration: 3000, description: "Sikh community plans school" },
        { type: "fr-punjabi-education-plan", duration: 3000, description: "Wants to teach in Punjabi" },
        { type: "fr-permission-application", duration: 3000, description: "Applies for permission" },
        { type: "fr-state-refuses", duration: 3000, description: "State government refuses arbitrarily" },
      ],
      wrong: [
        { type: "fr-community-gives-up", duration: 3000, description: "Community abandons plans" },
        { type: "fr-language-erodes", duration: 3000, description: "Punjabi language and culture fade" },
        { type: "fr-minority-rights-denied", duration: 3000, description: "Minority rights ignored" },
        { type: "fr-cultural-loss", duration: 3000, description: "Cultural identity weakened" },
      ],
      correct: [
        { type: "fr-consults-expert", duration: 3000, description: "Consults constitutional expert" },
        { type: "fr-high-court-petition", duration: 3000, description: "Files petition in high court" },
        { type: "fr-article-30-cited", duration: 3000, description: "Cites Article 30 minority rights" },
        { type: "fr-school-permission-granted", duration: 3000, description: "Permission granted, school opens" },
      ],
    },
    "constitutional-remedies": {
      setup: [
        { type: "fr-daughter-detained-illegal", duration: 3000, description: "Anand's daughter illegally detained" },
        { type: "fr-local-courts-slow", duration: 3000, description: "Local courts slow to act" },
        { type: "fr-fundamental-right-violated", duration: 3000, description: "Fundamental rights being violated" },
        { type: "fr-decides-supreme-court", duration: 3000, description: "Decides to approach Supreme Court" },
      ],
      wrong: [
        { type: "fr-waits-local-court", duration: 3000, description: "Waits for local court action" },
        { type: "fr-detention-prolongs", duration: 3000, description: "Illegal detention prolongs" },
        { type: "fr-justice-delayed", duration: 3000, description: "Justice delayed is justice denied" },
        { type: "fr-right-unfulfilled", duration: 3000, description: "Constitutional right remains unfulfilled" },
      ],
      correct: [
        { type: "fr-senior-advocate-meets", duration: 3000, description: "Meets senior advocate" },
        { type: "fr-writ-petition-filed", duration: 3000, description: "Files writ petition under Article 32" },
        { type: "fr-supreme-court-hears", duration: 3000, description: "Supreme Court hears case urgently" },
        { type: "fr-daughter-freed", duration: 3000, description: "Daughter immediately released" },
      ],
    },
    "police-stop": {
      setup: [
        { type: "car-approach", duration: 3000, description: "Citizen driving peacefully on the highway" },
        { type: "police-checkpoint", duration: 3000, description: "Police checkpoint setup ahead" },
        { type: "stop-signal", duration: 3000, description: "Officer signals vehicle to stop" },
        { type: "document-demand", duration: 3000, description: "Officer demands documents without stating reason" },
      ],
      wrong: [
        { type: "immediate-compliance", duration: 3000, description: "Citizen complies without questioning" },
        { type: "excessive-questioning", duration: 3000, description: "Officer asks invasive personal questions" },
        { type: "harassment-escalates", duration: 3000, description: "Harassment continues and escalates" },
        { type: "dignity-violated", duration: 3000, description: "Constitutional rights violated, dignity lost" },
      ],
      correct: [
        { type: "polite-inquiry", duration: 3000, description: "Citizen politely asks for reason and officer ID" },
        { type: "officer-explains", duration: 3000, description: "Officer provides valid reason for checking" },
        { type: "respectful-check", duration: 3000, description: "Documents checked in respectful manner" },
        { type: "rights-protected", duration: 3000, description: "Rights respected, interaction ends positively" },
      ],
    },
    "job-interview": {
      setup: [
        { type: "office-arrival", duration: 3000, description: "Candidate arrives at corporate office for interview" },
        { type: "interview-begins", duration: 3000, description: "Interview starts with standard questions" },
        { type: "caste-question", duration: 3000, description: "Interviewer inappropriately asks about caste" },
        { type: "discrimination-revealed", duration: 3000, description: "Discriminatory bias becomes apparent" },
      ],
      wrong: [
        { type: "accept-discrimination", duration: 3000, description: "Candidate accepts discriminatory treatment" },
        { type: "lie-about-identity", duration: 3000, description: "Candidate lies about personal background" },
        { type: "perpetuate-system", duration: 3000, description: "Discrimination system continues unchallenged" },
        { type: "inequality-wins", duration: 3000, description: "Merit ignored, social inequality prevails" },
      ],
      correct: [
        { type: "challenge-question", duration: 3000, description: "Candidate challenges relevance of caste question" },
        { type: "cite-article-16", duration: 3000, description: "References Article 16 - Equal opportunity rights" },
        { type: "report-discrimination", duration: 3000, description: "Files formal complaint with authorities" },
        { type: "justice-served", duration: 3000, description: "Fair hiring process ensured, justice prevails" },
      ],
    },
    shopping: {
      setup: [
        { type: "store-visit", duration: 3000, description: "Customer visits electronics store for smartphone" },
        { type: "product-selection", duration: 3000, description: "Selects and purchases expensive smartphone" },
        { type: "product-fails", duration: 3000, description: "Phone malfunctions after just 2 days of use" },
        { type: "return-attempt", duration: 3000, description: "Returns to store seeking help or replacement" },
      ],
      wrong: [
        { type: "accept-refusal", duration: 3000, description: "Accepts store's 'no returns' policy without question" },
        { type: "walk-away", duration: 3000, description: "Walks away without fighting for consumer rights" },
        { type: "money-lost", duration: 3000, description: "Loses hard-earned money on defective product" },
        {
          type: "unfair-practice-continues",
          duration: 3000,
          description: "Store continues exploiting other customers",
        },
      ],
      correct: [
        { type: "demand-rights", duration: 3000, description: "Firmly demands consumer protection rights" },
        { type: "cite-consumer-law", duration: 3000, description: "References Consumer Protection Act provisions" },
        { type: "file-complaint", duration: 3000, description: "Files complaint in Consumer Protection Forum" },
        { type: "compensation-received", duration: 3000, description: "Receives full refund and compensation" },
      ],
    },
    restaurant: {
      setup: [
        { type: "restaurant-entry", duration: 3000, description: "Customer enters popular restaurant for dinner" },
        { type: "order-food", duration: 3000, description: "Orders special meal from the menu" },
        { type: "contaminated-food", duration: 3000, description: "Food served is contaminated and unsafe" },
        { type: "customer-sick", duration: 3000, description: "Customer falls seriously ill after eating" },
      ],
      wrong: [
        { type: "just-avoid", duration: 3000, description: "Decides to simply avoid the restaurant in future" },
        { type: "no-action", duration: 3000, description: "Takes no legal action against negligence" },
        { type: "others-at-risk", duration: 3000, description: "Other innocent customers remain at risk" },
        { type: "business-continues", duration: 3000, description: "Restaurant continues unsafe food practices" },
      ],
      correct: [
        { type: "document-evidence", duration: 3000, description: "Documents illness and preserves evidence" },
        { type: "file-consumer-case", duration: 3000, description: "Files case under Consumer Protection Act" },
        { type: "medical-compensation", duration: 3000, description: "Claims compensation for medical expenses" },
        { type: "public-safety", duration: 3000, description: "Ensures public safety through legal action" },
      ],
    },
    protest: {
      setup: [
        { type: "policy-announcement", duration: 3000, description: "Government announces controversial new policy" },
        { type: "public-concern", duration: 3000, description: "Citizens express widespread concern and dissent" },
        { type: "organize-protest", duration: 3000, description: "Community decides to organize peaceful protest" },
        { type: "venue-selection", duration: 3000, description: "Public park selected as protest venue" },
      ],
      wrong: [
        { type: "seek-permission", duration: 3000, description: "Seeks government permission before protesting" },
        { type: "bureaucratic-delays", duration: 3000, description: "Gets entangled in bureaucratic red tape" },
        { type: "opportunity-lost", duration: 3000, description: "Critical moment for protest passes by" },
        { type: "voice-silenced", duration: 3000, description: "Democratic voice effectively silenced" },
      ],
      correct: [
        { type: "peaceful-assembly", duration: 3000, description: "Organizes peaceful protest assembly" },
        { type: "constitutional-right", duration: 3000, description: "Exercises Article 19 fundamental rights" },
        { type: "public-awareness", duration: 3000, description: "Successfully raises public awareness" },
        { type: "democratic-participation", duration: 3000, description: "Strengthens democratic participation" },
      ],
    },
    arrest: {
      setup: [
        { type: "police-approach", duration: 3000, description: "Police officers approach innocent citizen" },
        { type: "arrest-announcement", duration: 3000, description: "Officers announce intention to arrest" },
        { type: "no-reason-given", duration: 3000, description: "Refuse to state specific charges or reasons" },
        { type: "no-contact-allowed", duration: 3000, description: "Prevent citizen from contacting family/lawyer" },
      ],
      wrong: [
        { type: "silent-submission", duration: 3000, description: "Submits silently without asking questions" },
        { type: "prolonged-detention", duration: 3000, description: "Kept in custody without proper information" },
        { type: "family-unaware", duration: 3000, description: "Family remains unaware of whereabouts" },
        { type: "due-process-violated", duration: 3000, description: "Constitutional due process rights violated" },
      ],
      correct: [
        { type: "demand-charges", duration: 3000, description: "Firmly demands to know specific charges" },
        { type: "request-family-contact", duration: 3000, description: "Requests permission to inform family" },
        { type: "cite-article-22", duration: 3000, description: "Cites Article 22 protection rights" },
        { type: "legal-protection", duration: 3000, description: "Rights protected, due process followed" },
      ],
    },
    // Criminal Law – New specific scenarioTypes for levels 3–12
    "inform-reason-arrest": {
      setup: [
        { type: "police-approach", duration: 2500, description: "Police approach Aman abruptly" },
        { type: "no-reason-given", duration: 2500, description: "No grounds for arrest explained" },
        { type: "detainee-asks-reason", duration: 2500, description: "Aman asks for grounds and warrant" },
        { type: "show-warrant", duration: 2500, description: "Officer should show warrant if any (Sec 75)" },
      ],
      wrong: [
        { type: "silent-compliance", duration: 2500, description: "Accepts arrest without question" },
        { type: "prolonged-detention", duration: 2500, description: "Faces unnecessary custody" },
        { type: "stress-increases", duration: 2500, description: "Stress and uncertainty" },
      ],
      correct: [
        { type: "demand-reason", duration: 2500, description: "Demands grounds of arrest (Art 22(1), Sec 50)" },
        { type: "show-warrant", duration: 2500, description: "Warrant shown if any (Sec 75)" },
        { type: "consult-lawyer", duration: 2500, description: "Consults lawyer before interrogation" },
      ],
    },
    "right-to-lawyer": {
      setup: [
        { type: "taken-to-station", duration: 2500, description: "Neha taken to police station" },
        { type: "asks-lawyer", duration: 2500, description: "Requests to meet lawyer" },
        { type: "meets-lawyer", duration: 2500, description: "Meets lawyer during interrogation (Sec 41D)" },
      ],
      wrong: [
        { type: "interrogation-without-counsel", duration: 2500, description: "Questioned without lawyer" },
        { type: "coercion-risk", duration: 2500, description: "Higher risk of coercion" },
      ],
      correct: [
        { type: "interrogation-paused", duration: 2500, description: "Questioning paused until counsel" },
        { type: "meets-lawyer", duration: 2500, description: "Consults with advocate of choice" },
      ],
    },
    "inform-relative": {
      setup: [
        { type: "arrest-night", duration: 2500, description: "Rakesh arrested at night" },
        { type: "asks-inform-relative", duration: 2500, description: "Requests police to inform wife" },
        { type: "police-inform-relative", duration: 2500, description: "Police inform nominated person (Sec 50A)" },
      ],
      wrong: [
        { type: "held-incommunicado", duration: 2500, description: "Detained without intimation" },
      ],
      correct: [
        { type: "police-inform-relative", duration: 2500, description: "Notification recorded" },
        { type: "relative-arrives", duration: 2500, description: "Family knows whereabouts" },
      ],
    },
    "right-to-silence": {
      setup: [
        { type: "interrogation-pressure", duration: 2500, description: "Meera questioned repeatedly" },
        { type: "invokes-20-3", duration: 2500, description: "Invokes Art 20(3) – right to remain silent" },
      ],
      wrong: [
        { type: "coerced-statement", duration: 2500, description: "Gives statement under pressure" },
      ],
      correct: [
        { type: "remains-silent", duration: 2500, description: "Declines incriminating answers" },
      ],
    },
    "produce-magistrate": {
      setup: [
        { type: "arrested", duration: 2500, description: "Sanjay arrested and in lockup" },
        { type: "produced-within-24h", duration: 2500, description: "Produced before magistrate within 24h" },
      ],
      wrong: [
        { type: "produced-late", duration: 2500, description: "Produced after 24 hours – illegal detention" },
      ],
      correct: [
        { type: "produced-within-24h", duration: 2500, description: "Timely production as per Art 22(2)" },
      ],
    },
    "bailable-bail": {
      setup: [
        { type: "arrest-bailable", duration: 2500, description: "Manish arrested for bailable offence" },
        { type: "asks-bail", duration: 2500, description: "Requests release on bond" },
      ],
      wrong: [
        { type: "bail-refused", duration: 2500, description: "Police refuse bail despite being bailable" },
      ],
      correct: [
        { type: "release-on-bond", duration: 2500, description: "Released on executing bond (Sec 436)" },
      ],
    },
    handcuffing: {
      setup: [
        { type: "calm-arrest", duration: 2500, description: "Ritu cooperates peacefully" },
        { type: "cuffs-applied", duration: 2500, description: "Police handcuff without cause" },
      ],
      wrong: [
        { type: "unnecessary-restraint", duration: 2500, description: "Unlawful restraint affects dignity" },
      ],
      correct: [
        { type: "cuffs-removed", duration: 2500, description: "Unnecessary cuffs removed as per law" },
      ],
    },
    "medical-exam": {
      setup: [
        { type: "custodial-injury", duration: 2500, description: "Akash shows signs of beating" },
        { type: "magistrate-orders-exam", duration: 2500, description: "Magistrate orders medical exam (Sec 54)" },
      ],
      wrong: [
        { type: "request-ignored", duration: 2500, description: "Request ignored; injuries undocumented" },
      ],
      correct: [
        { type: "doctor-examines", duration: 2500, description: "Doctor records injuries" },
      ],
    },
    "section-41a-notice": {
      setup: [
        { type: "minor-offence", duration: 2500, description: "Vijay suspected in minor non-violent case" },
        { type: "issue-41a-notice", duration: 2500, description: "Police issue Sec 41A notice to appear" },
      ],
      wrong: [
        { type: "unnecessary-arrest", duration: 2500, description: "Immediate arrest without issuing notice" },
      ],
      correct: [
        { type: "issue-41a-notice", duration: 2500, description: "Notice served per Arnesh Kumar" },
      ],
    },
    "forced-confession": {
      setup: [
        { type: "demand-sign-blank", duration: 2500, description: "Officer asks Ayesha to sign blank paper" },
        { type: "refuse-sign", duration: 2500, description: "Refuses to sign unknown papers (Art 20(3))" },
      ],
      wrong: [
        { type: "forced-signature-attempt", duration: 2500, description: "Coercion to sign unknown document" },
      ],
      correct: [
        { type: "refuse-sign", duration: 2500, description: "Invokes Art 20(3) and refuses to sign" },
      ],
    },
    // Traffic Rules Scenarios
    helmet: {
      setup: [
        { type: "ride-no-helmet", duration: 2500, description: "Riding a two-wheeler without helmet in town" },
        { type: "police-flag-down", duration: 2500, description: "Traffic police stops Raj for helmet check" },
        { type: "explain-helmet-law", duration: 2500, description: "Officer explains Section 129 helmet rule" },
        { type: "issue-challan", duration: 2500, description: "Challan may be issued for non-compliance" },
      ],
      wrong: [
        { type: "ignore-helmet", duration: 2500, description: "Ignoring helmet rule increases head injury risk" },
        { type: "helmet-fine", duration: 2500, description: "₹1,000 fine and possible licence disqualification" },
        { type: "safety-risk", duration: 2500, description: "High risk of severe injury in crash" },
        { type: "learn-compliance", duration: 2500, description: "Learn and comply with helmet laws" },
      ],
      correct: [
        { type: "wear-helmet", duration: 2500, description: "Wears helmet properly" },
        { type: "safety-first", duration: 2500, description: "Safety and compliance ensured" },
        { type: "no-violation", duration: 2500, description: "No challan; set a positive example" },
        { type: "ride-safe", duration: 2500, description: "Continues journey safely" },
      ],
    },
    seatbelt: {
      setup: [
        { type: "driving-no-belt", duration: 2500, description: "Driving with front passenger without seatbelts" },
        { type: "police-observe", duration: 2500, description: "Traffic police notice no seatbelts" },
        { type: "stop-check", duration: 2500, description: "Vehicle stopped for safety check" },
        { type: "inform-seatbelt-rule", duration: 2500, description: "Officer informs Section 194B requirement" },
      ],
      wrong: [
        { type: "continue-no-belt", duration: 2500, description: "Continuing without belts is unsafe" },
        { type: "seatbelt-fine", duration: 2500, description: "₹1,000 fine for driver/front passenger" },
        { type: "injury-risk", duration: 2500, description: "High injury risk in collision" },
        { type: "comply-later", duration: 2500, description: "Eventually comply after penalty" },
      ],
      correct: [
        { type: "buckle-up", duration: 2500, description: "Both driver and passenger buckle up" },
        { type: "safer-drive", duration: 2500, description: "Injury risk reduced" },
        { type: "compliance", duration: 2500, description: "Rule followed; proceed" },
        { type: "proceed", duration: 2500, description: "Continue journey safely" },
      ],
    },
    speeding: {
      setup: [
        { type: "city-road-50", duration: 2500, description: "City road with 50 km/h limit" },
        { type: "driver-at-70", duration: 2500, description: "Anand drives at 70 km/h" },
        { type: "speed-gun-detect", duration: 2500, description: "Speed detected by enforcement" },
        { type: "stop-speeding", duration: 2500, description: "Vehicle stopped for speeding" },
      ],
      wrong: [
        { type: "deny-speeding", duration: 2500, description: "Denies speeding but evidence exists" },
        { type: "issue-fine-183", duration: 2500, description: "Fine under Sec 183 (₹400 first, ₹1,000 repeat)" },
        { type: "risk-accident", duration: 2500, description: "Speeding raises crash risk" },
        { type: "drive-danger", duration: 2500, description: "Potential Sec 184 if dangerous" },
      ],
      correct: [
        { type: "acknowledge-limit", duration: 2500, description: "Acknowledges speed limit" },
        { type: "pay-fine", duration: 2500, description: "Pays fine if issued" },
        { type: "drive-within-limit", duration: 2500, description: "Keeps speed <= limit" },
        { type: "safer-traffic", duration: 2500, description: "Safer for everyone" },
      ],
    },
    zebra: {
      setup: [
        { type: "approach-crossing", duration: 2500, description: "Approaches zebra crossing" },
        { type: "pedestrian-steps", duration: 2500, description: "Pedestrian steps onto crossing" },
        { type: "driver-doesnt-stop", duration: 2500, description: "Driver fails to yield" },
        { type: "near-miss", duration: 2500, description: "Near-miss creates danger" },
      ],
      wrong: [
        { type: "dangerous-184", duration: 2500, description: "Counts as dangerous driving (Sec 184)" },
        { type: "zebra-penalty", duration: 2500, description: "Fine/jail possible; challan issued" },
        { type: "endanger-lives", duration: 2500, description: "Endangering pedestrians" },
        { type: "remorse", duration: 2500, description: "Learns to always yield" },
      ],
      correct: [
        { type: "yield-pedestrian", duration: 2500, description: "Stops and yields" },
        { type: "allow-cross", duration: 2500, description: "Allows safe crossing" },
        { type: "awareness", duration: 2500, description: "Follows rules" },
        { type: "safe-passage", duration: 2500, description: "Everyone safe" },
      ],
    },
    "drunk-driving": {
      setup: [
        { type: "party-exit", duration: 2500, description: "Exits party; considers driving" },
        { type: "breath-test", duration: 2500, description: "Police breath-analyzer test" },
        { type: "bac-over-limit", duration: 2500, description: "BAC over 0.03%" },
        { type: "arrest-charge-185", duration: 2500, description: "Sec 185 offence explained" },
      ],
      wrong: [
        { type: "drive-intoxicated", duration: 2500, description: "Drives under influence" },
        { type: "caught-185", duration: 2500, description: "Caught and penalized under Sec 185" },
        { type: "heavy-penalty", duration: 2500, description: "Up to ₹10,000 and/or 6 months" },
        { type: "licence-suspend", duration: 2500, description: "Licence suspension" },
      ],
      correct: [
        { type: "take-cab", duration: 2500, description: "Takes cab/ride share" },
        { type: "avoid-driving", duration: 2500, description: "Avoids driving intoxicated" },
        { type: "safe-choice", duration: 2500, description: "Protects lives" },
        { type: "no-penalty", duration: 2500, description: "No legal trouble" },
      ],
    },
    "mobile-use": {
      setup: [
        { type: "red-light-stop", duration: 2500, description: "Stops at red light" },
        { type: "picks-phone", duration: 2500, description: "Picks phone to text" },
        { type: "police-notice", duration: 2500, description: "Police notice handheld use" },
        { type: "stop-and-warn", duration: 2500, description: "Stopped and warned/penalized" },
      ],
      wrong: [
        { type: "text-while-driving", duration: 2500, description: "Texts while in control of vehicle" },
        { type: "penalty-184", duration: 2500, description: "Sec 184 – up to ₹5,000 fine" },
        { type: "distraction-risk", duration: 2500, description: "Distraction increases crash risk" },
        { type: "accident-risk", duration: 2500, description: "Potential severe outcomes" },
      ],
      correct: [
        { type: "hands-free-or-wait", duration: 2500, description: "Use hands-free or wait" },
        { type: "focus-road", duration: 2500, description: "Focus on the road" },
        { type: "compliance-traffic", duration: 2500, description: "Complies with law" },
        { type: "proceed-safe", duration: 2500, description: "Proceeds safely" },
      ],
    },
    "red-light": {
      setup: [
        { type: "red-signal", duration: 2500, description: "Signal turns red" },
        { type: "car-runs-red", duration: 2500, description: "Car runs the red light" },
        { type: "camera-capture", duration: 2500, description: "Camera/police capture violation" },
        { type: "police-stop", duration: 2500, description: "Vehicle stopped for violation" },
      ],
      wrong: [
        { type: "dangerous-184-signal", duration: 2500, description: "Dangerous driving under Sec 184" },
        { type: "heavy-fine", duration: 2500, description: "Up to ₹5,000 fine or jail" },
        { type: "traffic-risk", duration: 2500, description: "High risk at intersections" },
        { type: "points-suspension", duration: 2500, description: "Points or suspension possible" },
      ],
      correct: [
        { type: "stop-on-red", duration: 2500, description: "Stops on red" },
        { type: "go-on-green", duration: 2500, description: "Proceeds on green" },
        { type: "safe-intersection", duration: 2500, description: "Intersection remains safe" },
        { type: "good-example", duration: 2500, description: "Sets good example" },
      ],
    },
    overtaking: {
      setup: [
        { type: "approach-curve", duration: 2500, description: "Approaches a blind curve" },
        { type: "attempt-overtake", duration: 2500, description: "Attempts to overtake" },
        { type: "limited-visibility", duration: 2500, description: "Limited visibility on curve" },
        { type: "near-miss-curve", duration: 2500, description: "Near-miss happens" },
      ],
      wrong: [
        { type: "charge-dangerous", duration: 2500, description: "Charged as dangerous driving" },
        { type: "penalty-overtake", duration: 2500, description: "Penalty applies" },
        { type: "high-risk", duration: 2500, description: "High crash risk" },
        { type: "lessons-learned", duration: 2500, description: "Learns to avoid overtaking on curves" },
      ],
      correct: [
        { type: "wait-straight", duration: 2500, description: "Waits for straight and clear view" },
        { type: "safe-overtake", duration: 2500, description: "Overtakes safely later" },
        { type: "rule-compliance", duration: 2500, description: "Complies with rules" },
        { type: "safe-journey", duration: 2500, description: "Safe journey continues" },
      ],
    },
    "stop-sign": {
      setup: [
        { type: "approach-stop-sign", duration: 2500, description: "Approaches STOP sign" },
        { type: "fails-to-stop", duration: 2500, description: "Fails to stop fully" },
        { type: "cross-unsafe", duration: 2500, description: "Crosses unsafely" },
        { type: "police-challan", duration: 2500, description: "Challan issued" },
      ],
      wrong: [
        { type: "challan-177-184", duration: 2500, description: "Sec 177 or 184 depending on danger" },
        { type: "risk-collision", duration: 2500, description: "Risk of collision" },
        { type: "legal-trouble", duration: 2500, description: "Legal consequences" },
        { type: "learn-rule", duration: 2500, description: "Learns to fully stop" },
      ],
      correct: [
        { type: "full-stop", duration: 2500, description: "Makes a full stop" },
        { type: "check-proceed", duration: 2500, description: "Checks and proceeds when safe" },
        { type: "safe-compliance", duration: 2500, description: "Compliant and safe" },
        { type: "community-safety", duration: 2500, description: "Protects community" },
      ],
    },
    "documents-check": {
      setup: [
        { type: "routine-check", duration: 2500, description: "Routine traffic check" },
        { type: "officer-asks-docs", duration: 2500, description: "Officer asks for licence and RC" },
        { type: "driver-provides", duration: 2500, description: "Driver provides documents" },
        { type: "verification", duration: 2500, description: "Verification and advice" },
      ],
      wrong: [
        { type: "refuse-docs", duration: 2500, description: "Refuses to show documents" },
        { type: "challan-177", duration: 2500, description: "Challan for failure to produce" },
        { type: "impound", duration: 2500, description: "Vehicle may be impounded" },
        { type: "delays", duration: 2500, description: "Unnecessary delays" },
      ],
      correct: [
        { type: "show-licence-rc", duration: 2500, description: "Shows licence and RC (and insurance)" },
        { type: "smooth-process", duration: 2500, description: "Smooth verification process" },
        { type: "thanked", duration: 2500, description: "Officer thanks for cooperation" },
        { type: "drive-on", duration: 2500, description: "Drives on" },
      ],
    },
    // Consumer Rights – New Scenarios
    "ecommerce-defect": {
      setup: [
        { type: "package-arrives", duration: 2500, description: "Online order delivered at home" },
        { type: "broken-device", duration: 2500, description: "Phone found broken on unboxing" },
        { type: "contact-support", duration: 2500, description: "Contacts e-commerce support" },
        { type: "support-refuses", duration: 2500, description: "Support refuses repair/replacement" },
      ],
      wrong: [
        { type: "walk-away-giveup", duration: 2500, description: "Gives up and bears the loss" },
        { type: "unfair-practice-continues", duration: 2500, description: "Seller continues unfair practices" },
        { type: "money-lost-gadget", duration: 2500, description: "Money lost on defective product" },
        { type: "stress-increases", duration: 2500, description: "Stress and frustration increase" },
      ],
      correct: [
        { type: "file-consumer-complaint", duration: 2500, description: "Files complaint in District Consumer Commission" },
        { type: "platform-grievance", duration: 2500, description: "Grievance officer notified" },
        { type: "refund-processed", duration: 2500, description: "Refund/replacement processed" },
        { type: "consumer-rights-upheld", duration: 2500, description: "Rights upheld; fair outcome" },
      ],
    },
    "warranty-defect-store": {
      setup: [
        { type: "store-visit", duration: 2500, description: "Buys a new laptop from store" },
        { type: "laptop-stops", duration: 2500, description: "Laptop stops working within a week" },
        { type: "shop-says-no-return", duration: 2500, description: "Shop claims 'no return after sale'" },
        { type: "customer-requests-help", duration: 2500, description: "Requests repair/replacement" },
      ],
      wrong: [
        { type: "accept-refusal-generic", duration: 2500, description: "Accepts refusal and leaves" },
        { type: "money-lost", duration: 2500, description: "Stuck with defective product" },
        { type: "others-at-risk", duration: 2500, description: "Other buyers face same issue" },
        { type: "unfair-practice-continues", duration: 2500, description: "Unfair practice continues" },
      ],
      correct: [
        { type: "demand-rights", duration: 2500, description: "Demands repair/replacement/refund under CPA" },
        { type: "file-consumer-complaint", duration: 2500, description: "Files case before Consumer Commission" },
        { type: "refund-processed", duration: 2500, description: "Gets refund/replacement" },
        { type: "consumer-rights-upheld", duration: 2500, description: "Rights enforced successfully" },
      ],
    },
    "misleading-ad": {
      setup: [
        { type: "ad-claims", duration: 2500, description: "Sees magical weight-loss drink ad online" },
        { type: "package-arrives", duration: 2500, description: "Orders and receives the product" },
        { type: "product-ineffective", duration: 2500, description: "Product doesn't work as claimed" },
        { type: "contact-support", duration: 2500, description: "Asks advertiser for remedy" },
      ],
      wrong: [
        { type: "walk-away-giveup", duration: 2500, description: "Treats it as normal puffery" },
        { type: "money-lost", duration: 2500, description: "Money wasted on false claims" },
        { type: "others-at-risk", duration: 2500, description: "Others misled by ad" },
        { type: "unfair-practice-continues", duration: 2500, description: "Misleading ads continue" },
      ],
      correct: [
        { type: "lodge-complaint-ccpa", duration: 2500, description: "Complains to Consumer Forum/CCPA" },
        { type: "ad-penalty", duration: 2500, description: "Action/penalty for misleading advertisement" },
        { type: "refund-processed", duration: 2500, description: "Refund secured" },
        { type: "consumer-rights-upheld", duration: 2500, description: "Truthful advertising enforced" },
      ],
    },
    overcharge: {
      setup: [
        { type: "restaurant-entry", duration: 2500, description: "Visits restaurant and orders water" },
        { type: "bill-overcharge", duration: 2500, description: "Bill shows ₹164 for a ₹20 bottle" },
        { type: "ask-refund", duration: 2500, description: "Asks for correct billing" },
        { type: "no-refund", duration: 2500, description: "Restaurant refuses to correct bill" },
      ],
      wrong: [
        { type: "walk-away-giveup", duration: 2500, description: "Accepts overcharge silently" },
        { type: "money-lost", duration: 2500, description: "Loses money; practice continues" },
        { type: "others-at-risk", duration: 2500, description: "Others face overcharging" },
        { type: "unfair-practice-continues", duration: 2500, description: "Illegal pricing persists" },
      ],
      correct: [
        { type: "file-consumer-complaint", duration: 2500, description: "Files complaint before District Commission" },
        { type: "refund-processed", duration: 2500, description: "Refund of excess with compensation" },
        { type: "public-awareness", duration: 2500, description: "Deters overcharging" },
        { type: "consumer-rights-upheld", duration: 2500, description: "Fair pricing ensured" },
      ],
    },
    "online-coaching": {
      setup: [
        { type: "course-paid", duration: 2500, description: "Pays ₹5,000 for 1-month course" },
        { type: "classes-missing", duration: 2500, description: "Classes never start" },
        { type: "tutor-unresponsive", duration: 2500, description: "Tutor stops responding" },
        { type: "contact-support", duration: 2500, description: "Seeks resolution online" },
      ],
      wrong: [
        { type: "wait-indefinitely", duration: 2500, description: "Keeps waiting without action" },
        { type: "money-lost", duration: 2500, description: "Money stuck; no service" },
        { type: "stress-increases", duration: 2500, description: "Stress builds up" },
        { type: "unfair-practice-continues", duration: 2500, description: "Service providers get away" },
      ],
      correct: [
        { type: "file-consumer-complaint", duration: 2500, description: "Files consumer complaint for deficiency" },
        { type: "refund-processed", duration: 2500, description: "Refund/compensation ordered" },
        { type: "consumer-rights-upheld", duration: 2500, description: "Services improved" },
        { type: "public-awareness", duration: 2500, description: "Prevents future abuse" },
      ],
    },
    "warranty-denial": {
      setup: [
        { type: "warranty-valid", duration: 2500, description: "Laptop under 2-year warranty fails in 9 months" },
        { type: "service-center-deny", duration: 2500, description: "Service center alleges 'user misuse'" },
        { type: "customer-requests-help", duration: 2500, description: "Requests warranty repair/replacement" },
        { type: "support-refuses", duration: 2500, description: "Refusal without proof" },
      ],
      wrong: [
        { type: "walk-away-giveup", duration: 2500, description: "Accepts denial; buys new device" },
        { type: "money-lost-gadget", duration: 2500, description: "Wastes money despite warranty" },
        { type: "unfair-practice-continues", duration: 2500, description: "Warranty promises become meaningless" },
        { type: "stress-increases", duration: 2500, description: "Stress due to loss" },
      ],
      correct: [
        { type: "file-consumer-complaint", duration: 2500, description: "Files complaint to enforce warranty" },
        { type: "refund-processed", duration: 2500, description: "Repair/replacement directed" },
        { type: "consumer-rights-upheld", duration: 2500, description: "Warranty honored" },
        { type: "public-awareness", duration: 2500, description: "Better service standards" },
      ],
    },
    "no-return": {
      setup: [
        { type: "package-arrives", duration: 2500, description: "Online shoes delivered" },
        { type: "wrong-size-delivered", duration: 2500, description: "Wrong size received" },
        { type: "exchange-refused", duration: 2500, description: "Seller cites 'no return' policy" },
        { type: "contact-support", duration: 2500, description: "Requests exchange/refund" },
      ],
      wrong: [
        { type: "walk-away-giveup", duration: 2500, description: "Accepts unusable product" },
        { type: "money-lost", duration: 2500, description: "Money stuck; no remedy" },
        { type: "unfair-practice-continues", duration: 2500, description: "Policy misused against buyers" },
        { type: "others-at-risk", duration: 2500, description: "Others face same issue" },
      ],
      correct: [
        { type: "file-consumer-complaint", duration: 2500, description: "Files complaint insisting replacement/refund" },
        { type: "refund-processed", duration: 2500, description: "Correct size/refund provided" },
        { type: "consumer-rights-upheld", duration: 2500, description: "Policies aligned with law" },
        { type: "public-awareness", duration: 2500, description: "E-commerce fairness improved" },
      ],
    },
    "digital-payment": {
      setup: [
        { type: "payment-failed", duration: 2500, description: "Payment fails during checkout" },
        { type: "money-debited", duration: 2500, description: "Bank account debited" },
        { type: "no-refund-delay", duration: 2500, description: "Refund not received even after a week" },
        { type: "contact-support", duration: 2500, description: "Contacts bank/app support" },
      ],
      wrong: [
        { type: "wait-indefinitely", duration: 2500, description: "Waits without escalation" },
        { type: "money-lost", duration: 2500, description: "Cashflow blocked" },
        { type: "stress-increases", duration: 2500, description: "Uncertainty and stress" },
        { type: "unfair-practice-continues", duration: 2500, description: "Poor service continues" },
      ],
      correct: [
        { type: "file-consumer-complaint", duration: 2500, description: "Treats bank/app as service providers" },
        { type: "refund-processed", duration: 2500, description: "Refund credited" },
        { type: "consumer-rights-upheld", duration: 2500, description: "Service standards enforced" },
        { type: "public-awareness", duration: 2500, description: "Faster grievance redressal" },
      ],
    },
    "food-safety": {
      setup: [
        { type: "restaurant-entry", duration: 2500, description: "Orders vegetarian pizza" },
        { type: "unsafe-food-served", duration: 2500, description: "Meat found in food" },
        { type: "allergy-incident", duration: 2500, description: "Allergic reaction; falls sick" },
        { type: "no-refund", duration: 2500, description: "Restaurant refuses compensation" },
      ],
      wrong: [
        { type: "walk-away-giveup", duration: 2500, description: "Does not report incident" },
        { type: "others-at-risk", duration: 2500, description: "Public health at risk" },
        { type: "unfair-practice-continues", duration: 2500, description: "Safety ignored" },
        { type: "stress-increases", duration: 2500, description: "Medical costs and stress" },
      ],
      correct: [
        { type: "file-consumer-complaint", duration: 2500, description: "Files complaint for refund/compensation" },
        { type: "public-awareness", duration: 2500, description: "Deters unsafe practices" },
        { type: "refund-processed", duration: 2500, description: "Compensation awarded" },
        { type: "consumer-rights-upheld", duration: 2500, description: "Right to Safety protected" },
      ],
    },
    "institute-closure": {
      setup: [
        { type: "institute-enroll", duration: 2500, description: "Pays full fee for 1-year coaching" },
        { type: "classes-missing", duration: 2500, description: "Only 2 months taught" },
        { type: "institute-shuts", duration: 2500, description: "Institute shuts without refund" },
        { type: "contact-support", duration: 2500, description: "Attempts contact; no response" },
      ],
      wrong: [
        { type: "walk-away-giveup", duration: 2500, description: "Assumes no remedy as business closed" },
        { type: "money-lost", duration: 2500, description: "Fees lost" },
        { type: "others-at-risk", duration: 2500, description: "Others also suffer" },
        { type: "stress-increases", duration: 2500, description: "Stress without resolution" },
      ],
      correct: [
        { type: "file-consumer-complaint", duration: 2500, description: "Files deficiency of service case" },
        { type: "refund-processed", duration: 2500, description: "Refund/compensation ordered" },
        { type: "consumer-rights-upheld", duration: 2500, description: "Closure doesn't end liability" },
        { type: "public-awareness", duration: 2500, description: "Protects future students" },
      ],
    },
    // Cyber Security Scenarios
    "phishing-whatsapp": {
      setup: [
        { type: "phone-notification", duration: 2500, description: "WhatsApp message received from unknown number" },
        { type: "suspicious-link-message", duration: 2500, description: "Message promises free smartphone" },
        { type: "link-appears-official", duration: 2500, description: "Link looks somewhat official but suspicious" },
        { type: "decision-moment", duration: 2500, description: "Sachin considers whether to click" },
      ],
      wrong: [
        { type: "click-malicious-link", duration: 2500, description: "Clicks link and enters personal details" },
        { type: "data-stolen", duration: 2500, description: "Personal data and banking info compromised" },
        { type: "money-lost", duration: 2500, description: "Bank account drained by fraudsters" },
        { type: "identity-theft-risk", duration: 2500, description: "Identity theft - long-term consequences" },
      ],
      correct: [
        { type: "ignore-message", duration: 2500, description: "Ignores suspicious message" },
        { type: "verify-official-source", duration: 2500, description: "Checks company's official website" },
        { type: "report-cybercrime", duration: 2500, description: "Reports to cybercrime.gov.in portal" },
        { type: "safe-from-scam", duration: 2500, description: "Protected from phishing scam" },
      ],
    },
    "vishing-otp": {
      setup: [
        { type: "phone-rings", duration: 2500, description: "Receives call from 'bank fraud department'" },
        { type: "caller-urgent", duration: 2500, description: "Caller claims account hacked, urgently needs help" },
        { type: "otp-arrives", duration: 2500, description: "OTP message arrives on phone" },
        { type: "caller-asks-otp", duration: 2500, description: "Caller pressures for OTP to 'secure account'" },
      ],
      wrong: [
        { type: "shares-otp", duration: 2500, description: "Shares OTP with caller under pressure" },
        { type: "account-accessed", duration: 2500, description: "Fraudster accesses bank account" },
        { type: "money-lost", duration: 2500, description: "Account emptied immediately" },
        { type: "realize-scam", duration: 2500, description: "Realizes too late it was a scam" },
      ],
      correct: [
        { type: "hang-up-call", duration: 2500, description: "Hangs up immediately" },
        { type: "call-official-bank", duration: 2500, description: "Calls bank using number on debit card" },
        { type: "bank-confirms-scam", duration: 2500, description: "Bank confirms no such call was made" },
        { type: "account-safe", duration: 2500, description: "Account remains secure" },
      ],
    },
    "cyberbullying": {
      setup: [
        { type: "whatsapp-group-created", duration: 2500, description: "Private WhatsApp group created by classmates" },
        { type: "hurtful-messages", duration: 2500, description: "Rude memes and comments posted about Rohit" },
        { type: "victim-distressed", duration: 2500, description: "Rohit feels humiliated and upset" },
        { type: "bullying-continues", duration: 2500, description: "Harassment escalates" },
      ],
      wrong: [
        { type: "suffer-silence", duration: 2500, description: "Suffers in silence without reporting" },
        { type: "mental-health-impact", duration: 2500, description: "Severe emotional distress and anxiety" },
        { type: "bullies-continue", duration: 2500, description: "Bullies continue unchecked" },
        { type: "lasting-trauma", duration: 2500, description: "Long-term psychological impact" },
      ],
      correct: [
        { type: "take-screenshots", duration: 2500, description: "Saves evidence (screenshots)" },
        { type: "tell-trusted-adult", duration: 2500, description: "Tells parent/teacher about harassment" },
        { type: "report-cybercrime", duration: 2500, description: "Reports to Cyber Crime Portal" },
        { type: "legal-action-taken", duration: 2500, description: "Bullies face consequences under law" },
      ],
    },
    "password-sharing": {
      setup: [
        { type: "friend-asks-password", duration: 2500, description: "Friend asks to borrow email password" },
        { type: "neha-shares-password", duration: 2500, description: "Neha shares password to help friend" },
        { type: "friend-misuses-account", duration: 2500, description: "Friend sends prank emails to professor" },
        { type: "professor-upset", duration: 2500, description: "Professor thinks Neha sent the emails" },
      ],
      wrong: [
        { type: "trust-violated", duration: 2500, description: "Trust violated; relationship damaged" },
        { type: "reputation-damaged", duration: 2500, description: "Academic reputation at risk" },
        { type: "professor-action", duration: 2500, description: "Professor takes disciplinary action" },
        { type: "lesson-learned-hard", duration: 2500, description: "Learns lesson the hard way" },
      ],
      correct: [
        { type: "refuse-to-share", duration: 2500, description: "Politely refuses to share password" },
        { type: "suggest-alternative", duration: 2500, description: "Suggests safer alternative to help" },
        { type: "account-secure", duration: 2500, description: "Account remains secure" },
        { type: "friendship-intact", duration: 2500, description: "Maintains security and friendship" },
      ],
    },
    "fake-ecommerce": {
      setup: [
        { type: "browse-concert-tickets", duration: 2500, description: "Rahul looks for concert tickets online" },
        { type: "finds-cheap-deal", duration: 2500, description: "Finds website with premium tickets at low prices" },
        { type: "enters-card-details", duration: 2500, description: "Enters credit card information" },
        { type: "payment-confirmation", duration: 2500, description: "Receives email confirmation" },
      ],
      wrong: [
        { type: "site-disappears", duration: 2500, description: "Website disappears after payment" },
        { type: "no-tickets-arrive", duration: 2500, description: "No tickets sent; customer service unreachable" },
        { type: "money-lost", duration: 2500, description: "Money gone; concert missed" },
        { type: "card-compromised", duration: 2500, description: "Credit card details stolen" },
      ],
      correct: [
        { type: "verify-website", duration: 2500, description: "Checks for HTTPS and official domain" },
        { type: "read-reviews", duration: 2500, description: "Reads customer reviews first" },
        { type: "buy-from-official", duration: 2500, description: "Purchases from verified official site" },
        { type: "safe-transaction", duration: 2500, description: "Safe transaction; tickets received" },
      ],
    },
    "cyberstalking": {
      setup: [
        { type: "rejection-online", duration: 2500, description: "Priya rejects Amit's advances online" },
        { type: "unwanted-messages-start", duration: 2500, description: "Amit starts sending dozens of messages" },
        { type: "calls-repeatedly", duration: 2500, description: "Calls repeatedly despite being ignored" },
        { type: "priya-scared", duration: 2500, description: "Priya feels scared and harassed" },
      ],
      wrong: [
        { type: "keep-ignoring", duration: 2500, description: "Continues ignoring hoping it stops" },
        { type: "stalking-escalates", duration: 2500, description: "Harassment escalates to threats" },
        { type: "fear-increases", duration: 2500, description: "Fear and anxiety worsen" },
        { type: "safety-at-risk", duration: 2500, description: "Personal safety at risk" },
      ],
      correct: [
        { type: "block-stalker", duration: 2500, description: "Blocks Amit on all platforms" },
        { type: "tell-parents", duration: 2500, description: "Informs parents immediately" },
        { type: "report-cybercrime", duration: 2500, description: "Reports to Cyber Crime Portal" },
        { type: "legal-protection", duration: 2500, description: "Legal action stops stalker (IPC §354D)" },
      ],
    },
    "gaming-grooming": {
      setup: [
        { type: "online-game-session", duration: 2500, description: "Playing online multiplayer game" },
        { type: "darknight-insults", duration: 2500, description: "DarkKnight shouts insults at younger players" },
        { type: "private-message", duration: 2500, description: "Sends private message asking for personal info" },
        { type: "asks-address", duration: 2500, description: "Asks 14-year-old for real name and address" },
      ],
      wrong: [
        { type: "shares-personal-info", duration: 2500, description: "Shares address out of fear or confusion" },
        { type: "grooming-continues", duration: 2500, description: "Online predator continues manipulation" },
        { type: "child-exploitation-risk", duration: 2500, description: "Risk of real-world exploitation" },
        { type: "serious-danger", duration: 2500, description: "Child in serious danger" },
      ],
      correct: [
        { type: "refuse-to-share", duration: 2500, description: "Refuses to share personal information" },
        { type: "report-to-moderator", duration: 2500, description: "Reports DarkKnight to game moderators" },
        { type: "tell-parents", duration: 2500, description: "Informs parent/guardian immediately" },
        { type: "predator-banned", duration: 2500, description: "Predator reported to authorities and banned" },
      ],
    },
    "oversharing-social": {
      setup: [
        { type: "social-media-post", duration: 2500, description: "Shreya posts on social media" },
        { type: "shares-exam-schedule", duration: 2500, description: "Shares exam timetable publicly" },
        { type: "shares-address-phone", duration: 2500, description: "Posts home address and phone number" },
        { type: "strangers-contact", duration: 2500, description: "Strangers start contacting her" },
      ],
      wrong: [
        { type: "info-stays-public", duration: 2500, description: "Information remains publicly visible" },
        { type: "harassment-begins", duration: 2500, description: "Unwanted contact and harassment" },
        { type: "stalking-risk", duration: 2500, description: "Physical stalking risk increases" },
        { type: "identity-theft-risk", duration: 2500, description: "Personal data misused for fraud" },
      ],
      correct: [
        { type: "delete-sensitive-posts", duration: 2500, description: "Immediately deletes sensitive information" },
        { type: "privacy-settings", duration: 2500, description: "Adjusts privacy settings properly" },
        { type: "selective-sharing", duration: 2500, description: "Only accepts known friends" },
        { type: "data-protected", duration: 2500, description: "Personal data protected from misuse" },
      ],
    },
    "fake-discount-shop": {
      setup: [
        { type: "browse-headphones", duration: 2500, description: "Riya searches for branded headphones" },
        { type: "finds-90-discount", duration: 2500, description: "Finds website with 90% discount offer" },
        { type: "payment-via-upi", duration: 2500, description: "Pays via UPI immediately" },
        { type: "wait-for-delivery", duration: 2500, description: "Waits for delivery" },
      ],
      wrong: [
        { type: "weeks-pass", duration: 2500, description: "Weeks pass with no delivery" },
        { type: "customer-service-unreachable", duration: 2500, description: "Customer service unreachable" },
        { type: "money-lost", duration: 2500, description: "Money lost to fake website" },
        { type: "realize-scam", duration: 2500, description: "Realizes too late it was a scam" },
      ],
      correct: [
        { type: "suspicious-of-deal", duration: 2500, description: "Skeptical of too-good-to-be-true offer" },
        { type: "research-website", duration: 2500, description: "Researches website reputation" },
        { type: "buy-from-verified", duration: 2500, description: "Buys from verified seller instead" },
        { type: "safe-purchase", duration: 2500, description: "Safe transaction from legitimate store" },
      ],
    },
    "identity-theft-social": {
      setup: [
        { type: "fake-profile-created", duration: 2500, description: "Someone creates fake profile using Arjun's photo" },
        { type: "impersonation", duration: 2500, description: "Fake account messages Arjun's friends" },
        { type: "asks-for-money", duration: 2500, description: "Fake profile asks friends for money" },
        { type: "arjun-discovers", duration: 2500, description: "Arjun discovers the fake profile" },
      ],
      wrong: [
        { type: "delay-reporting", duration: 2500, description: "Delays reporting the fake account" },
        { type: "friends-scammed", duration: 2500, description: "Friends fall for scam and lose money" },
        { type: "reputation-damaged", duration: 2500, description: "Arjun's reputation severely damaged" },
        { type: "trust-lost", duration: 2500, description: "Loses trust of friends and family" },
      ],
      correct: [
        { type: "report-to-facebook", duration: 2500, description: "Reports fake profile to Facebook immediately" },
        { type: "warn-friends", duration: 2500, description: "Warns all friends not to respond" },
        { type: "report-cybercrime", duration: 2500, description: "Files complaint on Cyber Crime Portal" },
        { type: "profile-removed", duration: 2500, description: "Fake profile removed; impersonator prosecuted" },
      ],
    },
    // Human Rights Scenarios
    "hr-gender-job-discrimination": {
      setup: [
        { type: "hr-job-application", duration: 3000, description: "Rina applies for field job position" },
        { type: "hr-strong-interview", duration: 3000, description: "Performs excellently in interview" },
        { type: "hr-employer-hesitation", duration: 3000, description: "Employer shows bias during evaluation" },
        { type: "hr-gender-rejection", duration: 3000, description: "Told 'we don't hire women for field roles'" },
      ],
      wrong: [
        { type: "hr-accepts-discrimination", duration: 3000, description: "Rina accepts rejection without challenge" },
        { type: "hr-loses-confidence", duration: 3000, description: "Loses confidence and self-worth" },
        { type: "hr-discrimination-spreads", duration: 3000, description: "Gender discrimination continues in industry" },
        { type: "hr-inequality-persists", duration: 3000, description: "Workplace equality eroded" },
      ],
      correct: [
        { type: "hr-challenges-decision", duration: 3000, description: "Questions the discriminatory decision" },
        { type: "hr-documents-evidence", duration: 3000, description: "Documents discriminatory statement" },
        { type: "hr-files-complaint", duration: 3000, description: "Files complaint citing Article 14 & 15" },
        { type: "hr-wins-equality-case", duration: 3000, description: "Gets job and sets precedent for equality" },
      ],
    },
    "hr-right-to-education": {
      setup: [
        { type: "hr-child-at-home", duration: 3000, description: "Apoorv kept at home, not in school" },
        { type: "hr-household-work", duration: 3000, description: "Made to do household chores all day" },
        { type: "hr-no-education", duration: 3000, description: "Denied education due to poverty" },
        { type: "hr-authorities-inactive", duration: 3000, description: "Local authorities take no action" },
      ],
      wrong: [
        { type: "hr-education-denied", duration: 3000, description: "Continues without education" },
        { type: "hr-future-limited", duration: 3000, description: "Future opportunities severely limited" },
        { type: "hr-poverty-cycle", duration: 3000, description: "Trapped in cycle of poverty" },
        { type: "hr-potential-wasted", duration: 3000, description: "Human potential wasted" },
      ],
      correct: [
        { type: "hr-activist-intervention", duration: 3000, description: "Education activist learns of case" },
        { type: "hr-invokes-rte-act", duration: 3000, description: "Invokes Right to Education Act & Article 21-A" },
        { type: "hr-authorities-compelled", duration: 3000, description: "Authorities compelled to enroll child" },
        { type: "hr-education-begins", duration: 3000, description: "Apoorv enrolled in school with support" },
      ],
    },
    "hr-freedom-of-expression": {
      setup: [
        { type: "hr-online-post", duration: 3000, description: "Arjun posts peaceful criticism online" },
        { type: "hr-government-policy-critique", duration: 3000, description: "Criticizes local government policies" },
        { type: "hr-police-summon", duration: 3000, description: "Police summon him to station" },
        { type: "hr-threatened-arrest", duration: 3000, description: "Threatened with arrest for 'hurting sentiments'" },
      ],
      wrong: [
        { type: "hr-self-censors", duration: 3000, description: "Deletes post and apologizes under pressure" },
        { type: "hr-chilling-effect", duration: 3000, description: "Creates chilling effect on free speech" },
        { type: "hr-democracy-weakens", duration: 3000, description: "Democratic discourse weakened" },
        { type: "hr-voices-silenced", duration: 3000, description: "Citizens afraid to express views" },
      ],
      correct: [
        { type: "hr-stands-firm", duration: 3000, description: "Stands firm on right to expression" },
        { type: "hr-legal-counsel", duration: 3000, description: "Seeks legal counsel" },
        { type: "hr-invokes-article-19", duration: 3000, description: "Invokes Article 19(1)(a) & UDHR Article 19" },
        { type: "hr-case-dismissed", duration: 3000, description: "Harassment ends; free speech protected" },
      ],
    },
    "hr-privacy-violation": {
      setup: [
        { type: "hr-rented-flat", duration: 3000, description: "Sneha living in rented apartment" },
        { type: "hr-strange-feeling", duration: 3000, description: "Feels uncomfortable in her own space" },
        { type: "hr-discovers-cameras", duration: 3000, description: "Discovers hidden cameras in bedroom" },
        { type: "hr-landlord-excuse", duration: 3000, description: "Landlord claims 'for security purposes'" },
      ],
      wrong: [
        { type: "hr-tolerates-invasion", duration: 3000, description: "Feels powerless; continues living there" },
        { type: "hr-trauma-builds", duration: 3000, description: "Severe emotional distress and trauma" },
        { type: "hr-insecurity-grows", duration: 3000, description: "Constant feeling of being watched" },
        { type: "hr-dignity-violated", duration: 3000, description: "Human dignity completely violated" },
      ],
      correct: [
        { type: "hr-documents-cameras", duration: 3000, description: "Documents evidence of hidden cameras" },
        { type: "hr-files-police-complaint", duration: 3000, description: "Files police complaint immediately" },
        { type: "hr-invokes-privacy-right", duration: 3000, description: "Cites Article 21 privacy rights (Puttaswamy)" },
        { type: "hr-landlord-prosecuted", duration: 3000, description: "Landlord prosecuted; privacy restored" },
      ],
    },
    "hr-child-labour": {
      setup: [
        { type: "hr-child-working", duration: 3000, description: "12-year-old Imran working at tea stall" },
        { type: "hr-long-hours", duration: 3000, description: "Works long hours in harsh conditions" },
        { type: "hr-no-school", duration: 3000, description: "Missing school completely" },
        { type: "hr-childhood-lost", duration: 3000, description: "No time for play or education" },
      ],
      wrong: [
        { type: "hr-exploitation-continues", duration: 3000, description: "Child labour continues unchecked" },
        { type: "hr-health-suffers", duration: 3000, description: "Physical and mental health deteriorates" },
        { type: "hr-education-denied", duration: 3000, description: "Permanently denied education" },
        { type: "hr-poverty-cycle", duration: 3000, description: "Trapped in intergenerational poverty" },
      ],
      correct: [
        { type: "hr-teacher-notices", duration: 3000, description: "Teacher notices child's absence" },
        { type: "hr-childline-called", duration: 3000, description: "Childline (1098) contacted" },
        { type: "hr-rescue-operation", duration: 3000, description: "Rescue operation under Article 24 & Child Labour Act" },
        { type: "hr-child-rehabilitated", duration: 3000, description: "Imran rescued and enrolled in school" },
      ],
    },
    "hr-religious-freedom": {
      setup: [
        { type: "hr-morning-assembly", duration: 3000, description: "Public school morning assembly" },
        { type: "hr-forced-prayer", duration: 3000, description: "All students forced to recite specific religious prayer" },
        { type: "hr-student-refuses", duration: 3000, description: "Aisha refuses to participate" },
        { type: "hr-teacher-punishes", duration: 3000, description: "Teacher punishes her for refusing" },
      ],
      wrong: [
        { type: "hr-forced-compliance", duration: 3000, description: "Forced to participate against conscience" },
        { type: "hr-religious-distress", duration: 3000, description: "Emotional and religious distress" },
        { type: "hr-secular-values-lost", duration: 3000, description: "Secular education principles violated" },
        { type: "hr-discrimination-normalized", duration: 3000, description: "Religious discrimination normalized" },
      ],
      correct: [
        { type: "hr-parents-informed", duration: 3000, description: "Informs parents about punishment" },
        { type: "hr-formal-complaint", duration: 3000, description: "Parents file formal complaint" },
        { type: "hr-invokes-article-25", duration: 3000, description: "Cites Article 25 & 28, UDHR Article 18" },
        { type: "hr-secular-restored", duration: 3000, description: "School adopts secular practices" },
      ],
    },
    "hr-environmental-rights": {
      setup: [
        { type: "hr-village-water-source", duration: 3000, description: "Village depends on local water source" },
        { type: "hr-factory-pollution", duration: 3000, description: "Factory dumps toxic waste nearby" },
        { type: "hr-water-contaminated", duration: 3000, description: "Drinking water becomes contaminated" },
        { type: "hr-authorities-ignore", duration: 3000, description: "Local authorities ignore complaints" },
      ],
      wrong: [
        { type: "hr-health-crisis", duration: 3000, description: "Waterborne diseases spread rapidly" },
        { type: "hr-children-sick", duration: 3000, description: "Children and elderly fall seriously ill" },
        { type: "hr-deaths-occur", duration: 3000, description: "Preventable deaths occur" },
        { type: "hr-environment-destroyed", duration: 3000, description: "Environment permanently damaged" },
      ],
      correct: [
        { type: "hr-community-organizes", duration: 3000, description: "Villagers organize collective action" },
        { type: "hr-files-pil", duration: 3000, description: "Files Public Interest Litigation" },
        { type: "hr-invokes-article-21", duration: 3000, description: "Invokes Article 21 (right to clean environment)" },
        { type: "hr-factory-penalized", duration: 3000, description: "Factory shut down; clean water restored" },
      ],
    },
    "hr-torture-protection": {
      setup: [
        { type: "hr-peaceful-protest", duration: 3000, description: "Ravi participates in peaceful protest" },
        { type: "hr-taken-custody", duration: 3000, description: "Taken into police custody" },
        { type: "hr-refuses-slogans", duration: 3000, description: "Refuses to chant slogans" },
        { type: "hr-police-brutality", duration: 3000, description: "Beaten by police in custody" },
      ],
      wrong: [
        { type: "hr-physical-trauma", duration: 3000, description: "Suffers severe physical injuries" },
        { type: "hr-psychological-damage", duration: 3000, description: "Long-term psychological trauma" },
        { type: "hr-fear-spreads", duration: 3000, description: "Fear spreads; protests suppressed" },
        { type: "hr-democracy-threatened", duration: 3000, description: "Democratic rights undermined" },
      ],
      correct: [
        { type: "hr-medical-examination", duration: 3000, description: "Demands medical examination immediately" },
        { type: "hr-files-complaint", duration: 3000, description: "Files complaint against police" },
        { type: "hr-invokes-article-21", duration: 3000, description: "Invokes Article 21, UDHR Article 5, ICCPR" },
        { type: "hr-officers-punished", duration: 3000, description: "Officers held accountable; compensation awarded" },
      ],
    },
    "hr-digital-privacy": {
      setup: [
        { type: "hr-telecom-service", duration: 3000, description: "Using telecom service normally" },
        { type: "hr-data-shared-secretly", duration: 3000, description: "Company shares data without consent" },
        { type: "hr-targeted-ads", duration: 3000, description: "Receives suspicious targeted advertising" },
        { type: "hr-discovers-breach", duration: 3000, description: "Discovers personal data shared with advertisers" },
      ],
      wrong: [
        { type: "hr-privacy-lost", duration: 3000, description: "Personal privacy completely compromised" },
        { type: "hr-data-misused", duration: 3000, description: "Data used for manipulation and profiling" },
        { type: "hr-identity-theft-risk", duration: 3000, description: "Increased risk of identity theft" },
        { type: "hr-autonomy-violated", duration: 3000, description: "Personal autonomy undermined" },
      ],
      correct: [
        { type: "hr-files-complaint-trai", duration: 3000, description: "Files complaint with TRAI and consumer forum" },
        { type: "hr-invokes-privacy-law", duration: 3000, description: "Invokes Article 21 & Puttaswamy judgment" },
        { type: "hr-demands-compensation", duration: 3000, description: "Demands compensation and data deletion" },
        { type: "hr-privacy-restored", duration: 3000, description: "Company fined; data protection enforced" },
      ],
    },
    "hr-access-to-justice": {
      setup: [
        { type: "hr-house-demolished", duration: 3000, description: "Kavita's house demolished without notice" },
        { type: "hr-no-hearing-given", duration: 3000, description: "No opportunity to be heard" },
        { type: "hr-approaches-court", duration: 3000, description: "Attempts to approach court for justice" },
        { type: "hr-told-cannot-challenge", duration: 3000, description: "Officials claim government actions cannot be challenged" },
      ],
      wrong: [
        { type: "hr-believes-officials", duration: 3000, description: "Believes she has no legal recourse" },
        { type: "hr-homeless-helpless", duration: 3000, description: "Remains homeless and helpless" },
        { type: "hr-rights-meaningless", duration: 3000, description: "All rights become meaningless without remedy" },
        { type: "hr-arbitrary-power", duration: 3000, description: "Arbitrary government power goes unchecked" },
      ],
      correct: [
        { type: "hr-seeks-legal-aid", duration: 3000, description: "Seeks legal aid and guidance" },
        { type: "hr-files-writ-petition", duration: 3000, description: "Files writ petition under Article 32 or 226" },
        { type: "hr-court-hears-case", duration: 3000, description: "Court hears case urgently" },
        { type: "hr-justice-delivered", duration: 3000, description: "Demolition declared illegal; compensation awarded" },
      ],
    },
    // Women's Rights Scenarios
    "wr-workplace-harassment": {
      setup: [
        { type: "wr-office-arrival", duration: 3000, description: "Priya joins the company" },
        { type: "wr-manager-comments", duration: 3000, description: "Manager makes inappropriate comments" },
        { type: "wr-unwelcome-messages", duration: 3000, description: "Sends unwelcome messages" },
        { type: "wr-hr-dismisses", duration: 3000, description: "HR says 'Just ignore him, he's senior'" },
      ],
      wrong: [
        { type: "wr-silently-endures", duration: 3000, description: "Priya endures harassment silently" },
        { type: "wr-hostile-environment", duration: 3000, description: "Workplace becomes hostile" },
        { type: "wr-mental-health-suffers", duration: 3000, description: "Mental health deteriorates" },
        { type: "wr-rights-violated", duration: 3000, description: "Rights to dignity and safety violated" },
      ],
      correct: [
        { type: "wr-formal-complaint", duration: 3000, description: "Files formal ICC complaint" },
        { type: "wr-invokes-posh-act", duration: 3000, description: "Invokes POSH Act 2013" },
        { type: "wr-inquiry-conducted", duration: 3000, description: "Internal inquiry conducted" },
        { type: "wr-manager-penalized", duration: 3000, description: "Manager penalized; safe workplace restored" },
      ],
    },
    "wr-equal-pay": {
      setup: [
        { type: "wr-same-job", duration: 3000, description: "Nisha and Raj do identical work" },
        { type: "wr-discovers-gap", duration: 3000, description: "Nisha discovers ₹5,000 wage gap" },
        { type: "wr-confronts-hr", duration: 3000, description: "Questions the pay difference" },
        { type: "wr-hr-deflects", duration: 3000, description: "HR deflects with vague reasons" },
      ],
      wrong: [
        { type: "wr-accepts-inequality", duration: 3000, description: "Accepts wage discrimination" },
        { type: "wr-self-worth-drops", duration: 3000, description: "Self-worth and morale decline" },
        { type: "wr-inequality-persists", duration: 3000, description: "Gender pay gap persists" },
        { type: "wr-discrimination-spreads", duration: 3000, description: "Other women also underpaid" },
      ],
      correct: [
        { type: "wr-files-complaint", duration: 3000, description: "Files complaint for equal pay" },
        { type: "wr-cites-equal-rem-act", duration: 3000, description: "Cites Equal Remuneration Act 1976" },
        { type: "wr-legal-action", duration: 3000, description: "Takes legal action" },
        { type: "wr-equal-pay-awarded", duration: 3000, description: "Receives equal pay and back wages" },
      ],
    },
    "wr-dowry-harassment": {
      setup: [
        { type: "wr-marriage-begins", duration: 3000, description: "Kavita's marriage begins happily" },
        { type: "wr-inlaws-demand-car", duration: 3000, description: "In-laws demand a car" },
        { type: "wr-threatens-mistreat", duration: 3000, description: "Threaten to mistreat her" },
        { type: "wr-pressure-increases", duration: 3000, description: "Pressure and harassment increase" },
      ],
      wrong: [
        { type: "wr-gives-in-dowry", duration: 3000, description: "Family gives in to dowry demand" },
        { type: "wr-demands-escalate", duration: 3000, description: "Demands escalate further" },
        { type: "wr-violence-risk", duration: 3000, description: "Risk of domestic violence increases" },
        { type: "wr-illegal-practice-continues", duration: 3000, description: "Illegal practice continues unchecked" },
      ],
      correct: [
        { type: "wr-refuses-dowry", duration: 3000, description: "Kavita and family refuse dowry" },
        { type: "wr-police-complaint", duration: 3000, description: "Files police complaint" },
        { type: "wr-invokes-dowry-act", duration: 3000, description: "Invokes Dowry Prohibition Act 1961" },
        { type: "wr-inlaws-warned", duration: 3000, description: "In-laws warned; harassment stops" },
      ],
    },
    "wr-domestic-violence": {
      setup: [
        { type: "wr-abuse-begins", duration: 3000, description: "Renu faces regular physical abuse" },
        { type: "wr-husband-dismisses", duration: 3000, description: "Husband says it's private family matter" },
        { type: "wr-isolated-fearful", duration: 3000, description: "Renu feels isolated and fearful" },
        { type: "wr-seeks-help", duration: 3000, description: "Considers seeking help" },
      ],
      wrong: [
        { type: "wr-stays-silent", duration: 3000, description: "Stays silent out of fear" },
        { type: "wr-abuse-worsens", duration: 3000, description: "Abuse escalates" },
        { type: "wr-life-endangered", duration: 3000, description: "Life and dignity endangered" },
        { type: "wr-children-traumatized", duration: 3000, description: "Children witness and suffer trauma" },
      ],
      correct: [
        { type: "wr-contacts-police", duration: 3000, description: "Contacts police and Protection Officer" },
        { type: "wr-files-pwdva-case", duration: 3000, description: "Files case under PWDVA 2005" },
        { type: "wr-protection-order", duration: 3000, description: "Court issues protection order" },
        { type: "wr-safe-shelter", duration: 3000, description: "Moves to safe shelter; legal action begins" },
      ],
    },
    "wr-maternity-benefits": {
      setup: [
        { type: "wr-pregnancy-announced", duration: 3000, description: "Megha announces pregnancy" },
        { type: "wr-employer-unhappy", duration: 3000, description: "Employer expresses displeasure" },
        { type: "wr-forced-resignation", duration: 3000, description: "Told to resign or be terminated" },
        { type: "wr-unfair-pressure", duration: 3000, description: "Faces unfair pressure" },
      ],
      wrong: [
        { type: "wr-resigns-under-pressure", duration: 3000, description: "Resigns under pressure" },
        { type: "wr-financial-hardship", duration: 3000, description: "Faces financial hardship" },
        { type: "wr-discrimination-unchallenged", duration: 3000, description: "Pregnancy discrimination continues" },
        { type: "wr-other-women-suffer", duration: 3000, description: "Other women face same treatment" },
      ],
      correct: [
        { type: "wr-refuses-resignation", duration: 3000, description: "Refuses to resign" },
        { type: "wr-cites-maternity-act", duration: 3000, description: "Cites Maternity Benefit Act 2017" },
        { type: "wr-legal-complaint", duration: 3000, description: "Files legal complaint" },
        { type: "wr-26-weeks-leave", duration: 3000, description: "Receives 26 weeks paid leave; job protected" },
      ],
    },
    "wr-public-harassment": {
      setup: [
        { type: "wr-bus-journey", duration: 3000, description: "Anita travels on public bus" },
        { type: "wr-men-harass", duration: 3000, description: "Group of men harass her" },
        { type: "wr-conductor-ignores", duration: 3000, description: "Conductor ignores her complaints" },
        { type: "wr-feels-unsafe", duration: 3000, description: "Feels unsafe and helpless" },
      ],
      wrong: [
        { type: "wr-stays-silent-shame", duration: 3000, description: "Stays silent out of shame" },
        { type: "wr-harassment-continues", duration: 3000, description: "Harassment continues" },
        { type: "wr-other-women-targeted", duration: 3000, description: "Other women also targeted" },
        { type: "wr-public-spaces-unsafe", duration: 3000, description: "Public spaces remain unsafe" },
      ],
      correct: [
        { type: "wr-calls-100", duration: 3000, description: "Calls 100 immediately" },
        { type: "wr-files-fir", duration: 3000, description: "Files FIR at police station" },
        { type: "wr-invokes-sec-354", duration: 3000, description: "Invokes Sections 354 & 509 IPC" },
        { type: "wr-accused-arrested", duration: 3000, description: "Accused arrested; others deterred" },
      ],
    },
    "wr-child-marriage": {
      setup: [
        { type: "wr-aarti-16", duration: 3000, description: "Aarti is only 16 years old" },
        { type: "wr-parents-arrange", duration: 3000, description: "Parents arrange marriage to 25-year-old" },
        { type: "wr-aarti-protests", duration: 3000, description: "Aarti protests but family pressures" },
        { type: "wr-forced-marriage-plan", duration: 3000, description: "Marriage date is fixed" },
      ],
      wrong: [
        { type: "wr-forced-to-marry", duration: 3000, description: "Forced into child marriage" },
        { type: "wr-education-stops", duration: 3000, description: "Education stops; dreams shattered" },
        { type: "wr-health-risks", duration: 3000, description: "Early pregnancy health risks" },
        { type: "wr-childhood-stolen", duration: 3000, description: "Childhood and rights stolen" },
      ],
      correct: [
        { type: "wr-contacts-childline", duration: 3000, description: "Contacts Childline 1098" },
        { type: "wr-cmpo-intervenes", duration: 3000, description: "Child Marriage Prohibition Officer intervenes" },
        { type: "wr-marriage-stopped", duration: 3000, description: "Marriage stopped by authorities" },
        { type: "wr-continues-education", duration: 3000, description: "Aarti continues education; rights protected" },
      ],
    },
    "wr-property-inheritance": {
      setup: [
        { type: "wr-father-passes", duration: 3000, description: "Sita's father passes away" },
        { type: "wr-brothers-claim-all", duration: 3000, description: "Brothers claim entire property" },
        { type: "wr-only-sons-inherit", duration: 3000, description: "Say 'only sons inherit'" },
        { type: "wr-sita-denied", duration: 3000, description: "Sita denied her rightful share" },
      ],
      wrong: [
        { type: "wr-accepts-denial", duration: 3000, description: "Accepts brothers' claim silently" },
        { type: "wr-financial-insecurity", duration: 3000, description: "Faces financial insecurity" },
        { type: "wr-discrimination-persists", duration: 3000, description: "Gender discrimination persists" },
        { type: "wr-injustice-unchallenged", duration: 3000, description: "Injustice goes unchallenged" },
      ],
      correct: [
        { type: "wr-consults-lawyer", duration: 3000, description: "Consults lawyer" },
        { type: "wr-files-partition-suit", duration: 3000, description: "Files partition suit in civil court" },
        { type: "wr-cites-succession-act", duration: 3000, description: "Cites Hindu Succession Act 2005" },
        { type: "wr-equal-share-awarded", duration: 3000, description: "Court awards equal share as coparcener" },
      ],
    },
    "wr-reproductive-choice": {
      setup: [
        { type: "wr-pregnancy-early", duration: 3000, description: "Rashmi pregnant - 12 weeks" },
        { type: "wr-wants-termination", duration: 3000, description: "Wants to terminate pregnancy" },
        { type: "wr-husband-refuses", duration: 3000, description: "Husband refuses permission" },
        { type: "wr-clinic-denies", duration: 3000, description: "Clinic denies service" },
      ],
      wrong: [
        { type: "wr-forced-to-continue", duration: 3000, description: "Forced to continue unwanted pregnancy" },
        { type: "wr-bodily-autonomy-violated", duration: 3000, description: "Bodily autonomy violated" },
        { type: "wr-mental-trauma", duration: 3000, description: "Suffers mental trauma" },
        { type: "wr-unsafe-alternatives", duration: 3000, description: "May seek unsafe alternatives" },
      ],
      correct: [
        { type: "wr-seeks-legal-counsel", duration: 3000, description: "Seeks legal counsel" },
        { type: "wr-finds-registered-facility", duration: 3000, description: "Goes to registered medical facility" },
        { type: "wr-invokes-mtp-act", duration: 3000, description: "Invokes MTP Act 2021 - her choice" },
        { type: "wr-safe-procedure", duration: 3000, description: "Safe procedure; bodily autonomy respected" },
      ],
    },
    "wr-political-participation": {
      setup: [
        { type: "wr-panchayat-elections", duration: 3000, description: "Panchayat elections announced" },
        { type: "wr-sunita-wants-contest", duration: 3000, description: "Sunita wants to contest" },
        { type: "wr-villagers-discourage", duration: 3000, description: "Villagers say 'politics is for men'" },
        { type: "wr-faces-opposition", duration: 3000, description: "Faces opposition from community" },
      ],
      wrong: [
        { type: "wr-withdraws-candidacy", duration: 3000, description: "Withdraws under pressure" },
        { type: "wr-women-voiceless", duration: 3000, description: "Women remain voiceless in governance" },
        { type: "wr-democracy-weakened", duration: 3000, description: "Democratic participation weakened" },
        { type: "wr-patriarchy-continues", duration: 3000, description: "Patriarchal system continues" },
      ],
      correct: [
        { type: "wr-files-nomination", duration: 3000, description: "Files nomination confidently" },
        { type: "wr-cites-73rd-amendment", duration: 3000, description: "Cites 73rd Amendment - 33% reservation" },
        { type: "wr-campaigns-actively", duration: 3000, description: "Campaigns on women's issues" },
        { type: "wr-wins-election", duration: 3000, description: "Wins election; represents community effectively" },
      ],
    },
    // Child Rights Scenarios
    "cr-right-to-education": {
      setup: [
        { type: "cr-school-arrival", duration: 3000, description: "Arjun arrives at government school" },
        { type: "cr-denied-admission", duration: 3000, description: "School denies admission without payment" },
        { type: "cr-cannot-afford", duration: 3000, description: "Parents cannot afford uniforms and books" },
        { type: "cr-arjun-disappointed", duration: 3000, description: "Arjun stands outside, unable to study" },
      ],
      wrong: [
        { type: "cr-stays-home", duration: 3000, description: "Arjun stays home, misses education" },
        { type: "cr-future-limited", duration: 3000, description: "Educational opportunities lost" },
        { type: "cr-poverty-cycle", duration: 3000, description: "Trapped in cycle of poverty" },
        { type: "cr-right-denied", duration: 3000, description: "Fundamental right to education denied" },
      ],
      correct: [
        { type: "cr-files-complaint", duration: 3000, description: "Parents file complaint with authorities" },
        { type: "cr-invokes-rte-act", duration: 3000, description: "Invokes Article 21-A and RTE Act 2009" },
        { type: "cr-free-admission", duration: 3000, description: "School ordered to admit with free materials" },
        { type: "cr-education-begins", duration: 3000, description: "Arjun starts learning; right protected" },
      ],
    },
    "cr-child-labour": {
      setup: [
        { type: "cr-working-restaurant", duration: 3000, description: "Rohit works at restaurant washing dishes" },
        { type: "cr-employer-justifies", duration: 3000, description: "Employer says 'He wants to earn'" },
        { type: "cr-misses-school", duration: 3000, description: "Rohit works 8 hours, misses school" },
        { type: "cr-childhood-lost", duration: 3000, description: "Childhood and education denied" },
      ],
      wrong: [
        { type: "cr-continues-working", duration: 3000, description: "Rohit continues child labour" },
        { type: "cr-health-suffers", duration: 3000, description: "Physical and mental health deteriorates" },
        { type: "cr-no-education", duration: 3000, description: "Permanently denied education" },
        { type: "cr-exploitation", duration: 3000, description: "Economic exploitation continues" },
      ],
      correct: [
        { type: "cr-rescue-operation", duration: 3000, description: "Child welfare authorities rescue Rohit" },
        { type: "cr-employer-penalized", duration: 3000, description: "Employer prosecuted under Child Labour Act" },
        { type: "cr-enrolled-school", duration: 3000, description: "Rohit enrolled in school immediately" },
        { type: "cr-childhood-restored", duration: 3000, description: "Childhood and education rights protected" },
      ],
    },
    "cr-protection-from-abuse": {
      setup: [
        { type: "cr-abuse-incident", duration: 3000, description: "Riya touched inappropriately by neighbor" },
        { type: "cr-parents-hesitate", duration: 3000, description: "Parents fear social stigma" },
        { type: "cr-abuse-continues", duration: 3000, description: "Abuse continues unreported" },
        { type: "cr-riya-traumatized", duration: 3000, description: "Riya suffers emotional trauma" },
      ],
      wrong: [
        { type: "cr-silence-maintained", duration: 3000, description: "Family maintains silence" },
        { type: "cr-trauma-deepens", duration: 3000, description: "Psychological trauma deepens" },
        { type: "cr-abuser-unpunished", duration: 3000, description: "Abuser continues unchecked" },
        { type: "cr-child-suffers", duration: 3000, description: "Child's wellbeing severely impacted" },
      ],
      correct: [
        { type: "cr-reports-police", duration: 3000, description: "Reports to police immediately" },
        { type: "cr-pocso-invoked", duration: 3000, description: "POCSO Act 2012 invoked" },
        { type: "cr-child-friendly-trial", duration: 3000, description: "Child-friendly investigation begins" },
        { type: "cr-abuser-arrested", duration: 3000, description: "Abuser arrested; Riya gets counseling" },
      ],
    },
    "cr-right-to-identity": {
      setup: [
        { type: "cr-no-documents", duration: 3000, description: "Girl has no birth certificate or Aadhaar" },
        { type: "cr-orphanage-neglect", duration: 3000, description: "Orphanage hasn't provided documentation" },
        { type: "cr-school-denied", duration: 3000, description: "Cannot enroll in school without documents" },
        { type: "cr-welfare-denied", duration: 3000, description: "Cannot access welfare schemes" },
      ],
      wrong: [
        { type: "cr-remains-undocumented", duration: 3000, description: "Remains without identity documents" },
        { type: "cr-education-blocked", duration: 3000, description: "Education remains inaccessible" },
        { type: "cr-invisible-system", duration: 3000, description: "Invisible to government systems" },
        { type: "cr-rights-inaccessible", duration: 3000, description: "All rights become inaccessible" },
      ],
      correct: [
        { type: "cr-contacts-authorities", duration: 3000, description: "Social worker contacts authorities" },
        { type: "cr-birth-registration", duration: 3000, description: "Birth certificate issued immediately" },
        { type: "cr-aadhaar-created", duration: 3000, description: "Aadhaar card and documents created" },
        { type: "cr-identity-established", duration: 3000, description: "Identity established; can access all rights" },
      ],
    },
    "cr-nutrition-health": {
      setup: [
        { type: "cr-no-meals", duration: 3000, description: "Midday meals stopped for weeks" },
        { type: "cr-funds-diverted", duration: 3000, description: "Administrator diverts funds" },
        { type: "cr-children-hungry", duration: 3000, description: "Children fall sick due to hunger" },
        { type: "cr-health-crisis", duration: 3000, description: "Health crisis develops" },
      ],
      wrong: [
        { type: "cr-malnutrition-spreads", duration: 3000, description: "Malnutrition spreads among children" },
        { type: "cr-serious-illness", duration: 3000, description: "Children develop serious illnesses" },
        { type: "cr-education-affected", duration: 3000, description: "Cannot concentrate on studies" },
        { type: "cr-development-impaired", duration: 3000, description: "Physical and mental development impaired" },
      ],
      correct: [
        { type: "cr-parents-complain", duration: 3000, description: "Parents file formal complaint" },
        { type: "cr-investigation-starts", duration: 3000, description: "Investigation into fund diversion begins" },
        { type: "cr-official-punished", duration: 3000, description: "Officials face corruption charges" },
        { type: "cr-meals-restored", duration: 3000, description: "Midday meals restored; health recovered" },
      ],
    },
    "cr-child-marriage": {
      setup: [
        { type: "cr-marriage-arranged", duration: 3000, description: "14-year-old Meena's marriage arranged" },
        { type: "cr-tradition-cited", duration: 3000, description: "Parents cite tradition and family honor" },
        { type: "cr-wedding-planned", duration: 3000, description: "Wedding date fixed for next month" },
        { type: "cr-meena-scared", duration: 3000, description: "Meena scared but pressured to agree" },
      ],
      wrong: [
        { type: "cr-forced-marriage", duration: 3000, description: "Meena forced into marriage" },
        { type: "cr-education-ends", duration: 3000, description: "Education stops permanently" },
        { type: "cr-health-risk", duration: 3000, description: "Early pregnancy endangers health" },
        { type: "cr-dreams-crushed", duration: 3000, description: "Childhood and dreams crushed" },
      ],
      correct: [
        { type: "cr-teacher-intervenes", duration: 3000, description: "Teacher learns and intervenes" },
        { type: "cr-cmpo-contacted", duration: 3000, description: "Child Marriage Prohibition Officer contacted" },
        { type: "cr-marriage-stopped", duration: 3000, description: "Marriage stopped under PCMA 2006" },
        { type: "cr-meena-protected", duration: 3000, description: "Meena continues education; rights protected" },
      ],
    },
    "cr-express-views": {
      setup: [
        { type: "cr-school-meeting", duration: 3000, description: "School meeting about changing timings" },
        { type: "cr-students-ask", duration: 3000, description: "Students ask to give their opinion" },
        { type: "cr-principal-refuses", duration: 3000, description: "Principal says 'Children don't decide'" },
        { type: "cr-voices-silenced", duration: 3000, description: "Student voices dismissed" },
      ],
      wrong: [
        { type: "cr-students-silent", duration: 3000, description: "Students remain silent" },
        { type: "cr-dignity-violated", duration: 3000, description: "Dignity and participation denied" },
        { type: "cr-decision-imposed", duration: 3000, description: "Decision imposed without consultation" },
        { type: "cr-resentment-grows", duration: 3000, description: "Resentment and disengagement grows" },
      ],
      correct: [
        { type: "cr-students-petition", duration: 3000, description: "Students submit formal petition" },
        { type: "cr-uncrc-cited", duration: 3000, description: "Cite UNCRC Article 12 - right to be heard" },
        { type: "cr-forum-created", duration: 3000, description: "Student council forum created" },
        { type: "cr-voices-heard", duration: 3000, description: "Student views heard and considered" },
      ],
    },
    "cr-child-trafficking": {
      setup: [
        { type: "cr-recruiter-arrives", duration: 3000, description: "Man offers jobs to village children" },
        { type: "cr-false-promises", duration: 3000, description: "Promises education and earnings" },
        { type: "cr-children-transported", duration: 3000, description: "Transports children to another city" },
        { type: "cr-forced-labour", duration: 3000, description: "Forces children into factory labour" },
      ],
      wrong: [
        { type: "cr-trafficking-continues", duration: 3000, description: "Trafficking continues unchecked" },
        { type: "cr-exploitation-severe", duration: 3000, description: "Children severely exploited" },
        { type: "cr-no-education", duration: 3000, description: "No education, only hard labour" },
        { type: "cr-trapped", duration: 3000, description: "Children trapped in trafficking network" },
      ],
      correct: [
        { type: "cr-raid-conducted", duration: 3000, description: "Police raid based on tip-off" },
        { type: "cr-children-rescued", duration: 3000, description: "Children rescued immediately" },
        { type: "cr-trafficker-arrested", duration: 3000, description: "Trafficker arrested under IPC 370-371" },
        { type: "cr-rehabilitation", duration: 3000, description: "Children rehabilitated and reunited" },
      ],
    },
    "cr-shelter-care": {
      setup: [
        { type: "cr-disaster-strikes", duration: 3000, description: "Natural disaster leaves children orphaned" },
        { type: "cr-no-shelter", duration: 3000, description: "Children without food or shelter" },
        { type: "cr-authorities-inactive", duration: 3000, description: "Authorities take no action for weeks" },
        { type: "cr-children-suffering", duration: 3000, description: "Children fend for themselves, suffering" },
      ],
      wrong: [
        { type: "cr-neglect-continues", duration: 3000, description: "State negligence continues" },
        { type: "cr-health-deteriorates", duration: 3000, description: "Health and safety deteriorate" },
        { type: "cr-vulnerable-exploitation", duration: 3000, description: "Vulnerable to exploitation" },
        { type: "cr-rights-violated", duration: 3000, description: "Right to life and care violated" },
      ],
      correct: [
        { type: "cr-ngo-intervenes", duration: 3000, description: "NGO pressures authorities" },
        { type: "cr-jj-act-invoked", duration: 3000, description: "Juvenile Justice Act 2015 invoked" },
        { type: "cr-shelter-provided", duration: 3000, description: "State provides shelter and food" },
        { type: "cr-rehabilitation-begins", duration: 3000, description: "Rehabilitation and care begins" },
      ],
    },
    "cr-cyberbullying": {
      setup: [
        { type: "cr-social-media-bullying", duration: 3000, description: "Ananya bullied on social media" },
        { type: "cr-body-shaming", duration: 3000, description: "Classmates post body-shaming content" },
        { type: "cr-school-ignores", duration: 3000, description: "School says 'it's just online talk'" },
        { type: "cr-mental-distress", duration: 3000, description: "Ananya suffers severe mental distress" },
      ],
      wrong: [
        { type: "cr-bullying-escalates", duration: 3000, description: "Cyberbullying escalates" },
        { type: "cr-depression", duration: 3000, description: "Falls into depression and anxiety" },
        { type: "cr-academic-decline", duration: 3000, description: "Academic performance declines" },
        { type: "cr-dignity-violated", duration: 3000, description: "Privacy and dignity completely violated" },
      ],
      correct: [
        { type: "cr-parents-act", duration: 3000, description: "Parents take immediate action" },
        { type: "cr-cybercrime-complaint", duration: 3000, description: "Files complaint on Cyber Crime Portal" },
        { type: "cr-it-act-invoked", duration: 3000, description: "IT Act 2000 Sections 66E, 67B invoked" },
        { type: "cr-bullies-punished", duration: 3000, description: "Bullies face legal action; dignity restored" },
      ],
    },
    // Family & Marriage Laws Scenarios
    "fm-legal-age": {
      setup: [
        { type: "fm-temple-marriage", duration: 3000, description: "Ravi (20) and Priya (17) marry in temple" },
        { type: "fm-friends-witness", duration: 3000, description: "Friends witness the ceremony" },
        { type: "fm-no-parents", duration: 3000, description: "Parents not informed" },
        { type: "fm-priya-underage", duration: 3000, description: "Priya is only 17 years old" },
      ],
      wrong: [
        { type: "fm-marriage-voidable", duration: 3000, description: "Marriage is legally voidable" },
        { type: "fm-punishment-risk", duration: 3000, description: "Legal consequences loom" },
        { type: "fm-priya-vulnerable", duration: 3000, description: "Priya's rights compromised" },
        { type: "fm-child-marriage-act", duration: 3000, description: "Violation of Child Marriage Act 2006" },
      ],
      correct: [
        { type: "fm-wait-legal-age", duration: 3000, description: "Decides to wait until Priya turns 18" },
        { type: "fm-parents-informed", duration: 3000, description: "Informs both families properly" },
        { type: "fm-legal-marriage", duration: 3000, description: "Conducts legal marriage after 18" },
        { type: "fm-rights-protected", duration: 3000, description: "Both partners' rights fully protected" },
      ],
    },
    "fm-registration": {
      setup: [
        { type: "fm-hindu-rituals", duration: 3000, description: "Anjali and Suresh marry per Hindu rituals" },
        { type: "fm-no-registration", duration: 3000, description: "Don't register the marriage" },
        { type: "fm-suresh-denies", duration: 3000, description: "Suresh later denies marriage in court" },
        { type: "fm-anjali-struggles", duration: 3000, description: "Anjali struggles to prove marriage" },
      ],
      wrong: [
        { type: "fm-difficult-proof", duration: 3000, description: "Proving marriage becomes very difficult" },
        { type: "fm-legal-battles", duration: 3000, description: "Costly legal battles ensue" },
        { type: "fm-rights-challenged", duration: 3000, description: "Marital rights challenged" },
        { type: "fm-documentation-critical", duration: 3000, description: "Lack of documentation hurts case" },
      ],
      correct: [
        { type: "fm-shows-witnesses", duration: 3000, description: "Presents witness testimonies" },
        { type: "fm-ritual-photos", duration: 3000, description: "Shows photos and ritual evidence" },
        { type: "fm-hindu-marriage-act", duration: 3000, description: "Invokes Hindu Marriage Act 1955" },
        { type: "fm-marriage-validated", duration: 3000, description: "Marriage validated; rights protected" },
      ],
    },
    "fm-inter-religious": {
      setup: [
        { type: "fm-different-faiths", duration: 3000, description: "Rahul (Hindu) and Fathima (Muslim)" },
        { type: "fm-family-opposes", duration: 3000, description: "Both families oppose marriage" },
        { type: "fm-no-conversion", duration: 3000, description: "Don't want to convert religions" },
        { type: "fm-need-protection", duration: 3000, description: "Need legal protection" },
      ],
      wrong: [
        { type: "fm-forced-conversion", duration: 3000, description: "One forced to convert religion" },
        { type: "fm-family-pressure", duration: 3000, description: "Extreme family pressure" },
        { type: "fm-no-legal-status", duration: 3000, description: "Marriage lacks legal recognition" },
        { type: "fm-inheritance-issues", duration: 3000, description: "Inheritance and custody issues arise" },
      ],
      correct: [
        { type: "fm-special-marriage-act", duration: 3000, description: "Files under Special Marriage Act 1954" },
        { type: "fm-civil-marriage", duration: 3000, description: "Conducts civil marriage ceremony" },
        { type: "fm-legal-recognition", duration: 3000, description: "Marriage legally recognized" },
        { type: "fm-full-rights", duration: 3000, description: "Full inheritance and custody rights" },
      ],
    },
    "fm-domestic-violence": {
      setup: [
        { type: "fm-verbal-abuse", duration: 3000, description: "Ritu faces daily verbal abuse" },
        { type: "fm-threats", duration: 3000, description: "Husband threatens her" },
        { type: "fm-no-divorce-yet", duration: 3000, description: "Doesn't want divorce yet" },
        { type: "fm-fears-escalation", duration: 3000, description: "Fears violence will escalate" },
      ],
      wrong: [
        { type: "fm-abuse-worsens", duration: 3000, description: "Abuse escalates to physical violence" },
        { type: "fm-mental-trauma", duration: 3000, description: "Severe mental trauma develops" },
        { type: "fm-no-protection", duration: 3000, description: "No legal protection sought" },
        { type: "fm-life-danger", duration: 3000, description: "Life in danger" },
      ],
      correct: [
        { type: "fm-files-dv-case", duration: 3000, description: "Files case under PWDVA 2005" },
        { type: "fm-protection-order", duration: 3000, description: "Court issues protection order" },
        { type: "fm-residence-rights", duration: 3000, description: "Gets residence and maintenance orders" },
        { type: "fm-safe-no-divorce", duration: 3000, description: "Safe without needing divorce" },
      ],
    },
    "fm-mutual-divorce": {
      setup: [
        { type: "fm-peaceful-separation", duration: 3000, description: "Meera and Rohan decide to separate" },
        { type: "fm-mutual-agreement", duration: 3000, description: "Both mutually agree to divorce" },
        { type: "fm-no-children", duration: 3000, description: "No children involved" },
        { type: "fm-clean-break", duration: 3000, description: "Want a clean, peaceful separation" },
      ],
      wrong: [
        { type: "fm-contested-divorce", duration: 3000, description: "Files contested divorce" },
        { type: "fm-long-legal-battle", duration: 3000, description: "Years of legal battles" },
        { type: "fm-high-costs", duration: 3000, description: "Expensive court proceedings" },
        { type: "fm-emotional-drain", duration: 3000, description: "Emotional and financial drain" },
      ],
      correct: [
        { type: "fm-section-13b", duration: 3000, description: "Files under Section 13B (HMA)" },
        { type: "fm-one-year-separation", duration: 3000, description: "Completes 1 year separation" },
        { type: "fm-mutual-consent-granted", duration: 3000, description: "Mutual consent divorce granted" },
        { type: "fm-peaceful-closure", duration: 3000, description: "Peaceful closure; both move on" },
      ],
    },
    "fm-maintenance": {
      setup: [
        { type: "fm-after-divorce", duration: 3000, description: "Sunita divorced, no income" },
        { type: "fm-needs-support", duration: 3000, description: "Needs financial support" },
        { type: "fm-husband-refuses", duration: 3000, description: "Ex-husband refuses to pay" },
        { type: "fm-financial-crisis", duration: 3000, description: "Facing financial crisis" },
      ],
      wrong: [
        { type: "fm-destitution", duration: 3000, description: "Falls into destitution" },
        { type: "fm-no-means", duration: 3000, description: "No means of livelihood" },
        { type: "fm-dignity-lost", duration: 3000, description: "Loses dignity and independence" },
        { type: "fm-suffers-poverty", duration: 3000, description: "Suffers in poverty" },
      ],
      correct: [
        { type: "fm-files-125-crpc", duration: 3000, description: "Files under Section 125 CrPC" },
        { type: "fm-court-hearing", duration: 3000, description: "Court conducts hearing" },
        { type: "fm-maintenance-ordered", duration: 3000, description: "Court orders monthly maintenance" },
        { type: "fm-financial-security", duration: 3000, description: "Financial security restored" },
      ],
    },
    "fm-inheritance": {
      setup: [
        { type: "fm-father-dies", duration: 3000, description: "Asha's father dies without will" },
        { type: "fm-brothers-deny", duration: 3000, description: "Brothers deny her share" },
        { type: "fm-girls-dont-inherit", duration: 3000, description: "Say 'girls don't inherit'" },
        { type: "fm-property-division", duration: 3000, description: "Refuse to include her in division" },
      ],
      wrong: [
        { type: "fm-accepts-denial", duration: 3000, description: "Asha accepts discrimination" },
        { type: "fm-loses-rightful-share", duration: 3000, description: "Loses rightful inheritance" },
        { type: "fm-brothers-take-all", duration: 3000, description: "Brothers take entire property" },
        { type: "fm-injustice-prevails", duration: 3000, description: "Gender injustice prevails" },
      ],
      correct: [
        { type: "fm-files-partition-suit", duration: 3000, description: "Files partition suit in court" },
        { type: "fm-succession-act-2005", duration: 3000, description: "Invokes Hindu Succession Act 2005" },
        { type: "fm-equal-coparcenary", duration: 3000, description: "Proves equal coparcenary rights" },
        { type: "fm-equal-share-awarded", duration: 3000, description: "Gets equal share as brothers" },
      ],
    },
    "fm-adoption": {
      setup: [
        { type: "fm-wants-adopt", duration: 3000, description: "Hindu couple wants to adopt child" },
        { type: "fm-legal-adoption", duration: 3000, description: "Want legal adoption process" },
        { type: "fm-full-rights", duration: 3000, description: "Want child to have full rights" },
        { type: "fm-loving-home", duration: 3000, description: "Want to provide loving home" },
      ],
      wrong: [
        { type: "fm-informal-adoption", duration: 3000, description: "Adopts informally without legal process" },
        { type: "fm-no-legal-status", duration: 3000, description: "Child lacks legal status" },
        { type: "fm-no-inheritance", duration: 3000, description: "No inheritance rights" },
        { type: "fm-vulnerable-child", duration: 3000, description: "Child remains vulnerable legally" },
      ],
      correct: [
        { type: "fm-hindu-adoption-act", duration: 3000, description: "Adopts under Hindu Adoption Act 1956" },
        { type: "fm-legal-process", duration: 3000, description: "Completes legal adoption process" },
        { type: "fm-same-as-biological", duration: 3000, description: "Child gets same rights as biological" },
        { type: "fm-family-complete", duration: 3000, description: "Family legally complete" },
      ],
    },
    "fm-custody": {
      setup: [
        { type: "fm-divorce-custody", duration: 3000, description: "Both parents want custody of son (7)" },
        { type: "fm-father-earns-more", duration: 3000, description: "Father earns more money" },
        { type: "fm-child-prefers-mother", duration: 3000, description: "Child prefers to stay with mother" },
        { type: "fm-custody-battle", duration: 3000, description: "Custody battle in court" },
      ],
      wrong: [
        { type: "fm-father-takes-custody", duration: 3000, description: "Father gets custody based on income" },
        { type: "fm-child-unhappy", duration: 3000, description: "Child emotionally distressed" },
        { type: "fm-welfare-ignored", duration: 3000, description: "Child's welfare ignored" },
        { type: "fm-emotional-trauma", duration: 3000, description: "Child suffers emotional trauma" },
      ],
      correct: [
        { type: "fm-family-court-decides", duration: 3000, description: "Family Court evaluates case" },
        { type: "fm-child-welfare-priority", duration: 3000, description: "Child's welfare is priority" },
        { type: "fm-child-preference-considered", duration: 3000, description: "Child's preference considered" },
        { type: "fm-custody-to-mother", duration: 3000, description: "Custody to mother; child happy" },
      ],
    },
    "fm-bigamy": {
      setup: [
        { type: "fm-already-married", duration: 3000, description: "Rajesh already married" },
        { type: "fm-secret-second-marriage", duration: 3000, description: "Secretly marries another woman" },
        { type: "fm-no-divorce", duration: 3000, description: "No divorce from first wife" },
        { type: "fm-first-wife-discovers", duration: 3000, description: "First wife discovers second marriage" },
      ],
      wrong: [
        { type: "fm-bigamy-continues", duration: 3000, description: "Maintains both marriages" },
        { type: "fm-first-wife-suffers", duration: 3000, description: "First wife suffers emotionally" },
        { type: "fm-legal-complications", duration: 3000, description: "Complex legal complications" },
        { type: "fm-criminal-offense", duration: 3000, description: "Criminal offense unpunished" },
      ],
      correct: [
        { type: "fm-first-wife-complains", duration: 3000, description: "First wife files complaint" },
        { type: "fm-ipc-494-invoked", duration: 3000, description: "IPC Section 494 invoked" },
        { type: "fm-second-marriage-void", duration: 3000, description: "Second marriage declared void" },
        { type: "fm-rajesh-imprisoned", duration: 3000, description: "Rajesh faces imprisonment" },
      ],
    },
    "fm-dowry": {
      setup: [
        { type: "fm-dowry-demand", duration: 3000, description: "In-laws demand car and cash" },
        { type: "fm-threats", duration: 3000, description: "Threaten Neha with harm" },
        { type: "fm-parents-pressured", duration: 3000, description: "Parents feel pressured to comply" },
        { type: "fm-neha-scared", duration: 3000, description: "Neha scared for her safety" },
      ],
      wrong: [
        { type: "fm-dowry-given", duration: 3000, description: "Family gives in to demands" },
        { type: "fm-demands-increase", duration: 3000, description: "Demands keep increasing" },
        { type: "fm-violence-escalates", duration: 3000, description: "Violence and harassment escalate" },
        { type: "fm-dowry-death-risk", duration: 3000, description: "Risk of dowry-related violence" },
      ],
      correct: [
        { type: "fm-police-complaint", duration: 3000, description: "Files police complaint" },
        { type: "fm-dowry-act-invoked", duration: 3000, description: "Dowry Prohibition Act 1961 invoked" },
        { type: "fm-498a-ipc", duration: 3000, description: "Section 498A IPC for cruelty" },
        { type: "fm-in-laws-arrested", duration: 3000, description: "In-laws arrested; Neha protected" },
      ],
    },
    "fm-livein": {
      setup: [
        { type: "fm-living-together", duration: 3000, description: "Couple living together 5 years" },
        { type: "fm-not-married", duration: 3000, description: "Not formally married" },
        { type: "fm-domestic-violence", duration: 3000, description: "Woman faces domestic violence" },
        { type: "fm-partner-denies", duration: 3000, description: "Partner denies any responsibility" },
      ],
      wrong: [
        { type: "fm-no-protection-sought", duration: 3000, description: "Doesn't seek legal protection" },
        { type: "fm-abuse-continues", duration: 3000, description: "Abuse continues unchecked" },
        { type: "fm-no-rights-claimed", duration: 3000, description: "Rights not claimed" },
        { type: "fm-suffers-silently", duration: 3000, description: "Suffers in silence" },
      ],
      correct: [
        { type: "fm-pwdva-applies", duration: 3000, description: "PWDVA 2005 covers live-in relationships" },
        { type: "fm-protection-order-livein", duration: 3000, description: "Gets protection order" },
        { type: "fm-residence-maintenance", duration: 3000, description: "Claims residence and maintenance" },
        { type: "fm-livein-rights-protected", duration: 3000, description: "Rights protected despite no marriage" },
      ],
    },
    // Educational Rights Scenarios
    "edu-free-admission": {
      setup: [
        { type: "edu-girl-denied", duration: 3000, description: "8-year-old girl denied admission" },
        { type: "edu-donation-demand", duration: 3000, description: "School demands donation" },
        { type: "edu-poor-family", duration: 3000, description: "Family cannot afford" },
        { type: "edu-admission-refused", duration: 3000, description: "Admission refused" },
      ],
      wrong: [
        { type: "edu-no-education", duration: 3000, description: "Child denied education" },
        { type: "edu-rte-violated", duration: 3000, description: "RTE Act violated" },
        { type: "edu-future-lost", duration: 3000, description: "Future opportunities lost" },
        { type: "edu-illegal-fees", duration: 3000, description: "Illegal capitation fees" },
      ],
      correct: [
        { type: "edu-rte-invoked", duration: 3000, description: "RTE Act 2009 invoked" },
        { type: "edu-free-admission-granted", duration: 3000, description: "Free admission granted" },
        { type: "edu-school-penalized", duration: 3000, description: "School faces penalties" },
        { type: "edu-right-protected", duration: 3000, description: "Right to Education protected" },
      ],
    },
    "edu-discrimination": {
      setup: [
        { type: "edu-religious-denial", duration: 3000, description: "Mohammed denied for religion" },
        { type: "edu-discrimination-act", duration: 3000, description: "Discrimination by school" },
        { type: "edu-constitutional-violation", duration: 3000, description: "Constitutional rights violated" },
        { type: "edu-boy-sad", duration: 3000, description: "Child devastated" },
      ],
      wrong: [
        { type: "edu-discrimination-continues", duration: 3000, description: "Discrimination unchallenged" },
        { type: "edu-inequality-prevails", duration: 3000, description: "Religious inequality prevails" },
        { type: "edu-rights-denied", duration: 3000, description: "Fundamental rights denied" },
        { type: "edu-child-excluded", duration: 3000, description: "Child excluded from education" },
      ],
      correct: [
        { type: "edu-article-15", duration: 3000, description: "Article 15 invoked" },
        { type: "edu-admission-granted", duration: 3000, description: "Admission granted" },
        { type: "edu-school-warned", duration: 3000, description: "School warned of legal action" },
        { type: "edu-equality-restored", duration: 3000, description: "Equality and dignity restored" },
      ],
    },
    "edu-ews-quota": {
      setup: [
        { type: "edu-bpl-family", duration: 3000, description: "Rekha from BPL family" },
        { type: "edu-private-school-refuses", duration: 3000, description: "Private school refuses 25% quota" },
        { type: "edu-quota-denied", duration: 3000, description: "EWS quota seat denied" },
        { type: "edu-girl-disappointed", duration: 3000, description: "Rekha disappointed" },
      ],
      wrong: [
        { type: "edu-quota-violated", duration: 3000, description: "RTE quota violated" },
        { type: "edu-no-private-education", duration: 3000, description: "Denied quality education" },
        { type: "edu-economic-barrier", duration: 3000, description: "Economic barrier persists" },
        { type: "edu-school-unpunished", duration: 3000, description: "School evades responsibility" },
      ],
      correct: [
        { type: "edu-section-12c", duration: 3000, description: "Section 12(1)(c) invoked" },
        { type: "edu-25-percent-quota", duration: 3000, description: "25% quota enforced" },
        { type: "edu-admission-secured", duration: 3000, description: "Admission secured" },
        { type: "edu-ews-rights-protected", duration: 3000, description: "EWS rights protected" },
      ],
    },
    "edu-corporal-punishment": {
      setup: [
        { type: "edu-teacher-slaps", duration: 3000, description: "Teacher slaps student" },
        { type: "edu-low-marks", duration: 3000, description: "Student scored low marks" },
        { type: "edu-physical-abuse", duration: 3000, description: "Physical punishment inflicted" },
        { type: "edu-child-traumatized", duration: 3000, description: "Child traumatized" },
      ],
      wrong: [
        { type: "edu-abuse-continues", duration: 3000, description: "Abuse continues unchecked" },
        { type: "edu-dignity-violated", duration: 3000, description: "Child's dignity violated" },
        { type: "edu-fear-culture", duration: 3000, description: "Culture of fear in classroom" },
        { type: "edu-mental-trauma", duration: 3000, description: "Mental and physical trauma" },
      ],
      correct: [
        { type: "edu-rte-section-17", duration: 3000, description: "RTE Section 17(1) invoked" },
        { type: "edu-teacher-suspended", duration: 3000, description: "Teacher faces action" },
        { type: "edu-safe-environment", duration: 3000, description: "Safe learning environment restored" },
        { type: "edu-punishment-banned", duration: 3000, description: "Corporal punishment banned" },
      ],
    },
    "edu-quality-facilities": {
      setup: [
        { type: "edu-no-toilets", duration: 3000, description: "School lacks toilets" },
        { type: "edu-no-water", duration: 3000, description: "No safe drinking water" },
        { type: "edu-no-teachers", duration: 3000, description: "Insufficient qualified teachers" },
        { type: "edu-poor-infrastructure", duration: 3000, description: "Poor infrastructure" },
      ],
      wrong: [
        { type: "edu-health-issues", duration: 3000, description: "Students face health issues" },
        { type: "edu-learning-suffers", duration: 3000, description: "Learning quality suffers" },
        { type: "edu-attendance-drops", duration: 3000, description: "Attendance drops" },
        { type: "edu-quality-denied", duration: 3000, description: "Quality education denied" },
      ],
      correct: [
        { type: "edu-rte-norms", duration: 3000, description: "RTE Sections 19 & 25 invoked" },
        { type: "edu-facilities-improved", duration: 3000, description: "Facilities provided" },
        { type: "edu-teachers-appointed", duration: 3000, description: "Qualified teachers appointed" },
        { type: "edu-quality-restored", duration: 3000, description: "Quality education ensured" },
      ],
    },
    "edu-disability-rights": {
      setup: [
        { type: "edu-hearing-impaired", duration: 3000, description: "Child with hearing impairment" },
        { type: "edu-school-refuses", duration: 3000, description: "School refuses admission" },
        { type: "edu-no-special-teachers", duration: 3000, description: "Says lacks special teachers" },
        { type: "edu-child-excluded", duration: 3000, description: "Child excluded from education" },
      ],
      wrong: [
        { type: "edu-disability-discrimination", duration: 3000, description: "Disability discrimination" },
        { type: "edu-inclusive-denied", duration: 3000, description: "Inclusive education denied" },
        { type: "edu-rpwd-violated", duration: 3000, description: "RPwD Act violated" },
        { type: "edu-child-isolated", duration: 3000, description: "Child isolated" },
      ],
      correct: [
        { type: "edu-rpwd-act", duration: 3000, description: "RPwD Act 2016 invoked" },
        { type: "edu-inclusive-admission", duration: 3000, description: "Inclusive admission granted" },
        { type: "edu-support-provided", duration: 3000, description: "Special support provided" },
        { type: "edu-equal-opportunity", duration: 3000, description: "Equal learning opportunity" },
      ],
    },
    "edu-midday-meals": {
      setup: [
        { type: "edu-no-meals", duration: 3000, description: "Mid-day meals not provided" },
        { type: "edu-children-hungry", duration: 3000, description: "Children go hungry" },
        { type: "edu-health-deteriorates", duration: 3000, description: "Health deteriorates" },
        { type: "edu-malnutrition", duration: 3000, description: "Malnutrition sets in" },
      ],
      wrong: [
        { type: "edu-students-sick", duration: 3000, description: "Students fall sick" },
        { type: "edu-attendance-affected", duration: 3000, description: "Attendance affected" },
        { type: "edu-nutrition-denied", duration: 3000, description: "Right to nutrition denied" },
        { type: "edu-learning-impacted", duration: 3000, description: "Learning severely impacted" },
      ],
      correct: [
        { type: "edu-meal-scheme", duration: 3000, description: "Mid-Day Meal Scheme enforced" },
        { type: "edu-nutrition-provided", duration: 3000, description: "Nutritious meals provided" },
        { type: "edu-health-improved", duration: 3000, description: "Health and attendance improve" },
        { type: "edu-right-to-food", duration: 3000, description: "Right to food and education upheld" },
      ],
    },
    "edu-dropout-prevention": {
      setup: [
        { type: "edu-child-works", duration: 3000, description: "Ramesh (13) works in garage" },
        { type: "edu-dropout", duration: 3000, description: "Drops out of school" },
        { type: "edu-teacher-ignores", duration: 3000, description: "Teacher ignores issue" },
        { type: "edu-child-labour", duration: 3000, description: "Child labour violation" },
      ],
      wrong: [
        { type: "edu-childhood-lost", duration: 3000, description: "Childhood lost to labour" },
        { type: "edu-education-abandoned", duration: 3000, description: "Education abandoned" },
        { type: "edu-exploitation", duration: 3000, description: "Child exploitation continues" },
        { type: "edu-future-ruined", duration: 3000, description: "Future prospects ruined" },
      ],
      correct: [
        { type: "edu-authorities-notified", duration: 3000, description: "Authorities notified" },
        { type: "edu-child-rescued", duration: 3000, description: "Child rescued from labour" },
        { type: "edu-re-enrolled", duration: 3000, description: "Re-enrolled in school" },
        { type: "edu-childhood-restored", duration: 3000, description: "Right to Childhood restored" },
      ],
    },
    "edu-gender-equality": {
      setup: [
        { type: "edu-only-boys", duration: 3000, description: "Only boys allowed in competition" },
        { type: "edu-girls-excluded", duration: 3000, description: "Girls excluded from science" },
        { type: "edu-gender-bias", duration: 3000, description: "Gender discrimination" },
        { type: "edu-girls-disappointed", duration: 3000, description: "Girls disappointed" },
      ],
      wrong: [
        { type: "edu-discrimination-persists", duration: 3000, description: "Gender bias persists" },
        { type: "edu-girls-demotivated", duration: 3000, description: "Girls demotivated" },
        { type: "edu-inequality-continues", duration: 3000, description: "Inequality in education" },
        { type: "edu-potential-wasted", duration: 3000, description: "Girls' potential wasted" },
      ],
      correct: [
        { type: "edu-article-14-15", duration: 3000, description: "Articles 14 & 15 invoked" },
        { type: "edu-equal-participation", duration: 3000, description: "Equal participation ensured" },
        { type: "edu-girls-empowered", duration: 3000, description: "Girls empowered" },
        { type: "edu-gender-equality-achieved", duration: 3000, description: "Gender equality in education" },
      ],
    },
    "edu-mother-tongue": {
      setup: [
        { type: "edu-tribal-students", duration: 3000, description: "Tribal students struggle" },
        { type: "edu-unknown-language", duration: 3000, description: "Forced to study in unknown language" },
        { type: "edu-learning-fails", duration: 3000, description: "Learning outcomes poor" },
        { type: "edu-cultural-violation", duration: 3000, description: "Cultural rights violated" },
      ],
      wrong: [
        { type: "edu-linguistic-barrier", duration: 3000, description: "Linguistic barrier persists" },
        { type: "edu-students-fail", duration: 3000, description: "Students fail academically" },
        { type: "edu-culture-suppressed", duration: 3000, description: "Culture and identity suppressed" },
        { type: "edu-dropout-risk", duration: 3000, description: "High dropout risk" },
      ],
      correct: [
        { type: "edu-nep-2020", duration: 3000, description: "NEP 2020 implemented" },
        { type: "edu-mother-tongue-education", duration: 3000, description: "Mother tongue education provided" },
        { type: "edu-learning-improved", duration: 3000, description: "Learning outcomes improve" },
        { type: "edu-linguistic-rights", duration: 3000, description: "Linguistic and cultural rights protected" },
      ],
    },
    // Environmental Laws Scenarios
    "factory-pollution": {
      setup: [
        { type: "env-factory-riverside", duration: 3000, description: "Factory located near Rahul's village river" },
        { type: "env-chemical-waste-pipe", duration: 3000, description: "Untreated chemical waste pipe visible" },
        { type: "env-dead-fish-floating", duration: 3000, description: "Dead fish floating in contaminated water" },
        { type: "env-villagers-sick", duration: 3000, description: "Villagers falling sick from drinking water" },
      ],
      wrong: [
        { type: "env-ignore-pollution", duration: 3000, description: "Villagers ignore the pollution problem" },
        { type: "env-more-waste-dumped", duration: 3000, description: "Factory continues dumping toxic waste" },
        { type: "env-health-crisis-worsens", duration: 3000, description: "Health crisis worsens in the village" },
        { type: "env-right-to-life-violated", duration: 3000, description: "Article 21 right to clean environment violated" },
      ],
      correct: [
        { type: "env-villagers-document-evidence", duration: 3000, description: "Rahul documents water contamination" },
        { type: "env-file-complaint-pcb", duration: 3000, description: "Files complaint with Pollution Control Board" },
        { type: "env-factory-inspected", duration: 3000, description: "Authorities inspect factory operations" },
        { type: "env-treatment-plant-installed", duration: 3000, description: "Factory installs waste treatment plant" },
      ],
    },
    "illegal-deforestation": {
      setup: [
        { type: "env-forest-area", duration: 3000, description: "Dense forest area for resort project" },
        { type: "env-chainsaws-cutting", duration: 3000, description: "Construction company cutting hundreds of trees" },
        { type: "env-no-clearance-shown", duration: 3000, description: "No government clearance obtained" },
        { type: "env-wildlife-fleeing", duration: 3000, description: "Wildlife fleeing from habitat destruction" },
      ],
      wrong: [
        { type: "env-deforestation-continues", duration: 3000, description: "Tree cutting continues unchecked" },
        { type: "env-ecosystem-destroyed", duration: 3000, description: "Forest ecosystem completely destroyed" },
        { type: "env-climate-impact", duration: 3000, description: "Local climate adversely affected" },
        { type: "env-biodiversity-lost", duration: 3000, description: "Biodiversity permanently lost" },
      ],
      correct: [
        { type: "env-activists-alerted", duration: 3000, description: "Environmental activists alerted" },
        { type: "env-forest-dept-complaint", duration: 3000, description: "Complaint filed with Forest Department" },
        { type: "env-cutting-stopped", duration: 3000, description: "Court orders immediate stop to cutting" },
        { type: "env-reforestation-ordered", duration: 3000, description: "Company ordered to plant compensatory trees" },
      ],
    },
    "vehicular-pollution": {
      setup: [
        { type: "env-city-traffic", duration: 3000, description: "Priya observes city bus traffic" },
        { type: "env-diesel-smoke-thick", duration: 3000, description: "Dense black smoke from diesel buses" },
        { type: "env-people-coughing", duration: 3000, description: "People coughing due to smoke" },
        { type: "env-complaint-ignored", duration: 3000, description: "Initial complaints to authorities ignored" },
      ],
      wrong: [
        { type: "env-air-quality-worsens", duration: 3000, description: "Air quality index reaches hazardous levels" },
        { type: "env-respiratory-diseases", duration: 3000, description: "Respiratory diseases increase in city" },
        { type: "env-children-affected", duration: 3000, description: "Children especially affected by pollution" },
        { type: "env-health-crisis", duration: 3000, description: "Public health crisis declared" },
      ],
      correct: [
        { type: "env-priya-documents-buses", duration: 3000, description: "Priya documents polluting buses with photos" },
        { type: "env-spcb-complaint", duration: 3000, description: "Files complaint with State Pollution Control Board" },
        { type: "env-emission-testing", duration: 3000, description: "Buses undergo mandatory emission testing" },
        { type: "env-clean-buses-deployed", duration: 3000, description: "Old buses retired, clean vehicles deployed" },
      ],
    },
    "plastic-pollution": {
      setup: [
        { type: "env-grocery-shop", duration: 3000, description: "Grocery shop in residential area" },
        { type: "env-plastic-bags-used", duration: 3000, description: "Shop using banned single-use plastic bags" },
        { type: "env-customer-notices", duration: 3000, description: "Customer notices illegal plastic use" },
        { type: "env-shopkeeper-dismissive", duration: 3000, description: "Shopkeeper dismisses concerns" },
      ],
      wrong: [
        { type: "env-plastic-waste-piles", duration: 3000, description: "Plastic waste accumulates in neighborhood" },
        { type: "env-drains-clogged", duration: 3000, description: "Drainage systems clogged with plastic" },
        { type: "env-animals-harmed", duration: 3000, description: "Stray animals consume plastic and suffer" },
        { type: "env-environment-degraded", duration: 3000, description: "Local environment severely degraded" },
      ],
      correct: [
        { type: "env-customer-educates", duration: 3000, description: "Customer informs shopkeeper about ban" },
        { type: "env-municipal-complaint", duration: 3000, description: "Reports violation to municipal authorities" },
        { type: "env-fine-imposed", duration: 3000, description: "Shop fined under Environment Protection Act" },
        { type: "env-cloth-bags-adopted", duration: 3000, description: "Shop switches to eco-friendly cloth bags" },
      ],
    },
    "noise-pollution": {
      setup: [
        { type: "env-temple-night", duration: 3000, description: "Temple festival at midnight" },
        { type: "env-loud-loudspeakers", duration: 3000, description: "Loudspeakers blaring at full volume" },
        { type: "env-hospital-nearby", duration: 3000, description: "Hospital and residences disturbed" },
        { type: "env-patients-suffering", duration: 3000, description: "Patients and babies unable to sleep" },
      ],
      wrong: [
        { type: "env-noise-continues", duration: 3000, description: "Loudspeakers continue past midnight" },
        { type: "env-health-deteriorates", duration: 3000, description: "Residents' health deteriorates" },
        { type: "env-stress-increases", duration: 3000, description: "Stress and hearing problems increase" },
        { type: "env-peace-disturbed", duration: 3000, description: "Community peace permanently disturbed" },
      ],
      correct: [
        { type: "env-residents-approach", duration: 3000, description: "Residents approach temple committee" },
        { type: "env-noise-rules-cited", duration: 3000, description: "Cites Noise Pollution Rules 2000" },
        { type: "env-police-intervene", duration: 3000, description: "Police ensure sound level compliance" },
        { type: "env-volume-lowered", duration: 3000, description: "Temple reduces volume, respects 10 PM rule" },
      ],
    },
    "wildlife-poaching": {
      setup: [
        { type: "env-national-park", duration: 3000, description: "Hunters enter national park illegally" },
        { type: "env-deer-targeted", duration: 3000, description: "Protected deer spotted by hunters" },
        { type: "env-shots-fired", duration: 3000, description: "Hunters fire at animals" },
        { type: "env-deer-killed", duration: 3000, description: "Deer killed in protected area" },
      ],
      wrong: [
        { type: "env-poaching-continues", duration: 3000, description: "Poachers escape, continue hunting" },
        { type: "env-deer-population-declines", duration: 3000, description: "Deer population rapidly declines" },
        { type: "env-ecosystem-imbalance", duration: 3000, description: "Ecosystem balance disrupted" },
        { type: "env-species-endangered", duration: 3000, description: "Species pushed toward extinction" },
      ],
      correct: [
        { type: "env-rangers-alerted", duration: 3000, description: "Forest rangers hear gunshots" },
        { type: "env-poachers-caught", duration: 3000, description: "Hunters caught in the act" },
        { type: "env-wildlife-act-invoked", duration: 3000, description: "Charged under Wildlife Protection Act 1972" },
        { type: "env-imprisonment-fine", duration: 3000, description: "Poachers imprisoned and heavily fined" },
      ],
    },
    "industrial-pollution": {
      setup: [
        { type: "env-industrial-area", duration: 3000, description: "Factory in residential neighborhood" },
        { type: "env-black-smoke-daily", duration: 3000, description: "Black smoke released without filters daily" },
        { type: "env-residents-coughing", duration: 3000, description: "Nearby residents develop breathing issues" },
        { type: "env-children-asthma", duration: 3000, description: "Children diagnosed with asthma" },
      ],
      wrong: [
        { type: "env-pollution-unchecked", duration: 3000, description: "Industrial pollution continues unchecked" },
        { type: "env-chronic-diseases", duration: 3000, description: "Chronic respiratory diseases spread" },
        { type: "env-life-expectancy-drops", duration: 3000, description: "Life expectancy drops in area" },
        { type: "env-mass-health-crisis", duration: 3000, description: "Community faces health emergency" },
      ],
      correct: [
        { type: "env-residents-unite", duration: 3000, description: "Residents form action committee" },
        { type: "env-pcb-inspection", duration: 3000, description: "Pollution Control Board inspects factory" },
        { type: "env-air-filters-mandated", duration: 3000, description: "Factory ordered to install air filters" },
        { type: "env-compliance-achieved", duration: 3000, description: "Air quality improves, health restored" },
      ],
    },
    "waste-dumping": {
      setup: [
        { type: "env-housing-society", duration: 3000, description: "Housing society with waste problem" },
        { type: "env-garbage-dumped-open", duration: 3000, description: "Solid waste dumped in open plot" },
        { type: "env-no-segregation", duration: 3000, description: "No waste segregation practiced" },
        { type: "env-stench-spread", duration: 3000, description: "Foul smell spreads in neighborhood" },
      ],
      wrong: [
        { type: "env-waste-pile-grows", duration: 3000, description: "Waste pile grows larger daily" },
        { type: "env-disease-outbreak", duration: 3000, description: "Vector-borne diseases outbreak" },
        { type: "env-groundwater-contaminated", duration: 3000, description: "Groundwater contaminated by leachate" },
        { type: "env-public-health-emergency", duration: 3000, description: "Public health emergency declared" },
      ],
      correct: [
        { type: "env-resident-complaint", duration: 3000, description: "Resident files complaint with municipality" },
        { type: "env-swm-rules-cited", duration: 3000, description: "Cites Solid Waste Management Rules 2016" },
        { type: "env-segregation-bins", duration: 3000, description: "Society installs segregation bins" },
        { type: "env-proper-disposal", duration: 3000, description: "Waste properly collected and disposed" },
      ],
    },
    "burning-plastic": {
      setup: [
        { type: "env-backyard-scene", duration: 3000, description: "Rohit in his backyard with waste" },
        { type: "env-plastic-pile", duration: 3000, description: "Pile of plastic waste accumulated" },
        { type: "env-sets-fire", duration: 3000, description: "Sets plastic on fire to dispose" },
        { type: "env-toxic-fumes", duration: 3000, description: "Thick toxic black smoke released" },
      ],
      wrong: [
        { type: "env-burning-continues", duration: 3000, description: "Rohit continues burning plastic regularly" },
        { type: "env-neighbors-affected", duration: 3000, description: "Neighbors inhale toxic dioxins" },
        { type: "env-cancer-risk", duration: 3000, description: "Cancer risk increases in neighborhood" },
        { type: "env-civic-duty-violated", duration: 3000, description: "Article 51A(g) environmental duty violated" },
      ],
      correct: [
        { type: "env-neighbor-educates", duration: 3000, description: "Neighbor explains health hazards" },
        { type: "env-article-51a-cited", duration: 3000, description: "Reminds about fundamental duty Article 51A(g)" },
        { type: "env-plastic-recycled", duration: 3000, description: "Rohit sends plastic for recycling" },
        { type: "env-community-aware", duration: 3000, description: "Community adopts proper waste disposal" },
      ],
    },
    "eia-violation": {
      setup: [
        { type: "env-protected-forest", duration: 3000, description: "Protected forest area near power plant site" },
        { type: "env-construction-starts", duration: 3000, description: "Company starts construction without clearance" },
        { type: "env-bulldozers-forest", duration: 3000, description: "Bulldozers clearing forest land" },
        { type: "env-no-eia-done", duration: 3000, description: "No Environmental Impact Assessment done" },
      ],
      wrong: [
        { type: "env-construction-proceeds", duration: 3000, description: "Construction proceeds illegally" },
        { type: "env-wildlife-displaced", duration: 3000, description: "Wildlife habitat destroyed, animals displaced" },
        { type: "env-ecosystem-destroyed", duration: 3000, description: "Entire ecosystem irreversibly damaged" },
        { type: "env-violation-unpunished", duration: 3000, description: "Company escapes without consequences" },
      ],
      correct: [
        { type: "env-activists-intervene", duration: 3000, description: "Environmental activists discover violation" },
        { type: "env-ngc-petition", duration: 3000, description: "Petition filed in National Green Tribunal" },
        { type: "env-eia-violation-proven", duration: 3000, description: "EIA Notification 2006 violation proven" },
        { type: "env-project-halted", duration: 3000, description: "Project halted, company heavily penalized" },
      ],
    },
  }

function BriefcaseSVG() {
  return (
    <svg width="50" height="40" viewBox="0 0 50 40" className="drop-shadow-lg">
      <rect x="8" y="14" width="34" height="20" fill="#1f2937" rx="3" />
      <rect x="18" y="8" width="14" height="6" fill="#374151" rx="2" />
      <rect x="22" y="22" width="6" height="3" fill="#fbbf24" />
    </svg>
  )
}

function PhoneCallSVG() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-lg">
      <circle cx="20" cy="20" r="18" fill="#10b981" />
      <path d="M12 24c4 5 12 5 16 0l-3-3c-2 2-8 2-10 0l-3 3z" fill="#ffffff" />
    </svg>
  )
}

function HandcuffsSVG() {
  return (
    <svg width="60" height="40" viewBox="0 0 60 40" className="drop-shadow-lg">
      <circle cx="18" cy="20" r="8" stroke="#111827" strokeWidth="3" fill="none" />
      <circle cx="42" cy="20" r="8" stroke="#111827" strokeWidth="3" fill="none" />
      <line x1="26" y1="20" x2="34" y2="20" stroke="#111827" strokeWidth="3" />
    </svg>
  )
}

function GavelSVG() {
  return (
    <svg width="50" height="40" viewBox="0 0 50 40" className="drop-shadow-lg">
      <rect x="8" y="24" width="34" height="6" fill="#92400e" />
      <rect x="18" y="10" width="8" height="10" fill="#92400e" />
      <rect x="26" y="10" width="8" height="10" fill="#92400e" />
      <rect x="14" y="18" width="24" height="4" fill="#b45309" />
    </svg>
  )
}

function KeySVG() {
  return (
    <svg width="50" height="40" viewBox="0 0 50 40" className="drop-shadow-lg">
      <circle cx="14" cy="20" r="6" stroke="#f59e0b" strokeWidth="3" fill="none" />
      <rect x="20" y="18" width="20" height="4" fill="#f59e0b" />
      <rect x="38" y="18" width="4" height="6" fill="#f59e0b" />
    </svg>
  )
}

function NoSpeechSVG() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-lg">
      <circle cx="20" cy="20" r="18" fill="#ef4444" />
      <rect x="10" y="18" width="20" height="4" fill="#ffffff" />
    </svg>
  )
}

function InterviewerSVG() {
  return (
    <svg width="60" height="80" viewBox="0 0 60 80" className="drop-shadow-lg">
      {/* Head */}
      <circle cx="30" cy="18" r="12" stroke="#1f2937" strokeWidth="3" fill="none" />
      {/* Face */}
      <circle cx="26" cy="15" r="1.5" fill="#1f2937" />
      <circle cx="34" cy="15" r="1.5" fill="#1f2937" />
      <line x1="26" y1="20" x2="34" y2="20" stroke="#1f2937" strokeWidth="1.5" />
      {/* Glasses */}
      <circle cx="26" cy="16" r="3" stroke="#374151" strokeWidth="1.5" fill="none" />
      <circle cx="34" cy="16" r="3" stroke="#374151" strokeWidth="1.5" fill="none" />
      <line x1="29" y1="16" x2="31" y2="16" stroke="#374151" strokeWidth="1.5" />
      {/* Suit */}
      <rect x="24" y="30" width="12" height="25" fill="#1f2937" rx="2" />
      <line x1="30" y1="30" x2="30" y2="55" stroke="#ffffff" strokeWidth="2" />
      {/* Tie */}
      <polygon points="30,30 28,35 30,50 32,35" fill="#dc2626" />
      {/* Arms crossed */}
      <line x1="30" y1="38" x2="15" y2="42" stroke="#1f2937" strokeWidth="3" />
      <line x1="30" y1="38" x2="45" y2="42" stroke="#1f2937" strokeWidth="3" />
      {/* Legs */}
      <line x1="30" y1="55" x2="18" y2="75" stroke="#1f2937" strokeWidth="3" />
      <line x1="30" y1="55" x2="42" y2="75" stroke="#1f2937" strokeWidth="3" />
    </svg>
  )
}

function ShopkeeperSVG() {
  return (
    <svg width="60" height="80" viewBox="0 0 60 80" className="drop-shadow-lg">
      {/* Head */}
      <circle cx="30" cy="18" r="12" stroke="#f97316" strokeWidth="3" fill="none" />
      {/* Face */}
      <circle cx="26" cy="15" r="1.5" fill="#f97316" />
      <circle cx="34" cy="15" r="1.5" fill="#f97316" />
      <line x1="26" y1="20" x2="34" y2="20" stroke="#f97316" strokeWidth="1.5" />
      {/* Apron */}
      <rect x="24" y="30" width="12" height="25" fill="#f97316" rx="1" />
      <rect x="26" y="32" width="8" height="4" fill="#ffffff" />
      {/* Body */}
      <line x1="30" y1="30" x2="30" y2="55" stroke="#f97316" strokeWidth="4" />
      {/* Arms */}
      <line x1="30" y1="38" x2="18" y2="48" stroke="#f97316" strokeWidth="3" />
      <line x1="30" y1="38" x2="42" y2="48" stroke="#f97316" strokeWidth="3" />
      {/* Legs */}
      <line x1="30" y1="55" x2="18" y2="75" stroke="#f97316" strokeWidth="3" />
      <line x1="30" y1="55" x2="42" y2="75" stroke="#f97316" strokeWidth="3" />
    </svg>
  )
}

function WaiterSVG() {
  return (
    <svg width="60" height="80" viewBox="0 0 60 80" className="drop-shadow-lg">
      {/* Head */}
      <circle cx="30" cy="18" r="12" stroke="#6b7280" strokeWidth="3" fill="none" />
      {/* Face */}
      <circle cx="26" cy="15" r="1.5" fill="#6b7280" />
      <circle cx="34" cy="15" r="1.5" fill="#6b7280" />
      <line x1="26" y1="20" x2="34" y2="20" stroke="#6b7280" strokeWidth="1.5" />
      {/* Uniform */}
      <rect x="24" y="30" width="12" height="25" fill="#1f2937" rx="1" />
      <rect x="27" y="32" width="6" height="3" fill="#ffffff" />
      {/* Body */}
      <line x1="30" y1="30" x2="30" y2="55" stroke="#6b7280" strokeWidth="4" />
      {/* Arms holding tray */}
      <line x1="30" y1="38" x2="18" y2="38" stroke="#6b7280" strokeWidth="3" />
      <line x1="30" y1="38" x2="42" y2="38" stroke="#6b7280" strokeWidth="3" />
      <rect x="12" y="36" width="10" height="4" fill="#92400e" rx="1" />
      {/* Legs */}
      <line x1="30" y1="55" x2="18" y2="75" stroke="#6b7280" strokeWidth="3" />
      <line x1="30" y1="55" x2="42" y2="75" stroke="#6b7280" strokeWidth="3" />
    </svg>
  )
}

function LawyerSVG() {
  return (
    <svg width="60" height="80" viewBox="0 0 60 80" className="drop-shadow-lg">
      {/* Head */}
      <circle cx="30" cy="18" r="12" stroke="#1e40af" strokeWidth="3" fill="none" />
      {/* Face */}
      <circle cx="26" cy="15" r="1.5" fill="#1e40af" />
      <circle cx="34" cy="15" r="1.5" fill="#1e40af" />
      <path d="M 22 20 Q 30 24 38 20" stroke="#1e40af" strokeWidth="2" fill="none" />
      {/* Suit with briefcase */}
      <rect x="24" y="30" width="12" height="25" fill="#1e40af" rx="2" />
      <line x1="30" y1="30" x2="30" y2="55" stroke="#1e40af" strokeWidth="4" />
      {/* Arms */}
      <line x1="30" y1="38" x2="18" y2="48" stroke="#1e40af" strokeWidth="3" />
      <line x1="30" y1="38" x2="42" y2="48" stroke="#1e40af" strokeWidth="3" />
      {/* Briefcase */}
      <rect x="36" y="46" width="8" height="6" fill="#92400e" rx="1" />
      {/* Legs */}
      <line x1="30" y1="55" x2="18" y2="75" stroke="#1e40af" strokeWidth="3" />
      <line x1="30" y1="55" x2="42" y2="75" stroke="#1e40af" strokeWidth="3" />
    </svg>
  )
}

function DoctorSVG() {
  return (
    <svg width="60" height="80" viewBox="0 0 60 80" className="drop-shadow-lg">
      {/* Head */}
      <circle cx="30" cy="18" r="12" stroke="#10b981" strokeWidth="3" fill="none" />
      {/* Face */}
      <circle cx="26" cy="15" r="1.5" fill="#10b981" />
      <circle cx="34" cy="15" r="1.5" fill="#10b981" />
      <line x1="26" y1="20" x2="34" y2="20" stroke="#10b981" strokeWidth="1.5" />
      {/* Medical coat */}
      <rect x="24" y="30" width="12" height="25" fill="#ffffff" stroke="#10b981" strokeWidth="2" rx="1" />
      {/* Cross symbol */}
      <rect x="28" y="38" width="4" height="10" fill="#ef4444" />
      <rect x="26" y="40" width="8" height="4" fill="#ef4444" />
      {/* Body */}
      <line x1="30" y1="30" x2="30" y2="55" stroke="#10b981" strokeWidth="4" />
      {/* Arms */}
      <line x1="30" y1="38" x2="18" y2="48" stroke="#10b981" strokeWidth="3" />
      <line x1="30" y1="38" x2="42" y2="48" stroke="#10b981" strokeWidth="3" />
      {/* Legs */}
      <line x1="30" y1="55" x2="18" y2="75" stroke="#10b981" strokeWidth="3" />
      <line x1="30" y1="55" x2="42" y2="75" stroke="#10b981" strokeWidth="3" />
    </svg>
  )
}

function MagistrateSVG() {
  return (
    <svg width="60" height="80" viewBox="0 0 60 80" className="drop-shadow-lg">
      {/* Head */}
      <circle cx="30" cy="18" r="12" stroke="#92400e" strokeWidth="3" fill="none" />
      {/* Face */}
      <circle cx="26" cy="15" r="1.5" fill="#92400e" />
      <circle cx="34" cy="15" r="1.5" fill="#92400e" />
      <line x1="26" y1="20" x2="34" y2="20" stroke="#92400e" strokeWidth="1.5" />
      {/* Judicial robe */}
      <rect x="22" y="30" width="16" height="25" fill="#1f2937" rx="2" />
      <rect x="24" y="32" width="12" height="4" fill="#fbbf24" />
      {/* Body */}
      <line x1="30" y1="30" x2="30" y2="55" stroke="#92400e" strokeWidth="4" />
      {/* Arms */}
      <line x1="30" y1="38" x2="18" y2="48" stroke="#92400e" strokeWidth="3" />
      <line x1="30" y1="38" x2="42" y2="48" stroke="#92400e" strokeWidth="3" />
      {/* Legs */}
      <line x1="30" y1="55" x2="18" y2="75" stroke="#92400e" strokeWidth="3" />
      <line x1="30" y1="55" x2="42" y2="75" stroke="#92400e" strokeWidth="3" />
    </svg>
  )
}

function BackgroundPersonSVG({ color = "#9ca3af" }) {
  return (
    <svg width="40" height="60" viewBox="0 0 40 60" className="opacity-40">
      {/* Head */}
      <circle cx="20" cy="12" r="8" stroke={color} strokeWidth="2" fill="none" />
      {/* Body */}
      <line x1="20" y1="20" x2="20" y2="40" stroke={color} strokeWidth="3" />
      {/* Arms */}
      <line x1="20" y1="26" x2="12" y2="34" stroke={color} strokeWidth="2" />
      <line x1="20" y1="26" x2="28" y2="34" stroke={color} strokeWidth="2" />
      {/* Legs */}
      <line x1="20" y1="40" x2="14" y2="56" stroke={color} strokeWidth="2" />
      <line x1="20" y1="40" x2="26" y2="56" stroke={color} strokeWidth="2" />
    </svg>
  )
}

function SpeechBubbleSVG({ text, color = "#3b82f6" }) {
  return (
    <div className="relative">
      <div className={`bg-${color} text-white px-3 py-2 rounded-lg shadow-lg max-w-xs text-sm`}>
        {text}
      </div>
      <div className={`absolute -bottom-2 left-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-${color}`} />
    </div>
  )
}

function MoneyBillSVG() {
  return (
    <svg width="60" height="30" viewBox="0 0 60 30" className="drop-shadow-lg">
      <rect x="2" y="5" width="56" height="20" fill="#10b981" stroke="#047857" strokeWidth="2" rx="2" />
      <circle cx="30" cy="15" r="6" fill="#065f46" />
      <text x="30" y="18" textAnchor="middle" fontSize="8" fill="#ffffff" fontWeight="bold">₹</text>
      <rect x="8" y="8" width="10" height="4" fill="#047857" opacity="0.5" />
      <rect x="42" y="8" width="10" height="4" fill="#047857" opacity="0.5" />
    </svg>
  )
}

function FoodPlateSVG({ contaminated = false }) {
  return (
    <svg width="50" height="40" viewBox="0 0 50 40" className="drop-shadow-lg">
      {/* Plate */}
      <ellipse cx="25" cy="30" rx="22" ry="8" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2" />
      {/* Food */}
      <ellipse cx="25" cy="20" rx="15" ry="10" fill={contaminated ? "#7c2d12" : "#f97316"} />
      <ellipse cx="20" cy="18" rx="6" ry="5" fill={contaminated ? "#991b1b" : "#fb923c"} />
      <ellipse cx="30" cy="18" rx="6" ry="5" fill={contaminated ? "#991b1b" : "#fb923c"} />
      {contaminated && (
        <>
          <circle cx="22" cy="20" r="2" fill="#15803d" />
          <circle cx="28" cy="19" r="2" fill="#15803d" />
          <line x1="18" y1="15" x2="32" y2="15" stroke="#dc2626" strokeWidth="2" />
        </>
      )}
    </svg>
  )
}

// Small utility SVGs for legal document and medical kit cues
function DocumentSVG() {
  return (
    <svg width="50" height="60" viewBox="0 0 50 60" className="drop-shadow-lg">
      <rect x="8" y="6" width="34" height="48" fill="#ffffff" stroke="#111827" strokeWidth="2" rx="4" />
      <line x1="14" y1="16" x2="36" y2="16" stroke="#6b7280" strokeWidth="2" />
      <line x1="14" y1="22" x2="34" y2="22" stroke="#9ca3af" strokeWidth="2" />
      <line x1="14" y1="28" x2="30" y2="28" stroke="#9ca3af" strokeWidth="2" />
      <rect x="14" y="36" width="22" height="10" fill="#10b981" rx="2" />
      <text x="25" y="43" textAnchor="middle" fontSize="8" fill="#ffffff">ID</text>
    </svg>
  )
}

function MedicalKitSVG() {
  return (
    <svg width="50" height="40" viewBox="0 0 50 40" className="drop-shadow-lg">
      <rect x="5" y="12" width="40" height="22" fill="#ef4444" rx="3" />
      <rect x="15" y="6" width="20" height="8" fill="#9ca3af" rx="2" />
      <rect x="18" y="8" width="14" height="4" fill="#e5e7eb" rx="1" />
      <rect x="23" y="16" width="4" height="14" fill="#ffffff" />
      <rect x="18" y="21" width="14" height="4" fill="#ffffff" />
    </svg>
  )
}

  const currentScenario = scenarios[scenarioType] || scenarios["police-stop"]
  const scenes = currentScenario[outcome] || currentScenario.setup

  // Reset state when scenarioType or outcome changes
  useEffect(() => {
    setCurrentScene(0)
    setAnimationComplete(false)
  }, [scenarioType, outcome])

  useEffect(() => {
    if (currentScene < scenes.length) {
      const timer = setTimeout(() => {
        setCurrentScene(currentScene + 1)
      }, scenes[currentScene].duration)

      return () => clearTimeout(timer)
    } else {
      setAnimationComplete(true)
      if (onComplete) {
        setTimeout(onComplete, 1000)
      }
    }
  }, [currentScene, scenes, onComplete])

  const renderScene = (sceneType, description) => {
    switch (sceneType) {
      // Police Stop Scenarios
      case "car-approach":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <motion.div
              className="absolute bottom-20 left-0"
              animate={{ x: [0, 200] }}
              transition={{ duration: 2.5, ease: "linear" }}
            >
              <DetailedCarSVG />
            </motion.div>
            <div className="absolute bottom-24 right-32">
              <DetailedPoliceSVG />
            </div>
            <div className="absolute bottom-24 right-60">
              <DetailedBarrierSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )

    case "road":
      return (
        <div className="absolute inset-0">
          {/* Sky gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-blue-200 to-blue-100"></div>

          {/* Buildings silhouettes */}
          <div className="absolute bottom-24 left-0 w-full h-12 bg-gradient-to-t from-gray-400 to-gray-300 opacity-70"></div>

          {/* Road */}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gray-600"></div>
          <div className="absolute bottom-8 left-0 w-full h-2 bg-yellow-400"></div>
          <div className="absolute bottom-9 left-10 w-10 h-1 bg-white"></div>
          <div className="absolute bottom-9 left-32 w-10 h-1 bg-white"></div>
          <div className="absolute bottom-9 left-56 w-10 h-1 bg-white"></div>
        </div>
      )

    case "intersection":
      return (
        <div className="absolute inset-0">
          {/* Sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-100"></div>
          {/* Cross roads */}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gray-600"></div>
          <div className="absolute inset-x-1/2 -translate-x-1/2 bottom-0 w-24 h-full bg-gray-600"></div>
          {/* Zebra */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="absolute" style={{ left: `${20 + i * 10}%`, bottom: 80 }}>
              <div className="w-6 h-2 bg-white"></div>
            </div>
          ))}
        </div>
      )

      // Criminal Law – Specific visuals per scene
      case "police-approach":
      case "no-reason-given":
      case "detainee-asks-reason":
      case "demand-reason":
      case "show-warrant":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <motion.div className="absolute bottom-24 left-24" animate={sceneType === "detainee-asks-reason" ? { scale: [1, 1.05, 1] } : {}} transition={{ duration: 0.8 }}>
              <DetailedStickmanSVG type="citizen" />
            </motion.div>
            <motion.div className="absolute bottom-24 right-32" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
              <DetailedPoliceSVG />
            </motion.div>
            <div className="absolute bottom-24 right-8">
              <DetailedCarSVG />
            </div>
            {sceneType === "show-warrant" && (
              <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200 }}>
                <DocumentSVG />
              </motion.div>
            )}
            <div className="absolute bottom-28 left-8">
              <BackgroundPersonSVG color="#6b7280" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Lawyer presence / interrogation context
      case "meets-lawyer":
      case "interrogation-paused":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="police-station" />
            <div className="absolute bottom-24 left-16">
              <OfficeDeskSVG />
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <LawyerSVG />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-24 left-8">
              <DetailedPoliceSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "interrogation-without-counsel":
      case "interrogation-pressure":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="police-station" />
            <div className="absolute bottom-24 left-16">
              <OfficeDeskSVG />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2">
              <NoSpeechSVG />
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedPoliceSVG aggressive />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedStickmanSVG type="scared" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Right to silence signals
      case "invokes-20-3":
      case "remains-silent":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="police-station" />
            <div className="absolute bottom-24 left-16">
              <OfficeDeskSVG />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2">
              <NoSpeechSVG />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Inform relative/friend
      case "police-inform-relative":
      case "relative-arrives":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <PhoneCallSVG />
            </motion.div>
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="citizen" />
            </div>
            {sceneType === "relative-arrives" && (
              <motion.div className="absolute bottom-24 right-1/3" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.2 }}>
                <DetailedStickmanSVG type="customer" />
              </motion.div>
            )}
            <SceneDescription text={description} />
          </div>
        )

      // Production before magistrate
      case "produced-within-24h":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="court" />
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <GavelSVG />
            </motion.div>
            <div className="absolute bottom-24 left-1/4">
              <MagistrateSVG />
            </div>
            <motion.div className="absolute bottom-24 right-1/4" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
              <DetailedStickmanSVG type="citizen" />
            </motion.div>
            <div className="absolute bottom-24 left-8">
              <DetailedPoliceSVG />
            </div>
            <div className="absolute bottom-28 right-8">
              <BackgroundPersonSVG color="#92400e" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "produced-late":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="jail" />
            <div className="absolute top-10 left-1/2 -translate-x-1/2">
              <GavelSVG />
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Bail visuals
      case "release-on-bond":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="jail" />
            <div className="absolute top-10 left-1/2 -translate-x-1/2">
              <KeySVG />
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Handcuffing visuals
      case "cuffs-applied":
      case "unnecessary-restraint":
      case "cuffs-removed":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ rotate: sceneType === "cuffs-applied" ? [0, 10, -10, 0] : 0 }} transition={{ duration: 1 }}>
              <HandcuffsSVG />
            </motion.div>
            <motion.div className="absolute bottom-24 left-24" animate={sceneType === "unnecessary-restraint" ? { x: [-3, 3, -3, 3, 0] } : {}} transition={{ duration: 0.8 }}>
              <DetailedStickmanSVG type={sceneType === "cuffs-removed" ? "citizen" : "scared"} />
            </motion.div>
            <div className="absolute bottom-24 right-32">
              <DetailedPoliceSVG />
            </div>
            <div className="absolute bottom-28 left-8">
              <BackgroundPersonSVG color="#6b7280" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Medical exam visuals
      case "magistrate-orders-exam":
      case "doctor-examines":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="clinic" />
            <motion.div className="absolute top-10 right-10" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <MedicalKitSVG />
            </motion.div>
            <motion.div className="absolute bottom-24 left-1/4" animate={sceneType === "doctor-examines" ? { x: [-5, 5, -5] } : {}} transition={{ duration: 1.5 }}>
              <DoctorSVG />
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-28 right-8">
              <BackgroundPersonSVG color="#10b981" />
            </div>
            <SceneDescription text={description} />
          </div>
        )
      case "taken-to-station":
      case "asks-lawyer":
      case "refusal-by-police":
      case "interrogation-without-counsel":
      case "meets-lawyer":
      case "interrogation-paused":
      case "interrogation-pressure":
      case "refuses-answer":
      case "invokes-20-3":
      case "remains-silent":
      case "demand-sign-blank":
      case "forced-signature-attempt":
      case "refuse-sign":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-16">
              <OfficeDeskSVG />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedStickmanSVG type="customer" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "arrest-night":
      case "no-inform":
      case "asks-inform-relative":
      case "police-inform-relative":
      case "relative-arrives":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "arrested":
      case "time-elapses":
      case "produced-within-24h":
      case "produced-late":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="jail" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "arrest-bailable":
      case "asks-bail":
      case "bail-refused":
      case "release-on-bond":
      case "calm-arrest":
      case "cuffs-applied":
      case "unnecessary-restraint":
      case "cuffs-removed":
      case "custodial-injury":
      case "request-medical-exam":
      case "request-ignored":
      case "magistrate-orders-exam":
      case "doctor-examines":
      case "minor-offence":
      case "immediate-arrest":
      case "unnecessary-arrest":
      case "issue-41a-notice":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-20">
              <OfficeDeskSVG />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedStickmanSVG type="citizen" />
            </div>
            {sceneType === "issue-41a-notice" && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2">
                <DocumentSVG />
              </div>
            )}
            {["magistrate-orders-exam", "doctor-examines"].includes(sceneType) && (
              <div className="absolute top-10 right-10">
                <MedicalKitSVG />
              </div>
            )}
            <SceneDescription text={description} />
          </div>
        )

      // Consumer Rights – Generic/e-commerce/service scenes
      case "package-arrives":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="customer" />
            </div>
            <div className="absolute top-10 right-12">
              <ShopCounterSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )
      case "broken-device":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="shocked" />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2">
              <DetailedPhoneSVG broken />
            </div>
            <SceneDescription text={description} />
          </div>
        )
      case "contact-support":
      case "platform-grievance":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-20">
              <OfficeDeskSVG />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedStickmanSVG type="customer" />
            </div>
            <SceneDescription text={description} />
          </div>
        )
      case "support-refuses":
      case "exchange-refused":
      case "no-refund":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-24">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <SceneDescription text={description} />
          </div>
        )
      case "file-consumer-complaint":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2">
              <CheckpointSignSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )
      case "refund-processed":
      case "consumer-rights-upheld":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="confident" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Store/warranty scenes
      case "laptop-stops":
      case "shop-says-no-return":
      case "customer-requests-help":
      case "accept-refusal-generic":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="store" />
            <div className="absolute bottom-24 left-16">
              <ShopCounterSVG />
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <ShopkeeperSVG />
            </div>
            <div className="absolute bottom-24 right-20">
              <DetailedStickmanSVG type="customer" />
            </div>
            <div className="absolute bottom-28 left-8">
              <BackgroundPersonSVG color="#8b5cf6" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Advertising scenes
      case "ad-claims":
      case "product-ineffective":
      case "lodge-complaint-ccpa":
      case "ad-penalty":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute top-10 right-12">
              <DetailedPhoneSVG />
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="customer" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Overcharge billing
      case "bill-overcharge":
      case "ask-refund":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="store" />
            <div className="absolute bottom-24 left-16">
              <ShopCounterSVG />
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <WaiterSVG />
            </div>
            <div className="absolute bottom-24 right-20">
              <DetailedStickmanSVG type="frustrated" />
            </div>
            <div className="absolute bottom-28 left-8">
              <BackgroundPersonSVG color="#f97316" />
            </div>
            <div className="absolute bottom-28 right-8">
              <BackgroundPersonSVG color="#10b981" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Online coaching
      case "course-paid":
      case "classes-missing":
      case "tutor-unresponsive":
      case "wait-indefinitely":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="customer" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Warranty denial
      case "warranty-valid":
      case "service-center-deny":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-20">
              <OfficeDeskSVG />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedStickmanSVG type="frustrated" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // No-return / wrong size
      case "wrong-size-delivered":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="shocked" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Digital payment
      case "payment-failed":
      case "money-debited":
      case "no-refund-delay":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute top-10 right-12">
              <DetailedPhoneSVG />
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="frustrated" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Food safety
      case "unsafe-food-served":
      case "allergy-incident":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="store" />
            <div className="absolute bottom-24 left-16">
              <ShopCounterSVG />
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <WaiterSVG />
            </div>
            <div className="absolute bottom-24 right-20">
              <DetailedStickmanSVG type="scared" />
            </div>
            <div className="absolute bottom-28 left-8">
              <BackgroundPersonSVG color="#f97316" />
            </div>
            <div className="absolute bottom-28 right-8">
              <BackgroundPersonSVG color="#10b981" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Institute closure
      case "institute-enroll":
      case "institute-shuts":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-20">
              <OfficeDeskSVG />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedStickmanSVG type="customer" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Traffic generic police stop
      case "police-flag-down":
      case "police-observe":
      case "stop-check":
      case "police-stop":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute bottom-24 left-24">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedPoliceSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Helmet
      case "ride-no-helmet":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <motion.div className="absolute bottom-24 left-8" animate={{ x: [0, 140] }} transition={{ duration: 2.2 }}>
              <DetailedCarSVG />
            </motion.div>
            <div className="absolute top-10 left-10">
              <HelmetIconSVG crossed />
            </div>
            <SceneDescription text={description} />
          </div>
        )
      case "explain-helmet-law":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute bottom-24 left-24">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <HelmetIconSVG />
            </motion.div>
            <motion.div className="absolute top-12 right-12 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              📜 Section 129
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "helmet-fine":
      case "safety-risk":
      case "ignore-helmet":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <motion.div className="absolute bottom-24 left-24" animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <div className="absolute bottom-24 right-24">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️ ₹1,000 Fine
            </motion.div>
            <div className="absolute top-10 right-12">
              <HelmetIconSVG crossed />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "wear-helmet":
      case "safety-first":
      case "no-violation":
      case "ride-safe":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute bottom-24 left-24">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2 }}>
              <HelmetIconSVG />
            </motion.div>
            <motion.div className="absolute top-12 left-12 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Safe!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Seatbelt
      case "driving-no-belt":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute bottom-24 left-16">
              <DetailedCarSVG />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2">
              <SeatbeltIconSVG crossed />
            </div>
            <SceneDescription text={description} />
          </div>
        )
      case "inform-seatbelt-rule":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute bottom-24 left-24">
              <DetailedPoliceSVG />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <SeatbeltIconSVG />
            </motion.div>
            <motion.div className="absolute top-12 right-12 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              📜 Section 194B
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "seatbelt-fine":
      case "injury-risk":
      case "continue-no-belt":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute bottom-24 left-24">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute bottom-24 right-24" animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️ ₹1,000 Fine
            </motion.div>
            <div className="absolute top-10 right-12">
              <SeatbeltIconSVG crossed />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "buckle-up":
      case "safer-drive":
      case "compliance":
      case "proceed":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute bottom-24 left-24">
              <DetailedPoliceSVG />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2 }}>
              <SeatbeltIconSVG />
            </motion.div>
            <motion.div className="absolute top-12 left-12 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Safe!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Speeding
      case "city-road-50":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute top-12 right-16">
              <SpeedLimitSignSVG limit={50} />
            </div>
            <motion.div className="absolute bottom-24 left-8" animate={{ x: [0, 160] }} transition={{ duration: 1.6 }}>
              <DetailedCarSVG />
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "driver-at-70":
      case "speed-gun-detect":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute top-12 right-16">
              <SpeedLimitSignSVG limit={50} />
            </div>
            <div className="absolute bottom-24 left-20">
              <DetailedPoliceSVG />
            </div>
            <div className="absolute bottom-24 right-20">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              🚨 70 km/h in 50 zone!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "issue-fine-183":
      case "risk-accident":
      case "drive-danger":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute top-12 right-16">
              <SpeedLimitSignSVG limit={50} />
            </div>
            <div className="absolute bottom-24 left-20">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute bottom-24 right-20" animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️ ₹400-1000 Fine
            </motion.div>
            <motion.div className="absolute top-12 left-12 bg-orange-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              📜 Sec 183
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "acknowledge-limit":
      case "drive-within-limit":
      case "safer-traffic":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute top-12 right-16">
              <SpeedLimitSignSVG limit={50} />
            </div>
            <div className="absolute bottom-24 left-20">
              <DetailedPoliceSVG />
            </div>
            <div className="absolute bottom-24 right-20">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute top-12 left-12 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Driving within limit!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Zebra crossing
      case "approach-crossing":
      case "pedestrian-steps":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="intersection" />
            <div className="absolute bottom-24 left-24">
              <DetailedCarSVG />
            </div>
            <motion.div className="absolute bottom-24 right-36" animate={{ x: [-20, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="citizen" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🚶 Zebra Crossing
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "driver-doesnt-stop":
      case "near-miss":
      case "dangerous-184":
      case "zebra-penalty":
      case "endanger-lives":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="intersection" />
            <div className="absolute bottom-24 left-24">
              <DetailedCarSVG />
            </div>
            <motion.div className="absolute bottom-24 right-36" animate={{ scale: [1, 0.9, 1], x: [-5, 5, -5, 0] }} transition={{ duration: 1 }}>
              <DetailedStickmanSVG type="scared" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️ Didn't Yield!
            </motion.div>
            <motion.div className="absolute top-12 right-12 bg-orange-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              📜 Sec 184
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "yield-pedestrian":
      case "allow-cross":
      case "awareness":
      case "safe-passage":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="intersection" />
            <div className="absolute bottom-24 left-24">
              <DetailedCarSVG />
            </div>
            <motion.div className="absolute bottom-24 right-36" animate={{ x: [0, 40] }} transition={{ duration: 2.5 }}>
              <DetailedStickmanSVG type="confident" />
            </motion.div>
            <motion.div className="absolute top-12 left-12 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Pedestrian Right of Way!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Drunk driving
      case "party-exit":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute top-10 right-10">
              <BottleIconSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )
      case "breath-test":
      case "bac-over-limit":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute bottom-24 left-24">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              BAC Over 0.03%!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "arrest-charge-185":
      case "drive-intoxicated":
      case "caught-185":
      case "heavy-penalty":
      case "licence-suspend":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <motion.div className="absolute bottom-24 left-24" animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <div className="absolute bottom-24 right-24">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ₹10,000 + 6 months jail
            </motion.div>
            <motion.div className="absolute top-12 right-12 bg-orange-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Sec 185
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "take-cab":
      case "avoid-driving":
      case "safe-choice":
      case "no-penalty":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute bottom-24 left-24">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedCarSVG />
            </div>
            <motion.div className="absolute top-12 left-12 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Safe Choice - Takes Cab!
            </motion.div>
            <div className="absolute top-10 right-12">
              <div className="text-5xl">🚕</div>
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Mobile use
      case "red-light-stop":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="intersection" />
            <div className="absolute top-8 right-12">
              <TrafficLightSVG state="red" />
            </div>
            <div className="absolute bottom-24 left-24">
              <DetailedCarSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )
      case "picks-phone":
      case "police-notice":
      case "stop-and-warn":
      case "text-while-driving":
      case "penalty-184":
      case "distraction-risk":
      case "accident-risk":
      case "hands-free-or-wait":
      case "focus-road":
      case "compliance-traffic":
      case "proceed-safe":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="intersection" />
            <div className="absolute top-8 right-12">
              <TrafficLightSVG state="red" />
            </div>
            <div className="absolute bottom-24 left-16">
              <DetailedPoliceSVG />
            </div>
            <div className="absolute bottom-24 right-16">
              <PhoneIconSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Red light
      case "red-signal":
      case "car-runs-red":
      case "camera-capture":
      case "dangerous-184-signal":
      case "heavy-fine":
      case "traffic-risk":
      case "points-suspension":
      case "stop-on-red":
      case "go-on-green":
      case "safe-intersection":
      case "good-example":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="intersection" />
            <div className="absolute top-8 right-12">
              <TrafficLightSVG state="red" />
            </div>
            <div className="absolute bottom-24 left-24">
              <DetailedCarSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Overtaking
      case "approach-curve":
      case "attempt-overtake":
      case "limited-visibility":
      case "near-miss-curve":
      case "charge-dangerous":
      case "penalty-overtake":
      case "high-risk":
      case "lessons-learned":
      case "wait-straight":
      case "safe-overtake":
      case "rule-compliance":
      case "safe-journey":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <motion.div className="absolute bottom-24 left-8" animate={{ x: [0, 100] }} transition={{ duration: 1.4 }}>
              <DetailedCarSVG />
            </motion.div>
            <motion.div className="absolute bottom-24 left-24" animate={{ x: [0, 140] }} transition={{ duration: 1.6 }}>
              <DetailedCarSVG />
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Stop sign
      case "approach-stop-sign":
      case "fails-to-stop":
      case "cross-unsafe":
      case "police-challan":
      case "challan-177-184":
      case "risk-collision":
      case "legal-trouble":
      case "learn-rule":
      case "full-stop":
      case "check-proceed":
      case "safe-compliance":
      case "community-safety":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="intersection" />
            <div className="absolute top-10 left-12">
              <StopSignSVG />
            </div>
            <div className="absolute bottom-24 left-24">
              <DetailedCarSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Documents check
      case "routine-check":
      case "officer-asks-docs":
      case "driver-provides":
      case "verification":
      case "refuse-docs":
      case "challan-177":
      case "impound":
      case "delays":
      case "show-licence-rc":
      case "smooth-process":
      case "thanked":
      case "drive-on":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute bottom-24 left-24">
              <DetailedPoliceSVG />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "police-checkpoint":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <div className="absolute bottom-20 left-48">
              <DetailedCarSVG />
            </div>
            <div className="absolute bottom-24 right-32">
              <DetailedPoliceSVG />
            </div>
            <div className="absolute bottom-24 right-60">
              <DetailedBarrierSVG />
            </div>
            <div className="absolute bottom-24 right-80">
              <CheckpointSignSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "stop-signal":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <div className="absolute bottom-20 left-48">
              <DetailedCarSVG />
            </div>
            <motion.div
              className="absolute bottom-24 right-32"
              animate={{ scale: [1, 1.2, 1], y: [0, -10, 0] }}
              transition={{ duration: 1, repeat: 2 }}
            >
              <DetailedPoliceSVG />
            </motion.div>
            <motion.div
              className="absolute top-16 right-24 bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              🛑 STOP!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "document-demand":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <div className="absolute bottom-20 left-48">
              <DetailedCarSVG />
            </div>
            <div className="absolute bottom-24 left-32">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-24 right-32">
              <DetailedPoliceSVG />
            </div>
            <motion.div
              className="absolute top-16 right-24 bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Show documents! NOW!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "immediate-compliance":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <div className="absolute bottom-20 left-48">
              <DetailedCarSVG />
            </div>
            <motion.div
              className="absolute bottom-24 left-32"
              animate={{ y: [0, -8, 0], scale: [1, 0.95, 1] }}
              transition={{ duration: 0.8, repeat: 3 }}
            >
              <DetailedStickmanSVG type="scared" />
            </motion.div>
            <div className="absolute bottom-24 right-32">
              <DetailedPoliceSVG />
            </div>
            <motion.div
              className="absolute top-16 left-24 bg-yellow-500 text-black px-4 py-2 rounded-lg text-lg font-medium shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Yes sir, here they are... 😰
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "excessive-questioning":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <div className="absolute bottom-20 left-48">
              <DetailedCarSVG />
            </div>
            <motion.div
              className="absolute bottom-24 left-32"
              animate={{ x: [-3, 3, -3, 3, 0], rotate: [-2, 2, -2, 2, 0] }}
              transition={{ duration: 2 }}
            >
              <DetailedStickmanSVG type="uncomfortable" />
            </motion.div>
            <motion.div
              className="absolute bottom-24 right-32"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: 2 }}
            >
              <DetailedPoliceSVG aggressive />
            </motion.div>
            <motion.div
              className="absolute top-16 right-24 bg-red-600 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Where going? Why? Who meeting? 🔍
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "polite-inquiry":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <div className="absolute bottom-20 left-48">
              <DetailedCarSVG />
            </div>
            <motion.div
              className="absolute bottom-24 left-32"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1 }}
            >
              <DetailedStickmanSVG type="confident" />
            </motion.div>
            <div className="absolute bottom-24 right-32">
              <DetailedPoliceSVG />
            </div>
            <motion.div
              className="absolute top-16 left-24 bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-medium shadow-lg max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              May I know the reason? Can I see your ID? 🤝
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "officer-explains":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <div className="absolute bottom-20 left-48">
              <DetailedCarSVG />
            </div>
            <div className="absolute bottom-24 left-32">
              <DetailedStickmanSVG type="listening" />
            </div>
            <motion.div
              className="absolute bottom-24 right-32"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1, repeat: 2 }}
            >
              <DetailedPoliceSVG />
            </motion.div>
            <motion.div
              className="absolute top-16 right-24 bg-blue-500 text-white px-4 py-2 rounded-lg text-lg font-medium shadow-lg max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Routine security check. Here's my ID. 👮‍♂️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Job Interview Scenarios
      case "office-arrival":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-16" animate={{ x: [0, 150] }} transition={{ duration: 2.5 }}>
              <DetailedStickmanSVG type="candidate" />
            </motion.div>
            <div className="absolute bottom-24 right-48">
              <InterviewerSVG />
            </div>
            <div className="absolute bottom-24 right-32">
              <OfficeDeskSVG />
            </div>
            <div className="absolute bottom-28 left-8">
              <BackgroundPersonSVG color="#6b7280" />
            </div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              🏢 Corporate Office - Job Interview
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "interview-begins":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-48">
              <DetailedStickmanSVG type="candidate" />
            </div>
            <div className="absolute bottom-24 right-48">
              <InterviewerSVG />
            </div>
            <div className="absolute bottom-24 right-32">
              <OfficeDeskSVG />
            </div>
            <div className="absolute bottom-28 left-8">
              <BackgroundPersonSVG color="#6b7280" />
            </div>
            <motion.div
              className="absolute top-16 right-40 bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-medium shadow-lg max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Tell me about your qualifications... 📋
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "caste-question":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div
              className="absolute bottom-24 left-48"
              animate={{ scale: [1, 0.9, 1], y: [0, 5, 0] }}
              transition={{ duration: 1 }}
            >
              <DetailedStickmanSVG type="shocked" />
            </motion.div>
            <div className="absolute bottom-24 right-48">
              <InterviewerSVG />
            </div>
            <div className="absolute bottom-24 right-32">
              <OfficeDeskSVG />
            </div>
            <div className="absolute bottom-28 left-8">
              <BackgroundPersonSVG color="#6b7280" />
            </div>
            <motion.div
              className="absolute top-16 right-40 bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              What's your caste? We prefer certain communities... 😠
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "accept-discrimination":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div
              className="absolute bottom-24 left-48"
              animate={{ y: [0, 8, 0], scale: [1, 0.9, 1] }}
              transition={{ duration: 1, repeat: 2 }}
            >
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <div className="absolute bottom-24 right-48">
              <InterviewerSVG />
            </div>
            <div className="absolute bottom-24 right-32">
              <OfficeDeskSVG />
            </div>
            <div className="absolute bottom-28 left-8">
              <BackgroundPersonSVG color="#6b7280" />
            </div>
            <motion.div
              className="absolute top-16 left-40 bg-yellow-500 text-black px-4 py-2 rounded-lg text-lg font-medium shadow-lg max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              I understand... I'll accept whatever you decide... 😔
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "challenge-question":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div
              className="absolute bottom-24 left-48"
              animate={{ scale: [1, 1.1, 1], y: [0, -5, 0] }}
              transition={{ duration: 1 }}
            >
              <DetailedStickmanSVG type="confident" />
            </motion.div>
            <div className="absolute bottom-24 right-48">
              <InterviewerSVG />
            </div>
            <div className="absolute bottom-24 right-32">
              <OfficeDeskSVG />
            </div>
            <div className="absolute bottom-28 left-8">
              <BackgroundPersonSVG color="#6b7280" />
            </div>
            <motion.div
              className="absolute top-16 left-40 bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              How is caste relevant to my job performance? ⚖️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Shopping Scenarios
      case "store-visit":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="store" />
            <motion.div className="absolute bottom-24 left-16" animate={{ x: [0, 120] }} transition={{ duration: 2.5 }}>
              <DetailedStickmanSVG type="customer" />
            </motion.div>
            <div className="absolute bottom-24 right-48">
              <ShopkeeperSVG />
            </div>
            <div className="absolute bottom-24 right-32">
              <ShopCounterSVG />
            </div>
            <div className="absolute bottom-28 left-8">
              <BackgroundPersonSVG color="#8b5cf6" />
            </div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              📱 Electronics Store
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "product-selection":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="store" />
            <div className="absolute bottom-24 left-40">
              <DetailedStickmanSVG type="customer" />
            </div>
            <div className="absolute bottom-24 right-48">
              <ShopkeeperSVG />
            </div>
            <div className="absolute bottom-24 right-32">
              <ShopCounterSVG />
            </div>
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
              <DetailedPhoneSVG />
            </div>
            <div className="absolute bottom-28 left-8">
              <BackgroundPersonSVG color="#8b5cf6" />
            </div>
            <motion.div
              className="absolute top-16 right-40 bg-green-500 text-white px-4 py-2 rounded-lg text-lg font-medium shadow-lg max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Here's your new smartphone! 📱✨
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "product-fails":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div
              className="absolute bottom-24 left-1/3"
              animate={{ x: [-8, 8, -8, 8, 0], rotate: [-3, 3, -3, 3, 0] }}
              transition={{ duration: 2 }}
            >
              <DetailedStickmanSVG type="frustrated" />
            </motion.div>
            <motion.div className="absolute bottom-32 right-1/3" animate={{ rotate: [0, -15, 15, 0] }} transition={{ duration: 1.5 }}>
              <DetailedPhoneSVG broken />
            </motion.div>
            <div className="absolute bottom-28 left-8">
              <BackgroundPersonSVG color="#8b5cf6" />
            </div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg max-w-xs"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              Phone stopped working after 2 days! 😡💸
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Restaurant Scenarios
      case "restaurant-entry":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="store" />
            <motion.div className="absolute bottom-24 left-16" animate={{ x: [0, 120] }} transition={{ duration: 2.5 }}>
              <DetailedStickmanSVG type="customer" />
            </motion.div>
            <div className="absolute bottom-24 right-48">
              <WaiterSVG />
            </div>
            <div className="absolute bottom-28 left-8">
              <BackgroundPersonSVG color="#f97316" />
            </div>
            <div className="absolute bottom-28 right-8">
              <BackgroundPersonSVG color="#10b981" />
            </div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              🍽️ Restaurant
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "order-food":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="store" />
            <div className="absolute bottom-24 left-40">
              <DetailedStickmanSVG type="customer" />
            </div>
            <div className="absolute bottom-24 right-48">
              <WaiterSVG />
            </div>
            <div className="absolute bottom-28 left-8">
              <BackgroundPersonSVG color="#f97316" />
            </div>
            <div className="absolute bottom-28 right-8">
              <BackgroundPersonSVG color="#10b981" />
            </div>
            <motion.div
              className="absolute top-16 right-40 bg-green-600 text-white px-4 py-2 rounded-lg text-lg font-medium shadow-lg max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Your meal will be served soon 🍲
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "contaminated-food":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div
              className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
              animate={{ x: [-4, 4, -4, 4, 0], rotate: [-2, 2, -2, 2, 0] }}
              transition={{ duration: 1.5 }}
            >
              <DetailedStickmanSVG type="shocked" />
            </motion.div>
            <div className="absolute bottom-32 right-1/4">
              <FoodPlateSVG contaminated />
            </div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg max-w-xs"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Food seems contaminated! ⚠️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "customer-sick":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div
              className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, -6, 0], scale: [1, 0.95, 1], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 1.2, repeat: 2 }}
            >
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <div className="absolute bottom-32 right-1/4">
              <FoodPlateSVG contaminated />
            </div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-2 rounded-lg text-base font-bold shadow-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Feeling sick! 🤢
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "just-avoid":
      case "no-action":
      case "others-at-risk":
      case "business-continues":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="store" />
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-2 rounded-lg text-lg font-medium shadow-lg max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No action taken… others remain at risk
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "document-evidence":
      case "file-consumer-case":
      case "medical-compensation":
      case "public-safety":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="store" />
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg text-lg font-medium shadow-lg max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Taking legal action to ensure safety ✅
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Protest Scenarios
      case "policy-announcement":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="park" />
            <motion.div className="absolute bottom-24 left-16" animate={{ x: [0, 80] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="citizen" />
            </motion.div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              📢 New Policy Announced
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "public-concern":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="park" />
            <div className="absolute bottom-24 left-20">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-24 left-40">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-24 left-60">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-2 rounded-lg text-lg font-medium shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              People are concerned 😟
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "organize-protest":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="park" />
            <div className="absolute bottom-24 left-28">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Organizing a peaceful protest ✊
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "venue-selection":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="park" />
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-2 rounded-lg text-lg font-medium shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Public Park Chosen 🌳
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "seek-permission":
      case "bureaucratic-delays":
      case "opportunity-lost":
      case "voice-silenced":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="park" />
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg text-lg font-medium shadow-lg max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Delay and red tape weaken your voice
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "peaceful-assembly":
      case "constitutional-right":
      case "public-awareness":
      case "democratic-participation":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="park" />
            <div className="absolute bottom-24 left-16">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 left-36">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-24 left-56">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Peaceful protest in action ✅
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Arrest Scenarios
      case "police-approach":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="jail" />
            <div className="absolute bottom-24 left-32">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-24 right-32">
              <DetailedPoliceSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "arrest-announcement":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="jail" />
            <div className="absolute bottom-24 left-32">
              <DetailedStickmanSVG type="shocked" />
            </div>
            <motion.div
              className="absolute bottom-24 right-32"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1, repeat: 1 }}
            >
              <DetailedPoliceSVG aggressive />
            </motion.div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              You are under arrest
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "no-reason-given":
      case "no-contact-allowed":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="jail" />
            <div className="absolute bottom-24 left-32">
              <DetailedStickmanSVG type="uncomfortable" />
            </div>
            <div className="absolute bottom-24 right-32">
              <DetailedPoliceSVG aggressive />
            </div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-2 rounded-lg text-lg font-medium shadow-lg max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Rights ignored
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "silent-submission":
      case "prolonged-detention":
      case "family-unaware":
      case "due-process-violated":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="jail" />
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-700 text-white px-4 py-2 rounded-lg text-lg font-medium shadow-lg max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Due process violated
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "demand-charges":
      case "request-family-contact":
      case "cite-article-22":
      case "legal-protection":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="jail" />
            <div className="absolute bottom-24 left-32">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-32">
              <DetailedPoliceSVG />
            </div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Rights asserted, protection ensured ✅
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Cyber Security Scenarios - Phishing WhatsApp
      case "phone-notification":
      case "suspicious-link-message":
      case "link-appears-official":
      case "decision-moment":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="thinking" />
            </div>
            <motion.div className="absolute top-10 right-12" animate={{ y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <DetailedPhoneSVG />
            </motion.div>
            <motion.div className="absolute top-16 left-10 bg-green-500 text-white px-3 py-2 rounded-lg text-xs max-w-xs shadow-lg" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🎁 WIN FREE SMARTPHONE! Click here →
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "click-malicious-link":
      case "data-stolen":
      case "identity-theft-risk":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="shocked" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }} transition={{ duration: 0.8 }}>
              <div className="text-6xl">⚠️</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "ignore-message":
      case "verify-official-source":
      case "report-cybercrime":
      case "safe-from-scam":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
              <div className="text-6xl">✅</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Vishing OTP
      case "phone-rings":
      case "caller-urgent":
      case "otp-arrives":
      case "caller-asks-otp":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="scared" />
            </div>
            <motion.div className="absolute top-10 left-10" animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
              <PhoneCallSVG />
            </motion.div>
            <div className="absolute top-16 right-10 bg-blue-500 text-white px-3 py-2 rounded-lg text-xs shadow-lg">
              OTP: 123456
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "shares-otp":
      case "account-accessed":
      case "realize-scam":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ y: [0, -10, 0] }} transition={{ duration: 1, repeat: Infinity }}>
              <MoneyBillSVG />
            </motion.div>
            <div className="absolute top-20 left-1/2 -translate-x-1/2 text-4xl">💸</div>
            <SceneDescription text={description} />
          </div>
        )

      case "hang-up-call":
      case "call-official-bank":
      case "bank-confirms-scam":
      case "account-safe":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <div className="text-6xl">🛡️</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Cyberbullying
      case "whatsapp-group-created":
      case "hurtful-messages":
      case "victim-distressed":
      case "bullying-continues":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="scared" />
            </div>
            <motion.div className="absolute top-10 left-10 bg-red-500 text-white px-2 py-1 rounded text-xs" animate={{ x: [0, -10, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>
              😂 LOL
            </motion.div>
            <motion.div className="absolute top-16 right-10 bg-red-500 text-white px-2 py-1 rounded text-xs" animate={{ x: [0, 10, 0] }} transition={{ duration: 1, repeat: Infinity }}>
              So ugly!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "suffer-silence":
      case "mental-health-impact":
      case "bullies-continue":
      case "lasting-trauma":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-6xl">😢</div>
            <SceneDescription text={description} />
          </div>
        )

      case "take-screenshots":
      case "tell-trusted-adult":
      case "legal-action-taken":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedStickmanSVG type="customer" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <div className="text-6xl">⚖️</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Password Sharing
      case "friend-asks-password":
      case "neha-shares-password":
      case "friend-misuses-account":
      case "professor-upset":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="customer" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedStickmanSVG type="thinking" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-3 py-2 rounded-lg text-sm shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              🔑 Password: ****
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "trust-violated":
      case "reputation-damaged":
      case "professor-action":
      case "lesson-learned-hard":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-6xl">❌</div>
            <SceneDescription text={description} />
          </div>
        )

      case "refuse-to-share":
      case "suggest-alternative":
      case "account-secure":
      case "friendship-intact":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <div className="text-6xl">🔒</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Fake E-commerce
      case "browse-concert-tickets":
      case "finds-cheap-deal":
      case "enters-card-details":
      case "payment-confirmation":
      case "browse-headphones":
      case "finds-90-discount":
      case "payment-via-upi":
      case "wait-for-delivery":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="customer" />
            </div>
            <motion.div className="absolute top-10 right-10" animate={{ y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <DetailedPhoneSVG />
            </motion.div>
            <div className="absolute top-12 left-10 bg-green-500 text-white px-3 py-2 rounded-lg text-xs shadow-lg">
              90% OFF! 🎫
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "site-disappears":
      case "no-tickets-arrive":
      case "card-compromised":
      case "weeks-pass":
      case "customer-service-unreachable":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="shocked" />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-6xl">🚫</div>
            <SceneDescription text={description} />
          </div>
        )

      case "verify-website":
      case "read-reviews":
      case "buy-from-official":
      case "safe-transaction":
      case "suspicious-of-deal":
      case "research-website":
      case "buy-from-verified":
      case "safe-purchase":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <div className="text-6xl">✅</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Cyberstalking
      case "rejection-online":
      case "unwanted-messages-start":
      case "calls-repeatedly":
      case "priya-scared":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="scared" />
            </div>
            <motion.div className="absolute top-10 left-10" animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
              <PhoneCallSVG />
            </motion.div>
            <motion.div className="absolute top-10 right-10 bg-red-500 text-white px-2 py-1 rounded text-xs" animate={{ x: [0, 10, 0] }} transition={{ duration: 0.8, repeat: Infinity }}>
              📱💬💬💬
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "keep-ignoring":
      case "stalking-escalates":
      case "fear-increases":
      case "safety-at-risk":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-6xl">😰</div>
            <SceneDescription text={description} />
          </div>
        )

      case "block-stalker":
      case "tell-parents":
      case "legal-protection":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <div className="text-6xl">🛡️</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Gaming Grooming
      case "online-game-session":
      case "darknight-insults":
      case "private-message":
      case "asks-address":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="thinking" />
            </div>
            <motion.div className="absolute top-10 left-10 bg-red-500 text-white px-3 py-2 rounded-lg text-xs shadow-lg" animate={{ y: [0, -5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
              🎮 DarkKnight: Where do you live?
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "shares-personal-info":
      case "grooming-continues":
      case "child-exploitation-risk":
      case "serious-danger":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="scared" />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-6xl">⚠️</div>
            <SceneDescription text={description} />
          </div>
        )

      case "report-to-moderator":
      case "predator-banned":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedStickmanSVG type="customer" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <div className="text-6xl">🚫</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Oversharing Social
      case "social-media-post":
      case "shares-exam-schedule":
      case "shares-address-phone":
      case "strangers-contact":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="customer" />
            </div>
            <motion.div className="absolute top-10 right-10" animate={{ y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <DetailedPhoneSVG />
            </motion.div>
            <div className="absolute top-12 left-10 bg-blue-500 text-white px-3 py-2 rounded-lg text-xs shadow-lg">
              📍 123 Main St 📞 9876543210
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "info-stays-public":
      case "harassment-begins":
      case "stalking-risk":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="scared" />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-6xl">⚠️</div>
            <SceneDescription text={description} />
          </div>
        )

      case "delete-sensitive-posts":
      case "privacy-settings":
      case "selective-sharing":
      case "data-protected":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <div className="text-6xl">🔒</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Identity Theft Social
      case "fake-profile-created":
      case "impersonation":
      case "asks-for-money":
      case "arjun-discovers":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="shocked" />
            </div>
            <motion.div className="absolute top-10 right-10" animate={{ y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <DetailedPhoneSVG />
            </motion.div>
            <div className="absolute top-12 left-10 bg-red-500 text-white px-3 py-2 rounded-lg text-xs shadow-lg">
              Fake Profile! 💰
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "delay-reporting":
      case "friends-scammed":
      case "trust-lost":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-6xl">😢</div>
            <SceneDescription text={description} />
          </div>
        )

      case "report-to-facebook":
      case "warn-friends":
      case "profile-removed":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <div className="text-6xl">✅</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // NEW FUNDAMENTAL RIGHTS ANIMATIONS - Part 1
      case "fr-college-entrance":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-8" animate={{ x: [0, 100] }} transition={{ duration: 2.5 }}>
              <DetailedStickmanSVG type="citizen" />
            </motion.div>
            <div className="absolute bottom-28 right-24">
              <BackgroundPersonSVG color="#8b5cf6" />
            </div>
            <div className="absolute top-10 left-10 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm shadow-lg">
              🏛️ College Campus
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-mess-line":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="store" />
            <div className="absolute bottom-24 left-16">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-24 left-36">
              <BackgroundPersonSVG color="#f59e0b" />
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <ShopCounterSVG />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-4xl">🍽️</div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-denied-religious":
      case "fr-religious-exclusion":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="store" />
            <div className="absolute bottom-24 left-24">
              <DetailedStickmanSVG type="shocked" />
            </div>
            <div className="absolute bottom-24 right-24">
              <ShopkeeperSVG />
            </div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Access Denied
            </motion.div>
            <div className="absolute top-20 right-12 text-3xl">🕌</div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-accepts-discrimination":
      case "fr-religious-tension-grows":
      case "fr-discrimination-spreads":
      case "fr-equality-eroded":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-6xl">😔</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-challenges-denial":
      case "fr-invokes-article-15":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Article 15 ⚖️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-files-formal-complaint":
      case "fr-equal-access-restored":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <div className="text-6xl">✅</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Article 15 Gender
      case "fr-professor-application":
      case "fr-interview-qualified":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-20">
              <OfficeDeskSVG />
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-24">
              <InterviewerSVG />
            </div>
            <div className="absolute top-10 left-10">
              <DocumentSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-gender-rejection":
      case "fr-male-only-policy":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-24">
              <DetailedStickmanSVG type="shocked" />
            </div>
            <div className="absolute bottom-24 right-24">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
              ❌ Males Only
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-accepts-rejection":
      case "fr-self-doubt-grows":
      case "fr-bias-continues":
      case "fr-merit-ignored":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-6xl">💔</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-challenges-gender-bias":
      case "fr-documents-evidence":
      case "fr-legal-recourse":
      case "fr-wins-gender-case":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold">
                Victory! ⚖️
              </div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Article 19 Press Freedom
      case "fr-journalist-writing":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-20">
              <OfficeDeskSVG />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedStickmanSVG type="thinking" />
            </div>
            <motion.div className="absolute top-10 right-10" animate={{ y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <div className="text-4xl">📝</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-article-published":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
                📰 Published
              </div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-police-warning":
      case "fr-threat-to-silence":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="jail" />
            <div className="absolute bottom-24 left-24">
              <DetailedStickmanSVG type="scared" />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedPoliceSVG aggressive />
            </div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️ Stop Writing!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-self-censorship":
      case "fr-public-uninformed":
      case "fr-democracy-weakens":
      case "fr-voice-silenced":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-6xl">🔇</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-defends-article":
      case "fr-invokes-19-1-a":
      case "fr-court-case-filed":
      case "fr-press-freedom-upheld":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="court" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <MagistrateSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold">
                📰 Press Freedom!
              </div>
            </motion.div>
            <div className="absolute top-20 right-10">
              <GavelSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Article 21 Shelter
      case "fr-night-neighborhood":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-16">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-24 left-36">
              <BackgroundPersonSVG color="#6b7280" />
            </div>
            <div className="absolute bottom-24 right-24">
              <BackgroundPersonSVG color="#9ca3af" />
            </div>
            <div className="absolute top-5 right-5 text-4xl">🌙</div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-bulldozers-arrive":
      case "fr-homes-demolished":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-16">
              <DetailedStickmanSVG type="scared" />
            </div>
            <div className="absolute bottom-24 left-36">
              <BackgroundPersonSVG color="#ef4444" />
            </div>
            <motion.div className="absolute bottom-24 right-16" animate={{ x: [-50, 0] }} transition={{ duration: 2 }}>
              <div className="text-6xl">🚜</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
              ⚠️ Demolition!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-families-homeless":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <BackgroundPersonSVG color="#6b7280" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <BackgroundPersonSVG color="#9ca3af" />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-6xl">😢</div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-accepts-eviction":
      case "fr-moves-to-slum":
      case "fr-no-legal-challenge":
      case "fr-more-evictions-follow":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-6xl">🏚️</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-documents-demolition":
      case "fr-organizes-community":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <BackgroundPersonSVG color="#10b981" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <BackgroundPersonSVG color="#3b82f6" />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-4xl">📸</div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-invokes-article-21":
      case "fr-court-orders-rehab":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="court" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <MagistrateSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold">
                🏠 Right to Shelter!
              </div>
            </motion.div>
            <div className="absolute top-20 right-10">
              <GavelSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Article 22 Arrest Rights
      case "fr-arrest-theft":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute bottom-24 left-24">
              <DetailedStickmanSVG type="shocked" />
            </div>
            <motion.div className="absolute bottom-24 right-24" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <DetailedPoliceSVG />
            </motion.div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-4xl">👮</div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-detained-no-info":
      case "fr-no-magistrate":
      case "fr-no-lawyer-access":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="jail" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="scared" />
            </div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
              ⚠️ Rights Violated
            </motion.div>
            <div className="absolute top-10 left-10 text-3xl">⏰</div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-silent-detention":
      case "fr-family-unaware-location":
      case "fr-article-22-violated":
      case "fr-illegal-detention-continues":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="jail" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-6xl">😰</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-demands-grounds":
      case "fr-insists-magistrate":
      case "fr-lawyer-requested":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="jail" />
            <div className="absolute bottom-24 left-24">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Article 22! ⚖️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-released-by-court":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="court" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <div className="text-6xl">✅</div>
            </motion.div>
            <div className="absolute top-20 right-10">
              <GavelSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Article 23 Forced Labor
      case "fr-field-workers":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="park" />
            <div className="absolute bottom-24 left-16">
              <DetailedStickmanSVG type="uncomfortable" />
            </div>
            <div className="absolute bottom-24 left-36">
              <BackgroundPersonSVG color="#92400e" />
            </div>
            <div className="absolute bottom-24 left-56">
              <BackgroundPersonSVG color="#78350f" />
            </div>
            <div className="absolute top-10 left-10 text-4xl">🌾</div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-landlord-threatens":
      case "fr-no-payment-given":
      case "fr-no-freedom-leave":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="park" />
            <div className="absolute bottom-24 left-20">
              <DetailedStickmanSVG type="scared" />
            </div>
            <div className="absolute bottom-24 left-40">
              <BackgroundPersonSVG color="#6b7280" />
            </div>
            <div className="absolute bottom-24 right-24">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️ Forced Labor!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-workers-submit":
      case "fr-bondage-continues":
      case "fr-children-trapped":
      case "fr-exploitation-cycle":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="park" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <BackgroundPersonSVG color="#6b7280" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <BackgroundPersonSVG color="#9ca3af" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-6xl">⛓️</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-contacts-activist":
      case "fr-authorities-raid":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="park" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1, repeat: Infinity }}>
              <div className="text-5xl">🚨</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-landlord-arrested":
      case "fr-workers-freed":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="park" />
            <div className="absolute bottom-24 left-16">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 left-36">
              <BackgroundPersonSVG color="#10b981" />
            </div>
            <div className="absolute bottom-24 left-56">
              <BackgroundPersonSVG color="#22c55e" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold">
                Freedom! 🎉
              </div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Article 24 Child Labor
      case "fr-meena-brick-kiln":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ x: [-5, 5, -5] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <DetailedStickmanSVG type="scared" />
            </motion.div>
            <div className="absolute top-10 left-10 text-5xl">🧱</div>
            <div className="absolute top-10 right-10 bg-orange-600 text-white px-3 py-2 rounded-lg text-sm shadow-lg">
              Age: 12
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-dangerous-machinery":
      case "fr-missing-school":
      case "fr-child-exhausted":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="uncomfortable" />
            </div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
              ⚠️ Child Labor!
            </motion.div>
            <div className="absolute top-10 left-10 text-3xl">⚙️</div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-child-continues-work":
      case "fr-no-education-access":
      case "fr-health-deteriorates":
      case "fr-childhood-lost":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-6xl">😢</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-teacher-discovers":
      case "fr-childline-alerted":
      case "fr-kiln-inspected":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedPoliceSVG />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-4xl">📞</div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-meena-rescued":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold">
                🎓 Back to School!
              </div>
            </motion.div>
            <div className="absolute top-20 right-10 text-3xl">📚</div>
            <SceneDescription text={description} />
          </div>
        )

      // Article 28 Religious Instruction
      case "fr-morning-assembly":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-16">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-24 left-36">
              <BackgroundPersonSVG color="#8b5cf6" />
            </div>
            <div className="absolute bottom-24 left-56">
              <BackgroundPersonSVG color="#10b981" />
            </div>
            <div className="absolute bottom-24 right-24">
              <InterviewerSVG />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-3xl">🏫</div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-hindu-prayer-forced":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-16">
              <DetailedStickmanSVG type="uncomfortable" />
            </div>
            <div className="absolute bottom-24 left-36">
              <BackgroundPersonSVG color="#8b5cf6" />
            </div>
            <div className="absolute bottom-24 right-24">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
              🙏 Forced Prayer
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-student-refuses-prayer":
      case "fr-teacher-punishes":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-24">
              <DetailedStickmanSVG type="scared" />
            </div>
            <div className="absolute bottom-24 right-24">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Punishment!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-forced-participation":
      case "fr-religious-freedom-lost":
      case "fr-secular-values-erode":
      case "fr-coercion-continues":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-6xl">😔</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-student-objects":
      case "fr-parents-complain":
      case "fr-invokes-article-28":
      case "fr-secular-restored":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold">
                🏫 Secular Education!
              </div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Article 30 Minority School
      case "fr-sikh-community-meets":
      case "fr-punjabi-education-plan":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-16">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 left-36">
              <BackgroundPersonSVG color="#f59e0b" />
            </div>
            <div className="absolute bottom-24 right-24">
              <BackgroundPersonSVG color="#3b82f6" />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-4xl">🏫</div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-permission-application":
      case "fr-state-refuses":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-24">
              <DetailedStickmanSVG type="uncomfortable" />
            </div>
            <div className="absolute bottom-24 right-24">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
              ❌ Permission Denied
            </motion.div>
            <div className="absolute top-10 left-10">
              <DocumentSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-community-gives-up":
      case "fr-language-erodes":
      case "fr-minority-rights-denied":
      case "fr-cultural-loss":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-6xl">💔</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-consults-expert":
      case "fr-high-court-petition":
      case "fr-article-30-cited":
      case "fr-school-permission-granted":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="court" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <MagistrateSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold">
                🏫 School Approved!
              </div>
            </motion.div>
            <div className="absolute top-20 right-10">
              <GavelSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Article 32 Writ Petition
      case "fr-daughter-detained-illegal":
      case "fr-local-courts-slow":
      case "fr-fundamental-right-violated":
      case "fr-decides-supreme-court":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="jail" />
            <div className="absolute bottom-24 left-24">
              <DetailedStickmanSVG type="uncomfortable" />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
              ⚠️ Illegal Detention
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-waits-local-court":
      case "fr-detention-prolongs":
      case "fr-justice-delayed":
      case "fr-right-unfulfilled":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="jail" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-6xl">😰</div>
            </motion.div>
            <div className="absolute top-10 left-10 text-3xl">⏰</div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-senior-advocate-meets":
      case "fr-writ-petition-filed":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="court" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Article 32! ⚖️
            </motion.div>
            <div className="absolute top-10 left-10">
              <DocumentSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "fr-supreme-court-hears":
      case "fr-daughter-freed":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="court" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <MagistrateSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <div className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold">
                Released! ⚖️✅
              </div>
            </motion.div>
            <div className="absolute top-20 right-10">
              <GavelSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // HUMAN RIGHTS ANIMATIONS - Level 1: Gender Discrimination
      case "hr-job-application":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }}>
              <DetailedStickmanSVG type="customer" />
            </motion.div>
            <div className="absolute bottom-24 right-1/3">
              <InterviewerSVG />
            </div>
            <div className="absolute bottom-28 left-8"><BackgroundPersonSVG /></div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2">
              <BriefcaseSVG />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-strong-interview":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-3 py-2 rounded-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1 }}>
              ✅ Excellent!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-employer-hesitation":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-10 right-10" animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2 }}>
              <div className="text-4xl">🤔</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-gender-rejection":
      case "hr-accepts-discrimination":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1 }}>
              ❌ "No women for field roles"
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-loses-confidence":
      case "hr-discrimination-spreads":
      case "hr-inequality-persists":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-6xl">😢</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-challenges-decision":
      case "hr-documents-evidence":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-10 left-10" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <DocumentSVG />
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-files-complaint":
      case "hr-wins-equality-case":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="court" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <MagistrateSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ⚖️ Article 14 & 15!
            </motion.div>
            <div className="absolute top-10 right-10"><GavelSVG /></div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 2: Right to Education
      case "hr-child-at-home":
      case "hr-household-work":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="child" />
            </div>
            <div className="absolute bottom-28 right-12">
              <BackgroundPersonSVG color="#9ca3af" />
            </div>
            <div className="absolute top-10 right-10">
              <div className="text-5xl">🧹</div>
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-no-education":
      case "hr-authorities-inactive":
      case "hr-education-denied":
      case "hr-future-limited":
      case "hr-poverty-cycle":
      case "hr-potential-wasted":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-6xl">📚❌</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-activist-intervention":
      case "hr-invokes-rte-act":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="child" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              📜 Right to Education Act
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-authorities-compelled":
      case "hr-education-begins":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="school" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-28 left-12"><BackgroundPersonSVG color="#10b981" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#3b82f6" /></div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2 }}>
              <div className="text-6xl">🎓✨</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 3: Freedom of Expression
      case "hr-online-post":
      case "hr-government-policy-critique":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2">
              <div className="bg-white p-3 rounded-lg shadow-lg text-sm">💬 Online Post</div>
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-police-summon":
      case "hr-threatened-arrest":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="police-station" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="scared" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedPoliceSVG aggressive />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 py-2 rounded" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️ Threatened!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-self-censors":
      case "hr-chilling-effect":
      case "hr-democracy-weakens":
      case "hr-voices-silenced":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2">
              <NoSpeechSVG />
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-stands-firm":
      case "hr-legal-counsel":
      case "hr-invokes-article-19":
      case "hr-case-dismissed":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="court" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              🗣️ Article 19(1)(a)
            </motion.div>
            <div className="absolute top-10 right-10"><GavelSVG /></div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 4: Privacy Violation
      case "hr-rented-flat":
      case "hr-strange-feeling":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-discovers-cameras":
      case "hr-landlord-excuse":
      case "hr-tolerates-invasion":
      case "hr-trauma-builds":
      case "hr-insecurity-grows":
      case "hr-dignity-violated":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="scared" />
            </div>
            <motion.div className="absolute top-12 left-1/4 bg-red-600 text-white p-2 rounded-full" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📹
            </motion.div>
            <motion.div className="absolute top-12 right-1/4 bg-red-600 text-white p-2 rounded-full" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}>
              📹
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">😰</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-documents-cameras":
      case "hr-files-police-complaint":
      case "hr-invokes-privacy-right":
      case "hr-landlord-prosecuted":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="police-station" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              🛡️ Article 21 (Privacy)
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 5: Child Labour
      case "hr-child-working":
      case "hr-long-hours":
      case "hr-no-school":
      case "hr-childhood-lost":
      case "hr-exploitation-continues":
      case "hr-health-suffers":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="shop" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="child" />
            </div>
            <div className="absolute top-10 right-12">
              <div className="text-5xl">☕</div>
            </div>
            <div className="absolute bottom-28 right-12">
              <BackgroundPersonSVG color="#9ca3af" />
            </div>
            <motion.div className="absolute top-12 left-12 bg-red-600 text-white px-3 py-1 rounded" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ Child Labour
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-teacher-notices":
      case "hr-childline-called":
      case "hr-rescue-operation":
      case "hr-child-rehabilitated":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="school" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-28 left-12"><BackgroundPersonSVG color="#10b981" /></div>
            <div className="absolute bottom-28 right-12"><LawyerSVG /></div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              📚 Article 24 - Rescued!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 6: Religious Freedom
      case "hr-morning-assembly":
      case "hr-forced-prayer":
      case "hr-student-refuses":
      case "hr-teacher-punishes":
      case "hr-forced-compliance":
      case "hr-religious-distress":
      case "hr-secular-values-lost":
      case "hr-discrimination-normalized":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="school" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <div className="absolute bottom-28 left-12"><BackgroundPersonSVG color="#9ca3af" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#9ca3af" /></div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 py-2 rounded" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.2 }}>
              🙏 Forced Prayer
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-parents-informed":
      case "hr-formal-complaint":
      case "hr-invokes-article-25":
      case "hr-secular-restored":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              🕊️ Article 25 & 28
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 7: Environmental Rights
      case "hr-village-water-source":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="nature" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute top-10 right-12">
              <div className="text-5xl">💧</div>
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-factory-pollution":
      case "hr-water-contaminated":
      case "hr-authorities-ignore":
      case "hr-health-crisis":
      case "hr-children-sick":
      case "hr-deaths-occur":
      case "hr-environment-destroyed":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="nature" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div className="absolute top-12 left-1/4" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">🏭</div>
            </motion.div>
            <motion.div className="absolute top-12 right-1/4 bg-green-900 text-white px-3 py-2 rounded" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ☠️ Toxic Waste
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-community-organizes":
      case "hr-files-pil":
      case "hr-invokes-article-21":
      case "hr-factory-penalized":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="court" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <MagistrateSVG />
            </div>
            <div className="absolute bottom-28 left-8"><BackgroundPersonSVG color="#10b981" /></div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              🌱 Clean Environment!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 8: Torture Protection
      case "hr-peaceful-protest":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-28 left-8"><BackgroundPersonSVG color="#3b82f6" /></div>
            <div className="absolute bottom-28 right-8"><BackgroundPersonSVG color="#10b981" /></div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-taken-custody":
      case "hr-refuses-slogans":
      case "hr-police-brutality":
      case "hr-physical-trauma":
      case "hr-psychological-damage":
      case "hr-fear-spreads":
      case "hr-democracy-threatened":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="jail" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="scared" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedPoliceSVG aggressive />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️ Torture!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-medical-examination":
      case "hr-files-complaint":
      case "hr-invokes-article-21":
      case "hr-officers-punished":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="court" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <DoctorSVG />
            </div>
            <div className="absolute top-10 right-10"><MedicalKitSVG /></div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ⚖️ Article 21 & UDHR 5
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 9: Digital Privacy
      case "hr-telecom-service":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute top-10 right-12">
              <div className="text-5xl">📱</div>
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-data-shared-secretly":
      case "hr-targeted-ads":
      case "hr-discovers-breach":
      case "hr-privacy-lost":
      case "hr-data-misused":
      case "hr-identity-theft-risk":
      case "hr-autonomy-violated":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="scared" />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ x: [0, 20, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-4xl">📊</div>
            </motion.div>
            <motion.div className="absolute top-12 right-12" animate={{ x: [0, -20, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
              <div className="text-4xl">🎯</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 py-2 rounded" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ Data Breach
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-files-complaint-trai":
      case "hr-invokes-privacy-law":
      case "hr-demands-compensation":
      case "hr-privacy-restored":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              🔒 Puttaswamy Judgment
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 10: Access to Justice
      case "hr-house-demolished":
      case "hr-no-hearing-given":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div className="absolute top-12 left-1/4" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <div className="text-5xl">🚜</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 py-2 rounded" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.2 }}>
              🏚️ Demolished!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-approaches-court":
      case "hr-told-cannot-challenge":
      case "hr-believes-officials":
      case "hr-homeless-helpless":
      case "hr-rights-meaningless":
      case "hr-arbitrary-power":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-6xl">😢</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "hr-seeks-legal-aid":
      case "hr-files-writ-petition":
      case "hr-court-hears-case":
      case "hr-justice-delivered":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="court" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <MagistrateSVG />
            </div>
            <div className="absolute bottom-28 left-8"><LawyerSVG /></div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ⚖️ Article 32 & 226!
            </motion.div>
            <div className="absolute top-10 right-10"><GavelSVG /></div>
            <SceneDescription text={description} />
          </div>
        )

      // WOMEN'S RIGHTS ANIMATIONS - Level 1: Workplace Harassment
      case "wr-office-arrival":
      case "wr-manager-comments":
      case "wr-unwelcome-messages":
      case "wr-hr-dismisses":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3" animate={{ scale: [1, 0.95, 1] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="scared" />
            </motion.div>
            <div className="absolute bottom-24 right-1/3">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-12 right-12 bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ Harassment!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-silently-endures":
      case "wr-hostile-environment":
      case "wr-mental-health-suffers":
      case "wr-rights-violated":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Rights Violated
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-formal-complaint":
      case "wr-invokes-posh-act":
      case "wr-inquiry-conducted":
      case "wr-manager-penalized":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              💼 POSH Act 2013 - ICC
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-green-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Justice Served
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 2: Equal Pay
      case "wr-same-job":
      case "wr-discovers-gap":
      case "wr-confronts-hr":
      case "wr-hr-deflects":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <MoneyBillSVG />
            </motion.div>
            <motion.div className="absolute top-12 right-12" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
              <MoneyBillSVG />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.2 }}>
              ₹5,000 Less!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-accepts-inequality":
      case "wr-self-worth-drops":
      case "wr-inequality-persists":
      case "wr-discrimination-spreads":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Pay Gap Continues
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-files-complaint":
      case "wr-cites-equal-rem-act":
      case "wr-legal-action":
      case "wr-equal-pay-awarded":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Equal Remuneration Act 1976
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Equal Pay Awarded!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 3: Dowry Harassment
      case "wr-marriage-begins":
      case "wr-inlaws-demand-car":
      case "wr-threatens-mistreat":
      case "wr-pressure-increases":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ x: [-5, 5, -5, 0] }} transition={{ duration: 1 }}>
              <DetailedStickmanSVG type="scared" />
            </motion.div>
            <div className="absolute bottom-28 left-12"><BackgroundPersonSVG color="#9ca3af" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#6b7280" /></div>
            <motion.div className="absolute top-12 right-12" animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-6xl">🚗</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ Dowry Demand!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-gives-in-dowry":
      case "wr-demands-escalate":
      case "wr-violence-risk":
      case "wr-illegal-practice-continues":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <div className="absolute bottom-28 left-12"><BackgroundPersonSVG color="#dc2626" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#b91c1c" /></div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Dowry Given - Crime Perpetuated
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-refuses-dowry":
      case "wr-police-complaint":
      case "wr-invokes-dowry-act":
      case "wr-inlaws-warned":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Dowry Prohibition Act 1961
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Harassment Stopped!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 4: Domestic Violence  
      case "wr-abuse-begins":
      case "wr-husband-dismisses":
      case "wr-isolated-fearful":
      case "wr-seeks-help":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/3" animate={{ scale: [1, 0.9, 1], y: [0, 5, 0] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="scared" />
            </motion.div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedStickmanSVG type="aggressive" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️ Domestic Violence!
            </motion.div>
            <div className="absolute top-12 right-12">
              <div className="text-5xl">☎️</div>
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-stays-silent":
      case "wr-abuse-worsens":
      case "wr-life-endangered":
      case "wr-children-traumatized":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ x: [-8, 8, -8, 0], scale: [1, 0.85, 1] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
              ❌ Violence Escalates
            </motion.div>
            <div className="absolute bottom-28 left-12 opacity-30"><BackgroundPersonSVG color="#6b7280" /></div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-contacts-police":
      case "wr-files-pwdva-case":
      case "wr-protection-order":
      case "wr-safe-shelter":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute top-12 left-12 bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              🛡️ PWDVA 2005
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Protection Order Issued
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 5: Maternity Benefits
      case "wr-pregnancy-announced":
      case "wr-employer-unhappy":
      case "wr-forced-resignation":
      case "wr-unfair-pressure":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3" animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <div className="absolute bottom-24 right-1/3">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-12 right-12" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">🤰</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.2 }}>
              ❌ Forced Resignation!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-resigns-under-pressure":
      case "wr-financial-hardship":
      case "wr-discrimination-unchallenged":
      case "wr-other-women-suffer":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Pregnancy Discrimination
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-refuses-resignation":
      case "wr-cites-maternity-act":
      case "wr-legal-complaint":
      case "wr-26-weeks-leave":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-12 right-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2 }}>
              <div className="text-5xl">🤰</div>
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              👶 Maternity Benefit Act - 26 weeks
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Rights Protected!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 6: Public Harassment
      case "wr-bus-journey":
      case "wr-men-harass":
      case "wr-conductor-ignores":
      case "wr-feels-unsafe":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ x: [-5, 5, -5, 0], scale: [1, 0.95, 1] }} transition={{ duration: 1 }}>
              <DetailedStickmanSVG type="scared" />
            </motion.div>
            <div className="absolute bottom-28 left-12"><BackgroundPersonSVG color="#6b7280" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#9ca3af" /></div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️ Public Harassment!
            </motion.div>
            <div className="absolute top-12 right-12">
              <div className="text-4xl">🚌</div>
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-stays-silent-shame":
      case "wr-harassment-continues":
      case "wr-other-women-targeted":
      case "wr-public-spaces-unsafe":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ scale: [1, 0.85, 1] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <div className="absolute bottom-28 left-12"><BackgroundPersonSVG color="#dc2626" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#b91c1c" /></div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Harassment Unchecked
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-calls-100":
      case "wr-files-fir":
      case "wr-invokes-sec-354":
      case "wr-accused-arrested":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute top-12 left-12 bg-orange-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              📜 Sec 354 & 509 IPC
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Accused Arrested!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 7: Child Marriage
      case "wr-aarti-16":
      case "wr-parents-arrange":
      case "wr-aarti-protests":
      case "wr-forced-marriage-plan":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, -8, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="child" />
            </motion.div>
            <div className="absolute bottom-28 left-12"><BackgroundPersonSVG color="#9ca3af" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#6b7280" /></div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ Age 16 - Illegal!
            </motion.div>
            <div className="absolute top-12 right-12">
              <div className="text-5xl">📚</div>
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-forced-to-marry":
      case "wr-education-stops":
      case "wr-health-risks":
      case "wr-childhood-stolen":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ scale: [1, 0.85, 1] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <div className="absolute bottom-28 left-12"><BackgroundPersonSVG color="#6b7280" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#9ca3af" /></div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Childhood Stolen
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-contacts-childline":
      case "wr-cmpo-intervenes":
      case "wr-marriage-stopped":
      case "wr-continues-education":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute top-12 left-12 bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              🚫 Child Marriage Act 2006
            </motion.div>
            <div className="absolute top-12 right-12">
              <div className="text-5xl">📚</div>
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Marriage Stopped!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 8: Property Inheritance
      case "wr-father-passes":
      case "wr-brothers-claim-all":
      case "wr-only-sons-inherit":
      case "wr-sita-denied":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <div className="absolute bottom-28 right-1/4"><BackgroundPersonSVG color="#6b7280" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#9ca3af" /></div>
            <motion.div className="absolute top-12 left-1/4" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-6xl">🏠</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.2 }}>
              ❌ Sons Only?
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-accepts-denial":
      case "wr-financial-insecurity":
      case "wr-discrimination-persists":
      case "wr-injustice-unchallenged":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Property Denied
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-consults-lawyer":
      case "wr-files-partition-suit":
      case "wr-cites-succession-act":
      case "wr-equal-share-awarded":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-12 left-1/4" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2 }}>
              <div className="text-6xl">🏠</div>
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ⚖️ Hindu Succession Act 2005 - Equal Rights!
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Equal Share Awarded!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 9: Reproductive Choice
      case "wr-pregnancy-early":
      case "wr-wants-termination":
      case "wr-husband-refuses":
      case "wr-clinic-denies":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="clinic" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DoctorSVG />
            </div>
            <div className="absolute top-10 right-12">
              <MedicalKitSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.2 }}>
              ❌ Permission Denied
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-forced-to-continue":
      case "wr-bodily-autonomy-violated":
      case "wr-mental-trauma":
      case "wr-unsafe-alternatives":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="clinic" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Autonomy Violated
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-seeks-legal-counsel":
      case "wr-finds-registered-facility":
      case "wr-invokes-mtp-act":
      case "wr-safe-procedure":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="clinic" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DoctorSVG />
            </div>
            <div className="absolute top-10 right-12">
              <MedicalKitSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              🩺 MTP Act 2021 - Her Choice
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Privacy & Dignity - Article 21
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 10: Political Participation
      case "wr-panchayat-elections":
      case "wr-sunita-wants-contest":
      case "wr-villagers-discourage":
      case "wr-faces-opposition":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="park" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <div className="absolute bottom-28 left-12"><BackgroundPersonSVG color="#6b7280" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#9ca3af" /></div>
            <motion.div className="absolute top-12 left-12" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">🗳️</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.2 }}>
              ⚠️ "Politics is for men"
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-withdraws-candidacy":
      case "wr-women-voiceless":
      case "wr-democracy-weakened":
      case "wr-patriarchy-continues":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="park" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <div className="absolute bottom-28 left-12"><BackgroundPersonSVG color="#6b7280" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#9ca3af" /></div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Democracy Weakened
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "wr-files-nomination":
      case "wr-cites-73rd-amendment":
      case "wr-campaigns-actively":
      case "wr-wins-election":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="park" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="confident" />
            </motion.div>
            <div className="absolute bottom-28 left-12"><BackgroundPersonSVG color="#10b981" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#3b82f6" /></div>
            <motion.div className="absolute top-12 left-12" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">🗳️</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              👩‍⚖️ 73rd Amendment - 33% Reservation
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Political Rights - Art 14, 15, 16
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // CHILD RIGHTS ANIMATIONS - Level 1: Right to Education
      case "cr-school-arrival":
      case "cr-denied-admission":
      case "cr-cannot-afford":
      case "cr-arjun-disappointed":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="child" />
            </motion.div>
            <div className="absolute bottom-24 right-1/3">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">📚</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ❌ Admission Denied!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-stays-home":
      case "cr-future-limited":
      case "cr-poverty-cycle":
      case "cr-right-denied":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Education Denied
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-files-complaint":
      case "cr-invokes-rte-act":
      case "cr-free-admission":
      case "cr-education-begins":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">📚</div>
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              📜 RTE Act 2009 - Article 21-A
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Free Education Granted!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 2: Child Labour
      case "cr-working-restaurant":
      case "cr-employer-justifies":
      case "cr-misses-school":
      case "cr-childhood-lost":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3" animate={{ x: [-3, 3, -3, 0], y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <DetailedStickmanSVG type="child" />
            </motion.div>
            <div className="absolute bottom-24 right-1/3">
              <ShopkeeperSVG />
            </div>
            <motion.div className="absolute top-12 right-12" animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <FoodPlateSVG />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ Child Labour!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-continues-working":
      case "cr-health-suffers":
      case "cr-no-education":
      case "cr-exploitation":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ scale: [1, 0.9, 1] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Exploitation Continues
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-rescue-operation":
      case "cr-employer-penalized":
      case "cr-enrolled-school":
      case "cr-childhood-restored":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2 }}>
              <div className="text-5xl">📚</div>
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Child Labour Act 2016
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Child Rescued!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 3: Protection from Abuse
      case "cr-abuse-incident":
      case "cr-parents-hesitate":
      case "cr-abuse-continues":
      case "cr-riya-traumatized":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ x: [-5, 5, -5, 0], scale: [1, 0.9, 1] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="scared" />
            </motion.div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#dc2626" /></div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️ Abuse!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-silence-maintained":
      case "cr-trauma-deepens":
      case "cr-abuser-unpunished":
      case "cr-child-suffers":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0], scale: [1, 0.85, 1] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
              ❌ Trauma Deepens
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-reports-police":
      case "cr-pocso-invoked":
      case "cr-child-friendly-trial":
      case "cr-abuser-arrested":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              🛡️ POCSO Act 2012
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Abuser Arrested!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 4: Right to Identity
      case "cr-no-documents":
      case "cr-orphanage-neglect":
      case "cr-school-denied":
      case "cr-welfare-denied":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="child" />
            </motion.div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">📋</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ❌ No Identity Documents!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-remains-undocumented":
      case "cr-education-blocked":
      case "cr-invisible-system":
      case "cr-rights-inaccessible":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0], opacity: [1, 0.5, 1] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Invisible to System
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-contacts-authorities":
      case "cr-birth-registration":
      case "cr-aadhaar-created":
      case "cr-identity-established":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2 }}>
              <div className="text-5xl">📋</div>
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              UNCRC Article 7 - Right to Identity
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Identity Established!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 5: Nutrition and Health
      case "cr-no-meals":
      case "cr-funds-diverted":
      case "cr-children-hungry":
      case "cr-health-crisis":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ scale: [1, 0.95, 1] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="child" />
            </motion.div>
            <div className="absolute bottom-28 left-12"><DetailedStickmanSVG type="child" /></div>
            <div className="absolute bottom-28 right-12"><DetailedStickmanSVG type="child" /></div>
            <motion.div className="absolute top-12 right-12" animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <FoodPlateSVG contaminated={false} />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ❌ No Midday Meals!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-malnutrition-spreads":
      case "cr-serious-illness":
      case "cr-education-affected":
      case "cr-development-impaired":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Malnutrition Crisis
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-parents-complain":
      case "cr-investigation-starts":
      case "cr-official-punished":
      case "cr-meals-restored":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-12 right-12" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <FoodPlateSVG />
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Mid-Day Meal Scheme - Article 21
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Meals Restored!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 6: Child Marriage
      case "cr-marriage-arranged":
      case "cr-tradition-cited":
      case "cr-wedding-planned":
      case "cr-meena-scared":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ x: [-5, 5, -5, 0] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="child" />
            </motion.div>
            <div className="absolute bottom-28 left-12"><BackgroundPersonSVG color="#9ca3af" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#6b7280" /></div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ Age 14 - Illegal Marriage!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-forced-marriage":
      case "cr-education-ends":
      case "cr-health-risk":
      case "cr-dreams-crushed":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ scale: [1, 0.85, 1] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Childhood Lost
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-teacher-intervenes":
      case "cr-cmpo-contacted":
      case "cr-marriage-stopped":
      case "cr-meena-protected":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2 }}>
              <div className="text-5xl">📚</div>
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              🚫 Child Marriage Act 2006
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Marriage Stopped!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 7: Express Views
      case "cr-school-meeting":
      case "cr-students-ask":
      case "cr-principal-refuses":
      case "cr-voices-silenced":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="child" />
            </div>
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2"><DetailedStickmanSVG type="child" /></div>
            <div className="absolute bottom-24 right-1/4">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5 }}>
              ❌ "Children Don't Decide"
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-students-silent":
      case "cr-dignity-violated":
      case "cr-decision-imposed":
      case "cr-resentment-grows":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Voices Silenced
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-students-petition":
      case "cr-uncrc-cited":
      case "cr-forum-created":
      case "cr-voices-heard":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-28 right-1/4"><DetailedStickmanSVG type="confident" /></div>
            <div className="absolute bottom-24 right-12">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              UNCRC Article 12 - Right to be Heard
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Student Council Created!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 8: Child Trafficking
      case "cr-recruiter-arrives":
      case "cr-false-promises":
      case "cr-children-transported":
      case "cr-forced-labour":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="child" />
            </div>
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2"><DetailedStickmanSVG type="child" /></div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="aggressive" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ Child Trafficking!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-trafficking-continues":
      case "cr-exploitation-severe":
      case "cr-no-education":
      case "cr-trapped":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ x: [-5, 5, -5, 0], scale: [1, 0.85, 1] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
              ❌ Severe Exploitation
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-raid-conducted":
      case "cr-children-rescued":
      case "cr-trafficker-arrested":
      case "cr-rehabilitation":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              IPC Sections 370-371 - Trafficking
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Children Rescued!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 9: Shelter and Care
      case "cr-disaster-strikes":
      case "cr-no-shelter":
      case "cr-authorities-inactive":
      case "cr-children-suffering":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="child" />
            </div>
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2"><DetailedStickmanSVG type="child" /></div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="child" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ Children Orphaned - No Shelter!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-neglect-continues":
      case "cr-health-deteriorates":
      case "cr-vulnerable-exploitation":
      case "cr-rights-violated":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ State Negligence
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-ngo-intervenes":
      case "cr-jj-act-invoked":
      case "cr-shelter-provided":
      case "cr-rehabilitation-begins":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-28 right-1/4"><DetailedStickmanSVG type="confident" /></div>
            <div className="absolute bottom-24 right-12">
              <LawyerSVG />
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              JJ Act 2015 - Care & Protection
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Shelter & Care Provided!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 10: Cyberbullying
      case "cr-social-media-bullying":
      case "cr-body-shaming":
      case "cr-school-ignores":
      case "cr-mental-distress":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ scale: [1, 0.9, 1] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="scared" />
            </motion.div>
            <div className="absolute bottom-28 left-12"><BackgroundPersonSVG color="#dc2626" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#b91c1c" /></div>
            <motion.div className="absolute top-12 right-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">📱</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ Cyberbullying!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-bullying-escalates":
      case "cr-depression":
      case "cr-academic-decline":
      case "cr-dignity-violated":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0], scale: [1, 0.85, 1] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-12 right-12" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <div className="text-5xl">📱</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
              ❌ Mental Health Crisis
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "cr-parents-act":
      case "cr-cybercrime-complaint":
      case "cr-it-act-invoked":
      case "cr-bullies-punished":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute top-12 right-12" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2 }}>
              <div className="text-5xl">📱</div>
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              IT Act 2000 - Sections 66E, 67B
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Bullies Punished!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // FAMILY & MARRIAGE LAWS ANIMATIONS - Level 1: Legal Age for Marriage
      case "fm-temple-marriage":
      case "fm-friends-witness":
      case "fm-no-parents":
      case "fm-priya-underage":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="park" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedStickmanSVG type="child" />
            </div>
            <div className="absolute bottom-28 left-12"><BackgroundPersonSVG color="#9ca3af" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#9ca3af" /></div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ Age 17 - Below Legal Age!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-marriage-voidable":
      case "fm-punishment-risk":
      case "fm-priya-vulnerable":
      case "fm-child-marriage-act":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Marriage Voidable
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-wait-legal-age":
      case "fm-parents-informed":
      case "fm-legal-marriage":
      case "fm-rights-protected":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="park" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-28 left-12"><BackgroundPersonSVG color="#10b981" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#10b981" /></div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Age 21 & 18 - Legal Marriage
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Rights Protected!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 2: Registration of Marriage
      case "fm-hindu-rituals":
      case "fm-no-registration":
      case "fm-suresh-denies":
      case "fm-anjali-struggles":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedStickmanSVG type="aggressive" />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">📄</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ No Registration - Proof Difficult!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-difficult-proof":
      case "fm-legal-battles":
      case "fm-rights-challenged":
      case "fm-documentation-critical":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Legal Battle
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-shows-witnesses":
      case "fm-ritual-photos":
      case "fm-hindu-marriage-act":
      case "fm-marriage-validated":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2 }}>
              <div className="text-5xl">📄</div>
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Hindu Marriage Act 1955
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Marriage Validated!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 3: Inter-Religious Marriage
      case "fm-different-faiths":
      case "fm-family-opposes":
      case "fm-no-conversion":
      case "fm-need-protection":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-28 left-12"><BackgroundPersonSVG color="#dc2626" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#dc2626" /></div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ Family Opposition!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-forced-conversion":
      case "fm-family-pressure":
      case "fm-no-legal-status":
      case "fm-inheritance-issues":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ x: [-5, 5, -5, 0] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ No Legal Protection
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-special-marriage-act":
      case "fm-civil-marriage":
      case "fm-legal-recognition":
      case "fm-full-rights":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-28 right-12">
              <LawyerSVG />
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Special Marriage Act 1954
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Marriage Legally Recognized!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 4: Domestic Violence in Marriage
      case "fm-verbal-abuse":
      case "fm-threats":
      case "fm-no-divorce-yet":
      case "fm-fears-escalation":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ x: [-5, 5, -5, 0], scale: [1, 0.95, 1] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="scared" />
            </motion.div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#dc2626" /></div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️ Domestic Violence!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-abuse-worsens":
      case "fm-mental-trauma":
      case "fm-no-protection":
      case "fm-life-danger":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0], scale: [1, 0.85, 1] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
              ❌ Life in Danger
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-files-dv-case":
      case "fm-protection-order":
      case "fm-residence-rights":
      case "fm-safe-no-divorce":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              PWDVA 2005 - Protection Order
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Protected Without Divorce!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 5: Mutual Divorce
      case "fm-peaceful-separation":
      case "fm-mutual-agreement":
      case "fm-no-children":
      case "fm-clean-break":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2 }}>
              ℹ️ Mutual Agreement to Separate
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-contested-divorce":
      case "fm-long-legal-battle":
      case "fm-high-costs":
      case "fm-emotional-drain":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Years of Legal Battle
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-section-13b":
      case "fm-one-year-separation":
      case "fm-mutual-consent-granted":
      case "fm-peaceful-closure":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Section 13B - HMA / Section 28 - SMA
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Divorce Granted Peacefully!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 6: Maintenance After Divorce
      case "fm-after-divorce":
      case "fm-needs-support":
      case "fm-husband-refuses":
      case "fm-financial-crisis":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">💰</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ No Income - Financial Crisis!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-destitution":
      case "fm-no-means":
      case "fm-dignity-lost":
      case "fm-suffers-poverty":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0], scale: [1, 0.9, 1] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Destitution
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-files-125-crpc":
      case "fm-court-hearing":
      case "fm-maintenance-ordered":
      case "fm-financial-security":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-12 right-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2 }}>
              <div className="text-5xl">💰</div>
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Section 125 CrPC - Maintenance
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Maintenance Ordered!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 7: Right to Inheritance
      case "fm-father-dies":
      case "fm-brothers-deny":
      case "fm-girls-dont-inherit":
      case "fm-property-division":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <div className="absolute bottom-28 right-1/4"><BackgroundPersonSVG color="#6b7280" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#9ca3af" /></div>
            <motion.div className="absolute top-12 left-1/4" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">🏠</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ "Girls Don't Inherit"
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-accepts-denial":
      case "fm-loses-rightful-share":
      case "fm-brothers-take-all":
      case "fm-injustice-prevails":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Inheritance Denied
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-files-partition-suit":
      case "fm-succession-act-2005":
      case "fm-equal-coparcenary":
      case "fm-equal-share-awarded":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2 }}>
              <div className="text-5xl">🏠</div>
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Hindu Succession Act 2005 - Equal Rights
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Equal Share Awarded!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 8: Adoption
      case "fm-wants-adopt":
      case "fm-legal-adoption":
      case "fm-full-rights":
      case "fm-loving-home":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <motion.div className="absolute bottom-28 left-1/2 -translate-x-1/2" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="child" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2 }}>
              ℹ️ Want to Adopt Legally
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-informal-adoption":
      case "fm-no-legal-status":
      case "fm-no-inheritance":
      case "fm-vulnerable-child":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="child" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ No Legal Status
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-hindu-adoption-act":
      case "fm-legal-process":
      case "fm-same-as-biological":
      case "fm-family-complete":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <LawyerSVG />
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Hindu Adoption & Maintenance Act 1956
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Legal Adoption Complete!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 9: Custody
      case "fm-divorce-custody":
      case "fm-father-earns-more":
      case "fm-child-prefers-mother":
      case "fm-custody-battle":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-28 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="child" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚖️ Custody Battle
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-father-takes-custody":
      case "fm-child-unhappy":
      case "fm-welfare-ignored":
      case "fm-emotional-trauma":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0], scale: [1, 0.9, 1] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="child" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Child Unhappy
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-family-court-decides":
      case "fm-child-welfare-priority":
      case "fm-child-preference-considered":
      case "fm-custody-to-mother":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-28 right-1/3">
              <DetailedStickmanSVG type="child" />
            </div>
            <div className="absolute bottom-24 right-12">
              <LawyerSVG />
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Child's Welfare Priority - Guardians Act
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Child's Best Interest!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 10: Bigamy
      case "fm-already-married":
      case "fm-secret-second-marriage":
      case "fm-no-divorce":
      case "fm-first-wife-discovers":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="aggressive" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ Bigamy - Second Marriage!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-bigamy-continues":
      case "fm-first-wife-suffers":
      case "fm-legal-complications":
      case "fm-criminal-offense":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Criminal Offense
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-first-wife-complains":
      case "fm-ipc-494-invoked":
      case "fm-second-marriage-void":
      case "fm-rajesh-imprisoned":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              IPC Section 494 - Bigamy
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Justice Served!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 11: Dowry
      case "fm-dowry-demand":
      case "fm-threats":
      case "fm-parents-pressured":
      case "fm-neha-scared":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ x: [-5, 5, -5, 0], scale: [1, 0.95, 1] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="scared" />
            </motion.div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#dc2626" /></div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">🚗</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️ Dowry Demand!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-dowry-given":
      case "fm-demands-increase":
      case "fm-violence-escalates":
      case "fm-dowry-death-risk":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0], scale: [1, 0.85, 1] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
              ❌ Violence Risk
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-police-complaint":
      case "fm-dowry-act-invoked":
      case "fm-498a-ipc":
      case "fm-in-laws-arrested":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2 }}>
              <div className="text-5xl">🚗</div>
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Dowry Act 1961 & IPC 498A
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ In-Laws Arrested!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 12: Live-in Relationships
      case "fm-living-together":
      case "fm-not-married":
      case "fm-domestic-violence":
      case "fm-partner-denies":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ x: [-5, 5, -5, 0], scale: [1, 0.95, 1] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="scared" />
            </motion.div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#dc2626" /></div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️ Violence in Live-in Relationship!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-no-protection-sought":
      case "fm-abuse-continues":
      case "fm-no-rights-claimed":
      case "fm-suffers-silently":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0], scale: [1, 0.85, 1] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
              ❌ Suffers Silently
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "fm-pwdva-applies":
      case "fm-protection-order-livein":
      case "fm-residence-maintenance":
      case "fm-livein-rights-protected":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              PWDVA 2005 - Covers Live-in
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Rights Protected!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // EDUCATIONAL RIGHTS ANIMATIONS - Level 1: Right to Free and Compulsory Education
      case "edu-girl-denied":
      case "edu-donation-demand":
      case "edu-poor-family":
      case "edu-admission-refused":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="child" />
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">💰</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ❌ Donation Demanded!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-no-education":
      case "edu-rte-violated":
      case "edu-future-lost":
      case "edu-illegal-fees":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Education Denied
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-rte-invoked":
      case "edu-free-admission-granted":
      case "edu-school-penalized":
      case "edu-right-protected":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2 }}>
              <div className="text-5xl">📚</div>
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              RTE Act 2009 - Article 21-A
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Free Admission Granted!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 2: Non-Discrimination in School Admission
      case "edu-religious-denial":
      case "edu-discrimination-act":
      case "edu-constitutional-violation":
      case "edu-boy-sad":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="child" />
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ Religious Discrimination!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-discrimination-continues":
      case "edu-inequality-prevails":
      case "edu-rights-denied":
      case "edu-child-excluded":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ x: [-5, 5, -5, 0] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Discriminated
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-article-15":
      case "edu-admission-granted":
      case "edu-school-warned":
      case "edu-equality-restored":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Article 15 - No Discrimination
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Equality Restored!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 3: Right to Free Education in Private Schools
      case "edu-bpl-family":
      case "edu-private-school-refuses":
      case "edu-quota-denied":
      case "edu-girl-disappointed":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="child" />
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-orange-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ 25% Quota Denied!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-quota-violated":
      case "edu-no-private-education":
      case "edu-economic-barrier":
      case "edu-school-unpunished":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ EWS Rights Violated
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-section-12c":
      case "edu-25-percent-quota":
      case "edu-admission-secured":
      case "edu-ews-rights-protected":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2 }}>
              <div className="text-5xl">📚</div>
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Section 12(1)(c) RTE - 25% Quota
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Admission Secured!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 4: Corporal Punishment
      case "edu-teacher-slaps":
      case "edu-low-marks":
      case "edu-physical-abuse":
      case "edu-child-traumatized":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ x: [-5, 5, -5, 0], scale: [1, 0.95, 1] }} transition={{ duration: 1.5 }}>
              <DetailedStickmanSVG type="scared" />
            </motion.div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#dc2626" /></div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️ Corporal Punishment!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-abuse-continues":
      case "edu-dignity-violated":
      case "edu-fear-culture":
      case "edu-mental-trauma":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0], scale: [1, 0.85, 1] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
              ❌ Dignity Violated
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-rte-section-17":
      case "edu-teacher-suspended":
      case "edu-safe-environment":
      case "edu-punishment-banned":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              RTE Section 17(1) - No Punishment
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Safe Environment!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 5: Right to Quality Education
      case "edu-no-toilets":
      case "edu-no-water":
      case "edu-no-teachers":
      case "edu-poor-infrastructure":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="child" />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">🚽</div>
            </motion.div>
            <motion.div className="absolute top-12 right-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">💧</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ No Basic Facilities!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-health-issues":
      case "edu-learning-suffers":
      case "edu-attendance-drops":
      case "edu-quality-denied":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Quality Denied
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-rte-norms":
      case "edu-facilities-improved":
      case "edu-teachers-appointed":
      case "edu-quality-restored":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2 }}>
              <div className="text-5xl">🏫</div>
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              RTE Sections 19 & 25 - Quality Norms
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Quality Ensured!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 6: Education for Children with Disabilities
      case "edu-hearing-impaired":
      case "edu-school-refuses":
      case "edu-no-special-teachers":
      case "edu-child-excluded":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="child" />
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <InterviewerSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ Disability Discrimination!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-disability-discrimination":
      case "edu-inclusive-denied":
      case "edu-rpwd-violated":
      case "edu-child-isolated":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Isolated & Excluded
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-rpwd-act":
      case "edu-inclusive-admission":
      case "edu-support-provided":
      case "edu-equal-opportunity":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              RPwD Act 2016 - Inclusive Education
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Equal Opportunity!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 7: Mid-Day Meals and Nutrition
      case "edu-no-meals":
      case "edu-children-hungry":
      case "edu-health-deteriorates":
      case "edu-malnutrition":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="child" />
            </div>
            <div className="absolute bottom-28 left-12"><BackgroundPersonSVG color="#9ca3af" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#9ca3af" /></div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">🍽️</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ No Mid-Day Meals!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-students-sick":
      case "edu-attendance-affected":
      case "edu-nutrition-denied":
      case "edu-learning-impacted":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0], scale: [1, 0.9, 1] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Malnutrition & Illness
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-meal-scheme":
      case "edu-nutrition-provided":
      case "edu-health-improved":
      case "edu-right-to-food":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2 }}>
              <div className="text-5xl">🍽️</div>
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Mid-Day Meal Scheme - Article 21
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Nutrition Ensured!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 8: Dropout Prevention
      case "edu-child-works":
      case "edu-dropout":
      case "edu-teacher-ignores":
      case "edu-child-labour":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="shop" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <DetailedStickmanSVG type="child" />
            </motion.div>
            <div className="absolute bottom-28 right-12">
              <ShopkeeperSVG />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">🔧</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ Child Labour!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-childhood-lost":
      case "edu-education-abandoned":
      case "edu-exploitation":
      case "edu-future-ruined":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="shop" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0], scale: [1, 0.9, 1] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Childhood Lost
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-authorities-notified":
      case "edu-child-rescued":
      case "edu-re-enrolled":
      case "edu-childhood-restored":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2 }}>
              <div className="text-5xl">📚</div>
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              RTE Act & Child Labour Act
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Back to School!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 9: Equality Between Boys and Girls
      case "edu-only-boys":
      case "edu-girls-excluded":
      case "edu-gender-bias":
      case "edu-girls-disappointed":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="child" />
            </div>
            <div className="absolute bottom-28 right-1/3">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">🔬</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ Gender Discrimination!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-discrimination-persists":
      case "edu-girls-demotivated":
      case "edu-inequality-continues":
      case "edu-potential-wasted":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="home" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Gender Inequality
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-article-14-15":
      case "edu-equal-participation":
      case "edu-girls-empowered":
      case "edu-gender-equality-achieved":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2 }}>
              <div className="text-5xl">🔬</div>
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Articles 14 & 15 - Gender Equality
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Girls Empowered!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 10: Right to Language and Culture
      case "edu-tribal-students":
      case "edu-unknown-language":
      case "edu-learning-fails":
      case "edu-cultural-violation":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="child" />
            </div>
            <div className="absolute bottom-28 left-12"><BackgroundPersonSVG color="#9ca3af" /></div>
            <div className="absolute bottom-28 right-12"><BackgroundPersonSVG color="#9ca3af" /></div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="text-5xl">📖</div>
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️ Language Barrier!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-linguistic-barrier":
      case "edu-students-fail":
      case "edu-culture-suppressed":
      case "edu-dropout-risk":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2 }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Learning Fails
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "edu-nep-2020":
      case "edu-mother-tongue-education":
      case "edu-learning-improved":
      case "edu-linguistic-rights":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-12 left-12" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2 }}>
              <div className="text-5xl">📖</div>
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-3 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              NEP 2020 - Mother Tongue Education
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              ✅ Cultural Rights Protected!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // ENVIRONMENTAL LAWS ANIMATIONS
      // Level 1: Factory Pollution
      case "env-factory-riverside":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute top-12 left-16 w-32 h-24 bg-gray-700 rounded-lg border-4 border-gray-800" animate={{ y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <div className="text-center text-white text-xs mt-2 font-bold">FACTORY</div>
              <div className="w-full h-12 bg-gray-600 mt-1 flex items-center justify-center">
                <div className="text-2xl">🏭</div>
              </div>
            </motion.div>
            <motion.div className="absolute bottom-16 left-8 w-80 h-12 bg-blue-400 rounded-t-xl" />
            <motion.div className="absolute bottom-24 left-20 text-4xl" animate={{ y: [0, 10, 0], rotate: [0, 180, 360] }} transition={{ duration: 2, repeat: Infinity }}>
              🐟
            </motion.div>
            <div className="absolute bottom-24 right-20">
              <DetailedStickmanSVG type="scared" />
            </div>
            <motion.div className="absolute top-28 left-1/2 -translate-x-1/2 text-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              💧☠️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )
      
      case "env-chemical-waste-pipe":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute top-12 left-16 w-32 h-24 bg-gray-700 rounded-lg">
              <motion.div className="absolute bottom-0 left-16 w-4 h-20 bg-gradient-to-b from-green-700 to-green-900" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }} />
              <motion.div className="absolute bottom-20 left-16 text-3xl" animate={{ y: [0, 15, 30] }} transition={{ duration: 2, repeat: Infinity }}>
                💧
              </motion.div>
            </div>
            <motion.div className="absolute bottom-16 left-8 w-80 h-12 bg-green-700 opacity-70 rounded-t-xl" animate={{ opacity: [0.7, 0.9, 0.7] }} transition={{ duration: 2, repeat: Infinity }} />
            <SceneDescription text={description} />
          </div>
        )

      case "env-dead-fish-floating":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-16 left-8 w-80 h-12 bg-green-600 opacity-60 rounded-t-xl" />
            <motion.div className="absolute bottom-24 left-32 text-5xl rotate-90" animate={{ x: [0, 30, 60] }} transition={{ duration: 4, repeat: Infinity }}>
              🐟💀
            </motion.div>
            <motion.div className="absolute bottom-28 left-48 text-4xl rotate-45" animate={{ x: [60, 30, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              🐟
            </motion.div>
            <motion.div className="absolute bottom-26 left-20 text-3xl" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              ☠️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )
      
      case "env-villagers-sick":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/4">
              <motion.div animate={{ x: [-2, 2, -2] }} transition={{ duration: 0.5, repeat: Infinity }}>
                <DetailedStickmanSVG type="scared" />
              </motion.div>
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 1, repeat: Infinity }}>
                <DetailedStickmanSVG type="defeated" />
              </motion.div>
            </div>
            <div className="absolute bottom-24 right-1/4">
              <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <DetailedStickmanSVG type="scared" />
              </motion.div>
            </div>
            <motion.div className="absolute top-16 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🤒😷🤢
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-ignore-pollution":
      case "env-more-waste-dumped":
      case "env-health-crisis-worsens":
      case "env-right-to-life-violated":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-16 left-8 w-80 h-16 bg-green-800 opacity-90 rounded-t-xl" animate={{ opacity: [0.9, 1, 0.9] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.div className="absolute bottom-32 left-24 text-6xl" animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              ☠️💀
            </motion.div>
            <motion.div className="absolute bottom-24 right-1/4" animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 1, repeat: Infinity }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Article 21 Violated!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-villagers-document-evidence":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📸
            </motion.div>
            <motion.div className="absolute top-20 right-1/3 text-5xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              💧☠️
            </motion.div>
            <motion.div className="absolute top-16 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Documenting Evidence
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-file-complaint-pcb":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📋✍️
            </motion.div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              Filing PCB Complaint
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-factory-inspected":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute top-12 left-16 w-32 h-24 bg-gray-700 rounded-lg border-4 border-yellow-500">
              <div className="text-center text-white text-xs mt-2">⚠️ INSPECTION</div>
            </div>
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="police" />
            </div>
            <motion.div className="absolute bottom-28 right-1/3 text-5xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              🔍
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-treatment-plant-installed":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute top-12 left-16 w-32 h-24 bg-gray-700 rounded-lg">
              <motion.div className="absolute top-4 left-4 text-4xl" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                ⚙️
              </motion.div>
              <motion.div className="absolute top-4 right-4 text-2xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                ♻️
              </motion.div>
            </div>
            <div className="absolute bottom-16 left-8 w-80 h-12 bg-blue-400 rounded-t-xl" />
            <motion.div className="absolute bottom-24 left-40 text-4xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              🐟✅
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              ✅ Clean Water Restored!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 2: Illegal Deforestation - ALL ANIMATIONS
      case "env-forest-area":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-20 left-12"><TreeSVG /></div>
            <div className="absolute bottom-20 left-24"><TreeSVG /></div>
            <div className="absolute bottom-20 left-36"><TreeSVG /></div>
            <div className="absolute bottom-20 left-48"><TreeSVG /></div>
            <div className="absolute bottom-20 right-12"><TreeSVG /></div>
            <div className="absolute bottom-20 right-24"><TreeSVG /></div>
            <motion.div className="absolute top-16 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              🌳🌲🌴
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/3 text-4xl" animate={{ x: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }}>
              🦌🐦
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-chainsaws-cutting":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-20 left-40 opacity-30"><TreeSVG /></div>
            <motion.div className="absolute bottom-20 left-20 text-6xl" animate={{ x: [0, 10, 0], rotate: [0, 45, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
              🪚
            </motion.div>
            <motion.div className="absolute bottom-22 left-32 text-5xl opacity-50" animate={{ opacity: [0.5, 0, 0.5], scale: [1, 0.5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🌳
            </motion.div>
            <motion.div className="absolute bottom-28 left-28 text-4xl" animate={{ y: [0, 20, 40], opacity: [1, 0.5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              🪵
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="police" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-no-clearance-shown":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute top-16 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️ No Forest Clearance!
            </motion.div>
            <motion.div className="absolute top-32 left-1/3 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              🚫
            </motion.div>
            <motion.div className="absolute bottom-24 right-1/4 text-6xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📜❌
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-wildlife-fleeing":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-20 text-5xl" animate={{ x: [0, 150, 300] }} transition={{ duration: 3, repeat: Infinity }}>
              🦌
            </motion.div>
            <motion.div className="absolute bottom-28 left-32 text-4xl" animate={{ x: [0, 180, 360] }} transition={{ duration: 3.5, delay: 0.5, repeat: Infinity }}>
              🐰
            </motion.div>
            <motion.div className="absolute bottom-32 left-16 text-4xl" animate={{ x: [0, 200, 400], y: [0, -20, -40] }} transition={{ duration: 3, delay: 1, repeat: Infinity }}>
              🐦
            </motion.div>
            <motion.div className="absolute bottom-26 left-24 text-3xl" animate={{ x: [0, 160, 320] }} transition={{ duration: 3.2, delay: 0.3, repeat: Infinity }}>
              🦊
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-deforestation-continues":
      case "env-ecosystem-destroyed":
      case "env-climate-impact":
      case "env-biodiversity-lost":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-20 left-12 opacity-10"><TreeSVG /></div>
            <div className="absolute bottom-20 left-24 opacity-10"><TreeSVG /></div>
            <motion.div className="absolute bottom-20 left-36 text-7xl" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              🪵
            </motion.div>
            <motion.div className="absolute bottom-24 left-52 text-6xl" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }}>
              🪵
            </motion.div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Ecosystem Destroyed!
            </motion.div>
            <motion.div className="absolute top-32 right-1/4 text-6xl" animate={{ y: [0, 20, 40], opacity: [1, 0.5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              💀
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-activists-alerted":
      case "env-forest-dept-complaint":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📞⚖️
            </motion.div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
              Filing Forest Complaint
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-cutting-stopped":
      case "env-reforestation-ordered":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-20 left-16"><TreeSVG /></div>
            <div className="absolute bottom-20 left-28"><TreeSVG /></div>
            <div className="absolute bottom-20 left-40"><TreeSVG /></div>
            <div className="absolute bottom-20 right-16"><TreeSVG /></div>
            <div className="absolute bottom-20 right-28"><TreeSVG /></div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute top-20 left-1/3 text-5xl" animate={{ scale: [0, 1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              🌱
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              ✅ Forest Protected!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 3: Vehicular Pollution - ALL ANIMATIONS
      case "env-city-traffic":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <motion.div className="absolute bottom-24 left-12" animate={{ x: [0, 60, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <CarSVG />
            </motion.div>
            <motion.div className="absolute bottom-26 right-20" animate={{ x: [0, -60, 0] }} transition={{ duration: 3.5, delay: 1, repeat: Infinity }}>
              <CarSVG />
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="thinking" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-diesel-smoke-thick":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <motion.div className="absolute bottom-24 left-20" animate={{ x: [0, 50, 0] }} transition={{ duration: 4, repeat: Infinity }}>
              <CarSVG />
            </motion.div>
            <motion.div className="absolute bottom-28 left-48 text-7xl" animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6], x: [0, 30, 60] }} transition={{ duration: 2, repeat: Infinity }}>
              💨☁️
            </motion.div>
            <motion.div className="absolute bottom-32 left-64 text-6xl" animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}>
              ☁️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-people-coughing":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <div className="absolute bottom-24 left-1/4">
              <motion.div animate={{ scale: [1, 1.15, 1], x: [-2, 2, -2] }} transition={{ duration: 1, repeat: Infinity }}>
                <DetailedStickmanSVG type="scared" />
              </motion.div>
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 1, repeat: Infinity }}>
                <DetailedStickmanSVG type="defeated" />
              </motion.div>
            </div>
            <motion.div className="absolute bottom-32 left-1/3 text-5xl" animate={{ y: [-5, 5, -5] }} transition={{ duration: 1, repeat: Infinity }}>
              😷🤧
            </motion.div>
            <motion.div className="absolute bottom-28 right-1/3 text-4xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🤒
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-complaint-ignored":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <div className="absolute bottom-24 left-1/3">
              <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 1, repeat: Infinity }}>
                <DetailedStickmanSVG type="defeated" />
              </motion.div>
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              🚫
            </motion.div>
            <motion.div className="absolute top-16 right-1/4 text-5xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📞❌
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-air-quality-worsens":
      case "env-respiratory-diseases":
      case "env-children-affected":
      case "env-health-crisis":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute inset-0 bg-gray-700 opacity-70" animate={{ opacity: [0.7, 0.9, 0.7] }} transition={{ duration: 3, repeat: Infinity }} />
            <motion.div className="absolute top-20 left-1/4 text-8xl" animate={{ y: [0, 30, 0], opacity: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity }}>
              ☁️💨
            </motion.div>
            <motion.div className="absolute bottom-24 right-1/3" animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 1, repeat: Infinity }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Health Emergency!
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/4 text-6xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              😷🤒
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-priya-documents-buses":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📸📱
            </motion.div>
            <motion.div className="absolute bottom-26 right-1/4" animate={{ x: [100, 50, 0] }} transition={{ duration: 2 }}>
              <CarSVG />
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-spcb-complaint":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📋✍️
            </motion.div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
              SPCB Complaint Filed
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-emission-testing":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <div className="absolute bottom-24 left-1/4">
              <CarSVG />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="police" />
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              🔍
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-4xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🧪
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-clean-buses-deployed":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute bottom-26 right-1/4" animate={{ x: [100, 0] }} transition={{ duration: 2 }}>
              <CarSVG />
            </motion.div>
            <motion.div className="absolute bottom-32 right-1/3 text-5xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              ✅♻️
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              ✅ Clean Air Achieved!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 4: Plastic Pollution - ALL ANIMATIONS
      case "env-grocery-shop":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute top-16 left-20 w-28 h-36 bg-orange-300 rounded-lg border-4 border-orange-600">
              <div className="text-center mt-2 text-sm font-bold">🏪 SHOP</div>
              <motion.div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-3xl" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                🛒
              </motion.div>
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedStickmanSVG type="thinking" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-plastic-bags-used":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute top-16 left-20 w-28 h-36 bg-orange-300 rounded-lg border-4 border-orange-600">
              <div className="text-center mt-2 text-sm font-bold">SHOP</div>
            </div>
            <motion.div className="absolute bottom-28 left-40 text-6xl" animate={{ rotate: [0, 15, 0], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              🛍️
            </motion.div>
            <motion.div className="absolute bottom-32 left-56 text-5xl" animate={{ rotate: [0, -10, 0] }} transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}>
              🛍️
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-customer-notices":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="thinking" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🛍️⚠️
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-5xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              🚫
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-shopkeeper-dismissive":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 1, repeat: Infinity }}>
                <DetailedStickmanSVG type="defeated" />
              </motion.div>
            </div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute top-20 left-1/3 text-6xl" animate={{ x: [-10, 10, -10] }} transition={{ duration: 1, repeat: Infinity }}>
              💬❌
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-plastic-waste-piles":
      case "env-drains-clogged":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-20 left-16 text-7xl" animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              🗑️
            </motion.div>
            <motion.div className="absolute bottom-24 left-36 text-6xl" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }}>
              🛍️
            </motion.div>
            <motion.div className="absolute bottom-28 left-52 text-5xl" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, delay: 1, repeat: Infinity }}>
              🛍️
            </motion.div>
            <motion.div className="absolute bottom-22 right-1/4 text-6xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              💧🚫
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-animals-harmed":
      case "env-environment-degraded":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-20 left-16 text-7xl" animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              🗑️
            </motion.div>
            <motion.div className="absolute bottom-24 left-40 text-6xl" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }}>
              🛍️
            </motion.div>
            <motion.div className="absolute bottom-28 right-1/3 text-6xl" animate={{ x: [-5, 5, -5], rotate: [-10, 10, -10] }} transition={{ duration: 1, repeat: Infinity }}>
              🐕😢
            </motion.div>
            <motion.div className="absolute bottom-32 right-1/4 text-5xl" animate={{ y: [-5, 5, -5] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🐈💔
            </motion.div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Environment Degraded!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-customer-educates":
      case "env-municipal-complaint":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedStickmanSVG type="thinking" />
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📋♻️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-fine-imposed":
      case "env-cloth-bags-adopted":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute bottom-28 right-1/3 text-6xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              👜♻️
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              ✅ Eco-Friendly Solution!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 5: Noise Pollution - ALL ANIMATIONS
      case "env-temple-night":
        return (
          <div className="stickman-drama-large">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-purple-900" />
            <motion.div className="absolute top-12 left-12 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🏛️
            </motion.div>
            <motion.div className="absolute top-8 left-1/2 -translate-x-1/2 text-6xl" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
              🌙⭐
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="thinking" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-loud-loudspeakers":
        return (
          <div className="stickman-drama-large">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-purple-900" />
            <motion.div className="absolute top-12 left-12 text-6xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
              🏛️
            </motion.div>
            <motion.div className="absolute top-20 right-16 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              📢
            </motion.div>
            <motion.div className="absolute top-28 left-1/2 -translate-x-1/2 text-9xl" animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
              🔊
            </motion.div>
            <motion.div className="absolute bottom-28 left-1/4 text-5xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 0.6, repeat: Infinity }}>
              🔊🔊
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-hospital-nearby":
        return (
          <div className="stickman-drama-large">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-purple-900" />
            <motion.div className="absolute bottom-20 left-16 w-32 h-32 bg-white rounded-lg border-4 border-red-500">
              <div className="text-center text-red-600 text-5xl mt-10">🏥</div>
            </motion.div>
            <motion.div className="absolute top-16 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
              🔊
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="scared" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-patients-suffering":
        return (
          <div className="stickman-drama-large">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-purple-900" />
            <motion.div className="absolute bottom-20 left-16 w-32 h-32 bg-white rounded-lg border-4 border-red-500">
              <div className="text-center text-red-600 text-5xl mt-10">🏥</div>
            </motion.div>
            <motion.div className="absolute bottom-24 right-1/4" animate={{ x: [-3, 3, -3] }} transition={{ duration: 0.5, repeat: Infinity }}>
              <DetailedStickmanSVG type="scared" />
            </motion.div>
            <motion.div className="absolute bottom-28 left-1/2 -translate-x-1/2" animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 1, repeat: Infinity }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-16 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
              🔊😫
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-noise-continues":
      case "env-health-deteriorates":
      case "env-stress-increases":
      case "env-peace-disturbed":
        return (
          <div className="stickman-drama-large">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-purple-900" />
            <motion.div className="absolute top-12 left-1/4 text-8xl" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
              🔊
            </motion.div>
            <motion.div className="absolute top-20 right-1/4 text-7xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 0.6, delay: 0.2, repeat: Infinity }}>
              🔊
            </motion.div>
            <motion.div className="absolute bottom-24 right-1/3" animate={{ rotate: [-15, 15, -15] }} transition={{ duration: 1, repeat: Infinity }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute bottom-28 left-1/4" animate={{ y: [-5, 5, -5] }} transition={{ duration: 1, repeat: Infinity }}>
              <DetailedStickmanSVG type="scared" />
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Peace Disturbed!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-residents-approach":
      case "env-noise-rules-cited":
        return (
          <div className="stickman-drama-large">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-purple-900" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="police" />
            </div>
            <motion.div className="absolute top-16 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📋⚖️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-police-intervene":
      case "env-volume-lowered":
        return (
          <div className="stickman-drama-large">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-purple-900" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute top-16 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1.3, 1, 1.3] }} transition={{ duration: 2, repeat: Infinity }}>
              🔉✅
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              ✅ Noise Reduced - Peace Restored!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 6: Wildlife Poaching - ALL ANIMATIONS
      case "env-national-park":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-20 left-12"><TreeSVG /></div>
            <div className="absolute bottom-20 left-28"><TreeSVG /></div>
            <div className="absolute bottom-20 right-12"><TreeSVG /></div>
            <div className="absolute bottom-20 right-28"><TreeSVG /></div>
            <motion.div className="absolute bottom-28 left-1/3 text-6xl" animate={{ x: [-10, 10, -10] }} transition={{ duration: 2, repeat: Infinity }}>
              🦌
            </motion.div>
            <motion.div className="absolute top-16 left-1/2 -translate-x-1/2 text-5xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              🏞️🌲
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-deer-targeted":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-20 left-12"><TreeSVG /></div>
            <div className="absolute bottom-20 right-12"><TreeSVG /></div>
            <motion.div className="absolute bottom-28 left-1/3 text-7xl" animate={{ x: [-10, 10, -10], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              🦌
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <motion.div animate={{ x: [0, -10, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                <DetailedStickmanSVG type="police" />
              </motion.div>
            </div>
            <motion.div className="absolute top-20 right-1/3 text-5xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              🎯
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-shots-fired":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 0.9, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🦌
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-8xl" animate={{ scale: [0, 1.8, 0] }} transition={{ duration: 1, repeat: Infinity }}>
              💥
            </motion.div>
            <motion.div className="absolute top-28 right-1/3 text-6xl" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
              💥
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-deer-killed":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ opacity: [1, 0.3, 1], rotate: [0, 90, 90] }} transition={{ duration: 2, repeat: Infinity }}>
              🦌💔
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              💀☠️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-poaching-continues":
      case "env-deer-population-declines":
      case "env-ecosystem-imbalance":
      case "env-species-endangered":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/4 text-6xl opacity-30" animate={{ opacity: [0.3, 0.1, 0.3] }} transition={{ duration: 2, repeat: Infinity }}>
              🦌
            </motion.div>
            <motion.div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              💀☠️
            </motion.div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Species Endangered!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-rangers-alerted":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-20 left-12"><TreeSVG /></div>
            <div className="absolute bottom-20 right-12"><TreeSVG /></div>
            <motion.div className="absolute bottom-28 left-1/3 text-6xl" animate={{ x: [-10, 10, -10] }} transition={{ duration: 2, repeat: Infinity }}>
              🦌
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="police" />
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              🚨👮
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-poachers-caught":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="police" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <motion.div animate={{ x: [-3, 3, -3] }} transition={{ duration: 0.5, repeat: Infinity }}>
                <DetailedStickmanSVG type="defeated" />
              </motion.div>
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⛓️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-wildlife-act-invoked":
      case "env-imprisonment-fine":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="police" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 1, repeat: Infinity }}>
                <DetailedStickmanSVG type="defeated" />
              </motion.div>
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚖️🔒
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              ✅ Poachers Punished!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 7: Industrial Pollution - ALL ANIMATIONS
      case "env-industrial-area":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute top-12 left-16 w-36 h-28 bg-gray-700 rounded-lg border-4 border-gray-800" animate={{ y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <div className="text-center text-white text-sm mt-2 font-bold">FACTORY</div>
              <div className="text-center text-4xl mt-2">🏭</div>
            </motion.div>
            <motion.div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-20 h-20 bg-gray-200 rounded-full border-4 border-gray-400">
              <div className="text-center text-3xl mt-2">🏘️</div>
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-black-smoke-daily":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute top-12 left-16 w-36 h-28 bg-gray-700 rounded-lg border-4 border-gray-800">
              <div className="text-center text-white text-sm mt-2">FACTORY</div>
            </div>
            <motion.div className="absolute top-8 left-40 text-8xl" animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7], y: [0, -20, -40] }} transition={{ duration: 2, repeat: Infinity }}>
              ☁️
            </motion.div>
            <motion.div className="absolute top-16 left-56 text-7xl" animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8], y: [0, -15, -30] }} transition={{ duration: 2.5, delay: 0.5, repeat: Infinity }}>
              💨
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-residents-coughing":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/4">
              <motion.div animate={{ scale: [1, 1.15, 1], x: [-2, 2, -2] }} transition={{ duration: 1, repeat: Infinity }}>
                <DetailedStickmanSVG type="scared" />
              </motion.div>
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 1, repeat: Infinity }}>
                <DetailedStickmanSVG type="defeated" />
              </motion.div>
            </div>
            <motion.div className="absolute bottom-32 left-1/3 text-6xl" animate={{ y: [-5, 5, -5] }} transition={{ duration: 1, repeat: Infinity }}>
              😷🤧
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
              ☁️💨
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-children-asthma":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/3">
              <motion.div animate={{ y: [-3, 3, -3], scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                <DetailedStickmanSVG type="scared" />
              </motion.div>
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              👶😷
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
              ☁️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-pollution-unchecked":
      case "env-chronic-diseases":
      case "env-life-expectancy-drops":
      case "env-mass-health-crisis":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute inset-0 bg-gray-800 opacity-70" animate={{ opacity: [0.7, 0.9, 0.7] }} transition={{ duration: 3, repeat: Infinity }} />
            <motion.div className="absolute top-20 left-1/4 text-9xl" animate={{ y: [0, 30, 0], opacity: [0.8, 1, 0.8] }} transition={{ duration: 3, repeat: Infinity }}>
              ☁️
            </motion.div>
            <motion.div className="absolute bottom-24 right-1/3" animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 1, repeat: Infinity }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute bottom-28 left-1/4" animate={{ y: [-5, 5, -5] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <DetailedStickmanSVG type="scared" />
            </motion.div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Health Emergency!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-residents-unite":
      case "env-pcb-inspection":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="police" />
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🔍📋
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-air-filters-mandated":
      case "env-compliance-achieved":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute top-12 left-16 w-36 h-28 bg-gray-700 rounded-lg">
              <motion.div className="absolute top-4 left-4 text-4xl" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                ⚙️
              </motion.div>
              <motion.div className="absolute top-4 right-4 text-3xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                ♻️
              </motion.div>
            </div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              ✅ Air Quality Improved!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 8: Waste Dumping - ALL ANIMATIONS
      case "env-housing-society":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute top-16 left-16 w-40 h-32 bg-orange-200 rounded-lg border-4 border-orange-400">
              <div className="text-center text-orange-800 text-sm mt-2 font-bold">SOCIETY</div>
              <div className="text-center text-4xl mt-3">🏘️</div>
            </motion.div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedStickmanSVG type="thinking" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-garbage-dumped-open":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-20 left-20 text-7xl" animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              🗑️
            </motion.div>
            <motion.div className="absolute bottom-24 left-40 text-6xl" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, delay: 0.3, repeat: Infinity }}>
              🗑️
            </motion.div>
            <motion.div className="absolute bottom-22 left-56 text-5xl" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, delay: 0.6, repeat: Infinity }}>
              🗑️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-no-segregation":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-20 left-20 text-6xl" animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              🗑️
            </motion.div>
            <motion.div className="absolute bottom-24 left-40 text-5xl" animate={{ rotate: [0, 15, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🍌🥤
            </motion.div>
            <motion.div className="absolute bottom-22 left-56 text-5xl" animate={{ rotate: [0, -15, 0] }} transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}>
              📦🛍️
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              🚫
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-stench-spread":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-20 left-20 text-7xl" animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              🗑️
            </motion.div>
            <motion.div className="absolute bottom-28 left-40 text-6xl" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
              💨🤢
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <motion.div animate={{ x: [-3, 3, -3] }} transition={{ duration: 0.5, repeat: Infinity }}>
                <DetailedStickmanSVG type="scared" />
              </motion.div>
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-waste-pile-grows":
      case "env-disease-outbreak":
      case "env-groundwater-contaminated":
      case "env-public-health-emergency":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-20 left-16 text-8xl" animate={{ y: [0, 5, 0], scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              🗑️
            </motion.div>
            <motion.div className="absolute bottom-24 left-40 text-7xl" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }}>
              🗑️
            </motion.div>
            <motion.div className="absolute bottom-28 right-1/3" animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 1, repeat: Infinity }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Health Emergency!
            </motion.div>
            <motion.div className="absolute top-32 right-1/4 text-6xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🦟🪰☠️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-resident-complaint":
      case "env-swm-rules-cited":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📋⚖️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-segregation-bins":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-20 text-6xl" animate={{ scale: [0, 1, 1] }} transition={{ duration: 1.5 }}>
              🟢
            </motion.div>
            <motion.div className="absolute bottom-24 left-36 text-6xl" animate={{ scale: [0, 1, 1] }} transition={{ duration: 1.5, delay: 0.3 }}>
              🔵
            </motion.div>
            <motion.div className="absolute bottom-24 left-52 text-6xl" animate={{ scale: [0, 1, 1] }} transition={{ duration: 1.5, delay: 0.6 }}>
              🔴
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-5xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              ♻️✅
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-proper-disposal":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute bottom-28 right-1/3 text-6xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              ♻️🗑️✅
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              ✅ Waste Managed Properly!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 9: Burning Plastic - ALL ANIMATIONS
      case "env-backyard-scene":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute top-16 left-16 w-32 h-28 bg-green-200 rounded-lg border-4 border-green-400">
              <div className="text-center text-green-800 text-sm mt-2 font-bold">BACKYARD</div>
              <div className="text-center text-4xl mt-3">🏡</div>
            </motion.div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedStickmanSVG type="thinking" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-plastic-pile":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-20 left-1/3 text-7xl" animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              🛍️
            </motion.div>
            <motion.div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-6xl" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, delay: 0.3, repeat: Infinity }}>
              🛍️
            </motion.div>
            <motion.div className="absolute bottom-22 right-1/3 text-5xl" animate={{ rotate: [0, 15, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🥤📦
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="thinking" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-sets-fire":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              🔥
            </motion.div>
            <motion.div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 0.8, repeat: Infinity }}>
              🔥
            </motion.div>
            <motion.div className="absolute bottom-22 right-1/3 text-5xl" animate={{ y: [0, 5, 0], opacity: [0.5, 0, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🛍️
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-toxic-fumes":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-6xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              🔥
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-8xl" animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7], y: [0, -20, -40] }} transition={{ duration: 2, repeat: Infinity }}>
              ☁️💀
            </motion.div>
            <motion.div className="absolute top-20 right-1/4 text-7xl" animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, delay: 0.5, repeat: Infinity }}>
              ☠️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-burning-continues":
      case "env-neighbors-affected":
      case "env-cancer-risk":
      case "env-civic-duty-violated":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/4 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              🔥
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-8xl" animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7], y: [0, -20, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              ☁️☠️
            </motion.div>
            <motion.div className="absolute bottom-28 right-1/3" animate={{ rotate: [-10, 10, -10] }} transition={{ duration: 1, repeat: Infinity }}>
              <DetailedStickmanSVG type="defeated" />
            </motion.div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Article 51A(g) Violated!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-neighbor-educates":
      case "env-article-51a-cited":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="thinking" />
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📋🌍
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-plastic-recycled":
      case "env-community-aware":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute bottom-28 right-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              ♻️🛍️
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              ✅ Plastic Recycled Properly!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 10: EIA Violation - ALL ANIMATIONS
      case "env-protected-forest":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-20 left-12"><TreeSVG /></div>
            <div className="absolute bottom-20 left-28"><TreeSVG /></div>
            <div className="absolute bottom-20 left-44"><TreeSVG /></div>
            <div className="absolute bottom-20 right-12"><TreeSVG /></div>
            <div className="absolute bottom-20 right-28"><TreeSVG /></div>
            <div className="absolute bottom-20 right-44"><TreeSVG /></div>
            <motion.div className="absolute top-16 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              🏞️🌳🦌
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-construction-starts":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-20 left-12"><TreeSVG /></div>
            <div className="absolute bottom-20 right-12"><TreeSVG /></div>
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              🏗️
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚡🔌
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-bulldozers-forest":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-20 left-40 opacity-20"><TreeSVG /></div>
            <motion.div className="absolute bottom-24 left-20 text-7xl" animate={{ x: [0, 30, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              🚜
            </motion.div>
            <motion.div className="absolute bottom-22 left-36 text-5xl opacity-50" animate={{ opacity: [0.5, 0, 0.5], scale: [1, 0.5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🌳
            </motion.div>
            <motion.div className="absolute bottom-28 left-32 text-4xl" animate={{ y: [0, 20, 40], opacity: [1, 0.5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              🪵
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-no-eia-done":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute top-16 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️ No EIA Clearance!
            </motion.div>
            <motion.div className="absolute top-32 left-1/3 text-8xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              🚫
            </motion.div>
            <motion.div className="absolute bottom-24 right-1/4 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📜❌
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-construction-proceeds":
      case "env-wildlife-displaced":
      case "env-ecosystem-destroyed":
      case "env-violation-unpunished":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-20 left-12 opacity-10"><TreeSVG /></div>
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              🏗️⚡
            </motion.div>
            <motion.div className="absolute bottom-28 right-1/3 text-6xl" animate={{ x: [0, 100, 200], opacity: [1, 0.5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              🦌💔
            </motion.div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌ Ecosystem Destroyed!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-activists-intervene":
      case "env-ngc-petition":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📋⚖️🌍
            </motion.div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
              National Green Tribunal
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      case "env-eia-violation-proven":
      case "env-project-halted":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-20 left-12"><TreeSVG /></div>
            <div className="absolute bottom-20 left-28"><TreeSVG /></div>
            <div className="absolute bottom-20 right-12"><TreeSVG /></div>
            <div className="absolute bottom-20 right-28"><TreeSVG /></div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute bottom-28 left-1/3 text-7xl" animate={{ scale: [1, 0, 0] }} transition={{ duration: 2 }}>
              🏗️🚫
            </motion.div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-bold" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              ✅ Forest Protected!
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // FUNDAMENTAL RIGHTS ANIMATIONS - ALL 12 LEVELS
      case "job-interview":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="defeated" /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>🚫</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="thinking" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "protest":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="confident" /></div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2"><DetailedStickmanSVG type="confident" /></div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="confident" /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>📢✊</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "religious-discrimination":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="defeated" /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>🚫</motion.div>
            <motion.div className="absolute bottom-28 right-1/4 text-6xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>🕉️☪️✝️</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "gender-discrimination":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="defeated" /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>🚫</motion.div>
            <motion.div className="absolute bottom-28 right-1/4 text-6xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>👩⚖️</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "press-freedom":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="confident" /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>📰✍️</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="police" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "right-to-shelter":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3" animate={{ x: [0, 100, 200], opacity: [1, 0.5, 0] }} transition={{ duration: 3, repeat: Infinity }}><DetailedStickmanSVG type="scared" /></motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>🏠💔</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "arbitrary-arrest":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="police" /></div>
            <div className="absolute bottom-24 right-1/4"><motion.div animate={{ x: [-3, 3, -3] }} transition={{ duration: 0.5, repeat: Infinity }}><DetailedStickmanSVG type="scared" /></motion.div></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>⛓️❓</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "forced-labor":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ x: [-5, 5, -5], y: [-3, 3, -3] }} transition={{ duration: 1, repeat: Infinity }}>👷⛓️</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>🚫</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "religious-instruction":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><motion.div animate={{ x: [-3, 3, -3] }} transition={{ duration: 0.5, repeat: Infinity }}><DetailedStickmanSVG type="scared" /></motion.div></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>🙏🚫</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "minority-education":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>🏫📚</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>✅</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="confident" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "constitutional-remedies":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="confident" /></div>
            <div className="absolute bottom-24 right-1/4"><LawyerSVG /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>⚖️📜</motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // TRAFFIC RULES ANIMATIONS - ALL 10 LEVELS
      // Level 1: Helmet
      case "helmet":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <motion.div className="absolute bottom-24 left-1/3" animate={{ x: [0, 30, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <svg width="60" height="80" viewBox="0 0 60 80">
                <ellipse cx="30" cy="50" rx="15" ry="8" fill="#374151" />
                <ellipse cx="30" cy="48" rx="13" ry="7" fill="#4b5563" />
                <circle cx="30" cy="25" r="10" fill="#fbbf24" />
                <line x1="30" y1="35" x2="30" y2="55" stroke="#374151" strokeWidth="3" />
                <line x1="30" y1="55" x2="20" y2="70" stroke="#374151" strokeWidth="3" />
                <line x1="30" y1="55" x2="40" y2="70" stroke="#374151" strokeWidth="3" />
                <text x="30" y="28" textAnchor="middle" fontSize="12" fill="#fff">🏍️</text>
              </svg>
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="police" />
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🪖❌
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 2: Seatbelt
      case "seatbelt":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <div className="absolute bottom-24 left-1/3">
              <CarSVG />
            </div>
            <motion.div className="absolute bottom-32 left-1/3 text-5xl" animate={{ x: [-5, 5, -5] }} transition={{ duration: 1, repeat: Infinity }}>
              👤👤
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.4, 1], rotate: [0, 15, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🚫
            </motion.div>
            <motion.div className="absolute top-28 right-1/3 text-5xl" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              🔒❌
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 3: Speeding
      case "speeding":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <motion.div className="absolute bottom-24 left-12" animate={{ x: [0, 200, 400] }} transition={{ duration: 2, repeat: Infinity }}>
              <CarSVG />
            </motion.div>
            <motion.div className="absolute bottom-32 left-32 text-6xl" animate={{ x: [0, 180, 360], opacity: [1, 0.5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              💨💨
            </motion.div>
            <motion.div className="absolute top-16 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
              ⚡
            </motion.div>
            <div className="absolute top-20 right-16">
              <SpeedLimitSignSVG limit={50} />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 4: Zebra Crossing
      case "zebra":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <div className="absolute bottom-16 left-1/4 w-64 h-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`absolute h-4 w-6 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-800'}`} style={{ left: `${i * 32}px` }} />
              ))}
            </div>
            <motion.div className="absolute bottom-24 left-1/3" animate={{ x: [-20, 0, 20] }} transition={{ duration: 2, repeat: Infinity }}>
              <DetailedStickmanSVG type="scared" />
            </motion.div>
            <motion.div className="absolute bottom-24 right-1/4" animate={{ x: [50, 0] }} transition={{ duration: 1.5 }}>
              <CarSVG />
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 5: Drunk Driving
      case "drunk-driving":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <div className="absolute bottom-24 left-1/3">
              <motion.div animate={{ rotate: [-5, 5, -5], x: [-10, 10, -10] }} transition={{ duration: 1, repeat: Infinity }}>
                <CarSVG />
              </motion.div>
            </div>
            <motion.div className="absolute bottom-32 left-1/4 text-6xl" animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🍺🍷
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="police" />
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              🚨
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 6: Mobile Use
      case "mobile-use":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <div className="absolute bottom-24 left-1/3">
              <CarSVG />
            </div>
            <motion.div className="absolute bottom-32 left-1/3 text-6xl" animate={{ rotate: [0, -15, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📱
            </motion.div>
            <motion.div className="absolute top-16 left-1/4 w-20 h-16 bg-red-500 rounded-full" animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity }}>
              <div className="text-center text-white text-5xl mt-1">🚦</div>
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️📵
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 7: Red Light
      case "red-light":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <motion.div className="absolute top-12 left-1/4 w-16 h-40 bg-gray-800 rounded-lg">
              <motion.div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-red-500 rounded-full" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} />
              <div className="absolute top-20 left-1/2 -translate-x-1/2 w-10 h-10 bg-yellow-300 opacity-30 rounded-full" />
              <div className="absolute top-28 left-1/2 -translate-x-1/2 w-10 h-10 bg-green-400 opacity-30 rounded-full" />
            </motion.div>
            <motion.div className="absolute bottom-24 left-1/3" animate={{ x: [0, 100, 200] }} transition={{ duration: 2, repeat: Infinity }}>
              <CarSVG />
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-8xl" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              🚫
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 8: Overtaking
      case "overtaking":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <motion.div className="absolute bottom-24 left-1/4" animate={{ x: [0, 50, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <CarSVG />
            </motion.div>
            <motion.div className="absolute bottom-26 left-1/2 -translate-x-1/2" animate={{ x: [0, -80, -160] }} transition={{ duration: 3, repeat: Infinity }}>
              <CarSVG />
            </motion.div>
            <motion.div className="absolute top-16 left-1/3 text-7xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️
            </motion.div>
            <motion.div className="absolute top-20 right-1/4 text-6xl" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🚧
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 9: Stop Sign
      case "stop-sign":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <div className="absolute top-16 left-1/4">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <polygon points="40,8 60,18 70,38 70,58 60,68 40,78 20,68 10,58 10,38 20,18" fill="#ef4444" stroke="#fff" strokeWidth="4" />
                <text x="40" y="50" textAnchor="middle" fontSize="24" fill="#fff" fontWeight="bold">STOP</text>
              </svg>
            </div>
            <motion.div className="absolute bottom-24 left-1/3" animate={{ x: [0, 50, 100] }} transition={{ duration: 2, repeat: Infinity }}>
              <CarSVG />
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              🚫
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 10: Document Check
      case "police-stop":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="highway" />
            <div className="absolute bottom-24 left-1/4">
              <CarSVG />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="police" />
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📄🪪
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-5xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              ✅
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // CRIMINAL LAW ANIMATIONS - ALL 12 LEVELS
      // Level 1 & 2: Police Encounter and Arrest (already handled above in Fundamental Rights section)
      
      // Level 3: Informing Reason for Arrest
      case "inform-reason-arrest":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="police" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <motion.div animate={{ x: [-3, 3, -3] }} transition={{ duration: 0.5, repeat: Infinity }}>
                <DetailedStickmanSVG type="scared" />
              </motion.div>
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📋❓
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-5xl" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              ⚖️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 4: Right to Lawyer
      case "right-to-lawyer":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              👨‍⚖️📞
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
              Right to Legal Counsel
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 5: Inform Relative
      case "inform-relative":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="scared" />
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <DetailedStickmanSVG type="police" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📞👨‍👩‍👧
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 6: Right to Silence
      case "right-to-silence":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="police" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-8xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🤐
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
              Right to Remain Silent
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 7: Produce Before Magistrate (24h)
      case "produce-magistrate":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="police" />
            </div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <motion.div animate={{ x: [-3, 3, -3] }} transition={{ duration: 0.5, repeat: Infinity }}>
                <DetailedStickmanSVG type="scared" />
              </motion.div>
            </div>
            <div className="absolute bottom-24 right-1/4">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-16 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⏰24h
            </motion.div>
            <motion.div className="absolute top-28 left-1/2 -translate-x-1/2 text-5xl" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              👨‍⚖️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 8: Bailable Offence - Bail Right
      case "bailable-bail":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <LawyerSVG />
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              💰🔓
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              ✅ Bail Granted
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 9: Handcuffing - Necessity Only
      case "handcuffing":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="police" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <motion.div animate={{ x: [-2, 2, -2] }} transition={{ duration: 0.5, repeat: Infinity }}>
                <DetailedStickmanSVG type="defeated" />
              </motion.div>
            </div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-7xl" animate={{ rotate: [0, 15, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⛓️
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ⚠️
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 10: Medical Exam to Document Torture
      case "medical-exam":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3">
              <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 1, repeat: Infinity }}>
                <DetailedStickmanSVG type="defeated" />
              </motion.div>
            </div>
            <div className="absolute bottom-24 right-1/3">
              <svg width="60" height="80" viewBox="0 0 60 80">
                <circle cx="30" cy="25" r="10" fill="#fbbf24" />
                <line x1="30" y1="35" x2="30" y2="55" stroke="#374151" strokeWidth="3" />
                <line x1="30" y1="40" x2="20" y2="50" stroke="#374151" strokeWidth="3" />
                <line x1="30" y1="40" x2="40" y2="50" stroke="#374151" strokeWidth="3" />
                <line x1="30" y1="55" x2="20" y2="75" stroke="#374151" strokeWidth="3" />
                <line x1="30" y1="55" x2="40" y2="75" stroke="#374151" strokeWidth="3" />
                <text x="30" y="28" textAnchor="middle" fontSize="12" fill="#fff">🩺</text>
              </svg>
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🏥📋
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 11: Section 41A Notice Before Arrest
      case "section-41a-notice":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="police" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="thinking" />
            </div>
            <motion.div className="absolute top-16 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.2, 1], y: [0, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📨
            </motion.div>
            <motion.div className="absolute top-28 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
              Section 41A Notice
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // Level 12: Forced Confession / Blank Papers
      case "forced-confession":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="police" />
            </div>
            <div className="absolute bottom-24 right-1/4">
              <motion.div animate={{ rotate: [-10, 10, -10], x: [-3, 3, -3] }} transition={{ duration: 0.5, repeat: Infinity }}>
                <DetailedStickmanSVG type="scared" />
              </motion.div>
            </div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              📄✍️
            </motion.div>
            <motion.div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-6xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              🚫
            </motion.div>
            <motion.div className="absolute top-12 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
              ❌ Forced Confession Illegal
            </motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // CONSUMER RIGHTS ANIMATIONS - 10 LEVELS (shopping & restaurant already done above)
      // Levels 3-12
      case "ecommerce-defect":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ rotate: [0, 15, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📱❌
            </motion.div>
            <motion.div className="absolute top-20 left-1/4 text-6xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📦
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "warranty-defect-store":
      case "warranty-denial":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4">
              <DetailedStickmanSVG type="confident" />
            </div>
            <motion.div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📃🔧
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="thinking" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "misleading-ad":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute top-16 left-1/3 w-32 h-24 bg-yellow-300 rounded-lg border-4 border-yellow-500" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <div className="text-center mt-4 text-2xl">📺✨</div>
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              🚫
            </motion.div>
            <div className="absolute bottom-24 right-1/3">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "overcharge":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              💰💸
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              🧾📊
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="scared" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "online-coaching":
      case "institute-closure":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute top-16 left-1/4 text-7xl" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              🎓❌
            </motion.div>
            <motion.div className="absolute bottom-24 left-1/3 text-6xl" animate={{ rotate: [0, 15, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              💰💸
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "no-return":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ rotate: [0, -15, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              👕📏
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🚫
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="thinking" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "digital-payment":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ rotate: [0, -20, 0], scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📱💳
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ❌
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="scared" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "food-safety":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🍔🤢
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              ⚠️🏥
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <motion.div animate={{ x: [-3, 3, -3] }} transition={{ duration: 0.5, repeat: Infinity }}>
                <DetailedStickmanSVG type="defeated" />
              </motion.div>
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // CYBER LAWS ANIMATIONS - 10 LEVELS
      case "phishing":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ rotate: [0, -15, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              📧🎣
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              ⚠️
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="scared" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "hacking":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              💻🔓
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              🚨
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="police" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "online-harassment":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              📱💬
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              😭💔
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <motion.div animate={{ x: [-3, 3, -3] }} transition={{ duration: 0.5, repeat: Infinity }}>
                <DetailedStickmanSVG type="defeated" />
              </motion.div>
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "data-theft":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ x: [0, 50, 100], opacity: [1, 0.5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              📂💾
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              🚫
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="scared" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "identity-theft":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
              🎭
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🪪❌
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="defeated" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "online-fraud":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              💰💸
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              🎯🚫
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="scared" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "cyberbullying":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              📱😢
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ rotate: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              💬💔
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <motion.div animate={{ y: [-3, 3, -3] }} transition={{ duration: 1, repeat: Infinity }}>
                <DetailedStickmanSVG type="defeated" />
              </motion.div>
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "fake-profile":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ rotate: [0, 180, 360] }} transition={{ duration: 3, repeat: Infinity }}>
              👤❌
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              🎭🚫
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="thinking" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "copyright-infringement":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              ©️🚫
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              ⚖️
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="police" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      case "unauthorized-access":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ x: [-10, 10, -10] }} transition={{ duration: 1, repeat: Infinity }}>
              🔒💻
            </motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              🚨
            </motion.div>
            <div className="absolute bottom-24 right-1/4">
              <DetailedStickmanSVG type="police" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // EMPLOYMENT LAWS - 10 LEVELS
      case "hiring-discrimination":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="defeated" /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>🚫</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="thinking" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "minimum-wage":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>💰📉</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="defeated" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "wrongful-termination":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="scared" /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>📄❌</motion.div>
            <div className="absolute bottom-24 right-1/4"><LawyerSVG /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "workplace-harassment":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><motion.div animate={{ x: [-3, 3, -3] }} transition={{ duration: 0.5, repeat: Infinity }}><DetailedStickmanSVG type="defeated" /></motion.div></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>😢💔</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "overtime-pay":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>⏰</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>💰➕</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "maternity-leave":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>👶🤱</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="confident" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "workplace-safety":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>⚠️🏗️</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="defeated" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "equal-pay":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="confident" /></div>
            <motion.div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>💰⚖️</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="citizen" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "contract-worker":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ rotate: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>📄✍️</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="thinking" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "union-rights":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="confident" /></div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2"><DetailedStickmanSVG type="confident" /></div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="confident" /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>🤝✊</motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // HUMAN RIGHTS - 8 LEVELS
      case "hr-gender-job-discrimination":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="defeated" /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>🚫</motion.div>
            <motion.div className="absolute bottom-28 right-1/4 text-6xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>👩⚖️</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "hr-right-to-education":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>📚🎓</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="confident" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "hr-freedom-expression":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="confident" /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>💬📢</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="police" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "hr-forced-displacement":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3" animate={{ x: [0, 100, 200], opacity: [1, 0.5, 0] }} transition={{ duration: 3, repeat: Infinity }}><DetailedStickmanSVG type="scared" /></motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>🏠💔</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "hr-torture":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="police" /></div>
            <div className="absolute bottom-24 right-1/4"><motion.div animate={{ rotate: [-15, 15, -15], x: [-3, 3, -3] }} transition={{ duration: 0.5, repeat: Infinity }}><DetailedStickmanSVG type="defeated" /></motion.div></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>🚫💔</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "hr-fair-trial":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="confident" /></div>
            <div className="absolute bottom-24 right-1/4"><LawyerSVG /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>⚖️👨‍⚖️</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "hr-privacy":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>🔒🏠</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="confident" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "hr-assembly":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="confident" /></div>
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2"><DetailedStickmanSVG type="confident" /></div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="confident" /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>👥📢</motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // WOMEN'S RIGHTS - 8 LEVELS
      case "domestic-violence":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/4"><motion.div animate={{ rotate: [-10, 10, -10], x: [-3, 3, -3] }} transition={{ duration: 0.5, repeat: Infinity }}><DetailedStickmanSVG type="defeated" /></motion.div></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>🚫💔</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="police" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "dowry":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>💰🚫</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="defeated" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "sexual-harassment":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><motion.div animate={{ x: [-3, 3, -3] }} transition={{ duration: 0.5, repeat: Infinity }}><DetailedStickmanSVG type="scared" /></motion.div></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>🚫💔</motion.div>
            <div className="absolute bottom-24 right-1/4"><LawyerSVG /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "property-rights":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="confident" /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>🏠⚖️</motion.div>
            <div className="absolute bottom-24 right-1/4"><LawyerSVG /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "workplace-discrimination":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="defeated" /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>🚫</motion.div>
            <motion.div className="absolute bottom-28 right-1/4 text-6xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>💼⚖️</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "reproductive-rights":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/3"><DetailedStickmanSVG type="confident" /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>🏥✅</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "education-girls":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>👧📚</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="confident" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "legal-age-marriage":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>👧💍</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>🚫</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="police" /></div>
            <SceneDescription text={description} />
          </div>
        )

      // CHILD RIGHTS - 10 LEVELS
      case "child-labor":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ x: [-5, 5, -5], y: [-3, 3, -3] }} transition={{ duration: 1, repeat: Infinity }}>👶🏭</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>🚫</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="police" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "child-education":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>👦📚</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="confident" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "child-abuse":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/4"><motion.div animate={{ rotate: [-15, 15, -15], x: [-3, 3, -3] }} transition={{ duration: 0.5, repeat: Infinity }}><DetailedStickmanSVG type="defeated" /></motion.div></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>👶💔</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="police" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "child-marriage":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>👧💍</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>🚫</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="police" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "child-trafficking":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ x: [0, 100, 200], opacity: [1, 0.5, 0] }} transition={{ duration: 3, repeat: Infinity }}>👶😢</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>🚨</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="police" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "child-health":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>👶🏥</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="confident" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "child-adoption":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>👶👨‍👩‍👧</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>⚖️✅</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "child-pornography":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>📱❌</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>🚨</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="police" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "child-custody":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="thinking" /></div>
            <motion.div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>👶⚖️</motion.div>
            <div className="absolute bottom-24 right-1/4"><LawyerSVG /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "child-neglect":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ y: [-3, 3, -3] }} transition={{ duration: 1, repeat: Infinity }}>👶😢</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>⚠️</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="police" /></div>
            <SceneDescription text={description} />
          </div>
        )

      // FAMILY & MARRIAGE LAWS - 10 LEVELS
      case "fm-marriage-registration":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>💑📝</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>✅</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "fm-divorce":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="defeated" /></div>
            <motion.div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>💔⚖️</motion.div>
            <div className="absolute bottom-24 right-1/4"><LawyerSVG /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "fm-maintenance":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="confident" /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>💰👶</motion.div>
            <div className="absolute bottom-24 right-1/4"><LawyerSVG /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "fm-custody":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="thinking" /></div>
            <motion.div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>👶⚖️</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="thinking" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "fm-adoption":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>👶👨‍👩‍👧</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>💕✅</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "fm-property-inheritance":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="thinking" /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>🏠📜</motion.div>
            <div className="absolute bottom-24 right-1/4"><LawyerSVG /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "fm-domestic-violence-act":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/4"><motion.div animate={{ rotate: [-10, 10, -10], x: [-3, 3, -3] }} transition={{ duration: 0.5, repeat: Infinity }}><DetailedStickmanSVG type="defeated" /></motion.div></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>🚫💔</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="police" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "fm-protection-order":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="confident" /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>🛡️⚖️</motion.div>
            <div className="absolute bottom-24 right-1/4"><LawyerSVG /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "fm-dowry":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>💰🚫</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>⚖️</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="defeated" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "fm-livein":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>🏠👫</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>⚖️✅</motion.div>
            <SceneDescription text={description} />
          </div>
        )

      // EDUCATIONAL RIGHTS - 10 LEVELS
      case "edu-free-admission":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>👧🎓</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>✅📚</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="confident" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "edu-discrimination":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><DetailedStickmanSVG type="defeated" /></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>🚫</motion.div>
            <motion.div className="absolute bottom-28 right-1/4 text-6xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>📚⚖️</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "edu-ews-quota":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>👶🎓</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>25%✅</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "edu-corporal-punishment":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <div className="absolute bottom-24 left-1/4"><motion.div animate={{ rotate: [-15, 15, -15], x: [-3, 3, -3] }} transition={{ duration: 0.5, repeat: Infinity }}><DetailedStickmanSVG type="defeated" /></motion.div></div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }}>🚫👋</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="police" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "edu-quality-facilities":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>🏫🚰</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>✅</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "edu-disability-rights":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>🦽📚</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>✅🎓</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="confident" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "edu-midday-meals":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>🍱👦</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>✅</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "edu-dropout-prevention":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ x: [-5, 5, -5] }} transition={{ duration: 1, repeat: Infinity }}>👦🏭</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-7xl" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>🚫</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="police" /></div>
            <SceneDescription text={description} />
          </div>
        )
      case "edu-gender-equality":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>👧👦</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>⚖️✅</motion.div>
            <SceneDescription text={description} />
          </div>
        )
      case "edu-language-culture":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="office" />
            <motion.div className="absolute bottom-24 left-1/3 text-7xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>📚🌍</motion.div>
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 text-6xl" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>✅</motion.div>
            <div className="absolute bottom-24 right-1/4"><DetailedStickmanSVG type="confident" /></div>
            <SceneDescription text={description} />
          </div>
        )

      default:
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="generic" />
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
              <DetailedStickmanSVG type="thinking" />
            </div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white px-4 py-2 rounded-lg text-lg font-medium shadow-lg max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {description || "Scenario Loading..."}
            </motion.div>
          </div>
        )
    }
  }

  return (
    <div className="w-full h-96 relative bg-gradient-to-b from-sky-300 via-sky-200 to-green-300 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
      {currentScene < scenes.length && renderScene(scenes[currentScene].type, scenes[currentScene].description)}

      {/* Enhanced Scene indicator */}
      <div className="absolute bottom-4 left-4 text-sm text-gray-800 bg-white/90 px-3 py-2 rounded-lg shadow-lg font-medium">
        🎬 Scene {currentScene + 1}/{scenes.length}
      </div>

      {/* Enhanced Progress bar */}
      <div className="absolute bottom-4 right-4 w-32 h-2 bg-white/70 rounded-full shadow-lg">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-sm"
          initial={{ width: 0 }}
          animate={{ width: `${((currentScene + 1) / scenes.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Cinematic overlay */}
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-black/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  )
}

// Simple Traffic Icons
function StopSignSVG() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-sm">
      <polygon points="20,2 36,10 36,30 20,38 4,30 4,10" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
      <text x="20" y="23" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">STOP</text>
    </svg>
  )
}

function TrafficLightSVG({ state = 'red' }) {
  return (
    <svg width="24" height="64" viewBox="0 0 24 64" className="drop-shadow-sm">
      <rect x="6" y="2" width="12" height="60" rx="4" fill="#1f2937" />
      <circle cx="12" cy="14" r="5" fill={state === 'red' ? '#ef4444' : '#7f1d1d'} />
      <circle cx="12" cy="32" r="5" fill={state === 'yellow' ? '#f59e0b' : '#78350f'} />
      <circle cx="12" cy="50" r="5" fill={state === 'green' ? '#10b981' : '#064e3b'} />
    </svg>
  )
}

function SpeedLimitSignSVG({ limit = 50 }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-sm">
      <circle cx="20" cy="20" r="18" fill="#fff" stroke="#ef4444" strokeWidth="4" />
      <text x="20" y="26" textAnchor="middle" fontSize="12" fill="#111827" fontWeight="bold">{limit}</text>
    </svg>
  )
}

function SeatbeltIconSVG({ crossed = false }) {
  return (
    <svg width="50" height="30" viewBox="0 0 50 30" className="drop-shadow-sm">
      <rect x="5" y="10" width="40" height="10" fill="#374151" rx="2" />
      {crossed && <line x1="5" y1="25" x2="45" y2="5" stroke="#ef4444" strokeWidth="3" />}
    </svg>
  )
}

function HelmetIconSVG({ crossed = false }) {
  return (
    <svg width="40" height="30" viewBox="0 0 40 30" className="drop-shadow-sm">
      <path d="M5 20 Q 20 2 35 20 L 5 20 Z" fill="#1f2937" />
      {crossed && <line x1="5" y1="25" x2="35" y2="5" stroke="#ef4444" strokeWidth="3" />}
    </svg>
  )
}

function PhoneIconSVG() {
  return (
    <svg width="20" height="36" viewBox="0 0 20 36" className="drop-shadow-sm">
      <rect x="2" y="2" width="16" height="32" rx="3" fill="#111827" />
      <rect x="4" y="6" width="12" height="20" rx="2" fill="#1e40af" />
    </svg>
  )
}

function BottleIconSVG() {
  return (
    <svg width="20" height="36" viewBox="0 0 20 36" className="drop-shadow-sm">
      <rect x="7" y="2" width="6" height="8" fill="#065f46" />
      <rect x="4" y="10" width="12" height="22" rx="4" fill="#10b981" />
    </svg>
  )
}

// Enhanced Scene Description Component
function SceneDescription({ text }) {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-base max-w-lg text-center font-medium shadow-xl border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {text}
    </motion.div>
  )
}

// Enhanced Background Components
function DetailedBackground({ type }) {
  switch (type) {
    case "highway":
      return (
        <div className="absolute inset-0">
          {/* Sky gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200"></div>

          {/* Clouds */}
          <div className="absolute top-4 left-8 w-16 h-8 bg-white/80 rounded-full"></div>
          <div className="absolute top-6 left-12 w-12 h-6 bg-white/60 rounded-full"></div>
          <div className="absolute top-8 right-16 w-20 h-10 bg-white/70 rounded-full"></div>

          {/* Mountains in background */}
          <div className="absolute bottom-32 left-0 w-full h-16 bg-gradient-to-t from-green-600 to-green-400 clip-path-mountain"></div>

          {/* Road */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gray-600"></div>
          <div className="absolute bottom-6 left-0 w-full h-2 bg-yellow-400"></div>

          {/* Road markings */}
          <div className="absolute bottom-7 left-8 w-8 h-1 bg-white"></div>
          <div className="absolute bottom-7 left-24 w-8 h-1 bg-white"></div>
          <div className="absolute bottom-7 left-40 w-8 h-1 bg-white"></div>
          <div className="absolute bottom-7 left-56 w-8 h-1 bg-white"></div>

          {/* Trees */}
          <div className="absolute bottom-16 left-4">
            <TreeSVG />
          </div>
          <div className="absolute bottom-16 right-8">
            <TreeSVG />
          </div>
        </div>
      )

    case "office":
      return (
        <div className="absolute inset-0">
          {/* Office interior */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200"></div>

          {/* Windows */}
          <div className="absolute top-4 left-8 w-24 h-16 bg-blue-200 border-4 border-gray-400 grid grid-cols-2 gap-1">
            <div className="bg-sky-300"></div>
            <div className="bg-sky-300"></div>
            <div className="bg-sky-300"></div>
            <div className="bg-sky-300"></div>
          </div>

          {/* Floor */}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-400 to-gray-300"></div>

          {/* Wall decorations */}
          <div className="absolute top-8 right-16 w-16 h-12 bg-white border-2 border-gray-400"></div>
          <div className="absolute top-12 right-20 w-8 h-8 bg-yellow-400 rounded-full"></div>
        </div>
      )

    case "store":
      return (
        <div className="absolute inset-0">
          {/* Store interior */}
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-100 to-orange-100"></div>

          {/* Shelves */}
          <div className="absolute top-8 left-8 w-4 h-24 bg-brown-600"></div>
          <div className="absolute top-12 left-6 w-8 h-2 bg-brown-400"></div>
          <div className="absolute top-16 left-6 w-8 h-2 bg-brown-400"></div>
          <div className="absolute top-20 left-6 w-8 h-2 bg-brown-400"></div>

          {/* Products on shelves */}
          <div className="absolute top-11 left-7 w-2 h-2 bg-red-500"></div>
          <div className="absolute top-11 left-10 w-2 h-2 bg-blue-500"></div>
          <div className="absolute top-15 left-7 w-2 h-2 bg-green-500"></div>

          {/* Floor tiles */}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-300 to-gray-200"></div>
        </div>
      )

    case "home":
      return (
        <div className="absolute inset-0">
          {/* Home interior */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-green-100"></div>

          {/* Wall */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-beige-200 to-beige-100"></div>

          {/* Furniture */}
          <div className="absolute bottom-16 left-16 w-16 h-8 bg-brown-600 rounded"></div>
          <div className="absolute bottom-16 right-16 w-12 h-12 bg-gray-600"></div>

          {/* Floor */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-brown-300 to-brown-200"></div>
        </div>
      )

    case "park":
      return (
        <div className="absolute inset-0">
          {/* Sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-200"></div>
          {/* Grass */}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-green-400"></div>
          {/* Trees */}
          <div className="absolute bottom-16 left-8">
            <TreeSVG />
          </div>
          <div className="absolute bottom-16 right-8">
            <TreeSVG />
          </div>
          {/* Stage/Banner */}
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-purple-600 rounded"></div>
        </div>
      )

    case "jail":
      return (
        <div className="absolute inset-0">
          {/* Wall */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-200"></div>
          {/* Bars */}
          <div className="absolute inset-0">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="absolute top-0 bottom-0" style={{ left: `${i * 10}%` }}>
                <div className="w-1 h-full bg-gray-500/60"></div>
              </div>
            ))}
          </div>
          {/* Floor */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-500 to-gray-400"></div>
        </div>
      )

    case "police-station":
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200"></div>
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-40 h-10 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">POLICE</div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-400 to-gray-300"></div>
        </div>
      )

    case "court":
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-100 to-amber-200"></div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-10 bg-amber-700 text-white font-bold flex items-center justify-center rounded">COURT</div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-amber-400 to-amber-300"></div>
        </div>
      )

    case "clinic":
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-100 to-teal-200"></div>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-10 bg-teal-600 text-white font-bold flex items-center justify-center rounded">CLINIC</div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-teal-400 to-teal-300"></div>
        </div>
      )

    default:
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-green-300"></div>
          <div className="absolute bottom-0 left-0 w-full h-16 bg-green-400"></div>
        </div>
      )
  }
}

// Enhanced SVG Components with more details
function DetailedStickmanSVG({ type = "neutral" }) {
  const getColor = () => {
    switch (type) {
      case "scared":
        return "#ef4444"
      case "confident":
        return "#10b981"
      case "frustrated":
        return "#f59e0b"
      case "candidate":
        return "#3b82f6"
      case "interviewer":
        return "#6b7280"
      case "customer":
        return "#8b5cf6"
      case "shopkeeper":
        return "#f97316"
      case "shocked":
        return "#ef4444"
      case "defeated":
        return "#6b7280"
      case "uncomfortable":
        return "#f59e0b"
      case "listening":
        return "#10b981"
      case "citizen":
        return "#3b82f6"
      default:
        return "#6b7280"
    }
  }

  const color = getColor()

  return (
    <svg width="60" height="80" viewBox="0 0 60 80" className="drop-shadow-lg">
      {/* Head with shadow */}
      <circle cx="30" cy="18" r="12" stroke={color} strokeWidth="3" fill="none" className="drop-shadow-sm" />

      {/* Enhanced face expressions */}
      {type === "scared" && (
        <>
          <circle cx="26" cy="15" r="1.5" fill={color} />
          <circle cx="34" cy="15" r="1.5" fill={color} />
          <ellipse cx="30" cy="22" rx="3" ry="4" stroke={color} strokeWidth="1.5" fill="none" />
          {/* Sweat drops */}
          <circle cx="22" cy="20" r="1" fill="#60a5fa" />
          <circle cx="38" cy="18" r="1" fill="#60a5fa" />
        </>
      )}

      {type === "confident" && (
        <>
          <circle cx="26" cy="15" r="1.5" fill={color} />
          <circle cx="34" cy="15" r="1.5" fill={color} />
          <path d="M 22 20 Q 30 24 38 20" stroke={color} strokeWidth="2" fill="none" />
          {/* Confident posture indicator */}
          <path d="M 25 12 Q 30 10 35 12" stroke={color} strokeWidth="1" fill="none" />
        </>
      )}

      {type === "frustrated" && (
        <>
          <line x1="22" y1="13" x2="28" y2="17" stroke={color} strokeWidth="2" />
          <line x1="28" y1="13" x2="22" y2="17" stroke={color} strokeWidth="2" />
          <line x1="32" y1="13" x2="38" y2="17" stroke={color} strokeWidth="2" />
          <line x1="38" y1="13" x2="32" y2="17" stroke={color} strokeWidth="2" />
          <path d="M 22 22 Q 30 18 38 22" stroke={color} strokeWidth="2" fill="none" />
          {/* Anger lines */}
          <line x1="18" y1="10" x2="20" y2="8" stroke={color} strokeWidth="1" />
          <line x1="40" y1="8" x2="42" y2="10" stroke={color} strokeWidth="1" />
        </>
      )}

      {type === "shocked" && (
        <>
          <circle cx="26" cy="15" r="2" fill={color} />
          <circle cx="34" cy="15" r="2" fill={color} />
          <ellipse cx="30" cy="22" rx="3" ry="5" stroke={color} strokeWidth="2" fill="none" />
          {/* Shock lines */}
          <line x1="15" y1="12" x2="18" y2="15" stroke={color} strokeWidth="1" />
          <line x1="42" y1="15" x2="45" y2="12" stroke={color} strokeWidth="1" />
        </>
      )}

      {type === "defeated" && (
        <>
          <line x1="22" y1="17" x2="28" y2="13" stroke={color} strokeWidth="1.5" />
          <line x1="28" y1="17" x2="22" y2="13" stroke={color} strokeWidth="1.5" />
          <line x1="32" y1="17" x2="38" y2="13" stroke={color} strokeWidth="1.5" />
          <line x1="38" y1="17" x2="32" y2="13" stroke={color} strokeWidth="1.5" />
          <path d="M 22 24 Q 30 20 38 24" stroke={color} strokeWidth="2" fill="none" />
          {/* Tear */}
          <ellipse cx="24" cy="25" rx="1" ry="3" fill="#60a5fa" />
        </>
      )}

      {/* Default and other expressions */}
      {[
        "neutral",
        "candidate",
        "interviewer",
        "customer",
        "shopkeeper",
        "uncomfortable",
        "listening",
        "citizen",
      ].includes(type) && (
        <>
          <circle cx="26" cy="15" r="1.5" fill={color} />
          <circle cx="34" cy="15" r="1.5" fill={color} />
          <line x1="26" y1="20" x2="34" y2="20" stroke={color} strokeWidth="1.5" />
        </>
      )}

      {/* Enhanced body */}
      <line x1="30" y1="30" x2="30" y2="55" stroke={color} strokeWidth="4" />

      {/* Enhanced arms with different positions */}
      {type === "confident" ? (
        <>
          <line x1="30" y1="38" x2="15" y2="35" stroke={color} strokeWidth="3" />
          <line x1="30" y1="38" x2="45" y2="35" stroke={color} strokeWidth="3" />
        </>
      ) : type === "frustrated" ? (
        <>
          <line x1="30" y1="38" x2="12" y2="28" stroke={color} strokeWidth="3" />
          <line x1="30" y1="38" x2="48" y2="28" stroke={color} strokeWidth="3" />
        </>
      ) : type === "defeated" ? (
        <>
          <line x1="30" y1="38" x2="20" y2="50" stroke={color} strokeWidth="3" />
          <line x1="30" y1="38" x2="40" y2="50" stroke={color} strokeWidth="3" />
        </>
      ) : (
        <>
          <line x1="30" y1="38" x2="18" y2="48" stroke={color} strokeWidth="3" />
          <line x1="30" y1="38" x2="42" y2="48" stroke={color} strokeWidth="3" />
        </>
      )}

      {/* Enhanced legs */}
      <line x1="30" y1="55" x2="18" y2="75" stroke={color} strokeWidth="3" />
      <line x1="30" y1="55" x2="42" y2="75" stroke={color} strokeWidth="3" />

      {/* Special accessories and clothing */}
      {type === "interviewer" && (
        <>
          <rect x="24" y="32" width="12" height="8" fill="#1f2937" rx="1" />
          <line x1="26" y1="34" x2="34" y2="34" stroke="#ffffff" strokeWidth="1" />
        </>
      )}

      {type === "shopkeeper" && (
        <>
          <rect x="26" y="30" width="8" height="12" fill="#f97316" rx="1" />
          <rect x="28" y="32" width="4" height="2" fill="#ffffff" />
        </>
      )}

      {type === "candidate" && (
        <>
          <rect x="25" y="32" width="10" height="6" fill="#1e40af" rx="1" />
          <rect x="28" y="45" width="4" height="8" fill="#1e40af" />
        </>
      )}
    </svg>
  )
}

function DetailedPoliceSVG({ aggressive = false }) {
  const color = aggressive ? "#dc2626" : "#1f2937"

  return (
    <svg width="60" height="80" viewBox="0 0 60 80" className="drop-shadow-lg">
      {/* Head */}
      <circle cx="30" cy="18" r="12" stroke={color} strokeWidth="3" fill="none" />

      {/* Police cap with details */}
      <ellipse cx="30" cy="10" rx="14" ry="6" fill={color} />
      <ellipse cx="30" cy="12" rx="16" ry="3" fill={color} />
      <circle cx="30" cy="10" r="3" fill="#fbbf24" />
      <text x="30" y="12" textAnchor="middle" fontSize="6" fill="#000">
        ★
      </text>

      {/* Face */}
      <circle cx="26" cy="15" r="1.5" fill={color} />
      <circle cx="34" cy="15" r="1.5" fill={color} />
      {aggressive ? (
        <>
          <path d="M 22 22 L 38 22" stroke={color} strokeWidth="2" />
          <line x1="22" y1="13" x2="28" y2="17" stroke={color} strokeWidth="1" />
          <line x1="32" y1="17" x2="38" y2="13" stroke={color} strokeWidth="1" />
        </>
      ) : (
        <line x1="26" y1="20" x2="34" y2="20" stroke={color} strokeWidth="1.5" />
      )}

      {/* Uniform body */}
      <rect x="22" y="30" width="16" height="25" fill="#1f2937" rx="2" />
      <line x1="30" y1="30" x2="30" y2="55" stroke={color} strokeWidth="4" />

      {/* Police badge */}
      <circle cx="26" cy="35" r="3" fill="#fbbf24" stroke="#000" strokeWidth="0.5" />
      <text x="26" y="37" textAnchor="middle" fontSize="4" fill="#000">
        ★
      </text>

      {/* Belt */}
      <rect x="22" y="45" width="16" height="3" fill="#8b4513" />
      <rect x="28" y="44" width="4" height="5" fill="#fbbf24" />

      {/* Arms */}
      <line x1="30" y1="38" x2="15" y2="45" stroke={color} strokeWidth="3" />
      <line x1="30" y1="38" x2="45" y2="45" stroke={color} strokeWidth="3" />

      {/* Legs */}
      <line x1="30" y1="55" x2="18" y2="75" stroke={color} strokeWidth="3" />
      <line x1="30" y1="55" x2="42" y2="75" stroke={color} strokeWidth="3" />

      {/* Boots */}
      <ellipse cx="18" cy="75" rx="4" ry="2" fill="#000" />
      <ellipse cx="42" cy="75" rx="4" ry="2" fill="#000" />
    </svg>
  )
}

function DetailedCarSVG() {
  return (
    <svg width="120" height="60" viewBox="0 0 120 60" className="drop-shadow-lg">
      {/* Car shadow */}
      <ellipse cx="60" cy="55" rx="50" ry="5" fill="#000" opacity="0.2" />

      {/* Car body */}
      <rect x="15" y="30" width="90" height="20" fill="#3b82f6" rx="5" />

      {/* Car roof */}
      <rect x="30" y="15" width="60" height="20" fill="#1e40af" rx="8" />

      {/* Windows */}
      <rect x="33" y="18" width="22" height="12" fill="#93c5fd" rx="2" />
      <rect x="65" y="18" width="22" height="12" fill="#93c5fd" rx="2" />

      {/* Window frames */}
      <rect x="33" y="18" width="22" height="12" fill="none" stroke="#1e40af" strokeWidth="1" rx="2" />
      <rect x="65" y="18" width="22" height="12" fill="none" stroke="#1e40af" strokeWidth="1" rx="2" />

      {/* Wheels */}
      <circle cx="35" cy="50" r="8" fill="#374151" />
      <circle cx="85" cy="50" r="8" fill="#374151" />
      <circle cx="35" cy="50" r="5" fill="#6b7280" />
      <circle cx="85" cy="50" r="5" fill="#6b7280" />
      <circle cx="35" cy="50" r="2" fill="#9ca3af" />
      <circle cx="85" cy="50" r="2" fill="#9ca3af" />

      {/* Headlights */}
      <circle cx="108" cy="35" r="4" fill="#fbbf24" />
      <circle cx="108" cy="42" r="3" fill="#f59e0b" />

      {/* Grille */}
      <rect x="105" y="32" width="3" height="16" fill="#374151" />
      <line x1="105" y1="34" x2="108" y2="34" stroke="#6b7280" strokeWidth="1" />
      <line x1="105" y1="36" x2="108" y2="36" stroke="#6b7280" strokeWidth="1" />
      <line x1="105" y1="38" x2="108" y2="38" stroke="#6b7280" strokeWidth="1" />

      {/* Door handles */}
      <circle cx="45" cy="35" r="1" fill="#1e40af" />
      <circle cx="75" cy="35" r="1" fill="#1e40af" />

      {/* License plate */}
      <rect x="45" y="45" width="30" height="6" fill="#ffffff" stroke="#000" strokeWidth="1" />
      <text x="60" y="49" textAnchor="middle" fontSize="4" fill="#000">
        ABC-123
      </text>
    </svg>
  )
}

function DetailedBarrierSVG() {
  return (
    <svg width="50" height="40" viewBox="0 0 50 40" className="drop-shadow-lg">
      {/* Support posts */}
      <rect x="3" y="25" width="6" height="15" fill="#6b7280" />
      <rect x="41" y="25" width="6" height="15" fill="#6b7280" />

      {/* Post caps */}
      <rect x="2" y="23" width="8" height="3" fill="#4b5563" rx="1" />
      <rect x="40" y="23" width="8" height="3" fill="#4b5563" rx="1" />

      {/* Barrier arm */}
      <rect x="0" y="15" width="50" height="6" fill="#ef4444" />
      <rect x="0" y="15" width="50" height="3" fill="#ffffff" />

      {/* Reflective strips */}
      <rect x="5" y="16" width="3" height="4" fill="#fbbf24" />
      <rect x="15" y="16" width="3" height="4" fill="#fbbf24" />
      <rect x="25" y="16" width="3" height="4" fill="#fbbf24" />
      <rect x="35" y="16" width="3" height="4" fill="#fbbf24" />
      <rect x="42" y="16" width="3" height="4" fill="#fbbf24" />

      {/* Warning light */}
      <circle cx="6" cy="18" r="2" fill="#ef4444" />
      <circle cx="6" cy="18" r="1" fill="#fca5a5" />
    </svg>
  )
}

function CheckpointSignSVG() {
  return (
    <svg width="40" height="60" viewBox="0 0 40 60" className="drop-shadow-lg">
      {/* Sign post */}
      <rect x="18" y="30" width="4" height="30" fill="#8b4513" />

      {/* Sign board */}
      <rect x="5" y="5" width="30" height="25" fill="#ffffff" stroke="#000" strokeWidth="2" rx="2" />

      {/* Text */}
      <text x="20" y="12" textAnchor="middle" fontSize="6" fill="#000" fontWeight="bold">
        POLICE
      </text>
      <text x="20" y="20" textAnchor="middle" fontSize="6" fill="#000" fontWeight="bold">
        CHECK
      </text>
      <text x="20" y="26" textAnchor="middle" fontSize="6" fill="#000" fontWeight="bold">
        POINT
      </text>

      {/* Warning symbol */}
      <polygon points="20,2 22,6 18,6" fill="#ef4444" />
    </svg>
  )
}

function DetailedPhoneSVG({ broken = false }) {
  return (
    <svg width="30" height="45" viewBox="0 0 30 45" className="drop-shadow-lg">
      {/* Phone body */}
      <rect x="3" y="3" width="24" height="39" fill={broken ? "#6b7280" : "#1f2937"} rx="4" />

      {/* Screen */}
      <rect x="6" y="6" width="18" height="28" fill={broken ? "#ef4444" : "#3b82f6"} rx="2" />

      {/* Home button */}
      <circle cx="15" cy="37" r="3" fill="#9ca3af" />
      <circle cx="15" cy="37" r="2" fill="#d1d5db" />

      {/* Speaker */}
      <rect x="10" y="4" width="10" height="1" fill="#4b5563" rx="0.5" />

      {/* Camera */}
      <circle cx="20" cy="4.5" r="1" fill="#374151" />

      {/* Screen content when working */}
      {!broken && (
        <>
          <rect x="8" y="8" width="14" height="2" fill="#60a5fa" rx="1" />
          <rect x="8" y="12" width="10" height="1" fill="#93c5fd" rx="0.5" />
          <rect x="8" y="15" width="12" height="1" fill="#93c5fd" rx="0.5" />
          <rect x="8" y="18" width="8" height="1" fill="#93c5fd" rx="0.5" />
        </>
      )}

      {/* Crack effects when broken */}
      {broken && (
        <>
          <line x1="6" y1="6" x2="24" y2="34" stroke="#ef4444" strokeWidth="2" />
          <line x1="24" y1="6" x2="6" y2="34" stroke="#ef4444" strokeWidth="2" />
          <line x1="15" y1="6" x2="15" y2="34" stroke="#dc2626" strokeWidth="1" />
          <line x1="6" y1="20" x2="24" y2="20" stroke="#dc2626" strokeWidth="1" />
        </>
      )}
    </svg>
  )
}

function OfficeDeskSVG() {
  return (
    <svg width="80" height="40" viewBox="0 0 80 40" className="drop-shadow-lg">
      {/* Desk surface */}
      <rect x="5" y="20" width="70" height="8" fill="#8b4513" rx="2" />

      {/* Desk legs */}
      <rect x="8" y="28" width="4" height="12" fill="#654321" />
      <rect x="68" y="28" width="4" height="12" fill="#654321" />

      {/* Computer monitor */}
      <rect x="25" y="8" width="20" height="12" fill="#1f2937" rx="1" />
      <rect x="27" y="10" width="16" height="8" fill="#3b82f6" rx="1" />

      {/* Monitor stand */}
      <rect x="33" y="20" width="4" height="3" fill="#6b7280" />
      <rect x="30" y="23" width="10" height="2" fill="#6b7280" />

      {/* Papers */}
      <rect x="50" y="18" width="8" height="6" fill="#ffffff" />
      <rect x="52" y="16" width="8" height="6" fill="#f3f4f6" />

      {/* Pen */}
      <rect x="60" y="21" width="8" height="1" fill="#1f2937" />
      <circle cx="68" cy="21.5" r="0.5" fill="#ef4444" />
    </svg>
  )
}

function ShopCounterSVG() {
  return (
    <svg width="80" height="50" viewBox="0 0 80 50" className="drop-shadow-lg">
      {/* Counter surface */}
      <rect x="5" y="25" width="70" height="10" fill="#d97706" rx="2" />

      {/* Counter front */}
      <rect x="5" y="35" width="70" height="15" fill="#92400e" />

      {/* Cash register */}
      <rect x="15" y="15" width="15" height="10" fill="#374151" rx="2" />
      <rect x="17" y="17" width="6" height="4" fill="#60a5fa" rx="1" />
      <rect x="25" y="17" width="3" height="6" fill="#6b7280" />

      {/* Products display */}
      <rect x="40" y="20" width="8" height="5" fill="#ef4444" />
      <rect x="50" y="18" width="6" height="7" fill="#10b981" />
      <rect x="58" y="19" width="7" height="6" fill="#8b5cf6" />

      {/* Price tags */}
      <rect x="41" y="17" width="6" height="2" fill="#ffffff" />
      <rect x="51" y="15" width="4" height="2" fill="#ffffff" />
    </svg>
  )
}

function TreeSVG() {
  return (
    <svg width="30" height="40" viewBox="0 0 30 40" className="drop-shadow-sm">
      {/* Trunk */}
      <rect x="12" y="25" width="6" height="15" fill="#8b4513" />

      {/* Leaves - multiple layers for depth */}
      <circle cx="15" cy="20" r="8" fill="#22c55e" />
      <circle cx="12" cy="18" r="6" fill="#16a34a" />
      <circle cx="18" cy="18" r="6" fill="#16a34a" />
      <circle cx="15" cy="15" r="5" fill="#15803d" />

      {/* Trunk texture */}
      <line x1="13" y1="27" x2="13" y2="38" stroke="#654321" strokeWidth="1" />
      <line x1="17" y1="28" x2="17" y2="37" stroke="#654321" strokeWidth="1" />
    </svg>
  )
}
