/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @typedef {Object} Course
 * @property {string} id - Unique course identifier.
 * @property {string} title - Title of the course.
 * @property {string} level - Academic level (e.g. Intermediate).
 * @property {string} description - Brief description of course.
 * @property {string} duration - Duration of courses.
 * @property {string} eligibility - Admission eligibility criteria.
 * @property {string[]} features - Main syllabus features/highlights.
 */

/**
 * @typedef {Object} Program
 * @property {string} id - Unique program identifier.
 * @property {string} title - Title of the degree program.
 * @property {string} description - Summary.
 * @property {string} [details] - Detailed curriculum.
 * @property {string} duration - Semester details.
 * @property {string} requirements - Eligibility criteria.
 * @property {string[]} careers - Job pathways or future prospective careers.
 */

/**
 * @typedef {Object} FAQItem
 * @property {string} id - Common id.
 * @property {string} category - Category grouping.
 * @property {string} question - Question title.
 * @property {string} answer - Expanded answer.
 */

/**
 * @typedef {Object} Testimonial
 * @property {string} id - Id.
 * @property {string} text - Review text.
 * @property {string} author - Author name.
 * @property {string} role - Alumna status.
 * @property {number} rating - High-precision rating out of 5 stars.
 */

/**
 * @typedef {Object} GalleryImage
 * @property {string} id - Id.
 * @property {string} url - Unsplash or local graphic resource link.
 * @property {string} title - Descriptive tag.
 * @property {string} category - Category grouping filter.
 */

/** @type {Course[]} */
const COURSES = [
  {
    id: 'fsc-medical',
    title: 'FSc Pre-Medical',
    level: 'Intermediate',
    description: 'A comprehensive science foundation designed for students aspiring to pursue careers in medicine, surgery, dentistry, and allied health sciences.',
    duration: '2 Years',
    eligibility: 'Matriculation or equivalent with Physics, Chemistry, and Biology (Minimum 50% Marks)',
    features: [
      'Advanced biology labs with modern specimen microscopes',
      'Specialized sessions on biochemistry and organic chemistry',
      'Guidance for medical university entrance exams',
      'Interactive anatomy charts and virtual dissections'
    ]
  },
  {
    id: 'fsc-engineering',
    title: 'FSc Pre-Engineering',
    level: 'Intermediate',
    description: 'Rigorous engineering preparation focused on developing problem-solving skills, numerical logic, and core scientific competencies for engineering pathways.',
    duration: '2 Years',
    eligibility: 'Matriculation or equivalent with Physics, Chemistry, and Mathematics (Minimum 50% Marks)',
    features: [
      'Equipped physics laboratories with modern test apparatus',
      'Advanced algebra, calculus, and mathematical modeling classes',
      'Technological workshops and structural science experiments',
      'Prep pathways for engineering university admission entries'
    ]
  },
  {
    id: 'ics-computer',
    title: 'ICS Computer Science',
    level: 'Intermediate',
    description: 'Modern IT curriculum introducing fundamentals of computer science, software programming languages, database structures, and dynamic web architectures.',
    duration: '2 Years',
    eligibility: 'Matriculation or equivalent with Science subjects or Computer Studies (Minimum 50% Marks)',
    features: [
      'State-of-the-art computer labs with high-speed internet coding terminals',
      'Hands-on coding in C++ and basic database operations',
      'Fundamental training in computer operating systems and hardware architecture',
      'Project-based learning approach simulating junior software design tasks'
    ]
  }
];

