cl import from "@jac-client/utils" { Link }

cl {
    def Navigation() -> any {
        return <nav className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">J</div>
                        <Link to="/" className="text-xl font-bold tracking-tight hover:text-blue-400 transition-colors">
                            Jac Academy
                        </Link>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex text-sm text-gray-400 gap-4">
                            <span>XP: 1,250</span>
                            <span>Streak: 4 Days</span>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border-2 border-white"></div>
                    </div>
                </div>
            </div>
        </nav>;
    }
}