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
  "human-rights": {
    title: "Human Rights",
    levels: {
      1: {
        title: "Right to Equality and Non-Discrimination",
        scenario:
          "Rina applies for a job and performs well in the interview. Later, the employer tells her, 'We don't hire women for field roles.'",
        question: "Which right of Rina has been violated?",
        options: [
          { id: "a", text: "Freedom of religion", correct: false },
          { id: "b", text: "Right to equality and protection from discrimination", correct: true },
          { id: "c", text: "Right to education", correct: false },
          { id: "d", text: "Freedom of speech", correct: false },
        ],
        explanation:
          "Article 14 guarantees equality before law and Article 15(1) of the Indian Constitution prohibits discrimination based on religion, race, caste, sex, or place of birth. Denying Rina a job because she is a woman violates her human right to equality (also Article 2 of the UDHR). Options A, C, and D are unrelated to gender discrimination.",
        punishment:
          "Accepting such discrimination perpetuates gender inequality in the workplace and denies qualified individuals opportunities based solely on their sex, violating both constitutional and human rights principles.",
        timeLimit: 30,
        scenarioType: "hr-gender-job-discrimination",
      },
      2: {
        title: "Right to Education",
        scenario:
          "Apoorv's parents cannot afford school fees, so they keep him at home to help with household work. The local authorities take no action.",
        question: "Which human right is being denied to Apoorv?",
        options: [
          { id: "a", text: "Right to freedom of religion", correct: false },
          { id: "b", text: "Right to education", correct: true },
          { id: "c", text: "Right to freedom of assembly", correct: false },
          { id: "d", text: "Right to equality before law", correct: false },
        ],
        explanation:
          "Article 21-A of the Indian Constitution and the Right to Education Act (2009) make free and compulsory education a fundamental right for children aged 6–14. Article 26 of the UDHR also recognizes education as a basic human right. The authorities' inaction violates this principle.",
        punishment:
          "Denying Apoorv his right to education limits his future opportunities and perpetuates cycles of poverty, depriving him of the knowledge and skills necessary for personal development.",
        timeLimit: 30,
        scenarioType: "hr-right-to-education",
      },
      3: {
        title: "Right to Freedom of Expression",
        scenario:
          "Arjun posts a peaceful comment online criticizing local government policies. The police summon him for 'hurting sentiments' and threaten arrest.",
        question: "What right is Arjun exercising?",
        options: [
          { id: "a", text: "Right to property", correct: false },
          { id: "b", text: "Right to freedom of expression and speech", correct: true },
          { id: "c", text: "Right to equality before law", correct: false },
          { id: "d", text: "Right to assemble peacefully", correct: false },
        ],
        explanation:
          "Article 19(1)(a) of the Constitution and Article 19 of the UDHR guarantee freedom of speech and expression. Peaceful criticism of government action is a protected right. However, speech that incites violence or hatred may be restricted — which Arjun's post did not do. Options A, C, and D are unrelated.",
        punishment:
          "If Arjun is intimidated into silence, it creates a chilling effect on free expression and weakens democratic discourse, allowing government actions to go unchallenged.",
        timeLimit: 30,
        scenarioType: "hr-freedom-of-expression",
      },
      4: {
        title: "Right to Privacy and Dignity",
        scenario:
          "Sneha's landlord installs hidden cameras in her rented flat 'for security.' She discovers them in the bedroom.",
        question: "Which of Sneha's rights are violated?",
        options: [
          { id: "a", text: "Right to privacy and dignity", correct: true },
          { id: "b", text: "Right to vote", correct: false },
          { id: "c", text: "Right to freedom of religion", correct: false },
          { id: "d", text: "Right to property", correct: false },
        ],
        explanation:
          "The Supreme Court (Puttaswamy v. Union of India, 2017) recognized privacy as a fundamental right under Article 21 (Right to Life and Personal Liberty). Installing hidden cameras in private spaces violates her human dignity and privacy, both under Indian and international human rights law (UDHR Article 12).",
        punishment:
          "Violating Sneha's privacy causes severe emotional distress and insecurity. It is a criminal offense under various laws including the IT Act, and perpetrators can face imprisonment.",
        timeLimit: 30,
        scenarioType: "hr-privacy-violation",
      },
      5: {
        title: "Child Labour and Right to Protection",
        scenario:
          "12-year-old Imran works long hours at a roadside tea stall instead of attending school.",
        question: "Which right is being violated?",
        options: [
          { id: "a", text: "Right to rest and leisure", correct: false },
          { id: "b", text: "Right to freedom of movement", correct: false },
          { id: "c", text: "Right against child labour and to education", correct: true },
          { id: "d", text: "Right to property", correct: false },
        ],
        explanation:
          "The Child Labour (Prohibition and Regulation) Act, 1986 (amended 2016) and Article 24 of the Constitution prohibit employment of children below 14 years in any occupation. This violates Imran's right to childhood, education, and dignity (UDHR Articles 25 & 26).",
        punishment:
          "Allowing child labour robs Imran of his childhood and education, perpetuates poverty cycles, and exposes him to exploitation and health risks.",
        timeLimit: 30,
        scenarioType: "hr-child-labour",
      },
      6: {
        title: "Right to Freedom of Religion",
        scenario:
          "A public school forces all students to recite prayers of one specific religion during morning assembly. When Aisha, a student of another faith, refuses, she is punished.",
        question: "Which of her rights are violated?",
        options: [
          { id: "a", text: "Right to equality", correct: false },
          { id: "b", text: "Right to freedom of religion", correct: true },
          { id: "c", text: "Right to freedom of association", correct: false },
          { id: "d", text: "Right to property", correct: false },
        ],
        explanation:
          "Article 25 of the Constitution guarantees freedom of conscience and the right to freely profess, practice, and propagate one's religion. Forcing a religious practice violates both the Indian Constitution and Article 18 of the UDHR.",
        punishment:
          "Forcing religious practices in public schools violates secular principles and causes distress to students of different faiths, undermining religious harmony and constitutional values.",
        timeLimit: 30,
        scenarioType: "hr-religious-freedom",
      },
      7: {
        title: "Right to Health and Clean Environment",
        scenario:
          "Villagers in a small town discover that a nearby factory is dumping toxic waste into their drinking water source. Local authorities ignore their complaints.",
        question: "Which human right is affected here?",
        options: [
          { id: "a", text: "Right to freedom of speech", correct: false },
          { id: "b", text: "Right to property", correct: false },
          { id: "c", text: "Right to a healthy environment and life", correct: true },
          { id: "d", text: "Right to privacy", correct: false },
        ],
        explanation:
          "The Supreme Court has interpreted Article 21 (Right to Life) to include the right to live in a clean and healthy environment (Subhash Kumar v. State of Bihar, 1991). Dumping toxic waste endangers public health and violates human rights under Indian and international law.",
        punishment:
          "Ignoring toxic waste dumping leads to widespread health problems including waterborne diseases and cancer, affecting entire communities and future generations.",
        timeLimit: 30,
        scenarioType: "hr-environmental-rights",
      },
      8: {
        title: "Right to Life and Protection from Torture",
        scenario:
          "During a protest, Ravi is taken into custody and beaten by police for refusing to chant slogans.",
        question: "Which fundamental and human right has been violated?",
        options: [
          { id: "a", text: "Right to freedom of expression", correct: false },
          { id: "b", text: "Right against torture and to life and dignity", correct: true },
          { id: "c", text: "Right to education", correct: false },
          { id: "d", text: "Right to equality", correct: false },
        ],
        explanation:
          "Article 21 guarantees protection of life and personal liberty, and India is bound by the UDHR (Article 5) and ICCPR to prohibit torture or cruel treatment. Police brutality violates this right. Options A, C, and D are secondary or unrelated here.",
        punishment:
          "Police brutality causes physical and psychological trauma, erodes public trust in law enforcement, and violates the most basic human right to life and dignity.",
        timeLimit: 30,
        scenarioType: "hr-torture-protection",
      },
      9: {
        title: "Right to Privacy in the Digital Age",
        scenario:
          "A telecom company shares customers' personal call and location data with advertisers without their consent.",
        question: "What human right is being infringed?",
        options: [
          { id: "a", text: "Right to privacy and data protection", correct: true },
          { id: "b", text: "Right to freedom of speech", correct: false },
          { id: "c", text: "Right to freedom of association", correct: false },
          { id: "d", text: "Right to equality before law", correct: false },
        ],
        explanation:
          "Following the Supreme Court's Puttaswamy ruling, data privacy is a key component of the right to life and liberty under Article 21. Sharing data without consent violates this right as well as Article 12 of the UDHR (protection from arbitrary interference with privacy).",
        punishment:
          "Unauthorized data sharing leads to privacy breaches, targeted manipulation, identity theft, and loss of control over personal information, undermining individual autonomy.",
        timeLimit: 30,
        scenarioType: "hr-digital-privacy",
      },
      10: {
        title: "Right to Seek Justice (Access to Legal Remedies)",
        scenario:
          "Kavita's house is demolished by local authorities without notice or hearing. When she approaches the court, officials tell her she 'cannot challenge government actions.'",
        question: "What can Kavita legally do?",
        options: [
          { id: "a", text: "Nothing — government decisions are final.", correct: false },
          { id: "b", text: "File a writ petition in High Court under Article 226 or in Supreme Court under Article 32 to enforce her fundamental rights.", correct: true },
          { id: "c", text: "Ask for money from neighbors.", correct: false },
          { id: "d", text: "Protest outside her home.", correct: false },
        ],
        explanation:
          "The right to constitutional remedies (Article 32) empowers any citizen to approach the courts for protection of fundamental rights. Denying this access would itself violate human rights (UDHR Article 8). Options A, C, and D are incorrect — judicial remedies are the correct legal route.",
        punishment:
          "If citizens cannot access courts to challenge rights violations, it leads to unchecked abuse of power and denial of justice, making all other rights meaningless.",
        timeLimit: 30,
        scenarioType: "hr-access-to-justice",
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
  "womens-rights": {
    title: "Women's Rights",
    levels: {
      1: {
        title: "Workplace Harassment",
        scenario:
          "Priya joins a private company. Her manager frequently passes inappropriate comments and sends her unwelcome messages. When she reports it to HR, they say, 'Just ignore him — he's senior.'",
        question: "What legal protection does Priya have?",
        options: [
          { id: "a", text: "None, since it's only verbal.", correct: false },
          { id: "b", text: "She is protected under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013.", correct: true },
          { id: "c", text: "Only physical contact counts as harassment.", correct: false },
          { id: "d", text: "HR can decide informally without any law.", correct: false },
        ],
        explanation:
          "The POSH Act, 2013 covers all forms of sexual harassment — verbal, physical, or digital — at the workplace. It requires every organization with 10+ employees to form an Internal Complaints Committee (ICC). Ignoring the complaint violates Priya's right to a safe working environment under Articles 14, 15, and 21 of the Constitution.",
        punishment:
          "Ignoring workplace harassment perpetuates a hostile work environment and violates fundamental rights. The employer can be penalized, and Priya has legal recourse through the ICC and courts.",
        timeLimit: 30,
        scenarioType: "wr-workplace-harassment",
      },
      2: {
        title: "Equal Pay for Equal Work",
        scenario:
          "Nisha and Raj work as computer operators in the same office with identical duties. Nisha discovers Raj earns ₹5,000 more per month.",
        question: "Which right protects Nisha from wage discrimination?",
        options: [
          { id: "a", text: "Only private companies decide salaries.", correct: false },
          { id: "b", text: "Equal Remuneration Act, 1976 ensures equal pay for equal work.", correct: true },
          { id: "c", text: "She can only complain if both work in government jobs.", correct: false },
          { id: "d", text: "There is no law for pay equality in India.", correct: false },
        ],
        explanation:
          "The Equal Remuneration Act, 1976 (now part of the Code on Wages, 2019) mandates equal pay for equal work regardless of gender. Paying Nisha less violates Article 39(d) (Directive Principle) and Article 14 (Right to Equality).",
        punishment:
          "Accepting wage discrimination perpetuates gender inequality in the workplace. Nisha has the right to file a complaint and seek equal pay.",
        timeLimit: 30,
        scenarioType: "wr-equal-pay",
      },
      3: {
        title: "Dowry Harassment",
        scenario:
          "After marriage, Kavita's in-laws demand a car and threaten to mistreat her if she refuses.",
        question: "What law protects Kavita from such dowry demands?",
        options: [
          { id: "a", text: "Only if physical violence occurs.", correct: false },
          { id: "b", text: "Dowry Prohibition Act, 1961 criminalizes giving, taking, or demanding dowry.", correct: true },
          { id: "c", text: "It's a family matter; no legal remedy.", correct: false },
          { id: "d", text: "She must wait until police intervene on their own.", correct: false },
        ],
        explanation:
          "Under the Dowry Prohibition Act, 1961, demanding dowry before, during, or after marriage is a criminal offense. Sections 498A and 304B of the IPC also protect women from cruelty and dowry-related harassment. Kavita has the right to lodge a complaint immediately.",
        punishment:
          "Tolerating dowry demands encourages illegal practices and puts women at risk. Kavita must report it immediately to protect herself and uphold the law.",
        timeLimit: 30,
        scenarioType: "wr-dowry-harassment",
      },
      4: {
        title: "Domestic Violence",
        scenario:
          "Renu faces regular physical abuse from her husband, who says it's 'a personal family issue.'",
        question: "What protection does Renu have under Indian law?",
        options: [
          { id: "a", text: "None — it's a private matter.", correct: false },
          { id: "b", text: "Protection of Women from Domestic Violence Act, 2005 gives her legal remedies.", correct: true },
          { id: "c", text: "Only police can help if she files divorce first.", correct: false },
          { id: "d", text: "She can only move to a shelter home.", correct: false },
        ],
        explanation:
          "The PWDVA, 2005 protects women from physical, emotional, sexual, and economic abuse. Renu can seek protection orders, residence orders, and maintenance through a magistrate. Violence within the home is not a private matter but a human rights violation under Article 21 and CEDAW principles.",
        punishment:
          "Staying silent about domestic violence endangers life and dignity. Renu has legal protection and must seek help immediately through police or Protection Officers.",
        timeLimit: 30,
        scenarioType: "wr-domestic-violence",
      },
      5: {
        title: "Right to Maternity Benefits",
        scenario:
          "Megha, who works at a private company, is told she must resign when she becomes pregnant because 'the company can't handle maternity leaves.'",
        question: "What law protects Megha?",
        options: [
          { id: "a", text: "Maternity Benefit Act, 1961 ensures paid maternity leave.", correct: true },
          { id: "b", text: "Pregnancy is personal, not covered by law.", correct: false },
          { id: "c", text: "She must take unpaid leave.", correct: false },
          { id: "d", text: "The company can make its own rules.", correct: false },
        ],
        explanation:
          "Under the Maternity Benefit (Amendment) Act, 2017, women employees are entitled to 26 weeks of paid leave. Terminating or discriminating against a woman because of pregnancy violates Section 12 of the Act and Article 42 of the Constitution (just and humane conditions of work).",
        punishment:
          "Forcing resignation due to pregnancy is illegal discrimination. Megha can file a complaint and claim her rightful maternity benefits.",
        timeLimit: 30,
        scenarioType: "wr-maternity-benefits",
      },
      6: {
        title: "Right to Safe Public Spaces",
        scenario:
          "Anita is harassed on a public bus by a group of men. The conductor ignores her complaints.",
        question: "What can Anita legally do?",
        options: [
          { id: "a", text: "Ignore and move on.", correct: false },
          { id: "b", text: "File a complaint under Section 354 IPC for outraging modesty or harassment in public.", correct: true },
          { id: "c", text: "Only if she knows the men's names.", correct: false },
          { id: "d", text: "Wait until media reports it.", correct: false },
        ],
        explanation:
          "Sections 354 & 509 IPC protect women from verbal, physical, or sexual harassment in public. The Nirbhaya Act (Criminal Law Amendment, 2013) strengthened these protections. Failing to respond violates her Right to Safety and Dignity (Article 21).",
        punishment:
          "Ignoring public harassment normalizes violence against women. Anita must report to police immediately and can seek help from women helplines.",
        timeLimit: 30,
        scenarioType: "wr-public-harassment",
      },
      7: {
        title: "Child Marriage",
        scenario:
          "A 16-year-old girl, Aarti, is being forced by her parents to marry a 25-year-old man.",
        question: "What law protects Aarti?",
        options: [
          { id: "a", text: "There's no restriction if parents consent.", correct: false },
          { id: "b", text: "Prohibition of Child Marriage Act, 2006 makes such marriage voidable and punishable.", correct: true },
          { id: "c", text: "Child marriage is only illegal for boys.", correct: false },
          { id: "d", text: "Religious custom overrides this law.", correct: false },
        ],
        explanation:
          "Under the Prohibition of Child Marriage Act, 2006, marriage of a girl below 18 years is illegal. It's a violation of her right to childhood, education, and health under Articles 21 and 39(f). The law protects Aarti and allows her to seek annulment and protection from coercion.",
        punishment:
          "Child marriage robs girls of education, health, and childhood. Aarti can contact Childline 1098, police, or Child Marriage Prohibition Officers for immediate protection.",
        timeLimit: 30,
        scenarioType: "wr-child-marriage",
      },
      8: {
        title: "Right to Property and Inheritance",
        scenario:
          "After her father's death, Sita's brothers refuse to give her a share of the ancestral property, claiming 'only sons inherit.'",
        question: "What does the law say?",
        options: [
          { id: "a", text: "Daughters have no inheritance rights.", correct: false },
          { id: "b", text: "The Hindu Succession (Amendment) Act, 2005 grants equal rights to daughters as sons.", correct: true },
          { id: "c", text: "Only widows inherit property.", correct: false },
          { id: "d", text: "Customary law overrides statutory law.", correct: false },
        ],
        explanation:
          "The Hindu Succession (Amendment) Act, 2005 ensures that daughters are coparceners (joint heirs) by birth, with the same rights and liabilities as sons. Denying Sita her share violates her Right to Equality (Article 14) and Right to Property under personal law.",
        punishment:
          "Denying daughters inheritance rights perpetuates gender discrimination. Sita can file a partition suit in civil court to claim her rightful share.",
        timeLimit: 30,
        scenarioType: "wr-property-inheritance",
      },
      9: {
        title: "Right to Reproductive Choice",
        scenario:
          "Rashmi becomes pregnant and wants to terminate the pregnancy within 12 weeks. Her husband refuses permission, and the clinic denies her request.",
        question: "Does Rashmi have a legal right to decide?",
        options: [
          { id: "a", text: "No, only the husband decides.", correct: false },
          { id: "b", text: "Yes, under the Medical Termination of Pregnancy (Amendment) Act, 2021, she can choose independently.", correct: true },
          { id: "c", text: "Only after court permission.", correct: false },
          { id: "d", text: "Abortion is illegal in India.", correct: false },
        ],
        explanation:
          "The MTP (Amendment) Act, 2021 allows women to seek abortion up to 20 weeks (and in some cases, 24 weeks) with the opinion of a registered medical practitioner. The decision belongs to the woman alone — not her spouse — under her Right to Privacy and Dignity (Article 21).",
        punishment:
          "Denying reproductive choice violates bodily autonomy. Rashmi has the legal right to access safe abortion services at a registered facility.",
        timeLimit: 30,
        scenarioType: "wr-reproductive-choice",
      },
      10: {
        title: "Political Participation and Representation",
        scenario:
          "During local panchayat elections, villagers tell Sunita she 'shouldn't contest because politics is for men.'",
        question: "What constitutional principle supports Sunita's right to contest?",
        options: [
          { id: "a", text: "None; women can't contest without men's approval.", correct: false },
          { id: "b", text: "The Constitution (73rd Amendment) reserves one-third of seats in panchayats for women.", correct: true },
          { id: "c", text: "She can only contest if unmarried.", correct: false },
          { id: "d", text: "Panchayat elections are not bound by gender laws.", correct: false },
        ],
        explanation:
          "The 73rd Constitutional Amendment (1992) mandates 33% reservation for women in panchayats and local bodies. Denying Sunita's participation violates Articles 14, 15, and 16 ensuring equality and equal opportunity.",
        punishment:
          "Discouraging women's political participation undermines democracy. Sunita has the constitutional right to contest and should approach the Election Commission if obstructed.",
        timeLimit: 30,
        scenarioType: "wr-political-participation",
      },
    },
  },
  "child-rights": {
    title: "Child Rights",
    levels: {
      1: {
        title: "Right to Education",
        scenario:
          "Arjun, a 10-year-old boy, is denied admission to a government school because his parents cannot afford to buy uniforms and books. The school refuses entry without payment.",
        question: "Which right of Arjun is being violated?",
        options: [
          { id: "a", text: "Right to education under Article 21-A and RTE Act, 2009", correct: true },
          { id: "b", text: "Right to property", correct: false },
          { id: "c", text: "Right to vote", correct: false },
          { id: "d", text: "Right to privacy", correct: false },
        ],
        explanation:
          "The Right of Children to Free and Compulsory Education Act, 2009 ensures that every child between 6 and 14 years has a fundamental right to free education under Article 21-A. Denying admission based on affordability violates his right. Schools must provide free textbooks, uniforms, and other essentials to children from weaker sections.",
        punishment:
          "Denying education based on affordability violates constitutional rights. The school can face penalties, and Arjun must be immediately admitted with free uniforms and books.",
        timeLimit: 30,
        scenarioType: "cr-right-to-education",
      },
      2: {
        title: "Child Labour",
        scenario:
          "Twelve-year-old Rohit works at a local restaurant washing dishes. His employer says, 'He wants to earn; what's the harm?' Rohit works 8 hours daily and misses school.",
        question: "Is the employer's action legal?",
        options: [
          { id: "a", text: "Yes, if Rohit's parents agree.", correct: false },
          { id: "b", text: "No, employing a child under 14 years is illegal under the Child Labour (Prohibition and Regulation) Act, 1986.", correct: true },
          { id: "c", text: "Yes, since it's part-time work.", correct: false },
          { id: "d", text: "Only illegal in factories.", correct: false },
        ],
        explanation:
          "The Child Labour (Prohibition and Regulation) Amendment Act, 2016 strictly prohibits employment of children below 14 years in any occupation. This protects the Right to Childhood and Education (Article 21A) and aligns with UNCRC Article 32 (protection from economic exploitation).",
        punishment:
          "Employing children under 14 is a punishable offence. The employer faces imprisonment and fines. Rohit must be rescued and enrolled in school immediately.",
        timeLimit: 30,
        scenarioType: "cr-child-labour",
      },
      3: {
        title: "Right to Protection from Abuse",
        scenario:
          "Riya, a 13-year-old, is repeatedly touched inappropriately by a neighbor. Her parents hesitate to report it, fearing social stigma and community backlash.",
        question: "What law specifically protects Riya?",
        options: [
          { id: "a", text: "POCSO Act, 2012", correct: true },
          { id: "b", text: "Domestic Violence Act, 2005", correct: false },
          { id: "c", text: "Indian Penal Code, 1860 (only adults)", correct: false },
          { id: "d", text: "None, since she is a minor", correct: false },
        ],
        explanation:
          "The Protection of Children from Sexual Offences (POCSO) Act, 2012 criminalizes all forms of sexual abuse against minors (under 18). It mandates child-friendly investigation and trial procedures. Failing to report an offence is also punishable under Section 19 of POCSO.",
        punishment:
          "Sexual abuse of children is a heinous crime under POCSO Act. Not reporting it is also an offence. The accused faces severe punishment, and Riya is entitled to protection and counseling.",
        timeLimit: 30,
        scenarioType: "cr-protection-from-abuse",
      },
      4: {
        title: "Right to Identity",
        scenario:
          "A 9-year-old girl living in an orphanage has no birth certificate or Aadhaar card. Without it, she is unable to enroll in school or access welfare schemes.",
        question: "Which right is being denied?",
        options: [
          { id: "a", text: "Right to identity and nationality", correct: true },
          { id: "b", text: "Right to free speech", correct: false },
          { id: "c", text: "Right to property", correct: false },
          { id: "d", text: "Right to freedom of religion", correct: false },
        ],
        explanation:
          "Every child has a right to identity, name, and nationality under Article 7 of the UNCRC and Article 21 of the Indian Constitution. Birth registration is crucial for access to education and social welfare. Denying this documentation violates her fundamental rights.",
        punishment:
          "Denying a child's right to identity prevents access to basic rights and welfare. Authorities must immediately provide birth certificate and necessary documentation.",
        timeLimit: 30,
        scenarioType: "cr-right-to-identity",
      },
      5: {
        title: "Right to Nutrition and Health",
        scenario:
          "Children in a government school are not given midday meals for weeks, and many fall sick due to hunger. The school administrator diverts the funds for other purposes.",
        question: "Which right is being violated?",
        options: [
          { id: "a", text: "Right to health and nutrition under Article 21 (Right to Life)", correct: true },
          { id: "b", text: "Right to vote", correct: false },
          { id: "c", text: "Right to freedom of assembly", correct: false },
          { id: "d", text: "Right to property", correct: false },
        ],
        explanation:
          "The Mid-Day Meal Scheme and National Food Security Act, 2013 are meant to ensure children's right to adequate nutrition. The Supreme Court has held that Right to Life under Article 21 includes Right to Health and Nutrition. Neglecting this endangers children's wellbeing.",
        punishment:
          "Denying midday meals violates children's fundamental right to nutrition. Officials diverting funds face corruption charges. Children's health must be immediately restored.",
        timeLimit: 30,
        scenarioType: "cr-nutrition-health",
      },
      6: {
        title: "Child Marriage",
        scenario:
          "Fourteen-year-old Meena's parents arrange her marriage to a 25-year-old man, citing tradition and family honor. The wedding date is fixed for next month.",
        question: "What law protects Meena?",
        options: [
          { id: "a", text: "Prohibition of Child Marriage Act, 2006", correct: true },
          { id: "b", text: "Marriage Act of Adults Only, 2010", correct: false },
          { id: "c", text: "There's no law if both families agree", correct: false },
          { id: "d", text: "Only illegal for boys", correct: false },
        ],
        explanation:
          "Under the Prohibition of Child Marriage Act, 2006, marriage of girls below 18 and boys below 21 is prohibited. Such a marriage is voidable and punishable. It violates the Right to Protection, Education, and Health (Articles 21 & 39(f)) and UNCRC Article 19.",
        punishment:
          "Child marriage is a punishable offence that violates a child's rights to education, health, and protection. Parents and organizers face legal action. Meena must be protected.",
        timeLimit: 30,
        scenarioType: "cr-child-marriage",
      },
      7: {
        title: "Right to Express Views",
        scenario:
          "During a school meeting about changing the school timings, students ask to give their opinion, but the principal says, 'Children don't get to decide. This is an adult matter.'",
        question: "What principle is being ignored?",
        options: [
          { id: "a", text: "Right to be heard and express views", correct: true },
          { id: "b", text: "Right to property", correct: false },
          { id: "c", text: "Right to religion", correct: false },
          { id: "d", text: "Right to travel abroad", correct: false },
        ],
        explanation:
          "Article 12 of the UNCRC states that children have the right to freely express their views in all matters affecting them, and their opinions should be considered. This principle promotes participation and respect for a child's dignity.",
        punishment:
          "Ignoring children's right to express views violates their dignity and participation rights. Schools should create forums for student voices to be heard and respected.",
        timeLimit: 30,
        scenarioType: "cr-express-views",
      },
      8: {
        title: "Child Trafficking",
        scenario:
          "A man offers jobs to poor children from a village and transports them to another city for forced labour in a factory. Families believe their children will earn and study.",
        question: "What law is violated here?",
        options: [
          { id: "a", text: "Immoral Traffic (Prevention) Act, 1956 and IPC Sections 370–371", correct: true },
          { id: "b", text: "RTE Act, 2009", correct: false },
          { id: "c", text: "Juvenile Justice Act, 2015", correct: false },
          { id: "d", text: "Right to Privacy", correct: false },
        ],
        explanation:
          "Trafficking of children for labour, begging, or prostitution is a grave offence under Sections 370–371 IPC and Immoral Traffic (Prevention) Act, 1956. It also violates Article 23 of the Constitution (prohibition of trafficking and forced labour) and UNCRC Articles 34–36.",
        punishment:
          "Child trafficking is a heinous crime with severe penalties including life imprisonment. Children must be rescued immediately and traffickers prosecuted.",
        timeLimit: 30,
        scenarioType: "cr-child-trafficking",
      },
      9: {
        title: "Right to Shelter and Care",
        scenario:
          "After a natural disaster, several orphaned children are left without food or shelter. Local authorities take no action for weeks, leaving children to fend for themselves.",
        question: "Who is responsible for ensuring their protection?",
        options: [
          { id: "a", text: "NGOs only", correct: false },
          { id: "b", text: "The State under the Juvenile Justice (Care and Protection of Children) Act, 2015", correct: true },
          { id: "c", text: "Only their relatives", correct: false },
          { id: "d", text: "None — disasters are exceptions", correct: false },
        ],
        explanation:
          "The Juvenile Justice (Care and Protection of Children) Act, 2015 mandates that the State must provide shelter, food, and rehabilitation to children in need of care and protection. Neglecting this violates Article 21 (Right to Life) and UNCRC Article 20.",
        punishment:
          "State negligence in protecting orphaned children violates fundamental rights. Authorities must immediately provide shelter, food, and care under JJ Act, 2015.",
        timeLimit: 30,
        scenarioType: "cr-shelter-care",
      },
      10: {
        title: "Right to Protection from Cyberbullying",
        scenario:
          "A 15-year-old student, Ananya, is being bullied and body-shamed on social media by classmates. The school authorities ignore her complaint saying 'it's just online talk.'",
        question: "What rights are being violated?",
        options: [
          { id: "a", text: "Right to privacy, safety, and dignity under Article 21 and IT Act, 2000", correct: true },
          { id: "b", text: "Right to vote", correct: false },
          { id: "c", text: "Right to equality in sports only", correct: false },
          { id: "d", text: "No legal remedy for online bullying", correct: false },
        ],
        explanation:
          "Cyberbullying violates a child's right to privacy and dignity under Article 21. Sections 66E and 67B of the IT Act, 2000 and the POCSO Act, 2012 protect minors from online abuse or exploitation. Schools have a duty to ensure a safe environment (per CBSE and NCERT guidelines).",
        punishment:
          "Cyberbullying is a serious violation of a child's rights. Schools must act immediately. Perpetrators can face legal action under IT Act and POCSO Act.",
        timeLimit: 30,
        scenarioType: "cr-cyberbullying",
      },
    },
  },
  "family-marriage-laws": {
    title: "Family & Marriage Laws",
    levels: {
      1: {
        title: "Legal Age for Marriage",
        scenario:
          "Ravi (20) and Priya (17) decide to marry without informing their parents. They conduct the ceremony in a temple with friends as witnesses.",
        question: "Is their marriage valid under Indian law?",
        options: [
          { id: "a", text: "Yes, since both consented", correct: false },
          { id: "b", text: "No, as Priya is below 18", correct: true },
          { id: "c", text: "Yes, if parents approve later", correct: false },
          { id: "d", text: "Valid only under Muslim law", correct: false },
        ],
        explanation:
          "Under the Prohibition of Child Marriage Act, 2006, the legal marriage age is 21 for males and 18 for females. Marrying below that age makes the marriage voidable and punishable.",
        punishment:
          "The marriage is voidable under law. Priya being below 18 makes this a child marriage, which is punishable under the Prohibition of Child Marriage Act, 2006.",
        timeLimit: 30,
        scenarioType: "fm-legal-age",
      },
      2: {
        title: "Registration of Marriage",
        scenario:
          "Anjali and Suresh, both Hindus, marry according to Hindu rituals but do not register their marriage. Later, Suresh denies the marriage in court.",
        question: "What protects Anjali's rights?",
        options: [
          { id: "a", text: "Hindu Marriage Act, 1955", correct: true },
          { id: "b", text: "Special Marriage Act, 1954", correct: false },
          { id: "c", text: "There's no protection without registration", correct: false },
          { id: "d", text: "Domestic Violence Act, 2005", correct: false },
        ],
        explanation:
          "Under the Hindu Marriage Act, 1955, a marriage solemnized as per Hindu rituals is legally valid even without registration, though registration provides stronger legal proof.",
        punishment:
          "Without registration, proving marriage becomes difficult. While the marriage is valid under Hindu Marriage Act, registration provides crucial legal documentation and protection.",
        timeLimit: 30,
        scenarioType: "fm-registration",
      },
      3: {
        title: "Inter-Religious Marriage",
        scenario:
          "Rahul, a Hindu, and Fathima, a Muslim, want to marry without converting religions. They face family opposition and need legal protection.",
        question: "Which law allows their marriage?",
        options: [
          { id: "a", text: "Hindu Marriage Act, 1955", correct: false },
          { id: "b", text: "Muslim Personal Law", correct: false },
          { id: "c", text: "Special Marriage Act, 1954", correct: true },
          { id: "d", text: "Indian Divorce Act, 1869", correct: false },
        ],
        explanation:
          "The Special Marriage Act, 1954 allows individuals of different religions or faiths to marry without conversion. It provides for civil marriage, registration, and rights of inheritance and divorce.",
        punishment:
          "Without legal marriage under Special Marriage Act, the couple lacks legal protection and recognition. This can affect inheritance, custody, and other marital rights.",
        timeLimit: 30,
        scenarioType: "fm-inter-religious",
      },
      4: {
        title: "Domestic Violence in Marriage",
        scenario:
          "Ritu's husband verbally abuses and threatens her daily. She wants protection but doesn't want to file for divorce yet. She fears escalation.",
        question: "What law helps her?",
        options: [
          { id: "a", text: "Protection of Women from Domestic Violence Act, 2005", correct: true },
          { id: "b", text: "Hindu Marriage Act, 1955", correct: false },
          { id: "c", text: "Indian Penal Code only", correct: false },
          { id: "d", text: "Family Court Act, 1984", correct: false },
        ],
        explanation:
          "The Protection of Women from Domestic Violence Act, 2005 protects women from physical, verbal, emotional, sexual, and economic abuse. It allows her to seek protection, residence, and maintenance orders without divorce.",
        punishment:
          "Without legal intervention, domestic violence can escalate. PWDVA 2005 provides immediate protection orders, residence rights, and maintenance without requiring divorce proceedings.",
        timeLimit: 30,
        scenarioType: "fm-domestic-violence",
      },
      5: {
        title: "Divorce by Mutual Consent",
        scenario:
          "After three years of marriage, Meera and Rohan decide to separate peacefully and mutually agree to divorce. They have no children.",
        question: "Under which law can they file for mutual consent divorce?",
        options: [
          { id: "a", text: "Hindu Marriage Act, 1955 – Section 13B", correct: false },
          { id: "b", text: "Indian Penal Code", correct: false },
          { id: "c", text: "Special Marriage Act, 1954 – Section 28", correct: false },
          { id: "d", text: "Both A and C", correct: true },
        ],
        explanation:
          "Both Hindu Marriage Act (Section 13B) and Special Marriage Act (Section 28) provide for mutual consent divorce if both parties agree and have lived separately for at least one year.",
        punishment:
          "Without proper legal divorce, remarriage becomes invalid. Mutual consent divorce under proper laws ensures clean legal separation and protects future rights.",
        timeLimit: 30,
        scenarioType: "fm-mutual-divorce",
      },
      6: {
        title: "Maintenance After Divorce",
        scenario:
          "After divorce, Sunita has no income and seeks financial support from her ex-husband who refuses to provide any assistance.",
        question: "Which provision supports her?",
        options: [
          { id: "a", text: "Section 125 of CrPC (Criminal Procedure Code)", correct: true },
          { id: "b", text: "Indian Divorce Act only", correct: false },
          { id: "c", text: "Only if she remarries", correct: false },
          { id: "d", text: "None, since divorce ends all rights", correct: false },
        ],
        explanation:
          "Section 125 of the CrPC provides for maintenance to wives, children, and parents who cannot maintain themselves, even after divorce, ensuring social justice and preventing destitution.",
        punishment:
          "Denying maintenance after divorce violates Section 125 CrPC. Courts can order monthly maintenance to prevent financial hardship and ensure dignified living.",
        timeLimit: 30,
        scenarioType: "fm-maintenance",
      },
      7: {
        title: "Right to Inheritance",
        scenario:
          "Asha's father dies without a will. Her brothers deny her share in property saying, 'Girls don't inherit.' They refuse to include her in property division.",
        question: "What law protects Asha's rights?",
        options: [
          { id: "a", text: "Hindu Succession Act, 1956 (Amendment 2005)", correct: true },
          { id: "b", text: "Indian Penal Code", correct: false },
          { id: "c", text: "Special Marriage Act", correct: false },
          { id: "d", text: "Guardians and Wards Act", correct: false },
        ],
        explanation:
          "The Hindu Succession (Amendment) Act, 2005 grants equal inheritance rights to daughters in ancestral property, just like sons. Gender-based discrimination in inheritance is illegal.",
        punishment:
          "Denying a daughter's inheritance rights violates Hindu Succession Act 2005. Asha has equal coparcenary rights and can seek legal partition of property.",
        timeLimit: 30,
        scenarioType: "fm-inheritance",
      },
      8: {
        title: "Adoption of a Child",
        scenario:
          "A married Hindu couple wants to adopt a child legally to provide them with a loving home and all legal rights.",
        question: "Which law governs adoption for Hindus?",
        options: [
          { id: "a", text: "Hindu Adoption and Maintenance Act, 1956", correct: true },
          { id: "b", text: "Special Marriage Act, 1954", correct: false },
          { id: "c", text: "Juvenile Justice Act, 2015", correct: false },
          { id: "d", text: "Muslim Personal Law", correct: false },
        ],
        explanation:
          "The Hindu Adoption and Maintenance Act, 1956 allows legal adoption by Hindus, Buddhists, Jains, and Sikhs. It gives the adopted child the same rights as a biological child in inheritance and family status.",
        punishment:
          "Without legal adoption, the child lacks inheritance and family rights. Proper adoption under Hindu Adoption Act ensures full legal status and protection.",
        timeLimit: 30,
        scenarioType: "fm-adoption",
      },
      9: {
        title: "Custody of Children",
        scenario:
          "After divorce, both parents want custody of their 7-year-old son. The father earns more, but the child prefers to stay with the mother.",
        question: "Who decides custody in such cases?",
        options: [
          { id: "a", text: "The father automatically", correct: false },
          { id: "b", text: "The mother automatically", correct: false },
          { id: "c", text: "The Family Court, considering the child's welfare", correct: true },
          { id: "d", text: "The police department", correct: false },
        ],
        explanation:
          "Under the Guardians and Wards Act, 1890 and Hindu Minority and Guardianship Act, 1956, custody is decided by the Family Court based on the best interest and welfare of the child, not parental income or gender.",
        punishment:
          "Custody battles must prioritize child welfare. Courts consider the child's preference, emotional bonds, and overall wellbeing over financial status or gender.",
        timeLimit: 30,
        scenarioType: "fm-custody",
      },
      10: {
        title: "Bigamy and Second Marriage",
        scenario:
          "Rajesh, already married, secretly marries another woman without divorcing his first wife. His first wife discovers the second marriage.",
        question: "Is this legal under Hindu law?",
        options: [
          { id: "a", text: "Yes, if both wives agree", correct: false },
          { id: "b", text: "No, it is punishable under IPC Section 494", correct: true },
          { id: "c", text: "Yes, if performed privately", correct: false },
          { id: "d", text: "Legal only in certain states", correct: false },
        ],
        explanation:
          "Under the Hindu Marriage Act, 1955, monogamy is mandatory. A second marriage while the first is valid amounts to bigamy, punishable under Section 494 of the Indian Penal Code with imprisonment up to 7 years.",
        punishment:
          "Bigamy is a criminal offence under IPC Section 494. The second marriage is void, and Rajesh faces imprisonment. The first wife can seek legal remedies.",
        timeLimit: 30,
        scenarioType: "fm-bigamy",
      },
      11: {
        title: "Dowry Demand",
        scenario:
          "Neha's in-laws demand a car and cash after marriage, threatening her with harm if demands are not met. Her parents feel pressured to comply.",
        question: "Which law protects Neha?",
        options: [
          { id: "a", text: "Dowry Prohibition Act, 1961", correct: true },
          { id: "b", text: "Hindu Marriage Act, 1955", correct: false },
          { id: "c", text: "Special Marriage Act, 1954", correct: false },
          { id: "d", text: "Indian Penal Code only", correct: false },
        ],
        explanation:
          "The Dowry Prohibition Act, 1961 makes giving, taking, or demanding dowry a criminal offence. It upholds women's dignity and safety in marriage and complements Section 498A IPC (Cruelty by Husband or Relatives).",
        punishment:
          "Dowry demands are criminal offences under Dowry Prohibition Act 1961 and Section 498A IPC. In-laws can face imprisonment, and Neha has legal protection.",
        timeLimit: 30,
        scenarioType: "fm-dowry",
      },
      12: {
        title: "Live-in Relationships",
        scenario:
          "A couple has been living together for 5 years without marriage. The woman faces domestic violence from her partner who denies any responsibility.",
        question: "Can she seek legal protection?",
        options: [
          { id: "a", text: "Yes, under the Domestic Violence Act, 2005", correct: true },
          { id: "b", text: "No, as they are not married", correct: false },
          { id: "c", text: "Only if they have children", correct: false },
          { id: "d", text: "Only if registered", correct: false },
        ],
        explanation:
          "The Protection of Women from Domestic Violence Act, 2005 includes live-in relationships under 'relationship in the nature of marriage.' Such women can claim protection, residence, and maintenance rights.",
        punishment:
          "Live-in partners are protected under PWDVA 2005. Domestic violence in any relationship is punishable, and women can seek protection orders regardless of marital status.",
        timeLimit: 30,
        scenarioType: "fm-livein",
      },
    },
  },
  "educational-rights": {
    title: "Educational Rights",
    levels: {
      1: {
        title: "Right to Free and Compulsory Education",
        scenario:
          "An 8-year-old girl from a poor family is denied admission to a nearby government school because her parents can't pay a donation.",
        question: "Which right is being violated?",
        options: [
          { id: "a", text: "Right to Education under Article 21-A and RTE Act, 2009", correct: true },
          { id: "b", text: "Right to Property", correct: false },
          { id: "c", text: "Right to Vote", correct: false },
          { id: "d", text: "Right to Privacy", correct: false },
        ],
        explanation:
          "Under Article 21-A and the Right of Children to Free and Compulsory Education (RTE) Act, 2009, every child aged 6–14 years has a fundamental right to free education. Schools cannot charge donations or capitation fees for admission.",
        punishment:
          "Denying admission or charging donations violates the RTE Act, 2009. Schools can face penalties and cancellation of recognition for demanding capitation fees.",
        timeLimit: 30,
        scenarioType: "edu-free-admission",
      },
      2: {
        title: "Non-Discrimination in School Admission",
        scenario:
          "Mohammed, a 10-year-old boy, is denied admission to a school because of his religion.",
        question: "Which law protects him?",
        options: [
          { id: "a", text: "Article 15 of the Constitution", correct: true },
          { id: "b", text: "Article 21-A only", correct: false },
          { id: "c", text: "None — private schools can choose students", correct: false },
          { id: "d", text: "Education Policy 2020", correct: false },
        ],
        explanation:
          "Article 15 of the Indian Constitution prohibits discrimination on grounds of religion, caste, race, sex, or place of birth. All schools, including private ones, must treat students equally. Denying admission on religious grounds is unconstitutional.",
        punishment:
          "Religious discrimination in admission violates Article 15 and the RTE Act. Schools can face legal action and loss of recognition for discriminatory practices.",
        timeLimit: 30,
        scenarioType: "edu-discrimination",
      },
      3: {
        title: "Right to Free Education in Private Schools",
        scenario:
          "Rekha's parents earn below the poverty line (BPL). A private school refuses to admit her under the free education quota.",
        question: "What provision protects her?",
        options: [
          { id: "a", text: "Section 12(1)(c) of the RTE Act, 2009", correct: true },
          { id: "b", text: "Only government schools offer free seats", correct: false },
          { id: "c", text: "NEP 2020 policy only", correct: false },
          { id: "d", text: "Article 19(1)(a)", correct: false },
        ],
        explanation:
          "Section 12(1)(c) of the RTE Act, 2009 mandates private schools to reserve 25% seats for children from economically weaker sections (EWS) and disadvantaged groups, with government reimbursement.",
        punishment:
          "Private schools refusing to admit EWS/DG children under the 25% quota violate the RTE Act and can face penalties, fines, and loss of recognition.",
        timeLimit: 30,
        scenarioType: "edu-ews-quota",
      },
      4: {
        title: "Corporal Punishment",
        scenario:
          "A teacher slaps a student in class for scoring low marks.",
        question: "Is this allowed under Indian law?",
        options: [
          { id: "a", text: "Yes, to discipline children", correct: false },
          { id: "b", text: "No, corporal punishment is banned under RTE Act, 2009", correct: true },
          { id: "c", text: "Only allowed with parental consent", correct: false },
          { id: "d", text: "Only banned in private schools", correct: false },
        ],
        explanation:
          "Section 17(1) of the RTE Act, 2009 prohibits physical punishment and mental harassment of children. Every child has a right to dignity, respect, and a safe learning environment.",
        punishment:
          "Corporal punishment is banned under RTE Act Section 17(1). Teachers engaging in physical or mental abuse can face disciplinary action, termination, and criminal prosecution.",
        timeLimit: 30,
        scenarioType: "edu-corporal-punishment",
      },
      5: {
        title: "Right to Quality Education",
        scenario:
          "A government school lacks basic facilities like toilets, safe drinking water, and qualified teachers.",
        question: "Which right is being violated?",
        options: [
          { id: "a", text: "Right to quality education under RTE Act", correct: true },
          { id: "b", text: "Right to freedom of speech", correct: false },
          { id: "c", text: "Right to property", correct: false },
          { id: "d", text: "Right to vote", correct: false },
        ],
        explanation:
          "The RTE Act, 2009 (Sections 19 and 25) sets minimum infrastructure and teacher-student ratio norms. Lack of facilities violates a child's Right to Quality Education, which is part of Article 21 (Right to Life with Dignity).",
        punishment:
          "Schools failing to meet infrastructure norms violate RTE Act Sections 19 and 25. Authorities can face penalties, and the State is liable to ensure proper facilities.",
        timeLimit: 30,
        scenarioType: "edu-quality-facilities",
      },
      6: {
        title: "Education for Children with Disabilities",
        scenario:
          "A school refuses to admit a child with a hearing impairment, saying they lack 'special teachers.'",
        question: "Which law is violated?",
        options: [
          { id: "a", text: "Rights of Persons with Disabilities (RPwD) Act, 2016", correct: true },
          { id: "b", text: "RTE Act, 2009 only", correct: false },
          { id: "c", text: "Only NEP 2020", correct: false },
          { id: "d", text: "None — school has no obligation", correct: false },
        ],
        explanation:
          "The RPwD Act, 2016 (Section 16) mandates inclusive education for children with disabilities. Schools must provide necessary support, infrastructure, and trained teachers to ensure equal learning opportunities.",
        punishment:
          "Denying admission to children with disabilities violates RPwD Act, 2016. Schools can face legal action and penalties for non-compliance with inclusive education norms.",
        timeLimit: 30,
        scenarioType: "edu-disability-rights",
      },
      7: {
        title: "Mid-Day Meals and Nutrition",
        scenario:
          "Students in a government school are not provided mid-day meals for a month, and several children fall sick due to hunger.",
        question: "Which right is violated?",
        options: [
          { id: "a", text: "Right to nutrition and education under Article 21", correct: true },
          { id: "b", text: "Right to religion", correct: false },
          { id: "c", text: "Right to property", correct: false },
          { id: "d", text: "None, since food isn't part of education", correct: false },
        ],
        explanation:
          "The Mid-Day Meal Scheme supports the Right to Life and Education (Article 21) by ensuring nutrition and attendance. Denying meals violates both children's Right to Health and Right to Education.",
        punishment:
          "Failure to provide mid-day meals violates Article 21 and the National Food Security Act. School authorities and officials can face penalties and disciplinary action.",
        timeLimit: 30,
        scenarioType: "edu-midday-meals",
      },
      8: {
        title: "Dropout Prevention",
        scenario:
          "Ramesh, 13, drops out of school to work in a garage. His teacher ignores the issue.",
        question: "What must the school do under the law?",
        options: [
          { id: "a", text: "Report to authorities and help re-enroll him", correct: true },
          { id: "b", text: "Ignore since it's a family matter", correct: false },
          { id: "c", text: "Only inform his parents", correct: false },
          { id: "d", text: "Nothing, as he chose to leave", correct: false },
        ],
        explanation:
          "Under the RTE Act, 2009 and Child Labour (Prohibition and Regulation) Act, 2016, schools and local authorities must identify and reintegrate dropouts into the education system. Child labour violates the Right to Education and Childhood.",
        punishment:
          "Ignoring child dropout and labour violates RTE Act and Child Labour Act. Schools and authorities must intervene, and employers engaging children can face prosecution.",
        timeLimit: 30,
        scenarioType: "edu-dropout-prevention",
      },
      9: {
        title: "Equality Between Boys and Girls",
        scenario:
          "A school conducts a science competition but allows only boys to participate.",
        question: "Which law ensures equal opportunity for girls?",
        options: [
          { id: "a", text: "Article 14 and 15 of the Constitution (Equality & Non-discrimination)", correct: true },
          { id: "b", text: "Article 32 only", correct: false },
          { id: "c", text: "RTE Act, 2009 (for boys only)", correct: false },
          { id: "d", text: "None", correct: false },
        ],
        explanation:
          "Articles 14 and 15 guarantee equality before law and prohibit gender-based discrimination. Education institutions must ensure equal access and participation for boys and girls.",
        punishment:
          "Gender discrimination in educational activities violates Articles 14 and 15. Schools can face legal action and loss of recognition for discriminatory practices.",
        timeLimit: 30,
        scenarioType: "edu-gender-equality",
      },
      10: {
        title: "Right to Language and Culture",
        scenario:
          "Students from a tribal community are forced to study in a language they don't understand, leading to poor learning outcomes.",
        question: "Which right is affected?",
        options: [
          { id: "a", text: "Right to education in mother tongue under NEP 2020", correct: true },
          { id: "b", text: "Right to religion", correct: false },
          { id: "c", text: "Right to property", correct: false },
          { id: "d", text: "Right to vote", correct: false },
        ],
        explanation:
          "The National Education Policy (NEP) 2020 recommends teaching in mother tongue or regional language up to Grade 5 to ensure better learning. Denying linguistic inclusion violates the Right to Education and Culture (Article 29).",
        punishment:
          "Denying education in mother tongue violates Article 29 and NEP 2020 guidelines. Schools must provide multi-lingual education to protect cultural and linguistic rights.",
        timeLimit: 30,
        scenarioType: "edu-mother-tongue",
      },
    },
  },
  "environmental-laws": {
    title: "Environmental Laws",
    levels: {
      1: {
        title: "Factory Pollution and Right to Life",
        scenario:
          "A factory near Rahul's village releases untreated chemical waste into the river, killing fish and contaminating drinking water.",
        question: "Which fundamental right is being violated?",
        options: [
          { id: "a", text: "Right to freedom of expression", correct: false },
          { id: "b", text: "Right to property", correct: false },
          { id: "c", text: "Right to life under Article 21", correct: true },
          { id: "d", text: "Right to privacy", correct: false },
        ],
        explanation:
          "The Supreme Court (in Subhash Kumar v. State of Bihar, 1991) held that the Right to Life under Article 21 includes the Right to a clean and pollution-free environment. The factory's actions violate the Water (Prevention and Control of Pollution) Act, 1974, and the villagers can seek remedy under environmental law.",
        punishment:
          "Ignoring factory pollution allows environmental damage to continue, harming public health and violating constitutional rights to clean water and air.",
        timeLimit: 30,
        scenarioType: "factory-pollution",
      },
      2: {
        title: "Cutting Trees Without Permission",
        scenario:
          "A construction company starts cutting hundreds of trees in a forest area for a new resort without government clearance.",
        question: "Which law regulates this activity?",
        options: [
          { id: "a", text: "Forest (Conservation) Act, 1980", correct: true },
          { id: "b", text: "Environment (Protection) Act, 1986", correct: false },
          { id: "c", text: "Wildlife (Protection) Act, 1972", correct: false },
          { id: "d", text: "Air (Prevention and Control of Pollution) Act, 1981", correct: false },
        ],
        explanation:
          "The Forest (Conservation) Act, 1980 mandates that no forest land can be diverted for non-forest use without prior approval from the Central Government. Unauthorized tree cutting is illegal and punishable.",
        punishment:
          "Allowing illegal tree cutting destroys ecosystems, contributes to climate change, and violates forest conservation laws meant to protect biodiversity.",
        timeLimit: 30,
        scenarioType: "illegal-deforestation",
      },
      3: {
        title: "Air Pollution by Vehicles",
        scenario:
          "Priya notices dense smoke from diesel buses in her city. She complains to authorities but no action is taken.",
        question: "Which law covers this issue?",
        options: [
          { id: "a", text: "Air (Prevention and Control of Pollution) Act, 1981", correct: true },
          { id: "b", text: "Forest (Conservation) Act, 1980", correct: false },
          { id: "c", text: "Water Act, 1974", correct: false },
          { id: "d", text: "Wildlife Protection Act, 1972", correct: false },
        ],
        explanation:
          "The Air (Prevention and Control of Pollution) Act, 1981 empowers State Pollution Control Boards to monitor and control vehicular emissions. Citizens like Priya can file complaints, and authorities must enforce emission norms under this Act.",
        punishment:
          "Ignoring vehicular pollution worsens air quality, causing respiratory diseases and violating citizens' right to clean air under Article 21.",
        timeLimit: 30,
        scenarioType: "vehicular-pollution",
      },
      4: {
        title: "Plastic Waste Ban",
        scenario:
          "A grocery shop continues to use banned single-use plastic carry bags despite local prohibitions.",
        question: "Which law or rule applies here?",
        options: [
          { id: "a", text: "Plastic Waste Management Rules, 2016", correct: true },
          { id: "b", text: "Air Pollution Act, 1981", correct: false },
          { id: "c", text: "Forest Conservation Act, 1980", correct: false },
          { id: "d", text: "Wildlife Protection Act, 1972", correct: false },
        ],
        explanation:
          "The Plastic Waste Management Rules, 2016 (amended 2021) prohibit manufacturing, import, and use of single-use plastics. Violations can lead to fines under the Environment (Protection) Act, 1986.",
        punishment:
          "Continuing to use banned plastics contributes to non-biodegradable waste, harms wildlife, and pollutes soil and water bodies.",
        timeLimit: 30,
        scenarioType: "plastic-pollution",
      },
      5: {
        title: "Noise Pollution During Festivals",
        scenario:
          "A temple uses loudspeakers at midnight during festivals, disturbing nearby residents and hospitals.",
        question: "Which law controls such noise levels?",
        options: [
          { id: "a", text: "Environment (Protection) Act, 1986 and Noise Pollution Rules, 2000", correct: true },
          { id: "b", text: "Forest Act, 1980", correct: false },
          { id: "c", text: "Air Act, 1981", correct: false },
          { id: "d", text: "None — religious events are exempt", correct: false },
        ],
        explanation:
          "The Noise Pollution (Regulation and Control) Rules, 2000 issued under the Environment (Protection) Act, 1986 restrict loudspeaker use between 10 PM and 6 AM near hospitals, schools, and residential areas. Religious or cultural events are not exempt from these limits.",
        punishment:
          "Excessive noise pollution causes health issues including hearing loss, sleep disturbance, and stress, violating citizens' right to a peaceful environment.",
        timeLimit: 30,
        scenarioType: "noise-pollution",
      },
      6: {
        title: "Wildlife Poaching",
        scenario:
          "A group of hunters are caught killing deer in a national park.",
        question: "Which law makes this a punishable offence?",
        options: [
          { id: "a", text: "Wildlife (Protection) Act, 1972", correct: true },
          { id: "b", text: "Water Act, 1974", correct: false },
          { id: "c", text: "Forest Conservation Act, 1980", correct: false },
          { id: "d", text: "Plastic Waste Rules, 2016", correct: false },
        ],
        explanation:
          "The Wildlife (Protection) Act, 1972 prohibits the hunting, trading, or killing of animals listed in its schedules. Deer are protected species, and offenders can face imprisonment and heavy fines.",
        punishment:
          "Wildlife poaching disrupts ecosystems, threatens endangered species, and violates conservation laws designed to protect India's biodiversity.",
        timeLimit: 30,
        scenarioType: "wildlife-poaching",
      },
      7: {
        title: "Industrial Smoke and Air Quality",
        scenario:
          "An industry releases black smoke daily without installing air filters, affecting nearby residents' health.",
        question: "Which law holds the factory accountable?",
        options: [
          { id: "a", text: "Air (Prevention and Control of Pollution) Act, 1981", correct: true },
          { id: "b", text: "Water Act, 1974", correct: false },
          { id: "c", text: "Forest Act, 1980", correct: false },
          { id: "d", text: "Wildlife Act, 1972", correct: false },
        ],
        explanation:
          "Under the Air (Prevention and Control of Pollution) Act, 1981, factories must use pollution control equipment and obtain consent from the State Pollution Control Board. Continuous emission without control violates the Act and Article 21 (Right to Clean Air).",
        punishment:
          "Industrial air pollution causes respiratory diseases, reduces life expectancy, and violates the constitutional right to live in a pollution-free environment.",
        timeLimit: 30,
        scenarioType: "industrial-pollution",
      },
      8: {
        title: "Dumping Garbage in Public Areas",
        scenario:
          "A housing society regularly dumps solid waste in an open plot instead of segregating and disposing it properly.",
        question: "Which rule governs this activity?",
        options: [
          { id: "a", text: "Solid Waste Management Rules, 2016", correct: true },
          { id: "b", text: "Plastic Waste Rules, 2016", correct: false },
          { id: "c", text: "Forest Act, 1980", correct: false },
          { id: "d", text: "Water Pollution Act, 1974", correct: false },
        ],
        explanation:
          "The Solid Waste Management Rules, 2016 make segregation at source (wet, dry, and hazardous) mandatory. Local bodies and citizens must ensure safe disposal. Dumping in open areas is illegal and punishable under the Environment (Protection) Act, 1986.",
        punishment:
          "Improper waste disposal breeds diseases, contaminates soil and groundwater, and creates unsanitary conditions violating public health standards.",
        timeLimit: 30,
        scenarioType: "waste-dumping",
      },
      9: {
        title: "Citizen's Duty Toward Environment",
        scenario:
          "Rohit burns plastic waste in his backyard, releasing toxic fumes. His neighbor reminds him that it's against his legal duty as a citizen.",
        question: "Which article imposes a duty to protect the environment?",
        options: [
          { id: "a", text: "Article 51A(g)", correct: true },
          { id: "b", text: "Article 19(1)(a)", correct: false },
          { id: "c", text: "Article 32", correct: false },
          { id: "d", text: "Article 370", correct: false },
        ],
        explanation:
          "Article 51A(g) of the Constitution makes it a fundamental duty of every citizen to protect and improve the natural environment, including forests, lakes, rivers, and wildlife. Burning plastic pollutes air and violates this civic duty.",
        punishment:
          "Burning plastic releases carcinogenic dioxins and furans into the air, causing cancer and respiratory diseases while violating fundamental environmental duties.",
        timeLimit: 30,
        scenarioType: "burning-plastic",
      },
      10: {
        title: "Environmental Clearance for Projects",
        scenario:
          "A company starts constructing a power plant near a protected forest without getting prior environmental clearance.",
        question: "Which law requires obtaining such approval?",
        options: [
          { id: "a", text: "Environment (Protection) Act, 1986 and EIA Notification, 2006", correct: true },
          { id: "b", text: "Air Act, 1981", correct: false },
          { id: "c", text: "Wildlife Act, 1972", correct: false },
          { id: "d", text: "Forest Act, 1980", correct: false },
        ],
        explanation:
          "Under the Environment Impact Assessment (EIA) Notification, 2006, issued under the Environment (Protection) Act, 1986, large industrial projects must get prior environmental clearance. Skipping this process is illegal and punishable.",
        punishment:
          "Building projects without environmental clearance can destroy ecosystems, displace wildlife, and cause irreversible environmental damage violating multiple protection laws.",
        timeLimit: 30,
        scenarioType: "eia-violation",
      },
    },
  },
};
