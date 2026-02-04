import React, { useState } from 'react';
interface Props { onFileSelect: (file: File) => void; }

function Button({ onFileSelect }: Props) {
   // Estado para armazenar o nome do arquivo selecionado
   const [fileName, setFileName] = useState<string>("Selecionar arquivo XML");

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         setFileName(file.name);
         onFileSelect(file); // Envia para o Home.tsx
      }
   };


   return (
      <div className="container-upload">
         <input
            type="file"
            accept=".xml"
            id="file-upload"
            className="input-file-hidden"
            onChange={handleFileChange}
         />

         <label htmlFor="file-upload" className="btn-principal-custom">
            <div className="icon-upload">📄</div>
            <span>{fileName}</span>
         </label>

        
      </div>
   );
}

export default Button;