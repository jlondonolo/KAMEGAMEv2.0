// src/components/layout/Footer.jsx
const Footer = () => {
    return (
        <footer className="bg-[#0d0d22] text-white text-center py-5">
            <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                    <h3 className="font-bold mb-2">Contacto</h3>
                    <p>Políticas de privacidad</p>
                    <p>Términos y condiciones</p>
                </div>
                <div>
                    <h3 className="font-bold mb-2">Soporte</h3>
                    <p>Ayuda</p>
                </div>
                <div>
                    <h3 className="font-bold mb-2">Colaboraciones</h3>
                </div>
                <div>
                    <h3 className="font-bold mb-2">Otros</h3>
                </div>
            </div>
            <div className="flex justify-center gap-4">
                <a href="https://www.instagram.com/juanj_araque/" target="_blank" rel="noopener noreferrer">
                    <img
                        src="https://cdn.worldvectorlogo.com/logos/instagram-2016-5.svg"
                        alt="Instagram"
                        className="w-12"
                    />
                </a>
                <a href="https://paypal.me/Juanaraque11" target="_blank" rel="noopener noreferrer">
                    <img
                        src="https://cdn.worldvectorlogo.com/logos/paypal-pure-.svg"
                        alt="PayPal"
                        className="w-12"
                    />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
