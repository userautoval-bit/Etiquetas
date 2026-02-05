import React, { useState } from 'react';
interface Props { onFileSelect: (file: File) => void; }

function Button({ onFileSelect }: Props) {
  const [fileName, setFileName] = useState("Selecionar arquivo XML");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="upload-wrapper">
      <input
        type="file"
        accept=".xml"
        id="file-upload"
        className="input-file-hidden"
        onChange={handleFileChange}
      />

      <label htmlFor="file-upload" className="upload-box">
        <div className="upload-icon">📄</div>
        <span className="upload-text">{fileName}</span>
      </label>
    </div>
  );
}

export default Button;