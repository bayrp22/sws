import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LanguageSwitcher: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isEs = location.pathname.startsWith('/es');

  const toggle = () => {
    const path = location.pathname;
    if (isEs) {
      // es -> en
      const newPath = path.replace(/^\/es(\/|$)/, '/en$1');
      navigate(newPath);
    } else {
      // en (or root) -> es
      const newPath = path.startsWith('/en')
        ? path.replace(/^\/en(\/|$)/, '/es$1')
        : `/es${path}`;
      navigate(newPath);
    }
  };

  return (
    <button onClick={toggle} className="text-sm underline text-gray-700 hover:text-gray-900">
      {isEs ? 'EN' : 'ES'}
    </button>
  );
};

export default LanguageSwitcher; 