import Container from "@/Components/Container";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useAsync, useFetch } from "react-async";

const loadDolarData = () =>
    fetch(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/gusd/brl.json"
    ).then((res) => res.json());

export default function Dashboard({ auth }) {
    const { data, error, isPending, run } = useAsync({
        promiseFn: loadDolarData,
    });

    useEffect(() => {
        run();
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <Container>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                You're logged in!
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="flex justify-between">
                                    <small>1 US dollar is equal to</small>
                                    {isPending ? (
                                        <small className="animate-pulse w-1/3 h-4 bg-slate-700 rounded"></small>
                                    ) : (
                                        <small>
                                            {new Date(
                                                data.date
                                            ).toLocaleDateString()}
                                        </small>
                                    )}
                                </div>
                                <div className="text-4xl">
                                    {isPending ? (
                                        <div className="animate-pulse w-1/3 h-10 bg-slate-700 rounded"></div>
                                    ) : (
                                        new Intl.NumberFormat("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        }).format(data.brl)
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </AuthenticatedLayout>
    );
}
