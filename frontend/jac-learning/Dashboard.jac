cl import from react { useState, useEffect }
cl import from "@jac-client/utils" { Link }

cl {
    def Dashboard() -> any {
        let [loading, setLoading] = useState(True);
        let [userGraph, setUserGraph] = useState(None);

        # Simulate fetching the OSP Graph data from a backend Walker
        useEffect(lambda -> None {
            def fetchOSPGraph() -> None {
                setLoading(True);
                # Mocking a response
                setTimeout(lambda -> None {
                    setUserGraph({
                        "user_level": "Novice Architect",
                        "total_mastery": 35,
                        "nodes": [
                            {"id": "jac_basics", "label": "Jac Basics", "status": "mastered", "score": 100, "pos": "col-start-1"},
                            {"id": "walkers", "label": "Walkers & Nodes", "status": "mastered", "score": 90, "pos": "col-start-2"},
                            {"id": "osp", "label": "OSP Concepts", "status": "active", "score": 45, "pos": "col-start-3"},
                            {"id": "byllm", "label": "byLLM Agents", "status": "locked", "score": 0, "pos": "col-start-4"}
                        ],
                        "current_recommendation": {
                            "id": "osp",
                            "title": "Object Spatial Programming",
                            "desc": "Learn how to navigate graphs using Walkers."
                        }
                    });
                    setLoading(False);
                }, 1000);
            }
            fetchOSPGraph();
        }, []);

        if loading {
            return <div className="min-h-screen bg-slate-50 p-8 flex justify-center pt-20">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-500 font-medium">Loading your Knowledge Graph...</p>
                </div>
            </div>;
        }

        if userGraph {
            let rec = userGraph.current_recommendation;
            let lessonUrl = "/lesson/" + rec.id;

            return <div className="min-h-screen bg-slate-50 pb-20">
                <div className="bg-white border-b border-slate-200 p-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">Welcome back, Architect.</h1>
                                <p className="text-slate-500 mt-1">Current Rank: <span className="text-blue-600 font-semibold">{userGraph.user_level}</span></p>
                            </div>
                            <Link to={lessonUrl}>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all hover:scale-105 flex items-center gap-2">
                                    <span>Continue: {rec.title}</span>
                                    <span>→</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto mt-12 px-6">
                    
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <span>Skill Graph (OSP Visualization)</span>
                        </h2>
                        
                        <div className="relative bg-white rounded-2xl p-10 shadow-sm border border-slate-200 overflow-hidden">
                            <div className="absolute top-1/2 left-10 right-10 h-1 bg-slate-100 -z-0"></div>
                            <div className="absolute top-1/2 left-10 h-1 bg-blue-500 -z-0 transition-all duration-1000" style={{"width": "50%"}}></div>

                            <div className="grid grid-cols-4 gap-4 relative z-10">
                                {userGraph.nodes.map(lambda node: any -> any {
                                    # Dynamic styling based on status
                                    let isMastered = node.status == "mastered";
                                    let isActive = node.status == "active";
                                    
                                    let circleClass = "w-16 h-16 rounded-full flex items-center justify-center border-4 font-bold text-xl transition-all duration-300 ";
                                    circleClass += "bg-white border-green-500 text-green-600 shadow-green-100" if isMastered else "";
                                    circleClass += "bg-blue-600 border-blue-200 text-white scale-110 shadow-xl shadow-blue-200 ring-4 ring-blue-50" if isActive else "";
                                    circleClass += "bg-slate-100 border-slate-200 text-slate-400" if node.status == "locked" else "";

                                    let labelClass = "mt-4 text-sm font-medium ";
                                    labelClass += "text-blue-700" if isActive else "text-slate-500";

                                    return <div key={node.id} className="flex flex-col items-center">
                                        <div className={circleClass}>
                                            {("✓" if isMastered else (node.score if isActive else "🔒"))}
                                        </div>
                                        <span className={labelClass}>{node.label}</span>
                                        {isActive and 
                                            <span className="mt-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Current</span>
                                        }
                                    </div>;
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Mastery</div>
                            <div className="text-3xl font-bold text-slate-800">{userGraph.total_mastery}%</div>
                            <div className="w-full bg-slate-100 rounded-full h-2 mt-4">
                                <div className="bg-green-500 h-2 rounded-full" style={{"width": "35%"}}></div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Walkers Deployed</div>
                            <div className="text-3xl font-bold text-slate-800">12</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">byLLM Interactions</div>
                            <div className="text-3xl font-bold text-slate-800">48</div>
                        </div>
                    </div>

                </div>
            </div>;
        }
        return <div>Error loading graph.</div>;
    }
}