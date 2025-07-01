function calculateROI() {
  // Add loading state to button
  const button = document.querySelector('.calculate-btn');
  button.classList.add('loading');
  button.textContent = 'Calculating...';
  
  // Simulate a small delay for better UX
  setTimeout(() => {
    performCalculation();
    button.classList.remove('loading');
    button.textContent = 'Calculate ROI';
    
    // Scroll to results after calculation
    setTimeout(scrollToResults, 300);
  }, 800);
}

function performCalculation() {
  // Inputs
  const inv_count = parseFloat(document.getElementById('inv_count').value);
  const cost_per_piece = parseFloat(document.getElementById('cost_per_piece').value);
  const items_in_stock = parseFloat(document.getElementById('items_in_stock').value);
  const reduction_carrying = parseFloat(document.getElementById('reduction_carrying').value) / 100;

  const personnel = parseFloat(document.getElementById('personnel').value);
  const cost_per_person = parseFloat(document.getElementById('cost_per_person').value);
  const reduction_personnel = parseFloat(document.getElementById('reduction_personnel').value);

  const shrinkage_pct = parseFloat(document.getElementById('shrinkage_pct').value) / 100;
  const reduction_shrinkage = parseFloat(document.getElementById('reduction_shrinkage').value) / 100;

  const stockouts_per_year = parseFloat(document.getElementById('stockouts_per_year').value);
  const loss_per_stockout = parseFloat(document.getElementById('loss_per_stockout').value);
  const reduction_stockouts = parseFloat(document.getElementById('reduction_stockouts').value);

  const pct_on_stockvue = parseFloat(document.getElementById('pct_on_stockvue').value) / 100;
  const pct_small_scale = parseFloat(document.getElementById('pct_small_scale').value) / 100;
  const pct_med_scale = parseFloat(document.getElementById('pct_med_scale').value) / 100;
  const pct_large_scale = parseFloat(document.getElementById('pct_large_scale').value) / 100;
  const cost_small_scale = 249; // Hardcoded small scale cost
  const cost_med_scale = 349; // Hardcoded medium scale cost
  const cost_large_scale = 549; // Hardcoded large scale cost
  const router_markup = 1.2; // Hardcoded router markup factor
  const cost_router = parseFloat(document.getElementById('cost_router').value);

  const other_cost = parseFloat(document.getElementById('other_cost').value);

  // Calculations
  const averageInventory = items_in_stock * cost_per_piece * inv_count;
  const annualInventory = averageInventory * 12;
  const savingsCarrying = annualInventory * reduction_carrying;

  const savingsLabor = (personnel - reduction_personnel) * 12 * cost_per_person;

  const shrinkageLoss = annualInventory * shrinkage_pct;
  const savingsShrinkage = shrinkageLoss * reduction_shrinkage * -1;

  const savingsStockoutLoss = (loss_per_stockout * stockouts_per_year) * -1;
  const savingsStockouts = (loss_per_stockout * reduction_stockouts) * -1;

  const totalSavings = savingsCarrying + savingsLabor + savingsShrinkage + savingsStockoutLoss + savingsStockouts;

  // Hardware cost
  const numberScales = inv_count * pct_on_stockvue;
  const smallCount = numberScales * pct_small_scale;
  const medCount = numberScales * pct_med_scale;
  const largeCount = numberScales * pct_large_scale;

  const costSmallTotal = smallCount * cost_small_scale;
  const costMedTotal = medCount * cost_med_scale;
  const costLargeTotal = largeCount * cost_large_scale;
  const routersNeeded = numberScales / 12 * router_markup;
  const costRouterTotal = routersNeeded * cost_router;

  const totalHardwareCost = costSmallTotal + costMedTotal + costLargeTotal + costRouterTotal;

  // Software cost
  const monthlySoftware = Math.max(500, numberScales * 1);
  const totalSoftwareCost = monthlySoftware * 12;

  const year1Cost = totalHardwareCost + totalSoftwareCost + other_cost;
  const ongoingCost = totalSoftwareCost;

  // Calculate 5-year IRR
  const irr = calculateIRR(totalSavings, year1Cost, ongoingCost);

  // Update results with animation
  animateNumber('total_savings', totalSavings);
  animateNumber('total_cost', year1Cost);
  animateNumber('roi_pct', ((totalSavings - year1Cost) / year1Cost) * 100);
  animateNumber('irr_pct', irr * 100);

  // 5-Year Projection
  updateProjectionTable(totalSavings, year1Cost, ongoingCost, irr);
}

