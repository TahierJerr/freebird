import { cn } from "@/lib/utils";

type BadgeProps = {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "win" | "loss" | "rank";
};

export function Badge({ children, className, variant = "default" }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                variant === "default" && "bg-pink-100 text-pink-700",
                variant === "win" && "bg-emerald-100 text-emerald-700",
                variant === "loss" && "bg-rose-100 text-rose-700",
                variant === "rank" && "bg-purple-100 text-purple-700",
                className
            )}
        >
            {children}
        </span>
    );
}
