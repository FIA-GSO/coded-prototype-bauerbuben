# Digitales Berichtsheft - HTML/CSS Projekt

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/-DDdJPZE)

## 📋 Projektübersicht

Dieses Projekt ist im Rahmen des Berufsschulunterrichts entstanden und simuliert ein digitales Berichtsheft für Auszubildende. Es wurde mit **HTML**, **CSS** und **JavaScript** entwickelt und demonstriert die erlernten Grundlagen der Webentwicklung.

Das Berichtsheft ermöglicht es Auszubildenden, ihre wöchentlichen Tätigkeiten zu dokumentieren, während Ausbilder diese kommentieren und überprüfen können.

---

## 🎯 Projektziele

- Anwendung von **HTML5** zur Strukturierung von Webseiten
- Gestaltung mit **CSS3** (inkl. Flexbox, Grid, Responsive Design)
- Implementierung grundlegender **JavaScript**-Funktionalitäten
- Umsetzung eines realistischen Use-Cases aus dem Ausbildungsalltag
- Erstellung eines responsiven Designs für Desktop und Mobile

---

## ✨ Features

### 📱 Responsive Design
- Optimierte Darstellung für Desktop- und Mobilgeräte
- Automatische Anpassung der Benutzeroberfläche
- Mobile-First Ansatz mit Breakpoints

### 👤 Zwei Benutzerrollen
- **Azubi-Modus**: Einträge erstellen und bearbeiten
- **Ausbilder-Modus**: Einträge kommentieren und überprüfen

### 📅 Wochennavigation
- Navigation durch verschiedene Wochen
- Integrierter Kalender zur Datumsauswahl
- Visuelle Darstellung des aktuellen Zeitraums

### ✍️ Eintragsverwaltung
- Einträge für jeden Wochentag (Montag - Freitag)
- Mehrere Einträge pro Tag möglich
- Löschen von Einträgen
- Kommentarfunktion für Ausbilder

### 🎨 Benutzerfreundliche Oberfläche
- Moderne, intuitive Gestaltung
- Klare Farbgebung und Strukturierung
- Hover-Effekte und visuelle Feedbacks
- Card-basiertes Design

---

## 🗂️ Projektstruktur

```
coded-prototype-bauerbuben/
│
├── README.md                      # Projektdokumentation
├── werHatWasGemacht.txt          # Aufgabenverteilung im Team
│
└── frontend/
    ├── hf_mac_mobile.html        # Hauptseite der Anwendung
    ├── login.html                # Login-Seite (derzeit nicht verwendet)
    ├── styles.css                # Alle Styles inkl. responsive Design
    ├── script.js                 # Hauptlogik der Anwendung
    └── script_old.js             # Alte Version (Backup)
```

---

## 🚀 Installation & Verwendung

### Voraussetzungen
- Webbrowser (Chrome, Firefox, Safari, Edge)
- Keine zusätzlichen Installationen erforderlich

### Starten der Anwendung
1. Repository klonen oder herunterladen:
   ```bash
   git clone <repository-url>
   ```

2. Datei `frontend/hf_mac_mobile.html` im Browser öffnen

3. Login durchführen:
   - Rolle auswählen (Azubi oder Ausbilder)
   - Beliebige Zugangsdaten eingeben (nur Demonstration)

### Bedienung

#### Als Azubi:
1. Nach dem Login erscheint die Wochenübersicht
2. Für jeden Tag können Einträge hinzugefügt werden
3. Einträge können mit Text gefüllt und gelöscht werden
4. Mit den Pfeilen kann zwischen Wochen navigiert werden
5. Über das Kalendersymbol kann ein Datum ausgewählt werden

#### Als Ausbilder:
1. Zusätzlich zu den Azubi-Funktionen können Kommentare hinzugefügt werden
2. Jeder Eintrag kann kommentiert werden
3. Der Ausbilder-Modus ist visuell gekennzeichnet

