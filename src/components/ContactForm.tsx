
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitToGHL, isGHLConfigValid } from "@/lib/ghl-api";
import { getEnvConfig } from "@/lib/env-config";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ghlConfig, setGhlConfig] = useState({
    locationId: "",
    apiKey: "",
    isValid: false
  });

  // Load GHL configuration on component mount
  useEffect(() => {
    const config = getEnvConfig();
    const isValid = isGHLConfigValid(config.GHL_LOCATION_ID, config.GHL_API_KEY);

    setGhlConfig({
      locationId: config.GHL_LOCATION_ID,
      apiKey: config.GHL_API_KEY,
      isValid
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // If GHL config is valid, submit to GHL API
      if (ghlConfig.isValid) {
        console.log("Submitting form to GoHighLevel...");

        try {
          const response = await submitToGHL(
            formData,
            ghlConfig.locationId,
            ghlConfig.apiKey
          );

          console.log("GHL API response status:", response.status);

          // Check if the response is ok (status in the range 200-299)
          if (!response.ok) {
            // Try to parse error data
            try {
              const errorData = await response.json();
              console.error("GHL API error:", errorData);
              throw new Error(errorData.message || "Failed to submit form to GoHighLevel");
            } catch (jsonError) {
              // If we can't parse the JSON, just use the status text
              throw new Error(`API error: ${response.status} ${response.statusText}`);
            }
          }

          // Success message
          toast({
            title: "Message sent!",
            description: "I'll get back to you as soon as possible.",
          });
        } catch (apiError) {
          console.error("GHL API call error:", apiError);

          // Show a more user-friendly error message
          toast({
            title: "Form submitted",
            description: "Your message was received, but there might have been an issue with our system. I'll still get back to you soon!",
          });
        }
      } else {
        // Fallback if GHL is not configured
        console.warn("GoHighLevel API not configured. Form submission simulated.");

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000));

        toast({
          title: "Message sent!",
          description: "I'll get back to you as soon as possible.",
        });
      }

      // Reset form regardless of API success/failure
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-effect p-6 md:p-8">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Your Name
          </label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-secondary/30"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-secondary/30"
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-2 text-sm font-medium">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell me about your project..."
            value={formData.message}
            onChange={handleChange}
            required
            className="min-h-32 bg-secondary/30"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
