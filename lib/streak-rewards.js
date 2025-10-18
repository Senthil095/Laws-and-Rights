// Daily Streak Rewards Configuration
export const STREAK_REWARDS = {
  1: { points: 5, description: "Welcome reward for logging in and learning today." },
  2: { points: 5, description: "Keep going! Consistency is key." },
  3: { badge: "Curious Citizen", description: "You've started your learning journey!" },
  4: { points: 5, description: "Small daily boost to stay active." },
  5: { points: 10, quote: true, description: "Inspirational quote from the Constitution." },
  6: { points: 5, description: "Small momentum reward." },
  7: { badge: "Law Explorer", xpBoost: true, description: "One full week of consistency!" },
  8: { points: 10, description: "Keep your streak alive." },
  9: { points: 10, description: "Justice never sleeps — neither do you." },
  10: { hintToken: 1, description: "Use for one free hint during a quiz." },
  11: { points: 10, description: "You're building discipline." },
  12: { points: 10, description: "Another small motivational push." },
  13: { points: 15, description: "Reward for persistence." },
  14: { badge: "Voice of Rights", description: "Two-week consistency milestone!" },
  15: { cosmetic: "stickman_color", description: "Personalize your learning avatar." },
  16: { points: 10, description: "Keep the learning streak burning." },
  17: { points: 15, description: "Your efforts are noticed." },
  18: { title: "Law Learner", description: "Reflects your commitment to justice." },
  19: { points: 10, description: "Small encouragement." },
  20: { badge: "Justice Seeker", points: 50, description: "A major 20-day milestone!" },
  21: { hintToken: 1, description: "Another quiz assist token." },
  22: { points: 10, description: "Stay sharp." },
  23: { points: 15, description: "Law mastery in progress." },
  24: { fact: true, description: "A quick daily learning fact." },
  25: { points: 25, description: "Quarter to 100 — great job!" },
  26: { points: 10, description: "Your streak inspires justice." },
  27: { points: 10, description: "Don't break the chain." },
  28: { badge: "Legal Detective", description: "Four weeks of continuous learning!" },
  29: { points: 15, description: "Stay informed, stay right." },
  30: { badge: "Guardian of Rights", points: 50, golden: true, description: "1 Month Complete!" },
  31: { hintToken: 1, description: "Bonus help for your quizzes." },
  32: { points: 10, description: "The journey continues." },
  33: { points: 10, description: "You're building awareness." },
  34: { theme: "quiz_theme", description: "Visual theme reward." },
  35: { points: 15, description: "Power-up bonus." },
  36: { badge: "Law Challenger", description: "You're facing complex laws now!" },
  37: { points: 10, description: "Keep the fire burning." },
  38: { points: 10, description: "Small streak motivator." },
  39: { fact: true, description: "Educational boost." },
  40: { points: 40, title: "Rights Defender", description: "Amazing 40-day mark!" },
  41: { hintToken: 1, description: "Bonus token for your journey." },
  42: { points: 15, description: "Learning through consistency." },
  43: { theme: "background", description: "Personalization reward." },
  44: { points: 10, description: "Keep your pace steady." },
  45: { badge: "Legal Scholar", description: "You're becoming an expert!" },
  46: { points: 10, description: "Continue your progress." },
  47: { points: 10, description: "Keep your momentum high." },
  48: { xpBoost: true, description: "Bonus multiplier for quizzes today." },
  49: { points: 20, description: "Approaching halfway!" },
  50: { badge: "Justice Ambassador", points: 100, celebration: true, description: "Halfway Celebration! 🎉" },
  51: { hintToken: 1, description: "Redeemable for difficult levels." },
  52: { points: 15, description: "Keep defending your rights." },
  53: { points: 15, description: "Maintain that spirit!" },
  54: { fact: true, exclusive: true, description: "Hidden gem of the Indian Constitution." },
  55: { badge: "Equality Guardian", description: "Symbol of persistence & equality." },
  56: { points: 20, description: "Power reward." },
  57: { cosmetic: "avatar_accessory", description: "Customize your character." },
  58: { points: 10, description: "You're in the elite learners zone." },
  59: { points: 15, description: "The streak continues!" },
  60: { badge: "Law Champion", points: 100, description: "60 Days — Exceptional work!" },
  61: { hintToken: 1, description: "Bonus support for tough quizzes." },
  62: { points: 20, description: "Keep your rhythm steady." },
  63: { points: 20, description: "Motivation reward." },
  64: { quote: true, description: "Daily inspiration." },
  65: { title: "Justice Enthusiast", description: "Recognition of ongoing effort." },
  66: { points: 25, description: "You're inspiring others." },
  67: { theme: "quiz_variant", description: "Fresh look for your game." },
  68: { points: 15, description: "Continue learning." },
  69: { points: 15, description: "Good energy day!" },
  70: { badge: "Protector of Rights", points: 150, description: "10 weeks streak!" },
  71: { hintToken: 1, description: "Reward for commitment." },
  72: { points: 20, description: "Don't stop now!" },
  73: { quote: true, description: "Learn through inspiration." },
  74: { points: 15, description: "Keeping your flame alive." },
  75: { badge: "People's Defender", points: 100, legend: true, description: "75 Days — Legend! 🔥" },
  76: { points: 25, description: "Almost there!" },
  77: { cosmetic: "badge_style", description: "Cosmetic upgrade." },
  78: { points: 20, description: "Final stretch begins." },
  79: { fact: true, description: "Keep your knowledge sharp." },
  80: { badge: "Law Master", points: 150, description: "You're now a law master!" },
  81: { hintToken: 1, description: "Bonus reward for persistence." },
  82: { points: 20, description: "Only 18 days left!" },
  83: { points: 20, description: "Keep going strong." },
  84: { cosmetic: "profile_frame", description: "Prestige cosmetic." },
  85: { title: "Voice of Justice", description: "Recognition of long-term dedication." },
  86: { points: 25, description: "You're nearly invincible!" },
  87: { points: 20, description: "Power-up streak." },
  88: { fact: true, description: "Educational mini reward." },
  89: { points: 25, description: "Keep your spirit high." },
  90: { badge: "Champion of Constitution", points: 200, celebration: true, description: "3-Month Achievement! 🇮🇳" },
  91: { hintToken: 1, description: "Continue your learning." },
  92: { points: 25, description: "Nearing the finish line." },
  93: { points: 25, description: "Reward for persistence." },
  94: { cosmetic: "golden_avatar", description: "Ultimate personalization." },
  95: { title: "Justice Legend", description: "Honor for near 100-day completion." },
  96: { points: 30, description: "Almost there!" },
  97: { quote: true, description: "Motivation for the final days." },
  98: { points: 40, description: "Keep your focus." },
  99: { badge: "Supreme Learner", points: 150, description: "Final push before 100!" },
  100: { badge: "Guardian of Justice", points: 500, ultimate: true, animation: true, description: "You've completed the 100-day journey — you are the embodiment of justice! ⚖️✨" }
}

