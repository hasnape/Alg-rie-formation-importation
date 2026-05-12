import React, { useState, useMemo, useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

const AdvancedCostSimulator: React.FC = () => {
    const { t } = useContext(LanguageContext);
    const [purchasePrice, setPurchasePrice] = useState('');
    const [exchangeRate, setExchangeRate] = useState('');
    const [shippingCost, setShippingCost] = useState('');
    const [otherFees, setOtherFees] = useState('');
    const [profitMargin, setProfitMargin] = useState('');
    const CUSTOMS_RATE = 0.05; // 5%

    const calculations = useMemo(() => {
        const price = parseFloat(purchasePrice);
        const rate = parseFloat(exchangeRate);
        const shipping = parseFloat(shippingCost) || 0;
        const fees = parseFloat(otherFees) || 0;
        const margin = parseFloat(profitMargin) || 0;

        if (isNaN(price) || isNaN(rate) || price <= 0 || rate <= 0) {
            return {
                priceInDZD: 0,
                customsFee: 0,
                totalCost: 0,
                profitAmount: 0,
                recommendedPrice: 0,
            };
        }

        const priceInDZD = price * rate;
        const totalValueForCustoms = priceInDZD + shipping;
        const customsFee = totalValueForCustoms * CUSTOMS_RATE;
        const totalCost = totalValueForCustoms + customsFee + fees;
        
        const profitAmount = totalCost * (margin / 100);
        const sellingPrice = totalCost + profitAmount;

        return { 
            priceInDZD,
            customsFee,
            totalCost,
            profitAmount,
            recommendedPrice: sellingPrice, 
        };
    }, [purchasePrice, exchangeRate, shippingCost, otherFees, profitMargin]);

    const InputField: React.FC<{ label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string }> = 
    ({ label, value, onChange, placeholder }) => (
        <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">{label}</label>
            <input
                type="number"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary"
            />
        </div>
    );
    
    const formatCurrency = (value: number) => {
        return value.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    const BreakdownRow: React.FC<{label: string, value: string, isBold?: boolean}> = ({ label, value, isBold }) => (
        <div className={`flex justify-between items-center py-2 ${isBold ? 'font-bold text-neutral-800' : 'text-neutral-600'}`}>
            <span className="text-sm">{label}</span>
            <span className="text-sm">{value}</span>
        </div>
    );

    return (
        <div className="p-4 border rounded-lg bg-neutral-50">
            <h3 className="text-lg font-bold text-neutral-800 mb-4">{t('tools.advanced_simulator.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField 
                    label={t('tools.advanced_simulator.purchase_price_label')}
                    value={purchasePrice} 
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    placeholder="ex: 100"
                />
                <InputField 
                    label={t('tools.advanced_simulator.exchange_rate_label')}
                    value={exchangeRate} 
                    onChange={(e) => setExchangeRate(e.target.value)}
                    placeholder="ex: 145.5"
                />
                <InputField 
                    label={t('tools.advanced_simulator.shipping_cost_label')}
                    value={shippingCost} 
                    onChange={(e) => setShippingCost(e.target.value)}
                    placeholder="ex: 2000"
                />
                <InputField 
                    label={t('tools.advanced_simulator.other_fees_label')}
                    value={otherFees} 
                    onChange={(e) => setOtherFees(e.target.value)}
                    placeholder="ex: 500"
                />
                <InputField 
                    label={t('tools.advanced_simulator.profit_margin_label')}
                    value={profitMargin} 
                    onChange={(e) => setProfitMargin(e.target.value)}
                    placeholder="ex: 30"
                />
            </div>
            
            <div className="mt-6 pt-4 border-t">
                 <h4 className="text-md font-semibold text-neutral-700 mb-2">{t('tools.advanced_simulator.breakdown_title')}:</h4>
                 <div className="space-y-1 bg-white p-3 rounded-lg border">
                    <BreakdownRow label={t('tools.advanced_simulator.breakdown_purchase_price')} value={formatCurrency(calculations.priceInDZD)} />
                    <BreakdownRow label={t('tools.advanced_simulator.breakdown_shipping')} value={formatCurrency(parseFloat(shippingCost) || 0)} />
                    <BreakdownRow label={t('tools.advanced_simulator.breakdown_customs')} value={formatCurrency(calculations.customsFee)} />
                    <BreakdownRow label={t('tools.advanced_simulator.breakdown_other_fees')} value={formatCurrency(parseFloat(otherFees) || 0)} />
                    <div className="border-t my-1"></div>
                    <BreakdownRow label={t('tools.advanced_simulator.breakdown_total_cost')} value={formatCurrency(calculations.totalCost)} isBold={true} />
                 </div>
            </div>

            <div className="mt-6 pt-4 border-t">
                <p className="text-sm font-medium text-neutral-700">{t('tools.advanced_simulator.result_label')}:</p>
                <p className="text-2xl font-bold text-secondary">
                    {calculations.recommendedPrice > 0 ? formatCurrency(calculations.recommendedPrice) : '0.00 DZD'}
                </p>
                <p className="text-sm font-medium text-neutral-500 mt-1">
                    {t('tools.advanced_simulator.result_profit_margin')}: +{calculations.profitAmount > 0 ? formatCurrency(calculations.profitAmount) : '0.00 DZD'}
                </p>
            </div>
        </div>
    );
};

export default AdvancedCostSimulator;