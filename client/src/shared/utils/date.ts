export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} ${diffInSeconds === 1 ? "second" : "seconds"} ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (diffInSeconds < 2629800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (diffInSeconds < 31557600) {
    const months = Math.floor(diffInSeconds / 2629800);
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(diffInSeconds / 31557600);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
}

export const getCurrentMonth = (): string =>
  new Date().toISOString().slice(0, 7);

export const getLastMonth = (): string => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date.toISOString().slice(0, 7);
};

export const getCurrentDay = (): string => {
  const today = new Date();
  const year: number = today.getFullYear();
  const month: string = String(today.getMonth() + 1).padStart(2, "0");
  const day: string = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}/${year}-${month}-${day}`;
};

export const getLastDay = (): string => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const year: number = yesterday.getFullYear();
  const month: string = String(yesterday.getMonth() + 1).padStart(2, "0");
  const day: string = String(yesterday.getDate()).padStart(2, "0");
  return `${year}-${month}/${year}-${month}-${day}`;
};

export function formatAbs(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString();
}

export function isoMinutesAgo(min: number) {
  return new Date(Date.now() - min * 60000).toISOString();
}

export function formatDuration(startIso: string, endIso: string | null) {
  const start = new Date(startIso).getTime();
  const end = endIso ? new Date(endIso).getTime() : Date.now();
  const ms = Math.max(0, end - start);
  const sec = Math.floor(ms / 1000);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s.toString().padStart(2, "0")}s`;
  return `${s}s`;
}

export function formatRelative(iso: string) {
  const d = new Date(iso).getTime();
  const diff = Math.max(0, Date.now() - d);
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  if (hr > 0) return `${hr}h ${min % 60}m ago`;
  if (min > 0) return `${min}m ${sec % 60}s ago`;
  return `${sec}s ago`;
}

export function latestActivityIso<
  T extends { createdAt: string; endedAt: string | null }
>(items: T[]): string | null {
  if (items.length === 0) return null;
  const times: number[] = [];
  for (const item of items) {
    times.push(new Date(item.createdAt).getTime());
    if (item.endedAt) times.push(new Date(item.endedAt).getTime());
  }
  const max = Math.max(...times);
  return new Date(max).toISOString();
}
