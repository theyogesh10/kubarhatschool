// FILTER SYSTEM
const filterButtons = document.querySelectorAll(".gallery-filters button");
const items = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    document.querySelector(".gallery-filters .active").classList.remove("active");
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    items.forEach(item => {
      if(filter === "all" || item.classList.contains(filter)){
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

  });
});


// LIGHTBOX
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll(".gallery-item img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

document.querySelector(".lightbox .close").addEventListener("click", () => {
  lightbox.style.display = "none";
});

// CLOSE ON OUTSIDE CLICK
lightbox.addEventListener("click", (e) => {
  if(e.target === lightbox){
    lightbox.style.display = "none";
  }
});