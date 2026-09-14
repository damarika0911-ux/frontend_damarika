export interface SocialLink {
  platform: string;
  url: string;
}

export interface TeamMember {
  id: number;
  name: string;
  image: string;
  role_id: number;
  status: boolean;
  description: string;
  title: string;
  mobile: string;
  email: string;
  social_links: SocialLink[];
  created_by: number;
  updated_by: number;
  createdAt: string;
  updatedAt: string;
}
