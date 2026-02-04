import { useState } from 'react';
import Button from '../components/button';
import ButtonInferior from '../components/buttonInferior';
import ModalEtiqueta from '../components/ModalEtiqueta';
import '../App.css';

function Home() {
  const [xmlFile, setXmlFile] = useState<File | null>(null);
  const [dadosEtiqueta, setDadosEtiqueta] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const aoProcessarDados = (dados: any) => {
    // Tratamento da Chave de Acesso: remove o prefixo "NFe" para ficar apenas os números
    const chaveLimpa = dados.chaveAcesso ? String(dados.chaveAcesso).replace('NFe', '') : '';
    
    setDadosEtiqueta({
      ...dados,
      chaveAcesso: chaveLimpa
    });
    setIsModalOpen(true);
  };

  return (
    <div className="home-container">
      <img 
        src="https://ik.imagekit.io/wuhybmc8j/cropped-logo-autoval-correto-1-1.png" 
        alt="Autoval Logo" 
        className="logo-topo"
        style={{ marginBottom: '2rem', maxWidth: '250px' }}
      />

      <Button onFileSelect={(file) => setXmlFile(file)} />

      <ButtonInferior 
        file={xmlFile} 
        onDadosExtraidos={aoProcessarDados} 
      />

      {isModalOpen && dadosEtiqueta && (
        <ModalEtiqueta 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          dados={dadosEtiqueta} 
        />
      )}
    </div>
  );
}

export default Home;