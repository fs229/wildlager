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

**Tab Revier** hat vier Ansichten: **Strecke**, **Aufgaben**, **Abschussplan** und **Wind**. Der Wind liegt nicht mehr oben in der Kopfzeile, sondern hier: Windrichtung und -stärke für das Revier mit Vorhersage der nächsten 6 Stunden, per Knopf auch für den eigenen Standort.

**Revier > Strecke**: Streckenliste der Erlegungen. Mit **+ Erlegung erfassen** gibst du Datum, Uhrzeit, Wildart, Geschlecht, Alter in Jahren (ganze Zahl, optional), Erleger und optional Gewicht (kg) und Wildmarke ein. Oben filterst du nach Jagdjahr (1. April bis 31. März) und Wildart und siehst Stückzahl, Gewicht und die Zahl je Wildart. Antippen einer Erlegung öffnet sie zum Bearbeiten oder Löschen. Löschen geht nicht, solange Packungen daran hängen.

**Revier > Aufgaben**: Aufgabenliste für die Revierarbeit (z. B. Kanzel reparieren, Kirrung auffüllen). Mit **+ Aufgabe** legst du Titel, optional Notiz, Verantwortlichen und Fälligkeitsdatum an. Das Kästchen links hakt eine Aufgabe ab, nochmal antippen öffnet sie wieder. Antippen des Titels öffnet Bearbeiten und Löschen. Oben wechselst du zwischen **Offen** und **Erledigt** und filterst nach Verantwortlich (Alle, Meine, Ohne Zuständigen oder eine Person). Offene Aufgaben sind nach Fälligkeit sortiert, überfällige stehen rot markiert oben. Erledigt zeigt, wer wann abgehakt hat.

**Stammdaten > Ansitzeinrichtungen**: Kanzeln, Leitern und Drückjagdböcke mit Typ, Blickrichtung (mehrere möglich), Dach, Zustand und Bemerkung. Beim ersten Öffnen legt die App das Blatt „Ansitze" selbst an und füllt es mit den 46 Einrichtungen aus deiner Reviereinrichtungen-Liste (Bodenstände, Kirrungen und Salzlecken bewusst weggelassen). Inaktive Einrichtungen bleiben erhalten, tauchen aber nicht mehr in der Auswahl auf.

**Ansitz in der Strecke**: Beim Erfassen gibt es das optionale Feld **Ansitzeinrichtung**. Bei Erlegungen von heute lädt die App den aktuellen Wind am Revier und sortiert die Auswahl: **Passt zum Wind** (Wind kommt von vorn, bis 45° zur Blickrichtung), **Bedingt** (Seitenwind, bis 90°), **Wind ungünstig** (Wind von hinten, trägt den Geruch ins Wild) und **Ohne Blickrichtung**. Bei anderen Datumsangaben gibt es keinen Windvorschlag, dann ist die Liste einfach alphabetisch. Im **Wind**-Tab steht zusätzlich die Liste „Passende Ansitze" für den aktuellen Wind. Einrichtungen ohne Blickrichtung (alle Drückjagdböcke) werden nie vorgeschlagen.

**Revier > Abschussplan**: Soll und Erfüllung je Jagdjahr (1. April bis 31. März). Kategorien Rehwild: Geiß, Schmalreh, Bock, Kitz. Rotwild: Alttier, Schmaltier, Hirsch Klasse 1, 2, 3, Kalb. Mit **Soll bearbeiten** trägst du die Zahlen aus dem Plan ein (leer = kein Soll, grau steht das Vorjahr). Pro Kategorie siehst du „x von Soll", wie viele noch fehlen und einen Balken; Überschreitungen sind rot markiert. In der Strecke wählst du beim Erfassen unter **Zählt ein auf** die Kategorie. Bei Rehwild und Rotwild ist die Auswahl Pflicht, bei anderen Wildarten gibt es sie nicht. Ältere Erlegungen ohne Kategorie zählen im Plan nicht mit, der Plan weist sie als Hinweis aus, und sie lassen sich nur mit Kategorie neu speichern. Das Jagdjahr ergibt sich aus dem Datum der Erlegung.

**Herkunft der Packungen**: Im Tab Scannen gibt es beim **Einbuchen** das Feld **Erlegung (optional)**. Wählst du dort eine Erlegung, bekommen alle folgenden Packungen diese Herkunft, bis du die Auswahl änderst oder auf „keine" stellst. Mit **+ Neu** legst du die Erlegung gleich an. Die Wahl gilt nur für die aktuelle Sitzung und wird beim nächsten Anmelden zurückgesetzt. Im Bestand steht die Herkunft bei jeder Packung, in der Strecke siehst du je Erlegung, wie viele Packungen und wie viel kg eingelagert sind. Der Prozentwert dort ist das eingelagerte Gewicht im Verhältnis zum erfassten Gewicht des Stücks.

**Stammdaten > Statistik** (Umschalter oben im Tab Stammdaten): Jahresauswertung mit Pfeilen zum Wechseln des Jahres. Oben Eingang, Ausgang und Umsatz mit Vergleich zum Vorjahr und Durchschnittspreis je kg. Darunter Diagramme für Eingang/Ausgang und Umsatz je Monat, die Auswertung nach Wildart sowie die Top-Artikel und Top-Kunden nach Umsatz. Antippen eines Balkens zeigt die genauen Werte, unten gibt es alle Monate als Tabelle. Der Eingang zählt nach Scandatum, Ausgang und Umsatz nach Ausbuchdatum. Gelöschte Packungen tauchen nicht mehr auf.

