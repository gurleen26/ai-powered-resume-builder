// PDF export logic
// pdf.js — Download resume as PDF using html2pdf.js

document.getElementById('btnDownload').addEventListener('click', async () => {
  const btn = document.getElementById('btnDownload');
  btn.textContent = 'Generating...';
  btn.disabled = true;

  const element = document.getElementById('resumePreview');
  const name = document.getElementById('name')?.value || 'resume';
  const filename = `${name.replace(/\s+/g, '_')}_Resume.pdf`;

  const opt = {
    margin:      0,
    filename:    filename,
    image:       { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true },
    jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (e) {
    alert('PDF generation failed. Try again.');
    console.error(e);
  } finally {
    btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download PDF`;
    btn.disabled = false;
  }
});
