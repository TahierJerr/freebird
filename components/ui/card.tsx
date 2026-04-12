import { cn } from "@/lib/utils";

type CardProps = {
    children: React.ReactNode;
    className?: string;
};

export function Card({ children, className }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-pink-100 bg-white/80 backdrop-blur-sm shadow-sm",
                className
            )}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className }: CardProps) {
    return (
        <div className={cn("px-5 pt-5 pb-3", className)}>{children}</div>
    );
}

export function CardContent({ children, className }: CardProps) {
    return (
        <div className={cn("px-5 pb-5", className)}>{children}</div>
    );
}
