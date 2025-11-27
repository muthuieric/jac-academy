import {__jacJsx, __jacSpawn} from "@jac-client/utils";
import { useState, useEffect } from "react";
import { Link } from "@jac-client/utils";
function Dashboard() {
  let [loading, setLoading] = useState(true);
  let [userGraph, setUserGraph] = useState(null);
  useEffect(() => {
    function fetchOSPGraph() {
      setLoading(true);
      setTimeout(() => {
        setUserGraph({"user_level": "Novice Architect", "total_mastery": 35, "nodes": [{"id": "jac_basics", "label": "Jac Basics", "status": "mastered", "score": 100, "pos": "col-start-1"}, {"id": "walkers", "label": "Walkers & Nodes", "status": "mastered", "score": 90, "pos": "col-start-2"}, {"id": "osp", "label": "OSP Concepts", "status": "active", "score": 45, "pos": "col-start-3"}, {"id": "byllm", "label": "byLLM Agents", "status": "locked", "score": 0, "pos": "col-start-4"}], "current_recommendation": {"id": "osp", "title": "Object Spatial Programming", "desc": "Learn how to navigate graphs using Walkers."}});
        setLoading(false);
      }, 1000);
    }
    fetchOSPGraph();
  }, []);
  if (loading) {
    return __jacJsx("div", {"className": "min-h-screen bg-slate-50 p-8 flex justify-center pt-20"}, [__jacJsx("div", {"className": "text-center"}, [__jacJsx("div", {"className": "w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"}, []), __jacJsx("p", {"className": "text-slate-500 font-medium"}, ["Loading your Knowledge Graph..."])])]);
  }
  if (userGraph) {
    let rec = userGraph.current_recommendation;
    let lessonUrl = "/lesson/" + rec.id;
    return __jacJsx("div", {"className": "min-h-screen bg-slate-50 pb-20"}, [__jacJsx("div", {"className": "bg-white border-b border-slate-200 p-8"}, [__jacJsx("div", {"className": "max-w-5xl mx-auto"}, [__jacJsx("div", {"className": "flex flex-col md:flex-row justify-between items-start md:items-center gap-4"}, [__jacJsx("div", {}, [__jacJsx("h1", {"className": "text-3xl font-bold text-slate-900"}, ["Welcome back, Architect."]), __jacJsx("p", {"className": "text-slate-500 mt-1"}, ["Current Rank: ", __jacJsx("span", {"className": "text-blue-600 font-semibold"}, [userGraph.user_level])])]), __jacJsx(Link, {"to": lessonUrl}, [__jacJsx("button", {"className": "bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all hover:scale-105 flex items-center gap-2"}, [__jacJsx("span", {}, ["Continue: ", rec.title]), __jacJsx("span", {}, ["→"])])])])])]), __jacJsx("div", {"className": "max-w-5xl mx-auto mt-12 px-6"}, [__jacJsx("div", {"className": "mb-8"}, [__jacJsx("h2", {"className": "text-xl font-bold text-slate-800 mb-6 flex items-center gap-2"}, [__jacJsx("span", {}, ["Skill Graph (OSP Visualization)"])]), __jacJsx("div", {"className": "relative bg-white rounded-2xl p-10 shadow-sm border border-slate-200 overflow-hidden"}, [__jacJsx("div", {"className": "absolute top-1/2 left-10 right-10 h-1 bg-slate-100 -z-0"}, []), __jacJsx("div", {"className": "absolute top-1/2 left-10 h-1 bg-blue-500 -z-0 transition-all duration-1000", "style": {"width": "50%"}}, []), __jacJsx("div", {"className": "grid grid-cols-4 gap-4 relative z-10"}, [userGraph.nodes.map(node => {
      let isMastered = node.status === "mastered";
      let isActive = node.status === "active";
      let circleClass = "w-16 h-16 rounded-full flex items-center justify-center border-4 font-bold text-xl transition-all duration-300 ";
      circleClass += isMastered ? "bg-white border-green-500 text-green-600 shadow-green-100" : "";
      circleClass += isActive ? "bg-blue-600 border-blue-200 text-white scale-110 shadow-xl shadow-blue-200 ring-4 ring-blue-50" : "";
      circleClass += node.status === "locked" ? "bg-slate-100 border-slate-200 text-slate-400" : "";
      let labelClass = "mt-4 text-sm font-medium ";
      labelClass += isActive ? "text-blue-700" : "text-slate-500";
      return __jacJsx("div", {"key": node.id, "className": "flex flex-col items-center"}, [__jacJsx("div", {"className": circleClass}, [isMastered ? "\u2713" : isActive ? node.score : "\ud83d\udd12"]), __jacJsx("span", {"className": labelClass}, [node.label]), isActive && __jacJsx("span", {"className": "mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"}, ["Current"])]);
    })])])]), __jacJsx("div", {"className": "grid grid-cols-1 md:grid-cols-3 gap-6"}, [__jacJsx("div", {"className": "bg-white p-6 rounded-xl border border-slate-200 shadow-sm"}, [__jacJsx("div", {"className": "text-slate-400 text-xs font-bold uppercase tracking-wider mb-2"}, ["Total Mastery"]), __jacJsx("div", {"className": "text-3xl font-bold text-slate-800"}, [userGraph.total_mastery, "%"]), __jacJsx("div", {"className": "w-full bg-slate-100 rounded-full h-2 mt-4"}, [__jacJsx("div", {"className": "bg-green-500 h-2 rounded-full", "style": {"width": "35%"}}, [])])]), __jacJsx("div", {"className": "bg-white p-6 rounded-xl border border-slate-200 shadow-sm"}, [__jacJsx("div", {"className": "text-slate-400 text-xs font-bold uppercase tracking-wider mb-2"}, ["Walkers Deployed"]), __jacJsx("div", {"className": "text-3xl font-bold text-slate-800"}, ["12"])]), __jacJsx("div", {"className": "bg-white p-6 rounded-xl border border-slate-200 shadow-sm"}, [__jacJsx("div", {"className": "text-slate-400 text-xs font-bold uppercase tracking-wider mb-2"}, ["byLLM Interactions"]), __jacJsx("div", {"className": "text-3xl font-bold text-slate-800"}, ["48"])])])])]);
  }
  return __jacJsx("div", {}, ["Error loading graph."]);
}
export { Dashboard };
