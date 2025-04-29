import React, { useEffect, ReactNode } from 'react';
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
}

const CalendarDialog = ({ triggerText = "Schedule a Meeting", children }: CalendarDialogProps) => {
  useEffect(() => {
    // Load the GHL form embed script when the component mounts
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
    <Dialog>
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDialog;
