document.addEventListener("DOMContentLoaded", () => {
  const chips = Array.from(document.querySelectorAll("[data-filter]"));
  const cards = Array.from(document.querySelectorAll(".post-card"));

  if (chips.length && cards.length) {
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const filter = chip.dataset.filter;

        chips.forEach((entry) => entry.classList.toggle("is-active", entry === chip));
        cards.forEach((card) => {
          const tags = (card.dataset.tags || "").trim().split(/\s+/).filter(Boolean);
          const visible = filter === "all" || tags.includes(filter);
          card.classList.toggle("is-hidden", !visible);
        });
      });
    });
  }

  const images = document.querySelectorAll("img[loading='lazy']");
  images.forEach((image) => {
    image.addEventListener(
      "load",
      () => {
        image.style.opacity = "1";
      },
      { once: true }
    );

    if (!image.complete) {
      image.style.opacity = "0";
      image.style.transition = "opacity 220ms ease";
    }
  });
});
