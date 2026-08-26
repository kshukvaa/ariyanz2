import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero3DSlider from '@/components/sections/Hero3DSlider';
import TopicFinderSection from '@/components/sections/TopicFinderSection';
import PartnersSection from '@/components/sections/PartnersSection';
import ProductsSection from '@/components/sections/ProductsSection';
import LearningPathsSection from '@/components/sections/LearningPathsSection';
import SpecialOffersSection from '@/components/sections/SpecialOffersSection';
import ArticlesSection from '@/components/sections/ArticlesSection';
import LeaderboardSection from '@/components/sections/LeaderboardSection';
import WhyAriyazSection from '@/components/sections/WhyAriyazSection';
import InstructorsSection from '@/components/sections/InstructorsSection';
import NewsSection from '@/components/sections/NewsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

// Mobile-only variants — completely different design/layout, same content.
// Hero3DSlider, Footer and MobileNav (in layout) are shared and untouched.
import MobileTopicFinderSection from '@/components/sections/mobile/MobileTopicFinderSection';
import MobilePartnersSection from '@/components/sections/mobile/MobilePartnersSection';
import MobileProductsSection from '@/components/sections/mobile/MobileProductsSection';
import MobileLearningPathsSection from '@/components/sections/mobile/MobileLearningPathsSection';
import MobileSpecialOffersSection from '@/components/sections/mobile/MobileSpecialOffersSection';
import MobileNewsSection from '@/components/sections/mobile/MobileNewsSection';
import MobileTestimonialsSection from '@/components/sections/mobile/MobileTestimonialsSection';
import MobileArticlesSection from '@/components/sections/mobile/MobileArticlesSection';
import MobileLeaderboardSection from '@/components/sections/mobile/MobileLeaderboardSection';
import MobileWhyAriyazSection from '@/components/sections/mobile/MobileWhyAriyazSection';
import MobileInstructorsSection from '@/components/sections/mobile/MobileInstructorsSection';
import MobileHomeEnhancer, { ScrollHint } from '@/components/sections/mobile/MobileHomeEnhancer';
import { ParallaxDivider, WaveDivider } from '@/components/sections/mobile/_kit';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero slider — shared, untouched (desktop + mobile) */}
        <Hero3DSlider />

        {/* Desktop homepage — original sections, shown on md+ */}
        <div className="hidden md:block">
          <WaveDivider fromColor="#e9eef7" toColor="#ffffff" />
          <TopicFinderSection />
          <ParallaxDivider fromColor="#ffffff" toColor="#FAFAFB" variant="wave" index={0} />
          <PartnersSection />
          <ParallaxDivider fromColor="#FAFAFB" toColor="#FDF7F0" variant="blob" index={1} />
          <ProductsSection />
          <ParallaxDivider fromColor="#FDF7F0" toColor="#F5F6FA" variant="curve" index={2} />
          <LearningPathsSection />
          <ParallaxDivider fromColor="#F5F6FA" toColor="#FDF7F0" variant="triangles" index={3} />
          <SpecialOffersSection />
          <ParallaxDivider fromColor="#FDF7F0" toColor="#FAFAFB" variant="dots" index={4} />
          <NewsSection />
          <ParallaxDivider fromColor="#FAFAFB" toColor="#FDF4EE" variant="blob" index={5} />
          <TestimonialsSection />
          <ParallaxDivider fromColor="#FDF4EE" toColor="#FAFAFB" variant="wave" index={6} />
          <ArticlesSection />
          <ParallaxDivider fromColor="#FAFAFB" toColor="#FDF7F0" variant="curve" index={7} />
          <LeaderboardSection />
          <ParallaxDivider fromColor="#FDF7F0" toColor="#FAFAFB" variant="triangles" index={8} />
          <WhyAriyazSection />
          <ParallaxDivider fromColor="#FAFAFB" toColor="#FDF7F0" variant="dots" index={9} />
          <InstructorsSection />
        </div>

        {/* Mobile homepage — completely different design, same content.
            Shown only below md. The enhancer adds a reading-progress bar
            and a quick-jump section navigator. Both are mobile-only and
            presentational. */}
        <div className="md:hidden">
          <MobileHomeEnhancer />
          <ScrollHint />
          <WaveDivider fromColor="#e9eef7" toColor="#ffffff" />
          <MobileTopicFinderSection />
          <ParallaxDivider fromColor="#ffffff" toColor="#FAFAFB" variant="wave" index={0} />
          <MobilePartnersSection />
          <ParallaxDivider fromColor="#FAFAFB" toColor="#FDF7F0" variant="blob" index={1} />
          <MobileProductsSection />
          <ParallaxDivider fromColor="#FDF7F0" toColor="#F5F6FA" variant="curve" index={2} />
          <MobileLearningPathsSection />
          <ParallaxDivider fromColor="#F5F6FA" toColor="#FDF7F0" variant="triangles" index={3} />
          <MobileSpecialOffersSection />
          <ParallaxDivider fromColor="#FDF7F0" toColor="#FAFAFB" variant="dots" index={4} />
          <MobileNewsSection />
          <ParallaxDivider fromColor="#FAFAFB" toColor="#FDF4EE" variant="blob" index={5} />
          <MobileTestimonialsSection />
          <MobileArticlesSection />
          <ParallaxDivider fromColor="#FDF4EE" toColor="#FAFAFB" variant="wave" index={6} />
          <MobileLeaderboardSection />
          <ParallaxDivider fromColor="#FAFAFB" toColor="#FDF7F0" variant="curve" index={7} />
          <MobileWhyAriyazSection />
          <ParallaxDivider fromColor="#FDF7F0" toColor="#FAFAFB" variant="triangles" index={8} />
          <MobileInstructorsSection />
        </div>
      </main>
      {/* Back-to-top is the orange button in InteractiveProvider — one
          control for both breakpoints. */}
      {/* Footer — shared, untouched */}
      <Footer />
    </div>
  );
}
