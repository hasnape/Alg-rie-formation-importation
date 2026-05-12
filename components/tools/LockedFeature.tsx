import React, { useContext } from 'react';
import { LockIcon } from '../../constants';
import { LanguageContext } from '../../contexts/LanguageContext';

interface LockedFeatureProps {
    isLocked: boolean;
    featureName: string;
    children: React.ReactNode;
}

const LockedFeature: React.FC<LockedFeatureProps> = ({ isLocked, featureName, children }) => {
    const { t } = useContext(LanguageContext);
    
    if (!isLocked) {
        return <>{children}</>;
    }

    return (
        <div className="relative">
            <div className="blur-sm pointer-events-none opacity-50">{children}</div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-100/80 rounded-lg p-4">
                <LockIcon className="w-10 h-10 text-neutral-500 mb-3" />
                <h4 className="font-bold text-lg text-center text-neutral-800">{t('locked_feature.title')}</h4>
                <p className="text-sm text-neutral-600 mb-4 text-center">
                    {t('locked_feature.unlock_prompt', { featureName })}
                </p>
                <a href="#offers" className="w-full text-center py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark text-sm font-medium">
                    {t('locked_feature.cta_button')}
                </a>
            </div>
        </div>
    );
};

export default LockedFeature;