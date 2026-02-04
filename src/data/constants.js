
export const LAB_COSTS = {
    ko: { name: 'Krevní obraz + diferenciál', price: 55 },
    gluk: { name: 'Glukóza v plazmě', price: 14 },
    crp: { name: 'CRP (Zánět)', price: 122 },
    alt: { name: 'ALT (Játra)', price: 20 },
    ast: { name: 'AST (Játra)', price: 20 },
    ggt: { name: 'GGT (Játra)', price: 22 },
    ca: { name: 'Vápník (Ca)', price: 20 },
    mg: { name: 'Hořčík (Mg)', price: 25 },
    chol: { name: 'Cholesterol celkový', price: 25 },
    tri: { name: 'Triacylglyceroly', price: 28 },
    hdl: { name: 'HDL Cholesterol', price: 45 },
    ldl: { name: 'LDL Cholesterol', price: 38 },
    nonhdl: { name: 'non-HDL Cholesterol', price: 0 }, // Calculated from chol - hdl
    krea: { name: 'Kreatinin', price: 18 },
    urea: { name: 'Urea', price: 18 },
    bilkovina: { name: 'Celková bílkovina', price: 20 },
    albumin: { name: 'Albumin', price: 25 },
    hscrp: { name: 'Ultracitlivé CRP (hsCRP)', price: 180 },
    ams: { name: 'Amyláza (AMS)', price: 35 },
    psa: { name: 'PSA (Prostata)', price: 190 },
    tsh: { name: 'TSH (Štítná žláza)', price: 140 },
    moc: { name: 'Moč chem. + sediment', price: 30 },
    acr: { name: 'ACR (Albumin/Kreatinin v moči)', price: 150 },
    apob: { name: 'Apolipoprotein B', price: 200 },
    homocystein: { name: 'Homocystein', price: 250 },
    hba1c: { name: 'HbA1c (Dlouhý cukr)', price: 180 },
    cpeptid: { name: 'C-Peptid', price: 220 },
    ferritin: { name: 'Ferritin (Zásoba železa)', price: 190 },
    vitD: { name: 'Vitamín D', price: 360 },
    vitB12: { name: 'Vitamín B12', price: 190 },
    ft4: { name: 'fT4 (Volný tyroxin)', price: 160 },
    anti_tpo: { name: 'Anti-TPO (Autoimunita)', price: 280 },
    bilirubin: { name: 'Bilirubin celkový', price: 18 },
    alp: { name: 'ALP (Játra/Kosti)', price: 20 },
    folat: { name: 'Folát (Kys. listová)', price: 190 },
    zinek: { name: 'Zinek', price: 120 },
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
    nonhdl: ['m_prem', 'm_zakl', 'm_reg', 'm_srd'], // Same as chol/hdl
    krea: ['m_prem', 'm_zakl', 'm_reg', 'm_srd', 'm_enr'],
    urea: ['m_prem', 'm_zakl', 'm_reg', 'm_srd'],
    bilkovina: ['m_prem', 'm_reg'],
    ams: ['m_prem', 'm_str'],
    psa: ['m_prem', 'm_zakl', 'm_muz'],
    tsh: ['m_prem', 'm_zakl', 'm_muz', 'm_reg', 'm_str', 'm_vla', 'm_enr'],
    apob: ['m_prem', 'm_srd'],
    homocystein: ['m_prem', 'm_srd'],
    hba1c: ['m_prem', 'm_reg', 'm_enr'],
    cpeptid: ['m_prem', 'm_reg'],
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
        id: 'heart', title: 'Srdce a cévy', icon: 'favorite',
        base: ['chol', 'hdl', 'ldl', 'tri'],
        module: {
            id: 'cardio',
            name: 'Kardio Plus',
            desc: 'ApoB + Homocystein',
            markers: ['apob', 'homocystein'],
            question: 'Máte v rodině srdeční onemocnění?',
            symptoms: ['Bušení srdce', 'Bolesti na hrudi', 'Dušnost při námaze', 'Vysoký tlak']
        }
    },
    {
        id: 'diabetes', title: 'Metabolismus cukrů (Diabetes)', icon: 'cookie',
        base: ['gluk'],
        module: {
            id: 'diabetes',
            name: 'Diabetes Komplet',
            desc: 'HbA1c + C-Peptid',
            markers: ['hba1c', 'cpeptid'],
            question: 'Máte obavy z cukrovky?',
            symptoms: ['Nadváha', 'Velká žízeň', 'Časté močení', 'Výkyvy energie po jídle']
        }
    },
    {
        id: 'liver', title: 'Játra a slinivka', icon: 'water_drop',
        base: ['alt', 'ast', 'ggt', 'ams'],
        module: {
            id: 'liver',
            name: 'Játra Plus',
            desc: 'Bilirubin + ALP',
            markers: ['bilirubin', 'alp'],
            question: 'Chcete zkontrolovat játra podrobněji?',
            symptoms: ['Pravidelný alkohol', 'Užívání léků', 'Bolesti břicha', 'Zažívací potíže']
        }
    },
    {
        id: 'kidney', title: 'Ledviny', icon: 'water',
        base: ['krea', 'urea', 'moc'],
        module: {
            id: 'kidney',
            name: 'Ledviny Plus',
            desc: 'ACR - časná detekce',
            markers: ['acr'],
            question: 'Máte obavy o zdraví ledvin?',
            symptoms: ['Otoky nohou', 'Problémy s močením', 'Vysoký tlak', 'Diabetes v rodině'],
            targetArea: 'kidney'
        }
    },
    {
        id: 'minerals', title: 'Hladina minerálů a vitamínů', icon: 'wb_sunny',
        base: ['mg'],
        module: {
            id: 'vitamins',
            name: 'Vitalita & Imunita',
            desc: 'Vit D, B12, Folát, Zinek',
            markers: ['vitD', 'vitB12', 'folat', 'ferritin'],
            question: 'Cítíte se trvale unavení?',
            symptoms: ['Dlouhodobá únava', 'Slabost', 'Padání vlasů', 'Lámavé nehty']
        }
    },
    {
        id: 'immunity', title: 'Záněty a imunita', icon: 'bloodtype',
        base: ['ko', 'crp', 'bilkovina'],
        module: {
            id: 'inflammation',
            name: 'Imunitní profil',
            desc: 'Detailní krevní obraz',
            markers: ['ko', 'bilkovina', 'ferritin'],
            question: 'Máte časté infekce nebo záněty?',
            symptoms: ['Časté nachlazení', 'Pomalé hojení ran', 'Opakované infekce', 'Zvýšená teplota'],
            targetArea: 'inflammation'
        }
    },
    {
        id: 'thyroid', title: 'Štítná žláza', icon: 'psychology',
        base: ['tsh'],
        module: {
            id: 'thyroid',
            name: 'Štítná žláza Komplet',
            desc: 'fT4 + Anti-TPO',
            markers: ['ft4', 'anti_tpo'],
            question: 'Máte problémy se štítnou žlázou?',
            symptoms: ['Změny váhy', 'Padání vlasů', 'Nervozita', 'Citlivost na chlad/teplo']
        }
    },
    { id: 'bones', title: 'Kosti a zuby', icon: 'health_and_safety', base: ['ca'], module: null },
    { id: 'prostate', title: 'Prostata (Muži)', icon: 'male', base: ['psa'], module: null },
    // New: Physical/Body tests
    {
        id: 'mobility', title: 'Pohyblivost a rovnováha', icon: 'accessibility_new',
        base: [],
        module: {
            id: 'mobility',
            name: 'SPPB testy',
            desc: 'Rovnováha, chůze, síla nohou',
            markers: [],
            question: 'Máte problémy s chůzí nebo rovnováhou?',
            symptoms: ['Nejistá chůze', 'Strach z pádu', 'Slabost v nohách', 'Závratě'],
            targetType: 'body',
            targetArea: 'mobility'
        }
    },
    // New: Cognitive tests
    {
        id: 'memory', title: 'Paměť a myšlení', icon: 'psychology_alt',
        base: [],
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
        color: '#22c55e', // Green
        price: 2990,
        base: ['ko', 'gluk', 'moc', 'chol', 'hdl', 'ldl', 'tri', 'alt', 'ast', 'krea', 'vitD']
    },
    rovnovaha: {
        name: 'Rovnováha',
        icon: 'balance',
        color: '#3b82f6', // Blue
        price: 3490,
        base: ['ko', 'gluk', 'moc', 'chol', 'hdl', 'ldl', 'tri', 'alt', 'ast', 'ggt', 'krea', 'urea', 'tsh', 'ferritin', 'vitB12', 'mg']
    },
    krehkost: {
        name: 'Péče',
        icon: 'local_hospital',
        color: '#ef4444', // Red
        price: 4990,
        base: ['ko', 'gluk', 'moc', 'chol', 'hdl', 'ldl', 'tri', 'alt', 'ast', 'ggt', 'bilirubin', 'alp', 'krea', 'urea', 'acr', 'crp', 'bilkovina', 'ca', 'mg', 'vitD', 'vitB12', 'folat']
    }
};

