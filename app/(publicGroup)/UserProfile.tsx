// app/(publicGroup)/UserProfile.tsx
import { getMe } from "../service/getMe";

export default async function UserProfile() {
  const user = await getMe();

  if (!user) {
    return <div>You are not logged in</div>;
  }

  return <div>Welcome, {user.name}</div>;
}