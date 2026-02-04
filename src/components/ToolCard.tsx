import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
  href?: string;
  badge?: string;
  variant?: "primary" | "secondary" | "coming";
}

export function ToolCard({ title, description, icon, features, href, badge, variant = "primary" }: ToolCardProps) {
  const isComingSoon = variant === "coming";
  
  const CardContent = () => (
    <div
      className={cn(
        "card-premium p-6 h-full transition-all duration-300",
        isComingSoon && "opacity-75 cursor-not-allowed",
        !isComingSoon && "hover:scale-[1.02] cursor-pointer",
        variant === "primary" && "tool-card-primary text-white"
      )}
    >
      {badge && (
        <div className="flex justify-end mb-2">
          <span className={cn(
            "badge-premium text-xs",
            variant === "primary" ? "text-white" : "text-primary bg-primary/10"
          )}>
            {badge}
          </span>
        </div>
      )}
      
      <div className="text-5xl mb-4">{icon}</div>
      
      <h3 className={cn(
        "text-xl font-bold mb-2",
        variant === "primary" ? "text-white" : "text-foreground"
      )}>
        {title}
      </h3>
      
      <p className={cn(
        "text-sm mb-4 leading-relaxed",
        variant === "primary" ? "text-white/90" : "text-muted-foreground"
      )}>
        {description}
      </p>
      
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <span className={cn(
              variant === "primary" ? "text-white" : "text-secondary"
            )}>
              ✓
            </span>
            <span className={cn(
              variant === "primary" ? "text-white/80" : "text-muted-foreground"
            )}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {!isComingSoon && (
        <div className="mt-6 pt-6 border-t border-white/20">
          <span className={cn(
            "text-sm font-semibold",
            variant === "primary" ? "text-white" : "text-primary"
          )}>
            Começar agora →
          </span>
        </div>
      )}
    </div>
  );

  if (isComingSoon || !href) {
    return <CardContent />;
  }

  return (
    <Link to={href} className="block">
      <CardContent />
    </Link>
  );
}
