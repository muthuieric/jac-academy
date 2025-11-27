# LessonPage.jac
cl import from "@jac-client/utils" { Link, useParams }

cl {
    def LessonPage() -> any {
        let params = useParams();
        let topic_id = params.id;
        
        let introText = "This is the interactive content for " + topic_id + ".";
        let quizUrl = "/quiz/" + topic_id;
        let item1 = "Key concept 1 about " + topic_id;
        let item2 = "Key concept 2 about " + topic_id;

        return <div className="max-w-3xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800 capitalize">Lesson: {topic_id}</h1>
                </div>
                
                <div className="p-8">
                    <div className="prose max-w-none text-gray-600 leading-relaxed mb-8">
                        <p className="text-lg font-medium">{introText}</p>
                        <p className="mt-4">In a real application, this content would be pulled dynamically from your Jaseci graph nodes.</p>
                        <ul className="list-disc pl-5 space-y-2 mt-4">
                            <li>{item1}</li>
                            <li>{item2}</li>
                            <li>Practical examples included</li>
                        </ul>
                    </div>

                    <div className="flex justify-end">
                        <Link to={quizUrl}>
                            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors flex items-center gap-2">
                                <span>Take Quiz</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>;
    }
}