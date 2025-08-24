export interface CreateLinkRequest {
  url: string;
  description?: string;
}

export interface ShortUrl {
  id: string;
  destination: string;
  short_url: string;
  description: string;
  clicks: number;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  firstname: string;
  email: string;
  avatar: {
    url: string;
    publicId: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}
