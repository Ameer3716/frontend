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
    console.log("ChatbotPage Mounted: Loading Botpress scripts...");
    // --- Check if scripts ALREADY exist (e.g., from failed cleanup) ---
    const existingScript1 = document.getElementById("botpress-inject-script");
    const existingScript2 = document.getElementById("botpress-config-script");
    if (existingScript1 || existingScript2) {
        console.warn("Botpress scripts detected on mount - attempting cleanup first.");
        // Attempt cleanup immediately in case previous unmount failed
        removeBotpressElements();
    }
    // --- End Check ---


    // --- Load Scripts ---
    const script1 = document.createElement('script');
    script1.src = "https://cdn.botpress.cloud/webchat/v2.4/inject.js";
    script1.async = true;
    script1.id = "botpress-inject-script";

    const script2 = document.createElement('script');
    script2.src = "https://files.bpcontent.cloud/2025/04/29/05/20250429054205-3NC2XNR1.js";
    script2.defer = true;
    script2.id = "botpress-config-script";

    document.body.appendChild(script1);
    document.body.appendChild(script2);
    // --- End Load Scripts ---


    // --- Cleanup Function ---
    const removeBotpressElements = () => {
         console.log("Attempting to remove Botpress elements...");
         const addedScript1 = document.getElementById("botpress-inject-script");
         const addedScript2 = document.getElementById("botpress-config-script");
         const webchatContainer = document.getElementById('botpress-webchat-container'); // Default container ID
         const styleTags = document.querySelectorAll('style[data-emotion*="botpress"], style[id*="botpress"]'); // Find style tags injected by botpress/emotion
         const widgetRoot = document.querySelector('.bp-widget-widget'); // Common class for the trigger button div
         const widgetIframe = document.querySelector('iframe[title="Botpress Webchat"]'); // Iframe if used

         if (addedScript1 && addedScript1.parentNode) {
            addedScript1.parentNode.removeChild(addedScript1);
            console.log("Removed Botpress inject script.");
         } else {
             console.log("Inject script not found for removal.");
         }
         if (addedScript2 && addedScript2.parentNode) {
            addedScript2.parentNode.removeChild(addedScript2);
            console.log("Removed Botpress config script.");
         } else {
             console.log("Config script not found for removal.");
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
          // Remove potentially injected styles
           styleTags.forEach(tag => {
               if (tag.parentNode) {
                   tag.parentNode.removeChild(tag);
                   console.log("Removed Botpress style tag.");
               }
           });
           // Force hiding any lingering trigger button via CSS (less ideal)
           const lingeringWidget = document.querySelector('.bp-widget-widget');
           if (lingeringWidget) lingeringWidget.style.display = 'none';
    }

    // Return the cleanup function to be called on unmount
    return () => {
      console.log("ChatbotPage Unmounted: Running cleanup...");
      removeBotpressElements();
    };
  }, []); // Empty dependency array
  return (
    <ChatbotWrapper>
      <h2>Chat Assistant</h2>
      <p>Interact with our AI assistant below.</p>
    </ChatbotWrapper>
  );
};

export default ChatbotPage;
