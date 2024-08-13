document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = '/public/assets/iconos-rrss/hamburgerIcon.png';
  const closeIcon = '/public/assets/iconos-rrss/closeIcon.png';

  hamburger.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden');
    if (mobileMenu.classList.contains('hidden')) {
      hamburger.src = hamburgerIcon;
    } else {
      hamburger.src = closeIcon;
    }
  });
});
