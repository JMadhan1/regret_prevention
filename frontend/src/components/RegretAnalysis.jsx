import { useState } from 'react'

function RegretAnalysis({ result, onStartOver }) {
    const [expandedOption, setExpandedOption] = useState(null)

    if (!result || !result.options_analysis) {
        return (
            <div className="card text-center">
                <p className="text-gray-600">No analysis results available</p>
                <button onClick={onStartOver} className="btn-primary mt-4">
                    Start Over
                </button>
            </div>
        )
    }

    const getRegretColor = (probability) => {
        if (probability < 30) return 'text-green-600 bg-green-50 border-green-200'
        if (probability < 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
        return 'text-red-600 bg-red-50 border-red-200'
    }

    const getSeverityColor = (severity) => {
        if (severity <= 3) return 'bg-green-500'
        if (severity <= 6) return 'bg-yellow-500'
        return 'bg-red-500'
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-3">Your Regret Analysis</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Based on {result.patterns_analyzed || 'multiple'} similar situations from our database
                </p>
            </div>

            {/* Recommendation Card */}
            {result.recommendation && (
                <div className="card bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Recommendation</h3>
                            <p className="text-lg font-semibold text-purple-700 mb-3">
                                {result.recommendation.suggested_option}
                            </p>
                            <p className="text-gray-700 mb-3">{result.recommendation.reasoning}</p>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-600">Confidence:</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                                    <div
                                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${result.recommendation.confidence}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm font-bold text-purple-700">{result.recommendation.confidence}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Hidden Factors Alert */}
            {result.hidden_factors && result.hidden_factors.length > 0 && (
                <div className="card bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
                    <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">⚠️ Hidden High-Stakes Factors</h3>
                            <p className="text-gray-700 mb-3">Our analysis detected important factors you might be overlooking:</p>
                            <ul className="space-y-2">
                                {result.hidden_factors.map((factor, index) => (
                                    <li key={index} className="flex items-start space-x-2">
                                        <span className="text-amber-600 font-bold">•</span>
                                        <span className="text-gray-700">{factor}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* Options Analysis */}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Detailed Analysis by Option</h3>

                {result.options_analysis.map((option, index) => (
                    <div key={index} className="card hover:shadow-2xl transition-shadow duration-200">
                        <div className="space-y-4">
                            {/* Option Header */}
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{option.option}</h4>
                                    <div className="flex items-center space-x-4">
                                        <div className={`px-4 py-2 rounded-xl border-2 ${getRegretColor(option.regret_probability)}`}>
                                            <span className="text-sm font-medium">Regret Probability</span>
                                            <p className="text-3xl font-bold">{option.regret_probability}%</p>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className="text-sm font-medium text-gray-600">Severity:</span>
                                                <span className="text-sm font-bold text-gray-900">{option.regret_severity}/10</span>
                                            </div>
                                            <div className="flex space-x-1">
                                                {[...Array(10)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-2 w-full rounded-full ${i < option.regret_severity ? getSeverityColor(option.regret_severity) : 'bg-gray-200'
                                                            }`}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline & Similar Situations */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-purple-50 rounded-xl p-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-semibold text-gray-900">Timeline</span>
                                    </div>
                                    <p className="text-gray-700">{option.timeline}</p>
                                </div>
                                <div className="bg-pink-50 rounded-xl p-4">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span className="font-semibold text-gray-900">Similar Cases</span>
                                    </div>
                                    <p className="text-gray-700">{option.similar_situations_count || 'Multiple'} people in similar situations</p>
                                </div>
                            </div>

                            {/* Pros and Cons */}
                            <div className="grid md:grid-cols-2 gap-4">
                                {option.pros && option.pros.length > 0 && (
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                                            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Pros
                                        </h5>
                                        <ul className="space-y-1">
                                            {option.pros.map((pro, i) => (
                                                <li key={i} className="text-sm text-gray-700 flex items-start">
                                                    <span className="text-green-600 mr-2">✓</span>
                                                    <span>{pro}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {option.cons && option.cons.length > 0 && (
                                    <div>
                                        <h5 className="font-semibold text-gray-900 mb-2 flex items-center">
                                            <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                            Cons
                                        </h5>
                                        <ul className="space-y-1">
                                            {option.cons.map((con, i) => (
                                                <li key={i} className="text-sm text-gray-700 flex items-start">
                                                    <span className="text-red-600 mr-2">✗</span>
                                                    <span>{con}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Key Insights */}
                            {option.key_insights && option.key_insights.length > 0 && (
                                <div>
                                    <h5 className="font-semibold text-gray-900 mb-2">💡 Key Insights</h5>
                                    <ul className="space-y-2">
                                        {option.key_insights.map((insight, i) => (
                                            <li key={i} className="text-sm text-gray-700 bg-purple-50 rounded-lg p-3">
                                                {insight}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Quotes/Examples */}
                            {option.quotes_examples && option.quotes_examples.length > 0 && (
                                <div>
                                    <button
                                        onClick={() => setExpandedOption(expandedOption === index ? null : index)}
                                        className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
                                    >
                                        <span>📝 Real Stories from People Who Made This Choice</span>
                                        <svg
                                            className={`w-5 h-5 transform transition-transform ${expandedOption === index ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {expandedOption === index && (
                                        <div className="mt-3 space-y-3 animate-slide-up">
                                            {option.quotes_examples.map((quote, i) => (
                                                <blockquote key={i} className="border-l-4 border-purple-500 pl-4 py-2 bg-gray-50 rounded-r-lg">
                                                    <p className="text-sm text-gray-700 italic">"{quote}"</p>
                                                </blockquote>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Overall Insights */}
            {result.overall_insights && result.overall_insights.length > 0 && (
                <div className="card bg-gradient-to-br from-blue-50 to-indigo-50">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Overall Insights</h3>
                    <ul className="space-y-3">
                        {result.overall_insights.map((insight, index) => (
                            <li key={index} className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-white text-xs font-bold">{index + 1}</span>
                                </div>
                                <p className="text-gray-700">{insight}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 pt-8">
                <button onClick={onStartOver} className="btn-secondary">
                    Analyze Another Decision
                </button>
            </div>
        </div>
    )
}

export default RegretAnalysis
