import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function ProductForm({ product }) {
    const {
        data,
        setData,
        put,
        post,
        processing,
        errors,
        delete: destroy,
    } = useForm({
        ...product,
    });

    const submit = (e) => {
        e.preventDefault();

        if (product) {
            put(route("product.update", { id: product.id }));
        } else {
            post(route("product.store"));
        }
    };

    return (
        <form onSubmit={submit}>
            <div>
                <InputLabel htmlFor="name" value="Name" />

                <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("name", e.target.value)}
                />

                <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="description" value="Description" />

                <TextInput
                    id="description"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("description", e.target.value)}
                />

                <InputError message={errors.description} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="price" value="Price" />

                <TextInput
                    id="price"
                    type="number"
                    name="price"
                    value={data.price}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("price", e.target.value)}
                />

                <InputError message={errors.price} className="mt-2" />
            </div>

            <div className="flex flex-col-reverse items-center justify-end mt-7 gap-4 md:flex-row">
                <PrimaryButton disabled={processing}>Register</PrimaryButton>
            </div>
        </form>
    );
}
