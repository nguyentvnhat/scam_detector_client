import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const Landing = () => {
  const stats = [
    { value: '98%', label: 'Độ chính xác phát hiện' },
    { value: '<2s', label: 'Thời gian phân tích' },
    { value: '10K+', label: 'Mẫu lừa đảo được ghi nhận' },
    { value: '24/7', label: 'Hoạt động liên tục' },
  ];

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      title: 'Chuyển đổi giọng nói thông minh',
      description: 'Công nghệ AI nhận diện giọng nói tiên tiến, chuyển đổi cuộc gọi thành văn bản với độ chính xác cao, hỗ trợ đa ngôn ngữ và phương ngữ Việt Nam',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Phát hiện mẫu lừa đảo',
      description: 'Hệ thống phân tích sâu, nhận diện các chiêu trò lừa đảo phổ biến: giả mạo ngân hàng, cuộc gọi thông báo trúng thưởng, yêu cầu cung cấp thông tin nhạy cảm',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Đánh giá rủi ro tức thì',
      description: 'Thuật toán ML tính toán điểm rủi ro từ 0-100%, cảnh báo chi tiết các dấu hiệu đáng ngờ, giúp bạn đưa ra quyết định an toàn và bảo vệ tài sản',
    },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Tải lên file audio/video',
      description: 'Upload bản ghi âm cuộc gọi hoặc video chứa giọng nói cần kiểm tra',
    },
    {
      step: '02',
      title: 'AI phân tích tự động',
      description: 'Hệ thống chuyển đổi giọng nói thành văn bản và quét tìm các dấu hiệu lừa đảo',
    },
    {
      step: '03',
      title: 'Nhận báo cáo chi tiết',
      description: 'Xem transcript, điểm rủi ro và danh sách cảnh báo với giải thích cụ thể',
    },
  ];

  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20">
                  🛡️ Bảo vệ bạn khỏi lừa đảo qua giọng nói
                </span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight px-2"
              >
                ChongLuaDao.AI
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-2 md:mb-4 font-light px-4"
              >
                Phát hiện cuộc gọi lừa đảo với
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-8 md:mb-12 font-semibold px-4"
              >
                Công nghệ Trí tuệ Nhân tạo
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
              >
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl text-base sm:text-lg text-center"
                >
                  Bắt đầu kiểm tra ngay
                </Link>
                <button 
                  onClick={() => handleScrollTo('about')}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all text-base sm:text-lg"
                >
                  Tìm hiểu thêm
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Về ChongLuaDao.AI
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
                ChongLuaDao.AI là nền tảng công nghệ tiên tiến sử dụng trí tuệ nhân tạo để bảo vệ người dùng khỏi các cuộc gọi lừa đảo. Chúng tôi hiểu rằng lừa đảo qua điện thoại đang trở thành mối đe dọa lớn tại Việt Nam, với hàng nghìn người bị mất tiền mỗi năm.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Với công nghệ nhận diện giọng nói AI và machine learning, chúng tôi phân tích nội dung cuộc gọi, phát hiện các mẫu lừa đảo phổ biến và đánh giá mức độ rủi ro để giúp bạn đưa ra quyết định an toàn. Mục tiêu của chúng tôi là tạo ra một lá chắn bảo vệ cho mọi người dùng Việt Nam.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base text-gray-600 px-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section id="risks" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Bạn có đang gặp rủi ro?
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
                Lừa đảo qua cuộc gọi đang trở thành mối đe dọa lớn tại Việt Nam. Mỗi năm, hàng nghìn người bị mất tiền vì tin vào các cuộc gọi giả mạo ngân hàng, thông báo trúng thưởng, hay các chiêu trò khác.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
              {[
                'Cuộc gọi giả mạo từ "ngân hàng" yêu cầu xác thực thông tin',
                'Thông báo trúng thưởng yêu cầu chuyển khoản phí',
                'Yêu cầu cung cấp mã OTP hoặc mật khẩu tài khoản'
              ].map((risk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 md:p-4 bg-red-50 border border-red-100 rounded-lg"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs md:text-sm text-gray-700">{risk}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Công nghệ bảo vệ bạn
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                Sử dụng trí tuệ nhân tạo và machine learning để phân tích và phát hiện các mẫu lừa đảo một cách tự động
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-900 rounded-lg flex items-center justify-center text-white mb-4 md:mb-6">
                    <div className="w-6 h-6 md:w-8 md:h-8">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                Cách thức hoạt động
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                Chỉ cần 3 bước đơn giản để bảo vệ bạn khỏi lừa đảo
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="text-4xl md:text-5xl font-bold text-gray-200 mb-3 md:mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600">
                      {step.description}
                    </p>
                  </div>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300 transform -translate-y-1/2">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-gray-300 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                Bảo vệ bản thân ngay hôm nay
              </h2>
              <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 px-4">
                Không cần đăng ký phức tạp. Chỉ cần email để bắt đầu kiểm tra ngay
              </p>
              <Link
                to="/login"
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl text-base sm:text-lg"
              >
                Kiểm tra miễn phí ngay
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

