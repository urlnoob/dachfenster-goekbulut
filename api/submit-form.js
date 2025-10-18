export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      name,
      phone,
      email,
      postleitzahl,
      roofType,
      windowCount,
      installationType,
      insulation,
      // Alternative field names from frontend
      dachform,
      anzahl_dachfenster,
      austausch_neueinbau,
      isolierung
    } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !postleitzahl) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    // Map German values to readable format
    const mapRoofType = (value) => {
      const mapping = {
        'satteldach': 'Satteldach',
        'walmdach': 'Walmdach', 
        'flachdach': 'Flachdach',
        'sonstiges': 'Sonstiges'
      };
      return mapping[value] || value || 'Nicht angegeben';
    };

    const mapWindowCount = (value) => {
      const mapping = {
        '1': '1 Dachfenster',
        '2-4': '2-4 Dachfenster',
        'mehr-als-4': 'Mehr als 4 Dachfenster',
        'weiss-nicht': 'Weiß nicht'
      };
      return mapping[value] || value || 'Nicht angegeben';
    };

    const mapInstallationType = (value) => {
      const mapping = {
        'austausch': 'Austausch',
        'neueinbau': 'Neueinbau',
        'beides': 'Beides'
      };
      return mapping[value] || value || 'Nicht angegeben';
    };

    const mapInsulation = (value) => {
      const mapping = {
        'einfach': 'Einfach-Verglasung',
        'zweifach': 'Zweifach-Verglasung',
        'dreifach': 'Dreifach-Verglasung'
      };
      return mapping[value] || value || 'Nicht angegeben';
    };

    // Prepare data for Zapier webhook
    const webhookData = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      postleitzahl: postleitzahl.trim(),
      roofType: mapRoofType(roofType || dachform),
      windowCount: mapWindowCount(windowCount || anzahl_dachfenster),
      installationType: mapInstallationType(installationType || austausch_neueinbau),
      insulation: mapInsulation(insulation || isolierung),
      timestamp: new Date().toISOString(),
      source: 'LP-Formular'
    };

    // Send to Zapier webhook
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL;
    
    if (!zapierWebhookUrl) {
      console.error('ZAPIER_WEBHOOK_URL environment variable not set');
      return res.status(500).json({ 
        error: 'Configuration error',
        message: 'Webhook URL not configured'
      });
    }
    
    const zapierResponse = await fetch(zapierWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookData)
    });

    if (zapierResponse.ok) {
      return res.status(200).json({ 
        success: true, 
        message: 'Formular erfolgreich gesendet' 
      });
    } else {
      throw new Error('Zapier webhook failed');
    }

  } catch (error) {
    console.error('Error processing form:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Es gab einen Fehler beim Verarbeiten des Formulars'
    });
  }
}
