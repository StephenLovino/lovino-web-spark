import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import CalendarDialog from './CalendarDialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MobileBookCallButtonProps {
  onButtonClick?: () => void;
}

const MobileBookCallButton = ({ onButtonClick }: MobileBookCallButtonProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen && onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <div className="relative group w-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
      <CalendarDialog onOpenChange={handleOpenChange}>
        <button
          type="button"
          className="relative w-full flex items-center justify-center gap-2 py-3 rounded-full dark:bg-black/40 bg-white/30 backdrop-blur-sm border dark:border-white/10 border-gray-200/20 group-hover:border-white/20 transition-all"
        >
          <Calendar className="h-5 w-5" />
          <span className="font-medium">Book a Call</span>
        </button>
      </CalendarDialog>
    </div>
  );
};

export default MobileBookCallButton;
