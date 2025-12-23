const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
require("dotenv").config();

// Initialize OpenAI with secure API key from environment (only if key is available)
let openai = null;
if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
}

// Fallback response function for when OpenAI quota is exceeded
function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // VTA-related responses
  if (lowerMessage.includes('vta') || lowerMessage.includes('vocational')) {
    return `🛠️ **VTA (Vocational Training Authority) Information:**

VTA offers excellent skills training programs across Sri Lanka! Here's what you need to know:

**📋 How to Apply:**
1. Visit https://course.vta.lk to browse programs
2. Choose your desired course (electrical, plumbing, welding, beauty, etc.)
3. Register online or visit your nearest VTA center
4. Training duration: 6 months to 1.5 years
5. Receive NVQ certified certificate upon completion

**🎯 Popular Courses:**
- Electrical Installation & Maintenance
- Plumbing & Pipe Fitting
- Welding Technology
- Beauty Culture & Hair Dressing
- Cake Making & Decorating

**💡 Pro Tip:** VTA certificates are recognized nationally and internationally for overseas employment opportunities!

*Note: I'm currently in maintenance mode, but you can get detailed information at course.vta.lk or visit your nearest VTA center.*`;
  }
  
  // NTS-related responses
  if (lowerMessage.includes('nts') || lowerMessage.includes('nursing')) {
    return `🏥 **NTS (Nursing Training School) Information:**

NTS offers free government nursing training! Here's the complete guide:

**📋 Requirements:**
- G.C.E. A/L with 3 science subjects including Biology
- G.C.E. O/L credit passes in Sinhala/Tamil, Mathematics, English, and Science

**📝 Application Process:**
1. Visit your nearest Regional Health Services Office
2. Collect application form during announcement period
3. Submit with certified copies of certificates
4. Attend written test and interview
5. If selected: 3-4 year free residential program

**🎓 Training Includes:**
- Theoretical nursing education
- Practical hospital training
- Clinical rotations in various departments
- Official Registered Nurse certificate upon completion

**📺 Application Guide:** Watch the full tutorial at https://www.youtube.com/watch?v=-4CMH6WRDW8

*Note: I'm currently in maintenance mode, but you can get detailed information from the Ministry of Health or the YouTube guide above.*`;
  }
  
  // German Tech-related responses
  if (lowerMessage.includes('german') || lowerMessage.includes('gttc')) {
    return `🔧 **German Technical Training Institute (GTTC) Information:**

GTTC offers world-class technical training with German standards! Here's everything you need to know:

**📋 Requirements:**
- G.C.E. O/L pass with good grades in Mathematics and Science
- Age: 16-22 years (varies by course)

**📝 Application Process:**
1. Visit https://germantec.lk/index.php/register-now/
2. Check yearly application periods (published in newspapers)
3. Choose specialization: Automobile, Diesel, Electrical, Welding, etc.
4. Apply online with basic qualifications
5. Attend written exam + mechanical aptitude test

**🎓 Training Program:**
- Full-time 3-year course with allowance
- Hands-on training in modern workshops
- German-standard equipment and techniques
- Industrial training with partner companies
- Internationally recognized German certification

**🌍 Career Opportunities:**
- Local motor trade sector employment
- International opportunities with German companies
- TVEC-recognized qualifications

*Note: I'm currently in maintenance mode, but you can get detailed information at germantec.lk or contact the institute directly.*`;
  }
  
  // Financial concerns
  if (lowerMessage.includes('poor') || lowerMessage.includes('money') || lowerMessage.includes('expensive') || lowerMessage.includes('free') || lowerMessage.includes('cost')) {
    return `💙 **I understand your financial concerns - let me help you find affordable options!**

**🆓 COMPLETELY FREE OPTIONS:**
- **NTS (Nursing Training School)**: 100% free government program with hostel accommodation
- **VTA Programs**: Very low fees, often with payment plans and government support

**💰 LOW-COST OPTIONS:**
- **VTA Courses**: Minimal fees (varies by course, often under Rs. 10,000)
- **German Tech**: Provides monthly allowance during training
- **Government Support**: Many programs offer scholarships and financial aid

**💡 Money-Saving Tips:**
1. **Start with NTS** - completely free nursing program
2. **Check VTA centers** - they often have flexible payment options
3. **Look for scholarships** - many programs offer financial assistance
4. **Part-time work** - some programs allow you to work while studying

**🎯 My Recommendation:**
If you're worried about costs, NTS is your best option - it's completely free and provides excellent career prospects!

*Remember: Your education is an investment in your future. Don't let financial concerns stop you from pursuing your dreams!*`;
  }

  // Qualification concerns
  if (lowerMessage.includes('a/l') || lowerMessage.includes('advanced level') || lowerMessage.includes('qualification') || lowerMessage.includes('pass') || lowerMessage.includes('fail')) {
    return `🎓 **Don't worry about qualifications - there are many paths forward!**

**✅ OPTIONS WITHOUT A/L:**
- **VTA Programs**: Accept O/L students (no A/L required)
- **German Tech**: O/L pass is sufficient for most courses
- **Skills Training**: Many programs focus on practical skills over academic results

**📋 WHAT YOU NEED:**
- **VTA**: Basic O/L results (even with some failures)
- **German Tech**: O/L pass in Mathematics and Science
- **NTS**: A/L with Biology (but there are alternative paths)

**💡 Alternative Pathways:**
1. **Start with VTA** - build practical skills first
2. **Consider part-time A/L** - study while working
3. **Focus on skills** - many employers value practical experience over academic results
4. **Government programs** - often have flexible entry requirements

**🌟 Success Stories:**
Many successful professionals started without perfect qualifications. What matters is your determination and willingness to learn!

*Remember: Your potential isn't defined by your exam results. Focus on what you can achieve!*`;
  }

  // Village/rural concerns
  if (lowerMessage.includes('village') || lowerMessage.includes('rural') || lowerMessage.includes('remote') || lowerMessage.includes('transport')) {
    return `🌾 **I understand the challenges of being from a rural area - but there are solutions!**

**🏠 ACCOMMODATION OPTIONS:**
- **NTS**: Provides free hostel accommodation
- **German Tech**: Residential training with accommodation
- **VTA**: Many centers have hostel facilities or can help find nearby accommodation

**🚌 TRANSPORT SOLUTIONS:**
- **Government Support**: Many programs provide transport allowances
- **Scholarship Programs**: Often include travel assistance
- **Local Centers**: VTA has 200+ centers across Sri Lanka - find one near you

**💪 RURAL ADVANTAGES:**
- **Strong Work Ethic**: Rural students often excel in practical programs
- **Community Support**: Your village community can be a great support system
- **Government Priority**: Rural students often get priority in government programs

**🎯 My Recommendation:**
1. **Apply to NTS** - free accommodation and training
2. **Check local VTA centers** - find one within reasonable distance
3. **Look for scholarships** - many programs specifically support rural students

**🌟 You're Not Alone:**
Many successful professionals come from rural areas. Your background gives you unique strengths!

*Remember: Your village roots are a strength, not a limitation. Use them to build your future!*`;
  }

  // General career guidance
  if (lowerMessage.includes('career') || lowerMessage.includes('help') || lowerMessage.includes('guidance')) {
    return `🎯 **MetaMind Career Guidance - Your Path to Success!**

I'm here to help you find the right career path, no matter your situation! Here's how I can support you:

**🛠️ VTA (Vocational Training Authority)**
- Skills training programs across 200+ centers
- Accepts O/L students (no A/L required)
- Low fees with flexible payment options
- NVQ certified courses for national and international recognition

**🏥 NTS (Nursing Training School)**
- 100% FREE government nursing program
- Free hostel accommodation provided
- 3-4 year residential training
- Ministry of Health certification

**🔧 German Technical Training (GTTC)**
- Advanced technical training with German standards
- Monthly allowance during training
- 3-year full-time programs with accommodation
- International certification opportunities

**💡 How I Can Help:**
- Application process guidance
- Requirements and eligibility (even with missing qualifications)
- Course selection advice
- Career pathway planning
- Financial assistance information

**🌟 Remember:**
- Your background doesn't limit your potential
- There are always options and alternatives
- Government programs are designed to help students like you
- Success comes from determination, not just qualifications

*I'm currently in maintenance mode, but I can still provide helpful guidance. Don't hesitate to ask about any concerns you have!*`;
  }
  
  // Academic/Educational questions
  if (lowerMessage.includes('what is') || lowerMessage.includes('explain') || lowerMessage.includes('how does') || lowerMessage.includes('define') || lowerMessage.includes('photosynthesis') || lowerMessage.includes('algebra') || lowerMessage.includes('equation') || lowerMessage.includes('solve')) {
    return `📚 **I'd love to help you with that academic question!**

I'm MetaMind, your AI tutor and career counselor for Sri Lankan students. I can help with:

**🎓 Academic Subjects:**
- **Science**: Biology (photosynthesis, cells, genetics), Chemistry (reactions, elements), Physics (motion, energy, waves)
- **Mathematics**: Algebra, geometry, calculus, problem-solving strategies
- **History**: Sri Lankan history, world history, important events and figures
- **Geography**: Physical geography, climate, Sri Lankan geography
- **Languages**: English, Sinhala, literature, grammar
- **IT & Computer Science**: Programming basics, computer fundamentals

**💡 General Knowledge:**
- Current events and facts
- Biographies of famous people (including Arthur C. Clarke!)
- Technology and innovation
- Society and culture

**🎯 Career Guidance:**
- VTA, NTS, and German Tech programs
- Application processes and requirements
- Alternative pathways for different qualifications

**Currently in Maintenance Mode** 🔧
I'm temporarily operating with limited functionality, but I can still provide helpful guidance!

*Note: For detailed academic explanations, I'll be back to full functionality soon. In the meantime, feel free to ask about career guidance or general questions!*`;
  }

  // Practical help questions
  if (lowerMessage.includes('cv') || lowerMessage.includes('resume') || lowerMessage.includes('interview') || lowerMessage.includes('write') || lowerMessage.includes('application') || lowerMessage.includes('job') || lowerMessage.includes('work')) {
    return `🛠️ **I can help you with practical career skills!**

I'm MetaMind, your AI tutor and career counselor. Here's how I can help with practical skills:

**📝 CV/Resume Writing:**
- Format and structure guidance
- What to include and what to avoid
- How to highlight your strengths
- Sri Lankan CV standards and expectations

**💼 Job Applications:**
- How to write effective cover letters
- Application form completion tips
- Following up on applications
- Government job application processes

**🎤 Interview Preparation:**
- Common interview questions and answers
- How to present yourself professionally
- What to wear and how to behave
- Questions to ask the interviewer

**💼 Career Skills:**
- Communication skills development
- Time management techniques
- Professional networking tips
- Workplace etiquette and behavior

**Currently in Maintenance Mode** 🔧
I'm temporarily operating with limited functionality, but I can still provide helpful guidance!

*Note: For detailed practical guidance, I'll be back to full functionality soon. In the meantime, feel free to ask about career programs or general questions!*`;
  }

  // Motivation/Personal development
  if (lowerMessage.includes('motivation') || lowerMessage.includes('discouraged') || lowerMessage.includes('feel') || lowerMessage.includes('help me')) {
    return `💙 **I understand you're looking for support - let me help!**

**🌟 You're Not Alone:**
Many students face challenges, but remember - your potential is limitless!

**💪 Stay Motivated:**
- Every successful person started somewhere
- Your struggles today are building your strength for tomorrow
- Focus on progress, not perfection
- Small steps lead to big achievements

**🎯 Practical Steps:**
1. **Set small, achievable goals** - celebrate each win
2. **Find your support system** - family, friends, teachers
3. **Focus on what you can control** - your effort and attitude
4. **Remember your "why"** - what drives you to succeed

**🚀 Career Opportunities:**
- **NTS**: Free nursing program with excellent prospects
- **VTA**: Skills training that leads to good jobs
- **German Tech**: Advanced technical training with international recognition

**💡 Remember:**
Your background, qualifications, or current situation don't define your future. What matters is your determination and willingness to learn!

*I'm here to support you on your journey. Don't hesitate to ask about career guidance or any other concerns!*`;
  }

  // Default response
  return `👋 **Hello! I'm MetaMind Assistant!**

I'm your AI tutor and career counselor for Sri Lankan students, specializing in:

**🎓 Academic Help:**
- Science, mathematics, history, and more
- Problem-solving and study guidance
- General knowledge and facts

**🎯 Career Guidance:**
- VTA programs and applications
- NTS nursing school guidance
- German Technical Training
- Alternative pathways for all qualification levels

**💡 Life Support:**
- Motivation and encouragement
- Personal development advice
- Practical life skills

**Currently in Maintenance Mode** 🔧
I'm temporarily operating with limited functionality, but I can still provide helpful guidance about career pathways and general support!

**Quick Links:**
- VTA: https://course.vta.lk
- NTS Guide: https://www.youtube.com/watch?v=-4CMH6WRDW8
- German Tech: https://germantec.lk

Feel free to ask me about career guidance, academic help, or any other questions - I'll do my best to help! 😊`;
}

