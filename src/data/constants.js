// Definice dostupných laboratoří
export const LABS = [
    { id: 'citylab', name: 'CityLab', color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { id: 'euc', name: 'EUC', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { id: 'synlab', name: 'Synlab', color: 'text-green-600 bg-green-50 border-green-200' },
    { id: 'unilabs', name: 'Unilabs', color: 'text-rose-600 bg-rose-50 border-rose-200' }
];

export const LAB_COSTS = {
    ko: { name: 'Krevní obraz + diferenciál', prices: { citylab: 55, euc: 91, synlab: 91, unilabs: 134 }, price: 55 },
    gluk: { name: 'Glukóza v plazmě', prices: { citylab: 14, euc: 40, synlab: 49, unilabs: 44 }, price: 14 },
    crp: { name: 'CRP (Zánět)', prices: { citylab: 122, euc: 169, synlab: 141.3, unilabs: 160 }, price: 122 },
    alt: { name: 'ALT (Játra)', prices: { citylab: 20, euc: 21, synlab: 18.9, unilabs: 20 }, price: 18.9 },
    ast: { name: 'AST (Játra)', prices: { citylab: 20, euc: 21, synlab: 18.9, unilabs: 20 }, price: 18.9 },
    ggt: { name: 'GGT (Játra)', prices: { citylab: 22, euc: 21, synlab: 20.7, unilabs: 22 }, price: 20.7 },
    ca: { name: 'Vápník (Ca)', prices: { citylab: 21, euc: 21, synlab: 19.8, unilabs: 20 }, price: 19.8 },
    mg: { name: 'Hořčík (Mg)', prices: { citylab: 21, euc: 20, synlab: 19.8, unilabs: 20 }, price: 19.8 },
    chol: { name: 'Cholesterol celkový', prices: { citylab: 24, euc: 41, synlab: 51.3, unilabs: 48 }, price: 24 },
    tri: { name: 'Triacylglyceroly', prices: { citylab: 24, euc: 40, synlab: 35, unilabs: 38 }, price: 24 },
    hdl: { name: 'HDL Cholesterol', prices: { citylab: 45, euc: 58, synlab: 58, unilabs: 115 }, price: 45 },
    ldl: { name: 'LDL Cholesterol', prices: { citylab: 70, euc: 91, synlab: 155.7, unilabs: 140 }, price: 70 },
    nonhdl: { name: 'non-HDL Cholesterol', prices: { citylab: 0, euc: 0, synlab: 0, unilabs: 0 }, price: 0 },
    krea: { name: 'Kreatinin', prices: { citylab: 18, euc: 21, synlab: 17.1, unilabs: 19 }, price: 17.1 },
    urea: { name: 'Urea', prices: { citylab: 19, euc: 22, synlab: 18, unilabs: 20 }, price: 18 },
    bilkovina: { name: 'Celková bílkovina', prices: { citylab: 16, euc: 21, synlab: 15.3, unilabs: 18 }, price: 15.3 },
    albumin: { name: 'Albumin', prices: { citylab: 17, euc: 21, synlab: 16.2, unilabs: 19 }, price: 16.2 },
    hscrp: { name: 'Ultracitlivé CRP (hsCRP)', prices: { citylab: 180, euc: 200, synlab: 190, unilabs: 195 }, price: 180 },
    ams: { name: 'Amyláza (AMS)', prices: { citylab: 48, euc: 50, synlab: 44.1, unilabs: 48 }, price: 44.1 },
    psa: { name: 'PSA (Prostata)', prices: { citylab: 190, euc: 260, synlab: 243.9, unilabs: 350 }, price: 190 },
    tsh: { name: 'TSH (Štítná žláza)', prices: { citylab: 140, euc: 180, synlab: 170, unilabs: 175 }, price: 140 },
    moc: { name: 'Moč chem. + sediment', prices: { citylab: 30, euc: 39, synlab: 35, unilabs: 38 }, price: 30 },
    acr: { name: 'ACR (Albumin/Kreatinin v moči)', prices: { citylab: 115, euc: 150, synlab: 134.1, unilabs: 140 }, price: 115 },
    apob: { name: 'Apolipoprotein B', prices: { citylab: 180, euc: 200, synlab: 190, unilabs: 195 }, price: 180 },
    homocystein: { name: 'Homocystein', prices: { citylab: 250, euc: 280, synlab: 270, unilabs: 275 }, price: 250 },
    hba1c: { name: 'HbA1c (Dlouhý cukr)', prices: { citylab: 160, euc: 225, synlab: 189, unilabs: 200 }, price: 160 },
    cpeptid: { name: 'C-Peptid', prices: { citylab: 220, euc: 250, synlab: 240, unilabs: 245 }, price: 220 },
    inzulin: { name: 'Inzulín', prices: { citylab: 220, euc: 250, synlab: 240, unilabs: 245 }, price: 220 },
    homair: { name: 'HOMA-IR', prices: { citylab: 0, euc: 0, synlab: 0, unilabs: 0 }, price: 0 },
    ferritin: { name: 'Ferritin (Zásoba železa)', prices: { citylab: 190, euc: 250, synlab: 218.7, unilabs: 230 }, price: 190 },
    vitD: { name: 'Vitamín D', prices: { citylab: 360, euc: 490, synlab: 405, unilabs: 640 }, price: 360 },
    vitB12: { name: 'Vitamín B12', prices: { citylab: 190, euc: 260, synlab: 243.9, unilabs: 355 }, price: 190 },
    ft4: { name: 'fT4 (Volný tyroxin)', prices: { citylab: 140, euc: 180, synlab: 178.2, unilabs: 180 }, price: 140 },
    anti_tpo: { name: 'Anti-TPO (Autoimunita)', prices: { citylab: 280, euc: 310, synlab: 300, unilabs: 305 }, price: 280 },
    bilirubin: { name: 'Bilirubin celkový', prices: { citylab: 17, euc: 21, synlab: 16.2, unilabs: 19 }, price: 16.2 },
    alp: { name: 'ALP (Játra/Kosti)', prices: { citylab: 19, euc: 21, synlab: 18, unilabs: 20 }, price: 18 },
    folat: { name: 'Folát (Kys. listová)', prices: { citylab: 190, euc: 260, synlab: 241.2, unilabs: 355 }, price: 190 },
    zinek: { name: 'Zinek', prices: { citylab: 120, euc: 180, synlab: 173.1, unilabs: 250 }, price: 120 },
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

export const HEALTH_CATEGORIES = [
    {
        id: 'fitness', title: 'Funkční tělesná zdatnost a Služby', icon: 'accessibility_new',
        base: [{ name: 'Sestra u vás doma', icon: 'home_health' }, { name: 'InBody (Tuk, Svaly)', icon: 'scale' }, { name: 'Měření tlaku a síly', icon: 'monitor_heart' }],
        module: null
    },
    {
        id: 'obesity', title: 'Nadváha a metabolismus', icon: 'monitor_weight',
        base: ['gluk'],
        questionStep: 1,
        module: {
            id: 'obesity',
            name: 'Metabolický profil',
            desc: 'Inzulín, HOMA-IR, HbA1c (Dlouhý cukr), Cholesterol celkový, Triacylglyceroly',
            markers: ['inzulin', 'homair', 'hba1c', 'chol', 'tri'],
            question: 'Trápí vás nadváha nebo obezita?',
            symptoms: ['BMI nad 25', 'Tuk v oblasti břicha', 'Únava po jídle', 'Problémy s hubnutím']
        }
    },
    {
        id: 'heart', title: 'Srdce a cévy', icon: 'favorite',
        base: ['chol', 'hdl', 'ldl', 'tri'],
        questionStep: 1,
        module: {
            id: 'cardio',
            name: 'Kardio Plus',
            desc: 'Apolipoprotein B, Homocystein',
            markers: ['apob', 'homocystein'],
            question: 'Máte v rodině srdeční onemocnění?',
            symptoms: ['Bušení srdce', 'Bolesti na hrudi', 'Dušnost při námaze', 'Vysoký tlak']
        }
    },
    {
        id: 'diabetes', title: 'Metabolismus cukrů (Diabetes)', icon: 'cookie',
        base: ['gluk'],
        questionStep: 1,
        module: {
            id: 'diabetes',
            name: 'Diabetes Komplet',
            desc: 'HbA1c (Dlouhý cukr), C-Peptid',
            markers: ['hba1c', 'cpeptid'],
            question: 'Máte obavy z cukrovky?',
            symptoms: ['Nadváha', 'Velká žízeň', 'Časté močení', 'Výkyvy energie po jídle']
        }
    },
    {
        id: 'liver', title: 'Játra a slinivka', icon: 'water_drop',
        base: ['alt', 'ast', 'ggt', 'ams'],
        questionStep: 1,
        module: {
            id: 'liver',
            name: 'Játra Plus',
            desc: 'Bilirubin celkový, ALP (Játra/Kosti)',
            markers: ['bilirubin', 'alp'],
            question: 'Chcete zkontrolovat játra podrobněji?',
            symptoms: ['Pravidelný alkohol', 'Užívání léků', 'Bolesti břicha', 'Zažívací potíže']
        }
    },
    {
        id: 'kidney', title: 'Ledviny', icon: 'water',
        base: ['krea', 'urea', 'moc'],
        questionStep: 1,
        module: {
            id: 'kidney',
            name: 'Ledviny Plus',
            desc: 'ACR (Albumin/Kreatinin v moči)',
            markers: ['acr'],
            question: 'Máte obavy o zdraví ledvin?',
            symptoms: ['Otoky nohou', 'Problémy s močením', 'Vysoký tlak', 'Diabetes v rodině'],
            targetArea: 'kidney'
        }
    },
    {
        id: 'minerals', title: 'Hladina minerálů a vitamínů', icon: 'wb_sunny',
        base: ['mg'],
        questionStep: 2,
        module: {
            id: 'vitamins',
            name: 'Vitalita & Imunita',
            desc: 'Vitamín D, Vitamín B12, Folát (Kys. listová), Ferritin (Zásoba železa)',
            markers: ['vitD', 'vitB12', 'folat', 'ferritin'],
            question: 'Cítíte se trvale unavení?',
            symptoms: ['Dlouhodobá únava', 'Slabost', 'Padání vlasů', 'Lámavé nehty']
        }
    },
    {
        id: 'immunity', title: 'Záněty a imunita', icon: 'bloodtype',
        base: ['ko', 'crp', 'bilkovina'],
        questionStep: 2,
        module: {
            id: 'inflammation',
            name: 'Imunitní profil',
            desc: 'Krevní obraz + diferenciál, Celková bílkovina, Ferritin (Zásoba železa)',
            markers: ['ko', 'bilkovina', 'ferritin'],
            question: 'Máte časté infekce nebo záněty?',
            symptoms: ['Časté nachlazení', 'Pomalé hojení ran', 'Opakované infekce', 'Zvýšená teplota'],
            targetArea: 'inflammation'
        }
    },
    {
        id: 'thyroid', title: 'Štítná žláza', icon: 'psychology',
        base: ['tsh'],
        questionStep: 2,
        module: {
            id: 'thyroid',
            name: 'Štítná žláza Komplet',
            desc: 'fT4 (Volný tyroxin), Anti-TPO (Autoimunita)',
            markers: ['ft4', 'anti_tpo'],
            question: 'Máte problémy se štítnou žlázou?',
            symptoms: ['Změny váhy', 'Padání vlasů', 'Nervozita', 'Citlivost na chlad/teplo']
        }
    },
    { id: 'bones', title: 'Kosti a zuby', icon: 'health_and_safety', base: ['ca'], module: null },
    { id: 'prostate', title: 'Prostata (Muži)', icon: 'male', base: ['psa'], module: null },
    {
        id: 'mobility', title: 'Pohyblivost a rovnováha', icon: 'accessibility_new',
        base: [],
        questionStep: 2,
        module: {
            id: 'mobility',
            name: 'SPPB (chůze, rovnováha)',
            desc: 'Standardizované testy fyzické zdatnosti',
            markers: [],
            question: 'Máte problémy s chůzí nebo rovnováhou?',
            symptoms: ['Nejistá chůze', 'Strach z pádu', 'Slabost v nohách', 'Závratě'],
            targetType: 'body',
            targetArea: 'mobility'
        }
    },
    {
        id: 'memory', title: 'Paměť a myšlení', icon: 'psychology_alt',
        base: [],
        questionStep: 2,
        module: {
            id: 'memory',
            name: 'Mini-Cog test',
            desc: 'Screening paměti',
            markers: [],
            question: 'Trápí vás zapomnětlivost?',
            symptoms: ['Zapomínání jmen', 'Hledání slov', 'Ztráta orientace', 'Problémy s koncentrací'],
            targetType: 'head',
            targetArea: 'memory'
        }
    }
];

export const FREQUENCIES = [
    { id: '1x', label: '1× ročně', multiplier: 1, discount: 0 },
    { id: '2x', label: '2× ročně', multiplier: 2, discount: 0.1 },
    { id: '4x', label: '4× ročně', multiplier: 4, discount: 0.2 }
];

export const PROFILES_SPEC = {
    prevence: {
        name: 'Prevence',
        icon: 'shield',
        color: '#22c55e',
        price: 2990,
        base: ['ko', 'gluk', 'moc', 'chol', 'hdl', 'ldl', 'tri', 'alt', 'ast', 'krea', 'vitD']
    },
    rovnovaha: {
        name: 'Rovnováha',
        icon: 'balance',
        color: '#3b82f6',
        price: 3490,
        base: ['ko', 'gluk', 'moc', 'chol', 'hdl', 'ldl', 'tri', 'alt', 'ast', 'ggt', 'krea', 'urea', 'tsh', 'ferritin', 'vitB12', 'mg']
    },
    krehkost: {
        name: 'Péče',
        icon: 'local_hospital',
        color: '#ef4444',
        price: 4990,
        base: ['ko', 'gluk', 'moc', 'chol', 'hdl', 'ldl', 'tri', 'alt', 'ast', 'ggt', 'bilirubin', 'alp', 'krea', 'urea', 'acr', 'crp', 'bilkovina', 'ca', 'mg', 'vitD', 'vitB12', 'folat']
    }
};

export const SERVICE_FEE = 300;

export const BLOOD_AREAS = [
    {
        id: 'cardio',
        name: 'Srdce a cévy',
        icon: 'favorite',
        color: 'text-red-500',
        baseDescription: 'Kontrolujeme hladinu cholesterolu a tuků v krvi. Zjistíme, jestli máte cévy čisté nebo se v nich něco ukládá.',
        baseMarkers: ['chol', 'hdl', 'ldl', 'nonhdl', 'tri'],
        price: 390,
        expansion: {
            name: 'Rozšířit o detailní kardio',
            description: 'Přidáme pokročilé markery ApoB a Homocystein, které lépe predikují riziko infarktu než samotný cholesterol.',
            markers: ['apob', 'homocystein'],
            price: 690,
        }
    },
    {
        id: 'liver',
        name: 'Játra a trávení',
        icon: 'water_drop',
        color: 'text-amber-500',
        baseDescription: 'Měříme jaterní enzymy. Ukazují, jak se játra vyrovnávají s tím, co jíte a pijete.',
        baseMarkers: ['alt', 'ast', 'ggt'],
        price: 290,
        expansion: {
            name: 'Rozšířit o kompletní játra',
            description: 'Přidáme bilirubin a detailní testy slinivky. Důležité, pokud užíváte léky nebo pijete alkohol pravidelněji.',
            markers: ['bilirubin', 'alp', 'ams'],
            price: 390,
        }
    },
    {
        id: 'kidney',
        name: 'Ledviny',
        icon: 'water',
        color: 'text-blue-500',
        baseDescription: 'Kontrolujeme, jak dobře ledviny filtrují krev. Včasné odhalení problémů může předejít dialýze.',
        baseMarkers: ['krea', 'urea'],
        price: 250,
        expansion: {
            name: 'Rozšířit o časnou detekci',
            description: 'Přidáme citlivý test ACR, který odhalí poškození ledvin roky předtím, než se projeví v běžných testech.',
            markers: ['acr'],
            autoExpandForAge: 60,
            price: 450,
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
        price: 390,
        expansion: {
            name: 'Rozšířit o autoimunitu',
            description: 'Přidáme fT4 a protilátky anti-TPO. Odhalíme, jestli štítnou žlázu nenapadá vlastní imunitní systém.',
            markers: ['ft4', 'anti_tpo'],
            autoExpandForGender: 'female',
            price: 790,
        }
    },
    {
        id: 'energy',
        name: 'Energie a vitalita',
        icon: 'bolt',
        color: 'text-yellow-500',
        baseDescription: 'Kontrolujeme vitamíny a minerály klíčové pro energii. Únava často není ve vaší hlavě, ale v krvi.',
        baseMarkers: ['mg', 'ko'],
        price: 390,
        expansion: {
            name: 'Rozšířit o kompletní vitamíny',
            description: 'Přidáme D vitamin (imunita, kosti), B12 (nervy, paměť), folát a železo. Kompletní obraz vaší vitality.',
            markers: ['vitD', 'vitB12', 'folat', 'ferritin'],
            price: 1290,
        }
    },
    {
        id: 'inflammation',
        name: 'Záněty v těle',
        icon: 'local_fire_department',
        color: 'text-orange-500',
        baseDescription: 'Měříme CRP - univerzální ukazatel zánětu. Chronický zánět urychluje stárnutí a způsobuje nemoci.',
        baseMarkers: ['crp', 'ko'],
        price: 490,
        expansion: {
            name: 'Rozšířit o imunitní profil',
            description: 'Přidáme albumin, celkovou bílkovinu a ultrasenzitivní CRP (hsCRP) pro detekci zánětů/infekcí v těle.',
            markers: ['albumin', 'bilkovina', 'hscrp'],
            price: 590,
        }
    },
    {
        id: 'diabetes',
        name: 'Cukr a metabolismus',
        icon: 'cookie',
        color: 'text-pink-500',
        baseDescription: 'Měříme hladinu cukru v krvi. Včasné odhalení prediabetu může zabránit rozvoji cukrovky.',
        baseMarkers: ['gluk', 'hba1c'],
        price: 490,
        expansion: {
            name: 'Rozšířit o inzulínovou rezistenci',
            description: 'Přidáme C-peptid, inzulín a vypočítáme HOMA-IR index, který je nejlepším ukazatelem inzulínové rezistence.',
            markers: ['cpeptid', 'inzulin', 'homair'],
            price: 790,
        }
    },
    {
        id: 'prostate',
        name: 'Prostata',
        icon: 'male',
        color: 'text-indigo-500',
        baseDescription: 'Kontrolujeme PSA - marker zdraví prostaty. Důležité pro muže nad 40 let jako prevence rakoviny.',
        baseMarkers: ['psa'],
        genderFilter: 'male',
        ageMin: 40,
        autoIncludeForAge: 40,
        autoIncludeForGender: 'male',
        price: 490,
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
            price: 490,
            cost: 50
        }
    }
];

export const HEAD_AREAS = [
    {
        id: 'memory',
        name: 'Odborný screening (MoCA), Diagnostika paměti',
        icon: 'psychology',
        color: 'text-violet-500',
        baseDescription: '90 % změn v mozku začíná nenápadně. Odhalte je dříve, než ovlivní každodenní život.',
        price: 0,
        cost: 0,
        expansion: {
            name: 'Odborný screening (MoCA)',
            description: 'Montreal Cognitive Assessment - komplexní screening paměti.',
            tests: ['moca'],
            autoExpandForAge: 65,
            price: 490,
            cost: 50
        }
    }
];

export const PHYSICAL_TESTS = [
    { id: 'inbody', name: 'InBody měření', price: 0, included: true },
    { id: 'grip', name: 'Grip Strength', price: 0, included: true },
    { id: 'bp', name: 'Tlak & Puls', price: 0, included: true },
    { id: 'sppb_balance', name: 'SPPB Rovnováha', price: 100 },
    { id: 'sppb_walk', name: 'SPPB Chůze', price: 100 },
    { id: 'chairstand', name: 'Test vstávání ze židle', price: 150 },
    { id: 'ekg', name: 'EKG', price: 350 },
];

export const COGNITIVE_TESTS = [
    { id: 'moca', name: 'MoCA (Montreal Cognitive Assessment)', price: 300 },
    { id: 'minicog', name: 'Mini-Cog', price: 200 },
    { id: 'audio', name: 'Audiometrie', price: 250 },
];

export const BLOOD_TEST_GROUPS = BLOOD_AREAS;
