import React, { useState, FormEvent, useEffect, useContext, useMemo } from 'react';
import { QuizQuestion, UserTier } from '../types';
import { getModulesData, CheckIcon, LockIcon, XIcon, MenuIcon, SpeakerOnIcon, SpeakerOffIcon } from '../constants';
import ToolsContainer from './ToolsContainer';
import { LanguageContext } from '../contexts/LanguageContext';
import Certificate from './Certificate';

const FREE_MODULE_IDS = [1, 2, 6, 12];

const QuizForm: React.FC<{ questions: QuizQuestion[]; onSubmit: (answers: Record<string, string>) => void; }> = ({ questions, onSubmit }) => {
    const { t } = useContext(LanguageContext);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const handleChange = (id: string, value: string) => setAnswers(prev => ({ ...prev, [id]: value }));
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(answers);
    };
    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {questions.map((q) => (
                <div key={q.id}>
                    <label htmlFor={`answer-${q.id}`} className="font-semibold text-neutral-700 block mb-1">{q.label}</label>
                    {q.type === 'text' ? (
                        <input type="text" id={`answer-${q.id}`} className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-primary focus:border-primary" required onChange={(e) => handleChange(q.id, e.target.value)} />
                    ) : (
                        <select id={`answer-${q.id}`} className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:ring-primary focus:border-primary" required onChange={(e) => handleChange(q.id, e.target.value)}>
                            {q.options?.map(opt => <option key={opt} value={opt === t('modules.quiz_options.choose') ? '' : opt}>{opt}</option>)}
                        </select>
                    )}
                </div>
            ))}
            <button type="submit" className="py-2 px-5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">{t('main.validate_quiz_button')}</button>
        </form>
    );
};

