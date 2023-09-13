import { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import ProductForm from "./Partials/ProductForm";
import Container from "@/Components/Container";
import Paper from "@/Components/Paper";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";

export default function Edit({ auth, product }) {
    const [showConfirmDeletionModal, setShowConfirmDeletionModal] =
        useState(false);
    const { processing, delete: destroy } = useForm({
        id: product.id,
    });

    const deleteProduct = (e) => {
        e.preventDefault();

        destroy(route("product.destroy", { id: product.id }), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Edit Product
                </h2>
            }
        >
            <Head title="Create Product" />

            <div className="py-12">
                <Container>
                    <div className="flex items-center justify-end px-4 gap-2 sm:px-0">
                        <DangerButton
                            onClick={() => {
                                setShowConfirmDeletionModal(true);
                            }}
                        >
                            Delete product
                        </DangerButton>
                        <Link href={route("product")}>
                            <SecondaryButton>Return</SecondaryButton>
                        </Link>
                    </div>
                    <Paper>
                        <ProductForm product={product}></ProductForm>
                    </Paper>

                    <Modal
                        show={showConfirmDeletionModal}
                        onClose={() => setShowConfirmDeletionModal(false)}
                    >
                        <form onSubmit={deleteProduct} className="p-6">
                            <h2 className="text-lg font-medium">
                                Are you sure you want to delete this product?
                            </h2>

                            <div className="mt-6 flex justify-end">
                                <SecondaryButton
                                    onClick={() =>
                                        setShowConfirmDeletionModal(false)
                                    }
                                >
                                    Cancel
                                </SecondaryButton>

                                <DangerButton
                                    className="ml-3"
                                    disabled={processing}
                                >
                                    Delete
                                </DangerButton>
                            </div>
                        </form>
                    </Modal>
                </Container>
            </div>
        </AuthenticatedLayout>
    );
}
