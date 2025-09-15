import { useState, useRef, useEffect } from "react";
import { Download, Copy, Palette, Type, Circle, Square, Triangle, Undo, Redo, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedLogo from "@/components/AnimatedLogo";

interface DrawElement {
  type: 'text' | 'circle' | 'square' | 'triangle' | 'image';
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  text?: string;
  color: string;
  fontSize?: number;
  imageUrl?: string;
}

const DemoLogo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elements, setElements] = useState<DrawElement[]>([]);
  const [selectedTool, setSelectedTool] = useState<'text' | 'circle' | 'square' | 'triangle'>('text');
  const [selectedColor, setSelectedColor] = useState('#40E0FF');
  const [textInput, setTextInput] = useState('OrbitDynamix');
  const [fontSize, setFontSize] = useState(32);
  const [history, setHistory] = useState<DrawElement[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    redrawCanvas();
  }, [elements]);

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set background
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw elements
    elements.forEach(element => {
      ctx.fillStyle = element.color;
      ctx.strokeStyle = element.color;

      switch (element.type) {
        case 'text':
          ctx.font = `${element.fontSize || 32}px 'Space Grotesk', Arial, sans-serif`;
          ctx.fillText(element.text || 'Text', element.x, element.y);
          break;
        case 'circle':
          ctx.beginPath();
          ctx.arc(element.x, element.y, element.radius || 30, 0, 2 * Math.PI);
          ctx.fill();
          break;
        case 'square':
          ctx.fillRect(element.x, element.y, element.width || 60, element.height || 60);
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(element.x, element.y);
          ctx.lineTo(element.x + 30, element.y + 60);
          ctx.lineTo(element.x - 30, element.y + 60);
          ctx.closePath();
          ctx.fill();
          break;
      }
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newElement: DrawElement = {
      type: selectedTool,
      x,
      y,
      color: selectedColor,
    };

    if (selectedTool === 'text') {
      newElement.text = textInput;
      newElement.fontSize = fontSize;
    } else if (selectedTool === 'circle') {
      newElement.radius = 30;
    } else if (selectedTool === 'square') {
      newElement.width = 60;
      newElement.height = 60;
    }

    const newElements = [...elements, newElement];
    setElements(newElements);
    
    // Update history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newElements]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'orbitdynamix-custom-logo.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const downloadOfficialLogo = (logoType: string) => {
    const link = document.createElement('a');
    link.download = `orbitdynamix-${logoType}.svg`;
    link.href = logoType === 'color' ? '/logos/orbitdynamix-logo-color.svg' : 
                logoType === 'dark' ? '/logos/orbitdynamix-logo-dark.svg' : 
                '/logos/orbitdynamix-symbol.svg';
    link.click();
  };

  const copyLogoUrl = (logoType: string) => {
    const baseUrl = window.location.origin;
    const logoUrl = logoType === 'color' ? `${baseUrl}/logos/orbitdynamix-logo-color.svg` : 
                   logoType === 'dark' ? `${baseUrl}/logos/orbitdynamix-logo-dark.svg` : 
                   `${baseUrl}/logos/orbitdynamix-symbol.svg`;
    
    navigator.clipboard.writeText(logoUrl).then(() => {
      alert('Logo URL copied to clipboard!');
    });
  };

  const clearCanvas = () => {
    setElements([]);
    const newHistory = [...history, []];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1] || []);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1] || []);
    }
  };

  const loadTemplate = () => {
    const template: DrawElement[] = [
      {
        type: 'circle',
        x: 400,
        y: 200,
        radius: 50,
        color: '#40E0FF'
      },
      {
        type: 'text',
        x: 320,
        y: 320,
        text: 'OrbitDynamix',
        fontSize: 36,
        color: '#40E0FF'
      }
    ];
    setElements(template);
    const newHistory = [...history, [...template]];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const presetColors = ['#40E0FF', '#8B5FBF', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA726', '#66BB6A', '#EF5350'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orbit-dark to-orbit-slate-dark text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">OrbitDynamix Logo Studio</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Download our official logos or create your own custom designs
          </p>
        </div>

        <Tabs defaultValue="official" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="official">Official Logos</TabsTrigger>
            <TabsTrigger value="designer">Design Studio</TabsTrigger>
          </TabsList>

          {/* Official Logos Tab */}
          <TabsContent value="official" className="space-y-6">
            {/* Animated Logo Showcase */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Star className="mr-2 text-orbit-cyan" />
                  Animated Logo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-gray-400 mb-6">
                    Our signature animated logo with orbiting elements
                  </p>
                  <div className="flex justify-center mb-6">
                    <AnimatedLogo size={250} />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <AnimatedLogo size={120} speed={1500} />
                      <p className="text-sm text-gray-400 mt-2">Fast</p>
                    </div>
                    <div className="text-center">
                      <AnimatedLogo size={120} speed={2000} />
                      <p className="text-sm text-gray-400 mt-2">Normal</p>
                    </div>
                    
                    <div className="text-center">
                      <AnimatedLogo size={120} speed={3000} />
                      <p className="text-sm text-gray-400 mt-2">Slow</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Color Logo */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Star className="mr-2 text-yellow-400" />
                    Color Logo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white p-8 rounded-lg flex items-center justify-center">
                    <img src="/logos/orbitdynamix-logo-color.svg" alt="OrbitDynamix Color Logo" className="h-16" />
                  </div>
                  <div className="space-y-2">
                    <Button 
                      onClick={() => downloadOfficialLogo('color')} 
                      className="w-full bg-orbit-cyan hover:bg-orbit-cyan/80"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download SVG
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => copyLogoUrl('color')} 
                      className="w-full"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy URL
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Best for light backgrounds and full-color applications
                  </p>
                </CardContent>
              </Card>

              {/* Dark Logo */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Star className="mr-2 text-gray-400" />
                    Dark Logo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-800 p-8 rounded-lg flex items-center justify-center">
                    <img src="/logos/orbitdynamix-logo-dark.svg" alt="OrbitDynamix Dark Logo" className="h-16" />
                  </div>
                  <div className="space-y-2">
                    <Button 
                      onClick={() => downloadOfficialLogo('dark')} 
                      className="w-full bg-orbit-cyan hover:bg-orbit-cyan/80"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download SVG
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => copyLogoUrl('dark')} 
                      className="w-full"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy URL
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Perfect for dark backgrounds and monochrome applications
                  </p>
                </CardContent>
              </Card>

              {/* Symbol Only */}
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Star className="mr-2 text-orbit-cyan" />
                    Symbol Only
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-white p-8 rounded-lg flex items-center justify-center">
                    <img src="/logos/orbitdynamix-symbol.svg" alt="OrbitDynamix Symbol" className="h-16" />
                  </div>
                  <div className="space-y-2">
                    <Button 
                      onClick={() => downloadOfficialLogo('symbol')} 
                      className="w-full bg-orbit-cyan hover:bg-orbit-cyan/80"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download SVG
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => copyLogoUrl('symbol')} 
                      className="w-full"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy URL
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400">
                    Ideal for favicons, social media profiles, and compact spaces
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Usage Guidelines */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Logo Usage Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-orbit-cyan mb-3">Do's</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Use the color logo on light backgrounds</li>
                      <li>• Use the dark logo on dark backgrounds</li>
                      <li>• Maintain proper spacing around the logo</li>
                      <li>• Keep the proportions intact when resizing</li>
                      <li>• Use the symbol for small applications</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-3">Don'ts</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Don't stretch or distort the logo</li>
                      <li>• Don't change the colors arbitrarily</li>
                      <li>• Don't place on busy backgrounds</li>
                      <li>• Don't add effects or shadows</li>
                      <li>• Don't recreate or modify the logo</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Design Studio Tab */}
          <TabsContent value="designer" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Tools Panel */}
              <div className="lg:col-span-1">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Palette className="mr-2" />
                      Design Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Quick Template */}
                    <div>
                      <Button onClick={loadTemplate} variant="outline" className="w-full">
                        <Star className="w-4 h-4 mr-2" />
                        Load Template
                      </Button>
                    </div>

                    {/* Tool Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Tools</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { tool: 'text', icon: Type, label: 'Text' },
                          { tool: 'circle', icon: Circle, label: 'Circle' },
                          { tool: 'square', icon: Square, label: 'Square' },
                          { tool: 'triangle', icon: Triangle, label: 'Triangle' }
                        ].map(({ tool, icon: Icon, label }) => (
                          <Button
                            key={tool}
                            variant={selectedTool === tool ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTool(tool as any)}
                            className="flex flex-col items-center p-2"
                          >
                            <Icon className="w-4 h-4 mb-1" />
                            <span className="text-xs">{label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Color Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Colors</label>
                      <div className="grid grid-cols-4 gap-2 mb-2">
                        {presetColors.map(color => (
                          <button
                            key={color}
                            className={`w-8 h-8 rounded border-2 ${selectedColor === color ? 'border-white' : 'border-gray-600'}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setSelectedColor(color)}
                          />
                        ))}
                      </div>
                      <Input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-full h-10"
                      />
                    </div>

                    {/* Text Options */}
                    {selectedTool === 'text' && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Text</label>
                        <Input
                          value={textInput}
                          onChange={(e) => setTextInput(e.target.value)}
                          placeholder="Enter text..."
                          className="bg-white/10 border-white/20"
                        />
                        <label className="block text-sm font-medium">Font Size</label>
                        <Input
                          type="number"
                          value={fontSize}
                          onChange={(e) => setFontSize(Number(e.target.value))}
                          min="12"
                          max="72"
                          className="bg-white/10 border-white/20"
                        />
                      </div>
                    )}

                    {/* Actions */}
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={undo} disabled={historyIndex <= 0}>
                          <Undo className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={redo} disabled={historyIndex >= history.length - 1}>
                          <Redo className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button size="sm" variant="destructive" onClick={clearCanvas} className="w-full">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear
                      </Button>
                      <Button size="sm" onClick={downloadCanvas} className="w-full bg-orbit-cyan hover:bg-orbit-cyan/80">
                        <Download className="w-4 h-4 mr-2" />
                        Download Design
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Canvas Area */}
              <div className="lg:col-span-3">
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Design Canvas</CardTitle>
                    <p className="text-gray-400 text-sm">Click on the canvas to add elements</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center">
                      <canvas
                        ref={canvasRef}
                        width={800}
                        height={600}
                        onClick={handleCanvasClick}
                        className="border border-white/20 rounded-lg cursor-crosshair"
                        style={{ maxWidth: '100%', height: 'auto' }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DemoLogo;