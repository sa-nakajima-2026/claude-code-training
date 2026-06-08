import type { Metadata } from "next";
import { HeroSection } from "./_components/HeroSection";
import { ServicesSection } from "./_components/ServicesSection";
import { FeaturesSection } from "./_components/FeaturesSection";
import { RecruitSection } from "./_components/RecruitSection";
import { NewsSection } from "./_components/NewsSection";
import { ContactSection } from "./_components/ContactSection";

export const metadata: Metadata = {
  title: "日本デェイブレイク株式会社",
  description:
    "お客様と共に、情報技術で未来を創る。情報システムの企画・開発・導入・運用・保守まで一貫サービスを提供。",
};

export default function NdbRenewalPage() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <RecruitSection />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
