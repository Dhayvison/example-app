import { Link, router } from "@inertiajs/react";
import SecondaryButton from "./SecondaryButton";

export default function Pagination({ meta }) {
    const { current_page: current, last_page: lastPage, links } = meta;
    const previousLink = links.shift();
    const nextLink = links.pop();
    const pages = Array.from(Array(lastPage).keys());

    return (
        <div className="flex items-center gap-2">
            <Link href={previousLink && previousLink.url}>
                <SecondaryButton
                    className="border-none"
                    disabled={current === 1}
                >
                    Previous
                </SecondaryButton>
            </Link>

            <select
                name="pagination"
                className="block appearance-none w-full px-4 py-2 pr-8 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                value={current}
                onChange={(e) => {
                    router.get(
                        route(route().current()),
                        { page: e.target.value },
                        {
                            replace: true,
                            preserveState: true,
                        }
                    );
                }}
            >
                {pages.map((number) => {
                    number++;
                    return (
                        <option value={number} key={number}>
                            {number}
                        </option>
                    );
                })}
            </select>

            <div className="whitespace-nowrap">of {lastPage}</div>

            <Link href={nextLink && nextLink.url}>
                <SecondaryButton
                    className="border-none"
                    disabled={current === lastPage}
                >
                    Next
                </SecondaryButton>
            </Link>
        </div>
    );
}
