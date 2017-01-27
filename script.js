const quiz = {
  progress: 0,
  correct: 0,
  total: 0,

  advance() {
    this.progress += 1;
  },

  validate() {
    const progress = quiz.progress;
    const correctAnswer = quizData[progress].answer;

    quiz.total += 1;
    document.getElementById('answer-total').innerHTML = quiz.total;

    if (Number(this.value) === correctAnswer) {
      this.setAttribute('id', 'correct');
      quiz.correct += 1;
      document.getElementById('answer-correct').innerHTML = quiz.correct;
    } else {
      this.setAttribute('id', 'wrong');
      document.querySelector(`option[value='${correctAnswer}']`).setAttribute('id', 'correct');
    }

    setTimeout(() => quiz.display(), 1500);
  },

  display() {
    quiz.advance();

    const progress = quiz.progress;

    if (!quizData[progress]) {
      quiz.finalize();
    } else {
      const questionDisplay = document.getElementById('question-text');
      questionDisplay.innerHTML = `<p>${quizData[progress].question}<\p>`;

      const optionContainer = document.getElementById('options');
      optionContainer.innerHTML = '';

      const options = quizData[progress].option;
      let value = 0;
      options.forEach((option) => {
        const each = document.createElement('option');
        each.setAttribute('class', 'option');
        each.setAttribute('value', value);
        each.innerHTML = option;
        each.addEventListener('click', quiz.validate.bind(each));
        optionContainer.appendChild(each);
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

window.onload = quiz.display;
