// src/components/flow/FlowDetails.jsx
import React from 'react';
import { Icon } from '../ui';

export const FlowDetails = ({ onBack, onNext, memberDetails, setMemberDetails }) => (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in-up">
        <button onClick={onBack} className="btn-text mb-8"><Icon name="arrow_back" className="mr-2" /> Zpět</button>
        <div className="card-elevated p-10">
            <h2 className="text-headline-medium font-display mb-8 text-center">Upřesněte údaje</h2>
            <div className="space-y-8">
                <div className="flex p-1 rounded-full bg-surface-container-high border border-surface-outline-variant/30">
                    <button onClick={() => setMemberDetails({ ...memberDetails, gender: 'female' })} className={`flex-1 py-3 rounded-full font-bold transition-all ${memberDetails.gender === 'female' ? 'bg-secondary-container text-secondary-on-container shadow-sm' : 'text-surface-on-variant hover:text-surface-on'}`}>Žena</button>
                    <button onClick={() => setMemberDetails({ ...memberDetails, gender: 'male' })} className={`flex-1 py-3 rounded-full font-bold transition-all ${memberDetails.gender === 'male' ? 'bg-secondary-container text-secondary-on-container shadow-sm' : 'text-surface-on-variant hover:text-surface-on'}`}>Muž</button>
                </div>
                <div>
                    <div className="flex justify-between mb-3 font-bold opacity-70">
                        <span>Věk klienta</span>
                        <span>{memberDetails.age} let</span>
                    </div>
                    <input type="range" min="18" max="95" value={memberDetails.age} onChange={e => setMemberDetails({ ...memberDetails, age: parseInt(e.target.value) })} className="w-full h-2 rounded-lg accent-primary bg-surface-container-highest appearance-none cursor-pointer" />
                </div>
                <button onClick={onNext} className="btn-primary w-full h-14 text-lg mt-4">Zobrazit můj program na míru</button>
            </div>
        </div>
    </div>
);
