import React, { useState, useMemo, useContext, useEffect } from 'react';
import { getDocumentTemplatesData } from '../../constants';
import LockedFeature from './LockedFeature';
import { UserTier, DocumentTemplate } from '../../types';
import { LanguageContext } from '../../contexts/LanguageContext';

interface DocumentTemplatesProps {
    userTier: UserTier;
}

const DocumentTemplates: React.FC<DocumentTemplatesProps> = ({ userTier }) => {
    const { t } = useContext(LanguageContext);
    const DOCUMENT_TEMPLATES_DATA = useMemo(() => getDocumentTemplatesData(t), [t]);
    
    const isLocked = userTier === 'free';
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>(DOCUMENT_TEMPLATES_DATA[0].id);
    const [formData, setFormData] = useState<Record<string, string>>({});

    // Effect to reset the template if the current one is not in the list after a language change
    useEffect(() => {
        const templateExists = DOCUMENT_TEMPLATES_DATA.some(t => t.id === selectedTemplateId);
        if (!templateExists && DOCUMENT_TEMPLATES_DATA.length > 0) {
            setSelectedTemplateId(DOCUMENT_TEMPLATES_DATA[0].id);
            setFormData({});
        }
    }, [DOCUMENT_TEMPLATES_DATA, selectedTemplateId]);

    const selectedTemplate = useMemo(() => {
        return DOCUMENT_TEMPLATES_DATA.find(t => t.id === selectedTemplateId) || DOCUMENT_TEMPLATES_DATA[0] || null;
    }, [selectedTemplateId, DOCUMENT_TEMPLATES_DATA]);

    const handleInputChange = (id: string, value: string) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTemplateId(e.target.value);
        setFormData({}); // Reset form data when template changes
    };

    const generatePreviewContent = () => {
        if (!selectedTemplate) return "";
        let content = selectedTemplate.content;
        for (const field of selectedTemplate.fields) {
            const value = formData[field.id] || `[${field.label}]`;
            
            if (field.type === 'textarea') {
                const lines = value.split('\n');
                const tableRows = lines.map(line => {
                    const cells = line.split(';');
                    return `| ${cells.join(' | ')} |`;
                }).join('\n');
                content = content.replace(`{{${field.id}}}`, tableRows);

            } else {
                 content = content.replace(new RegExp(`{{${field.id}}}`, 'g'), value);
            }
        }
        return content.trim();
    };
    
    const handlePrint = () => {
        window.print();
    };

    if (!selectedTemplate) {
        return <div>{t('tools.templates.loading')}</div>
    }

    return (
        <LockedFeature isLocked={isLocked} featureName={t('tools.templates.feature_name')}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="no-print">
                    <div className="mb-6">
                        <label htmlFor="template-select" className="block text-sm font-medium text-neutral-700 mb-1">{t('tools.templates.select_label')}:</label>
                        <select
                            id="template-select"
                            value={selectedTemplateId}
                            onChange={handleTemplateChange}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary"
                        >
                            {DOCUMENT_TEMPLATES_DATA.map(template => (
                                <option key={template.id} value={template.id}>{template.title}</option>
                            ))}
                        </select>
                    </div>

                    <p className="text-sm text-neutral-600 mb-4">{selectedTemplate.description}</p>

                    <div className="space-y-4">
                        {selectedTemplate.fields.map(field => (
                            <div key={field.id}>
                                <label htmlFor={field.id} className="block text-sm font-medium text-neutral-700 mb-1">{field.label}</label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        id={field.id}
                                        value={formData[field.id] || ''}
                                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                                        placeholder={field.placeholder}
                                        rows={field.rows || 3}
                                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                ) : (
                                    <input
                                        type={field.type || 'text'}
                                        id={field.id}
                                        value={formData[field.id] || ''}
                                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                                        placeholder={field.placeholder}
                                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                     <button 
                        onClick={handlePrint}
                        className="mt-6 w-full text-center py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark text-sm font-medium"
                    >
                        {t('tools.templates.print_button')}
                    </button>
                </div>

                {/* Preview Section */}
                <div>
                     <h4 className="text-lg font-semibold text-neutral-800 mb-2 no-print">{t('tools.templates.preview_title')}</h4>
                     <div id="document-preview" className="printable-area bg-white border border-neutral-200 rounded-lg p-6 h-full min-h-[400px]">
                         <pre className="whitespace-pre-wrap text-sm text-neutral-800 font-sans">
                            {generatePreviewContent()}
                         </pre>
                     </div>
                </div>
            </div>
        </LockedFeature>
    );
};

export default DocumentTemplates;