import { useState } from "react";
import { Box, Card, Button, CardContent, TextField, Typography,
         InputLabel, FormControl, Select, MenuItem } from "@mui/material";

function QuizForm({ initialData = {}, onSave, onDelete }) {
    const [formValues, setFormValues] = useState({
        title: initialData.title ?? "",
        field: initialData.field ?? "",
        grade: initialData.grade ?? "",
        description: initialData.description ?? "",
        difficulty: initialData.difficulty ?? "easy",
        questions: initialData.questions ?? [{
            question: "",
            correctAns: "",
            incorrectAns: [
                "",
                "",
                "",
            ]
        }
        ],
    })

    console.log("SSSSSSSS: "+formValues.questions[0].incorrectAns.incorrectAns1)

    const onSubmit = (e) => {
        e.preventDefault();
        onSave(formValues)
    };

    const onTitleChange = (e) => {
        setFormValues((prev) => {
            return { ...prev, title: e.target.value};
        })        
    }

    const onFieldChange = (e) => {
        setFormValues((prev) => {
            return { ...prev, field: e.target.value};
        })        
    }

    const onGradeChange = (e) => {
        setFormValues((prev) => {
            return { ...prev, grade: e.target.value};
        })        
    }

    const onDescriptionChange = (e) => {
        setFormValues((prev) => {
            return { ...prev, description: e.target.value};
        })        
    }

    const onDifficultyChange = (e) => {
        setFormValues((prev) => {
            return { ...prev, difficulty: e.target.value};
        })        
    }

    const onAddQuestions = () => {
        setFormValues((prev) => {
            return { ...prev, questions: [...prev.questions, {
                correctAns: "",
                incorrectAns: [
                    "",
                    "",
                    "",
                ],
                question: "",
            }]};
        })
    }

    // const onQuestionsChange = (e) => {
    //     setFormValues((prev) => {
    //         return { ...prev, questions: [...prev.questions, {
    //             correctAns: '',
    //             incorrectAns: {
    //                 0: '',
    //                 1: '',
    //                 2: '',
    //             },
    //             question: '',
    //         }]};
    //     })
    // }
    const onQuestionChange = (e, i) => {
        // setFormValues((prev) => {
        //             return { ...prev, questions: [...prev.questions, {
        //                 ...prev.questions,
        //                 question: e.target.value,
        //             }]};
        //         })
        let newForm = {...formValues};
        newForm.questions[i].question = e.target.value;
        setFormValues(newForm)
    }

    const onCorrectAnsChange = (e, i) => {
        // setFormValues((prev) => {
        //             return { ...prev, questions: [...prev.questions, {
        //                 ...prev.questions[i],
        //                 correctAns: e.target.value,
        //             }]};
        //         })
        let newForm = {...formValues};
        newForm.questions[i].correctAns = e.target.value;
        setFormValues(newForm)
    }

    const onInCorrectAns1Change = (e, i) => {
        // setFormValues((prev) => {
        //             return { ...prev, questions: [...prev.questions, {
        //                 ...prev.questions.question,
        //                 incorrectAns: {
        //                     ...prev.questions.question.incorrectAns,
        //                     incorrectAns1: e.target.value,
        //                 }
        //             }]};
        //         })
        let newForm = {...formValues};
        newForm.questions[i].incorrectAns[0] = e.target.value;
        setFormValues(newForm)
    }

    const onInCorrectAns2Change = (e, i) => {
        // setFormValues((prev) => {
        //             return { ...prev, questions: [...prev.questions, {
        //                 ...prev.questions.question,
        //                 incorrectAns: {
        //                     ...prev.questions.question.incorrectAns,
        //                     incorrectAns2: e.target.value,
        //                 }
        //             }]};
        //         })
        let newForm = {...formValues};
        newForm.questions[i].incorrectAns[1] = e.target.value;
        setFormValues(newForm)
    }

    const onInCorrectAns3Change = (e, i) => {
        // setFormValues((prev) => {
        //             return { ...prev, questions: [...prev.questions, {
        //                 ...prev.questions.question,
        //                 incorrectAns: {
        //                     ...prev.questions.question.incorrectAns,
        //                     incorrectAns3: e.target.value,
        //                 }
        //             }]};
        //         })
        let newForm = {...formValues};
        newForm.questions[i].incorrectAns[2] = e.target.value;
        setFormValues(newForm)
    }

    return (    
        <Card
        variant="outlined"
        sx={{ positon: "absolute", maxWidth: 800, ml: "auto", mr: "auto", mt: "6vh",}}
    >
        <CardContent>
            <Box sx={{ m: 5 }}>
                <Typography variant="h5" textAlign="center">
                    Edit Quiz Form
                </Typography>
                {/* <Typography variant="h6" textAlign="center">
                    Edit Quiz Form
                </Typography> */}
            </Box>
            <Box sx={{ m: 5, gap: 3, display: "flex", flexDirection: "column" }}>
                <TextField
                    type="text"
                    fullWidth
                    label="Title"
                    name="title"
                    value={formValues.title}
                    onChange={onTitleChange}
                ></TextField>
                <TextField
                    type="text"
                    fullWidth
                    label="Field"
                    name="field"
                    value={formValues.field}
                    onChange={onFieldChange}
                ></TextField>
                <TextField
                    type="text"
                    fullWidth
                    label="Grade"
                    name="grade"
                    value={formValues.grade}
                    onChange={onGradeChange}
                ></TextField>
                <TextField
                    type="text"
                    fullWidth
                    label="Description"
                    name="description"
                    value={formValues.description}
                    onChange={onDescriptionChange}
                ></TextField>
                {/* <TextField
                    type="text"
                    fullWidth
                    label="Difficulty"
                    name="difficulty"
                    value={formValues.difficulty}
                    onChange={onDifficultyChange}
                ></TextField> */}
                        <FormControl fullWidth>
        <InputLabel id="difficulty-select">Difficulty</InputLabel>
        <Select
          labelId="difficulty-select"
          id="difficulty-select"
          value={formValues.difficulty}
          label="Difficulty"
          onChange={onDifficultyChange}
        >
          <MenuItem value={"easy"}>Easy</MenuItem>
          <MenuItem value={"medium"}>Medium</MenuItem>
          <MenuItem value={"hard"}>Hard</MenuItem>
        </Select>
      </FormControl>
                {/* <TextField
                    type="password"
                    fullWidth
                    label="Confirm"
                    name="confirm"
                    onChange={handleInput}
                ></TextField> */}
                {/* {error && (
                    <Typography color="error" variant="body1">
                        {errorMessage}
                    </Typography>
                )} */}
            </Box>
            <Box sx={{ m: 5, gap: 3, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" textAlign="left">
                    Questions
                </Typography>
                {
                    formValues.questions.map((item, i) => (
                        <Box key={i} sx={{ m: 5, gap: 3, display: "flex", flexDirection: "column" }}>
                        <TextField
                        type="text"
                        fullWidth
                        label="Question"
                        name="question"
                        value={item.question}
                        onChange={(e) => onQuestionChange(e, i)}
                        ></TextField>
                        <TextField
                        type="text"
                        fullWidth
                        label="Correct Answer"
                        name="correctAns"
                        value={item.correctAns}
                        onChange={(e) => onCorrectAnsChange(e, i)}
                        ></TextField>
                        <TextField
                        type="text"
                        fullWidth
                        label="Incorrect Answer 1"
                        name="incorrectAns1"
                        value={item.incorrectAns[0]}
                        onChange={(e) => onInCorrectAns1Change(e, i)}
                        ></TextField>
                        <TextField
                        type="text"
                        fullWidth
                        label="Incorrect Answer 2"
                        name="incorrectAns2"
                        value={item.incorrectAns[1]}
                        onChange={(e) => onInCorrectAns2Change(e, i)}
                        ></TextField>
                        <TextField
                        type="text"
                        fullWidth
                        label="Incorrect Answer 3"
                        name="incorrectAns3"
                        value={item.incorrectAns[2]}
                        onChange={(e) => onInCorrectAns3Change(e, i)}
                        ></TextField>
                     </Box>
                    ))
                }
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", ml: 5, mr: 5 }}>
                <Button
                    variant="contained"
                    // disabled={!(email.length > 5 && password.length > 6)}
                    onClick={onDelete}
                >
                    Delete Quiz
                </Button>
                <Button variant="text" onClick={onSubmit}>
                    Save Quiz
                </Button>
                <Button variant="text" onClick={onAddQuestions}>
                    Add Question
                </Button>
            </Box>
        </CardContent>
    </Card>
    )
}

export default QuizForm;