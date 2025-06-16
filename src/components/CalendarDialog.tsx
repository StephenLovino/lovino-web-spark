import React, { useEffect, ReactNode, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface CalendarDialogProps {
  triggerText?: string;
  children?: ReactNode;
  onOpenChange?: (open: boolean) => void;
}

const CalendarDialog = ({
  triggerText = "Schedule a Meeting",
  children,
  onOpenChange
}: CalendarDialogProps) => {
  // Use a state to track if the script has been loaded
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already in the document
    const existingScript = document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]');

    if (!existingScript) {
      // Load the GHL form embed script when the component mounts
      const script = document.createElement('script');
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);

      return () => {
        // Clean up script when component unmounts
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    } else {
      setScriptLoaded(true);
    }
  }, []);

  // Handle dialog open/close
  const handleOpenChange = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button className="gap-2">
            <Calendar className="h-4 w-4" />
            {triggerText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book a Meeting</DialogTitle>
          <DialogDescription>
            Schedule a time to discuss your project or ideas
          </DialogDescription>
        </DialogHeader>
        <div className="calendar-container mt-4">
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 120px)' }}>
            {scriptLoaded ? (
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
                id="jvebjN3kNYeKPklkqlye_dialog"
                title="Schedule a meeting"
              />
            ) : (
              <div className="flex items-center justify-center h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDialog;
