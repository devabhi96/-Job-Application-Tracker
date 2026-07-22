import React, { useState } from "react";
import { Link } from 'react-router-dom'; 
import {
  FileText,
  Send,
  Eye,
  BellRing,
  BarChart, 
  CircleCheck, 
  ArrowRight,
  Menu,
  X,
  Mail,
} from "lucide-react";


const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function  LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const features = [
    {
      icon: Send,
      title: "Track every application",
      description:
        "Log each job you apply to in one place, with company, role, and date applied captured automatically.",
    },
   
    {
      icon: BellRing,
      title: "Timely reminders",
      description:
        "Never miss a follow-up. Get reminded when an application has gone quiet for too long.",
    },
    {
      icon: BarChart,
      title: "Simple analytics",
      description:
        "A clean dashboard shows your response rate, interview rate, and where your time is best spent.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Add your applications",
      description: "Enter the role, company, and resume version for every application you send out.",
    },
    {
      number: "02",
      title: "Track resume activity",
      description: "See when a recruiter opens your resume and how long they spend on it.",
    },
    {
      number: "03",
      title: "Follow up with confidence",
      description: "Use reminders and status tags to know exactly which applications need attention.",
    },
  ];



  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">
      
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-green-500 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-semibold tracking-tight">ResumeTrack</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <a href="#features" className="hover:text-black transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-black transition-colors">
              How it works
            </a>
            <a href="#stats" className="hover:text-black transition-colors">
              Results
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
             <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-black transition-colors px-4 py-2">
    Sign in
  </Link>
  <Link to="/register" className="text-sm font-semibold bg-black text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
    Get started
  </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-gray-700">
            <a href="#features" onClick={() => setMenuOpen(false)}>
              Features
            </a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
              How it works
            </a>
            <a href="#stats" onClick={() => setMenuOpen(false)}>
              Results
            </a>
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login" className="text-sm font-medium text-gray-700 border border-gray-300 rounded-md px-4 py-2 text-center" onClick={() => setMenuOpen(false)}>
                Sign in
              </Link>
              <Link to="/register" className="text-sm font-semibold bg-black text-white px-4 py-2 rounded-md text-center" onClick={() => setMenuOpen(false)}>
                Get started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Now tracking resume views in real time
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight max-w-3xl mx-auto">
          Keep a Track Of Every Application 
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
          ResumeTrack organizes your every job application and reminds you when it's time to follow up.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register" className="w-full sm:w-auto bg-black text-white font-semibold px-6 py-3 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
            Get started free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/login" className="w-full sm:w-auto border border-gray-300 text-black font-semibold px-6 py-3 rounded-md hover:border-green-500 hover:text-green-600 transition-colors text-center">
            See how it works
          </Link>
        </div>

        <p className="mt-5 text-sm text-gray-500">No credit card required</p>
      </section>

      {/* Dashboard preview */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-2 shadow-sm">
          <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-200">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { company: "Northgate Labs", role: "Frontend Engineer", status: "Viewed", tone: "green" },
                { company: "Alden & Co.", role: "Product Designer", status: "Applied", tone: "gray" },
                { company: "Meridian Corp", role: "Data Analyst", status: "Interview", tone: "green" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 text-left"
                >
                  <p className="text-sm font-semibold">{item.company}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.role}</p>
                  <span
                    className={`inline-block mt-3 text-xs font-semibold px-2 py-1 rounded-full ${
                      item.tone === "green"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-gray-100 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24 border-t border-gray-200">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything you need to run your job search
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Built for job seekers who want clarity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="border border-gray-200 rounded-xl p-6 hover:border-green-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-green-600" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>



     
      {/* Trust list */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="border border-gray-200 rounded-xl p-8 sm:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "Free to start, no card needed",
              "Works with any resume format",
              "Private by default",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CircleCheck className="w-5 h-5 text-green-600 flex-shrink-0" strokeWidth={2} />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Start tracking your job search today
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Set up your first application in under a minute.
          </p>
          <div className="mt-8">
            <Link to="/register" className="bg-black text-white font-semibold px-8 py-3 rounded-md hover:bg-green-600 transition-colors inline-flex items-center gap-2">
              Get started free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-green-500 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold">ResumeTracker</span>
          </div>

          <p className="text-xs text-gray-500 order-3 sm:order-2">
            © 2026 ResumeTracker. All rights reserved.
          </p>

          <div className="flex items-center gap-4 order-2 sm:order-3">
            <a href="#" className="text-gray-500 hover:text-green-600 transition-colors" aria-label="GitHub">
              <GithubIcon className="w-4 h-4" />
            </a>
            <a href="#" className="text-gray-500 hover:text-green-600 transition-colors" aria-label="LinkedIn">
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a href="#" className="text-gray-500 hover:text-green-600 transition-colors" aria-label="Email">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}