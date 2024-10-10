import React, { useState, useRef, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Heart } from "lucide-react";

const DiscreteProgressInput: React.FC = () => {
  const [value, setValue] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const validValues = [0, 20, 40, 80, 100];

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const nearestValue = validValues.reduce((prev, curr) => (Math.abs(curr - percentage) < Math.abs(prev - percentage) ? curr : prev));
      setValue(nearestValue);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    if (thumbRef.current) {
      thumbRef.current.style.left = `calc(${value}% - 20px)`;
    }
  }, [value]);

  return (
    <div className="relative w-full h-10">
      <Progress value={value} className="h-2 w-full absolute top-1/2 transform -translate-y-1/2" ref={progressRef} />
      <div ref={thumbRef} className="absolute top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer" onMouseDown={handleMouseDown}>
        <Heart className="w-6 h-6 text-red-500 fill-current" />
      </div>
      <p className="text-center mt-2">Value2: {value}</p>
    </div>
  );
};

export default DiscreteProgressInput;
