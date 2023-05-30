const account1={
    owner: 'Jonas Schmedtann',
    movements: [200,450,-400,1300],
    interestRate: 1.2,
    pin: 1111,
    movementsDate : [
       "5/29/2023",
       "5/5/2023",
       "5/10/2023",
       "4/3/2023"
    ]

}

const account2={
    owner: 'Jessica Davis',
    movements: [5000,3400,-150,-790],
    interestRate: 1.5,
    pin: 2222,
    movementsDate : [
        "5/29/2023",
        "5/5/2023",
        "5/10/2023",
        "4/3/2023"
     ]
}

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200,-200,340,-300],
    interestRate: 0.7,
    pin : 3333,
    movementsDate : [
        "5/29/2023",
        "5/5/2023",
        "5/10/2023",
        "4/3/2023"
     ]
}

const accounts = [account1,account2,account3]


const containerMovements = document.querySelector('.scrollable-div')
const labelBalance = document.querySelector('.labelBalance')
const labelSumIn = document.querySelector('.label-sum-in')
const labelSumOut = document.querySelector('.label-sum-out')
const labelInterest = document.querySelector('.label-sum-interest')
const inputLoginUserName = document.querySelector('.login__input__user')
const inputLoginPin = document.querySelector('.login__input__pin')
const buttonLogin = document.querySelector('.arrow-button')
const labelWelcome = document.querySelector('.labelWelcome')
const containerApp = document.querySelector('.app')
const transferUserName = document.querySelector('.transferUserName')
const transferAmount = document.querySelector('.transferAmount')
const transactionButton = document.querySelector('.transaction-button')
const deleteUserButton = document.querySelector(".deletesButton")
const loanButton = document.querySelector(".loan-button")
const sortButton = document.querySelector('.sortButton')
const timerLogOut = document.querySelector(".timerLogOut")

console.log(timerLogOut.textContent)
console.log(inputLoginUserName)
console.log(inputLoginPin)
console.log(buttonLogin)



const displayMovements = function(acc){
    const movements = acc.movements
    const movementsDate = acc.movementsDate
    containerMovements.innerHTML = ''
    movements.forEach(function(mov,i){
        const nowDate = movementsDate[i]
        const type = mov > 0 ? "Deposit" : "withDraw"
        const html = 
        `
            <div class="row mt-4 singleMovement">
            <div class="col">
            <div class="my-div">
                <p><span class=${type}>${i+1} ${type}</span>  <span class="ml-4">${nowDate}</span>  <span class="amountDeposit">${mov}&euro;</span></p>
            </div>
            </div>
            <hr color="grey" style="width: 95%;">
        </div>
        `;
        containerMovements.insertAdjacentHTML
        ('beforeEnd',html);
    
    })
}



const calcDisplayBalance = function(acc){
    const balance = acc.movements.reduce((acc,mov) => acc+mov,0)
    console.log(balance)
    acc.balance = balance
    labelBalance.textContent = `${acc.balance} \u20AC`
}


const calcDisplaySummary = function(acco){
    const incomes = acco.movements.filter((item) => item>0)
    .reduce((acc,mov) => acc+mov ,0)
    console.log(incomes)
    labelSumIn.textContent = `${incomes}\u20AC`
    const out = Math.abs(acco.movements.filter((item) => item<0)
    .reduce((acc,mov)=> acc+mov))
    console.log(out)
    labelSumOut.textContent = `${out}\u20AC`
    const interest = acco.movements.filter((item) => item>0)
    .map((deposit) => deposit*(acco.interestRate/100))
    .reduce((acc,inte) => acc+inte,0)
    labelInterest.textContent = `${interest}\u20AC`

}


//Updating UI in such a way that Summary,Movements and Balance is updated

const updateUI = (singleAccount) =>{
    displayMovements(singleAccount)
    calcDisplayBalance(singleAccount)
    calcDisplaySummary(singleAccount)
}

//decrement time 
function decrementTime(time) {
    const [minutes, seconds] = time.split(':');
  
    let m = parseInt(minutes, 10);
    let s = parseInt(seconds, 10);
  
    // Convert time to seconds
    let totalSeconds = m * 60 + s;
  
    // Decrement by 1 second
    totalSeconds--;
  
    // Calculate the new time components
    m = Math.floor((totalSeconds % 3600) / 60);
    s = totalSeconds % 60;
  
    // Format the new time
    const newTime = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  
    return newTime;
  }
  

  
  let currentAccount;