/** @type {Program[]} */
const PROGRAMS = [
  {
    id: 'bed',
    title: 'B.Ed (1.5 & 2.5 Years)',
    description: 'Teacher preparation program with both 1.5 year (for Masters/BS holders) and 2.5 year (for Bachelors/BA/BSc holders) educational pathways.',
    details: 'This program prepares students for professional classroom teaching, modern educational leadership, learning psychology, and curriculum planning through practical work and theoretical modules.',
    duration: '1.5 or 2.5 Years',
    requirements: 'BS/MA/MSc (for 1.5 years) or BA/BSc/Equivalent (for 2.5 years) with at least 45% marks or 2.0 CGPA',
    careers: ['High School Educator', 'Curriculum Developer', 'School Administrator', 'Academic Consultant', 'Education Officer']
  },
  {
    id: 'bs-education',
    title: 'AD & BS Education',
    description: 'Associate Diploma (2 years) and Bachelor of Science in Education (4 years) for future educators and teaching professionals.',
    details: 'Designed specifically for aspiring teachers, this program develops critical pedagogical skills, lesson planning, educational sociology, classroom management, and child psychological assessment expertise.',
    duration: '2 Years (AD) / 4 Years (BS)',
    requirements: 'Intermediate or equivalent qualification with at least 45% marks',
    careers: ['Primary/Middle School Teacher', 'Educational Consultant', 'Instructional Designer', 'Special Education Support', 'Education NGO Coordinator']
  },
  {
    id: 'bs-english',
    title: 'AD & BS in English',
    description: 'English language, rhetoric, and classical literature programs with associate and bachelor degree options.',
    details: 'Students gain strong communication, literary analysis, comparative reading, and research abilities that support professional careers in writing, teaching, journalism, and public relations.',
    duration: '2 Years (AD) / 4 Years (BS)',
    requirements: 'Intermediate or equivalent qualification with at least 45% marks',
    careers: ['Content Writer', 'Communications Specialist', 'English Instructor', 'Media Journalist', 'PR Coordinator', 'Academic Editor']
  },
  {
    id: 'bs-urdu',
    title: 'AD & BS in Urdu',
    description: 'Urdu language, classical poetry, and modern literature programs with associate and bachelor degree options.',
    details: 'This program strengthens Urdu language proficiency, literary knowledge, research methodologies, and academic writing skills, fostering preservation of national cultural assets and media engagement.',
    duration: '2 Years (AD) / 4 Years (BS)',
    requirements: 'Intermediate or equivalent qualification with at least 45% marks (Urdu elective preferred)',
    careers: ['Urdu Language Educator', 'Media Anchor/Scriptwriter', 'Literary Researcher', 'Translations Director', 'Cultural Attaché', 'Publishing Consultant']
  },
  {
    id: 'bs-hpe',
    title: 'AD & BS in HPE',
    description: 'Health and physical education programs for comprehensive careers in teaching, coaching, sports therapy, and wellness.',
    details: 'Focused on human anatomy, fitness science, sports administration, community health, and athletic leadership, preparing students to foster active lifestyles and coordinate sports systems.',
    duration: '2 Years (AD) / 4 Years (BS)',
    requirements: 'Intermediate or equivalent qualification with at least 45% marks (Sports background preferred)',
    careers: ['Sports Coach', 'Physical Education Director', 'Fitness Trainer', 'Sports Facility Administrator', 'Wellness Consultant', 'Community Health Organizer']
  },
  {
    id: 'ddm',
    title: 'DDM (Diploma in Disaster Management)',
    description: 'Diploma in Disaster Management for community safety, hazard assessment, risk mitigation, and emergency response planning.',
    details: 'This course trains students in disaster vulnerability reduction, emergency relief protocols, first response coordination, community resilience planning, and environmental risk assessment.',
    duration: '1 Year (Diploma)',
    requirements: 'Intermediate/DAE or equivalent with at least 45% marks',
    careers: ['Disaster Relief Coordinator', 'Safety Auditor', 'NGO Operations Officer', 'Emergency Services Manager', 'Environmental Analyst']
  },
  {
    id: 'jdpe',
    title: 'JDPE (Journalism, Digital & Print Education)',
    description: 'Journalism, Digital, and Print Education for modern media, creative writing, broadcasting, and online communication careers.',
    details: 'This program equips learners with interviewing, news writing, page formatting, digital broadcast media, podcast publishing, and communication skills needed for today’s press networks.',
    duration: '1 Year (Diploma) / 2 Years (AD)',
    requirements: 'Intermediate or equivalent with at least 45% marks',
    careers: ['News Reporter', 'Digital Media Curator', 'Broadcast Journalist', 'Social Media Editor', 'Press Relations Officer', 'Print Desk Editor']
  }
];

