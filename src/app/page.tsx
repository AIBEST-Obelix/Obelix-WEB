import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {jwtDecode} from "jwt-decode";
import UserLayout from "@/components/layouts/user-layout";

function getLayoutForRole(role: string) {
  if (role === "Admin") {
    redirect("/admin");
  } else {
    return <UserLayout/>;
  }
}

export default async function Home() {
  const token = (await cookies()).get("accessToken")?.value;

  if (!token) {
    redirect("/auth/login");
  }

  const decoded = jwtDecode<CustomJwtToken>(token);
  const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  return getLayoutForRole(role);
}