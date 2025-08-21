import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({
  title = 'Vikram Kumar | Full Stack Developer & AI Engineer',
  description = "Hi, I'm Vikram Kumar — a passionate Web Developer, AI Engineer, and UI/UX Designer. As a full-stack developer and AI enthusiast, I love building real-world projects that combine clean code, smart design, and intelligent systems. I'm currently seeking internships and part-time opportunities to grow my skills and contribute to meaningful tech solutions.",
  keywords = 'full stack developer, React, Next.js, Node.js, Express, MongoDB, PostgreSQL, TypeScript, JavaScript, Tailwind CSS, AI Engineer, Python, Machine Learning, Deep Learning, Natural Language Processing, Web Developer Portfolio, Vikram Kumar, UI/UX Designer, chatbot developer, REST APIs, MERN Stack, SEO optimized portfolio, OpenAI developer, chatbot engineer',
  image = 'https://avatars.githubusercontent.com/u/181659184?v=4',
  url = 'https://vikram-kumar.vercel.app',
  type = 'website',
}: SEOProps) => {
  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Vikram Kumar" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Vikram Kumar Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@Er_vikram__" />

      {/* Structured Data: Person Schema */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Vikram Kumar",
          "url": "${url}",
          "image": "${image}",
          "jobTitle": "Full Stack Developer & AI Engineer",
          "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "Ganga Institute of Technology and Management"
          },
          "worksFor": {
            "@type": "Organization",
            "name": "https://bluestock.in"
          },
          "sameAs": [
            "https://github.com/vikramkr-06",
            "https://www.linkedin.com/in/vikram-kumar-5831a9343/",
            "https://www.instagram.com/er_vikram___",
            "https://twitter.com/Er_vikram__"
          ],
          "knowsAbout": [
            "Full Stack Development",
            "React",
            "Node.js",
            "Python",
            "Machine Learning",
            "Deep Learning",
            "AI",
            "UI/UX Design",
            "OpenAI"
          ]
        }
        `}
      </script>

      {/* Structured Data: Projects (ItemList) */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": [
            {
              "@type": "WebPage",
              "position": 1,
              "url": "${url}/projects/hospital-management-system",
              "name": "Hospital Management System",
              "description": "Web-based healthcare management platform for hospitals"
            },
            {
              "@type": "WebPage",
              "position": 2,
              "url": "${url}/projects/ecommerce-website",
              "name": "E-commerce Website",
              "description": "Full-featured online shopping platform with cart and checkout"
            },
            {
              "@type": "WebPage",
              "position": 3,
              "url": "${url}/projects/chat-website",
              "name": "Chat Website",
              "description": "Real-time chat web application using WebSockets"
            }
          ]
        }
        `}
      </script>
    </Helmet>
  );
};

export default SEO;
