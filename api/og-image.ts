import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // Debug logging
  console.log('🖼️ OG Image API called:', {
    url: req.url,
    query: req.query,
    score: req.query.score,
    flagged: req.query.flagged,
  });

  const { score = '0', flagged = '0' } = req.query;
  
  const isScam = flagged === '1';
  const riskScore = parseInt(score as string) || 0;
  
  console.log('✅ Generating OG image:', {
    score,
    flagged,
    isScam,
    riskScore,
  });
  
  // Colors
  const bgColor = isScam ? '#DC2626' : '#059669'; // red or green
  const textColor = '#FFFFFF';
  const accentColor = isScam ? '#FEE2E2' : '#D1FAE5';
  
  // Status text
  const status = isScam ? 'LỪA ĐẢO' : 'AN TOÀN';
  
  // Generate SVG image (1200x630 for OG)
  // Use system fonts that support Vietnamese characters
  // Convert Vietnamese text to ensure proper rendering
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${isScam ? '#991B1B' : '#047857'};stop-opacity:1" />
      </linearGradient>
      <filter id="shadow">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
      </filter>
    </defs>
    <!-- Background -->
    <rect width="1200" height="630" fill="url(#grad)"/>
    
    <!-- Decorative circles -->
    <circle cx="100" cy="100" r="80" fill="${accentColor}" opacity="0.2"/>
    <circle cx="1100" cy="530" r="100" fill="${accentColor}" opacity="0.2"/>
    
    <!-- Logo/Brand -->
    <text x="600" y="180" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="64" font-weight="bold" fill="${textColor}" text-anchor="middle" filter="url(#shadow)">BLACKLIST.VN</text>
    
    <!-- Status Badge with background for better readability -->
    <rect x="350" y="220" width="500" height="120" rx="60" fill="${accentColor}" opacity="0.25"/>
    <text x="600" y="300" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="56" font-weight="900" fill="${textColor}" text-anchor="middle" letter-spacing="2">${status}</text>
    
    <!-- Risk Score - Vietnamese text with better styling -->
    <text x="600" y="420" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="80" font-weight="900" fill="${textColor}" text-anchor="middle" filter="url(#shadow)">Điểm rủi ro: ${riskScore}%</text>
    <text x="600" y="470" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="40" font-weight="600" fill="${textColor}" text-anchor="middle" opacity="0.95">Risk Score: ${riskScore}%</text>
    
    <!-- Footer text - Vietnamese -->
    <text x="600" y="580" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" font-size="36" font-weight="600" fill="${textColor}" text-anchor="middle" opacity="0.9">AI Phát hiện Lừa đảo qua Giọng nói</text>
  </svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.status(200).send(svg);
}

