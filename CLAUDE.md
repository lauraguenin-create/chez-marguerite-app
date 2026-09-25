# CLAUDE.md

Projekt: **Chez Marguerite**, eine kleine Handy-App (PWA) für einen fiktiven Blumenladen in Paris 11e. Entstanden in einem Claude-Code-Workshop (Tag 4, Übung „Eigene App“).

Diese Datei ist so geschrieben, dass eine neue Session alles Nötige hier im Repository findet, auch in der Cloud (Claude-App auf dem Handy), ohne Zugriff auf Lauras Mac.

## Mit wem du arbeitest

- **Laura ist keine Entwicklerin.** Sprich mit ihr **Deutsch**, in einfachen Worten.
- Stelle **eine Frage nach der anderen**.
- **Zeige Entwürfe, bevor du baust**, und lass Pläne freigeben, bevor du sie umsetzt.
- „Entscheide du“ ist eine gültige Antwort: dann triff eine sinnvolle Wahl und sag kurz, welche.
- Alle **Texte in der App sind Französisch**.
- Alle Daten sind ausgedacht (Adresse, Preise, E-Mail `bonjour@chez-marguerite.example`).

## Wichtige Adressen und Dateien

- GitHub (öffentlich): https://github.com/lauraguenin-create/chez-marguerite-app
- Live: https://chez-marguerite.netlify.app. Netlify ist mit GitHub verknüpft: **jeder Push auf `main` geht automatisch live.** Netlify liefert den Projektordner direkt aus, ohne Bau-Schritt.
- `Steckbrief.md`: Lauras Auftrag (was in die App soll)
- `docs/superpowers/specs/2026-09-24-chez-marguerite-app-design.md`: **das freigegebene Design- und Technik-Dokument.** Es ist die verbindliche Grundlage für den Bau (Dateien, Format der Inhaltsdateien, Verhalten, Cache, Tests).
- `docs/superpowers/specs/entwurf-jardin-v1.html`: der freigegebene Design-Entwurf
- `LIESMICH-README.md`: Ablauf der Workshop-Übung (Schritte 6–10) mit Checkliste am Ende

## Stand (25.09.2026)

- Erledigt: Steckbrief, Design-Dokument (freigegeben), GitHub-Repo, Netlify live, App-Icon und Manifest (lässt sich aufs Handy legen).
- `index.html` ist noch eine **vorläufige Vorschau**: die Inhalte stehen fest im HTML. Das ist nur übergangsweise so.
- **Nächster Schritt:** aus dem Design-Dokument einen Umsetzungsplan machen (Superpowers `writing-plans`), Laura den Plan zeigen, nach ihrem „go“ bauen: `contenu.md` und `boutique.md` als Inhaltsdateien, `js/parse.js`, `js/actions.js`, `js/app.js`, `sw.js`, `styles.css`, `logo.svg`, `tests/index.html`.
- Danach laut `LIESMICH-README.md`: Schritt 9 (Änderung pushen, prüfen, dass sie auf dem Handy ankommt) und Schritt 10.

## Regeln für die App

- **Inhalte bleiben in Dateien, die man ohne Code bearbeiten kann** (`contenu.md` oft, `boutique.md` selten). Die App liest sie beim Öffnen und schreibt nichts davon fest in den Code. Wenn Laura etwas ändert und pusht, sehen es alle.
- **Keine Datenbank, keine Logins, kein Bau-Schritt, keine Bibliotheken.** Reines HTML, CSS und JavaScript. Die einzige externe Quelle sind Google Fonts (Cormorant Garamond, Jost).
- **Updates dürfen nicht im Cache hängen bleiben.** Der Service Worker holt immer zuerst aus dem Netz und nimmt die Kopie nur offline. HTML und Inhalte werden nie dauerhaft zuerst aus dem Zwischenspeicher geliefert. `netlify.toml` setzt `Cache-Control: no-cache`.
- **Installierbar** auf iPhone (Safari → „Zum Home-Bildschirm“) und Android (Chrome → „App installieren“): `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`. Start ohne Browserleiste.
- **Zum Antippen:** Rabattcode kopieren, Atelier in den Kalender, Strauß per E-Mail reservieren.
- Design „Jardin“: Farben, Schriften und Aufbau stehen im Design-Dokument, Abschnitt 3.

## Testen

- Lokal ausliefern mit `python3 -m http.server` im Projektordner (Service Worker und `fetch` brauchen eine echte Adresse, `file://` reicht nicht).
- Automatische Prüfungen: `tests/index.html` im Browser öffnen (wird beim Bau angelegt).
- Nach dem Push auf https://chez-marguerite.netlify.app nachsehen, ob die Änderung angekommen ist.

## Arbeiten vom Handy (Cloud-Session)

- Es gibt dort kein Browser-Fenster neben dem Chat. **Entwürfe zeigst du Laura so:** Änderung auf einen eigenen Branch pushen und einen Pull Request öffnen. Netlify baut dafür normalerweise eine Vorschau-Adresse (Deploy Preview), die Laura auf dem Handy öffnen kann. Kleine Entwürfe kannst du auch als Beschreibung oder Bild im Chat zeigen.
- Auf dem Mac ist Node.js nicht installiert. Baue deshalb nichts, was Node, npm oder einen Bau-Schritt braucht, auch wenn es in der Cloud vorhanden wäre.
- Die Workshop-Dateien außerhalb dieses Repos (Kranich-Demo, Tagesablauf) werden für diese App nicht gebraucht.

## „Speichere auf GitHub“

Wenn Laura „Speichere auf GitHub“ (oder „Save to GitHub“) sagt:

1. Mit `git status` prüfen, was sich geändert hat, und sicherstellen, dass keine Geheimnisse dabei sind (siehe `.gitignore`).
2. Alle Änderungen mit einer kurzen, klaren Commit-Nachricht auf Deutsch committen.
3. Auf `main` pushen, damit es live geht. Arbeitet die Session auf einem anderen Branch (in der Cloud üblich), führe ihn in `main` zusammen oder öffne einen Pull Request und sag Laura genau, welchen Knopf sie drücken muss.
4. Laura in einem Satz sagen, was gespeichert wurde, mit dem Link zum Repository.
