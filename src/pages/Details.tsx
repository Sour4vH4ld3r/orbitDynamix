import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Details = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orbit-dark via-orbit-slate-dark to-orbit-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div style={{marginTop: '30px'}}  className="text-center mb-12">
          {/* <img src="/logo.svg" alt="OrbitDynamix Logo" className="h-20 w-auto mx-auto mb-6" /> */}
          <h1  className="text-4xl font-bold gradient-text mb-4">OrbitDynamix - Complete Brand Overview</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive guide to our brand, services, and vision for client presentations and marketing discussions
          </p>
        </div>

        {/* Logo & Brand Identity Section */}
        {/* <Card className="mb-8 bg-orbit-slate-dark border-orbit-slate-light">
          <CardHeader>
            <CardTitle className="text-2xl gradient-text">🎨 Logo & Brand Identity</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-orbit-cyan mb-3">Logo Concept</h3>
                <ul className="space-y-2">
                  <li>• <strong>OrbitDynamix</strong> - Represents dynamic orbital solutions</li>
                  <li>• Modern, tech-forward design with cosmic elements</li>
                  <li>• Versatile across digital and print media</li>
                  <li>• Scalable from business cards to billboards</li>
                  <li>• Available in multiple formats (SVG, PNG, PDF)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-orbit-cyan mb-3">Brand Colors</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orbit-cyan rounded"></div>
                    <span>Orbit Cyan (#00E5FF) - Primary</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orbit-purple rounded"></div>
                    <span>Orbit Purple (#8B5CF6) - Secondary</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orbit-dark rounded border border-gray-600"></div>
                    <span>Orbit Dark (#0F0F23) - Background</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}

        {/* Services Overview */}
        <Card className="mb-8 bg-orbit-slate-dark border-orbit-slate-light">
          <CardHeader>
            <CardTitle className="text-2xl gradient-text">🚀 Our Services Portfolio</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-orbit-cyan mb-3">Web Development</h3>
                <ul className="space-y-1">
                  <li>• Custom Web Applications</li>
                  <li>• E-commerce Solutions</li>
                  <li>• Progressive Web Apps</li>
                  <li>• API Development</li>
                  <li>• Database Design</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-orbit-cyan mb-3">Mobile Development</h3>
                <ul className="space-y-1">
                  <li>• iOS Applications</li>
                  <li>• Android Applications</li>
                  <li>• Cross-platform Solutions</li>
                  <li>• React Native Apps</li>
                  <li>• Flutter Development</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-orbit-cyan mb-3">Cloud & DevOps</h3>
                <ul className="space-y-1">
                  <li>• AWS Cloud Solutions</li>
                  <li>• Docker Containerization</li>
                  <li>• CI/CD Pipelines</li>
                  <li>• Microservices Architecture</li>
                  <li>• Performance Optimization</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="mb-8 bg-orbit-slate-dark border-orbit-slate-light">
          <CardHeader>
            <CardTitle className="text-2xl gradient-text">⚡ Technology Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker',
                'MongoDB', 'PostgreSQL', 'GraphQL', 'React Native', 'Flutter', 'Laravel'
              ].map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-orbit-cyan/20 text-orbit-cyan border-orbit-cyan/30 justify-center py-2">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-orbit-slate-dark border-orbit-slate-light">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">🎯 Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="text-lg leading-relaxed">
                To become the leading force in digital transformation, creating innovative solutions that orbit around 
                our clients' success. We envision a future where technology seamlessly integrates with business goals, 
                driving growth and creating lasting impact in the digital landscape.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-orbit-slate-dark border-orbit-slate-light">
            <CardHeader>
              <CardTitle className="text-2xl gradient-text">🌟 Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="text-lg leading-relaxed">
                To deliver cutting-edge web and mobile solutions that empower businesses to thrive in the digital age. 
                We are committed to excellence, innovation, and building long-term partnerships with our clients through 
                transparent communication and exceptional results.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Client Presentation Points */}
        <Card className="mb-8 bg-orbit-slate-dark border-orbit-slate-light">
          <CardHeader>
            <CardTitle className="text-2xl gradient-text">💼 10-Minute Presentation Outline</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-orbit-cyan mb-4">Presentation Flow</h3>
                <ol className="space-y-2">
                  <li><strong>1-2 min:</strong> Company Introduction & Logo</li>
                  <li><strong>2-3 min:</strong> Our Services Overview</li>
                  <li><strong>1-2 min:</strong> Technology Stack & Expertise</li>
                  <li><strong>2-3 min:</strong> Previous Projects & Success Stories</li>
                  <li><strong>1-2 min:</strong> Vision, Mission & Why Choose Us</li>
                  <li><strong>1 min:</strong> Next Steps & Call to Action</li>
                </ol>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-orbit-cyan mb-4">Key Talking Points</h3>
                <ul className="space-y-2">
                  <li>• <strong>Innovation:</strong> Cutting-edge solutions</li>
                  <li>• <strong>Reliability:</strong> 99.9% uptime guarantee</li>
                  <li>• <strong>Scalability:</strong> Future-proof architecture</li>
                  <li>• <strong>Support:</strong> 24/7 technical support</li>
                  <li>• <strong>ROI:</strong> Measurable business impact</li>
                  <li>• <strong>Timeline:</strong> Agile delivery methodology</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Marketing Materials */}
        <Card className="mb-8 bg-orbit-slate-dark border-orbit-slate-light">
          <CardHeader>
            <CardTitle className="text-2xl gradient-text">📈 Marketing & Sales Materials</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-orbit-cyan mb-3">Brand Assets</h3>
                <ul className="space-y-1">
                  <li>• Logo variations (light/dark)</li>
                  <li>• Business card templates</li>
                  <li>• Letterhead design</li>
                  <li>• Social media templates</li>
                  <li>• Presentation slides</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-orbit-cyan mb-3">Digital Materials</h3>
                <ul className="space-y-1">
                  <li>• Website portfolio</li>
                  <li>• Case study documents</li>
                  <li>• Service brochures</li>
                  <li>• Technical whitepapers</li>
                  <li>• Client testimonials</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-orbit-cyan mb-3">Proposals</h3>
                <ul className="space-y-1">
                  <li>• Project proposal templates</li>
                  <li>• Pricing structure guides</li>
                  <li>• Timeline templates</li>
                  <li>• Contract templates</li>
                  <li>• ROI calculators</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Next Steps */}
        <Card className="bg-gradient-to-r from-orbit-cyan/20 to-orbit-purple/20 border-orbit-cyan/30">
          <CardHeader>
            <CardTitle className="text-2xl gradient-text text-center">🤝 Ready to Get Started?</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-300">
            <p className="text-lg mb-6">
              Let's discuss how OrbitDynamix can transform your digital presence and drive your business forward.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="text-orbit-cyan">Email:</strong><br />
                official@orbitdynamix.com
              </div>
              <div>
                <strong className="text-orbit-cyan">Phone:</strong><br />
                +91 7908099602
              </div>
              <div>
                <strong className="text-orbit-cyan">Website:</strong><br />
                <a href="https://orbitdynamix.com" target="_blank" rel="noopener noreferrer">https://orbitdynamix.com</a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>🔒 This page is confidential and intended for internal use and client presentations only.</p>
        </div>
      </div>
    </div>
  );
};

export default Details; 