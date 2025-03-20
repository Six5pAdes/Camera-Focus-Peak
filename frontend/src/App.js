import React, { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import { Button } from "./components/ui/button";
import { Slider } from "./components/ui/slider";

const App = () => {
    const [showFocusPeaking, setShowFocusPeaking] = useState(false);
    const [peakingColor, setPeakingColor] = useState("#ff0000");
    const [sensitivity, setSensitivity] = useState(30);

    const colorOptions = [
        { name: "Red", value: "#ff0000" },
        { name: "Green", value: "#00ff00" },
        { name: "Blue", value: "#0000ff" },
        { name: "Yellow", value: "#ffff00" },
        { name: "White", value: "#ffffff" },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <h1 className="text-3xl font-bold mb-6">Focus Peaking Demo</h1>

            <VideoPlayer
                showFocusPeaking={showFocusPeaking}
                peakingColor={peakingColor}
                sensitivity={sensitivity}
            />

            <div className="mt-6 w-full max-w-[640px] space-y-4">
                <Button
                    onClick={() => setShowFocusPeaking(!showFocusPeaking)}
                    className={`w-full ${showFocusPeaking ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                    {showFocusPeaking ? "Disable" : "Enable"} Focus Peaking
                </Button>

                {showFocusPeaking && (
                    <>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium">Peaking Color</label>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {colorOptions.map((color) => (
                                    <div
                                        key={color.value}
                                        className={`w-8 h-8 rounded-full cursor-pointer border-2 ${peakingColor === color.value
                                            ? "border-white"
                                            : "border-transparent"
                                            }`}
                                        style={{ backgroundColor: color.value }}
                                        onClick={() => setPeakingColor(color.value)}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm font-medium">Sensitivity: {sensitivity}</label>
                            </div>
                            <Slider
                                value={[sensitivity]}
                                min={10}
                                max={50}
                                step={1}
                                onValueChange={(value) => setSensitivity(value[0])}
                            />
                        </div>
                    </>
                )}
            </div>

            <div className="mt-8 text-gray-400 text-sm max-w-[640px]">
                <p>Focus peaking highlights areas of high contrast in the video, indicating regions that are in sharp focus.</p>
                <p className="mt-2">Adjust the sensitivity to fine-tune detection and change the highlight color to improve visibility.</p>
            </div>
        </div>
    );
};

export default App;
