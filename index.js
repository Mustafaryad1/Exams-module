(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
       
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctanswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
      let score = (numCorrect/myQuestions.length)*100 ;
      // show number of correct answers out of total
      
      
        quizContainer.innerHTML = `Exam Finishd: Your Score is ${score.toFixed(2)}%`;
        submitButton.style.display='none';
        previousButton.style.display= 'none';
        
      
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
     
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const mydata=[
      {
          "_id": {
            "$oid": "5f56bb5ab1823fffbf3f919b"
          },
          "question": "4 + 5",
          "answers": [
            "1",
            "2",
            "9"
          ],
          "correctanswer": "2"
        },{
          "_id": {
            "$oid": "5f56bccb943a94297c7bc5ec"
          },
          "question": "2 + 2",
          "answers": [
            "1",
            "4",
            "9"
          ],
          "correctanswer": "1"
        },{
          "_id": {
            "$oid": "5f56bcd8943a94297c7bc5ed"
          },
          "question": "2 - 2",
          "answers": [
            "0",
            "4",
            "9"
          ],
          "correctanswer": "0"
        }
      ]

      
      //extract 
      let questions = mydata.map(el => el.question);
      let answers = mydata.map(el => el.answers);
      let correctanswer = mydata.map(el => el.correctanswer);
      //create an exam object
      let exam = function(q,ans,cans){
          this.question=q;
          this.answers=ans;
          this.correctanswer=cans;
      } 
      //array of exam objects = one exam
      let exams = [];
      let i;
      const length = questions.length;
      for(i= 0;i<length;i++){
          let q = questions[i];
          let ans = answers[i];
          let cans = correctanswer[i];
          let question = new exam (q,ans,cans);
          exams.push(question);
          }
       //add the created exams to be displayed 
      const myQuestions = exams;
     
      
    
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  