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

  const cost_small_scale = 249; // Hardcoded small scale cost
  const cost_med_scale = 349; // Hardcoded medium scale cost
  const cost_large_scale = 549; // Hardcoded large scale cost
  const router_markup = 1.2; // Hardcoded router markup factor
  const cost_router = parseFloat(document.getElementById('cost_router').value);

  const other_cost = parseFloat(document.getElementById('other_cost').value);

  // Software costs
  const software_base_cost = parseFloat(document.getElementById('software_base_cost').value);

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
  const smallCount = parseFloat(document.getElementById('small_scale_count').value);
  const medCount = parseFloat(document.getElementById('med_scale_count').value);
  const largeCount = parseFloat(document.getElementById('large_scale_count').value);
  const numberScales = smallCount + medCount + largeCount;

  const costSmallTotal = smallCount * cost_small_scale;
  const costMedTotal = medCount * cost_med_scale;
  const costLargeTotal = largeCount * cost_large_scale;
  const routersNeeded = numberScales / 12 * router_markup;
  const costRouterTotal = routersNeeded * cost_router;

  const totalHardwareCost = costSmallTotal + costMedTotal + costLargeTotal + costRouterTotal;

  // Software cost calculation (recurring)
  const softwareScaleCount = parseFloat(document.getElementById('software_scale_count').value);
  const monthlySoftwareCost = Math.max(software_base_cost, softwareScaleCount * 1);
  const annualSoftwareCost = monthlySoftwareCost * 12;

  // One-time software costs
  const oneTimeSoftwareCosts = 0; // Assuming no one-time software costs

  // Total costs
  const year1Cost = totalHardwareCost + annualSoftwareCost + oneTimeSoftwareCosts + other_cost;
  const ongoingCost = annualSoftwareCost;

  // Calculate 5-year IRR
  const irr = calculateIRR(totalSavings, year1Cost, ongoingCost);

  // Update results with animation
  animateNumber('total_savings', totalSavings);
  animateNumber('total_cost', year1Cost);
  animateNumber('roi_pct', ((totalSavings - year1Cost) / year1Cost) * 100);
  animateNumber('irr_pct', irr * 100);

  // Update cost breakdown
  updateCostBreakdown(
    costSmallTotal, costMedTotal, costLargeTotal, costRouterTotal, totalHardwareCost,
    annualSoftwareCost, 0, 0, // Only show annual software cost, set per-scale and support to 0
    0, 0, annualSoftwareCost,
    other_cost
  );

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

function updateCostBreakdown(
  smallScalesCost, medScalesCost, largeScalesCost, routersCost, totalHardwareCost,
  baseLicenseCost, perScaleCost, supportCost, setupCost, trainingCost, totalSoftwareCost,
  otherCost
) {
  // Update hardware costs
  const elSmall = document.getElementById('small_scales_cost');
  if (elSmall) elSmall.textContent = `$${formatCurrency(smallScalesCost)}`;
  const elMed = document.getElementById('med_scales_cost');
  if (elMed) elMed.textContent = `$${formatCurrency(medScalesCost)}`;
  const elLarge = document.getElementById('large_scales_cost');
  if (elLarge) elLarge.textContent = `$${formatCurrency(largeScalesCost)}`;
  const elRouters = document.getElementById('routers_cost');
  if (elRouters) elRouters.textContent = `$${formatCurrency(routersCost)}`;
  const elTotalHardware = document.getElementById('total_hardware_cost');
  if (elTotalHardware) elTotalHardware.textContent = `$${formatCurrency(totalHardwareCost)}`;

  // Update software costs
  const elBaseLicense = document.getElementById('base_license_cost');
  if (elBaseLicense) elBaseLicense.textContent = `$${formatCurrency(baseLicenseCost)}`;
  const elPerScale = document.getElementById('per_scale_cost');
  if (elPerScale) elPerScale.textContent = `$${formatCurrency(perScaleCost)}`;
  const elSupport = document.getElementById('support_cost');
  if (elSupport) elSupport.textContent = `$${formatCurrency(supportCost)}`;
  const elSetup = document.getElementById('setup_cost');
  if (elSetup) elSetup.textContent = `$${formatCurrency(setupCost)}`;
  const elTraining = document.getElementById('training_cost');
  if (elTraining) elTraining.textContent = `$${formatCurrency(trainingCost)}`;
  const elTotalSoftware = document.getElementById('total_software_cost');
  if (elTotalSoftware) elTotalSoftware.textContent = `$${formatCurrency(totalSoftwareCost)}`;

  // Update other costs
  const elOtherDisplay = document.getElementById('other_costs_display');
  if (elOtherDisplay) elOtherDisplay.textContent = `$${formatCurrency(otherCost)}`;
  const elTotalOther = document.getElementById('total_other_cost');
  if (elTotalOther) elTotalOther.textContent = `$${formatCurrency(otherCost)}`;
}

function updateProjectionTable(totalSavings, year1Cost, ongoingCost, irr) {
  const tbody = document.querySelector('#projection-table tbody');
  tbody.innerHTML = '';
  
  for (let year = 1; year <= 5; year++) {
    const cost = year === 1 ? year1Cost : ongoingCost;
    const net = totalSavings - cost;
    const roi = (net / cost) * 100;
    const tr = document.createElement('tr');
    
    // Add animation delay for each row
    tr.style.animationDelay = `${year * 0.1}s`;
    tr.style.opacity = '0';
    tr.style.transform = 'translateY(20px)';
    
    tr.innerHTML = `
      <td><strong>Year ${year}</strong></td>
      <td>$${formatCurrency(totalSavings)}</td>
      <td>$${formatCurrency(cost)}</td>
      <td>$${formatCurrency(net)}</td>
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
    <td colspan="4"><strong>5-Year IRR</strong></td>
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
  
  // Automatically update Number of Scales (software_scale_count)
  function updateSoftwareScaleCount() {
    const small = parseInt(document.getElementById('small_scale_count').value) || 0;
    const med = parseInt(document.getElementById('med_scale_count').value) || 0;
    const large = parseInt(document.getElementById('large_scale_count').value) || 0;
    const totalScales = small + med + large;
    document.getElementById('software_scale_count').value = totalScales;
    // Auto-update software_base_cost: max(500, totalScales * 1)
    document.getElementById('software_base_cost').value = Math.max(500, totalScales * 1);
  }
  document.getElementById('small_scale_count').addEventListener('input', updateSoftwareScaleCount);
  document.getElementById('med_scale_count').addEventListener('input', updateSoftwareScaleCount);
  document.getElementById('large_scale_count').addEventListener('input', updateSoftwareScaleCount);
  // Initial update
  updateSoftwareScaleCount();
  
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
