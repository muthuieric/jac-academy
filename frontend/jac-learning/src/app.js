import {__jacJsx, __jacSpawn} from "@jac-client/utils";
import { Router, Routes, Route } from "@jac-client/utils";
import "./global.css";
import { Navigation } from "./Navigation.js";
import { Dashboard } from "./Dashboard.js";
import { LessonPage } from "./LessonPage.js";
import { QuizPage } from "./QuizPage.js";
function app() {
  return __jacJsx(Router, {}, [__jacJsx("div", {"className": "min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100"}, [__jacJsx(Navigation, {}, []), __jacJsx(Routes, {}, [__jacJsx(Route, {"path": "/", "element": __jacJsx(Dashboard, {}, [])}, []), __jacJsx(Route, {"path": "/lesson/:id", "element": __jacJsx(LessonPage, {}, [])}, []), __jacJsx(Route, {"path": "/quiz/:id", "element": __jacJsx(QuizPage, {}, [])}, [])])])]);
}
export { app };
