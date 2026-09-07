import { PortfolioResponse, ProjectData } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function fetchPortfolioData(): Promise<PortfolioResponse | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/portfolio`, {
      next: { revalidate: 60 }, // ISR cache revalidation every 60 seconds
    });

    if (!res.ok) {
      console.error(`Failed to fetch portfolio: status ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data.success ? data.data : null;
  } catch (err) {
    console.error('fetchPortfolioData network error:', err);
    return null;
  }
}

export async function fetchProjectBySlug(slug: string): Promise<ProjectData | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/projects/detail/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.success ? data.data : null;
  } catch (err) {
    console.error('fetchProjectBySlug error:', err);
    return null;
  }
}

export async function submitContactMessage(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Submission failed' };
    }

    return { success: true, message: data.message };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Network connection failure',
    };
  }
}
