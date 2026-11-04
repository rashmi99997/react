import { useState} from 'react'
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {

        const [inputText, setInputText] = useState('');

        function saveInputText(event) {
          setInputText(event.target.value);
        }

        function sendMessage() {

          if (inputText.trim() === '') return;

          // Add user message
          setChatMessages((prevChatMessages) => [
            ...prevChatMessages,
            {
              message: inputText,
              sender: "user",
              id: crypto.randomUUID()
            }
          ]);

          // Get robot response
          const response = Chatbot.getResponse(inputText);

          // Add robot message
          setChatMessages((prevChatMessages) => [
            ...prevChatMessages,
            {
              message: response,
              sender: "robot",
              id: crypto.randomUUID()
            }
          ]);

          // Clear input box
          setInputText('');
        }

        return (
          <div className = "chat-input-container">
            <input
              placeholder="Send a message to Chatbot"
              size="30"
              onChange={saveInputText}
              value={inputText}
              className = "chat-input"
            />

            <button onClick={sendMessage} className = "send-button">Send</button>
          </div>
        );
      }