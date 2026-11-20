const grid = document.querySelector("#grid");
const dialog = document.querySelector("#lightbox");
const fullImage = document.querySelector("#lightboxImg");
const caption = document.querySelector("#lightboxCaption");

const descriptions = [
  "A black coupe drifting around a wooded bend",
  "Sunlight reflecting off the rear of a car on a country road",
  "A black sports car beside a turn sign in autumn woods",
  "A green sports car passing a yellow field",
  "A red sports car at dusk beneath hot air balloons",
  "A dark sports car with exhaust flames on a tree-lined road",
];

descriptions.forEach((description, i) => {
  const index = i + 1;
  const source = `./grid-photo-${index}.png`;
  const image = document.createElement("img");
  image.src = `./grid-preview-${index}.webp`;
  image.alt = "";
  image.loading = "lazy";
  image.width = 640;
  image.height = 360;
  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "grid-item";
  trigger.setAttribute("aria-label", `View photo ${index}, ${description}`);
  trigger.addEventListener("click", () => {
    fullImage.src = source;
    caption.textContent = description;
    dialog.showModal();
  });
  trigger.append(image);
  grid.append(trigger);
});

document.querySelector("#lightboxClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
