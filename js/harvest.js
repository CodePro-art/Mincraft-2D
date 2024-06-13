const btnI = document.querySelector("#btn-increment")
const btnD = document.querySelector("#btn-decrement")
const number = document.querySelector("#number")
const counter = document.querySelector("#counter")

document.addEventListener("click", e => {
  if (e.target.tagName == "BUTTON"){
    if (e.target.id === "btn-increment"){
      number.classList.add("plus-one")
      number.innerText = "+1"
      counter.innerText = parseInt(counter.innerText) + 1
    } else {
      number.classList.add("minus-one")
      number.innerText = "-1"
      counter.innerText = parseInt(counter.innerText) - 1
    }
    number.classList.remove("hidden")
    btnI.disabled = true
    btnD.disabled = true
    setTimeout(() => {
      number.classList.remove("plus-one")
      number.classList.remove("minus-one")
      number.classList.add("hidden")
      btnI.disabled = false
      btnD.disabled = false
    }, 500)
  }
})