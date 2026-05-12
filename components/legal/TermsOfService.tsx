import React, { useContext, useMemo } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { XIcon, getOffersData } from '../../constants';

interface LegalPageProps {
    onClose: () => void;
    onAccept: () => void;
}

const TermsOfService: React.FC<LegalPageProps> = ({ onClose, onAccept }) => {
    const { t } = useContext(LanguageContext);
    const OFFERS_DATA = useMemo(() => getOffersData(t), [t]);

    return (
        <>
            <div className="flex justify-between items-center p-6 border-b no-print">
                <h3 className="text-xl font-bold text-primary-dark">{t('legal.terms_of_service.title')}</h3>
                <button onClick={onClose} className="text-neutral-500 hover:text-neutral-800" aria-label={t('login.close_button_label')}>
                    <XIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="p-6 overflow-y-auto custom-scroll flex-grow text-sm text-neutral-700 space-y-4">
                <p className="text-xs text-neutral-500">{t('legal.terms_of_service.last_updated')}</p>

                <h4 className="font-bold text-lg text-neutral-800 pt-2">{t('legal.terms_of_service.article1_title')}</h4>
                <p>{t('legal.terms_of_service.article1_content')}</p>

                <h4 className="font-bold text-lg text-neutral-800 pt-2">{t('legal.terms_of_service.article2_title')}</h4>
                <p>{t('legal.terms_of_service.article2_content')}</p>
                <div className="space-y-3 pl-4">
                    {OFFERS_DATA.map(offer => (
                        <div key={offer.id}>
                            <h5 className="font-semibold text-primary-dark">{offer.title}</h5>
                            <ul className="list-disc pl-5 mt-1 space-y-1 text-xs">
                                {offer.features.map((feature, index) => (
                                    <li key={index} dangerouslySetInnerHTML={{ __html: feature.replace(/<strong>/g, '<strong class="font-semibold">') }} />
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>


                <h4 className="font-bold text-lg text-neutral-800 pt-2">{t('legal.terms_of_service.article3_title')}</h4>
                <p>{t('legal.terms_of_service.article3_content')}</p>

                <h4 className="font-bold text-lg text-neutral-800 pt-2">{t('legal.terms_of_service.article4_title')}</h4>
                <h5 className="font-semibold text-neutral-800">{t('legal.terms_of_service.article4_platform_title')}</h5>
                <p>{t('legal.terms_of_service.article4_platform_content')}</p>
                <h5 className="font-semibold text-neutral-800 mt-2">{t('legal.terms_of_service.article4_client_title')}</h5>
                <p>{t('legal.terms_of_service.article4_client_content')}</p>
                
                <h4 className="font-bold text-lg text-neutral-800 pt-2">{t('legal.terms_of_service.article5_title')}</h4>
                <p>{t('legal.terms_of_service.article5_content')}</p>

            </div>
             <div className="p-4 bg-neutral-50 border-t flex justify-end items-center gap-4 no-print">
                 <button onClick={onClose} className="bg-neutral-200 text-neutral-700 font-semibold py-2 px-5 rounded-lg hover:bg-neutral-300 transition-colors">
                     {t('legal.close_button')}
                 </button>
                 <button onClick={onAccept} className="bg-success text-white font-semibold py-2 px-5 rounded-lg hover:bg-green-700 transition-colors">
                     {t('legal.terms_of_service.accept_button')}
                 </button>
            </div>
        </>
    );
};

export default TermsOfService;
