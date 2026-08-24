import { Hero } from "@/components/home/hero";
import { TrustMarkers } from "@/components/home/trust-markers";
import { WhyChoose } from "@/components/home/why-choose";
import { FeaturedCourses } from "@/components/home/featured-courses";
import { HowItWorks } from "@/components/home/how-it-works";
import { FAQ } from "@/components/home/faq";
import { ContactCTA } from "@/components/home/contact-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMarkers />
      <WhyChoose />
      <FeaturedCourses />
      <HowItWorks />
      <FAQ />
      <ContactCTA />
    </>
  );
}
