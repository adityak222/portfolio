$(document).ready(function () {

    /* --- Hamburger Menu & Navbar --- */
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // Scroll Spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    /* --- Smooth Scrolling --- */
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear');
    });

    /* --- Typed.js Effect --- */
    var typed = new Typed(".typing-text", {
        strings: ["Android Developer", "Web Developer", "AI & ML Enthusiast", "Kotlin Expert"],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
    });

    /* --- Scroll Reveal Animation --- */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* Scroll Home */
    srtop.reveal('.home .content h3', { delay: 200 });
    srtop.reveal('.home .content p', { delay: 200 });
    srtop.reveal('.home .content .btn', { delay: 200 });
    srtop.reveal('.home .image', { delay: 400 });
    srtop.reveal('.home .socials', { interval: 600 });

    /* Scroll About */
    srtop.reveal('.about .content h3', { delay: 200 });
    srtop.reveal('.about .content .tag', { delay: 200 });
    srtop.reveal('.about .content p', { delay: 200 });
    srtop.reveal('.about .content .box-container', { delay: 200 });
    srtop.reveal('.about .content .resumebtn', { delay: 200 });

    /* Scroll Skills */
    srtop.reveal('.skills .container', { interval: 200 });
    srtop.reveal('.skills .container .bar', { delay: 400 });

    /* Scroll Education */
    srtop.reveal('.education .box', { interval: 200 });

    /* Scroll Projects */
    srtop.reveal('.work .box', { interval: 200 });

    /* Scroll Experience */
    srtop.reveal('.experience .timeline', { delay: 400 });
    srtop.reveal('.experience .timeline .container', { interval: 400 });

    /* Scroll Contact */
    srtop.reveal('.contact .container', { delay: 400 });
    srtop.reveal('.contact .container .form-group', { delay: 400 });


    /* --- Fetch Skills & Projects Data --- */
    async function fetchData(type = "skills") {
        let response, data;
        try {
            response = await fetch(`${type}.json`);
            data = await response.json();
        } catch (error) {
            console.error(`Error fetching ${type}:`, error);
            return;
        }

        const container = document.getElementById(type === "skills" ? "skillsContainer" : "workContainer");
        let htmlContent = "";

        if (type === "skills") {
            // Render Skills
            data.forEach(skill => {
                htmlContent += `
                    <div class="bar">
                        <div class="info">
                            <img src="${skill.icon}" alt="${skill.name}" style="width:50px; height:50px; margin-bottom:10px;"/>
                            <span style="display:block; font-weight:600; font-size:1.4rem; color:#0e2431;">${skill.name}</span>
                        </div>
                    </div>`;
            });
        } else {
            // Render Projects
            data.forEach(project => {
                htmlContent += `
                <div class="box tilt" style="background:#fff; padding:2rem; border-radius:1rem; box-shadow:0 10px 10px rgba(0,0,0,0.1); margin:1.5rem; width:30rem;">
                    <img src="${project.image}" alt="${project.name}" style="width:100%; height:15rem; object-fit:cover; border-radius:.5rem;" />
                    <div class="content" style="padding-top:1rem;">
                        <div class="tag">
                            <h3 style="font-size:2rem; padding:1rem 0;">${project.name}</h3>
                        </div>
                        <div class="desc">
                            <p style="font-size:1.4rem; color:#666; line-height:1.5;">${project.desc}</p>
                            <div class="btns" style="margin-top:1.5rem; display:flex; justify-content:space-between;">
                                <a href="${project.links.view}" class="btn" style="background:#2b3dda; color:#fff; padding:0.8rem 2rem; border-radius:5rem; font-size:1.2rem;">View</a>
                                <a href="${project.links.code}" class="btn" style="background:#000; color:#fff; padding:0.8rem 2rem; border-radius:5rem; font-size:1.2rem;">Code <i class="fas fa-code"></i></a>
                            </div>
                        </div>
                    </div>
                </div>`;
            });
        }
        container.innerHTML = htmlContent;

        // Re-init vanilla tilt for new elements
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
        }
    }

    // Initialize Data
    fetchData("skills");
    fetchData("projects");


    /* --- EmailJS Contact Form Logic --- */
    emailjs.init("guxyXHv6kcU21I4zh"); // Your Public Key

    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent page reload

        const serviceID = 'service_vr5sveg';
        const templateID = 'template_mccoujn';

        // Change button text to show loading
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Sending...';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.innerHTML = 'Sent Successfully! <i class="fas fa-check"></i>';
                btn.style.background = '#28a745'; // Green color

                // Clear the form
                document.getElementById('contact-form').reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 3000);
            }, (err) => {
                btn.innerHTML = 'Failed to Send <i class="fas fa-times"></i>';
                btn.style.background = '#dc3545'; // Red color
                console.error('EmailJS Error:', JSON.stringify(err));
                alert("Failed to send message. Please check console for details.");

                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 3000);
            });
    });

});

/* --- Tab Title Change on Visibility --- */
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | Aditya Kasoudhan";
        $("#favicon").attr("href", "assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "assets/images/favhand.png");
    }
});

/* --- Disable Developer Tools (Optional) --- */
document.onkeydown = function (e) {
    if (e.keyCode == 123) { return false; }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) { return false; }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) { return false; }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) { return false; }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) { return false; }
}