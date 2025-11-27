function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import { __jacJsx, __jacSpawn } from "@jac-client/utils";
import { useState, useEffect } from "react";
import { Link, useParams } from "@jac-client/utils";
function QuizPage() {
  var params = useParams();
  var topic_id = params.id;
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    questionData = _useState2[0],
    setQuestionData = _useState2[1];
  var _useState3 = useState(""),
    _useState4 = _slicedToArray(_useState3, 2),
    answer = _useState4[0],
    setAnswer = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    evaluation = _useState6[0],
    setEvaluation = _useState6[1];
  var _useState7 = useState(true),
    _useState8 = _slicedToArray(_useState7, 2),
    loading = _useState8[0],
    setLoading = _useState8[1];
  var _useState9 = useState(false),
    _useState0 = _slicedToArray(_useState9, 2),
    submitting = _useState0[0],
    setSubmitting = _useState0[1];
  useEffect(function () {
    function mockFetchQuiz() {
      setLoading(true);
      setTimeout(function () {
        var qText = "Explain the primary purpose of a " + topic_id + " in the Jaseci architecture.";
        setQuestionData({
          "question": qText
        });
        setLoading(false);
      }, 800);
    }
    mockFetchQuiz();
  }, [topic_id]);
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(function () {
      var score = answer.length > 10 ? 0.85 : 0.4;
      var feedback = score > 0.7 ? "Excellent explanation!" : "Too short. Please elaborate.";
      setEvaluation({
        "score": score,
        "feedback": feedback
      });
      setSubmitting(false);
    }, 1500);
  }
  if (loading) {
    return __jacJsx("div", {
      "className": "flex justify-center items-center h-64 text-gray-500 animate-pulse"
    }, ["Generating AI Quiz..."]);
  }
  if (evaluation) {
    var isPassing = evaluation.score > 0.7;
    var containerClass = "rounded-lg p-6 border-l-4 mb-6 ";
    containerClass += isPassing ? "bg-green-50 border-green-500" : "bg-orange-50 border-orange-500";
    var iconClass = "p-2 rounded-full mr-3 ";
    iconClass += isPassing ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600";
    var titleClass = "text-lg font-bold ";
    titleClass += isPassing ? "text-green-800" : "text-orange-800";
    var barColor = isPassing ? "bg-green-500" : "bg-orange-500";
    var iconSymbol = isPassing ? "\u2713" : "!";
    var titleText = isPassing ? "Great Job!" : "Keep Practicing";
    var scoreVal = evaluation.score * 100;
    var widthPct = func(scoreVal) + "%";
    var feedbackMsg = "\"" + evaluation.feedback + "\"";
    return __jacJsx("div", {
      "className": "max-w-2xl mx-auto p-6"
    }, [__jacJsx("div", {
      "className": containerClass
    }, [__jacJsx("div", {
      "className": "flex items-center mb-4"
    }, [__jacJsx("div", {
      "className": iconClass
    }, [iconSymbol]), __jacJsx("h3", {
      "className": titleClass
    }, [titleText])]), __jacJsx("div", {
      "className": "space-y-2 mb-6"
    }, [__jacJsx("div", {
      "className": "flex justify-between text-sm font-medium text-gray-600"
    }, [__jacJsx("span", {}, ["Accuracy Score"]), __jacJsx("span", {}, [widthPct])]), __jacJsx("div", {
      "className": "w-full bg-gray-200 rounded-full h-2.5"
    }, [__jacJsx("div", {
      "className": "h-2.5 rounded-full " + barColor,
      "style": {
        "width": widthPct
      }
    }, [])]), __jacJsx("p", {
      "className": "text-gray-700 mt-4 italic"
    }, [feedbackMsg])]), __jacJsx(Link, {
      "to": "/"
    }, [__jacJsx("button", {
      "className": "w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
    }, ["Return to Dashboard"])])])]);
  }
  var btnClass = "w-full py-3 px-6 rounded-lg font-bold text-white shadow-md transition-all ";
  btnClass += submitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg";
  var btnText = submitting ? "Analyzing Answer..." : "Submit Answer";
  var headerTitle = topic_id + " Assessment";
  return __jacJsx("div", {
    "className": "max-w-2xl mx-auto p-6"
  }, [__jacJsx("div", {
    "className": "mb-8"
  }, [__jacJsx("span", {
    "className": "bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wide"
  }, ["Quiz Mode"]), __jacJsx("h1", {
    "className": "text-3xl font-bold text-gray-900 mt-2 capitalize"
  }, [headerTitle])]), __jacJsx("div", {
    "className": "bg-white rounded-xl shadow-lg border border-gray-100 p-8"
  }, [__jacJsx("p", {
    "className": "text-xl font-medium text-gray-800 mb-6"
  }, [questionData.question]), __jacJsx("form", {
    "onSubmit": handleSubmit,
    "className": "space-y-4"
  }, [__jacJsx("textarea", {
    "value": answer,
    "onChange": function onChange(e) {
      setAnswer(e.target.value);
    },
    "rows": 4,
    "className": "w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-gray-700 bg-gray-50",
    "placeholder": "Type your answer here...",
    "disabled": submitting
  }, []), __jacJsx("button", {
    "type": "submit",
    "disabled": submitting,
    "className": btnClass
  }, [btnText])])])]);
}
export { QuizPage };