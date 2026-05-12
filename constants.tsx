import React from 'react';
import { ModuleData, Offer, ChecklistItem, DocumentTemplate, GlossaryTerm } from './types';

export const CheckIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 mr-2 flex-shrink-0" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
    </svg>
);

export const XIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
);

export const MenuIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
);

export const LockIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-gray-400 flex-shrink-0" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
    </svg>
);

export const SpeakerOnIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
);

export const SpeakerOffIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l-4-4m0 4l4-4"></path>
    </svg>
);

export const getOffersData = (t: (key: string, options?: any) => string): Offer[] => [
    {
        id: 1,
        title: t('offers.essential.title'),
        price: t('offers.essential.price'),
        isFree: true,
        features: [
            t('offers.essential.feature1'),
            t('offers.essential.feature2'),
            t('offers.essential.feature3'),
        ],
    },
    {
        id: 2,
        title: t('offers.support.title'),
        price: t('offers.support.price'),
        priceSubtitle: t('offers.support.priceSubtitle'),
        isRecommended: true,
        features: [
            t('offers.support.feature1'),
            t('offers.support.feature2'),
            t('offers.support.feature3'),
            t('offers.support.feature4'),
            t('offers.support.feature5'),
            t('offers.support.feature6'),
        ]
    },
    {
        id: 3,
        title: t('offers.turnkey.title'),
        price: t('offers.turnkey.price'),
        priceSubtitle: t('offers.turnkey.priceSubtitle'),
        features: [
            t('offers.turnkey.feature1'),
            t('offers.turnkey.feature2'),
            t('offers.turnkey.feature3'),
            t('offers.turnkey.feature4'),
        ],
    },
    {
        id: 4,
        title: t('offers.expat.title'),
        price: t('offers.expat.price'),
        priceSubtitle: t('offers.expat.priceSubtitle'),
        features: [
            t('offers.expat.feature1'),
            t('offers.expat.feature2'),
            t('offers.expat.feature3'),
            t('offers.expat.feature4'),
            t('offers.expat.feature5'),
            t('offers.expat.feature6'),
            t('offers.expat.feature7'),
        ],
    }
];

export const getChecklistData = (t: (key: string) => string): ChecklistItem[] => [
    { id: 1, text: t('checklist.item1') },
    { id: 2, text: t('checklist.item2') },
    { id: 3, text: t('checklist.item3') },
    { id: 4, text: t('checklist.item4') },
    { id: 5, text: t('checklist.item5') },
    { id: 6, text: t('checklist.item6') },
    { id: 7, text: t('checklist.item7') },
    { id: 8, text: t('checklist.item8') }
];

export const getSupplierChecklistData = (t: (key: string) => string): ChecklistItem[] => [
    { id: 1, text: t('supplier_checklist.item1') },
    { id: 2, text: t('supplier_checklist.item2') },
    { id: 3, text: t('supplier_checklist.item3') },
    { id: 4, text: t('supplier_checklist.item4') },
    { id: 5, text: t('supplier_checklist.item5') },
    { id: 6, text: t('supplier_checklist.item6') },
    { id: 7, text: t('supplier_checklist.item7') },
    { id: 8, text: t('supplier_checklist.item8') },
    { id: 9, text: t('supplier_checklist.item9') },
    { id: 10, text: t('supplier_checklist.item10') }
];

export const getGlossaryData = (t: (key: string) => string): GlossaryTerm[] => [
    { term: "ANAE", definition: t('glossary.anae') },
    { term: "Incoterms", definition: t('glossary.incoterms') },
    { term: "EXW (Ex Works)", definition: t('glossary.exw') },
    { term: "FOB (Free On Board)", definition: t('glossary.fob') },
    { term: "Facture Proforma", definition: t('glossary.proforma') },
    { term: "Liste de Colisage (Packing List)", definition: t('glossary.packing_list') },
    { term: "Transitaire (Freight Forwarder)", definition: t('glossary.forwarder') },
    { term: "Dédouanement", definition: t('glossary.customs_clearance') },
    { term: "NIF (Numéro d'Identification Fiscale)", definition: t('glossary.nif') },
    { term: "CASNOS", definition: t('glossary.casnos') },
    { term: "Trade Assurance", definition: t('glossary.trade_assurance') },
    { term: "Sourcing", definition: t('glossary.sourcing') }
];

