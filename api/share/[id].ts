import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(404).send('Not found');
  }

  // Parse query params for share data
  const fullUrl = req.url || '';
  const queryString = fullUrl.includes('?') ? fullUrl.split('?')[1] : '';
  const urlParams = new URLSearchParams(queryString);
  const score = urlParams.get('s') || '0';
  const flagged = urlParams.get('f') === '1';

  // Build meta tags
  const status = flagged ? 'Lừa đảo' : 'An toàn';
  const title = `${status} - Điểm rủi ro: ${score}% | Blacklist.vn`;
  const description = `${status} - Điểm rủi ro: ${score}%. Kết quả phân tích lừa đảo qua giọng nói với công nghệ AI tiên tiến.`;
  
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'https://blacklist.vn';
  const queryParams = queryString ? `?${queryString}` : '';
  const shareUrl = `${baseUrl}/share/${id}${queryParams}`;
  const imageUrl = `${baseUrl}/api/og-image?score=${score}&flagged=${flagged ? '1' : '0'}`;
  
  // Return HTML with full meta tags that crawlers can read
  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="title" content="${title}" />
  <meta name="description" content="${description}" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${shareUrl}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="Blacklist.vn" />
  <meta property="og:locale" content="vi_VN" />
  <meta property="og:locale:alternate" content="en_US" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${shareUrl}" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${imageUrl}" />
  <meta name="twitter:image:alt" content="${title}" />
  <meta name="twitter:site" content="@blacklistvn" />
  
  <!-- Additional SEO -->
  <meta name="theme-color" content="${flagged ? '#DC2626' : '#059669'}" />
  <link rel="canonical" href="${shareUrl}" />
  
  <!-- Redirect to SPA after a brief moment for users -->
  <script>
    setTimeout(function() {
      window.location.href = "${shareUrl}";
    }, 100);
  </script>
</head>
<body>
  <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui, -apple-system, sans-serif; padding: 20px;">
    <div style="text-align: center; max-width: 600px;">
      <h1 style="font-size: 2rem; margin-bottom: 1rem; color: ${flagged ? '#DC2626' : '#059669'};">${status}</h1>
      <p style="font-size: 1.25rem; margin-bottom: 0.5rem; color: #374151;">Điểm rủi ro: <strong>${score}%</strong></p>
      <p style="color: #6B7280; margin-bottom: 2rem;">Đang chuyển hướng...</p>
      <a href="${shareUrl}" style="color: #2563EB; text-decoration: none;">Nhấn vào đây nếu không tự động chuyển</a>
    </div>
  </div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(html);
}

