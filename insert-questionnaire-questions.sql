-- MetaMind Platform - Questionnaire Questions Insert Script
-- This script inserts all the questionnaire questions for the career assessment

-- Clear existing questionnaire questions (optional - uncomment if you want to reset)
-- DELETE FROM questionnaire_questions;

-- Insert comprehensive questionnaire questions
INSERT INTO questionnaire_questions (question_text, question_type, options, career_weight, order_index) VALUES 

-- Question 1: Education Level
('What is your highest level of education?', 'single_choice', 
'{"options": ["olevels", "alevels", "diploma", "degree", "masters", "phd"]}',
'{"nts": {"olevels": 0.2, "alevels": 0.9, "diploma": 0.8, "degree": 0.9, "masters": 0.7, "phd": 0.6}, "vta": {"olevels": 0.9, "alevels": 0.8, "diploma": 0.7, "degree": 0.6, "masters": 0.5, "phd": 0.4}, "german_tech": {"olevels": 0.8, "alevels": 0.9, "diploma": 0.8, "degree": 0.7, "masters": 0.6, "phd": 0.5}}',
1),

-- Question 2: Subject Interests
('What subjects do you enjoy most? (Select all that apply)', 'multiple_choice',
'{"options": ["Mathematics", "Science", "Biology", "Chemistry", "Physics", "English", "History", "Art", "Technical Drawing", "Computer Science", "Economics", "Psychology"]}',
'{"nts": {"Biology": 0.9, "Chemistry": 0.8, "Science": 0.8, "Mathematics": 0.6, "English": 0.7, "Psychology": 0.7}, "vta": {"Mathematics": 0.8, "Science": 0.7, "Physics": 0.8, "Technical Drawing": 0.9, "Chemistry": 0.6, "Computer Science": 0.7}, "german_tech": {"Mathematics": 0.9, "Physics": 0.9, "Science": 0.8, "Technical Drawing": 0.8, "Chemistry": 0.7, "Computer Science": 0.8}}',
2),

-- Question 3: Work Environment Preference
('What type of work environment do you prefer?', 'single_choice',
'{"options": ["Healthcare/Hospital", "Workshop/Factory", "Office", "Outdoor/Field", "Laboratory", "Classroom", "Remote/Home"]}',
'{"nts": {"Healthcare/Hospital": 0.9, "Laboratory": 0.7, "Office": 0.5, "Classroom": 0.6}, "vta": {"Workshop/Factory": 0.9, "Outdoor/Field": 0.7, "Laboratory": 0.6, "Office": 0.5}, "german_tech": {"Workshop/Factory": 0.9, "Laboratory": 0.8, "Office": 0.6, "Remote/Home": 0.4}}',
3),

-- Question 4: Learning Style
('How do you prefer to learn?', 'single_choice',
'{"options": ["Hands-on practice", "Theoretical study", "Group work", "Individual study", "Visual learning", "Online courses"]}',
'{"nts": {"Hands-on practice": 0.8, "Theoretical study": 0.7, "Group work": 0.6, "Visual learning": 0.7}, "vta": {"Hands-on practice": 0.9, "Visual learning": 0.8, "Group work": 0.7, "Individual study": 0.6}, "german_tech": {"Hands-on practice": 0.9, "Theoretical study": 0.7, "Visual learning": 0.8, "Online courses": 0.6}}',
4),

-- Question 5: Career Goals
('What are your career goals? (Select all that apply)', 'multiple_choice',
'{"options": ["Help people", "Build/create things", "Solve technical problems", "Work internationally", "Start own business", "Work in healthcare", "Work in technology", "Earn high salary", "Job security", "Work-life balance"]}',
'{"nts": {"Help people": 0.9, "Work in healthcare": 0.9, "Solve technical problems": 0.6, "Job security": 0.8, "Work-life balance": 0.7}, "vta": {"Build/create things": 0.9, "Solve technical problems": 0.8, "Start own business": 0.7, "Job security": 0.8, "Work-life balance": 0.7}, "german_tech": {"Work internationally": 0.9, "Solve technical problems": 0.9, "Work in technology": 0.8, "Build/create things": 0.8, "Earn high salary": 0.7}}',
5),

