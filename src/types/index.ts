export interface SearchParams {
  city: string;
  keyword: string;
}

export interface InstagramProfile {
  title: string;
  link: string;
  handle: string;
  snippet: string;
  position: number;
  followerCount: string;
}

export interface SearchResponse {
  success: boolean;
  profiles: InstagramProfile[];
  query: SearchParams;
}