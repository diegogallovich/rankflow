import { z } from 'zod';

// Profile Update Form Schema
export const ProfileUpdateFormSchema = z.object({
  avatar: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  primaryEmail: z.string().email('Invalid email address'),
});

export type ProfileUpdateFormState = {
  errors?: {
    name?: string[];
    primaryEmail?: string[];
    avatar?: string[];
  };
  message?: string;
};

export type ProfileUpdateData = z.infer<typeof ProfileUpdateFormSchema>;

// Site Schemas
export const createSiteSchema = z.object({
  name: z.string().min(1),
  source: z.enum(['webflow', 'rankflow']),
  context: z.string(),
  webflowSiteId: z.string().optional(),
  webflowSiteToken: z.string().optional(),
});

export const updateSiteSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  context: z.string(),
  webflowSiteToken: z.string().optional(),
});

// Collection Schemas
export const createCollectionSchema = z.object({
  webflowCollectionId: z.string(),
  name: z.string().min(1),
  context: z.string(),
  siteId: z.string(),
});

export const updateCollectionSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  context: z.string(),
});

// Collection Item Schemas
export const createCollectionItemSchema = z.object({
  webflowItemId: z.string(),
  targetKeyword: z.string().optional(),
  context: z.string().optional(),
  status: z.enum(['draft', 'archived', 'published']),
  collectionId: z.string(),
});

export const updateCollectionItemSchema = z.object({
  id: z.string(),
  targetKeyword: z.string().optional(),
  context: z.string().optional(),
  status: z.enum(['draft', 'archived', 'published']),
});

// Site Type
export type Site = {
  id: string;
  name: string;
  webflowSiteId?: string;
  context: string;
  webflowSiteToken?: string;
  userId: string;
};

// Add more types or schemas as needed
