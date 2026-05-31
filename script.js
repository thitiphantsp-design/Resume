// ═════════════════════════════════════════════════════════════════════════════
// PROJECT DATA & MODAL MANAGEMENT
// ═════════════════════════════════════════════════════════════════════════════

/**
 * PROJECT DATA: ข้อมูลโครงการทั้งหมด
 * - key: 'hris' ใช้สำหรับระบุโครงการแต่ละตัว
 * - tag: ป้ายบ่งบอกเทคโนโลยี (Playwright / TypeScript)
 * - title: ชื่อโครงการ
 * - description: อธิบายโครงการให้ละเอียด
 * - tech: แถวของเทคโนโลยีที่ใช้
 * - features: ลิสต์คุณสมบัติของโครงการ
 * - highlights: ผลสำเร็จที่สำคัญ
 */
const projectData = {
  hris: {
    tag: 'Playwright / TypeScript',
    title: 'Automated Testing System for HRIS',
    description: 'An end-to-end automated testing framework for the Provident Fund module designed to streamline monthly smoke tests and reduce redundant manual tasks.',
    tech: ['Playwright', 'TypeScript', 'Page Object Model (POM)', 'Allure Report'],
    features: [
      'Cross-browser testing',
      'Parallel test execution for faster results',
      'Screenshot and video recording on failures',
      'Detailed HTML reporting with Allure',
      'Reusable test utilities and helpers'
    ],
    highlights: '80% reduction in monthly smoke test execution time'
  }
};

/**
 * OPEN PROJECT MODAL: เปิดป๊อปอัปแสดงรายละเอียดโครงการ
 * 
 * ขั้นตอนการทำงาน:
 * 1. ค้นหา .project-card จากปุ่มที่คลิก
 * 2. ดึง data-project attribute เพื่อรู้ว่าเป็นโครงการไหน
 * 3. ดึงข้อมูลจาก projectData object
 * 4. สร้าง HTML สำหรับเทคโนโลยี (tech tags)
 * 5. สร้าง HTML สำหรับลิสต์คุณสมบัติ
 * 6. แสดงผลในป๊อปอัป
 */
function openProjectModal(event) {
  const card = event.target.closest('.project-card');
  const projectId = card.getAttribute('data-project');
  const project = projectData[projectId];
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');

  // สร้าง HTML สำหรับปุ่มเทคโนโลยี
  let techHTML = project.tech.map(t => `<span class="project-tag-modal">${t}</span>`).join('');
  
  // สร้าง HTML สำหรับรายการคุณสมบัติ
  let featuresHTML = project.features.map(f => `<li>${f}</li>`).join('');

  // ใส่เนื้อหาลงในป๊อปอัป (HTML template)
  modalBody.innerHTML = `
    <h2>${project.title}</h2>
    <p class="modal-description">${project.description}</p>
    <h3>Technology Stack</h3>
    <div class="modal-tech">${techHTML}</div>
    <h3>Key Features</h3>
    <ul class="modal-features">${featuresHTML}</ul>
    <p class="modal-highlight"><strong>Result:</strong> ${project.highlights}</p>
  `;
  
  // แสดงป๊อปอัปบนหน้าจอ
  modal.style.display = 'block';
}

/**
 * CLOSE PROJECT MODAL: ปิดป๊อปอัป
 * - ซ่อนโดยตั้ง display เป็น 'none'
 */
function closeProjectModal() {
  document.getElementById('projectModal').style.display = 'none';
}

/**
 * CLOSE ON OUTSIDE CLICK: ปิดป๊อปอัปเมื่อคลิกข้างนอก
 * - event.target === modal ตรวจสอบว่าคลิกที่พื้นหลัง (backdrop)
 */
window.onclick = function(event) {
  const modal = document.getElementById('projectModal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}


// ═════════════════════════════════════════════════════════════════════════════
// NAVIGATION HIGHLIGHT ON SCROLL
// ═════════════════════════════════════════════════════════════════════════════

/**
 * NAVIGATION UPDATE: เปลี่ยนสีลิงค์นำทางตามส่วนที่เลื่อนไปแล้ว
 * 
 * ขั้นตอนการทำงาน:
 * 1. ค้นหา section ทั้งหมดที่มี ID
 * 2. ค้นหาลิงค์ทั้งหมดในนำทาง (.nav-dots)
 * 3. อ่านตำแหน่งการเลื่อน (scroll Y)
 * 4. หาว่า section ไหนสูงขึ้นมา
 * 5. เปลี่ยนสีลิงค์ที่ตรงกับ section ปัจจุบัน
 */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-dots a');

function updateActiveNav() {
  let currentId = '';

  // ค้นหา section ที่อยู่ในมุมมองปัจจุบัน (viewport)
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // ลบ 100px สำหรับความสูงของ header
    if (window.scrollY >= sectionTop) {
      currentId = section.getAttribute('id');
    }
  });

  // อัปเดตสีลิงค์นำทาง ตามส่วนปัจจุบัน
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + currentId) {
      link.style.color = 'var(--accent)'; // เปลี่ยนเป็นสี accent เมื่อเป็นส่วนปัจจุบัน
    }
  });
}

// ฟังเหตุการณ์เลื่อนหน้าจอ เพื่ออัปเดตนำทาง
window.addEventListener('scroll', updateActiveNav);


// ═════════════════════════════════════════════════════════════════════════════
// FOOTER YEAR AUTO-UPDATE
// ═════════════════════════════════════════════════════════════════════════════

/**
 * FOOTER YEAR: อัปเดตปีในส่วนท้ายอัตโนมัติ
 * 
 * ขั้นตอนการทำงาน:
 * 1. ค้นหา footer element
 * 2. ดึงปีปัจจุบันจากระบบ (new Date().getFullYear())
 * 3. แทนที่ปีตัวอย่าง (2025) ด้วยปีปัจจุบัน
 * 
 * ประโยชน์: ไม่ต้องแก้ไขข้อความ footer ทุกปี
 */
const footer = document.querySelector('footer p');
if (footer) {
  const year = new Date().getFullYear();
  footer.innerHTML = footer.innerHTML.replace('2025', year);
}
