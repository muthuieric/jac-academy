# QuizPage.jac
cl import from react { useState, useEffect }
cl import from "@jac-client/utils" { Link, useParams }

cl {
    def QuizPage() -> any {
        let params = useParams();
        let topic_id = params.id;
        let [questionData, setQuestionData] = useState(None);
        let [answer, setAnswer] = useState("");
        let [evaluation, setEvaluation] = useState(None);
        let [loading, setLoading] = useState(True);
        let [submitting, setSubmitting] = useState(False);

        useEffect(lambda -> None {
            def mockFetchQuiz() -> None {
                setLoading(True);
                setTimeout(lambda -> None {
                    let qText = "Explain the primary purpose of a " + topic_id + " in the Jaseci architecture.";
                    setQuestionData({ "question": qText });
                    setLoading(False);
                }, 800);
            }
            mockFetchQuiz();
        }, [topic_id]);

        def handleSubmit(e: any) -> None {
            e.preventDefault();
            setSubmitting(True);
            
            setTimeout(lambda -> None {
                score = 0.85 if answer.length > 10 else 0.4;
                feedback = "Excellent explanation!" if score > 0.7 else "Too short. Please elaborate.";
                
                setEvaluation({
                    "score": score,
                    "feedback": feedback
                });
                setSubmitting(False);
            }, 1500);
        }

        if loading { 
            return <div className="flex justify-center items-center h-64 text-gray-500 animate-pulse">Generating AI Quiz...</div>; 
        }

        if evaluation {
            let isPassing = evaluation.score > 0.7;
            
            let containerClass = "rounded-lg p-6 border-l-4 mb-6 ";
            containerClass += "bg-green-50 border-green-500" if isPassing else "bg-orange-50 border-orange-500";
            
            let iconClass = "p-2 rounded-full mr-3 ";
            iconClass += "bg-green-100 text-green-600" if isPassing else "bg-orange-100 text-orange-600";
            
            let titleClass = "text-lg font-bold ";
            titleClass += "text-green-800" if isPassing else "text-orange-800";
            
            let barColor = "bg-green-500" if isPassing else "bg-orange-500";
            let iconSymbol = "✓" if isPassing else "!";
            let titleText = "Great Job!" if isPassing else "Keep Practicing";
            
            let scoreVal = evaluation.score * 100;
            let widthPct = str(scoreVal) + "%";
            
            let feedbackMsg = '"' + evaluation.feedback + '"';

            return <div className="max-w-2xl mx-auto p-6">
                <div className={containerClass}>
                    <div className="flex items-center mb-4">
                        <div className={iconClass}>{iconSymbol}</div>
                        <h3 className={titleClass}>{titleText}</h3>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm font-medium text-gray-600">
                            <span>Accuracy Score</span>
                            <span>{widthPct}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className={"h-2.5 rounded-full " + barColor} style={{"width": widthPct}}></div>
                        </div>
                        <p className="text-gray-700 mt-4 italic">{feedbackMsg}</p>
                    </div>

                    <Link to="/">
                        <button className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                            Return to Dashboard
                        </button>
                    </Link>
                </div>
            </div>;
        }

        let btnClass = "w-full py-3 px-6 rounded-lg font-bold text-white shadow-md transition-all ";
        btnClass += "bg-gray-400 cursor-not-allowed" if submitting else "bg-blue-600 hover:bg-blue-700 hover:shadow-lg";
        let btnText = "Analyzing Answer..." if submitting else "Submit Answer";
        let headerTitle = topic_id + " Assessment";

        return <div className="max-w-2xl mx-auto p-6">
            <div className="mb-8">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wide">Quiz Mode</span>
                <h1 className="text-3xl font-bold text-gray-900 mt-2 capitalize">{headerTitle}</h1>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                <p className="text-xl font-medium text-gray-800 mb-6">{questionData.question}</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        value={answer}
                        onChange={lambda e: any -> None { setAnswer(e.target.value); }}
                        rows={4}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-gray-700 bg-gray-50"
                        placeholder="Type your answer here..."
                        disabled={submitting}
                    />
                    <button type="submit" disabled={submitting} className={btnClass}>
                        {btnText}
                    </button>
                </form>
            </div>
        </div>;
    }
}