// Claude API integration
// ai.js — Claude API integration for bullet point improvement

async function improveWithAI() {
  const input = document.getElementById('aiInput').value.trim();
  if (!input) return;

  const btn  = document.getElementById('btnAIGo');
  const text = document.getElementById('aiBtn-text');
  const resultBox = document.getElementById('aiResult');
  const output    = document.getElementById('aiOutput');

  btn.disabled = true;
  text.textContent = '✦ Improving...';
  resultBox.style.display = 'none';

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are a professional resume writer. When given a weak or vague resume bullet point, rewrite it to be:
- Action-verb led (e.g. Built, Reduced, Improved, Designed, Led)
- Quantified where possible (add realistic metrics if missing)
- Concise (one sentence, under 20 words)
- Impactful (focused on outcomes, not just tasks)
Respond with ONLY the improved bullet point. No quotes, no explanation.`,
        messages: [
          { role: 'user', content: `Improve this resume bullet point: "${input}"` }
        ]
      })
    });

    const data = await response.json();
    const improved = data.content?.[0]?.text?.trim() || 'Could not improve. Please try again.';

    output.textContent = improved;
    resultBox.style.display = 'flex';

  } catch (err) {
    output.textContent = 'Error connecting to AI. Check your API key or network.';
    resultBox.style.display = 'flex';
    console.error(err);
  } finally {
    btn.disabled = false;
    text.textContent = '✦ Improve it';
  }
}
