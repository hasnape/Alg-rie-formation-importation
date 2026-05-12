import React, { useContext } from 'react';
import Checklist from './tools/Checklist';
import SimplePRCalculator from './tools/SimplePRCalculator';
import AdvancedCostSimulator from './tools/AdvancedCostSimulator';
import DocumentTemplates from './tools/DocumentTemplates';
import PersonalSupport from './tools/PersonalSupport';
import LockedFeature from './tools/LockedFeature';
import { UserTier } from '../types';
import SupplierChecklist from './tools/SupplierChecklist';
import Glossary from './tools/Glossary';
import ProductProfitabilityAnalyzer from './tools/ProductProfitabilityAnalyzer';
import { LanguageContext } from '../contexts/LanguageContext';

interface ToolsContainerProps {
    userTier: UserTier;
    activeTool: string;
}

const ToolsContainer: React.FC<ToolsContainerProps> = ({ userTier, activeTool }) => {
    const { t } = useContext(LanguageContext);
    
    const renderTool = () => {
        switch (activeTool) {
            case 'checklist':
                return <Checklist />;
            case 'calculators':
                return (
                    <div>
                         <SimplePRCalculator />
                         <div className="mt-8">
                             <LockedFeature 
                                 isLocked={userTier === 'free'}
                                 featureName={t('tools.advanced_simulator.feature_name')}
                             >
                                 <AdvancedCostSimulator />
                             </LockedFeature>
                         </div>
                    </div>
                );
            case 'templates':
                return <DocumentTemplates userTier={userTier} />;
            case 'profit-analyzer':
                return <ProductProfitabilityAnalyzer userTier={userTier} />;
            case 'supplier-checklist':
                return <SupplierChecklist userTier={userTier} />;
            case 'glossary':
                return <Glossary userTier={userTier} />;
            case 'support':
                return <PersonalSupport userTier={userTier} />;
            default:
                return <p>{t('tools.select_tool_prompt')}</p>;
        }
    };
    
    const toolTitles: { [key: string]: string } = {
        checklist: t('tools.checklist.title'),
        calculators: t('tools.calculators.title'),
        templates: t('tools.templates.title'),
        'profit-analyzer': t('tools.profit_analyzer.title'),
        'supplier-checklist': t('tools.supplier_checklist.title'),
        glossary: t('tools.glossary.title'),
        support: t('tools.support.title')
    };

    return (
        <div className="w-full bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-primary-dark mb-6">{toolTitles[activeTool] || t('tools.generic_title')}</h2>
            {renderTool()}
        </div>
    );
};

export default ToolsContainer;