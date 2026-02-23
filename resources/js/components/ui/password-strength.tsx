import React, { useMemo, useEffect } from "react";
import { calculatePasswordStrength } from "@/util/passwordUtil";

interface PasswordStrengthProps {
  password: string;
  showLabel?: boolean;
  minLevel?: number; // minimum required strength (1–4)
  onValidityChange?: (isValid: boolean) => void;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({
  password,
  showLabel = true,
  minLevel = 2, // default: at least "Fair"
  onValidityChange,
}) => {
  const strength = useMemo(() => {
    return calculatePasswordStrength(password);
  }, [password]);

  // Notify parent when validity changes
  useEffect(() => {
    if (!onValidityChange) return;

    const isValid =
      password.length >= 8 && strength.level >= minLevel;

    onValidityChange(isValid);
  }, [password, strength.level, minLevel, onValidityChange]);

  const bars = [1, 2, 3, 4];

  const getBarColor = (index: number) => {
    if (index > strength.level) return "bg-gray-200";

    switch (strength.label) {
      case "Weak":
        return "bg-red-500";
      case "Fair":
        return "bg-yellow-500";
      case "Good":
        return "bg-blue-500";
      case "Strong":
        return "bg-green-500";
      default:
        return "bg-gray-200";
    }
  };

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* Strength Bars */}
      <div className="flex gap-1">
        {bars.map((bar) => (
          <div
            key={bar}
            className={`h-1.5 flex-1 rounded transition-all duration-300 ${getBarColor(
              bar
            )}`}
          />
        ))}
      </div>

      {/* Label */}
      {showLabel && (
        <p className="text-sm font-medium">
          Strength:{" "}
          <span
            className={
              strength.label === "Weak"
                ? "text-red-500"
                : strength.label === "Fair"
                ? "text-yellow-500"
                : strength.label === "Good"
                ? "text-blue-500"
                : "text-green-500"
            }
          >
            {strength.label}
          </span>
        </p>
      )}

      {/* Minimum Requirement Warning */}
      {strength.level < minLevel && (
        <p className="text-xs text-red-500">
          Password is too weak. Please choose a stronger password.
        </p>
      )}
    </div>
  );
};

export default PasswordStrength;
