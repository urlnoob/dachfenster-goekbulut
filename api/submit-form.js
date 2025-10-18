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
      insulation
    } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !postleitzahl) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    // Prepare data for Zapier webhook
    const webhookData = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      postleitzahl: postleitzahl.trim(),
      roofType: roofType || 'Nicht angegeben',
      windowCount: windowCount || 'Nicht angegeben',
      installationType: installationType || 'Nicht angegeben',
      insulation: insulation || 'Nicht angegeben',
      timestamp: new Date().toISOString(),
      source: 'Website Formular'
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
