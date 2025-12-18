import { useState, useEffect } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

function PatternVisualization() {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStats()
    }, [])

    const fetchStats = async () => {
        try {
            const response = await axios.get('/api/patterns')
            setStats(response.data)
        } catch (error) {
            console.error('Error fetching stats:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="card text-center">
                <div className="spinner mx-auto mb-4"></div>
                <p className="text-gray-600">Loading pattern database statistics...</p>
            </div>
        )
    }

    if (!stats) {
        return (
            <div className="card text-center">
                <p className="text-gray-600">Pattern database not yet initialized. Run data collection first.</p>
            </div>
        )
    }

    // Prepare data for charts
    const categoryData = Object.entries(stats.categories || {}).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        count: value
    }))

    const severityData = Object.entries(stats.severity_distribution || {}).map(([severity, count]) => ({
        severity: `Level ${severity}`,
        count: count
    }))

    const ageData = Object.entries(stats.age_distribution || {}).map(([range, count]) => ({
        range,
        count
    }))

    const COLORS = ['#9333ea', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6']

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Pattern Database</h3>
                <p className="text-gray-600">
                    Analysis based on <span className="font-bold text-purple-600">{stats.total_patterns}</span> real regret stories
                </p>
                {stats.extracted_at && (
                    <p className="text-sm text-gray-500 mt-1">Last updated: {stats.extracted_at}</p>
                )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Category Distribution */}
                {categoryData.length > 0 && (
                    <div className="card">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">Regrets by Category</h4>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="count"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {/* Severity Distribution */}
                {severityData.length > 0 && (
                    <div className="card">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">Regret Severity Distribution</h4>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={severityData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="severity" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#9333ea" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {/* Age Distribution */}
                {ageData.length > 0 && (
                    <div className="card md:col-span-2">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">Age When Decision Was Made</h4>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={ageData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="range" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#ec4899" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            {/* Category Breakdown */}
            <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(stats.categories || {}).map(([category, count]) => (
                    <div key={category} className="stat-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 capitalize">{category}</p>
                                <p className="text-2xl font-bold text-gray-900">{count}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                <span className="text-white text-xl">
                                    {category === 'career' && '💼'}
                                    {category === 'relationship' && '❤️'}
                                    {category === 'education' && '🎓'}
                                    {category === 'financial' && '💰'}
                                    {category === 'health' && '🏥'}
                                    {category === 'lifestyle' && '🌟'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PatternVisualization
