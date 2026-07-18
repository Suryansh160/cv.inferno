import React from "react";
import { Flame, Skull, ShieldCheck, MessageSquareWarning } from "lucide-react";

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="backdrop-blur-md rounded-2xl border border-gray-200 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <div className="mb-4">
        <Icon className="w-8 h-8 text-gray-900" strokeWidth={2} />
      </div>
      <h3 className="font-bold text-xl text-gray-900 text-base mb-2 leading-snug">
        {title}
      </h3>
      <p className="text-md text-gray-800 leading-relaxed">{description}</p>
    </div>
  );
}

const FEATURES = [
  {
    icon: Flame,
    title: "Brutal AI Roast",
    description:
      "No sugarcoating. Our AI tears into your resume and tells you exactly what's making recruiters cringe.",
  },
  {
    icon: Skull,
    title: "Line-by-Line Savagery",
    description:
      "Every bullet point gets judged. Weak verbs, vague claims, and filler get called out one by one.",
  },
  {
    icon: ShieldCheck,
    title: "ATS Reality Check",
    description:
      "Find out if your resume even survives the bots before a human ever sees it.",
  },
  {
    icon: MessageSquareWarning,
    title: "Fix-It Verdict",
    description:
      "Get a blunt, actionable rewrite plan so the next roast has nothing left to burn.",
  },
];

export default function FeatureCardsSection() {
  return (
    <div className="w-full backdrop-transparent py-16 px-6">
      <div className="max-w-6xl mx-auto  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  );
}