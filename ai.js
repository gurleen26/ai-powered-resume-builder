// ai.js — Gemini API integration for bullet point improvement

async function improveWithAI() {
  const input = document.getElementById('aiInput').value.trim();

  if (!input) {
    alert("Please enter a bullet point.");
    return;
  }

  const btn = document.getElementById('btnAIGo');
  const text = document.getElementById('aiBtn-text');
  const resultBox = document.getElementById('aiResult');
  const output = document.getElementById('aiOutput');

  btn.disabled = true;
  text.textContent = '✦ Improving...';
  resultBox.style.display = 'none';

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are a professional resume writer.

Improve this resume bullet point:
"${input}"

Rules:
- Action-verb led
- Quantified where possible
- Concise
- Impact-focused
- Maximum 20 words

Respond ONLY with the improved bullet point.
`
                }
              ]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();

    const improved =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      'Could not improve. Please try again.';

    output.textContent = improved;
    resultBox.style.display = 'flex';

  } catch (err) {
    console.error(err);

    output.textContent =
      'Error connecting to AI. Check your API key or network.';

    resultBox.style.display = 'flex';

  } finally {
    btn.disabled = false;
    text.textContent = '✦ Improve it';
  }
}