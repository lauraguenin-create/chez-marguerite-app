// Two small real actions promised by the app: copy the discount code,
// and add the atelier date to the visitor's own calendar (as a downloaded .ics file).
(function () {
  var codeBtn = document.getElementById('code-copy');
  if (codeBtn) {
    codeBtn.addEventListener('click', function () {
      var code = codeBtn.dataset.code;
      var label = codeBtn.querySelector('span');
      var original = label.textContent;
      function reset() {
        setTimeout(function () { label.textContent = original; }, 2000);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(function () {
          label.textContent = 'Copié !';
          reset();
        }, function () {
          label.textContent = 'Copie impossible';
          reset();
        });
      } else {
        label.textContent = 'Copie impossible';
        reset();
      }
    });
  }

  var icsBtn = document.getElementById('atelier-ics');
  if (icsBtn) {
    icsBtn.addEventListener('click', function () {
      // Local times (no Z / TZID): treated as floating time by calendar apps, fine for a single-city shop.
      function toIcsDate(iso) {
        return iso.replace(/[-:]/g, '');
      }
      function toIcsStamp(date) {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      }
      var title = icsBtn.dataset.title;
      var lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Chez Marguerite//FR',
        'BEGIN:VEVENT',
        'UID:' + Date.now() + '@chez-marguerite.example',
        'DTSTAMP:' + toIcsStamp(new Date()),
        'DTSTART:' + toIcsDate(icsBtn.dataset.start),
        'DTEND:' + toIcsDate(icsBtn.dataset.end),
        'SUMMARY:' + title,
        'LOCATION:' + (icsBtn.dataset.location || ''),
        'END:VEVENT',
        'END:VCALENDAR'
      ];
      var blob = new Blob([lines.join('\r\n')], { type: 'text/calendar' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
})();