// Calculate IRR using Newton-Raphson method
function calculateIRR(annualSavings, initialCost, ongoingCost) {
  const cashFlows = [
    -initialCost, // Year 0: Initial investment (negative)
    annualSavings - ongoingCost, // Year 1: Net cash flow
    annualSavings - ongoingCost, // Year 2: Net cash flow
    annualSavings - ongoingCost, // Year 3: Net cash flow
    annualSavings - ongoingCost, // Year 4: Net cash flow
    annualSavings - ongoingCost  // Year 5: Net cash flow
  ];

  // Newton-Raphson method to find IRR
  let guess = 0.1; // Start with 10% guess
  const tolerance = 0.0001;
  const maxIterations = 100;

  for (let i = 0; i < maxIterations; i++) {
    const npv = calculateNPV(cashFlows, guess);
    const derivative = calculateNPVDerivative(cashFlows, guess);
    
    if (Math.abs(derivative) < tolerance) {
      break; // Avoid division by zero
    }
    
    const newGuess = guess - npv / derivative;
    
    if (Math.abs(newGuess - guess) < tolerance) {
      guess = newGuess;
      break;
    }
    
    guess = newGuess;
  }

  // Validate IRR is reasonable (between -100% and 1000%)
  if (guess < -1 || guess > 10) {
    return 0; // Return 0% if IRR is unreasonable
  }

  return guess;
}

// Calculate Net Present Value
function calculateNPV(cashFlows, rate) {
  let npv = 0;
  for (let i = 0; i < cashFlows.length; i++) {
    npv += cashFlows[i] / Math.pow(1 + rate, i);
  }
  return npv;
}

// Calculate derivative of NPV (for Newton-Raphson)
function calculateNPVDerivative(cashFlows, rate) {
  let derivative = 0;
  for (let i = 1; i < cashFlows.length; i++) {
    derivative -= i * cashFlows[i] / Math.pow(1 + rate, i + 1);
  }
  return derivative;
}

function animateNumber(elementId, targetValue) {
  const element = document.getElementById(elementId);
  if (!element) return; // Skip if element doesn't exist
  
  const startValue = parseFloat(element.innerText) || 0;
  const duration = 1000; // 1 second
  const startTime = performance.now();
  
  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = startValue + (targetValue - startValue) * easeOutQuart;
    
    if (elementId === 'roi_pct' || elementId === 'irr_pct') {
      element.innerText = currentValue.toFixed(2);
    } else {
      element.innerText = formatCurrency(currentValue);
    }
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }
  
  requestAnimationFrame(updateNumber);
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function updateProjectionTable(totalSavings, year1Cost, ongoingCost, irr) {
  const tbody = document.querySelector('#projection-table tbody');
  tbody.innerHTML = '';
  
  for (let year = 1; year <= 5; year++) {
    const cost = year === 1 ? year1Cost : ongoingCost;
    const roi = ((totalSavings - cost) / cost) * 100;
    const tr = document.createElement('tr');
    
    // Add animation delay for each row
    tr.style.animationDelay = `${year * 0.1}s`;
    tr.style.opacity = '0';
    tr.style.transform = 'translateY(20px)';
    
    tr.innerHTML = `
      <td><strong>Year ${year}</strong></td>
      <td>$${formatCurrency(totalSavings)}</td>
      <td>$${formatCurrency(cost)}</td>
      <td><span class="roi-value ${roi >= 0 ? 'positive' : 'negative'}">${roi.toFixed(2)}%</span></td>
    `;
    
    tbody.appendChild(tr);
    
    // Animate row appearance
    setTimeout(() => {
      tr.style.transition = 'all 0.5s ease';
      tr.style.opacity = '1';
      tr.style.transform = 'translateY(0)';
    }, year * 100);
  }
  
  // Add IRR row
  const irrRow = document.createElement('tr');
  irrRow.className = 'irr-row';
  irrRow.innerHTML = `
    <td colspan="3"><strong>5-Year IRR</strong></td>
    <td><span class="irr-value ${irr >= 0 ? 'positive' : 'negative'}">${(irr * 100).toFixed(2)}%</span></td>
  `;
  tbody.appendChild(irrRow);
}

// Add input validation and real-time feedback
document.addEventListener('DOMContentLoaded', function() {
  // Add input event listeners for real-time validation
  const inputs = document.querySelectorAll('input[type="number"]');
  
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      // Add visual feedback for valid/invalid inputs
      if (this.value < 0) {
        this.style.borderColor = '#e74c3c';
        this.style.backgroundColor = '#fdf2f2';
      } else {
        this.style.borderColor = '#667eea';
        this.style.backgroundColor = '#f8f9fa';
      }
    });
    
    // Add focus effects
    input.addEventListener('focus', function() {
      this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'scale(1)';
    });
  });
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
      calculateROI();
    }
  });
  
  // Add tooltip for keyboard shortcut
  const button = document.querySelector('.calculate-btn');
  button.title = 'Press Ctrl+Enter to calculate';
  
  // Initial calculation on page load
  setTimeout(() => {
    calculateROI();
  }, 500);
});

// Add smooth scrolling for better UX
function scrollToResults() {
  const resultsSection = document.querySelector('.results-section');
  resultsSection.scrollIntoView({ 
    behavior: 'smooth',
    block: 'start'
  });
}
