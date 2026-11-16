# Waidr – Einrichtung (ca. 20 Minuten)

Du brauchst: ein Google-Konto, ein GitHub-Konto (oder Netlify) und die Datei `Code.gs` für Google und für GitHub `index.html` samt Logo-Dateien (`apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon.svg`, `manifest.webmanifest`).

Aufbau: **Google Sheet** = Datenbank, **Apps Script** = Schnittstelle, **index.html** = die Scan-Seite, die auf den Handys läuft.

---

## Teil A – Google Sheet und Schnittstelle

1. Öffne <https://sheets.new> und benenne die Tabelle **Wildlager**.
2. Menü **Erweiterungen > Apps Script**. Lösche den vorhandenen Code und füge den kompletten Inhalt von `Code.gs` ein. Speichern (Diskettensymbol).
3. Wähle oben die Funktion **setup** und klicke **Ausführen**.
   - Google fragt nach Berechtigungen: **Berechtigungen prüfen**, dein Konto wählen, bei „Nicht verifiziert" **Erweitert > Weiter zu … (unsicher)**, **Zulassen**.
   - Danach hat die Tabelle fünf Blätter: Einstellungen, Artikel, Lagerorte, Nutzer, Bestand.
4. Im Blatt **Einstellungen**: den **Zugangscode** ändern (steht dort zufällig vorbelegt). Diesen Code bekommen deine Kollegen.
5. Im Blatt **Nutzer**: die vier Namen eintragen (je ein Name pro Zeile).
6. Im Blatt **Artikel** stehen zwei Beispiele aus deinem Screenshot (01001, 01003). Überschreiben, ergänzen oder löschen, wie du willst. Neue Artikel kannst du später auch in der App anlegen.
7. Zurück im Apps-Script-Editor: **Bereitstellen > Neue Bereitstellung**.
   - Zahnrad neben „Typ auswählen" > **Web-App**
   - **Ausführen als: Ich**
   - **Wer hat Zugriff: Jeder**
   - **Bereitstellen**, dann die **Web-App-URL kopieren** (endet auf `/exec`).

„Jeder" heißt: jeder, der die URL **und** den Zugangscode kennt. Der Code ist der Schutz, also nicht öffentlich posten.

---

## Teil B – Scan-Seite ins Netz stellen (GitHub Pages, kostenlos)

Die Kamera funktioniert nur auf einer eigenen HTTPS-Seite, nicht direkt in Google Apps Script.

1. In `index.html` die Zeile
   `const CONFIG = { API_URL: '' };`
   ändern in
   `const CONFIG = { API_URL: 'https://script.google.com/macros/s/…/exec' };`
   (deine URL aus Schritt A7). Dann müssen die Kollegen die URL nie eingeben.
   *Alternativ leer lassen: dann fragt die App einmal pro Gerät nach der Adresse.*
2. Auf <https://github.com/new> ein Repository **wildlager** anlegen (Public), **Add file > Upload files**, `index.html` und alle Logo-Dateien (`apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon.svg`, `manifest.webmanifest`) gemeinsam hochladen, **Commit**. Alle liegen im Hauptordner des Repositorys, nicht in einem Unterordner.
3. **Settings > Pages > Source: Deploy from a branch > Branch `main` / `/ (root)` > Save**.
4. Nach 1–2 Minuten ist die Seite unter `https://DEINNAME.github.io/wildlager/` erreichbar. Das ist der Link für alle.

