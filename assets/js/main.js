if (!localStorage.getItem("cookiesAccepted")) { 
  var cookieMessage = document.getElementById('cookie-notification');  
  var closeCookie = document.getElementById('cookie-notification-close');
  
  cookieMessage.style.display = 'block';  
  closeCookie.addEventListener("click", function(e) {  
    e.preventDefault();
    localStorage.setItem("cookiesAccepted", true);
    
    cookieMessage.style.display = 'none';
  });
}

var infoDosIcones = {
  'iconSupport': {
    'title': 'Suporte Técnico',
    'content': 'Nossa abordagem inovadora de suporte técnico visa proporcionar a empresas emergentes a assistência ágil e especializada que necessitam. Com uma equipe experiente, garantimos soluções rápidas para manter suas operações funcionando sem contratempos, oferecendo a tranquilidade que sua empresa merece no mundo da tecnologia.'
  },
  'iconNetwork': {
    'title': 'Redes de Computadores',
    'content': 'Para empresas que estão começando a explorar o universo da conectividade, oferecemos soluções especializadas em gerenciamento de redes. Com nossa vasta experiência, implementamos e monitoramos redes estáveis e seguras, proporcionando uma base sólida para o crescimento e desenvolvimento contínuo do seu negócio.'
  },
  'iconDevelop': {
    'title': 'Desenvolvimento de Software',
    'content': 'Como uma empresa recém-chegada, mas com experiência sólida, focamos em desenvolver softwares personalizados para atender às necessidades específicas do seu negócio. Nossa equipe dedicada oferece soluções inovadoras, garantindo que sua empresa esteja equipada com as ferramentas certas para prosperar no mercado digital em constante evolução.'
  },
  'iconTraining': {
    'title': 'Treinamento em TI',
    'content': 'Acreditamos no poder da capacitação para impulsionar o sucesso de novas empresas. Oferecemos treinamentos em TI, proporcionando conhecimento atualizado e habilidades essenciais para sua equipe. Com uma abordagem prática, preparamos sua empresa para enfrentar os desafios tecnológicos com confiança e eficácia.'
  },
  'iconDataAnal': {
    'title': 'Análise de Dados',
    'content': 'Em nossos primeiros passos no mercado, trazemos a experiência necessária para extrair insights valiosos de seus dados. A análise de dados é uma ferramenta poderosa para empresas emergentes, e nossa equipe está pronta para orientá-lo na interpretação dessas informações, fornecendo uma base sólida para decisões estratégicas.'
  },
  'iconConsulting': {
    'title': 'Consultoria em TI',
    'content': 'Como uma empresa que já trilhou um caminho sólido, oferecemos consultoria estratégica em tecnologia para guiar sua empresa nas decisões cruciais. Compreendemos os desafios enfrentados por empresas iniciantes e estamos aqui para fornecer insights valiosos, ajudando você a navegar no cenário tecnológico com confiança e eficácia.'
  },
  'iPrivacy': {
    'title': 'Política de Privacidade',
    'content': 'Como uma empresa que já trilhou um caminho sólido, oferecemos consultoria estratégica em tecnologia para guiar sua empresa nas decisões cruciais. Compreendemos os desafios enfrentados por empresas iniciantes e estamos aqui para fornecer insights valiosos, ajudando você a navegar no cenário tecnológico com confiança e eficácia.'
  }
};
function openModal(icon) {
  document.getElementById('fade').classList.remove('hide');
  document.getElementById('modal').classList.remove('hide');

  // Atualiza o título e o conteúdo do modal com os parâmetros fornecidos
  var iconInfo = infoDosIcones[icon];
  document.getElementById('modal-title').innerText = iconInfo.title;
  document.getElementById('modal-content').innerHTML = iconInfo.content;
}

function closeModal() {
  document.getElementById('fade').classList.add('hide');
  document.getElementById('modal').classList.add('hide');
}

function emailSend() {
  event.preventDefault();

  var userName = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  console.log("Email:", email);
  var subject = document.getElementById('subject').value;
  var messageBody = document.getElementById('message').value;

  Email.send({
    SecureToken: "e71cc01e-4ed7-4b0a-9844-6e1436399e20",
    To: 'thenobrega@thenobrega.tech',
    From: 'thenobrega@thenobrega.tech',
    Subject: 'De:' + userName + ' E-mail: ' + email + ' Assunto: ' + subject,
    Body: messageBody
  }).then(function (message) {
    console.log("Email.send response:", message);
    if (message === 'OK') {
      swal("Mensagem enviada com sucesso", "THE Nóbrega Tech agradece.", "success");
    } else {
      swal("Erro no envio, revise os dados", "THE Nóbrega Tech agradece.", "error");
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var enviarButton = document.querySelector('.text-center button');
  enviarButton.addEventListener('click', emailSend);
});

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();



})()