export default function VideoPlayer({ showFocusPeaking }) {
    return (
        <div className="relative w-[640px] h-[360]">
            <video id="video" className="w-full h-full" src="public/exploreHD-Focus.mp4" controls />
            {showFocusPeaking && <div className="absolute inset-0 bg-red-500 opacity-30" />}
        </div>
    )
}
