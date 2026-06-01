(function () {
  const STORAGE_KEY = "irissakuya-live2d-pos";

  L2Dwidget.on("create-container", setupDrag);

  L2Dwidget.init({
    model: {
      jsonPath: "https://unpkg.com/live2d-widget-model-hijiki@1.0.5/assets/hijiki.model.json",
      scale: 1
    },
    display: { position: "right", width: 180, height: 320, hOffset: 16, vOffset: 0 },
    mobile: { show: true, scale: 0.4 },
    react: { opacityDefault: 1, opacityOnHover: 0.9 }
  });

  function setupDrag(widget) {
    if (widget.dataset.dragReady) return;
    widget.dataset.dragReady = "1";

    const handle = document.createElement("button");
    handle.type = "button";
    handle.className = "live2d-drag-handle";
    handle.setAttribute("aria-label", "Drag Hijiki");
    handle.title = "Drag to move Hijiki";
    widget.insertBefore(handle, widget.firstChild);

    const saved = readSavedPosition();
    if (saved) applyPosition(widget, saved.left, saved.top);

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    handle.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      dragging = true;
      handle.setPointerCapture(e.pointerId);
      handle.classList.add("dragging");
      widget.classList.add("is-dragging");

      const rect = widget.getBoundingClientRect();
      pinPosition(widget, rect.left, rect.top);

      startX = e.clientX;
      startY = e.clientY;
      startLeft = rect.left;
      startTop = rect.top;
    });

    handle.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      applyPosition(
        widget,
        startLeft + (e.clientX - startX),
        startTop + (e.clientY - startY)
      );
    });

    function endDrag() {
      if (!dragging) return;
      dragging = false;
      handle.classList.remove("dragging");
      widget.classList.remove("is-dragging");

      const rect = widget.getBoundingClientRect();
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ left: rect.left, top: rect.top })
      );
      syncNote(widget);
    }

    handle.addEventListener("pointerup", endDrag);
    handle.addEventListener("pointercancel", endDrag);

    window.addEventListener("resize", () => {
      const rect = widget.getBoundingClientRect();
      if (widget.style.left) applyPosition(widget, rect.left, rect.top);
      syncNote(widget);
    });

    syncNote(widget);
  }

  function readSavedPosition() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function pinPosition(widget, left, top) {
    widget.style.right = "auto";
    widget.style.bottom = "auto";
    widget.style.left = left + "px";
    widget.style.top = top + "px";
  }

  function applyPosition(widget, left, top) {
    const w = widget.offsetWidth || 180;
    const h = widget.offsetHeight || 320;
    const maxLeft = Math.max(8, window.innerWidth - w - 8);
    const maxTop = Math.max(8, window.innerHeight - h - 8);
    pinPosition(
      widget,
      Math.min(maxLeft, Math.max(8, left)),
      Math.min(maxTop, Math.max(8, top))
    );
    syncNote(widget);
  }

  function syncNote(widget) {
    const note = document.querySelector(".live2d-note");
    if (!note) return;

    const rect = widget.getBoundingClientRect();
    const noteW = note.offsetWidth;
    const noteH = note.offsetHeight;
    let left = rect.left - noteW - 12;
    if (left < 8) left = rect.right + 12;
    if (left + noteW > window.innerWidth - 8) {
      left = window.innerWidth - noteW - 8;
    }

    let top = rect.bottom - noteH - 16;
    top = Math.min(window.innerHeight - noteH - 8, Math.max(8, top));

    note.style.left = left + "px";
    note.style.top = top + "px";
    note.style.right = "auto";
    note.style.bottom = "auto";
  }
})();
