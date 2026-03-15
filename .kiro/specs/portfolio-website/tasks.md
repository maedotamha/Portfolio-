# Implementation Plan: Portfolio Website

## Overview

This implementation plan breaks down the portfolio website development into incremental, testable steps. Each task builds on previous work, starting with project setup and core infrastructure, then implementing individual sections, and finally integrating everything together. The approach emphasizes early validation through testing and ensures all components are properly wired together.

## Tasks

- [x] 1. Project setup and configuration
  - Initialize Next.js 14 project with TypeScript and App Router
  - Configure Tailwind CSS with custom theme colors for light/dark modes
  - Install and configure dependencies: Framer Motion, React Icons, React Hook Form, Zod, fast-check
  - Set up project structure: `/app`, `/components`, `/data`, `/lib`, `/types`
  - Configure ESLint, Prettier, and TypeScript strict mode
  - Set up Jest and React Testing Library for testing
  - _Requirements: 13.1_

- [ ] 2. Create type definitions and data models
  - [x] 2.1 Define TypeScript interfaces for all data models
    - Create types for PersonalInfo, Experience, Project, Skill, Education
    - Define form data types (ContactFormData, FormErrors, FormState)
    - Create theme and configuration types with high contrast light theme colors
    - _Requirements: All sections_
  
  - [x] 2.2 Create portfolio data file with actual content
    - Populate `data/portfolio.ts` with Maedot's personal information
    - Add all four internship experiences with details
    - Include BuildCred and Parcel Delivery System projects
    - Add skills categorized by Languages, Frontend, Backend, Databases, Tools
    - Include education information
    - _Requirements: 1.1, 1.2, 4.1, 5.1, 6.1, 7.1_

