const pdfUrl = './pdf.pdf';
const fontUrl = './NanumSquareNeo-bRg.ttf';
const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib;

function saveByteArray(reportName, byte) {
    var blob = new Blob([byte], { type: "application/pdf" });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
};

function drawText(page, font, x, y, text, size = 8, rotate) {
    page.drawText(text, {
        x,
        y,
        font,
        size,
        color: rgb(0, 0, 0),
        rotate
    })
}

async function modifyPdf() {
    const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer())
    const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    pdfDoc.registerFontkit(fontkit)
    const customFont = await pdfDoc.embedFont(fontBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    const name = document.getElementById('name').value;
    const birthday = document.getElementById('birthday').value;
    const address = document.getElementById('address').value;
    const moveDate = document.getElementById('move-date').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    drawText(firstPage, customFont, 154, 755, '서울시 은평구 대조동 2-9');
    drawText(firstPage, customFont, 154, 740, '호반베르디움스테이원 ' + address);

    drawText(firstPage, customFont, 522, 747, '●');

    drawText(firstPage, customFont, 154, 702, name);

    drawText(firstPage, customFont, 415, 702, '본인');

    drawText(firstPage, customFont, 154, 667, birthday);

    drawText(firstPage, customFont, 415, 667, moveDate);

    drawText(firstPage, customFont, 154, 635, name);
    drawText(firstPage, customFont, 415, 635, moveDate);

    drawText(firstPage, customFont, 154, 605, phone);
    drawText(firstPage, customFont, 207, 574, '●');

    drawText(firstPage, customFont, 180, 544, '하나');
    drawText(firstPage, customFont, 240, 544, '역촌동');

    drawText(firstPage, customFont, 380, 560, email);

    drawText(firstPage, customFont, 400, 307, '■');

    const today = new Date();
    drawText(firstPage, customFont, 240, 227, today.getFullYear().toString().slice(2, 4));
    drawText(firstPage, customFont, 290, 227, (today.getMonth() + 1).toString());
    drawText(firstPage, customFont, 350, 227, today.getDate().toString());

    drawText(firstPage, customFont, 458, 189, name, 12);
    drawText(firstPage, customFont, 525, 183, name, 8, degrees(45));


    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    document.getElementById('pdf').src = pdfDataUri;
}

modifyPdf();

runButton = document.getElementById('run');
runButton.addEventListener('click', modifyPdf);