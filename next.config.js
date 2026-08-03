const CANONICAL_HOST = 'www.thecurriculumcompass.com'
const REDIRECT_HOSTS = ['thecurriculumcompass.com', 'curriculumcompass.com', 'www.curriculumcompass.com', 'curriculumcampus.com', 'www.curriculumcampus.com']

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return REDIRECT_HOSTS.map((host) => ({
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: host,
        },
      ],
      destination: `https://${CANONICAL_HOST}/:path*`,
      permanent: true,
    }))
  },
}

module.exports = nextConfig
