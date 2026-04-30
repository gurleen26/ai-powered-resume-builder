// Resume template 2
// templates/template-modern.js
// Modern two-column sidebar layout resume template

function renderResumeModern(data) {
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

  // Skills as bar-style tags
  const techTags = (techSkills || '').split(',').filter(s => s.trim())
    .map(s => `<div class="m-skill-item"><span class="m-skill-name">${s.trim()}</span></div>`).join('');

  const toolTags = (tools || '').split(',').filter(s => s.trim())
    .map(s => `<div class="m-skill-item"><span class="m-skill-name">${s.trim()}</span></div>`).join('');

  const langItems = (languages || '').split(',').filter(l => l.trim())
    .map(l => `<div class="m-lang-item">${l.trim()}</div>`).join('');

  const certItems = (certs || '').split('\n').filter(c => c.trim())
    .map(c => `<div class="m-cert-item">
      <span class="m-cert-dot"></span>${c.trim()}
    </div>`).join('');

  // Experience
  const expHTML = (experiences || []).map((exp, i) => `
    <div class="m-exp-entry">
      <div class="m-exp-left">
        <div class="m-exp-date">${exp.duration || ''}</div>
        ${i < (experiences.length - 1) ? '<div class="m-timeline-line"></div>' : ''}
      </div>
      <div class="m-exp-right">
        <div class="m-exp-role">${exp.role || 'Role'}</div>
        <div class="m-exp-company">${[exp.company, exp.location].filter(Boolean).join(' · ')}</div>
        <ul class="m-exp-bullets">
          ${(exp.bullets || []).filter(b => b.trim()).map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  // Education
  const eduHTML = (educations || []).map(edu => `
    <div class="m-edu-entry">
      <div class="m-edu-year">${edu.year || ''}</div>
      <div class="m-edu-degree">${edu.degree || ''}</div>
      <div class="m-edu-school">${edu.school || ''}${edu.grade ? ` · ${edu.grade}` : ''}</div>
    </div>
  `).join('');

  return `
    <style>
      /* ── MODERN TEMPLATE STYLES ── */
      .m-wrap {
        display: grid;
        grid-template-columns: 220px 1fr;
        min-height: 960px;
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        color: #111;
      }

      /* Left sidebar */
      .m-sidebar {
        background: #1a1a1a;
        color: #e8e4dc;
        padding: 40px 24px;
        display: flex;
        flex-direction: column;
        gap: 28px;
      }

      .m-avatar {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: linear-gradient(135deg, #c8521a, #e8733a);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'DM Serif Display', serif;
        font-size: 28px;
        color: #fff;
        margin-bottom: 4px;
        flex-shrink: 0;
      }

      .m-s-name {
        font-family: 'DM Serif Display', serif;
        font-size: 20px;
        font-weight: 400;
        color: #fff;
        line-height: 1.2;
        margin-bottom: 4px;
      }

      .m-s-title {
        font-size: 10px;
        font-weight: 400;
        color: #c8521a;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        margin-bottom: 16px;
      }

      .m-contact-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .m-contact-item {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        font-size: 10.5px;
        color: #aaa;
        font-weight: 300;
        line-height: 1.4;
        word-break: break-all;
      }

      .m-contact-icon {
        font-size: 11px;
        color: #c8521a;
        flex-shrink: 0;
        margin-top: 1px;
      }

      .m-s-section-title {
        font-family: 'JetBrains Mono', monospace;
        font-size: 8.5px;
        font-weight: 500;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #c8521a;
        margin-bottom: 12px;
        padding-bottom: 6px;
        border-bottom: 1px solid #333;
      }

      .m-skill-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 7px;
      }

      .m-skill-name {
        font-size: 11px;
        color: #ddd;
        font-weight: 300;
      }

      .m-lang-item {
        font-size: 11px;
        color: #bbb;
        font-weight: 300;
        margin-bottom: 5px;
        padding-left: 10px;
        border-left: 2px solid #c8521a;
      }

      .m-cert-item {
        display: flex;
        align-items: flex-start;
        gap: 7px;
        font-size: 10.5px;
        color: #aaa;
        font-weight: 300;
        line-height: 1.5;
        margin-bottom: 6px;
      }

      .m-cert-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #c8521a;
        flex-shrink: 0;
        margin-top: 4px;
      }

      /* Right main content */
      .m-main {
        background: #fff;
        padding: 40px 36px;
      }

      .m-main-name {
        font-family: 'DM Serif Display', serif;
        font-size: 36px;
        font-weight: 400;
        color: #111;
        line-height: 1.0;
        letter-spacing: -0.01em;
        margin-bottom: 4px;
      }

      .m-main-title {
        font-size: 12px;
        font-weight: 400;
        color: #c8521a;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin-bottom: 20px;
      }

      .m-divider {
        height: 2px;
        background: #1a1a1a;
        width: 40px;
        margin-bottom: 24px;
        border-radius: 2px;
      }

      .m-summary {
        font-size: 12.5px;
        font-weight: 300;
        color: #444;
        line-height: 1.75;
        margin-bottom: 32px;
        padding-bottom: 24px;
        border-bottom: 1px solid #eee;
      }

      .m-section { margin-bottom: 28px; }

      .m-section-title {
        font-family: 'JetBrains Mono', monospace;
        font-size: 9px;
        font-weight: 500;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #111;
        margin-bottom: 18px;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .m-section-title::after {
        content: '';
        flex: 1;
        height: 1px;
        background: #eee;
      }

      /* Timeline experience */
      .m-exp-entry {
        display: grid;
        grid-template-columns: 72px 1fr;
        gap: 14px;
        margin-bottom: 20px;
        position: relative;
      }

      .m-exp-left {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 3px;
      }

      .m-exp-date {
        font-family: 'JetBrains Mono', monospace;
        font-size: 9px;
        color: #999;
        text-align: center;
        line-height: 1.4;
        margin-bottom: 8px;
      }

      .m-timeline-line {
        flex: 1;
        width: 1px;
        background: #e5e5e5;
        min-height: 20px;
      }

      .m-exp-right { padding-bottom: 4px; }

      .m-exp-role {
        font-size: 13px;
        font-weight: 600;
        color: #111;
        margin-bottom: 2px;
      }

      .m-exp-company {
        font-size: 11px;
        color: #c8521a;
        font-weight: 500;
        margin-bottom: 8px;
      }

      .m-exp-bullets {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .m-exp-bullets li {
        font-size: 11.5px;
        font-weight: 300;
        color: #444;
        line-height: 1.6;
        padding-left: 12px;
        position: relative;
      }

      .m-exp-bullets li::before {
        content: "▸";
        position: absolute;
        left: 0;
        color: #c8521a;
        font-size: 9px;
        top: 2px;
      }

      /* Education */
      .m-edu-entry {
        display: grid;
        grid-template-columns: 72px 1fr;
        gap: 14px;
        margin-bottom: 14px;
      }

      .m-edu-year {
        font-family: 'JetBrains Mono', monospace;
        font-size: 9px;
        color: #999;
        text-align: center;
        padding-top: 3px;
        line-height: 1.4;
      }

      .m-edu-degree {
        font-size: 12px;
        font-weight: 600;
        color: #111;
        margin-bottom: 2px;
      }

      .m-edu-school {
        font-size: 11px;
        color: #666;
        font-weight: 300;
      }
    </style>

    <div class="m-wrap">

      <!-- LEFT SIDEBAR -->
      <div class="m-sidebar">

        <!-- Avatar initials -->
        <div>
          <div class="m-avatar">${(name || 'R').charAt(0).toUpperCase()}</div>
          <div class="m-s-name">${name || 'Your Name'}</div>
          <div class="m-s-title">${title || 'Your Title'}</div>

          <!-- Contact -->
          <div class="m-contact-list">
            ${email    ? `<div class="m-contact-item"><span class="m-contact-icon">✉</span>${email}</div>` : ''}
            ${phone    ? `<div class="m-contact-item"><span class="m-contact-icon">☏</span>${phone}</div>` : ''}
            ${location ? `<div class="m-contact-item"><span class="m-contact-icon">⌖</span>${location}</div>` : ''}
            ${linkedin ? `<div class="m-contact-item"><span class="m-contact-icon">in</span>${linkedin}</div>` : ''}
            ${github   ? `<div class="m-contact-item"><span class="m-contact-icon">⌥</span>${github}</div>` : ''}
          </div>
        </div>

        <!-- Technical Skills -->
        ${techTags ? `
        <div>
          <div class="m-s-section-title">Technical Skills</div>
          ${techTags}
        </div>` : ''}

        <!-- Tools -->
        ${toolTags ? `
        <div>
          <div class="m-s-section-title">Tools & Platforms</div>
          ${toolTags}
        </div>` : ''}

        <!-- Languages -->
        ${langItems ? `
        <div>
          <div class="m-s-section-title">Languages</div>
          ${langItems}
        </div>` : ''}

        <!-- Certifications -->
        ${certItems ? `
        <div>
          <div class="m-s-section-title">Certifications</div>
          ${certItems}
        </div>` : ''}

      </div>

      <!-- RIGHT MAIN -->
      <div class="m-main">

        <div class="m-main-name">${name || 'Your Name'}</div>
        <div class="m-main-title">${title || 'Your Title'}</div>
        <div class="m-divider"></div>

        ${summary ? `<div class="m-summary">${summary}</div>` : ''}

        <!-- Experience -->
        ${expHTML ? `
        <div class="m-section">
          <div class="m-section-title">Experience</div>
          ${expHTML}
        </div>` : ''}

        <!-- Education -->
        ${eduHTML ? `
        <div class="m-section">
          <div class="m-section-title">Education</div>
          ${eduHTML}
        </div>` : ''}

      </div>
    </div>
  `;
}
