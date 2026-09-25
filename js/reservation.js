// Bouquet reservation form: sends the reservation to Supabase (table "reservations").
// The publishable key is meant to be public; the database only allows visitors to insert.
(function () {
  var SUPABASE_URL = 'https://pqunesojvlamgyhgwhqc.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_hl62klZ4wt0qaQ_lX9bDGQ_HmaM2TNa';

  var form = document.getElementById('resa-form');
  var toggle = document.getElementById('resa-toggle');
  if (!form || !toggle) return;

  var status = document.getElementById('resa-status');
  var submit = form.querySelector('button[type="submit"]');
  var jour = form.elements.jour_retrait;
  // The bouquet name is taken from the card title, so it follows content changes.
  var titre = form.closest('section').querySelector('h2');
  var bouquet = titre ? titre.textContent.trim() : 'Bouquet de la semaine';

  // Local date as YYYY-MM-DD (toISOString would use UTC and can be off by one day).
  function isoLocal(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  var today = new Date();
  jour.min = isoLocal(today);
  jour.max = isoLocal(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 60));

  toggle.addEventListener('click', function () {
    var open = form.hidden;
    form.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    if (open) form.elements.nom.focus();
  });

  function show(text, ok) {
    status.textContent = text;
    status.className = 'resa-status ' + (ok ? 'ok' : 'erreur');
    status.hidden = false;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;

    var message = form.elements.message.value.trim();
    var data = {
      bouquet: bouquet,
      nom: form.elements.nom.value.trim(),
      contact: form.elements.contact.value.trim(),
      jour_retrait: jour.value,
      message: message || null
    };

    submit.disabled = true;
    status.hidden = true;

    fetch(SUPABASE_URL + '/rest/v1/reservations', {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      form.reset();
      form.hidden = true;
      toggle.hidden = true;
      show('Merci ! Votre bouquet vous attend.', true);
    }).catch(function () {
      show("Oups, la réservation n'a pas pu être envoyée. Réessayez ou écrivez-nous à bonjour@chez-marguerite.example.", false);
    }).then(function () {
      submit.disabled = false;
    });
  });
})();
