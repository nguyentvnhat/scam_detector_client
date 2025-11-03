import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  const { score = '0', flagged = '0' } = req.query;
  
  const isScam = flagged === '1';
  const riskScore = parseInt(score as string) || 0;
  
  // Colors
  const bgColor = isScam ? '#DC2626' : '#059669'; // red or green
  const textColor = '#FFFFFF';
  const accentColor = isScam ? '#FEE2E2' : '#D1FAE5';
  
  // Status text
  const status = isScam ? 'LỪA ĐẢO' : 'AN TOÀN';
  const statusEn = isScam ? 'SCAM DETECTED' : 'SAFE';
  
  // Generate SVG image (1200x630 for OG)
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${isScam ? '#991B1B' : '#047857'};stop-opacity:1" />
      </linearGradient>
    </defs>
    <!-- Background -->
    <rect width="1200" height="630" fill="url(#grad)"/>
    
    <!-- Decorative circles -->
    <circle cx="100" cy="100" r="80" fill="${accentColor}" opacity="0.2"/>
    <circle cx="1100" cy="530" r="100" fill="${accentColor}" opacity="0.2"/>
    
    <!-- Logo/Brand -->
    <text x="600" y="180" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="${textColor}" text-anchor="middle">BLACKLIST.VN</text>
    
    <!-- Status Badge -->
    <rect x="400" y="240" width="400" height="100" rx="50" fill="${accentColor}" opacity="0.3"/>
    <text x="600" y="305" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="${textColor}" text-anchor="middle">${status}</text>
    
    <!-- Risk Score -->
    <text x="600" y="400" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="${textColor}" text-anchor="middle">Điểm rủi ro: ${riskScore}%</text>
    <text x="600" y="450" font-family="Arial, sans-serif" font-size="36" fill="${textColor}" text-anchor="middle" opacity="0.9">Risk Score: ${riskScore}%</text>
    
    <!-- Footer text -->
    <text x="600" y="580" font-family="Arial, sans-serif" font-size="32" fill="${textColor}" text-anchor="middle" opacity="0.8">AI Phát hiện Lừa đảo qua Giọng nói</text>
  </svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.status(200).send(svg);
}