---

## 💻 Technische Details

### HTML
- Semantische HTML5-Struktur
- Formulare mit verschiedenen Input-Typen
- Dynamische DOM-Manipulation via JavaScript

### CSS
- **Flexbox** für Header- und Button-Layouts
- **CSS Grid** für die Kalenderansicht
- **Media Queries** für Responsive Design (Breakpoint: 768px)
- CSS-Variablen für konsistente Farbgebung
- Transitions für sanfte Animationen
- Box-Shadow für Card-Effekte

### JavaScript
- Event Handling (Click, Submit, etc.)
- DOM-Manipulation
- Datums- und Kalenderfunktionen
- Zustandsverwaltung (aktuelle Rolle, ausgewähltes Datum)
- Lokale Arrays für Wochentage
- Dynamisches Erstellen von HTML-Elementen

### Besondere Implementierungen
- **Kalender-Widget**: Selbst entwickeltes Kalender-Popup zur Datumsauswahl
- **Wochenberechnung**: Automatische Ermittlung von Wochenstart und -ende
- **Scroll-Container**: Scrollbare Eintragsbereiche mit Custom Scrollbar
- **Toggle-Funktionalität**: Ausklappbare Tagesabschnitte auf Mobile

---

## 👥 Team & Aufgabenverteilung

Die Entwicklung erfolgte im Team. Die Aufgabenverteilung ist in der Datei `werHatWasGemacht.txt` dokumentiert.

**Hauptbeteiligte:**
- Arne: User Flows, Handy-Mockups, HiFi-Prototyping
- Moritz: User Flows, Mockups
- Bennet: Desktop-Mockups, Coded Prototype Laptop, Responsiveness
- Leo: Recherche

---

## 📱 Responsive Design

Das Design passt sich automatisch an verschiedene Bildschirmgrößen an:

### Desktop (> 768px)
- Alle Wochentage nebeneinander dargestellt
- Breite Kartenansicht
- Optimierte Nutzung des Bildschirmplatzes

### Mobile (≤ 768px)
- Tage untereinander angeordnet
- Ausklappbare Tagesabschnitte
- Touch-optimierte Buttons
- Angepasste Schriftgrößen
- Zentriertes Layout

---

## 🎓 Gelerntes & Angewandtes

Im Rahmen dieses Projekts wurden folgende Konzepte umgesetzt:

- ✅ Strukturierung von HTML-Dokumenten
- ✅ CSS-Selektoren und Spezifität
- ✅ Box-Model und Positioning
- ✅ Flexbox und CSS Grid
- ✅ Responsive Webdesign
- ✅ JavaScript DOM-Manipulation
- ✅ Event-Listener und Event-Handling
- ✅ Funktionen und Scope in JavaScript
- ✅ Arbeiten mit Datum und Zeit
- ✅ Formulare und Input-Validierung
- ✅ CSS-Transitions und Animationen
- ✅ Mobile-First Development

---

## 🔮 Mögliche Erweiterungen

Folgende Features könnten in Zukunft implementiert werden:

- [ ] Backend-Integration mit Datenbank
- [ ] Authentifizierung mit echtem Login-System
- [ ] Export-Funktion (PDF-Generierung)
- [ ] Benachrichtigungen für Ausbilder
- [ ] Unterschriftenfunktion
- [ ] Speicherung im Local Storage
- [ ] Mehrsprachigkeit
- [ ] Dark Mode

---

## 📝 Lizenz

Dieses Projekt wurde für Bildungszwecke erstellt und steht unter keiner spezifischen Lizenz.

---

## 🙏 Danksagung

Vielen Dank an unsere Berufsschullehrer für die Unterstützung und das vermittelte Wissen in HTML, CSS und JavaScript!

---

**Erstellt von:** Team Bauerbuben  
**Ausbildung:** Fachinformatiker für Anwendungsentwicklung  
**Jahr:** 2024
