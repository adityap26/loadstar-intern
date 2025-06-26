// iVMI ROI Calculator
class IVMIROICalculator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.calculateROI(); // Calculate on page load with default values
    }

    initializeElements() {
        // Input elements
        this.hourlyWage = document.getElementById('hourlyWage');
        this.hoursPerWeek = document.getElementById('hoursPerWeek');
        this.workersCount = document.getElementById('workersCount');
        this.annualShrinkage = document.getElementById('annualShrinkage');
        this.inventoryValue = document.getElementById('inventoryValue');
        this.countFrequency = document.getElementById('countFrequency');
        
        // Results elements
        this.laborSavings = document.getElementById('laborSavings');
        this.shrinkageSavings = document.getElementById('shrinkageSavings');
        this.efficiencySavings = document.getElementById('efficiencySavings');
        this.totalSavings = document.getElementById('totalSavings');
        
        // Breakdown elements
        this.currentLaborCost = document.getElementById('currentLaborCost');
        this.ivmiCost = document.getElementById('ivmiCost');
        this.netLaborSavings = document.getElementById('netLaborSavings');
        this.shrinkageBreakdown = document.getElementById('shrinkageBreakdown');
        this.totalBreakdown = document.getElementById('totalBreakdown');
        
        // Button
        this.calculateBtn = document.getElementById('calculateBtn');
    }

    bindEvents() {
        this.calculateBtn.addEventListener('click', () => this.calculateROI());
        
        // Real-time calculation on input change
        const inputs = [
            this.hourlyWage, this.hoursPerWeek, this.workersCount,
            this.annualShrinkage, this.inventoryValue, this.countFrequency
        ];
        
        inputs.forEach(input => {
            input.addEventListener('input', () => this.calculateROI());
        });
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    calculateROI() {
        // Get input values
        const hourlyWage = parseFloat(this.hourlyWage.value) || 0;
        const hoursPerWeek = parseFloat(this.hoursPerWeek.value) || 0;
        const workersCount = parseFloat(this.workersCount.value) || 0;
        const annualShrinkage = parseFloat(this.annualShrinkage.value) || 0;
        const inventoryValue = parseFloat(this.inventoryValue.value) || 0;
        const countFrequency = parseFloat(this.countFrequency.value) || 0;

        // Calculate current annual labor cost
        const currentAnnualLaborCost = hourlyWage * hoursPerWeek * 52 * workersCount;

        // iVMI cost estimation (based on typical SaaS pricing for inventory management)
        // This is a conservative estimate - actual pricing may vary
        const ivmiBaseCost = 500; // Monthly base cost
        const ivmiPerWorkerCost = 50; // Additional cost per worker
        const ivmiAnnualCost = (ivmiBaseCost + (ivmiPerWorkerCost * workersCount)) * 12;

        // Calculate savings
        const laborSavings = currentAnnualLaborCost * 0.8; // 80% reduction in manual labor
        const netLaborSavings = laborSavings - ivmiAnnualCost;
        
        const shrinkageSavings = annualShrinkage * 0.2; // 20% reduction in shrinkage
        
        // Efficiency gains calculation
        // Based on time saved from manual counting and improved accuracy
        const hoursSavedPerCount = 2; // Average hours saved per inventory count
        const annualCounts = countFrequency * 12;
        const efficiencySavings = hoursSavedPerCount * annualCounts * hourlyWage * workersCount * 0.5; // 50% of saved time value
        
        const totalSavings = netLaborSavings + shrinkageSavings + efficiencySavings;

        // Update display
        this.updateDisplay({
            currentAnnualLaborCost,
            ivmiAnnualCost,
            laborSavings,
            netLaborSavings,
            shrinkageSavings,
            efficiencySavings,
            totalSavings
        });

        // Add animation effect
        this.animateResults();
    }

    updateDisplay(results) {
        // Update savings cards
        this.laborSavings.textContent = this.formatCurrency(results.laborSavings);
        this.shrinkageSavings.textContent = this.formatCurrency(results.shrinkageSavings);
        this.efficiencySavings.textContent = this.formatCurrency(results.efficiencySavings);
        this.totalSavings.textContent = this.formatCurrency(results.totalSavings);

        // Update breakdown
        this.currentLaborCost.textContent = this.formatCurrency(results.currentAnnualLaborCost);
        this.ivmiCost.textContent = this.formatCurrency(results.ivmiAnnualCost);
        this.netLaborSavings.textContent = this.formatCurrency(results.netLaborSavings);
        this.shrinkageBreakdown.textContent = this.formatCurrency(results.shrinkageSavings);
        this.totalBreakdown.textContent = this.formatCurrency(results.totalSavings);
    }

    animateResults() {
        // Add a subtle animation to the results
        const savingsCards = document.querySelectorAll('.savings-card');
        savingsCards.forEach((card, index) => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = 'fadeInUp 0.6s ease-out';
            }, index * 100);
        });
    }

    // Additional utility methods
    calculateBreakEvenPeriod(totalSavings, ivmiCost) {
        if (totalSavings <= 0) return 'N/A';
        return Math.ceil(ivmiCost / totalSavings * 12); // Return months
    }

    calculateROIPercentage(totalSavings, ivmiCost) {
        if (ivmiCost <= 0) return 0;
        return ((totalSavings / ivmiCost) * 100).toFixed(1);
    }

    // Export results for potential use in other applications
    exportResults() {
        const inputs = {
            hourlyWage: parseFloat(this.hourlyWage.value),
            hoursPerWeek: parseFloat(this.hoursPerWeek.value),
            workersCount: parseFloat(this.workersCount.value),
            annualShrinkage: parseFloat(this.annualShrinkage.value),
            inventoryValue: parseFloat(this.inventoryValue.value),
            countFrequency: parseFloat(this.countFrequency.value)
        };

        const results = {
            currentAnnualLaborCost: parseFloat(this.currentLaborCost.textContent.replace(/[$,]/g, '')),
            ivmiAnnualCost: parseFloat(this.ivmiCost.textContent.replace(/[$,]/g, '')),
            laborSavings: parseFloat(this.laborSavings.textContent.replace(/[$,]/g, '')),
            shrinkageSavings: parseFloat(this.shrinkageSavings.textContent.replace(/[$,]/g, '')),
            efficiencySavings: parseFloat(this.efficiencySavings.textContent.replace(/[$,]/g, '')),
            totalSavings: parseFloat(this.totalSavings.textContent.replace(/[$,]/g, ''))
        };

        return { inputs, results };
    }
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .savings-card {
        animation: fadeInUp 0.6s ease-out;
    }
