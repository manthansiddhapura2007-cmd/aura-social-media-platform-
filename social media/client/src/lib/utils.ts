import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const siteConfig = {
  name: "Aura",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  description: "A premium social media platform",
};

export function getPostUrl(postId: string) {
  return `${siteConfig.url}/p/${postId}`;
}

export function getProfileUrl(username: string) {
  return `${siteConfig.url}/${username}`;
}

export function getStoryUrl(username: string) {
  return `${siteConfig.url}/stories/${username}`;
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy: ", err);
    return false;
  }
}

export function formatDate(date: Date | number) {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  return new Date(date).toLocaleDateString();
}