const MainContent: React.FC<{ userTier: UserTier, onLogout: () => void }> = ({ userTier, onLogout }) => {
    const { t, language } = useContext(LanguageContext);
    const MODULES_DATA = useMemo(() => getModulesData(t), [t]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [validatedModules, setValidatedModules] = useState<Record<number, boolean>>(() => {
        try {
            const saved = window.localStorage.getItem('validatedModules');
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    });
    const [showCertificate, setShowCertificate] = useState(false);
    const [quizResults, setQuizResults] = useState<Record<number, string | null>>({});
    const [activeView, setActiveView] = useState<{ type: 'module' | 'tool'; id: number | string }>(() => {
        try {
            const saved = window.localStorage.getItem('activeView');
            return saved ? JSON.parse(saved) : { type: 'module', id: 1 };
        } catch {
            return { type: 'module', id: 1 };
        }
    });
    const [moduleView, setModuleView] = useState<'content' | 'quiz'>('content');
    const [isReading, setIsReading] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [showProgressNotice, setShowProgressNotice] = useState(() => {
        try {
            return window.localStorage.getItem('progressNoticeDismissed') !== 'true';
        } catch {
            return true;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem('validatedModules', JSON.stringify(validatedModules));
        } catch (error) {
            console.error('Failed to save validated modules to localStorage', error);
        }
    }, [validatedModules]);

    useEffect(() => {
        try {
            window.localStorage.setItem('activeView', JSON.stringify(activeView));
        } catch (error) {
            console.error('Failed to save active view to localStorage', error);
        }
    }, [activeView]);

    const dismissProgressNotice = () => {
        try {
            window.localStorage.setItem('progressNoticeDismissed', 'true');
            setShowProgressNotice(false);
        } catch (error) {
            console.error('Failed to dismiss progress notice', error);
        }
    };


    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
            }
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        return () => {
            window.speechSynthesis.cancel();
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    useEffect(() => {
        window.speechSynthesis.cancel();
        setIsReading(false);
    }, [activeView]);

    const stripHtml = (html: string): string => {
        const tempDiv = document.createElement('div');
        const sanitizedHtml = html
            .replace(/\*\*/g, '') // Remove markdown bold asterisks
            .replace(/`{3}([\s\S]*?)`{3}/g, `<p>${t('main.code_block_placeholder')}</p>`);
        tempDiv.innerHTML = sanitizedHtml;

        tempDiv.querySelectorAll('h1, h2, h3, h4, p, li').forEach(el => {
            const text = el.textContent?.trim() || '';
            if (text && !/[.!?]$/.test(text)) {
                el.textContent = text + '.';
            }
        });

        return tempDiv.textContent || "";
    };
    
    const handleToggleReadAloud = (text: string) => {
        if (isReading) {
            window.speechSynthesis.cancel();
            setIsReading(false);
            return;
        }

        const cleanedText = stripHtml(text);
        if (!cleanedText.trim()) return;

        const utterance = new SpeechSynthesisUtterance(cleanedText);
        
        const langCode = language === 'ar' ? 'ar' : language === 'fr' ? 'fr' : 'en';
        
        let selectedVoice = voices.find(voice => voice.lang.startsWith(langCode) && voice.localService);
        if (!selectedVoice) {
            selectedVoice = voices.find(voice => voice.lang.startsWith(langCode));
        }

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        utterance.lang = langCode;

        utterance.onend = () => setIsReading(false);
        utterance.onerror = () => setIsReading(false);

        window.speechSynthesis.speak(utterance);
        setIsReading(true);
    };


    const handleQuizSubmit = (moduleId: number, userAnswers: Record<string, string>) => {
        const module = MODULES_DATA.find(m => m.id === moduleId);
        if (!module) return;

        let correctCount = 0;
        module.quiz.questions.forEach((q, index) => {
            const userAnswer = userAnswers[q.id]?.trim().toLowerCase() || '';
            const correctAnswer = module.quiz.answers[index].toLowerCase();
            if (userAnswer.includes(correctAnswer)) correctCount++;
        });

        const score = Math.round((correctCount / module.quiz.questions.length) * 100);
        const isValid = score === 100;
        const feedback = `${t('main.score_prefix')}: ${score}%. ${isValid ? t('main.quiz_success') : t('main.quiz_failure')}`;

        setQuizResults(prev => ({ ...prev, [moduleId]: feedback }));
        if (isValid) setValidatedModules(prev => ({ ...prev, [moduleId]: true }));
    };

    const handleSelectModule = (moduleId: number) => {
        const isModuleLocked = userTier === 'free' && !FREE_MODULE_IDS.includes(moduleId);
        if (isModuleLocked) {
            alert(t('main.module_locked_alert'));
            return;
        }
        setActiveView({ type: 'module', id: moduleId });
        setModuleView('content');
        setQuizResults(prev => ({ ...prev, [moduleId]: null }));
        setIsSidebarOpen(false); // Close sidebar on mobile
    };
    
    useEffect(() => {
        const accessibleModules = userTier === 'free' ? MODULES_DATA.filter(m => FREE_MODULE_IDS.includes(m.id)) : MODULES_DATA;
        const allValidated = accessibleModules.length > 0 && accessibleModules.every(module => validatedModules[module.id]);
        
        if (allValidated && userTier !== 'free') {
            setShowCertificate(true);
        } else {
            setShowCertificate(false);
        }
    }, [validatedModules, userTier, MODULES_DATA]);

    const tools = [
        { id: 'checklist', label: t('tools.checklist.title'), isLocked: false },
        { id: 'calculators', label: t('tools.calculators.title'), isLocked: false },
        { id: 'templates', label: t('tools.templates.title'), isLocked: userTier === 'free' },
        { id: 'profit-analyzer', label: t('tools.profit_analyzer.title'), isLocked: userTier === 'free' },
        { id: 'supplier-checklist', label: t('tools.supplier_checklist.title'), isLocked: userTier === 'free' },
        { id: 'glossary', label: t('tools.glossary.title'), isLocked: userTier === 'free' },
        { id: 'support', label: t('tools.support.title'), isLocked: userTier === 'free' },
    ];
    
    const handleSelectTool = (toolId: string) => {
        const tool = tools.find(t => t.id === toolId);
        if (tool?.isLocked) return;
        setActiveView({ type: 'tool', id: toolId });
        setIsSidebarOpen(false); // Close sidebar on mobile
    };

    const renderContent = () => {
        if (activeView.type === 'tool') {
            return <ToolsContainer userTier={userTier} activeTool={activeView.id as string} />;
        }
        
        const currentModule = MODULES_DATA.find(m => m.id === activeView.id);
        if (!currentModule) return <p>{t('main.module_not_found')}</p>;

        const resultForCurrentModule = quizResults[currentModule.id];

        return (
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                {moduleView === 'content' && (
                    <div>
                        <div className="flex justify-between items-start mb-4 gap-4">
                            <h3 className="text-2xl font-bold text-neutral-800">{currentModule.title}</h3>
                             <button 
                                onClick={() => handleToggleReadAloud(currentModule.description)}
                                className="flex items-center gap-2 text-sm font-semibold py-2 px-4 rounded-lg transition-colors text-primary bg-primary/10 hover:bg-primary/20 flex-shrink-0"
                                aria-label={isReading ? t('main.stop') : t('main.play')}
                            >
                                {isReading ? <SpeakerOffIcon className="w-5 h-5" /> : <SpeakerOnIcon className="w-5 h-5" />}
                                <span>{isReading ? t('main.stop') : t('main.play')}</span>
                            </button>
                        </div>
                        <div className="prose max-w-none text-neutral-700 whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{ __html: currentModule.description.replace(/`{3}([\s\S]*?)`{3}/g, '<pre class="bg-neutral-100 p-3 rounded-md text-sm font-mono my-2 overflow-x-auto"><code>$1</code></pre>') }}></div>
                        <div className="flex items-center gap-4 mt-8">
                            <button onClick={() => setModuleView('quiz')} className="py-2 px-6 bg-secondary text-white font-semibold rounded-lg shadow hover:bg-secondary-dark transition-transform transform hover:scale-105">{t('main.start_quiz_button')}</button>
                        </div>
                    </div>
                )}
                {moduleView === 'quiz' && (
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-neutral-800">{t('main.quiz_title_prefix')}: {currentModule.title}</h3>
                        {!resultForCurrentModule ? (
                            <QuizForm questions={currentModule.quiz.questions} onSubmit={(answers) => handleQuizSubmit(currentModule.id, answers)} />
                        ) : (
                            <div className="space-y-4">
                                <div className={`font-semibold p-4 border rounded-lg ${validatedModules[currentModule.id] ? 'bg-green-100 border-green-300 text-success' : 'bg-red-100 border-red-300 text-red-600'}`}>{resultForCurrentModule}</div>
                                {validatedModules[currentModule.id] ? (
                                    <button onClick={() => { const nextModuleId = currentModule.id + 1; const nextModule = MODULES_DATA.find(m => m.id === nextModuleId); if(nextModule) handleSelectModule(nextModuleId); }} className="py-2 px-6 bg-success text-white rounded-lg shadow hover:bg-green-700 font-semibold">{t('main.next_module_button')} &rarr;</button>
                                ) : (
                                    <button onClick={() => { setModuleView('content'); setQuizResults(prev => ({ ...prev, [currentModule.id]: null })); }} className="py-2 px-6 bg-primary text-white rounded-lg shadow hover:bg-primary-dark font-semibold">{t('main.review_module_button')}</button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const sidebarContent = (
      <>
        <div className="p-5 border-b border-neutral-200 flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold text-primary">{t('main.sidebar_header_title')}</h2>
                <span className="text-sm text-neutral-500 capitalize">{t(`userTiers.${userTier}`)}</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-1 text-neutral-500 hover:text-neutral-800" aria-label="Close menu">
                <XIcon className="w-6 h-6" />
            </button>
        </div>
        <nav className="flex-grow p-4 space-y-6 custom-scroll overflow-y-auto">
            <div>
                <h3 className="px-2 mb-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">{t('main.sidebar_training_section')}</h3>
                <div className="space-y-1">
                    {MODULES_DATA.map(module => {
                        const isLocked = userTier === 'free' && !FREE_MODULE_IDS.includes(module.id);
                        return (
                            <button
                                key={module.id}
                                onClick={() => handleSelectModule(module.id)}
                                disabled={isLocked}
                                className={`w-full text-left p-3 rounded-lg transition-colors duration-200 flex items-center justify-between text-sm font-medium ${activeView.type === 'module' && activeView.id === module.id ? 'bg-primary text-white shadow' : 'text-neutral-600 hover:bg-neutral-100'} ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <span>{module.title}</span>
                                <div className="flex items-center space-x-2 ps-2">
                                    {validatedModules[module.id] && <CheckIcon className="w-5 h-5 text-success flex-shrink-0" />}
                                    {isLocked && <LockIcon className="w-4 h-4 text-neutral-400 flex-shrink-0" />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
            <div>
                <h3 className="px-2 mb-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">{t('main.sidebar_tools_section')}</h3>
                <div className="space-y-1">
                     {tools.map(tool => (
                        <button
                            key={tool.id}
                            onClick={() => handleSelectTool(tool.id)}
                            disabled={tool.isLocked}
                            className={`w-full text-left p-3 rounded-lg transition-colors duration-200 flex items-center justify-between text-sm font-medium ${activeView.type === 'tool' && activeView.id === tool.id ? 'bg-primary text-white shadow' : 'text-neutral-600 hover:bg-neutral-100'} ${tool.isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <span>{tool.label}</span>
                            {tool.isLocked && <LockIcon className="w-4 h-4 text-neutral-400 flex-shrink-0" />}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
        <div className="p-4 border-t border-neutral-200">
            <button onClick={onLogout} className="w-full text-left p-3 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-colors">
                {t('main.logout_button')}
            </button>
        </div>
      </>
    );

    return (
        <div className="relative min-h-screen bg-neutral-100 lg:flex">
            <aside
                className={`fixed inset-y-0 left-0 bg-white shadow-lg flex flex-col flex-shrink-0 no-print w-80 max-w-[calc(100%-3rem)] z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:max-w-none ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                aria-hidden={!isSidebarOpen}
            >
                {sidebarContent}
            </aside>

            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
                    onClick={() => setIsSidebarOpen(false)}
                    aria-label="Close menu"
                ></div>
            )}
            
            <div className="flex-1 flex flex-col min-w-0">
                <header className="lg:hidden bg-white shadow-md sticky top-0 z-30 flex items-center justify-between p-4 no-print">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-neutral-600 p-1" aria-label="Open menu">
                         <MenuIcon className="w-6 h-6" />
                    </button>
                    <h2 className="text-lg font-bold text-primary truncate px-2">MIAFORMATION</h2>
                    <div className="w-7"></div> {/* Spacer to balance the hamburger icon */}
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-10 custom-scroll overflow-y-auto">
                    {showProgressNotice && (
                        <div className="bg-primary/10 border border-primary/20 text-primary-dark p-4 rounded-lg mb-6 flex items-start gap-4 animate-fade-in">
                            <div className="flex-shrink-0 pt-1">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div className="flex-grow">
                                <h4 className="font-bold">{t('main.progress_saved_notice_title')}</h4>
                                <p className="text-sm mt-1">{t('main.progress_saved_notice_message')}</p>
                            </div>
                            <button onClick={dismissProgressNotice} className="text-primary-dark/70 hover:text-primary-dark" aria-label={t('main.progress_saved_notice_dismiss')}>
                               <XIcon className="w-5 h-5"/>
                            </button>
                        </div>
                    )}
                    {renderContent()}
                    {showCertificate && activeView.type === 'module' && <Certificate userTier={userTier} />}
                </main>
            </div>
        </div>
    );
};

export default MainContent;