import React, { useState, useMemo, useContext } from 'react';
import { getGlossaryData } from '../../constants';
import LockedFeature from './LockedFeature';
import { UserTier } from '../../types';
import { LanguageContext } from '../../contexts/LanguageContext';

interface GlossaryProps {
    userTier: UserTier;
}

const Glossary: React.FC<GlossaryProps> = ({ userTier }) => {
    const { t } = useContext(LanguageContext);
    const GLOSSARY_DATA = useMemo(() => getGlossaryData(t), [t]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredGlossary = useMemo(() => {
        if (!searchTerm.trim()) {
            return GLOSSARY_DATA;
        }
        return GLOSSARY_DATA.filter(item =>
            item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.definition.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, GLOSSARY_DATA]);
    
    const isLocked = userTier === 'free';

    return (
        <LockedFeature isLocked={isLocked} featureName={t('tools.glossary.feature_name')}>
            <div>
                <p className="text-sm text-neutral-600 mb-4">
                    {t('tools.glossary.description')}
                </p>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('tools.glossary.search_placeholder')}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary mb-6"
                />
                <div className="space-y-4 max-h-[60vh] overflow-y-auto custom-scroll pr-2">
                    {filteredGlossary.length > 0 ? (
                        filteredGlossary.map((item) => (
                            <div key={item.term} className="p-4 border-b border-neutral-200">
                                <h4 className="font-bold text-primary">{item.term}</h4>
                                <p className="text-sm text-neutral-700 mt-1">{item.definition}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-neutral-500 py-4">{t('tools.glossary.no_results', { searchTerm })}</p>
                    )}
                </div>
            </div>
        </LockedFeature>
    );
};

export default Glossary;