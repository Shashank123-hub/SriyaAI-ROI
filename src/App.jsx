import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { ArrowRight, CheckCircle, Info, TrendingUp, DollarSign, Cpu, Zap } from 'lucide-react'
import './App.css'

// Industry and KPI data
const industries = [
  {
    id: 'supply-chain',
    name: 'Supply Chain',
    icon: '📦',
    description: 'Manufacturing & Distribution',
    kpis: [
      { id: 'backorder-rate', name: 'Backorder Rate', unit: '%', definition: 'Percentage of orders that cannot be fulfilled immediately due to stock shortages', typical: '5-15%', target: '<2%' },
      { id: 'inventory-turnover', name: 'Inventory Turnover', unit: 'x/year', definition: 'Number of times inventory is sold and replaced over a period', typical: '4-12x', target: '>12x' },
      { id: 'order-fulfillment', name: 'Order Fulfillment Rate', unit: '%', definition: 'Percentage of orders delivered on time and in full', typical: '85-95%', target: '>98%' }
    ]
  },
  {
    id: 'financial',
    name: 'Financial Services',
    icon: '🏦',
    description: 'Banking & Insurance',
    kpis: [
      { id: 'fraud-detection', name: 'Fraud Detection Rate', unit: '%', definition: 'Percentage of fraudulent transactions successfully identified', typical: '80-95%', target: '>98%' },
      { id: 'false-positive', name: 'False Positive Rate', unit: '%', definition: 'Percentage of legitimate transactions incorrectly flagged as fraud', typical: '1-5%', target: '<1%' },
      { id: 'approval-rate', name: 'Transaction Approval Rate', unit: '%', definition: 'Percentage of transactions approved after screening', typical: '75-85%', target: '>90%' }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: '🏥',
    description: 'Hospitals & Medical',
    kpis: [
      { id: 'readmission-rate', name: 'Readmission Rate', unit: '%', definition: 'Percentage of patients readmitted within 30 days of discharge', typical: '10-15%', target: '<8%' },
      { id: 'patient-satisfaction', name: 'Patient Satisfaction', unit: '%', definition: 'Percentage of patients rating their experience as excellent', typical: '70-85%', target: '>90%' },
      { id: 'treatment-success', name: 'Treatment Success Rate', unit: '%', definition: 'Percentage of treatments achieving desired clinical outcomes', typical: '85-95%', target: '>95%' }
    ]
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    icon: '🛒',
    description: 'Online & Offline Retail',
    kpis: [
      { id: 'customer-churn', name: 'Customer Churn Rate', unit: '%', definition: 'Percentage of customers who stop purchasing over a period', typical: '5-25%', target: '<5%' },
      { id: 'conversion-rate', name: 'Conversion Rate', unit: '%', definition: 'Percentage of website visitors who make a purchase', typical: '2-5%', target: '>8%' },
      { id: 'return-rate', name: 'Return Rate', unit: '%', definition: 'Percentage of products returned by customers', typical: '8-15%', target: '<5%' }
    ]
  }
]

function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedIndustry, setSelectedIndustry] = useState(null)
  const [selectedKPI, setSelectedKPI] = useState(null)
  const [currentValue, setCurrentValue] = useState('')
  const [targetValue, setTargetValue] = useState('')
  const [showResults, setShowResults] = useState(false)

  const steps = [
    { id: 1, title: 'Industry & KPI', description: 'Select your industry and key metric' },
    { id: 2, title: 'Current State', description: 'Enter your current performance' },
    { id: 3, title: 'Aspiration', description: 'Set your target goal' },
    { id: 4, title: 'ROI Results', description: 'View your potential returns' }
  ]

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry)
    setSelectedKPI(null)
  }

  const handleKPISelect = (kpi) => {
    setSelectedKPI(kpi)
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const calculateROI = () => {
    if (!currentValue || !targetValue || !selectedKPI) return null

    const current = parseFloat(currentValue)
    const target = parseFloat(targetValue)
    
    // Calculate improvement percentage
    let improvement
    if (selectedKPI.id.includes('rate') && !selectedKPI.id.includes('turnover')) {
      // For rates (lower is better for most except success rates)
      if (selectedKPI.id.includes('success') || selectedKPI.id.includes('satisfaction') || selectedKPI.id.includes('approval') || selectedKPI.id.includes('detection') || selectedKPI.id.includes('fulfillment') || selectedKPI.id.includes('conversion')) {
        improvement = ((target - current) / current) * 100
      } else {
        improvement = ((current - target) / current) * 100
      }
    } else {
      // For turnover and other metrics (higher is better)
      improvement = ((target - current) / current) * 100
    }

    // Estimate cost savings based on industry benchmarks
    const baseSavings = {
      'supply-chain': 500000,
      'financial': 1000000,
      'healthcare': 750000,
      'retail': 300000
    }

    const industryBaseSavings = baseSavings[selectedIndustry.id] || 500000
    const estimatedSavings = industryBaseSavings * (Math.abs(improvement) / 100)

    // LNM vs LLM cost comparison (LNM runs on CPU, much cheaper)
    const llmCost = 50000 // Annual GPU/TPU costs
    const lnmCost = 8000  // Annual CPU costs
    const costSavings = llmCost - lnmCost

    return {
      improvement: Math.abs(improvement),
      estimatedSavings: estimatedSavings,
      costSavings: costSavings,
      lnmCost: lnmCost,
      llmCost: llmCost
    }
  }

  const roi = calculateROI()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Sriya.AI</h1>
                <p className="text-sm text-slate-600">ROI Estimator</p>
              </div>
            </div>
            <Badge variant="outline" className="text-blue-600 border-blue-200">
              Large Numerical Models
            </Badge>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep > step.id 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : currentStep === step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-slate-300 text-slate-400'
                }`}>
                  {currentStep > step.id ? <CheckCircle className="w-4 h-4" /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-green-500' : 'bg-slate-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900">{steps[currentStep - 1].title}</h2>
            <p className="text-slate-600 mt-1">{steps[currentStep - 1].description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 1: Industry & KPI Selection */}
        {currentStep === 1 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Select Your Industry</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {industries.map((industry) => (
                  <Card 
                    key={industry.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedIndustry?.id === industry.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => handleIndustrySelect(industry)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{industry.icon}</span>
                        <div>
                          <h4 className="font-semibold text-slate-900">{industry.name}</h4>
                          <p className="text-sm text-slate-600">{industry.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {selectedIndustry && (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Select Your Key Performance Indicator</h3>
                <div className="space-y-3">
                  {selectedIndustry.kpis.map((kpi) => (
                    <Card 
                      key={kpi.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedKPI?.id === kpi.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                      }`}
                      onClick={() => handleKPISelect(kpi)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium text-slate-900">{kpi.name}</h4>
                              <div className="group relative">
                                <Info className="w-4 h-4 text-slate-400 cursor-help" />
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-64 z-10">
                                  <p className="font-medium mb-1">{kpi.definition}</p>
                                  <p className="text-xs text-slate-300">Typical: {kpi.typical} | Target: {kpi.target}</p>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-slate-600 mt-1">{kpi.definition}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-slate-500">Typical: {kpi.typical}</p>
                            <p className="text-sm text-green-600">Target: {kpi.target}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button 
                onClick={handleNext} 
                disabled={!selectedKPI}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next Step <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Current State */}
        {currentStep === 2 && selectedKPI && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>What is your current {selectedKPI.name}?</CardTitle>
                <CardDescription>
                  Enter your current performance for {selectedKPI.name.toLowerCase()}. 
                  Industry typical range: {selectedKPI.typical}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Current Value
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                        className="w-full px-4 py-3 text-2xl font-semibold border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                        step="0.01"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">
                        {selectedKPI.unit}
                      </span>
                    </div>
                  </div>
                </div>

                {currentValue && (
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-medium text-slate-900 mb-2">Industry Benchmark</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Typical Range: {selectedKPI.typical}</span>
                      <span className="text-green-600">World-class: {selectedKPI.target}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={!currentValue}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next Step <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Aspiration Setting */}
        {currentStep === 3 && selectedKPI && currentValue && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Where would you like this KPI to be?</CardTitle>
                <CardDescription>
                  Set your target goal for {selectedKPI.name.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Your Improvement Journey</h4>
                  <div className="flex items-center justify-center space-x-8">
                    <div className="text-center">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-slate-600 mb-1">Current</p>
                        <p className="text-2xl font-bold text-slate-900">{currentValue}{selectedKPI.unit}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-8 h-8 text-slate-400" />
                    <div className="text-center">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm text-slate-600 mb-1">Target</p>
                        <p className="text-2xl font-bold text-green-600">
                          {targetValue || '?'}{selectedKPI.unit}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Target Value
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={targetValue}
                      onChange={(e) => setTargetValue(e.target.value)}
                      className="w-full px-4 py-3 text-2xl font-semibold border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                      step="0.01"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium">
                      {selectedKPI.unit}
                    </span>
                  </div>
                </div>

                {targetValue && roi && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium text-green-900">Projected Improvement</h4>
                    </div>
                    <p className="text-2xl font-bold text-green-600">
                      {roi.improvement.toFixed(1)}% improvement
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={!targetValue}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Calculate ROI <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: ROI Results */}
        {currentStep === 4 && roi && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Your ROI Potential with Sriya.AI LNMs</h3>
              <p className="text-slate-600">Based on your {selectedKPI.name.toLowerCase()} improvement from {currentValue}{selectedKPI.unit} to {targetValue}{selectedKPI.unit}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Estimated Uplift */}
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-blue-900">
                    <TrendingUp className="w-5 h-5" />
                    <span>Estimated Uplift</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {roi.improvement.toFixed(1)}%
                  </div>
                  <p className="text-sm text-blue-700">
                    Performance improvement via Sriya LNM technology
                  </p>
                </CardContent>
              </Card>

              {/* Cost Savings */}
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-green-900">
                    <DollarSign className="w-5 h-5" />
                    <span>Approximate Savings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ${roi.estimatedSavings.toLocaleString()}
                  </div>
                  <p className="text-sm text-green-700">
                    Annual cost savings from improved {selectedKPI.name.toLowerCase()}
                  </p>
                </CardContent>
              </Card>

              {/* Technology Cost Comparison */}
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-purple-900">
                    <Cpu className="w-5 h-5" />
                    <span>Technology Costs</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-purple-700">LNM (CPU)</span>
                      <span className="font-semibold text-purple-900">${roi.lnmCost.toLocaleString()}/yr</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-purple-700">Traditional LLM (GPU)</span>
                      <span className="font-semibold text-purple-900">${roi.llmCost.toLocaleString()}/yr</span>
                    </div>
                    <div className="border-t border-purple-200 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-purple-900">Annual Savings</span>
                        <span className="font-bold text-green-600">${roi.costSavings.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span>Why Sriya.AI Large Numerical Models?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-slate-900">No Hallucinations</h4>
                        <p className="text-sm text-slate-600">Unlike LLMs, LNMs provide accurate, reliable outputs for numerical data</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-slate-900">95-99% Accuracy</h4>
                        <p className="text-sm text-slate-600">Proven high accuracy across diverse business scenarios</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-slate-900">CPU-Based</h4>
                        <p className="text-sm text-slate-600">Energy-efficient, runs on standard hardware without expensive GPUs</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-slate-900">Rapid Deployment</h4>
                        <p className="text-sm text-slate-600">Quick integration with existing ERP and business systems</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to unlock this potential?</h3>
                <p className="text-blue-100 mb-6">
                  Want to try this with your real data? Our team can help you validate these projections with a pilot program.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                    Book Pilot Program
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    Remind Me Later
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-start">
              <Button variant="outline" onClick={handleBack}>
                Back to Edit
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="text-slate-600 text-sm">© 2025 Sriya.AI. All rights reserved.</span>
            </div>
            <div className="text-sm text-slate-500">
              Powered by Large Numerical Models
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

