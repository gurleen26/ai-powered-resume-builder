// Resume template 1
// templates/template-classic.js
// Returns the full resume HTML string from a data object

function renderResume(data) {
  const {
    name, title, location, email, phone, linkedin, github,
    summary, experiences, techSkills, tools, languages, certs, educations
  } = data;

  if (!name && !title && !email) {
    return `
      <div class="resume-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
        <p>Start filling in your details →</p>
      </div>
    `;
  }

  // Contact line
  const contactItems = [
    email    && `<span>✉ ${email}</span>`,
    phone    && `<span>☏ ${phone}</span>`,
    location && `<span>⌖ ${location}</span>`,
    linkedin && `<span>in ${linkedin}</span>`,
    github   && `<span>⌥ ${github}</span>`,
  ].filter(Boolean).join('');

  // Experience section
  const expHTML = (experiences || []).map(exp => `
    <div class="r-exp-entry">
      <div class="r-exp-top">
        <div class="r-exp-role">${exp.role || 'Role'}</div>
        <div class="r-exp-date">${exp.duration || ''}</div>
      </div>
      <div class="r-exp-company">${exp.company || ''} ${exp.location ? `· ${exp.location}` : ''}</div>
      <ul class="r-exp-bullets">
        ${(exp.bullets || []).filter(b => b.trim()).map(b => `<li>${b}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  // Skills tags
  const techTags = (techSkills || '').split(',').filter(s => s.trim())
    .map(s => `<span class="r-skill-tag">${s.trim()}</span>`).join('');

  const toolTags = (tools || '').split(',').filter(s => s.trim())
    .map(s => `<span class="r-skill-tag">${s.trim()}</span>`).join('');

  // Languages
  const langHTML = (languages || '').split(',').filter(l => l.trim())
    .map(l => `<div class="r-lang-item">· ${l.trim()}</div>`).join('');

  // Certs
  const certHTML = (certs || '').split('\n').filter(c => c.trim())
    .map(c => `<div class="r-lang-item">· ${c.trim()}</div>`).join('');

  // Education
  const eduHTML = (educations || []).map(edu => `
    <div class="r-edu-entry">
      <div class="r-edu-degree">${edu.degree || ''}</div>
      <div class="r-edu-school">${edu.school || ''}</div>
      <div class="r-edu-year">${edu.year || ''} ${edu.grade ? `· ${edu.grade}` : ''}</div>
    </div>
  `).join('');

  return `
    <div class="resume-header">
      <div class="r-name">${name || 'Your Name'}</div>
      <div class="r-title">${title || 'Your Title'}</div>
      <div class="r-contact">${contactItems}</div>
    </div>

    <div class="resume-body">
      <div class="resume-main">

        ${summary ? `
        <div class="r-section">
          <div class="r-section-title">Summary</div>
          <div class="r-summary">${summary}</div>
        </div>` : ''}

        ${expHTML ? `
        <div class="r-section">
          <div class="r-section-title">Experience</div>
          ${expHTML}
        </div>` : ''}

        ${eduHTML ? `
        <div class="r-section">
          <div class="r-section-title">Education</div>
          ${eduHTML}
        </div>` : ''}

      </div>

      <div class="resume-side">

        ${techTags ? `
        <div class="r-section">
          <div class="r-section-title">Skills</div>
          <div class="r-skill-group">
            <div class="r-skill-label">Technical</div>
            <div class="r-skill-tags">${techTags}</div>
          </div>
          ${toolTags ? `
          <div class="r-skill-group">
            <div class="r-skill-label">Tools</div>
            <div class="r-skill-tags">${toolTags}</div>
          </div>` : ''}
        </div>` : ''}

        ${langHTML ? `
        <div class="r-section">
          <div class="r-section-title">Languages</div>
          ${langHTML}
        </div>` : ''}

        ${certHTML ? `
        <div class="r-section">
          <div class="r-section-title">Certifications</div>
          ${certHTML}
        </div>` : ''}

      </div>
    </div>
  `;
}
