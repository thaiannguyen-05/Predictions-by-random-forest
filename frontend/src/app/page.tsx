import SearchBar from '@/components/common/SearchBar';
import NewsFeed from '@/components/sections/NewsFeed';
import Recommendations from '@/components/sections/Recommendations';
import Watchlist from '@/components/sections/Watchlist';
import AboutUs from '@/components/sections/AboutUs'; 
import MainLayout from './main-layout';

export default function Home() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        
        {/* 1. Thanh Tìm kiếm */}
        <SearchBar />

        {/* 2. Bố cục 3 phần chính (Tin tức, Đề xuất/Ghim, Chức năng) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 px-4 max-w-7xl mx-auto">
          
          {/* Cột Trái: Cổ phiếu Đề xuất & Đã ghim (Col 1-3) */}
          <div className="lg:col-span-3 space-y-6">
            <Recommendations />
            <Watchlist /> 
          </div>

          {/* Cột Giữa: Tin tức (Col 4-8) */}
          <div className="lg:col-span-6">
            <NewsFeed />
          </div>

          {/* Cột Phải: Chức năng (About us, v.v...) (Col 9-12) */}
          <div className="lg:col-span-3 space-y-6">
            <AboutUs />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}