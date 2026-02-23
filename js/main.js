// js/main.js
function sfcApp() {
  return {
    lang: 'de',
    menuOpen: false,
    scrolled: false,
    formSuccess: false,

    init() {
      window.addEventListener('scroll', () => {
        this.scrolled = window.scrollY > 50;
      });
    },

    t(key) {
      return t(key, this.lang);
    },

    toggleLang() {
      this.lang = this.lang === 'de' ? 'it' : 'de';
      document.documentElement.lang = this.lang;
    },

    scrollTo(id) {
      this.menuOpen = false;
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    },

    handleSubmit(event) {
      const form = event.target;
      const data = new FormData(form);
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      })
      .then(() => {
        this.formSuccess = true;
        form.reset();
        setTimeout(() => { this.formSuccess = false; }, 5000);
      })
      .catch(() => alert('Error sending form. Please call us directly.'));
    }
  };
}
