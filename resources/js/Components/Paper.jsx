export default function Paper({ children }) {
    return (
        <div className="p-4 mt-4 sm:p-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow sm:rounded-lg">
            {children}
        </div>
    );
}
