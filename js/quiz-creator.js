function createQuiz(quizData, quizName) {
    let quizSection = document.createElement('section');
    quizSection.classList.add('quiz');

    const quizHeading = document.createElement('h1');
    quizHeading.innerHTML = quizName;
    quizSection.append(quizHeading);

    quizSection = createQuizSections(quizSection, quizData);

    return quizSection;
}

function createQuizSections(quizSection, quizData) {
    let sectionNumber = 1;
    for (let sectionName in quizData) {
        const sectionHtml = createQuizSectionHtml(sectionName, quizData[sectionName], sectionNumber);
        quizSection.append(sectionHtml);

        sectionNumber++;
    }

    return quizSection
}

function createQuizSectionHtml(sectionName, sectionData, sectionNumber, columnNames = {
    'question': 'question',
    'correctOption': 'correctOption',
    'otherOptions': 'otherOptions'
}) {
    const section = document.createElement('section');
    section.classList.add('quiz-section');

    const sectionNameEle = document.createElement('h2');
    sectionNameEle.classList.add('quiz-section-name');
    sectionNameEle.innerHTML = sectionName;
    section.append(sectionNameEle);

    console.log(sectionData);
    let questionNumber = 1;
    for (let questionData of sectionData) {
        const questionBlock = document.createElement('div');
        questionBlock.classList.add('question-block');

        const questionBlockInner = createQuestionBlock(questionData, columnNames, sectionNumber, questionNumber);
        questionBlock.append(questionBlockInner);
        section.append(questionBlock);

        questionNumber++;
    }

    return section;
}

function createQuestionBlock(questionData, columnNames, sectionNumber, questionNumber) {
    const questionBlock = document.createElement('div');
    questionBlock.classList.add('question-block-inner');

    const questionTextBlock = document.createElement('div');
    questionTextBlock.classList.add('question-text');

    const questionText = document.createElement('h3');
    questionText.innerHTML = questionData[columnNames['question']]
    questionTextBlock.append(questionText);

    questionBlock.append(questionTextBlock);

    const response = document.createElement('div');
    response.classList.add('question-response');

    const mcqBlock = document.createElement('div');
    mcqBlock.classList.add('multiplechoice-el');

    const mcq = createMCQ(questionData, columnNames, sectionNumber, questionNumber)

    mcqBlock.append(mcq)

    response.append(mcqBlock);

    questionBlock.append(response);

    return questionBlock
}

function createMCQ(questionData, columnNames, sectionNumber, questionNumber) {
    const mcqForm = document.createElement('form');

    let allOptions = questionData[columnNames['otherOptions']];
    allOptions.push(questionData[columnNames['correctOption']]);

    allOptions = shuffle(allOptions);

    let optionNumber = 1;
    for (let option of allOptions) {
        const input = document.createElement('input');
        input.setAttribute('name', `mc-${sectionNumber}${questionNumber}`);
        input.setAttribute('id', `mc-${sectionNumber}${questionNumber}-${optionNumber}`);
        input.setAttribute('value', option);
        input.setAttribute('type', 'radio');
        mcqForm.append(input);

        const label = document.createElement('label');
        label.setAttribute('for', `mc-${sectionNumber}${questionNumber}-${optionNumber}`);
        label.innerHTML = option;
        mcqForm.append(label);

        optionNumber++;
    }

    return mcqForm
}

// Execution part
