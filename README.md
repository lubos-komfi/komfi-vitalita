# Komfi Vitalita - Interaktivní Prototyp

## 🚀 Quick Start

Otevři `index.html` přímo v prohlížeči (Chrome/Safari/Firefox).

Žádný build step není potřeba - vše běží přes CDN (React, Babel, Tailwind).

## 📂 Struktura

```
proto/
├── index.html      # Hlavní prototyp (React + Tailwind via CDN)
├── README.md       # Tento soubor
└── (future files)  # Pro rozšíření
```

## 🎯 Co prototyp obsahuje

### 1. **🏠 Home**
- Přehled celého projektu
- Quick stats
- Navigace do sekcí

### 2. **🧠 Mindmap**
- Interaktivní rozbalování větví
- Pro koho (4 persony)
- Zdravotní koncepty (3 úrovně)
- Balíčky (Přehled, Kontrola, Dohled)
- Trend & Frekvence
- Detail biomarkerů

### 3. **🎯 Flow**
- Kompletní zákaznický flow
- Persona selection
- Package recommendation
- Price toggle (jednorázově vs. roční)
- Marker detail
- Bistro upsell
- Summary / checkout

### 4. **📊 Analýza**
- Kritický rozbor balíčků
- Cenová analýza s tabulkou
- Pro/Proti každého balíčku
- Konkrétní doporučení

## 🔧 Další vývoj s Claude Code

Pokud chceš pokračovat ve vývoji:

```bash
cd "/Users/lubee/Supersonic Dropbox/Lubos Buracinsky/dev projects/komfi/vitalita/proto"
claude
```

### Možné další kroky:

1. **Převést na Vite projekt**
   ```bash
   npm create vite@latest vitalita-app -- --template react-ts
   ```

2. **Přidat více interaktivity**
   - Animace (Framer Motion)
   - Grafy (Recharts)
   - Persistenci (localStorage)

3. **Propojit s backendem**
   - Supabase pro data
   - Stripe pro platby
   - Notion API pro sync

4. **Design system**
   - Componentizace
   - Storybook
   - Design tokens

## 📊 Data & Biomarkery

Všechna data jsou v `index.html` v proměnných:
- `biomarkers` - kategorie a jednotlivé markery
- `packages` - balíčky s cenami a obsahem
- `personas` - cílové skupiny

## 💰 Cenový model (aktuální)

| Balíček | Jednorázově | Roční | Frekvence |
|---------|-------------|-------|-----------|
| PŘEHLED | 890 Kč | 1 580 Kč | 2× ročně |
| KONTROLA | 1 490 Kč | 2 680 Kč | 2× ročně |
| DOHLED | 2 490 Kč | 8 960 Kč | 4× ročně |

## 🎨 Design Notes

- Používá Tailwind CSS via CDN
- Gradient branding: emerald → blue
- Font: system fonts (-apple-system)
- Responsive: funguje na mobile i desktop

## 📝 Notes z analýzy

### Co funguje:
- ✅ Trend jako hlavní diferenciátor
- ✅ Propojení s Bistro
- ✅ Domácí odběry
- ✅ KONTROLA má nejlepší value/marker

### K zamyšlení:
- ⚠️ DOHLED možná příliš drahý pro důchodce
- ⚠️ PSA kontroverzní (falešná pozitiva)
- ⚠️ Příliš mnoho markerů = overwhelming

---

Vytvořeno: 2026-01-30
Autor: Claude (Cowork) + Luboš
