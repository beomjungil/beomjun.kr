export interface ActorsTable {
  created_at: number;
  domain: string | null;
  private_key: string;
  public_key: string;
  type: string;
  updated_at: number;
  user_id: string;
}

export interface UsersTable {
  email: string | null;
  hashed_password: string | null;
  header_image_url: string | null;
  id: string;
  profile_image_url: string | null;
  summary: string | null;
  username: string;
  full_name: string | null;
}

export interface DB {
  actors: ActorsTable;
  users: UsersTable;
}