export const SERVICE_FEE = 1200;

// ============================================
// HEALTH AREAS - Human-friendly descriptions
// Each area has: base (always included) + optional expansion
// ============================================

export const BLOOD_AREAS = [
    {
        id: 'cardio',
        name: 'Srdce a cévy',
        icon: 'favorite',
        color: 'text-red-500',
        baseDescription: 'Kontrolujeme hladinu cholesterolu a tuků v krvi. Zjistíme, jestli máte cévy čisté nebo se v nich něco ukládá.',
        baseMarkers: ['chol', 'hdl', 'ldl', 'nonhdl', 'tri'],
        expansion: {
            name: 'Rozšířit o detailní kardio',
            description: 'Přidáme pokročilé markery ApoB a Homocystein, které lépe predikují riziko infarktu než samotný cholesterol.',
            markers: ['apob', 'homocystein'],
        }
    },
    {
        id: 'liver',
        name: 'Játra a trávení',
        icon: 'water_drop',
        color: 'text-amber-500',
        baseDescription: 'Měříme jaterní enzymy. Ukazují, jak se játra vyrovnávají s tím, co jíte a pijete.',
        baseMarkers: ['alt', 'ast', 'ggt'],
        expansion: {
            name: 'Rozšířit o kompletní játra',
            description: 'Přidáme bilirubin a detailní testy slinivky. Důležité, pokud užíváte léky nebo pijete alkohol pravidelněji.',
            markers: ['bilirubin', 'alp', 'ams'],
        }
    },
    {
        id: 'kidney',
        name: 'Ledviny',
        icon: 'water',
        color: 'text-blue-500',
        baseDescription: 'Kontrolujeme, jak dobře ledviny filtrují krev. Včasné odhalení problémů může předejít dialýze.',
        baseMarkers: ['krea', 'urea'],
        expansion: {
            name: 'Rozšířit o časnou detekci',
            description: 'Přidáme citlivý test ACR, který odhalí poškození ledvin roky předtím, než se projeví v běžných testech.',
            markers: ['acr'],
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
        expansion: {
            name: 'Rozšířit o autoimunitu',
            description: 'Přidáme fT4 a protilátky anti-TPO. Odhalíme, jestli štítnou žlázu nenapadá vlastní imunitní systém.',
            markers: ['ft4', 'anti_tpo'],
        }
    },
    {
        id: 'energy',
        name: 'Energie a vitalita',
        icon: 'bolt',
        color: 'text-yellow-500',
        baseDescription: 'Kontrolujeme vitamíny a minerály klíčové pro energii. Únava často není ve vaší hlavě, ale v krvi.',
        baseMarkers: ['mg', 'ko'],
        expansion: {
            name: 'Rozšířit o kompletní vitamíny',
            description: 'Přidáme D vitamin (imunita, kosti), B12 (nervy, paměť), folát a železo. Kompletní obraz vaší vitality.',
            markers: ['vitD', 'vitB12', 'folat', 'ferritin'],
        }
    },
    {
        id: 'inflammation',
        name: 'Záněty v těle',
        icon: 'local_fire_department',
        color: 'text-orange-500',
        baseDescription: 'Měříme CRP - univerzální ukazatel zánětu. Chronický zánět urychluje stárnutí a způsobuje nemoci.',
        baseMarkers: ['crp', 'ko'],
        expansion: {
            name: 'Rozšířit o imunitní profil',
            description: 'Přidáme celkovou bílkovinu. Vidíme, jak silný je váš imunitní systém.',
            markers: ['bilkovina'],
        }
    },
    {
        id: 'diabetes',
        name: 'Cukr a metabolismus',
        icon: 'cookie',
        color: 'text-pink-500',
        baseDescription: 'Měříme hladinu cukru v krvi. Včasné odhalení prediabetu může zabránit rozvoji cukrovky.',
        baseMarkers: ['gluk', 'hba1c'],
        expansion: {
            name: 'Rozšířit o detailní metabolismus',
            description: 'Přidáme albumin, celkovou bílkovinu a ultracitlivé CRP pro kompletní obraz metabolismu.',
            markers: ['albumin', 'bilkovina', 'hscrp'],
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
        baseDescription: 'Měříme přesné složení těla pomocí InBody - kolik máte svalů, tuku a vody. Váha sama nic neříká.',
        tests: ['inbody'],
    },
    {
        id: 'blood_pressure',
        name: 'Krevní tlak',
        icon: 'monitor_heart',
        color: 'text-rose-500',
        included: true,
        baseDescription: 'Měříme krevní tlak jako základ prevence kardiovaskulárních onemocnění.',
        tests: ['bp'],
    },
    {
        id: 'strength',
        name: 'Svalová síla',
        icon: 'fitness_center',
        color: 'text-emerald-500',
        included: true,
        baseDescription: 'Měříme sílu stisku ruky. Síla stisku překvapivě predikuje délku života.',
        tests: ['grip'],
    },
    {
        id: 'mobility',
        name: 'Fyzická zdatnost',
        icon: 'accessibility_new',
        color: 'text-cyan-500',
        baseDescription: 'Testujeme sílu nohou a celkovou fyzickou zdatnost. Klíčové pro predikci soběstačnosti u seniorů.',
        price: 350,
        expansion: {
            name: 'Přidat SPPB testy',
            description: 'Provedeme Short Physical Performance Battery - standardizovanou sadu testů: rovnováha, rychlost chůze, vstávání ze židle. Používá se celosvětově.',
            tests: ['sppb', 'chairstand'],
        }
    },
    {
        id: 'heart',
        name: 'Srdce a rytmus',
        icon: 'ecg',
        color: 'text-red-400',
        hidden: true, // Temporarily hidden
        baseDescription: 'Provedeme jednosvodové EKG přímo u vás doma. Odhalíme fibrilaci síní, která způsobuje mrtvice.',
        price: 350,
        expansion: {
            name: 'Přidat EKG vyšetření',
            description: 'Pomocí chytrého zařízení změříme srdeční rytmus. Fibrilace síní často nemá žádné příznaky, ale zvyšuje riziko mrtvice 5×.',
            tests: ['ekg'],
        }
    }
];

export const HEAD_AREAS = [
    {
        id: 'memory',
        name: 'Paměť a myšlení',
        icon: 'psychology',
        color: 'text-violet-500',
        baseDescription: 'Rychlý screening kognitivních funkcí pomocí testu hodin. Odhalíme změny paměti dříve, než si jich všimne okolí.',
        price: 200,
        expansion: {
            name: 'Přidat Mini-Cog test',
            description: 'Provedeme Mini-Cog test - nakreslíte hodiny a vzpomenete si na 3 slova. Trvá 3 minuty a má vysokou citlivost pro časnou demenci.',
            tests: ['minicog'],
        }
    },
    {
        id: 'hearing',
        name: 'Sluch',
        icon: 'hearing',
        color: 'text-blue-400',
        hidden: true, // Temporarily hidden
        baseDescription: 'Screening sluchu pomocí kalibrovaných sluchátek. Nedoslýchavost vede k sociální izolaci a urychluje demenci.',
        price: 250,
        expansion: {
            name: 'Přidat test sluchu',
            description: 'Pomocí tabletu a sluchátek otestujeme sluch na různých frekvencích. Odhalíme i mírné ztráty, které si člověk neuvědomuje.',
            tests: ['audio'],
        }
    }
];

// Keep old exports for backwards compatibility
export const PHYSICAL_TESTS = [
    { id: 'inbody', name: 'InBody měření', price: 0, included: true },
    { id: 'grip', name: 'Grip Strength', price: 0, included: true },
    { id: 'bp', name: 'Tlak & Puls', price: 0, included: true },
    { id: 'sppb', name: 'SPPB', price: 200 },
    { id: 'chairstand', name: 'Chair-Stand test', price: 150 },
    { id: 'ekg', name: 'EKG', price: 350 },
];

export const COGNITIVE_TESTS = [
    { id: 'minicog', name: 'Mini-Cog', price: 200 },
    { id: 'audio', name: 'Audiometrie', price: 250 },
];

// Deprecated - kept for backwards compatibility
export const BLOOD_TEST_GROUPS = BLOOD_AREAS;