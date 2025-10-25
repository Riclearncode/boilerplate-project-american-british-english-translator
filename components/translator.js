const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  
  translateAmericanToBritish(text) {
    let translated = text;
    let hasTranslations = false;
    
    // Translate time format from American (10:30) to British (10.30)
    const timeRegex = /(\d{1,2}):(\d{2})/g;
    if (timeRegex.test(translated)) {
      translated = translated.replace(timeRegex, `<span class="highlight">$1.$2</span>`);
      hasTranslations = true;
    }
    
    // Translate American titles to British
    Object.keys(americanToBritishTitles).forEach(americanTitle => {
      const regex = new RegExp(`\\b${americanTitle.replace('.', '\\.')}`, 'gi');
      if (regex.test(translated)) {
        translated = translated.replace(regex, (match) => {
          const isCapitalized = match.charAt(0) === match.charAt(0).toUpperCase();
          const britishTitle = americanToBritishTitles[americanTitle];
          const result = isCapitalized ? britishTitle.charAt(0).toUpperCase() + britishTitle.slice(1) : britishTitle;
          return `<span class="highlight">${result}</span>`;
        });
        hasTranslations = true;
      }
    });
    
    // Translate American-only terms (longer phrases first)
    const americanOnlyKeys = Object.keys(americanOnly).sort((a, b) => b.length - a.length);
    americanOnlyKeys.forEach(americanTerm => {
      const regex = new RegExp(`\\b${americanTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      if (regex.test(translated)) {
        translated = translated.replace(regex, `<span class="highlight">${americanOnly[americanTerm]}</span>`);
        hasTranslations = true;
      }
    });
    
    // Translate American spelling to British (longer words first)
    const americanSpellingKeys = Object.keys(americanToBritishSpelling).sort((a, b) => b.length - a.length);
    americanSpellingKeys.forEach(americanWord => {
      const regex = new RegExp(`\\b${americanWord}\\b`, 'gi');
      if (regex.test(translated)) {
        translated = translated.replace(regex, `<span class="highlight">${americanToBritishSpelling[americanWord]}</span>`);
        hasTranslations = true;
      }
    });
    
    return { translated, hasTranslations };
  }
  
  translateBritishToAmerican(text) {
    let translated = text;
    let hasTranslations = false;
    
    // Create reverse mapping for British to American titles
    const britishToAmericanTitles = {};
    Object.keys(americanToBritishTitles).forEach(key => {
      britishToAmericanTitles[americanToBritishTitles[key]] = key;
    });
    
    // Create reverse mapping for British spelling
    const britishToAmericanSpelling = {};
    Object.keys(americanToBritishSpelling).forEach(key => {
      britishToAmericanSpelling[americanToBritishSpelling[key]] = key;
    });
    
    // Translate time format from British (10.30) to American (10:30)
    const timeRegex = /(\d{1,2})\.(\d{2})/g;
    if (timeRegex.test(translated)) {
      translated = translated.replace(timeRegex, `<span class="highlight">$1:$2</span>`);
      hasTranslations = true;
    }
    
    // Translate British titles to American
    Object.keys(britishToAmericanTitles).forEach(britishTitle => {
      const regex = new RegExp(`\\b${britishTitle}\\b`, 'gi');
      if (regex.test(translated)) {
        translated = translated.replace(regex, (match) => {
          const isCapitalized = match.charAt(0) === match.charAt(0).toUpperCase();
          const americanTitle = britishToAmericanTitles[britishTitle];
          const result = isCapitalized ? americanTitle.charAt(0).toUpperCase() + americanTitle.slice(1) : americanTitle;
          return `<span class="highlight">${result}</span>`;
        });
        hasTranslations = true;
      }
    });
    
    // Translate British-only terms (longer phrases first)
    const britishOnlyKeys = Object.keys(britishOnly).sort((a, b) => b.length - a.length);
    britishOnlyKeys.forEach(britishTerm => {
      const regex = new RegExp(`\\b${britishTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      if (regex.test(translated)) {
        translated = translated.replace(regex, `<span class="highlight">${britishOnly[britishTerm]}</span>`);
        hasTranslations = true;
      }
    });
    
    // Translate British spelling to American (longer words first)
    Object.keys(britishToAmericanSpelling).sort((a, b) => b.length - a.length).forEach(britishWord => {
      const regex = new RegExp(`\\b${britishWord}\\b`, 'gi');
      if (regex.test(translated)) {
        translated = translated.replace(regex, `<span class="highlight">${britishToAmericanSpelling[britishWord]}</span>`);
        hasTranslations = true;
      }
    });
    
    return { translated, hasTranslations };
  }
  
  translate(text, locale) {
    if (locale === 'american-to-british') {
      return this.translateAmericanToBritish(text);
    } else if (locale === 'british-to-american') {
      return this.translateBritishToAmerican(text);
    }
    return { translated: text, hasTranslations: false };
  }
  
  highlight(text, locale) {
    const result = this.translate(text, locale);
    return result.translated;
  }
}

module.exports = Translator;