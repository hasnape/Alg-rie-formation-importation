import React, { useState, useContext } from 'react';
import LockedFeature from './LockedFeature';
import { UserTier } from '../../types';
import { LanguageContext } from '../../contexts/LanguageContext';

interface PersonalSupportProps {
    userTier: UserTier;
}

const PersonalSupport: React.FC<PersonalSupportProps> = ({ userTier }) => {
    const { t } = useContext(LanguageContext);
    const [message, setMessage] = useState('');
    const [isSent, setIsSent] = useState(false);
    const isLocked = userTier === 'free';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            setIsSent(true);
            setTimeout(() => {
                setMessage('');
                setIsSent(false);
            }, 3000);
        }
    };

    return (
        <LockedFeature isLocked={isLocked} featureName={t('tools.support.feature_name')}>
             <div>
                <p className="text-sm text-neutral-600 mb-4">
                   {t('tools.support.description')}
                </p>
                {isSent ? (
                    <div className="p-4 text-center bg-green-100 text-success font-semibold rounded-lg">
                        ✅ {t('tools.support.success_message')}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={t('tools.support.placeholder')}
                            className="w-full h-32 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary-dark font-medium"
                        >
                            {t('tools.support.send_button')}
                        </button>
                    </form>
                )}
            </div>
        </LockedFeature>
    );
};

export default PersonalSupport;