import React, { useState } from "react";
import { Progress } from "./ui/progress";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";

interface ScrollableProgressProps {
  options: { label: string; value: number }[]; // To accept an array of labels and values
  onValueChange: (value: number) => void; // Callback function to pass the numerical value
}

const ScrollableProgress: React.FC<ScrollableProgressProps> = ({ options, onValueChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [chosenValue, setChosenValue] = useState<number | null>(null);
  const { label, value } = options[selectedIndex];

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX } = event;
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const percentage = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1); // Calculate percentage
    const newIndex = Math.round(percentage * (options.length - 1)); // Convert to index
    setSelectedIndex(newIndex);
    onValueChange(options[newIndex].value); // Pass the numerical value
  };

  const handleChooseClick = () => {
    const selectedValue = options[selectedIndex].value;
    setChosenValue(selectedValue); // Store chosen value locally
    onValueChange(selectedValue); // Send selected value to parent (App)
  };

  return (
    <div>
      <div
        onMouseMove={handleMouseMove} // Update value as the user moves the mouse
        className="relative w-full"
      >
        <Progress value={(selectedIndex / (options.length - 1)) * 100}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center">
            {options[selectedIndex].label} {/* Display the string label */}
          </div>
        </Progress>
      </div>
      <p className="text-center mt-2">Value: {label}</p>
    </div>
  );
};

export default ScrollableProgress;
