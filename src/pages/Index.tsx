
import React, { useEffect, lazy, Suspense, useState } from "react";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import SkillCard from "@/components/SkillCard";
import TechStack from "@/components/TechStack";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Code, Database, Briefcase, MessageSquare, Github, Linkedin, MapPin, FileCode, FileJson, CloudCog } from "lucide-react";

// Lazy load components that are not needed immediately
// Add error boundaries to each lazy loaded component with better error handling

const ProjectCard = lazy(() =>
  import("@/components/ProjectCard")
    .catch(err => {
      console.error("Failed to load ProjectCard:", err);
      // Return a simple fallback component
      return {
        default: (props: any) => (
          <div className="glass-effect p-6">
            <h3 className="text-2xl font-bold mb-2">{props.title || "Project"}</h3>
            <p className="text-muted-foreground mb-4">{props.description || "Project details unavailable"}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {props.tags?.map((tag: string, i: number) => (
                <span key={i} className="text-xs bg-secondary rounded-full px-3 py-1 text-secondary-foreground">
                  {tag}
                </span>
              )) || <span className="text-xs bg-secondary rounded-full px-3 py-1 text-secondary-foreground">Project</span>}
            </div>
          </div>
        )
      };
    })
);

const GHLContactForm = lazy(() =>
  import("@/components/GHLContactForm")
    .catch(err => {
      console.error("Failed to load GHLContactForm:", err);
      // Return a simple fallback component
      return {
        default: () => (
          <div className="glass-effect p-6">
            <h3 className="text-xl font-semibold mb-4">Contact Form Unavailable</h3>
            <p className="text-muted-foreground mb-4">
              Sorry, the contact form couldn't be loaded. Please email me directly at:
            </p>
            <a href="mailto:stephenj.lovino@gmail.com" className="text-primary hover:underline">
              stephenj.lovino@gmail.com
            </a>
          </div>
        )
      };
    })
);

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full h-full min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => (
  <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center p-4 text-center">
    <p className="text-destructive mb-4">Something went wrong:</p>
    <p className="text-muted-foreground mb-4 text-sm">{error.message}</p>
    <Button onClick={resetErrorBoundary} variant="outline" size="sm">
      Try again
    </Button>
  </div>
);

// Custom error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode, fallback: React.ReactNode },
  { hasError: boolean, error: Error | null }
