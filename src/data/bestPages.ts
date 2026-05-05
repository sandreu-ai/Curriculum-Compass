import { curricula } from './curricula'
import type { Curriculum } from '@/types'

export interface BestPage {
  slug: string
  title: string
  description: string
  audience: string
  criteria: string[]
  curriculumIds: string[]
  buyingAdvice: string
  faqs: { question: string; answer: string }[]
}

export const bestPages: BestPage[] = [
  {
    slug: 'christian-homeschool-curriculum',
    title: 'Best Christian Homeschool Curriculum',
    description: 'Compare strong Christian homeschool curriculum options by worldview, parent prep, structure, cost, and grade range.',
    audience: 'Christian families who want academics, daily lesson flow, and worldview to work together instead of feeling like separate add-ons.',
    criteria: ['Christian worldview integration', 'Clear daily plans', 'Strong core academics', 'Parent support', 'Reasonable long-term cost'],
    curriculumIds: ['abeka', 'bju-press', 'sonlight', 'masterbooks', 'good-and-beautiful', 'apologia'],
    buyingAdvice: 'Start by deciding how explicit you want the Christian worldview to be, then choose between traditional, literature-based, gentle, and online support models.',
    faqs: [
      { question: 'What is the best Christian homeschool curriculum?', answer: 'There is no single best option for every family. Abeka and BJU Press are structured, Sonlight is literature-rich, Masterbooks is gentle, and Apologia is strong for science.' },
      { question: 'Can I mix Christian curriculum from different publishers?', answer: 'Yes. Many families use one provider for math, another for language arts, and a third for science or Bible.' },
    ],
  },
  {
    slug: 'secular-homeschool-curriculum',
    title: 'Best Secular Homeschool Curriculum',
    description: 'Find secular and faith-neutral homeschool curriculum options for families who want non-religious or worldview-flexible materials.',
    audience: 'Families looking for secular, neutral, or easily adaptable curriculum without explicitly religious lessons.',
    criteria: ['Secular or neutral framing', 'Academic quality', 'Adaptability', 'Grade coverage', 'Parent prep requirements'],
    curriculumIds: ['oak-meadow', 'time4learning', 'calvert-education', 'blossom-and-root', 'moving-beyond-the-page', 'torchlight'],
    buyingAdvice: 'Check each subject separately. Some publishers are fully secular, while others are neutral enough for many families but may still require review.',
    faqs: [
      { question: 'Is secular homeschool curriculum hard to find?', answer: 'It is easier than it used to be, especially for online, literature-based, and project-based options. The key is verifying the worldview of each subject.' },
      { question: 'Can secular families use faith-neutral curriculum?', answer: 'Often yes, but review samples first to decide whether the framing fits your family.' },
    ],
  },
  {
    slug: 'homeschool-curriculum-for-adhd',
    title: 'Best Homeschool Curriculum for ADHD',
    description: 'Curriculum options for ADHD learners who need shorter lessons, movement, clear structure, or hands-on work.',
    audience: 'Parents teaching children who struggle with focus, long seatwork, transitions, or heavy workbook loads.',
    criteria: ['Short lessons', 'Hands-on practice', 'Clear routines', 'Low overwhelm', 'Flexible pacing'],
    curriculumIds: ['math-u-see', 'rightstart-math', 'timberdoodle', 'five-in-a-row', 'masterbooks', 'teaching-textbooks'],
    buyingAdvice: 'Favor curriculum you can pause, shorten, or make physical. The best ADHD fit is often a strong core plus permission to adapt lesson length.',
    faqs: [
      { question: 'Should ADHD learners avoid workbooks?', answer: 'Not always, but long repetitive workbook assignments can backfire. Shorter, clearer, more varied lessons usually work better.' },
      { question: 'Is online curriculum good for ADHD?', answer: 'Sometimes. Automated lessons can reduce parent load, but screen-based programs still need supervision and movement breaks.' },
    ],
  },
  {
    slug: 'homeschool-curriculum-for-dyslexia',
    title: 'Best Homeschool Curriculum for Dyslexia',
    description: 'Dyslexia-friendly homeschool options with explicit phonics, multisensory practice, audio support, and flexible pacing.',
    audience: 'Families supporting struggling readers, dyslexic learners, or children who need explicit structured literacy instruction.',
    criteria: ['Explicit phonics', 'Multisensory lessons', 'Step-by-step sequence', 'Low shame and flexible pacing', 'Reading support across subjects'],
    curriculumIds: ['all-about-reading', 'all-about-spelling', 'math-u-see', 'rightstart-math', 'sonlight', 'brave-writer'],
    buyingAdvice: 'Prioritize direct reading instruction first. Then choose content subjects that do not punish the student for still-developing reading fluency.',
    faqs: [
      { question: 'What curriculum is best for dyslexia?', answer: 'Structured literacy programs such as All About Reading and All About Spelling are common starting points because they are explicit, sequential, and multisensory.' },
      { question: 'Should dyslexic students use grade-level history and science?', answer: 'Often yes, with audiobooks, read-alouds, narration, or oral discussion so content learning does not wait on reading fluency.' },
    ],
  },
  {
    slug: 'open-and-go-homeschool-curriculum',
    title: 'Best Open-and-Go Homeschool Curriculum',
    description: 'Low-prep homeschool curriculum options for parents who need clear daily lessons without building everything from scratch.',
    audience: 'Busy parents who want a plan they can open each morning and teach without hours of prep.',
    criteria: ['Clear lesson plans', 'Minimal supply gathering', 'Predictable pacing', 'Teacher support', 'Easy tracking'],
    curriculumIds: ['good-and-beautiful', 'masterbooks', 'all-about-reading', 'teaching-textbooks', 'heart-of-dakota', 'calvert-education'],
    buyingAdvice: 'Open-and-go does not mean zero involvement. Look for lessons that reduce planning while still matching your teaching style and child’s needs.',
    faqs: [
      { question: 'Is open-and-go curriculum enough?', answer: 'It can be enough when the program fits your child, but parents should still adjust pacing and skip unnecessary busywork.' },
      { question: 'What makes a curriculum open-and-go?', answer: 'Daily lessons are sequenced, instructions are clear, and the parent does not need to design the plan from scratch.' },
    ],
  },
  {
    slug: 'affordable-homeschool-curriculum',
    title: 'Best Affordable Homeschool Curriculum',
    description: 'Budget-conscious homeschool curriculum options that keep annual costs lower without sacrificing core learning.',
    audience: 'Families trying to homeschool well while keeping curriculum spending under control.',
    criteria: ['Low annual cost', 'Reusable materials', 'Free or inexpensive resources', 'Strong core subjects', 'Minimal hidden costs'],
    curriculumIds: ['ambleside-online', 'good-and-beautiful', 'life-of-fred', 'masterbooks', 'all-about-spelling', 'five-in-a-row'],
    buyingAdvice: 'Watch total cost, not just book price. Consumables, teacher guides, manipulatives, printing, and extra readers can change the real annual budget.',
    faqs: [
      { question: 'Can homeschooling be affordable?', answer: 'Yes. Many families combine free plans, library books, used curriculum, and targeted paid programs for math or reading.' },
      { question: 'Should I buy all-in-one boxed curriculum to save money?', answer: 'Sometimes, but boxed curriculum can be expensive. Compare the total cost against buying only the subjects you need.' },
    ],
  },
  {
    slug: 'charlotte-mason-curriculum',
    title: 'Best Charlotte Mason Homeschool Curriculum',
    description: 'Compare Charlotte Mason curriculum options built around living books, narration, nature study, habits, and short lessons.',
    audience: 'Families who want a literature-rich, relational, nature-aware homeschool rhythm.',
    criteria: ['Living books', 'Narration and discussion', 'Nature study', 'Short lessons', 'Habit-friendly planning'],
    curriculumIds: ['ambleside-online', 'simply-charlotte-mason', 'sonlight', 'five-in-a-row', 'wildflowers-and-marbles', 'blossom-and-root'],
    buyingAdvice: 'Decide whether you want free-but-planning-heavy booklists or paid guidance that makes Charlotte Mason easier to implement.',
    faqs: [
      { question: 'Is Charlotte Mason curriculum rigorous?', answer: 'It can be very rigorous because of the quality of books, narration, attention, and discussion, even when daily lessons feel gentle.' },
      { question: 'What if my child does not love reading yet?', answer: 'Use read-alouds, audiobooks, shorter selections, and narration while building reading stamina gradually.' },
    ],
  },
  {
    slug: 'classical-homeschool-curriculum',
    title: 'Best Classical Homeschool Curriculum',
    description: 'Classical homeschool curriculum options for families wanting memory work, Latin, logic, great books, and structured academics.',
    audience: 'Families drawn to the grammar-logic-rhetoric model, strong academics, and a long-view approach to education.',
    criteria: ['Classical sequence', 'Academic rigor', 'Teacher guidance', 'Community or support options', 'Long-term grade coverage'],
    curriculumIds: ['classical-conversations', 'memoria-press', 'veritas-press', 'kolbe-academy', 'tapestry-of-grace', 'iew'],
    buyingAdvice: 'Classical curriculum can be powerful but demanding. Choose based on how much community support, parent teaching, and daily structure you can realistically sustain.',
    faqs: [
      { question: 'Is classical homeschooling too hard?', answer: 'It can be demanding, but it is manageable when the plan matches the parent’s bandwidth and the child’s maturity.' },
      { question: 'Do classical homeschoolers need Latin?', answer: 'Not always, but many classical programs include Latin because it supports grammar, vocabulary, and tradition.' },
    ],
  },
  {
    slug: 'online-homeschool-curriculum',
    title: 'Best Online Homeschool Curriculum',
    description: 'Online homeschool curriculum options for families wanting digital lessons, automated grading, or more independent student work.',
    audience: 'Families needing online lessons, automated structure, or more independent learning support.',
    criteria: ['Student independence', 'Automated grading', 'Parent dashboard', 'Subject coverage', 'Screen-time balance'],
    curriculumIds: ['time4learning', 'teaching-textbooks', 'monarch', 'calvert-education', 'veritas-press', 'switched-on-schoolhouse'],
    buyingAdvice: 'Online curriculum can reduce parent teaching time, but it should not eliminate parent oversight. Build in check-ins and offline practice.',
    faqs: [
      { question: 'Can online homeschool curriculum be the whole program?', answer: 'Sometimes, especially for older students, but younger children usually need more parent involvement and offline learning.' },
      { question: 'Is online curriculum accepted in every state?', answer: 'Curriculum choice is usually separate from homeschool compliance. Parents still need to follow their state’s homeschool law requirements.' },
    ],
  },
  {
    slug: 'kindergarten-homeschool-curriculum',
    title: 'Best Kindergarten Homeschool Curriculum',
    description: 'Gentle kindergarten homeschool curriculum options for phonics, early math, read-alouds, play, and short lessons.',
    audience: 'Parents beginning homeschool with a kindergarten student and wanting developmentally appropriate structure.',
    criteria: ['Short lessons', 'Phonics foundation', 'Hands-on math', 'Read-aloud culture', 'Low pressure'],
    curriculumIds: ['all-about-reading', 'rightstart-math', 'five-in-a-row', 'blossom-and-root', 'good-and-beautiful', 'math-u-see'],
    buyingAdvice: 'Kindergarten should build foundations without burning out the child. Prioritize phonics, number sense, read-alouds, movement, and consistency over a heavy schedule.',
    faqs: [
      { question: 'How long should kindergarten homeschool take?', answer: 'Many families finish formal kindergarten lessons in 30–90 minutes, with the rest of the day devoted to reading aloud, play, chores, outside time, and life learning.' },
      { question: 'Do I need a full boxed curriculum for kindergarten?', answer: 'Not necessarily. A strong phonics program, simple math, read-alouds, and hands-on activities may be enough for many families.' },
    ],
  },
]

export function getBestPageBySlug(slug: string): BestPage | undefined {
  return bestPages.find((page) => page.slug === slug)
}

export function getBestPageCurricula(page: BestPage): Curriculum[] {
  return page.curriculumIds
    .map((id) => curricula.find((curriculum) => curriculum.id === id))
    .filter((curriculum): curriculum is Curriculum => Boolean(curriculum))
}
