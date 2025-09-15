import React, { useRef } from 'react';
import { Download } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdvertisementPoster = () => {
  const posterRef = useRef<HTMLDivElement>(null);

  const downloadAsImage = async (elementRef: React.RefObject<HTMLDivElement>, filename: string) => {
    if (!elementRef.current) return;

    try {
      // Show loading state
      const loadingToast = document.createElement('div');
      loadingToast.innerHTML = '📸 Generating image...';
      loadingToast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #06b6d4, #8b5cf6);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      `;
      document.body.appendChild(loadingToast);

      // Dynamically import html2canvas
      const html2canvas = (await import('html2canvas')).default;
      
      // Hide download buttons temporarily for cleaner capture
      const downloadButtons = elementRef.current.querySelectorAll('button');
      downloadButtons.forEach(btn => {
        if (btn.textContent?.includes('Download')) {
          btn.style.display = 'none';
        }
      });

      // Wait a moment for the DOM to update
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Capture with optimized settings
      const canvas = await html2canvas(elementRef.current, {
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: elementRef.current.offsetWidth,
        height: elementRef.current.offsetHeight,
      });

      // Show download buttons again
      downloadButtons.forEach(btn => {
        if (btn.textContent?.includes('Download')) {
          btn.style.display = '';
        }
      });

      // Create and download the image
      const link = document.createElement('a');
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Remove loading toast and show success
      document.body.removeChild(loadingToast);
      
      // Show success toast
      const successToast = document.createElement('div');
      successToast.innerHTML = `✅ Downloaded: ${filename}.png`;
      successToast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #10b981, #059669);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      `;
      document.body.appendChild(successToast);
      
      // Auto-remove success toast after 3 seconds
      setTimeout(() => {
        if (document.body.contains(successToast)) {
          document.body.removeChild(successToast);
        }
      }, 3000);
      
    } catch (error) {
      console.error('Error generating image:', error);
      
      // Show error toast
      const errorToast = document.createElement('div');
      errorToast.innerHTML = '❌ Error generating image';
      errorToast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #ef4444, #dc2626);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      `;
      document.body.appendChild(errorToast);
      
      // Auto-remove error toast after 3 seconds
      setTimeout(() => {
        if (document.body.contains(errorToast)) {
          document.body.removeChild(errorToast);
        }
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orbit-dark via-orbit-slate-dark to-orbit-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Advertisement Poster Creator</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Create stunning marketing posters for OrbitDynamix
          </p>
        </div>

        {/* Empty State */}
        <div className="flex justify-center">
          <Card className="bg-orbit-slate-dark border-orbit-slate-light w-full max-w-md">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🎨</div>
              <h2 className="text-2xl font-bold gradient-text mb-4">Ready to Create</h2>
              <p className="text-gray-400 mb-6">
                All previous designs have been cleared. Ready for new poster designs.
              </p>
              <div className="text-sm text-gray-500">
                Waiting for new design instructions...
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementPoster;