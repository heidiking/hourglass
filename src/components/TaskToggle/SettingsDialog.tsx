
import React, { useState, useEffect } from 'react';
import { Check, Upload, X, Image } from 'lucide-react';
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTaskToggle } from './TaskToggleContext';
import { addCustomBackground, getAllBackgrounds, removeCustomBackground } from '@/utils/backgrounds';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SettingsDialog = () => {
  const { settingsOpen, setSettingsOpen } = useTaskToggle();
  const [autoTrackEnabled, setAutoTrackEnabled] = useState(false);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [customQuote, setCustomQuote] = useState('');
  const [customMantra, setCustomMantra] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [customImageAuthor, setCustomImageAuthor] = useState('');
  const [customImageLocation, setCustomImageLocation] = useState('');
  const [customBackgrounds, setCustomBackgrounds] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    // Load settings from localStorage
    const storedSettings = localStorage.getItem('timeTrackerSettings');
    if (storedSettings) {
      const settings = JSON.parse(storedSettings);
      setAutoTrackEnabled(settings.autoTrackEnabled || false);
      setStartTime(settings.startTime || '09:00');
      setEndTime(settings.endTime || '17:00');
      setCustomQuote(settings.customQuote || '');
      setCustomMantra(settings.customMantra || '');
    }
    
    // Load custom backgrounds
    loadCustomBackgrounds();
  }, []);

  useEffect(() => {
    const settings = {
      autoTrackEnabled,
      startTime,
      endTime,
      customQuote,
      customMantra
    };
    localStorage.setItem('timeTrackerSettings', JSON.stringify(settings));
  }, [autoTrackEnabled, startTime, endTime, customQuote, customMantra]);
  
  const loadCustomBackgrounds = () => {
    const allBackgrounds = getAllBackgrounds();
    const customBgs = allBackgrounds.filter(bg => bg.isCustom);
    setCustomBackgrounds(customBgs);
  };

  const handleTimeSettingSave = () => {
    toast("Settings saved!");
    setSettingsOpen(false);
  };
  
  const handleAddCustomBackground = () => {
    if (!customImageUrl) {
      toast.error("Please enter an image URL");
      return;
    }
    
    addCustomBackground(customImageUrl, customImageAuthor, customImageLocation);
    toast.success("Custom background added");
    setCustomImageUrl('');
    setCustomImageAuthor('');
    setCustomImageLocation('');
    loadCustomBackgrounds();
  };
  
  const handleRemoveBackground = (id: number) => {
    removeCustomBackground(id);
    toast.success("Background removed");
    loadCustomBackgrounds();
  };
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.match('image.*')) {
      toast.error("Please select an image file");
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        // Add the data URL as a custom background
        addCustomBackground(
          event.target.result as string,
          customImageAuthor || 'My Upload',
          customImageLocation || 'Personal Collection'
        );
        toast.success("Image uploaded successfully");
        loadCustomBackgrounds();
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-black">Settings</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="py-2">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="general" className="text-black">General</TabsTrigger>
            <TabsTrigger value="backgrounds" className="text-black">Backgrounds</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium text-black">Time Tracking</h3>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="auto-track" 
                  checked={autoTrackEnabled}
                  onCheckedChange={setAutoTrackEnabled}
                />
                <Label htmlFor="auto-track" className="text-black">Auto-track documents daily</Label>
              </div>
              
              {autoTrackEnabled && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-time" className="text-black">Start Time</Label>
                    <Input 
                      id="start-time" 
                      type="time" 
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="text-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time" className="text-black">End Time</Label>
                    <Input 
                      id="end-time" 
                      type="time" 
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="text-black"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-black">Custom Quote</h3>
              <div className="space-y-2">
                <Label htmlFor="custom-quote" className="text-black">Your Inspirational Quote</Label>
                <Input
                  id="custom-quote"
                  placeholder="Enter your own inspirational quote"
                  value={customQuote}
                  onChange={(e) => setCustomQuote(e.target.value)}
                  className="text-black"
                />
                <p className="text-xs text-gray-500">This quote will be included in the daily rotation</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-black">Custom Mantra</h3>
              <div className="space-y-2">
                <Label htmlFor="custom-mantra" className="text-black">Your Daily Mantra</Label>
                <Input
                  id="custom-mantra"
                  placeholder="Enter your own creative mantra"
                  value={customMantra}
                  onChange={(e) => setCustomMantra(e.target.value)}
                  className="text-black"
                />
                <p className="text-xs text-gray-500">This mantra will be included in the daily rotation</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="backgrounds" className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium text-black">Upload Custom Background</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="background-file" className="text-black">Upload Image</Label>
                  <div className="flex items-center gap-2">
                    <Label 
                      htmlFor="background-file" 
                      className="bg-white text-black cursor-pointer border border-gray-300 rounded-md px-4 py-2 inline-flex items-center hover:bg-gray-100"
                    >
                      <Upload size={16} className="mr-2 text-black" />
                      <span className="text-black">Choose File</span>
                    </Label>
                    <Input
                      id="background-file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Max file size: 5MB</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image-url" className="text-black">Or Enter Image URL</Label>
                  <Input
                    id="image-url"
                    placeholder="https://example.com/image.jpg"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    className="text-black"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image-author" className="text-black">Image Credit (optional)</Label>
                    <Input
                      id="image-author"
                      placeholder="Photographer name"
                      value={customImageAuthor}
                      onChange={(e) => setCustomImageAuthor(e.target.value)}
                      className="text-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image-location" className="text-black">Location (optional)</Label>
                    <Input
                      id="image-location"
                      placeholder="Beach, Mountain, etc."
                      value={customImageLocation}
                      onChange={(e) => setCustomImageLocation(e.target.value)}
                      className="text-black"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleAddCustomBackground} 
                  className="bg-white text-black hover:bg-white/90 w-full"
                  disabled={!customImageUrl}
                >
                  <Image size={16} className="mr-2 text-black" />
                  <span className="text-black">Add Background</span>
                </Button>
              </div>
            </div>
            
            {customBackgrounds.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium text-black">Your Custom Backgrounds</h3>
                <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto p-1">
                  {customBackgrounds.map((bg) => (
                    <div key={bg.id} className="relative group rounded-md overflow-hidden border border-gray-300">
                      <img
                        src={bg.url}
                        alt={bg.location || 'Custom background'}
                        className="w-full h-24 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveBackground(bg.id)}
                          className="bg-white hover:bg-white/90"
                        >
                          <X size={16} className="text-black" />
                          <span className="text-black">Remove</span>
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-2 py-1 text-xs text-white truncate">
                        {bg.location || 'Custom Image'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <button 
          onClick={handleTimeSettingSave} 
          className="bg-white hover:bg-white/90 text-black rounded-md py-2 mt-2 flex items-center justify-center"
        >
          <Check size={18} className="mr-2 text-black" />
          <span className="text-black">Save Settings</span>
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
