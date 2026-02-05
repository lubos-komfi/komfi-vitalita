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
                    {/* Centered age display */}
                    <div className="text-center mb-4 font-bold text-2xl text-surface-on">
                        {memberDetails.age}+ let
                    </div>
                    {/* Draggable slider with thin track and tick marks */}
                    <div
                        className="relative py-4 cursor-pointer"
                        onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const percent = x / rect.width;
                            const ticks = [30, 40, 50, 60, 65];
                            const index = Math.round(percent * (ticks.length - 1));
                            const age = ticks[Math.max(0, Math.min(index, ticks.length - 1))];
                            setMemberDetails({ ...memberDetails, age });
                        }}
                    >
                        {/* Ultra thin track line */}
                        <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 rounded-full bg-surface-container-highest pointer-events-none" />
                        {/* Visual tick marks */}
                        <div className="relative flex justify-between pointer-events-none">
                            {[30, 40, 50, 60, 65].map((age) => (
                                <div
                                    key={age}
                                    className={`w-5 h-5 rounded-full transition-all ${memberDetails.age === age
                                            ? 'bg-primary scale-150'
                                            : 'bg-surface-container-highest'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <button onClick={onNext} className="btn-primary w-full h-14 text-lg mt-4">Zobrazit můj program na míru</button>
            </div>
        </div>
    </div>
);
