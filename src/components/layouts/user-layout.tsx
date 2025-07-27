import Navbar from "@/components/layouts/navbar";

export default async function UserLayout() {
    return (
        <>
            <Navbar />
            <p>
                You are a user!
                <br/>
            </p>
        </>
    );
}