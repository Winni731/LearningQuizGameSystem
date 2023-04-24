import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function attemptsNum(result) {
    return result.filter( r => r !== undefined).length;
}

export function earnPointsNum(result, answers, points) {
    return result.map((k, i) => answers[i] === k).filter( i => i).map(
        i => points //  points for each correct answer
    ).reduce((prev, curr) => prev + curr, 0)
}

export function flagResult(totalPoints, earnPoints) { // 50% is pass
    return (totalPoints * 50 / 100) < earnPoints;
}

export function CheckUser({children}) {
    const auth = useSelector(state => state.result.userId)
    const authPass = useSelector(state => state.result.password)
    return (auth && authPass) ? children : <Navigate to={'/'} replace={true}></Navigate>
}