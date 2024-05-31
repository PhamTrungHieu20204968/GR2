import { Col, Row } from "antd";
import Layout from "components/Layout";
import React from "react";
import { Link } from "react-router-dom";

function Policy() {
  return (
    <Layout page={["policy"]}>
      <div className='container mx-auto mt-8 overflow-hidden'>
        <Row>
          <div className='uppercase text-xl'>
            <Link to='/' className='text-gray-400 font-bold hover:text-black'>
              Trang chủ
            </Link>
            <span className='mx-2 text-gray-400'>/</span>
            <span className=' font-bold'>Chính sách mua hàng</span>
          </div>
        </Row>
        <Row className='mt-4' gutter={16} justify='center'>
          <Col span={19}>
            <div className='bg-[#344a5fbd] text-white p-8'>
              <div className='home__title font-bold'>Chính sách mua hàng</div>
              <div class='object-detail-content text-lg'>
                <p>
                  <span>
                    <strong>CHÍNH SÁCH VÀ QUY ĐỊNH</strong>
                  </span>
                </p>
                <p>&nbsp;</p>
                <p>
                  <span>
                    <strong>Chính sách thanh toán:</strong>
                  </span>
                </p>
                <p>
                  <span>
                    Có 3 hình thức thanh toán, khách hàng có thể lựa chọn hình
                    thức thuận tiện và phù hợp với mình nhất:
                  </span>
                </p>
                <p>
                  <span>
                    <strong>Cách 1:</strong> Thanh toán tiền mặt trực tiếp địa
                    chỉ của chúng tôi
                  </span>
                </p>
                <p>
                  <span>
                    <strong>Cách 2:</strong> Thanh toán khi nhận hàng (COD),
                    khách hàng xem hàng tại nhà, thanh toán tiền mặt cho nhân
                    viên giao nhận hàng.
                  </span>
                </p>
                <p>
                  <span>
                    <strong>Cách 3:</strong> Chuyển khoản trước. Quý khách
                    chuyển khoản trước, sau đó chúng tôi tiến hành giao hàng
                    theo thỏa thuận hoặc hợp đồng với Quý khách.
                  </span>
                </p>
                <p>&nbsp;</p>
                <p>
                  <strong>
                    <span>• Lưu ý:&nbsp;</span>
                  </strong>
                  <span>
                    Nội dung chuyển khoản ghi rõ họ tên và chuyển cho món hàng
                    nào. Sau khi chuyển khoản, chúng tôi sẽ liên hệ xác nhận và
                    tiến hành giao hàng. Nếu sau thời gian thỏa thuận mà chúng
                    tôi không giao hàng hoặc không phản hồi lại, quý khách có
                    thể gửi khiếu nại trực tiếp về địa chỉ trụ sở và yêu cầu bồi
                    thường nếu chứng minh được sự chậm trễ làm ảnh hưởng đến
                    kinh doanh của quý khách.
                  </span>
                </p>
                <p>
                  <span>
                    Đối với khách hàng có nhu cầu mua số lượng lớn để kinh doanh
                    hoặc buôn sỉ vui lòng liên hệ trực tiếp với chúng tôi để có
                    chính sách giá cả hợp lý. Và việc thanh toán sẽ được thực
                    hiện theo hợp đồng.&nbsp;
                  </span>
                  <span>
                    Chúng tôi cam kết kinh doanh minh bạch, hợp pháp, bán hàng
                    chất lượng, có nguồn gốc.
                  </span>
                </p>
                <p>&nbsp;</p>
                <p>
                  <span>
                    <strong>Chính sách xử lý khiếu nại:</strong>
                  </span>
                </p>
                <p>
                  <span>
                    - Tiếp nhận mọi khiếu nại của khách hàng liên quan đến việc
                    sử dụng dịch vụ của công ty.
                  </span>
                </p>
                <p>
                  <span>
                    - Tất cả mọi trường hơp bảo hành, quý khách có thể liên hệ
                    với chúng tôi để làm thủ tục bảo hành.
                  </span>
                </p>
                <p>
                  <span>
                    - Thời gian giải quyết khiếu nại trong thời hạn tối đa là 03
                    (ba) ngày làm việc kể từ khi nhận được khiếu nại của của
                    khách hàng. Trong trường hợp bất khả kháng 2 bên sẽ tự
                    thương lượng.
                  </span>
                </p>
                <p>&nbsp;</p>
                <p>
                  <span>
                    <strong>Chính sách vận chuyển và giao nhận:</strong>
                  </span>
                </p>
                <p>
                  <span>
                    Thông thường sau khi nhận được thông tin đặt hàng chúng tôi
                    sẽ xử lý đơn hàng trong vòng 24h và phản hồi lại thông tin
                    cho khách hàng về việc thanh toán và giao nhận. Thời gian
                    giao hàng thường trong khoảng từ 3-5 ngày kể từ ngày chốt
                    đơn hàng hoặc theo thỏa thuận với khách khi đặt hàng. Tuy
                    nhiên, cũng có trường hợp việc giao hàng kéo dài hơn nhưng
                    chỉ xảy ra trong những tình huống bất khả kháng như sau:
                  </span>
                </p>
                <p>
                  <span>
                    - Nhân viên chúng tôi liên lạc với khách hàng qua điện thoại
                    không được nên không thể giao hàng.
                  </span>
                </p>
                <p>
                  <span>
                    - Địa chỉ giao hàng bạn cung cấp không chính xác hoặc khó
                    tìm.
                  </span>
                </p>
                <p>
                  <span>
                    - Số lượng đơn hàng tăng đột biến khiến việc xử lý đơn hàng
                    bị chậm.
                  </span>
                </p>
                <p>
                  <span>
                    - Đối tác cung cấp hàng chậm hơn dự kiến khiến việc giao
                    hàng bị chậm lại hoặc đối tác vận chuyển giao hàng bị chậm.
                  </span>
                </p>
                <p>
                  <span>
                    Về phí vận chuyển, chúng tôi sử dụng dịch vụ vận chuyển
                    ngoài nên cước phí vận chuyển sẽ được tính theo phí của các
                    đơn vị vận chuyển tùy vào vị trí và khối lượng của đơn hàng,
                    khi liên hệ lại xác nhận đơn hàng với khách sẽ báo mức phí
                    cụ thể cho khách hàng.
                  </span>
                </p>
                <p>
                  <span>
                    Riêng khách tỉnh có nhu cầu mua số lượng lớn hoặc khách buôn
                    sỉ nếu có nhu cầu mua sản phẩm , chúng tôi sẽ nhờ dịch vụ
                    giao nhận của các công ty vận chuyển và phí sẽ được tính
                    theo phí của các đơn vị cung cấp dịch vụ vận chuyển hoặc
                    theo thoản thuận hợp đồng giữa 2 bên.
                  </span>
                </p>
                <p>&nbsp;</p>
                <p>
                  <span>
                    <strong>Chính sách đổi trả và hoàn tiền:</strong>
                  </span>
                </p>
                <p>&nbsp;</p>
                <p>
                  <span>
                    <strong>Trường hợp được đổi/trả hàng</strong>
                  </span>
                </p>
                <p>
                  <br />
                  <strong>
                    <span>Sản phẩm mua rồi nhưng không ưng ý</span>
                  </strong>
                  <br />
                  <span>
                    – Người mua có thể trả hàng khi không vừa ý trong vòng 1h kể
                    từ khi nhận hàng, tratoanthang.com sẽ đổi sản phẩm cho
                    khách. Sản phẩm muốn đổi hoặc trả cần giữ sản phâm nguyên
                    đai, chưa mở nắp, chưa sử dụng. Không nhất thiết còn tem mác
                    hay hỏng hộp. Không bị méo mó, biến dạng.
                  </span>
                </p>
                <p>&nbsp;</p>
                <p>
                  <strong>
                    <span>Sản phẩm mua bị lỗi – Quá hạn sử dụng.</span>
                  </strong>
                  <br />
                  <span>
                    Quý khách vui lòng kiểm tra sản phẩm trước khi thanh toán.
                    Trong trường hợp sản phẩm bị hư hại trong quá trình vận
                    chuyển, quý khách vui lòng từ chối và gửi lại sản phẩm cho
                    chúng tôi
                  </span>
                  <br />
                  <span>Sản phẩm không sử dụng được ngay khi được giao.</span>
                  <br />
                  <span>
                    Trước tiên, hãy dành thời gian đọc kỹ tem hướng dẫn sử dụng
                    và chắc rằng sản phẩm phù hợp với nhu cầu của bạn. Vui lòng
                    liên hệ ngay cho chúng tôi để được hỗ trợ hồi trả lại hàng
                  </span>
                </p>
                <p>
                  <br />
                  <strong>
                    <span>Sản phẩm giao không đúng theo đơn đặt hàng</span>
                  </strong>
                  <br />
                  <span>
                    Bạn nghĩ rằng sản phẩm giao cho bạn không đúng với đơn đặt
                    hàng? Hãy liên hệ với chúng tôi càng sớm càng tốt, hệ thống
                    của chúng tôi sẽ kiểm tra nếu hàng của bạn bị gửi nhầm.
                    Trong trường hợp đó, chúng tôi sẽ thay thế đúng mặt hàng bạn
                    yêu cầu (khi có hàng).
                  </span>
                </p>
                <p>
                  <br />
                  <span>
                    <strong>Điều kiện đổi trả hàng:</strong>
                  </span>
                </p>
                <p>
                  <br />
                  <span>
                    Điều kiện về thời gian đổi trả: trong vòng 01 ngày kể từ khi
                    nhận được hàng và phải liên hệ gọi ngay cho chúng tôi theo
                    số điện thoại trên để được xác nhận đổi trả hàng.
                  </span>
                </p>
                <p>
                  <br />
                  <strong>
                    <span>Điều kiện đổi trả hàng:</span>
                  </strong>
                  <br />
                  <span>
                    – Sản phẩm gửi lại phải còn nguyên đai nguyên kiện
                  </span>
                  <br />
                  <span>
                    – Phiếu bảo hành (nếu có) và tem của công ty trên sản phẩm
                    còn nguyên vẹn.
                  </span>
                  <br />
                  <span>
                    – Sản phẩm đổi/ trả phải còn đầy đủ hộp, giấy Hướng dẫn sử
                    dụng và chưa qua sử dụng.
                  </span>
                  <br />
                  <span>
                    – Quý khách chịu chi phí vận chuyển, đóng gói, thu hộ tiền,
                    chi phí liên lạc tối đa tương đương 20% giá trị đơn hàng.
                  </span>
                </p>
                <p>
                  <br />
                  <strong>
                    <span>Quy trình đổi trả hàng:</span>
                  </strong>
                  <br />
                  <span>
                    <strong>Bước 1:</strong> Sau khi nhận được hàng. Yêu cầu quý
                    vị kiểm tra kỹ 1 lần trước khi nhận hàng. Nếu có vấn đề xin
                    vui lòng liên hệ Trung tâm hỗ trợ khách hàng tại thời điểm
                    nhân viên giao hàng còn ở đó.
                  </span>
                  <br />
                  <span>
                    – Trường hợp sau khi nhân viên giao hàng đã đi – Nếu muốn
                    đổi trả hàng có thể liên hệ với chúng tôi để được xử lý và
                    hẹn lịch đổi trả hàng.
                  </span>
                  <br />
                  <span>
                    <strong>Bước 2:</strong> Sau khi Trung tâm hỗ trợ khách hàng
                    thông báo lịch hẹn nhận hàng trả.
                  </span>
                </p>
                <p>&nbsp;</p>
                <p>
                  <span>
                    <strong>Chính sách bảo hành:</strong>
                  </span>
                </p>
                <p>
                  <br />
                  <strong>
                    <span>1. Trường hợp được bảo hành:</span>
                  </strong>
                  <br />
                  <span>- Sản phẩm trong thời hạn còn bảo hành.</span>
                  <br />
                  <span>
                    - Lỗi về máy, pin và bị hư hỏng do các điều kiện tự nhiên,
                    không có sự tác động của con người.
                  </span>
                  <br />
                  <span>
                    - Sản phẩm được bảo hành theo quy định của nhà cung cấp.
                  </span>
                  <br />
                  <span>
                    - Quý khách xuất trình phiếu bảo hành khi bảo hành.
                  </span>
                </p>
                <p>
                  <br />
                  <strong>
                    <span>2. Trường hợp không được bảo hành:</span>
                  </strong>
                  <br />
                  <span>
                    - Sản phẩm đã quá thời hạn ghi trên Phiếu bảo hành hoặc mất
                    Phiếu bảo hành.
                  </span>
                  <br />
                  <span>
                    - Phiếu bảo hành không ghi rõ mã số sản phẩm và ngày mua
                    hàng.
                  </span>
                  <br />
                  <span>
                    - Mã số sản phẩm và Phiếu bảo hành không trùng khớp nhau
                    hoặc không xác định được vì bất kỳ lý do nào.
                  </span>
                  <br />
                  <span>
                    - Sản phẩm bị trầy xước do quá trình sử dụng lâu ngày.
                  </span>
                  <br />
                  <span>- Sản phẩm bị bể móp, biến dạng do bị va đập.</span>
                  <br />
                  <span>
                    - Khách hàng tự ý can thiệp vào máy của sản phẩm hoặc đem
                    đến một nơi nào khác sửa chữa.
                  </span>
                </p>
                <p>
                  <br />
                  <strong>
                    <span>3. Điều kiện đổi trả hàng hoặc hoàn tiền 100%:</span>
                  </strong>
                  <br />
                  <span>
                    - Sản phẩm phát hiện bị lỗi của nhà sản xuất khi nhận hàng.
                  </span>
                  <br />
                  <span>
                    - Sản phẩm không giống với sản phẩm mà Quý khách đã đặt hàng
                    trên website của chúng tôi.
                  </span>
                </p>
                <p>
                  <br />
                  <strong>
                    <span>Lưu ý:</span>
                  </strong>
                  <br />
                  <span>
                    - Khách hàng cần đổi trả hàng trong vòng 7 ngày làm việc
                    tính từ thời điểm quý khách nhận hàng.
                  </span>
                  <br />
                  <span>
                    - Sản phẩm đổi trả cần nguyên vẹn nhãn mác, hộp, bao bì gốc
                    của sản phẩm như khi Quý khách nhận hàng lúc đầu.
                  </span>
                </p>
                <p>&nbsp;</p>{" "}
              </div>
              <div className='home__title'>.</div>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default Policy;
