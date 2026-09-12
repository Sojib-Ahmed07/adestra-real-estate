// lib/uploadModel.js
import { supabase } from './supabaseClient'; // Adjust path to your Supabase client

export async function upload3DModel(file) {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `models/${fileName}`;

        const { data, error } = await supabase.storage
            .from('3d-models')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        // Retrieve the direct public HTTP URL of the uploaded asset
        const { data: publicUrlData } = supabase.storage
            .from('3d-models')
            .getPublicUrl(filePath);

        return { success: true, url: publicUrlData.publicUrl };
    } catch (error) {
        console.error('Error uploading 3D model:', error);
        return { success: false, error: error.message };
    }
}