# Chez Marguerite: Handy-App (PWA), Design

Stand: 24.09.2026 · Freigegeben im Gespräch mit Laura, Teil 1 und Teil 2 · Design „für heute ok, wird später verbessert“

## 1. Ziel

Eine kleine App fürs Handy für die Kundschaft von **Chez Marguerite**, einem (fiktiven) Blumenladen in Paris 11e. Die App zeigt das feste Angebot und die Inhalte, die sich jede Woche ändern, und bietet drei Dinge zum Antippen. Laura pflegt die Inhalte selbst in zwei Textdateien, ohne Code. Nach jedem Push auf GitHub geht die neue Version über Netlify live, und alle, die die App installiert haben, sehen beim nächsten Öffnen die neuen Inhalte.

**Fertig, wenn:**
- die App im Browser auf dem Mac läuft, mit Strauß der Woche, Offres, Ateliers, Abonnement und Infos zum Laden
- alle Inhalte aus `contenu.md` und `boutique.md` kommen und nichts davon fest im Code steht
- Code kopieren, Termin in den Kalender und Strauß reservieren funktionieren
- die App auf iPhone und Android installierbar ist und ohne Browserleiste startet
- eine Änderung in `contenu.md` nach dem Push auf dem Handy ankommt, auch bei bereits installierter App

## 2. Rahmen

- **Sprache:** alle Texte in der App auf Französisch, Gespräch mit Laura auf Deutsch
- **Keine Logins, kein Bau-Schritt.** Statische Dateien, Netlify liefert den Projektordner direkt aus (Publish directory = Projektwurzel).
- **Datenbank nur für Reservierungen (Änderung vom 25.09.2026, auf Lauras Wunsch):** Supabase-Projekt `pqunesojvlamgyhgwhqc`, Tabelle `reservations`. Besucher dürfen dort nur neue Reservierungen eintragen, nicht lesen, ändern oder löschen. Laura liest die Reservierungen im Supabase-Dashboard (Table Editor), nicht in der App. Aufbau und Rechte: `supabase/reservations.sql`. Kein Supabase-Paket, nur `fetch`.
- **Keine neuen Programme auf dem Mac.** Node.js ist nicht installiert und wird nicht installiert. Deshalb wird alles in reinem HTML, CSS und JavaScript ohne Bibliotheken gebaut. Die Tests laufen im Browser.
- **Fiktive Daten:** Adresse, Öffnungszeiten, Preise und E-Mail (`bonjour@chez-marguerite.example`) sind ausgedacht.
- **Hosting:** GitHub `lauraguenin-create/chez-marguerite-app` (öffentlich) → Netlify `https://chez-marguerite.netlify.app` (öffentlich, Branch `main`)

## 3. Design

Richtung **C „Jardin“** mit abgerundeten Kästen, angelehnt an die Stimmung von desireefleurs.fr (viel Weiß, ruhige Flächen, ein Akzent), ohne etwas zu kopieren. Vorlage ist der Entwurf `entwurf-jardin-v1.html` im selben Ordner wie dieses Dokument.

| Rolle | Farbe |
|---|---|
| Hintergrund (papier) | `#FAFAF6` |
| Kästen hell (sauge) | `#E7EDE3` |
| Text, Knöpfe (sapin) | `#26332B` |
| Nebentext (gris) | `#5E6B62` |
| Akzent Margeritengelb (souci) | `#E8A93A`, nur für Flächen und Linien |
| Akzent als Text (souci-texte) | `#8A5E0E` |
| Linien | `#DCE3D8` |

- **Schriften:** Überschriften in *Cormorant Garamond* (400/500), Text in *Jost* (300/400/500), beide von Google Fonts. Kleine Rubrik-Labels in Großbuchstaben mit Sperrung (z. B. „BOUQUET DE LA SEMAINE“), Überschriften in normaler Schreibung.
- **Formen:** Kästen mit 20 px Radius, Knöpfe als Pillen, Rabattcode in gestricheltem gelbem Rahmen, Datum der Ateliers als gelbes Kästchen.
- **Logo:** Margerite als feine Linie (12 Blütenblätter, gelbe Mitte), als SVG-Datei `logo.svg`.
- **App-Icon:** Variante 1, eine weiße Margerite auf Tannengrün `#26332B` mit gelber Mitte, die Linien kräftiger als im Logo. Dateien `icon-192.png`, `icon-512.png`, dazu `apple-touch-icon.png` (180 px) fürs iPhone. Das Motiv hat genug Rand, damit Android es rund zuschneiden kann (maskable).

**Aufbau der Seite (von oben nach unten):**
1. Kopf: Logo, „Chez Marguerite“, „FLEURISTE · PARIS 11E“
2. Bouquet de la semaine (salbeigrüner Kasten) mit Knopf „Réserver ce bouquet“
3. Offres: je Aktion ein weißer Kasten mit Text, Gültigkeit und Code zum Kopieren
4. Ateliers: je Termin ein weißer Kasten mit Datumskästchen, Uhrzeit, Preis, Plätzen und Knopf „Ajouter au calendrier“
5. Abonnement: Text, drei Größen mit Preis, Knopf „S'abonner“ (Mail)
6. Fuß: Adresse (antippbar, öffnet Karten), Öffnungszeiten, E-Mail

