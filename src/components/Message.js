import React, { useState } from 'react';
import Button from 'devextreme-react/button';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import HTMLReactParser from 'html-react-parser';
import { REGENERATION_TEXT } from './data.js';

function convertToHtml(value) {
  const result = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(value)
    .toString();
  return result;
}
function Message({ message }, onRegenerateButtonClick) {
  const [icon, setIcon] = useState('copy');
  if (message.text === REGENERATION_TEXT) {
    return <span>{REGENERATION_TEXT}</span>;
  }
  function onCopyButtonClick() {
    navigator.clipboard?.writeText(message.text);
    setIcon('check');
    setTimeout(() => {
      setIcon('copy');
    }, 2500);
  }
  return (
    <React.Fragment>
    <div
      className="dx-chat-messagebubble-text"
      style={{
        backgroundColor: "#F1F5F9",
        borderRadius: "0.5rem",
        padding: "1rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        margin: "0.5rem 0",
        wordBreak: "break-word",
        whiteSpace: "pre-wrap"
      }}
    >
      {HTMLReactParser(convertToHtml(message.text))}
    </div>
    <div
      className="dx-bubble-button-container"
      style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: "0.5rem",
        marginTop: "0.5rem"
      }}
    >
      <Button
        icon={icon}
        stylingMode="text"
        hint="Copy"
        onClick={onCopyButtonClick}
        style={{
          backgroundColor: "#3B82F6",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "0.375rem",
          transition: "background-color 0.2s"
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#2563EB"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#3B82F6"}
      />
      <Button
        icon="refresh"
        stylingMode="text"
        hint="Regenerate"
        onClick={onRegenerateButtonClick}
        style={{
          backgroundColor: "#F9FAFB",
          color: "black",
          padding: "0.5rem 1rem",
          borderRadius: "0.375rem",
          transition: "background-color 0.2s"
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#E5E7EB"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#F9FAFB"}
      />
    </div>
  </React.Fragment>
  );
}
export default Message;
