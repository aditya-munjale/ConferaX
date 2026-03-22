import { GoogleGenerativeAI } from "@google/generative-ai";

const generateSummary = async (req, res) => {
  const { transcript } = req.body;

  // 1. Edge Case: What if nobody spoke?
  if (!transcript || transcript.trim() === "") {
    return res
      .status(400)
      .json({ message: "No conversation was recorded to summarize." });
  }

  try {
    // 2. Initialize the AI using your secret key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Using the current, active flash model for speed and accuracy
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 3. The Prompt String (Engineered for a natural, devotee persona)
    // 3. The Prompt String (Now with Dynamic Scaling for 1.5 Hour Sessions!)
    const prompt = `
      You are a fellow devotee writing a warm, humble, and enthusiastic recap of a book reading session for your friends who couldn't attend. 
      
      Read the following raw transcript of our reading session. We are reading Srila Prabhupada's books (like Teachings of Lord Chaitanya, Srimad Bhagavatam, or Bhagavad Gita).

      Your goal is to make the absent devotees feel connected and eager to join next time. 
      
      CRITICAL RULES:
      1. Write in plain, natural, and conversational English. 
      2. DO NOT use flowery AI buzzwords like "tapestry", "delve", "profound journey", "beautifully opened", or "realm". 
      3. Treat divine events respectfully.
      4. SCALE THE DETAIL: This is critical. These reading sessions can last over an hour. You MUST scale the length of your summary to match the transcript. If it is a long session, provide a highly detailed, comprehensive summary so no key philosophy or pastime is lost. 

      Format your response EXACTLY like this:

      ### 📖 Reading Overview
      [Write a warm, natural paragraph explaining the full scope of what we covered today. If it was a long session, write a comprehensive overview.]

      ### ✨ Key Philosophies, Slokas & Pastimes
      [Extract the specific details, verses, and stories. IMPORTANT: If it was a long reading, give me as many bullet points as needed (even 10, 15, or 20+) to thoroughly capture everything discussed. Do not leave out important philosophies just to keep it short.]

      ### 🙏 Where We Left Off
      [Write 1 or 2 conversational sentences about exactly where we stopped reading, and a welcoming thought about continuing next time.]

      Here is the transcript to summarize:
      "${transcript}"
    `;

    // 4. Send it to the AI brain and wait for the response
    const result = await model.generateContent(prompt);
    const summaryText = result.response.text();

    // 5. Send the clean, beautifully formatted summary back to the frontend
    res.status(200).json({ summary: summaryText });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: "Failed to generate AI summary." });
  }
};

export { generateSummary };
