import {__jacJsx, __jacSpawn} from "@jac-client/utils";
import { useState, useEffect } from "react";
import { Router, Routes, Route, Link, useParams } from "@jac-client/utils";
import "./global.css";
function Navigation() {
  return __jacJsx("nav", {"className": "bg-slate-900 text-white p-4 shadow-md mb-6 flex justify-between items-center"}, [__jacJsx(Link, {"to": "/", "className": "text-xl font-bold tracking-tight hover:text-blue-400 transition-colors"}, ["Jaseci Learning"]), __jacJsx("div", {"className": "text-sm text-gray-400"}, ["Frontend Demo"])]);
}
function Dashboard() {
  let [recommendedTopic, setRecommendedTopic] = useState(null);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    function mockFetch() {
      setLoading(true);
      setTimeout(() => {
        setRecommendedTopic({"id": "nodes", "title": "Nodes", "content": "Nodes are the fundamental data units in a Jaseci graph."});
        setLoading(false);
      }, 1000);
    }
    mockFetch();
  }, []);
  if (loading) {
    return __jacJsx("div", {"className": "max-w-4xl mx-auto p-6"}, [__jacJsx("div", {"className": "animate-pulse flex space-x-4"}, [__jacJsx("div", {"className": "h-12 bg-gray-200 rounded w-full"}, [])])]);
  }
  if (recommendedTopic) {
    let lessonUrl = "/lesson/" + recommendedTopic.id;
    return __jacJsx("div", {"className": "max-w-4xl mx-auto p-6"}, [__jacJsx("h1", {"className": "text-3xl font-extrabold text-gray-800 mb-6 border-b pb-4"}, ["Dashboard"]), __jacJsx("div", {"className": "bg-white rounded-xl shadow-lg border border-gray-100 p-8"}, [__jacJsx("h2", {"className": "text-gray-500 uppercase text-sm font-semibold tracking-wider mb-2"}, ["Recommended for You"]), __jacJsx("p", {"className": "text-4xl font-bold text-blue-600 mb-6"}, [recommendedTopic.title]), __jacJsx("div", {"className": "bg-blue-50 p-4 rounded-lg mb-6 border-l-4 border-blue-500"}, [__jacJsx("p", {"className": "text-gray-700"}, ["Ready to master this concept? Start your interactive lesson now."])]), __jacJsx(Link, {"to": lessonUrl}, [__jacJsx("button", {"className": "w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"}, ["Start Lesson &rarr;"])])])]);
  }
  return __jacJsx("div", {"className": "max-w-4xl mx-auto p-6"}, [__jacJsx("div", {"className": "text-center p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300"}, [__jacJsx("p", {"className": "text-gray-500 text-lg"}, ["No active recommendations."])])]);
}
function LessonPage() {
  let params = useParams();
  let topic_id = params.id;
  let introText = "This is the interactive content for " + topic_id + ".";
  let quizUrl = "/quiz/" + topic_id;
  let item1 = "Key concept 1 about " + topic_id;
  let item2 = "Key concept 2 about " + topic_id;
  return __jacJsx("div", {"className": "max-w-3xl mx-auto p-6"}, [__jacJsx("div", {"className": "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"}, [__jacJsx("div", {"className": "bg-gray-50 px-8 py-6 border-b border-gray-200"}, [__jacJsx("h1", {"className": "text-2xl font-bold text-gray-800 capitalize"}, ["Lesson: ", topic_id])]), __jacJsx("div", {"className": "p-8"}, [__jacJsx("div", {"className": "prose max-w-none text-gray-600 leading-relaxed mb-8"}, [__jacJsx("p", {"className": "text-lg font-medium"}, [introText]), __jacJsx("p", {"className": "mt-4"}, ["In a real application, this content would be pulled dynamically from your Jaseci graph nodes."]), __jacJsx("ul", {"className": "list-disc pl-5 space-y-2 mt-4"}, [__jacJsx("li", {}, [item1]), __jacJsx("li", {}, [item2]), __jacJsx("li", {}, ["Practical examples included"])])]), __jacJsx("div", {"className": "flex justify-end"}, [__jacJsx(Link, {"to": quizUrl}, [__jacJsx("button", {"className": "bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors flex items-center gap-2"}, [__jacJsx("span", {}, ["Take Quiz"])])])])])])]);
}
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
function app() {
  return __jacJsx(Router, {}, [__jacJsx("div", {"className": "min-h-screen bg-gray-50 font-sans text-gray-900"}, [__jacJsx(Navigation, {}, []), __jacJsx(Routes, {}, [__jacJsx(Route, {"path": "/", "element": __jacJsx(Dashboard, {}, [])}, []), __jacJsx(Route, {"path": "/lesson/:id", "element": __jacJsx(LessonPage, {}, [])}, []), __jacJsx(Route, {"path": "/quiz/:id", "element": __jacJsx(QuizPage, {}, [])}, [])])])]);
}
export { Dashboard, LessonPage, Navigation, QuizPage, app };