/** @type {FAQItem[]} */
const FAQS = [
  {
    id: 'faq-1',
    category: 'Admissions',
    question: 'How can I apply for admission at Himalaya College?',
    answer: 'You can easily apply by filling out the online Application Suite on this website! Simply choose your preferred program, input your personal details, previous qualification, and submit. Alternatively, you can visit our Swabi campus in person.'
  },
  {
    id: 'faq-2',
    category: 'Admissions',
    question: 'What documents are required for the admission process?',
    answer: 'Standard required documents include: (1) Matric/SSC Certificate and Marksheet, (2) Intermediate/HSSC Certificate and Marksheet (for Degree Programs), (3) Student CNIC or B-Form, (4) Father’s CNIC, and (5) 4 recent passport-size photographs.'
  },
  {
    id: 'faq-3',
    category: 'Programs',
    question: 'What are the main differences between B.Ed 1.5 year and 2.5 year?',
    answer: 'The 1.5 Year B.Ed is designed specifically for students who already hold a 16-year education (BS, MA, MSc or equivalent). The 2.5 Year B.Ed is designed for students who hold a 14-year education (BA, BSc or standard two-year Bachelor Degree).'
  },
  {
    id: 'faq-4',
    category: 'Campus Info',
    question: 'Does HCST provide transport and hostel facilities?',
    answer: 'Yes! Himalaya College provides dedicated, safe transport services covering multiple routes in the District and surrounding areas. For hostel accommodations, our administrative office coordinates with secure partner hostels nearby for out-of-town students.'
  },
  {
    id: 'faq-5',
    category: 'Campus Info',
    question: 'What extra-curricular activities exist for students?',
    answer: 'We provide a highly balanced student environment! We host annual sports tournaments (cricket, badminton, table tennis), inter-college debate championships, environmental green-drives, and science exhibitions where students build live prototypes.'
  }
];

/** @type {Testimonial[]} */
const TESTIMONIALS = [
  {
    id: 't-1',
    text: 'The academic environment at Himalaya College of Science and Technology is exceptionally rigorous yet deeply supportive. Thanks to the dedicated teachers and specialized physics labs, I cleared my intermediate with top marks.',
    author: 'Ayesha Khan',
    role: 'FSc Pre-Medical Alumna (Currently in Medical School)',
    rating: 5
  },
  {
    id: 't-2',
    text: 'Choosing Himalaya College for my BS in English was the best academic decision of my life. The critical discussion circles, literary critique workshops, and communicative exercises boosted my vocabulary and confidence to the next level.',
    author: 'Ali Zain',
    role: 'BS English Graduate',
    rating: 5
  },
  {
    id: 't-3',
    text: 'The practical approach of the ICS Computer Science laboratories was unparalleled. We spent long hours programming and dissecting databases rather than just memorizing code. Today, I work as a junior backend engineer.',
    author: 'Maria Khan',
    role: 'ICS Computer Science Alumna',
    rating: 5
  },
  {
    id: 't-4',
    text: 'Administering physical training programs while pursuing a BS in HPE at HCST gave me real-world coaching experience. The facilities, track fields, and health science courses prepare you for immediate work in fitness and schools.',
    author: 'Sohail Ahmad',
    role: 'BS HPE Student',
    rating: 4
  }
];

/** @type {GalleryImage[]} */
const GALLERY_IMAGES = [
  {
    id: 'g-1',
    url: 'https://res.cloudinary.com/yc9datqi/image/upload/f_auto,q_auto/HCST_nogxrl',
    title: 'HCST Campus Frontview',
    category: 'campus'
  },
  {
    id: 'g-2',
    url: 'Images/G1.jpeg',
    title: 'HCST Campus Frontview',
    category: 'campus'
  },
  {
    id: 'g-3',
    url: 'Images/G2.jpeg',
    title: 'Scholarship Distribution Ceremon',
    category: 'campus'
  },
  {
    id: 'g-4',
    url: 'Images/G3.jpeg',
    title: 'Scholarship Distribution Ceremon',
    category: 'campus'
  },
  {
    id: 'g-5',
    url: 'Images/G4.jpeg',
    title: 'Scholarship Distribution Ceremon',
    category: 'students'
  },
  {
    id: 'g-6',
    url: 'Images/G5.jpeg',
    title: 'Scholarship Distribution Ceremon',
    category: 'lab'
  }
];

// Attach variables to window for global namespace access
window.COURSES = COURSES;
window.PROGRAMS = PROGRAMS;
window.FAQS = FAQS;
window.TESTIMONIALS = TESTIMONIALS;
window.GALLERY_IMAGES = GALLERY_IMAGES;
