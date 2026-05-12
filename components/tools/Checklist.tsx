import React, { useState, useEffect, useContext, useMemo } from 'react';
import { getChecklistData } from '../../constants';
import { LanguageContext } from '../../contexts/LanguageContext';

interface ChecklistItemState {
    id: number;
    text: string;
    completed: boolean;
}

const Checklist: React.FC = () => {
    const { t } = useContext(LanguageContext);
    const CHECKLIST_DATA = useMemo(() => getChecklistData(t), [t]);

    const [items, setItems] = useState<ChecklistItemState[]>(() => {
        try {
            const savedItems = window.localStorage.getItem('checklistItems');
            if (savedItems) {
                const parsedItems: {id: number, completed: boolean}[] = JSON.parse(savedItems);
                // Sync with latest text from locales, preserving completion
                return CHECKLIST_DATA.map(dataItem => {
                    const savedItem = parsedItems.find(i => i.id === dataItem.id);
                    return { ...dataItem, completed: savedItem ? savedItem.completed : false };
                });
            }
        } catch (error) {
            console.error('Failed to load checklist items from localStorage', error);
        }
        return CHECKLIST_DATA.map(item => ({ ...item, completed: false }));
    });
    
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        try {
            // Save only id and completion status to prevent language sync issues
            window.localStorage.setItem('checklistItems', JSON.stringify(items.map(({ id, completed }) => ({ id, completed }))));
        } catch (error) {
            console.error('Failed to save checklist items to localStorage', error);
        }
        const completedCount = items.filter(item => item.completed).length;
        setProgress(items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0);
    }, [items]);
    
    useEffect(() => {
        // Update item text on language change, preserving completion state
        setItems(prevItems => 
            CHECKLIST_DATA.map(newItem => {
                const existingItem = prevItems.find(i => i.id === newItem.id);
                return { ...newItem, completed: existingItem ? existingItem.completed : false };
            })
        );
    }, [CHECKLIST_DATA]);


    const handleToggle = (id: number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
    };

    return (
        <div>
            <div className="mb-4">
                <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-primary">{t('tools.checklist.progress')}</span>
                    <span className="text-sm font-medium text-primary">{progress}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2.5">
                    <div className="bg-success h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <div className="space-y-3 mt-6">
                {items.map(item => (
                    <div key={item.id} className="flex items-center">
                        <input
                            id={`checklist-${item.id}`}
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => handleToggle(item.id)}
                            className="w-5 h-5 text-primary bg-neutral-100 border-neutral-300 rounded focus:ring-primary"
                        />
                        <label
                            htmlFor={`checklist-${item.id}`}
                            className={`ms-3 text-sm font-medium text-neutral-700 ${item.completed ? 'line-through text-neutral-400' : ''}`}
                        >
                            {item.text}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Checklist;