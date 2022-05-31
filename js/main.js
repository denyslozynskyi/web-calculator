let keyboard = document.querySelector('.keyboard')
let keys = ['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', 'X', '0', 'C', '=', '/',]
let myIndex = 0
let resultField = document.querySelector('.result')
let operation = undefined

function keyClick(e) {
    let keyPressed = e.target.id

    function checkResultField() {
        let firstChars = ['+', '-', 'X', '/']
        let secondChars = ['+', 'X', '/']
        let lastChar = resultField.innerText.slice(-1)

        if (firstChars.includes(lastChar) && secondChars.includes(keyPressed)) {
            return false
        }

        if (lastChar === '-' && keyPressed === '-') {
            return false
        }

        if (resultField.innerText === '' && secondChars.includes(keyPressed)) {
            return false
        }

        return true
    }

    if (checkResultField()) {
        resultField.innerText = resultField.innerText + keyPressed
    } else {
        alert('Incorect input')
    }

}

function getResult() {
    let userInput = resultField.innerText
    let userInputArr = []
    let userNumber = ''

    for (let i = 0; i < userInput.length; i++) {
        if (!isNaN(+userInput[i])) {
            userNumber += userInput[i]
        } else {
            userInputArr.push(userNumber)
            userNumber = ''
            userInputArr.push(userInput[i])
        }
        if (i === userInput.length - 1) {
            userInputArr.push(userNumber)
        } 
    }

    let number1 = +userInputArr[0]
    let number2 = +userInputArr[2]
    let operation = userInputArr[1]

    if (userInput[0] === '-') {
        number1 = +(userInputArr[1] + userInputArr[2])
        number2 = +userInputArr[4]
        operation = userInputArr[3]
    }
    
    if (userInputArr[3] === '-') {
        number1 = +userInputArr[0]
        number2 = +(userInputArr[3] + userInputArr[4])
        operation = userInputArr[1]
    }
    
    if (userInputArr[1] === '-' && userInputArr[5] === '-') {
        number1 = +(userInputArr[1] + userInputArr[2])
        number2 = +(userInputArr[5] + userInputArr[6])
        operation = userInputArr[3]
    }
    
    let result = 0

    switch(operation) {
        case '+':
            result = number1 + number2
            break
        case '-':
            result = number1 - number2
            break
        case 'X':
            result = number1 * number2
            break
        case '/':
            if (number2 === 0) {
                alert('No division by 0!')
                resetCalculator()
                result = ''
            } else {
                result = number1 / number2
                result = Math.round(result * 100) / 100
            }            
            break
    }
    
    resultField.innerText = result
}

function resetCalculator() {
    resultField.innerText = ''
}

for (let i = 0; i < 4; i++) {
    let keyboardRow = document.createElement('div')
    keyboardRow.classList.add('keyboard_row')
    for (let j = 0; j < 4; j++) {
        let key = document.createElement('div')
        key.classList.add('key')
        key.setAttribute('id', `${keys[myIndex]}`)
        key.addEventListener('click', keyClick)
        if (j === 0 && i === 0) {
            key.classList.add('top_left')
        }
        if (j === 3 && i === 0) {
            key.classList.add('top_right')
        }
        if (j === 0 && i === 3) {
            key.classList.add('bottom_left')
        }
        if (j === 3 && i === 3) {
            key.classList.add('bottom_right')
        }
        key.innerText = keys[myIndex]
        keyboardRow.appendChild(key)
        myIndex++
    }
    keyboard.appendChild(keyboardRow)
}

keyResult = document.getElementById('=')
keyResult.removeEventListener('click', keyClick)
keyResult.addEventListener('click', getResult)

keyReset = document.getElementById('C')
keyReset.addEventListener('click', resetCalculator)