Hinweis: Ein öffentliches Repository ist für jeden einsehbar, die Server-URL steht dann im Quelltext. Der Zugangscode schützt trotzdem. Willst du das nicht, lass `API_URL` leer und gib die URL in der App ein, oder nimm ein privates Hosting wie Netlify (<https://app.netlify.com/drop>, Ordner mit `index.html` hineinziehen).

---

## Teil C – Auf den Handys einrichten (jeder der vier)

1. Link öffnen, **Zugangscode** eingeben, **Weiter**, den eigenen **Namen** antippen.
2. Beim ersten Scan die **Kamera-Erlaubnis** zulassen.
3. Als App-Symbol ablegen:
   - Android (Chrome): Menü ⋮ > **Zum Startbildschirm hinzufügen**
   - iPhone (Safari): Teilen > **Zum Home-Bildschirm**

---

## Teil D – Bedienung

**Scannen**
- Oben **Einbuchen / Ausbuchen / Umlagern** wählen.
- **Lagerort (Standard)** wählen. Er wird pro Handy gemerkt und bei jedem Einbuchen automatisch verwendet. Beim Umlagern ist es der Ziel-Lagerort.
- **Dauerscan** an: Die Kamera bleibt an, du hältst ein Etikett nach dem anderen davor. Jeder Treffer gibt einen Piepton und zeigt Artikel und Gewicht an. Die Daten werden im Hintergrund gespeichert, du musst nicht warten.
- Zwei Packungen mit exakt gleichem Etikett hintereinander: Kamera kurz vom ersten Etikett wegnehmen, dann das zweite zeigen. Oder bei gleichem Code **+1 nochmal** tippen.
- **Ausbuchen:** Zuerst oben den **Kunden** wählen (oder **+ Neu**), dann scannen. Ohne Kunden wird nicht ausgebucht. Der Preis jeder Packung (Gewicht × Preis pro kg, auf Cent gerundet) wird dabei festgehalten und oben als **Summe** mitgezählt.
- **Rechnung erstellen:** Wenn der Verkauf fertig ist, **Rechnung erstellen** antippen. Es entsteht eine Rechnung mit Nummer (`R-2026-0001`), die Summe wird auf 0 gesetzt und der Kunde ist wieder leer, damit der nächste Verkauf nicht versehentlich beim falschen Kunden landet.
- Falsch gescannt? In der Liste **Rückgängig**. Das geht nur, solange noch keine Rechnung erstellt ist.
- Artikelcode unbekannt: Die App öffnet das Formular „Neuer Artikel". Wildart, Fleischart und Preis eintragen, dann wird die Packung eingebucht.
- Geht die Kamera nicht (oder hast du einen Bluetooth-Handscanner): Code im Feld **manuell** eingeben und OK.

**Bestand**
- Filter nach Lagerort, Wildart, Suche. Oben stehen Packungen, Gesamtgewicht und Wert (Gewicht × Preis pro kg).
- Artikel antippen: Einzelpackungen mit Datum, Uhrzeit, Nutzer, dazu **Ausbuchen** oder **Löschen**.
- **Ausgebuchte zeigen**: die letzten 300, mit **Zurück ins Lager**.

**Rechnungen** (eigener Tab)
- **Noch nicht abgerechnet:** Verkäufe, die ausgebucht, aber noch ohne Rechnung sind (z. B. vergessen), mit Knopf **Rechnung erstellen**.
- Filter nach **Kunde** und **Zeitraum** (Monat, 30 Tage, Jahr). Oben stehen Anzahl, Gewicht und Umsatz der Auswahl.
- **Pro Kunde:** Rechnungen, Gewicht, Umsatz und letzter Kauf, absteigend nach Umsatz.
- Rechnung antippen: alle Positionen mit Gewicht und Preis. **Text kopieren** legt eine Zusammenfassung zum Einfügen (z. B. WhatsApp) in die Zwischenablage. **Stornieren** löscht die Rechnung. Die Packungen bleiben beim Kunden ausgebucht und erscheinen wieder unter "Noch nicht abgerechnet".
- Preise einer Rechnung ändern sich nie nachträglich, auch wenn du später den Preis pro kg im Blatt "Artikel" änderst.

**Wünsche** (eigener Tab)
- **+ Wunsch:** Kunde, Artikel und Menge. Neben dem Mengenfeld wählst du die Einheit **kg** (eine Nachkommastelle, 0,1 bis 99,9) oder **Stück** (ganze Zahl, 1 bis 999). Ein Stück entspricht einer Packung. Zum selben Artikel kann ein Kunde Wünsche in beiden Einheiten haben. Wünschbar sind nur aktive Artikel aus den Stammdaten. **Speichern + weiterer Wunsch** erfasst mehrere Zeilen für denselben Kunden hintereinander.
- **Nach Artikel:** der Bedarf je Wildart und Artikel: gewünschte Menge (kg und Stück getrennt), aktueller Lagerbestand (kg und Anzahl Packungen) und Fehlmenge. Stück-Wünsche werden für die Fehlmenge mit dem Durchschnittsgewicht einer Packung dieses Artikels in kg umgerechnet (erst aus dem Lager, sonst aus den zuletzt ausgebuchten Packungen) und mit ≈ gekennzeichnet. Gibt es kein Durchschnittsgewicht, steht dort "Fehlt ≥ …" und die Stück zählen nicht mit. Antippen zeigt, welche Kunden was wollen. Damit planst du Zerlegungs- und Wurstbereitungstermine. Diese Übersicht gibt es nur in diesem Tab.
- **Nach Kunde:** offene Wünsche je Kunde mit **✓** (erfüllt) und **Bearbeiten**. **Text kopieren** legt die Wunschliste für WhatsApp in die Zwischenablage.
- **Erledigt:** erfüllte und verworfene Wünsche. Über **Bearbeiten** kannst du sie wieder öffnen.
- **Abhaken beim Ausbuchen:** Buchst du an einen Kunden aus und er hat einen offenen Wunsch zu diesem Artikel, schlägt die App das Abhaken vor. Bei Stück-Wünschen zählt die App die ausgebuchten Packungen. Im Scan-Tab erscheint dafür die Karte **Passende Wünsche** mit Knopf **Erfüllt**, im Bestand-Tab ein Auswahlfenster. Nichts wird automatisch abgehakt.
- Wünsche reservieren nichts im Lager und haben keine Termine.

**Stammdaten**
- Kunden anlegen, umbenennen (Bestand und Rechnungen werden mit umbenannt), deaktivieren.
- Lagerorte anlegen, umbenennen (Bestand wird mitgezogen), deaktivieren.
- Artikel anlegen oder ändern (Preis, Bezeichnung, aktiv/inaktiv).
- Alles liegt auch direkt im Google Sheet und kann dort bearbeitet werden. Die Blätter-Überschriften nicht ändern.

**Datenfelder je Packung (Blatt „Bestand")**: ID, EAN, Artikelcode, Gewicht (g), Lagerort, Scandatum, Scanuhrzeit, Eingebucht von, Status, Ausbuchdatum, Ausbuchuhrzeit, Ausgebucht von, Kunde (Verkauf), Preis (€), Rechnungsnr.

**Blatt „Wünsche"**: ID, Datum, Kunde, Artikelcode, Menge, Status (offen, erfüllt, verworfen), Erledigt am, Erfasst von, Einheit (kg oder Stk; leer gilt als kg).

**Blatt „Rechnungen"**: Rechnungsnr, Datum, Uhrzeit, Kunde, Packungen, Gewicht (g), Summe (€), Erstellt von. Die einzelnen Positionen findest du im Blatt „Bestand" über die Spalte Rechnungsnr. Das Blatt **Kunden** (Name, Aktiv, Notiz) kannst du auch direkt im Sheet pflegen.

---

## Teil E – Erster Test (bitte unbedingt)

1. Ein echtes Etikett einbuchen und im Blatt **Bestand** prüfen: **Artikelcode** und **Gewicht (g)** müssen zum Etikett passen (Beispiel: 01001 und 432).
2. Ist das Gewicht um den Faktor 10 oder 100 daneben, im Blatt **Einstellungen** den Wert **Gramm pro Gewichtseinheit** ändern (Gramm = 1, 10-g-Schritte = 10, 0,1 kg = 100). Es gilt sofort, nach dem nächsten Öffnen der App.
3. Wird ein Etikett immer als „Ungültig" gemeldet: Entweder wurde der Code schlecht gelesen (nochmal scannen), oder das Präfix stimmt nicht (Blatt Einstellungen, **EAN-Präfix**, muss `28` sein).

Aufbau des Codes (13 Stellen, nach deinen Etiketten): `28` + Wildart (2) + Fleischart (3) + Gewicht in Gramm (5) + Prüfziffer (1). Beispiel: `2801001004329` = Artikel 01001, 432 g.

---

## Update einer bestehenden Installation (zuletzt: Wünsche in kg und Stück)

1. Im Apps-Script-Editor den **kompletten Code ersetzen** durch den neuen `Code.gs`, speichern.
2. **Bereitstellen > Bereitstellungen verwalten > Bearbeiten (Stift) > Version: Neue Version > Bereitstellen**. Die URL bleibt gleich.
3. Neue `index.html` und die Logo-Dateien (`apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon.svg`, `manifest.webmanifest`) auf GitHub hochladen (ersetzen bzw. neu hinzufügen). Wer die App schon auf dem Homescreen hat, entfernt das alte Symbol und legt es neu an, damit Name und Logo übernommen werden.
4. App auf dem Handy neu laden. Beim Öffnen legt das Backend automatisch fehlende Blätter an (**Kunden**, **Rechnungen**, **Wünsche**) sowie die Spalten für Kunde, Preis und Rechnungsnr im Blatt **Bestand**. Vorhandene Daten bleiben unverändert. Alte Ausbuchungen haben keinen Kunden und erscheinen nicht unter "Noch nicht abgerechnet".

---

## Hinweise und Fehlersuche

| Problem | Lösung |
|---|---|
| „Zugangscode falsch" | Code im Blatt Einstellungen prüfen. |
| Nach Änderung von `Code.gs` ändert sich nichts | Apps Script: **Bereitstellen > Bereitstellungen verwalten > Bearbeiten (Stift) > Version: Neue Version > Bereitstellen**. Die URL bleibt gleich. |
| Kamera startet nicht | Kamera-Erlaubnis im Browser prüfen. Die Seite muss über `https://` geöffnet sein. Auf dem iPhone Safari verwenden. |
| „Keine Verbindung zum Server" | Internet prüfen, dann **Erneut** in der Liste. Es gibt keinen Offline-Betrieb. |
| Etikett wird schlecht erkannt | Mehr Licht, 15–25 cm Abstand, Etikett glatt halten. Notfalls Code manuell eingeben. |
| Gleiche Packungen (gleicher Artikel, gleiches Gewicht) | Haben denselben Code. Beim Ausbuchen wird die **älteste** zuerst ausgebucht (FIFO). |

Die Scan-Seite lädt den Scanner (Bibliothek und Decoder) von `cdn.jsdelivr.net`. Dafür braucht das Handy Internet.
