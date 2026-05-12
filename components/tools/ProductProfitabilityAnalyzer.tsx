import React, { useState, useMemo, useContext } from 'react';
import LockedFeature from './LockedFeature';
import { UserTier } from '../../types';
import { LanguageContext } from '../../contexts/LanguageContext';

interface ProductProfitabilityAnalyzerProps {
    userTier: UserTier;
}

const ProductProfitabilityAnalyzer: React.FC<ProductProfitabilityAnalyzerProps> = ({ userTier }) => {
    const { t } = useContext(LanguageContext);
    const isLocked = userTier === 'free';
    const [inputs, setInputs] = useState({
        unitPrice: '',
        quantity: '',
        exchangeRate: '',
        shippingCost: '',
        otherFees: '',
        sellingPrice: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const calculations = useMemo(() => {
        const unitPrice = parseFloat(inputs.unitPrice) || 0;
        const quantity = parseInt(inputs.quantity, 10) || 0;
        const exchangeRate = parseFloat(inputs.exchangeRate) || 0;
        const shippingCost = parseFloat(inputs.shippingCost) || 0;
        const otherFees = parseFloat(inputs.otherFees) || 0;
        const sellingPrice = parseFloat(inputs.sellingPrice) || 0;
        const CUSTOMS_RATE = 0.05;

        if (unitPrice <= 0 || quantity <= 0 || exchangeRate <= 0 || sellingPrice <= 0) {
            return null;
        }

        const totalPurchaseCostDevise = unitPrice * quantity;
        const totalPurchaseCostDZD = totalPurchaseCostDevise * exchangeRate;
        
        const valueForCustoms = totalPurchaseCostDZD + shippingCost;
        const customsFee = valueForCustoms * CUSTOMS_RATE;

        const totalInvestment = totalPurchaseCostDZD + shippingCost + customsFee + otherFees;
        const costPerUnit = totalInvestment / quantity;

        const potentialRevenue = sellingPrice * quantity;
        const grossProfit = potentialRevenue - totalInvestment;
        const profitPerUnit = grossProfit / quantity;

        const profitMargin = potentialRevenue > 0 ? (grossProfit / potentialRevenue) * 100 : 0;
        const roi = totalInvestment > 0 ? (grossProfit / totalInvestment) * 100 : 0;

        return { totalInvestment, costPerUnit, potentialRevenue, grossProfit, profitPerUnit, profitMargin, roi };
    }, [inputs]);

    const InputField: React.FC<{ name: string, label: string, placeholder: string }> = ({ name, label, placeholder }) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-neutral-700 mb-1">{label}</label>
            <input
                type="number"
                id={name}
                name={name}
                value={inputs[name as keyof typeof inputs]}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary"
            />
        </div>
    );
    
    const formatCurrency = (value: number) => value.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' });

    const ResultCard: React.FC<{ title: string, value: string, subValue?: string, colorClass?: string }> = ({ title, value, subValue, colorClass = "text-primary" }) => (
         <div className="bg-white p-4 rounded-lg border border-neutral-200 text-center shadow-sm">
            <h4 className="text-sm font-medium text-neutral-500">{title}</h4>
            <p className={`text-2xl font-bold mt-1 ${colorClass}`}>{value}</p>
            {subValue && <p className="text-xs text-neutral-500 mt-1">{subValue}</p>}
        </div>
    );

    return (
        <LockedFeature isLocked={isLocked} featureName={t('tools.profit_analyzer.feature_name')}>
            <div>
                <p className="text-sm text-neutral-600 mb-6">
                    {t('tools.profit_analyzer.description')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg bg-neutral-50 mb-6">
                    <InputField name="unitPrice" label={t('tools.profit_analyzer.unit_price_label')} placeholder="ex: 10" />
                    <InputField name="quantity" label={t('tools.profit_analyzer.quantity_label')} placeholder="ex: 50" />
                    <InputField name="exchangeRate" label={t('tools.profit_analyzer.exchange_rate_label')} placeholder="ex: 145" />
                    <InputField name="shippingCost" label={t('tools.profit_analyzer.shipping_cost_label')} placeholder="ex: 5000" />
                    <InputField name="otherFees" label={t('tools.profit_analyzer.other_fees_label')} placeholder="ex: 1000" />
                    <InputField name="sellingPrice" label={t('tools.profit_analyzer.selling_price_label')} placeholder="ex: 3500" />
                </div>

                {calculations && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <ResultCard title={t('tools.profit_analyzer.total_investment')} value={formatCurrency(calculations.totalInvestment)} subValue={t('tools.profit_analyzer.per_unit', { value: formatCurrency(calculations.costPerUnit) })} />
                            <ResultCard title={t('tools.profit_analyzer.potential_revenue')} value={formatCurrency(calculations.potentialRevenue)} />
                            <ResultCard title={t('tools.profit_analyzer.gross_profit')} value={formatCurrency(calculations.grossProfit)} subValue={t('tools.profit_analyzer.per_unit', { value: formatCurrency(calculations.profitPerUnit)})} colorClass="text-success" />
                             <ResultCard title={t('tools.profit_analyzer.net_margin')} value={`${calculations.profitMargin.toFixed(2)} %`} colorClass="text-secondary" />
                        </div>
                         <div className="text-center bg-primary/10 border border-primary/20 rounded-lg p-4">
                            <h4 className="font-semibold text-primary">{t('tools.profit_analyzer.roi_title')}</h4>
                            <p className="text-4xl font-extrabold text-primary mt-1">{calculations.roi.toFixed(2)} %</p>
                            <p className="text-xs text-neutral-500 mt-1">{t('tools.profit_analyzer.roi_description', { value: calculations.roi.toFixed(2) })}</p>
                        </div>
                    </div>
                )}
            </div>
        </LockedFeature>
    );
};

export default ProductProfitabilityAnalyzer;