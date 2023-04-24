import Login from "./Login";
import Register from "./Register"
// import { Main } from "./pages/Main";
import Profile from "./Profile";
import Home from "./Home"
import Dashboard from "./Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import  { UserFieldsProvider } from "../context/UserFieldsContext";
import QuizPage from "./playQuiz/QuizPage";
import EditQuizPage from "../components/editQuiz/EditQuizPage";
import Bookmark from "./bookmark";
import History from "./history";
import OwnedQuiz from "./ownedQuiz";
import Timer from "./Timer";
import Comments from "./comments";


function App() {
    const { currentUser } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/" />;
        }

        return children;
    };

    return (
        <UserFieldsProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route
                            path="user/dashboard/playQuiz/:id"
                            element={
                                <ProtectedRoute>
                                    <QuizPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="user/dashboard/bookmark/playQuiz/:id"
                            element={
                                <ProtectedRoute>
                                    <QuizPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="user/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="user/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="user/dashboard/edit-quiz/:id"
                            element={
                                <ProtectedRoute>
                                    <EditQuizPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="user/dashboard/bookmark"
                            element={
                                <ProtectedRoute>
                                    <Bookmark />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="user/dashboard/comments/:id"
                            element={
                                <ProtectedRoute>
                                    <Comments />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="user/ownedquiz"
                            element={
                                <ProtectedRoute>
                                    <OwnedQuiz />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="user/ownedquiz/edit-quiz/:id"
                            element={
                                <ProtectedRoute>
                                    <EditQuizPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="user/ownedquiz/playQuiz/:id"
                            element={
                                <ProtectedRoute>
                                    <QuizPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="user/dashboard/history"
                            element={
                                <ProtectedRoute>
                                    <History />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="Login" element={<Login />} />
                        <Route path="Register" element={<Register />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </UserFieldsProvider>
    );
}

export default App;
