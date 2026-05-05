import { curricula } from './curricula'
import type { Curriculum } from '@/types'

export interface ComparisonPage {
  slug: string
  title: string
  intro: string
  curriculumA: string
  curriculumB: string
  verdict: string
  bestForA: string[]
  bestForB: string[]
  keyDifferences: string[]
  faqs: { question: string; answer: string }[]
}

export const comparisons: ComparisonPage[] = [
  {
    slug: 'abeka-vs-bju-press',
    title: 'Abeka vs BJU Press: Which Homeschool Curriculum Fits Better?',
    intro: 'Abeka and BJU Press are both structured Christian homeschool choices, but they feel different day to day. This comparison helps parents choose between Abeka’s traditional workbook-and-drill rhythm and BJU Press’s teacher-guided Christian textbook approach.',
    curriculumA: 'abeka',
    curriculumB: 'bju-press',
    verdict: 'Choose Abeka if you want a highly traditional, academically rigorous sequence. Choose BJU Press if you want strong Christian academics with more teacher support and a slightly more flexible classroom feel.',
    bestForA: ['Families who like traditional school-at-home structure', 'Parents who want clear daily assignments', 'Students who do well with repetition and workbook practice'],
    bestForB: ['Families wanting robust Christian worldview integration', 'Parents who prefer teacher-led explanations', 'Students who benefit from colorful lessons and guided instruction'],
    keyDifferences: ['Abeka is usually more drill-heavy; BJU Press is more teacher-explanation-heavy.', 'Abeka can feel faster paced; BJU Press often feels more conversational.', 'Both are Christian and structured, but BJU Press may be easier to adapt for mixed learners.'],
    faqs: [
      { question: 'Is Abeka harder than BJU Press?', answer: 'Many families experience Abeka as more rigorous and faster paced, especially in language arts and math. BJU Press is still academically strong but may feel easier to teach because explanations and teacher materials are more developed.' },
      { question: 'Which is better for independent learners?', answer: 'Abeka can work for independent students who like predictable workbook assignments. BJU Press works well when a parent or video option provides more teaching support.' },
    ],
  },
  {
    slug: 'math-u-see-vs-saxon-math',
    title: 'Math-U-See vs Saxon Math: Mastery or Spiral Review?',
    intro: 'Math-U-See and Saxon Math represent two very different math philosophies. Math-U-See teaches one concept deeply with manipulatives, while Saxon uses continual spiral review across many skills.',
    curriculumA: 'math-u-see',
    curriculumB: 'saxon-math',
    verdict: 'Choose Math-U-See for visual, mastery-based learning. Choose Saxon Math for frequent review, steady practice, and a more traditional math track.',
    bestForA: ['Visual learners', 'Students who need concrete manipulatives', 'Families who prefer mastery before moving on'],
    bestForB: ['Students who forget without frequent review', 'Families wanting a proven traditional sequence', 'Parents comfortable with daily mixed practice'],
    keyDifferences: ['Math-U-See is mastery based; Saxon is spiral based.', 'Math-U-See uses manipulatives heavily; Saxon emphasizes written practice.', 'Saxon provides constant review; Math-U-See slows down for conceptual understanding.'],
    faqs: [
      { question: 'Which is better for struggling math students?', answer: 'Math-U-See is often better for students who need to see and build math concepts. Saxon can help students who understand concepts but need repeated review to retain them.' },
      { question: 'Can you switch from Math-U-See to Saxon?', answer: 'Yes, but use a placement test because the scope and sequence differ. A student may be advanced in one area and need review in another.' },
    ],
  },
  {
    slug: 'good-and-beautiful-vs-masterbooks',
    title: 'The Good and the Beautiful vs Masterbooks: Gentle Christian Curriculum Compared',
    intro: 'The Good and the Beautiful and Masterbooks are popular with Christian families who want a gentler homeschool rhythm. The main difference is The Good and the Beautiful’s integrated language arts and polished design versus Masterbooks’ biblical worldview and shorter daily lessons.',
    curriculumA: 'good-and-beautiful',
    curriculumB: 'masterbooks',
    verdict: 'Choose The Good and the Beautiful for beautiful open-and-go lessons and integrated language arts. Choose Masterbooks for shorter lessons, strong biblical worldview, and a more relaxed pace.',
    bestForA: ['Parents wanting polished, low-prep materials', 'Students who enjoy integrated language arts', 'Families seeking a gentle but structured rhythm'],
    bestForB: ['Families wanting short daily lessons', 'Parents prioritizing biblical worldview', 'Students who need a less intensive academic load'],
    keyDifferences: ['The Good and the Beautiful tends to be more visually polished.', 'Masterbooks often has shorter daily lessons.', 'Both are Christian-friendly, but Masterbooks is more explicitly biblical in many courses.'],
    faqs: [
      { question: 'Is The Good and the Beautiful more advanced than Masterbooks?', answer: 'Often yes, especially in language arts. Masterbooks is usually perceived as gentler and lighter, which can be a strength for overwhelmed families.' },
      { question: 'Which is more open-and-go?', answer: 'Both can be low-prep, but The Good and the Beautiful is especially known for open-and-go lesson flow and polished student books.' },
    ],
  },
  {
    slug: 'sonlight-vs-timberdoodle',
    title: 'Sonlight vs Timberdoodle: Literature-Based or Hands-On Homeschool?',
    intro: 'Sonlight and Timberdoodle both help parents avoid building a full curriculum from scratch, but they solve different problems. Sonlight is literature-rich and Christian; Timberdoodle is kit-based, hands-on, and friendly to families who want more tactile learning.',
    curriculumA: 'sonlight',
    curriculumB: 'timberdoodle',
    verdict: 'Choose Sonlight if you want a Christian, literature-heavy curriculum with rich read-alouds. Choose Timberdoodle if you want curated kits, hands-on work, and more tactile learning across subjects.',
    bestForA: ['Christian families who love read-alouds', 'Parents who want a planned literature schedule', 'Students who thrive through story and discussion'],
    bestForB: ['Hands-on learners', 'Families wanting curated kits', 'Parents who want less read-aloud dependency'],
    keyDifferences: ['Sonlight is literature-based and Christian.', 'Timberdoodle is more kit-based and hands-on.', 'Sonlight requires substantial parent reading time; Timberdoodle often varies more by subject.'],
    faqs: [
      { question: 'Is Sonlight parent intensive?', answer: 'Yes. Sonlight can be deeply rewarding, but it depends on consistent parent read-aloud time and discussion.' },
      { question: 'What if I need secular Sonlight?', answer: 'Look for BookShark as the closest secular sibling. If you want hands-on secular-friendly kits, Timberdoodle is also worth comparing.' },
    ],
  },
  {
    slug: 'classical-conversations-vs-memoria-press',
    title: 'Classical Conversations vs Memoria Press: Classical Homeschool Compared',
    intro: 'Classical Conversations is community-centered, while Memoria Press is a more traditional curriculum provider. Both serve classical homeschool families, but they solve different problems.',
    curriculumA: 'classical-conversations',
    curriculumB: 'memoria-press',
    verdict: 'Choose Classical Conversations if community and weekly accountability matter most. Choose Memoria Press if you want a classical plan you can run more independently at home.',
    bestForA: ['Families wanting a local classical community', 'Parents who value accountability', 'Students who enjoy memory work with peers'],
    bestForB: ['Families wanting classical structure at home', 'Parents who prefer books and lesson plans over co-op dependency', 'Students who do well with traditional academics'],
    keyDifferences: ['Classical Conversations is community-driven.', 'Memoria Press is curriculum-driven.', 'CC depends heavily on local group fit; Memoria Press is more consistent across families.'],
    faqs: [
      { question: 'Can I use Memoria Press without a co-op?', answer: 'Yes. Memoria Press is designed to be usable at home, though many families still add discussion or co-op support.' },
      { question: 'Is Classical Conversations enough by itself?', answer: 'It provides structure and memory work, but families often need to flesh out daily teaching and assignments at home.' },
    ],
  },
  {
    slug: 'teaching-textbooks-vs-time4learning',
    title: 'Teaching Textbooks vs Time4Learning: Online Homeschool Options',
    intro: 'Teaching Textbooks is focused on math, while Time4Learning is a broader online curriculum. The right choice depends on whether you need math support or an all-in-one online structure.',
    curriculumA: 'teaching-textbooks',
    curriculumB: 'time4learning',
    verdict: 'Choose Teaching Textbooks for independent math. Choose Time4Learning when you want a broader online curriculum across multiple subjects.',
    bestForA: ['Students needing independent math instruction', 'Parents who want automated math grading', 'Families supplementing another main curriculum'],
    bestForB: ['Families wanting multiple online subjects', 'Parents who need built-in lesson flow', 'Students who like interactive screen-based learning'],
    keyDifferences: ['Teaching Textbooks is math-specific.', 'Time4Learning covers multiple subjects.', 'Teaching Textbooks is best as a supplement; Time4Learning can serve as a core online option.'],
    faqs: [
      { question: 'Can Teaching Textbooks be a full curriculum?', answer: 'No. It is a math curriculum, so families need language arts, history, science, and electives elsewhere.' },
      { question: 'Is Time4Learning accredited?', answer: 'Time4Learning is a curriculum provider, not a school. Families are responsible for homeschool compliance in their state.' },
    ],
  },
  {
    slug: 'all-about-reading-vs-all-about-spelling',
    title: 'All About Reading vs All About Spelling: Reading and Spelling Help Compared',
    intro: 'All About Reading and All About Spelling are sister programs with different jobs. One focuses on decoding and fluency; the other focuses on spelling, encoding, and rule-based practice.',
    curriculumA: 'all-about-reading',
    curriculumB: 'all-about-spelling',
    verdict: 'Choose All About Reading when reading is the immediate goal. Add All About Spelling when spelling, encoding, and phonogram practice need dedicated support.',
    bestForA: ['Beginning readers', 'Students needing explicit phonics', 'Parents wanting scripted lessons'],
    bestForB: ['Students who can read but struggle to spell', 'Families wanting structured spelling rules', 'Parents pairing reading and spelling remediation'],
    keyDifferences: ['All About Reading focuses on decoding and fluency.', 'All About Spelling focuses on encoding and spelling rules.', 'Many families use both together over time.'],
    faqs: [
      { question: 'Is All About Reading dyslexia-friendly?', answer: 'It is often used by families with struggling readers because it is explicit, sequential, and multisensory.' },
      { question: 'Do I need All About Spelling too?', answer: 'Not always immediately, but many students benefit from a separate spelling program once reading instruction is underway.' },
    ],
  },
  {
    slug: 'apologia-vs-bju-press-science',
    title: 'Apologia vs BJU Press Science: Christian Science Compared',
    intro: 'Apologia and BJU Press both serve Christian homeschool families, but Apologia is known for conversational science texts while BJU Press offers more traditional textbook structure.',
    curriculumA: 'apologia',
    curriculumB: 'bju-press',
    verdict: 'Choose Apologia for conversational, homeschool-friendly science. Choose BJU Press for a broader structured Christian textbook program.',
    bestForA: ['Families wanting Christian science specifically', 'Students who like conversational readings', 'Parents who want homeschool-oriented science texts'],
    bestForB: ['Families wanting one publisher across subjects', 'Students who like textbook structure', 'Parents wanting teacher-led Christian academics'],
    keyDifferences: ['Apologia is science-focused.', 'BJU Press covers many subjects.', 'Apologia often feels more conversational; BJU Press more classroom-textbook oriented.'],
    faqs: [
      { question: 'Is Apologia only science?', answer: 'Apologia is best known for science, though the publisher offers other resources. Most families consider it primarily for Christian homeschool science.' },
      { question: 'Which is better for high school science?', answer: 'Both can work. Apologia is very popular for homeschool high school science, while BJU Press may fit families already using BJU across subjects.' },
    ],
  },
  {
    slug: 'oak-meadow-vs-blossom-and-root',
    title: 'Oak Meadow vs Blossom and Root: Secular Gentle Homeschool Compared',
    intro: 'Oak Meadow and Blossom and Root appeal to families wanting gentle, secular-friendly, creative homeschooling. This comparison focuses on structure, age range, and day-to-day parent involvement.',
    curriculumA: 'oak-meadow',
    curriculumB: 'blossom-and-root',
    verdict: 'Choose Oak Meadow for a more complete long-term secular path. Choose Blossom and Root for early years, nature-rich learning, and creative flexibility.',
    bestForA: ['Families wanting a complete secular curriculum', 'Parents who like Waldorf-inspired learning', 'Students who need a gentle pace'],
    bestForB: ['Early elementary families', 'Nature-study families', 'Parents who want creative, flexible plans'],
    keyDifferences: ['Oak Meadow covers a broader grade span.', 'Blossom and Root is especially loved in younger years.', 'Both are gentle, but Blossom and Root feels more nature-rich and flexible.'],
    faqs: [
      { question: 'Is Oak Meadow secular?', answer: 'Oak Meadow is generally secular and holistic, with a gentle creative style.' },
      { question: 'Is Blossom and Root enough by itself?', answer: 'For many young learners it can be a strong core, but families may supplement math or phonics depending on the child.' },
    ],
  },
  {
    slug: 'ambleside-online-vs-simply-charlotte-mason',
    title: 'Ambleside Online vs Simply Charlotte Mason: Charlotte Mason Compared',
    intro: 'Ambleside Online and Simply Charlotte Mason both serve Charlotte Mason families. Ambleside is free and rigorous; Simply Charlotte Mason is more guided and easier to buy as organized materials.',
    curriculumA: 'ambleside-online',
    curriculumB: 'simply-charlotte-mason',
    verdict: 'Choose Ambleside Online for a free, literature-rich, rigorous plan. Choose Simply Charlotte Mason if you want more hand-holding, open-and-go structure, and ready-to-buy resources.',
    bestForA: ['Families comfortable planning from booklists', 'Parents wanting a free Charlotte Mason path', 'Strong readers and discussion-heavy homes'],
    bestForB: ['Parents wanting easier implementation', 'Families new to Charlotte Mason', 'Students needing a gentler on-ramp'],
    keyDifferences: ['Ambleside is free but planning-heavy.', 'Simply Charlotte Mason is paid but more guided.', 'Ambleside can be more rigorous; SCM is often easier to start.'],
    faqs: [
      { question: 'Is Ambleside Online really free?', answer: 'The plans are free, but families still need books and supplies.' },
      { question: 'Which is easier for beginners?', answer: 'Simply Charlotte Mason is usually easier for beginners because the guidance and resources are more packaged.' },
    ],
  },
  {
    slug: 'veritas-press-vs-memoria-press',
    title: 'Veritas Press vs Memoria Press: Classical Christian Curriculum Compared',
    intro: 'Veritas Press and Memoria Press both attract classical Christian families. Veritas is known for online and self-paced options, while Memoria Press is known for traditional classical materials.',
    curriculumA: 'veritas-press',
    curriculumB: 'memoria-press',
    verdict: 'Choose Veritas Press if online classical courses and history cards appeal to you. Choose Memoria Press if you want a more traditional book-based classical sequence.',
    bestForA: ['Families wanting online classical options', 'Students who enjoy interactive history', 'Parents needing outside teaching support'],
    bestForB: ['Families wanting book-based classical structure', 'Parents who like traditional academics', 'Students who thrive with reading and recitation'],
    keyDifferences: ['Veritas has stronger online/self-paced options.', 'Memoria is more traditional and book-centered.', 'Both are classical Christian but differ in delivery style.'],
    faqs: [
      { question: 'Is Veritas Press good for independent learners?', answer: 'Its online options can support independence, though parents should still monitor progress and understanding.' },
      { question: 'Is Memoria Press too rigorous?', answer: 'It can be academically demanding. Families should pace carefully and adapt when needed.' },
    ],
  },
]

export function getComparisonBySlug(slug: string): ComparisonPage | undefined {
  return comparisons.find((comparison) => comparison.slug === slug)
}

export function getComparisonCurricula(comparison: ComparisonPage): [Curriculum, Curriculum] {
  const curriculumA = curricula.find((curriculum) => curriculum.id === comparison.curriculumA)
  const curriculumB = curricula.find((curriculum) => curriculum.id === comparison.curriculumB)

  if (!curriculumA || !curriculumB) {
    throw new Error(`Missing curriculum for comparison ${comparison.slug}`)
  }

  return [curriculumA, curriculumB]
}

export function getComparisonsForCurriculum(curriculumId: string): ComparisonPage[] {
  return comparisons.filter(
    (comparison) => comparison.curriculumA === curriculumId || comparison.curriculumB === curriculumId,
  )
}
