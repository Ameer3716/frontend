// src/Components/ChatbotPage.jsx
import React, { useEffect } from 'react';
import styled from 'styled-components';

const ChatbotWrapper = styled.div`
  padding: 1rem;
  height: calc(100vh - 120px); 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h2 {
    color: #1a0b2e;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  p {
    color: #1a0b2e;
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    height: auto;

    h2 {
      font-size: 1.6rem;
    }

    p {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 1.4rem;
    }

    p {
      font-size: 0.95rem;
    }
  }
`;

const ChatbotPage = () => {
  useEffect(() => {
    console.log("ChatbotPage Mounted: Loading NEW Botpress scripts...");
    // Check if scripts ALREADY exist (e.g., from failed cleanup or HMR)
    const existingScript1 = document.getElementById("botpress-inject-script");
    const existingScript2 = document.getElementById("botpress-config-script");
    if (existingScript1 || existingScript2) {
        console.warn("Botpress scripts detected on mount - attempting cleanup first.");
        removeBotpressElements(); // Attempt cleanup immediately
    }

    // --- Load NEW Scripts ---
    const script1 = document.createElement('script');
    script1.src = "https://cdn.botpress.cloud/webchat/v3.0/inject.js"; // <-- NEW SCRIPT URL
    // script1.async = true; // defer is used on the script tag itself
    script1.defer = true;   // <-- Added defer as per your example
    script1.id = "botpress-inject-script";

    const script2 = document.createElement('script');
    script2.src = "https://files.bpcontent.cloud/2025/06/19/06/20250619061559-E6W06VL3.js"; // <-- NEW SCRIPT URL
    script2.defer = true;
    script2.id = "botpress-config-script";

    document.body.appendChild(script1);
    document.body.appendChild(script2);
    // --- End Load Scripts ---

    // --- Cleanup Function (remains the same) ---
    const removeBotpressElements = () => {
         console.log("Attempting to remove Botpress elements...");
         const addedScript1 = document.getElementById("botpress-inject-script");
         const addedScript2 = document.getElementById("botpress-config-script");
         const webchatContainer = document.getElementById('botpress-webchat-container');
         const styleTags = document.querySelectorAll('style[data-emotion*="botpress"], style[id*="botpress"]');
         const widgetRoot = document.querySelector('.bp-widget-widget');
         const widgetIframe = document.querySelector('iframe[title="Botpress Webchat"]');

         if (addedScript1 && addedScript1.parentNode) {
            addedScript1.parentNode.removeChild(addedScript1);
            console.log("Removed Botpress inject script.");
         } else {
             console.log("Inject script not found for removal or already removed.");
         }
         if (addedScript2 && addedScript2.parentNode) {
            addedScript2.parentNode.removeChild(addedScript2);
            console.log("Removed Botpress config script.");
         } else {
             console.log("Config script not found for removal or already removed.");
         }
          if (webchatContainer && webchatContainer.parentNode) {
            webchatContainer.parentNode.removeChild(webchatContainer);
            console.log("Removed Botpress webchat container.");
          } else {
             console.log("Webchat container not found for removal.");
          }
          if (widgetRoot && widgetRoot.parentNode) {
              widgetRoot.parentNode.removeChild(widgetRoot);
              console.log("Removed Botpress widget root div.");
          } else {
               console.log("Widget root div not found for removal.");
          }
           if (widgetIframe && widgetIframe.parentNode) {
               widgetIframe.parentNode.removeChild(widgetIframe);
               console.log("Removed Botpress widget iframe.");
           } else {
                console.log("Widget iframe not found for removal.");
           }
           styleTags.forEach(tag => {
               if (tag.parentNode) {
                   tag.parentNode.removeChild(tag);
                   console.log("Removed Botpress style tag.");
               }
           });
           const lingeringWidget = document.querySelector('.bp-widget-widget');
           if (lingeringWidget) lingeringWidget.style.display = 'none';
    };

    // Return the cleanup function to be called on unmount
    return () => {
      console.log("ChatbotPage Unmounted: Running cleanup for NEW scripts...");
      removeBotpressElements();
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return (
    <ChatbotWrapper>
      <h2>Chat Assistant</h2>
      <p>Interact with our AI assistant below.</p>
      {/* Botpress webchat typically injects its UI, so no specific container needed here unless their docs specify otherwise */}
    </ChatbotWrapper>
  );
};

export default ChatbotPage;