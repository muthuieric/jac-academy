import { __jacJsx, __jacSpawn } from "@jac-client/utils";
import { Link } from "@jac-client/utils";
function Navigation() {
  return __jacJsx("nav", {
    "className": "bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50"
  }, [__jacJsx("div", {
    "className": "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }, [__jacJsx("div", {
    "className": "flex justify-between h-16 items-center"
  }, [__jacJsx("div", {
    "className": "flex items-center gap-3"
  }, [__jacJsx("div", {
    "className": "w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg"
  }, ["J"]), __jacJsx(Link, {
    "to": "/",
    "className": "text-xl font-bold tracking-tight hover:text-blue-400 transition-colors"
  }, ["Jac Academy"])]), __jacJsx("div", {
    "className": "flex items-center gap-6"
  }, [__jacJsx("div", {
    "className": "hidden md:flex text-sm text-gray-400 gap-4"
  }, [__jacJsx("span", {}, ["XP: 1,250"]), __jacJsx("span", {}, ["Streak: 4 Days"])]), __jacJsx("div", {
    "className": "h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border-2 border-white"
  }, [])])])])]);
}
export { Navigation };