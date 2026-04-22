document.addEventListener('DOMContentLoaded', function () {

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(el => {
            if (el.isIntersecting) el.target.classList.add('visible');
        });
    }, { threshold: 0.05 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

});

function calculate() {
    const name      = document.getElementById('catName') ? document.getElementById('catName').value.trim() || 'قطتك' : 'قطتك';
    const weight    = parseFloat(document.getElementById('catWeight').value);
    const age       = document.getElementById('catAge').value;
    const food      = document.getElementById('foodType').value;
    const resultDiv = document.getElementById('calcResult');
    const loader    = document.getElementById('loader');
    const errorMsg  = document.getElementById('errorMsg');

    if (!weight || !age || !food) {
        if (errorMsg) errorMsg.style.display = 'block';
        resultDiv.classList.remove('show');
        return;
    }

    if (errorMsg) errorMsg.style.display = 'none';
    resultDiv.classList.remove('show');
    if (loader) loader.style.display = 'block';

    setTimeout(() => {
        if (loader) loader.style.display = 'none';

        let calories = weight * 30 + 70;
        if (age === 'kitten')      calories *= 2;
        else if (age === 'senior') calories *= 0.8;

        let amount = '';
        let note   = '';

        if (food === 'dry') {
            amount = `${Math.round(calories / 3.5)} غرام / يوم`;
            note   = 'يُقسم على وجبتين أو ثلاث وجبات';
        } else if (food === 'wet') {
            const grams = Math.round(calories);
            amount = `${grams} غرام / يوم`;
            note   = `أي ما يقارب ${Math.round(grams / 85)} علبة صغيرة (٨٥غ)`;
        } else {
            amount = `${Math.round((calories * 0.5) / 3.5)}غ جاف + ${Math.round(calories * 0.5)}غ رطب`;
            note   = 'توزيع متوازن بين الوجبتين';
        }

        const labelEl = document.getElementById('resultLabel');
        if (labelEl) labelEl.textContent = `الكمية الموصى بها لـ ${name}`;
        document.getElementById('resultValue').textContent = amount;
        document.getElementById('resultNote').textContent  = note;
        resultDiv.classList.add('show');

    }, 800);
}