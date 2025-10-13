// Centralized game data for all categories and levels
// Keep this in sync with routes. Imported by level and category pages.

export const gameData = {
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
        punishment:
          "Accepting discrimination perpetuates inequality and violates constitutional principles.",
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
        punishment:
          "Not knowing your rights means you might miss opportunities to express your views democratically.",
        timeLimit: 30,
        scenarioType: "protest",
      },
      3: {
        title: "Religious Discrimination in Education",
        scenario: "Rajesh, a student at a state-run college, is barred from the hostel mess by authorities solely because he follows a particular religion. No students of that faith are allowed to eat there.",
        question: "Which Fundamental Right is clearly violated by this action?",
        options: [
          { id: "a", text: "Article 14 – Right to Equality before law", correct: false },
          { id: "b", text: "Article 15 – Prohibition of discrimination on religious grounds", correct: true },
          { id: "c", text: "Article 21 – Right to life and personal liberty", correct: false },
          { id: "d", text: "Article 25 – Freedom of religion", correct: false },
        ],
        explanation: "Article 15 of the Indian Constitution explicitly forbids the State from discriminating against any citizen on grounds of religion. Since the college is government-run and forbids Rajesh access solely because of his religion, Article 15 is directly violated.",
        punishment: "Allowing such discrimination to go unchecked normalizes religious bias in educational institutions and violates constitutional principles of equality.",
        timeLimit: 30,
        scenarioType: "religious-discrimination",
      },
      4: {
        title: "Gender Discrimination in Employment",
        scenario: "Suman applied for a professor's post in a government college. Although fully qualified, she was rejected because the college only hires male candidates for that position.",
        question: "Which Fundamental Right does this situation violate?",
        options: [
          { id: "a", text: "Article 15 – Prohibition of discrimination on grounds of sex", correct: true },
          { id: "b", text: "Article 16 – Equality of opportunity in public employment", correct: false },
          { id: "c", text: "Article 19(1)(g) – Freedom to practice any profession", correct: false },
          { id: "d", text: "Article 25 – Freedom of religion", correct: false },
        ],
        explanation: "A government college cannot discriminate on the basis of sex in hiring. Article 15(1) explicitly bans state discrimination on grounds of religion, race, caste, sex or place of birth. Refusing to hire Suman solely for being a woman breaches Article 15's ban on sex-based discrimination.",
        punishment: "Accepting gender discrimination in hiring perpetuates inequality and deprives qualified individuals of opportunities based on their gender.",
        timeLimit: 30,
        scenarioType: "gender-discrimination",
      },
      5: {
        title: "Freedom of Press",
        scenario: "A journalist publishes an article criticizing state government policy. The next day, police warn her that her articles 'hurt public sentiments' and order her to stop writing.",
        question: "Which Fundamental Right is most directly under threat in this scenario?",
        options: [
          { id: "a", text: "Article 19(1)(a) – Freedom of speech and expression", correct: true },
          { id: "b", text: "Article 19(1)(c) – Freedom of movement", correct: false },
          { id: "c", text: "Article 21 – Right to life and personal liberty", correct: false },
          { id: "d", text: "Article 32 – Right to constitutional remedies", correct: false },
        ],
        explanation: "Article 19(1)(a) guarantees every citizen the right to freedom of speech and expression. Forcing a journalist to stop writing or threatening her for her views is a violation of that right. The Constitution protects the freedom to publish opinions on public affairs.",
        punishment: "Not standing up for press freedom allows for the suppression of dissent and weakens democracy by limiting public access to critical information.",
        timeLimit: 30,
        scenarioType: "press-freedom",
      },
      6: {
        title: "Right to Shelter and Livelihood",
        scenario: "Sunita's neighborhood is bulldozed by government officials late at night without any court order or notice, leaving her and other families homeless.",
        question: "Which Fundamental Right is clearly violated by this arbitrary eviction?",
        options: [
          { id: "a", text: "Article 21 – Protection of life and personal liberty", correct: true },
          { id: "b", text: "Article 14 – Equality before law", correct: false },
          { id: "c", text: "Article 22 – Protection against arrest and detention", correct: false },
          { id: "d", text: "Article 25 – Freedom of religion", correct: false },
        ],
        explanation: "Article 21 states that no person shall be deprived of life or personal liberty except according to a procedure established by law. Evicting people from their homes without any legal order or due process violates their right to live with dignity. The Supreme Court has interpreted 'life' to include livelihood and shelter.",
        punishment: "Failing to challenge such actions sets a dangerous precedent where the state can arbitrarily deprive citizens of their homes and livelihoods without due process.",
        timeLimit: 30,
        scenarioType: "right-to-shelter",
      },
      7: {
        title: "Protection Against Arbitrary Arrest",
        scenario: "Rajiv was arrested on suspicion of theft. The police detained him for a week without informing him of the charges and without producing him before a magistrate or allowing him a lawyer.",
        question: "Which Fundamental Right has been violated by this treatment?",
        options: [
          { id: "a", text: "Article 19(1)(d) – Freedom of movement", correct: false },
          { id: "b", text: "Article 21 – Protection of life and personal liberty", correct: false },
          { id: "c", text: "Article 22 – Protection against arrest and detention", correct: true },
          { id: "d", text: "Article 20 – Protection in respect of conviction for offences", correct: false },
        ],
        explanation: "Article 22(1) provides that anyone arrested must be informed 'as soon as may be' of the grounds for arrest, and cannot be detained without that knowledge. It also guarantees the right to be produced before a magistrate within 24 hours. By not informing Rajiv of charges and detaining him for a week without judicial oversight, the police violated Article 22(1).",
        punishment: "Allowing such violations to go unchecked enables abuse of police powers and undermines the rule of law, putting everyone's liberty at risk.",
        timeLimit: 30,
        scenarioType: "arbitrary-arrest",
      },
      8: {
        title: "Prohibition of Forced Labor",
        scenario: "A landlord in Uttar Pradesh forces bonded laborers to work on his fields under threat of violence. The laborers have no freedom to leave and are paid nothing.",
        question: "Which Fundamental Right is being violated in this case?",
        options: [
          { id: "a", text: "Article 21 – Right to life and personal liberty", correct: false },
          { id: "b", text: "Article 23 – Prohibition of forced labour and human trafficking", correct: true },
          { id: "c", text: "Article 24 – Prohibition of child labour", correct: false },
          { id: "d", text: "Article 25 – Freedom of religion", correct: false },
        ],
        explanation: "Article 23(1) of the Constitution expressly prohibits 'traffic in human beings and begar and other similar forms of forced labor.' Forcing people to work against their will under threat clearly falls under 'forced labor.' The landlord's conduct is exactly the abuse Article 23 forbids.",
        punishment: "Failing to address forced labor allows modern-day slavery to persist, denying people their basic human dignity and freedom.",
        timeLimit: 30,
        scenarioType: "forced-labor",
      },
      9: {
        title: "Prohibition of Child Labor",
        scenario: "Twelve-year-old Meena works in a brick kiln, operating heavy machinery and handling dangerous materials. This is her only means of income, and she has missed school entirely.",
        question: "Which Fundamental Right is most directly violated by Meena's working conditions?",
        options: [
          { id: "a", text: "Article 23 – Prohibition of forced labour", correct: false },
          { id: "b", text: "Article 21 – Right to life and dignity", correct: false },
          { id: "c", text: "Article 24 – Prohibition of child labour", correct: true },
          { id: "d", text: "Article 19(1)(g) – Freedom to practice any profession", correct: false },
        ],
        explanation: "Article 24 explicitly states that 'No child below the age of fourteen years shall be employed to work in any factory or mine or engaged in any other hazardous employment.' Meena, being 12 and working in a hazardous kiln, is employed in violation of Article 24. This provision is absolute; no work conditions can justify it.",
        punishment: "Allowing child labor in hazardous conditions deprives children of their childhood, education, and future opportunities, perpetuating cycles of poverty and exploitation.",
        timeLimit: 30,
        scenarioType: "child-labor",
      },
      10: {
        title: "Freedom from Religious Instruction",
        scenario: "In a government-run school, teachers require all students to recite a specific Hindu prayer every morning, and punish those who refuse.",
        question: "Which Fundamental Right is infringed by this practice?",
        options: [
          { id: "a", text: "Article 28 – Freedom from religious instruction in state schools", correct: true },
          { id: "b", text: "Article 25 – Freedom to profess, practice and propagate religion", correct: false },
          { id: "c", text: "Article 19(1)(a) – Freedom of speech and expression", correct: false },
          { id: "d", text: "Article 29 – Protection of culture and language", correct: false },
        ],
        explanation: "Article 28(1) states that 'No religious instruction shall be provided in any educational institution wholly maintained out of State funds.' Forcing students to follow a specific prayer in a state school amounts to compulsory religious instruction, which Article 28 prohibits.",
        punishment: "Compulsory religious practices in state schools violate the secular nature of our democracy and infringe upon the religious freedom of students from different faiths.",
        timeLimit: 30,
        scenarioType: "religious-instruction",
      },
      11: {
        title: "Right to Establish Educational Institutions",
        scenario: "A minority Sikh community in Punjab wishes to establish its own school to teach children in Punjabi and preserve its culture. When the community applies for permission, the state government initially refuses, saying they must follow the state curriculum.",
        question: "Which Fundamental Right protects the community's ability to start and run its own school?",
        options: [
          { id: "a", text: "Article 29(1) – Right to conserve distinct language and culture", correct: false },
          { id: "b", text: "Article 30(1) – Right of minorities to establish educational institutions", correct: true },
          { id: "c", text: "Article 19(1)(a) – Freedom of speech and expression", correct: false },
          { id: "d", text: "Article 14 – Equality before law", correct: false },
        ],
        explanation: "Article 30(1) guarantees that 'all minorities, whether based on religion or language, shall have the right to establish and administer educational institutions of their choice.' This means the Sikh community can constitutionally found a school to teach in Punjabi.",
        punishment: "Denying minority communities the right to establish their own educational institutions undermines cultural diversity and the constitutional protection of minority rights.",
        timeLimit: 30,
        scenarioType: "minority-education",
      },
      12: {
        title: "Right to Constitutional Remedies",
        scenario: "Anand's daughter was illegally detained by police, but the local courts are slow to act. Anand decides to file a writ petition in the Supreme Court directly, claiming her fundamental rights are being violated.",
        question: "Which constitutional provision empowers Anand to approach the Supreme Court in this way?",
        options: [
          { id: "a", text: "Article 19 – Right to freedom of speech", correct: false },
          { id: "b", text: "Article 21 – Right to life and personal liberty", correct: false },
          { id: "c", text: "Article 32 – Right to constitutional remedies (writ jurisdiction)", correct: true },
          { id: "d", text: "Article 226 – High Court's writ jurisdiction", correct: false },
        ],
        explanation: "Article 32 guarantees the right to move the Supreme Court 'for the enforcement of the rights conferred by this Part' (the Fundamental Rights). This special remedy is available only under Article 32, allowing direct approach to the Supreme Court for violation of fundamental rights.",
        punishment: "Not being aware of Article 32 remedies could leave citizens without effective recourse when their fundamental rights are violated, especially in urgent situations.",
        timeLimit: 30,
        scenarioType: "constitutional-remedies",
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
        punishment:
          "Ignorance of arrest rights can lead to prolonged detention and violation of due process.",
        timeLimit: 25,
        scenarioType: "arrest",
      },
      3: { title: "Informing Reason for Arrest", timeLimit: 30, scenarioType: "inform-reason-arrest" },
      4: { title: "Right to Consult a Lawyer", timeLimit: 30, scenarioType: "right-to-lawyer" },
      5: { title: "Informing Relative or Friend", timeLimit: 30, scenarioType: "inform-relative" },
      6: { title: "Right to Remain Silent", timeLimit: 30, scenarioType: "right-to-silence" },
      7: { title: "Produce Before Magistrate (24h)", timeLimit: 30, scenarioType: "produce-magistrate" },
      8: { title: "Bailable Offence – Bail Right", timeLimit: 30, scenarioType: "bailable-bail" },
      9: { title: "Handcuffing – Necessity Only", timeLimit: 30, scenarioType: "handcuffing" },
      10:{ title: "Medical Exam to Document Torture", timeLimit: 30, scenarioType: "medical-exam" },
      11:{ title: "Section 41A Notice Before Arrest", timeLimit: 30, scenarioType: "section-41a-notice" },
      12:{ title: "Forced Confession / Blank Papers", timeLimit: 30, scenarioType: "forced-confession" },
    },
  },
  "consumer-rights": {
    title: "Consumer Rights",
    levels: {
      // Levels 1-12 copied from the level page; ensure edits are done there too if needed.
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
      // New levels 3–12 will be consumed from the level page; this file keeps a mirror for the grid view.
      3: { title: "Online Purchase – Broken Phone", timeLimit: 30, scenarioType: "ecommerce-defect" },
      4: { title: "Store Purchase – No Return", timeLimit: 30, scenarioType: "warranty-defect-store" },
      5: { title: "Misleading Advertisement", timeLimit: 30, scenarioType: "misleading-ad" },
      6: { title: "Overcharging at Restaurant", timeLimit: 30, scenarioType: "overcharge" },
      7: { title: "Online Course Not Delivered", timeLimit: 30, scenarioType: "online-coaching" },
      8: { title: "Warranty Denied Unfairly", timeLimit: 30, scenarioType: "warranty-denial" },
      9: { title: "Wrong Size – No Return Policy", timeLimit: 30, scenarioType: "no-return" },
      10: { title: "Failed Digital Payment", timeLimit: 30, scenarioType: "digital-payment" },
      11: { title: "Unsafe Food – Allergy Incident", timeLimit: 30, scenarioType: "food-safety" },
      12: { title: "Institute Shuts After Fees", timeLimit: 30, scenarioType: "institute-closure" },
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
          { id: "a", text: "It's a standard bank processing delay.", correct: false },
          { id: "b", text: "She experienced a bank transaction delay.", correct: false },
          { id: "c", text: "She was tricked by an online shopping scam.", correct: true },
          { id: "d", text: "The deal was real; she'll eventually get them.", correct: false },
        ],
        explanation:
          "This is a scam. Offers that seem too good are often fraudulent. Riya was deceived by a fake e-commerce site. Under Indian law, this is 'cheating by personation' (using a fake identity to cheat) covered by IT Act §66D and IPC §420 (cheating). Option C correctly identifies the scam. Options A/B/D are incorrect interpretations of a deliberate fraud.",
        punishment:
          "Riya should immediately contact her bank to block or reverse the payment. She should report this fraud to the Cyber Crime Reporting Portal and local police, giving details like the fake website and payment info. Cybercriminals can be jailed for such offenses under IT Act §66D and other fraud laws. In the future, she should only shop on verified websites (look for HTTPS, reviews, known brands).",
        timeLimit: 30,
        scenarioType: "fake-discount-shop",
      },
    },
  },
};
