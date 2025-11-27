# app.jac - Entry Point

# Imports
cl import from "@jac-client/utils" { Router, Routes, Route }
cl import ".global.css";

# Import Pages
cl import from .Navigation { Navigation }
cl import from .Dashboard { Dashboard }
cl import from .LessonPage { LessonPage }
cl import from .QuizPage { QuizPage }

cl {
    def app() -> any {
        return <Router>
            <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
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