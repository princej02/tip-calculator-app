// if bill input is empty, button should be disabled
const button = document.querySelectorAll('.btn')
const billInput = document.querySelector('.bill-input')
const resetBtn = document.querySelector('.btn-reset')
const noPeople = document.querySelector('.no-people')
const tipAmount = document.querySelector('.tip-amount')
const total = document.querySelector('.total')
const allInput = document.querySelectorAll('input[type="text"]');
const custom = document.querySelector('.tip-input')
const btnClicked = document.querySelector('.btn-clicked')


billInput.addEventListener('keyup', enableButton)
resetBtn.addEventListener('click', reset)
button.forEach(btn => btn.addEventListener('click', clickedBtn))

noPeople.addEventListener('input', () => {
  let bill = parseFloat(billInput.value);
  let percentage = custom.value.length > 0 ? parseFloat(custom.value) : parseInt(document.querySelector('.btn-clicked').getAttribute("data-id"))
  let people = parseInt(noPeople.value);

  tipAmountCalculate(bill, percentage, people)
})



let tipnum = 0;
let fixedNum = tipnum.toFixed(2)

let totalNum = 0;
let fixedTotal = totalNum.toFixed(2)


tipAmount.textContent = `$${fixedNum}`;
total.textContent = `$${fixedTotal}`



// Calculates the tip amount and the total value
function tipAmountCalculate(bill, percentage, noOfpeople) {
  if(bill && percentage && noOfpeople) {
    tipnum = (bill / noOfpeople) * (percentage/100)
    isNaN(tipnum) ? tipAmount.textContent = `$${0.00.toFixed(2)}` : tipAmount.textContent = `$${tipnum.toFixed(2)}`

    totalNum = (bill / noOfpeople) + tipnum;
    isNaN(totalNum) ? total.textContent = `$${0.00.toFixed(2)}` : total.textContent = `$${totalNum.toFixed(2)}`
  }

}

// Controls the appearance of the reset btn.
function enableButton() {
  if (billInput.value.length > 0) {
    resetBtn.classList.remove("btn-disabled")
    resetBtn.classList.add("btn-enable")
  }else{
    resetBtn.classList.remove("btn-enable")
    resetBtn.classList.add("btn-disabled")
  }
}


// resets everything
function reset() {
  tipAmount.textContent = `$${fixedNum}`;
  total.textContent = `$${fixedTotal}`
  billInput.value = ''
  noPeople.value = ''
  custom.value = ''
  button.forEach(btn => {
    if(btn.classList.contains('btn-clicked')){
      btn.classList.remove('btn-clicked');
    }
  })
}

allInput.forEach(i => {
  i.addEventListener('input', inputValidator)
})

allInput.forEach(i => {
  i.addEventListener('input', numValidation)
})


function inputValidator() {
  const warnMsg = document.querySelector('.span')

  if(this.classList.contains("no-people")) {
    if(this.value === "0" ){
      this.classList.add("invalid-input")
      warnMsg.classList.remove("hide-warn")
    }else{
      this.classList.remove("invalid-input")
      warnMsg.classList.add("hide-warn")
    }
  }
  
}

function numValidation() {
  if(isNaN(this.value)){
    alert("Input has to be numeric.")
    this.value = ""
  }
}


// Controls the appearance of clicked tip percentage btn
function clickedBtn(e) {
  let btn = e.target;
  if(btn.classList.contains("btn")){
    btn.classList.toggle("btn-clicked")
  }
}

