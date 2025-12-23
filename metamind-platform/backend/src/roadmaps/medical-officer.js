// Medical Officer (MO) Roadmap
module.exports = {
  id: 24,
  title: "Medical Officer (MO)",
  category: "Healthcare",
  description: "Become a qualified Medical Officer through the University of Colombo Medical Faculty. This prestigious career path leads to becoming a doctor serving in government hospitals and healthcare facilities across Sri Lanka.",
  steps: [
    {
      id: 201,
      step_number: 1,
      title: "Complete A/L Science Stream",
      description: "Achieve excellent results in Advanced Level Science stream with Biology, Chemistry, and Physics. High Z-score required for medical faculty admission.",
      duration: "2 years",
      difficulty: "Very High",
      requirements: "Biology A/L, Chemistry A/L, Physics A/L with Z-score 1.5+",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.doenets.lk/",
        documents: "A/L results, Z-score calculation"
      },
      order_index: 1,
      details: {
        subjects: ["Biology", "Chemistry", "Physics", "English"],
        minimumZScore: "1.5 or higher",
        competitiveEntry: "Top 0.1% of A/L students",
        studyTips: ["Focus on understanding concepts", "Practice past papers", "Join tuition classes"]
      }
    },
    {
      id: 202,
      step_number: 2,
      title: "Apply for Medical Faculty",
      description: "Apply to University of Colombo Medical Faculty through UGC (University Grants Commission) system during the application period.",
      duration: "1-2 months",
      difficulty: "High",
      requirements: "High Z-score, completed A/L, application documents",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.ugc.ac.lk/",
        documents: "A/L results, Z-score, application form, certificates"
      },
      order_index: 2,
      details: {
        applicationProcess: ["UGC online application", "Document verification", "Selection based on Z-score"],
        requiredDocuments: ["A/L certificate", "Z-score report", "Birth certificate", "School leaving certificate"],
        selectionCriteria: "Merit-based on Z-score ranking"
      }
    },
    {
      id: 203,
      step_number: 3,
      title: "5-Year MBBS Program",
      description: "Complete the 5-year Bachelor of Medicine and Bachelor of Surgery (MBBS) program at University of Colombo Medical Faculty.",
      duration: "5 years",
      difficulty: "Very High",
      requirements: "Regular attendance, continuous assessment, clinical rotations",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.cmb.ac.lk/",
        textbooks: "Medical textbooks, anatomy atlases, clinical handbooks"
      },
      order_index: 3,
      details: {
        year1: ["Basic sciences", "Anatomy", "Physiology", "Biochemistry"],
        year2: ["Pathology", "Microbiology", "Pharmacology", "Community medicine"],
        year3: ["Medicine", "Surgery", "Obstetrics & Gynecology", "Pediatrics"],
        year4: ["Clinical rotations", "Specialty rotations", "Emergency medicine"],
        year5: ["Final year rotations", "Internship preparation", "Research project"]
      }
    },
    {
      id: 204,
      step_number: 4,
      title: "Clinical Rotations",
      description: "Complete extensive clinical rotations in various hospital departments including medicine, surgery, pediatrics, and emergency medicine.",
      duration: "2 years",
      difficulty: "Very High",
      requirements: "Successful completion of pre-clinical years, clinical competency",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.cmb.ac.lk/",
        clinicalSites: "National Hospital, Teaching Hospital Colombo, District hospitals"
      },
      order_index: 4,
      details: {
        rotationAreas: ["Internal Medicine", "General Surgery", "Pediatrics", "Obstetrics & Gynecology", "Emergency Medicine", "Psychiatry", "Community Medicine"],
        durationPerRotation: "6-8 weeks per department",
        skillsLearned: ["Patient history taking", "Physical examination", "Diagnostic procedures", "Treatment planning", "Emergency care"],
        supervision: "Senior doctors and consultants"
      }
    },
    {
      id: 205,
      step_number: 5,
      title: "Final MBBS Examinations",
      description: "Pass comprehensive final examinations including written papers, practical assessments, and clinical examinations.",
      duration: "3-6 months",
      difficulty: "Very High",
      requirements: "Completion of all clinical rotations, satisfactory academic performance",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.cmb.ac.lk/",
        studyMaterials: "Past papers, clinical guidelines, medical journals"
      },
      order_index: 5,
      details: {
        examComponents: ["Written theory papers", "Practical examinations", "Clinical viva voce", "OSCE (Objective Structured Clinical Examination)"],
        passingCriteria: "Minimum 50% in each subject with 60% overall average",
        retakePolicy: "Limited retake opportunities",
        certification: "MBBS degree upon successful completion"
      }
    },
    {
      id: 206,
      step_number: 6,
      title: "Internship Training",
      description: "Complete mandatory 1-year internship training in government hospitals under supervision of senior doctors.",
      duration: "1 year",
      difficulty: "High",
      requirements: "MBBS degree, internship application, medical registration",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.health.gov.lk/",
        hospitals: "Teaching hospitals, district hospitals, base hospitals"
      },
      order_index: 6,
      details: {
        internshipAreas: ["Medicine", "Surgery", "Pediatrics", "Obstetrics & Gynecology", "Emergency Medicine", "Community Medicine"],
        durationPerArea: "2 months per department",
        responsibilities: ["Patient care under supervision", "Emergency duties", "Outpatient clinics", "Ward rounds"],
        assessment: "Continuous evaluation by senior doctors"
      }
    },
    {
      id: 207,
      step_number: 7,
      title: "SLMC Registration",
      description: "Register with Sri Lanka Medical Council (SLMC) to obtain full medical practice license.",
      duration: "2-4 weeks",
      difficulty: "Medium",
      requirements: "MBBS degree, internship completion certificate, application fee",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.slmc.lk/",
        documents: "MBBS certificate, internship certificate, application form, medical certificate"
      },
      order_index: 7,
      details: {
        registrationProcess: ["Submit application", "Pay registration fee", "Medical examination", "Receive practice license"],
        registrationFee: "As per SLMC current rates",
        validity: "Annual renewal required",
        benefits: ["Full practice rights", "Government employment eligibility", "Private practice rights"]
      }
    },
    {
      id: 208,
      step_number: 8,
      title: "Postgraduate Specialization (Optional)",
      description: "Pursue postgraduate specialization in specific medical fields such as Cardiology, Neurology, Surgery, etc.",
      duration: "3-5 years",
      difficulty: "Very High",
      requirements: "MBBS degree, SLMC registration, entrance examination",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.cmb.ac.lk/",
        specializations: "MD/MS programs, Fellowship programs, International certifications"
      },
      order_index: 8,
      details: {
        specializations: ["Internal Medicine", "Surgery", "Pediatrics", "Obstetrics & Gynecology", "Cardiology", "Neurology", "Orthopedics", "Anesthesiology"],
        duration: "3-5 years depending on specialty",
        requirements: ["Entrance examination", "Interview", "Clinical experience", "Research project"],
        benefits: ["Higher salary", "Specialist recognition", "Consultant positions", "International opportunities"]
      }
    },
    {
      id: 209,
      step_number: 9,
      title: "Government Service",
      description: "Join government health service as a Medical Officer in hospitals across Sri Lanka.",
      duration: "Ongoing",
      difficulty: "Medium",
      requirements: "SLMC registration, job application, interview",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.health.gov.lk/",
        jobPortals: "Government job websites, health ministry notifications"
      },
      order_index: 9,
      details: {
        positions: ["Medical Officer", "Senior Medical Officer", "Consultant", "Director of Health Services"],
        salaryRange: "Entry level: LKR 60,000-80,000 per month",
        benefits: ["Government pension", "Medical benefits", "Housing allowance", "Transport allowance"],
        locations: "Hospitals across all districts in Sri Lanka"
      }
    },
    {
      id: 210,
      step_number: 10,
      title: "Professional Development",
      description: "Continue professional development through continuing medical education, research, and specialization.",
      duration: "Ongoing",
      difficulty: "Medium",
      requirements: "Active medical practice, continuous learning, professional ethics",
      resources: {
        video: "https://www.youtube.com/watch?v=8Dvy7Wmfn5g",
        link: "https://www.slmc.lk/",
        development: "CME programs, medical conferences, research opportunities, international fellowships"
      },
      order_index: 10,
      details: {
        developmentAreas: ["Continuing Medical Education (CME)", "Research publications", "International conferences", "Leadership training"],
        requirements: "Annual CME credits for license renewal",
        opportunities: ["International fellowships", "Research grants", "Academic positions", "Private practice"],
        careerGrowth: ["Senior positions", "Administrative roles", "Academic careers", "International opportunities"]
      }
    }
  ]
};
