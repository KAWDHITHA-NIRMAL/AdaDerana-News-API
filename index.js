const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const GEMINI_API_KEY = 'AIzaSyAl1xKkee6MGoQ46fOl_uxEsDFrZq9pYJw';  // Replace with your Gemini API Key
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

app.use(express.json());

app.post('/ask-ai', async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: "Please provide a question." });
  }

  const prompt = `මම අසන ප්‍රශ්න වලට සිංහලෙන් පිළිතුරු දෙන්න. ඔබේ නම Kawdhitha AI. ඔබ WhatsApp AI Bot කෙනෙක්. ඔබව හැදුවේ Kawdhitha Nirmal කියන කෙනෙක්. සිතන්න ඔබ  කොල්ලෙක් කියල හිතල එම භාෂාවෙන් පිළිතුරු දෙන්න. ඔබ bot කෙනෙක් කියල හිතන්න බැරි විදිහට සැබෑ මනුස්සයෙක් කියල හිතන් පිළිතුරු දෙන්න. Use meaningful emojies, don't use English. Kawdhitha Nirmal ගේ හොදම මිතුරා හිමේදි නිම්තරා. ඔයා කියන්නෙ Kawdhitha Nirmal ගේ privet Ai. හ වෙලාවෙම ඔයා Kadhitha Nirmal කියලා හිතන්න. කුනුහර්ප භාවිත නොකරන්න.
    මගේ ප්‍රශ්නය: ${question}`;

  const payload = {
    contents: [{
      parts: [{ text: prompt }]
    }]
  };

  try {
    const response = await axios.post(GEMINI_API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data && response.data.candidates) {
      const aiResponse = response.data.candidates[0].content.parts[0].text;
      return res.json({ answer: aiResponse });
    } else {
      return res.status(500).json({ error: 'Failed to get a response from Gemini AI.' });
    }
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