// Chat endpoint with career guidance context
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    
    console.log("🔁 Chat request received:", { message: message?.substring(0, 50) + "..." });
    console.log("🔑 OpenAI configured:", !!openai);
    console.log("🔑 API Key present:", !!process.env.OPENAI_API_KEY);
    console.log("🔑 API Key starts with:", process.env.OPENAI_API_KEY?.substring(0, 10) + "...");

    if (!message || !message.trim()) {
      console.log("❌ No message provided");
      return res.status(400).json({ error: "Message is required" });
    }

    // Check if OpenAI is properly configured
    if (!openai) {
      console.log("❌ OpenAI not configured - API key missing or invalid");
      return res.status(503).json({ 
        error: "Chat assistant is not configured. Please contact the administrator to set up OpenAI API key." 
      });
    }

    // Create a comprehensive system prompt for MetaMind as a general AI tutor
    const systemPrompt = `You are MetaMind — an advanced AI assistant built to support students and general users in Sri Lanka.

You answer any kind of question, including:
- Academic (e.g. "What is photosynthesis?", "Can you help with math?")
- Career (e.g. "How to apply to NTS or VTA?")
- Personal guidance (e.g. "I'm anxious about exams", "I feel unmotivated")
- Practical advice (e.g. "How to write a CV?", "Time management")
- Curiosity (e.g. "Tell me about Mars", "How do planes fly?")
- General knowledge (e.g. "What is gravity?", "Who is Sarath Fonseka?")
- Science and nature (e.g. "How do plants grow?", "What causes earthquakes?")
- History and culture (e.g. "Tell me about Sri Lankan history", "What is Buddhism?")
- Technology (e.g. "How does the internet work?", "What is AI?")
- Life skills (e.g. "How to manage stress?", "How to study effectively?")

**CRITICAL FORMATTING RULES:**
- Structure your responses with clear headings and bullet points
- Use line breaks (\n) between different sections
- Format information in numbered lists or bullet points for clarity
- Keep paragraphs short and focused
- Use simple, clean formatting without excessive emojis
- Make responses easy to read, especially for translated text (Sinhala/Tamil)

**Response Format Example:**
🔍 **Topic Title**

1. **Main Point:**
   - Sub-point with details
   - Another sub-point

2. **Next Section:**
   - Important information
   - Additional details

**Links and Resources:**
👉 [Click here for more info](url)

---

You speak clearly, supportively, and in simple English.
Always try to encourage and support students. Feel free to be a little friendly.

If the question is unusual or unrelated, still try to give a useful or fun reply.

Never say "I can't help with that." Instead, try your best!

**Special Sri Lankan Context:**
- For career questions, prioritize NTS (free nursing), VTA (low-cost skills), and German Tech
- For academic questions, relate to Sri Lankan education system when relevant
- For general knowledge, include Sri Lankan examples and connections when appropriate
- Always be encouraging about educational opportunities in Sri Lanka

**Your Approach:**
- Be warm, understanding, and non-judgmental
- Use simple, clear English that's easy to understand
- Provide examples and analogies to make concepts clearer
- Encourage questions and deeper learning
- Focus on practical applications and real-world connections
- Be supportive of students' struggles and challenges

Remember: You're here to help, educate, and inspire!`;

    console.log("🚀 Sending request to OpenAI...");
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    const reply = response.choices[0].message.content;
    console.log("✅ OpenAI response received:", reply.substring(0, 100) + "...");
    res.status(200).json({ reply });
  } catch (err) {
    console.error("❌ Chatbot API failed:");
    console.error("   Error message:", err.message);
    console.error("   Error status:", err.response?.status);
    console.error("   Error data:", err.response?.data);
    console.error("   Full error:", err);
    
    // Handle different types of errors gracefully
    if (err.response?.status === 401) {
      console.log("🔑 Authentication failed - API key invalid");
      res.status(500).json({ 
        error: "Chatbot authentication failed. Please contact administrator.",
        debug: err?.response?.data || err.message
      });
    } else if (err.response?.status === 429 || err.code === 'insufficient_quota') {
      console.log("💰 Quota exceeded - providing fallback response");
      // Provide a helpful fallback response for quota issues
      const fallbackResponse = getFallbackResponse(req.body.message);
      res.status(200).json({ reply: fallbackResponse });
    } else if (err.response?.status === 503) {
      console.log("🚫 Service unavailable");
      res.status(503).json({ 
        error: "Chatbot is temporarily offline. Please try again later.",
        debug: err?.response?.data || err.message
      });
    } else {
      console.log("❓ Unknown error - providing fallback response");
      // For any other error, provide a helpful fallback response
      const fallbackResponse = getFallbackResponse(req.body.message);
      res.status(200).json({ reply: fallbackResponse });
    }
  }
});

module.exports = router;
