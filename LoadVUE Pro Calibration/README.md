# LoadVUE Pro Calibration

A comprehensive web-based calibration utility for LoadVUE Pro sensors, providing real-time data acquisition, multi-point calibration, and sensor configuration capabilities.

## 🚀 Features

### Core Functionality
- **Serial Communication**: Direct connection to LoadVUE Pro sensors via Web Serial API
- **Real-time Data Acquisition**: Live sensor readings with configurable averaging
- **Multi-directional Calibration**: Support for both compression-only and compression+tension calibration modes
- **Advanced Plotting**: Real-time force vs time graphs with cumulative and strip chart modes
- **Data Logging**: Comprehensive data logging with CSV export functionality

### Calibration Methods

#### 1. 2-Point Calibration
- Simple linear calibration using two known load points
- Automatic slope and intercept calculation
- R² goodness-of-fit calculation for calibration quality assessment
- Direct sensor programming capability

#### 2. Multi-Point Calibration
- Advanced cubic curve fitting for higher accuracy
- Support for up to 9 calibration points per direction
- Separate compression and tension calibration points
- Real-time raw value plotting during calibration
- R² goodness-of-fit calculation for both linear and cubic fits

#### 3. Sensor Configuration
- **Sensor ID Management**: Set and burn unique sensor identifiers
- **Capacity Configuration**: Configure sensor capacity values
- **Unit Selection**: Support for lb, kg, g, and N units
- **Baud Rate Configuration**: Adjustable communication speed

### Data Visualization
- **Real-time Plotting**: Live force vs time graphs
- **Peak/Low Tracking**: Automatic tracking of maximum and minimum values
- **Configurable Resolution**: Adjustable decimal precision (x, x.x, x.xx)
- **Averaging Options**: Configurable data averaging (1, 10, 50, 100 samples)

## 🛠️ Technical Requirements

### Browser Compatibility
- **Chrome/Chromium**: Full support with Web Serial API
- **Edge**: Full support with Web Serial API
- **Firefox**: Limited support (Web Serial API not available)
- **Safari**: Limited support (Web Serial API not available)

### Hardware Requirements
- LoadVUE Pro sensor with serial communication capability
- USB-to-serial adapter (if required)
- Compatible operating system (Windows, macOS, Linux)

## 📋 Installation & Setup

### 1. Open the Application
- Open provided LoadVUE Calibration Tool link in a compatible web browser
- Ensure the browser supports Web Serial API

### 2. Connect to Sensor
1. Click "Connect Serial Port" button
2. Select your LoadVUE Pro sensor from the port list
3. Verify connection status in the top banner

## 📖 Usage Guide

### Initial Setup

#### 1. Sensor Configuration
Navigate to the **Specifications** tab to configure basic sensor parameters:

- **Sensor ID**: Set unique identifier for the sensor
- **Capacity**: Configure maximum load capacity
- **Units**: Select measurement units (lb, kg, g, N)
- **Calibration Mode**: Choose single-direction or bi-directional calibration
- **Baud Rate**: Set communication speed (default: 9600)

#### 2. 2-Point Calibration
1. Navigate to **2-Point Calibration** tab
2. Enter two different known loads (e.g., 0 and 100)
3. Click "Capture" for each load to record raw sensor values
4. Click "Calculate Calibration" to view linear fit parameters and R² value
5. Click "Burn 2-Point Calibration" to save to sensor

#### 3. Multi-Point Calibration
1. Navigate to **Multi-Point Calibration** tab
2. Configure calibration mode (compression-only or bi-directional)
3. Enter known loads for each calibration point
4. Click "Capture" to record raw values for each point
5. Use real-time plotting to monitor sensor stability
6. Click "Calculate Calibration" to view cubic fit parameters and R² values
7. Click "Burn Calibration" to save to sensor

### Real-time Monitoring

#### 1. Verify Calibration
Navigate to the **Verify Calibration** tab for real-time monitoring:

- **Live Readings**: Real-time force measurements
- **Peak/Low Tracking**: Automatic tracking of maximum and minimum values
- **Configurable Resolution**: Adjust decimal precision
- **Unit Conversion**: Real-time unit conversion
- **Averaging**: Configurable data averaging

#### 2. Data Visualization
- **Cumulative Graph**: Shows all data points over time
- **Strip Chart**: Shows recent data points in scrolling format
- **Real-time Updates**: Live graph updates during data acquisition

#### 3. Data Logging
- **Automatic Logging**: All readings are automatically logged
- **CSV Export**: Download data as CSV file
- **Timestamp Tracking**: Automatic timestamp for each reading

### Data Management

#### 1. Data Tab
Navigate to the **Data** tab to view and manage logged data:

