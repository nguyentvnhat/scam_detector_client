export interface AnalysisResult {
  transcript: string;
  riskScore: number;
  flagged: Array<{
    text: string;
    reason: string;
  }>;
}

export const analyzeAudio = async (file: File): Promise<AnalysisResult> => {
  // Simulate API call delay
  await new Promise((res) => setTimeout(res, 2000));

  // Mock response
  return {
    transcript: "Xin chào, tôi gọi từ ngân hàng ABC. Chúng tôi có chương trình cho vay với lãi suất 0% đặc biệt dành cho bạn...",
    riskScore: 82,
    flagged: [
      { text: "ngân hàng ABC", reason: "Giả mạo tổ chức" },
      { text: "vay lãi suất 0%", reason: "Nội dung đáng nghi" }
    ]
  };
};

