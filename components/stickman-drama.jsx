"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function StickmanDrama({ scenarioType, outcome = "setup", selectedOption, onComplete }) {
  const [currentScene, setCurrentScene] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)

  const scenarios = {
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
  }

  const currentScenario = scenarios[scenarioType] || scenarios["police-stop"]
  const scenes = currentScenario[outcome] || currentScenario.setup

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
            <div className="absolute bottom-24 right-20">
              <DetailedStickmanSVG type="customer" />
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
            <div className="absolute bottom-24 right-20">
              <DetailedStickmanSVG type="frustrated" />
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
            <div className="absolute bottom-24 right-20">
              <DetailedStickmanSVG type="scared" />
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
      case "issue-challan":
      case "ignore-helmet":
      case "helmet-fine":
      case "safety-risk":
      case "learn-compliance":
      case "wear-helmet":
      case "safety-first":
      case "no-violation":
      case "ride-safe":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute bottom-24 left-24">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedPoliceSVG />
            </div>
            <motion.div className="absolute top-10 left-1/2 -translate-x-1/2">
              <HelmetIconSVG />
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
      case "continue-no-belt":
      case "seatbelt-fine":
      case "injury-risk":
      case "comply-later":
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
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute top-10 left-1/2 -translate-x-1/2">
              <SeatbeltIconSVG />
            </div>
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
      case "stop-speeding":
      case "deny-speeding":
      case "issue-fine-183":
      case "risk-accident":
      case "drive-danger":
      case "acknowledge-limit":
      case "pay-fine":
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
              <DetailedStickmanSVG type="citizen" />
            </div>
            <SceneDescription text={description} />
          </div>
        )

      // Zebra crossing
      case "approach-crossing":
      case "pedestrian-steps":
      case "driver-doesnt-stop":
      case "near-miss":
      case "dangerous-184":
      case "zebra-penalty":
      case "endanger-lives":
      case "remorse":
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
            <div className="absolute bottom-24 right-36">
              <DetailedStickmanSVG type="citizen" />
            </div>
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
      case "arrest-charge-185":
      case "drive-intoxicated":
      case "caught-185":
      case "heavy-penalty":
      case "licence-suspend":
      case "take-cab":
      case "avoid-driving":
      case "safe-choice":
      case "no-penalty":
        return (
          <div className="stickman-drama-large">
            <DetailedBackground type="road" />
            <div className="absolute bottom-24 left-24">
              <DetailedPoliceSVG />
            </div>
            <div className="absolute bottom-24 right-24">
              <DetailedStickmanSVG type="citizen" />
            </div>
            <div className="absolute top-10 right-10">
              <BottleIconSVG />
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
              <DetailedStickmanSVG type="interviewer" />
            </div>
            <div className="absolute bottom-24 right-32">
              <OfficeDeskSVG />
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
              <DetailedStickmanSVG type="interviewer" />
            </div>
            <div className="absolute bottom-24 right-32">
              <OfficeDeskSVG />
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
              <DetailedStickmanSVG type="interviewer" />
            </div>
            <div className="absolute bottom-24 right-32">
              <OfficeDeskSVG />
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
              <DetailedStickmanSVG type="interviewer" />
            </div>
            <div className="absolute bottom-24 right-32">
              <OfficeDeskSVG />
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
              <DetailedStickmanSVG type="interviewer" />
            </div>
            <div className="absolute bottom-24 right-32">
              <OfficeDeskSVG />
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
              <DetailedStickmanSVG type="shopkeeper" />
            </div>
            <div className="absolute bottom-24 right-32">
              <ShopCounterSVG />
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
              <DetailedStickmanSVG type="shopkeeper" />
            </div>
            <div className="absolute bottom-24 right-32">
              <ShopCounterSVG />
            </div>
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
              <DetailedPhoneSVG />
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
              className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
              animate={{ x: [-8, 8, -8, 8, 0], rotate: [-3, 3, -3, 3, 0] }}
              transition={{ duration: 2 }}
            >
              <DetailedStickmanSVG type="frustrated" />
            </motion.div>
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 ml-16">
              <DetailedPhoneSVG broken />
            </div>
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
              <DetailedStickmanSVG type="shopkeeper" />
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
              <DetailedStickmanSVG type="shopkeeper" />
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
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg text-lg font-bold shadow-lg max-w-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
              animate={{ y: [0, -6, 0], scale: [1, 0.95, 1] }}
              transition={{ duration: 1.2, repeat: 1 }}
            >
              <DetailedStickmanSVG type="defeated" />
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
