/* Event-driven JS functions for theme toggle functioning */
document.addEventListener("DOMContentLoaded", function () {
    /* Theme Toggler */
    const themeToggle = document.querySelector("#themeToggle");

    function setTheme(mode) {
        if (mode === "light") {
            document.body.classList.add("light-mode");
            localStorage.setItem("theme", "light");

            if (themeToggle) {
                themeToggle.setAttribute("aria-label", "Switch to sleeping dark mode");
                themeToggle.setAttribute("title", "Switch to sleeping dark mode");
            }
        } else {
            document.body.classList.remove("light-mode");
            localStorage.setItem("theme", "dark");

            if (themeToggle) {
                themeToggle.setAttribute("aria-label", "Switch to waking light mode");
                themeToggle.setAttribute("title", "Switch to waking light mode");
            }
        }
    }

    if (localStorage.getItem("theme") === "light") {
        setTheme("light");
    } else {
        setTheme("dark");
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            /* Update: added small bounce for the new sleepy/wake-up character toggle */
            themeToggle.classList.add("is-changing");

            setTimeout(function () {
                themeToggle.classList.remove("is-changing");
            }, 350);

            if (document.body.classList.contains("light-mode")) {
                setTheme("dark");
            } else {
                setTheme("light");
            }
        });
    }

    /* To close mobile menu after clicking a navbar link */
    const navbar = document.querySelector("#navbarNav");
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (navbar && navbar.classList.contains("show") && window.bootstrap) {
                const menu = window.bootstrap.Collapse.getOrCreateInstance(navbar);
                menu.hide();
            }
        });
    });

    /* To check if the contact Form is valid */
    const contactForm = document.querySelector("#contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            const name = document.querySelector("#name").value.trim();
            const email = document.querySelector("#email").value.trim();
            const subject = document.querySelector("#subject").value.trim();
            const message = document.querySelector("#message").value.trim();

            if (name === "" || email === "" || subject === "" || message === "") {
                event.preventDefault();
                alert("Please fill out all fields before sending.");
            } else if (!email.includes("@") || !email.includes(".")) {
                event.preventDefault();
                alert("Please enter a valid email address.");
            } else {
                alert("Thank you! Your message is ready to send.");
            }
        });
    }

    /* Back To Top Button functionality */
    const backToTop = document.querySelector("#backToTop");

    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        });

        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* Update: adding project filter buttons */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectWrappers = document.querySelectorAll(".project-wrapper");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedFilter = button.getAttribute("data-filter");

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            projectWrappers.forEach(function (project) {
                const projectCategories = project.getAttribute("data-category");

                if (selectedFilter === "all" || projectCategories.includes(selectedFilter)) {
                    project.classList.remove("hide-project");
                } else {
                    project.classList.add("hide-project");
                }
            });
        });
    });

    /* scroll reveal animation */
    const revealItems = document.querySelectorAll(
        ".section-header, .section-title, .about-content, .card, .contact-note, .contact-form, .art-item"
    );

    revealItems.forEach(function (item) {
        item.classList.add("reveal-item");
    });

    function showRevealItems() {
        revealItems.forEach(function (item) {
            const position = item.getBoundingClientRect().top;

            if (position < window.innerHeight - 80) {
                item.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", showRevealItems);
    showRevealItems();

    /* Added sparkle effect on clicking anywhere on the page */
    document.addEventListener("click", function (event) {
        const sparkle = document.createElement("span");
        const symbols = ["✦", "✧", "★", "💫", "◇", "</>"];

        sparkle.className = "click-sparkle";
        sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        sparkle.style.left = event.clientX + "px";
        sparkle.style.top = event.clientY + "px";

        document.body.appendChild(sparkle);

        setTimeout(function () {
            sparkle.remove();
        }, 750);
    });


    /* Update: hero photo dissolves when clicked or when keyboard Enter/Space is pressed */
    const heroPhoto = document.querySelector(".photo-dissolve");
    const heroPhotoArea = document.querySelector(".hero-photo-area");

    function playHeroDissolve() {
        if (!heroPhoto || !heroPhotoArea) {
            return;
        }

        heroPhoto.classList.add("is-dissolving");
        heroPhotoArea.classList.add("dissolving");

        setTimeout(function () {
            heroPhoto.classList.remove("is-dissolving");
            heroPhotoArea.classList.remove("dissolving");
        }, 1200);
    }

    if (heroPhoto) {
        heroPhoto.setAttribute("role", "button");
        heroPhoto.setAttribute("tabindex", "0");
        heroPhoto.setAttribute("aria-label", "Play hero photo dissolve animation");

        heroPhoto.addEventListener("click", playHeroDissolve);

        heroPhoto.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                playHeroDissolve();
            }
        });
    }

    /* Art Gallery Click Preview */
    const artImages = document.querySelectorAll(".art-item img");

    artImages.forEach(function (image) {
        image.style.cursor = "pointer";
        image.title = "Click to view artwork";

        image.addEventListener("click", function () {
            window.open(image.src, "_blank");
        });
    });
});