// Constitutional quotes for rewards
export const CONSTITUTION_QUOTES = [
  "Justice, Liberty, Equality, Fraternity - The pillars of our Republic.",
  "We, the people of India, having solemnly resolved to constitute India into a sovereign socialist secular democratic republic.",
  "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
  "The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them.",
  "All persons are equal before the law and are entitled to equal protection of the laws.",
  "Freedom of speech and expression is the soul of democracy.",
  "Education is a fundamental right - it opens doors to justice and opportunity.",
  "The Constitution is not a mere lawyer's document; it is a vehicle of life.",
  "Rights without duties are like a body without soul.",
  "Justice delayed is justice denied - Know your rights, claim them swiftly."
]

// Legal facts for rewards
export const LEGAL_FACTS = [
  "India's Constitution is the longest written constitution of any country in the world.",
  "The Right to Education Act makes education a fundamental right for children aged 6-14.",
  "Article 21 protects the Right to Life and Personal Liberty - the most important fundamental right.",
  "India abolished untouchability through Article 17 of the Constitution.",
  "The Supreme Court has the power of judicial review to protect fundamental rights.",
  "Every citizen has the right to approach the Supreme Court for enforcement of fundamental rights.",
  "The Constitution provides for six fundamental rights to all citizens.",
  "Dr. B.R. Ambedkar is known as the Father of the Indian Constitution.",
  "The Preamble to our Constitution declares India as a Sovereign, Socialist, Secular, Democratic Republic.",
  "The Right to Information Act (2005) empowers citizens to question authorities and fight corruption."
]

// Get reward for specific day
export function getRewardForDay(day) {
  return STREAK_REWARDS[day] || null
}

// Get reward display text
export function getRewardDisplayText(reward) {
  if (!reward) return ""
  
  let text = ""
  
  if (reward.points) {
    text += `+${reward.points} Points`
  }
  
  if (reward.badge) {
    if (text) text += " + "
    const prefix = reward.golden ? "🏅 " : reward.ultimate ? "👑 " : "🏅 "
    text += `${prefix}"${reward.badge}" Badge`
  }
  
  if (reward.title) {
    if (text) text += " + "
    text += `⚖️ "${reward.title}" Title`
  }
  
  if (reward.hintToken) {
    if (text) text += " + "
    text += `🎁 ${reward.hintToken} AI Hint Token${reward.hintToken > 1 ? 's' : ''}`
  }
  
  if (reward.cosmetic) {
    if (text) text += " + "
    text += `🎨 Unlock: ${formatCosmetic(reward.cosmetic)}`
  }
  
  if (reward.theme) {
    if (text) text += " + "
    text += `🧭 Theme Unlock: ${formatCosmetic(reward.theme)}`
  }
  
  if (reward.xpBoost) {
    if (text) text += " + "
    text += "🪄 XP Boost"
  }
  
  if (reward.quote) {
    if (text) text += " + "
    text += "💬 Justice Quote"
  }
  
  if (reward.fact) {
    if (text) text += " + "
    text += reward.exclusive ? "💎 Exclusive Legal Fact" : "💬 Legal Fact"
  }
  
  return text || "Keep Learning!"
}

function formatCosmetic(cosmetic) {
  return cosmetic.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

// Get random quote
export function getRandomQuote() {
  return CONSTITUTION_QUOTES[Math.floor(Math.random() * CONSTITUTION_QUOTES.length)]
}

// Get random fact
export function getRandomFact() {
  return LEGAL_FACTS[Math.floor(Math.random() * LEGAL_FACTS.length)]
}

// Check if reward has special animation
export function hasSpecialAnimation(day) {
  const reward = STREAK_REWARDS[day]
  return reward?.celebration || reward?.ultimate || reward?.animation || false
}

// Get milestone days
export function getMilestoneDays() {
  return [7, 14, 20, 30, 50, 60, 70, 75, 80, 90, 100]
}

// Check if day is milestone
export function isMilestone(day) {
  return getMilestoneDays().includes(day)
}
