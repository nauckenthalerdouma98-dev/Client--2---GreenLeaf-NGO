/**
 * GreenLeaf NGO – Interactive JavaScript
 * Clean architecture version with Google Sheets integration
 * Smooth scrolling for all internal anchor links
 */

(function () {
    document.addEventListener("DOMContentLoaded", init);

    function init() {

        const body = document.body;
        const navMenu = document.getElementById("navMenu");
        const logoSection = document.querySelector(".logo-section");
        const navLinks = document.querySelectorAll(".nav-menu a");
        const sections = document.querySelectorAll("section[id]");
        const donateBtn = document.querySelector(".donate-btn");
        const newsletterForm = document.querySelector(".newsletter-form");
        const contactForm = document.getElementById("contactForm");

        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz5CWfY7qwEIev_QlPMF3gXsmfsvsOKReXvu9v2uIIKJt8cRiO8u04xJA_0ApNqq8Pz7Q/exec";

        // ---------------- Notification ----------------

        const notification = (() => {
            const el = document.createElement("div");
            el.className = "custom-notification";
            el.setAttribute("role", "alert");
            el.setAttribute("aria-live", "polite");
            el.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 24px;
                background-color: #2e7d32;
                color: white;
                border-radius: 4px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.15);
                font-weight: 600;
                z-index: 9999;
                opacity: 0;
                transform: translateY(-20px);
                transition: opacity 0.3s, transform 0.3s;
                max-width: 300px;
                pointer-events: none;
                border-left: 5px solid #4caf50;
            `;
            document.body.appendChild(el);

            function show(message, success = true) {
                el.textContent = message;
                el.style.backgroundColor = success ? "#2e7d32" : "#c62828";
                el.style.borderLeftColor = success ? "#4caf50" : "#ffb74d";
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
                setTimeout(() => {
                    el.style.opacity = "0";
                    el.style.transform = "translateY(-20px)";
                }, 4000);
            }

            return { show };
        })();

        // ---------------- Mobile Menu ----------------

        if (logoSection && navMenu) {
            logoSection.setAttribute("role", "button");
            logoSection.setAttribute("tabindex", "0");
            logoSection.setAttribute("aria-expanded", "false");

            function toggleMenu() {
                navMenu.classList.toggle("active");
                logoSection.setAttribute(
                    "aria-expanded",
                    navMenu.classList.contains("active")
                );
            }

            function closeMenu() {
                navMenu.classList.remove("active");
                logoSection.setAttribute("aria-expanded", "false");
            }

            logoSection.addEventListener("click", (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    toggleMenu();
                }
            });

            logoSection.addEventListener("keydown", (e) => {
                if ((e.key === "Enter" || e.key === " ") && window.innerWidth <= 768) {
                    e.preventDefault();
                    toggleMenu();
                }
            });

            document.addEventListener("click", (e) => {
                if (
                    window.innerWidth <= 768 &&
                    navMenu.classList.contains("active") &&
                    !logoSection.contains(e.target) &&
                    !navMenu.contains(e.target)
                ) {
                    closeMenu();
                }
            });

            window.addEventListener("resize", () => {
                if (window.innerWidth > 768) closeMenu();
            });
        }

        // ---------------- Smooth Scrolling for All Internal Links ----------------

        const allInternalLinks = document.querySelectorAll('a[href^="#"]');

        allInternalLinks.forEach(link => {
            // Skip language switcher links (they have their own behaviour)
            if (link.closest('.lang-switcher')) return;

            link.addEventListener("click", (e) => {
                e.preventDefault();

                const targetId = link.getAttribute("href");
                let targetElement = null;

                if (targetId === "#") {
                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                    targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                    }
                }

                // If the link is inside the main navigation, close the mobile menu
                if (navMenu && navMenu.contains(link) && window.innerWidth <= 768) {
                    closeMenu();
                }
            });
        });

        // ---------------- Active Nav Highlight ----------------

        function setActiveLink() {
            let current = "";
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                    current = section.id;
                }
            });

            navLinks.forEach(link => {
                link.removeAttribute("aria-current");
                if (link.getAttribute("href") === "#" + current) {
                    link.setAttribute("aria-current", "page");
                }
            });
        }

        window.addEventListener("scroll", setActiveLink);
        setActiveLink();

        // ---------------- Validation ----------------

        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        // ---------------- Newsletter Form ----------------

        if (newsletterForm) {
            // Create hidden iframe once
            let iframe = document.getElementById('hidden-iframe');
            if (!iframe) {
                iframe = document.createElement('iframe');
                iframe.id = 'hidden-iframe';
                iframe.name = 'hidden-iframe';
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
            }

            let messageReceived = false;
            let timeoutId = null;

            // Listen for messages from the iframe
            window.addEventListener('message', function onMessage(event) {
                const data = event.data;
                if (data && data.result) {
                    messageReceived = true;
                    if (timeoutId) clearTimeout(timeoutId);

                    if (data.result === 'success') {
                        notification.show(data.message || 'Subscription successful.', true);
                        newsletterForm.reset();
                    } else {
                        notification.show('Submission failed: ' + (data.message || 'Please try again.'), false);
                    }
                }
            });

            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const firstname = newsletterForm.querySelector('#firstname').value.trim();
                const email = newsletterForm.querySelector('#email').value.trim();
                const consent = newsletterForm.querySelector('#consent').checked;

                // Validation
                let errors = [];
                if (!firstname) errors.push('First name is required.');
                if (!email) errors.push('Email is required.');
                else if (!validateEmail(email)) errors.push('Invalid email address.');
                if (!consent) errors.push('You must accept the privacy policy.');

                if (errors.length > 0) {
                    notification.show(errors[0], false);
                    return;
                }

                // Show sending message
                notification.show('Sending...', true);

                // Reset messageReceived flag
                messageReceived = false;

                // Set timeout fallback
                timeoutId = setTimeout(() => {
                    if (!messageReceived) {
                        notification.show('Subscription successful.', true);
                    }
                }, 8000);

                // Temporarily set form target to hidden iframe
                newsletterForm.target = 'hidden-iframe';
                newsletterForm.action = GOOGLE_SCRIPT_URL;
                newsletterForm.method = 'POST';
                newsletterForm.enctype = 'application/x-www-form-urlencoded';

                // Submit the form
                newsletterForm.submit();

                // Restore normal behavior
                newsletterForm.target = '';
                newsletterForm.action = '';
            });
        }

        // ---------------- Contact Form ----------------

        if (contactForm) {
            contactForm.addEventListener("submit", (e) => {
                e.preventDefault();
                notification.show("Thank you! Your message has been sent.", true);
                contactForm.reset();
            });
        }

        // ---------------- Donate Button ----------------

        if (donateBtn) {
            donateBtn.addEventListener("click", (e) => {
                e.preventDefault();
                notification.show("Thank you for your interest! This is a demo site.", true);
            });
        }

        // ---------------- Keyboard Detection ----------------

        function handleFirstTab(e) {
            if (e.key === "Tab") {
                body.classList.add("keyboard-user");
                window.removeEventListener("keydown", handleFirstTab);
            }
        }

        window.addEventListener("keydown", handleFirstTab);
    }
})();
