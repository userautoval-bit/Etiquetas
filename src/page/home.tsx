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

      
       {/* 🎥 VIDEO BACKGROUND */}
      <video autoPlay muted loop playsInline className="video-bg">
        <source
          src="https://ik.imagekit.io/wuhybmc8j/6914714_Motion_Graphics_Motion_Graphic_1920x1080.mp4"
          type="video/mp4"
        />
      </video>

      {/* 🌑 Overlay opcional para escurecer */}
      <div className="video-overlay"></div>
  <img
    src="https://ik.imagekit.io/wuhybmc8j/cropped-logo-autoval-correto-1-1.png"
    alt="Autoval"
    className="logo-topo"
  />

  <Button onFileSelect={setXmlFile} />

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