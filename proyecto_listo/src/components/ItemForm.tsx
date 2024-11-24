import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ItemRequest } from "../interfaces/item/ItemRequest";
import { item } from '../services/item/item';
import { category } from "../services/category/category"; // Importa el servicio de categorías
import { CategoryResponse } from "../interfaces/category/CategoryResponse";

interface ItemFormProps {
    initialData: Omit<ItemRequest, "user_id" | "category_id">; // No incluir user_id ni category_id
    onSubmitSuccess: (response: any) => void;
    onSubmitError: (error: any) => void;
}

export default function ItemForm({
                                     initialData,
                                     onSubmitSuccess,
                                     onSubmitError,
                                 }: ItemFormProps) {
    const [formData, setFormData] = useState<Omit<ItemRequest, "user_id" | "category_id">>(
        initialData
    );
    const [categories, setCategories] = useState<CategoryResponse[]>([]); // Estado para las categoría
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // Categoría seleccionada
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Cargar categorías al montar el componente
    useEffect(() => {
        async function fetchCategories() {
            try {
                const categoryList = await category.getAllCategories();
                setCategories(categoryList);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("Error desconocido.");
                }
            }
        }

        fetchCategories().catch(console.error); // Maneja promesas no resueltas
    }, []);

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
        setSelectedCategory(Number(e.target.value));
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrorMessage(null);

        if (selectedCategory === null) {
            setErrorMessage("Por favor selecciona una categoría.");
            return;
        }

        try {
            const response = await item.createItem({
                ...formData,
                category_id: selectedCategory,
            } as ItemRequest);
            onSubmitSuccess(response);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Error desconocido al registrar el ítem.");
            }
            onSubmitError(error);
        }
    }

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white shadow-md rounded px-8 py-6 border-4 border-blue-700"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Registrar Ítem</h2>

                {/* Espacio para el mensaje de error */}
                {errorMessage && (
                    <div className="text-red-600 text-sm mb-4 text-center">{errorMessage}</div>
                )}

                {/* Input para Nombre */}
                <div className="mb-4 relative flex items-center">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                        placeholder="Nombre del ítem"
                        required
                    />
                </div>

                {/* Input para Descripción */}
                <div className="mb-4 relative flex items-center">
          <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              placeholder="Descripción del ítem"
              required
          ></textarea>
                </div>

                {/* Selector para Categorías */}
                <div className="mb-4 relative flex items-center">
                    <select
                        name="category"
                        id="category"
                        value={selectedCategory || ""}
                        onChange={handleCategoryChange}
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                        required
                    >
                        <option value="" disabled>
                            Selecciona una categoría
                        </option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Selector para Condición */}
                <div className="mb-4 relative flex items-center">
                    <select
                        name="condition"
                        id="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                    >
                        <option value="NEW">Nuevo</option>
                        <option value="USED">Usado</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none"
                >
                    Registrar Ítem
                </button>
            </form>
        </section>
    );
}
