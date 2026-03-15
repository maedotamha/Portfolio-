# Design Document: Portfolio Website

## Overview

The portfolio website is a modern, server-side rendered Next.js 14 application that showcases Maedot Alemu's professional profile, experience, projects, and skills. The architecture leverages Next.js App Router for optimal performance with static generation where possible and server-side rendering for dynamic content. The design emphasizes accessibility, performance, and user experience through responsive layouts, smooth animations, and theme customization.

The application follows a component-based architecture with clear separation between presentation, business logic, and data layers. Framer Motion provides declarative animations, while Tailwind CSS ensures consistent, maintainable styling. The system is designed to be easily deployable on Vercel with automatic CI/CD integration.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Browser Client                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   React UI   │  │   Framer     │  │   Theme      │  │
│  │  Components  │  │   Motion     │  │   Context    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTP/HTTPS
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   Next.js 14 Server                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  App Router  │  │   API Routes │  │   Metadata   │  │
│  │   (SSR/SSG)  │  │   (Contact)  │  │     API      │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  External Services                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Email      │  │   Analytics  │  │   CDN        │  │
│  │   Service    │  │   (Optional) │  │   (Vercel)   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Form Handling**: React Hook Form + Zod validation
- **Email**: Resend or Nodemailer
- **Deployment**: Vercel
- **Version Control**: Git

### Rendering Strategy

- **Static Generation (SSG)**: All main sections (Hero, About, Experience, Projects, Skills, Education)
- **Server-Side Rendering (SSR)**: Contact form submission handling
- **Client-Side Rendering (CSR)**: Theme toggle, animations, form interactions

## Components and Interfaces

### Core Components

#### 1. Layout Components

**RootLayout**
```typescript
interface RootLayoutProps {
  children: React.ReactNode;
}

// Provides global layout structure, theme provider, and font configuration
function RootLayout({ children }: RootLayoutProps): JSX.Element
```

**Navigation**
```typescript
interface NavigationProps {
  sections: NavigationSection[];
}

interface NavigationSection {
  id: string;
  label: string;
  href: string;
}

// Responsive navigation with mobile hamburger menu
function Navigation({ sections }: NavigationProps): JSX.Element
```

**Footer**
```typescript
interface FooterProps {
  socialLinks: SocialLink[];
  email: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: IconType;
}

// Footer with social links and copyright
function Footer({ socialLinks, email }: FooterProps): JSX.Element
```

#### 2. Section Components

**HeroSection**
```typescript
interface HeroSectionProps {
  name: string;
  title: string;
  description: string;
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
}

interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

// Hero section with animated introduction and CTA buttons
function HeroSection(props: HeroSectionProps): JSX.Element
```

**ExperienceSection**
```typescript
interface ExperienceSectionProps {
  experiences: Experience[];
}

interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
  technologies: string[];
}

// Timeline display of professional experience
function ExperienceSection({ experiences }: ExperienceSectionProps): JSX.Element
```

**ProjectsSection**
```typescript
interface ProjectsSectionProps {
  projects: Project[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

// Grid of project cards with hover effects
function ProjectsSection({ projects }: ProjectsSectionProps): JSX.Element
```

**SkillsSection**
```typescript
interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  icon: IconType;
}

// Categorized display of technical skills
function SkillsSection({ skillCategories }: SkillsSectionProps): JSX.Element
```

**EducationSection**
```typescript
interface EducationSectionProps {
  education: Education;
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  gpa: string;
}

// Education display
function EducationSection(props: EducationSectionProps): JSX.Element
```

**ContactSection**
```typescript
interface ContactSectionProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Contact form with validation
function ContactSection({ onSubmit }: ContactSectionProps): JSX.Element
```

#### 3. UI Components

**ThemeToggle**
```typescript
interface ThemeToggleProps {
  className?: string;
}

// Button to toggle between dark and light themes
function ThemeToggle({ className }: ThemeToggleProps): JSX.Element
```

**Button**
```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

// Reusable button component with variants
function Button(props: ButtonProps): JSX.Element
```

**Card**
```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

// Reusable card container with optional hover effects
function Card({ children, className, hoverable }: CardProps): JSX.Element
```

**AnimatedSection**
```typescript
interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideIn';
  delay?: number;
}

// Wrapper for scroll-triggered animations
function AnimatedSection(props: AnimatedSectionProps): JSX.Element
```

