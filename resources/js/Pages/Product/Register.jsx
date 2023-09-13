import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import Container from "@/Components/Container";
import ProductForm from "./Partials/ProductForm";
import Paper from "@/Components/Paper";

export default function Register({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create Product
                </h2>
            }
        >
            <Head title="Create Product" />

            <div className="py-12">
                <Container>
                    <div className="flex items-center justify-end px-4 sm:px-0">
                        <Link href={route("product")}>
                            <SecondaryButton>Return</SecondaryButton>
                        </Link>
                    </div>

                    <Paper>
                        <ProductForm />
                    </Paper>
                </Container>
            </div>
        </AuthenticatedLayout>
    );
}
