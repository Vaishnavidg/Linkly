export interface ShortUrl {
    id: string;
    originalUrl: string;
    shortId: string;
    shortUrl: string;
    visitHistory: Array<Date>;
    createdAt: string;
    // active: boolean;
    user: string | null;
  }