const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
  
  suite('Translate to British English', () => {
    test('Translate Mangoes are my favorite fruit.', () => {
      const input = 'Mangoes are my favorite fruit.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output.translated, 'favourite');
      assert.include(output.translated, '<span class="highlight">favourite</span>');
    });
    
    test('Translate I ate yogurt for breakfast.', () => {
      const input = 'I ate yogurt for breakfast.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output.translated, 'yoghurt');
      assert.include(output.translated, '<span class="highlight">yoghurt</span>');
    });
    
    test('Translate We had a party at my friend\'s condo.', () => {
      const input = 'We had a party at my friend\'s condo.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output.translated, 'flat');
      assert.include(output.translated, '<span class="highlight">flat</span>');
    });
    
    test('Translate Can you toss this in the trashcan for me?', () => {
      const input = 'Can you toss this in the trashcan for me?';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output.translated, 'bin');
      assert.include(output.translated, '<span class="highlight">bin</span>');
    });
    
    test('Translate The parking lot was full.', () => {
      const input = 'The parking lot was full.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output.translated, 'car park');
      assert.include(output.translated, '<span class="highlight">car park</span>');
    });
    
    test('Translate Like a high tech Rube Goldberg machine.', () => {
      const input = 'Like a high tech Rube Goldberg machine.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output.translated, 'Heath Robinson device');
      assert.include(output.translated, '<span class="highlight">Heath Robinson device</span>');
    });
    
    test('Translate To play hooky means to skip class or work.', () => {
      const input = 'To play hooky means to skip class or work.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output.translated, 'bunk off');
      assert.include(output.translated, '<span class="highlight">bunk off</span>');
    });
    
    test('Translate No Mr. Bond, I expect you to die.', () => {
      const input = 'No Mr. Bond, I expect you to die.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output.translated, 'Mr');
      assert.include(output.translated, '<span class="highlight">Mr</span>');
      assert.notInclude(output.translated, 'Mr.');
    });
    
    test('Translate Dr. Grosh will see you now.', () => {
      const input = 'Dr. Grosh will see you now.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output.translated, 'Dr');
      assert.include(output.translated, '<span class="highlight">Dr</span>');
      assert.notInclude(output.translated, 'Dr.');
    });
    
    test('Translate Lunch is at 12:15 today.', () => {
      const input = 'Lunch is at 12:15 today.';
      const output = translator.translate(input, 'american-to-british');
      assert.include(output.translated, '12.15');
      assert.include(output.translated, '<span class="highlight">12.15</span>');
    });
  });
  
  suite('Translate to American English', () => {
    test('Translate We watched the footie match for a while.', () => {
      const input = 'We watched the footie match for a while.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output.translated, 'soccer');
      assert.include(output.translated, '<span class="highlight">soccer</span>');
    });
    
    test('Translate Paracetamol takes up to an hour to work.', () => {
      const input = 'Paracetamol takes up to an hour to work.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output.translated, 'Tylenol');
      assert.include(output.translated, '<span class="highlight">Tylenol</span>');
    });
    
    test('Translate First, caramelise the onions.', () => {
      const input = 'First, caramelise the onions.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output.translated, 'caramelize');
      assert.include(output.translated, '<span class="highlight">caramelize</span>');
    });
    
    test('Translate I spent the bank holiday at the funfair.', () => {
      const input = 'I spent the bank holiday at the funfair.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output.translated, 'public holiday');
      assert.include(output.translated, 'carnival');
      assert.include(output.translated, '<span class="highlight">public holiday</span>');
      assert.include(output.translated, '<span class="highlight">carnival</span>');
    });
    
    test('Translate I had a bicky then went to the chippy.', () => {
      const input = 'I had a bicky then went to the chippy.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output.translated, 'cookie');
      assert.include(output.translated, 'fish-and-chip shop');
      assert.include(output.translated, '<span class="highlight">cookie</span>');
      assert.include(output.translated, '<span class="highlight">fish-and-chip shop</span>');
    });
    
    test('Translate I\'ve just got bits and bobs in my bum bag.', () => {
      const input = 'I\'ve just got bits and bobs in my bum bag.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output.translated, 'odds and ends');
      assert.include(output.translated, 'fanny pack');
      assert.include(output.translated, '<span class="highlight">odds and ends</span>');
      assert.include(output.translated, '<span class="highlight">fanny pack</span>');
    });
    
    test('Translate The car boot sale at Boxted Airfield was called off.', () => {
      const input = 'The car boot sale at Boxted Airfield was called off.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output.translated, 'swap meet');
      assert.include(output.translated, '<span class="highlight">swap meet</span>');
    });
    
    test('Translate Have you met Mrs Kalyani?', () => {
      const input = 'Have you met Mrs Kalyani?';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output.translated, 'Mrs.');
      assert.include(output.translated, '<span class="highlight">Mrs.</span>');
    });
    
    test('Translate Prof Joyner of King\'s College, London.', () => {
      const input = 'Prof Joyner of King\'s College, London.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output.translated, 'Prof.');
      assert.include(output.translated, '<span class="highlight">Prof.</span>');
    });
    
    test('Translate Tea time is usually around 4 or 4.30.', () => {
      const input = 'Tea time is usually around 4 or 4.30.';
      const output = translator.translate(input, 'british-to-american');
      assert.include(output.translated, '4:30');
      assert.include(output.translated, '<span class="highlight">4:30</span>');
    });
  });
  
  suite('Highlight translation', () => {
    test('Highlight translation in Mangoes are my favorite fruit.', () => {
      const input = 'Mangoes are my favorite fruit.';
      const output = translator.highlight(input, 'american-to-british');
      assert.include(output, '<span class="highlight">favourite</span>');
    });
    
    test('Highlight translation in I ate yogurt for breakfast.', () => {
      const input = 'I ate yogurt for breakfast.';
      const output = translator.highlight(input, 'american-to-british');
      assert.include(output, '<span class="highlight">yoghurt</span>');
    });
    
    test('Highlight translation in We watched the footie match for a while.', () => {
      const input = 'We watched the footie match for a while.';
      const output = translator.highlight(input, 'british-to-american');
      assert.include(output, '<span class="highlight">soccer</span>');
    });
    
    test('Highlight translation in Paracetamol takes up to an hour to work.', () => {
      const input = 'Paracetamol takes up to an hour to work.';
      const output = translator.highlight(input, 'british-to-american');
      assert.include(output, '<span class="highlight">Tylenol</span>');
    });
  });
});