### Context and State Management

**ThemeContext**
```typescript
interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Provides theme state and toggle function throughout the app
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function ThemeProvider({ children }: { children: React.ReactNode }): JSX.Element

function useTheme(): ThemeContextValue
```

### API Routes

**Contact Form Submission**
```typescript
// POST /api/contact
interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}

async function POST(request: Request): Promise<Response>
```

### Utility Functions

**Validation**
```typescript
// Zod schemas for form validation
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

function validateContactForm(data: unknown): ContactFormData
```

**Smooth Scroll**
```typescript
interface ScrollToSectionOptions {
  sectionId: string;
  offset?: number;
}

// Smooth scroll to section with optional offset
function scrollToSection({ sectionId, offset }: ScrollToSectionOptions): void
```

**Theme Utilities**
```typescript
// Get initial theme from system preference or localStorage
function getInitialTheme(): 'light' | 'dark'

// Save theme preference to localStorage
function saveThemePreference(theme: 'light' | 'dark'): void
```

## Data Models

### Portfolio Data Structure

All portfolio content is stored in a centralized data file for easy maintenance:

```typescript
// data/portfolio.ts

interface PortfolioData {
  personal: PersonalInfo;
  experiences: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  education: Education;
}

interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
}

interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  startDate: string; // ISO date format
  endDate: string; // ISO date format or "Present"
  responsibilities: string[];
  technologies: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  duration: string;
  techStack: string[];
  features: ProjectFeature[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

interface ProjectFeature {
  description: string;
  metric?: string; // e.g., "80%+ test coverage"
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  iconName: string; // Icon identifier for React Icons
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

interface SocialLink {
  platform: string;
  url: string;
  iconName: string;
}
```

### Form Data Models

```typescript
// Contact form data
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Form validation errors
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// Form submission state
interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
}
```

### Theme Configuration

```typescript
// Theme configuration
interface ThemeConfig {
  colors: {
    light: ColorPalette;
    dark: ColorPalette;
  };
  fonts: FontConfig;
  animations: AnimationConfig;
}

interface ColorPalette {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  accent: string;
  muted: string;
  border: string;
}

// Light theme should use high contrast colors:
// - background: #ffffff or #fafafa (very light)
// - foreground: #1a1a1a or #0a0a0a (very dark, near black)
// - Ensure minimum 7:1 contrast ratio for body text
// - Use darker shades for headings and important text

interface FontConfig {
  sans: string[];
  mono: string[];
}

interface AnimationConfig {
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  easing: {
    default: string;
    smooth: string;
  };
}
```

## 

### Navigation Data

```typescript
// Navigation sections
const navigationSections: NavigationSection[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'education', label: 'Education', href: '#education' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];
```

## Correctness Properties


*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Layout Responsiveness

*For any* viewport size change, the layout should adapt and re-render without requiring a page reload, maintaining all content visibility and navigation functionality.

**Validates: Requirements 2.4**

### Property 2: Responsive Image Optimization

*For any* viewport size and any image element, the system should serve appropriately sized images with lazy loading applied to below-the-fold images.

**Validates: Requirements 2.5, 10.3**

### Property 3: Theme Toggle Switching

*For any* current theme state (light or dark), clicking the theme toggle should switch to the opposite theme and apply the change to all UI elements.

**Validates: Requirements 3.2**

### Property 4: Theme Persistence Round-Trip

*For any* theme selection (light or dark), saving the preference to localStorage and then reloading the page should result in the same theme being applied.

**Validates: Requirements 3.3, 3.4**

### Property 5: Theme Contrast Compliance

*For any* theme (light or dark) and any text element, the color contrast ratio between text and background should meet or exceed WCAG 2.1 AA standards (4.5:1 for normal text).

**Validates: Requirements 3.5, 9.5**

### Property 6: Experience Chronological Ordering

*For any* set of experience entries with dates, they should be rendered in reverse chronological order (most recent first).

**Validates: Requirements 4.1**

### Property 7: Complete Data Rendering

*For any* data object (experience, project, education, or skill), all required fields defined in the data model should be present in the rendered output.

**Validates: Requirements 4.2, 5.2, 6.2, 7.2**

### Property 8: Technology Display

*For any* experience entry that includes a technologies array, all technologies should be rendered and visually distinguished in the output.

**Validates: Requirements 4.5**

### Property 9: Conditional Link Rendering

