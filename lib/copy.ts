/**
 * Page copy that isn't yet modelled in /content. Moves into content (and the CMS)
 * once she has approved it. TODO(client): review all of this in her voice.
 */

export const processSteps = [
  {
    title: "Consult",
    summary:
      "A 30-minute call about your style goals, wardrobe, upcoming events, and which service makes sense for you.",
    detail:
      "Not sure where to start? Let’s talk. There’s no obligation: by the end of the call you’ll know exactly what the right next step is.",
  },
  {
    title: "Curation",
    summary: "I study your lifestyle, your wardrobe and your budget, and build a plan around them.",
    detail:
      "Depending on the service, that means a closet edit, a seasonal brief, or an event concept, always matched to the budget we agree up front.",
  },
  {
    title: "Fitting & Sourcing",
    summary: "Tailored pulls, curated links, and fitting sessions with precise adjustments.",
    detail:
      "In person in New York, or remotely wherever you are. Every piece comes with notes on how to wear it.",
  },
  {
    title: "Ongoing Guidance",
    summary: "Your lookbook, outfit formulas, and a direct line to me afterwards.",
    detail:
      "Style doesn’t end at delivery. You keep a direct line for questions, new purchases and the next big event.",
  },
] as const;

export const prepareList = [
  "A rough idea of your budget for new pieces",
  "Any upcoming events, with dates",
  "Two or three photos of outfits you love (yours or anyone’s)",
  "Your sizes and any fit notes, especially for remote services",
] as const;

export const generalFaqs = [
  {
    q: "How much does it cost?",
    a: "Pricing depends on the service. The Digital Lookbook is $1,650; other services are quoted after a short consultation so the price fits what you actually need.",
  },
  {
    q: "Do you travel?",
    a: "I work in person across New York City. For clients elsewhere, every service has a remote option, and travel for events can be arranged.",
  },
  {
    q: "How do remote services work?",
    a: "We start with a call and a short brief. I send curated, direct-to-buy links matched to your sizes and budget, with notes on how to wear each piece.",
  },
  {
    q: "Do I have to buy everything you suggest?",
    a: "Never. Recommendations are a starting point; you decide what to keep. Many clients buy far less than they expected once their closet is edited.",
  },
  // TODO(client): add "Do you earn commission on shopping links?" once the affiliate policy is confirmed.
] as const;
