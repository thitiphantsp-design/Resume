// ─── Highlight active nav link on scroll ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-dots a');

function updateActiveNav() {
  let currentId = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + currentId) {
      link.style.color = 'var(--accent)';
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// ─── Update footer year automatically ───
const footer = document.querySelector('footer p');
if (footer) {
  const year = new Date().getFullYear();
  footer.innerHTML = footer.innerHTML.replace('2025', year);
}