## 4. Aufbau der App

| Datei | Zweck | Wer ändert sie |
|---|---|---|
| `contenu.md` | Strauß der Woche, Offres, Ateliers | **Laura, oft** |
| `boutique.md` | Abonnement, Adresse, Öffnungszeiten, E-Mail | **Laura, selten** |
| `index.html` | Grundgerüst der Seite | Claude |
| `styles.css` | Aussehen | Claude |
| `js/parse.js` | liest die Markdown-Dateien und macht daraus Einträge; blendet Abgelaufenes aus | Claude |
| `js/actions.js` | Code kopieren, Kalenderdatei, Mail-Links | Claude |
| `js/reservation.js` | Formular „Réserver ce bouquet“, schickt an Supabase | Claude |
| `supabase/reservations.sql` | Aufbau und Rechte der Tabelle `reservations` (schon angewendet) | Claude |
| `js/app.js` | lädt die Dateien, baut die Kästen, Hinweis bei Offline | Claude |
| `sw.js` | Service Worker: frische Inhalte, Offline-Kopie | Claude |
| `manifest.webmanifest` | macht die App installierbar | Claude |
| `netlify.toml` | Cache-Anweisungen für Netlify | Claude |
| `logo.svg`, `icon-*.png`, `apple-touch-icon.png` | Logo und Icons | Claude |
| `tests/index.html` | automatische Prüfungen, laufen im Browser | Claude |

Jede JavaScript-Datei hat eine Aufgabe. `parse.js` und `actions.js` enthalten reine Funktionen ohne Zugriff auf die Seite, damit sie sich einzeln testen lassen.

## 5. Format der Inhaltsdateien

Grundregel: Jeder Eintrag beginnt mit `## Titel`. Darunter stehen Zeilen der Form `- Clé: valeur`. Groß- und Kleinschreibung der Schlüssel ist egal, Akzente auch (`Prix` = `prix`, `Jusqu'au` = `Jusquau`). Daten schreibt man `TT.MM.JJJJ`, Uhrzeiten `HH:MM`. Oben in jeder Datei steht auf Französisch eine kurze Anleitung mit Beispiel, die die App nicht anzeigt (alles vor dem ersten `##`).

### `contenu.md`

Jeder Eintrag hat eine `Type`-Zeile: `bouquet`, `offre` oder `atelier`.

```markdown
## Le Jardin d'automne
- Type: bouquet
- Fleurs: Dahlias, cosmos et graminées
- Prix: 38 €
- Jusqu'au: 27.09.2026
- Texte: Noué à la main, à réserver jusqu'à dimanche.

## −15 % sur les dahlias
- Type: offre
- Code: DAHLIA15
- Jusqu'au: 04.10.2026
- Texte: En boutique et à la réservation.

## Couronne d'automne
- Type: atelier
- Date: 17.10.2026
- Heure: 10:00 – 12:00
- Prix: 45 €
- Places: 8
- Texte: On tresse ensemble une couronne de saison.
```

| Typ | Pflicht | Optional |
|---|---|---|
| bouquet | Titel, Prix | Fleurs, Jusqu'au, Texte |
| offre | Titel | Code, Jusqu'au, Texte |
| atelier | Titel, Date | Heure, Prix, Places, Texte |

### `boutique.md`

```markdown
## Abonnement
- Texte: Un bouquet de saison livré chez vous ou au bureau, chaque semaine ou toutes les deux semaines.
- Petit: 29 €
- Moyen: 39 €
- Grand: 55 €

## Boutique
- Adresse: 24 rue de la Folie-Méricourt, 75011 Paris
- Horaires: Mar – Sam 9 h 30 – 19 h 30 · Dim 9 h – 13 h
- E-mail: bonjour@chez-marguerite.example
```

## 6. Verhalten

**Laden (Datenfluss):** Beim Öffnen lädt `app.js` die Dateien `contenu.md` und `boutique.md` mit `fetch(..., { cache: 'no-cache' })`, `parse.js` macht daraus Einträge, `app.js` baut daraus die Kästen. Die Reihenfolge in der App folgt der Reihenfolge in der Datei, Ateliers werden nach Datum sortiert.

**Automatisch ausblenden:** Ein Eintrag mit `Jusqu'au` verschwindet am Tag danach um 0:00 Uhr (Uhrzeit des Handys). Ein Atelier verschwindet am Tag nach seinem `Date`. Einträge ohne `Jusqu'au` bleiben sichtbar, bis Laura sie löscht. Gibt es mehrere gültige Sträuße, wird der erste angezeigt.

**Code kopieren:** Ein Tippen auf den Code-Kasten kopiert den Code (`navigator.clipboard`, als Ersatz ein ausgewähltes Textfeld). Danach steht 2 Sekunden lang „Copié“ da.

