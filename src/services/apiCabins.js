import supabase, { supabaseUrl } from "./supabase";

//! Get All Cabins
export async function getCabins() {
    let { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.log(error);
        throw new Error("Cabins could not be loaded.");
    }
    return data;
}

//! Create/Edit Cabin
export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    console.log(hasImagePath);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
        "/",
        ""
    );

    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create/Edit the cabin
    let query = supabase.from("cabins");

    //* A) CREATE
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    //* B) EDIT
    if (id)
        query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

    const { data, error } = await query.select().single();

    // Error
    if (error) {
        console.log(error);
        throw new Error("Cabins could not be created.");
    }

    // 2. Upload image
    if (hasImagePath) return data;

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    // 3. Delete the cabin IF there was an error uploading image
    if (storageError) {
        console.error("Storage upload error:", storageError);
        await supabase.from("cabins").delete().eq("id", data.id);
        throw new Error(
            "Cabins image could not be uploaded and the cabin was NOT created."
        );
    }

    return data;
}

//! Delete Cabin
export async function deleteCabin(id) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.log(error);
        throw new Error("Cabins could not be deleted.");
    }
    return data;
}