`;
document.head.appendChild(style);

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new IVMIROICalculator();
    
    // Make calculator available globally for debugging
    window.ivmiCalculator = calculator;
    
    // Add some helpful tooltips and validation
    addInputValidation();
    addHelpfulTooltips();
});

function addInputValidation() {
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            const value = parseFloat(input.value);
            const min = parseFloat(input.min);
            const max = parseFloat(input.max);
            
            if (value < min) {
                input.value = min;
            } else if (value > max) {
                input.value = max;
            }
        });
    });
}

function addHelpfulTooltips() {
    // Add helpful information to the page
    const helpfulInfo = document.createElement('div');
    helpfulInfo.innerHTML = `
        <div style="background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 15px; margin: 20px 0; font-size: 0.9rem; color: #0c4a6e;">
            <strong>💡 Pro Tips:</strong>
            <ul style="margin: 10px 0 0 20px;">
                <li>iVMI typically reduces manual labor by 80% through automation</li>
                <li>Inventory shrinkage is reduced by 20% with real-time monitoring</li>
                <li>15-minute inventory updates vs. hours of manual counting</li>
                <li>Break-even period is typically 12 months or less</li>
            </ul>
        </div>
    `;
    
    const calculatorContainer = document.querySelector('.calculator-container');
    calculatorContainer.insertBefore(helpfulInfo, calculatorContainer.firstChild);
}

// Additional utility functions for advanced calculations
function calculateScenarioComparison() {
    const scenarios = {
        small: { workers: 1, inventory: 100000, shrinkage: 10000 },
        medium: { workers: 3, inventory: 500000, shrinkage: 50000 },
        large: { workers: 8, inventory: 2000000, shrinkage: 200000 }
    };
    
    return scenarios;
}

// Export functions for potential integration
window.IVMIUtils = {
    calculateROI: (inputs) => {
        // Standalone ROI calculation function
        const hourlyWage = inputs.hourlyWage || 25;
        const hoursPerWeek = inputs.hoursPerWeek || 40;
        const workersCount = inputs.workersCount || 2;
        const annualShrinkage = inputs.annualShrinkage || 50000;
        
        const currentAnnualLaborCost = hourlyWage * hoursPerWeek * 52 * workersCount;
        const ivmiAnnualCost = (500 + (50 * workersCount)) * 12;
        const laborSavings = currentAnnualLaborCost * 0.8;
        const netLaborSavings = laborSavings - ivmiAnnualCost;
        const shrinkageSavings = annualShrinkage * 0.2;
        
        return {
            currentAnnualLaborCost,
            ivmiAnnualCost,
            laborSavings,
            netLaborSavings,
            shrinkageSavings,
            totalSavings: netLaborSavings + shrinkageSavings
        };
    },
    
    getDefaultValues: () => ({
        hourlyWage: 25,
        hoursPerWeek: 40,
        workersCount: 2,
        annualShrinkage: 50000,
        inventoryValue: 500000,
        countFrequency: 4
    })
}; 