*For any* project object, if liveUrl or githubUrl fields are present, corresponding action buttons should be rendered with correct href attributes.

**Validates: Requirements 5.3**

### Property 10: Project Features Display

*For any* project with features array, all features including those with metrics should be rendered in the project card.

**Validates: Requirements 5.5**

### Property 11: Skills Categorization

*For any* set of skills with category labels, the rendered output should group skills by their categories with clear visual separation.

**Validates: Requirements 6.1**

### Property 12: Consistent Icon Sizing

*For any* set of skill icons rendered in the skills section, all icons should have uniform dimensions and spacing.

**Validates: Requirements 6.5**

### Property 13: Form Validation

*For any* contact form submission, all required fields (name, email, subject, message) should be validated, and submission should only proceed if all validations pass.

**Validates: Requirements 8.2**

### Property 14: Validation Error Display

*For any* invalid form field, a specific error message describing the validation failure should be displayed to the user.

**Validates: Requirements 8.3**

### Property 15: Email Format Validation

*For any* string entered in the email field, the validator should correctly identify whether it matches valid email format (contains @ symbol, valid domain structure).

**Validates: Requirements 8.4**

### Property 16: Navigation Scroll Behavior

*For any* navigation link clicked, the page should smoothly scroll to the corresponding section identified by the link's href anchor.

**Validates: Requirements 9.2**

### Property 17: Keyboard Focus Visibility

*For any* interactive element (button, link, input), when focused via keyboard navigation, a visible focus indicator should be present.

**Validates: Requirements 9.3**

### Property 18: Accessibility Markup

*For any* component rendered, appropriate ARIA labels and semantic HTML elements should be used to ensure screen reader compatibility.

**Validates: Requirements 9.4**

### Property 19: Image Alt Text

*For any* meaningful image (not decorative), a descriptive alt attribute should be present.

**Validates: Requirements 9.6**

### Property 20: Interactive Hover Feedback

*For any* interactive element (button, card, link), hovering should trigger visual feedback through CSS transitions or style changes.

**Validates: Requirements 12.2**

### Property 21: Reduced Motion Respect

*For any* animation or transition, if the user's system preference is set to prefers-reduced-motion, the animation should be disabled or significantly reduced.

**Validates: Requirements 12.4**

### Property 22: Click Feedback

*For any* clickable element, clicking should provide immediate visual feedback (such as active state styling) before the action completes.

**Validates: Requirements 12.5**

## Error Handling

### Form Submission Errors

**Network Failures**
- If the contact form API request fails due to network issues, display a user-friendly error message: "Unable to send message. Please check your connection and try again."
- Maintain form data so the user doesn't lose their input
- Re-enable the submit button to allow retry

**Validation Errors**
- Display inline error messages below each invalid field
- Error messages should be specific and actionable:
  - Name: "Name must be at least 2 characters"
  - Email: "Please enter a valid email address"
  - Subject: "Subject must be at least 5 characters"
  - Message: "Message must be at least 10 characters"
- Prevent form submission until all errors are resolved

**Server Errors**
- If the API returns a 500 error, display: "Something went wrong on our end. Please try again later."
- Log error details to console for debugging
- Provide alternative contact method (email link) in error message

### Theme Loading Errors

**LocalStorage Access Failure**
- If localStorage is unavailable (private browsing, disabled), fall back to system theme preference
- If system preference is unavailable, default to light theme
- Theme toggle should still function for the current session

**Invalid Theme Data**
- If localStorage contains invalid theme value, reset to system preference or light theme default
- Clear invalid data from localStorage

### Image Loading Errors

**Missing Images**
- Provide fallback placeholder images for project screenshots
- Use CSS background colors that match the theme while images load
- Include alt text that describes the project even if image fails

**Slow Loading**
- Implement skeleton screens or loading placeholders
- Use Next.js Image component's built-in blur placeholder
- Ensure layout doesn't shift when images load (use aspect ratio containers)

### Navigation Errors

**Invalid Section IDs**
- If a navigation link references a non-existent section, log warning to console
- Gracefully fail without breaking navigation functionality
- Scroll to top of page as fallback

**Scroll Behavior Unsupported**
- If smooth scroll is not supported by browser, fall back to instant scroll
- Ensure navigation still functions correctly

### Animation Errors

**Framer Motion Errors**
- Wrap animated components in error boundaries
- If animation fails, render static version of component
- Log animation errors for debugging

