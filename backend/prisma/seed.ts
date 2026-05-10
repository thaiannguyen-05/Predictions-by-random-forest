import { AccountType, PrismaClient } from './generated/prisma';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

const password = 'StockSeed@123';

const users = [
  {
    id: '11111111-1111-4111-8111-111111111111',
    fullname: 'Minh Quan',
    username: 'minhquan_stock',
    email: 'minhquan.stock@example.com',
    firstName: 'Minh',
    lastName: 'Quan',
    city: 'TP. Ho Chi Minh',
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    fullname: 'Lan Anh',
    username: 'lananh_invest',
    email: 'lananh.invest@example.com',
    firstName: 'Lan',
    lastName: 'Anh',
    city: 'Ha Noi',
  },
  {
    id: '33333333-3333-4333-8333-333333333333',
    fullname: 'Gia Huy',
    username: 'giahuy_value',
    email: 'giahuy.value@example.com',
    firstName: 'Gia',
    lastName: 'Huy',
    city: 'Da Nang',
  },
  {
    id: '44444444-4444-4444-8444-444444444444',
    fullname: 'Thao Nguyen',
    username: 'thaonguyen_ai',
    email: 'thaonguyen.ai@example.com',
    firstName: 'Thao',
    lastName: 'Nguyen',
    city: 'Can Tho',
  },
];

const posts = [
  {
    id: 'aaaaaaaa-0001-4000-8000-000000000001',
    userId: users[0].id,
    title: 'VN-Index quanh vùng kháng cự: nên giữ tỷ trọng thế nào?',
    content:
      'VN-Index đang đi vào vùng kháng cự ngắn hạn sau một nhịp hồi khá nhanh. Theo mình, giai đoạn này nên ưu tiên quản trị tỷ trọng hơn là mua đuổi. Các nhóm ngân hàng và chứng khoán vẫn giữ vai trò dẫn dắt, nhưng nếu thanh khoản không cải thiện thì rủi ro rung lắc sẽ cao hơn.',
    viewCount: 128,
    likeCount: 18,
  },
  {
    id: 'aaaaaaaa-0002-4000-8000-000000000002',
    userId: users[1].id,
    title: 'Nhóm ngân hàng: BID, CTG, VCB còn dư địa không?',
    content:
      'BID, CTG và VCB vẫn là các mã có ảnh hưởng lớn tới chỉ số. Điểm tích cực là chất lượng tài sản của nhóm quốc doanh tương đối ổn định, nhưng định giá đã phản ánh một phần kỳ vọng. Nhà đầu tư ngắn hạn nên theo dõi biên lãi ròng, tăng trưởng tín dụng và phản ứng giá tại các vùng hỗ trợ gần.',
    viewCount: 96,
    likeCount: 12,
  },
  {
    id: 'aaaaaaaa-0003-4000-8000-000000000003',
    userId: users[2].id,
    title: 'HPG và câu chuyện chu kỳ thép năm nay',
    content:
      'HPG thường phản ứng mạnh với kỳ vọng phục hồi bất động sản và đầu tư hạ tầng. Tuy nhiên biên lợi nhuận thép vẫn phụ thuộc nhiều vào giá nguyên liệu, sản lượng tiêu thụ và nhu cầu xây dựng. Cá nhân mình chỉ giải ngân từng phần khi giá điều chỉnh về vùng hỗ trợ, tránh mua theo tin nóng.',
    viewCount: 141,
    likeCount: 22,
  },
  {
    id: 'aaaaaaaa-0004-4000-8000-000000000004',
    userId: users[3].id,
    title: 'FPT: cổ phiếu tăng trưởng nhưng có còn rẻ?',
    content:
      'FPT là một case tăng trưởng chất lượng nhờ mảng công nghệ, chuyển đổi số và thị trường nước ngoài. Vấn đề nằm ở định giá: cổ phiếu tốt không đồng nghĩa mua lúc nào cũng an toàn. Mình thường chờ các nhịp điều chỉnh hoặc nền tích lũy đủ lâu trước khi tăng tỷ trọng.',
    viewCount: 173,
    likeCount: 31,
  },
  {
    id: 'aaaaaaaa-0005-4000-8000-000000000005',
    userId: users[0].id,
    title: 'Có nên dùng AI để lọc tín hiệu mua bán cổ phiếu?',
    content:
      'AI có thể giúp lọc dữ liệu nhanh hơn, phát hiện mẫu hình và giảm bớt cảm tính khi giao dịch. Nhưng tín hiệu AI nên được xem là một lớp tham khảo, không phải quyết định cuối cùng. Mình vẫn kết hợp thêm xu hướng thị trường, thanh khoản, quản trị vốn và mức chịu rủi ro cá nhân.',
    viewCount: 210,
    likeCount: 37,
  },
  {
    id: 'aaaaaaaa-0006-4000-8000-000000000006',
    userId: users[1].id,
    title: 'Cổ phiếu bất động sản: VHM, VIC, KDH, NVL khác nhau thế nào?',
    content:
      'Không nên gom toàn bộ bất động sản vào một nhóm giống nhau. VHM thiên về dự án lớn và quỹ đất, KDH thường được nhìn như mã phòng thủ hơn trong nhóm nhà ở, còn NVL mang tính tái cấu trúc và rủi ro cao hơn. VIC lại là câu chuyện tập đoàn đa ngành, biến động phụ thuộc nhiều kỳ vọng.',
    viewCount: 88,
    likeCount: 9,
  },
  {
    id: 'aaaaaaaa-0007-4000-8000-000000000007',
    userId: users[2].id,
    title: 'Dầu khí: GAS, PLX, POW nên nhìn theo biến số nào?',
    content:
      'Nhóm dầu khí không chỉ nhìn giá dầu. GAS cần theo dõi sản lượng khí, cơ chế giá và nhu cầu điện; PLX gắn với phân phối xăng dầu và biên lợi nhuận; POW liên quan tới huy động điện và chi phí nhiên liệu. Mỗi mã có driver khác nhau nên không nên mua cả nhóm chỉ vì một tin vĩ mô.',
    viewCount: 117,
    likeCount: 14,
  },
  {
    id: 'aaaaaaaa-0008-4000-8000-000000000008',
    userId: users[3].id,
    title: 'VNM, MSN, MWG: nhóm tiêu dùng đang tạo đáy hay chỉ hồi kỹ thuật?',
    content:
      'Nhóm tiêu dùng có dấu hiệu hồi phục khi kỳ vọng sức mua cải thiện, nhưng cần xác nhận bằng doanh thu và biên lợi nhuận. VNM thiên về phòng thủ, MSN là câu chuyện tái cấu trúc hệ sinh thái tiêu dùng, MWG nhạy với chu kỳ bán lẻ. Mua sớm có lợi thế giá, nhưng phải chấp nhận thời gian chờ.',
    viewCount: 134,
    likeCount: 16,
  },
  {
    id: 'aaaaaaaa-0009-4000-8000-000000000009',
    userId: users[0].id,
    title: 'Nhóm chứng khoán SSI, VCI hưởng lợi khi thanh khoản tăng',
    content:
      'SSI và VCI thường nhạy với thanh khoản thị trường. Khi giá trị giao dịch cải thiện, kỳ vọng doanh thu môi giới, margin và tự doanh sẽ tích cực hơn. Tuy nhiên đây cũng là nhóm beta cao, nên điểm mua cần kỷ luật, đặc biệt sau các nhịp tăng mạnh.',
    viewCount: 122,
    likeCount: 19,
  },
  {
    id: 'aaaaaaaa-0010-4000-8000-000000000010',
    userId: users[1].id,
    title: 'Quản trị rủi ro: đừng để một mã cổ phiếu quyết định cả tài khoản',
    content:
      'Sai lầm phổ biến là quá tự tin vào một mã và dồn tỷ trọng lớn. Dù phân tích đúng, thị trường vẫn có thể đi ngược trong ngắn hạn. Mình thường chia vị thế, đặt ngưỡng cắt lỗ, và không để một cổ phiếu đơn lẻ ảnh hưởng quá lớn tới tổng tài khoản.',
    viewCount: 185,
    likeCount: 28,
  },
];

