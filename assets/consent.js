
/* Google Consent Mode v2 + simple accessible banner */
(function(){
  // Inject default consent BEFORE any tags fire
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  // Default to denied until user chooses
  gtag('consent', 'default', {
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'ad_storage': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'granted',
    'security_storage': 'granted',
    'wait_for_update': 500
  });

  // Helpers
  const KEY = 'wpz_consent_v1';
  function saveConsent(obj){ try{ localStorage.setItem(KEY, JSON.stringify(obj)); }catch(e){} }
  function loadConsent(){ try{ return JSON.parse(localStorage.getItem(KEY)||'null'); }catch(e){ return null; } }
  function applyConsent(state){
    // state: {analytics:true/false, ads:true/false}
    const analytics = state.analytics ? 'granted' : 'denied';
    const ads = state.ads ? 'granted' : 'denied';
    gtag('consent', 'update', {
      'ad_user_data': ads,
      'ad_personalization': ads,
      'ad_storage': ads,
      'analytics_storage': analytics
    });
    saveConsent(state);
  }

  // Build banner
  function buildBanner(){
    const bar = document.createElement('div');
    bar.id = 'consent-banner';
    bar.setAttribute('role','dialog');
    bar.setAttribute('aria-live','polite');
    bar.setAttribute('aria-label','Privacy and cookie settings');
    bar.innerHTML = `
      <div class="consent-inner">
        <p><strong>Cookies & Privacy:</strong> We use cookies to keep our site reliable and measure pizza‑loving traffic. Choose your preferences.</p>
        <div class="consent-actions">
          <button class="btn primary" id="consent-accept">Accept all</button>
          <button class="btn alt" id="consent-deny">Reject non‑essential</button>
          <button class="btn link" id="consent-manage">Manage</button>
        </div>
      </div>
    `;
    document.body.appendChild(bar);

    // Manage panel
    const panel = document.createElement('div');
    panel.id = 'consent-panel';
    panel.setAttribute('role','dialog');
    panel.setAttribute('aria-modal','true');
    panel.setAttribute('aria-label','Manage cookie preferences');
    panel.innerHTML = `
      <div class="panel-card" role="document">
        <h2>Cookie preferences</h2>
        <label class="row">
          <input type="checkbox" id="c-analytics"> <span>Analytics (helps us improve)</span>
        </label>
        <label class="row disabled">
          <input type="checkbox" checked disabled> <span>Essential (always on)</span>
        </label>
        <label class="row">
          <input type="checkbox" id="c-ads"> <span>Ads & personalization</span>
        </label>
        <div class="consent-actions">
          <button class="btn primary" id="consent-save">Save</button>
          <button class="btn" id="consent-cancel">Cancel</button>
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    // Wire up buttons
    const accept = document.getElementById('consent-accept');
    const deny = document.getElementById('consent-deny');
    const manage = document.getElementById('consent-manage');
    const save = document.getElementById('consent-save');
    const cancel = document.getElementById('consent-cancel');
    const cAnalytics = document.getElementById('c-analytics');
    const cAds = document.getElementById('c-ads');

    function openPanel(){
      panel.classList.add('show');
      cAnalytics.focus();
    }
    function closePanel(){
      panel.classList.remove('show');
    }

    accept.addEventListener('click', function(){
      applyConsent({analytics:true, ads:true});
      bar.remove();
      closePanel();
    });
    deny.addEventListener('click', function(){
      applyConsent({analytics:false, ads:false});
      bar.remove();
      closePanel();
    });
    manage.addEventListener('click', openPanel);
    cancel.addEventListener('click', closePanel);
    save.addEventListener('click', function(){
      applyConsent({analytics: !!cAnalytics.checked, ads: !!cAds.checked});
      bar.remove();
      closePanel();
    });

    // Close on ESC
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closePanel();
    });

    // Restore toggles if prior choice
    const prev = loadConsent();
    if(prev){
      cAnalytics.checked = !!prev.analytics;
      cAds.checked = !!prev.ads;
    }
  }

  // "Privacy & Cookie Settings" link handler
  window.openConsentManager = function(){
    const btn = document.getElementById('consent-manage');
    if(btn) btn.click(); else {
      // if banner was dismissed, recreate manage panel only
      const prev = loadConsent() || {analytics:false, ads:false};
      const ph = document.createElement('div'); ph.id = 'consent-manage-ph'; document.body.appendChild(ph);
      const evt = new Event('DOMContentLoaded');
      document.dispatchEvent(evt);
    }
  };

  document.addEventListener('DOMContentLoaded', function(){
    // Show banner only if no prior choice
    if(!loadConsent()){
      buildBanner();
    }
  });
})();
