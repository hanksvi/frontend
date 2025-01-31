import ItemForm from "../components/ItemForm";

function RegisterItemPage() {
    const initialData = {
        name: "",
        description: "",
        condition: "NEW" as "NEW" | "USED",
    };


    function handleSuccess(response: any) {
        console.log("Ítem registrado:", response);
    }

    function handleError(error: any) {
        console.error("Error al registrar ítem:", error);
    }

    return (
        <div>
            <ItemForm
                initialData={initialData}
                onSubmitSuccess={handleSuccess}
                onSubmitError={handleError}
            />
        </div>
    );
}

export default RegisterItemPage;