const commentTexts = [
  'Bài này hợp lý, nhất là đoạn không nên mua đuổi khi thanh khoản chưa xác nhận.',
  'Mình cũng đang theo dõi vùng hỗ trợ gần, nếu thủng thì nên giảm tỷ trọng trước.',
  'Có thể bổ sung thêm yếu tố dòng tiền khối ngoại, nhiều mã phản ứng khá rõ.',
  'Quan điểm hay. Với người mới thì quản trị vốn còn quan trọng hơn chọn đúng mã.',
  'Mình nghĩ nên so thêm kết quả kinh doanh quý gần nhất để tránh nhìn mỗi chart.',
  'AI hỗ trợ tốt, nhưng đúng là vẫn cần kiểm chứng bằng bối cảnh thị trường.',
  'Nhóm này beta cao, vào sai nhịp dễ bị rung rất mạnh.',
  'Cảm ơn chia sẻ, mình sẽ lưu lại để so với watchlist hiện tại.',
  'Nếu có thêm phần vùng giá tham khảo thì bài sẽ dễ áp dụng hơn.',
  'Đồng ý với cách chia vị thế, mua một lần full margin là quá rủi ro.',
];

async function main() {
  const hashedPassword = await argon2.hash(password);

  await prisma.$transaction(async (tx) => {
    for (const user of users) {
      await tx.user.upsert({
        where: { email: user.email },
        update: {
          fullname: user.fullname,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          city: user.city,
          isActive: true,
          accountType: AccountType.EMAIL,
        },
        create: {
          ...user,
          hashedPassword,
          accountType: AccountType.EMAIL,
          isActive: true,
          searchCount: 0,
        },
      });
    }

    for (const post of posts) {
      await tx.post.upsert({
        where: { id: post.id },
        update: {
          title: post.title,
          content: post.content,
          file: [],
          viewCount: post.viewCount,
          likeCount: post.likeCount,
          userId: post.userId,
        },
        create: {
          ...post,
          file: [],
        },
      });
    }

    let commentIndex = 0;
    for (const post of posts) {
      const firstUser = users[(commentIndex + 1) % users.length];
      const secondUser = users[(commentIndex + 2) % users.length];
      const pair = [firstUser, secondUser];

      for (let i = 0; i < pair.length; i += 1) {
        const idNumber = commentIndex * 2 + i + 1;
        const id = `bbbbbbbb-${String(idNumber).padStart(4, '0')}-4000-8000-${String(idNumber).padStart(12, '0')}`;

        await tx.comment.upsert({
          where: { id },
          update: {
            content: commentTexts[(commentIndex + i) % commentTexts.length],
            userId: pair[i].id,
            postId: post.id,
          },
          create: {
            id,
            content: commentTexts[(commentIndex + i) % commentTexts.length],
            userId: pair[i].id,
            postId: post.id,
          },
        });
      }

      commentIndex += 1;
    }
  });

  console.log(`Seeded ${users.length} users, ${posts.length} posts, ${posts.length * 2} comments.`);
  console.log(`Demo password for seeded users: ${password}`);
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
