// ─── GET ELEMENTS ──────────────────────────────────
const billInput   = document.getElementById('billInput');
const peopleInput = document.getElementById('peopleInput');
const customTip   = document.getElementById('customTip');
const tipBtns     = document.querySelectorAll('.tip-btn');
const resetBtn    = document.getElementById('resetBtn');
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

const currencySelect = document.getElementById('currencySelect');

const billError   = document.getElementById('billError');
const tipError    = document.getElementById('tipError');
const peopleError = document.getElementById('peopleError');

const tipAmountEl  = document.getElementById('tipAmount');
const grandTotalEl = document.getElementById('grandTotal');
const perPersonEl  = document.getElementById('perPerson');
const splitSummary = document.getElementById('splitSummary');
const copyBtn      = document.getElementById('copyBtn');
const tipEmoji     = document.getElementById('tipEmoji');

// ─── STATE ─────────────────────────────────────────
let selectedTip = 20; // default active preset

// ─── THEME TOGGLE ──────────────────────────────────
themeToggle.addEventListener('change', function () {
  const html = document.documentElement;
  if (themeToggle.checked) {
    html.setAttribute('data-theme', 'light');
    themeIcon.textContent = '☀️';
  } else {
    html.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '🌙';
  }
});

// ─── TIP PRESET BUTTONS ────────────────────────────
tipBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    // remove active from all buttons
    tipBtns.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');

    selectedTip = parseFloat(btn.getAttribute('data-tip'));
    customTip.value = ''; // clear custom input
    tipError.textContent = '';
    calculate();
  });
});

// ─── CUSTOM TIP INPUT ──────────────────────────────
customTip.addEventListener('input', function () {
  // remove active from preset buttons when user types custom
  tipBtns.forEach(function (b) { b.classList.remove('active'); });
  selectedTip = parseFloat(customTip.value);
  calculate();
});

// ─── CURRENCY CHANGE ───────────────────────────────
currencySelect.addEventListener('change', calculate);

// ─── BILL + PEOPLE INPUTS ──────────────────────────
billInput.addEventListener('input', calculate);
peopleInput.addEventListener('input', calculate);

// ─── VALIDATE & CALCULATE ──────────────────────────
function calculate() {
  const bill   = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);
  const tip    = customTip.value !== '' ? parseFloat(customTip.value) : selectedTip;

  let valid = true;

  // --- Validate bill ---
  if (billInput.value === '') {
    billError.textContent = '';
  } else if (isNaN(bill) || bill <= 0) {
    billError.textContent = 'Enter a positive bill amount.';
    valid = false;
  } else {
    billError.textContent = '';
  }

  // --- Validate tip ---
  if (customTip.value !== '') {
    if (isNaN(tip) || tip < 0) {
      tipError.textContent = 'Tip cannot be negative.';
      valid = false;
    } else if (tip > 100) {
      tipError.textContent = 'Tip cannot exceed 100%.';
      valid = false;
    } else {
      tipError.textContent = '';
    }
  } else {
    tipError.textContent = '';
  }

  // --- Validate people ---
  if (peopleInput.value === '') {
    peopleError.textContent = '';
  } else if (isNaN(people) || people < 1 || !Number.isInteger(people)) {
    peopleError.textContent = 'At least 1 person required.';
    valid = false;
  } else {
    peopleError.textContent = '';
  }

  // --- If any field is empty or invalid, show zeros ---
  if (
    !valid ||
    billInput.value === '' ||
    peopleInput.value === ''
  ) {
    const s = currencySelect.value;
    setResults(s + ' 0.00', s + ' 0.00', s + ' 0.00');
    splitSummary.textContent = '';
    tipEmoji.textContent = '';
    return;
  }

  // --- Tip emoji (C) ---
  if (tip <= 5)       tipEmoji.textContent = '😐';
  else if (tip <= 15) tipEmoji.textContent = '🙂';
  else                tipEmoji.textContent = '😄';

  // --- Core math ---
  const symbol     = currencySelect.value;
  const tipAmount  = bill * (tip / 100);
  const grandTotal = bill + tipAmount;

  // Rounding policy: round UP per person so the group never underpays
  const perPerson  = Math.ceil((grandTotal / people) * 100) / 100;

  // --- Split summary (A) ---
  splitSummary.textContent =
    people + ' people × ' + symbol + ' ' + perPerson.toFixed(2) +
    ' = ' + symbol + ' ' + (perPerson * people).toFixed(2);

  setResults(
    symbol + ' ' + tipAmount.toFixed(2),
    symbol + ' ' + grandTotal.toFixed(2),
    symbol + ' ' + perPerson.toFixed(2)
  );
}

// ─── UPDATE DISPLAY ────────────────────────────────
function setResults(tip, total, perPerson) {
  tipAmountEl.textContent  = tip;
  grandTotalEl.textContent = total;

  // animate the per person value
  perPersonEl.textContent = perPerson;
  perPersonEl.classList.remove('pop');
  // small trick: remove then add class to retrigger animation
  void perPersonEl.offsetWidth;
  perPersonEl.classList.add('pop');
}

// ─── RESET ─────────────────────────────────────────
resetBtn.addEventListener('click', function () {
  billInput.value   = '';
  peopleInput.value = '';
  customTip.value   = '';

  billError.textContent   = '';
  tipError.textContent    = '';
  peopleError.textContent = '';

  const sym = currencySelect.value;
  setResults(sym + ' 0.00', sym + ' 0.00', sym + ' 0.00');
  splitSummary.textContent = '';
  tipEmoji.textContent = '';
});

// ─── COPY BUTTON ───────────────────────────────────
copyBtn.addEventListener('click', function () {
  const text = perPersonEl.textContent;
  navigator.clipboard.writeText(text).then(function () {
    copyBtn.textContent = '✅';
    copyBtn.classList.add('copied');
    setTimeout(function () {
      copyBtn.textContent = '📋';
      copyBtn.classList.remove('copied');
    }, 1500);
  });
});