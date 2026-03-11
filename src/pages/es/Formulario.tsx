import React from 'react';
import { Helmet } from 'react-helmet-async';
import ResponsiveNavigation from '../../components/ResponsiveNavigation';
import DirectContactCta from '../../components/DirectContactCta';

const Formulario: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Contacto | Search Web Services - Diseno Web Los Cabos</title>
        <meta
          name="description"
          content="Contacta a Search Web Services por WhatsApp o correo para comenzar tu proyecto web."
        />
      </Helmet>

      <div className="min-h-screen relative">
        <ResponsiveNavigation variant="page" />

        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <section className="relative z-10 min-h-screen flex items-center justify-center pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24">
          <div className="container mx-auto px-6 md:px-8 max-w-4xl w-full">
            <DirectContactCta language="ES" />
          </div>
        </section>
      </div>
    </>
  );
};

export default Formulario;
