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
