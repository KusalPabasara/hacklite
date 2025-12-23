// NTS - Nursing Training School Roadmap
module.exports = {
  id: 23,
  title: "NTS - Nursing Training School",
  category: "Healthcare",
  description: "Professional nursing training program for healthcare professionals in Sri Lanka. This comprehensive 3-year program prepares students for careers in government hospitals, private healthcare facilities, and community health services.",
  steps: [
    {
      id: 101,
      step_number: 1,
      title: "Complete A/L Biology",
      description: "Finish Advanced Level Biology with good grades (minimum 3 passes including Biology). This is the foundation requirement for nursing education.",
      duration: "2 years",
      difficulty: "High",
      requirements: "Biology A/L, Chemistry A/L, Physics A/L with minimum 3 passes",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.doenets.lk/",
        documents: "A/L results, school leaving certificate"
      },
      order_index: 1,
      details: {
        subjects: ["Biology", "Chemistry", "Physics", "English"],
        minimumGrades: "3 passes including Biology",
        ageRequirement: "17-25 years old"
      }
    },
    {
      id: 102,
      step_number: 2,
      title: "Meet Entry Requirements",
      description: "Ensure you meet all entry requirements including age limits, health standards, and educational qualifications for NTS admission.",
      duration: "1-2 months",
      difficulty: "Medium",
      requirements: "Age 17-25, good health, clean criminal record, English proficiency",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.health.gov.lk/",
        documents: "Medical certificate, police clearance, birth certificate"
      },
      order_index: 2,
      details: {
        ageRange: "17-25 years",
        healthRequirements: ["Medical examination", "Physical fitness", "No communicable diseases"],
        characterRequirements: ["Clean criminal record", "Good moral character", "References"]
      }
    },
    {
      id: 103,
      step_number: 3,
      title: "Apply for NTS",
      description: "Submit application to Nursing Training School with all required documents during the application period.",
      duration: "2-4 weeks",
      difficulty: "Medium",
      requirements: "Completed application form, certified copies of certificates, application fee",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.health.gov.lk/",
        documents: "Application form, educational certificates, identity documents, application fee receipt"
      },
      order_index: 3,
      details: {
        applicationPeriod: "Usually announced in newspapers and health ministry website",
        requiredDocuments: ["A/L certificate", "O/L certificate", "Birth certificate", "Medical certificate", "Police clearance"],
        applicationFee: "As per current government rates"
      }
    },
    {
      id: 104,
      step_number: 4,
      title: "Entrance Examination",
      description: "Pass the competitive NTS entrance examination covering Biology, English, and General Knowledge.",
      duration: "1 day",
      difficulty: "High",
      requirements: "Strong knowledge in Biology, English, and current affairs",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.health.gov.lk/",
        studyMaterials: "Past papers, biology textbooks, English practice tests"
      },
      order_index: 4,
      details: {
        examSubjects: ["Biology (40%)", "English (30%)", "General Knowledge (30%)"],
        examFormat: "Multiple choice questions",
        passingGrade: "Minimum 50% overall with 40% in each subject",
        studyTips: ["Focus on human anatomy and physiology", "Practice English comprehension", "Stay updated with current affairs"]
      }
    },
    {
      id: 105,
      step_number: 5,
      title: "Interview Process",
      description: "Attend interview and medical examination if selected based on entrance exam results.",
      duration: "1-2 weeks",
      difficulty: "Medium",
      requirements: "Good communication skills, professional appearance, medical fitness",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.health.gov.lk/",
        preparation: "Interview practice, medical checkup, professional attire"
      },
      order_index: 5,
      details: {
        interviewTopics: ["Motivation for nursing", "Current affairs", "Basic healthcare knowledge", "Communication skills"],
        medicalExamination: ["Physical fitness", "Vision and hearing tests", "Blood tests", "Chest X-ray"],
        selectionCriteria: ["Exam performance (70%)", "Interview (20%)", "Medical fitness (10%)"]
      }
    },
    {
      id: 106,
      step_number: 6,
      title: "3-Year Training Program",
      description: "Complete comprehensive nursing training including theory and clinical practice over three years.",
      duration: "3 years",
      difficulty: "High",
      requirements: "Regular attendance, assignment completion, practical assessments",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.health.gov.lk/",
        textbooks: "Nursing fundamentals, anatomy, physiology, pharmacology textbooks"
      },
      order_index: 6,
      details: {
        year1: ["Nursing fundamentals", "Anatomy and physiology", "Microbiology", "Basic clinical skills"],
        year2: ["Medical-surgical nursing", "Pediatric nursing", "Obstetric nursing", "Community health"],
        year3: ["Psychiatric nursing", "Critical care nursing", "Nursing management", "Research methods"],
        assessments: ["Theory examinations", "Practical assessments", "Clinical evaluations", "Research projects"]
      }
    },
    {
      id: 107,
      step_number: 7,
      title: "Clinical Rotations",
      description: "Complete clinical rotations in various hospital departments including medical, surgical, pediatric, and emergency units.",
      duration: "18 months",
      difficulty: "High",
      requirements: "Successful completion of theoretical courses, clinical competency",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.health.gov.lk/",
        clinicalSites: "Teaching hospitals, district hospitals, community health centers"
      },
      order_index: 7,
      details: {
        rotationAreas: ["Medical wards", "Surgical wards", "Pediatric wards", "Maternity wards", "Emergency department", "ICU", "Community health"],
        durationPerRotation: "4-6 weeks per department",
        skillsLearned: ["Patient assessment", "Medication administration", "Wound care", "Emergency procedures", "Patient education"],
        supervision: "Clinical instructors and senior nurses"
      }
    },
    {
      id: 108,
      step_number: 8,
      title: "Final Examinations",
      description: "Pass all theoretical and practical examinations including written tests, practical assessments, and clinical evaluations.",
      duration: "2-3 months",
      difficulty: "High",
      requirements: "Completion of all clinical rotations, satisfactory academic performance",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.health.gov.lk/",
        studyMaterials: "Comprehensive review materials, past papers, clinical guidelines"
      },
      order_index: 8,
      details: {
        examComponents: ["Written theory exam", "Practical skills assessment", "Clinical case studies", "Oral examination"],
        passingCriteria: "Minimum 50% in each component with 60% overall average",
        retakePolicy: "One retake allowed per subject",
        certification: "NTS Nursing Certificate upon successful completion"
      }
    },
    {
      id: 109,
      step_number: 9,
      title: "MOH Registration",
      description: "Register with Ministry of Health as a qualified nurse to practice legally in Sri Lanka.",
      duration: "2-4 weeks",
      difficulty: "Low",
      requirements: "NTS certificate, application form, registration fee, medical certificate",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.health.gov.lk/",
        documents: "NTS certificate, application form, medical certificate, passport photos"
      },
      order_index: 9,
      details: {
        registrationProcess: ["Submit application", "Pay registration fee", "Medical examination", "Receive registration certificate"],
        registrationFee: "As per current government rates",
        validity: "Annual renewal required",
        benefits: ["Legal practice rights", "Government employment eligibility", "Professional recognition"]
      }
    },
    {
      id: 110,
      step_number: 10,
      title: "Start Nursing Career",
      description: "Begin your professional nursing career in hospitals, healthcare facilities, or community health services.",
      duration: "Ongoing",
      difficulty: "Medium",
      requirements: "MOH registration, job application, professional development",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.health.gov.lk/",
        jobPortals: "Government job websites, private hospital websites, nursing associations"
      },
      order_index: 10,
      details: {
        careerOptions: ["Government hospitals", "Private hospitals", "Community health centers", "Nursing homes", "School health services"],
        salaryRange: "Entry level: LKR 25,000-35,000 per month",
        advancement: ["Senior staff nurse", "Nursing supervisor", "Nursing officer", "Nursing education"],
        continuingEducation: ["Specialization courses", "Post-graduate studies", "Professional development", "Certification programs"]
      }
    }
  ]
};