**Datenfelder je Packung (Blatt „Bestand")**: ID, EAN, Artikelcode, Gewicht (g), Lagerort, Scandatum, Scanuhrzeit, Eingebucht von, Status, Ausbuchdatum, Ausbuchuhrzeit, Ausgebucht von, Kunde (Verkauf), Preis (€), Rechnungsnr.

**Blatt „Strecke"**: ID, Datum, Uhrzeit, Wildart, Geschlecht, Alter in Jahren (ganze Zahl, optional), Erleger, Gewicht (kg), Wildmarke, Erfasst von, Plankategorie, Ansitz. Im Blatt „Bestand" gibt es dazu die Spalte Erlegung mit der ID der Erlegung.

**Blatt „Ansitze"**: ID, Name, Typ, Blickrichtung, Dach, Zustand, Bemerkung, Breite, Länge, Aktiv.

**Blatt „Abschussplan"**: Jagdjahr (Startjahr), Wildart, Kategorie, Soll.

**Blatt „Aufgaben"**: ID, Titel, Notiz, Verantwortlich, Fällig, Status, Erfasst von/am, Erledigt von/am.

**Blatt „Wünsche"**: ID, Datum, Kunde, Artikelcode, Menge, Status (offen, erfüllt, verworfen), Erledigt am, Erfasst von, Einheit (kg oder Stk; leer gilt als kg).

**Blatt „Rechnungen"**: Rechnungsnr, Datum, Uhrzeit, Kunde, Packungen, Gewicht (g), Summe (€), Erstellt von. Die einzelnen Positionen findest du im Blatt „Bestand" über die Spalte Rechnungsnr. Das Blatt **Kunden** (Name, Aktiv, Notiz) kannst du auch direkt im Sheet pflegen.

---

## Teil E – Erster Test (bitte unbedingt)

1. Ein echtes Etikett einbuchen und im Blatt **Bestand** prüfen: **Artikelcode** und **Gewicht (g)** müssen zum Etikett passen (Beispiel: 01001 und 432).
2. Ist das Gewicht um den Faktor 10 oder 100 daneben, im Blatt **Einstellungen** den Wert **Gramm pro Gewichtseinheit** ändern (Gramm = 1, 10-g-Schritte = 10, 0,1 kg = 100). Es gilt sofort, nach dem nächsten Öffnen der App.
3. Wird ein Etikett immer als „Ungültig" gemeldet: Entweder wurde der Code schlecht gelesen (nochmal scannen), oder das Präfix stimmt nicht (Blatt Einstellungen, **EAN-Präfix**, muss `28` sein).

Aufbau des Codes (13 Stellen, nach deinen Etiketten): `28` + Wildart (2) + Fleischart (3) + Gewicht in Gramm (5) + Prüfziffer (1). Beispiel: `2801001004329` = Artikel 01001, 432 g.

---

## Automatisches Backup (einmalig einrichten)

Das Backup legt eine Kopie des gesamten Google Sheets im Drive-Ordner **Waidr Backups** ab. Es bleiben die letzten 12 Kopien, ältere werden automatisch in den Papierkorb verschoben.

1. Neuen `Code.gs` einspielen und neue Version bereitstellen (siehe Update unten).
2. Google Sheet **neu laden** (F5). Es erscheint das Menü **Waidr**.
3. **Waidr > Wöchentliches Backup einschalten**. Beim ersten Mal fragt Google nach Berechtigungen (Zugriff auf Drive und Trigger). Mit deinem Konto **Zulassen**. Bei "Google hat diese App nicht überprüft" auf **Erweitert > Weiter** gehen, denn das Skript gehört dir.
4. Ab jetzt läuft das Backup sonntags gegen 3 Uhr. Mit **Waidr > Backup jetzt erstellen** erzeugst du sofort eine Kopie, mit **Wöchentliches Backup ausschalten** stoppst du es.

Zurückspielen: die gewünschte Kopie aus dem Ordner öffnen, die Blätter bei Bedarf in das Original kopieren. Die Zeitplanung gilt nur für die Tabelle, an die das Skript gebunden ist.

---

## Update einer bestehenden Installation (zuletzt: Ansitzeinrichtungen)

1. Im Apps-Script-Editor den **kompletten Code ersetzen** durch den neuen `Code.gs`, speichern.
2. **Bereitstellen > Bereitstellungen verwalten > Bearbeiten (Stift) > Version: Neue Version > Bereitstellen**. Die URL bleibt gleich.
3. Neue `index.html` und die Logo-Dateien (`apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon.svg`, `manifest.webmanifest`) auf GitHub hochladen (ersetzen bzw. neu hinzufügen). Wer die App schon auf dem Homescreen hat, entfernt das alte Symbol und legt es neu an, damit Name und Logo übernommen werden.
4. App auf dem Handy neu laden. Beim Öffnen legt das Backend automatisch fehlende Blätter an (**Kunden**, **Rechnungen**, **Wünsche**, **Strecke**) sowie die Spalten für Kunde, Preis, Rechnungsnr und Erlegung im Blatt **Bestand**. Vorhandene Daten bleiben unverändert. Alte Ausbuchungen haben keinen Kunden und erscheinen nicht unter "Noch nicht abgerechnet".

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
