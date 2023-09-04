export default function Loading({ size = 2, className }) {
    return (
        <div
            className={`animate-spin rounded-full h-${size} w-${size} border-t-2 border-white-500 ${className}`}
        ></div>
    );
}
