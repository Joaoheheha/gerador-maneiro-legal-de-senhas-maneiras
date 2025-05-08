
import React from "react";
import { evaluatePasswordStrength } from "../utils/passwordUtils";

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const { strength } = evaluatePasswordStrength(password);

  const getColor = () => {
    switch (strength) {
      case "forte":
        return "bg-emerald-500";
      case "média":
        return "bg-yellow-400";
      case "fraca":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  const getWidth = () => {
    switch (strength) {
      case "forte":
        return "100%";
      case "média":
        return "65%";
      case "fraca":
        return "30%";
      default:
        return "0%";
    }
  };

  return (
    <div className="w-full">
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-300 ease-in-out`}
          style={{ width: getWidth() }}
        ></div>
      </div>
      <div className="flex justify-between mt-1 text-xs">
        <span>Fraca</span>
        <span>Média</span>
        <span>Forte</span>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
