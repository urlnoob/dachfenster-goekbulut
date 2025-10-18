# Setup-Anleitung für Dachdeckerei Gökbulut Website

## 1. Zapier Webhook Setup

### Schritt 1: Zapier Account erstellen
- Gehe zu [zapier.com](https://zapier.com)
- Erstelle einen kostenlosen Account

### Schritt 2: Webhook erstellen
- Klicke auf "Create Zap"
- Wähle "Webhooks by Zapier" als Trigger
- Wähle "Catch Hook" als Event
- Kopiere die Webhook URL

### Schritt 3: Environment Variable setzen
- **Lokal**: Erstelle `.env.local` Datei mit deiner Webhook URL
- **Vercel**: Füge die Environment Variable im Vercel Dashboard hinzu

#### Für lokale Entwicklung:
```bash
# Erstelle .env.local Datei
echo "ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_KEY/" > .env.local
```

#### Für Vercel Production:
- Gehe zu deinem Vercel Project Dashboard
- Klicke auf "Settings" → "Environment Variables"
- Füge hinzu: `ZAPIER_WEBHOOK_URL` = `https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_KEY/`

### Schritt 4: Zap vervollständigen
- Füge eine Action hinzu (z.B. Google Sheets, Email, CRM)
- Teste den Zap
- Aktiviere den Zap

## 2. Vercel Deployment

### Schritt 1: Vercel Account
- Gehe zu [vercel.com](https://vercel.com)
- Erstelle einen kostenlosen Account
- Verbinde dein GitHub Repository

### Schritt 2: Deploy
- Klicke auf "New Project"
- Wähle dein Repository aus
- Vercel erkennt automatisch die Konfiguration
- Klicke auf "Deploy"

### Schritt 3: Domain (Optional)
- In den Project Settings kannst du eine Custom Domain hinzufügen

## 3. Formular-Daten

Das Formular sendet folgende Daten:
- **name**: Vor- und Nachname
- **phone**: Telefonnummer
- **email**: E-Mail-Adresse
- **postleitzahl**: Postleitzahl
- **roofType**: Dachtyp (Satteldach, Walmdach, etc.)
- **windowCount**: Anzahl Dachfenster
- **installationType**: Austausch/Neueinbau/Beides
- **insulation**: Isolierung (Einfach/Doppelt/Dreifach)
- **timestamp**: Zeitstempel
- **source**: "Website Formular"

## 4. Zapier Action Beispiele

### Google Sheets
- Action: "Create Spreadsheet Row"
- Wähle deine Google Sheets Tabelle
- Mappe die Felder zu

### Email Benachrichtigung
- Action: "Send Email"
- Empfänger: info@dachdeckermeister-goekbulut.de
- Betreff: "Neue Anfrage von Website"
- Inhalt: Alle Formular-Daten

### CRM Integration
- Action: "Create Lead" (HubSpot, Pipedrive, etc.)
- Mappe die Felder entsprechend

## 5. Testing

### Lokal testen
```bash
# Installiere Vercel CLI
npm i -g vercel

# Starte lokalen Server
vercel dev

# Teste das Formular
# Gehe zu http://localhost:3000
```

### Nach Deployment testen
- Fülle das Formular aus
- Überprüfe Zapier für eingehende Daten
- Teste deine Action (Email, CRM, etc.)

## 6. Wartung

### Logs überwachen
- Vercel Dashboard → Functions → View Logs
- Überwache Fehler und Performance

### Zapier überwachen
- Zapier Dashboard → Zaps
- Überwache erfolgreiche Runs

## Kosten
- **Vercel**: Kostenlos für bis zu 100GB Bandwidth
- **Zapier**: Kostenlos für bis zu 100 Tasks/Monat
- **Domain**: ~10-15€/Jahr (optional)

## Support
Bei Problemen:
1. Überprüfe Vercel Logs
2. Überprüfe Zapier History
3. Teste Webhook URL direkt
4. Kontaktiere Support falls nötig
