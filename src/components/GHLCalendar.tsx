import React, { useEffect } from 'react';

const GHLCalendar = () => {
  useEffect(() => {
    // Load the GHL form embed script
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="glass-effect p-6 rounded-lg">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Schedule a Meeting</h3>
        <p className="text-muted-foreground">
          Book a time slot that works for you using my online calendar.
        </p>
      </div>
      <div className="calendar-container">
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 120px)' }}>
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/jvebjN3kNYeKPklkqlye"
            style={{
              width: '100%',
              border: 'none',
              overflow: 'visible',
              height: '700px',
              borderRadius: '0.5rem'
            }}
            scrolling="yes"
            id="jvebjN3kNYeKPklkqlye_1745960071527"
            title="Schedule a meeting"
          />
        </div>
      </div>
    </div>
  );
};

export default GHLCalendar;