> {
  constructor(props: { children: React.ReactNode, fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

const Index = () => {
  useEffect(() => {
    document.title = "Stephen Lovino | Frontend Developer & GHL Expert";
  }, []);

  const tools = {
    development: [
      { name: "React", icon: Code },
      { name: "HTML5", icon: FileCode },
      { name: "JavaScript", icon: FileJson },
      { name: "VSCode", icon: Code },
      { name: "Firebase", icon: Database },
      { name: "Vercel", icon: CloudCog },
    ],
    automation: [
      { name: "GoHighLevel", icon: Briefcase },
      { name: "Zapier", icon: Database },
      { name: "Make.com", icon: Database },
      { name: "n8n", icon: Database },
      { name: "Airtable", icon: Database },
    ],
    collaboration: [
      { name: "GitHub", icon: Github },
      { name: "Google Workspace", icon: CloudCog },
      { name: "Slack", icon: MessageSquare },
      { name: "Microsoft 365", icon: MessageSquare },
    ],
  };

  const experiences = [
    {
      company: "Freelance",
      role: "GoHighLevel Automation and Website Expert",
      period: "2023 - Present",
      descriptions: [
        "2+ years experience in GoHighLevel platform development",
        "Building high-converting websites and automation systems",
        "Custom website development and business process automation",
      ],
    },
    {
      company: "Xfusion",
      role: "Support Agent",
      period: "Nov 2022 - Present",
      descriptions: [
        "Client support and technical assistance",
        "Integration of automation tools (Zapier, Make.com)",
        "Process optimization and documentation",
      ],
    },
    {
      company: "Wells Fargo",
      role: "Senior Treasury Technical Support",
      period: "Oct 2021 - Nov 2022",
      descriptions: [
        "Technical support and client assistance",
        "Process documentation and optimization",
        "Integration of automation workflows",
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <div className="container text-center px-4 z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Hi, I'm <span className="text-gradient">Stephen</span>,{" "}
            <TypeAnimation
              sequence={[
                'a Computer Engineer',
                1000,
                'an AI Expert',
                1000,
                'a Frontend Developer',
                1000,
                'a GHL Specialist',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor={true}
            />
          </h1>
          <p className="max-w-2xl mx-auto text-lg mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            A passionate Computer Engineer with a strong love for web development, automations, and AI tools. I'm focused on creating high-converting websites, sleek frontends, and smart business solutions through platforms like GoHighLevel, WordPress, and React.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Button asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#projects">View Projects</a>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-10 w-full flex justify-center animate-bounce">
          <a href="#about" className="text-foreground/60 hover:text-foreground transition-colors">
            <ArrowDown />
          </a>
        </div>
      </section>

      {/* About Section */}
      <Section
        id="about"
        title="About Me"
        subtitle="Get to know my background and expertise"
        className="relative overflow-hidden"
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-secondary/5 dark:from-secondary/10 dark:via-transparent dark:to-secondary/10 z-0"></div>

        <div className="flex flex-col items-center min-h-[60vh] relative z-10 max-w-4xl mx-auto">
          {/* Text content */}
          <div className="w-full py-8 z-20">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-medium mb-6 text-gradient">Frontend Developer & GHL Expert</h3>
              <p className="mb-5 text-muted-foreground text-lg">
                Based in San Fernando, Pampanga, Philippines, I specialize in creating modern web experiences and streamlining business operations through cutting-edge technologies.
              </p>
              <p className="mb-8 text-muted-foreground text-lg">
                With over 2 years of dedicated experience in GoHighLevel development, I've been actively building websites and web applications. My expertise spans across modern web technologies and automation tools, allowing me to create comprehensive solutions for businesses.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" asChild size="sm" className="border-primary/30 hover:border-primary">
                  <a href="https://github.com/StephenLovino" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                </Button>
                <Button variant="outline" asChild size="sm" className="border-primary/30 hover:border-primary">
                  <a href="https://linkedin.com/in/stephenlovino" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                </Button>

              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Experience Section */}
      <Section
        id="experience"
        title="Experience"
        subtitle="My professional journey"
      >
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="glass-effect p-6 relative">
              <div className="flex flex-col md:flex-row gap-4 md:items-start md:justify-between">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-semibold">{exp.company}</h3>
                  <p className="text-primary">{exp.role}</p>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                </div>
                <ul className="space-y-2 mt-4 md:mt-0 md:w-2/3">
                  {exp.descriptions.map((desc, i) => (
                    <li key={i} className="text-muted-foreground flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-2"></div>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Tools Section */}
      <Section
        id="tools"
        title="Tools & Technologies"
        subtitle="The tools I work with daily"
        className="relative"
      >
        {/* Add a subtle space-like background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-primary/20"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>

        <TechStack className="mt-8 relative z-10" />
      </Section>

      {/* Skills Section */}
      <Section
        id="skills"
        title="My Skills"
        subtitle="Technologies and tools I work with"
        className="relative"
      >
        {/* Add a subtle space-like background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-primary/20"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          <SkillCard
            title="Coding Languages"
            skills={["HTML", "CSS", "JavaScript", "React"]}
            icon={Code}
          />
          <SkillCard
            title="Systems"
            skills={["Windows", "Cloud Platforms"]}
            icon={Database}
          />
          <SkillCard
            title="CRM Tools"
            skills={["GoHighLevel", "Hubspot", "Pipedrive"]}
            icon={Briefcase}
          />
          <SkillCard
            title="AI Tools"
            skills={["ChatGPT", "Midjourney", "Zapier", "Make.com"]}
            icon={MessageSquare}
          />
        </div>
      </Section>

      {/* Projects Section */}
      <Section
        id="projects"
        title="Featured Projects"
        subtitle="Some of my recent work"
        className="relative"
      >
        {/* Add a subtle space-like background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-primary/20"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `twinkle ${Math.random() * 5 + 3}s infinite ${Math.random() * 5}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-12 relative z-10">
          {/* React Projects */}
          <h3 className="text-xl font-medium mb-6">React Projects</h3>

          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6">
                <h3 className="text-2xl font-bold mb-2">Launchpad Website Craft</h3>
                <p className="text-muted-foreground mb-4">A modern agency website showcasing services in web design, branding, and business automation. Built using React, Tailwind CSS, and deployed on Vercel.</p>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <ProjectCard
                title="Launchpad Website Craft"
                description="A modern agency website showcasing services in web design, branding, and business automation. Features responsive design, smooth animations, and optimized performance."
                image="/projects/launchpad.jpg"
                tags={["React", "Tailwind CSS", "Vercel", "Firebase"]}
                liveUrl="https://launchpad-website-craft.vercel.app/"
                githubUrl="https://github.com/StephenLovino/launchpad-website"
              />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6 mt-12">
                <h3 className="text-2xl font-bold mb-2">Image Source Finder</h3>
                <p className="text-muted-foreground mb-4">A tool that helps users find the original source of images across the web. Uses advanced image recognition and search algorithms.</p>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <ProjectCard
                title="Image Source Finder"
                description="A tool that helps users find the original source of images across the web. Uses advanced image recognition and search algorithms to trace images back to their origins."
                image="/projects/image-source-finder.jpg"
                tags={["React", "Tailwind CSS", "Vercel", "Supabase"]}
                liveUrl="https://image-source-finder.vercel.app/"
                className="mt-12"
              />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6 mt-12">
                <h3 className="text-2xl font-bold mb-2">Timepiece</h3>
                <p className="text-muted-foreground mb-4">An elegant watch showcase and e-commerce platform featuring high-end timepieces with detailed specifications and purchasing options.</p>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <ProjectCard
                title="Timepiece"
                description="An elegant watch showcase and e-commerce platform featuring high-end timepieces with detailed specifications and purchasing options. Includes user authentication and shopping cart functionality."
                image="/projects/timepiece.jpg"
                tags={["React", "Tailwind CSS", "Vercel", "Firebase"]}
                liveUrl="https://timepiece.site/"
                className="mt-12"
              />
            </Suspense>
          </ErrorBoundary>

          {/* GoHighLevel Projects */}
          <h3 className="text-xl font-medium mb-6 mt-16">GoHighLevel Projects</h3>

          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6">
                <h3 className="text-2xl font-bold mb-2">AHA Innovations</h3>
                <p className="text-muted-foreground mb-4">A business website for a consulting firm specializing in innovation strategies and digital transformation solutions.</p>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <ProjectCard
                title="AHA Innovations"
                description="A business website for a consulting firm specializing in innovation strategies and digital transformation solutions. Features custom animations, contact forms, and service showcases."
                image="/projects/aha-innovations.jpg"
                tags={["WordPress", "Custom CSS", "Responsive Design"]}
                liveUrl="https://aha-innovations.com/"
              />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6 mt-12">
                <h3 className="text-2xl font-bold mb-2">Millennial Business Innovations</h3>
                <p className="text-muted-foreground mb-4">A modern business platform showcasing innovative solutions for millennial entrepreneurs and startups.</p>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <ProjectCard
                title="Millennial Business Innovations"
                description="A modern business platform showcasing innovative solutions for millennial entrepreneurs and startups. Includes blog section, service offerings, and lead generation forms."
                image="/projects/millennial.jpg"
                tags={["WordPress", "GoHighLevel", "SEO Optimization"]}
                liveUrl="https://millennialbusinessinnovations.com/"
                className="mt-12"
              />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6 mt-12">
                <h3 className="text-2xl font-bold mb-2">RR Twins</h3>
                <p className="text-muted-foreground mb-4">A vacation rentals booking website with booking capabilities powered by GoHighLevel.</p>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <ProjectCard
                title="RR Twins"
                description="A vacation rentals booking website with booking capabilities powered by GoHighLevel. Features property listings, booking functionality, and integrated payment processing."
                image="/projects/rrtwins.jpg"
                tags={["GoHighLevel", "Custom Design", "Booking System", "Media Integration"]}
                liveUrl="http://rrtwins.com/"
                className="mt-12"
              />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6 mt-12">
                <h3 className="text-2xl font-bold mb-2">Undertake PH</h3>
                <p className="text-muted-foreground mb-4">An apparel shop e-commerce website powered by GoHighLevel.</p>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <ProjectCard
                title="Undertake PH"
                description="An apparel shop e-commerce website powered by GoHighLevel. Features product catalog, shopping cart functionality, and secure checkout process for clothing and merchandise."
                image="/projects/undertake.jpg"
                tags={["GoHighLevel", "E-commerce", "Product Catalog", "Custom Design"]}
                liveUrl="http://undertakeph.com/"
                className="mt-12"
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      </Section>

      {/* Contact Section */}
      <Section
        id="contact"
        title="Get In Touch"
        subtitle="Interested in working together? Reach out to me!"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Let's Connect</h3>
            <p className="text-muted-foreground mb-6">
              Whether you have a project in mind or just want to say hello, I'd love to hear from you. Fill out the form and I'll get back to you as soon as possible.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href="mailto:stephenj.lovino@gmail.com"
                    className="font-medium hover:text-primary transition-colors"
                  >
                    stephenj.lovino@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">San Fernando, Pampanga, Philippines</p>
                </div>
              </div>
            </div>
          </div>
          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6">
                <h3 className="text-xl font-semibold mb-4">Contact Form Unavailable</h3>
                <p className="text-muted-foreground mb-4">
                  Sorry, the contact form couldn't be loaded. Please email me directly at:
                </p>
                <a href="mailto:stephenj.lovino@gmail.com" className="text-primary hover:underline">
                  stephenj.lovino@gmail.com
                </a>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              {typeof window !== 'undefined' && <GHLContactForm />}
            </Suspense>
          </ErrorBoundary>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-secondary/10 py-8">
        <div className="container text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Stephen Lovino. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
