export interface ScrollToSectionOptions {
  sectionId: string;
  offset?: number;
}

export function scrollToSection({ sectionId, offset = 80 }: ScrollToSectionOptions): void {
  const element = document.getElementById(sectionId);
  if (!element) {
    console.warn(`Section with id "${sectionId}" not found`);
    return;
  }

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}
