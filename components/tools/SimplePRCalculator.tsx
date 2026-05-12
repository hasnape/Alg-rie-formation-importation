import React, { useState, useMemo, useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';

const SimplePRCalculator: React.FC = () => {
    const { t } = useContext(LanguageContext);
    const [purchasePrice, setPurchasePrice] = useState('');
    const [exchangeRate, setExchangeRate] = useState('');
    const [shippingCost, setShippingCost] = useState('');
    const CUSTOMS_RATE = 0.05; // 5%

    const totalCost = useMemo(() => {
        const price = parseFloat(purchasePrice);
        const rate = parseFloat(exchangeRate);
        const shipping = parseFloat(shippingCost) || 0;

        if (isNaN(price) || isNaN(rate) || price <= 0 || rate <= 0) {
            return 0;
        }

        const priceInDZD = price * rate;
        const totalValueForCustoms = priceInDZD + shipping;
        const customsFee = totalValueForCustoms * CUSTOMS_RATE;
        
        return totalValueForCustoms + customsFee;
    }, [purchasePrice, exchangeRate, shippingCost]);

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

    return (
        <div className="p-4 border rounded-lg bg-neutral-50">
            <h3 className="text-lg font-bold text-neutral-800 mb-4">{t('tools.simple_calculator.title')}</h3>
            <div className="space-y-4">
                <InputField 
                    label={t('tools.simple_calculator.purchase_price_label')}
                    value={purchasePrice} 
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    placeholder={t('tools.simple_calculator.purchase_price_placeholder')}
                />
                <InputField 
                    label={t('tools.simple_calculator.exchange_rate_label')}
                    value={exchangeRate} 
                    onChange={(e) => setExchangeRate(e.target.value)}
                    placeholder={t('tools.simple_calculator.exchange_rate_placeholder')}
                />
                <InputField 
                    label={t('tools.simple_calculator.shipping_cost_label')}
                    value={shippingCost} 
                    onChange={(e) => setShippingCost(e.target.value)}
                    placeholder={t('tools.simple_calculator.shipping_cost_placeholder')}
                />
                <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">{t('tools.simple_calculator.customs_label')}</label>
                    <p className="w-full px-3 py-2 bg-neutral-200 rounded-lg text-neutral-700">{t('tools.simple_calculator.customs_value')}</p>
                </div>
                <div className="pt-4 border-t">
                    <p className="text-sm font-medium text-neutral-700">{t('tools.simple_calculator.result_label')}:</p>
                    <p className="text-2xl font-bold text-primary">
                        {totalCost > 0 ? totalCost.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' }) : '0.00 DZD'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SimplePRCalculator;