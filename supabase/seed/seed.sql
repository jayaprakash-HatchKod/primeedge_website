-- Sample course catalog for local development / first deploy.
-- Run after 0001_init.sql: `psql "$DATABASE_URL" -f supabase/seed/seed.sql`
-- or paste into the Supabase SQL editor.

insert into public.courses
  (title, slug, description, highlights, duration, price, thumbnail, demo_video_1, demo_video_2, syllabus_pdf, trainer_name, trainer_bio, trainer_avatar, is_active)
values
(
  'Full Stack Web Development',
  'full-stack-web-development',
  'Go from fundamentals to production-ready full stack applications using React, Node.js, and PostgreSQL. Build real projects, ship them, and learn the workflows used at modern product companies.',
  array[
    '20+ hands-on projects including a capstone deployed to production',
    'Live doubt-clearing sessions twice a week',
    'Resume review and mock technical interviews',
    'Git, CI/CD, and deployment on real cloud infrastructure'
  ],
  '16 Weeks',
  24999,
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  null,
  'Aravind Menon',
  '9+ years building web platforms at scale; ex-engineering lead at a Series B startup.',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
  true
),
(
  'Data Science & Machine Learning',
  'data-science-machine-learning',
  'A practical, project-first curriculum covering Python, statistics, machine learning, and deployment of ML models — designed for people who want to work with data professionally, not just in theory.',
  array[
    'Real datasets and Kaggle-style projects',
    'Model deployment with FastAPI and Docker',
    'One-on-one mentorship every two weeks',
    'Interview preparation for data roles'
  ],
  '20 Weeks',
  29999,
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  null,
  'Priya Sharma',
  'Former data scientist at a fintech unicorn; specializes in applied ML and MLOps.',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  true
),
(
  'Cloud & DevOps Engineering',
  'cloud-devops-engineering',
  'Master AWS, Docker, Kubernetes, and CI/CD pipelines through real infrastructure projects. Built for developers who want to own the full deployment lifecycle.',
  array[
    'Provision real AWS infrastructure with Terraform',
    'Build CI/CD pipelines from scratch',
    'Kubernetes cluster deployment and monitoring',
    'Certification exam preparation included'
  ],
  '14 Weeks',
  27999,
  'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&q=80',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  null,
  'Vikram Nair',
  'Cloud infrastructure architect with a decade of experience across AWS and GCP.',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  true
),
(
  'UI/UX Design for Developers',
  'ui-ux-design-for-developers',
  'Learn the design thinking, visual systems, and prototyping skills that separate good products from great ones — taught specifically for engineers who want to design what they build.',
  array[
    'Figma from fundamentals to advanced prototyping',
    'Design systems and component libraries',
    'Portfolio-ready case studies',
    'Feedback from working product designers'
  ],
  '10 Weeks',
  17999,
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  null,
  'Ishaan Kapoor',
  'Product designer who has shipped design systems for consumer apps used by millions.',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80',
  true
)
on conflict (slug) do nothing;
