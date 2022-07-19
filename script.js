const billInput = document.getElementById("bill");
const peopleCountInput = document.getElementById("people");
const customTipinput = document.getElementById("custom");
const tipAmount = document.getElementById("tip-amount");
const total = document.getElementById("total");
const radioInputs = document.querySelectorAll("input[type='radio']");
const billError = document.getElementById("bill-error");
const peopleCountError = document.getElementById("people-count-error");
const resetButton = document.getElementById("reset");

let bill = undefined;
let peopleCount = undefined;
let tipPercent = undefined;

function calculateResults() {
  const allInputsAreValid = !!bill && !!peopleCount && !!tipPercent;
  const tipPerPerson = (((tipPercent / 100) * bill) / peopleCount).toFixed(2);
  const totalPerPerson = (
    ((tipPercent / 100 + 1) * bill) /
    peopleCount
  ).toFixed(2);
  if (allInputsAreValid) renderOutput(tipPerPerson, totalPerPerson);
}

function uncheckRadioButton() {
  const checkedRadioButton = document.querySelector(
    'input[name="tip"]:checked'
  );
  if (checkedRadioButton) checkedRadioButton.checked = false;
}

billInput.addEventListener("input", (event) => {
  const value = Number(event.target.value);
  if (value === 0) {
    billError.classList.add("shown");
    event.target.setAttribute("invalid", "");
  } else {
    bill = value;
    billError.classList.remove("shown");
    event.target.removeAttribute("invalid");
    calculateResults();
  }
});

peopleCountInput.addEventListener("input", (event) => {
  const value = Number(event.target.value);
  if (value === 0) {
    peopleCountError.classList.add("shown");
    event.target.setAttribute("invalid", "");
  } else {
    peopleCount = value;
    peopleCountError.classList.remove("shown");
    event.target.removeAttribute("invalid");
    calculateResults();
  }
});

customTipinput.addEventListener("input", (event) => {
  const value = Number(event.target.value);
  if (value !== 0) {
    tipPercent = value;
    calculateResults();
  }
});

customTipinput.addEventListener("click", (event) => {
  uncheckRadioButton();
});

for (const input of radioInputs) {
  input.addEventListener("change", (event) => {
    tipPercent = Number(event.target.value);
    calculateResults();
  });
}

resetButton.addEventListener("click", () => reset());

function reset() {
  billInput.value = "";
  peopleCountInput.value = "";
  customTipinput.value = "";
  uncheckRadioButton();
  resetButton.setAttribute("disabled", "");
}

function renderOutput(tipPerPerson, totalPerPerson) {
  tipAmount.innerText = tipPerPerson;
  total.innerText = totalPerPerson;
  resetButton.removeAttribute("disabled");
}
