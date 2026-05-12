import React, { useState, useContext, useEffect, useMemo } from 'react';
import { UserTier, Offer, Language } from './types';
import LoginScreen from './components/LoginScreen';
import { XIcon, CheckIcon, getOffersData } from './constants';
import MainContent from './components/MainContent';
import { LanguageProvider, LanguageContext } from './contexts/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import Footer from './components/Footer';
import LegalNotice from './components/legal/LegalNotice';
import CookiePolicy from './components/legal/CookiePolicy';
import TermsOfService from './components/legal/TermsOfService';

type LegalPage = 'notice' | 'cookies' | 'terms' | null;

const OfferCard: React.FC<{ offer: Offer; onSubscribeClick: (offer: Offer) => void; }> = ({ offer, onSubscribeClick }) => {
    const { t } = useContext(LanguageContext);
    const isRecommended = offer.isRecommended;

    return (
        <div className={`border rounded-xl p-6 flex flex-col transition-all duration-300 h-full ${isRecommended ? 'bg-primary text-white border-primary scale-105 shadow-2xl' : 'bg-white border-neutral-200 shadow-lg'}`}>
            {isRecommended && <div className="text-center mb-4"><span className="bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">{t('offer_card.recommended')}</span></div>}
            <div className="flex-grow">
                <h3 className={`text-xl font-bold mb-2 ${isRecommended ? "text-white" : "text-primary-dark"}`}>{offer.title}</h3>
                <div className="mb-4">
                    <p className={`text-4xl font-extrabold ${isRecommended ? "text-secondary" : "text-primary"}`}>{offer.price}</p>
                    {offer.priceSubtitle && <p className={`text-sm -mt-1 ${isRecommended ? 'opacity-80' : 'text-neutral-500'}`}>{offer.priceSubtitle}</p>}
                </div>
                <ul className="text-sm space-y-3">
                    {offer.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <CheckIcon className={`w-5 h-5 me-3 flex-shrink-0 ${isRecommended ? "text-secondary" : "text-success"}`} />
                            <span className={isRecommended ? 'opacity-90' : 'text-neutral-700'} dangerouslySetInnerHTML={{ __html: feature }} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-8">
                 <button
                    onClick={() => onSubscribeClick(offer)}
                    className={`block text-center w-full py-3 px-4 rounded-lg shadow-md text-sm font-semibold transition-transform duration-200 transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        isRecommended 
                        ? 'bg-white text-primary hover:bg-neutral-100 focus:ring-white' 
                        : offer.isFree
                        ? 'bg-primary-light text-white hover:bg-primary focus:ring-primary-light cursor-pointer'
                        : 'bg-secondary hover:bg-secondary-dark text-white focus:ring-secondary'
                    }`}
                 >
                    {offer.isFree ? t('offer_card.start_free') : t('offer_card.subscribe_now')}
                </button>
            </div>
        </div>
    );
};

const LandingPage: React.FC<{ onLoginClick: () => void; onSubscribeClick: (offer: Offer) => void; onShowLegal: (page: LegalPage) => void; }> = ({ onLoginClick, onSubscribeClick, onShowLegal }) => {
    const { t } = useContext(LanguageContext);
    const OFFERS_DATA = useMemo(() => getOffersData(t), [t]);
    const freeOffer = useMemo(() => OFFERS_DATA.find(o => o.isFree), [OFFERS_DATA]);
    
    return (
        <>
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-xl font-bold text-primary flex items-baseline gap-3">
                            <span>AlgérieFormation</span>
                            <span className="text-base font-medium text-neutral-500 hidden sm:inline-block">{t('header.title')}</span>
                        </h1>
                        <div className="flex items-center gap-4">
                          <LanguageSwitcher />
                          <button 
                              onClick={onLoginClick} 
                              className="bg-primary-light text-white font-semibold py-2 px-5 rounded-lg hover:bg-primary transition-colors"
                          >
                              {t('header.login_button')}
                          </button>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <section className="bg-neutral-50 py-20 px-4">
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                            <div className="text-left">
                                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-dark tracking-tight">
                                    {t('landing.hero_title_1')}<br />{t('landing.hero_title_2')}
                                </h2>
                                <p className="text-sm font-medium text-neutral-500 mt-2">{t('landing.by_repweb')}</p>
                                <p className="mt-6 text-lg max-w-xl text-neutral-600">
                                    {t('landing.hero_subtitle')}
                                </p>
                                <div className="mt-10 flex justify-start gap-4">
                                    {freeOffer && <button onClick={() => onSubscribeClick(freeOffer)} className="bg-primary text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-primary-dark transition-transform transform hover:scale-105 shadow-lg">
                                        {t('landing.hero_cta')}
                                    </button>}
                                </div>
                            </div>
                            
                            <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6 border border-neutral-200">
                                <div className="flex items-start">
                                    <CheckIcon className="w-7 h-7 text-success me-4 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-lg text-neutral-800">{t('landing.benefit1_title')}</h4>
                                        <p className="text-sm text-neutral-600 mt-1">{t('landing.benefit1_text')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <CheckIcon className="w-7 h-7 text-success me-4 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-lg text-neutral-800">{t('landing.benefit2_title')}</h4>
                                        <p className="text-sm text-neutral-600 mt-1">{t('landing.benefit2_text')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <CheckIcon className="w-7 h-7 text-success me-4 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-lg text-neutral-800">{t('landing.benefit3_title')}</h4>
                                        <p className="text-sm text-neutral-600 mt-1">{t('landing.benefit3_text')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section id="offers" className="py-20 bg-neutral-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-primary-dark">{t('landing.offers_title')}</h2>
                            <p className="mt-3 text-neutral-500">{t('landing.offers_subtitle')}</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-stretch">
                            {OFFERS_DATA.map(offer => <OfferCard key={offer.id} offer={offer} onSubscribeClick={onSubscribeClick} />)}
                        </div>
                    </div>
                </section>
            </main>
            <Footer onShowLegal={onShowLegal} />
        </>
    );
};

const AppContent: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        try {
            return window.localStorage.getItem('isLoggedIn') === 'true';
        } catch {
            return false;
        }
    });
    const [userTier, setUserTier] = useState<UserTier>(() => {
        try {
            return (window.localStorage.getItem('userTier') as UserTier) || 'free';
        } catch {
            return 'free';
        }
    });
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [legalPage, setLegalPage] = useState<LegalPage>(null);
    const [termsOffer, setTermsOffer] = useState<Offer | null>(null);

    const { language, t } = useContext(LanguageContext);

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    useEffect(() => {
        try {
            window.localStorage.setItem('isLoggedIn', String(isLoggedIn));
            window.localStorage.setItem('userTier', userTier);
        } catch (error) {
            console.error('Failed to save auth state to localStorage', error);
        }
    }, [isLoggedIn, userTier]);

    const handleLoginSuccess = (tier: UserTier) => {
        setUserTier(tier);
        setIsLoggedIn(true);
        setIsLoginModalOpen(false);
    };
    
    const handleOfferClick = (offer: Offer) => {
        setTermsOffer(offer);
    };

    const handleTermsAccept = () => {
        if (!termsOffer) return;
        
        if (termsOffer.isFree) {
            setUserTier('free');
            setIsLoggedIn(true);
        } else {
            const mailtoHref = `mailto:harbi.a@laposte.net?subject=${encodeURIComponent(t('offer_card.subscribe_subject', { title: termsOffer.title }))}&body=${encodeURIComponent(t('offer_card.subscribe_body', { title: termsOffer.title }))}`;
            window.location.href = mailtoHref;
        }
        setTermsOffer(null);
    };


    const handleLogout = () => {
        try {
            window.localStorage.removeItem('isLoggedIn');
            window.localStorage.removeItem('userTier');
            window.localStorage.removeItem('validatedModules');
            window.localStorage.removeItem('activeView');
            window.localStorage.removeItem('checklistItems');
            window.localStorage.removeItem('supplierChecklistItems');
            window.localStorage.removeItem('progressNoticeDismissed');
        } catch (error) {
            console.error('Failed to clear localStorage on logout', error);
        }
        setIsLoggedIn(false);
        setUserTier('free');
    };

    const renderLegalPage = () => {
        switch(legalPage) {
            case 'notice': return <LegalNotice onClose={() => setLegalPage(null)} />;
            case 'cookies': return <CookiePolicy onClose={() => setLegalPage(null)} />;
            case 'terms': return <TermsOfService onClose={() => setLegalPage(null)} onAccept={() => setLegalPage(null)} />;
            default: return null;
        }
    }

    return (
        <div className={`font-sans min-h-screen ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
            {isLoggedIn ? (
                <MainContent userTier={userTier} onLogout={handleLogout} />
            ) : (
                <LandingPage 
                    onLoginClick={() => setIsLoginModalOpen(true)} 
                    onSubscribeClick={handleOfferClick} 
                    onShowLegal={setLegalPage}
                />
            )}
            
            {(legalPage || termsOffer) && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl relative animate-slide-up flex flex-col max-h-[90vh]">
                       {legalPage ? renderLegalPage() : 
                        termsOffer ? <TermsOfService onClose={() => setTermsOffer(null)} onAccept={handleTermsAccept} /> : null}
                    </div>
                </div>
            )}

            {isLoginModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative transform transition-all animate-slide-up">
                        <button 
                            onClick={() => setIsLoginModalOpen(false)} 
                            className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-800"
                            aria-label={t('login.close_button_label')}
                        >
                            <XIcon className="w-6 h-6" />
                        </button>

                        <h2 className="text-2xl font-bold text-primary mb-4 text-center">{t('login.title')}</h2>
                        <p className="text-center text-neutral-600 mb-6">{t('login.subtitle')}</p>

                        <LoginScreen onLoginSuccess={handleLoginSuccess} />
                    </div>
                </div>
            )}
        </div>
    );
};

const App: React.FC = () => (
    <LanguageProvider>
        <AppContent />
    </LanguageProvider>
);

export default App;