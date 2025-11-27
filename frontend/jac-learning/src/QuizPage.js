import {__jacJsx, __jacSpawn} from "@jac-client/utils";
import { useState, useEffect } from "react";
import { Link, useParams } from "@jac-client/utils";
function QuizPage() {
  let params = useParams();
  let topic_id = params.id;
  let [questionData, setQuestionData] = useState(null);
  let [answer, setAnswer] = useState("");
  let [evaluation, setEvaluation] = useState(null);
  let [loading, setLoading] = useState(true);
  let [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    function mockFetchQuiz() {
      setLoading(true);
      setTimeout(() => {
        let qText = "Explain the primary purpose of a " + topic_id + " in the Jaseci architecture.";
        setQuestionData({"question": qText});
        setLoading(false);
      }, 800);
    }
    mockFetchQuiz();
  }, [topic_id]);
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      let score = answer.length > 10 ? 0.85 : 0.4;
      let feedback = score > 0.7 ? "Excellent explanation!" : "Too short. Please elaborate.";
      setEvaluation({"score": score, "feedback": feedback});
      setSubmitting(false);
    }, 1500);
  }
  if (loading) {
    return __jacJsx("div", {"className": "flex justify-center items-center h-64 text-gray-500 animate-pulse"}, ["Generating AI Quiz..."]);
  }
  if (evaluation) {
    let isPassing = evaluation.score > 0.7;
    let containerClass = "rounded-lg p-6 border-l-4 mb-6 ";
    containerClass += isPassing ? "bg-green-50 border-green-500" : "bg-orange-50 border-orange-500";
    let iconClass = "p-2 rounded-full mr-3 ";
    iconClass += isPassing ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600";
    let titleClass = "text-lg font-bold ";
    titleClass += isPassing ? "text-green-800" : "text-orange-800";
    let barColor = isPassing ? "bg-green-500" : "bg-orange-500";
    let iconSymbol = isPassing ? "\u2713" : "!";
    let titleText = isPassing ? "Great Job!" : "Keep Practicing";
    let scoreVal = evaluation.score * 100;
    let widthPct = func(scoreVal) + "%";
    let feedbackMsg = "\"" + evaluation.feedback + "\"";
    return __jacJsx("div", {"className": "max-w-2xl mx-auto p-6"}, [__jacJsx("div", {"className": containerClass}, [__jacJsx("div", {"className": "flex items-center mb-4"}, [__jacJsx("div", {"className": iconClass}, [iconSymbol]), __jacJsx("h3", {"className": titleClass}, [titleText])]), __jacJsx("div", {"className": "space-y-2 mb-6"}, [__jacJsx("div", {"className": "flex justify-between text-sm font-medium text-gray-600"}, [__jacJsx("span", {}, ["Accuracy Score"]), __jacJsx("span", {}, [widthPct])]), __jacJsx("div", {"className": "w-full bg-gray-200 rounded-full h-2.5"}, [__jacJsx("div", {"className": "h-2.5 rounded-full " + barColor, "style": {"width": widthPct}}, [])]), __jacJsx("p", {"className": "text-gray-700 mt-4 italic"}, [feedbackMsg])]), __jacJsx(Link, {"to": "/"}, [__jacJsx("button", {"className": "w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"}, ["Return to Dashboard"])])])]);
  }
  let btnClass = "w-full py-3 px-6 rounded-lg font-bold text-white shadow-md transition-all ";
  btnClass += submitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg";
  let btnText = submitting ? "Analyzing Answer..." : "Submit Answer";
  let headerTitle = topic_id + " Assessment";
  return __jacJsx("div", {"className": "max-w-2xl mx-auto p-6"}, [__jacJsx("div", {"className": "mb-8"}, [__jacJsx("span", {"className": "bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wide"}, ["Quiz Mode"]), __jacJsx("h1", {"className": "text-3xl font-bold text-gray-900 mt-2 capitalize"}, [headerTitle])]), __jacJsx("div", {"className": "bg-white rounded-xl shadow-lg border border-gray-100 p-8"}, [__jacJsx("p", {"className": "text-xl font-medium text-gray-800 mb-6"}, [questionData.question]), __jacJsx("form", {"onSubmit": handleSubmit, "className": "space-y-4"}, [__jacJsx("textarea", {"value": answer, "onChange": e => {
    setAnswer(e.target.value);
  }, "rows": 4, "className": "w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-gray-700 bg-gray-50", "placeholder": "Type your answer here...", "disabled": submitting}, []), __jacJsx("button", {"type": "submit", "disabled": submitting, "className": btnClass}, [btnText])])])]);
}
export { QuizPage };
