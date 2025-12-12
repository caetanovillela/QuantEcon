document.addEventListener("DOMContentLoaded", () => {
  // --- CANVAS ANIMATION LOGIC ---
  const canvas = document.getElementById("hero-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 80;
    const connectionDistance = 150;
    const moveSpeed = 0.8;

    function resize() {
      const parent = canvas.parentElement;
      if (parent) {
        width = canvas.width = parent.offsetWidth;
        height = canvas.height = parent.offsetHeight;
      }
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * moveSpeed;
        this.vy = (Math.random() - 0.5) * moveSpeed;
        this.size = Math.random() * 2 + 1.5;
        this.alpha = Math.random() * 0.5 + 0.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(173, 216, 230, ${this.alpha})`;
        ctx.fill();
      }
    }

    function init() {
      resize();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, index) => {
        p.update();
        p.draw();

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(173, 216, 230, ${opacity * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    }

    window.addEventListener("resize", () => {
      resize();
      init();
    });

    init();
    animate();
  }

  // --- THEME TOGGLE LOGIC ---
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  // Check for saved user preference, if any, on load of the website
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme) {
    htmlElement.setAttribute("data-theme", savedTheme);
    updateIcon(savedTheme);
  } else if (systemPrefersDark) {
    htmlElement.setAttribute("data-theme", "dark");
    updateIcon("dark");
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      htmlElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      updateIcon(newTheme);
    });
  }

  function updateIcon(theme) {
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === "dark" ? "🌙" : "☀️";
    }
  }

  // --- LANGUAGE TOGGLE LOGIC ---
  const langToggleBtn = document.getElementById("lang-toggle");

  const translations = {
    pt: {
      "nav.home": "Início",
      "nav.about": "Sobre",
      "nav.courses": "Minicursos",
      "nav.team": "Equipe",
      "hero.title": "Ciência de Dados aplicada à<br>Economia e Finanças",
      "hero.subtitle":
        "Projeto de extensão da UFJF. Tornamos a programação e IA acessíveis para todos.",
      "hero.cta": "Inscrever-se Agora",
      "about.title": "Sobre o Projeto",
      "about.p1":
        "O QuantEcon UFJF estabelece-se como um projeto de extensão universitária de excelência, dedicado a redefinir e modernizar o ensino e a pesquisa em Economia e Finanças. Parte-se da premissa de que o domínio de linguagens de programação e de metodologias computacionais constitui um novo pilar da análise econômica quantitativa — um requisito essencial para o profissional e o pesquisador contemporâneos.",
      "about.p2":
        "Diante de um cenário global cada vez mais orientado por Big Data, algoritmos avançados e processos de decisão automatizados, o projeto busca fortalecer a capacidade analítica da comunidade acadêmica. Para isso, promove o uso de ferramentas open-source de alto desempenho, aplicáveis a desafios que vão desde a modelagem macroeconômica estocástica e a análise financeira de alta frequência até o desenvolvimento e uso de sistemas de Inteligência Artificial voltados para fenômenos econômicos.",
      "about.p3":
        "A atuação do QuantEcon UFJF preenche uma lacuna crucial ao integrar a fronteira da tecnologia computacional diretamente ao ambiente de sala de aula e aos centros de pesquisa da Universidade Federal de Juiz de Fora. O projeto não apenas apresenta a teoria: ele capacita seus participantes a transformar conceitos abstratos em soluções computacionais robustas, reproduzíveis e orientadas para resultados. Dessa forma, prepara estudantes e pesquisadores para atender às demandas mais sofisticadas do mercado de trabalho e da produção científica internacional.",
      "courses.title": "Minicursos Oferecidos",
      "courses.subtitle":
        "Clique nos cards abaixo para acessar o formulário de inscrição.",
      "course.python.title": "Introdução ao Python",
      "course.python.desc":
        "Do zero ao Data Science. Aprenda Pandas, NumPy e Matplotlib aplicados à realidade económica e financeira. Domine a manipulação de dados.",
      "course.r.title": "Introdução ao R",
      "course.r.desc":
        "A ferramenta favorita dos estatísticos. Ideal para econometria, modelagem e visualização de dados complexos para pesquisa académica.",
      "course.ai.title": "IA Generativa",
      "course.ai.desc":
        "Como usar LLMs (ChatGPT, Claude) para acelerar a sua pesquisa, escrita e produtividade académica com engenharia de prompts.",
      "course.cta": "Inscrever-se →",
      "course.soon": "Em breve",
      "footer.text":
        "© 2025 Projeto QuantEcon | Universidade Federal de Juiz de Fora",
      "team.title": "Nossa Equipe",
      "team.subtitle":
        "Conheça os profissionais e voluntários que fazem o QuantEcon acontecer.",
      "team.role.advisor": "Orientador",
      "team.bio.paulo":
        "Doutor e mestre em economia pela Escola Brasileira de Economia e Finanças da Fundação Getulio Vargas (EPGE/FGV-RJ), Paulo C. Coimbra é professor adjunto na Faculdade de Economia da Universidade Federal de Juiz de Fora (FE/UFJF). Coimbra também possui especializações em métodos estatísticos computacionais e em desenvolvimento de sistemas com tecnologia Java (ambas pelo Instituto de Ciências Exatas da Universidade Federal de Juiz de Fora - ICE/UFJF). O economista é formado pela Universidade Santa Úrsula (USU-RJ) e já lecionou em cursos de economia e finanças na Fundação Getulio Vargas (FGV-RJ), Pontifícia Universidade Católica (PUC-RJ) e Ibmec Business School (Ibmec-RJ). Escreveu sobre derivativos no portal de notícias InfoMoney.",
      "team.volunteers": "Voluntários",
      // Form Translations
      "form.python.title": "Inscrição Python",
      "form.r.title": "Inscrição em R",
      "form.subtitle": "Preencha os dados abaixo para garantir sua vaga.",
      "form.name.label": "Nome Completo",
      "form.name.placeholder": "Digite seu nome completo",
      "form.email.label": "E-mail",
      "form.email.placeholder": "seu@email.com",
      "form.phone.label": "Telefone",
      "form.phone.placeholder": "(99) 99999-9999",
      "form.level.python.label": "Nível de Conhecimento em Python",
      "form.level.r.label": "Nível de Conhecimento em R",
      "form.select.default": "Selecione uma opção",
      "form.level.beginner": "Iniciante",
      "form.level.intermediate": "Intermediário",
      "form.level.advanced": "Avançado",
      "form.submit": "Confirmar Inscrição",
      "form.back": "← Voltar para a página inicial",
    },
    en: {
      "nav.home": "Home",
      "nav.about": "About",
      "nav.courses": "Crash Courses",
      "nav.team": "Team",
      "hero.title": "Data Science applied to<br>Economics and Finance",
      "hero.subtitle":
        "UFJF extension project. We make programming and AI accessible to everyone.",
      "hero.cta": "Register Now",
      "about.title": "About the Project",
      "about.p1":
        "QuantEcon UFJF establishes itself as an extension project of excellence, dedicated to redefining and modernizing teaching and research in Economics and Finance. It starts from the premise that the mastery of programming languages and computational methodologies constitutes a new pillar of quantitative economic analysis — an essential requirement for contemporary professionals and researchers.",
      "about.p2":
        "In a global scenario increasingly driven by Big Data, advanced algorithms, and automated decision processes, the project seeks to strengthen the analytical capacity of the academic community. To this end, it promotes the use of high-performance open-source tools, applicable to challenges ranging from stochastic macroeconomic modeling and high-frequency financial analysis to the development and use of Artificial Intelligence systems for economic phenomena.",
      "about.p3":
        "The work of QuantEcon UFJF fills a crucial gap by integrating the frontier of computational technology directly into the classroom and research centers of the Federal University of Juiz de Fora. The project does not just present theory: it empowers its participants to transform abstract concepts into robust, reproducible, and result-oriented computational solutions. Thus, it prepares students and researchers to meet the most sophisticated demands of the job market and international scientific production.",
      "courses.title": "Crash Courses Offered",
      "courses.subtitle":
        "Click on the cards below to access the registration form.",
      "course.python.title": "Introduction to Python",
      "course.python.desc":
        "From zero to Data Science. Learn Pandas, NumPy, and Matplotlib applied to economic and financial reality. Master data manipulation.",
      "course.r.title": "Introduction to R",
      "course.r.desc":
        "The favorite tool of statisticians. Ideal for econometrics, modeling, and visualization of complex data for academic research.",
      "course.ai.title": "Generative AI",
      "course.ai.desc":
        "How to use LLMs (ChatGPT, Claude) to accelerate your research, writing, and academic productivity with prompt engineering.",
      "course.cta": "Register →",
      "course.soon": "Coming Soon",
      "footer.text":
        "© 2025 QuantEcon Project | Federal University of Juiz de Fora",
      "team.title": "Our Team",
      "team.subtitle":
        "Meet the professionals and volunteers who make QuantEcon happen.",
      "team.role.advisor": "Supervisor",
      "team.bio.paulo":
        "PhD and Master in Economics from the Brazilian School of Economics and Finance at Getulio Vargas Foundation (EPGE/FGV-RJ), Paulo C. Coimbra is an adjunct professor at the Faculty of Economics of the Federal University of Juiz de Fora (FE/UFJF). Coimbra also holds specializations in computational statistical methods and system development with Java technology (both from the Institute of Exact Sciences at the Federal University of Juiz de Fora - ICE/UFJF). The economist graduated from Santa Úrsula University (USU-RJ) and has taught economics and finance courses at Getulio Vargas Foundation (FGV-RJ), Pontifical Catholic University (PUC-RJ), and Ibmec Business School (Ibmec-RJ). He wrote about derivatives on the InfoMoney news portal.",
      "team.volunteers": "Volunteers",
      // Form Translations
      "form.python.title": "Python Registration",
      "form.r.title": "R Registration",
      "form.subtitle": "Fill out the details below to secure your spot.",
      "form.name.label": "Full Name",
      "form.name.placeholder": "Enter your full name",
      "form.email.label": "E-mail",
      "form.email.placeholder": "your@email.com",
      "form.phone.label": "Phone",
      "form.phone.placeholder": "(99) 99999-9999",
      "form.level.python.label": "Python Knowledge Level",
      "form.level.r.label": "R Knowledge Level",
      "form.select.default": "Select an option",
      "form.level.beginner": "Beginner",
      "form.level.intermediate": "Intermediate",
      "form.level.advanced": "Advanced",
      "form.submit": "Confirm Registration",
      "form.back": "← Back to Home",
    },
  };

  function setLanguage(lang) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    if (langToggleBtn) {
      langToggleBtn.textContent = lang === "pt" ? "PT" : "EN";
    }

    localStorage.setItem("language", lang);
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }

  // Initialize language
  const savedLang = localStorage.getItem("language") || "pt";
  setLanguage(savedLang);

  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      const currentLang = localStorage.getItem("language") || "pt";
      const newLang = currentLang === "pt" ? "en" : "pt";
      setLanguage(newLang);
    });
  }
  // --- FORM SUBMISSION LOGIC (EmailJS) ---
  const formPython = document.getElementById('form-python');
  const formR = document.getElementById('form-r');

  const SERVICE_ID = 'service_978q2hk';
  const TEMPLATE_ID = 'template_y9ml7cp';

  function handleEmailSubmission(event) {
    event.preventDefault();
    const form = event.target;
    const btn = form.querySelector('.submit-btn');
    const originalText = btn.innerText;

    btn.innerText = 'Enviando...';
    btn.disabled = true;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
      .then(() => {
        alert('Inscrição realizada com sucesso! 🎉\nO e-mail de confirmação foi enviado para você.');
        form.reset();
      }, (err) => {
        alert('Ocorreu um erro ao enviar a inscrição: ' + JSON.stringify(err));
      })
      .finally(() => {
        btn.innerText = originalText;
        btn.disabled = false;
      });
  }

  if (formPython) {
    formPython.addEventListener('submit', handleEmailSubmission);
  }

  if (formR) {
    formR.addEventListener('submit', handleEmailSubmission);
  }
});
