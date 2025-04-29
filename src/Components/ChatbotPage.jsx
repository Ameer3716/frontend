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

    return () => {
      const addedScript1 = document.getElementById("botpress-inject-script");
      const addedScript2 = document.getElementById("botpress-config-script");
      if (addedScript1) document.body.removeChild(addedScript1);
      if (addedScript2) document.body.removeChild(addedScript2);

      const webchatContainer = document.getElementById('botpress-webchat-container');
      if (webchatContainer) {
        webchatContainer.parentNode.removeChild(webchatContainer);
      }
    };
  }, []);

  return (
    <ChatbotWrapper>
      <h2>Chat Assistant</h2>
      <p>Interact with our AI assistant below.</p>
    </ChatbotWrapper>
  );
};

export default ChatbotPage;
