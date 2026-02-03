
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
    krea: { name: 'Kreatinin', price: 18 },
    urea: { name: 'Urea', price: 18 },
    bilkovina: { name: 'Celková bílkovina', price: 20 },
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
        module: { id: 'cardio', name: 'Kardio Plus', desc: 'ApoB + Homocystein', markers: ['apob', 'homocystein'], question: 'Máte v rodině srdeční onemocnění nebo cítíte bušení srdce?' }
    },
    {
        id: 'diabetes', title: 'Metabolismus cukrů (Diabetes)', icon: 'cookie',
        base: ['gluk'],
        module: { id: 'diabetes', name: 'Diabetes Komplet', desc: 'HbA1c + C-Peptid', markers: ['hba1c', 'cpeptid'], question: 'Máte nadváhu, žízeň nebo výkyvy energie po jídle?' }
    },
    {
        id: 'liver', title: 'Játra a slinivka', icon: 'water_drop',
        base: ['alt', 'ast', 'ggt', 'ams'],
        module: { id: 'liver', name: 'Játra Plus', desc: 'Bilirubin + ALP', markers: ['bilirubin', 'alp'], question: 'Chcete detailněji zkontrolovat játra (léky, alkohol)?' }
    },
    { id: 'kidney', title: 'Ledviny', icon: 'water', base: ['krea', 'urea', 'moc', 'acr'], module: null },
    {
        id: 'minerals', title: 'Hladina minerálů a vitamínů', icon: 'wb_sunny',
        base: ['mg'],
        module: { id: 'vitamins', name: 'Vitalita & Imunita', desc: 'Vit D, B12, Folát, Zinek', markers: ['vitD', 'vitB12', 'folat', 'zinek'], question: 'Cítíte se dlouhodobě unavení nebo bez energie?' }
    },
    {
        id: 'immunity', title: 'Imunitní systém (Zánětlivost)', icon: 'bloodtype',
        base: ['ko', 'crp', 'bilkovina'],
        module: { id: 'iron', name: 'Zásoby železa', desc: 'Ferritin', markers: ['ferritin'], question: 'Zadýcháváte se nebo se cítíte bledí?' }
    },
    {
        id: 'thyroid', title: 'Štítná žláza', icon: 'psychology',
        base: ['tsh'],
        module: { id: 'thyroid', name: 'Štítná žláza Komplet', desc: 'fT4 + Anti-TPO', markers: ['ft4', 'anti_tpo'], question: 'Pozorujete změny váhy, padání vlasů nebo nervozitu?' }
    },
    { id: 'bones', title: 'Kosti a zuby', icon: 'health_and_safety', base: ['ca'], module: null },
    { id: 'prostate', title: 'Prostata (Muži)', icon: 'male', base: ['psa'], module: null }
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