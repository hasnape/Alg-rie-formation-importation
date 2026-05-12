import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { XIcon } from '../../constants';

interface LegalPageProps {
    onClose: () => void;
}

const LegalNotice: React.FC<LegalPageProps> = ({ onClose }) => {
    const { t } = useContext(LanguageContext);
    return (
        <>
            <div className="flex justify-between items-center p-6 border-b no-print">
                <h3 className="text-xl font-bold text-primary-dark">{t('legal.legal_notice.title')}</h3>
                <button onClick={onClose} className="text-neutral-500 hover:text-neutral-800" aria-label={t('login.close_button_label')}>
                    <XIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="p-6 overflow-y-auto custom-scroll flex-grow">
                <pre className="whitespace-pre-wrap font-sans text-neutral-700">{t('legal.legal_notice.content')}</pre>
            </div>
            <div className="p-4 bg-neutral-50 border-t text-right no-print">
                 <button onClick={onClose} className="bg-primary text-white font-semibold py-2 px-5 rounded-lg hover:bg-primary-dark transition-colors">
                     {t('legal.close_button')}
                 </button>
            </div>
        </>
    );
};

export default LegalNotice;
