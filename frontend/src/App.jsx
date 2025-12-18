import { useState } from 'react'
import QuestionnaireForm from './components/QuestionnaireForm'
import RegretAnalysis from './components/RegretAnalysis'
import PatternVisualization from './components/PatternVisualization'

function App() {
    const [currentView, setCurrentView] = useState('home') // home, questionnaire, results
    const [analysisResult, setAnalysisResult] = useState(null)

    const handleStartAnalysis = () => {
        setCurrentView('questionnaire')
    }

    const handleAnalysisComplete = (result) => {
        setAnalysisResult(result)
        setCurrentView('results')
    }

    const handleStartOver = () => {
        setCurrentView('home')
        setAnalysisResult(null)
    }

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-purple-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold gradient-text">Regret Prevention Engine</h1>
                        </div>
                        {currentView !== 'home' && (
                            <button
                                onClick={handleStartOver}
                                className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-1"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Start Over</span>
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {currentView === 'home' && (
                    <div className="animate-fade-in">
                        {/* Hero Section */}
                        <div className="text-center mb-16">
                            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
                                Make Decisions You Won't{' '}
                                <span className="gradient-text">Regret</span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 animate-slide-up animation-delay-200">
                                Powered by thousands of real regret stories and advanced AI, we help you predict
                                the probability of regretting your choices before you make them.
                            </p>
                            <button
                                onClick={handleStartAnalysis}
                                className="btn-primary text-lg animate-slide-up animation-delay-400"
                            >
                                Analyze Your Decision
                                <svg className="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <div className="card animate-slide-up">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Data-Driven Insights</h3>
                                <p className="text-gray-600">
                                    Analysis based on thousands of real regret stories from people who've been in your shoes.
                                </p>
                            </div>

                            <div className="card animate-slide-up animation-delay-200">
                                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered Analysis</h3>
                                <p className="text-gray-600">
                                    Advanced AI matches your situation to similar patterns and calculates regret probability.
                                </p>
                            </div>

                            <div className="card animate-slide-up animation-delay-400">
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Timeline Predictions</h3>
                                <p className="text-gray-600">
                                    Discover when regret typically emerges and what factors contribute to it over time.
                                </p>
                            </div>
                        </div>

                        {/* Pattern Visualization */}
                        <PatternVisualization />

                        {/* How It Works */}
                        <div className="card mt-16">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h3>
                            <div className="grid md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                        1
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Share Your Situation</h4>
                                    <p className="text-sm text-gray-600">Tell us about your decision and the options you're considering</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                        2
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">AI Analysis</h4>
                                    <p className="text-sm text-gray-600">Our AI matches your situation to thousands of real regret stories</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                        3
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Get Predictions</h4>
                                    <p className="text-sm text-gray-600">Receive regret probability for each option with detailed reasoning</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                        4
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-2">Make Better Choices</h4>
                                    <p className="text-sm text-gray-600">Use data-driven insights to make decisions you won't regret</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {currentView === 'questionnaire' && (
                    <QuestionnaireForm onComplete={handleAnalysisComplete} />
                )}

                {currentView === 'results' && analysisResult && (
                    <RegretAnalysis result={analysisResult} onStartOver={handleStartOver} />
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white/80 backdrop-blur-md border-t border-purple-100 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <p className="text-center text-gray-600 text-sm">
                        © 2024 Regret Prevention Engine. Powered by AI and real human experiences.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default App
