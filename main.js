class Main {
    constructor() {
        this.quotes = [
            "The greatest glory in living lies not in never falling, but in rising every time we fall.",
            "The way to get started is to quit talking and begin doing.",
            "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
            "The future belongs to those who believe in the beauty of their dreams.",
            "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough. ",
            "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success. ",
            "You may say I'm a dreamer, but I'm not the only one. I hope someday you'll join us. And the world will live as one.",
            "If you aren't making waves, you aren't kicking hard enough",
            "Do something today that your future self will thank you for.",
            "A hero would sacrifice you to save the world, but a villain would sacrifice the world to save you.",
            "When governments fear the people, there is liberty. When the people fear the government, there is tyranny",
            "Look at you comforting others with the words you wish to hear.",
        ]
        this.currentQuote = ""
        this.mistakes = 0
        this.count = 60
        this.score = 0
        this.bindEventListeners()
    }
    bindEventListeners() {
        const startBtn = document.querySelector(".start")
        const resetBtn = document.querySelector(".reset")
        const quoteTypeArea = document.querySelector(".quote-type")

        startBtn.addEventListener("click", () => this.startGame())
        resetBtn.addEventListener("click", () => this.resetGame())
        quoteTypeArea.addEventListener("input", () => this.mistakeChecker())
    }

    randomizeQuotes() {
       const randomizer = Math.floor(Math.random() * this.quotes.length)
       this.currentQuote = this.quotes[randomizer]
       return this.currentQuote
    }

    displayQuotes() {
        const container = document.querySelector(".quote-container")
        container.innerHTML = ""
        const quote = document.createElement("p")
        quote.textContent = this.currentQuote
        container.appendChild(quote)
    }

    startGame() {
        this.randomizeQuotes()
        this.timerandScore()
        this.displayQuotes()
        this.mistakeChecker()
        this.mistakes = 0
    }

    resetGame() {
        if(this.timer1) {
            clearTimeout(this.timer1)
        }
        this.randomizeQuotes()
        this.displayQuotes()
        this.mistakes = 0
        const quoteTypeArea = document.querySelector(".quote-type")
        quoteTypeArea.readOnly = false
        quoteTypeArea.value = ""
        const mistakesDisplay = document.querySelector(".mistakes")
        mistakesDisplay.textContent = `Mistakes: ${this.mistakes}`
        const time = document.querySelector(".counter")
        this.count = 60
        time.textContent = `Time: ${this.count}`
        this.timerandScore()
    }

    timerandScore() {
        this.timer1 = setInterval(() => {
            this.count--
            const time = document.querySelector(".counter")
            time.textContent = `Time: ${this.count}`
            if(this.count === 0) {
                clearTimeout(this.timer1)
                time.textContent = `Time's up!`
                const quoteTypeArea = document.querySelector(".quote-type")
                quoteTypeArea.readOnly = true
                if(this.mistakes === 0 && this.userInput === "") {
                    this.score = 0
                    const scoreDisplay = document.querySelector(".score")
                    scoreDisplay.textContent = `Score: ${this.score}`           
                }
                if(this.mistakes === 0) {
                    this.score++
                    const scoreDisplay = document.querySelector(".score")
                    scoreDisplay.textContent = `Score: ${this.score}`
                } else {
                    this.score = 0
                    const scoreDisplay = document.querySelector(".score")
                    scoreDisplay.textContent = `Score: ${this.score}`
                }
            }
        }, 1000)
    }

    mistakeChecker() {
        //checks for mistakes
        const textDisplayArea = document.querySelector(".quote-type")
        const userInput = textDisplayArea.value.trim()
        let mistakes = 0

        for(let i = 0; i < userInput.length; i++) {
            if(userInput[i] !== this.currentQuote[i]) {
                mistakes++
            }
        }
        if(mistakes !== this.mistakes) {
            this.mistakes = mistakes
            const mistakesDisplay = document.querySelector(".mistakes")
            mistakesDisplay.textContent = `Mistakes: ${this.mistakes}`
        }
    }

}

const game = new Main()
