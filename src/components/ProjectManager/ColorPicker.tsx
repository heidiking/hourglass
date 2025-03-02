
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { COLOR_PALETTE, PASTEL_COLORS, ColorOption } from './types';

interface ColorPickerProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  onClose: () => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ 
  selectedColor, 
  setSelectedColor, 
  onClose 
}) => {
  const [customColorInput, setCustomColorInput] = React.useState("");

  const handleCustomColorChange = (value: string) => {
    setCustomColorInput(value);
    
    if (value.toLowerCase().startsWith("pms")) {
      const pantoneNumber = value.replace(/[^0-9]/g, '');
      if (pantoneNumber) {
        const hue = (parseInt(pantoneNumber) * 137) % 360;
        setSelectedColor(`bg-[hsl(${hue},70%,50%)]`);
      }
      return;
    }
    
    if (value.startsWith('#')) {
      setSelectedColor(`bg-[${value}]`);
      return;
    }
    
    try {
      setSelectedColor(`bg-${value}-500`);
    } catch (e) {
      // Silently fail if color is invalid
    }
  };

  const applyCustomColor = () => {
    handleCustomColorChange(customColorInput);
    onClose();
  };

  return (
    <div className="p-2 bg-black/40 rounded border border-gray-700">
      <div className="mb-2">
        <label className="text-sm text-white/70 mb-1 block">Standard Colors</label>
        <div className="flex flex-wrap gap-1">
          {COLOR_PALETTE.map((color) => (
            <button
              key={color.value}
              className={`w-6 h-6 rounded ${color.value} border border-white/20`}
              onClick={() => {
                setSelectedColor(color.value);
                onClose();
              }}
              title={color.name}
            />
          ))}
        </div>
      </div>
      
      <div className="mb-2">
        <label className="text-sm text-white/70 mb-1 block">Pastel Colors</label>
        <div className="flex flex-wrap gap-1">
          {PASTEL_COLORS.map((color) => (
            <button
              key={color.value}
              className={`w-6 h-6 rounded ${color.value} border border-white/20`}
              onClick={() => {
                setSelectedColor(color.value);
                onClose();
              }}
              title={color.name}
            />
          ))}
        </div>
      </div>
      
      <div>
        <label className="text-sm text-white/70 mb-1 block">Custom Color</label>
        <div className="flex items-center gap-2">
          <Input
            value={customColorInput}
            onChange={(e) => setCustomColorInput(e.target.value)}
            placeholder="HEX or Pantone (e.g. #FF5733 or PMS 123)"
            className="bg-black/30 border-gray-700 text-white text-sm"
          />
          <Button 
            variant="outline" 
            className="border-gray-700 text-sm bg-white text-black hover:bg-white/90 hover:text-black"
            onClick={applyCustomColor}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
