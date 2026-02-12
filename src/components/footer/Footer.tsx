function Footer() {
  return (
    <>    
      <footer className="bg-gray-800 text-white py-4">
        <div className="container-footer">
          <p>&copy; {new Date().getFullYear()} Autoval. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
} export default Footer;