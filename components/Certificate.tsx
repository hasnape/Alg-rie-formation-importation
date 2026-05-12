import React, { useState, FormEvent } from 'react';
import { UserTier } from '../types';

interface CertData {
    firstName: string;
    lastName: string;
    birthDate: string;
    issueDate: string;
    certId: string;
}

const Certificate: React.FC<{ userTier: UserTier }> = ({ userTier }) => {
    const [certData, setCertData] = useState<CertData | null>(null);
    const [formData, setFormData] = useState({ firstName: '', lastName: '', birthDate: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenerate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.birthDate.trim()) return;
        
        setCertData({
            firstName: formData.firstName,
            lastName: formData.lastName,
            birthDate: formData.birthDate,
            issueDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            certId: "MIAF-" + Math.floor(Math.random() * 900000 + 100000)
        });
    };

    const tierToPackName: Record<string, string> = {
        premium: 'Support Pack',
        full_service: 'Turnkey Pack',
        expat: 'Expat Pack',
    };
    const packName = `(${tierToPackName[userTier] || 'Complete Training'})`;

    if (certData) {
        return (
            <div className="mt-12">
                <div className="printable-area max-w-4xl mx-auto bg-white p-2 shadow-2xl relative border-2 border-neutral-300">
                    <div className="border-8 border-primary-dark p-6" style={{ fontFamily: "'Times New Roman', serif" }}>
                         <div className="border-2 border-secondary-dark p-8 relative">
                             <div className="absolute top-8 right-8 w-32 h-32 opacity-10 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/2928/2928859.png')"}}></div>
                             <div className="absolute bottom-8 left-8 w-32 h-32 opacity-10 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/2928/2928859.png')"}}></div>

                            <div className="relative text-center text-black">
                                <p className="text-xl font-semibold text-neutral-600 tracking-widest uppercase">MIAFORMATION</p>
                                <h1 className="text-5xl font-bold text-primary-dark tracking-wider my-6">Certificate of Completion</h1>
                                <p className="mt-4 text-xl">This certificate is proudly presented to</p>
                                <p className="text-5xl font-serif font-bold text-secondary-dark my-8 tracking-wide">{certData.firstName} {certData.lastName}</p>
                                <p className="text-lg">born on {new Date(certData.birthDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <p className="mt-10 text-lg max-w-2xl mx-auto">
                                    For successfully completing all modules and achieving a perfect score in the quizzes for the program:
                                </p>
                                <h2 className="text-3xl font-semibold text-primary-dark mt-4">"Micro-Importer in Algeria"</h2>
                                <p className="text-md font-medium text-neutral-600 mt-1">{packName}</p>
                        
                                <div className="flex justify-between items-end mt-24 text-sm">
                                    <div className="text-left">
                                        <p>Issued on: {certData.issueDate}</p>
                                        <p className="mt-2 text-xs">Certificate ID: {certData.certId}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-semibold border-t border-neutral-500 pt-2 px-8">Lead Instructor Signature</p>
                                        <p className="italic text-xs mt-1">For Rép&Web</p>
                                    </div>
                                </div>
                        
                                <div className="absolute bottom-8 right-8 w-28 h-28">
                                    <svg viewBox="0 0 100 100" className="text-primary-dark opacity-80">
                                        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2" fill="none" />
                                        <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1" fill="none" />
                                        <path id="circlePath" d="M 15, 50 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                                        <text fill="currentColor" style={{ fontSize: '9px', letterSpacing: '1px', fontFamily: 'sans-serif', textTransform: 'uppercase' }}>
                                            <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                                                MIAFORMATION • Professional Training • Rép&Web
                                            </textPath>
                                        </text>
                                        <text x="50" y="55" textAnchor="middle" fontWeight="bold" fontSize="20" fill="currentColor" fontFamily="sans-serif">MI</text>
                                    </svg>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
                <div className="text-center mt-6 no-print">
                    <button onClick={() => window.print()} className="py-3 px-8 bg-success text-white rounded-lg shadow hover:bg-green-700 font-semibold transition-transform transform hover:scale-105">
                        Print Certificate
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-12 text-center no-print">
            <div className="bg-white border rounded-lg px-8 py-6 shadow-lg max-w-2xl mx-auto">
                 <h3 className="text-2xl font-bold text-primary mb-2">Generate Your Certificate of Completion</h3>
                 <p className="mb-6 text-neutral-600">Please enter your details to generate your personalized certificate. This information will appear on the final document.</p>
                 <form onSubmit={handleGenerate} className="space-y-4 max-w-md mx-auto text-left">
                     <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150"
                        />
                     </div>
                     <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150"
                        />
                     </div>
                     <div>
                        <label htmlFor="birthDate" className="block text-sm font-medium text-neutral-700 mb-1">Date of Birth</label>
                        <input
                            type="date"
                            name="birthDate"
                            id="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary focus:border-primary transition duration-150"
                        />
                     </div>
                     <div className="pt-2">
                        <button type="submit" className="w-full py-3 px-6 bg-success text-white rounded-lg shadow hover:bg-green-700 font-semibold transition-transform transform hover:scale-105 whitespace-nowrap">
                            Generate Certificate
                        </button>
                     </div>
                 </form>
            </div>
        </div>
    );
};

export default Certificate;