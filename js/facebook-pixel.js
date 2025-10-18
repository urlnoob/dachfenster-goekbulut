// Facebook Pixel Configuration
class FacebookPixel {
  constructor() {
    this.pixelId = null;
    this.isLoaded = false;
  }

  async init() {
    try {
      // Get configuration from API
      const response = await fetch('/api/config');
      const config = await response.json();
      
      this.pixelId = config.facebookPixelId;
      
      if (!this.pixelId) {
        console.warn('Facebook Pixel ID not configured');
        return;
      }

      // Load Facebook Pixel script
      this.loadPixelScript();
      
    } catch (error) {
      console.error('Failed to load Facebook Pixel configuration:', error);
    }
  }

  loadPixelScript() {
    // Facebook Pixel base code
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    
    // Initialize pixel
    fbq('init', this.pixelId);
    fbq('track', 'PageView');
    
    this.isLoaded = true;
    console.log('Facebook Pixel initialized with ID:', this.pixelId);
  }

  track(eventName, parameters = {}) {
    if (!this.isLoaded || !this.pixelId) {
      console.warn('Facebook Pixel not loaded or configured');
      return;
    }
    
    fbq('track', eventName, parameters);
    console.log('Facebook Pixel event tracked:', eventName, parameters);
  }

  trackLead(parameters = {}) {
    this.track('Lead', {
      content_name: 'Dachfenster Anfrage',
      content_category: 'Form Submission',
      value: 0,
      currency: 'EUR',
      ...parameters
    });
  }

  trackInitiateCheckout(parameters = {}) {
    this.track('InitiateCheckout', {
      content_name: 'CTA Button Click',
      ...parameters
    });
  }
}

// Global instance
window.facebookPixel = new FacebookPixel();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.facebookPixel.init();
  });
} else {
  window.facebookPixel.init();
}

// Export for module usage
export default window.facebookPixel;