export const getDocumentTemplatesData = (t: (key: string, options?: any) => string): DocumentTemplate[] => [
    {
        id: 'proforma',
        title: t('docs.proforma.title'),
        description: t('docs.proforma.description'),
        fields: [
            { id: 'importerName', label: t('docs.fields.your_name'), placeholder: t('docs.placeholders.importer_name') },
            { id: 'importerAddress', label: t('docs.fields.your_address'), placeholder: t('docs.placeholders.importer_address') },
            { id: 'anaeNumber', label: t('docs.fields.your_anae'), placeholder: t('docs.placeholders.anae_number') },
            { id: 'proformaNumber', label: t('docs.fields.proforma_number'), placeholder: t('docs.placeholders.proforma_number') },
            { id: 'date', label: t('docs.fields.date'), type: 'date' },
            { id: 'sellerName', label: t('docs.fields.seller_name'), placeholder: t('docs.placeholders.seller_name') },
            { id: 'sellerAddress', label: t('docs.fields.seller_address'), placeholder: t('docs.placeholders.seller_address') },
            { id: 'products', label: t('docs.fields.product_details_multiline'), type: 'textarea', rows: 5, placeholder: t('docs.placeholders.proforma_products') },
            { id: 'incoterms', label: t('docs.fields.incoterms'), placeholder: t('docs.placeholders.incoterms') },
            { id: 'originCountry', label: t('docs.fields.origin_country'), placeholder: t('docs.placeholders.origin_country') },
        ],
        content: t('docs.proforma.content')
    },
    {
        id: 'packing-list',
        title: t('docs.packing_list.title'),
        description: t('docs.packing_list.description'),
        fields: [
            { id: 'importerName', label: t('docs.fields.your_name'), placeholder: t('docs.placeholders.importer_name') },
            { id: 'proformaRef', label: t('docs.fields.proforma_ref'), placeholder: t('docs.placeholders.proforma_number') },
            { id: 'date', label: t('docs.fields.date'), type: 'date' },
            { id: 'packages', label: t('docs.fields.package_details_multiline'), type: 'textarea', rows: 5, placeholder: t('docs.placeholders.packing_list_packages') },
        ],
        content: t('docs.packing_list.content')
    },
    {
        id: 'rfq',
        title: t('docs.rfq.title'),
        description: t('docs.rfq.description'),
        fields: [
            { id: 'sellerName', label: t('docs.fields.seller_name'), placeholder: t('docs.placeholders.seller_name') },
            { id: 'date', label: t('docs.fields.date'), type: 'date' },
            { id: 'productDetails', label: t('docs.fields.requested_products'), type: 'textarea', rows: 4, placeholder: t('docs.placeholders.rfq_products') },
            { id: 'companyName', label: t('docs.fields.your_company_name'), placeholder: t('docs.placeholders.company_name') },
        ],
        content: t('docs.rfq.content')
    },
     {
        id: 'delivery-note',
        title: t('docs.delivery_note.title'),
        description: t('docs.delivery_note.description'),
        fields: [
            { id: 'importerName', label: t('docs.fields.your_name_seller'), placeholder: t('docs.placeholders.importer_name') },
            { id: 'noteNumber', label: t('docs.fields.delivery_note_number'), placeholder: t('docs.placeholders.delivery_note_number') },
            { id: 'date', label: t('docs.fields.date'), type: 'date' },
            { id: 'clientName', label: t('docs.fields.client_name'), placeholder: t('docs.placeholders.client_name') },
            { id: 'productsSold', label: t('docs.fields.products_sold_multiline'), type: 'textarea', rows: 4, placeholder: t('docs.placeholders.delivery_note_products') },
        ],
        content: t('docs.delivery_note.content')
    },
    {
        id: 'partnership-contract',
        title: t('docs.partnership.title'),
        description: t('docs.partnership.description'),
        fields: [
            { id: 'partner1Name', label: t('docs.fields.partner1_name'), placeholder: t('docs.placeholders.partner1_name') },
            { id: 'partner2Name', label: t('docs.fields.partner2_name'), placeholder: t('docs.placeholders.partner2_name') },
            { id: 'projectDescription', label: t('docs.fields.partnership_object'), type: 'textarea', rows: 3, placeholder: t('docs.placeholders.partnership_object') },
            { id: 'p1Contribution', label: t('docs.fields.partner1_contribution'), type: 'textarea', rows: 2, placeholder: t('docs.placeholders.p1_contribution') },
            { id: 'p2Contribution', label: t('docs.fields.partner2_contribution'), type: 'textarea', rows: 2, placeholder: t('docs.placeholders.p2_contribution') },
            { id: 'profitSplit', label: t('docs.fields.profit_split'), placeholder: t('docs.placeholders.profit_split') },
            { id: 'date', label: t('docs.fields.start_date'), type: 'date' },
        ],
        content: t('docs.partnership.content')
    },
    {
        id: 'advanced-partnership-contract',
        title: t('docs.advanced_partnership.title'),
        description: t('docs.advanced_partnership.description'),
        fields: [
            { id: 'partner1Name', label: t('docs.fields.adv_partner1_name'), placeholder: t('docs.placeholders.partner1_name') },
            { id: 'partner1Address', label: t('docs.fields.adv_partner1_address'), placeholder: t('docs.placeholders.partner_address') },
            { id: 'partner2Name', label: t('docs.fields.adv_partner2_name'), placeholder: t('docs.placeholders.partner2_name') },
            { id: 'partner2Address', label: t('docs.fields.adv_partner2_address'), placeholder: t('docs.placeholders.partner_address') },
            { id: 'projectObject', label: t('docs.fields.partnership_object'), type: 'textarea', rows: 3, placeholder: t('docs.placeholders.partnership_object_detailed') },
            { id: 'p1Contribution', label: t('docs.fields.adv_partner1_contribution'), type: 'textarea', rows: 2, placeholder: t('docs.placeholders.p1_contribution_detailed') },
            { id: 'p2Contribution', label: t('docs.fields.adv_partner2_contribution'), type: 'textarea', rows: 2, placeholder: t('docs.placeholders.p2_contribution_detailed') },
            { id: 'profitDistribution', label: t('docs.fields.profit_distribution'), type: 'textarea', rows: 2, placeholder: t('docs.placeholders.profit_distribution') },
            { id: 'duration', label: t('docs.fields.duration'), placeholder: t('docs.placeholders.duration') },
            { id: 'effectiveDate', label: t('docs.fields.start_date'), type: 'date' },
            { id: 'city', label: t('docs.fields.city_of_signature'), placeholder: t('docs.placeholders.city_of_signature') },
        ],
        content: t('docs.advanced_partnership.content')
    },
    {
        id: 'legal-label',
        title: t('docs.legal_label.title'),
        description: t('docs.legal_label.description'),
        fields: [
            { id: 'productName', label: t('docs.fields.label_product_name'), placeholder: t('docs.placeholders.label_product_name') },
            { id: 'importerName', label: t('docs.fields.label_importer_name'), placeholder: t('docs.placeholders.importer_name') },
            { id: 'originCountry', label: t('docs.fields.label_origin_country'), placeholder: t('docs.placeholders.origin_country') },
            { id: 'importDate', label: t('docs.fields.label_import_date'), type: 'date' },
        ],
        content: t('docs.legal_label.content')
    }
];

