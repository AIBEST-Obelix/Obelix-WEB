import Navbar from "@/components/layouts/navbar";

export default async function UserLayout() {
    return (
        <>
            <Navbar />
            <p>
                Ти си потребител!
                <br/>
            </p>
        </>
    );
}