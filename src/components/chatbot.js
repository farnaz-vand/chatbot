import React, { useState } from 'react';
import Chat from 'devextreme-react/chat';
import { AzureOpenAI } from 'openai';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import { loadMessages } from 'devextreme/localization';
import { user, assistant, AzureOpenAIConfig, REGENERATION_TEXT, CHAT_DISABLED_CLASS, ALERT_TIMEOUT } from './data.js';
import ChatInput from './chatinput.js'; 
import './ChatStyle.css';
const store = [];
const messages = [];
loadMessages({
  en: {
    'dxChat-emptyListMessage': 'Chat is Empty',
    'dxChat-emptyListPrompt': 'AI Assistant is ready to answer your questions.',
    'dxChat-textareaPlaceholder': 'Ask AI Assistant...',
  },
});
const chatService = new AzureOpenAI(AzureOpenAIConfig);

async function getAIResponse(messages) {
  const params = {
    messages,
    model: AzureOpenAIConfig.deployment,
    max_tokens: 1000,
    temperature: 0.7,
  };
  const response = await chatService.chat.completions.create(params);
  return response.choices[0].message?.content;
}

const customStore = new CustomStore({
  key: 'id',
  load: () => new Promise((resolve) => setTimeout(() => resolve([...store]), 0)),
  insert: (message) => new Promise((resolve) => setTimeout(() => {
    store.push(message);
    resolve(message);
  }, 0)),
});

const dataSource = new DataSource({
  store: customStore,
  paginate: false,
});

export default function Chatbox() {
  const [alerts, setAlerts] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [classList, setClassList] = useState('');

  function alertLimitReached() {
    setAlerts([{ message: 'Request limit reached, try again in a minute.' }]);
    setTimeout(() => setAlerts([]), ALERT_TIMEOUT);
  }

  function toggleDisabledState(disabled, event = undefined) {
    setClassList(disabled ? CHAT_DISABLED_CLASS : '');
    if (disabled) {
      event?.target.blur();
    } else {
      event?.target.focus();
    }
  }

  async function processMessageSending(message, event) {
    toggleDisabledState(true, event);
    messages.push({ role: 'user', content: message.text });
    setTypingUsers([assistant]);

    dataSource.store().push([{ type: 'insert', data: { id: Date.now(), author: 'user', text: message.text, timestamp: new Date() } }]);

    try {
      const aiResponse = await getAIResponse(messages);
      setTimeout(() => {
        setTypingUsers([]);
        messages.push({ role: 'assistant', content: aiResponse });

        dataSource.store().push([{ type: 'insert', data: { id: Date.now(), author: 'assistant', text: aiResponse, timestamp: new Date() } }]);
      }, 200);
    } catch {
      setTypingUsers([]);
      messages.pop();
      alertLimitReached();
    } finally {
      toggleDisabledState(false, event);
    }
  }

  function onMessageEntered({ message, event }) {
    if (message.text.startsWith('data:image')) {
      dataSource.store().push([{ type: 'insert', data: { id: Date.now(), text: "AI cannot process images." } }]);
    } else {
      processMessageSending(message, event);
    }
  }

  return (
    <div className="chat-container">
         <Chat
        className={classList}
        dataSource={dataSource}
        reloadOnChange={false}
        showAvatar={false}
        showDayHeaders={false}
        user={user}
        height={450}
        onMessageEntered={onMessageEntered}
        alerts={alerts}
        typingUsers={typingUsers}
        messageRender={(data) => (
          <div className={`message ${data.author === 'user' ? 'user' : 'bot'}`}>
            <div className="message-text">{data.text}</div>
          </div>
        )}
      />
      <ChatInput onMessageEntered={onMessageEntered} toggleDisabledState={toggleDisabledState} />
    </div>
  );
}
