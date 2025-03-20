# Camera Focus Peaking Application

This application demonstrates focus peaking on video content. Focus peaking is a camera feature that highlights areas of high contrast in an image, which typically correspond to areas that are in sharp focus.

## Features

- Load and play the provided sample video
- Apply real-time focus peaking overlay to highlight in-focus areas
- Customizable overlay color (red, green, blue, yellow, white)
- Adjustable sensitivity settings
- Responsive user interface built with React and Tailwind CSS

## Technical Overview

### Implementation Approach

The focus peaking algorithm works by:

1. Converting each video frame to grayscale
2. Applying edge detection using a Sobel operator to detect high-contrast areas
3. Thresholding the result to identify sharp edges
4. Overlaying a colored highlight on these areas

The application uses a dual approach:

- Client-side processing in the browser using JavaScript for instant feedback
- Optional backend support using Python with OpenCV for more advanced processing

### Screenshots

#### Focus Peaking Disabled

![Focus Peaking Off](screenshots/focus-peaking-off.png)

#### Focus Peaking Enabled

![Focus Peaking On](screenshots/focus-peaking-on.png)

## Installation

### Prerequisites

- Node.js v16.0.0 or later
- Python 3.10 or later
- pip3

### Setup

1. Clone this repository:

   ```
   git clone <repository-url>
   cd camera-focus-peak
   ```

2. Run the installation script:

   ```
   chmod +x install.sh
   ./install.sh
   ```

   This script will:

   - Install all required Node.js dependencies
   - Install required Python packages (OpenCV, Flask, NumPy)
   - Download the sample video

## Usage

1. Start the application:

   ```
   chmod +x run.sh
   ./run.sh
   ```

2. The application will open in your default browser at `http://localhost:3000`

3. Use the interface controls to:
   - Toggle focus peaking on/off
   - Change the highlight color
   - Adjust sensitivity settings

## Implementation Details

### Frontend

- Built with React.js
- Uses a custom focus peaking algorithm in JavaScript
- Canvas-based overlay for real-time highlighting
- Components styled with Tailwind CSS

### Backend (Optional)

- Python Flask server for more advanced video processing
- OpenCV for computer vision operations
- Provides an alternative processing API for the frontend

```
camera-focus-peak/
├── backend/              # Python backend with OpenCV processing
│   └── server.py
├── frontend/
│   └── src/              # React application source code
│       ├── components/   # React components
|       |   ├── ui/
|       |   |   ├── button.jsx   # Toggle for activating focus peak
|       |   |   └── slider.jsx   # Adjusts sensitivity while focus peak is toggled
│       │   ├── FocusPeaking.js  # Core focus peaking implementation
│       │   └── VideoPlayer.js   # Video player component
|       ├── lib/
|       |   ├── utils.js  # Contains cn function for merging Tailwind
│       ├── App.js        # Main application component
|       |   index.css     # Overall CSS
│       └── index.js      # React entry point
├── public/               # Static assets
│   ├── exploreHD-Focus.mp4  # Sample video
|   └── index.html           # HTML page for activating application
├── install.sh            # Installation script
├── package-lock.json     # Houses all overarching dependencies
├── package.json          # Houses all dependencies on frontend
├── postcss.config.js     # Completes Tailwind integration
├── run.sh                # Run script
├── tailwind.config.js    # All implementations
└── README.md             # This file
```
