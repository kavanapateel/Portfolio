export async function GET() {
  const robotsContent = `
    User-agent: *
    Allow: /
    Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml
    `;

  return new Response(robotsContent, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
