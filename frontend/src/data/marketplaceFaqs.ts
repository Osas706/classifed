export interface Faq {
  question: string;
  answer: string;
}

interface CountryFaqInput {
  name: string;
  currency: string;
  cities: string[];
  popularCategories: string[];
}

export function getCountryFaqs(data: CountryFaqInput): Faq[] {
  const topCities = data.cities.slice(0, 3).join(", ");
  const topCategories = data.popularCategories.slice(0, 3).join(", ");
  const currencyCode = data.currency.split(" ")[0];

  return [
    {
      question: `Is 247Market available in ${data.name}?`,
      answer: `Yes. 247Market is live in ${data.name}, with active buyers and sellers across cities including ${topCities}. You can browse local listings or post your own ad for free.`,
    },
    {
      question: `How do I sell something in ${data.name} on 247Market?`,
      answer: `Create a free account, click "Post an Ad," and add your item's photos, description, price and location in ${data.name}. Choose whether your price is negotiable or fixed, and your listing goes live immediately for local buyers to see.`,
    },
    {
      question: `What currency are prices shown in for ${data.name}?`,
      answer: `All ads are created and stored in Nigerian Naira (₦), but 247Market's currency selector lets you view prices converted to ${currencyCode} (or any supported currency) for easier comparison — this is a display-only conversion and doesn't affect how sellers list or get paid.`,
    },
    {
      question: `What do people commonly buy and sell in ${data.name}?`,
      answer: `Popular categories in ${data.name} include ${topCategories}, along with everyday items like phones, electronics, apartments and jobs.`,
    },
    {
      question: `Is it free to browse and post ads in ${data.name}?`,
      answer: `Yes, browsing and posting ads on 247Market in ${data.name} is completely free, with 0% listing fees to start.`,
    },
  ];
}

export const MARKETPLACE_FAQS: Faq[] = [
  {
    question: "Is 247Market free to use?",
    answer:
      "Yes. Creating an account, browsing listings and posting ads on 247Market is free, with 0% listing fees to start. There's no charge to buy or sell.",
  },
  {
    question: "How do I post an ad on 247Market?",
    answer:
      "Sign up, click \"Post an Ad,\" add photos, a description, your price and location, then choose whether the price is negotiable or fixed. Your listing goes live in minutes and is visible to buyers in your area right away.",
  },
  {
    question: "Is it safe to buy and sell on 247Market?",
    answer:
      "247Market verifies seller accounts and shows a verification status on every seller's profile and ad page, so buyers can see who they're dealing with. As with any classifieds marketplace, always meet in a safe public location, inspect items before paying, and never send money in advance to someone you haven't verified.",
  },
  {
    question: "Which countries can I buy and sell in on 247Market?",
    answer:
      "247Market is live across Africa, including Nigeria, Ghana, Kenya, South Africa, Egypt, Morocco, Ethiopia, Tanzania, Uganda, Senegal, Côte d'Ivoire, Rwanda, Cameroon and Zambia. Every country has its own local listings page.",
  },
  {
    question: "Can I see the exact location of a listing before contacting the seller?",
    answer:
      "Yes. Many ads include a location on an interactive map, so you can see roughly where an item is before reaching out — helpful for judging distance and planning a safe meetup.",
  },
  {
    question: "What can I buy or sell on 247Market?",
    answer:
      "Cars, phones and electronics, computers, furniture, fashion, apartments and rentals, jobs, animals and more — 247Market covers most everyday categories people buy and sell locally.",
  },
];
