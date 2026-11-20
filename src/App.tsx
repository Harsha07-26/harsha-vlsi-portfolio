/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { OrbitalParticleField } from './components/OrbitalParticleField';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ShowcaseFrame } from './components/ShowcaseFrame';
import { FloatingIconWave } from './components/FloatingIconWave';
import { TypingStatementSection } from './components/TypingStatementSection';
import { FeatureExplorer } from './components/FeatureExplorer';
import { SkillsMatrix } from './components/SkillsMatrix';
import { EducationSlider } from './components/EducationSlider';
import { ContactBanner } from './components/ContactBanner';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-white text-[#121317] flex flex-col">
      <div className="no-print">
        <OrbitalParticleField />
      </div>

      <div className="no-print relative z-10 flex flex-col min-h-screen">
        <Header onOpenResume={() => setResumeOpen(true)} />

        <AnnouncementBar
          visible={bannerVisible}
          onDismiss={() => setBannerVisible(false)}
        />

        <main className="flex-1">
          <HeroSection />
          <ShowcaseFrame />
          <FloatingIconWave />
          <TypingStatementSection />
          <FeatureExplorer />
          <SkillsMatrix />
          <EducationSlider />
          <ContactBanner onOpenResume={() => setResumeOpen(true)} />
        </main>

        <Footer onOpenResume={() => setResumeOpen(true)} />
      </div>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
