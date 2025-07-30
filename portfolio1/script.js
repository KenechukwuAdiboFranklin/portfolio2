document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.querySelector("form");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you for reaching out! I'll get back to you soon.");
            contactForm.reset();
        });
    }

    // Scroll reveal effect for sections
    const revealElements = document.querySelectorAll(".about-section, .projects-section, .contact-section");

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach((el) => {
            const boxTop = el.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                el.style.opacity = 1;
                el.style.transform = "translateY(0)";
            }
        });
    };

    revealElements.forEach((el) => {
        el.style.opacity = 0;
        el.style.transform = "translateY(50px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    });

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
});