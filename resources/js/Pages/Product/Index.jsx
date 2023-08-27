import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ auth, products }) {
    const { data, meta } = products;

    console.log(data, meta);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Products
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-end px-4 sm:px-0">
                        <Link href={route("product.create")}>
                            <PrimaryButton>Register</PrimaryButton>
                        </Link>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg mt-4">
                        <div className="w-full mx-auto p-4">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="px-2 py-3 text-left text-xs uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th className="px-2 py-3 text-left text-xs uppercase tracking-wider max-w-xl">
                                            Description
                                        </th>
                                        <th className="px-2 py-3 text-left text-xs uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-2 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((product) => {
                                        return (
                                            <tr key={product.id}>
                                                <td className="px-2 py-4 whitespace-no-wrap border-b ">
                                                    {product.name}
                                                </td>
                                                <td className="px-2 py-4 whitespace-no-wrap border-b max-w-md">
                                                    {product.description}
                                                </td>
                                                <td className="px-2 py-4 whitespace-no-wrap border-b max-w-md">
                                                    {`R$ ${product.price}`}
                                                </td>
                                                <td className="px-2 py-4 whitespace-no-wrap border-b ">
                                                    <Link
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                        href={route(
                                                            "product.edit",
                                                            product.id
                                                        )}
                                                    >
                                                        Edit
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
