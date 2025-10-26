import { Injectable } from '@nestjs/common';

@Injectable()
export class FaqService {
  private readonly FAQ = [
    {
      type: 'FAQ' as const,
      title: 'Danh sách cổ phiếu',
      payload: 'list-tickets',
    },
    {
      type: 'FAQ' as const,
      title: 'Lấy giá cổ phiếu hiện tại',
      payload: 'current-price',
    },
    {
      type: 'FAQ' as const,
      title: 'Dự đoán giá cổ phiếu',
      payload: 'predictions',
    },
    {
      type: 'FAQ' as const,
      title: 'Phân tích giá cổ phiếu',
      payload: 'analysis',
    },
  ];

  private readonly replies = new Map<string, string>([
    [
      'list-tickets',
      `
			Hiện tại, tôi có thể cung cấp danh sách các mã cổ phiếu phổ biến đang được hỗ trợ trong hệ thống.`,
    ],
    [
      'current-price',
      `Bạn muốn xem giá hiện tại của mã cổ phiếu nào?
Ví dụ, bạn có thể nhập:
👉 Giá VNM hiện tại
👉 FPT hôm nay bao nhiêu?

Tôi sẽ lấy dữ liệu mới nhất để hiển thị cho bạn. 📊`,
    ],
    [
      'predictions',
      `Tôi có thể dự đoán xu hướng giá cổ phiếu dựa trên mô hình học máy Random Forest.
Vui lòng nhập mã cổ phiếu bạn muốn dự đoán, ví dụ:
👉 Dự đoán VNM hoặc FPT tuần sau thế nào?

Hệ thống sẽ phân tích dữ liệu lịch sử và đưa ra mức giá dự kiến trong ngắn hạn. 🔮`,
    ],
    [
      'analysis',
      `Tôi có thể giúp bạn phân tích chi tiết một mã cổ phiếu, bao gồm:

Biểu đồ biến động giá

Mức trung bình, khối lượng giao dịch

Nhận định xu hướng tăng/giảm

Hãy nhập mã cổ phiếu bạn cần phân tích, ví dụ:
👉 Phân tích HPG hoặc Cho tôi xem biểu đồ FPT. 📈`,
    ],
  ]);

  handleFaq(payload: string) {
    const faqItem = this.FAQ.find((f) => f.payload === payload);
    const reply = this.replies.get(payload);
    if (faqItem && reply) {
      return {
        message: faqItem.title,
        suggestionActions: reply,
      };
    }
    return {
      message: 'Không tìm thấy thông tin phù hợp.',
      suggestionActions: null,
    };
  }
}