-- Question 6: Skills Assessment
('Which skills do you feel most confident in? (Select all that apply)', 'multiple_choice',
'{"options": ["Problem solving", "Communication", "Technical skills", "Leadership", "Creativity", "Attention to detail", "Teamwork", "Time management", "Critical thinking", "Manual dexterity"]}',
'{"nts": {"Problem solving": 0.8, "Communication": 0.8, "Attention to detail": 0.9, "Teamwork": 0.8, "Critical thinking": 0.7}, "vta": {"Technical skills": 0.9, "Problem solving": 0.8, "Manual dexterity": 0.9, "Attention to detail": 0.8, "Teamwork": 0.7}, "german_tech": {"Technical skills": 0.9, "Problem solving": 0.9, "Critical thinking": 0.8, "Attention to detail": 0.8, "Manual dexterity": 0.8}}',
6),

-- Question 7: Work Schedule Preference
('What work schedule appeals to you most?', 'single_choice',
'{"options": ["Regular 9-5 hours", "Shift work (including nights/weekends)", "Flexible hours", "Project-based deadlines", "Seasonal work", "Part-time"]}',
'{"nts": {"Shift work (including nights/weekends)": 0.8, "Regular 9-5 hours": 0.6, "Flexible hours": 0.7}, "vta": {"Regular 9-5 hours": 0.8, "Flexible hours": 0.7, "Project-based deadlines": 0.6}, "german_tech": {"Regular 9-5 hours": 0.7, "Flexible hours": 0.8, "Project-based deadlines": 0.7}}',
7),

-- Question 8: Career Values
('What is most important to you in a career?', 'single_choice',
'{"options": ["Making a difference in people''s lives", "Financial stability", "Career advancement", "Work-life balance", "Job security", "Creative expression", "International opportunities"]}',
'{"nts": {"Making a difference in people''s lives": 0.9, "Job security": 0.8, "Career advancement": 0.7, "Work-life balance": 0.7}, "vta": {"Financial stability": 0.8, "Job security": 0.8, "Career advancement": 0.7, "Work-life balance": 0.7}, "german_tech": {"International opportunities": 0.9, "Career advancement": 0.8, "Financial stability": 0.8, "Creative expression": 0.6}}',
8),

-- Question 9: Stress Tolerance
('How do you handle high-pressure situations?', 'single_choice',
'{"options": ["Stay calm and focused", "Work better under pressure", "Prefer low-stress environments", "Need time to process", "Seek support from others", "Take breaks to recharge"]}',
'{"nts": {"Stay calm and focused": 0.8, "Seek support from others": 0.7, "Take breaks to recharge": 0.6, "Prefer low-stress environments": 0.5}, "vta": {"Stay calm and focused": 0.8, "Work better under pressure": 0.7, "Take breaks to recharge": 0.6}, "german_tech": {"Stay calm and focused": 0.9, "Work better under pressure": 0.8, "Need time to process": 0.6}}',
9),

-- Question 10: Future Aspirations
('Where do you see yourself in 5 years?', 'single_choice',
'{"options": ["Leading a team", "Running my own business", "Working internationally", "Specialized expert in my field", "Teaching/mentoring others", "Still learning and growing", "Work-life balance achieved"]}',
'{"nts": {"Leading a team": 0.7, "Specialized expert in my field": 0.8, "Teaching/mentoring others": 0.7, "Still learning and growing": 0.8}, "vta": {"Running my own business": 0.8, "Specialized expert in my field": 0.8, "Leading a team": 0.6, "Still learning and growing": 0.7}, "german_tech": {"Working internationally": 0.9, "Leading a team": 0.8, "Specialized expert in my field": 0.8, "Running my own business": 0.7}}',
10);

-- Verify the insertion
SELECT 
    id,
    question_text,
    question_type,
    order_index,
    created_at
FROM questionnaire_questions 
ORDER BY order_index;

-- Show count
SELECT COUNT(*) as total_questions FROM questionnaire_questions;