- **Real-time Table**: Live data table with timestamps
- **Peak/Low Display**: Current peak and low values
- **Data Export**: Save data as CSV file

#### 2. Exporting Data
1. Click "Save Data" button
2. Enter filename when prompted
3. CSV file will be downloaded with:
   - Sensor configuration information
   - Timestamp and reading data
   - Peak and low values

## 🔧 Advanced Features

### Calibration Modes

#### Single Direction (NCAL Mode 1)
- Calibration using compression points only
- Suitable for sensors that only measure compression
- Faster calibration process

#### Bi-directional (NCAL Mode 2)
- Calibration using both compression and tension points
- Higher accuracy for sensors measuring both directions
- More comprehensive calibration data

### Mathematical Models

#### Linear Fit (2-Point)
```
raw = slope × weight + intercept
```
The application calculates R² (coefficient of determination) to assess the quality of the linear fit. R² values closer to 1.0 indicate better fit quality.

#### Cubic Fit (Multi-Point)
```
raw = a×weight³ + b×weight² + c×weight + d
```
For multi-point calibration, the application provides R² values for both linear and cubic fits, allowing users to compare fit quality and choose the most appropriate model.

### Communication Protocol

The application communicates with LoadVUE Pro sensors using the following commands:

- `W\r` - Get current weight
- `R\r` - Get raw ADC value
- `UNITS\r` - Get current units
- `ct0\r` - Tare command
- `ss1 [ID]\r` - Set sensor ID
- `slc [capacity]\r` - Set sensor capacity
- `unit [units]\r` - Set sensor units
- `ncal [mode]\r` - Set calibration mode
- `CCA [value]\r` - Set cubic coefficient A
- `CCB [value]\r` - Set cubic coefficient B
- `CCC [value]\r` - Set cubic coefficient C
- `CCD [value]\r` - Set cubic coefficient D
- `FAZ [value]\r` - Set offset value

## 🎨 User Interface

### Design Features
- **Modern UI**: Clean, professional interface design
- **Responsive Layout**: Adapts to different screen sizes
- **Tab-based Navigation**: Organized functionality in logical tabs
- **Real-time Feedback**: Immediate visual feedback for all operations
- **Color-coded Elements**: Intuitive color scheme for different functions

### Key Interface Elements
- **Top Banner**: Connection status and main controls
- **Tab Navigation**: Easy switching between different functions
- **Real-time Displays**: Large, clear reading displays
- **Interactive Plots**: Zoomable and responsive charts
- **Data Tables**: Organized data presentation

## 🔍 Troubleshooting

### Common Issues

#### Connection Problems
1. **Port Not Found**: Ensure sensor is properly connected
2. **Permission Denied**: Grant serial port access when prompted
3. **Baud Rate Mismatch**: Verify baud rate matches sensor configuration

#### Calibration Issues
1. **Invalid Readings**: Ensure sensor is stable before capturing
2. **Poor Fit**: Use more calibration points for better accuracy
3. **Low R² Values**: Check sensor stability and consider using more calibration points
4. **Burn Failures**: Check sensor communication and try again

#### Data Issues
1. **Missing Data**: Verify sensor connection is stable
2. **Export Failures**: Check browser download permissions
3. **Graph Issues**: Refresh page if charts become unresponsive

### Performance Tips
- Use appropriate averaging settings for your application
- Close unnecessary browser tabs to improve performance
- Ensure stable sensor connection for reliable readings
- Use appropriate resolution settings for your needs

## 📊 Data Format

### CSV Export Format
```csv
Data Log
ID: [Sensor ID]
Capacity: [Capacity Value]
Units: [Unit Type]
Test Date: [Date]

Time,Reading,Peak,Low
[Timestamp],[Reading Value],[Peak Value],[Low Value]
```

### Real-time Data Structure
- **Timestamp**: Local time of reading
- **Reading**: Current force measurement
- **Peak**: Maximum value since last tare
- **Low**: Minimum value since last tare

## 🤝 Contributing

We welcome contributions to improve the LoadVUE Pro Calibration application. Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For technical support or questions about the LoadVUE Pro Calibration application:

- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Documentation**: Check this README for usage instructions
- **Contact**: Reach out to the development team for additional support

## 🔄 Version History

### Current Version
- **Version**: 1.0.0
- **Release Date**: [Current Date]
- **Features**: Full calibration suite with real-time monitoring

### Planned Features
- Enhanced data analysis tools
- Additional calibration methods
- Improved user interface
- Extended sensor compatibility

---

**LoadVUE Pro Calibration** - Professional sensor calibration and monitoring solution for LoadVUE Pro sensors.
