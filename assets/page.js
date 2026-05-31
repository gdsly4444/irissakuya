const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", scrollY > 16);
}, { passive: true });

document.querySelectorAll(".rg").forEach(g => {
  g.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.setProperty("--d", i * 80 + "ms");
  });
});

let lastY = scrollY, dir = "down";
addEventListener("scroll", () => {
  dir = scrollY > lastY ? "down" : "up";
  lastY = scrollY;
}, { passive: true });

const io = new IntersectionObserver(es => {
  es.forEach(e => {
    const el = e.target;
    if (e.isIntersecting) {
      el.classList.remove("from-t", "from-b");
      el.classList.add(dir === "down" ? "from-b" : "from-t", "show");
    } else {
      el.classList.remove("show", "from-t", "from-b");
      el.classList.add(dir === "down" ? "from-t" : "from-b");
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

document.querySelectorAll(".reveal").forEach(el => {
  el.classList.add("from-b");
  io.observe(el);
});

document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.f;
    document.querySelectorAll(".list-item").forEach(item => {
      item.classList.toggle("hidden", f !== "all" && item.dataset.c !== f);
    });
    updateCount();
  });
});

function updateCount() {
  const counter = document.getElementById("count");
  if (!counter) return;
  const visible = document.querySelectorAll(".list-item:not(.hidden)").length;
  counter.textContent = visible + " entr" + (visible === 1 ? "y" : "ies");
}

updateCount();
