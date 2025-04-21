import React from 'react'
import blog1 from "../Components/Assets/blog1.jpg"
import blog2 from "../Components/Assets/blog2.jpg"
function Infor() {
    return (
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">TẦM NHÌN - SỨ MỆNH ATINO</h1>
                    <p className="mt-2 text-lg text-gray-500">Đăng ngày 06-04-2023</p>
                </header>

                {/* Introduction */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Giới thiệu</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Bắt đầu từ thương hiệu thời trang Shop Độc ra đời trong năm 2014, trải qua chặng đường phát triển đầy khó khăn,
                        Shop Độc được đổi tên thành ATINO vào năm 2022 với ước mơ gây dựng một thương hiệu thời trang nam có mặt ở
                        từng gia đình Việt.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                        Atino tiếp đà phát triển, hiện tại đến nay đã có 8 cửa hàng tại Hà Nội cùng hệ thống online vững mạnh từ
                        các sàn thương mại điện tử: Shopee, Lazada, Tiktok, Website. Ngoài ra Atino còn sở hữu hệ thống kho vận, 2
                        xưởng sản xuất 3000m2 tại ngoại thành Hà Nội.
                    </p>
                    <img src={blog1} alt="blog" />
                </section>

                {/* Core Values */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">GIÁ TRỊ CỐT LÕI CỦA ATINO</h2>
                    <p className="text-lg text-gray-700 mb-4">
                        Ở ATINO, chúng tôi luôn gìn giữ 5 Giá Trị Cốt Lõi để mọi bước đi đều thêm vững chắc và giàu giá trị.
                    </p>
                    <ul className="list-disc pl-6 text-lg text-gray-700">
                        <li>Đam mê phục vụ khách hàng.</li>
                        <li>Coi mình là gốc rễ của mọi vấn đề.</li>
                        <li>Luôn trung thực, trách nhiệm.</li>
                        <li>Chủ động, sáng tạo.</li>
                        <li>Yêu thương và hỗ trợ đồng đội.</li>
                    </ul>
                    <img src={blog2} alt="blog" />
                </section>

                {/* Store Locations */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Hệ Thống Cửa Hàng</h2>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Hà Nội:</h3>
                    <ul className="list-none pl-6 text-lg text-gray-700 mb-4">
                        <li>▪️ 110 Phố Nhổn</li>
                        <li>▪️ 1221 Giải Phóng</li>
                        <li>▪️ 154 Quang Trung - Hà Đông</li>
                        <li>▪️ 34 Trần Phú - Hà Đông</li>
                        <li>▪️ 208 Bạch Mai</li>
                        <li>▪️ 49 Chùa Bộc</li>
                        <li>▪️ 116 Cầu Giấy</li>
                        <li>▪️ 290 Nguyễn Trãi - Trung Văn (Gần Đại học Hà Nội)</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Hoài Đức:</h3>
                    <ul className="list-none pl-6 text-lg text-gray-700 mb-4">
                        <li>▪️ 312 Khu 6 Trạm Trôi - Hoài Đức</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Thị xã Sơn Tây:</h3>
                    <ul className="list-none pl-6 text-lg text-gray-700 mb-4">
                        <li>▪️ 195 Quang Trung - Tx.Sơn Tây</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">TP. Thanh Hóa:</h3>
                    <ul className="list-none pl-6 text-lg text-gray-700 mb-4">
                        <li>▪️ 236-238 Lê Hoàn</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">TP.Vinh, Nghệ An:</h3>
                    <ul className="list-none pl-6 text-lg text-gray-700 mb-4">
                        <li>▪️ 167 Nguyễn Văn Cừ</li>
                    </ul>

                    <h4 className="text-lg font-semibold text-gray-900 mb-2">GIỜ MỞ CỬA</h4>
                    <p className="text-lg text-gray-700 mb-4">- Hà Nội: 8h30 - 22h30</p>
                    <p className="text-lg text-gray-700 mb-4">- Ngoại thành & tỉnh khác: 8h30 - 22h00</p>
                </section>

                {/* Return Policy */}
                <section className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Chính sách đổi hàng</h2>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">I. Quy định đổi hàng online</h3>
                    <ul className="list-disc pl-6 text-lg text-gray-700 mb-4">
                        <li>Áp dụng 01 lần đổi/01 đơn hàng</li>
                        <li>Không áp dụng đổi với sản phẩm phụ kiện và đồ lót</li>
                        <li>Sản phẩm nguyên giá được đổi sang sản phẩm nguyên khác còn hàng tại website có giá trị bằng hoặc lớn hơn</li>
                        <li>Không hỗ trợ đổi các sản phẩm giảm giá/khuyến mại</li>
                    </ul>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Điều kiện đổi sản phẩm</h3>
                    <ul className="list-disc pl-6 text-lg text-gray-700 mb-4">
                        <li>Đổi hàng trong vòng 3 ngày kể từ ngày khách hàng nhận được sản phẩm.</li>
                        <li>Sản phẩm còn nguyên tem, mác và chưa qua sử dụng.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Thực hiện đổi sản phẩm</h3>
                    <ul className="list-disc pl-6 text-lg text-gray-700 mb-4">
                        <li>Bước 1: Liên hệ fanpage <a href="https://www.facebook.com/atino.vn/" className="text-blue-600">Atino</a> để xác nhận đổi hàng</li>
                        <li>Bước 2: Gửi hàng về địa chỉ kho.</li>
                        <li>Bước 3: ATINO gửi đổi sản phẩm mới khi nhận được hàng.</li>
                        <li>Lưu ý: Kho online không nhận giữ hàng trong thời gian khách hàng gửi sản phẩm về để đổi hàng.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">II. Quy định đổi sản phẩm mua tại cửa hàng</h3>
                    <ul className="list-disc pl-6 text-lg text-gray-700 mb-4">
                        <li>Chính sách đổi hàng được áp dụng trong vòng 30 ngày kể từ ngày mua hàng.</li>
                        <li>Khách hàng được đổi không giới hạn số lần trong 30 ngày.</li>
                        <li>Quý khách vui lòng mang theo hóa đơn bán lẻ khi đổi hàng.</li>
                        <li>Sản phẩm đổi phải còn nguyên tem nhãn mác và trong tình trạng như ban đầu (chưa giặt, chưa qua sử dụng, chưa qua sửa chữa, không bị rách hoặc hư hại).</li>
                        <li>Sản phẩm đồ lót, phụ kiện, mũ, túi xách, balo không áp dụng đổi hàng vì lý do sức khỏe.</li>
                        <li>Khách hàng có thể đổi hàng tại tất cả các cửa hàng trong hệ thống Atino.</li>
                        <li>Sản phẩm sau khi đổi sẽ áp dụng giá bán tại thời điểm đổi hàng.</li>
                    </ul>
                </section>

                {/* Contact Info */}
                <section className="text-center mt-8">
                    <p className="text-lg text-gray-700">
                        Mọi ý kiến đóng góp cũng như yêu cầu khiếu nại xin vui lòng liên hệ: <strong>0967.28.4444</strong>
                    </p>
                </section>
            </div>
        </div>
    );
}

export default Infor
