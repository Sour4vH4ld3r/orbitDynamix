import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Printer, Share2, Mail, Phone, Globe, MapPin } from "lucide-react";
import html2canvas from 'html2canvas';

const BusinessCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleDownload = () => {
    // Find the business card element
    const cardElement = document.querySelector('.business-card-container');
    
    if (!cardElement) {
      alert('Business card not found');
      return;
    }

    // Use html2canvas to capture the business card
    html2canvas(cardElement as HTMLElement, {
      useCORS: true,
      allowTaint: true,
    }).then((canvas) => {
      // Create download link
      const link = document.createElement('a');
      link.download = 'orbitdynamix-business-card.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }).catch((error) => {
      console.error('Error generating image:', error);
      alert('Error downloading business card. Please try again.');
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const businessCardData = {
    front: {
      name: "Sourav Halder",
      title: "Founder & CEO",
      company: "OrbitDynamix",
      tagline: "Orbiting Innovation, Delivering Excellence"
    },
    back: {
      services: [
        "Web Development",
        "Mobile Apps",
        "Cloud Solutions",
        "UI/UX Design"
      ]
    },
    contact: {
      email: "official@orbitdynamix.com",
      phone: "7908099602",
      website: "https://orbitdynamix.com",
      address: "Mukundapur, Kolkata, West Bengal, India 700099"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orbit-dark via-orbit-slate-dark to-orbit-dark py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">OrbitDynamix Business Card</h1>
          <p className="text-xl text-gray-300">Professional visiting card design</p>
        </div>

        {/* Business Card Preview */}
        <div className="flex justify-center mb-8">
          <div className="perspective-1000">
            <div 
              className={`business-card-container relative w-96 h-56 transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
              onClick={() => setIsFlipped(!isFlipped)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front Side */}
              {/* background_card.png */}
              <Card className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 border border-orbit-cyan/30 shadow-2xl backface-hidden rounded-2xl overflow-hidden" style={{backgroundImage: 'url(/background_card.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <CardContent  className="p-8 h-full relative flex flex-col justify-center items-center" >
                  {/* Logo Section */}
                  <div className="text-center mb-6">
                    <img style={{width: '65px', height: '65px'}} src="/logo.svg" alt="OrbitDynamix Logo" className=" mb-1 drop-shadow-2xl mx-auto" />
                    <h1 className="text-xl font-bold gradient-text mb-2">OrbitDynamix</h1>
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-orbit-cyan to-transparent mx-auto"></div>
                  </div>
                  
                  {/* Name & Title */}
                  <div className="text-center space-y-2">
                    <h2 className="text-lg font-semibold text-white tracking-wide">
                      {businessCardData.front.name}
                    </h2>
                    <p className="text-orbit-cyan text-sm font-medium uppercase tracking-widest">
                      {businessCardData.front.title}
                    </p>
                    <p className="text-white-400 text-xs italic max-w-xs mx-auto leading-relaxed mt-2">
                      {businessCardData.front.tagline}
                    </p>
                  </div>

                  {/* Decorative Corner Elements */}
                    <div style={{borderColor: '#9333EA'}} className="absolute top-5 left-5 w-3 h-3 border-l-2 border-t-2 "></div>
                    <div style={{borderColor: '#9333EA'}} className="absolute top-5 right-5 w-3 h-3 border-r-2 border-t-2 "></div>
                    <div style={{borderColor: '#9333EA'}} className="absolute bottom-5 left-5 w-3 h-3 border-l-2 border-b-2 "></div>
                    <div style={{borderColor: '#9333EA'}} className="absolute bottom-5 right-5 w-3 h-3 border-r-2 border-b-2 "></div>
                  
                  {/* Center Decorative Elements */}
                  <div style={{borderColor: '#9333EA'}} className="absolute top-1/2 left-4 w-1 h-8 bg-gradient-to-b from-transparent via-orbit-cyan to-transparent opacity-80"></div>
                  <div style={{borderColor: '#9333EA'}} className="absolute top-1/2 right-4 w-1 h-8 bg-gradient-to-b from-transparent via-orbit-purple to-transparent opacity-80"></div>
                </CardContent>
              </Card>

              {/* Back Side */}
              <Card className="absolute inset-0 w-full h-full bg-gradient-to-bl from-slate-800 to-slate-900 border border-orbit-purple/30 shadow-2xl rotate-y-180 backface-hidden rounded-2xl overflow-hidden" style={{backgroundImage: 'url(/background_card.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <CardContent className="p-8 h-full relative flex flex-col justify-between">
                  {/* Top Section */}
                  <div>
                    {/* Header Row - Company Name and Logo */}
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h2 className="text-md font-bold text-white">OrbitDynamix</h2>
                        <p className="text-orbit-cyan text-xs font-medium uppercase tracking-wider">Your Digital Partner</p>
                      </div>
                      <div className="flex-shrink-0">
                        <img style={{width: '50px', height: '50px'}} src="/logo.svg" alt="OrbitDynamix Logo" className="opacity-90" />
                      </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex justify-between items-start">
                      {/* Left - Contact Information */}
                      <div className="flex-1 space-y-1 pr-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-orbit-cyan/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Phone className="w-3 h-3 text-orbit-cyan" />
                          </div>
                          <span className="text-white text-xs font-medium">+91 {businessCardData.contact.phone}</span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-orbit-purple/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Mail className="w-3 h-3" style={{color: '#9333EA'}} />
                          </div>
                          <span className="text-white text-xs font-medium">{businessCardData.contact.email}</span>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-gradient-to-r from-orbit-cyan/20 to-orbit-purple/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Globe style={{color: '#9333EA'}} className="w-3 h-3" />
                          </div>
                          <span className="text-white text-xs font-medium">{businessCardData.contact.website}</span>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-orbit-purple/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <MapPin style={{color: '#9333EA'}} className="w-3 h-3" />
                          </div>
                          <span className="text-white text-xs font-medium leading-relaxed flex-1">{businessCardData.contact.address}</span>
                        </div>
                      </div>

                      {/* Right - QR Code */}
                      <div className="flex-shrink-0">
                        <div className="bg-transparent p-0 rounded-md shadow-md">
                          <img style={{width: '80px', height: '80px'}} src="/qrcode_220575047_6000c57b47926bf948d4022c20c750a1.png" alt="OrbitDynamix QR Code" className="block" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Tagline */}
                  <div className="pt-2">
                    {/* <div className="w-full h-px bg-gradient-to-r from-transparent via-orbit-cyan to-transparent mb-3"></div> */}
                    {/* <p style={{fontSize: '14px'}} className="text-gray-400 text-xs italic text-center leading-relaxed">{businessCardData.front.tagline}</p> */}
                  </div>

                  {/* Corner Decorations */}
                  <div style={{borderColor: '#9333EA'}} className="absolute top-3 left-3 w-3 h-3 border-l-2 border-t-2 "></div>
                  <div style={{borderColor: '#9333EA'}} className="absolute top-3 right-3 w-3 h-3 border-r-2 border-t-2 "></div>      
                  <div style={{borderColor: '#9333EA'}} className="absolute bottom-3 left-3 w-3 h-3 border-l-2 border-b-2 "></div>
                  <div style={{borderColor: '#9333EA'}} className="absolute bottom-3 right-3 w-3 h-3 border-r-2 border-b-2 "></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Click to flip instruction */}
        <div className="text-center mb-8">
          <p className="text-gray-400 text-sm">Click the card to flip and see the back side</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button onClick={handleDownload} className="orbit-btn flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download PNG
          </Button>
          <Button onClick={handlePrint} variant="outline" className="border-orbit-cyan text-orbit-cyan hover:bg-orbit-cyan hover:text-orbit-dark flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button variant="outline" className="border-orbit-purple text-orbit-purple hover:bg-orbit-purple hover:text-white flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        {/* Card Specifications */}
        <Card className="max-w-2xl mx-auto bg-orbit-slate-dark border-orbit-slate-light">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold gradient-text mb-4">Card Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <div>
                <h4 className="font-semibold text-orbit-cyan mb-2">Print Specifications</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Standard Size: 3.5" × 2" (89mm × 51mm)</li>
                  <li>• Resolution: 300 DPI</li>
                  <li>• Color Mode: CMYK</li>
                  <li>• Bleed: 0.125" (3mm)</li>
                  <li>• Paper: 350gsm Premium Cardstock</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orbit-cyan mb-2">Design Features</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Gradient background</li>
                  <li>• Modern typography</li>
                  <li>• Brand color scheme</li>
                  <li>• Professional layout</li>
                  <li>• Double-sided design</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customization Note */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            💡 This design can be customized with your personal information and exported for professional printing.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        @media print {
          body * {
            visibility: hidden;
          }
          .business-card-print, .business-card-print * {
            visibility: visible;
          }
          .business-card-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 3.5in;
            height: 2in;
          }
        }
      `}} />
    </div>
  );
};

export default BusinessCard; 