export interface User {
  id: bigint;
  githubLogin: string;
  name: string;
  avatarUrl: string;
  birthDate?: string | null;
  email?: string | null;
  weight?: number | null;
  height?: number | null;
  calorieGoal?: number | null;
}