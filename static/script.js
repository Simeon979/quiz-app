const quizData = {};

const quiz = {
  progress: 0,
  correct: 0,
  total: 0,

  advance() {
    this.progress += 1;
    this.display();
  },

  validate(answer) {
    const progress = quiz.progress;
    const correctAnswer = quizData[progress].answer;

    if (Number(answer.value) === Number(correctAnswer)) {
      this.update('correct');
      this.switchUi.call(answer, 'correct');
    } else {
      this.update('wrong');
      this.switchUi.call(answer, 'wrong');
    }

    setTimeout(() => this.advance(), 1500);
  },

  switchUi(switchTo) {
    /* update total number of question answered */
    document.getElementById('answer-total').innerHTML = quiz.total;

    if (switchTo === 'correct') {
      this.classList.add('correct');

      /* update total number of correct answers */
      document.getElementById('answer-correct').innerHTML = quiz.correct;
    } else if (switchTo === 'wrong') {
      this.classList.add('wrong');
      const correctOption = document.querySelector(`option[value='${correctAnswer}']`);
      correctOption.classList.add('correct');
    }
  },

  update(correct) {
    this.total += 1;
    if (correct) this.correct += 1;
  },

  display() {
    const progress = this.progress;

    if (!quizData[progress]) {
      this.finalize();
    } else {
      const questionDisplay = document.getElementById('question-text');
      questionDisplay.innerHTML = `<p>${quizData[progress].question}<\p>`;

      const optionContainer = document.getElementById('options');
      optionContainer.innerHTML = '';

      const choices = quizData[progress].option;

      let value = 0;
      choices.forEach((choice) => {
        const option = document.createElement('option');
        option.setAttribute('class', 'option');
        option.setAttribute('value', value);
        option.innerHTML = choice;
        option.addEventListener('click', quiz.validate(option));
        optionContainer.appendChild(option);
        value += 1;
      });
    }
  },

  finalize() {
    document.getElementById('final-correct').innerHTML = quiz.correct;
    document.getElementById('final-total').innerHTML = quiz.total;
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('score').style.display = 'none';
    document.getElementById('final-score').style.display = 'block';
  },
};

window.onload = $.getJSON('/question', { method: 'random' })
                 .done((data) => {
                   let number = 1;
                   data.foroption((option) => {
                     quizData[number] = option;
                     number += 1;
                   });
                   console.log(quizData);
                   quiz.advance();
                 })
                 .fail((error) => { console.error(error); });
