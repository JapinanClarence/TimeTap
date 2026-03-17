import Container from "../../components/ui/container";
import { ChevronLeft } from "lucide-react";

export default function SecondaryHeader({ title }: { title?: string }) {
    const handleBack = () => {
        // Standard browser back behavior
        window.history.back();
    };
    return (
        <header className="fixed top-0 z-50 w-full border-b bg-background ">
            <Container className="mx-auto flex items-center justify-center h-16 relative">
                <div className="absolute left-0 pl-8 gap-3">
                    <button onClick={handleBack}>
                        <ChevronLeft className="size-5" />
                    </button>
                </div>
                <div className="font-semibold text-lg">{title}</div>
                <div></div>
            </Container>
        </header>
    );
}
