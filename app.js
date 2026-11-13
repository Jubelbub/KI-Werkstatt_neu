"use strict";
/* Interaktion des statischen MVP-Clickdummies. Kein Server, kein Build. */

var STORE = "kiw-dummy-v1";
var aktuell = null;
var suchtext = "";
var sucheSeite = { lektion: "", impuls: "", live: "", community: "" };
var selbstGeprueft = false;
var editorId = null;
var editorVorgabe = "";
var detailModus = "lesen";
var herkunft = null;

var GLOSSAR = [
  { begriff: "EU-KI-Verordnung", text: "Europäischer Rechtsrahmen für KI-Systeme. In den Inhalten wird Artikel 4 als Qualifizierungspflicht eingeordnet, abhängig von Aufgabe und Verantwortung." },
  { begriff: "Anwendungsfeld", text: "Tätigkeitsbereich, auf den ein Modul das Basiswissen übersetzt. Im Prototyp: Ermittlung, Führung, Verwaltung. Pflichtmetadatum, mehrwertig." },
  { begriff: "Fassungsstand", text: "Datum, an dem die Fassung zuletzt geprüft wurde. Steht am Inhalt, damit Sie die Aktualität einschätzen können." },
  { begriff: "Halluzination", text: "Eine flüssig klingende Antwort, die sachlich falsch ist. Sie ist ein bekannter Fehlertyp und kein Grund, den Versuch abzubrechen." },
  { begriff: "Niveaustufe", text: "Eigenschaft des Inhalts, nicht der Person. Basis, Aufbau, Spezial oder Profi. Keine Einstufung, keine Zugangssperre, keine Pflichtreihenfolge." },
  { begriff: "Praxisimpuls", text: "Beitrag der Rubrik „Impulse aus der Praxis“. Zählt als praxisnaher Inhalt und kann der erste Schritt von der Einstiegsseite sein." },
  { begriff: "Sprachmodell", text: "Ein KI-System, das zu einer Anweisung Text vorschlägt. Eine flüssige Antwort belegt noch nicht, dass sie stimmt." },
  { begriff: "Transkription", text: "Automatische Verschriftlichung von Gesprochenem. Was sie leistet, wo sie an Grenzen stößt und welche Prüfschritte bleiben, ist Inhalt, nicht eine Freigabe zur ungeprüften Nutzung." },
  { begriff: "Prompt", text: "Die Anweisung an ein Sprachmodell: Kontext, Aufgabe und gewünschtes Ergebnis." },
  { begriff: "PolTube", text: "Internes Videoportal auf Basis von Vimp. Videos und Dateien liegen dort; die KI-Werkstatt bettet sie ein." },
  { begriff: "H5P", text: "Interaktive Lernbausteine, analog zur Einbindung in Moodle. Im Prototyp sehen Sie den Inhaltstyp Frage." },
  { begriff: "ADFS", text: "Anmeldung über das vorhandene Behördenkonto. Die KI-Werkstatt führt kein eigenes Passwort." }
];

