// VTA - Vocational Training Authority Roadmap
module.exports = {
  id: 25,
  title: "VTA - Vocational Training Authority",
  category: "Technical",
  description: "Comprehensive vocational training program offering practical skills in various technical fields. VTA provides hands-on training with industry-standard equipment and recognized certifications.",
  steps: [
    {
      id: 301,
      step_number: 1,
      title: "Choose VTA Course",
      description: "Select from available VTA courses based on your interests and career goals. VTA offers courses in automotive, electrical, mechanical, and construction trades.",
      duration: "1-2 weeks",
      difficulty: "Low",
      requirements: "O/L qualifications, interest in technical fields, course selection",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.vta.gov.lk/",
        documents: "O/L certificate, application form, course brochure"
      },
      order_index: 1,
      details: {
        availableCourses: [
          "Automotive Technology",
          "Electrical Installation",
          "Welding Technology",
          "Plumbing",
          "Carpentry",
          "Masonry",
          "Refrigeration & Air Conditioning",
          "Computer Hardware",
          "Motorcycle Repair",
          "Diesel Engine Technology"
        ],
        courseDuration: "6 months to 2 years depending on course",
        entryRequirements: "O/L with 3 passes including Mathematics and Science"
      }
    },
    {
      id: 302,
      step_number: 2,
      title: "Apply to VTA Center",
      description: "Apply to your nearest VTA training center with required documents and course fees.",
      duration: "2-4 weeks",
      difficulty: "Low",
      requirements: "Completed application form, educational certificates, course fee payment",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.vta.gov.lk/",
        documents: "Application form, O/L certificate, birth certificate, passport photos"
      },
      order_index: 2,
      details: {
        applicationProcess: ["Visit VTA center", "Fill application form", "Submit documents", "Pay course fee"],
        requiredDocuments: ["O/L certificate", "Birth certificate", "NIC copy", "Passport photos", "Medical certificate"],
        courseFees: "Subsidized rates - varies by course",
        centers: "VTA centers located in all districts across Sri Lanka"
      }
    },
    {
      id: 303,
      step_number: 3,
      title: "Foundation Training",
      description: "Complete foundation training covering basic technical concepts, safety protocols, and fundamental skills in your chosen field.",
      duration: "2-3 months",
      difficulty: "Medium",
      requirements: "Regular attendance, active participation, safety compliance",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.vta.gov.lk/",
        equipment: "Basic tools, safety equipment, training materials"
      },
      order_index: 3,
      details: {
        foundationTopics: [
          "Workshop safety and procedures",
          "Basic mathematics for trades",
          "Technical drawing and blueprint reading",
          "Introduction to tools and equipment",
          "Quality control and measurement",
          "Communication skills"
        ],
        practicalSkills: ["Tool handling", "Measurement techniques", "Safety procedures", "Basic calculations"],
        assessments: "Continuous assessment through practical tests and assignments"
      }
    },
    {
      id: 304,
      step_number: 4,
      title: "Specialized Technical Training",
      description: "Undergo intensive hands-on training in your chosen technical field with industry-standard equipment and modern techniques.",
      duration: "3-6 months",
      difficulty: "High",
      requirements: "Completed foundation training, satisfactory performance",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.vta.gov.lk/",
        equipment: "Industry-standard tools and machinery, modern training equipment"
      },
      order_index: 4,
      details: {
        trainingMethods: [
          "Hands-on practical workshops",
          "Simulated work environments",
          "Industry visits and demonstrations",
          "Project-based learning",
          "Peer learning and collaboration"
        ],
        skillAreas: [
          "Technical problem-solving",
          "Equipment operation and maintenance",
          "Quality assurance procedures",
          "Customer service skills",
          "Business and entrepreneurship basics"
        ],
        projects: "Real-world projects and assignments to build portfolio"
      }
    },
    {
      id: 305,
      step_number: 5,
      title: "Industry Attachment",
      description: "Complete mandatory industry attachment to gain real-world experience in relevant companies and workshops.",
      duration: "1-2 months",
      difficulty: "High",
      requirements: "Completed specialized training, good attendance record",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.vta.gov.lk/",
        companies: "Partner companies, local workshops, service centers"
      },
      order_index: 5,
      details: {
        attachmentAreas: [
          "Automotive service centers",
          "Electrical contracting companies",
          "Construction companies",
          "Manufacturing facilities",
          "Repair workshops"
        ],
        learningObjectives: [
          "Real-world work experience",
          "Industry standards and practices",
          "Professional work ethics",
          "Customer interaction skills",
          "Problem-solving in actual situations"
        ],
        deliverables: "Industry attachment report, supervisor evaluation, practical project"
      }
    },
    {
      id: 306,
      step_number: 6,
      title: "Trade Test Preparation",
      description: "Prepare for VTA trade test which includes both theoretical and practical examinations to assess competency.",
      duration: "1-2 months",
      difficulty: "High",
      requirements: "Completed industry attachment, satisfactory performance",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.vta.gov.lk/",
        studyMaterials: "Trade test guidelines, past papers, practical exercises"
      },
      order_index: 6,
      details: {
        testComponents: [
          "Written theory examination",
          "Practical skills demonstration",
          "Oral examination",
          "Portfolio assessment"
        ],
        preparationAreas: [
          "Technical knowledge review",
          "Practical skills practice",
          "Safety procedures",
          "Quality standards",
          "Problem-solving scenarios"
        ],
        passingCriteria: "Minimum 60% in each component with 70% overall average"
      }
    },
    {
      id: 307,
      step_number: 7,
      title: "VTA Trade Test",
      description: "Complete comprehensive trade test including written examination, practical demonstration, and oral assessment.",
      duration: "1-2 days",
      difficulty: "Very High",
      requirements: "Successful completion of all training phases",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.vta.gov.lk/",
        equipment: "All necessary tools and materials for practical test"
      },
      order_index: 7,
      details: {
        testFormat: [
          "Written paper (2-3 hours)",
          "Practical demonstration (4-6 hours)",
          "Oral examination (30 minutes)",
          "Portfolio review"
        ],
        evaluationCriteria: [
          "Technical accuracy",
          "Safety compliance",
          "Quality of work",
          "Time management",
          "Problem-solving ability"
        ],
        certification: "VTA Trade Certificate upon successful completion"
      }
    },
    {
      id: 308,
      step_number: 8,
      title: "NVQ Certification",
      description: "Obtain National Vocational Qualification (NVQ) certificate which is internationally recognized and enhances employability.",
      duration: "2-4 weeks",
      difficulty: "Medium",
      requirements: "VTA trade certificate, additional assessment",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.tertiaryandvocational.gov.lk/",
        documents: "VTA certificate, application form, assessment fee"
      },
      order_index: 8,
      details: {
        nvqLevels: ["NVQ Level 3", "NVQ Level 4", "NVQ Level 5"],
        assessmentProcess: [
          "Competency-based assessment",
          "Portfolio review",
          "Practical demonstration",
          "Knowledge test"
        ],
        benefits: [
          "International recognition",
          "Higher salary potential",
          "Government employment eligibility",
          "Further education opportunities"
        ]
      }
    },
    {
      id: 309,
      step_number: 9,
      title: "Job Placement Support",
      description: "Access VTA's job placement services to find employment opportunities in relevant industries.",
      duration: "1-3 months",
      difficulty: "Medium",
      requirements: "VTA and NVQ certificates, job application preparation",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.vta.gov.lk/",
        services: "Job placement assistance, interview preparation, resume writing"
      },
      order_index: 9,
      details: {
        placementServices: [
          "Job matching with employers",
          "Interview preparation",
          "Resume and CV writing",
          "Career counseling",
          "Industry networking"
        ],
        employmentOpportunities: [
          "Government sector jobs",
          "Private company positions",
          "Self-employment opportunities",
          "International job placements",
          "Further training programs"
        ],
        salaryRange: "Entry level: LKR 25,000-40,000 per month"
      }
    },
    {
      id: 310,
      step_number: 10,
      title: "Career Development",
      description: "Continue professional development through advanced courses, specialization, and entrepreneurship opportunities.",
      duration: "Ongoing",
      difficulty: "Medium",
      requirements: "Active employment, continuous learning mindset",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.vta.gov.lk/",
        development: "Advanced courses, specialization programs, business development support"
      },
      order_index: 10,
      details: {
        advancementOptions: [
          "Advanced technical courses",
          "Supervisory and management training",
          "Entrepreneurship development",
          "International certification programs",
          "Higher education pathways"
        ],
        careerPaths: [
          "Senior technician",
          "Workshop supervisor",
          "Technical instructor",
          "Business owner",
          "Technical consultant"
        ],
        continuingEducation: [
          "Industry updates and new technologies",
          "Safety and quality standards",
          "Business and management skills",
          "International best practices"
        ]
      }
    }
  ]
};