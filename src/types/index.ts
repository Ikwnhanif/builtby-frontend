// src/types/index.ts
export interface Profile {
  id: number;
  full_name: string;
  job_title: string;
  bio: string;
  photo_url: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  link: string;
  created_at: string;
}
