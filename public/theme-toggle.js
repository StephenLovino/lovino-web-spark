// Simple theme toggle script
(function() {
  // Create toggle button
  function createToggleButton() {
    const button = document.createElement('button');
    button.id = 'theme-toggle';
    button.setAttribute('aria-label', 'Toggle theme');
    button.style.position = 'fixed';
    button.style.top = '20px';
    button.style.right = '20px';
    button.style.zIndex = '9999';
    button.style.width = '40px';
    button.style.height = '40px';
    button.style.borderRadius = '50%';
    button.style.border = 'none';
    button.style.backgroundColor = '#9333ea';
    button.style.color = 'white';
    button.style.cursor = 'pointer';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    button.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    
    // Get current theme
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.add(currentTheme);
    
    // Set initial icon
    updateButtonIcon(button, currentTheme);
    
    // Add click event
    button.addEventListener('click', function() {
      const isDark = document.documentElement.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      
      // Toggle class on html element
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(newTheme);
      
      // Save preference
      localStorage.setItem('theme', newTheme);
      
      // Update icon
      updateButtonIcon(button, newTheme);
    });
    
    return button;
  }
  
  // Update button icon based on theme
  function updateButtonIcon(button, theme) {
    if (theme === 'dark') {
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
    } else {
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
    }
  }
  
  // Add button to DOM when page loads
  window.addEventListener('DOMContentLoaded', function() {
    const button = createToggleButton();
    document.body.appendChild(button);
  });
})();
