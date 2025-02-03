import { useCallback } from "react";

/**
 * Custom hook to debounce a callback function.
 * @param {Function} callback - The callback function to debounce.
 * @param {number} delay - The delay in milliseconds before the callback is invoked.
 * @returns {Function} - The debounced version of the callback function.
 */
const useDebounceCallback = (callback, delay) => {
    return useCallback(
        (...args) => {
            const handler = setTimeout(() => {
                callback(...args); // Invoke the callback with the passed arguments
            }, delay);

            // Clean up the timeout on component unmount or argument changes
            return () => clearTimeout(handler);
        },
        [callback, delay] // Re-create the debounced function if the callback or delay changes
    );
};

export default useDebounceCallback;
