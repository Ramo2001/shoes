/**
 * Home Page Specific Functionality
 */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize contact form submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // In a real application, you would send this data to a server
      // For demo purposes, just clear the form and show an alert
      contactForm.reset();
      
      const lang = document.body.getAttribute('data-lang');
      alert(lang === 'fr' ? 
        'Merci pour votre message ! Nous vous contacterons bientôt.' : 
        'شكرا لرسالتك! سنتواصل معك قريبا.');
    });
  }
});