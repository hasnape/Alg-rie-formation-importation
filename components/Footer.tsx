import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';

type LegalPage = 'notice' | 'cookies' | 'terms' | null;

interface FooterProps {
    onShowLegal: (page: LegalPage) => void;
}

const Footer: React.FC<FooterProps> = ({ onShowLegal }) => {
    const { t } = useContext(LanguageContext);
    
    return (
        <footer className="bg-neutral-800 text-neutral-300 py-8 px-4">
            <div className="container mx-auto text-center text-sm">
                <div className="flex justify-center gap-6 mb-4">
                    <button onClick={() => onShowLegal('notice')} className="hover:text-white transition-colors">{t('footer.legal_notice')}</button>
                    <button onClick={() => onShowLegal('cookies')} className="hover:text-white transition-colors">{t('footer.cookie_policy')}</button>
                    <button onClick={() => onShowLegal('terms')} className="hover:text-white transition-colors">{t('footer.terms_of_service')}</button>
                </div>
                <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
            </div>
        </footer>
    );
};

export default Footer;