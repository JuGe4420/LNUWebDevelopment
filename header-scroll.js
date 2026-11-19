(() => {
    const header = document.querySelector(".site-header");
    if (!header) {
        return;
    }

    const revealSection = document.querySelector(
        ".intro.page-shell, .about-intro.page-shell, .work-filter.page-shell, .contact-hub.page-shell"
    );
    const hero = document.querySelector(
        ".hero, .work-page__hero, .about-hero, .contact-hero"
    );

    const getRevealPoint = () => {
        const trigger = revealSection || hero;
        if (!trigger) {
            return header.offsetHeight;
        }

        return trigger.getBoundingClientRect().top + window.scrollY;
    };

    let previousScrollY = window.scrollY;
    let updateScheduled = false;

    const updateHeader = () => {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - previousScrollY;
        const isFloating = header.classList.contains("site-header--floating");
        const navigation = header.querySelector(".nav");
        const menuIsOpen = navigation && navigation.matches(":target");

        header.classList.toggle("site-header--menu-open", Boolean(menuIsOpen));

        if (currentScrollY <= 0) {
            header.classList.remove("site-header--floating", "site-header--hidden");
        } else if (currentScrollY > getRevealPoint() || isFloating) {
            header.classList.add("site-header--floating");
            if (Math.abs(scrollDelta) >= 4) {
                header.classList.toggle("site-header--hidden", scrollDelta > 0 && !menuIsOpen);
            }
        }

        if (Math.abs(scrollDelta) >= 4 || currentScrollY <= 0) {
            previousScrollY = currentScrollY;
        }
        updateScheduled = false;
    };

    window.addEventListener(
        "scroll",
        () => {
            if (!updateScheduled) {
                window.requestAnimationFrame(updateHeader);
                updateScheduled = true;
            }
        },
        { passive: true }
    );

    window.addEventListener("hashchange", updateHeader);
    updateHeader();
})();
