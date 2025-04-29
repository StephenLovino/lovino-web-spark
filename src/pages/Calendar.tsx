import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Calendar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set title
    document.title = "Stephen Lovino | Book a Meeting";
    
    // Load the GHL form embed script
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="container mt-24 mb-12 px-4">
        <Button
          variant="outline"
          size="sm"
          className="mb-8 bg-background/80 backdrop-blur-sm"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 dark:from-white dark:to-gray-300 light:from-gray-800 light:to-black">
            Book a Meeting
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light mb-8">
            Schedule a time to discuss your project or ideas
          </p>
          
          <div className="glass-effect p-6 rounded-lg">
            <iframe 
              src="https://api.leadconnectorhq.com/widget/booking/jvebjN3kNYeKPklkqlye" 
              style={{ 
                width: '100%', 
                border: 'none', 
                overflow: 'hidden',
                height: '600px',
                maxHeight: '80vh',
                borderRadius: '0.5rem'
              }} 
              scrolling="no" 
              id="jvebjN3kNYeKPklkqlye_1745960071527"
              title="Schedule a meeting"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
