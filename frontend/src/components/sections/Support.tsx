import React from "react";
import {
  Info,
  HelpCircle,
  Users,
  MessageSquare,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";

// Main Support Component — render đơn giản liệt kê các trang tĩnh
const SupportContent: React.FC = () => {
  const functionalLinks = [
    { name: "Về chúng tôi (About Us)", icon: Info, href: "/aboutus.html" },
    { name: "Câu hỏi thường gặp (FAQ)", icon: HelpCircle, href: "/faq.html" },
    { name: "Nhóm phát triển", icon: Users, href: "/team.html" },
  ];

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
              className="flex items-center justify-between w-full p-3 rounded-lg bg-gray-900 hover:bg-gray-700 transition-colors text-white group"
            >
              <div className="flex items-center">
                <link.icon size={20} className="mr-3 text-purple-400" />
                <span className="font-medium">{link.name}</span>
              </div>
              <ExternalLink
                size={16}
                className="text-gray-400 group-hover:text-purple-400 transition-colors"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// About Us Content Component
const AboutUsContent: React.FC = () => {
  const stats = [
    { number: "50K+", label: "Người dùng", icon: Users },
    { number: "99.8%", label: "Độ tin cậy", icon: HelpCircle },
    { number: "24/7", label: "Hỗ trợ", icon: Info },
    { number: "4+", label: "Năm kinh nghiệm", icon: MessageSquare },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <h1 className="text-2xl font-bold text-purple-400 mb-6 border-b border-gray-700 pb-3">
        Về STOCKTRACK
      </h1>

      <div className="space-y-6">
        <div>
          <p className="text-gray-300 mb-4">
            STOCKTRACK là nền tảng theo dõi và phân tích thị trường chứng khoán
            hàng đầu tại Việt Nam, cung cấp các công cụ và thông tin cần thiết
            để nhà đầu tư đưa ra quyết định sáng suốt.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-purple-400 mb-3">
            Tầm nhìn
          </h3>
          <p className="text-gray-300">
            Trở thành nền tảng phân tích và theo dõi thị trường chứng khoán được
            tin cậy nhất tại Việt Nam.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-purple-400 mb-3">
            Giá trị cốt lõi
          </h3>
          <ul className="text-gray-300 space-y-2">
            <li className="flex items-center">
              <span className="text-purple-400 mr-2">▸</span>
              Độ chính xác và tin cậy
            </li>
            <li className="flex items-center">
              <span className="text-purple-400 mr-2">▸</span>
              Công nghệ tiên tiến
            </li>
            <li className="flex items-center">
              <span className="text-purple-400 mr-2">▸</span>
              Dịch vụ khách hàng tận tâm
            </li>
            <li className="flex items-center">
              <span className="text-purple-400 mr-2">▸</span>
              Đổi mới không ngừng
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-center"
            >
              <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-purple-900 bg-opacity-20 p-4 rounded-lg border border-purple-800">
          <h4 className="font-semibold text-purple-400 mb-3">
            Thông tin liên hệ
          </h4>
          <div className="text-gray-300 space-y-2">
            <p>📧 info@stocktrack.vn</p>
            <p>📞 1900-xxxx</p>
            <p>📍 Hà Nội, Việt Nam</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// FAQ Content Component
const FAQContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const faqItems = [
    {
      question: "Làm thế nào để đăng ký tài khoản STOCKTRACK?",
      answer:
        "Truy cập trang chủ và nhấn vào nút 'Đăng ký'. Điền đầy đủ thông tin cá nhân và xác nhận email để hoàn tất quá trình đăng ký.",
    },
    {
      question: "STOCKTRACK có tính phí không?",
      answer:
        "Cung cấp cả phiên bản miễn phí và trả phí. Phiên bản trả phí cung cấp thêm nhiều tính năng nâng cao và dữ liệu chi tiết hơn.",
    },
    {
      question: "Dữ liệu được cập nhật như thế nào?",
      answer:
        "Dữ liệu được cập nhật theo thời gian thực từ các nguồn dữ liệu chính thống. Dữ liệu giá được cập nhật mỗi 5 giây trong giờ giao dịch.",
    },
    {
      question: "Có sử dụng được trên di động không?",
      answer:
        "Có ứng dụng di động tương thích với cả iOS và Android. Tải ứng dụng từ App Store hoặc Google Play Store.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQs = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <h1 className="text-2xl font-bold text-purple-400 mb-6 border-b border-gray-700 pb-3">
        Câu Hỏi Thường Gặp
      </h1>

      <div className="space-y-6">
        <div className="relative">
          <Info className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
          />
        </div>

        <div className="space-y-3">
          {filteredFAQs.map((item, index) => (
            <div
              key={index}
              className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-800 transition-colors"
              >
                <span className="font-medium text-gray-300">
                  {item.question}
                </span>
                {activeIndex === index ? (
                  <HelpCircle className="w-5 h-5 text-purple-400" />
                ) : (
                  <HelpCircle className="w-5 h-5 text-purple-400" />
                )}
              </button>
              {activeIndex === index && (
                <div className="px-4 py-3 bg-gray-800 border-t border-gray-700">
                  <p className="text-gray-400">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            Không tìm thấy câu hỏi phù hợp
          </div>
        )}

        <div className="bg-purple-900 bg-opacity-20 p-6 rounded-lg border border-purple-800">
          <h3 className="text-lg font-semibold text-purple-400 mb-4 text-center">
            Không tìm thấy câu trả lời?
          </h3>
          <p className="text-gray-300 text-center mb-4">
            Liên hệ với chúng tôi để được hỗ trợ trực tiếp
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center">
              <MessageSquare className="w-6 h-6 text-purple-400 mb-2" />
              <span className="text-gray-300 text-sm">
                support@stocktrack.vn
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-6 h-6 text-purple-400 mb-2" />
              <span className="text-gray-300 text-sm">1900-xxxx</span>
            </div>
            <div className="flex flex-col items-center">
              <ExternalLink className="w-6 h-6 text-purple-400 mb-2" />
              <span className="text-gray-300 text-sm">
                8:00 - 17:00 (T2-T6)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Team Content Component
const TeamContent: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      initials: "TN",
      name: "Trần Nam",
      role: "Trưởng nhóm phát triển",
      description:
        "Chịu trách nhiệm về kiến trúc hệ thống và định hướng công nghệ. 8 năm kinh nghiệm trong phát triển phần mềm tài chính.",
    },
    {
      id: 2,
      initials: "LM",
      name: "Lê Minh",
      role: "Chuyên gia phân tích dữ liệu",
      description:
        "Phát triển các thuật toán phân tích và xử lý dữ liệu thị trường. Thạc sĩ Khoa học Dữ liệu từ Đại học Quốc gia.",
    },
    {
      id: 3,
      initials: "PH",
      name: "Phương Hoa",
      role: "Nhà phát triển Frontend",
      description:
        "Thiết kế và phát triển giao diện người dùng. Đam mê tạo ra trải nghiệm người dùng mượt mà và trực quan.",
    },
    {
      id: 4,
      initials: "VK",
      name: "Vũ Khoa",
      role: "Chuyên gia tài chính",
      description:
        "Cung cấp kiến thức chuyên môn về thị trường chứng khoán. 10+ năm kinh nghiệm trong ngành tài chính.",
    },
  ];

  const stats = [
    { number: "4+", label: "Năm kinh nghiệm" },
    { number: "50K+", label: "Người dùng" },
    { number: "99.8%", label: "Độ tin cậy" },
    { number: "24/7", label: "Hỗ trợ" },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
      <h1 className="text-2xl font-bold text-purple-400 mb-6 border-b border-gray-700 pb-3">
        Nhóm Phát Triển
      </h1>

      <div className="space-y-6">
        <p className="text-gray-300 text-center">
          Đội ngũ chuyên gia giàu kinh nghiệm đứng sau sự thành công của
          STOCKTRACK
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden hover:border-purple-400 transition-colors"
            >
              <div className="bg-gradient-to-r from-purple-900 to-purple-800 p-6 text-center">
                <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-gray-900 font-bold text-xl">
                    {member.initials}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {member.name}
                </h3>
                <div className="inline-block bg-purple-400 bg-opacity-20 text-purple-300 px-3 py-1 rounded-full text-sm mt-2">
                  {member.role}
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-400 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-center"
            >
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Support Component — return the support content (static links)
const Support: React.FC = () => {
  return <SupportContent />;
};

export default Support;
