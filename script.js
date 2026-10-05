// Where build requests get sent.
const CONTACT_EMAIL = "quantara.company@gmail.com";

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("request-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const subject = `PC build request from ${f.get("name")}`;
  const body = [
    `Name: ${f.get("name")}`,
    `Email: ${f.get("email")}`,
    `Service: ${f.get("service")}`,
    `Budget: ${f.get("budget") || "not given"}`,
    `Main use: ${f.get("use")}`,
    `Has parts: ${f.get("parts")}`,
    "",
    "Details:",
    f.get("details") || "(none)",
  ].join("\n");
  window.location.href =
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// ---- Scroll effects ----
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t) => 1 - Math.pow(1 - t, 3);

// Reveal cards as they enter the screen
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Split the statement into words so they can light up one by one
const fill = document.querySelector(".fill-text");
fill.innerHTML = fill.textContent.split(" ").map((w) => `<span class="w">${w}</span>`).join(" ");
const words = [...fill.querySelectorAll(".w")];

const hero = document.querySelector(".hero-inner");
const glow = document.querySelector(".hero-glow");
const assemble = document.getElementById("assemble");
const pc = document.getElementById("pc");
const parts = [...pc.querySelectorAll(".part")];
const caseGlow = pc.querySelector(".case-glow");
const labels = [...pc.querySelectorAll(".label")];
const stepItems = [...document.querySelectorAll(".steps-live li")];
const STEPS = stepItems.length;

function update() {
  const vh = window.innerHeight;

  // Hero shrinks and fades as you scroll away
  const h = clamp(window.scrollY / vh);
  hero.style.transform = `scale(${1 - h * 0.15}) translateY(${h * -60}px)`;
  hero.style.opacity = 1 - h * 1.2;
  glow.style.transform = `scale(${1 + h * 0.4})`;

  // PC assembles while the sticky stage is pinned
  const r = assemble.getBoundingClientRect();
  const p = clamp(-r.top / (r.height - vh));
  const pos = p * STEPS;
  parts.forEach((g) => {
    const t = ease(clamp(pos - Number(g.dataset.step)));
    const dx = Number(g.dataset.dx) * (1 - t);
    const dy = Number(g.dataset.dy) * (1 - t);
    g.setAttribute("transform", `translate(${dx} ${dy})`);
    g.style.opacity = t;
  });
  const active = Math.min(STEPS - 1, Math.floor(pos));
  labels.forEach((l) => {
    const s = Number(l.dataset.step);
    l.style.opacity = clamp(pos - s - 0.5) ;
    l.classList.toggle("active", s === active);
  });
  stepItems.forEach((li, i) => {
    li.classList.toggle("active", i === active);
    li.classList.toggle("done", i < active);
  });
  const on = clamp(pos - (STEPS - 1));
  caseGlow.style.opacity = on;
  pc.classList.toggle("on", on > 0.2);

  // Statement words light up as it scrolls through the middle of the screen
  const fr = fill.getBoundingClientRect();
  const f = clamp((vh * 0.85 - fr.top) / (fr.height + vh * 0.35));
  const lit = Math.round(f * words.length);
  words.forEach((w, i) => w.classList.toggle("lit", i < lit));
}

let ticking = false;
const onScroll = () => {
  if (!ticking) { ticking = true; requestAnimationFrame(() => { update(); ticking = false; }); }
};
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
update();
