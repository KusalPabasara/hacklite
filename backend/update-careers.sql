-- Update careers table to only include NTS, VTA, and German Tech careers
-- First, clear existing careers
DELETE FROM careers;

-- Insert NTS (Nursing Training School) career
INSERT INTO careers (title, category, description, roadmap) VALUES (
  'NTS - Nursing Training School',
  'Healthcare',
  'Professional nursing training program for healthcare professionals in Sri Lanka',
  '[
    {"step": 1, "title": "Complete A/L Biology", "description": "Finish Advanced Level Biology with good grades (minimum 3 passes including Biology)"},
    {"step": 2, "title": "Meet Entry Requirements", "description": "Ensure you meet age requirements (17-25 years) and health standards"},
    {"step": 3, "title": "Apply for NTS", "description": "Submit application to Nursing Training School with required documents"},
    {"step": 4, "title": "Entrance Examination", "description": "Pass the competitive NTS entrance examination (Biology, English, General Knowledge)"},
    {"step": 5, "title": "Interview Process", "description": "Attend interview and medical examination if selected"},
    {"step": 6, "title": "3-Year Training Program", "description": "Complete comprehensive nursing training including theory and clinical practice"},
    {"step": 7, "title": "Clinical Rotations", "description": "Complete clinical rotations in various hospital departments"},
    {"step": 8, "title": "Final Examinations", "description": "Pass all theoretical and practical examinations"},
    {"step": 9, "title": "MOH Registration", "description": "Register with Ministry of Health as a qualified nurse"},
    {"step": 10, "title": "Start Nursing Career", "description": "Begin your professional nursing career in hospitals or healthcare facilities"}
  ]'
);

-- Insert VTA (Vocational Training Authority) career
INSERT INTO careers (title, category, description, roadmap) VALUES (
  'VTA - Vocational Training Authority',
  'Technical',
  'Technical and vocational training for various skilled trades across Sri Lanka',
  '[
    {"step": 1, "title": "Complete O/L Education", "description": "Finish Ordinary Level education with basic passes"},
    {"step": 2, "title": "Choose Your Trade", "description": "Select from available trades: Electrical, Plumbing, Welding, Automotive, Construction, etc."},
    {"step": 3, "title": "Visit VTA Center", "description": "Visit nearest VTA center (island-wide network) for course information"},
    {"step": 4, "title": "Apply Online/Offline", "description": "Apply through VTA website (course.vta.lk) or visit center directly"},
    {"step": 5, "title": "Course Selection", "description": "Choose between Full-time (3-18 months) or Part-time (1-12 months) courses"},
    {"step": 6, "title": "NVQ/NON-NVQ Training", "description": "Complete National Vocational Qualification or Non-NVQ training program"},
    {"step": 7, "title": "Practical Training", "description": "Hands-on training in workshops and real-world projects"},
    {"step": 8, "title": "Assessment & Testing", "description": "Complete practical and theoretical assessments"},
    {"step": 9, "title": "VTA Certification", "description": "Obtain official VTA certification upon successful completion"},
    {"step": 10, "title": "Job Placement Support", "description": "Access VTA job placement services and start your technical career"}
  ]'
);

-- Insert German Technical career
INSERT INTO careers (title, category, description, roadmap) VALUES (
  'German Technical Training',
  'Technical',
  'Advanced technical training with German standards and international certification',
  '[
    {"step": 1, "title": "Meet Entry Requirements", "description": "Complete O/L with good grades in Mathematics and Science subjects"},
    {"step": 2, "title": "Choose Specialization", "description": "Select from: Automobile Mechanic, Electrician, Machinist, Welder, Industrial Mechatronics, etc."},
    {"step": 3, "title": "Apply to CGTTI", "description": "Apply to Ceylon German Technical Training Institute (Moratuwa, Borella, or Anamaduwa)"},
    {"step": 4, "title": "Entrance Assessment", "description": "Pass entrance examination and interview process"},
    {"step": 5, "title": "German Language Training", "description": "Complete German language course (B1 level) for international opportunities"},
    {"step": 6, "title": "Full-Time Training", "description": "Complete comprehensive full-time training program (varies by specialization)"},
    {"step": 7, "title": "Practical Workshops", "description": "Hands-on training in modern workshops with German-standard equipment"},
    {"step": 8, "title": "Industrial Training", "description": "Complete industrial training and internships with partner companies"},
    {"step": 9, "title": "German Certification", "description": "Obtain internationally recognized German technical certification"},
    {"step": 10, "title": "Career Opportunities", "description": "Access local and international job opportunities with German companies"}
  ]'
);

-- Verify the changes
SELECT * FROM careers ORDER BY id;
