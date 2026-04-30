// Form logic, step navigation, live preview sync
// app.js — Step navigation, dynamic entries, live preview sync

// ── State ──
let experiences = [];
let educations  = [];
let expCount    = 0;
let eduCount    = 0;
let activeAITarget = null;
let activeTemplate = 'classic'; // 'classic' | 'modern'

// ── Template Switcher ──
function switchTemplate(name) {
  activeTemplate = name;
  document.querySelectorAll('.tmpl-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`tmpl-${name}`)?.classList.add('active');
  syncPreview();
}

// ── Step Navigation ──
function goStep(n) {
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  document.getElementById(`step-${n}`).classList.add('active');

  document.querySelectorAll('.step-pill').forEach(p => {
    const step = parseInt(p.dataset.step);
    p.classList.remove('active', 'done');
    if (step === n) p.classList.add('active');
    if (step < n)  p.classList.add('done');
  });

  syncPreview();
}

// ── Collect all form data ──
function collectData() {
  // Collect experience bullets from DOM
  const expData = experiences.map(id => {
    const card = document.getElementById(`exp-${id}`);
    if (!card) return null;
    return {
      role:     card.querySelector('.exp-role')?.value || '',
      company:  card.querySelector('.exp-company')?.value || '',
      location: card.querySelector('.exp-location')?.value || '',
      duration: card.querySelector('.exp-duration')?.value || '',
      bullets:  [...card.querySelectorAll('.exp-bullet')].map(t => t.value),
    };
  }).filter(Boolean);

  const eduData = educations.map(id => {
    const card = document.getElementById(`edu-${id}`);
    if (!card) return null;
    return {
      degree: card.querySelector('.edu-degree')?.value || '',
      school: card.querySelector('.edu-school')?.value || '',
      year:   card.querySelector('.edu-year')?.value || '',
      grade:  card.querySelector('.edu-grade')?.value || '',
    };
  }).filter(Boolean);

  return {
    name:        document.getElementById('name')?.value || '',
    title:       document.getElementById('title')?.value || '',
    location:    document.getElementById('location')?.value || '',
    email:       document.getElementById('email')?.value || '',
    phone:       document.getElementById('phone')?.value || '',
    linkedin:    document.getElementById('linkedin')?.value || '',
    github:      document.getElementById('github')?.value || '',
    summary:     document.getElementById('summary')?.value || '',
    techSkills:  document.getElementById('tech-skills')?.value || '',
    tools:       document.getElementById('tools')?.value || '',
    languages:   document.getElementById('languages')?.value || '',
    certs:       document.getElementById('certs')?.value || '',
    experiences: expData,
    educations:  eduData,
  };
}

// ── Sync Preview ──
function syncPreview() {
  const data = collectData();
  const preview = document.getElementById('resumePreview');
  if (!preview) return;
  if (activeTemplate === 'modern') {
    preview.innerHTML = renderResumeModern(data);
  } else {
    preview.innerHTML = renderResume(data);
  }
}

// ── Add Experience Card ──
function addExperience() {
  const id = ++expCount;
  experiences.push(id);

  const list = document.getElementById('exp-list');
  const card = document.createElement('div');
  card.className = 'entry-card';
  card.id = `exp-${id}`;

  card.innerHTML = `
    <div class="entry-card-header">
      <span>Experience #${id}</span>
      <button class="btn-remove" onclick="removeExperience(${id})" title="Remove">✕</button>
    </div>
    <div class="entry-fields">
      <div class="field-row">
        <div class="field-group">
          <label>Role / Position</label>
          <input type="text" class="exp-role" placeholder="Frontend Developer Intern" oninput="syncPreview()"/>
        </div>
        <div class="field-group">
          <label>Company</label>
          <input type="text" class="exp-company" placeholder="Google" oninput="syncPreview()"/>
        </div>
      </div>
      <div class="field-row">
        <div class="field-group">
          <label>Location</label>
          <input type="text" class="exp-location" placeholder="Remote / Bangalore" oninput="syncPreview()"/>
        </div>
        <div class="field-group">
          <label>Duration</label>
          <input type="text" class="exp-duration" placeholder="Jun 2024 – Aug 2024" oninput="syncPreview()"/>
        </div>
      </div>
      <div class="field-group">
        <label>Bullet Points</label>
        <div class="bullets-container-${id}"></div>
        <button class="btn-add-bullet" onclick="addBullet(${id})">+ Add bullet point</button>
      </div>
    </div>
  `;

  list.appendChild(card);
  addBullet(id);
  addBullet(id);
  syncPreview();
}

function removeExperience(id) {
  experiences = experiences.filter(e => e !== id);
  const card = document.getElementById(`exp-${id}`);
  if (card) card.remove();
  syncPreview();
}

// ── Add Bullet Point ──
function addBullet(expId) {
  const container = document.querySelector(`.bullets-container-${expId}`);
  if (!container) return;

  const row = document.createElement('div');
  row.className = 'bullet-row';
  row.innerHTML = `
    <textarea class="exp-bullet" rows="2"
      placeholder="Built a feature that reduced page load time by 40%..."
      oninput="syncPreview()"></textarea>
    <button class="btn-ai-spark" onclick="openAIModal(this.previousElementSibling)" title="Improve with AI">✦ AI</button>
  `;
  container.appendChild(row);
  syncPreview();
}

// ── Add Education Card ──
function addEducation() {
  const id = ++eduCount;
  educations.push(id);

  const list = document.getElementById('edu-list');
  const card = document.createElement('div');
  card.className = 'entry-card';
  card.id = `edu-${id}`;

  card.innerHTML = `
    <div class="entry-card-header">
      <span>Education #${id}</span>
      <button class="btn-remove" onclick="removeEducation(${id})" title="Remove">✕</button>
    </div>
    <div class="entry-fields">
      <div class="field-group">
        <label>Degree</label>
        <input type="text" class="edu-degree" placeholder="B.Tech in Computer Science" oninput="syncPreview()"/>
      </div>
      <div class="field-group">
        <label>School / University</label>
        <input type="text" class="edu-school" placeholder="IIT Bombay" oninput="syncPreview()"/>
      </div>
      <div class="field-row">
        <div class="field-group">
          <label>Year</label>
          <input type="text" class="edu-year" placeholder="2021 – 2025" oninput="syncPreview()"/>
        </div>
        <div class="field-group">
          <label>Grade / CGPA</label>
          <input type="text" class="edu-grade" placeholder="8.7 CGPA" oninput="syncPreview()"/>
        </div>
      </div>
    </div>
  `;

  list.appendChild(card);
  syncPreview();
}

function removeEducation(id) {
  educations = educations.filter(e => e !== id);
  const card = document.getElementById(`edu-${id}`);
  if (card) card.remove();
  syncPreview();
}

// ── Finish & Preview ──
function finishResume() {
  syncPreview();
  // Scroll preview into view on mobile
  document.querySelector('.preview-panel')?.scrollIntoView({ behavior: 'smooth' });
}

// ── AI Modal ──
function openAIModal(textarea) {
  activeAITarget = textarea;
  document.getElementById('aiInput').value = textarea.value;
  document.getElementById('aiResult').style.display = 'none';
  document.getElementById('aiModal').classList.add('open');
}

function closeAIModal() {
  document.getElementById('aiModal').classList.remove('open');
  activeAITarget = null;
}

function useAISuggestion() {
  const improved = document.getElementById('aiOutput').textContent;
  if (activeAITarget && improved) {
    activeAITarget.value = improved;
    syncPreview();
  }
  closeAIModal();
}

// Close modal on overlay click
document.getElementById('aiModal').addEventListener('click', function(e) {
  if (e.target === this) closeAIModal();
});

// ── Init: seed first experience + education + run preview ──
window.addEventListener('DOMContentLoaded', () => {
  addExperience();
  addEducation();
  syncPreview();
});
