// src/data/constants.js

// Definice dostupných laboratoří
export const LABS = [
    { id: 'citylab', name: 'CityLab', color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { id: 'euc', name: 'EUC', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { id: 'synlab', name: 'Synlab', color: 'text-green-600 bg-green-50 border-green-200' },
    { id: 'unilabs', name: 'Unilabs', color: 'text-rose-600 bg-rose-50 border-rose-200' }
];

// NÁKLADOVÉ CENY (Data z Notion XLSX)
// Struktura: { name: '...', prices: { lab: cena }, price: NEJLEVNĚJŠÍ }
export const LAB_COSTS = {
    ko: { name: 'Krevní obraz + diferenciál', prices: { citylab: 55, euc: 99, synlab: 91, unilabs: 67 }, price: 55 },
    gluk: { name: 'Glukóza v plazmě', prices: { citylab: 14, euc: 21, synlab: 17, unilabs: 15 }, price: 14 },
    crp: { name: 'CRP (Zánět)', prices: { citylab: 122, euc: 169, synlab: 157, unilabs: 153 }, price: 122 },
    alt: { name: 'ALT (Játra)', prices: { citylab: 20, euc: 21, synlab: 21, unilabs: 19 }, price: 19 },
    ast: { name: 'AST (Játra)', prices: { citylab: 20, euc: 21, synlab: 21, unilabs: 19 }, price: 19 },
    ggt: { name: 'GGT (Játra)', prices: { citylab: 22, euc: 21, synlab: 23, unilabs: 21 }, price: 21 },
    ca: { name: 'Vápník (Ca)', prices: { citylab: 21, euc: 21, synlab: 22, unilabs: 20 }, price: 20 },
    mg: { name: 'Hořčík (Mg)', prices: { citylab: 21, euc: 20, synlab: 22, unilabs: 21 }, price: 20 },
    chol: { name: 'Cholesterol celkový', prices: { citylab: 24, euc: 35, synlab: 24, unilabs: 23 }, price: 23 },
    tri: { name: 'Triacylglyceroly', prices: { citylab: 24, euc: 40, synlab: 35, unilabs: 29 }, price: 24 },
    hdl: { name: 'HDL Cholesterol', prices: { citylab: 45, euc: 58, synlab: 58, unilabs: 52 }, price: 45 },
    ldl: { name: 'LDL Cholesterol', prices: { citylab: 70, euc: 70, synlab: 155, unilabs: 62 }, price: 62 },
    nonhdl: { name: 'non-HDL Cholesterol', prices: { citylab: 0, euc: 0, synlab: 0, unilabs: 0 }, price: 0 },
    krea: { name: 'Kreatinin', prices: { citylab: 18, euc: 21, synlab: 19, unilabs: 18 }, price: 18 },
    urea: { name: 'Urea', prices: { citylab: 19, euc: 22, synlab: 20, unilabs: 19 }, price: 19 },
    bilkovina: { name: 'Celková bílkovina', prices: { citylab: 16, euc: 21, synlab: 17, unilabs: 15 }, price: 15 },
    albumin: { name: 'Albumin', prices: { citylab: 17, euc: 21, synlab: 18, unilabs: 15 }, price: 15 },
    hscrp: { name: 'Ultracitlivé CRP (hsCRP)', prices: { citylab: 180, euc: 200, synlab: 190, unilabs: 195 }, price: 180 },
    ams: { name: 'Amyláza (AMS)', prices: { citylab: 48, euc: 50, synlab: 49, unilabs: 48 }, price: 48 },
    psa: { name: 'PSA (Prostata)', prices: { citylab: 190, euc: 260, synlab: 243, unilabs: 263 }, price: 190 },
    tsh: { name: 'TSH (Štítná žláza)', prices: { citylab: 140, euc: 180, synlab: 190, unilabs: 180 }, price: 140 },
    moc: { name: 'Moč chem. + sediment', prices: { citylab: 30, euc: 39, synlab: 35, unilabs: 32 }, price: 30 },
    acr: { name: 'ACR (Albumin/Kreatinin v moči)', prices: { citylab: 115, euc: 150, synlab: 134, unilabs: 148 }, price: 115 },
    apob: { name: 'Apolipoprotein B', prices: { citylab: 180, euc: 200, synlab: 190, unilabs: 211 }, price: 180 },
    homocystein: { name: 'Homocystein', prices: { citylab: 250, euc: 280, synlab: 270, unilabs: 275 }, price: 250 },
    hba1c: { name: 'HbA1c (Dlouhý cukr)', prices: { citylab: 160, euc: 225, synlab: 189, unilabs: 211 }, price: 160 },
    cpeptid: { name: 'C-Peptid', prices: { citylab: 220, euc: 250, synlab: 240, unilabs: 245 }, price: 220 },
    inzulin: { name: 'Inzulín', prices: { citylab: 220, euc: 250, synlab: 240, unilabs: 245 }, price: 220 },
    homair: { name: 'HOMA-IR', prices: { citylab: 0, euc: 0, synlab: 0, unilabs: 0 }, price: 0 },
    ferritin: { name: 'Ferritin (Zásoba železa)', prices: { citylab: 190, euc: 250, synlab: 243, unilabs: 235 }, price: 190 },
    vitD: { name: 'Vitamín D', prices: { citylab: 360, euc: 490, synlab: 450, unilabs: 442 }, price: 360 },
    vitB12: { name: 'Vitamín B12', prices: { citylab: 190, euc: 260, synlab: 271, unilabs: 260 }, price: 190 },
    ft4: { name: 'fT4 (Volný tyroxin)', prices: { citylab: 140, euc: 180, synlab: 198, unilabs: 180 }, price: 140 },
    anti_tpo: { name: 'Anti-TPO (Autoimunita)', prices: { citylab: 280, euc: 310, synlab: 300, unilabs: 305 }, price: 280 },
    bilirubin: { name: 'Bilirubin celkový', prices: { citylab: 17, euc: 21, synlab: 18, unilabs: 16 }, price: 16 },
    alp: { name: 'ALP (Játra/Kosti)', prices: { citylab: 19, euc: 21, synlab: 20, unilabs: 19 }, price: 19 },
    folat: { name: 'Folát (Kys. listová)', prices: { citylab: 190, euc: 260, synlab: 268, unilabs: 259 }, price: 190 },
    zinek: { name: 'Zinek', prices: { citylab: 120, euc: 180, synlab: 173, unilabs: 250 }, price: 120 },
};

export const MARKER_AVAILABILITY = {
    ko: ['m_prem', 'm_zakl', 'm_reg', 'm_str', 'm_srd', 'm_vla', 'm_enr'],
    gluk: ['m_prem', 'm_zakl', 'm_reg', 'm_srd', 'm_enr'],
    crp: ['m_prem', 'm_reg', 'm_str', 'm_srd', 'm_enr'],
    alt: ['m_prem', 'm_zakl', 'm_reg', 'm_str', 'm_srd', 'm_enr'],
    ast: ['m_prem', 'm_zakl', 'm_reg', 'm_str', 'm_srd', 'm_enr'],
    ggt: ['m_prem', 'm_zakl', 'm_reg', 'm_str', 'm_srd', 'm_enr'],
    ca: ['m_prem', 'm_reg'],
    mg: ['m_prem', 'm_reg', 'm_srd', 'm_enr'],
    chol: ['m_prem', 'm_zakl', 'm_reg', 'm_srd'],
    tri: ['m_prem', 'm_zakl', 'm_reg', 'm_srd'],
    hdl: ['m_prem', 'm_zakl', 'm_reg', 'm_srd'],
    ldl: ['m_prem', 'm_zakl', 'm_reg', 'm_srd'],
    nonhdl: ['m_prem', 'm_zakl', 'm_reg', 'm_srd'],
    krea: ['m_prem', 'm_zakl', 'm_reg', 'm_srd', 'm_enr'],
    urea: ['m_prem', 'm_zakl', 'm_reg', 'm_srd'],
    bilkovina: ['m_prem', 'm_reg'],
    ams: ['m_prem', 'm_str'],
    psa: ['m_prem', 'm_zakl', 'm_muz'],
    tsh: ['m_prem', 'm_zakl', 'm_muz', 'm_reg', 'm_str', 'm_vla', 'm_enr'],
    apob: ['m_prem', 'm_srd'],
    homocystein: ['m_prem', 'm_srd'],
    hba1c: ['m_prem', 'm_reg', 'm_enr'],
    cpeptid: ['m_prem', 'm_reg', 'm_enr'],
    inzulin: ['m_prem', 'm_reg', 'm_enr'],
    homair: ['m_prem', 'm_reg', 'm_enr'],
    ferritin: ['m_prem', 'm_reg', 'm_str', 'm_vla', 'm_enr'],
    vitD: ['m_prem', 'm_reg', 'm_str', 'm_vla', 'm_enr'],
    vitB12: ['m_prem', 'm_reg', 'm_str', 'm_vla', 'm_enr'],
    ft4: ['m_prem', 'm_zakl'],
    anti_tpo: ['m_prem', 'm_reg', 'm_vla'],
    bilirubin: ['m_prem', 'm_zakl', 'm_reg', 'm_str', 'm_srd', 'm_enr'],
    alp: ['m_prem', 'm_reg', 'm_str'],
    folat: ['m_prem', 'm_reg', 'm_str', 'm_vla', 'm_enr'],
    zinek: ['m_vla'],
};

export const PHYSICAL_MEASUREMENTS = {
    inbody: { name: 'InBody měření', icon: 'scale', included: true },
    bp: { name: 'Krevní tlak', icon: 'monitor_heart', included: true },
    grip: { name: 'Grip Strength', icon: 'fitness_center', included: true },
};

export const PROFILES_SPEC = {
    prevence: { name: 'Prevence', icon: 'shield', color: '#22c55e', price: 2990, base: ['ko', 'gluk', 'moc', 'chol', 'hdl', 'ldl', 'tri', 'alt', 'ast', 'krea', 'vitD'] },
    rovnovaha: { name: 'Rovnováha', icon: 'balance', color: '#3b82f6', price: 3490, base: ['ko', 'gluk', 'moc', 'chol', 'hdl', 'ldl', 'tri', 'alt', 'ast', 'ggt', 'krea', 'urea', 'tsh', 'ferritin', 'vitB12', 'mg'] },
    krehkost: { name: 'Péče', icon: 'local_hospital', color: '#ef4444', price: 4990, base: ['ko', 'gluk', 'moc', 'chol', 'hdl', 'ldl', 'tri', 'alt', 'ast', 'ggt', 'bilirubin', 'alp', 'krea', 'urea', 'acr', 'crp', 'bilkovina', 'ca', 'mg', 'vitD', 'vitB12', 'folat'] },
};

// ============================================
// BLOOD AREAS - MARŽE REVIDOVÁNY NA 50-70%
// ============================================

export const BLOOD_AREAS = [
    {
        id: 'cardio',
        name: 'Srdce a cévy',
        icon: 'favorite',
        color: 'text-red-500',
        baseDescription: 'Kontrolujeme hladinu cholesterolu a tuků v krvi. Zjistíme, jestli máte cévy čisté nebo se v nich něco ukládá.',
        baseMarkers: ['chol', 'hdl', 'ldl', 'nonhdl', 'tri'],
        price: 490, // Náklad: 156 Kč -> Marže: 61%
        expansion: {
            name: 'Rozšířit o detailní kardio',
            description: 'Přidáme pokročilé markery ApoB a Homocystein, které lépe predikují riziko infarktu než samotný cholesterol.',
            markers: ['apob', 'homocystein'],
            price: 1190, // Celkový náklad: 156+430=586. Celková cena: 1680. Marže: 57%
        }
    },
    {
        id: 'liver',
        name: 'Játra a trávení',
        icon: 'water_drop',
        color: 'text-amber-500',
        baseDescription: 'Měříme jaterní enzymy. Ukazují, jak se játra vyrovnávají s tím, co jíte a pijete.',
        baseMarkers: ['alt', 'ast', 'ggt'],
        price: 390, // Náklad: 59 Kč -> Marže: 81% (Malý balíček, vysoká marže)
        expansion: {
            name: 'Rozšířit o kompletní játra',
            description: 'Přidáme bilirubin a detailní testy slinivky. Důležité, pokud užíváte léky nebo pijete alkohol pravidelněji.',
            markers: ['bilirubin', 'alp', 'ams'],
            price: 590, // Celkový náklad: 59+83=142. Celková cena: 980. Marže: 82%
        }
    },
    {
        id: 'kidney',
        name: 'Ledviny',
        icon: 'water',
        color: 'text-blue-500',
        baseDescription: 'Kontrolujeme, jak dobře ledviny filtrují krev. Včasné odhalení problémů může předejít dialýze.',
        baseMarkers: ['krea', 'urea'],
        price: 350, // Náklad: 37 Kč -> Marže: 87%
        expansion: {
            name: 'Rozšířit o časnou detekci',
            description: 'Přidáme citlivý test ACR, který odhalí poškození ledvin roky předtím, než se projeví v běžných testech.',
            markers: ['acr'],
            autoExpandForAge: 60,
            price: 590, // Celkový náklad: 152 Kč. Celková cena: 940. Marže: 80%
        }
    },
    {
        id: 'thyroid',
        name: 'Štítná žláza',
        icon: 'psychology',
        color: 'text-purple-500',
        baseDescription: 'Kontrolujeme hormony štítné žlázy. Ovlivňují váhu, energii, náladu i kvalitu vlasů a pokožky.',
        baseMarkers: ['tsh'],
        genderFilter: 'female',
        price: 490, // Náklad: 140 Kč -> Marže: 65%
        expansion: {
            name: 'Rozšířit o autoimunitu',
            description: 'Přidáme fT4 a protilátky anti-TPO. Odhalíme, jestli štítnou žlázu nenapadá vlastní imunitní systém.',
            markers: ['ft4', 'anti_tpo'],
            autoExpandForGender: 'female',
            price: 990, // Celkový náklad: 560 Kč. Celková cena: 1480. Marže: 54%
        }
    },
    {
        id: 'energy',
        name: 'Energie a vitalita',
        icon: 'bolt',
        color: 'text-yellow-500',
        baseDescription: 'Kontrolujeme vitamíny a minerály klíčové pro energii. Únava často není ve vaší hlavě, ale v krvi.',
        baseMarkers: ['mg', 'ko'],
        price: 490, // Náklad: 75 Kč -> Marže: 81%
        expansion: {
            name: 'Rozšířit o kompletní vitamíny',
            description: 'Přidáme D vitamin (imunita, kosti), B12 (nervy, paměť), folát a železo. Kompletní obraz vaší vitality.',
            markers: ['vitD', 'vitB12', 'folat', 'ferritin'],
            price: 2290, // Celkový náklad: 1005 Kč. Celková cena: 2780. Marže: 56% (OPRAVENO Z 12%)
        }
    },
    {
        id: 'inflammation',
        name: 'Záněty v těle',
        icon: 'local_fire_department',
        color: 'text-orange-500',
        baseDescription: 'Měříme CRP - univerzální ukazatel zánětu. Chronický zánět urychluje stárnutí a způsobuje nemoci.',
        baseMarkers: ['crp', 'ko'],
        price: 490, // Náklad: 177 Kč -> Marže: 56%
        expansion: {
            name: 'Rozšířit o imunitní profil',
            description: 'Přidáme albumin, celkovou bílkovinu a ultrasenzitivní CRP (hsCRP) pro detekci zánětů/infekcí v těle.',
            markers: ['albumin', 'bilkovina', 'hscrp'],
            price: 790, // Celkový náklad: 387 Kč. Celková cena: 1280. Marže: 63%
        }
    },
    {
        id: 'diabetes',
        name: 'Cukr a metabolismus',
        icon: 'cookie',
        color: 'text-pink-500',
        baseDescription: 'Měříme hladinu cukru v krvi. Včasné odhalení prediabetu může zabránit rozvoji cukrovky.',
        baseMarkers: ['gluk', 'hba1c'],
        price: 590, // Náklad: 174 Kč -> Marže: 64%
        expansion: {
            name: 'Rozšířit o inzulínovou rezistenci',
            description: 'Přidáme C-peptid, inzulín a vypočítáme HOMA-IR index, který je nejlepším ukazatelem inzulínové rezistence.',
            markers: ['cpeptid', 'inzulin', 'homair'],
            price: 990, // Celkový náklad: 614 Kč. Celková cena: 1580. Marže: 53%
        }
    },
    {
        id: 'prostate',
        name: 'Prostata',
        icon: 'male',
        color: 'text-indigo-500',
        baseDescription: 'Kontrolujeme PSA - marker zdraví prostaty. Důležité pro muže nad 50 let jako prevence rakoviny.',
        baseMarkers: ['psa'],
        genderFilter: 'male',
        ageMin: 50,
        price: 590, // Náklad: 190 Kč -> Marže: 61%
        expansion: null
    }
];

export const BODY_AREAS = [
    {
        id: 'composition',
        name: 'Složení těla',
        icon: 'scale',
        color: 'text-teal-500',
        included: true,
        baseDescription: 'Měříme přesné složení těla pomocí InBody - kolik máte svalů, tuku a vody.',
        tests: ['inbody'],
        price: 400,
        cost: 50
    },
    {
        id: 'blood_pressure',
        name: 'Krevní tlak',
        icon: 'monitor_heart',
        color: 'text-rose-500',
        included: true,
        baseDescription: 'Měříme krevní tlak jako základ prevence kardiovaskulárních onemocnění.',
        tests: ['bp'],
        price: 190,
        cost: 50
    },
    {
        id: 'strength',
        name: 'Svalová síla',
        icon: 'fitness_center',
        color: 'text-emerald-500',
        included: true,
        baseDescription: 'Měříme sílu stisku ruky. Síla stisku překvapivě predikuje délku života.',
        tests: ['grip'],
        price: 190,
        cost: 50
    },
    {
        id: 'mobility',
        name: 'Fyzická zdatnost',
        icon: 'accessibility_new',
        color: 'text-cyan-500',
        baseDescription: 'Testujeme sílu nohou a celkovou fyzickou zdatnost.',
        price: 0, 
        cost: 0,
        expansion: {
            name: 'SPPB (chůze, rovnováha)',
            description: 'Provedeme Short Physical Performance Battery - standardizovanou sadu testů.',
            tests: ['sppb_balance', 'sppb_walk', 'chairstand'],
            price: 690, // Čistě za čas sestry (marže 90%)
            cost: 50
        }
    }
];

export const HEAD_AREAS = [
    {
        id: 'memory',
        name: 'Odborný screening (MoCA)',
        icon: 'psychology',
        color: 'text-violet-500',
        baseDescription: 'Včasná detekce změn paměti a myšlení.',
        price: 0,
        cost: 0,
        expansion: {
            name: 'MoCA test',
            description: 'Montreal Cognitive Assessment - komplexní screening paměti.',
            tests: ['moca'],
            autoExpandForAge: 65,
            price: 690, // Čistě za čas sestry (marže 90%)
            cost: 50
        }
    }
];

// Ostatní pomocné konstanty pro UI
export const SERVICE_FEE = 300; 

export const HEALTH_CATEGORIES = [
    { id: 'fitness', title: 'Funkční tělesná zdatnost a Služby', icon: 'accessibility_new', module: null },
    { id: 'obesity', title: 'Nadváha a metabolismus', icon: 'monitor_weight', questionStep: 1, module: { id: 'obesity', question: 'Trápí vás nadváha nebo obezita?', symptoms: ['BMI nad 25', 'Tuk v oblasti břicha', 'Únava po jídle', 'Problémy s hubnutím'] } },
    { id: 'heart', title: 'Srdce a cévy', icon: 'favorite', questionStep: 1, module: { id: 'cardio', question: 'Máte v rodině srdeční onemocnění?', symptoms: ['Bušení srdce', 'Bolesti na hrudi', 'Dušnost při námaze', 'Vysoký tlak'] } },
    { id: 'diabetes', title: 'Metabolismus cukrů (Diabetes)', icon: 'cookie', questionStep: 1, module: { id: 'diabetes', question: 'Máte obavy z cukrovky?', symptoms: ['Nadváha', 'Velká žízeň', 'Časté močení', 'Výkyvy energie po jídle'] } },
    { id: 'liver', title: 'Játra a slinivka', icon: 'water_drop', questionStep: 1, module: { id: 'liver', question: 'Chcete zkontrolovat játra podrobněji?', symptoms: ['Pravidelný alkohol', 'Užívání léků', 'Bolesti břicha', 'Zažívací potíže'] } },
    { id: 'kidney', title: 'Ledviny', icon: 'water', questionStep: 1, module: { id: 'kidney', question: 'Máte obavy o zdraví ledvin?', symptoms: ['Otoky nohou', 'Problémy s močením', 'Vysoký tlak', 'Diabetes v rodině'] } },
    { id: 'minerals', title: 'Hladina minerálů a vitamínů', icon: 'wb_sunny', questionStep: 2, module: { id: 'vitamins', question: 'Cítíte se trvale unavení?', symptoms: ['Dlouhodobá únava', 'Slabost', 'Padání vlasů', 'Lámavé nehty'] } },
    { id: 'immunity', title: 'Záněty a imunita', icon: 'bloodtype', questionStep: 2, module: { id: 'inflammation', question: 'Máte časté infekce nebo záněty?', symptoms: ['Časté nachlazení', 'Pomalé hojení ran', 'Opakované infekce', 'Zvýšená teplota'] } },
    { id: 'thyroid', title: 'Štítná žláza', icon: 'psychology', questionStep: 2, module: { id: 'thyroid', question: 'Máte problémy se štítnou žlázou?', symptoms: ['Změny váhy', 'Padání vlasů', 'Nervozita', 'Citlivost na chlad/teplo'] } },
    { id: 'mobility', title: 'Pohyblivost a rovnováha', icon: 'accessibility_new', questionStep: 2, module: { id: 'mobility', question: 'Máte problémy s chůzí nebo rovnováhou?', symptoms: ['Nejistá chůze', 'Strach z pádu', 'Slabost v nohách', 'Závratě'] } },
    { id: 'memory', title: 'Paměť a myšlení', icon: 'psychology_alt', questionStep: 2, module: { id: 'memory', question: 'Trápí vás zapomnětlivost?', symptoms: ['Zapomínání jmen', 'Hledání slov', 'Ztráta orientace', 'Problémy s koncentrací'] } }
];

export const FREQUENCIES = [
    { id: '1x', label: '1× ročně', multiplier: 1, discount: 0 },
    { id: '2x', label: '2× ročně', multiplier: 2, discount: 0.1 },
    { id: '4x', label: '4× ročně', multiplier: 4, discount: 0.2 }
];

// Payment options
export const PAYMENT_OPTIONS = {
    upfront: { id: 'upfront', label: 'Zaplatit najednou', discount: 0.05, splits: 1 },
    split: { id: 'split', label: 'Rozdělit na 2 splátky', discount: 0, splits: 2 },
};

// Text variants for self vs parents flow
export const TEXT_VARIANTS = {
    self: {
        questionPrefix: 'Máte', possessive: 'vaše', pronoun: 'vás',
        genderQ: 'Jaké je vaše pohlaví?', ageQ: 'Kolik je vám let?',
        resultIntro: 'Na základě vašich odpovědí jsme vám připravili',
    },
    parents: {
        questionPrefix: 'Má váš blízký', possessive: 'jeho/její', pronoun: 'vašeho blízkého',
        genderQ: 'Jaké je pohlaví vašeho blízkého?', ageQ: 'Kolik je vašemu blízkému let?',
        resultIntro: 'Na základě odpovědí jsme pro vašeho blízkého připravili',
    },
};

// Module ID → Area mapping
export const MODULE_TO_AREA_MAP = {
    obesity: { type: 'blood', areaId: 'energy' },
    cardio: { type: 'blood', areaId: 'cardio' },
    diabetes: { type: 'blood', areaId: 'diabetes' },
    liver: { type: 'blood', areaId: 'liver' },
    kidney: { type: 'blood', areaId: 'kidney' },
    vitamins: { type: 'blood', areaId: 'energy' },
    inflammation: { type: 'blood', areaId: 'inflammation' },
    thyroid: { type: 'blood', areaId: 'thyroid' },
    mobility: { type: 'body', areaId: 'mobility' },
    memory: { type: 'head', areaId: 'memory' },
};

// Physical and cognitive tests
export const PHYSICAL_TESTS = [
    { id: 'inbody', name: 'InBody měření', price: 0, included: true },
    { id: 'bp', name: 'Krevní tlak', price: 0, included: true },
    { id: 'grip', name: 'Grip Strength', price: 0, included: true },
    { id: 'sppb_balance', name: 'SPPB Rovnováha', price: 100 },
    { id: 'sppb_walk', name: 'SPPB Chůze', price: 100 },
    { id: 'chairstand', name: 'Chair Stand Test', price: 100 },
    { id: 'ekg', name: 'EKG', price: 350 },
];

export const COGNITIVE_TESTS = [
    { id: 'moca', name: 'MoCA (Montreal Cognitive Assessment)', price: 300 },
    { id: 'minicog', name: 'Mini-Cog', price: 200 },
];

// How it works steps
export const HOW_IT_WORKS_STEPS = [
    { icon: 'quiz', title: 'Odpovíte na pár otázek', desc: 'Na základě vašich odpovědí připravíme nabídku testů na míru.' },
    { icon: 'home_health', title: 'Přijďte k nám nebo přijedeme za vámi', desc: 'Odběry provádíme v pohodlí domova nebo v naší ordinaci.' },
    { icon: 'phone_iphone', title: 'Výsledky uvidíte v aplikaci', desc: 'Přehledné výsledky s AI interpretací přímo v mobilu.' },
    { icon: 'restaurant', title: 'Upravíte životosprávu', desc: 'Personalizovaná doporučení na základě vašich výsledků.' },
    { icon: 'event_repeat', title: 'Za 6 měsíců follow-up', desc: 'Porovnáme výsledky a uvidíte svůj pokrok.' },
];