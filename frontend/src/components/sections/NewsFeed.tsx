'use client';

import React from 'react';
import { Newspaper, ChevronRight } from 'lucide-react';

// Giả định kiểu dữ liệu tin tức
interface NewsItem {
  id: number;
  title: string;
  summary: string;
  source: string;
  timeAgo: string;
}

// Dữ liệu giả lập
const DUMMY_NEWS: NewsItem[] = [
  {
    id: 1,
    title: 'Giá dầu WTI tăng vọt sau khi OPEC+ giữ nguyên chính sách sản lượng',
    summary: 'Quyết định bất ngờ của nhóm sản xuất dầu mỏ lớn đã đẩy giá dầu thô tăng 3%, tác động đến cổ phiếu ngành năng lượng.',
    source: 'Bloomberg',
    timeAgo: '1 giờ trước',
  },
  {
    id: 2,
    title: 'VN-Index vượt mốc 1280, thanh khoản thị trường đạt mức kỷ lục',
    summary: 'Dòng tiền đổ mạnh vào nhóm cổ phiếu ngân hàng và bất động sản, báo hiệu một xu hướng tăng trưởng tích cực trong ngắn hạn.',
    source: 'CafeF',
    timeAgo: '3 giờ trước',
  },
  {
    id: 3,
    title: 'Fed báo hiệu giữ lãi suất cao lâu hơn dự kiến, thị trường toàn cầu phản ứng trái chiều',
    summary: 'Biên bản cuộc họp FOMC cho thấy các thành viên lo ngại về lạm phát dai dẳng, gây áp lực lên các thị trường mới nổi.',
    source: 'Reuters',
    timeAgo: '1 ngày trước',
  },
];

const NewsFeed: React.FC = () => {
  // TẠI ĐÂY: Sử dụng useEffect để gọi API tới Backend NestJS lấy danh sách tin tức
  // const [news, setNews] = useState([]);

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
      
      {/* Tiêu đề */}
      <h2 className="flex items-center text-xl font-bold text-blue-400 mb-5 border-b border-gray-700 pb-3">
        <Newspaper size={24} className="mr-2" />
        Tin tức Mới nhất
      </h2>

      <div className="space-y-4">
        {DUMMY_NEWS.map((item) => (
          <a 
            key={item.id} 
            href="#" // Liên kết đến trang chi tiết tin tức
            className="block p-4 rounded-lg bg-gray-900 hover:bg-gray-700 transition-colors duration-200 cursor-pointer group"
          >
            <h3 className="text-white font-semibold mb-1 group-hover:text-blue-300 transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-gray-400 mb-2 line-clamp-2">
              {item.summary}
            </p>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span className="font-medium text-amber-400">{item.source}</span>
              <span className="flex items-center">
                {item.timeAgo}
                <ChevronRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </div>
          </a>
        ))}
      </div>
      
      <div className="mt-5 text-right">
        <a href="/news" className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors">
          Xem tất cả tin tức →
        </a>
      </div>
    </div>
  );
};

export default NewsFeed;