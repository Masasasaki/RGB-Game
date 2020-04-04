let numCircles = 9
let colors = []
let pickedColor
let circles = document.querySelectorAll(".circle")
let colorDisplay = document.getElementById("colorDisplay")
let messageDisplay = document.querySelector("#message")
let h1 = document.querySelector("h1")
let resetButton = document.querySelector("#reset")
let modeButtons = document.querySelectorAll(".mode")

const changeColors = color => {
    circles.forEach(circle => circle.style.background = color)
}

const pickColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
}

const generateRandomColors = num => {
    let arr = []
    for (let i = 0; i < num; i++) {
        arr.push(randomColor())
    }
    return arr
}

const randomColor = () => {
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    return "rgb(" + r + ", " + g + ", " + b + ")"
}

const setupModeButtons = () => {
    modeButtons.forEach(button => {
        button.addEventListener("click", () => {
            modeButtons[0].classList.remove("selected")
            modeButtons[1].classList.remove("selected")
            button.classList.add("selected")
            button.textContent === "Easy" ? numCircles = 3 : numCircles = 9
            reset()
        })
    })
}

const setupCircles = () => {
    circles.forEach(circle => {
        circle.addEventListener("click", function(){
            let clickedColor = this.style.backgroundColor
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!"
                resetButton.textContent = "Play Again?"
                changeColors(clickedColor)
                h1.style.backgroundColor = clickedColor
            } else {
                this.style.backgroundColor = "#232323"
                messageDisplay.textContent = "Try Again"
            }
        })
    })
}

const reset = () => {
    colors = generateRandomColors(numCircles)
    pickedColor = pickColor()
    colorDisplay.textContent = pickedColor
    messageDisplay.textContent = ""
    resetButton.textContent = "New Colors"
    circles.forEach((circle, i) => {
        if (colors[i]) { 
            circle.style.display = "block"
            circle.style.background = colors[i]
        } else {
            circle.style.display = "none"
        } 
    })
    h1.style.backgroundColor = "black"
}

const init = () => {
    setupModeButtons()
    setupCircles()
    reset()
}

init()
resetButton.addEventListener("click", () => reset())