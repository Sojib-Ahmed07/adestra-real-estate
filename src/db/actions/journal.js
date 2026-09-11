'use server';

import { db } from '@/db';
import { journalArticles } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

/**
 * Utility function to turn titles into clean, URL-safe slugs
 */
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
        .replace(/\-\-+/g, '-');     // Replace multiple - with single -
}

/**
 * Fetch all journal articles (Optional category filter & admin toggle to view unpublished)
 */
export async function getJournalArticles(category = 'All', includeUnpublished = false) {
    try {
        const conditions = [];

        if (!includeUnpublished) {
            conditions.push(eq(journalArticles.isPublished, true));
        }

        if (category && category !== 'All') {
            conditions.push(eq(journalArticles.category, category));
        }

        const query = conditions.length > 0
            ? db.select().from(journalArticles).where(and(...conditions)).orderBy(desc(journalArticles.createdAt))
            : db.select().from(journalArticles).orderBy(desc(journalArticles.createdAt));

        const data = await query;
        return { success: true, data };
    } catch (error) {
        console.error('Failed to fetch journal articles:', error);
        return { success: false, data: [] };
    }
}

/**
 * Fetch a single journal article by slug
 */
export async function getArticleBySlug(slug) {
    try {
        if (!slug) return { success: false, data: null, error: 'Slug is required' };

        const data = await db
            .select()
            .from(journalArticles)
            .where(
                and(
                    eq(journalArticles.slug, slug),
                    eq(journalArticles.isPublished, true)
                )
            )
            .limit(1);

        if (!data.length) return { success: false, data: null };

        return { success: true, data: data[0] };
    } catch (error) {
        console.error(`Failed to fetch article with slug "${slug}":`, error);
        return { success: false, data: null };
    }
}

/**
 * CREATE a new journal article
 */
export async function createJournalArticle(formData) {
    try {
        const { title, category, year, excerpt, content, imageUrl } = formData;

        if (!title || !category || !excerpt) {
            return { success: false, error: 'Title, category, and excerpt are required' };
        }

        let slug = slugify(title);
        if (!slug) slug = `article-${Date.now()}`;

        const newArticle = {
            title,
            slug,
            category,
            year: year || new Date().getFullYear().toString(),
            excerpt,
            content: content || excerpt,
            imageUrl: imageUrl || null,
            isPublished: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.insert(journalArticles).values(newArticle).returning();

        revalidatePath('/journal');
        revalidatePath('/admin');

        return { success: true, data: result[0] };
    } catch (error) {
        console.error('Failed to create article:', error);
        return { success: false, error: 'Database creation failed' };
    }
}

/**
 * UPDATE an existing article by ID
 */
export async function updateJournalArticle(id, formData) {
    try {
        if (!id) return { success: false, error: 'Article ID is required' };

        const { title, category, year, excerpt, content, imageUrl, isPublished } = formData;

        const updatedFields = {
            ...(title && { title, slug: slugify(title) }),
            ...(category && { category }),
            ...(year && { year }),
            ...(excerpt && { excerpt }),
            ...(content && { content }),
            ...(imageUrl !== undefined && { imageUrl }),
            ...(isPublished !== undefined && { isPublished }),
            updatedAt: new Date()
        };

        const result = await db
            .update(journalArticles)
            .set(updatedFields)
            .where(eq(journalArticles.id, Number(id)))
            .returning();

        revalidatePath('/journal');
        revalidatePath('/admin');

        return { success: true, data: result[0] };
    } catch (error) {
        console.error(`Failed to update article ID ${id}:`, error);
        return { success: false, error: 'Database update failed' };
    }
}

/**
 * DELETE an article by ID
 */
export async function deleteJournalArticle(id) {
    try {
        if (!id) return { success: false, error: 'Article ID is required' };

        await db.delete(journalArticles).where(eq(journalArticles.id, Number(id)));

        revalidatePath('/journal');
        revalidatePath('/admin');

        return { success: true };
    } catch (error) {
        console.error(`Failed to delete article ID ${id}:`, error);
        return { success: false, error: 'Database deletion failed' };
    }
}