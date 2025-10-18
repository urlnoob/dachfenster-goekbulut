export default function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const config = {
      facebookPixelId: process.env.FACEBOOK_PIXEL_ID || '',
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || '',
      environment: process.env.NODE_ENV || 'development'
    };

    // Return configuration (safe to expose publicly)
    return res.status(200).json(config);

  } catch (error) {
    console.error('Error getting config:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to get configuration'
    });
  }
}
