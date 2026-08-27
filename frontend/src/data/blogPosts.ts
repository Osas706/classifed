export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  author: string;
  readTime: string;
  content: string[]; // paragraphs / list blocks, rendered as-is
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-sell-your-car-online-in-nigeria",
    title: "How to Sell Your Car Online in Nigeria: A Step-by-Step Guide",
    excerpt:
      "From pricing it right to writing a listing that gets calls, here's exactly how to move your car online without losing money to lowballers or time-wasters.",
    date: "2026-06-02",
    author: "247Market Team",
    readTime: "6 min read",
    content: [
      "Selling a car in Nigeria used to mean parking it by the roadside with a 'FOR SALE' sign and a phone number scrawled on the windscreen, then waiting weeks for the right buyer to drive past. Online marketplaces have changed that — but only if you list your car the right way. Here's a practical, step-by-step approach.",
      "## 1. Price it using real market data, not wishful thinking",
      "Before you set a price, search for the same make, model, year and trim already listed nearby. Nigerian car buyers compare aggressively, especially for popular models like the Toyota Camry, Corolla, and Honda Accord. Price 5–10% above your walk-away number to leave room for negotiation, but don't inflate it so much that your listing gets skipped over in search results. If your car has had major repairs (engine, gearbox, accident history), factor that into the price honestly — buyers will ask, and Nigerian buyers often bring a mechanic to inspect before paying.",
      "## 2. Take photos that actually show the car",
      "Wash the car and clear the interior before shooting. Take photos in daylight, ideally early morning or late afternoon to avoid harsh glare. Get all four exterior angles, the odometer reading, the engine bay, the boot, the tires (buyers check tread wear closely), and any dents or scratches — being upfront about flaws builds trust and cuts down on wasted viewing appointments. A listing with 8–10 clear photos consistently gets more genuine inquiries than one with two blurry shots.",
      "## 3. Write a description that answers questions before they're asked",
      "Include: year, make, model, mileage, transmission type, fuel type, registration/particulars status (especially whether it has a valid Custom papers/duty certificate for foreign-used cars), any known issues, and your reason for selling. Nigerian buyers specifically look for 'Nigerian used' vs 'foreign used (Tokunbo)' status — state this clearly at the top of your description since it directly affects price expectations.",
      "## 4. List where serious buyers are already looking",
      "Post your car on 247Market with a full description and complete photo set — a complete listing is shown to more buyers and ranks higher in search than a bare-bones one. Include your city clearly (Lagos buyers rarely want to travel to Kano for a viewing) so you only attract people who can realistically close the deal.",
      "## 5. Screen calls and messages before agreeing to a viewing",
      "Ask basic questions upfront: is the buyer paying cash or financing, have they seen the price, are they local. This filters out casual browsers. Never share your home address for a first meeting — agree to meet in a public, well-lit location such as a fuel station or shopping mall car park during the day.",
      "## 6. Handle the sale safely",
      "Insist on payment before handing over the keys and vehicle particulars — bank transfer confirmed as 'cleared' in your account, not just a screenshot of a transfer receipt, which can be faked. For higher-value cars, some sellers meet at the buyer's bank to confirm the transfer together. Once payment clears, hand over the vehicle particulars (original), sign a simple sale agreement stating the date, price, and both parties' details, and keep a copy for your own records.",
      "## 7. Update or remove your listing once it's sold",
      "A stale listing for a car you've already sold wastes your time fielding calls and can hurt your seller reputation. Mark it as sold or delete it as soon as the deal closes.",
      "Selling online is faster and reaches more buyers than word-of-mouth alone, but the fundamentals of a good car sale haven't changed: honest photos, an accurate description, a fair price, and a safe handover.",
    ],
  },
  {
    slug: "how-to-avoid-scams-buying-selling-online-nigeria",
    title: "How to Avoid Scams When Buying or Selling Online in Nigeria",
    excerpt:
      "Fake alerts, impersonation, and 'send a deposit first' tricks are the most common scams on classifieds sites. Here's how to spot them and trade safely.",
    date: "2026-05-14",
    author: "247Market Team",
    readTime: "5 min read",
    content: [
      "Online classifieds make buying and selling faster, but they also attract scammers who prey on urgency and trust. Most scams follow a small number of predictable patterns — once you know them, they're easy to spot and avoid entirely.",
      "## The fake bank alert",
      "A buyer sends a screenshot or forwarded SMS claiming a transfer has gone through, then pressures you to hand over the item immediately, often citing that they're 'in a hurry' or 'about to board a flight'. Screenshots and forwarded messages are trivial to fake. Always confirm the money has actually landed in your account — check your bank app or dial your balance code directly — before releasing any item or service. Never rely on a message someone else sent you as proof of payment.",
      "## The 'pay a deposit to secure it' trick",
      "As a buyer, be wary of sellers who insist on a deposit or 'agent fee' before you've seen the item in person, especially for cars, apartments, and electronics. Legitimate sellers on a marketplace like 247Market are generally happy to let you inspect an item first. If a deal only works when you pay something upfront to a stranger you've never met, treat that as a red flag, not a formality.",
      "## Fake delivery and courier scams",
      "Especially common with phones and electronics: a 'seller' claims the item will be shipped by courier once you pay in full, then disappears after payment. For anything you can't inspect in person, prefer sellers local to you and arrange to meet, or use a trusted, trackable courier with pay-on-delivery where possible. Be suspicious of unusually low prices for in-demand electronics — if a brand-new iPhone is priced 40% below every other listing, there's usually a reason.",
      "## Impersonation of real businesses or people",
      "Scammers sometimes copy photos and descriptions from a legitimate listing (or a real shop's product photos) and repost them at a lower price to lure buyers, then vanish after payment. Reverse-image-search suspicious photos, and be cautious of listings with stock-photo-quality images and no other details specific to the actual item (no visible serial number, no photo of the item in a real setting).",
      "## Verified sellers reduce risk, but don't eliminate the need to be careful",
      "247Market's seller verification badge shows a seller has confirmed their identity, which raises accountability, but you should still follow safe-trading basics with every transaction: meet in public for high-value items, inspect before paying, and never wire money to someone you haven't verified is who they say they are.",
      "## Practical rules that stop almost every scam",
      "Meet in a public place for the first transaction, especially for cash sales. Never pay any amount — deposit, 'agent fee', or shipping — before seeing the item or confirming the seller's identity. Confirm payments landed in your own account before releasing goods; don't trust screenshots. Trust your instincts: if a deal feels rushed or too good to be true, slow down and ask more questions. Report suspicious listings or users so the marketplace can act on the pattern, not just your individual case.",
      "Most online trading in Nigeria is honest, everyday commerce between real buyers and sellers. A handful of common-sense habits — verify payment before handing anything over, meet in public, and don't let anyone rush you — will keep you safe from the small minority who aren't trading in good faith.",
    ],
  },
  {
    slug: "tips-for-photos-that-sell-your-listing-faster",
    title: "Tips for Taking Photos That Sell Your Listing Faster",
    excerpt:
      "Good photos are the single biggest factor in how fast a listing sells. Here's how to shoot listing photos that get clicks — using nothing but a phone.",
    date: "2026-04-21",
    author: "247Market Team",
    readTime: "4 min read",
    content: [
      "Buyers scroll past dozens of listings in seconds. The photo is what stops the scroll — and it's also the first thing that builds or breaks trust in your listing. You don't need a professional camera to take photos that convert browsers into buyers; you need good light, a clean background, and a few deliberate angles.",
      "## Use natural light, not your flash",
      "Shoot near a window or outdoors during daylight hours — late morning or late afternoon gives the softest, most even light. Avoid direct flash, which creates harsh shadows and washes out detail, and avoid shooting under a single dim indoor bulb, which gives photos a yellow, low-quality tint that makes even good items look cheap.",
      "## Clean the background before you clean the item",
      "A cluttered or messy background is the fastest way to make a good product look untrustworthy. Move the item to a plain wall, a clean floor, or outdoors against neutral scenery. For furniture and appliances, clear the surrounding area of unrelated household items so the photo is unambiguously about the thing you're selling.",
      "## Shoot multiple angles, not one 'hero' shot",
      "One photo tells a buyer almost nothing. For most categories, aim for: a full front view, a full side or back view, a close-up of any brand name/model number, and a close-up of any wear, damage or flaws. For electronics, include a photo of the item powered on and showing its screen or working state. For clothing and shoes, photograph the label/size tag. For apartments, shoot every room plus the building exterior and entrance — buyers specifically distrust apartment listings that only show one flattering room.",
      "## Show scale and condition honestly",
      "Include a common object next to small items (a hand, a coin, a ruler) so buyers can judge real size from a photo. Photograph flaws directly rather than cropping them out — a scratch or a stain shown upfront reads as honesty and actually reduces time-wasting inquiries and haggling later, because the buyer already knows what they're getting.",
      "## Keep the item itself the focus",
      "Fill the frame with the item — don't shoot from far away with lots of empty space around it. Turn off filters; buyers want to see true colour, especially for clothing, cars, and anything where colour accuracy affects the price they're willing to pay.",
      "## Order your photos to match how a buyer thinks",
      "Lead with the single best, most flattering, accurate photo — that's what shows in search results and thumbnails, so it needs to make someone stop scrolling. Follow with supporting angles, then close-ups of details and any flaws. A well-ordered set of 6–10 photos consistently outperforms a single photo, even a great one.",
      "Five extra minutes spent on lighting, background, and angles is the highest-leverage thing you can do to sell faster — it costs nothing and it's the difference between a listing that gets ignored and one that gets calls the same day.",
    ],
  },
  {
    slug: "renting-an-apartment-in-lagos-what-to-know",
    title: "Renting an Apartment in Lagos: What to Know Before You Move",
    excerpt:
      "Agency fees, agreement years, and inspection etiquette — a practical primer on how apartment hunting actually works in Lagos, for first-timers and returnees alike.",
    date: "2026-03-09",
    author: "247Market Team",
    readTime: "7 min read",
    content: [
      "Renting in Lagos has its own rhythm — and its own costs beyond the headline rent figure — that catches a lot of first-time renters and people moving from other cities off guard. Here's what to actually expect.",
      "## Understand the real cost, not just the annual rent",
      "Lagos rent is almost always quoted and paid annually (sometimes 2 years upfront for newer or higher-end properties), and the advertised rent figure is rarely the full cost of moving in. On top of one year's rent, budget for: agency fee (commonly 10% of annual rent), legal fee (commonly another 10%), caution/security deposit (sometimes 1 month's rent, refundable), and service charge if the property is in an estate or serviced building. Ask every landlord or agent to itemise these separately before you commit — 'all-in' costs can add 20–30% on top of the headline rent.",
      "## Know the difference between mainland and island pricing",
      "Lagos Island areas (Lekki, Victoria Island, Ikoyi) command significantly higher rent than mainland areas (Yaba, Surulere, Ikeja, Gbagada) for comparable apartment sizes, largely driven by proximity to business districts and infrastructure quality. If your budget is tight, mainland areas with good road access to your workplace often deliver better value — factor commute time and traffic patterns into the decision, not just the rent figure, since Lagos traffic can turn a 'cheap but far' apartment into a daily multi-hour cost.",
      "## Always inspect in person before paying anything",
      "Photos and even video calls can hide real issues — water pressure, noise from neighbouring generators, flooding risk in the compound, network signal strength, and the state of shared facilities. Visit at a different time of day than your first viewing if possible (evening visits reveal noise and lighting issues morning viewings miss), and specifically check: water runs from the tap during your visit, there's a working borehole or reliable water source, the electrical wiring looks safe and not exposed, and the neighbourhood has visible security (gated compound, security post, street lighting).",
      "## Ask about power and water directly — don't assume",
      "Confirm whether the property has a functioning generator or inverter system for the estate/building, who pays for diesel or fuel, and whether that cost is included in service charge or billed separately. Ask about the water source (borehole, public supply, tanker delivery) and whether water is genuinely reliable — this varies enormously even between neighbouring buildings in the same area.",
      "## Get everything in writing",
      "Insist on a written tenancy agreement stating the rent amount, payment term (1 or 2 years), what's included (service charge, security, waste disposal), notice period for renewal or vacating, and the landlord's or agent's full contact details. Verbal agreements are common in informal deals but leave you with no recourse if a dispute arises later — a simple written agreement protects both sides.",
      "## Verify who you're actually dealing with",
      "Confirm the person collecting money is either the landlord or a verifiably authorised agent — ask to see the property's title documents or a letter of authority from the landlord if you're dealing with an agent you don't already know. Fake agents who don't actually control the property are a real and recurring problem in Lagos rental scams; a legitimate agent will not be evasive about proving the connection.",
      "## Search with your actual budget and area filters",
      "On 247Market, filter listings by city and browse apartment listings with full photo sets and clear pricing so you can shortlist properties worth an in-person visit before spending a day travelling across Lagos traffic to see them. Message sellers directly through the platform to ask the questions above before booking a viewing — it saves everyone time.",
      "Renting in Lagos rewards patience and due diligence far more than speed. Budget for the full cost upfront, inspect thoroughly, get the agreement in writing, and verify who you're actually paying — the apartment search will go a lot smoother.",
    ],
  },
];

export const getBlogPost = (slug: string) => blogPosts.find((p) => p.slug === slug);