- [ ] 3. Implement theme system
  - [x] 3.1 Create ThemeContext and ThemeProvider
    - Implement theme state management with React Context
    - Add theme detection from system preferences
    - Implement localStorage persistence for theme preference
    - Create useTheme custom hook
    - Configure high contrast light theme with dark text (#1a1a1a) on light backgrounds (#ffffff)
    - _Requirements: 3.1, 3.3, 3.4, 3.6_
  
  - [ ]* 3.2 Write property test for theme persistence round-trip
    - **Property 4: Theme Persistence Round-Trip**
    - **Validates: Requirements 3.3, 3.4**
  
  - [x] 3.3 Create ThemeToggle component
    - Build toggle button with sun/moon icons
    - Implement smooth transition between themes
    - Add ARIA labels for accessibility
    - _Requirements: 3.2_
  
  - [ ]* 3.4 Write unit tests for theme system
    - Test theme detection on initial load
    - Test theme toggle functionality
    - Test localStorage persistence
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 4. Build core UI components
  - [x] 4.1 Create Button component with variants
    - Implement primary, secondary, and outline variants
    - Add size options (sm, md, lg)
    - Include hover and active states
    - Ensure keyboard accessibility
    - _Requirements: 1.3, 8.6_
  
  - [x] 4.2 Create Card component
    - Build reusable card container with theme-aware styling
    - Add optional hover effects
    - Ensure consistent padding and borders
    - _Requirements: 5.1, 7.5_
  
  - [x] 4.3 Create AnimatedSection wrapper
    - Implement scroll-triggered animations using Framer Motion
    - Add fadeIn, slideUp, and slideIn animation variants
    - Respect prefers-reduced-motion setting
    - _Requirements: 12.1, 12.4_
  
  - [ ]* 4.4 Write property test for reduced motion respect
    - **Property 21: Reduced Motion Respect**
    - **Validates: Requirements 12.4**

- [ ] 5. Implement Navigation component
  - [x] 5.1 Create desktop navigation
    - Build horizontal navigation with section links
    - Implement smooth scroll to sections
    - Add active section highlighting
    - Include ThemeToggle in navigation
    - _Requirements: 9.1, 9.2_
  
  - [x] 5.2 Create mobile hamburger menu
    - Build responsive hamburger icon
    - Implement slide-in mobile menu with animations
    - Add close button and ESC key handler
    - Ensure touch-optimized spacing
    - _Requirements: 2.1, 9.7_
  
  - [ ]* 5.3 Write property test for navigation scroll behavior
    - **Property 16: Navigation Scroll Behavior**
    - **Validates: Requirements 9.2**
  
  - [ ]* 5.4 Write unit tests for navigation
    - Test navigation links render correctly
    - Test mobile menu open/close
    - Test smooth scroll functionality
    - _Requirements: 9.1, 9.2, 9.7_

- [ ] 6. Build Hero section
  - [x] 6.1 Create HeroSection component
    - Display name, title, and professional description
    - Show contact information (email, phone, location)
    - Add CTA buttons (View Projects, Contact)
    - Include social media links with icons (LinkedIn, GitHub, LeetCode)
    - Implement entrance animations with Framer Motion
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [ ]* 6.2 Write unit tests for Hero section
    - Test personal information renders correctly
    - Test CTA buttons are present
    - Test social links render with correct URLs
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 7. Build Experience section
  - [x] 7.1 Create ExperienceSection component
    - Build timeline layout with visual indicators
    - Display all experiences in reverse chronological order
    - Show company, role, duration, and responsibilities
    - Highlight technologies used in each role
    - Add scroll-triggered animations for timeline entries
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  
  - [ ]* 7.2 Write property test for chronological ordering
    - **Property 6: Experience Chronological Ordering**
    - **Validates: Requirements 4.1**
  
  - [ ]* 7.3 Write property test for complete data rendering
    - **Property 7: Complete Data Rendering**
    - **Validates: Requirements 4.2, 5.2, 6.2, 7.2**
  
  - [ ]* 7.4 Write property test for technology display
    - **Property 8: Technology Display**
    - **Validates: Requirements 4.5**

- [ ] 8. Build Projects section
  - [x] 8.1 Create ProjectCard component
    - Display project name, description, and tech stack
    - List key features with metrics
    - Add conditional buttons for live demo and GitHub links
    - Implement hover effects with smooth transitions
    - Include project images with Next.js Image component
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_
  
  - [x] 8.2 Create ProjectsSection component
    - Build responsive grid layout for project cards
    - Add section heading and description
    - Implement scroll animations
    - _Requirements: 5.1_
  
  - [ ]* 8.3 Write property test for conditional link rendering
    - **Property 9: Conditional Link Rendering**
    - **Validates: Requirements 5.3**
  
  - [ ]* 8.4 Write property test for project features display
    - **Property 10: Project Features Display**
    - **Validates: Requirements 5.5**

- [ ] 9. Build Skills section
  - [x] 9.1 Create SkillsSection component
    - Organize skills into categories (Languages, Frontend, Backend, Databases, Tools)
    - Display skill names with corresponding icons from React Icons
    - Implement staggered entrance animations
    - Add hover effects on skill items
    - Ensure consistent icon sizing and spacing
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  
  - [ ]* 9.2 Write property test for skills categorization
    - **Property 11: Skills Categorization**
    - **Validates: Requirements 6.1**
  
  - [ ]* 9.3 Write property test for consistent icon sizing
    - **Property 12: Consistent Icon Sizing**
    - **Validates: Requirements 6.5**

- [ ] 10. Build Education section
  - [x] 10.1 Create EducationSection component
    - Display Addis Ababa University degree information
    - Show institution, degree, field, duration, and GPA
    - Use consistent card styling
    - Add scroll animations
    - _Requirements: 7.1, 7.2, 7.3_
  
  - [ ]* 10.2 Write unit tests for education section
    - Test education data renders correctly
    - _Requirements: 7.1, 7.2_

- [ ] 11. Implement contact form with validation
  - [x] 11.1 Create form validation schema with Zod
    - Define validation rules for name, email, subject, message
    - Implement email format validation
    - Set minimum length requirements
    - Create error message templates
    - _Requirements: 8.2, 8.4_
  
  - [ ]* 11.2 Write property test for form validation
    - **Property 13: Form Validation**
    - **Validates: Requirements 8.2**
  
  - [ ]* 11.3 Write property test for email format validation
    - **Property 15: Email Format Validation**
    - **Validates: Requirements 8.4**
  
  - [x] 11.4 Create ContactSection component
    - Build form with input fields (name, email, subject, message)
    - Integrate React Hook Form for form management
    - Display validation errors inline
    - Implement loading state during submission
    - Show success message after submission
    - Clear form fields on success
    - _Requirements: 8.1, 8.2, 8.3, 8.5, 8.6_
  
  - [ ]* 11.5 Write property test for validation error display
    - **Property 14: Validation Error Display**
    - **Validates: Requirements 8.3**
  
  - [ ]* 11.6 Write unit tests for contact form
    - Test form fields render correctly
    - Test validation error messages
    - Test loading state
    - Test success message display
    - _Requirements: 8.1, 8.3, 8.5, 8.6_

- [ ] 12. Create contact form API route
  - [x] 12.1 Implement POST /api/contact endpoint
    - Set up Resend or Nodemailer for email delivery
    - Validate request body with Zod schema
    - Send email to alemu.maedot@gmail.com
    - Handle errors gracefully with appropriate status codes
    - Return success/error response
    - _Requirements: 8.2, 8.5_
  
  - [ ]* 12.2 Write integration tests for API route
    - Test successful email submission
    - Test validation error handling
    - Test server error handling
    - _Requirements: 8.2, 8.5_

- [ ] 13. Build Footer component
  - [x] 13.1 Create Footer component
    - Display social media links with icons
    - Show email address
    - Add copyright notice
    - Ensure responsive layout
    - Apply theme-aware styling
    - _Requirements: 1.4_
  
  - [ ]* 13.2 Write unit tests for footer
    - Test social links render correctly
    - Test email display
    - _Requirements: 1.4_

- [ ] 14. Checkpoint - Core components complete
  - Ensure all section components render correctly
  - Verify theme switching works across all components
  - Test responsive layouts at mobile, tablet, and desktop breakpoints
  - Ensure all tests pass, ask the user if questions arise

- [ ] 15. Implement accessibility features
  - [ ] 15.1 Add ARIA labels and semantic HTML
    - Add appropriate ARIA labels to all interactive elements
    - Use semantic HTML elements (nav, main, section, article)
    - Ensure proper heading hierarchy
    - Add skip-to-content link
    - _Requirements: 9.4_
  
  - [ ] 15.2 Implement keyboard navigation
    - Add visible focus indicators to all interactive elements
    - Ensure tab order is logical
    - Add keyboard shortcuts for theme toggle
    - Test focus trap in mobile menu
    - _Requirements: 9.3_
  
  - [ ] 15.3 Add alt text to all images
    - Write descriptive alt text for project images
    - Mark decorative images with empty alt
    - Ensure icons have appropriate labels
    - _Requirements: 9.6_
  
  - [ ]* 15.4 Write property test for keyboard focus visibility
    - **Property 17: Keyboard Focus Visibility**
    - **Validates: Requirements 9.3**
  
  - [ ]* 15.5 Write property test for accessibility markup
    - **Property 18: Accessibility Markup**
    - **Validates: Requirements 9.4**
  
  - [ ]* 15.6 Write property test for image alt text
    - **Property 19: Image Alt Text**
    - **Validates: Requirements 9.6**
  
  - [ ]* 15.7 Run axe-core accessibility tests
    - Test all components with jest-axe
    - Verify WCAG 2.1 AA compliance
    - Fix any accessibility violations
    - _Requirements: 9.3, 9.4, 9.5, 9.6_

- [ ] 16. Implement SEO and metadata
  - [ ] 16.1 Configure root layout metadata
    - Add title and description meta tags
    - Include Open Graph tags for social sharing
    - Add Twitter Card metadata
    - Configure favicon and app icons
    - _Requirements: 11.1, 11.2, 11.3_
  
  - [ ] 16.2 Add structured data (JSON-LD)
    - Implement Person schema with professional details
    - Include social media profiles
    - Add education and work experience
    - _Requirements: 11.4_
  
  - [ ] 16.3 Create sitemap and robots.txt
    - Generate sitemap.xml with all sections
    - Create robots.txt with crawling directives
    - _Requirements: 11.5, 11.6_
  
  - [ ]* 16.4 Write unit tests for SEO metadata
    - Test meta tags are present
    - Test Open Graph tags
    - Test structured data validity
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [ ] 17. Optimize performance
  - [ ] 17.1 Configure Next.js Image optimization
    - Use Next.js Image component for all images
    - Configure image formats (AVIF, WebP)
    - Implement lazy loading for below-the-fold images
    - Add blur placeholders
    - _Requirements: 2.5, 10.3_
  
  - [ ]* 17.2 Write property test for responsive image optimization
    - **Property 2: Responsive Image Optimization**
    - **Validates: Requirements 2.5, 10.3**
  
  - [ ] 17.3 Implement code splitting and optimization
    - Configure dynamic imports for heavy components
    - Optimize bundle size with tree shaking
    - Remove console logs in production
    - Minimize CSS and JavaScript
    - _Requirements: 10.4_
  
  - [ ]* 17.4 Run Lighthouse performance tests
    - Test FCP, LCP, CLS, FID metrics
    - Verify performance scores meet targets
    - _Requirements: 10.1, 10.2, 10.6_

- [ ] 18. Create main page layout and integration
  - [x] 18.1 Build app/page.tsx with all sections
    - Import and arrange all section components
    - Add Navigation and Footer
    - Wrap sections with AnimatedSection
    - Ensure proper spacing and layout
    - _Requirements: All sections_
  
  - [x] 18.2 Configure RootLayout with ThemeProvider
    - Wrap app with ThemeProvider
    - Configure fonts (Inter, Roboto Mono)
    - Add global styles
    - Set up viewport meta tags
    - _Requirements: 2.1, 2.2, 2.3, 3.1_
  
  - [ ]* 18.3 Write property test for layout responsiveness
    - **Property 1: Layout Responsiveness**
    - **Validates: Requirements 2.4**
  
  - [ ]* 18.4 Write property test for theme toggle switching
    - **Property 3: Theme Toggle Switching**
    - **Validates: Requirements 3.2**
  
  - [ ]* 18.5 Write property test for theme contrast compliance
    - **Property 5: Theme Contrast Compliance**
    - **Validates: Requirements 3.5, 9.5**

- [ ] 19. Checkpoint - Integration complete
  - Test complete user journey through the site
  - Verify all sections are properly connected
  - Test theme switching across all components
  - Verify responsive behavior at all breakpoints
  - Ensure all property tests pass
  - Ensure all unit tests pass
  - Ask the user if questions arise

- [ ] 20. Write remaining property tests
  - [ ]* 20.1 Write property test for interactive hover feedback
    - **Property 20: Interactive Hover Feedback**
    - **Validates: Requirements 12.2**
  
  - [ ]* 20.2 Write property test for click feedback
    - **Property 22: Click Feedback**
    - **Validates: Requirements 12.5**

- [ ] 21. End-to-end testing
  - [ ]* 21.1 Set up Playwright or Cypress
    - Install and configure E2E testing framework
    - Create test utilities and helpers
    - _Requirements: All_
  
  - [ ]* 21.2 Write E2E tests for critical paths
    - Test complete visitor journey
    - Test form submission flow
    - Test theme persistence across reload
    - Test mobile navigation workflow
    - Test responsive behavior
    - _Requirements: All_

- [ ] 22. Deployment preparation
  - [ ] 22.1 Configure environment variables
    - Set up RESEND_API_KEY or email service credentials
    - Configure any analytics keys (optional)
    - Create .env.example file
    - _Requirements: 13.1_
  
  - [ ] 22.2 Create Vercel configuration
    - Create vercel.json if needed
    - Configure build settings
    - Set up preview deployments
    - _Requirements: 13.1, 13.5_
  
  - [ ] 22.3 Deploy to Vercel
    - Connect GitHub repository to Vercel
    - Configure production environment variables
    - Deploy to production
    - Verify HTTPS and SSL certificate
    - Test all functionality in production
    - _Requirements: 13.1, 13.2, 13.3_

- [ ] 23. Final checkpoint - Production ready
  - Verify all features work in production
  - Test contact form sends emails successfully
  - Run Lighthouse audit on production URL
  - Test on multiple devices and browsers
  - Verify SEO metadata appears correctly
  - Ensure all tests pass
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Property tests should run minimum 100 iterations each
- Checkpoints ensure incremental validation and provide opportunities for user feedback
- The implementation follows a bottom-up approach: infrastructure → components → sections → integration
- All components should be tested individually before integration
- Accessibility and performance are integrated throughout, not added at the end
- The contact form API requires an email service (Resend recommended for simplicity)
