import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';

interface DirectContactCtaProps {
  language: 'EN' | 'ES';
}

const DirectContactCta: React.FC<DirectContactCtaProps> = ({ language }) => {
  const whatsappNumber = '+52 624 264 4012';
  const whatsappLink = 'https://wa.me/526242644012';
  const email = 'hola@searchvisionary.tech';

  const content = {
    EN: {
      title: 'Let\'s Talk About Your Project',
      subtitle: 'Choose the fastest way to reach us.',
      whatsapp: 'Message on WhatsApp',
      email: 'Send an Email',
      numberLabel: whatsappNumber,
      emailLabel: email,
    },
    ES: {
      title: 'Hablemos de Tu Proyecto',
      subtitle: 'Elige la forma mas rapida de contactarnos.',
      whatsapp: 'Escribir por WhatsApp',
      email: 'Enviar Correo',
      numberLabel: whatsappNumber,
      emailLabel: email,
    },
  };

  const copy = content[language];

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{copy.title}</h1>
        <p className="text-lg md:text-xl text-gray-600">{copy.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-xl border-2 border-gray-200 hover:border-[#A5FF00] p-6 transition-all duration-200 hover:shadow-lg"
        >
          <div className="flex items-center justify-center mb-4 text-gray-900 group-hover:text-black">
            <MessageCircle className="w-7 h-7" />
          </div>
          <p className="text-lg font-bold text-gray-900 text-center mb-1">{copy.whatsapp}</p>
          <p className="text-gray-600 text-center">{copy.numberLabel}</p>
        </a>

        <a
          href={`mailto:${email}`}
          className="group rounded-xl border-2 border-gray-200 hover:border-[#A5FF00] p-6 transition-all duration-200 hover:shadow-lg"
        >
          <div className="flex items-center justify-center mb-4 text-gray-900 group-hover:text-black">
            <Mail className="w-7 h-7" />
          </div>
          <p className="text-lg font-bold text-gray-900 text-center mb-1">{copy.email}</p>
          <p className="text-gray-600 text-center">{copy.emailLabel}</p>
        </a>
      </div>
    </div>
  );
};

export default DirectContactCta;
