import React, { useState } from 'react';
import './ChatStyle.css';

export default function ChatInput({ onMessageEntered, toggleDisabledState }) {
  const [imagePreview, setImagePreview] = useState(null);

  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) { 
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); 
      };
      reader.readAsDataURL(file);
    } else {
      alert("File size should be under 5MB.");
    }
  }

  function handleImageMessage() {
    alert("AI cannot process images.");
  }

  return (
    <div className="chat-upload-container">
      <input 
        type="file" 
        accept="image/png, image/jpeg, image/gif" 
        onChange={handleImageUpload} 
        className="chat-file-input"
      />
      <button 
        onClick={handleImageMessage} 
        className="chat-upload-button"
      >
        ارسال عکس
      </button>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="chat-image-preview"
        />
      )}
    </div>
  );
}