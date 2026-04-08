const fs = require('fs');
const pdfParse = require('pdf-parse');
const dataBuffer = fs.readFileSync('7th module.pdf');
pdfParse(dataBuffer).then(function(data) {
    fs.writeFileSync('7th_module_text.txt', data.text);
    console.log('Done, length:', data.text.length);
}).catch(function(err) {
    console.error('Error:', err.message);
});
