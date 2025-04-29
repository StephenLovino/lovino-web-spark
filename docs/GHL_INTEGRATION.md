# GoHighLevel Integration Guide

This document explains how to set up the GoHighLevel (GHL) integration for the contact form in this portfolio website.

## Overview

The contact form is integrated with GoHighLevel to automatically create contacts in your GHL account when visitors submit the form. This allows you to manage leads and follow up with potential clients directly from your GHL dashboard.

## Prerequisites

1. A GoHighLevel account
2. API access to your GoHighLevel account
3. Your GoHighLevel Location ID

## Setup Instructions

### 1. Get Your GoHighLevel API Key

1. Log in to your GoHighLevel account
2. Go to Settings > API
3. Create a new API key or use an existing one
4. Copy the API key

### 2. Get Your GoHighLevel Location ID

1. In your GoHighLevel dashboard, the Location ID is part of the URL
2. For example, in `https://agency.gohighlevel.com/location/12345/dashboard`, the Location ID is `12345`
3. Copy your Location ID

### 3. Configure Environment Variables

1. Create a `.env` file in the root directory of the project (or edit the existing one)
2. Add the following variables:

```
VITE_GHL_LOCATION_ID=your_location_id_here
VITE_GHL_API_KEY=your_api_key_here
```

3. Replace `your_location_id_here` and `your_api_key_here` with your actual GoHighLevel credentials

### 4. Restart the Development Server

If you're running the development server, restart it to apply the new environment variables.

## How It Works

When a visitor submits the contact form:

1. The form data is validated on the client side
2. If validation passes, the data is sent to the GoHighLevel API
3. A new contact is created in your GoHighLevel account with:
   - First name and last name (parsed from the full name)
   - Email address
   - The message as a custom field
   - A tag "Website Contact Form" for easy identification

## Troubleshooting

If the form submission is not working:

1. Check the browser console for any error messages
2. Verify that your API key and Location ID are correct
3. Ensure your GoHighLevel account has API access enabled
4. Check if your API key has the necessary permissions to create contacts

## Fallback Behavior

If the GoHighLevel configuration is missing or invalid, the form will still work but will not create contacts in GoHighLevel. Instead, it will simply show a success message to the user.

## Security Considerations

- The API key is stored in environment variables and is not exposed to the client
- For production, ensure your environment variables are properly set in your hosting platform
- Never commit your actual API keys to version control
