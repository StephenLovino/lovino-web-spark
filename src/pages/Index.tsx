
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground";
import Section from "@/components/Section";
import SkillCard from "@/components/SkillCard";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { ArrowDown, Code, Database, Briefcase, MessageSquare, Github, Linkedin, Twitter, MapPin, FileCode, FileJson, CloudCog } from "lucide-react";

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
        <ParticleBackground />
        <div className="container text-center px-4 z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Stephen Jan Lovino
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Computer Engineer | AI Expert | Frontend Developer | GHL Specialist
          </h2>
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
            <div className="aspect-square w-full max-w-md mx-auto rounded-lg overflow-hidden bg-gradient-to-br from-primary/30 to-accent/30">
              <div className="w-full h-full flex items-center justify-center text-2xl font-light">
                Profile Image
              </div>
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
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </Button>
              <Button variant="outline" asChild size="sm" className="border-primary/30 hover:border-primary">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </Button>
              <Button variant="outline" asChild size="sm" className="border-primary/30 hover:border-primary">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
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
          <ProjectCard
            title="Launchpad Website Craft"
            description="A modern agency website showcasing services in web design, branding, and business automation. Built using React, Tailwind CSS, and deployed on Vercel."
            image="/placeholder.svg"
            tags={["React", "Tailwind CSS", "Vercel"]}
            liveUrl="https://launchpad-website-craft.vercel.app/"
          />
          {/* Additional projects can be added here */}
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
                  <p className="font-medium">stephen@example.com</p>
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
          <ContactForm />
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
