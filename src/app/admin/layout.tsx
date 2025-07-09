import AdminNavbar from "@/components/layouts/admin-navbar";

export default async function Layout({
    children 
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <AdminNavbar />
            {children}
        </div>
    );
}