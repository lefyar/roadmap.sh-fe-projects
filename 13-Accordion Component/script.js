const accordionHeaders = document.querySelectorAll(".accordion-header");

document.addEventListener("DOMContentLoaded", () => {
  const accordionContents = document.querySelectorAll(".accordion-content");

  accordionContents.forEach((content) => {
    content.style.maxHeight = "0";
    content.style.padding = "0";
    content.style.margin = "0";
    content.style.border = "none";
  });
});

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const isActive = header.classList.toggle("active");

    const content = header.nextElementSibling;
    const arrow = header.querySelector("img");

    accordionHeaders.forEach((otherHeader) => {
      if (otherHeader !== header) {
        otherHeader.classList.remove("active");
        const otherContent = otherHeader.nextElementSibling;
        otherContent.style.maxHeight = null;
        otherContent.style.padding = "0";
        otherContent.style.margin = "0";
        otherContent.style.border = "none";
        const otherArrow = otherHeader.querySelector("img");
        otherArrow.style.transform = "rotate(0deg)";
      }
    });

    if (isActive) {
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.marginTop = "10px";
      content.style.border = "solid 2px #000000";
      arrow.style.transform = "rotate(180deg)";
    } else {
      content.style.maxHeight = null;
      content.style.padding = "0";
      content.style.margin = "0";
      content.style.border = "none";
      arrow.style.transform = "rotate(0deg)";
    }
  });
});