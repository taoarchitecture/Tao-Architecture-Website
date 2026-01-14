# Visual Comparison & Implementation Plan

## 1. Current State Assessment
A comprehensive visual comparison reveals that the modern implementation is currently a **skeletal structure**. While the **Navbar** and **Footer** have been refactored to match the legacy design, the page content itself (Home, Work, Studio, Contact) is either missing or contains only placeholders.

### Discrepancy Report
| Page | Legacy Feature | Modern Current State | Discrepancy |
|------|----------------|----------------------|-------------|
| **Home** | Revolution Slider (Hero) | Empty | **Missing** |
| **Home** | Masonry Project Grid | Empty | **Missing** |
| **Home** | "Touching intangible beauty" Banner | Empty | **Missing** |
| **Work** | Sticky Sidebar Navigation | Placeholder Buttons | **Missing** |
| **Work** | Categorized Project List | Placeholder Grid | **Missing** |
| **Contact**| Google Map & Address Info | Empty | **Missing** |
| **Contact**| Contact Form | Empty | **Missing** |

**Conclusion**: "Pixel-perfect" comparison is currently impossible as the content does not exist. We must first migrate the content and layout structure.

## 2. Implementation Plan

To achieve visual parity, we will implement the following:

### Phase 1: Homepage Implementation (`src/app/page.tsx`)
1.  **Hero Slider**: Implement a full-width image slider using `Swiper.js` to replicate the legacy Revolution Slider.
2.  **Banner Section**: Add the "Touching intangible beauty..." banner with the "KNOW ABOUT US" button.
3.  **Masonry Grid**: Implement the project grid using CSS Grid/Flexbox to match the legacy "Corporate", "Luxury Villas", etc., layout.
4.  **Testimonials**: Add the bottom testimonial/link section.

### Phase 2: Work Page Implementation (`src/app/work/page.tsx`)
1.  **Layout**: Create a 2-column layout with a **Sticky Sidebar** on the left and **Scrollable Content** on the right.
2.  **Sidebar Nav**: Implement the "Luxury Villas", "Hospitality", "Cozy Homes", etc., navigation that highlights on scroll.
3.  **Project Content**: Render the projects in their respective categories using the legacy thumbnail styles.

### Phase 3: Contact & Studio Pages
1.  **Contact Page**: Implement the Google Map (iframe), Address details, and the Contact Form with matching fields (First Name, Last Name, Company, Email, Subject, Message).
2.  **Studio Page**: Implement the "About Us" and "Team" sections matching `design-studio.php`.

## 3. Verification Strategy
Once the content is implemented:
1.  **Playwright Snapshots**: Update `visual.spec.ts` to capture full-page screenshots of the populated pages.
2.  **Side-by-Side Review**: We will manually review the generated screenshots against the legacy site to identify any remaining pixel-level deviations (spacing, font weights, colors).

**Next Step**: Confirm this plan to begin implementing the Homepage content immediately.