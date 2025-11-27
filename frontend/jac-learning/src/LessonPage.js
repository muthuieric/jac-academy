import {__jacJsx, __jacSpawn} from "@jac-client/utils";
import { Link, useParams } from "@jac-client/utils";
function LessonPage() {
  let params = useParams();
  let topic_id = params.id;
  let introText = "This is the interactive content for " + topic_id + ".";
  let quizUrl = "/quiz/" + topic_id;
  let item1 = "Key concept 1 about " + topic_id;
  let item2 = "Key concept 2 about " + topic_id;
  return __jacJsx("div", {"className": "max-w-3xl mx-auto p-6"}, [__jacJsx("div", {"className": "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"}, [__jacJsx("div", {"className": "bg-gray-50 px-8 py-6 border-b border-gray-200"}, [__jacJsx("h1", {"className": "text-2xl font-bold text-gray-800 capitalize"}, ["Lesson: ", topic_id])]), __jacJsx("div", {"className": "p-8"}, [__jacJsx("div", {"className": "prose max-w-none text-gray-600 leading-relaxed mb-8"}, [__jacJsx("p", {"className": "text-lg font-medium"}, [introText]), __jacJsx("p", {"className": "mt-4"}, ["In a real application, this content would be pulled dynamically from your Jaseci graph nodes."]), __jacJsx("ul", {"className": "list-disc pl-5 space-y-2 mt-4"}, [__jacJsx("li", {}, [item1]), __jacJsx("li", {}, [item2]), __jacJsx("li", {}, ["Practical examples included"])])]), __jacJsx("div", {"className": "flex justify-end"}, [__jacJsx(Link, {"to": quizUrl}, [__jacJsx("button", {"className": "bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors flex items-center gap-2"}, [__jacJsx("span", {}, ["Take Quiz"])])])])])])]);
}
export { LessonPage };
