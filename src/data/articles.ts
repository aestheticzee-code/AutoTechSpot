import { Article } from "@/types/article";

export const articles: Article[] = [
  {
    slug: "2024-ford-mustang-gt-review",
    title: "2024 Ford Mustang GT Review: American Muscle Reborn",
    excerpt: "The seventh-generation Mustang GT delivers 480 horsepower of pure V8 thunder. We test Ford's iconic pony car to see if it can still dominate the muscle car segment.",
    content: `
## The Legend Returns

The 2024 Ford Mustang GT represents a new chapter for America's favorite pony car. Now in its seventh generation, the Mustang GT continues to deliver what enthusiasts crave: a naturally-aspirated V8, rear-wheel drive, and that unmistakable muscle car presence.

### Design & Exterior

Ford's designers have given the Mustang a more aggressive stance for 2024. The fastback roofline flows seamlessly into a ducktail spoiler, while the front fascia features a larger grille and redesigned tri-bar LED headlights that pay homage to the original 1960s design.

The wider fenders accommodate a broader track, giving the Mustang GT a planted, athletic look. Available in 11 colors including the iconic Grabber Blue and new Vapor Blue, there's a shade for every personality.

### Performance

At the heart of the 2024 Mustang GT lies the legendary 5.0-liter Coyote V8. This fourth-generation engine produces:

- **Horsepower:** 480 HP @ 7,000 RPM
- **Torque:** 415 lb-ft @ 4,900 RPM
- **0-60 mph:** 4.3 seconds
- **Quarter Mile:** 12.4 seconds @ 118 mph
- **Top Speed:** 155 mph (electronically limited)

The engine pairs with either a rev-matching 6-speed manual transmission or a paddle-shifted 10-speed automatic. Both are excellent, but purists will appreciate the tactile engagement of the manual.

### Handling & Dynamics

The new chassis is stiffer than ever, with double-ball-joint front suspension and an independent rear setup. The optional MagneRide dampers read the road 1,000 times per second, delivering a remarkable balance between daily comfort and track capability.

The steering is precise with excellent feedback, though some may find the electric power steering slightly less communicative than hydraulic systems of old. New Brembo brakes with 6-piston front calipers provide exceptional stopping power.

### Interior & Technology

Step inside, and you'll find a driver-focused cockpit with a 12.4-inch digital instrument cluster and a 13.2-inch SYNC 4 touchscreen. The flat-bottom steering wheel feels great in hand, and the redesigned seats offer improved bolstering for spirited driving.

Notable features include:
- Recaro sport seats (optional)
- B&O premium audio system
- Wireless Apple CarPlay and Android Auto
- Digital instrument cluster with customizable displays
- Drive mode selector with Normal, Sport, Track, and Drag Strip modes

### Daily Livability

Despite its performance focus, the Mustang GT is surprisingly livable. The trunk offers 13.5 cubic feet of cargo space, and the rear seats can accommodate passengers for short trips. Fuel economy sits at 15 city / 24 highway mpg – reasonable for a 480-hp V8.

### Competition

The Mustang GT faces stiff competition from the Chevrolet Camaro SS and Dodge Challenger R/T Scat Pack. While the Camaro offers sharper handling and the Challenger provides more space, the Mustang strikes an ideal balance between the two while offering the most modern interior.

### Verdict

The 2024 Ford Mustang GT is everything a muscle car should be: loud, fast, and undeniably fun. It honors its heritage while embracing modern technology, making it the best Mustang GT ever built. Whether you're cruising downtown or attacking your favorite back road, this car delivers an experience that electric vehicles simply cannot replicate.

For enthusiasts who want a pure, visceral driving experience with a screaming V8 soundtrack, the Mustang GT is the definitive choice.

**Rating: 9.2/10**
    `,
    featuredImage: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=1200&h=630&fit=crop",
    featuredImageAlt: "2024 Ford Mustang GT in red, showcasing its aggressive front fascia and iconic design",
    category: "car-reviews",
    tags: ["Ford", "Mustang", "Muscle Car", "V8", "American Cars", "Sports Car"],
    author: {
      name: "Alexander Sterling",
      avatar: "/images/alexander-sterling.png",
    },
    publishedAt: "2026-01-30",
    readingTime: 6,
    featured: true,
    faqs: [
      {
        question: "How much horsepower does the 2024 Ford Mustang GT have?",
        answer: "The 2024 Ford Mustang GT produces 480 horsepower and 415 lb-ft of torque from its 5.0-liter Coyote V8 engine.",
      },
      {
        question: "How fast is the 2024 Ford Mustang GT 0-60?",
        answer: "The 2024 Mustang GT accelerates from 0-60 mph in 4.3 seconds and completes the quarter mile in 12.4 seconds.",
      },
      {
        question: "Does the 2024 Mustang GT come with a manual transmission?",
        answer: "Yes, the 2024 Mustang GT offers a 6-speed manual transmission with rev-matching, as well as an optional 10-speed automatic.",
      },
      {
        question: "What is the starting price of the 2024 Ford Mustang GT?",
        answer: "The 2024 Ford Mustang GT starts at approximately $42,515 MSRP, with fully loaded models reaching around $60,000.",
      },
      {
        question: "What fuel economy does the 2024 Mustang GT get?",
        answer: "The 2024 Mustang GT achieves an EPA-estimated 15 mpg city and 24 mpg highway with the automatic transmission.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter((article) => article.category === category);
}

export function getFeaturedArticle(): Article | undefined {
  return articles.find((article) => article.featured) || articles[0];
}

export function getRecentArticles(limit: number = 6): Article[] {
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getRelatedArticles(currentSlug: string, limit: number = 3): Article[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return [];

  return articles
    .filter((article) => article.slug !== currentSlug)
    .filter((article) => 
      article.category === current.category || 
      article.tags.some((tag) => current.tags.includes(tag))
    )
    .slice(0, limit);
}

export function searchArticles(query: string): Article[] {
  const lowercaseQuery = query.toLowerCase();
  return articles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.excerpt.toLowerCase().includes(lowercaseQuery) ||
      article.content.toLowerCase().includes(lowercaseQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
}
