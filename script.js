document.addEventListener('DOMContentLoaded', () => {
    const linkInput = document.getElementById('linkInput');
    const generateBtn = document.getElementById('generateBtn');
    const qrWrapper = document.getElementById('qrWrapper');
    const qrContainer = document.getElementById('qrcode');
    const downloadBtn = document.getElementById('downloadBtn');

    let qrCodeInstance = null;

    generateBtn.addEventListener('click', () => {
        const url = linkInput.value.trim();

        if (!url) {
            alert('Por favor, digite ou cole um link válido.');
            return;
        }

        // Limpa visualização anterior
        qrContainer.innerHTML = '';
        qrWrapper.classList.remove('hidden');

        // Gera QR Code com correção de erro alta (H)
        qrCodeInstance = new QRCode(qrContainer, {
            text: url,
            width: 180,
            height: 180,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    });

    // Função para salvar a imagem do QR Code
    downloadBtn.addEventListener('click', () => {
        const img = qrContainer.querySelector('img');
        const canvas = qrContainer.querySelector('canvas');

        let imageSrc = '';
        if (img && img.src) {
            imageSrc = img.src;
        } else if (canvas) {
            imageSrc = canvas.toDataURL('image/png');
        }

        if (imageSrc) {
            const link = document.createElement('a');
            link.href = imageSrc;
            link.download = 'ConSite-QRCode.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });
});

