'use server';

import { db } from '@/db';
import { properties } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

/**
 * Utility function to generate a clean URL slug / ID for properties
 */
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

/**
 * Fetch all properties from the database
 */
export async function getProperties(category = 'all') {
    try {
        let query;
        if (category && category !== 'all') {
            query = db
                .select()
                .from(properties)
                .where(eq(properties.category, category))
                .orderBy(desc(properties.createdAt));
        } else {
            query = db.select().from(properties).orderBy(desc(properties.createdAt));
        }

        const data = await query;
        return { success: true, data };
    } catch (error) {
        console.error('Failed to fetch properties:', error);
        return { success: false, data: [] };
    }
}

/**
 * Fetch a single property by ID
 */
export async function getPropertyById(id) {
    try {
        if (!id) return { success: false, data: null, error: 'Property ID is required' };

        const data = await db
            .select()
            .from(properties)
            .where(eq(properties.id, id))
            .limit(1);

        if (!data.length) return { success: false, data: null };

        return { success: true, data: data[0] };
    } catch (error) {
        console.error(`Failed to fetch property with ID "${id}":`, error);
        return { success: false, data: null };
    }
}

/**
 * CREATE a new property residence entry
 */
export async function createProperty(formData) {
    try {
        const {
            name,
            category,
            location,
            price,
            area,
            description,
            beds,
            baths,
            levels,
            imageUrl,
            modelUrl,
            isFeatured
        } = formData;

        if (!name || !category || !location || !price || !area || !description) {
            return { success: false, error: 'Missing required fields' };
        }

        let id = slugify(name);
        if (!id) id = `property-${Date.now()}`;

        const newProperty = {
            id,
            name,
            category,
            location,
            price,
            area,
            description,
            beds: Number(beds) || 0,
            baths: Number(baths) || 0,
            levels: Number(levels) || 1,
            imageUrl: imageUrl || null,
            modelUrl: modelUrl || null,
            isFeatured: isFeatured || false,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.insert(properties).values(newProperty).returning();

        revalidatePath('/residences');
        revalidatePath('/admin');

        return { success: true, data: result[0] };
    } catch (error) {
        console.error('Failed to create property:', error);
        return { success: false, error: 'Database property creation failed' };
    }
}

/**
 * UPDATE an existing property entry by ID
 */
export async function updateProperty(id, formData) {
    try {
        if (!id) return { success: false, error: 'Property ID is required' };

        const {
            name,
            category,
            location,
            price,
            area,
            description,
            beds,
            baths,
            levels,
            imageUrl,
            modelUrl,
            isFeatured
        } = formData;

        const updatedFields = {
            ...(name && { name }),
            ...(category && { category }),
            ...(location && { location }),
            ...(price && { price }),
            ...(area && { area }),
            ...(description && { description }),
            ...(beds !== undefined && { beds: Number(beds) }),
            ...(baths !== undefined && { baths: Number(baths) }),
            ...(levels !== undefined && { levels: Number(levels) }),
            ...(imageUrl !== undefined && { imageUrl }),
            ...(modelUrl !== undefined && { modelUrl }),
            ...(isFeatured !== undefined && { isFeatured }),
            updatedAt: new Date()
        };

        const result = await db
            .update(properties)
            .set(updatedFields)
            .where(eq(properties.id, id))
            .returning();

        revalidatePath('/residences');
        revalidatePath('/admin');

        return { success: true, data: result[0] };
    } catch (error) {
        console.error(`Failed to update property ID ${id}:`, error);
        return { success: false, error: 'Database property update failed' };
    }
}

/**
 * DELETE a property entry by ID
 */
export async function deleteProperty(id) {
    try {
        if (!id) return { success: false, error: 'Property ID is required' };

        await db.delete(properties).where(eq(properties.id, id));

        revalidatePath('/residences');
        revalidatePath('/admin');

        return { success: true };
    } catch (error) {
        console.error(`Failed to delete property ID ${id}:`, error);
        return { success: false, error: 'Database property deletion failed' };
    }
}