### Accessibility Errors

**Missing ARIA Labels**
- Ensure all interactive elements have fallback text content
- Use semantic HTML as primary accessibility mechanism
- ARIA labels as enhancement, not requirement

**Focus Management**
- If focus trap fails in mobile menu, ensure ESC key still closes menu
- Provide visible close button as alternative

## Testing Strategy

### Unit Testing

Unit tests will focus on specific component behaviors, edge cases, and error conditions using Jest and React Testing Library.

**Component Tests:**
- Hero section renders with correct personal information
- Navigation menu displays all section links
- Theme toggle button exists and is clickable
- Contact form displays all required input fields
- Project cards render with correct data structure
- Skills section displays categories correctly
- Footer renders social links with icons
- Mobile hamburger menu opens and closes
- Form validation displays error messages for invalid inputs
- Success message appears after form submission
- Loading state disables submit button during submission

**Utility Function Tests:**
- Email validation correctly identifies valid/invalid formats
- Theme preference saves to and loads from localStorage
- Smooth scroll function scrolls to correct section
- Initial theme detection reads system preference
- Form data validation with Zod schema

**Edge Cases:**
- Empty form submission attempts
- Form submission with only whitespace
- Theme toggle with unavailable localStorage
- Navigation to non-existent section
- Project without optional URLs
- Experience with empty technologies array
- Viewport resize during animation

### Property-Based Testing

Property-based tests will verify universal properties across many generated inputs using fast-check library. Each test should run a minimum of 100 iterations.

**Property Test Configuration:**
```typescript
import fc from 'fast-check';

// Example configuration
fc.assert(
  fc.property(/* generators */, (/* inputs */) => {
    // property assertion
  }),
  { numRuns: 100 }
);
```

**Property Tests to Implement:**

1. **Theme Persistence Round-Trip** (Property 4)
   - Generate random theme values ('light' or 'dark')
   - Save to localStorage, reload, verify same theme applied
   - Tag: **Feature: portfolio-website, Property 4: Theme persistence round-trip**

2. **Theme Contrast Compliance** (Property 5)
   - Generate random text elements from both themes
   - Calculate contrast ratios
   - Verify all meet 4.5:1 minimum
   - Tag: **Feature: portfolio-website, Property 5: Theme contrast compliance**

3. **Experience Chronological Ordering** (Property 6)
   - Generate random arrays of experience objects with dates
   - Verify rendered output is sorted by date descending
   - Tag: **Feature: portfolio-website, Property 6: Experience chronological ordering**

4. **Complete Data Rendering** (Property 7)
   - Generate random data objects (experiences, projects, skills, etc.)
   - Verify all required fields appear in rendered output
   - Tag: **Feature: portfolio-website, Property 7: Complete data rendering**

5. **Technology Display** (Property 8)
   - Generate random experience objects with technology arrays
   - Verify all technologies appear in rendered output
   - Tag: **Feature: portfolio-website, Property 8: Technology display**

6. **Conditional Link Rendering** (Property 9)
   - Generate random project objects with/without URLs
   - Verify buttons render only when URLs present
   - Tag: **Feature: portfolio-website, Property 9: Conditional link rendering**

7. **Skills Categorization** (Property 11)
   - Generate random skill arrays with categories
   - Verify skills are grouped by category in output
   - Tag: **Feature: portfolio-website, Property 11: Skills categorization**

8. **Form Validation** (Property 13)
   - Generate random form data (valid and invalid)
   - Verify validation passes only for valid data
   - Tag: **Feature: portfolio-website, Property 13: Form validation**

9. **Validation Error Display** (Property 14)
   - Generate random invalid form fields
   - Verify error messages appear for each invalid field
   - Tag: **Feature: portfolio-website, Property 14: Validation error display**

10. **Email Format Validation** (Property 15)
    - Generate random strings (valid and invalid emails)
    - Verify validator correctly identifies email format
    - Tag: **Feature: portfolio-website, Property 15: Email format validation**

11. **Keyboard Focus Visibility** (Property 17)
    - Generate random interactive elements
    - Simulate keyboard focus
    - Verify focus indicators are visible
    - Tag: **Feature: portfolio-website, Property 17: Keyboard focus visibility**

12. **Image Alt Text** (Property 19)
    - Generate random image components
    - Verify all meaningful images have alt attributes
    - Tag: **Feature: portfolio-website, Property 19: Image alt text**

