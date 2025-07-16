import { useState } from 'react'
import { ArrowRight, CheckCircle, TrendingUp, DollarSign, Cpu, Zap } from 'lucide-react'
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
  const [roiResults, setROIResults] = useState(null)

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

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const calculateROI = () => {
    if (!selectedKPI || !currentValue || !targetValue) return

    const current = parseFloat(currentValue)
    const target = parseFloat(targetValue)
    
    // Calculate improvement percentage
    let improvement = 0
    if (selectedKPI.id.includes('rate') && !selectedKPI.id.includes('success') && !selectedKPI.id.includes('satisfaction') && !selectedKPI.id.includes('approval') && !selectedKPI.id.includes('detection') && !selectedKPI.id.includes('fulfillment')) {
      // For rates where lower is better (churn, backorder, readmission, etc.)
      improvement = ((current - target) / current) * 100
    } else {
      // For rates where higher is better (success, satisfaction, approval, etc.)
      improvement = ((target - current) / current) * 100
    }

    // Base savings by industry (annual)
    const baseSavings = {
      'supply-chain': 500000,
      'financial': 1000000,
      'healthcare': 750000,
      'retail': 300000
    }

    const industryBaseSavings = baseSavings[selectedIndustry.id] || 500000
    const estimatedSavings = Math.round(industryBaseSavings * (Math.abs(improvement) / 100))

    // Technology costs
    const lnmCost = 8000
    const llmCost = 50000
    const techSavings = llmCost - lnmCost

    setROIResults({
      improvement: Math.abs(improvement),
      estimatedSavings,
      lnmCost,
      llmCost,
      techSavings
    })

    setCurrentStep(4)
  }

  const ProgressIndicator = () => (
    <div className="flex items-center justify-center mb-8 px-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`
            flex items-center justify-center w-12 h-12 rounded-full text-sm font-semibold transition-all duration-300
            sriya-progress-step
            ${currentStep === step.id ? 'active' : ''}
            ${currentStep > step.id ? 'completed' : ''}
          `}>
            {currentStep > step.id ? <CheckCircle className="w-6 h-6" /> : step.id}
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
              currentStep > step.id ? 'bg-[#9aff00]' : 'bg-gray-600'
            }`} />
          )}
        </div>
      ))}
    </div>
  )

  const StepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 sriya-text-primary">Industry & KPI</h2>
              <p className="sriya-text-secondary">Select your industry and key metric</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-white">Select Your Industry</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {industries.map((industry) => (
                  <div
                    key={industry.id}
                    className={`cursor-pointer transition-all duration-300 sriya-card p-6 ${
                      selectedIndustry?.id === industry.id ? 'sriya-border-accent sriya-glow' : ''
                    }`}
                    onClick={() => handleIndustrySelect(industry)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{industry.icon}</div>
                      <div>
                        <h4 className="font-semibold text-white">{industry.name}</h4>
                        <p className="text-sm sriya-text-secondary">{industry.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedIndustry && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-white">Choose Your KPI</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedIndustry.kpis.map((kpi) => (
                    <div
                      key={kpi.id}
                      className={`cursor-pointer transition-all duration-300 sriya-card p-4 ${
                        selectedKPI?.id === kpi.id ? 'sriya-border-accent sriya-glow' : ''
                      }`}
                      onClick={() => handleKPISelect(kpi)}
                    >
                      <h4 className="font-semibold mb-2 text-white">{kpi.name}</h4>
                      <p className="text-xs sriya-text-secondary mb-3">{kpi.definition}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="sriya-text-secondary">Typical:</span>
                          <span className="text-orange-400">{kpi.typical}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="sriya-text-secondary">Target:</span>
                          <span className="sriya-text-primary">{kpi.target}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleNextStep}
                disabled={!selectedIndustry || !selectedKPI}
                className="sriya-button-primary px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 sriya-text-primary">Current State</h2>
              <p className="sriya-text-secondary">Enter your current performance</p>
            </div>

            <div className="sriya-card p-8">
              <h3 className="text-xl font-semibold mb-4 text-white">
                What is your current {selectedKPI?.name}?
              </h3>
              <p className="sriya-text-secondary mb-6">
                Enter your current performance for {selectedKPI?.name.toLowerCase()}. Industry typical range: {selectedKPI?.typical}
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 sriya-text-primary">Current Value</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={currentValue}
                      onChange={(e) => setCurrentValue(e.target.value)}
                      className="w-full p-4 text-lg rounded-lg sriya-input"
                      placeholder="0"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 sriya-text-secondary">
                      {selectedKPI?.unit}
                    </span>
                  </div>
                </div>

                {currentValue && (
                  <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700">
                    <h4 className="font-semibold mb-2 text-white">Industry Benchmark</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="sriya-text-secondary">Typical Range:</span>
                        <span className="text-orange-400">{selectedKPI?.typical}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="sriya-text-secondary">World-class:</span>
                        <span className="sriya-text-primary">{selectedKPI?.target}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button onClick={handlePrevStep} className="px-6 py-3 rounded-lg border border-gray-600 text-white hover:bg-gray-800">
                Back
              </button>
              <button
                onClick={handleNextStep}
                disabled={!currentValue}
                className="sriya-button-primary px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )

      case 3:
        const current = parseFloat(currentValue) || 0
        const target = parseFloat(targetValue) || 0
        let improvement = 0
        
        if (target && current) {
          if (selectedKPI.id.includes('rate') && !selectedKPI.id.includes('success') && !selectedKPI.id.includes('satisfaction') && !selectedKPI.id.includes('approval') && !selectedKPI.id.includes('detection') && !selectedKPI.id.includes('fulfillment')) {
            improvement = ((current - target) / current) * 100
          } else {
            improvement = ((target - current) / current) * 100
          }
        }

        return (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 sriya-text-primary">Aspiration</h2>
              <p className="sriya-text-secondary">Set your target goal</p>
            </div>

            <div className="sriya-card p-8">
              <h3 className="text-xl font-semibold mb-4 text-white">
                Where would you like this KPI to be?
              </h3>
              <p className="sriya-text-secondary mb-6">
                Set your target goal for {selectedKPI?.name.toLowerCase()}
              </p>

              <div className="mb-6 p-6 rounded-lg bg-gray-800/30">
                <h4 className="font-semibold mb-4 text-white">Your Improvement Journey</h4>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-sm sriya-text-secondary mb-1">Current</p>
                    <p className="text-2xl font-bold text-white">{currentValue}{selectedKPI?.unit}</p>
                  </div>
                  <ArrowRight className="w-8 h-8 sriya-text-primary" />
                  <div className="text-center">
                    <p className="text-sm sriya-text-secondary mb-1">Target</p>
                    <p className="text-2xl font-bold sriya-text-primary">
                      {targetValue || '?'}{selectedKPI?.unit}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 sriya-text-primary">Target Value</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={targetValue}
                      onChange={(e) => setTargetValue(e.target.value)}
                      className="w-full p-4 text-lg rounded-lg sriya-input"
                      placeholder="0"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 sriya-text-secondary">
                      {selectedKPI?.unit}
                    </span>
                  </div>
                </div>

                {targetValue && improvement > 0 && (
                  <div className="p-4 rounded-lg bg-green-900/20 border border-green-700">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 sriya-text-primary" />
                      <span className="font-semibold sriya-text-primary">Projected Improvement</span>
                    </div>
                    <p className="text-2xl font-bold sriya-text-primary mt-2">
                      {improvement.toFixed(1)}% improvement
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button onClick={handlePrevStep} className="px-6 py-3 rounded-lg border border-gray-600 text-white hover:bg-gray-800">
                Back
              </button>
              <button
                onClick={calculateROI}
                disabled={!targetValue}
                className="sriya-button-primary px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Calculate ROI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 text-white">Your ROI Potential with Sriya.AI LNMs</h2>
              <p className="sriya-text-secondary">
                Based on your {selectedKPI?.name.toLowerCase()} improvement from {currentValue}{selectedKPI?.unit} to {targetValue}{selectedKPI?.unit}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="sriya-result-card uplift p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-cyan-400" />
                  <h3 className="font-semibold text-cyan-400">Estimated Uplift</h3>
                </div>
                <p className="text-3xl font-bold text-white mb-2">{roiResults?.improvement.toFixed(1)}%</p>
                <p className="text-sm sriya-text-secondary">Performance improvement via Sriya LNM technology</p>
              </div>

              <div className="sriya-result-card savings p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <DollarSign className="w-6 h-6 sriya-text-primary" />
                  <h3 className="font-semibold sriya-text-primary">Approximate Savings</h3>
                </div>
                <p className="text-3xl font-bold text-white mb-2">${roiResults?.estimatedSavings.toLocaleString()}</p>
                <p className="text-sm sriya-text-secondary">Annual cost savings from improved {selectedKPI?.name.toLowerCase()}</p>
              </div>

              <div className="sriya-result-card costs p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Cpu className="w-6 h-6 text-purple-400" />
                  <h3 className="font-semibold text-purple-400">Technology Costs</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="sriya-text-secondary">LNM (CPU)</span>
                    <span className="text-white">${roiResults?.lnmCost.toLocaleString()}/yr</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="sriya-text-secondary">Traditional LLM (GPU)</span>
                    <span className="text-white">${roiResults?.llmCost.toLocaleString()}/yr</span>
                  </div>
                  <div className="border-t border-gray-600 pt-2">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="sriya-text-secondary">Annual Savings</span>
                      <span className="sriya-text-primary">${roiResults?.techSavings.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sriya-card p-6 mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h3 className="font-semibold text-yellow-400">Why Sriya.AI Large Numerical Models?</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 sriya-text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white">No Hallucinations</h4>
                      <p className="text-sm sriya-text-secondary">Unlike LLMs, LNMs provide accurate, reliable outputs for numerical data</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 sriya-text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white">95-99% Accuracy</h4>
                      <p className="text-sm sriya-text-secondary">Proven high accuracy across diverse business scenarios</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 sriya-text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white">CPU-Based</h4>
                      <p className="text-sm sriya-text-secondary">Energy-efficient, runs on standard hardware without expensive GPUs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 sriya-text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white">Rapid Deployment</h4>
                      <p className="text-sm sriya-text-secondary">Quick integration with existing ERP and business systems</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="sriya-cta-section rounded-2xl p-8 mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to unlock this potential?</h3>
                <p className="text-white/90 mb-6">
                  Want to try this with your real data? Our team can help you validate these projections with a pilot program.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg">
                    Book Pilot Program
                  </button>
                  <button className="border border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg">
                    Remind Me Later
                  </button>
                </div>
              </div>
              <button onClick={() => setCurrentStep(1)} className="px-6 py-3 rounded-lg border border-gray-600 text-white hover:bg-gray-800">
                Back to Edit
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen sriya-gradient-bg">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#9aff00] rounded flex items-center justify-center">
              <span className="text-black font-bold text-sm">S</span>
            </div>
            <div>
              <h1 className="sriya-logo text-xl">Sriya.AI</h1>
              <p className="text-xs sriya-text-secondary">ROI Estimator</p>
            </div>
          </div>
          <div className="border border-[#9aff00] text-[#9aff00] px-3 py-1 rounded-full text-sm">
            Large Numerical Models
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <ProgressIndicator />
        <StepContent />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/20 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between text-sm sriya-text-secondary">
          <p>© 2025 Sriya.AI. All rights reserved.</p>
          <p>Powered by Large Numerical Models</p>
        </div>
      </footer>
    </div>
  )
}

export default App

