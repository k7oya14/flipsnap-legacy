/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "gjdbafvktbovctaxdhjz.supabase.co",
      },
      {
        protocol: "https",
        hostname:
          "https://lh3.googleusercontent.com/a/ACg8ocL9eqRR5QPdeZ9scYsG3AuLs5wtMoyzl8p9RocEKEW6-4s=s96-c",
      },
    ],
  },
};

export default nextConfig;
