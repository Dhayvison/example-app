import { Head } from "@inertiajs/react";
import Container from "@/Components/Container";
import Paper from "@/Components/Paper";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard({ auth }) {
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
                        <Paper>You're logged in!</Paper>
                    </div>
                </Container>
            </div>
        </AuthenticatedLayout>
    );
}
