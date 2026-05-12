import React, { useState, useContext, useEffect, useMemo } from 'react';
import { getSupplierChecklistData } from '../../constants';
import LockedFeature from './LockedFeature';
import { UserTier } from '../../types';
import { LanguageContext } from '../../contexts/LanguageContext';

interface SupplierChecklistProps {
    userTier: UserTier;
}

interface ChecklistItemState {
    id: number;
    text: string;
    completed: boolean;
}

const SupplierChecklist: React.FC<SupplierChecklistProps> = ({ userTier }) => {
    const { t } = useContext(LanguageContext);
    const SUPPLIER_CHECKLIST_DATA = useMemo(() => getSupplierChecklistData(t), [t]);

    const [items, setItems] = useState<ChecklistItemState[]>(() => {
        try {
            const savedItems = window.localStorage.getItem('supplierChecklistItems');
            if (savedItems) {
                const parsedItems: {id: number, completed: boolean}[] = JSON.parse(savedItems);
                return SUPPLIER_CHECKLIST_DATA.map(dataItem => {
                    const savedItem = parsedItems.find(i => i.id === dataItem.id);
                    return { ...dataItem, completed: savedItem ? savedItem.completed : false };
                });
            }
        } catch (error) {
            console.error('Failed to load supplier checklist from localStorage', error);
        }
        return SUPPLIER_CHECKLIST_DATA.map(item => ({ ...item, completed: false }));
    });
    
    useEffect(() => {
        try {
            window.localStorage.setItem('supplierChecklistItems', JSON.stringify(items.map(({ id, completed }) => ({ id, completed }))));
        } catch (error) {
            console.error('Failed to save supplier checklist to localStorage', error);
        }
    }, [items]);

    useEffect(() => {
        // This effect ensures that if the language changes, the text of the checklist items
        // is updated while preserving the completion status.
        setItems(prevItems => SUPPLIER_CHECKLIST_DATA.map(newItem => {
            const existingItem = prevItems.find(i => i.id === newItem.id);
            return { ...newItem, completed: existingItem ? existingItem.completed : false };
        }));
    }, [SUPPLIER_CHECKLIST_DATA]);


    const handleToggle = (id: number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
    };

    const isLocked = userTier === 'free';

    return (
        <LockedFeature isLocked={isLocked} featureName={t('tools.supplier_checklist.feature_name')}>
            <div>
                <p className="text-sm text-neutral-600 mb-6">
                    {t('tools.supplier_checklist.description')}
                </p>
                <div className="space-y-3">
                    {items.map(item => (
                        <div key={item.id} className="flex items-center p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                            <input
                                id={`supplier-checklist-${item.id}`}
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => handleToggle(item.id)}
                                className="w-5 h-5 text-primary bg-neutral-100 border-neutral-300 rounded focus:ring-primary flex-shrink-0"
                            />
                            <label
                                htmlFor={`supplier-checklist-${item.id}`}
                                className={`ms-3 text-sm font-medium text-neutral-800 ${item.completed ? 'line-through text-neutral-500' : ''}`}
                            >
                                {item.text}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </LockedFeature>
    );
};

export default SupplierChecklist;