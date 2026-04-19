import type { QuizQuestion } from '@/types'

export const questions: QuizQuestion[] = [
  {
    id: 1,
    text: 'How does your child learn best?',
    subtext: 'Think about what naturally holds their attention longest.',
    options: [
      {
        id: 'q1-hands-on',
        text: 'Hands-on activities, building, and doing',
        tags: [
          { tag: 'hands-on', weight: 5 },
          { tag: 'kinesthetic', weight: 5 },
          { tag: 'unit-study', weight: 2 },
        ],
      },
      {
        id: 'q1-reading',
        text: 'Reading books and listening to stories',
        tags: [
          { tag: 'reading-writing', weight: 4 },
          { tag: 'literature-based', weight: 4 },
          { tag: 'living-books', weight: 3 },
        ],
      },
      {
        id: 'q1-visual',
        text: 'Watching videos and visual instruction',
        tags: [
          { tag: 'visual', weight: 5 },
          { tag: 'auditory', weight: 3 },
          { tag: 'online', weight: 3 },
        ],
      },
      {
        id: 'q1-structured',
        text: 'Working through problems step-by-step',
        tags: [
          { tag: 'textbook-based', weight: 3 },
          { tag: 'traditional', weight: 3 },
          { tag: 'highly-structured', weight: 3 },
        ],
      },
    ],
  },
  {
    id: 2,
    text: 'What is your faith or worldview preference for curriculum?',
    subtext: 'This is one of the most important filters — be honest about what fits your family.',
    options: [
      {
        id: 'secular',
        text: 'Fully secular — no religious content at all',
        tags: [{ tag: 'secular', weight: 5 }],
      },
      {
        id: 'christian',
        text: 'Christian worldview integrated throughout',
        tags: [{ tag: 'christian', weight: 5 }],
      },
      {
        id: 'catholic',
        text: 'Catholic perspective and content',
        tags: [{ tag: 'catholic', weight: 5 }],
      },
      {
        id: 'faith-neutral',
        text: 'Faith-neutral — open to any or I\'ll filter myself',
        tags: [{ tag: 'faith-neutral', weight: 3 }],
      },
    ],
  },
  {
    id: 3,
    text: 'What is your annual curriculum budget?',
    subtext: 'Think total spend for the year, including books and materials.',
    options: [
      {
        id: 'under-500',
        text: 'Under $500/year',
        tags: [{ tag: 'budget-friendly', weight: 5 }],
      },
      {
        id: '500-1500',
        text: '$500–$1,500/year',
        tags: [{ tag: 'mid-range', weight: 5 }],
      },
      {
        id: 'over-1500',
        text: 'Over $1,500/year — I want the best',
        tags: [{ tag: 'premium', weight: 5 }],
      },
    ],
  },
  {
    id: 4,
    text: 'What grade level are you teaching?',
    subtext: 'Select the closest match. Most curricula cover multiple grades.',
    options: [
      {
        id: 'q4-early',
        text: 'Early childhood — PreK through 2nd grade',
        tags: [
          { tag: 'relaxed', weight: 2 },
          { tag: 'hands-on', weight: 2 },
        ],
      },
      {
        id: 'q4-elementary',
        text: 'Elementary — 3rd through 5th grade',
        tags: [
          { tag: 'literature-based', weight: 1 },
          { tag: 'parent-led', weight: 1 },
        ],
      },
      {
        id: 'q4-middle',
        text: 'Middle school — 6th through 8th grade',
        tags: [
          { tag: 'self-directed', weight: 2 },
          { tag: 'strong-writing', weight: 2 },
        ],
      },
      {
        id: 'q4-high',
        text: 'High school — 9th through 12th grade',
        tags: [
          { tag: 'self-directed', weight: 3 },
          { tag: 'classical', weight: 2 },
          { tag: 'highly-structured', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 5,
    text: 'How involved do you want to be in daily teaching?',
    subtext: 'Be realistic about your time, energy, and teaching confidence.',
    options: [
      {
        id: 'q5-full',
        text: 'Very involved — I want to lead every lesson',
        tags: [
          { tag: 'teacher-intensive', weight: 5 },
          { tag: 'parent-led', weight: 5 },
        ],
      },
      {
        id: 'q5-guide',
        text: 'I want to guide and facilitate, not lecture',
        tags: [
          { tag: 'parent-led', weight: 4 },
          { tag: 'flexible', weight: 3 },
        ],
      },
      {
        id: 'q5-independent',
        text: 'I want my child to learn as independently as possible',
        tags: [
          { tag: 'self-directed', weight: 5 },
          { tag: 'minimal-prep', weight: 4 },
        ],
      },
      {
        id: 'q5-balance',
        text: 'A balance — some together, some independent',
        tags: [
          { tag: 'eclectic', weight: 3 },
          { tag: 'flexible', weight: 4 },
        ],
      },
    ],
  },
  {
    id: 6,
    text: 'How structured do you want your school day to be?',
    subtext: 'Think about what your family actually thrives in day-to-day.',
    options: [
      {
        id: 'q6-very',
        text: 'Very structured — same time, same order every day',
        tags: [
          { tag: 'highly-structured', weight: 5 },
          { tag: 'traditional', weight: 4 },
        ],
      },
      {
        id: 'q6-moderate',
        text: 'Moderately structured — a plan but some wiggle room',
        tags: [
          { tag: 'flexible', weight: 3 },
          { tag: 'traditional', weight: 3 },
        ],
      },
      {
        id: 'q6-flexible',
        text: 'Flexible — I have a rhythm but adapt daily',
        tags: [
          { tag: 'flexible', weight: 5 },
          { tag: 'relaxed', weight: 3 },
          { tag: 'charlotte-mason', weight: 2 },
        ],
      },
      {
        id: 'q6-unstructured',
        text: 'Very relaxed — child-led and unstructured',
        tags: [
          { tag: 'relaxed', weight: 5 },
          { tag: 'unschooling', weight: 4 },
          { tag: 'flexible', weight: 3 },
        ],
      },
    ],
  },
  {
    id: 7,
    text: 'What is your preferred approach to math?',
    options: [
      {
        id: 'q7-traditional',
        text: 'Traditional, sequential textbook with lots of practice',
        tags: [
          { tag: 'textbook-based', weight: 4 },
          { tag: 'highly-structured', weight: 3 },
          { tag: 'strong-math', weight: 3 },
        ],
      },
      {
        id: 'q7-hands-on',
        text: 'Hands-on with manipulatives and visual tools',
        tags: [
          { tag: 'hands-on', weight: 5 },
          { tag: 'kinesthetic', weight: 5 },
          { tag: 'visual', weight: 4 },
          { tag: 'strong-math', weight: 3 },
        ],
      },
      {
        id: 'q7-online',
        text: 'Online or video-based — child can learn independently',
        tags: [
          { tag: 'online', weight: 4 },
          { tag: 'self-directed', weight: 3 },
          { tag: 'strong-math', weight: 3 },
        ],
      },
      {
        id: 'q7-conceptual',
        text: 'Story-based or conceptual — understanding over drills',
        tags: [
          { tag: 'living-books', weight: 4 },
          { tag: 'flexible', weight: 3 },
          { tag: 'strong-math', weight: 3 },
        ],
      },
    ],
  },
  {
    id: 8,
    text: 'How do you want to approach reading and language arts?',
    options: [
      {
        id: 'q8-phonics',
        text: 'Structured phonics program — systematic and sequential',
        tags: [
          { tag: 'dyslexia-friendly', weight: 3 },
          { tag: 'highly-structured', weight: 3 },
          { tag: 'strong-reading', weight: 4 },
        ],
      },
      {
        id: 'q8-literature',
        text: 'Through great books and literature',
        tags: [
          { tag: 'literature-based', weight: 5 },
          { tag: 'living-books', weight: 5 },
          { tag: 'charlotte-mason', weight: 3 },
          { tag: 'strong-reading', weight: 4 },
        ],
      },
      {
        id: 'q8-integrated',
        text: 'Integrated across all subjects naturally',
        tags: [
          { tag: 'unit-study', weight: 4 },
          { tag: 'eclectic', weight: 3 },
        ],
      },
      {
        id: 'q8-online',
        text: 'Online or app-based programs',
        tags: [
          { tag: 'online', weight: 4 },
          { tag: 'self-directed', weight: 3 },
        ],
      },
    ],
  },
  {
    id: 9,
    text: 'How do you prefer to teach history?',
    options: [
      {
        id: 'q9-literature',
        text: 'Through narrative and living books — history as a story',
        tags: [
          { tag: 'literature-based', weight: 4 },
          { tag: 'living-books', weight: 4 },
          { tag: 'strong-history', weight: 4 },
        ],
      },
      {
        id: 'q9-textbook',
        text: 'Traditional textbook with dates and facts',
        tags: [
          { tag: 'textbook-based', weight: 4 },
          { tag: 'traditional', weight: 4 },
          { tag: 'strong-history', weight: 3 },
        ],
      },
      {
        id: 'q9-unit',
        text: 'Through projects, crafts, and unit studies',
        tags: [
          { tag: 'unit-study', weight: 5 },
          { tag: 'hands-on', weight: 4 },
          { tag: 'strong-history', weight: 3 },
        ],
      },
      {
        id: 'q9-classical',
        text: 'Classical — chronological from ancient to modern',
        tags: [
          { tag: 'classical', weight: 5 },
          { tag: 'strong-history', weight: 4 },
          { tag: 'literature-based', weight: 3 },
        ],
      },
    ],
  },
  {
    id: 10,
    text: 'What matters most to you in a science curriculum?',
    options: [
      {
        id: 'q10-creation',
        text: 'Creation-based — reflecting a biblical worldview',
        tags: [
          { tag: 'christian', weight: 3 },
          { tag: 'strong-science', weight: 3 },
        ],
      },
      {
        id: 'q10-secular',
        text: 'Secular, evidence-based mainstream science',
        tags: [
          { tag: 'secular', weight: 3 },
          { tag: 'strong-science', weight: 4 },
          { tag: 'stem-focused', weight: 3 },
        ],
      },
      {
        id: 'q10-hands-on',
        text: 'Lots of hands-on experiments and projects',
        tags: [
          { tag: 'hands-on', weight: 5 },
          { tag: 'kinesthetic', weight: 4 },
          { tag: 'strong-science', weight: 4 },
        ],
      },
      {
        id: 'q10-narrative',
        text: 'Narrative and nature-study driven',
        tags: [
          { tag: 'living-books', weight: 4 },
          { tag: 'charlotte-mason', weight: 4 },
          { tag: 'strong-science', weight: 3 },
        ],
      },
    ],
  },
  {
    id: 11,
    text: 'Does your child have any special learning needs or traits?',
    options: [
      {
        id: 'q11-dyslexia',
        text: 'Yes — dyslexia, reading challenges, or language processing',
        tags: [
          { tag: 'dyslexia-friendly', weight: 5 },
          { tag: 'kinesthetic', weight: 3 },
          { tag: 'multi-sensory', weight: 5 },
        ],
      },
      {
        id: 'q11-gifted',
        text: 'Yes — gifted, advanced, or highly curious',
        tags: [
          { tag: 'gifted-friendly', weight: 5 },
          { tag: 'flexible', weight: 3 },
        ],
      },
      {
        id: 'q11-adhd',
        text: 'Yes — ADHD, attention challenges, or high energy',
        tags: [
          { tag: 'hands-on', weight: 4 },
          { tag: 'kinesthetic', weight: 4 },
          { tag: 'flexible', weight: 4 },
          { tag: 'short-lessons', weight: 3 },
        ],
      },
      {
        id: 'q11-none',
        text: 'No specific needs — typically developing',
        tags: [
          { tag: 'traditional', weight: 1 },
          { tag: 'highly-structured', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 12,
    text: 'Are you teaching multiple children at different grade levels?',
    options: [
      {
        id: 'q12-yes-multi',
        text: 'Yes — multiple kids with 2+ years between them',
        tags: [
          { tag: 'multi-age', weight: 5 },
          { tag: 'unit-study', weight: 3 },
        ],
      },
      {
        id: 'q12-yes-same',
        text: 'Yes, but they\'re close in age/grade',
        tags: [
          { tag: 'flexible', weight: 2 },
          { tag: 'parent-led', weight: 2 },
        ],
      },
      {
        id: 'q12-one',
        text: 'Just one child for now',
        tags: [
          { tag: 'self-directed', weight: 2 },
          { tag: 'gifted-friendly', weight: 1 },
        ],
      },
      {
        id: 'q12-future',
        text: 'One now, but planning for more later',
        tags: [
          { tag: 'multi-age', weight: 3 },
          { tag: 'flexible', weight: 3 },
        ],
      },
    ],
  },
  {
    id: 13,
    text: 'How would you describe your confidence as a teacher?',
    options: [
      {
        id: 'q13-confident',
        text: 'Very confident — I can teach any subject and fill gaps',
        tags: [
          { tag: 'minimal-prep', weight: 4 },
          { tag: 'eclectic', weight: 3 },
          { tag: 'charlotte-mason', weight: 2 },
        ],
      },
      {
        id: 'q13-some',
        text: 'Somewhat confident — I need a good guide but can figure it out',
        tags: [
          { tag: 'parent-led', weight: 3 },
          { tag: 'flexible', weight: 3 },
        ],
      },
      {
        id: 'q13-scripted',
        text: 'I need everything laid out — scripted lessons are a lifesaver',
        tags: [
          { tag: 'highly-structured', weight: 4 },
          { tag: 'teacher-intensive', weight: 4 },
          { tag: 'minimal-prep', weight: 3 },
        ],
      },
      {
        id: 'q13-self-teach',
        text: 'I prefer curriculum that teaches my child directly',
        tags: [
          { tag: 'self-directed', weight: 5 },
          { tag: 'online', weight: 4 },
          { tag: 'minimal-prep', weight: 5 },
        ],
      },
    ],
  },
  {
    id: 14,
    text: 'What is your preference for physical books vs. digital?',
    options: [
      {
        id: 'q14-books',
        text: 'I love physical books and printed materials',
        tags: [
          { tag: 'reading-writing', weight: 3 },
          { tag: 'literature-based', weight: 3 },
        ],
      },
      {
        id: 'q14-digital',
        text: 'Digital and online — less clutter, more convenient',
        tags: [
          { tag: 'online', weight: 5 },
          { tag: 'self-directed', weight: 3 },
        ],
      },
      {
        id: 'q14-mix',
        text: 'A mix of both is ideal',
        tags: [
          { tag: 'eclectic', weight: 3 },
          { tag: 'flexible', weight: 3 },
        ],
      },
      {
        id: 'q14-minimal-screen',
        text: 'I want to minimize screen time',
        tags: [
          { tag: 'traditional', weight: 3 },
          { tag: 'literature-based', weight: 4 },
          { tag: 'hands-on', weight: 3 },
        ],
      },
    ],
  },
  {
    id: 15,
    text: 'How flexible does your school schedule need to be?',
    subtext: 'Think about travel, outside activities, co-ops, and life.',
    options: [
      {
        id: 'q15-very-flex',
        text: 'Very flexible — we travel, move fast, or have a busy life',
        tags: [
          { tag: 'flexible', weight: 5 },
          { tag: 'relaxed', weight: 4 },
          { tag: 'minimal-prep', weight: 3 },
        ],
      },
      {
        id: 'q15-some-flex',
        text: 'Somewhat flexible — mostly consistent but life happens',
        tags: [
          { tag: 'flexible', weight: 3 },
          { tag: 'eclectic', weight: 3 },
        ],
      },
      {
        id: 'q15-consistent',
        text: 'Fairly consistent — I like a regular routine',
        tags: [
          { tag: 'highly-structured', weight: 3 },
          { tag: 'traditional', weight: 2 },
        ],
      },
      {
        id: 'q15-structured',
        text: 'Very consistent — same time, same day, every week',
        tags: [
          { tag: 'highly-structured', weight: 5 },
          { tag: 'traditional', weight: 4 },
        ],
      },
    ],
  },
  {
    id: 16,
    text: 'Are you interested in a classical education approach?',
    subtext: 'Classical education follows the Trivium: Grammar, Logic, and Rhetoric stages.',
    options: [
      {
        id: 'q16-yes',
        text: 'Yes! Classical education is exactly what I want',
        tags: [
          { tag: 'classical', weight: 5 },
          { tag: 'literature-based', weight: 3 },
          { tag: 'strong-history', weight: 3 },
        ],
      },
      {
        id: 'q16-somewhat',
        text: 'Somewhat — I want classical elements but not fully classical',
        tags: [
          { tag: 'classical', weight: 3 },
          { tag: 'eclectic', weight: 3 },
        ],
      },
      {
        id: 'q16-no',
        text: 'Not really — I prefer a different approach',
        tags: [
          { tag: 'flexible', weight: 2 },
          { tag: 'eclectic', weight: 2 },
        ],
      },
      {
        id: 'q16-unsure',
        text: "I'm not sure what classical means for us yet",
        tags: [
          { tag: 'flexible', weight: 3 },
          { tag: 'literature-based', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 17,
    text: 'How important is hands-on or project-based learning to you?',
    options: [
      {
        id: 'q17-essential',
        text: 'Essential — my child barely learns any other way',
        tags: [
          { tag: 'hands-on', weight: 5 },
          { tag: 'kinesthetic', weight: 5 },
          { tag: 'unit-study', weight: 3 },
        ],
      },
      {
        id: 'q17-important',
        text: 'Very important — I want a good mix of hands-on',
        tags: [
          { tag: 'hands-on', weight: 3 },
          { tag: 'flexible', weight: 2 },
        ],
      },
      {
        id: 'q17-some',
        text: 'Somewhat important — occasional projects are nice',
        tags: [
          { tag: 'eclectic', weight: 2 },
          { tag: 'flexible', weight: 2 },
        ],
      },
      {
        id: 'q17-not',
        text: 'Not very important — I prefer reading and writing',
        tags: [
          { tag: 'reading-writing', weight: 4 },
          { tag: 'textbook-based', weight: 3 },
        ],
      },
    ],
  },
  {
    id: 18,
    text: 'How do you want to approach writing instruction?',
    options: [
      {
        id: 'q18-structured',
        text: 'Structured, step-by-step writing method',
        tags: [
          { tag: 'strong-writing', weight: 4 },
          { tag: 'highly-structured', weight: 3 },
        ],
      },
      {
        id: 'q18-literature',
        text: 'Through great literature and reading — modeling good writing',
        tags: [
          { tag: 'literature-based', weight: 4 },
          { tag: 'strong-writing', weight: 3 },
          { tag: 'charlotte-mason', weight: 3 },
        ],
      },
      {
        id: 'q18-creative',
        text: 'Freewriting and creative expression',
        tags: [
          { tag: 'flexible', weight: 4 },
          { tag: 'relaxed', weight: 4 },
          { tag: 'strong-writing', weight: 3 },
        ],
      },
      {
        id: 'q18-integrated',
        text: 'Integrated with other subjects — not a separate program',
        tags: [
          { tag: 'unit-study', weight: 4 },
          { tag: 'eclectic', weight: 3 },
          { tag: 'strong-writing', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 19,
    text: 'Do you prefer an all-in-one curriculum or piecing it together?',
    options: [
      {
        id: 'q19-all-in-one',
        text: 'All-in-one — one publisher covers everything',
        tags: [
          { tag: 'highly-structured', weight: 3 },
          { tag: 'minimal-prep', weight: 4 },
          { tag: 'traditional', weight: 3 },
        ],
      },
      {
        id: 'q19-eclectic',
        text: 'Eclectic — I want to pick the best for each subject',
        tags: [
          { tag: 'eclectic', weight: 5 },
          { tag: 'flexible', weight: 4 },
        ],
      },
      {
        id: 'q19-core',
        text: 'Core curriculum with a few supplements',
        tags: [
          { tag: 'parent-led', weight: 3 },
          { tag: 'eclectic', weight: 3 },
          { tag: 'flexible', weight: 3 },
        ],
      },
      {
        id: 'q19-online',
        text: 'An online platform that covers everything digitally',
        tags: [
          { tag: 'online', weight: 5 },
          { tag: 'self-directed', weight: 4 },
          { tag: 'minimal-prep', weight: 4 },
        ],
      },
    ],
  },
  {
    id: 20,
    text: 'What is the single most important thing to you in a curriculum?',
    subtext: 'This is your north star. Pick the one that matters most.',
    options: [
      {
        id: 'q20-academic',
        text: 'Strong academic rigor and college preparation',
        tags: [
          { tag: 'highly-structured', weight: 3 },
          { tag: 'traditional', weight: 4 },
          { tag: 'classical', weight: 3 },
          { tag: 'strong-math', weight: 2 },
        ],
      },
      {
        id: 'q20-faith',
        text: 'Faith and character development woven throughout',
        tags: [
          { tag: 'christian', weight: 3 },
          { tag: 'catholic', weight: 1 },
        ],
      },
      {
        id: 'q20-love',
        text: 'Nurturing my child\'s love of learning',
        tags: [
          { tag: 'living-books', weight: 4 },
          { tag: 'charlotte-mason', weight: 4 },
          { tag: 'relaxed', weight: 4 },
          { tag: 'literature-based', weight: 3 },
        ],
      },
      {
        id: 'q20-flexibility',
        text: 'Flexibility to fit our unique family lifestyle',
        tags: [
          { tag: 'flexible', weight: 5 },
          { tag: 'eclectic', weight: 4 },
          { tag: 'relaxed', weight: 4 },
        ],
      },
    ],
  },
]