export const getModulesData = (t: (key: string, options?: any) => string): ModuleData[] => [
    {
        id: 1,
        title: t('modules.m1.title'),
        description: t('modules.m1.description'),
        quiz: {
            questions: [
                { id: "1-1", label: t('modules.m1.q1'), type: "select", options: t('modules.m1.q1_options').split('|') },
                { id: "1-2", label: t('modules.m1.q2'), type: "select", options: t('modules.m1.q2_options').split('|') },
                { id: "1-3", label: t('modules.m1.q3'), type: "select", options: t('modules.m1.q3_options').split('|') }
            ],
            answers: t('modules.m1.answers').split('|')
        }
    },
    {
        id: 2,
        title: t('modules.m2.title'),
        description: t('modules.m2.description'),
        quiz: {
            questions: [
                { id: "2-1", label: t('modules.m2.q1'), type: "select", options: t('modules.quiz_options.yes_no').split('|') },
                { id: "2-2", label: t('modules.m2.q2'), type: "select", options: t('modules.quiz_options.yes_no').split('|') },
                { id: "2-3", label: t('modules.m2.q3'), type: "select", options: t('modules.quiz_options.yes_no').split('|') }
            ],
            answers: t('modules.m2.answers').split('|')
        }
    },
    {
        id: 3,
        title: t('modules.m3.title'),
        description: t('modules.m3.description'),
        quiz: {
            questions: [
                { id: "3-1", label: t('modules.m3.q1'), type: "select", options: t('modules.m3.q1_options').split('|') },
                { id: "3-2", label: t('modules.m3.q2'), type: "select", options: t('modules.m3.q2_options').split('|') },
                { id: "3-3", label: t('modules.m3.q3'), type: "select", options: t('modules.m3.q3_options').split('|') }
            ],
            answers: t('modules.m3.answers').split('|')
        }
    },
    {
        id: 4,
        title: t('modules.m4.title'),
        description: t('modules.m4.description'),
        quiz: {
            questions: [
                { id: "4-1", label: t('modules.m4.q1'), type: "select", options: t('modules.m4.q1_options').split('|') },
                { id: "4-2", label: t('modules.m4.q2'), type: "select", options: t('modules.quiz_options.yes_no').split('|') },
                { id: "4-3", label: t('modules.m4.q3'), type: "select", options: t('modules.m4.q3_options').split('|') }
            ],
            answers: t('modules.m4.answers').split('|')
        }
    },
    {
        id: 5,
        title: t('modules.m5.title'),
        description: t('modules.m5.description'),
        quiz: {
            questions: [
                { id: "5-1", label: t('modules.m5.q1'), type: "select", options: t('modules.quiz_options.yes_no').split('|') },
                { id: "5-2", label: t('modules.m5.q2'), type: "select", options: t('modules.m5.q2_options').split('|') },
                { id: "5-3", label: t('modules.m5.q3'), type: "select", options: t('modules.quiz_options.yes_no').split('|') }
            ],
            answers: t('modules.m5.answers').split('|')
        }
    },
    {
        id: 6,
        title: t('modules.m6.title'),
        description: t('modules.m6.description'),
        quiz: {
            questions: [
                { id: "6-1", label: t('modules.m6.q1'), type: "select", options: t('modules.m6.q1_options').split('|') },
                { id: "6-2", label: t('modules.m6.q2'), type: "select", options: t('modules.m6.q2_options').split('|') },
                { id: "6-3", label: t('modules.m6.q3'), type: "select", options: t('modules.quiz_options.yes_no').split('|') }
            ],
            answers: t('modules.m6.answers').split('|')
        }
    },
     {
        id: 7,
        title: t('modules.m7.title'),
        description: t('modules.m7.description'),
        quiz: {
            questions: [
                { id: "7-1", label: t('modules.m7.q1'), type: "select", options: t('modules.m7.q1_options').split('|') },
                { id: "7-2", label: t('modules.m7.q2'), type: "select", options: t('modules.m7.q2_options').split('|') },
                { id: "7-3", label: t('modules.m7.q3'), type: "select", options: t('modules.quiz_options.yes_no').split('|') }
            ],
            answers: t('modules.m7.answers').split('|')
        }
    },
    {
        id: 8,
        title: t('modules.m8.title'),
        description: t('modules.m8.description'),
        quiz: {
            questions: [
                { id: "8-1", label: t('modules.m8.q1'), type: "select", options: t('modules.m8.q1_options').split('|') },
                { id: "8-2", label: t('modules.m8.q2'), type: "select", options: t('modules.quiz_options.yes_no').split('|') },
                { id: "8-3", label: t('modules.m8.q3'), type: "select", options: t('modules.m8.q3_options').split('|') }
            ],
            answers: t('modules.m8.answers').split('|')
        }
    },
    {
        id: 9,
        title: t('modules.m9.title'),
        description: t('modules.m9.description'),
        quiz: {
            questions: [
                { id: "9-1", label: t('modules.m9.q1'), type: "select", options: t('modules.quiz_options.yes_no').split('|') },
                { id: "9-2", label: t('modules.m9.q2'), type: "select", options: t('modules.m9.q2_options').split('|') },
                { id: "9-3", label: t('modules.m9.q3'), type: "select", options: t('modules.m9.q3_options').split('|') }
            ],
            answers: t('modules.m9.answers').split('|')
        }
    },
    {
        id: 10,
        title: t('modules.m10.title'),
        description: t('modules.m10.description'),
        quiz: {
            questions: [
                { id: "10-1", label: t('modules.m10.q1'), type: "select", options: t('modules.m10.q1_options').split('|') },
                { id: "10-2", label: t('modules.m10.q2'), type: "select", options: t('modules.m10.q2_options').split('|') },
                { id: "10-3", label: t('modules.m10.q3'), type: "select", options: t('modules.quiz_options.yes_no').split('|') }
            ],
            answers: t('modules.m10.answers').split('|')
        }
    },
    {
        id: 11,
        title: t('modules.m11.title'),
        description: t('modules.m11.description'),
        quiz: {
            questions: [
                { id: "11-1", label: t('modules.m11.q1'), type: "select", options: t('modules.quiz_options.yes_no').split('|') },
                { id: "11-2", label: t('modules.m11.q2'), type: "select", options: t('modules.m11.q2_options').split('|') },
                { id: "11-3", label: t('modules.m11.q3'), type: "select", options: t('modules.quiz_options.yes_no').split('|') }
            ],
            answers: t('modules.m11.answers').split('|')
        }
    },
    {
        id: 12,
        title: t('modules.m12.title'),
        description: t('modules.m12.description'),
        quiz: {
            questions: [
                { id: "12-1", label: t('modules.m12.q1'), type: "select", options: t('modules.quiz_options.yes_no').split('|') },
                { id: "12-2", label: t('modules.m12.q2'), type: "select", options: t('modules.quiz_options.yes_no').split('|') },
                { id: "12-3", label: t('modules.m12.q3'), type: "select", options: t('modules.quiz_options.yes_no').split('|') }
            ],
            answers: t('modules.m12.answers').split('|')
        }
    },
    {
        id: 13,
        title: t('modules.m13.title'),
        description: t('modules.m13.description'),
        quiz: {
            questions: [
                { id: "13-1", label: t('modules.m13.q1'), type: "select", options: t('modules.m13.q1_options').split('|') },
                { id: "13-2", label: t('modules.m13.q2'), type: "select", options: t('modules.quiz_options.yes_no').split('|') },
                { id: "13-3", label: t('modules.m13.q3'), type: "select", options: t('modules.quiz_options.yes_no').split('|') }
            ],
            answers: t('modules.m13.answers').split('|')
        }
    },
    {
        id: 14,
        title: t('modules.m14.title'),
        description: t('modules.m14.description'),
        quiz: {
            questions: [
                { id: "14-1", label: t('modules.m14.q1'), type: "select", options: t('modules.quiz_options.yes_no').split('|') },
                { id: "14-2", label: t('modules.m14.q2'), type: "select", options: t('modules.m14.q2_options').split('|') },
                { id: "14-3", label: t('modules.m14.q3'), type: "select", options: t('modules.quiz_options.yes_no').split('|') }
            ],
            answers: t('modules.m14.answers').split('|')
        }
    },
    {
        id: 15,
        title: t('modules.m15.title'),
        description: t('modules.m15.description'),
        quiz: {
            questions: [
                { id: "15-1", label: t('modules.m15.q1'), type: "select", options: t('modules.m15.q1_options').split('|') },
                { id: "15-2", label: t('modules.m15.q2'), type: "select", options: t('modules.m15.q2_options').split('|') },
                { id: "15-3", label: t('modules.m15.q3'), type: "select", options: t('modules.m15.q3_options').split('|') }
            ],
            answers: t('modules.m15.answers').split('|')
        }
    },
    {
        id: 16,
        title: t('modules.m16.title'),
        description: t('modules.m16.description'),
        quiz: {
            questions: [
                { id: "16-1", label: t('modules.m16.q1'), type: "select", options: t('modules.quiz_options.yes_no').split('|') },
                { id: "16-2", label: t('modules.m16.q2'), type: "select", options: t('modules.m16.q2_options').split('|') },
                { id: "16-3", label: t('modules.m16.q3'), type: "select", options: t('modules.m16.q3_options').split('|') }
            ],
            answers: t('modules.m16.answers').split('|')
        }
    },
    {
        id: 17,
        title: t('modules.m17.title'),
        description: t('modules.m17.description'),
        quiz: {
            questions: [
                { id: "17-1", label: t('modules.m17.q1'), type: "select", options: t('modules.m17.q1_options').split('|') },
                { id: "17-2", label: t('modules.m17.q2'), type: "select", options: t('modules.m17.q2_options').split('|') },
                { id: "17-3", label: t('modules.m17.q3'), type: "select", options: t('modules.m17.q3_options').split('|') }
            ],
            answers: t('modules.m17.answers').split('|')
        }
    },
    {
        id: 18,
        title: t('modules.m18.title'),
        description: t('modules.m18.description'),
        quiz: {
            questions: [
                { id: "18-1", label: t('modules.m18.q1'), type: "select", options: t('modules.m18.q1_options').split('|') },
                { id: "18-2", label: t('modules.m18.q2'), type: "select", options: t('modules.m18.q2_options').split('|') },
                { id: "18-3", label: t('modules.m18.q3'), type: "select", options: t('modules.m18.q3_options').split('|') }
            ],
            answers: t('modules.m18.answers').split('|')
        }
    },
    {
        id: 19,
        title: t('modules.m19.title'),
        description: t('modules.m19.description'),
        quiz: {
            questions: [
                { id: "19-1", label: t('modules.m19.q1'), type: "select", options: t('modules.m19.q1_options').split('|') },
                { id: "19-2", label: t('modules.m19.q2'), type: "select", options: t('modules.m19.q2_options').split('|') },
                { id: "19-3", label: t('modules.m19.q3'), type: "select", options: t('modules.quiz_options.yes_no').split('|') }
            ],
            answers: t('modules.m19.answers').split('|')
        }
    },
    {
        id: 20,
        title: t('modules.m20.title'),
        description: t('modules.m20.description'),
        quiz: {
            questions: [
                { id: "20-1", label: t('modules.m20.q1'), type: "select", options: t('modules.m20.q1_options').split('|') },
                { id: "20-2", label: t('modules.m20.q2'), type: "select", options: t('modules.m20.q2_options').split('|') },
                { id: "20-3", label: t('modules.m20.q3'), type: "select", options: t('modules.quiz_options.yes_no').split('|') }
            ],
            answers: t('modules.m20.answers').split('|')
        }
    }
];