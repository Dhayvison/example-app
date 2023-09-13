export default function Paper({ children }) {
    return (
        <div className="p-4 mt-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            {children}
        </div>
    );
}
