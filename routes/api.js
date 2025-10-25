'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;
      
      // Check for required fields
      if (text === undefined || locale === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }
      
      // Check for empty text
      if (text === '') {
        return res.json({ error: 'No text to translate' });
      }
      
      // Check for valid locale
      if (locale !== 'american-to-british' && locale !== 'british-to-american') {
        return res.json({ error: 'Invalid value for locale field' });
      }
      
      // Translate text
      const result = translator.translate(text, locale);
      
      // If no translation needed
      if (!result.hasTranslations) {
        return res.json({
          text: text,
          translation: "Everything looks good to me!"
        });
      }
      
      // Return translation
      return res.json({
        text: text,
        translation: result.translated
      });
    });
};
