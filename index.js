// dom selector
const RANDOM_API_URL = 'https://api.quotable.io/random'
const quoteDisplayEl = document.getElementById('quoteDisplay');
const quoteInputEl = document.getElementById('quoteInput')
const timerEl = document.getElementById('timer')


quoteInputEl.addEventListener('input', ()=>{
     const arrayQuote= quoteDisplayEl.querySelectorAll('span')
     const arrayValue = quoteInputEl.value.split('')

     let correct = true

     arrayQuote.forEach((characterSpan, index) => {
       const character = arrayValue[index]
       if(character == null){
        characterSpan.classList.remove('correct')
        characterSpan.classList.remove('incorrect')
        correct = false
       }
      else if(character === characterSpan.innerText){
           characterSpan.classList.add('correct')
           characterSpan.classList.remove('incorrect')
       }else{
        characterSpan.classList.remove('correct')
        characterSpan.classList.add('incorrect')
        correct = false
       }
     })
     if(correct) renderNewQuote()
})

function getRandomQuote(){
   return fetch(RANDOM_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote(){
    const quote  = await getRandomQuote()
    quoteDisplayEl.innerText = ''
    quote.split('').forEach(character => {
       const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayEl.appendChild(characterSpan)
    })
    quoteInputEl.value = null
    startTimer()
}

let startTime

function startTimer(){
    timerEl.innerText = 0;
    startTime = new Date()
    setInterval(() => {
     timerEl.innerText=  getTimerTime() 
    }, 1000);
} 

function getTimerTime(){
    return Math.floor((new Date() - startTime) / 1000)
}


renderNewQuote()