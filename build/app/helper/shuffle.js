"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleQuiz = void 0;
function shuffleQuiz(quiz) {
    if (!quiz)
        return null;
    const shuffledQuestions = shuffleArray(quiz.questions);
    // Shuffles an array using the Fisher-Yates shuffle algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    // Shuffle the options for each question
    shuffledQuestions.forEach((question) => {
        question.options = shuffleArray(question.options);
    });
    const shuffledQuiz = Object.assign(Object.assign({}, quiz), { questions: shuffledQuestions });
    return shuffledQuiz;
}
exports.shuffleQuiz = shuffleQuiz;
