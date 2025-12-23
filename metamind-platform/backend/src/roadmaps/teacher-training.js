// Teacher Training College Roadmap
module.exports = {
  id: 27,
  title: "Teacher Training College",
  category: "Education",
  description: "Professional teacher training program preparing educators for primary and secondary schools. This comprehensive program combines theoretical knowledge with practical teaching experience.",
  steps: [
    {
      id: 401,
      step_number: 1,
      title: "Meet Entry Requirements",
      description: "Complete A/L with good grades and meet age requirements for teacher training college admission.",
      duration: "2 years",
      difficulty: "High",
      requirements: "A/L with 3 passes, age 18-30, English proficiency",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.moe.gov.lk/",
        documents: "A/L certificate, birth certificate, medical certificate"
      },
      order_index: 1,
      details: {
        academicRequirements: "A/L with minimum 3 passes including relevant subjects",
        ageLimit: "18-30 years old",
        languageRequirements: "Proficiency in English and Sinhala/Tamil",
        healthRequirements: "Medical fitness certificate, good hearing and vision"
      }
    },
    {
      id: 402,
      step_number: 2,
      title: "Choose Teaching Subject",
      description: "Select your teaching subject specialization based on A/L subjects and career interests.",
      duration: "1-2 weeks",
      difficulty: "Low",
      requirements: "A/L results, subject preference, career goals",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.moe.gov.lk/",
        subjects: "Mathematics, Science, English, Sinhala, Tamil, History, Geography, Commerce"
      },
      order_index: 2,
      details: {
        availableSubjects: [
          "Mathematics",
          "Science (Physics, Chemistry, Biology)",
          "English Language",
          "Sinhala Language",
          "Tamil Language",
          "History",
          "Geography",
          "Commerce",
          "Art",
          "Physical Education"
        ],
        selectionCriteria: "Based on A/L subject performance and availability",
        specialization: "Choose one main subject for in-depth study"
      }
    },
    {
      id: 403,
      step_number: 3,
      title: "Apply to Teacher Training College",
      description: "Submit application to selected Teacher Training College with required documents during application period.",
      duration: "2-4 weeks",
      difficulty: "Medium",
      requirements: "Completed application form, educational certificates, application fee",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.moe.gov.lk/",
        documents: "Application form, A/L certificate, birth certificate, medical certificate, character certificate"
      },
      order_index: 3,
      details: {
        applicationProcess: [
          "Online application submission",
          "Document verification",
          "Application fee payment",
          "Selection based on merit"
        ],
        requiredDocuments: [
          "A/L certificate",
          "O/L certificate",
          "Birth certificate",
          "Medical certificate",
          "Character certificate",
          "Passport photos"
        ],
        selectionCriteria: "Merit-based on A/L results and subject availability"
      }
    },
    {
      id: 404,
      step_number: 4,
      title: "Entrance Examination",
      description: "Pass the competitive entrance examination covering general knowledge, English, and subject-specific content.",
      duration: "1 day",
      difficulty: "High",
      requirements: "Strong general knowledge, English proficiency, subject knowledge",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.moe.gov.lk/",
        studyMaterials: "Past papers, general knowledge books, subject textbooks"
      },
      order_index: 4,
      details: {
        examComponents: [
          "General Knowledge (30%)",
          "English Language (30%)",
          "Subject-specific content (40%)"
        ],
        examFormat: "Multiple choice and written questions",
        passingGrade: "Minimum 50% overall with 40% in each section",
        studyTips: [
          "Focus on current affairs",
          "Practice English comprehension",
          "Review A/L subject content",
          "Practice past papers"
        ]
      }
    },
    {
      id: 405,
      step_number: 5,
      title: "Interview and Selection",
      description: "Attend interview and complete selection process including aptitude tests and group discussions.",
      duration: "1-2 weeks",
      difficulty: "Medium",
      requirements: "Good communication skills, teaching aptitude, professional appearance",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.moe.gov.lk/",
        preparation: "Interview practice, teaching aptitude assessment, professional attire"
      },
      order_index: 5,
      details: {
        selectionProcess: [
          "Personal interview",
          "Teaching aptitude test",
          "Group discussion",
          "Presentation skills assessment"
        ],
        evaluationCriteria: [
          "Communication skills",
          "Teaching potential",
          "Subject knowledge",
          "Professional attitude",
          "Problem-solving ability"
        ],
        finalSelection: "Based on exam results (70%) and interview (30%)"
      }
    },
    {
      id: 406,
      step_number: 6,
      title: "2-Year Diploma Program",
      description: "Complete comprehensive 2-year teacher training diploma program covering pedagogy, subject knowledge, and practical teaching skills.",
      duration: "2 years",
      difficulty: "High",
      requirements: "Regular attendance, assignment completion, practical assessments",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.moe.gov.lk/",
        textbooks: "Education psychology, teaching methods, subject-specific materials"
      },
      order_index: 6,
      details: {
        year1: [
          "Educational Psychology",
          "Teaching Methods and Techniques",
          "Curriculum Development",
          "Classroom Management",
          "Subject-specific Pedagogy"
        ],
        year2: [
          "Assessment and Evaluation",
          "Educational Technology",
          "Special Education",
          "School Administration",
          "Research Methods in Education"
        ],
        assessments: [
          "Written examinations",
          "Practical teaching assessments",
          "Portfolio development",
          "Research projects"
        ]
      }
    },
    {
      id: 407,
      step_number: 7,
      title: "Teaching Practice",
      description: "Complete supervised teaching practice in schools to gain real classroom experience and develop teaching skills.",
      duration: "6 months",
      difficulty: "High",
      requirements: "Completed theoretical courses, teaching competency",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.moe.gov.lk/",
        schools: "Partner schools, government schools, private schools"
      },
      order_index: 7,
      details: {
        practiceAreas: [
          "Primary school teaching",
          "Secondary school teaching",
          "Subject-specific teaching",
          "Classroom management",
          "Student assessment"
        ],
        supervision: "Supervised by experienced teachers and college instructors",
        responsibilities: [
          "Lesson planning and delivery",
          "Student assessment and evaluation",
          "Parent-teacher communication",
          "Extracurricular activities",
          "Professional development"
        ],
        evaluation: "Continuous assessment by supervising teachers"
      }
    },
    {
      id: 408,
      step_number: 8,
      title: "Final Examinations",
      description: "Complete comprehensive final examinations including written papers, practical teaching assessments, and portfolio evaluation.",
      duration: "2-3 months",
      difficulty: "Very High",
      requirements: "Completion of all courses and teaching practice",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.moe.gov.lk/",
        studyMaterials: "Comprehensive review materials, past papers, teaching portfolios"
      },
      order_index: 8,
      details: {
        examComponents: [
          "Written theory examinations",
          "Practical teaching demonstration",
          "Portfolio assessment",
          "Oral examination"
        ],
        passingCriteria: "Minimum 50% in each component with 60% overall average",
        retakePolicy: "One retake allowed per subject",
        certification: "Teacher Training College Diploma upon successful completion"
      }
    },
    {
      id: 409,
      step_number: 9,
      title: "Teacher Registration",
      description: "Register with the Ministry of Education to obtain teaching license and become eligible for government school appointments.",
      duration: "2-4 weeks",
      difficulty: "Low",
      requirements: "Teacher training diploma, application form, registration fee",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.moe.gov.lk/",
        documents: "Diploma certificate, application form, medical certificate, character certificate"
      },
      order_index: 9,
      details: {
        registrationProcess: [
          "Submit application to Ministry of Education",
          "Pay registration fee",
          "Medical examination",
          "Character verification",
          "Receive teaching license"
        ],
        registrationFee: "As per current government rates",
        validity: "Annual renewal required",
        benefits: [
          "Government school employment eligibility",
          "Professional recognition",
          "Pension scheme eligibility",
          "Professional development opportunities"
        ]
      }
    },
    {
      id: 410,
      step_number: 10,
      title: "Start Teaching Career",
      description: "Begin your teaching career in government or private schools with opportunities for professional growth and development.",
      duration: "Ongoing",
      difficulty: "Medium",
      requirements: "Teaching license, job application, interview",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.moe.gov.lk/",
        jobPortals: "Ministry of Education, Provincial Education Departments, Private school websites"
      },
      order_index: 10,
      details: {
        careerOptions: [
          "Government schools",
          "Private schools",
          "International schools",
          "Tutoring centers",
          "Educational institutions"
        ],
        salaryRange: "Entry level: LKR 30,000-50,000 per month",
        benefits: [
          "Government pension scheme",
          "Medical benefits",
          "Housing allowance",
          "Transport allowance",
          "Professional development support"
        ],
        advancement: [
          "Senior teacher",
          "Head of Department",
          "Vice Principal",
          "Principal",
          "Education Officer"
        ],
        continuingEducation: [
          "Postgraduate studies",
          "Professional development courses",
          "Subject-specific training",
          "Educational technology updates",
          "Leadership development"
        ]
      }
    }
  ]
};
