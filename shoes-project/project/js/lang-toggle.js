/**
 * Language Toggle Functionality
 * Handles language switching between French and Arabic
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get the current language from localStorage or default to French
  const savedLang = localStorage.getItem('language') || 'fr';
  const body = document.body;
  
  // Set initial language direction and text
  setLanguage(savedLang);
  
  // Add event listeners to language switcher buttons
  const langSwitchers = document.querySelectorAll('[data-switch-lang]');
  langSwitchers.forEach(switcher => {
    switcher.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.getAttribute('data-switch-lang');
      setLanguage(lang);
      localStorage.setItem('language', lang);
    });
  });
  
  // Function to set language throughout the page
  function setLanguage(lang) {
    // Update body attributes
    body.setAttribute('data-lang', lang);
    body.className = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update language dropdown text
    const languageText = document.querySelector('#languageDropdown span');
    if (languageText) {
      languageText.textContent = languageText.getAttribute(`data-${lang}`);
    }
    
    // Update all text elements with data-fr and data-ar attributes
    const langElements = document.querySelectorAll(`[data-${lang}]`);
    langElements.forEach(el => {
      el.textContent = el.getAttribute(`data-${lang}`);
    });
    
    // Update input placeholders
    const placeholderElements = document.querySelectorAll(`[data-${lang}-placeholder]`);
    placeholderElements.forEach(el => {
      el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
    });
    
    // Update document title if needed
    if (document.title) {
      if (document.title.includes('ShoeStyle')) {
        if (lang === 'ar') {
          document.title = document.title.replace('ShoeStyle', 'شوستايل');
        } else {
          document.title = document.title.replace('شوستايل', 'ShoeStyle');
        }
      }
    }
  }
});