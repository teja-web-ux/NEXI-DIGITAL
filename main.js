/* =========================================================
   NEXI WEBSITE
   VANILLA JAVASCRIPT
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const preloader =
        document.getElementById("preloader");

    const header =
        document.getElementById("header");

    const navbar =
        document.getElementById("navbar");

    const menuToggle =
        document.getElementById("menuToggle");

    const backToTop =
        document.getElementById("backToTop");

    const contactForm =
        document.getElementById("contactForm");

    const formResult =
        document.getElementById("formResult");

    const yearElement =
        document.getElementById("year");


    /* =====================================================
       PRELOADER
    ===================================================== */

    window.addEventListener("load", () => {

        if (!preloader) {
            return;
        }

        setTimeout(() => {

            preloader.classList.add("hide");

        }, 500);

    });


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navbar.classList.toggle("open");

            menuToggle.classList.toggle(
                "open",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        const navLinks =
            navbar.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("open");

                menuToggle.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const handleScroll = () => {

        const scrollPosition =
            window.scrollY;

        if (header) {

            header.classList.toggle(
                "scrolled",
                scrollPosition > 30
            );

        }

        if (backToTop) {

            backToTop.classList.toggle(
                "show",
                scrollPosition > 500
            );

        }

    };

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    handleScroll();


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("main section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const updateActiveNavigation = () => {

        let currentSection = "home";

        const scrollPosition =
            window.scrollY + 180;

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            const href =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       PORTFOLIO FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const portfolioCards =
        document.querySelectorAll(".portfolio-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            const filter =
                button.dataset.filter;

            portfolioCards.forEach(card => {

                const category =
                    card.dataset.category;

                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.classList.remove("hidden");

                } else {

                    card.classList.add("hidden");

                }

            });

        });

    });


    /* =====================================================
       SERVICE / PRICING BUTTONS
    ===================================================== */

    const serviceButtons =
        document.querySelectorAll(
            "[data-service]"
        );

    const websiteType =
        document.getElementById("websiteType");

    serviceButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedService =
                button.dataset.service;

            if (
                websiteType &&
                selectedService
            ) {

                const options =
                    Array.from(
                        websiteType.options
                    );

                const matchingOption =
                    options.find(
                        option =>
                            option.textContent.trim() ===
                            selectedService
                    );

                if (matchingOption) {

                    websiteType.value =
                        matchingOption.value;

                }

            }

        });

    });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                clearFormErrors();

                const formData =
                    new FormData(contactForm);

                const name =
                    String(
                        formData.get("name") || ""
                    ).trim();

                const email =
                    String(
                        formData.get("email") || ""
                    ).trim();

                const phone =
                    String(
                        formData.get("phone") || ""
                    ).trim();

                const type =
                    String(
                        formData.get("websiteType") || ""
                    ).trim();

                const budget =
                    String(
                        formData.get("budget") || ""
                    ).trim();

                const message =
                    String(
                        formData.get("message") || ""
                    ).trim();


                let valid = true;


                /* NAME */

                if (name.length < 2) {

                    showError(
                        "nameError",
                        "Please enter your name."
                    );

                    valid = false;

                }


                /* EMAIL */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(email)) {

                    showError(
                        "emailError",
                        "Please enter a valid email."
                    );

                    valid = false;

                }


                /* PHONE */

                const cleanPhone =
                    phone.replace(/\D/g, "");

                if (
                    cleanPhone.length !== 10
                ) {

                    showError(
                        "phoneError",
                        "Please enter a valid 10-digit phone number."
                    );

                    valid = false;

                }


                /* WEBSITE TYPE */

                if (!type) {

                    showError(
                        "websiteTypeError",
                        "Please select a website type."
                    );

                    valid = false;

                }


                /* MESSAGE */

                if (message.length < 10) {

                    showError(
                        "messageError",
                        "Please enter at least 10 characters."
                    );

                    valid = false;

                }


                if (!valid) {

                    showFormResult(
                        "Please correct the highlighted fields.",
                        "error"
                    );

                    return;

                }


                /* =================================================
                   FRONTEND ONLY SUCCESS
                ================================================= */

                showFormResult(
                    "Your inquiry is ready. Choose WhatsApp or Email below.",
                    "success"
                );


                const whatsappMessage =
                    createWhatsAppMessage({
                        name,
                        email,
                        phone,
                        type,
                        budget,
                        message
                    });


                const whatsappURL =
                    "https://wa.me/916289292667?text=" +
                    encodeURIComponent(
                        whatsappMessage
                    );


                const emailSubject =
                    "NEXI Website Inquiry - " +
                    type;

                const emailBody =
                    createEmailMessage({
                        name,
                        email,
                        phone,
                        type,
                        budget,
                        message
                    });


                formResult.innerHTML = `

                    <strong>
                        Inquiry prepared successfully.
                    </strong>

                    <br><br>

                    <a
                        href="${whatsappURL}"
                        target="_blank"
                        rel="noopener"
                        class="btn btn-whatsapp"
                        style="display:inline-flex;">
                        <i class="fa-brands fa-whatsapp"></i>
                        Send via WhatsApp
                    </a>

                    <a
                        href="mailto:tejashweejena50@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}"
                        class="btn btn-secondary"
                        style="display:inline-flex;margin-left:6px;">
                        <i class="fa-solid fa-envelope"></i>
                        Send via Email
                    </a>

                `;

            }

        );

    }


    /* =====================================================
       CREATE WHATSAPP MESSAGE
    ===================================================== */

    function createWhatsAppMessage(data) {

        return `
Hello NEXI Website,

I am interested in creating a website.

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Website Type: ${data.type}
Budget: ${data.budget || "Not specified"}

Project Details:
${data.message}

Please share more details about the website development process.

Thank you.
        `.trim();

    }


    /* =====================================================
       CREATE EMAIL MESSAGE
    ===================================================== */

    function createEmailMessage(data) {

        return `
Hello NEXI Website,

I am interested in creating a website.

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Website Type: ${data.type}
Budget: ${data.budget || "Not specified"}

Project Details:
${data.message}

Please share more details about the website development process.

Thank you.
        `.trim();

    }


    /* =====================================================
       FORM ERROR FUNCTIONS
    ===================================================== */

    function showError(
        elementId,
        message
    ) {

        const element =
            document.getElementById(elementId);

        if (element) {

            element.textContent =
                message;

        }

    }


    function clearFormErrors() {

        const errorElements =
            document.querySelectorAll(
                ".error-message"
            );

        errorElements.forEach(element => {

            element.textContent = "";

        });

        if (formResult) {

            formResult.className =
                "form-result";

            formResult.innerHTML = "";

        }

    }


    function showFormResult(
        message,
        type
    ) {

        if (!formResult) {
            return;
        }

        formResult.textContent =
            message;

        formResult.className =
            `form-result ${type}`;

    }


    /* =====================================================
       DYNAMIC YEAR
    ===================================================== */

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       CEO CARD 3D MOUSE EFFECT
    ===================================================== */

    const ceoCard =
        document.querySelector(".ceo-card");

    const heroVisual =
        document.querySelector(".hero-visual");

    if (
        ceoCard &&
        heroVisual &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        heroVisual.addEventListener(
            "mousemove",
            event => {

                const rect =
                    heroVisual.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateY =
                    ((x - centerX) / centerX) * 6;

                const rotateX =
                    ((centerY - y) / centerY) * 6;

                ceoCard.style.transform =
                    `translateY(-5px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                ceoCard.style.transform =
                    "";

            }
        );

    }


    /* =====================================================
       SMOOTH ANCHOR FALLBACK
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       ESCAPE KEY CLOSES MOBILE MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navbar &&
                menuToggle
            ) {

                navbar.classList.remove(
                    "open"
                );

                menuToggle.classList.remove(
                    "open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


});