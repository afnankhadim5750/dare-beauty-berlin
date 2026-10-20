/* Dare Beauty — DE/EN language toggle */
(function(){
  const STORAGE_KEY = 'darebeauty-lang';

  function currentLang(){
    return document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'de';
  }

  function applyLang(lang){
    document.documentElement.setAttribute('lang', lang);

    // text nodes
    document.querySelectorAll('[data-de]').forEach(function(el){
      var v = (lang === 'de') ? el.getAttribute('data-de') : el.getAttribute('data-en');
      if (v !== null) el.innerHTML = v;
    });

    // placeholders
    document.querySelectorAll('[data-de-ph]').forEach(function(el){
      var v = (lang === 'de') ? el.getAttribute('data-de-ph') : el.getAttribute('data-en-ph');
      if (v !== null) el.setAttribute('placeholder', v);
    });

    // document title
    var t = (lang === 'de') ? document.documentElement.getAttribute('data-title-de')
                            : document.documentElement.getAttribute('data-title-en');
    if (t) document.title = t;

    // toggle buttons
    document.querySelectorAll('.lang-btn').forEach(function(b){
      b.classList.toggle('active', b.getAttribute('data-set-lang') === lang);
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch(e){}
  }

  function init(){
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch(e){}
    applyLang(saved === 'en' || saved === 'de' ? saved : 'de');

    document.querySelectorAll('[data-set-lang]').forEach(function(b){
      b.addEventListener('click', function(){ applyLang(b.getAttribute('data-set-lang')); });
    });

    // mobile menu toggle
    var toggle = document.getElementById('navToggle');
    var links  = document.getElementById('navLinks');
    if (toggle && links){
      toggle.addEventListener('click', function(){
        var open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.innerHTML = open ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
      });
      links.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click', function(){
          links.classList.remove('open');
          toggle.setAttribute('aria-expanded','false');
          toggle.innerHTML = '<i class="bi bi-list"></i>';
        });
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
