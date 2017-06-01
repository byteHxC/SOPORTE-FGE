$(document).ready(function(){
    const doc = new jsPDF();
    doc.text('Hello world!', 10, 10)
    doc.save('a4.pdf')
    doc.save('two-by-four.pdf')
});