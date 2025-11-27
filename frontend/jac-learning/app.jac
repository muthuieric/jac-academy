# Use 'cl import' to ensure these are treated as client-side imports
cl import from react { useState, useEffect }
cl import from "@jac-client/utils" { Router, Routes, Route, Link, useParams }
cl import ".global.css";

cl {
    # 1. Navigation Component
    def Navigation() -> any {
        return <nav className="bg-slate-900 text-white p-4 shadow-md mb-6 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold tracking-tight hover:text-blue-400 transition-colors">
                Jaseci Learning
            </Link>
            <div className="text-sm text-gray-400">Frontend Demo</div>
        </nav>;
    }

    # 2. Dashboard Page
    def Dashboard() -> any {
        let [recommendedTopic, setRecommendedTopic] = useState(None);
        let [loading, setLoading] = useState(True);

        useEffect(lambda -> None {
            def mockFetch() -> None {
                setLoading(True);
                setTimeout(lambda -> None {
                    setRecommendedTopic({
                        "id": "nodes",
                        "title": "Nodes",
                        "content": "Nodes are the fundamental data units in a Jaseci graph."
                    });
                    setLoading(False);
                }, 1000);
            }
            mockFetch();
        }, []);

        if loading {
            return <div className="max-w-4xl mx-auto p-6">
                <div className="animate-pulse flex space-x-4">
                    <div className="h-12 bg-gray-200 rounded w-full"></div>
                </div>
            </div>;
        }

        if recommendedTopic {
            # Pre-construct the URL to avoid complex expressions in JSX
            let lessonUrl = "/lesson/" + recommendedTopic.id;

            return <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-4">Dashboard</h1>
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                    <h2 className="text-gray-500 uppercase text-sm font-semibold tracking-wider mb-2">Recommended for You</h2>
                    <p className="text-4xl font-bold text-blue-600 mb-6">{recommendedTopic.title}</p>
                    
                    <div className="bg-blue-50 p-4 rounded-lg mb-6 border-l-4 border-blue-500">
                        <p className="text-gray-700">Ready to master this concept? Start your interactive lesson now.</p>
                    </div>

                    <Link to={lessonUrl}>
                        <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md">
                            Start Lesson &rarr;
                        </button>
                    </Link>
                </div>
            </div>;
        }

        return <div className="max-w-4xl mx-auto p-6">
            <div className="text-center p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">No active recommendations.</p>
            </div>
        </div>;
    }

    # 3. Lesson Page
    def LessonPage() -> any {
        let params = useParams();
        let topic_id = params.id;
        
        # FIX: Construct strings here to avoid parser errors with mixed text/tags
        let introText = "This is the interactive content for " + topic_id + ".";
        let quizUrl = "/quiz/" + topic_id;
        let item1 = "Key concept 1 about " + topic_id;
        let item2 = "Key concept 2 about " + topic_id;

        return <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800 capitalize">Lesson: {topic_id}</h1>
                </div>
                
                <div className="p-8">
                    <div className="prose max-w-none text-gray-600 leading-relaxed mb-8">
                        <p className="text-lg font-medium">{introText}</p>
                        <p className="mt-4">In a real application, this content would be pulled dynamically from your Jaseci graph nodes.</p>
                        <ul className="list-disc pl-5 space-y-2 mt-4">
                            <li>{item1}</li>
                            <li>{item2}</li>
                            <li>Practical examples included</li>
                        </ul>
                    </div>

                    <div className="flex justify-end">
                        <Link to={quizUrl}>
                            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors flex items-center gap-2">
                                <span>Take Quiz</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>;
    }

    # 4. Quiz Page
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
            # Pre-calculate all dynamic values
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
            
            # FIX: Convert math to string outside JSX
            let scoreVal = evaluation.score * 100;
            let widthPct = str(scoreVal) + "%";
            
            # FIX: Format quotes outside JSX
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

        # Default View: Quiz Form
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

    # 5. Main App
    def app() -> any {
        return <Router>
            <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
                <Navigation />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/lesson/:id" element={<LessonPage />} />
                    <Route path="/quiz/:id" element={<QuizPage />} />
                </Routes>
            </div>
        </Router>;
    }
}