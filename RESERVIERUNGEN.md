# Reservierungen ansehen

Kunden reservieren den Strauß der Woche über das Formular in der App. Jede Reservierung landet in Supabase, in der Tabelle `reservations`.

## So findest du sie

1. Öffne https://supabase.com/dashboard und melde dich an (geht auch am Handy).
2. Tippe auf dein Projekt **„lauraguenin-create's Project“**.
3. Links auf **Table Editor** tippen, dann auf die Tabelle **reservations**.
4. Jede Zeile ist eine Reservierung. Die neuesten findest du, wenn du nach **created_at** absteigend sortierst.

Direkter Link: https://supabase.com/dashboard/project/pqunesojvlamgyhgwhqc/editor

## Was die Spalten bedeuten

| Spalte | Bedeutung |
|---|---|
| `created_at` | wann reserviert wurde (Zeit in UTC, also in Paris 1 bis 2 Stunden später) |
| `bouquet` | welcher Strauß |
| `nom` | Name der Kundin oder des Kunden |
| `contact` | E-Mail oder Telefonnummer |
| `jour_retrait` | an welchem Tag abgeholt wird |
| `message` | Nachricht (freiwillig) |

## Gut zu wissen

- Nur du siehst diese Liste. Die App kann Reservierungen nur eintragen, nicht lesen.
- Erledigte Reservierungen kannst du im Table Editor markieren und löschen.
- Supabase schickt dir keine E-Mail bei neuen Reservierungen. Schau also regelmäßig nach.
