/* =========================
   TAB SWITCHING
   -------------------------
   Handles switching between
   tab buttons and their
   corresponding content
   ========================= */

// Select all tab buttons
const tabs = document.querySelectorAll(".tab");

// Select all tab content sections
const tabContents = document.querySelectorAll(".tab-content");

// Attach click handler to each tab
tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    // -------------------------
    // Reset state
    // Remove "active" class
    // from all tabs and panels
    // -------------------------
    tabs.forEach(t => t.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));

    // -------------------------
    // Activate clicked tab
    // -------------------------
    tab.classList.add("active");

    // Find the matching content section
    // using data-tab attribute
    const target = document.getElementById(tab.dataset.tab);

    // Safely activate target if it exists
    if (target) target.classList.add("active");
  });
});


/* =========================
   SCROLL-DRIVEN CARD STACK
   -------------------------
   Controls stacked card
   animation based on scroll
   position within section
   ========================= */

// Select the section that controls scroll behavior
const stackSection = document.querySelector(".card-stack-section");

// Select all stacked cards
const stackCards = document.querySelectorAll(".stack-card");

// Only run logic if required elements exist
if (stackSection && stackCards.length) {

  // Listen for window scroll events
  window.addEventListener("scroll", () => {

    // Get position and size of the stack section
    const rect = stackSection.getBoundingClientRect();

    // -------------------------
    // Calculate scroll progress
    // -------------------------
    // rect.top is negative once section enters viewport
    // Divide by height to get percentage scrolled
    // Clamp value between 0 and 1
    const progress = Math.min(
      Math.max(-rect.top / rect.height, 0),
      1
    );

    // Total number of cards in stack
    const totalCards = stackCards.length;

    // Determine which card should be active
    // based on scroll progress
    const activeIndex = Math.floor(progress * totalCards);

    // -------------------------
    // Update card states
    // -------------------------
    stackCards.forEach((card, index) => {

      // Current active card
      if (index === activeIndex) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
        card.style.zIndex = "2";
      } 

      // Cards already passed (move upward)
      else if (index < activeIndex) {
        card.style.opacity = "0";
        card.style.transform = "translateY(-80px)";
        card.style.zIndex = "1";
      } 

      // Cards yet to appear (move downward)
      else {
        card.style.opacity = "0";
        card.style.transform = "translateY(80px)";
        card.style.zIndex = "1";
      }
    });
  });
}