var INHALTE = [
  inhalt({
    id: "transkription", titel: "Automatisierte Transkription in der Vernehmung — so funktioniert's",
    teaser: "Was das System leistet, wo es an Grenzen stößt und welche Prüfschritte bleiben.",
    format: "Video", formatKey: "video", niveau: "basis", dauerMin: 8,
    ergebnis: "Sie benennen drei Prüfschritte, die nach der automatischen Verschriftlichung bei Ihnen bleiben.",
    geprueft: "2026-09-18", fassung: "3", felder: ["Ermittlung"], werkzeug: "Transkription", werkzeugKey: "transkription",
    thema: ["einsatzfelder"], ziel: ["ermittlung"], medien: "poltube", anwendungsbezogen: true, pflicht: true,
    lernziel: "Leistung und Grenze der Transkription im Verfahren einordnen.",
    geltungsbereich: "Beschäftigte, die Transkription in der Vernehmung einsetzen.",
    praxis: { rolle: "Sachbearbeitung Ermittlung", taetigkeit: "Eine Vernehmung verschriftlichen und gegenlesen", nutzen: "Ein erster Textentwurf entsteht schneller", grenze: "Abweichungen vom Audio bleiben möglich. Die Prüfung liegt bei der bearbeitenden Person." },
    schritte: [
      { t: "Audio nur im freigegebenen Werkzeug verarbeiten", d: "Welches Werkzeug wofür genutzt werden darf, steht in der maßgeblichen Regelung. Die FAQ gibt dazu nur eine orientierende, gegengezeichnete Antwort." },
      { t: "Abweichungen an zwei Stellen gezielt gegenhören", d: "Namen, Zahlen und Verneinungen sind typische Bruchstellen." },
      { t: "Den Prüfvermerk an den Entwurf heften", d: "Ohne Vermerk geht der Entwurf nicht weiter." }
    ],
    fehler: { text: "Das Transkript ungeprüft in den Vorgang übernehmen, weil es flüssig klingt.", korrektur: "Flüssiger Text ist noch kein Beleg. Gegenhören und den Prüfvermerk setzen." },
    kern: ["Das Werkzeug schreibt einen Entwurf, keinen Vorgang.", "Namen, Zahlen und Verneinungen gegenhören.", "Weitergabe erst mit Prüfvermerk."],
    glossar: ["Transkription", "Sprachmodell"], glossarOk: true, grundlagen: false,
    verwandt: ["ergebnis-pruefen", "halluzinationen"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht",
    kommentare: [
      { name: "T. Hoffmann", meta: "KPB Borken · vor 4 Tagen", text: "Bei Hintergrundgeräuschen wich das Transkript stark ab. Der Gegencheck an den Zahlen hat das aufgefangen." },
      { name: "Unbekannt", meta: "vor 1 Tag", text: "Das Transkript einfach übernehmen, der Gegencheck ist übertrieben.", gemeldet: true }
    ]
  }),
  inhalt({
    id: "sprachmodelle", titel: "Grundlagen KI: Wie Sprachmodelle Texte erzeugen",
    teaser: "Das Grundprinzip in drei Schritten — und warum eine flüssige Antwort allein nichts beweist.",
    format: "Lernmodul", formatKey: "lernmodul", niveau: "basis", dauerMin: 25,
    ergebnis: "Sie beantworten eine Frage zum Grundprinzip und prüfen die Lösung selbst.",
    geprueft: "2026-10-02", fassung: "4", felder: ["Ermittlung", "Führung", "Verwaltung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["grundlagen"], ziel: ["ermittlung", "fuehrung", "verwaltung"], medien: "h5p", anwendungsbezogen: false, grundlagen: true,
    lernziel: "Verstehen, dass ein Sprachmodell wahrscheinliche Folgen bildet und die Aussage nicht selbst prüft.",
    geltungsbereich: "Alle Beschäftigten, unabhängig vom Tätigkeitsfeld. Anschlussfähig als Qualifizierungsnachweis.",
    praxis: null,
    schritte: [
      { t: "Eine Anweisung in drei Teilen lesen", d: "Kontext, Aufgabe, Form des Ergebnisses." },
      { t: "Die Frage im interaktiven Element beantworten", d: "Das Element entspricht einem H5P-Inhaltstyp Frage." },
      { t: "Die Rückmeldung mit dem Merkblatt vergleichen", d: "Das sichtbare Ergebnis ist Ihre eigene Einordnung, nicht eine Note." }
    ],
    fehler: { text: "Eine flüssige Antwort für geprüft halten.", korrektur: "Flüssigkeit ist das Ziel des Modells. Die Prüfung bleibt bei Ihnen. Dafür ist der nächste Inhalt da." },
    kern: ["Das Modell schlägt wahrscheinliche Formulierungen vor.", "Es prüft nicht, ob die Aussage stimmt.", "Deshalb folgt auf jede Nutzung ein Prüfschritt."],
    glossar: ["Sprachmodell", "Prompt", "Halluzination"], glossarOk: true,
    h5p: {
      frage: "Warum beweist eine flüssige Antwort noch nichts?",
      optionen: [
        { t: "Weil das Modell wahrscheinliche Wortfolgen bildet und die Aussage nicht selbst prüft.", ok: true },
        { t: "Weil eine lange Antwort immer falsch ist.", ok: false },
        { t: "Weil ein Sprachmodell keinen Text erzeugen kann.", ok: false }
      ],
      hinweis: "Richtig ist die erste Aussage. Länge und Ton sagen nichts über die Richtigkeit."
    },
    verwandt: ["halluzinationen", "ergebnis-pruefen"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht",
    kommentare: []
  }),
  inhalt({
    id: "eu-ki", titel: "EU-KI-Verordnung, Artikel 4: Was gilt für meine Rolle?",
    teaser: "Die Qualifizierungspflicht verständlich eingeordnet — nach Aufgabenbereich und Verantwortung.",
    format: "Wissensartikel", formatKey: "artikel", niveau: "aufbau", dauerMin: 6,
    ergebnis: "Sie sehen, welche Grundlage für Ihre Rolle gilt und wo die maßgebliche Regelung steht.",
    geprueft: "2026-01-15", fassung: "2", felder: ["Ermittlung", "Führung", "Verwaltung"], werkzeug: "Keins", werkzeugKey: "keins",
    thema: ["recht"], ziel: ["ermittlung", "fuehrung", "verwaltung"], medien: "text", anwendungsbezogen: false, grundlagen: true, pflicht: true,
    lernziel: "Artikel 4 der EU-KI-Verordnung der eigenen Rolle zuordnen, ohne die Regelung zu ersetzen.",
    geltungsbereich: "Beschäftigte mit Berührung zu KI-Systemen. Anschlussfähig als Qualifizierungsnachweis.",
    praxis: null,
    schritte: [
      { t: "Die Pflicht an der Aufgabe festmachen, nicht an der Dienstbezeichnung", d: "Wer ein System nutzt oder verantwortet, braucht das passende Grundlagenwissen." },
      { t: "Die interne Regelung als maßgebliche Quelle öffnen", d: "Dieser Artikel ersetzt sie nicht. Er ordnet sie nur ein." }
    ],
    fehler: null,
    kern: ["Artikel 4 betrifft die Qualifizierung der Personen, die KI nutzen.", "Der Umfang hängt von Aufgabe und Verantwortung ab.", "Verbindlich bleibt die interne Regelung."],
    glossar: ["EU-KI-Verordnung", "Niveaustufe"], glossarOk: true,
    verwandt: ["sprachmodelle", "grenzen-daten"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht",
    kommentare: []
  }),
  inhalt({
    id: "prompt", titel: "Prompt-Engineering I: Präzise Anfragen für Auswertungen",
    teaser: "Vom vagen Auftrag zur brauchbaren Antwort — mit Beispielen aus der Sachbearbeitung.",
    format: "Video", formatKey: "video", niveau: "aufbau", dauerMin: 12,
    ergebnis: "Sie formulieren eine Anweisung mit Kontext, Aufgabe und gewünschter Form.",
    geprueft: "2026-08-20", fassung: "5", felder: ["Ermittlung", "Verwaltung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["grundlagen"], ziel: ["ermittlung", "verwaltung"], medien: "poltube", anwendungsbezogen: true,
    lernziel: "Eine auswertbare Anweisung in eine Reihenfolge bringen.",
    geltungsbereich: "Sachbearbeitung mit freigegebenem Sprachmodell.",
    praxis: { rolle: "Sachbearbeitung", taetigkeit: "Eine Auswertung anweisen", nutzen: "Die Antwort wird brauchbarer, weil Aufgabe und Form klar sind", grenze: "Auch eine gute Anweisung erzeugt keinen Beleg. Die Prüfung bleibt." },
    schritte: [
      { t: "Zuerst den Kontext, dann die Aufgabe", d: "Was liegt vor, was soll entstehen, für wen." },
      { t: "Die Form festlegen", d: "Länge, Gliederung, was nicht verändert werden darf." },
      { t: "Die Antwort an zwei Aussagen des Ausgangstexts prüfen", d: "Siehe den Artikel zu Halluzinationen." }
    ],
    fehler: { text: "Nur „fass das mal zusammen“ schreiben.", korrektur: "Kontext zuerst, dann die Aufgabe, dann die Form. Das ist der häufigste Stolperstein, und er ist normal." },
    kern: ["Kontext vor der Aufgabe.", "Form des Ergebnisses mitgeben.", "Antwort gegen den Ausgangstext halten."],
    glossar: ["Prompt", "Sprachmodell", "Halluzination"], glossarOk: true,
    verwandt: ["halluzinationen", "berichte"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht",
    kommentare: [
      { name: "M. Kaminski", meta: "PP Dortmund · vor 2 Tagen", text: "Beim ersten Versuch kam bei mir nur Unbrauchbares raus — lag an meinem Prompt, nicht am System. Mit dem Beispiel aus Minute 4 hat es dann funktioniert. Falls jemand denselben Fehler macht: Kontext zuerst, dann die Aufgabe." },
      { name: "J. Weber", meta: "LZPD NRW · vor 2 Tagen", text: "Guter Hinweis — das ist der häufigste Stolperstein. Genau dafür ist die Werkstatt da: ausprobieren, danebenliegen, besser machen. Ergänzend lohnt sich der Artikel zu Halluzinationen als Gegenprobe." },
      { name: "S. Brandt", meta: "KPB Kleve · vor 5 Tagen", text: "Kurze Verständnisfrage: Gilt die Struktur aus dem Video auch für Zusammenfassungen längerer Berichte, oder braucht es da einen anderen Aufbau?" }
    ]
  }),
  inhalt({
    id: "sprachanalyse", titel: "KI-gestützte Sprachanalyse im Ermittlungsverfahren",
    teaser: "Aufzeichnung einer Session mit Fachleuten aus Technik und Recht — Fragen aus der Praxis inklusive.",
    format: "Aufzeichnung", formatKey: "live", niveau: "spezial", dauerMin: 45,
    ergebnis: "Sie kennen die Fragen, die vor einem Einsatz in der eigenen Dienststelle geklärt sein müssen.",
    geprueft: "2026-06-12", fassung: "1", felder: ["Ermittlung"], werkzeug: "Auswertung", werkzeugKey: "auswertung",
    thema: ["einsatzfelder"], ziel: ["ermittlung"], medien: "poltube", anwendungsbezogen: true,
    lernziel: "Einen Spezialfall einordnen, ohne ihn als Pflichtweg zu verstehen.",
    geltungsbereich: "Ermittlung, frei wählbar. Die Stufe Spezial sperrt niemanden aus.",
    praxis: { rolle: "Ermittlung", taetigkeit: "Sprachanalyse einordnen", nutzen: "Die Fragen aus Technik und Recht stehen an einem Ort", grenze: "Die Aufzeichnung ersetzt weder die Regelung noch die Entscheidung im Verfahren." },
    schritte: [
      { t: "Die beiden Leitfragen notieren", d: "Welches Werkzeug ist freigegeben, und wer prüft das Ergebnis?" },
      { t: "Offene Punkte an die Redaktion melden", d: "Dafür gibt es den Meldebutton, nicht ein Forum." }
    ],
    fehler: null,
    kern: ["Spezialwissen bleibt frei wählbar.", "Die Regelung der Dienststelle bleibt maßgeblich."],
    glossar: ["Anwendungsfeld", "Niveaustufe"], glossarOk: true,
    verwandt: ["transkription", "eu-ki"], autor: "J. Weber", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "halluzinationen", titel: "Halluzinationen erkennen: Drei Prüfschritte für den Alltag",
    teaser: "Woran Sie überzeugend klingende, aber falsche Antworten erkennen — und wie Sie reagieren.",
    format: "Wissensartikel", formatKey: "artikel", niveau: "basis", dauerMin: 5,
    ergebnis: "Drei Prüfschritte, die Sie an einer Antwort selbst anwenden können.",
    geprueft: "2026-09-01", fassung: "3", felder: ["Ermittlung", "Führung", "Verwaltung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["grundlagen", "ethik"], ziel: ["ermittlung", "fuehrung", "verwaltung"], medien: "text", anwendungsbezogen: true, grundlagen: true,
    lernziel: "Eine überzeugend falsche Antwort erkennen und korrigieren.",
    geltungsbereich: "Alle Beschäftigten mit Sprachmodell.",
    praxis: { rolle: "Sachbearbeitung", taetigkeit: "Einen Entwurf gegen die Quelle halten", nutzen: "Fehler fallen vor der Weitergabe auf", grenze: "Die drei Schritte ersetzen kein Fachurteil." },
    schritte: [
      { t: "Quellenbezug prüfen", d: "Steht die Aussage im Ausgangsmaterial?" },
      { t: "Namen, Daten, Zahlen gegenlesen", d: "Dort reißen erfundene Details besonders oft ein." },
      { t: "Unsicheres kennzeichnen statt glätten", d: "Eine Lücke im Entwurf ist besser als eine erfundene Sicherheit." }
    ],
    fehler: { text: "Die unsichere Stelle umformulieren, damit sie sicherer klingt.", korrektur: "Kennzeichnen Sie die Lücke. Glätten verdeckt den Fehlversuch, statt ihn zu korrigieren." },
    kern: ["Quelle, Zahlen, Lücken.", "Ein Fehlversuch ist normal.", "Kennzeichnen statt glätten."],
    glossar: ["Halluzination", "Sprachmodell"], glossarOk: true,
    verwandt: ["sprachmodelle", "ergebnis-pruefen"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "impuls-auswertung", titel: "Wie wir im Ermittlungsteam die Auswertung umgestellt haben",
    teaser: "Erfahrungsbericht aus vier Monaten Praxis — einschließlich des ersten Fehlversuchs.",
    format: "Impuls", formatKey: "impuls", niveau: "basis", dauerMin: 45,
    ergebnis: "Sie sehen einen realen Ablauf mit Nutzen und Grenze, erzählt aus dem Dienstalltag.",
    geprueft: "2026-07-28", fassung: "2", felder: ["Ermittlung"], werkzeug: "Auswertung", werkzeugKey: "auswertung",
    thema: ["einsatzfelder"], ziel: ["ermittlung"], medien: "poltube", anwendungsbezogen: true, impuls: true,
    lernziel: "Einen Praxiswechsel einschließlich des ersten Fehlversuchs nachvollziehen.",
    geltungsbereich: "Ermittlung. Der Beitrag ist ein Praxisimpuls, kein Lehrsatz.",
    praxis: { rolle: "Ermittlungsteam", taetigkeit: "Auswertung umstellen", nutzen: "Das Team arbeitet an einem gemeinsamen Prüfablauf", grenze: "Was in einer Dienststelle trug, ist kein Muster für jede andere." },
    schritte: [
      { t: "Den ersten Fehlversuch anhören", d: "Das Team hatte Ergebnisse zu früh weitergegeben." },
      { t: "Die Kurskorrektur notieren", d: "Seitdem bleibt ein Prüfschritt vor jeder Weitergabe." }
    ],
    fehler: { text: "Den ersten Entwurf als fertige Auswertung behandeln.", korrektur: "Der Fehlversuch war der Anlass für den Prüfschritt. Er wird hier gezeigt, nicht versteckt." },
    kern: ["Praxisimpuls aus dem Dienst, nicht aus der Lehre.", "Der Fehlversuch gehört dazu.", "Übertragbarkeit hat eine Grenze."],
    glossar: ["Praxisimpuls", "Anwendungsfeld"], glossarOk: true,
    verwandt: ["berichte", "transkription"], autor: "T. Hoffmann", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "fuehrung", titel: "KI im eigenen Bereich einführen: Was Führungskräfte vorab klären sollten",
    teaser: "Von der Erwartungshaltung bis zum Umgang mit Skepsis im Team — in fünf Schritten.",
    format: "Lernmodul", formatKey: "lernmodul", niveau: "aufbau", dauerMin: 30,
    ergebnis: "Eine Liste der Punkte, die vor dem Rollout geklärt sein müssen.",
    geprueft: "2026-08-04", fassung: "2", felder: ["Führung"], werkzeug: "Keins", werkzeugKey: "keins",
    thema: ["grundlagen"], ziel: ["fuehrung"], medien: "text", anwendungsbezogen: true,
    lernziel: "Den Rollout an Regelung, Erwartung und Skepsis im Team vorbeiführen.",
    geltungsbereich: "Führungskräfte, die ein Werkzeug in ihrem Bereich einführen.",
    praxis: { rolle: "Führung", taetigkeit: "Ein freigegebenes Werkzeug im eigenen Bereich einführen", nutzen: "Erwartungen und Grenzen stehen, bevor das Team startet", grenze: "Die Führung ersetzt weder die fachliche Freigabe noch die Prüfung im Einzelfall." },
    schritte: [
      { t: "Das freigegebene Werkzeug benennen", d: "Kein Rollout an der Regelung vorbei." },
      { t: "Nutzen und Grenze in einem Satz für das Team sagen", d: "Beides gehört in dieselbe Ansage." },
      { t: "Skepsis als Hinweis behandeln, nicht als Widerstand", d: "Offene Fragen gehen in die FAQ oder an die Redaktion." }
    ],
    fehler: null,
    kern: ["Zuerst die Regelung, dann das Werkzeug.", "Nutzen und Grenze gemeinsam benennen.", "Skepsis ist ein Hinweis."],
    glossar: ["Anwendungsfeld", "Niveaustufe"], glossarOk: true,
    verwandt: ["eu-ki", "grenzen-daten"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "schriftverkehr", titel: "Schriftverkehr und Vermerke: Entlastung im Verwaltungsalltag",
    teaser: "Wo Textbausteine sinnvoll unterstützen — und welche Aufgaben ausdrücklich bei Ihnen bleiben.",
    format: "Video", formatKey: "video", niveau: "basis", dauerMin: 7,
    ergebnis: "Ein Vermerksentwurf mit markierten Stellen, die Sie selbst prüfen.",
    geprueft: "2026-09-30", fassung: "2", felder: ["Verwaltung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["einsatzfelder"], ziel: ["verwaltung"], medien: "poltube", anwendungsbezogen: true,
    lernziel: "Textarbeit entlasten, ohne die Verantwortung abzugeben.",
    geltungsbereich: "Verwaltung.",
    praxis: { rolle: "Verwaltung", taetigkeit: "Einen Vermerk vorstrukturieren", nutzen: "Der erste Aufbau steht schneller", grenze: "Sachverhalt, Wertung und Zeichnung bleiben bei der bearbeitenden Person." },
    schritte: [
      { t: "Nur den erlaubten Textausschnitt verwenden", d: "Was nicht in das Werkzeug gehört, steht im Inhalt dazu." },
      { t: "Gliederung erzeugen lassen, Sachverhalt selbst schreiben", d: "Die Grenze ist bewusst eng." },
      { t: "Markierte Stellen gegen die Akte prüfen", d: "Das ist das sichtbare Ergebnis." }
    ],
    fehler: { text: "Den ganzen Vorgang in ein nicht freigegebenes Werkzeug kopieren, um Zeit zu sparen.", korrektur: "Zeitgewinn zählt nur im freigegebenen Werkzeug und nur für den erlaubten Ausschnitt." },
    kern: ["Gliederung kann unterstützen.", "Sachverhalt und Zeichnung bleiben bei Ihnen.", "Nur das freigegebene Werkzeug."],
    glossar: ["Sprachmodell", "Prompt"], glossarOk: true,
    verwandt: ["berichte", "grenzen-daten"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "verzerrungen", titel: "Verzerrungen in automatisierten Auswertungen erkennen",
    teaser: "Woher systematische Fehler stammen, wie sie sichtbar werden und welche Kontrollen greifen.",
    format: "Wissensartikel", formatKey: "artikel", niveau: "profi", dauerMin: 11,
    ergebnis: "Sie erkennen an einem Beispiel, woran eine systematische Schieflage sichtbar wird.",
    geprueft: "2026-05-20", fassung: "2", felder: ["Ermittlung", "Führung"], werkzeug: "Auswertung", werkzeugKey: "auswertung",
    thema: ["ethik", "recht"], ziel: ["ermittlung", "fuehrung"], medien: "text", anwendungsbezogen: true,
    lernziel: "Systematische Fehler von Einzelfehlern unterscheiden.",
    geltungsbereich: "Ermittlung und Führung. Frei wählbar auf Stufe Profi.",
    praxis: { rolle: "Auswertung", taetigkeit: "Eine automatisierte Trefferliste gegenlesen", nutzen: "Schieflagen fallen früher auf", grenze: "Der Artikel macht die Kontrolle nicht entbehrlich." },
    schritte: [
      { t: "Die Trefferliste an den Rändern lesen, nicht nur die ersten Zeilen", d: "Schieflagen zeigen sich oft dort." },
      { t: "Eine Kontrollfrage außerhalb des Vorschlags stellen", d: "Was fehlt in der Liste?" }
    ],
    fehler: null,
    kern: ["Erste Treffer sind keine vollständige Lage.", "Ränder und Lücken mitlesen."],
    glossar: ["Anwendungsfeld"], glossarOk: true,
    verwandt: ["halluzinationen", "sprachanalyse"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "grenzen-daten", titel: "Was nicht in das Werkzeug gehört",
    teaser: "Eine kurze Grenze vor der ersten Nutzung: welche Angaben draußen bleiben und wo die Regelung steht.",
    format: "Wissensartikel", formatKey: "artikel", niveau: "basis", dauerMin: 6,
    ergebnis: "Sie können an einem Beispiel sagen, was Sie nicht in ein Werkzeug geben.",
    geprueft: "2026-10-12", fassung: "1", felder: ["Ermittlung", "Führung", "Verwaltung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["grundlagen", "recht"], ziel: ["ermittlung", "fuehrung", "verwaltung"], medien: "text", anwendungsbezogen: true, grundlagen: true, pflicht: true,
    lernziel: "Die Grenze der Eingabe vor der ersten Nutzung erkennen.",
    geltungsbereich: "Alle Beschäftigten. Verbindlich ist die maßgebliche Regelung, nicht dieser Artikel.",
    praxis: { rolle: "Beschäftigte ohne KI-Vorerfahrung", taetigkeit: "Vor der ersten Eingabe entscheiden, was draußen bleibt", nutzen: "Der erste Versuch startet im erlaubten Rahmen", grenze: "Dieser Artikel gibt keine Erlaubnis. Er verweist auf die Regelung." },
    schritte: [
      { t: "Die Erlaubnisfrage in der FAQ öffnen", d: "Dort steht die orientierende, gegengezeichnete Antwort und der Verweis." },
      { t: "Vorgangsdaten, Personen und nicht freigegebene Auszüge draußen lassen", d: "Wenn die Gegenzeichnung fehlt, gilt nur der Verweis, ohne orientierende Antwort." }
    ],
    fehler: { text: "Einen Auszug „nur zum Testen“ in ein frei verfügbares Werkzeug geben.", korrektur: "Auch ein Versuch ist eine Nutzung. Es bleibt beim freigegebenen Werkzeug und beim erlaubten Ausschnitt." },
    kern: ["Zuerst die Erlaubnisfrage.", "Vorgangsdaten bleiben draußen.", "Die Regelung ist maßgeblich, der Artikel nur die Orientierung."],
    glossar: ["Sprachmodell", "EU-KI-Verordnung"], glossarOk: true,
    verwandt: ["eu-ki", "schriftverkehr"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "ergebnis-pruefen", titel: "Ergebnisse prüfen, bevor sie weitergehen",
    teaser: "Der eine Schritt, der aus einem Entwurf ein Ergebnis macht, das Sie selbst verantworten können.",
    format: "Lernmodul", formatKey: "lernmodul", niveau: "basis", dauerMin: 8,
    ergebnis: "Ein Entwurf mit drei markierten Prüfstellen und Ihrem Vermerk.",
    geprueft: "2026-10-12", fassung: "1", felder: ["Ermittlung", "Führung", "Verwaltung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["grundlagen"], ziel: ["ermittlung", "fuehrung", "verwaltung"], medien: "h5p", anwendungsbezogen: true, grundlagen: true,
    lernziel: "Einen Entwurf in wenigen Minuten selbst prüfen.",
    geltungsbereich: "Alle Beschäftigten.",
    praxis: { rolle: "Sachbearbeitung", taetigkeit: "Einen Entwurf vor der Weitergabe prüfen", nutzen: "Sie sehen, was das Werkzeug geändert hat", grenze: "Der Vermerk gibt die Verantwortung nicht an das Werkzeug ab." },
    schritte: [
      { t: "Drei Stellen markieren: Zahl, Name, Schlussfolgerung", d: "Nur diese drei, damit es im Arbeitsfluss bleibt." },
      { t: "Die Frage im Element beantworten", d: "Sie prüfen selbst, es gibt keine Benotung." },
      { t: "Den Vermerk in einem Satz schreiben", d: "Was Sie geprüft haben und was offen bleibt." }
    ],
    fehler: { text: "Den Entwurf weitergeben, weil die Frist drückt.", korrektur: "Der Prüfvermerk ist der kürzere Weg: drei Stellen, ein Satz. Der Zeitdruck ist ein bekannter Fehlversuch." },
    kern: ["Drei Stellen reichen für den ersten Prüfschritt.", "Der Vermerk gehört zum Ergebnis.", "Frist macht die Prüfung nicht entbehrlich."],
    glossar: ["Halluzination", "Sprachmodell"], glossarOk: true,
    h5p: {
      frage: "Was gehört zu einem weitergabefähigen Entwurf dazu?",
      optionen: [
        { t: "Drei geprüfte Stellen und ein Vermerk, was noch offen ist.", ok: true },
        { t: "Eine flüssige Formulierung, damit niemand nachfragt.", ok: false },
        { t: "Der Hinweis, das Werkzeug habe den Text freigegeben.", ok: false }
      ],
      hinweis: "Das Werkzeug gibt nichts frei. Der Vermerk ist Ihrer."
    },
    verwandt: ["halluzinationen", "berichte"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "alltag-grenzen", titel: "Wo KI im Arbeitsalltag an Grenzen stößt",
    teaser: "Vier Grenzen, die in jedem Tätigkeitsfeld gelten — knapp genug für den Arbeitstag.",
    format: "Wissensartikel", formatKey: "artikel", niveau: "basis", dauerMin: 7,
    ergebnis: "Sie können Nutzen und Grenze eines Einsatzes in je einem Satz sagen.",
    geprueft: "2026-10-05", fassung: "1", felder: ["Ermittlung", "Führung", "Verwaltung"], werkzeug: "Keins", werkzeugKey: "keins",
    thema: ["grundlagen"], ziel: ["ermittlung", "fuehrung", "verwaltung"], medien: "text", anwendungsbezogen: true, grundlagen: true,
    lernziel: "Nutzen und Grenze zusammen denken.",
    geltungsbereich: "Grundlagenkanon, alle Tätigkeitsfelder.",
    praxis: { rolle: "Beschäftigte/r", taetigkeit: "Vor einem Einsatz Nutzen und Grenze benennen", nutzen: "Die Erwartung wird realistischer", grenze: "Die vier Sätze ersetzen nicht die Regelung zum einzelnen Werkzeug." },
    schritte: [
      { t: "Nutzen in einem Satz", d: "Welche Arbeit wird leichter?" },
      { t: "Grenze in einem Satz", d: "Was bleibt bei der Person?" },
      { t: "Beides stehen lassen", d: "Inhalte arbeiten ohne Drohkulisse und ohne Abwertung der bisherigen Arbeitsweise." }
    ],
    fehler: null,
    kern: ["Nutzen und Grenze gehören zusammen.", "Die bisherige Arbeitsweise wird nicht abgewertet.", "Die Regelung zum Werkzeug bleibt maßgeblich."],
    glossar: ["Niveaustufe", "Anwendungsfeld"], glossarOk: true,
    verwandt: ["grenzen-daten", "sprachmodelle"], autor: "Redaktion KI-Werkstatt", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "berichte", titel: "Berichte zusammenfassen: mein Vorgehen Schritt für Schritt",
    teaser: "Aufgezeichnet am eigenen Arbeitsplatz — einschließlich der Prüfschritte, die vor jeder Weitergabe erfolgen.",
    format: "Impuls", formatKey: "impuls", niveau: "basis", dauerMin: 9,
    ergebnis: "Ein gekürzter Absatz und die Stellen, die Sie gegen den Ausgangstext prüfen.",
    geprueft: "2026-10-20", fassung: "2", felder: ["Verwaltung", "Ermittlung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["einsatzfelder"], ziel: ["verwaltung", "ermittlung"], medien: "poltube", anwendungsbezogen: true, impuls: true, grundlagen: false,
    lernziel: "Einen Bericht in unter zehn Minuten auf einen prüfbaren Entwurf kürzen.",
    geltungsbereich: "Verwaltung und Ermittlung, soweit das Sprachmodell freigegeben ist.",
    praxis: { rolle: "Sachbearbeitung", taetigkeit: "Einen langen Bericht für die Leitung kürzen", nutzen: "Ein erster Entwurf steht in wenigen Minuten", grenze: "Der Ausgangstext bleibt die Quelle. Die Verantwortung für den Inhalt bleibt bei der Person." },
    schritte: [
      { t: "Den erlaubten Ausschnitt wählen", d: "Keine Vorgangsdaten in ein nicht freigegebenes Werkzeug." },
      { t: "Anweisung mit Zweck, Länge und Adressat", d: "Das ist der Prompt: Kontext, Aufgabe, Form." },
      { t: "Absatz gegen den Ausgangstext halten", d: "Zahlen, Namen, Verneinungen." },
      { t: "Prüfvermerk dazuschreiben", d: "Damit ist das Ergebnis sichtbar und selbst geprüft." }
    ],
    fehler: { text: "Die ganze Akte kopieren, weil das Kürzen dann „genauer“ wirkt.", korrektur: "Der kleinere, erlaubte Ausschnitt ist der richtige Weg. Der Fehlversuch ist häufig und kein Grund aufzuhören." },
    kern: ["Nur der erlaubte Ausschnitt.", "Zweck, Länge, Adressat.", "Gegenlesen und Prüfvermerk."],
    glossar: ["Prompt", "Sprachmodell", "Praxisimpuls"], glossarOk: true,
    verwandt: ["schriftverkehr", "ergebnis-pruefen"], autor: "R. Demir", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "skeptikerin", titel: "„Ich war die Skeptikerin im Team“ — ein Erfahrungsbericht",
    teaser: "Was den Ausschlag gab, wo die Vorbehalte berechtigt waren und welche Fragen bis heute offen sind.",
    format: "Impuls", formatKey: "impuls", niveau: "basis", dauerMin: 18,
    ergebnis: "Sie hören, welche Vorbehalte berechtigt blieben und welche sich in der Praxis gelegt haben.",
    geprueft: "2026-09-09", fassung: "1", felder: ["Führung", "Verwaltung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["einsatzfelder"], ziel: ["fuehrung", "verwaltung"], medien: "poltube", anwendungsbezogen: true, impuls: true,
    lernziel: "Skepsis als Erfahrung ernst nehmen, nicht als Defizit.",
    geltungsbereich: "Freiwilliger Praxisimpuls.",
    praxis: { rolle: "Teammitglied", taetigkeit: "Den ersten Einsatz im Team begleiten", nutzen: "Vorbehalte werden besprechbar", grenze: "Offene Fragen bleiben offen. Der Beitrag beantwortet sie nicht mit einer Parole." },
    schritte: [
      { t: "Die berechtigten Vorbehalte von den unbelegten trennen", d: "Beides kommt im Beitrag vor." },
      { t: "Eine offene Frage für die FAQ notieren", d: "Wenn sie wiederkehrt, verdichtet die Redaktion sie später. Ein Forum ist dafür im MVP nicht da." }
    ],
    fehler: null,
    kern: ["Skepsis ist ein normaler Einstieg.", "Berechtigte Vorbehalte bleiben sichtbar.", "Offene Fragen werden nicht glattgezogen."],
    glossar: ["Praxisimpuls"], glossarOk: true,
    verwandt: ["fuehrung", "alltag-grenzen"], autor: "A. Lindner", status: "veroeffentlicht", kommentare: []
  }),
  inhalt({
    id: "review-offen", titel: "Protokoll kürzen mit dem internen Sprachmodell",
    teaser: "Eingereichte Lerneinheit, vollständig in den Pflichtmerkmalen, wartet auf Freigabe.",
    format: "Lernmodul", formatKey: "lernmodul", niveau: "basis", dauerMin: 8,
    ergebnis: "Ein gekürzter Protokollabsatz und ein Satz Prüfvermerk.",
    geprueft: "", fassung: "2", vorher: "Fassung 1 wurde zurückgegeben, weil das Ergebnis fehlte.",
    felder: ["Verwaltung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["einsatzfelder"], ziel: ["verwaltung"], medien: "h5p", anwendungsbezogen: true,
    lernziel: "Ein Protokoll auf das Wesentliche kürzen und den Entwurf selbst prüfen.",
    geltungsbereich: "Verwaltung.",
    praxis: { rolle: "Sachbearbeitung", taetigkeit: "Ein Protokoll für die Akte kürzen", nutzen: "Der erste Entwurf ist kürzer und gegliedert", grenze: "Der Protokollinhalt bleibt von der bearbeitenden Person zu verantworten." },
    schritte: [
      { t: "Zweck und Länge in die Anweisung schreiben", d: "Für die Akte, höchstens eine halbe Seite." },
      { t: "Die H5P-Frage zum Prüfvermerk beantworten", d: "Selbst prüfen, ohne Benotung." }
    ],
    fehler: { text: "Kürzen, bis der Sachverhalt leichter klingt, als er ist.", korrektur: "Länge kürzen, Bedeutung stehen lassen. Der Prüfvermerk nennt, was unverändert bleiben muss." },
    kern: ["Kürzen ohne den Sachverhalt zu glätten.", "Prüfvermerk gehört dazu."],
    glossar: ["Prompt", "Sprachmodell"], glossarOk: true,
    h5p: {
      frage: "Was darf beim Kürzen nicht verloren gehen?",
      optionen: [
        { t: "Der Sachverhalt, auch wenn der Text kürzer wird.", ok: true },
        { t: "Die höfliche Einleitung.", ok: false },
        { t: "Möglichst viele Adjektive.", ok: false }
      ],
      hinweis: "Kürzen betrifft die Länge, nicht die Bedeutung."
    },
    verwandt: ["berichte"], autor: "Content Creator (Demo)", autorRolle: "creator", status: "review", kommentare: []
  }),
  inhalt({
    id: "review-luecke", titel: "Lagebild mit einem Sprachmodell",
    teaser: "Entwurf ohne Pflichtmerkmale. Die Freigabe bleibt gesperrt, bis Niveau, Ergebnis, Umfang und Begriffe stehen.",
    format: "Lernmodul", formatKey: "lernmodul", niveau: "", dauerMin: 16,
    ergebnis: "",
    geprueft: "", fassung: "1", felder: [], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["einsatzfelder"], ziel: ["ermittlung"], medien: "text", anwendungsbezogen: true,
    lernziel: "",
    geltungsbereich: "",
    praxis: { rolle: "", taetigkeit: "Lagebild vorformulieren", nutzen: "", grenze: "" },
    schritte: [{ t: "Rohfassung", d: "Noch ohne Einordnung und ohne erklärte Begriffe." }],
    fehler: null, kern: [], glossar: [], glossarOk: false,
    verwandt: [], autor: "Content Creator (Demo)", autorRolle: "creator", status: "review", kommentare: []
  }),
  inhalt({
    id: "entwurf-vermerk", titel: "Vermerk strukturieren",
    teaser: "Eigener Entwurf, noch nicht eingereicht.",
    format: "Lernmodul", formatKey: "lernmodul", niveau: "basis", dauerMin: 8,
    ergebnis: "Ein Vermerk mit Gliederung und offenen Prüfpunkten.",
    geprueft: "", fassung: "1", felder: ["Verwaltung"], werkzeug: "Sprachmodell", werkzeugKey: "sprachmodell",
    thema: ["einsatzfelder"], ziel: ["verwaltung"], medien: "poltube", anwendungsbezogen: true,
    lernziel: "Einen Vermerk so vorbereiten, dass die Sachaussage bei der Person bleibt.",
    geltungsbereich: "Verwaltung.",
    praxis: { rolle: "Verwaltung", taetigkeit: "Vermerk gliedern", nutzen: "Der Aufbau steht, bevor der Sachverhalt geschrieben wird", grenze: "Die Sachaussage wird nicht an das Werkzeug abgegeben." },
    schritte: [{ t: "Gliederung ja, Sachverhalt selbst", d: "Entspricht der Zuordnung: Ablauf als Schrittfolge, Bewertung als eigener Text." }],
    fehler: null,
    kern: ["Gliederung kann das Werkzeug.", "Die Sachaussage bleibt bei Ihnen."],
    glossar: ["Sprachmodell"], glossarOk: true,
    verwandt: ["schriftverkehr"], autor: "Content Creator (Demo)", autorRolle: "creator", status: "entwurf", kommentare: []
  })
];

/* ---------- Einordnung: Typ, Thema, KI-Tool ----------
   Gemeinsame Werteliste für den Editor und die Filter auf Lektionen und Impulse. */
var TYPEN = [
  ["basismodul", "Basismodul", "Grundlagen ohne Vorwissen, kurz und in sich geschlossen."],
  ["anwendungsmodul", "Anwendungsmodul", "Ein Einsatz im Dienstalltag, Schritt für Schritt."],
  ["beitrag", "Beitrag", "Ein Text zu einer Frage, einer Regel oder einer Entwicklung."],
  ["praxisimpuls", "Praxisimpuls", "Ihre Erfahrung aus dem Alltag. Erscheint unter Impulse."],
  ["faq", "FAQ-Eintrag", "Eine häufige Frage mit Antwort. Erscheint unter FAQ."]
];
var THEMEN = [
  ["methodik", "Methodik"],
  ["recht-ethik", "Recht/Ethik"],
  ["daten", "Daten"],
  ["generative-ki", "Generative KI"],
  ["automatisierung", "Automatisierung"],
  ["vibe-coding", "Vibe-Coding"],
  ["uebersetzung-transkription", "Übersetzung/Transkription"]
];
var KI_TOOLS = [
  ["anychat", "AnyChat"],
  ["lingua", "Lingua"],
  ["translate", "Translate"],
  ["visualchat", "VisualChat"]
];
// Zuordnung der vorhandenen Inhalte zu den neuen Werten (vorläufig, redaktionell zu prüfen).
var EINORDNUNG = {
  transkription: ["anwendungsmodul", "uebersetzung-transkription", "lingua"],
  sprachmodelle: ["basismodul", "generative-ki", "anychat"],
  "eu-ki": ["beitrag", "recht-ethik", ""],
  prompt: ["basismodul", "methodik", "anychat"],
  sprachanalyse: ["anwendungsmodul", "daten", "lingua"],
  halluzinationen: ["beitrag", "methodik", "anychat"],
  "impuls-auswertung": ["praxisimpuls", "daten", "visualchat"],
  fuehrung: ["basismodul", "methodik", ""],
  schriftverkehr: ["anwendungsmodul", "generative-ki", "anychat"],
  verzerrungen: ["beitrag", "recht-ethik", "visualchat"],
  "grenzen-daten": ["beitrag", "daten", "anychat"],
  "ergebnis-pruefen": ["basismodul", "methodik", "anychat"],
  "alltag-grenzen": ["beitrag", "methodik", ""],
  berichte: ["praxisimpuls", "generative-ki", "anychat"],
  skeptikerin: ["praxisimpuls", "methodik", "anychat"],
  "review-offen": ["anwendungsmodul", "generative-ki", "anychat"],
  "review-luecke": ["anwendungsmodul", "daten", "anychat"],
  "entwurf-vermerk": ["anwendungsmodul", "generative-ki", "anychat"]
};
var ALT_THEMA = { grundlagen: "methodik", recht: "recht-ethik", ethik: "recht-ethik", einsatzfelder: "generative-ki" };
var ALT_WERKZEUG = { sprachmodell: "anychat", transkription: "lingua", auswertung: "visualchat", keins: "" };

function typUndDauer(c) {
  var art = c.typLabel && c.typ ? c.typLabel : (c.format || "Inhalt");
  return c.dauerMin ? art + " · " + c.dauerMin + " Min." : art;
}

function wertLabel(liste, key) {
  var t = liste.filter(function (w) { return w[0] === key; })[0];
  return t ? t[1] : "";
}

function heuteIso() {
  var d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

// Bringt einen Inhalt auf die neuen Werte. Idempotent: bereits neue Werte bleiben unverändert.
function einordnen(m) {
  var vorgabe = EINORDNUNG[m.id] || [];
  if (istLiveSession(m)) m.typ = "";
  else if (!m.typ) {
    if (vorgabe[0]) m.typ = vorgabe[0];
    else if (m.impuls || m.formatKey === "impuls") m.typ = "praxisimpuls";
    else if (m.formatKey === "artikel") m.typ = "beitrag";
    else if ((m.thema || []).indexOf("grundlagen") >= 0) m.typ = "basismodul";
    else m.typ = "anwendungsmodul";
  }
  var themen = (m.thema || []).filter(Boolean);
  var neu = themen.every(function (t) { return !!wertLabel(THEMEN, t); });
  if (!themen.length || !neu) {
    m.thema = vorgabe[1] ? [vorgabe[1]] : themen.map(function (t) { return ALT_THEMA[t] || t; }).filter(function (t, i, a) { return wertLabel(THEMEN, t) && a.indexOf(t) === i; });
  }
  if (m.werkzeugKey && !wertLabel(KI_TOOLS, m.werkzeugKey)) {
    m.werkzeugKey = vorgabe[2] !== undefined && EINORDNUNG[m.id] ? vorgabe[2] : (ALT_WERKZEUG[m.werkzeugKey] || "");
  }
  m.werkzeugKey = m.werkzeugKey || "";
  m.werkzeug = wertLabel(KI_TOOLS, m.werkzeugKey);
  m.typLabel = wertLabel(TYPEN, m.typ) || "Inhalt";
  m.themaLabel = (m.thema || []).map(function (t) { return wertLabel(THEMEN, t); }).filter(Boolean).join(", ");
  return m;
}

function inhalt(c) {
  c.niveauLabel = c.niveau === "basis" ? "Basis" : c.niveau === "aufbau" ? "Aufbau" : c.niveau === "spezial" ? "Spezial" : c.niveau === "profi" ? "Profi" : "Offen";
  c.dauer = c.dauerMin ? c.dauerMin + " Min." : "Dauer offen";
  c.kommentare = c.kommentare || [];
  c.kern = c.kern || [];
  c.glossar = c.glossar || [];
  return c;
}

function leerZustand() {
  return {
    rolle: "teilnehmende",
    einfach: false,
    behoerde: "LAFP NRW",
    feedback: {},
    kommentare: {},
    kommentarWeg: {},
    kommentarFlags: {},
    meldungen: [],
    status: {},
    override: {},
    eigene: [],
    prominent: "berichte",
    moderationsrechte: { hb: true, jw: true, th: true, rd: false, al: false },
    extra: { start: 0, null: 0, bereits: 0, frage: 0, inhalte: {} },
    fortschritt: {},
    editRechte: {},
    liveTeilnahme: { "live-prompt": true },
    communityMit: { skepsis: true },
    stichprobe: {},
    pruefdatum: {}
  };
}

function laden() {
  var basis = leerZustand();
  try {
    var roh = JSON.parse(localStorage.getItem(STORE) || "{}");
    Object.keys(basis).forEach(function (k) {
      if (roh[k] !== undefined) basis[k] = roh[k];
    });
  } catch (e) { /* Prototyp bleibt mit dem Ausgangsstand nutzbar. */ }
  if (basis.rolle === "beschaeftigte" || basis.rolle === "creator") basis.rolle = "teilnehmende";
  return basis;
}

var state = laden();

function sichern() {
  localStorage.setItem(STORE, JSON.stringify(state));
}

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c];
  });
}

function datum(iso) {
  if (!iso) return "noch nicht geprüft";
  var t = iso.split("-");
  if (t.length !== 3) return iso;
  return t[2] + "." + t[1] + "." + t[0];
}

function alle() {
  var liste = INHALTE.map(anwenden);
  (state.eigene || []).forEach(function (e) {
    if (!INHALTE.some(function (i) { return i.id === e.id; })) liste.push(anwenden(e));
  });
  return liste;
}

function anwenden(c) {
  var o = (state.override && state.override[c.id]) || {};
  var m = Object.assign({}, c, o);
  if (o.praxis) m.praxis = Object.assign({}, c.praxis || {}, o.praxis);
  if (state.status && state.status[c.id]) m.status = state.status[c.id];
  if (state.pruefdatum && state.pruefdatum[c.id]) m.geprueft = state.pruefdatum[c.id];
  m.niveauLabel = m.niveau === "basis" ? "Basis" : m.niveau === "aufbau" ? "Aufbau" : m.niveau === "spezial" ? "Spezial" : m.niveau === "profi" ? "Profi" : "Offen";
  m.dauer = m.dauerMin ? m.dauerMin + " Min." : "Dauer offen";
  m.felder = m.felder || [];
  m.kern = m.kern || [];
  m.glossar = m.glossar || [];
  m.kommentare = c.kommentare || [];
  return einordnen(m);
}

function byId(id) {
  var fund = null;
  alle().some(function (c) { if (c.id === id) { fund = c; return true; } return false; });
  return fund;
}

function authAktiv() {
  return sessionStorage.getItem("kiw-auth") === "1";
}

function mangel(c) {
  var m = [];
  // Dauer, Ergebnis, Lernziel, Praxisbeispiel, Schritte und Begriffe sind keine Pflichtangaben mehr.
  if (!c.niveau) m.push("Niveaustufe fehlt. Genau eine Stufe ist Pflicht.");
  if (!c.felder || !c.felder.length) m.push("Anwendungsfeld fehlt.");
  if (!c.thema || !c.thema.length) m.push("Thema fehlt.");
  if (c.formatKey === "live") {
    if (!c.liveDatum || !c.liveZeit) m.push("Termin fehlt. Datum und Uhrzeit gehören an die Session.");
    return m;
  }
  if (!c.typ) m.push("Art des Inhalts fehlt.");
  return m;
}

function stiftSvg() {
  return "<svg width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 20h9\"/><path d=\"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z\"/></svg>";
}

function stiftKnopf(id, mitText) {
  var klasse = mitText ? "btn-line stift" : "stift";
  var text = mitText ? "<span>Bearbeiten</span>" : "";
  return "<button type=\"button\" class=\"" + klasse + "\" data-action=\"bearbeiten\" data-id=\"" + esc(id) + "\" aria-label=\"Bearbeiten\">" + stiftSvg() + text + "</button>";
}

function ueberfaellig(c) {
  if (!c.geprueft || c.status !== "veroeffentlicht") return false;
  var t = new Date(c.geprueft + "T00:00:00");
  var grenze = new Date("2026-11-02T00:00:00");
  grenze.setDate(grenze.getDate() - 180);
  return t < grenze;
}

function bump(key) {
  state.extra[key] = (state.extra[key] || 0) + 1;
  sichern();
}

function bumpInhalt(id) {
  state.extra.inhalte[id] = (state.extra.inhalte[id] || 0) + 1;
  sichern();
}

function aufrufeInhalt(c) {
  var basis = { transkription: 640, sprachmodelle: 980, "eu-ki": 720, prompt: 1104, sprachanalyse: 340, halluzinationen: 860, "impuls-auswertung": 540, fuehrung: 410, schriftverkehr: 390, verzerrungen: 260, "grenzen-daten": 210, "ergebnis-pruefen": 180, "alltag-grenzen": 150, berichte: 470, skeptikerin: 300 };
  return (basis[c.id] || 40) + ((state.extra.inhalte && state.extra.inhalte[c.id]) || 0);
}

function mitBegriffen(text) {
  var terms = GLOSSAR.map(function (g) { return g.begriff; }).sort(function (a, b) { return b.length - a.length; });
  var src = String(text || "");
  var tokens = [];
  while (src.length) {
    var best = null;
    terms.forEach(function (t) {
      var i = src.indexOf(t);
      if (i >= 0 && (!best || i < best.i || (i === best.i && t.length > best.t.length))) best = { i: i, t: t };
    });
    if (!best) { tokens.push({ k: "t", v: src }); break; }
    if (best.i > 0) tokens.push({ k: "t", v: src.slice(0, best.i) });
    tokens.push({ k: "b", v: best.t });
    src = src.slice(best.i + best.t.length);
  }
  return tokens.map(function (tok) {
    if (tok.k === "t") return esc(tok.v);
    return "<button type=\"button\" class=\"term\" data-begriff=\"" + esc(tok.v) + "\">" + esc(tok.v) + "</button>";
  }).join("");
}

function rolleLabel(r) {
  return { nutzende: "Nutzender", teilnehmende: "Content Creator", redaktion: "Redaktion", admin: "Administration" }[r] || "Content Creator";
}

function rolleHinweis(r) {
  return {
    nutzende: "Nutzender: Sie lernen und können Inhalte betrachten.",
    teilnehmende: "Content Creator: Sie lernen und können Inhalte anlegen.",
    redaktion: "Redaktion: Sie sehen Beiträge, die auf eine Entscheidung warten.",
    admin: "Administration: Sie sehen zusätzlich den Betrieb."
  }[r] || "";
}

function darfBearbeiten() {
  return state.rolle === "teilnehmende" || state.rolle === "redaktion" || state.rolle === "admin";
}

var PERSONEN = [
  { id: "hb", name: "Henning Beckmann", stelle: "LAFP NRW", sitzung: true },
  { id: "jw", name: "J. Weber", stelle: "LZPD NRW" },
  { id: "th", name: "T. Hoffmann", stelle: "KPB Borken" },
  { id: "rd", name: "R. Demir", stelle: "PP Köln" },
  { id: "al", name: "A. Lindner", stelle: "KPB Gütersloh" }
];

function moderationsrecht(id) {
  var rechte = state.moderationsrechte || {};
  return !!rechte[id];
}

function darfFreigeben() {
  if (state.rolle === "admin") return true;
  return state.rolle === "redaktion" && moderationsrecht("hb");
}

var TEILNAHME_START = { sprachmodelle: 1, halluzinationen: 1 };

function istUrheber(c) {
  if (!c) return false;
  if (c.autorId === "hb" || c.autor === "Henning Beckmann") return true;
  return (state.eigene || []).some(function (e) { return e.id === c.id && (!e.autor || e.autor === "Henning Beckmann" || e.autorId === "hb"); });
}

function hatEditRecht(c) {
  if (!c) return false;
  var rechte = (state.editRechte && state.editRechte[c.id]) || {};
  return !!rechte.hb;
}

function kannBearbeitenInhalt(c) {
  return istUrheber(c) || hatEditRecht(c);
}

function fortschrittVon(c) {
  if (!c || kannBearbeitenInhalt(c)) return "";
  var stand = state.fortschritt && state.fortschritt[c.id];
  if (stand === "abgeschlossen" || stand === "begonnen") return stand;
  if (TEILNAHME_START[c.id]) return "begonnen";
  return "";
}

function merkeBegonnen(c) {
  if (!c || c.status !== "veroeffentlicht" || kannBearbeitenInhalt(c)) return;
  if (fortschrittVon(c) === "abgeschlossen") return;
  state.fortschritt = state.fortschritt || {};
  if (state.fortschritt[c.id] === "begonnen") return;
  state.fortschritt[c.id] = "begonnen";
  sichern();
}

function istEigen(c) {
  return kannBearbeitenInhalt(c);
}

function istImpuls(c) {
  return !!(c && (c.impuls || c.formatKey === "impuls"));
}

function istLiveSession(c) {
  return !!(c && c.formatKey === "live" && !istImpuls(c) && c.medien !== "iframe" && c.medien !== "poltube" && c.medien !== "h5p");
}

function istFaqEintrag(c) {
  return !!(c && c.typ === "faq");
}

function istLektion(c) {
  return !!(c && !istImpuls(c) && !istLiveSession(c) && !istFaqEintrag(c));
}

function meinArt(c) {
  if (istUrheber(c)) return "Erstellt";
  if (hatEditRecht(c)) return "Darf bearbeiten";
  return "";
}

/* ---------- Adresse und Browser-Verlauf ----------
   Jede Ansicht bekommt eine Adresse (#/start, #/lektionen …). So funktionieren
   der Zurück-Knopf des Browsers, Neuladen und Lesezeichen. */
var VIEW_SLUG = { home: "start", inhalte: "lektionen", meine: "meine-inhalte", sso: "anmeldung", player: "inhalt" };

function viewZuHash(name) {
  return "#/" + (VIEW_SLUG[name] || name);
}

function hashZuView(hash) {
  var slug = String(hash || "").replace(/^#\/?/, "");
  if (!slug) return "";
  for (var k in VIEW_SLUG) {
    if (VIEW_SLUG[k] === slug) return k;
  }
  return document.getElementById("view-" + slug) ? slug : "";
}

function verlaufMerken(name, opt, umgeleitet) {
  if (!window.history || !history.replaceState) return;
  if (opt.ausVerlauf && !umgeleitet) return;
  var eintrag = {
    view: name,
    aktuell: aktuell,
    detailModus: detailModus,
    playerKurz: playerKurz,
    editorId: editorId,
    herkunft: herkunft ? herkunft.id : "",
    anker: opt.anker || ""
  };
  var alt = history.state;
  var gleich = !!(alt && alt.view === name &&
    (name !== "player" || (alt.aktuell === aktuell && alt.detailModus === detailModus)));
  try {
    if (opt.ersetzen || opt.ausVerlauf || gleich || name === "sso") history.replaceState(eintrag, "", viewZuHash(name));
    else history.pushState(eintrag, "", viewZuHash(name));
  } catch (e) { /* Ohne History-API bleibt die Navigation bedienbar, nur ohne Verlauf. */ }
}

function verlaufWiederherstellen(s) {
  if (!s) return;
  aktuell = s.aktuell || null;
  detailModus = s.detailModus || "lesen";
  playerKurz = !!s.playerKurz;
  editorId = s.editorId || null;
  if (s.herkunft) herkunftSetzen(s.herkunft);
}

function zielAusVerlauf(s) {
  var name = (s && s.view) || hashZuView(location.hash) || "home";
  if (name === "sso" && authAktiv()) name = "home";
  if ((name === "player" || name === "summary") && !aktuell) name = "home";
  return name;
}

function pfadZuruecksetzen() {
  var el = document.getElementById("pfadhinweis");
  if (el && !el.hidden) bereichZurueck("lektion");
}

function showView(name, opt) {
  opt = opt || {};
  var gewuenscht = name;
  if (name !== "sso" && !authAktiv()) name = "sso";
  if (name === "inhalte" && opt.frisch) pfadZuruecksetzen();
  if (name === "editor") { detailModus = "bearbeiten"; name = "player"; }
  if (name === "review") { detailModus = "lesen"; name = "player"; }
  if ((name === "redaktion" || name === "mod-freigabe" || name === "mod-kommentare" || name === "mod-pruefung" || name === "statistik") && !darfFreigeben()) name = "home";
  if ((name === "player" && detailModus === "bearbeiten" || name === "meine" || name === "leitfaden") && !darfBearbeiten()) name = "home";
  if (name === "admin" && state.rolle !== "admin") name = "home";
  document.body.classList.toggle("sso", name === "sso");
  document.querySelectorAll(".view").forEach(function (v) {
    v.hidden = v.id !== "view-" + name;
  });
  if (name === "player") {
    if (detailModus === "bearbeiten") renderEditor(document.getElementById("view-player"));
    else renderPlayer();
  }
  if (name === "summary") renderSummary();
  if (name === "glossar") renderGlossar();
  if (name === "profil") renderProfil();
  if (name === "meine") renderMeine();
  if (name === "redaktion") renderRedaktion();
  if (name === "mod-freigabe" || name === "mod-kommentare" || name === "mod-pruefung") renderModBereich(name.replace("mod-", ""));
  if (name === "statistik") renderStatistik();
  if (name === "admin") renderAdmin();
  if (name === "leitfaden") { /* statisches HTML */ }
  if ((name === "inhalte" || name === "impulse" || name === "live" || name === "community") && typeof window.filtern === "function") window.filtern();
  if (name === "suche") renderSuche();
  if (name === "home") renderStart();
  if (name === "lauf-begonnen" || name === "lauf-abgeschlossen" || name === "impuls-begonnen" || name === "impuls-abgeschlossen") renderFortschritt();
  markNav(name, opt.anker || "");
  verlaufMerken(name, opt, name !== gewuenscht && name !== "player");
  if (opt.anker) {
    var ziel = document.getElementById(opt.anker);
    if (ziel) {
      try { ziel.scrollIntoView({ block: "start" }); } catch (e) { /* Prototyp bleibt bedienbar, auch ohne Scroll-API. */ }
    }
    return;
  }
  try { window.scrollTo(0, 0); } catch (e) { /* siehe oben */ }
  if (!opt.leise) {
    var h = document.querySelector("#view-" + name + " h1, #view-" + name + " h2");
    if (h) { h.setAttribute("tabindex", "-1"); h.focus(); }
  }
}

function markNav(name, anker) {
  var bereich = name;
  if (name === "leitfaden") bereich = "meine";
  else if (name === "player" || name === "summary" || name === "glossar") {
    bereich = (herkunft && herkunft.nav) || (detailModus === "bearbeiten" ? "meine" : "inhalte");
    if (herkunft) anker = herkunft.anker || "";
  }
  if (name === "statistik" || name.indexOf("mod-") === 0) bereich = "redaktion";
  if (name === "lauf-begonnen" || name === "lauf-abgeschlossen") bereich = "inhalte";
  if (name === "impuls-begonnen" || name === "impuls-abgeschlossen") bereich = "impulse";
  document.querySelectorAll("header nav a").forEach(function (a) {
    var an = false;
    if (a.dataset.anker) an = bereich === "inhalte" && anker === a.dataset.anker;
    else if (a.dataset.view === "meine") an = bereich === "meine";
    else an = a.dataset.nav === bereich;
    if (an) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  var btn = document.getElementById("nav-inhalte-btn");
  if (btn) {
    var inhaltAktiv = bereich === "inhalte" || bereich === "meine";
    if (inhaltAktiv) btn.setAttribute("aria-current", "page");
    else btn.removeAttribute("aria-current");
  }
}

/* ---------- Startseite: Bereiche der früheren Fassung ----------
   Inhalte entdecken, Impulse aus der Praxis, Häufige Fragen, Community, Live.
   Alles stammt aus denselben Daten wie die Unterseiten; jeder Bereich führt dorthin weiter. */
var START_LEKTIONEN = 6;
var IMPULS_ART = {
  "impuls-auswertung": ["Live-Session", ""],
  skeptikerin: ["Podcast", "podcast"],
  berichte: ["Tutorial", "tutorial"]
};
var IMPULS_PERSON = {
  "T. Hoffmann": "Impulsgeber · KPB Borken",
  "A. Lindner": "Impulsgeberin · KPB Gütersloh",
  "R. Demir": "Impulsgeber · PP Köln",
  "J. Weber": "Fachexpertin Sprachtechnologie"
};
var HAKEN = "<svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M20 6L9 17l-5-5\"/></svg>";

function kuerzelVon(name) {
  var teile = String(name || "").replace(/\./g, " ").split(/\s+/).filter(Boolean);
  return ((teile[0] || "?").charAt(0) + (teile.length > 1 ? teile[teile.length - 1].charAt(0) : "")).toUpperCase();
}

function startImpulsKarte(c, i) {
  var art = IMPULS_ART[c.id] || ["Impuls", ""];
  return "<button type=\"button\" class=\"imp\" data-open=\"" + esc(c.id) + "\">"
    + "<span class=\"imp-fmt " + art[1] + "\">" + esc(art[0]) + " · " + esc(c.dauer) + "</span>"
    + "<h3>" + esc(c.titel) + "</h3><p>" + esc(c.teaser || "") + "</p>"
    + "<span class=\"imp-person\"><span class=\"c-av " + ["a", "b", "c"][i % 3] + "\">" + esc(kuerzelVon(c.autor)) + "</span>"
    + "<span><span class=\"imp-name\">" + esc(c.autor || "") + "</span>"
    + "<span class=\"imp-role\">" + HAKEN + esc(IMPULS_PERSON[c.autor] || "Impulsgebende Person") + "</span></span></span></button>";
}

function startThread(c) {
  return "<div class=\"thread\" tabindex=\"0\" role=\"button\" data-action=\"community-lesen\"><div class=\"c-av " + esc(c.farbe) + "\">" + esc(c.kuerzel) + "</div><div><h3>" + esc(c.titel) + "</h3><div class=\"t-meta\"><span>" + esc(c.meta) + "</span></div></div></div>";
}

function renderStart() {
  var lektionBox = document.getElementById("start-lektionen");
  if (lektionBox) {
    var lektionen = alle().filter(function (c) {
      return c.status === "veroeffentlicht" && istLektion(c) && !istEigen(c);
    });
    // Noch nicht begonnene Lektionen zuerst; die Reihenfolge innerhalb bleibt wie im Katalog.
    lektionen.sort(function (a, b) { return (fortschrittVon(a) ? 1 : 0) - (fortschrittVon(b) ? 1 : 0); });
    // Ohne Filter: eine Auswahl von START_LEKTIONEN Kacheln. Mit Filter: alle passenden Lektionen, direkt auf der Startseite.
    var info = aktiveFilter("start");
    lektionBox.innerHTML = lektionen.map(kachelMarkup).join("");
    var sichtbar = 0;
    Array.prototype.forEach.call(lektionBox.querySelectorAll(".tile"), function (k) {
      var treffer = passtKarte(k, "start", info.auswahl);
      if (treffer && info.anzahl === 0 && sichtbar >= START_LEKTIONEN) treffer = false;
      k.hidden = !treffer;
      if (treffer) sichtbar++;
    });
    setzeFilterStatus("start", sichtbar, lektionen.length, info.anzahl, "");
    var leerStart = document.getElementById("start-lektionen-leer");
    if (leerStart) leerStart.hidden = sichtbar > 0;
  }

  var impulsBox = document.getElementById("start-impuls-liste");
  if (impulsBox) {
    var impulse = alle().filter(function (c) {
      return c.status === "veroeffentlicht" && istImpuls(c) && !istEigen(c);
    }).slice(0, 3);
    impulsBox.innerHTML = impulse.map(startImpulsKarte).join("");
  }

  var communityBox = document.getElementById("start-community-liste");
  if (communityBox) communityBox.innerHTML = COMMUNITYS.slice(0, 3).map(startThread).join("");

  var liveBox = document.getElementById("start-live-liste");
  if (liveBox) {
    var dabei = state.liveTeilnahme || {};
    var termine = liveTermine();
    var naechste = termine.filter(function (s) { return !dabei[s.id]; })[0];
    liveBox.innerHTML = naechste
      ? liveKarte(naechste, false)
      : (termine[0] ? liveKarte(termine[0], true) : "<p class=\"meta-line\">Zurzeit keine Live-Session.</p>");
  }
}

// Häufige Fragen der Startseite: dieselben Einträge wie auf der FAQ-Seite (ohne die beiden
// Erlaubnisfragen, wie in der früheren Fassung). Einmalig kopiert, vor initFaq().
function initStartFaq() {
  var box = document.getElementById("start-faq-liste");
  if (!box || box.firstChild) return;
  document.querySelectorAll("#view-faq .faq-item").forEach(function (item) {
    if (item.dataset.faq === "erlaubnis" || item.dataset.faq === "reduziert") return;
    var kopie = item.cloneNode(true);
    kopie.removeAttribute("data-faq");
    kopie.dataset.startFaq = "1";
    box.appendChild(kopie);
  });
}

function renderNav() {
  var nav = document.querySelector("header nav");
  if (!nav) return;
  var html = "<div class=\"nav-drop\">" +
    "<button type=\"button\" class=\"nav-drop-btn\" id=\"nav-inhalte-btn\" data-nav-toggle aria-expanded=\"false\" aria-controls=\"nav-inhalte-sub\">Inhalte</button>" +
    "<div class=\"nav-sub\" id=\"nav-inhalte-sub\" hidden>" +
      (darfBearbeiten() ? "<a href=\"#/meine-inhalte\" data-nav=\"meine\" data-view=\"meine\">Meine Inhalte</a>" : "") +
      "<a href=\"#/lektionen\" data-nav=\"inhalte\" data-view=\"inhalte\">Lektionen</a>" +
      "<a href=\"#/impulse\" data-nav=\"impulse\" data-view=\"impulse\">Impulse</a>" +
      "<a href=\"#/live\" data-nav=\"live\" data-view=\"live\">Live-Sessions</a>" +
      "<a href=\"#/community\" data-nav=\"community\" data-view=\"community\">Community</a>" +
    "</div></div>";
  if (darfFreigeben()) html += "<a href=\"#/redaktion\" data-nav=\"redaktion\" data-view=\"redaktion\">Redaktion</a>";
  if (state.rolle === "admin") html += "<a href=\"#/admin\" data-nav=\"admin\" data-view=\"admin\">Administration</a>";
  html += "<a href=\"#/faq\" data-nav=\"faq\" data-view=\"faq\">FAQ</a>";
  nav.innerHTML = html;
  // Nutzender: nur betrachten. Aufrufe zum Anlegen (Impuls anbieten) sind ausgeblendet.
  document.querySelectorAll("#impuls-anbieten, #start-impuls-anbieten").forEach(function (knopf) {
    var cta = knopf.closest(".impulse-cta");
    if (cta) cta.hidden = !darfBearbeiten();
  });
}

function renderProfilKnopf() {
  document.getElementById("profile-name").textContent = "Henning Beckmann";
  document.getElementById("profile-role").textContent = rolleLabel(state.rolle);
  document.getElementById("einfach-toggle").setAttribute("aria-pressed", state.einfach ? "true" : "false");
  document.getElementById("einfach-toggle").classList.toggle("active", !!state.einfach);
  document.body.classList.toggle("einfach", !!state.einfach);
  document.querySelectorAll("[data-rolle]").forEach(function (b) {
    b.classList.toggle("active", b.dataset.rolle === state.rolle);
  });
}

function wendeEinfach() {
  document.querySelectorAll("[data-einfach]").forEach(function (el) {
    if (!el.dataset.standard) el.dataset.standard = el.textContent;
    el.textContent = state.einfach ? el.dataset.einfach : el.dataset.standard;
  });
}

function toast(text) {
  var t = document.getElementById("toast");
  t.textContent = text;
  t.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(function () { t.hidden = true; }, 4200);
}

function dialog(opts) {
  var root = document.getElementById("dialog");
  document.getElementById("dialog-title").textContent = opts.titel;
  document.getElementById("dialog-body").innerHTML = opts.html || "";
  var actions = document.getElementById("dialog-actions");
  actions.innerHTML = "";
  (opts.aktionen || []).forEach(function (a) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = a.zweite ? "btn-line" : "btn-solid";
    b.textContent = a.label;
    b.addEventListener("click", function () { a.fn && a.fn(); if (!a.offen) root.hidden = true; });
    actions.appendChild(b);
  });
  root.hidden = false;
  var first = actions.querySelector("button");
  if (first) first.focus();
}

function dialogZu() {
  document.getElementById("dialog").hidden = true;
}

function oeffneAusbau(titel, text) {
  dialog({
    titel: titel,
    html: "<p>" + text + "</p><p class=\"modal-note\">Im MVP-Entwurf ausdrücklich der späteren Ausbaustufe zugeordnet. Der Prototyp zeigt die Stelle, führt die Funktion aber nicht aus.</p>",
    aktionen: [{ label: "Schließen", zweite: true }]
  });
}

var playerKurz = false;

function spurSchritt(label, view, anker) {
  return { label: label, view: view, anker: anker || "" };
}

function herkunftSetzen(id) {
  var start = spurSchritt("Startseite", "home");
  var katalog = {
    home: { id: "home", nav: "home", anker: "", spur: [start] },
    meine: { id: "meine", nav: "meine", anker: "", spur: [start, spurSchritt("Meine Inhalte", "meine")] },
    allgemein: { id: "allgemein", nav: "inhalte", anker: "", spur: [start, spurSchritt("Lektionen", "inhalte")] },
    begonnen: { id: "begonnen", nav: "inhalte", anker: "", spur: [start, spurSchritt("Lektionen", "inhalte"), spurSchritt("Begonnene Lektionen", "lauf-begonnen")] },
    abgeschlossen: { id: "abgeschlossen", nav: "inhalte", anker: "", spur: [start, spurSchritt("Lektionen", "inhalte"), spurSchritt("Abgeschlossene Lektionen", "lauf-abgeschlossen")] },
    impulse: { id: "impulse", nav: "impulse", anker: "", spur: [start, spurSchritt("Impulse", "impulse")] },
    "impuls-begonnen": { id: "impuls-begonnen", nav: "impulse", anker: "", spur: [start, spurSchritt("Impulse", "impulse"), spurSchritt("Begonnene Impulse", "impuls-begonnen")] },
    "impuls-abgeschlossen": { id: "impuls-abgeschlossen", nav: "impulse", anker: "", spur: [start, spurSchritt("Impulse", "impulse"), spurSchritt("Abgeschlossene Impulse", "impuls-abgeschlossen")] },
    live: { id: "live", nav: "live", anker: "", spur: [start, spurSchritt("Live-Sessions", "live")] },
    community: { id: "community", nav: "community", anker: "", spur: [start, spurSchritt("Community", "community")] },
    suche: { id: "suche", nav: "home", anker: "", spur: [start, spurSchritt("Suche", "suche")] },
    freigabe: { id: "freigabe", nav: "redaktion", anker: "", spur: [start, spurSchritt("Redaktion", "redaktion"), spurSchritt("Zur Freigabe", "mod-freigabe")] },
    kommentare: { id: "kommentare", nav: "redaktion", anker: "", spur: [start, spurSchritt("Redaktion", "redaktion"), spurSchritt("Kommentare", "mod-kommentare")] },
    pruefung: { id: "pruefung", nav: "redaktion", anker: "", spur: [start, spurSchritt("Redaktion", "redaktion"), spurSchritt("Prüfdaten", "mod-pruefung")] },
    faq: { id: "faq", nav: "faq", anker: "", spur: [start, spurSchritt("FAQ", "faq")] }
  };
  herkunft = katalog[id] || katalog.allgemein;
}

function herkunftAusElement(el) {
  if (!el || !el.closest) return "";
  if (el.closest("#view-suche")) return "suche";
  if (el.closest("#view-meine, #inhalte-eigene")) return "meine";
  if (el.closest("#view-impuls-begonnen, #impulse-begonnen")) return "impuls-begonnen";
  if (el.closest("#view-impuls-abgeschlossen, #impulse-abgeschlossen")) return "impuls-abgeschlossen";
  if (el.closest("#view-impulse, #impulse, #impulse-eigene")) return "impulse";
  if (el.closest("#view-mod-freigabe")) return "freigabe";
  if (el.closest("#view-mod-kommentare")) return "kommentare";
  if (el.closest("#view-mod-pruefung")) return "pruefung";
  if (el.closest("#view-lauf-begonnen, #inhalte-begonnen")) return "begonnen";
  if (el.closest("#view-lauf-abgeschlossen, #inhalte-abgeschlossen")) return "abgeschlossen";
  if (el.closest("#view-live, #live")) return "live";
  if (el.closest("#view-community, #community")) return "community";
  if (el.closest("#katalog-grid, .bereich-allgemein")) return "allgemein";
  if (el.closest("#view-faq")) return "faq";
  if (el.closest("#view-home")) return "home";
  return "";
}

function krumenHtml(titel) {
  if (!herkunft) herkunftSetzen("allgemein");
  var spur = herkunft.spur || [];
  var zurueck = spur[spur.length - 1] || spurSchritt("Startseite", "home");
  var ankerAttr = zurueck.anker ? " data-anker=\"" + esc(zurueck.anker) + "\"" : "";
  var back = "<button type=\"button\" class=\"backlink\" data-view-jump=\"" + esc(zurueck.view) + "\"" + ankerAttr + ">← " + esc(zurueck.label) + "</button>";
  var teile = spur.map(function (s) {
    var a = s.anker ? " data-anker=\"" + esc(s.anker) + "\"" : "";
    return "<button type=\"button\" data-view-jump=\"" + esc(s.view) + "\"" + a + ">" + esc(s.label) + "</button>";
  });
  teile.push("<span aria-current=\"page\">" + esc(titel) + "</span>");
  return back + "<nav class=\"krumen\" aria-label=\"Brotkrumen\">" + teile.join("<span class=\"krumen-sep\" aria-hidden=\"true\">/</span>") + "</nav>";
}

function oeffneInhalt(id, kurz, anker, el) {
  var c = byId(id);
  if (!c) return;
  var sichtbar = c.status === "veroeffentlicht" || kannBearbeitenInhalt(c) || darfFreigeben();
  if (!sichtbar) {
    toast("Dieser Inhalt ist noch nicht veröffentlicht.");
    return;
  }
  var gefunden = herkunftAusElement(el);
  if (gefunden) herkunftSetzen(gefunden);
  else if (!herkunft) herkunftSetzen("allgemein");
  aktuell = id;
  playerKurz = !!kurz;
  detailModus = "lesen";
  selbstGeprueft = false;
  if (c.status === "veroeffentlicht") {
    bumpInhalt(id);
    merkeBegonnen(c);
    if (typeof window.filtern === "function") window.filtern();
  }
  showView("player", { anker: anker || "" });
}

function kommentareVon(c) {
  if (!c) return [];
  var basis = (c.kommentare || []).map(function (k, i) {
    return Object.assign({ key: "b" + i }, k);
  });
  var extra = ((state.kommentare && state.kommentare[c.id]) || []).map(function (k, i) {
    return Object.assign({ key: "e" + i }, k);
  });
  var weg = (state.kommentarWeg && state.kommentarWeg[c.id]) || {};
  var flags = (state.kommentarFlags && state.kommentarFlags[c.id]) || {};
  return basis.concat(extra).filter(function (k) { return !weg[k.key]; }).map(function (k) {
    if (flags[k.key]) k.gemeldet = true;
    return k;
  });
}

function kommentarBlock(c) {
  var liste = kommentareVon(c);
  var kommentare = liste.map(function (k) {
    var loesch = (darfFreigeben() || k.eigen)
      ? "<button type=\"button\" class=\"textbtn\" data-action=\"kommentar-loeschen\" data-key=\"" + esc(k.key) + "\" data-id=\"" + esc(c.id) + "\">Löschen</button>"
      : "";
    var melden = k.gemeldet
      ? "<span class=\"st review\">Gemeldet</span>"
      : "<button type=\"button\" class=\"textbtn\" data-action=\"kommentar-melden\" data-key=\"" + esc(k.key) + "\">Melden</button>";
    return "<div class=\"comment\" id=\"kommentar-" + esc(k.key) + "\"><div class=\"c-av a\">" + esc((k.name || "?").slice(0, 1)) + "</div><div class=\"c-body\"><div class=\"c-name\">" + esc(k.name) + " <span>" + esc(k.meta || "gerade eben") + "</span></div><div class=\"c-text\">" + esc(k.text) + "</div><div class=\"c-actions\">" + melden + loesch + "</div></div></div>";
  }).join("");
  var fb = state.feedback[c.id];
  var zahl = liste.length === 1 ? "1 Beitrag" : liste.length + " Beiträge";
  return "<div id=\"kommentar-bereich\" class=\"form-card\"><h2>War das brauchbar?</h2><p class=\"meta-line\">Eine Rückmeldung, ein Klick. Die Redaktion sieht nur die Summe.</p>"
    + "<div class=\"facebtns\"><button type=\"button\" class=\"facebtn" + (fb === "up" ? " active" : "") + "\" data-fb=\"up\" aria-pressed=\"" + (fb === "up" ? "true" : "false") + "\"><span aria-hidden=\"true\">☺</span> Hat mir weitergeholfen</button>"
    + "<button type=\"button\" class=\"facebtn" + (fb === "down" ? " active" : "") + "\" data-fb=\"down\" aria-pressed=\"" + (fb === "down" ? "true" : "false") + "\"><span aria-hidden=\"true\">☹</span> Hat mir nicht weitergeholfen</button></div>"
    + "<div class=\"dhead\"><h2>Kommentar zu diesem Inhalt</h2><span>" + zahl + "</span></div>"
    + (kommentare || "<p class=\"meta-line\">Noch kein Kommentar. Die erste Rückfrage steht unter Ihrem Namen.</p>")
    + "<form class=\"comment-form\" id=\"kommentar-form\"><label class=\"field\"><span>Rückfrage unter Ihrem Namen</span><textarea name=\"text\" required rows=\"3\" placeholder=\"Was ist unklar geblieben?\"></textarea></label><button class=\"btn-solid\" type=\"submit\">Kommentar senden</button></form></div>";
}

function editRechtKasten(c) {
  if (!istUrheber(c)) return "";
  var zeilen = PERSONEN.filter(function (p) { return p.id !== "hb"; }).map(function (p) {
    var rechte = (state.editRechte && state.editRechte[c.id]) || {};
    var an = !!rechte[p.id];
    return "<div class=\"listrow\"><div><strong>" + esc(p.name) + "</strong><div class=\"meta-line\">" + esc(p.stelle) + "</div></div><div>" + (an ? "darf bearbeiten" : "nur lesen") + "</div><button type=\"button\" class=\"btn-line\" data-action=\"edit-recht\" data-person=\"" + esc(p.id) + "\" data-id=\"" + esc(c.id) + "\" aria-pressed=\"" + (an ? "true" : "false") + "\">" + (an ? "Recht entziehen" : "Recht geben") + "</button></div>";
  }).join("");
  return "<div class=\"form-card\"><h2>Wer darf bearbeiten</h2><p>Sie haben den Inhalt erstellt. Andere dürfen ihn nur bearbeiten, wenn Sie das Recht hier vergeben.</p><div class=\"list\">" + zeilen + "</div></div>";
}

function moderationKasten(c) {
  if (!darfFreigeben() || !c || c.status === "veroeffentlicht") return "";
  var punkte = mangel(c);
  var lis = punkte.length
    ? punkte.map(function (p) { return "<li class=\"bad\">" + esc(p) + "</li>"; }).join("")
    : "<li class=\"ok\">Pflichtmerkmale vollständig. Freigabe schaltet den Inhalt sichtbar.</li>";
  return "<div class=\"form-card mod-kasten\" id=\"freigabe-kasten\"><h2>Freigabe</h2><p>Dieselbe Ansicht wie für alle anderen. Hier kommt nur die Entscheidung dazu.</p><ul class=\"pruef\">" + lis + "</ul>"
    + "<label class=\"field\"><span>Begründung, nötig bei Rückgabe</span><textarea id=\"freigabe-grund\" rows=\"3\"></textarea></label>"
    + "<div class=\"button-row\"><button type=\"button\" class=\"btn-line\" data-action=\"zurueckgeben\">Zurückgeben</button>"
    + "<button type=\"button\" class=\"btn-solid\" data-action=\"freigeben\"" + (punkte.length ? " disabled" : "") + ">Freigeben</button></div></div>";
}

function renderPlayer() {
  var c = byId(aktuell);
  var root = document.getElementById("view-player");
  if (!c) { root.innerHTML = "<p>Inhalt nicht gefunden.</p>"; return; }
  var felder = (c.felder || []).join(", ") || "nicht gesetzt";
  var stage = "";
  if (c.medien === "poltube" || c.medien === "iframe") {
    var rahmen = c.iframe
      ? "<iframe class=\"video-frame\" title=\"Video: " + esc(c.titel) + "\" src=\"" + esc(c.iframe) + "\"></iframe>"
      : "<iframe class=\"video-frame\" title=\"Video: " + esc(c.titel) + "\" srcdoc=\"&lt;!DOCTYPE html&gt;&lt;title&gt;Video&lt;/title&gt;&lt;body style='margin:0;background:#0d4a63;color:#fff;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh'&gt;Video&lt;/body&gt;\"></iframe>";
    stage = "<div class=\"stage\"><p class=\"entry-kicker\">Video · iFrame</p>" + rahmen + "<div class=\"transcript\"><h3>Textfassung</h3><p>" + mitBegriffen(c.teaser) + "</p></div></div>";
  } else if (c.medien === "h5p") {
    var h5pDatei = c.dateiname || (c.id + ".h5p");
    var h5pInhalt = (c.h5p)
      ? "<h3 id=\"h5p-frage\">" + esc(c.h5p.frage) + "</h3><div class=\"h5p-options\">" + c.h5p.optionen.map(function (o, i) {
        return "<button type=\"button\" class=\"h5p-opt\" data-h5p=\"" + i + "\">" + esc(o.t) + "</button>";
      }).join("") + "</div><p id=\"h5p-hinweis\" class=\"stage-note\" hidden></p>"
      : "<p>" + mitBegriffen(c.teaser) + "</p>";
    stage = "<div class=\"stage h5p\"><p class=\"entry-kicker\">H5P-Datei</p><p><strong>" + esc(h5pDatei) + "</strong></p>" + h5pInhalt + "</div>";
  } else if (c.formatKey === "live") {
    var termin = (c.liveDatum ? datum(c.liveDatum) : "Termin offen") + (c.liveZeit ? " · " + c.liveZeit : "");
    stage = "<div class=\"stage\"><p class=\"entry-kicker\">Live-Session</p><p><strong>" + esc(termin) + "</strong></p><p>" + mitBegriffen(c.text || c.teaser) + "</p><p class=\"meta-line\">Die Teilnahme lässt sich hier nicht buchen.</p></div>";
  } else {
    stage = "<div class=\"stage\"><p class=\"entry-kicker\">Strukturierter Text</p><p>" + mitBegriffen(c.text || c.teaser) + "</p></div>";
  }
  var praxis = "";
  if (c.praxis && (c.praxis.rolle || c.praxis.taetigkeit)) {
    praxis = "<div class=\"praxis\"><h3>Praxisbeispiel</h3><dl><div><dt>Rolle</dt><dd>" + esc(c.praxis.rolle || "—") + "</dd></div><div><dt>Tätigkeit</dt><dd>" + esc(c.praxis.taetigkeit || "—") + "</dd></div><div><dt>Nutzen</dt><dd>" + esc(c.praxis.nutzen || "—") + "</dd></div><div><dt>Grenze</dt><dd>" + esc(c.praxis.grenze || "—") + "</dd></div></dl></div>";
  }
  var fehler = "";
  if (c.fehler) {
    fehler = "<div class=\"fehler\"><h3>Ein typischer Fehlversuch — der ist normal</h3><p>" + mitBegriffen(c.fehler.text) + "</p><p><strong>Korrektur:</strong> " + mitBegriffen(c.fehler.korrektur) + "</p></div>";
  }
  var schritte = (c.schritte || []).map(function (s, i) {
    return "<li><h3>" + (i + 1) + ". " + esc(s.t) + "</h3><p>" + mitBegriffen(s.d) + "</p></li>";
  }).join("");
  var pflicht = c.pflicht ? "<span class=\"lvl impulstag\">Vor der Nutzung</span>" : "";
  var kanon = c.grundlagen ? "<span class=\"lvl basis\">Grundlagenkanon</span>" : "";
  var status = c.status !== "veroeffentlicht" ? "<span class=\"st " + esc(c.status) + "\">" + esc(statusLabel(c.status)) + "</span>" : "";
  var bearbeiten = darfBearbeiten() && kannBearbeitenInhalt(c) ? stiftKnopf(c.id, true) : "";
  var stand = fortschrittVon(c);
  var lauf = "";
  if (c.status === "veroeffentlicht" && !kannBearbeitenInhalt(c)) {
    lauf = stand === "abgeschlossen"
      ? "<div class=\"button-row\"><span class=\"st veroeffentlicht\">Abgeschlossen</span><button type=\"button\" class=\"btn-line\" data-action=\"fortschritt\" data-stand=\"begonnen\">Wieder als begonnen</button></div>"
      : "<div class=\"button-row\"><button type=\"button\" class=\"btn-line\" data-action=\"fortschritt\" data-stand=\"abgeschlossen\">Als abgeschlossen markieren</button></div>";
  }
  root.innerHTML = krumenHtml(c.titel)
    + "<div class=\"badges\">" + status + (c.niveau ? "<span class=\"lvl " + esc(c.niveau) + "\">" + esc(c.niveauLabel) + "</span>" : "") + kanon + pflicht + "<span class=\"dur\">" + esc(typUndDauer(c)) + "</span></div>"
    + "<div class=\"titelzeile\"><h1>" + esc(c.titel) + "</h1>" + bearbeiten + "</div>"
    + (c.ergebnis ? "<p class=\"ergebnis-zeile\"><strong>Ergebnis:</strong> " + esc(c.ergebnis) + "</p>" : "")
    + (c.dauerMin > 10 ? "<p class=\"banner\">Dieser Bestandseintrag ist länger als zehn Minuten und folgt der bisherigen Kachel. Neu eingereichte Einheiten gibt die Redaktion nur bis zu diesem Richtwert frei.</p>" : "")
    + "<div class=\"form-card\"><h2>Einordnung</h2><dl class=\"gloss\">"
    + (c.typ ? "<div><dt>Art</dt><dd>" + esc(c.typLabel) + "</dd></div>" : "")
    + "<div><dt>Anwendungsfeld</dt><dd>" + esc(felder) + "</dd></div>"
    + "<div><dt>Thema</dt><dd>" + esc(c.themaLabel || "—") + "</dd></div>"
    + "<div><dt>KI-Tool</dt><dd>" + esc(c.werkzeug || "Kein bestimmtes KI-Tool") + "</dd></div>"
    + "<div><dt>Erstellt von</dt><dd>" + esc(c.autor || "—") + "</dd></div>"
    + (c.geaendert ? "<div><dt>Letzte Änderung</dt><dd>" + esc(datum(c.geaendert)) + "</dd></div>" : "")
    + (c.geaendert ? "<div><dt>Einwilligung / Erlaubnis</dt><dd>" + (c.einwilligung ? "erteilt" : "nicht erteilt") + " / " + (c.erlaubnis ? "aktiviert" : "deaktiviert") + "</dd></div>" : "")
    + "<div><dt>Fassung</dt><dd>" + esc(c.fassung || "1") + "</dd></div>"
    + "<div><dt>Geprüft am</dt><dd>" + esc(datum(c.geprueft)) + "</dd></div>"
    + (c.lernziel ? "<div><dt>Lernziel</dt><dd>" + esc(c.lernziel) + "</dd></div>" : "")
    + (c.geltungsbereich ? "<div><dt>Geltungsbereich</dt><dd>" + esc(c.geltungsbereich) + "</dd></div>" : "")
    + "</dl></div>"
    + stage
    + (schritte ? "<ol class=\"steps\">" + schritte + "</ol>" : "")
    + praxis
    + fehler
    + moderationKasten(c)
    + editRechtKasten(c)
    + lauf
    + "<div class=\"button-row\"><button type=\"button\" class=\"btn-line\" data-action=\"zum-kommentar\">Zum Kommentar</button></div>"
    + kommentarBlock(c);
}

function renderSummary() {
  var c = byId(aktuell);
  var root = document.getElementById("view-summary");
  if (!c) { root.innerHTML = ""; return; }
  var kern = (c.kern || []).map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("");
  var verwandt = (c.verwandt || []).map(byId).filter(Boolean).filter(function (v) { return v.status === "veroeffentlicht"; }).map(function (v) {
    return "<button type=\"button\" class=\"rowitem\" data-open=\"" + esc(v.id) + "\"><strong>" + esc(v.titel) + "</strong><span>" + esc(v.dauer) + " · " + esc(v.niveauLabel) + "</span></button>";
  }).join("");
  var nachweis = c.grundlagen ? "<div class=\"ausbau-box\"><h3>Qualifizierungsnachweis</h3><p>Grundlagenmodule sind mit Lernziel, Geltungsbereich und Fassungsstand anschlussfähig. Ein Zertifikat über Moodle und Badges gehören zur späteren Ausbaustufe.</p><button type=\"button\" class=\"btn-line\" disabled>Zertifikat abrufen</button></div>" : "";
  var fb = state.feedback[c.id];
  root.innerHTML = "<button type=\"button\" class=\"backlink\" data-action=\"zurueck-inhalt\">← Zurück zum Inhalt</button>"
    + "<p class=\"eyebrow\">Abschluss</p><h1>Das bleibt hängen</h1>"
    + "<p>" + esc(c.titel) + "</p>"
    + "<ul class=\"summary-list\">" + kern + "</ul>"
    + "<p class=\"meta-line\">" + (selbstGeprueft ? "Sie haben den Prüfschritt markiert." : "Der Prüfschritt ist noch offen. Sie können ihn im Inhalt nachholen.") + "</p>"
    + "<h2>War das brauchbar?</h2><p class=\"meta-line\">Eine Rückmeldung, ein Klick, ohne Freitext. Die Redaktion sieht nur die Summe.</p>"
    + "<div class=\"facebtns\"><button type=\"button\" class=\"facebtn" + (fb === "up" ? " active" : "") + "\" data-fb=\"up\"><span aria-hidden=\"true\">☺</span> Hat mir weitergeholfen</button><button type=\"button\" class=\"facebtn" + (fb === "down" ? " active" : "") + "\" data-fb=\"down\"><span aria-hidden=\"true\">☹</span> Hat mir nicht weitergeholfen</button></div>"
    + (verwandt ? "<h2>Dazu passt</h2><div class=\"rowlist\">" + verwandt + "</div>" : "")
    + nachweis;
}

function renderGlossar() {
  var root = document.getElementById("view-glossar");
  root.innerHTML = "<button type=\"button\" class=\"backlink\" data-action=\"zur-lernansicht\">← Zur Lernansicht</button>"
    + "<p class=\"eyebrow\">Lernoberfläche</p><h1>Glossar</h1>"
    + "<p>Fremdwörter, Abkürzungen und Anglizismen, die in den Inhalten vorkommen. Dieselben Erklärungen liegen an den Begriffen im Text.</p>"
    + "<dl class=\"gloss\">" + GLOSSAR.map(function (g) {
      return "<div><dt>" + esc(g.begriff) + "</dt><dd>" + esc(g.text) + "</dd></div>";
    }).join("") + "</dl>";
}

function renderProfil() {
  var root = document.getElementById("view-profil");
  root.innerHTML = "<button type=\"button\" class=\"backlink\" data-view-jump=\"home\">← Startseite</button>"
    + "<p class=\"eyebrow\">Profil aus dem Behördenkonto</p><h1>Henning Beckmann</h1>"
    + "<p>Name und Konto kommen aus dem Active Directory. Die KI-Werkstatt legt kein zweites Konto an.</p>"
    + "<form id=\"profil-form\" class=\"form-card\">"
    + "<label class=\"field\"><span>Behörde, von Ihnen pflegbar</span><input name=\"behoerde\" value=\"" + esc(state.behoerde) + "\" required></label>"
    + "<label class=\"field\"><span>Oberflächensprache</span><input value=\"Deutsch\" readonly><span class=\"hint\">Die Sprache bleibt im Profil gespeichert. Weitere Sprachen sind in diesem Prototyp nicht hinterlegt.</span></label>"
    + "<label class=\"checkline\"><input type=\"checkbox\" name=\"einfach\" " + (state.einfach ? "checked" : "") + "> Einfache Sprache für die hinterlegten Kurztexte</label>"
    + "<p class=\"hint\">Die automatische Übersetzung in Einfache Sprache per KI gehört zur späteren Ausbaustufe. Hier schalten Sie nur die bereits geschriebenen kurzen Fassungen um.</p>"
    + "<div class=\"button-row\"><button class=\"btn-solid\" type=\"submit\">Angaben speichern</button><button type=\"button\" class=\"btn-line\" data-action=\"passwort\">Zugang zum Behördenkonto</button></div>"
    + "</form>"
    + "<div class=\"ausbau-box\"><h2>Ansprechbarkeit und Personensuche</h2><p>Die freiwillige Kennzeichnung, zu welchen Themen Sie ansprechbar sind, und die Suche nach Personen folgen mit den Foren in der späteren Ausbaustufe.</p><button type=\"button\" class=\"btn-line\" disabled>Themen kennzeichnen</button></div>";
}

function schrittFeld(i, s) {
  s = s || { t: "", d: "" };
  return "<div class=\"schritt-feld\"><label class=\"field\"><span>Schritt " + (i + 1) + "</span><input name=\"schrittTitel\" value=\"" + esc(s.t || "") + "\"></label>"
    + "<label class=\"field\"><span>Was danach sichtbar ist</span><textarea name=\"schrittText\" rows=\"2\">" + esc(s.d || "") + "</textarea></label></div>";
}

function anlageArt(c) {
  if (c) return istLiveSession(c) ? "live" : "inhalt";
  return editorVorgabe === "live" ? "live" : "inhalt";
}

function auswahlFeld(label, name, wert, optionen, leer) {
  return "<label class=\"field\"><span>" + label + "</span><select name=\"" + name + "\">"
    + (leer ? "<option value=\"\"" + (!wert ? " selected" : "") + ">" + leer + "</option>" : "")
    + optionen.map(function (o) {
      return "<option value=\"" + o[0] + "\"" + (wert === o[0] ? " selected" : "") + ">" + o[1] + "</option>";
    }).join("") + "</select></label>";
}

function renderEditor(root) {
  var c = editorId ? byId(editorId) : null;
  root = root || document.getElementById("view-editor");
  if (!root) return;
  var art = anlageArt(c);
  var vorgabeTyp = editorVorgabe === "impuls" ? "praxisimpuls" : "basismodul";
  var v = c || { titel: "", typ: vorgabeTyp, niveau: "basis", felder: [], thema: [], werkzeugKey: "", medien: "text", iframe: "", text: "", dateiname: "", liveDatum: "", liveZeit: "", einwilligung: false, erlaubnis: false };
  editorVorgabe = "";
  var medien = v.medien === "poltube" ? "iframe" : v.medien;
  if (medien !== "h5p" && medien !== "iframe") medien = "text";
  var ueberschrift = art === "live"
    ? (c ? "Live-Session bearbeiten" : "Neue Live-Session starten")
    : (c ? "Inhalt bearbeiten" : "Neuen Inhalt anlegen");
  var einleitung = art === "live"
    ? "Sie legen Thema und Termin an. Nach der Freigabe bleibt der Termin unter Meine Inhalte. Unter Live-Sessions stehen die Termine, an denen andere teilnehmen können."
    : "Wählen Sie, was Sie anlegen. Eine Lernaktivität ist freiwillig. Nach der Freigabe erscheint der Inhalt je nach Art unter Lektionen, Impulse oder FAQ.";

  var inhaltBlock = art === "live"
    ? "<input type=\"hidden\" name=\"medien\" value=\"text\"><div class=\"field-row\">"
      + "<label class=\"field\"><span>Datum</span><input name=\"liveDatum\" type=\"date\" value=\"" + esc(v.liveDatum || "") + "\"></label>"
      + "<label class=\"field\"><span>Uhrzeit</span><input name=\"liveZeit\" type=\"time\" value=\"" + esc(v.liveZeit || "") + "\"></label></div>"
      + "<label class=\"field\"><span>Worum es geht</span><textarea name=\"text\" rows=\"5\">" + esc(v.text || "") + "</textarea></label>"
    : "<fieldset class=\"niveaus\"><legend>Was legen Sie an?</legend>"
      + TYPEN.map(function (t) {
        return "<label><input type=\"radio\" name=\"typ\" value=\"" + t[0] + "\"" + (v.typ === t[0] ? " checked" : "") + "><strong>" + t[1] + "</strong><span>" + t[2] + "</span></label>";
      }).join("")
      + "</fieldset>"
      + "<label class=\"field\"><span>Text</span><textarea name=\"text\" rows=\"8\">" + esc(v.text || "") + "</textarea><span class=\"hint\">Bei einem FAQ-Eintrag steht die Frage im Titel und die Antwort hier.</span></label>"
      + "<h2>Lernaktivität hinzufügen</h2>"
      + "<fieldset class=\"niveaus\"><legend>Freiwillig: eine interaktive Aufgabe oder ein Video</legend>"
      + "<label><input type=\"radio\" name=\"medien\" value=\"text\"" + (medien === "text" ? " checked" : "") + "><strong>Keine Lernaktivität</strong><span>Der Inhalt besteht nur aus dem Text.</span></label>"
      + "<label><input type=\"radio\" name=\"medien\" value=\"h5p\"" + (medien === "h5p" ? " checked" : "") + "><strong>H5P-Datei</strong><span>Sie wählen eine Datei. Der Prototyp merkt sich den Namen und führt die Datei nicht aus.</span></label>"
      + "<label><input type=\"radio\" name=\"medien\" value=\"iframe\"" + (medien === "iframe" ? " checked" : "") + "><strong>Video als iFrame</strong><span>Sie setzen die Adresse ein. Eine Videodatei liegt nicht in der Werkstatt.</span></label>"
      + "</fieldset>"
      + "<div id=\"medien-h5p\"><label class=\"field\"><span>H5P-Datei</span><input name=\"datei\" type=\"file\" accept=\".h5p,application/zip\"><span class=\"hint\">Es bleibt der Dateiname. Eine laufende H5P-Aufgabe entsteht hier nicht.</span></label><p id=\"dateiname\" class=\"meta-line\" data-datei=\"" + esc(v.dateiname || "") + "\">" + esc(v.dateiname || "Noch keine Datei gewählt.") + "</p></div>"
      + "<div id=\"medien-video\"><label class=\"field\"><span>Adresse des iFrames</span><input name=\"iframe\" type=\"url\" value=\"" + esc(v.iframe || "") + "\" placeholder=\"https://…\"><span class=\"hint\">Das ist die einzige Video-Form.</span></label></div>";

  var ersteller = (c && c.autor) || "Henning Beckmann";
  var geaendert = (c && (c.geaendert || c.geprueft)) || heuteIso();

  root.innerHTML = krumenHtml(ueberschrift)
    + "<p class=\"eyebrow\">Dieselbe Prüfung für jeden Weg</p><h1>" + ueberschrift + "</h1>"
    + "<p>" + einleitung + "</p>"
    + "<form id=\"editor-form\" class=\"form-card\">"
    + "<input type=\"hidden\" name=\"art\" value=\"" + art + "\">"
    + "<label class=\"field\"><span>Titel</span><input name=\"titel\" required value=\"" + esc(v.titel || "") + "\"></label>"
    + inhaltBlock
    + "<h2>Einordnung</h2>"
    + "<fieldset class=\"niveaus vier\"><legend>Niveaustufe — genau eine</legend>"
    + ["basis", "aufbau", "spezial", "profi"].map(function (n) {
      var label = n === "basis" ? "Basis" : n === "aufbau" ? "Aufbau" : n === "spezial" ? "Spezial" : "Profi";
      var hilfe = n === "basis" ? "Ohne Vorwissen verständlich. Entspricht der Stufe Anfänger." : n === "aufbau" ? "Für Menschen, die KI bereits nutzen. Entspricht Fortgeschritten." : n === "spezial" ? "Vertieft ein Einsatzfeld, bleibt aber frei wählbar. Entspricht Experte. Keine Zugangssperre." : "Für Menschen, die KI-Lösungen selbst entwickeln, betreuen oder anderen vermitteln. Frei wählbar, keine Zugangssperre.";
      return "<label><input type=\"radio\" name=\"niveau\" value=\"" + n + "\"" + (v.niveau === n ? " checked" : "") + "><strong>" + label + "</strong><span>" + hilfe + "</span></label>";
    }).join("") + "</fieldset>"
    + "<fieldset class=\"field\"><legend>Anwendungsfeld</legend>"
    + ["Ermittlung", "Führung", "Verwaltung"].map(function (f) {
      return "<label class=\"checkline\"><input type=\"checkbox\" name=\"feld\" value=\"" + f + "\"" + ((v.felder || []).indexOf(f) >= 0 ? " checked" : "") + "> " + f + "</label>";
    }).join("") + "</fieldset>"
    + auswahlFeld("Thema", "thema", (v.thema || [])[0] || "", THEMEN, "Bitte wählen")
    + auswahlFeld("KI-Tool", "werkzeugKey", v.werkzeugKey || "", KI_TOOLS, "Kein bestimmtes KI-Tool")
    + "<fieldset class=\"field\"><legend>Einwilligung</legend>"
    + "<label class=\"checkline\"><input type=\"checkbox\" name=\"einwilligung\"" + (v.einwilligung ? " checked" : "") + "> Einwilligung erteilt</label></fieldset>"
    + "<label class=\"field\"><span>Name des Erstellers</span><input value=\"" + esc(ersteller) + "\" readonly><span class=\"hint\">Wird vom System gesetzt.</span></label>"
    + "<label class=\"field\"><span>Datum der letzten Änderung</span><input value=\"" + esc(datum(geaendert)) + "\" readonly><span class=\"hint\">Wird beim Speichern vom System gesetzt.</span></label>"
    + "<fieldset class=\"field\"><legend>Erlaubnis</legend>"
    + "<label class=\"checkline\"><input type=\"checkbox\" name=\"erlaubnis\"" + (v.erlaubnis ? " checked" : "") + "> Erlaubnis aktiviert</label><span class=\"hint\">Standardmäßig deaktiviert.</span></fieldset>"
    + "<div class=\"button-row\"><button class=\"btn-line\" type=\"submit\" name=\"ziel\" value=\"entwurf\">Entwurf speichern</button><button class=\"btn-solid\" type=\"submit\" name=\"ziel\" value=\"review\">Zur Prüfung geben</button></div>"
    + "</form>";
  function zeigeMedien() {
    var gewaehlt = root.querySelector("[name=medien]:checked") || root.querySelector("[name=medien]");
    var wert = gewaehlt ? gewaehlt.value : "text";
    var h5p = root.querySelector("#medien-h5p");
    var video = root.querySelector("#medien-video");
    if (h5p) h5p.hidden = wert !== "h5p";
    if (video) video.hidden = wert !== "iframe";
  }
  root.querySelectorAll("[name=medien]").forEach(function (el) {
    el.addEventListener("change", zeigeMedien);
  });
  zeigeMedien();
}

function leseEditor(form, ziel) {
  var data = new FormData(form);
  var alt = editorId ? byId(editorId) : null;
  var art = String(data.get("art") || "inhalt");
  var felder = data.getAll("feld");
  var id = editorId || ("eigen-" + Date.now());
  var medien = String(data.get("medien") || "text");
  if (medien === "poltube") medien = "iframe";
  var typ = art === "live" ? "" : String(data.get("typ") || "basismodul");
  var formatKey;
  var format;
  if (art === "live") { formatKey = "live"; format = "Live-Session"; medien = "text"; }
  else if (typ === "praxisimpuls") { formatKey = "impuls"; format = "Praxisimpuls"; }
  else if (typ === "faq") { formatKey = "faq"; format = "FAQ-Eintrag"; }
  else if (medien === "h5p") { formatKey = "lernmodul"; format = wertLabel(TYPEN, typ); }
  else if (medien === "iframe") { formatKey = "video"; format = wertLabel(TYPEN, typ); }
  else { formatKey = "artikel"; format = wertLabel(TYPEN, typ); }
  var werkzeugKey = String(data.get("werkzeugKey") || "");
  var thema = String(data.get("thema") || "");
  var text = String(data.get("text") || "").trim();
  var obj = {
    id: id,
    titel: String(data.get("titel") || "").trim(),
    teaser: (text || (alt && alt.teaser) || "Eigener Entwurf").slice(0, 180),
    typ: typ,
    format: format,
    formatKey: formatKey,
    impuls: typ === "praxisimpuls",
    niveau: data.get("niveau") || "",
    felder: felder,
    thema: thema ? [thema] : [],
    werkzeugKey: werkzeugKey,
    werkzeug: wertLabel(KI_TOOLS, werkzeugKey),
    ziel: felder.map(function (f) { return f === "Ermittlung" ? "ermittlung" : f === "Führung" ? "fuehrung" : "verwaltung"; }),
    medien: medien,
    einwilligung: data.get("einwilligung") === "on",
    erlaubnis: data.get("erlaubnis") === "on",
    geaendert: heuteIso(),
    text: text,
    iframe: String(data.get("iframe") || "").trim(),
    liveDatum: String(data.get("liveDatum") || "").trim(),
    liveZeit: String(data.get("liveZeit") || "").trim(),
    dateiname: (function () {
      var anzeige = document.getElementById("dateiname");
      if (anzeige && anzeige.dataset.datei) return anzeige.dataset.datei;
      return (alt && alt.dateiname) || "";
    })(),
    // Aus dem Formular entfernte Angaben bleiben bei Bestandsinhalten erhalten.
    dauerMin: (alt && alt.dauerMin) || 0,
    ergebnis: (alt && alt.ergebnis) || "",
    lernziel: (alt && alt.lernziel) || "",
    praxis: (alt && alt.praxis) || { rolle: "", taetigkeit: "", nutzen: "", grenze: "" },
    anwendungsbezogen: alt ? alt.anwendungsbezogen : art !== "live",
    glossarOk: !!(alt && alt.glossarOk),
    glossar: (alt && alt.glossar) || [],
    schritte: (alt && alt.schritte) || [],
    kern: (alt && alt.kern && alt.kern.length) ? alt.kern : ["Entwurf aus der Rolle Content Creator."],
    fehler: alt ? alt.fehler : null,
    verwandt: (alt && alt.verwandt) || [],
    autor: (alt && alt.autor) || "Henning Beckmann",
    autorRolle: (alt && alt.autorRolle) || "creator",
    status: ziel,
    fassung: (alt && alt.fassung) || "1",
    geprueft: (alt && ziel !== "review" && alt.geprueft) || "",
    kommentare: (alt && alt.kommentare) || []
  };
  if (obj.medien === "h5p") {
    obj.h5p = (alt && alt.h5p) || {
      frage: "Haben Sie das Ergebnis gegen die Quelle gehalten?",
      optionen: [
        { t: "Ja. Der Prüfschritt gehört zum Ergebnis.", ok: true },
        { t: "Nein. Eine flüssige Fassung reicht.", ok: false }
      ],
      hinweis: "Ohne Prüfschritt ist die Einheit nicht fertig."
    };
  }
  return obj;
}

function speichereInhalt(obj) {
  var existiert = INHALTE.some(function (i) { return i.id === obj.id; }) || (state.eigene || []).some(function (i) { return i.id === obj.id; });
  if (INHALTE.some(function (i) { return i.id === obj.id; })) {
    state.override[obj.id] = obj;
    state.status[obj.id] = obj.status;
  } else if (existiert) {
    state.eigene = state.eigene.map(function (i) { return i.id === obj.id ? obj : i; });
    state.status[obj.id] = obj.status;
  } else {
    state.eigene.push(obj);
    state.status[obj.id] = obj.status;
  }
  sichern();
  syncKacheln();
}

function renderMeine() {
  renderEigene();
  renderFortschritt();
}

function feedbackSumme(id) {
  var basis = { up: id === "berichte" ? 36 : 12, down: 4 };
  var extra = state.feedback[id];
  if (extra === "up") basis.up += 1;
  if (extra === "down") basis.down += 1;
  return basis;
}

function statusLabel(s) {
  return { entwurf: "Entwurf", review: "Review", freigabe: "Freigabe", veroeffentlicht: "Veröffentlichung" }[s] || s;
}

function kachelMarkup(c) {
  var farbe = "t" + ((String(c.titel || "").length % 6) + 1);
  var n = kommentareVon(c).length;
  var label = n === 1 ? "1 Kommentar" : n + " Kommentare";
  var thema = (c.thema || []).join(" ");
  var ziel = (c.ziel || []).join(" ");
  var geliked = state.feedback[c.id] === "up";
  var art = meinArt(c);
  if (!art) {
    var stand = fortschrittVon(c);
    if (stand === "abgeschlossen") art = "Abgeschlossen";
    else if (stand === "begonnen") art = "Begonnen";
  }
  return "<article class=\"tile " + farbe + "\" tabindex=\"0\" data-id=\"" + esc(c.id) + "\" data-werkzeug=\"" + esc(c.werkzeugKey || "") + "\" data-thema=\"" + esc(thema) + "\" data-typ=\"" + esc(c.typ || "") + "\" data-niveau=\"" + esc(c.niveau || "") + "\" data-zielgruppe=\"" + esc(ziel) + "\">"
    + (darfBearbeiten() && istEigen(c) ? stiftKnopf(c.id, false) : "")
    + "<div class=\"thumb\"><span class=\"fmt\">" + esc(typUndDauer(c)) + "</span></div>"
    + "<div class=\"tile-body\"><div class=\"badges\"><span class=\"lvl " + esc(c.niveau || "basis") + "\">" + esc(c.niveauLabel) + "</span>" + (art ? "<span class=\"st " + esc(c.status) + "\">" + esc(art) + "</span>" : "") + "</div>"
    + "<h3>" + esc(c.titel) + "</h3><p>" + esc(c.teaser || "") + "</p>"
    + "<div class=\"tile-foot\"><button type=\"button\" class=\"likebtn" + (geliked ? " liked" : "") + "\" data-bewerten=\"" + esc(c.id) + "\" aria-pressed=\"" + (geliked ? "true" : "false") + "\" aria-label=\"Hat mir weitergeholfen\"><span class=\"cnt\">" + feedbackSumme(c.id).up + "</span></button>"
    + "<button type=\"button\" class=\"textbtn kommentar-link\" data-open=\"" + esc(c.id) + "\" data-kommentar=\"1\">" + label + "</button></div></div></article>";
}

function verankereKachel(tile) {
  var id = tile.dataset.id;
  var c = byId(id);
  if (!c) return;
  // Filtermerkmale und Kopfzeile kommen aus den Daten (Art, Thema, KI-Tool), nicht aus dem statischen HTML.
  tile.dataset.typ = c.typ || "";
  tile.dataset.thema = (c.thema || []).join(" ");
  tile.dataset.werkzeug = c.werkzeugKey || "";
  tile.dataset.niveau = c.niveau || "";
  tile.dataset.zielgruppe = (c.ziel || []).join(" ");
  var fmt = tile.querySelector(".thumb .fmt");
  if (fmt) fmt.textContent = typUndDauer(c);
  var foot = tile.querySelector(".tile-foot");
  if (!foot) return;
  var n = kommentareVon(c).length;
  var label = n === 1 ? "1 Kommentar" : n + " Kommentare";
  var link = foot.querySelector(".kommentar-link");
  if (!link) {
    var meta = foot.querySelector(".meta-ic");
    if (meta && /Kommentar/.test(meta.textContent)) meta.remove();
    link = document.createElement("button");
    link.type = "button";
    link.className = "textbtn kommentar-link";
    link.dataset.open = id;
    link.dataset.kommentar = "1";
    foot.appendChild(link);
  }
  link.textContent = label;
  var like = foot.querySelector(".likebtn");
  if (like) {
    like.dataset.bewerten = id;
    like.classList.toggle("liked", state.feedback[id] === "up");
    like.setAttribute("aria-pressed", state.feedback[id] === "up" ? "true" : "false");
    like.setAttribute("aria-label", "Hat mir weitergeholfen");
    var cnt = like.querySelector(".cnt");
    if (cnt) cnt.textContent = String(feedbackSumme(id).up);
  }
}

// Veröffentlichte FAQ-Einträge aus dem Editor erscheinen auf der FAQ-Seite (Titel = Frage, Text = Antwort).
function renderFaqEintraege() {
  var liste = document.querySelector("#view-faq .faq-list");
  if (!liste) return;
  liste.querySelectorAll("[data-inhalt-faq]").forEach(function (alt) { alt.remove(); });
  alle().filter(function (c) { return istFaqEintrag(c) && c.status === "veroeffentlicht"; }).forEach(function (c) {
    var item = document.createElement("div");
    item.className = "faq-item";
    item.dataset.faq = "inhalt-" + c.id;
    item.dataset.inhaltFaq = "1";
    item.innerHTML = "<button class=\"faq-q\" aria-expanded=\"false\">" + esc(c.titel) + "<span class=\"plus\">+</span></button>"
      + "<div class=\"faq-a\"><p>" + esc(c.text || c.teaser || "") + "</p><div class=\"faq-fuss\"><p class=\"faq-meta\">" + esc(c.autor || "") + (c.geaendert ? " · zuletzt geändert am " + esc(datum(c.geaendert)) : "") + "</p></div></div>";
    item.querySelector(".faq-q").addEventListener("click", function () {
      if (item.classList.contains("open")) {
        item.classList.remove("open");
        item.querySelector(".faq-a").style.maxHeight = null;
        item.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      } else {
        faqOeffnen(item);
      }
    });
    liste.appendChild(item);
  });
}

function renderEigene() {
  var inhalte = alle().filter(function (c) { return istEigen(c) && (istLektion(c) || istFaqEintrag(c)); });
  var impulse = alle().filter(function (c) { return istEigen(c) && istImpuls(c); });
  var sessions = alle().filter(function (c) { return istEigen(c) && istLiveSession(c); });
  var box = document.getElementById("inhalte-eigene");
  if (box) {
    box.innerHTML = inhalte.length
      ? inhalte.map(kachelMarkup).join("")
      : "<p class=\"meta-line\">Noch keine eigenen Inhalte. Legen Sie oben einen neuen Inhalt an.</p>";
  }
  var ibox = document.getElementById("impulse-eigene");
  if (ibox) {
    ibox.innerHTML = impulse.length ? impulse.map(kachelMarkup).join("") : "<p class=\"meta-line\">Noch kein eigener Impuls. Oben können Sie einen erstellen.</p>";
  }
  var lbox = document.getElementById("live-eigene");
  if (lbox) {
    lbox.innerHTML = sessions.length ? sessions.map(kachelMarkup).join("") : "<p class=\"meta-line\">Noch keine eigene Live-Session.</p>";
  }
}

function renderFortschritt() {
  function liste(stand, art) {
    return alle().filter(function (c) {
      if (c.status !== "veroeffentlicht" || fortschrittVon(c) !== stand) return false;
      return art === "impuls" ? istImpuls(c) : istLektion(c);
    });
  }
  function fuellen(stand, art, boxId, leerId, zahlKlasse) {
    var eintraege = liste(stand, art);
    var box = document.getElementById(boxId);
    var leer = document.getElementById(leerId);
    if (box) box.innerHTML = eintraege.map(kachelMarkup).join("");
    if (leer) leer.hidden = eintraege.length > 0;
    document.querySelectorAll(zahlKlasse).forEach(function (el) { el.textContent = String(eintraege.length); });
  }
  fuellen("begonnen", "lektion", "inhalte-begonnen", "begonnen-leer", ".zahl-begonnen");
  fuellen("abgeschlossen", "lektion", "inhalte-abgeschlossen", "abgeschlossen-leer", ".zahl-abgeschlossen");
  fuellen("begonnen", "impuls", "impulse-begonnen", "impuls-begonnen-leer", ".zahl-impuls-begonnen");
  fuellen("abgeschlossen", "impuls", "impulse-abgeschlossen", "impuls-abgeschlossen-leer", ".zahl-impuls-abgeschlossen");
}

function renderImpulse() {
  renderEigene();
  renderFortschritt();
}

var LIVE_FEST = [
  { id: "live-auswertung", tag: "23.", monat: "Juli", titel: "Fragen & Antworten: KI-gestützte Auswertung in der Praxis", text: "Mit Fachleuten aus Technik und Recht · Donnerstag, 10:00–11:00 Uhr. Die Aufzeichnung liegt danach als Lektion.", thema: "daten", niveau: "spezial", zielgruppe: "ermittlung", werkzeug: "visualchat" },
  { id: "live-prompt", tag: "04.", monat: "Juni", titel: "Sprechstunde: Prompts für Berichte", text: "Offene Stunde für alle Behörden.", thema: "methodik", niveau: "basis", zielgruppe: "verwaltung fuehrung", werkzeug: "anychat" }
];

var COMMUNITYS = [
  { id: "transkript", kuerzel: "TH", farbe: "a", titel: "Transkript weicht stark vom Audio ab — woran kann das liegen?", meta: "T. Hoffmann · KPB Borken · 14 Antworten", thema: "uebersetzung-transkription", zielgruppe: "ermittlung", werkzeug: "lingua" },
  { id: "formulierungen", kuerzel: "RD", farbe: "b", titel: "Welche Formulierungen funktionieren bei der Zusammenfassung längerer Berichte?", meta: "R. Demir · PP Köln · 23 Antworten", thema: "generative-ki", zielgruppe: "verwaltung", werkzeug: "anychat" },
  { id: "skepsis", kuerzel: "AL", farbe: "c", titel: "Erster KI-Einsatz im Team: Was hat bei euch die Skepsis abgebaut?", meta: "A. Lindner · KPB Gütersloh · 31 Antworten", thema: "methodik", zielgruppe: "fuehrung", werkzeug: "" }
];

function liveTermine() {
  var ids = {};
  var liste = LIVE_FEST.map(function (s) {
    ids[s.id] = true;
    return s;
  });
  alle().forEach(function (c) {
    if (!istLiveSession(c) || c.status !== "veroeffentlicht" || istEigen(c) || ids[c.id]) return;
    var tag = "–";
    var monat = "Termin";
    if (c.liveDatum && c.liveDatum.length >= 10) {
      tag = c.liveDatum.slice(8, 10) + ".";
      monat = c.liveDatum.slice(5, 7) + ".";
    }
    liste.push({
      id: c.id, tag: tag, monat: c.liveZeit || monat, titel: c.titel, text: c.teaser || "",
      thema: (c.thema || []).join(" "), niveau: c.niveau || "", zielgruppe: (c.ziel || []).join(" "), werkzeug: c.werkzeugKey || ""
    });
  });
  return liste;
}

function liveKarte(s, dabei) {
  var aktion = dabei
    ? "<span class=\"st veroeffentlicht\">Teilgenommen</span>"
    : "<button class=\"btn-solid\" type=\"button\" data-action=\"live-teilnehmen\" data-id=\"" + esc(s.id) + "\">Teilnehmen</button>";
  return "<div class=\"live\" data-thema=\"" + esc(s.thema || "") + "\" data-niveau=\"" + esc(s.niveau || "") + "\" data-zielgruppe=\"" + esc(s.zielgruppe || "") + "\" data-werkzeug=\"" + esc(s.werkzeug || "") + "\" data-format=\"live\"><div class=\"live-date\"><div class=\"d\">" + esc(s.tag) + "</div><div class=\"m\">" + esc(s.monat) + "</div></div><div class=\"live-info\"><span class=\"tag\"><span class=\"dot\"></span>Live-Session</span><h3>" + esc(s.titel) + "</h3><p>" + esc(s.text) + "</p></div>" + aktion + "</div>";
}

function renderLive() {
  var dabei = state.liveTeilnahme || {};
  var termine = liveTermine();
  var frei = termine.filter(function (s) { return !dabei[s.id]; });
  var mit = termine.filter(function (s) { return !!dabei[s.id]; });
  var boxFrei = document.getElementById("live-verfuegbar-liste");
  var boxMit = document.getElementById("live-teilgenommen-liste");
  var leerFrei = document.getElementById("live-verfuegbar-leer");
  var leerMit = document.getElementById("live-teilgenommen-leer");
  if (boxFrei) boxFrei.innerHTML = frei.map(function (s) { return liveKarte(s, false); }).join("");
  if (boxMit) boxMit.innerHTML = mit.map(function (s) { return liveKarte(s, true); }).join("");
  if (leerMit) leerMit.hidden = mit.length > 0;
  filtereBereichKarten("#live-verfuegbar-liste .live", "live", "live-verfuegbar-leer", "live-filter-leer");
}

function communityKarte(c) {
  var dabei = !!(state.communityMit && state.communityMit[c.id]);
  var knopf = dabei
    ? "<button type=\"button\" class=\"btn-line\" data-action=\"community-mit\" data-id=\"" + esc(c.id) + "\">Nicht mehr mitwirken</button>"
    : "<button type=\"button\" class=\"btn-line\" data-action=\"community-mit\" data-id=\"" + esc(c.id) + "\">Mitwirken</button>";
  return "<div class=\"thread\" tabindex=\"0\" role=\"button\" data-action=\"community-lesen\" data-thema=\"" + esc(c.thema || "") + "\" data-niveau=\"\" data-zielgruppe=\"" + esc(c.zielgruppe || "") + "\" data-werkzeug=\"" + esc(c.werkzeug || "") + "\" data-format=\"community\"><div class=\"c-av " + esc(c.farbe) + "\">" + esc(c.kuerzel) + "</div><div><h3>" + esc(c.titel) + "</h3><div class=\"t-meta\"><span>" + esc(c.meta) + "</span></div>" + knopf + "</div></div>";
}

function renderCommunity() {
  var dabei = state.communityMit || {};
  var mit = COMMUNITYS.filter(function (c) { return !!dabei[c.id]; });
  var frei = COMMUNITYS.filter(function (c) { return !dabei[c.id]; });
  var boxMit = document.getElementById("community-mit-liste");
  var boxFrei = document.getElementById("community-frei-liste");
  var leerMit = document.getElementById("community-mit-leer");
  var leerFrei = document.getElementById("community-frei-leer");
  if (boxMit) boxMit.innerHTML = mit.map(communityKarte).join("");
  if (boxFrei) boxFrei.innerHTML = frei.map(communityKarte).join("");
  if (leerMit) leerMit.hidden = mit.length > 0;
  filtereBereichKarten("#community-frei-liste .thread", "community", "community-frei-leer", "community-filter-leer");
}

function modSammeln() {
  var wartend = alle().filter(function (c) { return c.status === "review" || c.status === "freigabe"; });
  var rows = wartend.map(function (c) {
    return "<button type=\"button\" class=\"rowitem\" data-open=\"" + esc(c.id) + "\"><strong>" + esc(c.titel) + "</strong><span class=\"st " + esc(c.status) + "\">" + esc(statusLabel(c.status)) + "</span><span>Zur Freigabe</span></button>";
  }).join("");
  var gemeldet = [];
  var hinweise = [];
  alle().forEach(function (c) {
    var gemeldetHier = false;
    kommentareVon(c).forEach(function (k) {
      if (!k.gemeldet) return;
      gemeldetHier = true;
      gemeldet.push("<div class=\"listrow\"><div><button type=\"button\" class=\"textbtn\" data-open=\"" + esc(c.id) + "\" data-kommentar=\"1\"><strong>" + esc(c.titel) + "</strong></button><div class=\"meta-line\">Gemeldet · " + esc(k.name) + " · " + esc(k.text) + "</div></div><button type=\"button\" class=\"btn-line\" data-action=\"kommentar-loeschen\" data-key=\"" + esc(k.key) + "\" data-id=\"" + esc(c.id) + "\">Löschen</button></div>");
    });
    var fb = state.feedback[c.id];
    var bewertet = fb === "up" || fb === "down";
    if (bewertet) {
      gemeldet.push("<div class=\"listrow\"><div><button type=\"button\" class=\"textbtn\" data-open=\"" + esc(c.id) + "\" data-kommentar=\"1\"><strong>" + esc(c.titel) + "</strong></button><div class=\"meta-line\">Bewertung · " + (fb === "up" ? "hat weitergeholfen" : "hat nicht weitergeholfen") + "</div></div></div>");
    }
    if (gemeldetHier || bewertet) hinweise.push(c);
  });
  var faelligListe = alle().filter(ueberfaellig);
  var faellig = faelligListe.map(function (c) {
    return "<button type=\"button\" class=\"rowitem\" data-open=\"" + esc(c.id) + "\"><strong>" + esc(c.titel) + "</strong><span>Geprüft am " + esc(datum(c.geprueft)) + "</span></button>";
  }).join("");
  return { wartend: wartend, rows: rows, hinweise: hinweise, gemeldet: gemeldet, faelligListe: faelligListe, faellig: faellig };
}

function modKachel(ziel, zahl, titel, text) {
  return "<button type=\"button\" class=\"hub-tile\" data-view-jump=\"" + ziel + "\">"
    + "<span class=\"zahl-badge\">" + zahl + "</span>"
    + "<span class=\"hub-titel\">" + esc(titel) + "</span>"
    + "<span class=\"hub-text\">" + esc(text) + "</span>"
    + "<span class=\"go\">Bereich öffnen</span></button>";
}

function renderRedaktion() {
  var root = document.getElementById("view-redaktion");
  var daten = modSammeln();
  root.innerHTML = "<button type=\"button\" class=\"backlink\" data-view-jump=\"home\">← Startseite</button>"
    + "<h1>Redaktion</h1>"
    + "<p>Dieselben Inhalte wie für alle anderen. Eine Kachel öffnet genau diesen Bereich.</p>"
    + "<div class=\"hub-grid\">"
    + modKachel("mod-freigabe", daten.wartend.length, "Zur Freigabe", "Inhalte, die auf eine Entscheidung warten. Freigabe schaltet sie sichtbar.")
    + modKachel("mod-kommentare", daten.hinweise.length, "Kommentare", "Inhalte mit einer Bewertung oder einem gemeldeten Kommentar.")
    + modKachel("mod-pruefung", daten.faelligListe.length, "Prüfdaten", "Veröffentlichte Inhalte, deren Prüfdatum älter als ein halbes Jahr ist.")
    + "</div>";
}

function renderModBereich(bereich) {
  var daten = modSammeln();
  var ziel = document.getElementById("view-mod-" + bereich);
  if (!ziel) return;
  var kopf = "<button type=\"button\" class=\"backlink\" data-view-jump=\"redaktion\">← Redaktion</button>";
  if (bereich === "freigabe") {
    ziel.innerHTML = kopf
      + "<h2 id=\"mod-freigabe\">Zur Freigabe</h2><p class=\"meta-line\">" + daten.wartend.length + (daten.wartend.length === 1 ? " Inhalt steht" : " Inhalte stehen") + " an. Der Eintrag öffnet dieselbe Detailansicht.</p>"
      + "<div class=\"rowlist\">" + (daten.rows || "<p>Keine offenen Inhalte.</p>") + "</div>";
    return;
  }
  if (bereich === "kommentare") {
    ziel.innerHTML = kopf
      + "<h2 id=\"mod-kommentare\">Gewertete und gemeldete Kommentare</h2><p class=\"meta-line\">" + daten.hinweise.length + (daten.hinweise.length === 1 ? " Inhalt hat" : " Inhalte haben") + " eine Bewertung oder einen gemeldeten Kommentar.</p><div class=\"list\">" + (daten.gemeldet.join("") || "<p>Keine gemeldeten Kommentare.</p>") + "</div>";
    return;
  }
  ziel.innerHTML = kopf
    + "<h2 id=\"mod-pruefung\">Überfällige Prüfdaten</h2><div class=\"rowlist\">" + (daten.faellig || "<p>Kein Prüfdatum ist älter als ein halbes Jahr.</p>") + "</div>";
}

function renderReview() {
  var c = byId(aktuell);
  var root = document.getElementById("view-review");
  if (!c) { root.innerHTML = "<p>Kein Inhalt gewählt.</p>"; return; }
  var punkte = mangel(c);
  var lis = punkte.length ? punkte.map(function (p) { return "<li class=\"bad\">" + esc(p) + "</li>"; }).join("") : "<li class=\"ok\">Pflichtmerkmale vollständig. Freigabe ist möglich.</li>";
  var gesperrt = punkte.length > 0;
  root.innerHTML = "<button type=\"button\" class=\"backlink\" data-view-jump=\"redaktion\">← Redaktion</button>"
    + "<p class=\"eyebrow\">Qualitätsprüfung</p><h1>" + esc(c.titel) + "</h1>"
    + "<p><span class=\"st " + esc(c.status) + "\">" + esc(statusLabel(c.status)) + "</span> · Fassung " + esc(c.fassung || "1") + " · " + esc(c.autor || "") + "</p>"
    + (c.vorher ? "<p class=\"meta-line\">Frühere Fassung: " + esc(c.vorher) + "</p>" : "")
    + "<ul class=\"pruef\">" + lis + "</ul>"
    + "<dl class=\"gloss\"><div><dt>Niveau</dt><dd>" + esc(c.niveauLabel) + "</dd></div><div><dt>Dauer</dt><dd>" + esc(c.dauer) + "</dd></div><div><dt>Ergebnis</dt><dd>" + esc(c.ergebnis || "—") + "</dd></div><div><dt>Anwendungsfeld</dt><dd>" + esc((c.felder || []).join(", ") || "—") + "</dd></div><div><dt>Begriffe erklärt</dt><dd>" + (c.glossarOk ? "ja" : "nein") + "</dd></div></dl>"
    + "<form id=\"review-form\" class=\"form-card\"><label class=\"field\"><span>Begründung, nötig bei Rückgabe</span><textarea name=\"grund\" rows=\"3\"></textarea></label>"
    + "<div class=\"button-row\">"
    + "<button type=\"button\" class=\"btn-line\" data-action=\"zurueckgeben\">Zurück an Creator</button>"
    + "<button type=\"button\" class=\"btn-line\" data-action=\"freigeben\"" + (gesperrt ? " disabled" : "") + ">Freigeben</button>"
    + "<button type=\"button\" class=\"btn-solid\" data-action=\"veroeffentlichen\"" + (c.status !== "freigabe" || gesperrt ? " disabled" : "") + ">Veröffentlichen</button>"
    + "</div>" + (gesperrt ? "<p class=\"hint\">Freigabe ist gesperrt, solange Pflichtmerkmale fehlen.</p>" : "<p class=\"hint\">Zuerst freigeben, dann veröffentlichen. So bleiben die vier Status sichtbar.</p>")
    + "</form>";
}

function renderStatistik() {
  var root = document.getElementById("view-statistik");
  var start = 18420 + (state.extra.start || 0);
  var p0 = 5310 + (state.extra.null || 0);
  var p1 = 4022 + (state.extra.bereits || 0);
  var p2 = 6104 + (state.extra.frage || 0);
  var zeilen = alle().filter(function (c) { return c.status === "veroeffentlicht"; }).map(function (c) {
    return "<div class=\"listrow\"><div>" + esc(c.titel) + "</div><div>" + aufrufeInhalt(c) + "</div><div>" + feedbackSumme(c.id).up + " / " + feedbackSumme(c.id).down + "</div></div>";
  }).join("");
  root.innerHTML = "<button type=\"button\" class=\"backlink\" data-view-jump=\"redaktion\">← Redaktion</button>"
    + "<p class=\"eyebrow\">Aggregiert, nicht personenbezogen</p><h1>Aufrufzahlen</h1>"
    + "<div class=\"kpi\"><div><strong>" + start + "</strong><span>Einstiegsseite</span></div><div><strong>" + p0 + "</strong><span>Pfad ohne Vorwissen</span></div><div><strong>" + p1 + "</strong><span>Pfad mit Vorkenntnis</span></div><div><strong>" + p2 + "</strong><span>Pfad konkrete Frage</span></div></div>"
    + "<div class=\"listrow head\"><div>Inhalt</div><div>Aufrufe</div><div>Feedback + / −</div></div>" + zeilen;
}

function renderAdmin() {
  var root = document.getElementById("view-admin");
  root.innerHTML = "<p class=\"eyebrow\">Administration</p><h1>Rollen, Rechte, Betrieb</h1>"
    + "<p>Konzeptanzeige für die Umsetzungsstelle. Keine echte Betriebsschnittstelle und keine personenbezogene Verwaltung.</p>"
    + "<nav class=\"wegweiser\" aria-label=\"Zurück in die Arbeit\"><button type=\"button\" data-view-jump=\"inhalte\">Zu den Lektionen</button><button type=\"button\" data-view-jump=\"redaktion\">Zur Redaktion</button></nav>"
    + "<h2>Rollen</h2>"
    + "<div class=\"list\">"
    + rolleZeile("Nutzender", "Lernen und Inhalte betrachten, ohne eigene Inhalte anzulegen", true)
    + rolleZeile("Content Creator", "Lernen und Inhalte anlegen, H5P als Datei, Video als iFrame, Text als Texteingabe", true)
    + rolleZeile("Redaktion", "Review, Freigabe, Veröffentlichung, Einstiegsseite, Aufrufzahlen", true)
    + rolleZeile("Administration", "Rollen, Integrationen, Betrieb", true)
    + rolleZeile("Gegenzeichnende Stelle", "Erlaubnisantworten vor Veröffentlichung", true)
    + rolleZeile("Forenmoderation", "Vorgesehen. Foren folgen in der späteren Ausbaustufe.", false)
    + "</div>"
    + "<p class=\"hint\">Konten kommen aus dem Identity-Management. Hier vergeben Sie nur das Redaktionsrecht, kein neues Konto.</p>"
    + "<h2 id=\"moderationsrechte\">Redaktionsrechte</h2>"
    + "<p>Wer dieses Recht hat, sieht die Freigaben, die gemeldeten Kommentare und die Prüfdaten. Wer es nicht hat, bleibt bei den Inhalten.</p>"
    + "<div class=\"list\">" + PERSONEN.map(function (p) {
      var an = moderationsrecht(p.id);
      return "<div class=\"listrow\"><div><strong>" + esc(p.name) + "</strong><div class=\"meta-line\">" + esc(p.stelle) + (p.sitzung ? " · Konto dieser Sitzung" : "") + "</div></div>"
        + "<div>" + (an ? "Redaktionsrecht" : "kein Redaktionsrecht") + "</div>"
        + "<button type=\"button\" class=\"btn-line\" data-action=\"mod-recht\" data-person=\"" + esc(p.id) + "\" aria-pressed=\"" + (an ? "true" : "false") + "\">" + (an ? "Recht entziehen" : "Recht geben") + "</button></div>";
    }).join("") + "</div>"
    + "<p class=\"hint\">Henning Beckmann ist das Konto dieser Sitzung. Ohne sein Recht verschwindet Redaktion aus der Leiste, sobald die Rolle Redaktion gewählt ist. Administration behält den Zugang.</p>"
    + "<h2 id=\"integrationen\">Integrationen</h2>"
    + "<div class=\"rowlist\">"
    + "<div class=\"rowitem\"><strong>ADFS</strong><span>Anmeldung über das Behördenkonto. Im Prototyp ohne echtes Verzeichnis.</span></div>"
    + "<div class=\"rowitem\"><strong>Video</strong><span>Im MVP nur ein iFrame. Keine Videodatei in der Werkstatt.</span></div>"
    + "<div class=\"rowitem\"><strong>H5P</strong><span>Wird als Datei gepflegt. Inhaltstyp Frage, analog zu Moodle.</span></div>"
    + "<div class=\"rowitem\"><strong>Moodle-Webservice</strong><span>Für Zertifikate der späteren Ausbaustufe vorgesehen, hier nicht angebunden.</span></div>"
    + "<div class=\"rowitem\"><strong>KI-HiPoS</strong><span>Leichte Sprache und Textvorschläge sind spätere Ausbaustufe.</span><button type=\"button\" class=\"btn-line\" disabled>Ergebnisse prüfen</button></div>"
    + "</div>"
    + "<h2 id=\"betrieb\">Betrieb</h2>"
    + "<div class=\"kpi\"><div><strong>Zielbild</strong><span>Verfügbarkeit im vereinbarten Rahmen</span></div><div><strong>Sicherung</strong><span>Regelmäßige Wiederherstellung vorgesehen</span></div><div><strong>Datenschutz</strong><span>Aufrufe nur aggregiert</span></div><div><strong>Protokoll</strong><span>Administrative Änderungen revisionssicher vorgesehen</span></div></div>"
    + "<p>Barrierefreiheit ist Anforderung an alle Oberflächen. Der BITV-Test liegt in der Pilotphase, nicht in diesem Clickdummy. Niveaustufen, Kategorien und Pflichtmetadaten sind die Felder, die Sie in Leitfaden und Freigabe sehen: Niveau, Anwendungsfeld, Dauer, Ergebnis, Prüfdatum, erklärte Begriffe.</p>";
}

function rolleZeile(name, text, aktiv) {
  return "<div class=\"listrow\"><div><strong>" + esc(name) + "</strong></div><div>" + esc(text) + "</div><div>" + (aktiv ? "im MVP" : "<span class=\"ausbau\">später</span>") + "</div></div>";
}

function syncKacheln() {
  var grid = document.getElementById("katalog-grid");
  if (!grid) return;
  alle().forEach(function (c) {
    var vorhandene = grid.querySelector('.tile[data-id="' + c.id + '"]');
    var zeigen = c.status === "veroeffentlicht";
    var original = null;
    INHALTE.some(function (i) { if (i.id === c.id) { original = i; return true; } return false; });
    var neu = !original || original.status !== "veroeffentlicht";
    if (vorhandene && vorhandene.dataset.injected === "1" && !zeigen) vorhandene.remove();
    if (!vorhandene && zeigen && neu) grid.appendChild(kachel(c));
  });
  if (typeof window.filtern === "function") window.filtern();
  sofortKarte();
}

function kachel(c) {
  var art = document.createElement("article");
  art.className = "tile t2";
  art.dataset.id = c.id;
  art.dataset.injected = "1";
  art.dataset.thema = (c.thema || []).join(" ");
  art.dataset.typ = c.typ || "";
  art.dataset.niveau = c.niveau || "";
  art.dataset.zielgruppe = (c.ziel || []).join(" ");
  art.dataset.werkzeug = c.werkzeugKey || "";
  art.tabIndex = 0;
  var n = kommentareVon(c).length;
  var label = n === 1 ? "1 Kommentar" : n + " Kommentare";
  art.innerHTML = "<div class=\"thumb\"><span class=\"fmt\">" + esc(typUndDauer(c)) + "</span></div><div class=\"tile-body\"><div class=\"badges\"><span class=\"lvl " + esc(c.niveau || "basis") + "\">" + esc(c.niveauLabel) + "</span></div><h3>" + esc(c.titel) + "</h3><p>" + esc(c.teaser) + "</p><div class=\"tile-foot\"><span class=\"meta-ic\">Neu veröffentlicht</span><button type=\"button\" class=\"textbtn kommentar-link\" data-open=\"" + esc(c.id) + "\" data-kommentar=\"1\">" + label + "</button></div></div>";
  return art;
}

function sofortKarte() {
  var c = byId(state.prominent) || byId("berichte");
  if (!c) return;
  var t = document.getElementById("sofort-titel");
  var x = document.getElementById("sofort-text");
  var b = document.getElementById("sofort-btn");
  if (t) t.textContent = c.titel;
  if (x) x.textContent = c.teaser;
  if (b) b.dataset.sofort = c.id;
}

function setzeFilter(gruppe, wert, scope) {
  scope = scope || "lektion";
  document.querySelectorAll(".filters[data-scope=\"" + scope + "\"] .chip").forEach(function (c) {
    if (c.dataset.group !== gruppe) return;
    var an = c.dataset.value === wert;
    c.classList.toggle("active", an);
    c.setAttribute("aria-pressed", an ? "true" : "false");
  });
  if (typeof window.filtern === "function") window.filtern();
}

function setzePfad(name) {
  if (name !== "anfang" && name !== "bereits") {
    // Konkrete Frage: direkt zu den häufigen Fragen. Filter und Hinweis der
    // Lektionen-Seite bleiben unberührt, weil dieser Lernweg nicht dorthin führt.
    bump("frage");
    showView("faq");
    toast("Konkrete Frage: Hier stehen die häufigen Fragen. Die Lupe oben durchsucht alle Inhalte.");
    return;
  }
  sucheSeite.lektion = "";
  var feldSuche = document.getElementById("suche-inhalte");
  if (feldSuche) feldSuche.value = "";
  FILTER_GRUPPEN.lektion.forEach(function (g) { setzeFilter(g, "alle", "lektion"); });
  if (name === "anfang") {
    setzeFilter("niveau", "basis");
    setzeFilter("typ", "basismodul");
    bump("null");
    hinweis("Einstiegspfad ohne Vorwissen: Basismodule auf Stufe Basis. Die Stufe beschreibt den Inhalt, nicht Sie.");
  } else {
    setzeFilter("niveau", "aufbau");
    bump("bereits");
    hinweis("Einstiegspfad mit Vorkenntnis: Inhalte der Stufe Aufbau.");
  }
  showView("inhalte", { leise: true });
}

function hinweis(text) {
  var el = document.getElementById("pfadhinweis");
  if (!el) return;
  el.hidden = false;
  el.textContent = text;
}

// Dieselben Bezeichnungen und Werte wie im Editor (Was legen Sie an?, Niveau, Anwendungsfeld, Thema, KI-Tool).
var FILTER_WERTE = {
  typ: ["Art", TYPEN.filter(function (t) { return t[0] !== "praxisimpuls" && t[0] !== "faq"; })],
  niveau: ["Niveau", [["basis", "Basis"], ["aufbau", "Aufbau"], ["spezial", "Spezial"], ["profi", "Profi"]]],
  zielgruppe: ["Anwendungsfeld", [["ermittlung", "Ermittlung"], ["fuehrung", "Führung"], ["verwaltung", "Verwaltung"]]],
  thema: ["Thema", THEMEN],
  werkzeug: ["KI-Tool", KI_TOOLS]
};
var FILTER_GRUPPEN = {
  lektion: ["typ", "niveau", "zielgruppe", "thema", "werkzeug"],
  start: ["typ", "niveau", "zielgruppe", "thema", "werkzeug"],
  impuls: ["niveau", "zielgruppe", "thema", "werkzeug"],
  live: ["niveau", "zielgruppe", "thema", "werkzeug"],
  community: ["zielgruppe", "thema", "werkzeug"]
};
var SUCH_FELD = { lektion: "suche-inhalte", impuls: "suche-impuls", live: "suche-live", community: "suche-community" };

function filterGruppenHtml(scope) {
  return (FILTER_GRUPPEN[scope] || []).map(function (g) {
    var def = FILTER_WERTE[g];
    var chips = "<button class=\"chip active\" type=\"button\" data-group=\"" + g + "\" data-value=\"alle\" aria-pressed=\"true\">Alle</button>" + def[1].map(function (w) {
      return "<button class=\"chip\" type=\"button\" data-group=\"" + g + "\" data-value=\"" + w[0] + "\" aria-pressed=\"false\">" + w[1] + "</button>";
    }).join("");
    return "<div class=\"fgroup\" role=\"group\" aria-label=\"" + def[0] + "\"><span class=\"flabel\">" + def[0] + "</span>" + chips + "</div>";
  }).join("");
}

function filterBereichHtml(scope) {
  var texte = {
    impuls: {
      aria: "Suche in den verfügbaren Impulsen",
      placeholder: "Impuls suchen, z. B. Auswertung, Skepsis, Bericht …",
      filter: "Verfügbare Impulse filtern",
      lead: "Suche und Filter gelten nur für die verfügbaren Impulse."
    },
    live: {
      aria: "Suche in den verfügbaren Live-Sessions",
      placeholder: "Live-Session suchen, z. B. Auswertung, Sprechstunde …",
      filter: "Verfügbare Live-Sessions filtern",
      lead: "Suche und Filter gelten nur für die verfügbaren Termine."
    },
    community: {
      aria: "Suche in den verfügbaren Communitys",
      placeholder: "Community suchen, z. B. Transkript, Bericht, Skepsis …",
      filter: "Verfügbare Communitys filtern",
      lead: "Suche und Filter gelten nur für die verfügbaren Communitys."
    }
  }[scope];
  var feld = SUCH_FELD[scope];
  var lupe = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke-width=\"2\" stroke-linecap=\"round\" aria-hidden=\"true\"><circle cx=\"11\" cy=\"11\" r=\"7\"/><line x1=\"21\" y1=\"21\" x2=\"16.5\" y2=\"16.5\"/></svg>";
  var gruppen = filterGruppenHtml(scope);
  return "<div class=\"search bereich-suche\" role=\"search\">" + lupe
    + "<input id=\"" + feld + "\" type=\"search\" placeholder=\"" + texte.placeholder + "\" aria-label=\"" + texte.aria + "\">"
    + "<button type=\"button\" id=\"" + feld + "-btn\">Suchen</button></div>"
    + "<div class=\"filters\" data-scope=\"" + scope + "\" aria-label=\"" + texte.filter + "\">"
    + "<p class=\"filter-lead\">" + texte.lead + "</p>"
    + "<div class=\"filter-status\"><span class=\"fcount\" role=\"status\" aria-live=\"polite\"></span>"
    + "<button class=\"freset\" type=\"button\" data-filter-reset=\"" + scope + "\" hidden>Filter zurücksetzen</button></div>"
    + gruppen + "</div>";
}

function aktiveFilter(scope) {
  var block = document.querySelector(".filters[data-scope=\"" + scope + "\"]");
  var auswahl = {};
  var anzahl = 0;
  (FILTER_GRUPPEN[scope] || []).forEach(function (g) {
    auswahl[g] = [];
    if (!block) return;
    block.querySelectorAll(".chip").forEach(function (c) {
      if (c.dataset.group === g && c.dataset.value !== "alle" && c.classList.contains("active")) auswahl[g].push(c.dataset.value);
    });
    anzahl += auswahl[g].length;
  });
  return { auswahl: auswahl, anzahl: anzahl };
}

function passtKarte(el, scope, auswahl) {
  return (FILTER_GRUPPEN[scope] || []).every(function (g) {
    var werte = auswahl[g] || [];
    if (!werte.length) return true;
    var eigene = (el.dataset[g] || "").split(" ");
    return werte.some(function (w) { return eigene.indexOf(w) !== -1; });
  });
}

function syncAlleChips(scope) {
  var block = document.querySelector(".filters[data-scope=\"" + scope + "\"]");
  if (!block) return;
  block.querySelectorAll(".chip[data-value=\"alle\"]").forEach(function (c) {
    var aktiv = false;
    block.querySelectorAll(".chip").forEach(function (andere) {
      if (andere.dataset.group === c.dataset.group && andere.dataset.value !== "alle" && andere.classList.contains("active")) aktiv = true;
    });
    c.classList.toggle("active", !aktiv);
    c.setAttribute("aria-pressed", !aktiv ? "true" : "false");
  });
}

function filterStatusText(scope, sichtbar, gesamt, anzahl, q) {
  var namen = {
    lektion: { eine: "Lektion", keine: "Keine Lektion", alle: "Lektionen", fall: "Lektionen" },
    start: { eine: "Lektion", keine: "Keine Lektion", alle: "Lektionen", fall: "Lektionen" },
    impuls: { eine: "Impuls", keine: "Kein Impuls", alle: "Impulse", fall: "Impulsen" },
    live: { eine: "Live-Session", keine: "Keine Live-Session", alle: "Live-Sessions", fall: "Live-Sessions" },
    community: { eine: "Community", keine: "Keine Community", alle: "Communitys", fall: "Communitys" }
  }[scope];
  if (!namen) return "";
  if (scope === "start" && anzahl === 0) return "Eine Auswahl aus " + gesamt + " verfügbaren Lektionen. Mit einem Merkmal sehen Sie alle passenden.";
  if (anzahl === 0 && !q) {
    if (gesamt === 1) return scope === "impuls" ? "Der verfügbare Impuls wird angezeigt." : "Die verfügbare " + namen.eine + " wird angezeigt.";
    return "Alle " + gesamt + " verfügbaren " + namen.alle + " werden angezeigt.";
  }
  if (sichtbar === 0) return namen.keine + " entspricht dieser Auswahl.";
  if (sichtbar === 1) return "<strong>1</strong> von " + gesamt + " verfügbaren " + namen.fall + " entspricht Ihrer Auswahl.";
  return "<strong>" + sichtbar + "</strong> von " + gesamt + " verfügbaren " + namen.fall + " entsprechen Ihrer Auswahl.";
}

function setzeFilterStatus(scope, sichtbar, gesamt, anzahl, q) {
  var block = document.querySelector(".filters[data-scope=\"" + scope + "\"]");
  if (!block) return;
  var zahl = block.querySelector(".fcount");
  var reset = block.querySelector(".freset");
  if (zahl) zahl.innerHTML = filterStatusText(scope, sichtbar, gesamt, anzahl, q);
  if (reset) reset.hidden = anzahl === 0 && !q;
  syncAlleChips(scope);
}

function schreibeImpulsDaten(li, c) {
  li.dataset.thema = (c.thema || []).join(" ");
  li.dataset.niveau = c.niveau || "";
  li.dataset.zielgruppe = (c.ziel || []).join(" ");
  li.dataset.werkzeug = c.werkzeugKey || "";
  li.dataset.typ = c.typ || "";
  li.dataset.suchtext = ((c.titel || "") + " " + (c.teaser || "")).toLowerCase();
}

function anreichernImpulse() {
  var ul = document.getElementById("impulse-alle");
  if (!ul) return;
  var vorhanden = {};
  Array.prototype.forEach.call(ul.children, function (li) {
    if (!li.querySelector) return;
    var btn = li.querySelector("[data-open]");
    if (!btn) return;
    vorhanden[btn.dataset.open] = true;
    var c = byId(btn.dataset.open);
    if (c) schreibeImpulsDaten(li, c);
  });
  alle().forEach(function (c) {
    if (!istImpuls(c) || vorhanden[c.id] || c.status !== "veroeffentlicht" || istEigen(c) || fortschrittVon(c)) return;
    var li = document.createElement("li");
    li.innerHTML = "<button type=\"button\" data-open=\"" + esc(c.id) + "\">" + esc(c.titel) + "<span>" + esc(c.dauerMin ? c.dauer : "Praxisimpuls") + "</span></button>";
    schreibeImpulsDaten(li, c);
    ul.appendChild(li);
    vorhanden[c.id] = true;
  });
}

function filtereLektionen() {
  var kacheln = Array.prototype.slice.call(document.querySelectorAll("#katalog-grid .tile"));
  var q = (sucheSeite.lektion || "").trim().toLowerCase();
  var info = aktiveFilter("lektion");
  var gesamt = 0;
  var sichtbar = 0;
  kacheln.forEach(function (k) {
    var inhalt = byId(k.dataset.id);
    var verfuegbar = !!(inhalt && istLektion(inhalt) && !istEigen(inhalt) && !fortschrittVon(inhalt));
    var treffer = verfuegbar && passtKarte(k, "lektion", info.auswahl);
    if (treffer && q && k.textContent.toLowerCase().indexOf(q) === -1) treffer = false;
    k.hidden = !treffer;
    if (verfuegbar) gesamt++;
    if (treffer) sichtbar++;
    verankereKachel(k);
  });
  setzeFilterStatus("lektion", sichtbar, gesamt, info.anzahl, q);
  var empty = document.getElementById("empty");
  if (empty) empty.hidden = sichtbar > 0;
}

function filtereImpulse() {
  anreichernImpulse();
  var items = Array.prototype.slice.call(document.querySelectorAll("#impulse-alle > li"));
  var q = (sucheSeite.impuls || "").trim().toLowerCase();
  var info = aktiveFilter("impuls");
  var gesamt = 0;
  var sichtbar = 0;
  items.forEach(function (li) {
    var btn = li.querySelector("[data-open]");
    var c = btn && byId(btn.dataset.open);
    var verfuegbar = !!(c && istImpuls(c) && c.status === "veroeffentlicht" && !istEigen(c) && !fortschrittVon(c));
    var treffer = verfuegbar && passtKarte(li, "impuls", info.auswahl);
    if (treffer && q && (li.dataset.suchtext || li.textContent || "").toLowerCase().indexOf(q) === -1) treffer = false;
    li.hidden = !treffer;
    if (verfuegbar) gesamt++;
    if (treffer) sichtbar++;
  });
  setzeFilterStatus("impuls", sichtbar, gesamt, info.anzahl, q);
  var leer = document.getElementById("impuls-filter-leer");
  if (leer) {
    leer.hidden = sichtbar > 0;
    leer.textContent = gesamt === 0 ? "Zurzeit kein weiterer Impuls." : "Kein Impuls entspricht dieser Auswahl.";
  }
}

function filtereBereichKarten(selektor, scope, leerId, filterLeerId) {
  var karten = Array.prototype.slice.call(document.querySelectorAll(selektor));
  var block = document.querySelector(".filters[data-scope=\"" + scope + "\"]");
  var leer = document.getElementById(leerId);
  var filterLeer = document.getElementById(filterLeerId);
  if (!block) {
    if (leer) leer.hidden = karten.length > 0;
    if (filterLeer) filterLeer.hidden = true;
    return;
  }
  var q = (sucheSeite[scope] || "").trim().toLowerCase();
  var info = aktiveFilter(scope);
  var sichtbar = 0;
  karten.forEach(function (k) {
    var treffer = passtKarte(k, scope, info.auswahl);
    if (treffer && q && k.textContent.toLowerCase().indexOf(q) === -1) treffer = false;
    k.hidden = !treffer;
    if (treffer) sichtbar++;
  });
  setzeFilterStatus(scope, sichtbar, karten.length, info.anzahl, q);
  if (leer) leer.hidden = karten.length > 0;
  if (filterLeer) filterLeer.hidden = !(karten.length > 0 && sichtbar === 0);
}

function filtern() {
  filtereLektionen();
  filtereImpulse();
  renderLive();
  renderCommunity();
  renderEigene();
  renderFortschritt();
  renderFaqEintraege();
  renderStart();
}

function bereichZurueck(scope) {
  sucheSeite[scope] = "";
  var feld = document.getElementById(SUCH_FELD[scope] || "");
  if (feld) feld.value = "";
  var block = document.querySelector(".filters[data-scope=\"" + scope + "\"]");
  if (block) {
    block.querySelectorAll(".chip").forEach(function (c) {
      var an = c.dataset.value === "alle";
      c.classList.toggle("active", an);
      c.setAttribute("aria-pressed", an ? "true" : "false");
    });
  }
  if (scope === "lektion") {
    var hinweisFeld = document.getElementById("pfadhinweis");
    if (hinweisFeld) hinweisFeld.hidden = true;
  }
  filtern();
}

function suchZeile(label, titel, attrs) {
  return "<button type=\"button\" class=\"rowitem\" " + attrs + "><strong>" + esc(titel) + "</strong><span>" + esc(label) + "</span></button>";
}

function renderSuche() {
  var box = document.getElementById("suche-treffer");
  var frage = document.getElementById("suche-frage");
  if (!box) return;
  var roh = (suchtext || "").trim();
  var q = roh.toLowerCase();
  if (frage) {
    frage.textContent = q
      ? "Ergebnisse für „" + roh + "“. Geprüft werden Lektionen, Impulse, Live-Sessions, Communitys und die häufigen Fragen."
      : "Die Suche geht über Lektionen, Impulse, Live-Sessions, Communitys und die häufigen Fragen.";
  }
  if (!q) {
    box.innerHTML = "<p>Bitte geben Sie einen Suchbegriff ein.</p>";
    return;
  }
  var lektionen = [];
  var impulse = [];
  var sessions = [];
  var sessionIds = {};
  alle().forEach(function (c) {
    if (!c || !(istEigen(c) || c.status === "veroeffentlicht")) return;
    var hay = ((c.titel || "") + " " + (c.teaser || "") + " " + (c.format || "") + " " + (c.werkzeug || "") + " " + (c.autor || "")).toLowerCase();
    if (hay.indexOf(q) === -1) return;
    if (istImpuls(c)) impulse.push(c);
    else if (istLiveSession(c)) { sessions.push(c); sessionIds[c.id] = true; }
    else if (istLektion(c)) lektionen.push(c);
  });
  var fest = LIVE_FEST.filter(function (s) {
    return !sessionIds[s.id] && (s.titel + " " + s.text).toLowerCase().indexOf(q) >= 0;
  });
  var community = COMMUNITYS.filter(function (c) {
    return (c.titel + " " + (c.meta || "")).toLowerCase().indexOf(q) >= 0;
  });
  var faq = [];
  document.querySelectorAll("#view-faq .faq-item").forEach(function (item) {
    if (item.textContent.toLowerCase().indexOf(q) >= 0) faq.push(item);
  });
  function inhaltButtons(liste, art) {
    return liste.map(function (c) {
      var zusatz = c.status && c.status !== "veroeffentlicht" ? " · " + statusLabel(c.status) : "";
      return suchZeile(art + zusatz, c.titel, "data-open=\"" + esc(c.id) + "\"");
    }).join("");
  }
  var gruppen = [];
  if (lektionen.length) gruppen.push(["Lektionen", inhaltButtons(lektionen, "Lektion")]);
  if (impulse.length) gruppen.push(["Impulse", inhaltButtons(impulse, "Impuls")]);
  var liveHtml = inhaltButtons(sessions, "Live-Session") + fest.map(function (s) {
    return suchZeile("Live-Session", s.titel, "data-view-jump=\"live\" data-herkunft=\"live\"");
  }).join("");
  if (liveHtml) gruppen.push(["Live-Sessions", liveHtml]);
  if (community.length) gruppen.push(["Community", community.map(function (c) {
    return suchZeile("Community", c.titel, "data-view-jump=\"community\" data-herkunft=\"community\"");
  }).join("")]);
  if (faq.length) gruppen.push(["Häufige Fragen", faq.map(function (item) {
    var knopf = item.querySelector(".faq-q");
    var text = knopf && knopf.childNodes[0] ? knopf.childNodes[0].textContent.trim() : "";
    if (!text && knopf) text = knopf.textContent.replace("+", "").trim();
    return suchZeile("FAQ", text, "data-action=\"faq-sprung\" data-faq=\"" + esc(item.dataset.faq || "") + "\"");
  }).join("")]);
  if (!gruppen.length) {
    box.innerHTML = "<p>Keine Treffer. Eine KI-gestützte Recherche und ein Lern-Lotse gehören zur späteren Ausbaustufe, nicht zu dieser Suche.</p>";
    return;
  }
  box.innerHTML = gruppen.map(function (g) {
    return "<section class=\"such-gruppe\"><h2 class=\"bereich-titel\">" + esc(g[0]) + "</h2>" + g[1] + "</section>";
  }).join("");
}

function faqOeffnen(item) {
  document.querySelectorAll(".faq-item.open").forEach(function (o) {
    o.classList.remove("open");
    o.querySelector(".faq-a").style.maxHeight = null;
    o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
  });
  item.classList.add("open");
  var answer = item.querySelector(".faq-a");
  answer.style.maxHeight = answer.scrollHeight + "px";
  item.querySelector(".faq-q").setAttribute("aria-expanded", "true");
}

function initFilter() {
  var lektionGruppen = document.getElementById("lektion-filter-gruppen");
  if (lektionGruppen && !lektionGruppen.firstChild) lektionGruppen.innerHTML = filterGruppenHtml("lektion");
  var startGruppen = document.getElementById("start-filter-gruppen");
  if (startGruppen && !startGruppen.firstChild) startGruppen.innerHTML = filterGruppenHtml("start");
  ["impuls", "live", "community"].forEach(function (scope) {
    var slot = document.getElementById("filter-slot-" + scope);
    if (slot && !slot.firstChild) slot.innerHTML = filterBereichHtml(scope);
  });
  document.querySelectorAll(".filters[data-scope] .chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      var block = chip.closest(".filters");
      var gruppe = chip.dataset.group;
      if (chip.dataset.value === "alle") {
        block.querySelectorAll(".chip").forEach(function (c) {
          if (c.dataset.group === gruppe && c.dataset.value !== "alle") {
            c.classList.remove("active");
            c.setAttribute("aria-pressed", "false");
          }
        });
      } else {
        var an = chip.classList.toggle("active");
        chip.setAttribute("aria-pressed", an ? "true" : "false");
      }
      filtern();
    });
  });
  document.querySelectorAll("[data-filter-reset]").forEach(function (knopf) {
    knopf.addEventListener("click", function () {
      bereichZurueck(knopf.dataset.filterReset);
      if (knopf.dataset.filterReset === "lektion") {
        try { document.getElementById("inhalte").scrollIntoView({ block: "start" }); } catch (e) { /* Prototyp bleibt bedienbar. */ }
      }
    });
  });
  window.filtern = filtern;
  filtern();
}

function initFaq() {
  document.querySelectorAll(".faq-item").forEach(function (item, i) {
    if (!item.dataset.faq) item.dataset.faq = "f" + i;
    if (item.classList.contains("open")) {
      var offen = item.querySelector(".faq-a");
      if (offen) offen.style.maxHeight = "none";
    }
    var antwort = item.querySelector(".faq-a");
    if (antwort && !antwort.querySelector(".faq-meta")) {
      var fuss = document.createElement("div");
      fuss.className = "faq-fuss";
      var meta = document.createElement("p");
      meta.className = "faq-meta";
      meta.textContent = "Geprüft am " + (item.dataset.geprueft || "12.08.2026");
      fuss.appendChild(meta);
      var gegen = item.dataset.gegen || "";
      if (gegen) {
        var lage = document.createElement("span");
        lage.className = "faq-lage" + (/offen/i.test(gegen) ? " offen" : "");
        lage.textContent = gegen;
        fuss.appendChild(lage);
      }
      var melden = document.createElement("button");
      melden.type = "button";
      melden.className = "textbtn";
      melden.textContent = "Frage fehlt oder Antwort trägt nicht";
      melden.addEventListener("click", function () {
        meldungOeffnen("FAQ " + item.dataset.faq);
      });
      fuss.appendChild(melden);
      antwort.appendChild(fuss);
    }
  });
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.parentElement;
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (o) {
        o.classList.remove("open");
        o.querySelector(".faq-a").style.maxHeight = null;
        o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) faqOeffnen(item);
    });
  });
}

function meldungOeffnen(ziel) {
  dialog({
    titel: "Rückmeldung",
    html: "<p>Die Meldung geht an die Redaktion und in die Quartalsprüfung. Sie ist keine Personenakte.</p><label class=\"field\"><span>Was trifft zu?</span><select id=\"melde-art\"><option>Frage fehlt</option><option>Antwort trägt nicht</option><option>Inhalt ist veraltet</option></select></label><label class=\"field\"><span>Kurz, optional</span><textarea id=\"melde-text\" rows=\"3\"></textarea></label>",
    aktionen: [
      { label: "Senden", fn: function () {
        state.meldungen.push({
          ziel: ziel,
          art: document.getElementById("melde-art").value,
          text: document.getElementById("melde-text").value.trim(),
          zeit: "gerade eben"
        });
        sichern();
        toast("Meldung ist bei der Redaktion angekommen.");
      } },
      { label: "Abbrechen", zweite: true }
    ]
  });
}

function init() {
  renderNav();
  renderProfilKnopf();
  initStartFaq();
  renderStart();
  wendeEinfach();
  initFaq();
  initFilter();
  syncKacheln();
  renderLive();
  renderCommunity();
  sofortKarte();
  if (!sessionStorage.getItem("kiw-start")) {
    sessionStorage.setItem("kiw-start", "1");
  }
  // Ziel, das vor der Anmeldung in der Adresse stand (Lesezeichen, Neuladen).
  var nachAnmeldung = "";
  if (authAktiv()) {
    state.extra.start = (state.extra.start || 0);
    verlaufWiederherstellen(history.state);
    var startZiel = zielAusVerlauf(history.state);
    showView(startZiel, { leise: true, ersetzen: true, anker: (history.state && history.state.anker) || "" });
    var hello = document.getElementById("hello");
    hello.hidden = false;
  } else {
    nachAnmeldung = hashZuView(location.hash);
    if (nachAnmeldung === "sso" || nachAnmeldung === "player" || nachAnmeldung === "summary") nachAnmeldung = "";
    showView("sso");
  }

  document.getElementById("sso-go").addEventListener("click", function () {
    sessionStorage.setItem("kiw-auth", "1");
    state.extra.start = (state.extra.start || 0) + 1;
    sichern();
    var hello = document.getElementById("hello");
    hello.hidden = false;
    // Die Anmeldeseite wird im Verlauf ersetzt: Der Zurück-Knopf führt nicht zurück zur Anmeldung.
    showView(nachAnmeldung || "home", { ersetzen: true });
    nachAnmeldung = "";
    toast("Guten Tag, Henning Beckmann. Die Nutzung ist freiwillig.");
  });

  window.addEventListener("popstate", function (e) {
    if (!authAktiv()) { showView("sso", { ausVerlauf: true }); return; }
    verlaufWiederherstellen(e.state);
    var ziel = zielAusVerlauf(e.state);
    showView(ziel, { ausVerlauf: true, leise: true, anker: (e.state && e.state.anker) || "" });
    if (!e.state || ziel !== e.state.view) verlaufMerken(ziel, { ersetzen: true }, false);
  });

  document.querySelector("header nav").addEventListener("click", function (e) {
    var toggle = e.target.closest("[data-nav-toggle]");
    if (toggle) {
      e.preventDefault();
      var sub = document.getElementById("nav-inhalte-sub");
      var auf = sub.hidden;
      sub.hidden = !auf;
      toggle.setAttribute("aria-expanded", auf ? "true" : "false");
      return;
    }
    var a = e.target.closest("a[data-view]");
    if (!a) return;
    e.preventDefault();
    var menu = document.getElementById("nav-inhalte-sub");
    var knopf = document.getElementById("nav-inhalte-btn");
    if (menu) menu.hidden = true;
    if (knopf) knopf.setAttribute("aria-expanded", "false");
    showView(a.dataset.view, { anker: a.dataset.anker || "", leise: !!a.dataset.anker, frisch: true });
  });

  document.querySelector(".wordmark").addEventListener("click", function (e) {
    if (e.target.closest(".p-mark, .p-tip")) return;
    if (!authAktiv()) return;
    showView("home");
  });

  var pbtn = document.getElementById("profile-btn");
  var pmenu = document.getElementById("profile-menu");
  pbtn.addEventListener("click", function () {
    var auf = pmenu.hidden;
    pmenu.hidden = !auf;
    pbtn.setAttribute("aria-expanded", auf ? "true" : "false");
  });

  document.getElementById("einfach-toggle").addEventListener("click", function () {
    state.einfach = !state.einfach;
    sichern();
    renderProfilKnopf();
    wendeEinfach();
  });

  document.querySelectorAll("[data-rolle]").forEach(function (b) {
    b.addEventListener("click", function () {
      state.rolle = b.dataset.rolle;
      sichern();
      renderNav();
      renderStart();
      renderProfilKnopf();
      pmenu.hidden = true;
      var ziel = { teilnehmende: "home", redaktion: "redaktion", admin: "admin" }[state.rolle] || "home";
      showView(ziel);
      if (window.filtern) window.filtern();
      else renderEigene();
      toast(rolleHinweis(state.rolle));
    });
  });

  document.getElementById("menu-profil").addEventListener("click", function () {
    pmenu.hidden = true;
    showView("profil");
  });
  document.getElementById("menu-abmelden").addEventListener("click", function () {
    sessionStorage.removeItem("kiw-auth");
    pmenu.hidden = true;
    showView("sso");
  });

  function sucheGlobal(wert) {
    suchtext = wert || "";
    ["suche", "suche-kopf"].forEach(function (id) {
      var feld = document.getElementById(id);
      if (feld && feld.value !== suchtext) feld.value = suchtext;
    });
    if (!authAktiv()) { showView("sso"); return; }
    showView("suche", { leise: true });
    kopfSuche(false);
  }
  function sucheLokal(scope, wert) {
    sucheSeite[scope] = wert || "";
    var ziel = { lektion: "inhalte", impuls: "impulse", live: "live", community: "community" }[scope] || "inhalte";
    if (!authAktiv()) { showView("sso"); return; }
    showView(ziel, { leise: true });
  }
  var lupe = document.getElementById("lupe");
  var kopfSuchfeld = document.getElementById("kopf-suchfeld");
  function kopfSuche(auf) {
    if (!kopfSuchfeld || !lupe) return;
    var warOffen = !kopfSuchfeld.hidden;
    kopfSuchfeld.hidden = !auf;
    lupe.setAttribute("aria-expanded", auf ? "true" : "false");
    lupe.setAttribute("aria-label", auf ? "Suche schließen" : "Suche öffnen");
    if (auf) {
      var feld = document.getElementById("suche-kopf");
      if (feld) feld.focus();
    } else if (warOffen) {
      lupe.focus();
    }
  }
  if (lupe && kopfSuchfeld) {
    lupe.addEventListener("click", function () { kopfSuche(kopfSuchfeld.hidden); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !kopfSuchfeld.hidden) kopfSuche(false);
      if (e.key === "Escape") {
        var sub = document.getElementById("nav-inhalte-sub");
        var knopf = document.getElementById("nav-inhalte-btn");
        if (sub && !sub.hidden) { sub.hidden = true; if (knopf) knopf.setAttribute("aria-expanded", "false"); }
      }
    });
    document.addEventListener("click", function (e) {
      if (!kopfSuchfeld.hidden && !e.target.closest(".kopf-suche")) kopfSuche(false);
      var sub = document.getElementById("nav-inhalte-sub");
      var knopf = document.getElementById("nav-inhalte-btn");
      if (sub && !sub.hidden && !e.target.closest(".nav-drop")) {
        sub.hidden = true;
        if (knopf) knopf.setAttribute("aria-expanded", "false");
      }
    });
  }
  [
    ["suche", "suche-btn", "global"],
    ["suche-kopf", "suche-kopf-btn", "global"],
    ["suche-inhalte", "suche-inhalte-btn", "lektion"],
    ["suche-impuls", "suche-impuls-btn", "impuls"],
    ["suche-live", "suche-live-btn", "live"],
    ["suche-community", "suche-community-btn", "community"]
  ].forEach(function (paar) {
    var feld = document.getElementById(paar[0]);
    var knopf = document.getElementById(paar[1]);
    if (!feld || !knopf) return;
    function los() {
      if (paar[2] === "global") sucheGlobal(feld.value);
      else sucheLokal(paar[2], feld.value);
    }
    knopf.addEventListener("click", los);
    feld.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); los(); }
    });
  });

  document.querySelectorAll("[data-pfad]").forEach(function (p) {
    function go() {
      if (!authAktiv()) { showView("sso"); return; }
      setzePfad(p.dataset.pfad);
    }
    p.addEventListener("click", go);
    p.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });

  document.getElementById("orient-btn").addEventListener("click", function () {
    var panel = document.getElementById("orient-panel");
    var card = document.getElementById("orient-card");
    var auf = panel.hidden;
    panel.hidden = !auf;
    card.classList.toggle("open", auf);
    document.getElementById("orient-btn").setAttribute("aria-expanded", auf ? "true" : "false");
  });

  document.getElementById("sofort-btn").addEventListener("click", function (e) {
    e.stopPropagation();
    oeffneInhalt(document.getElementById("sofort-btn").dataset.sofort || "berichte", true, "", e.currentTarget);
  });
  document.querySelectorAll(".grid").forEach(function (grid) {
    grid.addEventListener("click", function (e) {
      if (e.target.closest(".likebtn, .kommentar-link, .stift, [data-action], [data-bewerten], [data-kommentar]")) return;
      var tile = e.target.closest(".tile");
      if (!tile || !tile.dataset.id) return;
      oeffneInhalt(tile.dataset.id, false, "", tile);
    });
    grid.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      if (e.target.closest(".likebtn, .kommentar-link, button")) return;
      var tile = e.target.closest(".tile");
      if (!tile || !tile.dataset.id) return;
      e.preventDefault();
      oeffneInhalt(tile.dataset.id, false, "", tile);
    });
  });
  document.body.addEventListener("change", function (e) {
    if (e.target.name === "datei" && e.target.files && e.target.files[0]) {
      var p = document.getElementById("dateiname");
      if (p) {
        p.dataset.datei = e.target.files[0].name;
        p.textContent = e.target.files[0].name;
      }
    }
  });

  document.body.addEventListener("click", function (e) {
    var bewerten = e.target.closest("[data-bewerten]");
    if (bewerten) {
      e.preventDefault();
      var bid = bewerten.dataset.bewerten;
      state.feedback[bid] = state.feedback[bid] === "up" ? "" : "up";
      sichern();
      var playerOffen = document.getElementById("view-player") && !document.getElementById("view-player").hidden;
      if (playerOffen && aktuell === bid && detailModus !== "bearbeiten") renderPlayer();
      else if (window.filtern) window.filtern();
      toast(state.feedback[bid] === "up" ? "Danke. Die Redaktion sieht nur die Summe." : "Bewertung zurückgenommen.");
      return;
    }
    var open = e.target.closest("[data-open]");
    if (open && !e.target.closest("a")) {
      oeffneInhalt(open.dataset.open, false, open.dataset.kommentar ? "kommentar-bereich" : "", open);
      return;
    }
    var jump = e.target.closest("[data-view-jump]");
    if (jump) {
      if (jump.dataset.herkunft) herkunftSetzen(jump.dataset.herkunft);
      showView(jump.dataset.viewJump, { anker: jump.dataset.anker || "", leise: !!jump.dataset.anker, frisch: !!jump.dataset.frisch });
      return;
    }
    var act = e.target.closest("[data-action]");
    if (act) {
    var action = act.dataset.action;
    if (action === "zur-lernansicht") showView("inhalte");
    if (action === "zurueck-inhalt") showView("player");
    if (action === "abschliessen") {
      selbstGeprueft = !!(document.getElementById("selbstcheck") && document.getElementById("selbstcheck").checked);
      showView("summary");
    }
    if (action === "melden") meldungOeffnen(act.dataset.ziel || aktuell || "Inhalt");
    if (action === "faq-sprung") {
      var item = document.querySelector('#view-faq .faq-item[data-faq="' + act.dataset.faq + '"]');
      showView("faq");
      if (item) faqOeffnen(item);
    }
    if (action === "zum-kommentar") {
      var kommentarZiel = document.getElementById("kommentar-bereich");
      if (kommentarZiel) {
        try { kommentarZiel.scrollIntoView({ block: "start" }); } catch (err) { /* Prototyp bleibt bedienbar. */ }
        var eingabe = kommentarZiel.querySelector("textarea");
        if (eingabe) eingabe.focus();
      }
    }
    if (action === "neu") {
      editorId = null;
      editorVorgabe = act.dataset.art || "inhalt";
      detailModus = "bearbeiten";
      herkunftSetzen(editorVorgabe === "impuls" && act.id === "impuls-anbieten" ? "impulse" : "meine");
      showView("player");
    }
    if (action === "schritt-hinzu") {
      var liste = document.getElementById("schritt-liste");
      if (liste) {
        var anzahl = liste.querySelectorAll(".schritt-feld").length;
        if (anzahl >= 6) toast("Sechs Schritte reichen für eine kurze Einheit.");
        else liste.insertAdjacentHTML("beforeend", schrittFeld(anzahl, { t: "", d: "" }));
      }
    }
    if (action === "bearbeiten") {
      var zielInhalt = byId(act.dataset.id);
      if (!kannBearbeitenInhalt(zielInhalt)) {
        toast("Nur die erstellende Person oder jemand mit Edit-Recht kann das bearbeiten.");
        return;
      }
      editorId = act.dataset.id;
      editorVorgabe = "";
      detailModus = "bearbeiten";
      aktuell = editorId;
      showView("player");
    }
    if (action === "fortschritt") {
      if (!aktuell || kannBearbeitenInhalt(byId(aktuell))) return;
      state.fortschritt = state.fortschritt || {};
      state.fortschritt[aktuell] = act.dataset.stand === "abgeschlossen" ? "abgeschlossen" : "begonnen";
      sichern();
      if (window.filtern) window.filtern();
      renderPlayer();
      var fertigName = istImpuls(byId(aktuell)) ? "Abgeschlossene Impulse" : "Abgeschlossene Lektionen";
      var begonnenName = istImpuls(byId(aktuell)) ? "Begonnene Impulse" : "Begonnene Lektionen";
      toast(state.fortschritt[aktuell] === "abgeschlossen" ? "Liegt jetzt unter " + fertigName + "." : "Liegt wieder unter " + begonnenName + ".");
    }
    if (action === "live-teilnehmen") {
      var liveId = act.dataset.id;
      if (!liveId) return;
      state.liveTeilnahme = state.liveTeilnahme || {};
      state.liveTeilnahme[liveId] = true;
      sichern();
      renderLive();
      renderStart();
      toast("Die Session steht jetzt unter Teilgenommen.");
    }
    if (action === "community-mit") {
      var communityId = act.dataset.id;
      if (!communityId) return;
      state.communityMit = state.communityMit || {};
      state.communityMit[communityId] = !state.communityMit[communityId];
      sichern();
      renderCommunity();
      toast(state.communityMit[communityId] ? "Der Bereich steht jetzt unter Mitwirkung." : "Der Bereich steht wieder unter verfügbaren Communitys.");
    }
    if (action === "community-lesen") {
      if (e.target.closest("[data-action=community-mit]")) return;
      oeffneAusbau("Forenvorschau", "Den Beitrag können Sie hier nur als Vorschau lesen. Fragen stellen, Taggen und eigene Beiträge löschen folgen mit den Leitforen.");
    }
    if (action === "edit-recht") {
      var inhaltId = act.dataset.id;
      var personId = act.dataset.person;
      var inhaltRecht = byId(inhaltId);
      if (!istUrheber(inhaltRecht) || !personId || personId === "hb") return;
      state.editRechte = state.editRechte || {};
      state.editRechte[inhaltId] = state.editRechte[inhaltId] || {};
      state.editRechte[inhaltId][personId] = !state.editRechte[inhaltId][personId];
      sichern();
      renderPlayer();
      var wen = PERSONEN.filter(function (p) { return p.id === personId; })[0];
      toast((wen ? wen.name : "Die Person") + (state.editRechte[inhaltId][personId] ? " darf diesen Inhalt bearbeiten." : " hat kein Edit-Recht mehr."));
    }
    if (action === "review") { aktuell = act.dataset.id; detailModus = "lesen"; oeffneInhalt(act.dataset.id); }
    if (action === "passwort") {
      oeffneAusbau("Zugang", "Ein Passwort der KI-Werkstatt gibt es nicht. Zurücksetzen und Sperre liegen beim Behördenkonto über ADFS.");
    }
    if (action === "mod-sprung") {
      var sprung = document.getElementById(act.dataset.ziel);
      if (sprung) {
        try { sprung.scrollIntoView({ block: "start" }); } catch (err) { /* Prototyp bleibt bedienbar. */ }
      }
    }
    if (action === "mod-recht") {
      var person = act.dataset.person;
      state.moderationsrechte = state.moderationsrechte || {};
      state.moderationsrechte[person] = !moderationsrecht(person);
      sichern();
      renderAdmin();
      if (person === "hb") renderNav();
      var wer = PERSONEN.filter(function (p) { return p.id === person; })[0];
      toast((wer ? wer.name : "Die Person") + (state.moderationsrechte[person] ? " hat das Redaktionsrecht." : " hat kein Redaktionsrecht mehr."));
    }
    if (action === "stichprobe") {
      state.stichprobe.halluzinationen = true;
      sichern();
      renderRedaktion();
      toast("Stichprobe ist markiert.");
    }
    if (action === "zurueckgeben") {
      var grundFeld = document.getElementById("freigabe-grund") || document.querySelector("#review-form textarea");
      var grund = grundFeld ? grundFeld.value : "";
      if (!grund.trim()) { toast("Bitte eine Begründung angeben."); return; }
      state.status[aktuell] = "entwurf";
      state.override[aktuell] = Object.assign({}, state.override[aktuell] || {}, { vorher: "Zurückgegeben: " + grund.trim() });
      sichern();
      syncKacheln();
      toast("Zurück an die einreichende Person. Der Inhalt ist nicht sichtbar.");
      showView("redaktion");
    }
    if (action === "freigeben") {
      if (mangel(byId(aktuell)).length) return;
      state.status[aktuell] = "veroeffentlicht";
      state.pruefdatum = state.pruefdatum || {};
      state.pruefdatum[aktuell] = "2026-11-02";
      sichern();
      syncKacheln();
      detailModus = "lesen";
      toast("Freigegeben. Der Inhalt ist jetzt sichtbar.");
      showView("player");
    }
    if (action === "veroeffentlichen") {
      var cur = byId(aktuell);
      if (cur.status !== "freigabe" || mangel(cur).length) return;
      state.status[aktuell] = "veroeffentlicht";
      sichern();
      syncKacheln();
      toast("Veröffentlicht. Der Inhalt liegt in der Kursübersicht.");
      showView("redaktion");
    }
    if (action === "kommentar-loeschen") {
      var loeschId = act.dataset.id || aktuell;
      var loeschKey = act.dataset.key;
      if (loeschId && loeschKey) {
        state.kommentarWeg[loeschId] = state.kommentarWeg[loeschId] || {};
        state.kommentarWeg[loeschId][loeschKey] = true;
        sichern();
        var playerSicht = document.getElementById("view-player");
        if (playerSicht && !playerSicht.hidden && detailModus !== "bearbeiten") renderPlayer();
        ["redaktion", "mod-freigabe", "mod-kommentare", "mod-pruefung"].forEach(function (name) {
          var sicht = document.getElementById("view-" + name);
          if (!sicht || sicht.hidden) return;
          if (name === "redaktion") renderRedaktion();
          else renderModBereich(name.replace("mod-", ""));
        });
        toast("Kommentar gelöscht.");
      }
    }
    if (action === "kommentar-melden") {
      state.kommentarFlags[aktuell] = state.kommentarFlags[aktuell] || {};
      state.kommentarFlags[aktuell][act.dataset.key] = true;
      state.meldungen.push({ ziel: aktuell, key: act.dataset.key, art: "Kommentar", text: "", zeit: "gerade eben" });
      sichern();
      renderPlayer();
      toast("Kommentar ist bei der Redaktion gemeldet.");
    }
    }
    var fb = e.target.closest("[data-fb]");
    if (fb && aktuell) {
      state.feedback[aktuell] = state.feedback[aktuell] === fb.dataset.fb ? "" : fb.dataset.fb;
      sichern();
      var playerFb = document.getElementById("view-player");
      if (playerFb && !playerFb.hidden && detailModus !== "bearbeiten") renderPlayer();
      else renderSummary();
      toast(state.feedback[aktuell] ? "Danke. Die Redaktion sieht nur die Summe." : "Bewertung zurückgenommen.");
      return;
    }
    var h5p = e.target.closest("[data-h5p]");
    if (h5p) {
      var c5 = byId(aktuell);
      var opt = c5 && c5.h5p && c5.h5p.optionen[Number(h5p.dataset.h5p)];
      var hin = document.getElementById("h5p-hinweis");
      if (opt && hin) {
        hin.hidden = false;
        hin.textContent = (opt.ok ? "Das trifft zu. " : "Das trifft so nicht zu. ") + c5.h5p.hinweis;
      }
    }
  });

  document.body.addEventListener("submit", function (e) {
    if (e.target.id === "kommentar-form") {
      e.preventDefault();
      var text = new FormData(e.target).get("text");
      if (!String(text || "").trim()) return;
      state.kommentare[aktuell] = state.kommentare[aktuell] || [];
      state.kommentare[aktuell].push({ name: "Henning Beckmann", meta: "gerade eben", text: String(text).trim(), eigen: true });
      sichern();
      renderPlayer();
      if (window.filtern) window.filtern();
      toast("Kommentar steht unter Ihrem Namen.");
    }
    if (e.target.id === "editor-form") {
      e.preventDefault();
      var ziel = e.submitter && e.submitter.value === "review" ? "review" : "entwurf";
      var obj = leseEditor(e.target, ziel);
      if (!obj.titel) { toast("Bitte einen Titel setzen."); return; }
      if (ziel === "review") {
        var luecken = mangel(obj);
        if (luecken.length) {
          dialog({
            titel: "Noch nicht prüfbar",
            html: "<p>Zur Prüfung fehlen noch Pflichtmerkmale. Als Entwurf können Sie trotzdem speichern.</p><ul class=\"pruef\">" + luecken.map(function (l) { return "<li class=\"bad\">" + esc(l) + "</li>"; }).join("") + "</ul>",
            aktionen: [{ label: "Als Entwurf speichern", fn: function () { obj.status = "entwurf"; editorId = obj.id; speichereInhalt(obj); detailModus = "lesen"; aktuell = obj.id; showView("player"); toast("Entwurf gespeichert."); } }, { label: "Weiter bearbeiten", zweite: true }]
          });
          return;
        }
      }
      editorId = obj.id;
      speichereInhalt(obj);
      detailModus = "lesen";
      aktuell = obj.id;
      showView("player");
      toast(ziel === "review" ? "Zur Prüfung gegeben. Die Redaktion sieht denselben Inhalt." : "Entwurf gespeichert. Er liegt unter Meine Inhalte.");
    }
    if (e.target.id === "pin-form") {
      e.preventDefault();
      state.prominent = new FormData(e.target).get("pin");
      sichern();
      sofortKarte();
      toast("Der Impuls steht auf der Einstiegsseite, ohne weitere Klickstrecke.");
    }
    if (e.target.id === "profil-form") {
      e.preventDefault();
      var data = new FormData(e.target);
      state.behoerde = String(data.get("behoerde") || "").trim() || state.behoerde;
      state.einfach = data.get("einfach") === "on";
      sichern();
      renderProfilKnopf();
      wendeEinfach();
      toast("Profil gespeichert. Die Sprache bleibt Deutsch.");
    }
  });

  var impulseListe = document.querySelector(".impulse-grid");
  if (impulseListe) impulseListe.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var card = e.target.closest(".imp");
    if (!card || !card.dataset.open) return;
    e.preventDefault();
    oeffneInhalt(card.dataset.open, false, "", card);
  });

  document.getElementById("community-mehr").addEventListener("click", function () {
    oeffneAusbau("Leitforen und Ansprechpersonen", "Drei bis vier moderierte Foren, Tags, das Löschen eigener Beiträge, die Praxis-FAQ und die Suche nach ansprechbaren Personen sind beschrieben, aber nicht Teil der ersten Iteration.");
  });
  var liveKnopf = document.getElementById("live-btn");
  if (liveKnopf) liveKnopf.addEventListener("click", function () {
    oeffneAusbau("Open-Space und Live-Formate", "Regelmäßige Live-Sessions und das vertrauliche Open-Space-Format folgen später. Vertraulichkeitsregeln würden zu Beginn jeder Sitzung sichtbar. Aufzeichnungen können als Lektion in der Werkstatt liegen.");
  });
  function impulsAnbieten() {
    dialog({
      titel: "Impuls anbieten",
      html: "<p>Es braucht Erfahrung aus dem Alltag, keinen Expertenstatus. Auch ein misslungener Versuch ist ein Beitrag. Anlegen können alle Teilnehmenden. Die Redaktion entscheidet über die Veröffentlichung.</p>",
      aktionen: [
        { label: "Impuls anlegen", fn: function () { editorId = null; editorVorgabe = "impuls"; detailModus = "bearbeiten"; herkunftSetzen("impulse"); showView("player"); } },
        { label: "Schließen", zweite: true }
      ]
    });
  }
  ["impuls-anbieten", "start-impuls-anbieten"].forEach(function (id) {
    var knopf = document.getElementById(id);
    if (knopf) knopf.addEventListener("click", impulsAnbieten);
  });
  document.querySelectorAll(".thread").forEach(function (th) {
    th.addEventListener("click", function (ev) {
      if (ev.target.closest("[data-action]")) return;
      oeffneAusbau("Forenvorschau", "Den Beitrag können Sie hier nur als Vorschau lesen. Fragen stellen, Taggen und eigene Beiträge löschen folgen mit den Leitforen.");
    });
  });

  document.getElementById("dialog-close").addEventListener("click", dialogZu);
  document.getElementById("dialog").addEventListener("click", function (e) {
    if (e.target.id === "dialog") dialogZu();
  });

  var pmode = document.getElementById("pmode");
  pmode.addEventListener("click", function () {
    var an = document.body.classList.toggle("pmode");
    pmode.setAttribute("aria-pressed", an ? "true" : "false");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!document.getElementById("dialog").hidden) { dialogZu(); return; }
      if (!pmenu.hidden) { pmenu.hidden = true; pbtn.setAttribute("aria-expanded", "false"); return; }
      if (document.body.classList.contains("pmode")) {
        document.body.classList.remove("pmode");
        pmode.setAttribute("aria-pressed", "false");
      }
    }
  });

  document.body.addEventListener("mouseover", begriffZeigen);
  document.body.addEventListener("focusin", begriffZeigen);
  document.body.addEventListener("mouseout", function (e) {
    if (e.target.classList && e.target.classList.contains("term")) pop.hidden = true;
  });
  document.body.addEventListener("focusout", function (e) {
    if (e.target.classList && e.target.classList.contains("term")) pop.hidden = true;
  });
}

var pop = document.createElement("div");
pop.className = "term-pop";
pop.hidden = true;
pop.setAttribute("role", "tooltip");
document.addEventListener("DOMContentLoaded", function () {
  document.body.appendChild(pop);
  init();
});

function begriffZeigen(e) {
  var btn = e.target.closest ? e.target.closest(".term") : null;
  if (!btn) return;
  var g = null;
  GLOSSAR.some(function (x) { if (x.begriff === btn.dataset.begriff) { g = x; return true; } return false; });
  if (!g) return;
  pop.innerHTML = "<strong>" + esc(g.begriff) + "</strong><span>" + esc(g.text) + "</span>";
  pop.hidden = false;
  var r = btn.getBoundingClientRect();
  pop.style.top = (window.scrollY + r.bottom + 8) + "px";
  pop.style.left = Math.min(window.scrollX + r.left, window.scrollX + document.documentElement.clientWidth - 340) + "px";
}
