// Open tool modal
function openTool(toolName) {
    if (toolName === 'iqc') {
        document.getElementById('iqcModal').style.display = 'block';
    } else if (toolName === 'ustad') {
        document.getElementById('ustadModal').style.display = 'block';
    } else if (toolName === 'downloader') {
        document.getElementById('downloaderModal').style.display = 'block';
    }
    document.body.style.overflow = 'hidden';
}

// Close tool modal
function closeTool() {
    document.getElementById('iqcModal').style.display = 'none';
    document.getElementById('ustadModal').style.display = 'none';
    document.getElementById('downloaderModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Generate IQC
function generateIQC() {
    const text = document.getElementById('iqcText').value.trim();
    const bgColor = document.getElementById('bgColor').value;
    const blurAmount = document.getElementById('blurAmount').value;

    if (!text) {
        alert('Masukkan text terlebih dahulu!');
        return;
    }

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    // Draw blurred background
    ctx.filter = `blur(${blurAmount}px)`;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text (without blur)
    ctx.filter = 'none';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Courier New';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Word wrap
    const words = text.split(' ');
    let line = '';
    let y = 80;
    const lineHeight = 50;
    const maxWidth = 450;

    words.forEach((word) => {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line) {
            ctx.fillText(line, canvas.width / 2, y);
            line = word + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    });
    ctx.fillText(line, canvas.width / 2, y);

    // Display preview
    const preview = document.getElementById('iqcPreview');
    preview.innerHTML = '';
    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/png');
    img.className = 'iqc-image';
    preview.appendChild(img);
    preview.classList.add('active');

    // Show download button
    document.getElementById('downloadIqcBtn').style.display = 'block';

    // Store canvas for download
    window.iqcCanvas = canvas;
}

// Download IQC
function downloadIQC() {
    if (!window.iqcCanvas) return;

    const link = document.createElement('a');
    link.download = 'iqc-generator.png';
    link.href = window.iqcCanvas.toDataURL('image/png');
    link.click();
}

// Update blur value display
document.addEventListener('DOMContentLoaded', function() {
    const blurSlider = document.getElementById('blurAmount');
    if (blurSlider) {
        blurSlider.addEventListener('input', function() {
            document.getElementById('blurValue').textContent = this.value + 'px';
        });
    }

    const colorInput = document.getElementById('bgColor');
    if (colorInput) {
        colorInput.addEventListener('input', function() {
            document.getElementById('bgColorValue').textContent = this.value.toUpperCase();
        });
    }
});

// Generate Ustad answer
function generateUstad() {
    const question = document.getElementById('ustadQuestion').value.trim();

    if (!question) {
        alert('Tanya sesuatu dulu!');
        return;
    }

    const answers = [
         'Allaahu a'lam (Allah yang lebih tahu)',
         'Berdasarkan Al-Qur\'an dan Hadis, jawabannya adalah...
         ,
         'Ini termasuk kategori fiqh, semoga bermanfaat',
         'Jangan lupa untuk istikharah terlebih dahulu',
         'Semoga Allah memberikan hidayah untuk kita semua',
         'Sebaiknya konsultasikan dengan ulama setempat',
         'Ini adalah dari ajaran Nabi Muhammad SAW',
    ];

    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    const result = document.getElementById('ustadResult');
    const answerElement = document.getElementById('ustadAnswer');

    answerElement.textContent = randomAnswer;
    result.style.display = 'block';
}

// Download URL
function downloadURL() {
    const url = document.getElementById('urlInput').value.trim();

    if (!url) {
        alert('Masukkan URL terlebih dahulu!');
        return;
    }

    const result = document.getElementById('downloaderResult');
    const message = document.getElementById('downloaderMessage');

    message.textContent = `Downloading from: ${url}\n\nNote: Ini adalah simulasi. Download sebenarnya memerlukan backend server dengan API integration.`;
    result.style.display = 'block';

    // In real scenario, this would trigger actual download
    // window.location.href = url;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const iqcModal = document.getElementById('iqcModal');
    const ustadModal = document.getElementById('ustadModal');
    const downloaderModal = document.getElementById('downloaderModal');

    if (event.target == iqcModal) {
        closeTool();
    }
    if (event.target == ustadModal) {
        closeTool();
    }
    if (event.target == downloaderModal) {
        closeTool();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeTool();
    }
});