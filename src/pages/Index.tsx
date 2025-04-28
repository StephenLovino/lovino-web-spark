
import React, { useEffect, lazy, Suspense, useState } from "react";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import SkillCard from "@/components/SkillCard";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Code, Database, Briefcase, MessageSquare, Github, Linkedin, Twitter, MapPin, FileCode, FileJson, CloudCog } from "lucide-react";

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

const ContactForm = lazy(() =>
  import("@/components/ContactForm")
    .catch(err => {
      console.error("Failed to load ContactForm:", err);
      // Return a simple fallback component
      return {
        default: () => (
          <div className="glass-effect p-6">
            <h3 className="text-xl font-semibold mb-4">Contact Form Unavailable</h3>
            <p className="text-muted-foreground mb-4">
              Sorry, the contact form couldn't be loaded. Please email me directly at:
            </p>
            <a href="mailto:stephen.ben19@gmail.com" className="text-primary hover:underline">
              stephen.ben19@gmail.com
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
    document.title = "Stephen Jan Lovino | Frontend Developer & GHL Expert";
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
            Hi, I'm <span className="text-gradient">Stephen</span>, a{" "}
            <TypeAnimation
              sequence={[
                'Computer Engineer',
                1000,
                'AI Expert',
                1000,
                'Frontend Developer',
                1000,
                'GHL Specialist',
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
        className="bg-secondary/5"
      >
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="w-full lg:w-1/2 glass-effect p-1">
            <div className="aspect-square w-full max-w-md mx-auto rounded-lg overflow-hidden relative">
              {/* Add a subtle border instead of the gradient overlay */}
              <div className="absolute inset-0 border-2 border-primary/20 rounded-lg pointer-events-none z-10"></div>
              <img
                src="/StephenLovino.png"
                alt="Stephen Jan Lovino"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/placeholder.svg';
                  target.alt = 'Profile image placeholder';
                }}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h3 className="text-xl font-medium mb-4 text-gradient">Frontend Developer & GHL Expert</h3>
            <p className="mb-4 text-muted-foreground">
              Based in San Fernando, Pampanga, Philippines, I specialize in creating modern web experiences and streamlining business operations through cutting-edge technologies.
            </p>
            <p className="mb-6 text-muted-foreground">
              With over 2 years of dedicated experience in GoHighLevel development, I've been actively building websites and web applications. My expertise spans across modern web technologies and automation tools, allowing me to create comprehensive solutions for businesses.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" asChild size="sm" className="border-primary/30 hover:border-primary">
                <a href="https://github.com/StephenLovino" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </Button>
              <Button variant="outline" asChild size="sm" className="border-primary/30 hover:border-primary">
                <a href="https://linkedin.com/in/stephenjanlovino" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </Button>
              <Button variant="outline" asChild size="sm" className="border-primary/30 hover:border-primary">
                <a href="https://twitter.com/stephenjanlovino" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
                </a>
              </Button>
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
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{exp.company}</h3>
                  <p className="text-primary">{exp.role}</p>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                </div>
                <ul className="space-y-2 mt-4 md:mt-0">
                  {exp.descriptions.map((desc, i) => (
                    <li key={i} className="text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary/60 rounded-full"></div>
                      {desc}
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
        className="bg-secondary/5"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(tools).map(([category, items]) => (
            <div key={category} className="glass-effect p-6">
              <h3 className="text-xl font-semibold capitalize mb-6">{category}</h3>
              <div className="grid grid-cols-2 gap-4">
                {items.map((tool) => (
                  <div key={tool.name} className="flex items-center gap-2">
                    <tool.icon className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Skills Section */}
      <Section
        id="skills"
        title="My Skills"
        subtitle="Technologies and tools I work with"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        className="bg-secondary/5"
      >
        <div className="space-y-12">
          {/* Wrap each ProjectCard in its own ErrorBoundary and Suspense */}
          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6">
                <h3 className="text-2xl font-bold mb-2">Launchpad Website Craft</h3>
                <p className="text-muted-foreground mb-4">A modern agency website showcasing services in web design, branding, and business automation. Built using React, Tailwind CSS, and deployed on Vercel.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["React", "Tailwind CSS", "Vercel"].map((tag, i) => (
                    <span key={i} className="text-xs bg-secondary rounded-full px-3 py-1 text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <ProjectCard
                title="Launchpad Website Craft"
                description="A modern agency website showcasing services in web design, branding, and business automation. Built using React, Tailwind CSS, and deployed on Vercel."
                image="/placeholder.svg"
                tags={["React", "Tailwind CSS", "Vercel"]}
                liveUrl="https://launchpad-website-craft.vercel.app/"
                githubUrl="https://github.com/StephenLovino/launchpad-website"
              />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6 mt-12">
                <h3 className="text-2xl font-bold mb-2">AI-Powered CRM Integration</h3>
                <p className="text-muted-foreground mb-4">Developed a custom integration between GoHighLevel CRM and OpenAI to automate customer support responses and lead qualification. Increased response rate by 45% and reduced manual work by 60%.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["GoHighLevel", "OpenAI API", "JavaScript", "Automation"].map((tag, i) => (
                    <span key={i} className="text-xs bg-secondary rounded-full px-3 py-1 text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <ProjectCard
                title="AI-Powered CRM Integration"
                description="Developed a custom integration between GoHighLevel CRM and OpenAI to automate customer support responses and lead qualification. Increased response rate by 45% and reduced manual work by 60%."
                image="/placeholder.svg"
                tags={["GoHighLevel", "OpenAI API", "JavaScript", "Automation"]}
                liveUrl="https://ai-crm-demo.vercel.app/"
                githubUrl="https://github.com/StephenLovino/ai-crm-integration"
                className="mt-12"
              />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary
            fallback={
              <div className="glass-effect p-6 mt-12">
                <h3 className="text-2xl font-bold mb-2">E-commerce Dashboard</h3>
                <p className="text-muted-foreground mb-4">Built a comprehensive dashboard for e-commerce businesses to track sales, inventory, and customer metrics in real-time. Features include data visualization, predictive analytics, and automated reporting.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["React", "Node.js", "MongoDB", "Chart.js"].map((tag, i) => (
                    <span key={i} className="text-xs bg-secondary rounded-full px-3 py-1 text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              <ProjectCard
                title="E-commerce Dashboard"
                description="Built a comprehensive dashboard for e-commerce businesses to track sales, inventory, and customer metrics in real-time. Features include data visualization, predictive analytics, and automated reporting."
                image="/placeholder.svg"
                tags={["React", "Node.js", "MongoDB", "Chart.js"]}
                liveUrl="https://ecommerce-dashboard-demo.vercel.app/"
                githubUrl="https://github.com/StephenLovino/ecommerce-dashboard"
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
                  <p className="font-medium">stephen.ben19@gmail.com</p>
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
                <a href="mailto:stephen.ben19@gmail.com" className="text-primary hover:underline">
                  stephen.ben19@gmail.com
                </a>
              </div>
            }
          >
            <Suspense fallback={<LoadingFallback />}>
              {typeof window !== 'undefined' && <ContactForm />}
            </Suspense>
          </ErrorBoundary>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-secondary/10 py-8">
        <div className="container text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Stephen Jan Lovino. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