**Ajouter au calendrier:** Es wird eine `.ics`-Datei erzeugt (Titel, Datum, Uhrzeit, Ort = Ladenadresse, Text) und geöffnet. Die Uhrzeiten gelten als Pariser Ortszeit (`TZID=Europe/Paris` mit passendem `VTIMEZONE`-Block). Ohne `Heure` wird ein ganztägiger Termin angelegt. Unter dem Knopf steht als Ersatz ein kleiner Link „ou Google Agenda“, weil iPhones Kalenderdateien in installierten Web-Apps nicht immer zuverlässig öffnen.

**Réserver (Strauß der Woche):** Der Knopf klappt ein Formular auf: Nom, E-mail ou téléphone, Jour de retrait (heute bis in 60 Tagen), Message (facultatif). Der Name des Straußes wird aus dem Titel der Karte genommen und mitgeschickt. Absenden schickt einen `POST` an `https://pqunesojvlamgyhgwhqc.supabase.co/rest/v1/reservations` mit dem öffentlichen Publishable Key und `Prefer: return=minimal`. Erfolg: „Merci ! Votre bouquet vous attend.“ Fehler (auch offline): Hinweis mit der E-Mail-Adresse als Ersatz. Der Service Worker darf diese Anfrage nicht abfangen oder zwischenspeichern (er behandelt nur `GET` auf der eigenen Adresse).

**S'abonner:** Ein `mailto:`-Link an die E-Mail aus `boutique.md` mit Betreff und Text auf Französisch, zum Beispiel Betreff „Réservation : Le Jardin d'automne“ und Text „Bonjour, je voudrais réserver le bouquet de la semaine « Le Jardin d'automne ». Nom : … Jour de retrait : …“.

**Adresse:** öffnet die Karten-App (`https://maps.apple.com/?q=…`, auf Android leitet das zu Google Maps weiter).

## 7. Frische Inhalte und Offline

- **Service Worker (`sw.js`): immer zuerst das Netz.** Für alle Anfragen gilt: aus dem Netz holen, die Antwort als Kopie speichern und anzeigen. Nur wenn das Netz fehlt, wird die gespeicherte Kopie genommen. Nichts wird dauerhaft zuerst aus dem Zwischenspeicher geliefert.
- Der Service Worker übernimmt sofort (`skipWaiting`, `clients.claim`), und alte Zwischenspeicher mit anderem Namen werden gelöscht.
- **`netlify.toml`:** `Cache-Control: no-cache` für alle Dateien. Der Browser fragt dann bei jedem Laden nach, ob es etwas Neues gibt, und bekommt nur dann Daten, wenn sich etwas geändert hat. Bei so einer kleinen App ist das schnell genug und am sichersten.
- **Offline-Hinweis:** Konnte eine Inhaltsdatei nicht aus dem Netz geladen werden und kommt aus der Kopie, zeigt die App oben einen dezenten Streifen: „Hors ligne · dernière version enregistrée“.
- Google Fonts werden mit gespeichert, damit die App offline gleich aussieht.

## 8. Fehler und leere Stellen

- Fehlt bei einem Eintrag etwas Pflichtiges oder ist ein Datum nicht lesbar, wird **nur dieser Eintrag** weggelassen. Auf der Seite erscheint keine Fehlermeldung, in der Browser-Konsole steht ein Hinweis mit dem Titel.
- Unbekannte `Type`-Werte werden ignoriert.
- Leere Bereiche bekommen einen freundlichen Satz: „Pas d'offre en ce moment.“, „Pas d'atelier prévu pour le moment.“, beim Strauß „Le prochain bouquet arrive bientôt.“
- Lässt sich eine Datei weder aus dem Netz noch aus der Kopie laden, steht dort: „Impossible de charger le contenu. Réessayez dans un instant.“

## 9. Tests

- **Automatisch im Browser (`tests/index.html`):** eine kleine eigene Prüf-Funktion, keine Bibliothek. Sie prüft: Einträge und Schlüssel lesen (auch mit Akzenten und anderer Groß- und Kleinschreibung), unvollständige Einträge weglassen, Ablauf-Logik anhand fester Beispieldaten, Inhalt der Kalenderdatei (Datum, Uhrzeit, Zeitzone, ganztägig), Aufbau der Mail-Links. Entwickelt wird testgetrieben: erst die Prüfung, dann der Code.
- **Von Hand im Browser-Fenster in Handygröße:** alle Bereiche, alle drei Knöpfe, Offline-Hinweis (Server im Hintergrund kurz anhalten und die App neu laden), Installierbarkeit (Manifest und Icons werden erkannt).
- **Nach dem Hochladen:** Einen Eintrag in `contenu.md` ändern, pushen, auf `chez-marguerite.netlify.app` prüfen, dass die Änderung ankommt.
- Lokal wird die App mit dem auf dem Mac vorhandenen `python3 -m http.server` ausgeliefert, weil Service Worker und `fetch` eine echte Adresse brauchen.

## 10. Bewusst nicht dabei (vielleicht später)

- Design-Verbesserungen (von Laura angekündigt), echte Fotos
- Saison-Neuigkeiten
- Mehrsprachigkeit
- Bearbeitungsformular (CMS), weitere Formulare mit Absenden (Tag 5)
- Reservierungen in der App ansehen (dafür bräuchte es einen Login)
- Push-Benachrichtigungen
