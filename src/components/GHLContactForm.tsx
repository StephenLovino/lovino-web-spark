import { useEffect, useRef } from "react";

const GHLContactForm = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load the GHL form script after the component mounts
  useEffect(() => {
    // Create and load the GHL script
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Add a link to our custom CSS for the GHL form
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "/ghl-form-styles.css";
    document.head.appendChild(styleLink);

    // Cleanup function to remove the script and style when component unmounts
    return () => {
      document.body.removeChild(script);
      if (document.head.contains(styleLink)) {
        document.head.removeChild(styleLink);
      }
    };
  }, []);

  // Adjust iframe height to match content
  useEffect(() => {
    const adjustHeight = () => {
      if (iframeRef.current && containerRef.current) {
        // Set a minimum height for the iframe
        containerRef.current.style.minHeight = "450px";
      }
    };

    // Initial adjustment
    adjustHeight();

    // Add resize listener
    window.addEventListener("resize", adjustHeight);

    // Cleanup
    return () => {
      window.removeEventListener("resize", adjustHeight);
    };
  }, []);

  return (
    <div ref={containerRef} className="glass-effect p-6 md:p-8 h-full">
      <iframe
        ref={iframeRef}
        src="https://api.leadconnectorhq.com/widget/form/ASjvJgX8xJwcGHozC0s3"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius: "8px",
          minHeight: "426px",
          backgroundColor: "transparent"
        }}
        id="inline-ASjvJgX8xJwcGHozC0s3"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Form 0"
        data-height="426"
        data-layout-iframe-id="inline-ASjvJgX8xJwcGHozC0s3"
        data-form-id="ASjvJgX8xJwcGHozC0s3"
        data-custom-css-url="/ghl-form-styles.css"
        title="Contact Form"
      />
    </div>
  );
};

export default GHLContactForm;
