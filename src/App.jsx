import { useState } from 'react'
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
    { id: 1, title: 'Industry & KPI' },
    { id: 2, title: 'Current State' },
    { id: 3, title: 'Aspiration' },
    { id: 4, title: 'ROI Results' }
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
      improvement = ((current - target) / current) * 100
    } else {
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <div className="content">
              <h2 className="title">Industry & KPI</h2>
              <p className="subtitle">Select your industry and key metric</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>
                Select Your Industry
              </h3>
              <div className="grid">
                {industries.map((industry) => (
                  <div
                    key={industry.id}
                    className={`card ${selectedIndustry?.id === industry.id ? 'selected' : ''}`}
                    onClick={() => handleIndustrySelect(industry)}
                  >
                    <div className="card-header">
                      <div className="card-icon">{industry.icon}</div>
                      <div>
                        <div className="card-title">{industry.name}</div>
                        <div className="card-description">{industry.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedIndustry && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>
                  Choose Your KPI
                </h3>
                <div className="grid">
                  {selectedIndustry.kpis.map((kpi) => (
                    <div
                      key={kpi.id}
                      className={`card ${selectedKPI?.id === kpi.id ? 'selected' : ''}`}
                      onClick={() => handleKPISelect(kpi)}
                    >
                      <div className="card-title" style={{ marginBottom: '0.5rem' }}>{kpi.name}</div>
                      <p style={{ fontSize: '0.875rem', color: '#cccccc', marginBottom: '1rem' }}>
                        {kpi.definition}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                        <span style={{ color: '#cccccc' }}>Typical: <span style={{ color: '#f97316' }}>{kpi.typical}</span></span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                        <span style={{ color: '#cccccc' }}>Target: <span style={{ color: '#9aff00' }}>{kpi.target}</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={handleNextStep}
                disabled={!selectedIndustry || !selectedKPI}
                className="button"
              >
                Next Step →
              </button>
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <div className="content">
              <h2 className="title">Current State</h2>
              <p className="subtitle">Enter your current performance</p>
            </div>

            <div className="card" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>
                What is your current {selectedKPI?.name}?
              </h3>
              <p style={{ color: '#cccccc', marginBottom: '1.5rem' }}>
                Enter your current performance for {selectedKPI?.name.toLowerCase()}. 
                Industry typical range: {selectedKPI?.typical}
              </p>

              <div className="input-group">
                <label className="label">Current Value</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    className="input"
                    placeholder="0"
                    style={{ fontSize: '1.125rem' }}
                  />
                  <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#cccccc' }}>
                    {selectedKPI?.unit}
                  </span>
                </div>
              </div>

              {currentValue && (
                <div style={{ padding: '1rem', borderRadius: '0.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: 'white' }}>Industry Benchmark</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: '#cccccc' }}>Typical Range:</span>
                    <span style={{ color: '#f97316' }}>{selectedKPI?.typical}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                    <span style={{ color: '#cccccc' }}>World-class:</span>
                    <span style={{ color: '#9aff00' }}>{selectedKPI?.target}</span>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '600px', margin: '0 auto' }}>
              <button onClick={handlePrevStep} className="button button-secondary">
                ← Back
              </button>
              <button
                onClick={handleNextStep}
                disabled={!currentValue}
                className="button"
              >
                Next Step →
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
          <div>
            <div className="content">
              <h2 className="title">Aspiration</h2>
              <p className="subtitle">Set your target goal</p>
            </div>

            <div className="card" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>
                Where would you like this KPI to be?
              </h3>
              <p style={{ color: '#cccccc', marginBottom: '1.5rem' }}>
                Set your target goal for {selectedKPI?.name.toLowerCase()}
              </p>

              <div style={{ marginBottom: '1.5rem', padding: '1.5rem', borderRadius: '0.5rem', background: 'rgba(0,0,0,0.2)' }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>Your Improvement Journey</h4>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.875rem', color: '#cccccc', marginBottom: '0.25rem' }}>Current</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>{currentValue}{selectedKPI?.unit}</p>
                  </div>
                  <div style={{ fontSize: '2rem', color: '#9aff00' }}>→</div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '0.875rem', color: '#cccccc', marginBottom: '0.25rem' }}>Target</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9aff00' }}>
                      {targetValue || '?'}{selectedKPI?.unit}
                    </p>
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label className="label">Target Value</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    value={targetValue}
                    onChange={(e) => setTargetValue(e.target.value)}
                    className="input"
                    placeholder="0"
                    style={{ fontSize: '1.125rem' }}
                  />
                  <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#cccccc' }}>
                    {selectedKPI?.unit}
                  </span>
                </div>
              </div>

              {targetValue && improvement > 0 && (
                <div style={{ padding: '1rem', borderRadius: '0.5rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>📈</span>
                    <span style={{ fontWeight: 'bold', color: '#9aff00' }}>Projected Improvement</span>
                  </div>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9aff00', marginTop: '0.5rem' }}>
                    {improvement.toFixed(1)}% improvement
                  </p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '600px', margin: '0 auto' }}>
              <button onClick={handlePrevStep} className="button button-secondary">
                ← Back
              </button>
              <button
                onClick={calculateROI}
                disabled={!targetValue}
                className="button"
              >
                Calculate ROI →
              </button>
            </div>
          </div>
        )

      case 4:
        return (
          <div>
            <div className="content">
              <h2 className="title">Your ROI Potential with Sriya.AI LNMs</h2>
              <p className="subtitle">
                Based on your {selectedKPI?.name.toLowerCase()} improvement from {currentValue}{selectedKPI?.unit} to {targetValue}{selectedKPI?.unit}
              </p>
            </div>

            <div className="results-grid">
              <div className="result-card uplift">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>📈</span>
                  <h3 style={{ fontWeight: 'bold', color: '#06b6d4' }}>Estimated Uplift</h3>
                </div>
                <p className="result-value">{roiResults?.improvement.toFixed(1)}%</p>
                <p className="result-label">Performance improvement via Sriya LNM technology</p>
              </div>

              <div className="result-card savings">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>💰</span>
                  <h3 style={{ fontWeight: 'bold', color: '#9aff00' }}>Approximate Savings</h3>
                </div>
                <p className="result-value">${roiResults?.estimatedSavings.toLocaleString()}</p>
                <p className="result-label">Annual cost savings from improved {selectedKPI?.name.toLowerCase()}</p>
              </div>

              <div className="result-card costs">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>💻</span>
                  <h3 style={{ fontWeight: 'bold', color: '#8b5cf6' }}>Technology Costs</h3>
                </div>
                <div style={{ fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#cccccc' }}>LNM (CPU)</span>
                    <span style={{ color: 'white' }}>${roiResults?.lnmCost.toLocaleString()}/yr</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#cccccc' }}>Traditional LLM (GPU)</span>
                    <span style={{ color: 'white' }}>${roiResults?.llmCost.toLocaleString()}/yr</span>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                      <span style={{ color: '#cccccc' }}>Annual Savings</span>
                      <span style={{ color: '#9aff00' }}>${roiResults?.techSavings.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>⚡</span>
                <h3 style={{ fontWeight: 'bold', color: '#fbbf24' }}>Why Sriya.AI Large Numerical Models?</h3>
              </div>
              <div className="grid">
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span style={{ color: '#9aff00', fontSize: '1.25rem' }}>✓</span>
                    <div>
                      <h4 style={{ fontWeight: 'bold', color: 'white' }}>No Hallucinations</h4>
                      <p style={{ fontSize: '0.875rem', color: '#cccccc' }}>Unlike LLMs, LNMs provide accurate, reliable outputs for numerical data</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ color: '#9aff00', fontSize: '1.25rem' }}>✓</span>
                    <div>
                      <h4 style={{ fontWeight: 'bold', color: 'white' }}>95-99% Accuracy</h4>
                      <p style={{ fontSize: '0.875rem', color: '#cccccc' }}>Proven high accuracy across diverse business scenarios</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '1rem' }}>
                    <span style={{ color: '#9aff00', fontSize: '1.25rem' }}>✓</span>
                    <div>
                      <h4 style={{ fontWeight: 'bold', color: 'white' }}>CPU-Based</h4>
                      <p style={{ fontSize: '0.875rem', color: '#cccccc' }}>Energy-efficient, runs on standard hardware without expensive GPUs</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ color: '#9aff00', fontSize: '1.25rem' }}>✓</span>
                    <div>
                      <h4 style={{ fontWeight: 'bold', color: 'white' }}>Rapid Deployment</h4>
                      <p style={{ fontSize: '0.875rem', color: '#cccccc' }}>Quick integration with existing ERP and business systems</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #ec4899 100%)', 
                borderRadius: '1rem', 
                padding: '2rem', 
                marginBottom: '1.5rem' 
              }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
                  Ready to unlock this potential?
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem' }}>
                  Want to try this with your real data? Our team can help you validate these projections with a pilot program.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button style={{ 
                    background: 'white', 
                    color: '#1f2937', 
                    border: 'none',
                    fontWeight: 'bold', 
                    padding: '0.75rem 2rem', 
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}>
                    Book Pilot Program
                  </button>
                  <button style={{ 
                    background: 'transparent', 
                    color: 'white', 
                    border: '1px solid white',
                    padding: '0.75rem 2rem', 
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}>
                    Remind Me Later
                  </button>
                </div>
              </div>
              <button onClick={() => setCurrentStep(1)} className="button button-secondary">
                ← Back to Edit
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <div className="logo-icon">S</div>
          <div>
            <div className="logo-text">Sriya.AI</div>
            <div style={{ fontSize: '0.75rem', color: '#cccccc' }}>ROI Estimator</div>
          </div>
        </div>
        <div className="badge">
          Large Numerical Models
        </div>
      </header>

      {/* Main Content */}
      <main className="container">
        {/* Progress Steps */}
        <div className="progress">
          {steps.map((step, index) => (
            <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
              <div className={`step ${currentStep === step.id ? 'active' : ''}`}>
                {currentStep > step.id ? '✓' : step.id}
              </div>
              {index < steps.length - 1 && (
                <div className={`step-line ${currentStep > step.id ? 'active' : ''}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {renderStep()}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Sriya.AI. All rights reserved.</p>
        <p>Powered by Large Numerical Models</p>
      </footer>
    </div>
  )
}

export default App

