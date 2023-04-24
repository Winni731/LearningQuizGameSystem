import he from "he";

let triviaData = [
    {
        category: "Test 1",
        type: "multiple",
        difficulty: "easy",
        question: "easy easy easy easy easy?",
        correctAns: "1",
        incorrectAns: ["2", "3", "4"],
    },
    {
        category: "Test 2",
        type: "multiple",
        difficulty: "easy",
        question: "easy easy easy easy easy????",
        correctAns: "2",
        incorrectAns: ["3", "4", "5"],
    },
    {
        category: "Test 3",
        type: "multiple",
        difficulty: "easy",
        question: "easy easy easy easy easy?easy easy easy easy easy?",
        correctAns: "13",
        incorrectAns: ["3", "4", "5"],
    },
    {
        category: "Test 4",
        type: "multiple",
        difficulty: "easy",
        question: "easy easy easy easy easy easy easy easy?easy easy?",
        correctAns: "14",
        incorrectAns: ["3", "4", "5"],
    },
    {
        category: "Test 5",
        type: "multiple",
        difficulty: "easy",
        question: "easy easy easy easy easy easy?easy easy easy easy?",
        correctAns: "15",
        incorrectAns: ["3", "4", "5"],
    },
    {
        category: "Test 6",
        type: "multiple",
        difficulty: "easy",
        question: "easy easy easy easy easy?easy easy easy easy easy?easy easy easy easy easy?",
        correctAns: "6",
        incorrectAns: ["3", "4", "5"],
    },
    {
        category: "Test 7",
        type: "multiple",
        difficulty: "easy",
        question: "easy easy easy easy easy?easy easy easy easy easy?easy easy easy easy easy?easy easy easy easy easy?",
        correctAns: "7",
        incorrectAns: ["3", "4", "5"],
    },
    {
        category: "Test 8",
        type: "multiple",
        difficulty: "easy",
        question: "????easy easy easy easy easy?",
        correctAns: "8",
        incorrectAns: ["3", "4", "5"],
    },
    {
        category: "Test 9",
        type: "multiple",
        difficulty: "easy",
        question: "easy easy ???easy easy easy?",
        correctAns: "9",
        incorrectAns: ["3", "4", "5"],
    },
    {
        category: "Test 10",
        type: "multiple",
        difficulty: "easy",
        question: "easy easy easy easy easy?!!!",
        correctAns: "10",
        incorrectAns: ["3", "4", "5"],
    },
];

triviaData = triviaData.map((item) => {
    return {
        ...item,
        question: he.decode(item.question),
        correctAns: he.decode(item.correctAns),
        incorrectAns: item.incorrectAns.map(incorrectAns => he.decode(incorrectAns))
    };
})

export default triviaData;