13. **Reduced Motion Respect** (Property 21)
    - Generate random animated components
    - Set prefers-reduced-motion preference
    - Verify animations are disabled or reduced
    - Tag: **Feature: portfolio-website, Property 21: Reduced motion respect**

### Integration Testing

Integration tests will verify that components work together correctly and that data flows properly through the application.

**Integration Test Scenarios:**
- Navigation click scrolls to correct section and updates URL
- Theme toggle updates all components simultaneously
- Form submission sends data to API and displays success message
- Mobile menu opens, navigation works, menu closes
- Scroll triggers section animations in sequence
- Theme preference persists across page navigation
- Responsive layout changes at all breakpoints
- Social links open correct external URLs

### Accessibility Testing

Accessibility will be validated using automated tools and manual testing.

**Automated Testing:**
- Run axe-core accessibility tests on all components
- Verify WCAG 2.1 AA compliance
- Check color contrast ratios programmatically
- Validate semantic HTML structure

**Manual Testing:**
- Keyboard navigation through entire site
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Focus management in mobile menu
- Form error announcements
- Theme toggle announcements

### Performance Testing

Performance will be monitored using Lighthouse and Web Vitals.

**Metrics to Track:**
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- First Input Delay (FID) < 100ms
- Time to Interactive (TTI) < 3.5s

**Performance Optimization Verification:**
- Verify images use Next.js Image component
- Check lazy loading implementation
- Validate code splitting in production build
- Measure bundle sizes
- Test on throttled network (3G)

### End-to-End Testing

E2E tests will verify complete user workflows using Playwright or Cypress.

**E2E Test Scenarios:**
- Complete visitor journey: land on site → browse sections → submit contact form
- Theme switching persists across page reload
- Mobile navigation workflow
- Form validation and submission flow
- Responsive behavior at different viewport sizes
- External link navigation

### Testing Tools

- **Unit/Integration**: Jest, React Testing Library
- **Property-Based**: fast-check
- **Accessibility**: axe-core, jest-axe
- **E2E**: Playwright or Cypress
- **Performance**: Lighthouse CI, Web Vitals
- **Visual Regression**: Percy or Chromatic (optional)

### Test Coverage Goals

- Unit test coverage: 80%+ for components and utilities
- Property tests: All 13 identified properties implemented
- Integration tests: All major user workflows covered
- Accessibility: 100% WCAG 2.1 AA compliance
- E2E tests: All critical paths tested

## Implementation Notes

### Next.js Configuration

```typescript
// next.config.js
const nextConfig = {
  images: {
    domains: [], // Add image domains if using external images
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
const config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette for light/dark themes
      },
      animation: {
        // Custom animations
      },
    },
  },
  plugins: [],
};
```

### Framer Motion Configuration

```typescript
// Use reduced motion by default if user prefers
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: prefersReducedMotion ? 0 : 0.6,
      ease: 'easeOut'
    }
  }
};
```

### SEO Metadata

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Maedot Alemu - Software Engineer',
  description: 'Portfolio of Maedot Alemu, Software Engineering student at Addis Ababa University specializing in full-stack development with React, Node.js, and cloud technologies.',
  keywords: ['Software Engineer', 'Full Stack Developer', 'React', 'Node.js', 'TypeScript'],
  authors: [{ name: 'Maedot Alemu' }],
  openGraph: {
    title: 'Maedot Alemu - Software Engineer',
    description: 'Portfolio showcasing projects and experience in full-stack development',
    type: 'website',
    locale: 'en_US',
  },
};
```

### Contact Form API

The contact form will use Resend or Nodemailer for email delivery:

```typescript
// app/api/contact/route.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;
    
    // Validate input
    const validatedData = contactFormSchema.parse(body);
    
    // Send email
    await resend.emails.send({
      from: 'portfolio@yourdomain.com',
      to: 'alemu.maedot@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
    });
    
    return Response.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    return Response.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
```

### Deployment Checklist

- [ ] Configure environment variables in Vercel
- [ ] Set up custom domain (optional)
- [ ] Enable automatic deployments from main branch
- [ ] Configure preview deployments for pull requests
- [ ] Set up Lighthouse CI for performance monitoring
- [ ] Add analytics (optional: Vercel Analytics, Google Analytics)
- [ ] Test all functionality in production environment
- [ ] Verify SSL certificate is active
- [ ] Submit sitemap to search engines
