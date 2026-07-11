export const profile = {
  name: "Aryan",
  ageStarted: 15,
  role: "Builder, Author & Founder",
  company: "ExamCodes.site",
  companyUrl: "https://examcodes.site",
  descriptor: "Building AI systems, writing fiction, and shipping infrastructure since age 15.",
};

export const navigation = [
  { label: "Aryan", href: "#top" },
  { label: "Works", href: "#projects" },
  { label: "Book", href: "#book" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Archive", href: "#archive" },
];

export const product = {
  name: "ExamCodes",
  url: "https://examcodes.site",
  category: "Digital study marketplace",
  audience: "JEE, NEET & CBSE learners",
  promise: "Verified, direct access to premium study resources.",
  summary:
    "ExamCodes is a digital study marketplace for JEE, NEET and CBSE resources. Its interface is designed around direct discovery, secure access and a clear verified-delivery record.",
  systems: ["JEE", "NEET", "CBSE"],
};

export type Project = {
  id: string;
  index: string;
  name: string;
  category: string;
  year: string;
  description: string;
  status: "Shipped" | "Live" | "Written" | "In Progress";
  tone: "warm" | "cold";
};

export const projects: Project[] = [
  {
    id: "kronos",
    index: "01",
    name: "Kronos AI",
    category: "SYSTEM",
    year: "15–17",
    description: "A macOS voice assistant with full system access. Plays songs, writes scripts, opens terminals, reads files, sorts desktops, browses the web, and logs into sites — all by voice. Wake word: 'Hey Kronos.' Built to feel like Jarvis.",
    status: "Shipped",
    tone: "cold",
  },
  {
    id: "atmadarshan",
    index: "02",
    name: "Atmadarshan",
    category: "SYSTEM",
    year: "16–17",
    description: "An AI that mirrors its creator — voice, speaking style, nature, presence. 'Atmadarshan' means seeing the self. A digital reflection built to understand what it means to sound like you.",
    status: "Shipped",
    tone: "warm",
  },
  {
    id: "examcodes",
    index: "03",
    name: "ExamCodes.site",
    category: "MARKETPLACE",
    year: "17",
    description: "A digital study marketplace for JEE, NEET and CBSE learners. Verified resources, secure access, and a delivery system that shows its work.",
    status: "Live",
    tone: "cold",
  },
  {
    id: "examcodesbot",
    index: "04",
    name: "ExamCodesBot",
    category: "COMMERCE",
    year: "17",
    description: "A Telegram bot handling payments, purchases, organization, group chats, 24/7 support, and instant admin access. The operational backbone of ExamCodes.",
    status: "Live",
    tone: "cold",
  },
  {
    id: "phonebot",
    index: "05",
    name: "Virtual Number Bot",
    category: "MIDDLEWARE",
    year: "16–17",
    description: "A Telegram middleware system selling virtual phone numbers. Handles transactions, routing, and delivery without exposing the underlying infrastructure.",
    status: "Shipped",
    tone: "cold",
  },
  {
    id: "novel",
    index: "06",
    name: "A Multi-Genre Novel",
    category: "CREATIVE",
    year: "17",
    description: "Time fiction, time loop, murder, love, adventure, betrayal, and paranormal activity — all in one book. Written at 17.",
    status: "Written",
    tone: "warm",
  },
];

export const proof = [
  { value: "15", label: "Age started building", detail: "When the first line of code was written" },
  { value: "06", label: "Projects shipped", detail: "AI systems, fiction, infrastructure, commerce" },
  { value: "03", label: "Languages fluent in", detail: "Python · HTML · Swift" },
  { value: "01", label: "Novel written", detail: "Multi-genre fiction at 17" },
];

export const caseStudy = [
  {
    number: "01",
    title: "Started at 15",
    copy: "Most people Aryan's age are still figuring out what they want to do. He started building AI systems, writing fiction, and shipping infrastructure before most people have decided.",
  },
  {
    number: "02",
    title: "Built across domains",
    copy: "AI assistants that mirror human presence. Commerce bots that handle payments and support. A marketplace for exam resources. A multi-genre novel. Each project taught something the others couldn't.",
  },
  {
    number: "03",
    title: "Fluent in systems",
    copy: "Python for AI and automation. Swift for macOS integration. HTML for the web. Cybersecurity as a lens for understanding how things break. The stack is a means, not an identity.",
  },
  {
    number: "04",
    title: "What comes next",
    copy: "The work now is to keep building, keep writing, keep learning. ExamCodes is one chapter. The novel is another. The next system is already forming.",
  },
];

export const architecture = [
  {
    id: "learner",
    index: "01",
    label: "Learner",
    detail: "The system begins with a JEE, NEET or CBSE learner looking for a useful study resource.",
  },
  {
    id: "catalog",
    index: "02",
    label: "Catalog",
    detail: "Resources are organized into an exam-focused marketplace rather than an undifferentiated content feed.",
  },
  {
    id: "access",
    index: "03",
    label: "Secure access",
    detail: "The interface frames the transaction as a verified protocol with explicit state and delivery language.",
  },
  {
    id: "record",
    index: "04",
    label: "Digital record",
    detail: "A receipt-like record confirms the item, status and delivery outcome in a form that can be understood at a glance.",
  },
  {
    id: "loop",
    index: "05",
    label: "Learning loop",
    detail: "Every live interaction becomes evidence for what should be clarified, rebuilt or expanded next.",
  },
];

export const evolution = [
  {
    code: "00",
    phase: "Question",
    title: "Start with a real problem",
    copy: "The project begins with the decision to make access to exam resources feel focused and intentional.",
    state: "Origin",
  },
  {
    code: "01",
    phase: "Identity",
    title: "Build a system, not a skin",
    copy: "Terminal marks, encoded typography and strict monochrome contrast create a recognizable ExamCodes language.",
    state: "Shipped",
  },
  {
    code: "02",
    phase: "Marketplace",
    title: "Put the product online",
    copy: "ExamCodes becomes a live destination for JEE, NEET and CBSE study resources.",
    state: "Live",
  },
  {
    code: "03",
    phase: "Trust",
    title: "Make delivery visible",
    copy: "The verified digital receipt turns the end of a transaction into a legible product moment.",
    state: "Verified",
  },
  {
    code: "04",
    phase: "Next",
    title: "Grow from evidence",
    copy: "Future chapters will be recorded when they are real: product shifts, learner milestones and new systems.",
    state: "In progress",
  },
];

export const decisions = [
  {
    type: "Refused",
    title: "A noisy marketplace aesthetic",
    copy: "The product avoids visual clutter and competing promotions. The interface behaves more like a controlled system than a crowded storefront.",
  },
  {
    type: "Built",
    title: "A protocol-led identity",
    copy: "The terminal mark, wide tracking and monochrome hierarchy make ExamCodes recognizable without decorative branding layers.",
  },
  {
    type: "Clarified",
    title: "The moment after access",
    copy: "A verified digital record communicates delivery, item details and status instead of ending on a vague success message.",
  },
];

export const lessons = [
  {
    number: "01",
    title: "Shipping teaches more than planning",
    copy: "The first version of every project is wrong in ways you can't predict. The only way to learn is to ship and observe.",
  },
  {
    number: "02",
    title: "Constraints create clarity",
    copy: "Python for AI. Swift for macOS. HTML for web. Each constraint forces decisions that make the system stronger.",
  },
  {
    number: "03",
    title: "Range is a feature",
    copy: "Building AI systems taught me what fiction required. Writing novels taught me what commerce demanded. Every domain informs the others.",
  },
];

export const founderLog = [
  {
    stamp: "CAPTURE / 28.05.26",
    title: "Verified delivery system documented",
    copy: "A captured product artifact shows an official digital receipt with item, status and delivery details.",
    status: "Recorded",
  },
  {
    stamp: "CURRENT CYCLE",
    title: "ExamCodes is live",
    copy: "The active focus is the product itself: its clarity, its learner experience and the quality of each release.",
    status: "Building",
  },
  {
    stamp: "NEXT ENTRY",
    title: "Publish only what is earned",
    copy: "User milestones, testimonials and growth numbers will enter this log when real figures are ready to be public.",
    status: "Pending",
  },
];

export const archive = [
  {
    volume: "VOL. 01",
    title: "Started at 15",
    copy: "The origin chapter: Aryan begins building AI systems, writing fiction, and shipping infrastructure before most people his age have decided what they want to do.",
    state: "Open",
  },
  {
    volume: "VOL. 02",
    title: "AI Systems",
    copy: "Kronos and Atmadarshan — two systems that taught me what it means to build something that feels alive and something that sounds like you.",
    state: "Shipped",
  },
  {
    volume: "VOL. 03",
    title: "Commerce & Infrastructure",
    copy: "Telegram bots handling payments, virtual numbers, 24/7 support. The operational backbone that taught me what marketplaces demand.",
    state: "Live",
  },
  {
    volume: "VOL. 04",
    title: "Fiction",
    copy: "A multi-genre novel — time fiction, time loop, murder, love, adventure, betrayal, paranormal. Written at 17. Taught me what story requires.",
    state: "Written",
  },
  {
    volume: "VOL. 05",
    title: "What comes next",
    copy: "Reserved for the next system, the next book, the next thing built before turning 18.",
    state: "Future entry",
  },
];

export const commands = [
  { id: "top", label: "Return to Aryan", hint: "#top", type: "anchor" },
  { id: "projects", label: "See the works", hint: "#projects", type: "anchor" },
  { id: "story", label: "Read Aryan's story", hint: "#story", type: "anchor" },
  { id: "architecture", label: "How Aryan builds", hint: "#architecture", type: "anchor" },
  { id: "evolution", label: "Trace the timeline", hint: "#evolution", type: "anchor" },
  { id: "book", label: "Read about the novel", hint: "#book", type: "anchor" },
  { id: "arsenal", label: "Open the arsenal", hint: "#arsenal", type: "anchor" },
  { id: "decisions", label: "Read the lessons", hint: "#decisions", type: "anchor" },
  { id: "log", label: "Read the founder log", hint: "#log", type: "anchor" },
  { id: "archive", label: "Open the archive", hint: "#archive", type: "anchor" },
  { id: "contact", label: "Jump to contact", hint: "#contact", type: "anchor" },
  { id: "site", label: "Launch ExamCodes.site", hint: "External", type: "external" },
] as const;

/**
 * The narrative spine of the page. Every top-level section is registered
 * here with the tone it renders in — this single list drives both the
 * scroll-spy (adaptive nav) and the right-edge chapter rail, so the
 * warm -> cold -> warm arc only ever has to be declared once.
 */
export type Chapter = {
  id: string;
  index: string;
  label: string;
  tone: "warm" | "cold";
};

export const chapters: Chapter[] = [
  { id: "top", index: "00", label: "Aryan", tone: "warm" },
  { id: "projects", index: "01", label: "Works", tone: "warm" },
  { id: "story", index: "02", label: "Story", tone: "cold" },
  { id: "architecture", index: "03", label: "Systems", tone: "cold" },
  { id: "evolution", index: "04", label: "Timeline", tone: "cold" },
  { id: "book", index: "05", label: "Book", tone: "warm" },
  { id: "arsenal", index: "06", label: "Arsenal", tone: "warm" },
  { id: "decisions", index: "07", label: "Lessons", tone: "warm" },
  { id: "log", index: "08", label: "Founder Log", tone: "warm" },
  { id: "archive", index: "09", label: "Archive", tone: "warm" },
  { id: "contact", index: "10", label: "Contact", tone: "warm" },
];