//Start logOut Timer 
const logOutTimer = function(){
    let originalTime = '05:00'
    let time = 5000
    const interval = setInterval(function(){
        console.log(`The time is ${time}`)
        originalTime = decrementTime(originalTime)
        timerLogOut.textContent = originalTime
        time--
        if(time == 0 ){
            alert("Time Up! Login again to perform futher actions")
            containerApp.style.opacity = 0;
            labelWelcome.textContent = `Log In to get started`
            clearInterval(interval)
        }
    },1000)
}



const createUserNames = (accs) =>{
    accs.forEach(function(mov){
        mov.userName = mov.owner.toLowerCase().split(' ').map((item) => {
            return item[0]
        }).join('')
    })

}

createUserNames(accounts)

//Event Handler

buttonLogin.addEventListener('click',function(e){
    e.preventDefault()
    console.log("ALLAH U AKBAR")
    currentAccount = accounts.find(acc => acc.userName == inputLoginUserName.value);
    console.log(currentAccount)
    if(currentAccount.pin == Number(inputLoginPin.value)){
        logOutTimer()
        //DISPLAY UI AND WELCOME MESSAGE
        labelWelcome.textContent = `Good Afternoon,${currentAccount.owner}!`
        console.log("login")
        containerApp.style.opacity = 100;
        updateUI(currentAccount)
        inputLoginPin.value = inputLoginUserName.value = ""
        inputLoginPin.blur()
    }

})


//Sort movements arrray 
sortButton.addEventListener('click',function(e){
    e.preventDefault()
    console.log("ALLAH U AKBAR")
    accounts.forEach(function(mov,i){
        if(mov.userName == currentAccount.userName){
            mov.movements = mov.movements.sort((a,b) => b-a)
        }
    })
    console.log(accounts)
    updateUI(currentAccount)
})

//Loan Button 
loanButton.addEventListener('click',function(e){
    e.preventDefault()
    console.log("this is loan button")
    const loanAmount = Number(document.querySelector(".loanAmount").value)
    setTimeout(function(){
        if(loanAmount >= 100 ){
            console.log("this is an amount")
            accounts.forEach(function(mov,i){
                if(mov.userName == currentAccount.userName){
                    mov.movements = mov.movements.concat(Number(loanAmount))
                }
            })
            alert("Loan given")
        }
        else{
            alert("Amount of loan must be greater that 100")
        }
        console.log(accounts)
        updateUI(currentAccount)
    } , 2500)
})


//Transfer money to other user
transactionButton.addEventListener('click',function(e){
    e.preventDefault()
    const now = new Date()
    const date = now.getDate()
    const month = now.getMonth()+1
    const year = now.getFullYear()
    const fullDay = `${date}/${month}/${year}`
    console.log("ALLAH U AKBAR")
    console.log(currentAccount)
    const receiverAccount = accounts.find((item) => item.userName == transferUserName.value)
    if(transferAmount.value > 0 &&
        receiverAccount &&
        currentAccount.balance >= transferAmount.value &&
        receiverAccount.userName !== currentAccount.userName){
            accounts.forEach(function(mov,i){
                if(mov.userName == transferUserName.value){
                    mov.movements = mov.movements.concat(Number(transferAmount.value))
                    mov.movementsDate = mov.movementsDate.concat(fullDay)
                }
                else if(mov.userName == currentAccount.userName){
                    mov.movements = mov.movements.concat(Number(transferAmount.value)*-1)
                    mov.movementsDate = mov.movementsDate.concat(fullDay)
                }
            })
        
        }
        else{
            alert("Invalid Transfer . \n Check whether you are entering transferring amount less than available balance!")
        }
        

    console.log(accounts)
    updateUI(currentAccount)
    transferUserName.value = transferAmount.value = ""
})


//Implementing the logic to allow users to delete their account
deleteUserButton.addEventListener('click',function(e){
    e.preventDefault()
    console.log("ALLAH U AKBAR")
    const deleteUserPIN = Number(document.querySelector(".deleteUserPin").value);
    let indexes;
    if(currentAccount.pin == deleteUserPIN){
            indexes = accounts.findIndex((item) => item.userName == currentAccount.userName)
    }
    console.log(indexes)
    accounts.splice(indexes,1)
    alert("Account Deleted Successfully")
    labelWelcome.textContent = `Log In to get started`
    containerApp.style.opacity = 0;
})


var movements = account1.movements

const deposits = movements.filter((item) => item > 0)
const withdraws = movements.filter((item) => item < 0)
console.log(deposits)
console.log(withdraws)

const max = movements.reduce((acc,curr,i,arr) => {
    if (acc>curr){
        return acc
    }
    else{
        return curr
    }
},movements[0])
console.log(max)

const firstWithdrawal = movements.find(mov => mov <0);
console.log(firstWithdrawal)
console.log(accounts)

const account = accounts.find(acc => acc.owner == "Jessica Davis");
console.log(account)





