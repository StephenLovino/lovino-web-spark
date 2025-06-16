# GoHighLevel Form Implementation for Aha-launchpad

This document provides instructions for implementing the GoHighLevel contact form in the Aha-launchpad project, similar to how it's implemented in the Stephen Lovino Portfolio.

## Files to Create/Modify

1. Create `src/components/GHLContactForm.tsx`
2. Create `public/ghl-form-styles.css`
3. Create `src/pages/Signup.tsx`
4. Update the navigation/header to link to the signup page

## 1. GHLContactForm Component

Create a file at `src/components/GHLContactForm.tsx` with the following content:

```tsx
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
```

## 2. CSS Styling for the GHL Form

Create a file at `public/ghl-form-styles.css` with the following content:

```css
/* GHL Form Custom Styling */

/* Main Form Container */
.form-container {
  background-color: rgba(13, 18, 23, 0.7);
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 100%;
}

/* Form Fields */
.form-field {
  margin-bottom: 20px;
}

/* Input Fields */
input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 12px 16px;
  background-color: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #fff;
  font-size: 16px;
  transition: all 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus,
textarea:focus {
  outline: none;
  border-color: #ff3366; /* Red accent color */
  box-shadow: 0 0 0 2px rgba(255, 51, 102, 0.3);
}

/* Labels */
label {
  display: block;
  margin-bottom: 8px;
  color: #e2e8f0;
  font-weight: 500;
  font-size: 14px;
}

/* Submit Button */
button[type="submit"],
.submit-button {
  background-color: #ff3366; /* Red accent color */
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;
  white-space: nowrap; /* Prevent text from breaking into multiple lines */
  overflow: hidden;
  text-overflow: ellipsis; /* Add ellipsis if text is too long */
}

button[type="submit"]:hover,
.submit-button:hover {
  background-color: #e62e5c; /* Darker red on hover */
  transform: translateY(-2px);
}

/* Placeholder Text */
::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

/* Error Messages */
.error-message {
  color: #ef4444;
  font-size: 14px;
  margin-top: 4px;
}

/* Success Message */
.success-message {
  background-color: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.5);
  color: #10b981;
  padding: 12px;
  border-radius: 6px;
  margin-top: 20px;
}

/* Form Header/Title (if applicable) */
.form-title {
  color: white;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
}

/* Textarea Height */
textarea {
  min-height: 120px;
  resize: vertical;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .form-container {
    padding: 16px;
  }

  input[type="text"],
  input[type="email"],
  textarea {
    font-size: 14px;
    padding: 10px 14px;
  }

  button[type="submit"],
  .submit-button {
    padding: 10px 20px;
    font-size: 14px;
    min-width: 120px; /* Ensure minimum width for the button */
    max-width: 100%; /* Make sure it doesn't overflow the container */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px; /* Fixed height for mobile */
    border-radius: 22px; /* Rounded corners to match your design */
  }
}

/* Fix for GHL form button text breaking */
.form-button-text {
  white-space: nowrap !important;
  display: inline-block !important;
}
```

## 3. Create Signup Page

Create a file at `src/pages/Signup.tsx` with the following content:

```tsx
import React, { useEffect, lazy, Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AnimatedNavbar from "@/components/AnimatedNavbar";

// Lazy load the GHL form component
const GHLContactForm = lazy(() =>
  import("@/components/GHLContactForm")
    .catch(err => {
      console.error("Failed to load GHLContactForm:", err);
      // Return a simple fallback component
      return {
        default: () => (
          <div className="glass-effect p-6">
            <h3 className="text-xl font-semibold mb-4">Contact Form Unavailable</h3>
            <p className="text-muted-foreground mb-4">
              Sorry, the contact form couldn't be loaded. Please email us directly at:
            </p>
            <a href="mailto:contact@aha-innovations.com" className="text-primary hover:underline">
              contact@aha-innovations.com
            </a>
          </div>
        )
      };
    })
);

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full h-full min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-aha-red border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode, fallback: React.ReactNode },
  { hasError: boolean, error: Error | null }
> {
  constructor(props: { children: React.ReactNode, fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set title
    document.title = "Sign Up | AHA Innovations";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-aha-dark text-white">
      <AnimatedNavbar />

      <div className="container mx-auto px-4 py-16 flex-grow">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="mb-8 text-white hover:text-aha-red hover:bg-white/5"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Sign Up for AHA Innovations</h1>
            <p className="text-xl text-gray-300">
              Get started with our all-in-one business solution. Fill out the form below to create your account.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 mb-6">
                <h3 className="text-2xl font-semibold mb-4">Why Sign Up?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-aha-red/20 flex items-center justify-center mt-1 mr-3">
                      <div className="w-2 h-2 rounded-full bg-aha-red"></div>
                    </div>
                    <span>Access to our complete suite of business tools</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-aha-red/20 flex items-center justify-center mt-1 mr-3">
                      <div className="w-2 h-2 rounded-full bg-aha-red"></div>
                    </div>
                    <span>14-day free trial with all premium features</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-aha-red/20 flex items-center justify-center mt-1 mr-3">
                      <div className="w-2 h-2 rounded-full bg-aha-red"></div>
                    </div>
                    <span>24/7 customer support and onboarding assistance</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-aha-red/20 flex items-center justify-center mt-1 mr-3">
                      <div className="w-2 h-2 rounded-full bg-aha-red"></div>
                    </div>
                    <span>No credit card required to start your trial</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Need Help?</h3>
                <p className="text-gray-300 mb-4">
                  Our team is ready to assist you with any questions you might have about our services.
                </p>
                <Button
                  variant="outline"
                  className="border-aha-red text-aha-red hover:bg-aha-red/10"
                  onClick={() => navigate('/contact')}
                >
                  Contact Support
                </Button>
              </div>
            </div>

            <ErrorBoundary
              fallback={
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Form Unavailable</h3>
                  <p className="text-gray-300 mb-4">
                    Sorry, the signup form couldn't be loaded. Please email us directly at:
                  </p>
                  <a href="mailto:contact@aha-innovations.com" className="text-aha-red hover:underline">
                    contact@aha-innovations.com
                  </a>
                </div>
              }
            >
              <Suspense fallback={<LoadingFallback />}>
                {typeof window !== 'undefined' && <GHLContactForm />}
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>

      <footer className="bg-aha-darkpurple py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} AHA Innovations. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
```

## 4. Update App.tsx to Include the Signup Route

Add the Signup route to your App.tsx file:

```tsx
import Signup from "./pages/Signup";

// In your Routes component
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/signup" element={<Signup />} />
  {/* Other routes */}
</Routes>
```

## 5. Update Navigation/Header

Make sure the "Sign Up" button in your header links to the `/signup` route:

```tsx
// In your header/navbar component
<Button
  className="bg-aha-red hover:bg-aha-darkred text-white"
  onClick={() => navigate('/signup')}
>
  Sign Up
</Button>
```

## Testing

After implementing these changes, test the signup form by:

1. Starting your development server
2. Navigating to the `/signup` route
3. Verifying that the GHL form loads properly
4. Testing form submission
5. Checking that the form styling matches your design

## Troubleshooting

If you encounter issues:

1. Check browser console for errors
2. Verify that the GHL form script is loading properly
3. Ensure the CSS file is being applied to the form
4. Check that the form ID in the iframe src is correct
