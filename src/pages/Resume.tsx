import React, { useEffect } from "react";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Resume = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set title
    document.title = "Stephen Lovino | Resume";
  }, []);

  const handlePrint = () => {
    window.print();
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

  const skills = {
    coding: ["HTML", "CSS", "JavaScript", "React"],
    systems: ["Windows", "Cloud Platforms"],
    crm: ["GoHighLevel", "Hubspot", "Pipedrive"],
    ai: ["ChatGPT", "Midjourney", "Zapier", "Make.com"],
  };

  return (
    <div className="resume-container">
      {/* Navigation buttons - only visible on screen, not when printing */}
      <div className="screen-only-controls fixed top-4 left-4 right-4 flex justify-between z-50 print:hidden">
        <Button
          variant="outline"
          size="sm"
          className="bg-background/80 backdrop-blur-sm"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
        </Button>
        <Button
          variant="default"
          size="sm"
          className="bg-primary/90 backdrop-blur-sm"
          onClick={handlePrint}
        >
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
      </div>

      {/* Resume Content */}
      <div className="max-w-4xl mx-auto my-16 p-8 bg-background print:bg-white print:text-black print:my-0 print:p-6">
        <header className="mb-8 print:mb-6">
          <h1 className="text-4xl font-bold mb-2 text-gradient print:text-black">Stephen Lovino</h1>
          <p className="text-xl text-primary print:text-gray-800">Frontend Developer & GoHighLevel Expert</p>
          <div className="mt-4 text-muted-foreground print:text-gray-600">
            <p>San Fernando, Pampanga, Philippines</p>
            <p>stephenj.lovino@gmail.com</p>
          </div>
        </header>

        <section className="mb-8 print:mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-foreground/90 print:text-black border-b pb-2 print:border-gray-300">
            Summary
          </h2>
          <p className="text-muted-foreground print:text-gray-700">
            A passionate Web Developer with a strong love for web development, automations, and AI tools.
            Focused on creating high-converting websites, sleek frontends, and smart business solutions
            through platforms like GoHighLevel, WordPress, and React.
          </p>
        </section>

        <section className="mb-8 print:mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-foreground/90 print:text-black border-b pb-2 print:border-gray-300">
            Experience
          </h2>
          <div className="space-y-6 print:space-y-4">
            {experiences.map((exp, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold">{exp.company}</h3>
                <p className="text-primary print:text-gray-800">{exp.role}</p>
                <p className="text-sm text-muted-foreground print:text-gray-600 mb-2">{exp.period}</p>
                <ul className="space-y-1 pl-5 list-disc text-muted-foreground print:text-gray-700">
                  {exp.descriptions.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 print:mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-foreground/90 print:text-black border-b pb-2 print:border-gray-300">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-2">Coding Languages</h3>
              <ul className="space-y-1 pl-5 list-disc text-muted-foreground print:text-gray-700">
                {skills.coding.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Systems</h3>
              <ul className="space-y-1 pl-5 list-disc text-muted-foreground print:text-gray-700">
                {skills.systems.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">CRM Tools</h3>
              <ul className="space-y-1 pl-5 list-disc text-muted-foreground print:text-gray-700">
                {skills.crm.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">AI Tools</h3>
              <ul className="space-y-1 pl-5 list-disc text-muted-foreground print:text-gray-700">
                {skills.ai.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="print:mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-foreground/90 print:text-black border-b pb-2 print:border-gray-300">
            Projects
          </h2>
          <div className="space-y-4 print:space-y-3">
            <div>
              <h3 className="text-lg font-medium">Launchpad Website Craft</h3>
              <p className="text-sm text-primary print:text-gray-800">React, Tailwind CSS, Vercel, Firebase</p>
              <p className="text-muted-foreground print:text-gray-700">
                A modern agency website showcasing services in web design, branding, and business automation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Image Source Finder</h3>
              <p className="text-sm text-primary print:text-gray-800">React, Tailwind CSS, Vercel, Supabase</p>
              <p className="text-muted-foreground print:text-gray-700">
                A tool that helps users find the original source of images across the web.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium">Timepiece</h3>
              <p className="text-sm text-primary print:text-gray-800">React, Tailwind CSS, Vercel, Firebase</p>
              <p className="text-muted-foreground print:text-gray-700">
                An elegant watch showcase and e-commerce platform featuring high-end timepieces.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
