import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeteleCabin() {
    const queryClient = useQueryClient();

    const { isLoading: isDeliting, mutate: deleteCabin } = useMutation({
        mutationFn: deleteCabinApi,

        onSuccess: () => {
            toast.success("Cabins succesfully deleted");

            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeliting, deleteCabin };
}

export default useDeteleCabin;
