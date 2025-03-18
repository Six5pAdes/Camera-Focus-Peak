import React, { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import { Button } from "@/components/ui/button";

const App = () => {
    const [showFocusPeaking, setShowFocusPeaking] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-2x1 font-bold mb-4">Focus Peaking App</h1>
            <VideoPlayer showFocusPeaking={showFocusPeaking} />
            <Button
                onClick={() => setShowFocusPeaking(!showFocusPeaking)}
                className="mt-4"
            >
                {showFocusPeaking ? "Disable" : "Enable"} Focus Peaking
            </Button>
        </div>
    );
};

export default App;
