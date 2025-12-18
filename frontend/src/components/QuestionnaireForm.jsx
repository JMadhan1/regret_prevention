import { useState, useEffect } from 'react'
import axios from 'axios'

function QuestionnaireForm({ onComplete }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [showGoalSuggestions, setShowGoalSuggestions] = useState(false)

    // Goal suggestions
    const goalSuggestions = [
        'Financial independence',
        'Becoming an expert in a specific field',
        'Work-life balance',
        'Starting a family by 30',
        'Entrepreneurial ventures',
        'Minimizing debt',
        'Geographic flexibility',
        'Personal growth and self-improvement',
        'Building meaningful relationships',
        'Creative fulfillment'
    ]

    const [formData, setFormData] = useState({
        age: '',
        situation: '',
        decision_description: '',
        option1: '',
        option2: '',
        option3: '',
        goals: '',
        timeline: '1-3 months',
        category: 'lifestyle'
    })

    // Load saved data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('userProfile')
        if (savedData) {
            const profile = JSON.parse(savedData)
            setFormData(prev => ({
                ...prev,
                age: profile.age || '',
                goals: profile.goals || ''
            }))
        }
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const addGoal = (goal) => {
        const currentGoals = formData.goals
        const newGoals = currentGoals ? `${currentGoals}, ${goal}` : goal
        setFormData({
            ...formData,
            goals: newGoals
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            // Prepare options array
            const options = [formData.option1, formData.option2]
            if (formData.option3) {
                options.push(formData.option3)
            }

            const requestData = {
                age: parseInt(formData.age),
                situation: formData.situation,
                decision_description: formData.decision_description,
                options: options,
                goals: formData.goals,
                timeline: formData.timeline,
                category: formData.category
            }

            const response = await axios.post('/api/analyze', requestData)

            // Save user profile to localStorage
            localStorage.setItem('userProfile', JSON.stringify({
                age: formData.age,
                goals: formData.goals
            }))

            // Save decision to history
            const history = JSON.parse(localStorage.getItem('decisionHistory') || '[]')
            history.unshift({
                id: Date.now(),
                date: new Date().toISOString(),
                category: formData.category,
                decision: formData.decision_description,
                result: response.data
            })
            // Keep only last 10 decisions
            localStorage.setItem('decisionHistory', JSON.stringify(history.slice(0, 10)))

            onComplete(response.data)
        } catch (err) {
            console.error('Analysis error:', err)
            setError(err.response?.data?.error || 'Failed to analyze decision. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="card">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Tell Us About Your Decision</h2>
                    <p className="text-gray-600">
                        Answer these questions to help us analyze your situation and predict potential regrets
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 flex items-start space-x-3">
                        <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p className="text-red-800 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Age */}
                    <div>
                        <label className="label">
                            Your Age
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            min="13"
                            max="120"
                            className="input-field"
                            placeholder="e.g., 25"
                        />
                    </div>

                    {/* Decision Category */}
                    <div>
                        <label className="label">
                            Decision Category
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="input-field"
                        >
                            <option value="career">Career</option>
                            <option value="relationship">Relationship</option>
                            <option value="education">Education</option>
                            <option value="financial">Financial</option>
                            <option value="health">Health</option>
                            <option value="lifestyle">Lifestyle</option>
                        </select>
                    </div>

                    {/* Current Situation */}
                    <div>
                        <label className="label">
                            Current Situation
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <textarea
                            name="situation"
                            value={formData.situation}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="textarea-field"
                            placeholder="Describe your current circumstances in detail. What's your life situation right now?"
                        />
                        <p className="text-xs text-gray-500 mt-1">Be specific - the more context you provide, the better our analysis</p>
                    </div>

                    {/* Decision Description */}
                    <div>
                        <label className="label">
                            What Decision Are You Facing?
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <textarea
                            name="decision_description"
                            value={formData.decision_description}
                            onChange={handleChange}
                            required
                            rows="3"
                            className="textarea-field"
                            placeholder="Describe the decision you need to make"
                        />
                    </div>

                    {/* Options */}
                    <div className="space-y-4">
                        <label className="label">
                            What Are Your Options?
                            <span className="text-red-500 ml-1">*</span>
                        </label>

                        <div>
                            <input
                                type="text"
                                name="option1"
                                value={formData.option1}
                                onChange={handleChange}
                                required
                                className="input-field"
                                placeholder="Option 1"
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                name="option2"
                                value={formData.option2}
                                onChange={handleChange}
                                required
                                className="input-field"
                                placeholder="Option 2"
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                name="option3"
                                value={formData.option3}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="Option 3 (optional)"
                            />
                        </div>
                    </div>

                    {/* Life Goals/Values */}
                    <div>
                        <label className="label">
                            Your Life Goals & Values
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <textarea
                            name="goals"
                            value={formData.goals}
                            onChange={handleChange}
                            required
                            rows="3"
                            className="textarea-field"
                            placeholder="What matters most to you? What are you trying to achieve in life?"
                        />

                        {/* Goal Suggestions */}
                        <div className="mt-3">
                            <button
                                type="button"
                                onClick={() => setShowGoalSuggestions(!showGoalSuggestions)}
                                className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                {showGoalSuggestions ? 'Hide' : 'Show'} Goal Suggestions
                            </button>

                            {showGoalSuggestions && (
                                <div className="mt-3 flex flex-wrap gap-2 animate-fade-in">
                                    {goalSuggestions.map((goal, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => addGoal(goal)}
                                            className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-700 text-sm rounded-full border border-purple-200 hover:border-purple-300 transition-all duration-200 hover:scale-105"
                                        >
                                            + {goal}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div>
                        <label className="label">
                            Decision Timeline
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <select
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            required
                            className="input-field"
                        >
                            <option value="immediate">Immediate (within days)</option>
                            <option value="1-3 months">1-3 months</option>
                            <option value="3-6 months">3-6 months</option>
                            <option value="6-12 months">6-12 months</option>
                            <option value="1+ years">1+ years</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full text-lg"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <div className="spinner mr-3"></div>
                                    Analyzing Your Decision...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    Analyze My Decision
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Privacy Notice */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                    🔒 Your information is analyzed privately and not stored permanently
                </p>
            </div>
        </div>
    )
}

export default QuestionnaireForm
