
import React, { useEffect, lazy, Suspense, useState } from "react";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import SkillCard from "@/components/SkillCard";
import TechStack from "@/components/TechStack";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from 'react-type-animation';
import {
  ArrowDown, Code, Database, Briefcase, MessageSquare, Github, Linkedin, MapPin,
  FileCode, FileJson, CloudCog, Calendar, Flame, Zap, LayoutGrid, Server,
  Sparkles, Layers, Cpu, Workflow, Boxes
} from "lucide-react";
import CalendarDialog from "@/components/CalendarDialog";
import FloatingChatButton from "@/components/FloatingChatButton";
import ProfileCard from "@/components/ProfileCard";

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

const FeaturedProject = lazy(() =>
  import("@/components/FeaturedProject")
    .catch(err => {
      console.error("Failed to load FeaturedProject:", err);
      // Return a simple fallback component
      return {
        default: (props: any) => (
          <div className="glass-effect p-6">
            <h3 className="text-2xl font-bold mb-2">{props.title || "Project"}</h3>
            <p className="text-muted-foreground mb-4">{props.description || "Project details unavailable"}</p>
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

const GHLCalendar = lazy(() =>
  import("@/components/GHLCalendar")
    .catch(err => {
      console.error("Failed to load GHLCalendar:", err);
      // Return a simple fallback component
      return {
        default: () => (
          <div className="glass-effect p-6">
            <h3 className="text-xl font-semibold mb-4">Calendar Unavailable</h3>
            <p className="text-muted-foreground mb-4">
              Sorry, the booking calendar couldn't be loaded. Please email me directly to schedule a meeting:
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
      <FloatingChatButton />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left side - Text content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
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
            <p className="max-w-2xl mx-auto lg:mx-0 text-lg mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              A passionate Computer Engineer with a strong love for web development, automations, and AI tools. I'm focused on creating high-converting websites, sleek frontends, and smart business solutions through platforms like GoHighLevel, WordPress, and React.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <Button asChild>
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#projects">View Projects</a>
              </Button>
            </div>
          </div>
          
          {/* Right side - Profile Card */}
          <div className="flex-1 flex justify-center lg:justify-end animate-fade-in order-1 lg:order-2 mb-8 lg:mb-0" style={{ animationDelay: "0.8s" }}>
            <div className="w-full max-w-sm lg:max-w-md">
              <ProfileCard
                name="Stephen Lovino"
                title="Computer Engineer & AI Expert"
                handle="stephenlovino"
                status="Available for Projects"
                contactText="Contact Me"
                avatarUrl="/StephenLovino.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              />
            </div>
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
        title={
          <div className="flex flex-col items-center">
            <div className="text-sm uppercase tracking-wider mb-2 text-muted-foreground">FEATURED CASE STUDIES</div>
            <div className="text-4xl md:text-5xl font-bold">
              Curated <span className="text-primary">work</span>
            </div>
          </div>
        }
        subtitle=""
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

        <div className="space-y-24 relative z-10 mt-16">
          {/* DevCraft Project */}
          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6">
                <h3 className="text-2xl font-bold mb-2">DevCraft</h3>
                <p className="text-muted-foreground mb-4">Crafting Digital Excellence for Your Business</p>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <FeaturedProject
                title="DevCraft"
                subtitle="Crafting Digital Excellence for Your Business"
                description="We transform your ideas into powerful web solutions. Build and launch faster with our expert development team."
                image="/projects/launchpad.jpg"
                tagline="Crafting Digital Excellence for Your Business"
                features={[
                  { text: "Custom Web Development with cutting-edge technology." },
                  { text: "Responsive Design that works seamlessly across all devices." },
                  { text: "Performance Optimization for lightning-fast loading times." }
                ]}
                technologies={[
                  { name: "Next.js", icon: <Server className="w-4 h-4" /> },
                  { name: "React", icon: <Code className="w-4 h-4" /> },
                  { name: "Tailwind CSS", icon: <Layers className="w-4 h-4" /> },
                  { name: "TypeScript", icon: <FileCode className="w-4 h-4" /> },
                  { name: "Framer Motion", icon: <Zap className="w-4 h-4" /> }
                ]}
                accentColor="#ff3366"
                liveUrl="https://launchpad-website-craft.vercel.app/"
                useLiveThumbnail={true}
              />
            </Suspense>
          </ErrorBoundary>

          {/* BizPulse CRM Project */}
          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6">
                <h3 className="text-2xl font-bold mb-2">BizPulse CRM</h3>
                <p className="text-muted-foreground mb-4">Comprehensive CRM with Email Marketing</p>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <FeaturedProject
                title="BizPulse CRM"
                subtitle="Comprehensive CRM Platform with Email Marketing"
                description="A powerful Customer Relationship Management system built with modern web technologies, featuring email marketing automation, lead tracking, and comprehensive business tools to streamline operations and boost sales."
                image="/projects/bizpulse-crm.jpg"
                tagline="Transform your business with our all-in-one CRM solution featuring advanced email marketing and lead management."
                features={[
                  { text: "Built with Next.js, React, and TypeScript for enterprise scalability." },
                  { text: "Integrated email marketing automation and campaign management." },
                  { text: "Advanced lead tracking and customer relationship management." },
                  { text: "Responsive design optimized for all devices and platforms." },
                  { text: "Real-time analytics and performance monitoring dashboard." }
                ]}
                technologies={[
                  { name: "Next.js", icon: <Server className="w-4 h-4" /> },
                  { name: "React", icon: <Code className="w-4 h-4" /> },
                  { name: "TypeScript", icon: <FileCode className="w-4 h-4" /> },
                  { name: "Tailwind CSS", icon: <Layers className="w-4 h-4" /> },
                  { name: "Email Marketing", icon: <MessageSquare className="w-4 h-4" /> },
                  { name: "CRM Database", icon: <Database className="w-4 h-4" /> }
                ]}
                accentColor="#10b981"
                liveUrl="https://bizpulse-three.vercel.app/"
                useLiveThumbnail={true}
              />
            </Suspense>
          </ErrorBoundary>

          {/* Source Finder Project */}
          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6">
                <h3 className="text-2xl font-bold mb-2">Source Finder</h3>
                <p className="text-muted-foreground mb-4">Find the Source of Any Image or Video</p>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <FeaturedProject
                title="Source Finder"
                subtitle="Find the Source of Any Image or Video"
                description="Source Finder uses cutting-edge AI to identify the original source of images, screenshots, and video frames from movies, TV shows, anime, products, and social media."
                image="/projects/image-source-finder.jpg"
                tagline="New: Image & Video Source Finder with AI Chat"
                features={[
                  { text: "Built with Next.js, React, and TypeScript for scalability." },
                  { text: "Styled using Tailwind CSS with animations by Framer Motion." },
                  { text: "Used Zustand for state management and Zod for validation." },
                  { text: "Integrated AI-powered image recognition technology." },
                  { text: "Designed a user-friendly interface for seamless interactions." }
                ]}
                technologies={[
                  { name: "Next.js", icon: <Server className="w-4 h-4" /> },
                  { name: "React", icon: <Code className="w-4 h-4" /> },
                  { name: "Tailwind CSS", icon: <Layers className="w-4 h-4" /> },
                  { name: "TypeScript", icon: <FileCode className="w-4 h-4" /> },
                  { name: "Zustand", icon: <Database className="w-4 h-4" /> },
                  { name: "MongoDB", icon: <Database className="w-4 h-4" /> },
                  { name: "Node.JS", icon: <Server className="w-4 h-4" /> },
                  { name: "Express.JS", icon: <Workflow className="w-4 h-4" /> }
                ]}
                accentColor="#3366ff"
                liveUrl="https://image-source-finder.vercel.app/"
                useLiveThumbnail={true}
              />
            </Suspense>
          </ErrorBoundary>

          {/* Timepiece Project */}
          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6">
                <h3 className="text-2xl font-bold mb-2">Timepiece</h3>
                <p className="text-muted-foreground mb-4">An elegant watch showcase and e-commerce platform.</p>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <FeaturedProject
                title="Timepiece"
                subtitle="A luxury timepiece e-commerce platform with seamless booking capabilities."
                description="An elegant watch showcase featuring high-end timepieces with detailed specifications and purchasing options. Includes user authentication and shopping cart functionality."
                image="/projects/timepiece.jpg"
                tagline="Discover exquisite timepieces with our premium shopping experience designed for watch enthusiasts and collectors."
                features={[
                  { text: "Implemented secure user authentication and authorization." },
                  { text: "Created a responsive product catalog with advanced filtering." },
                  { text: "Integrated payment processing with Stripe and PayPal." },
                  { text: "Built a booking system for service appointments." }
                ]}
                technologies={[
                  { name: "React", icon: <Code className="w-4 h-4" /> },
                  { name: "Tailwind CSS", icon: <Layers className="w-4 h-4" /> },
                  { name: "Firebase", icon: <Flame className="w-4 h-4" /> },
                  { name: "Stripe", icon: <Cpu className="w-4 h-4" /> }
                ]}
                accentColor="#6633ff"
                liveUrl="https://timepiece.site/"
                useLiveThumbnail={true}
              />
            </Suspense>
          </ErrorBoundary>

          {/* AHA Innovations Project */}
          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6">
                <h3 className="text-2xl font-bold mb-2">AHA Innovations</h3>
                <p className="text-muted-foreground mb-4">All-in-one business solutions platform for digital marketing and operations.</p>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <FeaturedProject
                title="AHA Innovations"
                subtitle="All-in-One Digital Marketing Platform"
                description="A comprehensive business solutions platform that helps businesses streamline their marketing, boost sales, and grow their operations all in one place. Features include CRM, automation, scheduling, pipeline management, and website building tools."
                image="/projects/aha-innovations.jpg"
                tagline="We help you grow your Business with Our All-in-One Digital Marketing Platform. Streamline your marketing, boost sales, and grow your business ALL IN ONE PLACE."
                features={[
                  { text: "Developed an all-in-one CRM and marketing automation platform." },
                  { text: "Implemented business tools including calendar, website builder, and kanban boards." },
                  { text: "Created a seamless e-commerce experience with cart and checkout functionality." },
                  { text: "Designed a professional business interface with testimonial showcases." }
                ]}
                technologies={[
                  { name: "WordPress", icon: <LayoutGrid className="w-4 h-4" /> },
                  { name: "WooCommerce", icon: <Briefcase className="w-4 h-4" /> },
                  { name: "GoHighLevel", icon: <Boxes className="w-4 h-4" /> },
                  { name: "Custom CSS", icon: <Layers className="w-4 h-4" /> }
                ]}
                accentColor="#33cc66"
                liveUrl="https://aha-innovations.com/"
                useLiveThumbnail={true}
              />
            </Suspense>
          </ErrorBoundary>

          {/* Millennial Business Academy Project */}
          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6">
                <h3 className="text-2xl font-bold mb-2">Millennial Business Academy</h3>
                <p className="text-muted-foreground mb-4">An online learning platform for data analytics and career growth.</p>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <FeaturedProject
                title="Millennial Business Academy"
                subtitle="Master Data Analytics for Career Advancement & Success"
                description="An online learning platform focused on data analytics skills for career growth. The platform offers courses on Power BI, SQL, Excel, and AI tools to help professionals transform data into business insights."
                image="/projects/MilllennialBusinessAcademy.png"
                tagline="Join analytics expert JC De las Alas and learn how to leverage Power BI, SQL, Excel, and AI tools to transform data into business insights and advance your career."
                features={[
                  { text: "Designed an immersive learning experience with a space-themed UI." },
                  { text: "Implemented course catalog and learning paths functionality." },
                  { text: "Created instructor profiles and testimonial showcases." },
                  { text: "Integrated achievement tracking and certification systems." }
                ]}
                technologies={[
                  { name: "GoHighLevel", icon: <Boxes className="w-4 h-4" /> },
                  { name: "JavaScript", icon: <FileJson className="w-4 h-4" /> },
                  { name: "Custom CSS", icon: <Layers className="w-4 h-4" /> },
                  { name: "Responsive Design", icon: <LayoutGrid className="w-4 h-4" /> }
                ]}
                accentColor="#6366f1"
                liveUrl="https://start.millennialbusinessacademy.net/"
                useLiveThumbnail={true}
              />
            </Suspense>
          </ErrorBoundary>

          {/* Millennial Business Innovations Project */}
          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6">
                <h3 className="text-2xl font-bold mb-2">Millennial Business Innovations</h3>
                <p className="text-muted-foreground mb-4">A business website for a consulting firm.</p>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <FeaturedProject
                title="Millennial Business Innovations"
                subtitle="A business consulting platform with integrated client management."
                description="A business website for a consulting firm specializing in innovation strategies and digital transformation solutions. Features custom animations, contact forms, and service showcases."
                image="/projects/millennial.jpg"
                tagline="Transforming businesses through innovative strategies and digital solutions with our comprehensive consulting services."
                features={[
                  { text: "Designed a modern, professional business interface." },
                  { text: "Integrated GoHighLevel for lead capture and client management." },
                  { text: "Implemented custom animations and interactive elements." },
                  { text: "Optimized for search engines and mobile responsiveness." }
                ]}
                technologies={[
                  { name: "WordPress", icon: <LayoutGrid className="w-4 h-4" /> },
                  { name: "GoHighLevel", icon: <Boxes className="w-4 h-4" /> },
                  { name: "Custom CSS", icon: <Layers className="w-4 h-4" /> }
                ]}
                accentColor="#3b82f6"
                liveUrl="https://www.millennialbusinessinnovations.com/"
                useLiveThumbnail={true}
              />
            </Suspense>
          </ErrorBoundary>

          {/* VidRec Project */}
          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6">
                <h3 className="text-xl font-semibold mb-4">VidRec</h3>
                <p className="text-muted-foreground">Project details unavailable</p>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <FeaturedProject
                title="VidRec"
                subtitle="AI-Powered Video Recording & Analysis Platform"
                description="A modern video recording application with AI-powered features for content creators and professionals. Includes real-time recording, video analysis, and cloud storage capabilities."
                image="/projects/vidrec.jpg"
                tagline="Record, analyze, and enhance your video content with AI-powered tools designed for modern content creators."
                features={[
                  { text: "Real-time video recording with high-quality output." },
                  { text: "AI-powered video analysis and enhancement features." },
                  { text: "Cloud storage integration for seamless file management." },
                  { text: "Responsive design optimized for all devices." }
                ]}
                technologies={[
                  { name: "React", icon: <LayoutGrid className="w-4 h-4" /> },
                  { name: "TypeScript", icon: <FileJson className="w-4 h-4" /> },
                  { name: "Tailwind CSS", icon: <Layers className="w-4 h-4" /> },
                  { name: "AI Integration", icon: <Boxes className="w-4 h-4" /> }
                ]}
                accentColor="#10b981"
                liveUrl="https://vidrec-coral.vercel.app/"
                useLiveThumbnail={true}
              />
            </Suspense>
          </ErrorBoundary>

          {/* WorkWise Project */}
          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6">
                <h3 className="text-xl font-semibold mb-4">WorkWise</h3>
                <p className="text-muted-foreground">Project details unavailable</p>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <FeaturedProject
                title="WorkWise"
                subtitle="Smart Productivity & Task Management Platform"
                description="A comprehensive productivity platform designed to help teams and individuals manage tasks, track progress, and optimize workflows. Features intelligent scheduling, collaboration tools, and performance analytics."
                image="/projects/workwise.jpg"
                tagline="Boost your productivity with intelligent task management, team collaboration, and workflow optimization tools."
                features={[
                  { text: "Intelligent task scheduling and priority management." },
                  { text: "Real-time team collaboration and communication tools." },
                  { text: "Advanced analytics and productivity insights." },
                  { text: "Cross-platform compatibility and mobile optimization." }
                ]}
                technologies={[
                  { name: "Next.js", icon: <LayoutGrid className="w-4 h-4" /> },
                  { name: "React", icon: <FileJson className="w-4 h-4" /> },
                  { name: "TypeScript", icon: <Layers className="w-4 h-4" /> },
                  { name: "Database", icon: <Boxes className="w-4 h-4" /> }
                ]}
                accentColor="#8b5cf6"
                liveUrl="https://workwise-eosin.vercel.app/"
                useLiveThumbnail={true}
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
