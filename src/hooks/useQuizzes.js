import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db }  from "../firebase";

function useQuizzes() {

    const [quizzes, setQuizzes] = useState({
        status: "loading",
        snapshot: null,
        error: null
    })

    useEffect(() => {
        async function getCollection() {
            setQuizzes({status: "loading", snapshot: null, error: null});
            try {
                const snapshot = await getDocs(collection(db, "quizzes"));
                setQuizzes({status: "success", snapshot, error: null});
            }
            catch (error) {
                console.log(error)
                setQuizzes({status: "error", snapshot: null, error: error});
            }
        }
        getCollection();
    }, [])

    const { status, snapshot, error } = quizzes;

    let results = [];
    
    if (snapshot) {
        results = snapshot.docs.map((docSnapshot) => {
            return {
                id: docSnapshot.id,
                data: docSnapshot.data()
            }
        })
    }

    return {
        status,
        error,
        results,
        isEmpty: results.length === 0,
    };
}

export default useQuizzes;