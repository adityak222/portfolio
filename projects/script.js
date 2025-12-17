$(document).ready(function(){

    /* --- Hamburger Menu Toggle --- */
    $('#menu').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    /* --- Scroll Spy & Sticky Navbar Logic --- */
    $(window).on('scroll load',function(){
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if(window.scrollY > 60){
            document.querySelector('#scroll-top').classList.add('active');
        }else{
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });

    /* --- Initialize Vanilla Tilt for 3D Cards --- */
    // Checks if the library is loaded before running
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 15,            // Max tilt rotation (degrees)
            speed: 400,         // Speed of the enter/exit transition
            glare: true,        // Turn on glare effect
            "max-glare": 0.3,   // Max opacity of glare
        });
    }

});

/* --- Disable Developer Mode Keys (Optional protection) --- */
document.onkeydown = function(e) {
  if(e.keyCode == 123) { return false; }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) { return false; }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) { return false; }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) { return false; }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) { return false; }
}

/* --- Tab Title Change on Visibility --- */
document.addEventListener('visibilitychange', function(){
    if(document.visibilityState === "visible"){
        document.title = "Projects | Aditya Kasoudhan";
        $("#favicon").attr("href","../assets/images/favicon.png");
    }
    else {
        document.title = "Check Out My Projects!";
        $("#favicon").attr("href","../assets/images/favhand.png");
    }
});