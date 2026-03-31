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

      const name    = data.get('name')    || '';
      const email   = data.get('email')   || '';
      const phone   = data.get('phone')   || '';
      const message = data.get('message') || '';

      const text = `📩 Nuovo contatto SFC Maler\nNome: ${name}\nEmail: ${email}\nTel: ${phone}\nMessaggio: ${message}`;
      const url  = `https://api.callmebot.com/whatsapp.php?phone=41794508927&text=${encodeURIComponent(text)}&apikey=8878308`;

      fetch(url, { mode: 'no-cors' })
        .finally(() => {
          this.formSuccess = true;
          form.reset();
          setTimeout(() => { this.formSuccess = false; }, 5000);
        });
    }
  };
}
