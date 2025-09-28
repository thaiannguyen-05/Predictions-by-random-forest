import React from 'react';
import { Info, HelpCircle, Users, MessageSquare } from 'lucide-react';

const functionalLinks = [
    { name: 'Về chúng tôi (About Us)', icon: Info, href: '/about' },
    { name: 'Câu hỏi thường gặp (FAQ)', icon: HelpCircle, href: '/faq' },
    { name: 'Nhóm phát triển', icon: Users, href: '/team' },
];

const AboutUs: React.FC = () => {
  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow-2xl border border-gray-700">
      <h2 className="flex items-center text-xl font-bold text-purple-400 mb-4 border-b border-gray-700 pb-3">
        <MessageSquare size={22} className="mr-2" />
        Chức năng & Hỗ trợ
      </h2>
      
      <ul className="space-y-3">
        {functionalLinks.map((link) => (
          <li key={link.name}>
            <a 
              href={link.href} 
              className="flex items-center p-3 rounded-lg bg-gray-900 hover:bg-gray-700 transition-colors text-white"
            >
              <link.icon size={20} className="mr-3 text-purple-400" />
              <span className="font-medium">{link.name}</span>
            </a>
          </li>
        ))}
        {/* Chatbot icon sẽ được đặt cố định trong Layout, không nằm trong box này */}
      </ul>
    </div>
  );
};

export default AboutUs;