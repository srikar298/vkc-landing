import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/shared/components/Layout';
import { HomePage } from '@/features/home/pages/HomePage';
import { DirectoryPage } from '@/features/directory/pages/DirectoryPage';
import { MembershipPage } from '@/features/onboarding/pages/MembershipPage';
import { VisionPage } from '@/features/home/pages/VisionPage';
import { HeritagePage } from '@/features/heritage/pages/HeritagePage';
import { KnowledgePage } from '@/features/heritage/pages/KnowledgePage';
import { LegendsPage } from '@/features/heritage/pages/LegendsPage';
import { NetworkHub } from '@/features/network/pages/NetworkHub';
import { EmpowermentPage } from '@/features/empowerment/pages/EmpowermentPage';
import { Admin } from '@/features/admin/components/Admin';
import { ScrollToTop } from '@/shared/components/ScrollToTop';

function App() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center"><div className="w-12 h-12 border-4 border-vermilion border-t-transparent rounded-full animate-spin" /></div>}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="vision" element={<VisionPage />} />
          <Route path="directory" element={<DirectoryPage />} />
          <Route path="membership" element={<MembershipPage />} />
          <Route path="heritage" element={<HeritagePage />} />
          <Route path="knowledge" element={<KnowledgePage />} />
          <Route path="legends" element={<LegendsPage />} />
          <Route path="network" element={<NetworkHub />} />
          <Route path="empowerment" element={<EmpowermentPage />} />
          <Route path="events" element={<HomePage />} /> {/* Map to home sections for now */}
          <Route path="gallery" element={<HomePage />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
