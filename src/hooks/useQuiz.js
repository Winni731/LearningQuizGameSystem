import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, deleteDoc, setDoc } from "@firebase/firestore";


function useQuiz(quizID) {
    const [quizState, setQuizState] = useState({
        status: "loading",
        snapshot: null,
        error: null,
    });   


    useEffect(() => {
        async function getDocument() {
            setQuizState({status: "loading", snapshot: null, error: null});
            try {
                const docRef = doc(db, "quizzes", quizID)
                const snapshot = await getDoc(docRef)
                setQuizState({status: "sucess", snapshot, error: null});
            }
            catch (error) {
                console.log(error)
                setQuizState({status: "error", snapshot: null, error});
            }
        }
        getDocument();
    }, [quizID]);

    console.log(quizState)

    const {status, snapshot, error} = quizState;

    let id;
    let isExist;
    let data;

    if (snapshot) {
        id = snapshot.id;
        isExist = snapshot.exists;
        data = snapshot.data();
        // console.log(id)
        // console.log(isExist)
        // console.log(data);
    }

    const setQuiz = async (newQuizData) => {
        setQuizState((prev) => ({ ...prev, status: "updating", error: null}));
        try {
            const docRef = doc(db, "quizzes", quizID)
            await setDoc(docRef, newQuizData, { merge: true });
            setQuizState((prev) => ({ ...prev, status: "success", error: null}))
        }
        catch (error) {
            console.error(error);
            setQuizState((prev) => ({ ...prev, status: "error", error }))
        }
    }

    const deleteQuiz = async () => {
        setQuizState((prev) => ({...prev, status: "deleting", error: null}))
        console.log("deleteing!")
        try {
            // await db.collection("quizzes").doc(quizID).delete()
            // setQuizState({status: "deleted", snapshot: null, error: null})
            const docRef = doc(db, "quizzes", quizID);
            await deleteDoc(docRef)
            console.log("deleted")
            setQuizState({status: "deleted", snapshot: null, error: null})

        }
        catch(error) {
            console.error(error)
            setQuizState((prev) => ({...prev, status: "error", error}))
        }
    }

    return {
        id,
        isExist,
        data,
        status,
        error,
        set: setQuiz,
        delete: deleteQuiz,
    };
}

export default useQuiz;