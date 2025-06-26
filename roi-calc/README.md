# iVMI ROI Calculator

A professional ROI calculator for iVMI's autonomous inventory management solution. Calculate potential savings from labor reduction, shrinkage prevention, and efficiency gains.

## Files Overview

- **`index.html`** - Standalone calculator page with full styling
- **`embed.html`** - Compact, self-contained version for embedding into existing websites
- **`calculator.js`** - Core calculator logic and functionality
- **`styles.css`** - Styling for the standalone version

## Usage Options

### Option 1: Standalone Calculator
Use `index.html` for a complete, standalone ROI calculator page. This includes:
- Full header and branding
- Complete styling
- All features and animations

### Option 2: Embed into Existing Website
Use `embed.html` for easy integration into your existing iVMI website. This version:
- Is self-contained (CSS and JS included)
- Has a compact design
- Removes unnecessary branding elements
- Fits well within existing page layouts

## How to Embed

### Method 1: Direct Embed
Simply copy the contents of `embed.html` and paste it into your existing webpage where you want the calculator to appear.

### Method 2: Iframe Embed
```html
<iframe src="path/to/embed.html" width="100%" height="800px" frameborder="0"></iframe>
```

### Method 3: Component Integration
Extract the calculator container from `embed.html` and integrate it into your existing page structure:

```html
<!-- Copy just the calculator-container div and its contents -->
<div class="calculator-container">
    <!-- Calculator content here -->
</div>
```

## Calculator Features

### Input Fields
- **Hourly Wage**: Average hourly rate for inventory workers
- **Hours per Week**: Weekly hours worked per employee
- **Number of Workers**: Total employees managing inventory
- **Annual Shrinkage**: Current annual inventory loss value
- **Inventory Value**: Total value of inventory
- **Count Frequency**: How often inventory is counted per month

### Calculated Savings
- **Labor Savings**: 80% reduction in manual labor costs
- **Shrinkage Reduction**: 20% reduction in inventory loss
- **Efficiency Gains**: Time saved from automated counting
- **Total Annual Savings**: Combined ROI from all sources

### Real-time Updates
- Calculations update automatically as users type
- Responsive design works on all devices
- Smooth animations for better user experience

## Customization

### Styling
The calculator uses a clean, modern design with:
- Inter font family
- Blue gradient primary colors
- Green accent for savings amounts
- Responsive grid layout

### Calculations
The ROI calculations are based on:
- 80% reduction in manual labor through automation
- 20% reduction in inventory shrinkage
- Efficiency gains from time saved on counting
- Conservative iVMI pricing estimates

### Pricing Model
- Base cost: $500/month
- Additional cost: $50/month per worker
- Annual cost calculated as: (Base + Per Worker × Workers) × 12

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- No external dependencies except Google Fonts

## Integration Tips

1. **Customize CTA Buttons**: Update the "Book Demo" and "Contact Sales" buttons to link to your actual contact forms
2. **Adjust Colors**: Modify the CSS variables to match your brand colors
3. **Add Analytics**: Track calculator usage with Google Analytics or similar tools
4. **A/B Testing**: Test different default values to optimize conversion rates

## Support

For questions about integration or customization, contact the development team.

## Features

### 🎯 Core Calculations
- **Labor Cost Savings**: Calculates 80% reduction in manual labor costs
- **Shrinkage Reduction**: Estimates 20% reduction in inventory shrinkage
- **Efficiency Gains**: Accounts for time saved from automated inventory counting
- **Total ROI**: Comprehensive view of all savings combined

### 📊 Interactive Elements
- Real-time calculations as you adjust inputs
- Professional, responsive design
- Animated results display
- Input validation and helpful tooltips
- Detailed breakdown of all cost components

### 🎨 User Experience
- Modern, professional design matching iVMI brand
- Mobile-responsive layout
- Smooth animations and transitions
- Clear call-to-action sections

## How It Works

### Input Parameters
1. **Hourly Wage**: Current hourly rate for inventory workers
2. **Hours per Week**: Weekly hours worked by each employee
3. **Number of Workers**: Total employees involved in inventory management
4. **Annual Inventory Shrinkage**: Current annual losses from shrinkage
5. **Total Inventory Value**: Total value of inventory being managed
6. **Inventory Count Frequency**: How often inventory is counted per month

### Calculation Logic

#### Labor Savings
```
Current Annual Labor Cost = Hourly Wage × Hours per Week × 52 weeks × Number of Workers
iVMI Annual Cost = (Base Cost + Per Worker Cost) × 12 months
Labor Savings = Current Labor Cost × 0.8 (80% reduction)
Net Labor Savings = Labor Savings - iVMI Cost
```

#### Shrinkage Reduction
```
Shrinkage Savings = Annual Shrinkage × 0.2 (20% reduction)
```

#### Efficiency Gains
```
Hours Saved per Count = 2 hours (average)
Annual Counts = Count Frequency × 12 months
Efficiency Savings = Hours Saved × Annual Counts × Hourly Wage × Workers × 0.5
```

#### Total Savings
```
Total Annual Savings = Net Labor Savings + Shrinkage Savings + Efficiency Savings
```

## Usage

### Basic Usage
1. Open `index.html` in a web browser
2. Adjust the input values to match your business scenario
3. View real-time calculations in the results section
4. Review the detailed breakdown for comprehensive analysis

### Programmatic Usage
```javascript
// Access the calculator instance
const calculator = window.ivmiCalculator;

// Get current results
const results = calculator.exportResults();

// Use utility functions
const roi = window.IVMIUtils.calculateROI({
    hourlyWage: 25,
    hoursPerWeek: 40,
    workersCount: 2,
    annualShrinkage: 50000
});
```

## File Structure

```
roi-calc/
├── index.html          # Main HTML file with calculator interface
├── styles.css          # CSS styles for modern, responsive design
├── calculator.js       # JavaScript logic for ROI calculations
└── README.md          # This documentation file
```

## Technical Details

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Grid and Flexbox for layout
- CSS animations and transitions

### Dependencies
- Google Fonts (Inter font family)
- No external JavaScript libraries required
- Pure vanilla JavaScript implementation

### Performance
- Real-time calculations with minimal lag
- Optimized for mobile devices
- Efficient DOM manipulation
- Responsive design for all screen sizes

## Business Benefits Highlighted

Based on [iVMI's website](https://www.ivmi.com/), the calculator demonstrates:

- **80% Reduction in Manual Labor**: Significant cost savings through automation
- **20% Less Shrinkage**: Real-time monitoring reduces inventory losses
- **15-Minute Inventory Updates**: Dramatic improvement over manual counting
- **12-Month Break-Even**: Typical ROI timeline for most businesses
- **0 Stockouts**: Prevent missed sales with automated alerts

## Customization

### Styling
- Modify `styles.css` to match your brand colors
- Adjust the gradient backgrounds and color scheme
- Customize animations and transitions

### Calculations
- Update calculation logic in `calculator.js`
- Modify the iVMI cost estimation formula
- Adjust savings percentages based on your data

### Content
- Update text content in `index.html`
- Modify the benefits section
- Customize call-to-action buttons

## Support

For questions about the ROI calculator or iVMI's inventory management solution:

- **Phone**: (510) 574-8933
- **Email**: sales@stockvue.ai
- **Website**: [https://www.ivmi.com/](https://www.ivmi.com/)

## License

This ROI calculator is created for iVMI's use. Please contact iVMI for licensing and usage terms.

---

*Built with modern web technologies to provide accurate, real-time ROI calculations for autonomous inventory management solutions.* 