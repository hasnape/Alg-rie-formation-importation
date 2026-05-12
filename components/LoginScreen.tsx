import React, { useState, FormEvent, useContext } from 'react';
import { UserTier } from '../types';
import { LanguageContext } from '../contexts/LanguageContext';

// --- Login Credentials and Tiers ---
const CORRECT_PASSWORD = "13579";
const PREMIUM_CODE = "04101987";
const FULL_SERVICE_CODE = "124578";
const EXPAT_CODE = "98765";

interface LoginScreenProps {
  onLoginSuccess: (tier: UserTier) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const { t } = useContext(LanguageContext);
  const [password, setPassword] = useState('');
  const [unlockCode, setUnlockCode] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | '' }>({ text: '', type: '' });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (password === CORRECT_PASSWORD) {
      let tier: UserTier = 'free';
      if (unlockCode === PREMIUM_CODE) {
        tier = 'premium';
      } else if (unlockCode === FULL_SERVICE_CODE) {
        tier = 'full_service';
      } else if (unlockCode === EXPAT_CODE) {
        tier = 'expat';
      }
      
      setMessage({ text: t('login.success_message'), type: 'success' });
      setTimeout(() => {
        onLoginSuccess(tier);
      }, 1000);
    } else {
      setMessage({ text: t('login.error_message'), type: 'error' });
    }
  };

  const messageClasses = {
    success: 'text-success bg-green-100',
    error: 'text-red-600 bg-red-100',
    '': 'hidden',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">{t('login.password_label')}</label>
            <input 
                type="password" 
                id="password" 
                name="password" 
                required 
                placeholder={t('login.password_placeholder')}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <div>
            <label htmlFor="unlockCode" className="block text-sm font-medium text-neutral-700 mb-1">{t('login.unlock_code_label')}</label>
            <input 
                type="text" 
                id="unlockCode" 
                name="unlockCode" 
                placeholder={t('login.unlock_code_placeholder')}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150"
                autoComplete="off"
                value={unlockCode}
                onChange={(e) => setUnlockCode(e.target.value)}
            />
        </div>
        
        <div id="message" className={`text-sm font-semibold text-center py-2 rounded-lg ${messageClasses[message.type]}`}>
            {message.text}
        </div>

        <button 
            type="submit" 
            className="w-full flex justify-center py-3 px-4 rounded-lg shadow-md text-sm font-medium text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition duration-200 transform hover:scale-[1.01]"
        >
            {t('login.submit_button')}
        </button>
    </form>
  );
};

export default LoginScreen;