/* =========================================================
   NEXI WEBSITE
   OPTIMIZED VANILLA JAVASCRIPT
   FAST + SMOOTH + RESPONSIVE
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const preloader = document.getElementById("preloader");
    const header = document.getElementById("header");
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const backToTop = document.getElementById("backToTop");

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

        if (!preloader) return;

        setTimeout(() => {

            preloader.classList.add("hide");

        }, 400);

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


        const mobileLinks =
            navbar.querySelectorAll("a");

        mobileLinks.forEach(link => {

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
       OPTIMIZED SCROLL HANDLER
    ===================================================== */

    let ticking = false;

    const updateScrollUI = () => {

        const scrollPosition =
            window.scrollY;

        /* Header */

        if (header) {

            header.classList.toggle(
                "scrolled",
                scrollPosition > 30
            );

        }


        /* Back to top */

        if (backToTop) {

            backToTop.classList.toggle(
                "show",
                scrollPosition > 500
            );

        }


        ticking = false;

    };


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateScrollUI
                );

                ticking = true;

            }

        },
        { passive: true }
    );


    updateScrollUI();


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
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    let navigationTicking = false;


    const updateActiveNavigation = () => {

        const position =
            window.scrollY + 180;

        let currentSection = "home";


        sections.forEach(section => {

            const top =
                section.offsetTop;

            const bottom =
                top + section.offsetHeight;


            if (
                position >= top &&
                position < bottom
            ) {

                currentSection =
                    section.id;

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


        navigationTicking = false;

    };


    window.addEventListener(
        "scroll",
        () => {

            if (!navigationTicking) {

                requestAnimationFrame(
                    updateActiveNavigation
                );

                navigationTicking = true;

            }

        },
        { passive: true }
    );


    updateActiveNavigation();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

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
                    threshold: 0.08,
                    rootMargin:
                        "0px 0px -30px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "visible"
            );

        });

    }


    /* =====================================================
       PORTFOLIO FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );

    const portfolioCards =
        document.querySelectorAll(
            ".portfolio-card"
        );


    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                const filter =
                    button.dataset.filter;


                portfolioCards.forEach(card => {

                    const category =
                        card.dataset.category;


                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        card.classList.remove(
                            "hidden"
                        );

                    } else {

                        card.classList.add(
                            "hidden"
                        );

                    }

                });

            }
        );

    });


    /* =====================================================
       SERVICE / PRICING BUTTONS
    ===================================================== */

    const serviceButtons =
        document.querySelectorAll(
            "[data-service]"
        );

    const websiteType =
        document.getElementById(
            "websiteType"
        );


    serviceButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const selectedService =
                    button.dataset.service;


                if (
                    !websiteType ||
                    !selectedService
                ) {
                    return;
                }


                const matchingOption =
                    Array.from(
                        websiteType.options
                    ).find(
                        option =>
                            option.textContent.trim() ===
                            selectedService.trim()
                    );


                if (matchingOption) {

                    websiteType.value =
                        matchingOption.value;

                    /* Move to contact form */

                    if (contactForm) {

                        contactForm.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    }

                }

            }
        );

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
                    new FormData(
                        contactForm
                    );


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
                        formData.get(
                            "websiteType"
                        ) || ""
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


                /* -----------------------------------------
                   NAME
                ----------------------------------------- */

                if (name.length < 2) {

                    showError(
                        "nameError",
                        "Please enter your name."
                    );

                    valid = false;

                }


                /* -----------------------------------------
                   EMAIL
                ----------------------------------------- */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(
                        email
                    )
                ) {

                    showError(
                        "emailError",
                        "Please enter a valid email."
                    );

                    valid = false;

                }


                /* -----------------------------------------
                   PHONE
                ----------------------------------------- */

                const cleanPhone =
                    phone.replace(
                        /\D/g,
                        ""
                    );


                if (
                    cleanPhone.length !== 10
                ) {

                    showError(
                        "phoneError",
                        "Please enter a valid 10-digit phone number."
                    );

                    valid = false;

                }


                /* -----------------------------------------
                   WEBSITE TYPE
                ----------------------------------------- */

                if (!type) {

                    showError(
                        "websiteTypeError",
                        "Please select a website type."
                    );

                    valid = false;

                }


                /* -----------------------------------------
                   MESSAGE
                ----------------------------------------- */

                if (
                    message.length < 10
                ) {

                    showError(
                        "messageError",
                        "Please enter at least 10 characters."
                    );

                    valid = false;

                }


                /* -----------------------------------------
                   VALIDATION RESULT
                ----------------------------------------- */

                if (!valid) {

                    showFormResult(
                        "Please correct the highlighted fields.",
                        "error"
                    );

                    return;

                }


                /* -----------------------------------------
                   WHATSAPP MESSAGE
                ----------------------------------------- */

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


                /* -----------------------------------------
                   EMAIL MESSAGE
                ----------------------------------------- */

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


                /* -----------------------------------------
                   SUCCESS
                ----------------------------------------- */

                if (formResult) {

                    formResult.className =
                        "form-result success";


                    formResult.innerHTML = `

                        <strong>
                            Inquiry prepared successfully.
                        </strong>

                        <br><br>

                        <a
                            href="${whatsappURL}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn btn-whatsapp"
                            style="display:inline-flex;"
                        >

                            <i
                                class="fa-brands fa-whatsapp"
                            ></i>

                            Send via WhatsApp

                        </a>


                        <a
                            href="mailto:tejashweejena50@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}"
                            class="btn btn-secondary"
                            style="
                                display:inline-flex;
                                margin-left:6px;
                            "
                        >

                            <i
                                class="fa-solid fa-envelope"
                            ></i>

                            Send via Email

                        </a>

                    `;

                }

            }
        );

    }


    /* =====================================================
       WHATSAPP MESSAGE
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
       EMAIL MESSAGE
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
       FORM ERROR
    ===================================================== */

    function showError(
        elementId,
        message
    ) {

        const element =
            document.getElementById(
                elementId
            );


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


        errorElements.forEach(
            element => {

                element.textContent = "";

            }
        );


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

        if (!formResult) return;


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
       CEO 3D MOUSE EFFECT
    ===================================================== */

    const ceoCard =
        document.querySelector(
            ".ceo-card"
        );

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    if (
        ceoCard &&
        heroVisual &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        let mouseAnimationFrame = null;


        heroVisual.addEventListener(
            "mousemove",
            event => {

                if (mouseAnimationFrame) {
                    return;
                }


                mouseAnimationFrame =
                    requestAnimationFrame(
                        () => {

                            const rect =
                                heroVisual.getBoundingClientRect();


                            const x =
                                event.clientX -
                                rect.left;


                            const y =
                                event.clientY -
                                rect.top;


                            const centerX =
                                rect.width / 2;


                            const centerY =
                                rect.height / 2;


                            const rotateY =
                                ((x - centerX) /
                                    centerX) * 5;


                            const rotateX =
                                ((centerY - y) /
                                    centerY) * 5;


                            ceoCard.style.transform =
                                `translate3d(0,-5px,0)
                                 rotateX(${rotateX}deg)
                                 rotateY(${rotateY}deg)`;


                            mouseAnimationFrame =
                                null;

                        }
                    );

            },
            { passive: true }
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
       MANAGER PROFILE
       FAST + SMOOTH ANIMATION
    ===================================================== */

    const managerProfile =
        document.querySelector(
            "#manager .manager-profile"
        );


    if (managerProfile) {

        /* Initial state */

        managerProfile.style.opacity =
            "0";


        managerProfile.style.transform =
            "translate3d(0,35px,0)";


        managerProfile.style.willChange =
            "opacity, transform";


        managerProfile.style.transition =
            "opacity 0.6s ease, " +
            "transform 0.6s cubic-bezier(0.22,1,0.36,1)";


        /* Intersection Observer */

        if (
            "IntersectionObserver" in window
        ) {

            const managerObserver =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    requestAnimationFrame(
                                        () => {

                                            managerProfile.style.opacity =
                                                "1";


                                            managerProfile.style.transform =
                                                "translate3d(0,0,0)";


                                            managerProfile.style.willChange =
                                                "auto";

                                        }
                                    );


                                    managerObserver.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.15,
                        rootMargin:
                            "0px 0px -50px 0px"
                    }
                );


            managerObserver.observe(
                managerProfile
            );


        } else {

            managerProfile.style.opacity =
                "1";

            managerProfile.style.transform =
                "translate3d(0,0,0)";

            managerProfile.style.willChange =
                "auto";

        }

    }


    /* =====================================================
       SMOOTH ANCHOR NAVIGATION
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute(
                            "href"
                        );


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
       ESCAPE KEY
       CLOSE MOBILE MENU
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


    /* =====================================================
       REDUCED MOTION SUPPORT
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reducedMotion.matches) {

        document.documentElement.style
            .scrollBehavior = "auto";

    }

});
