import React from 'react';
import { MessageCircle } from 'lucide-react';
import CalendarDialog from './CalendarDialog';

const FloatingChatButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        <CalendarDialog>
          <button type="button" className="relative flex items-center gap-2 bg-background text-foreground hover:text-primary rounded-full shadow-lg transition-all duration-300 hover:shadow-accent/50">
            {/* On small screens, center the icon with padding */}
            <span className="md:hidden p-3">
              <MessageCircle className="h-5 w-5" />
            </span>
            {/* On medium screens and larger, show icon and text with proper padding */}
            <span className="hidden md:flex md:items-center md:px-4 md:py-2 md:gap-2">
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">Let's Chat!</span>
            </span>
          </button>
        </CalendarDialog>
      </div>
    </div>
  );
};

export default FloatingChatButton;
