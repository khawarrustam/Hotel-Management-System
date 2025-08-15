# Contact Page

A modern, luxury-style Contact page for a hotel booking website built with React + SCSS, featuring a hero section, contact form, contact details with icons, and an embedded map.

## 🎨 Design Features

### Luxury Brand Styling
- **Primary Color**: Royal Blue (#1E3A8A) for buttons and headings
- **Accent Color**: Gold (#FBBF24) for hover highlights and icons
- **Background**: Light Gray (#F9FAFB)
- **Text**: Dark Slate (#1F2937)
- **Fonts**: 
  - Headings: "Playfair Display" serif
  - Body: "Inter" sans-serif
- **Border Radius**: 16px for cards, buttons, and inputs
- **Shadows**: Soft, elegant shadows for forms and info boxes
- **Transitions**: Smooth 0.3s ease-in-out animations

## 📑 Page Sections

### 1. Hero Section
- **Full-width background**: Luxury hotel image from Unsplash
- **Dark gradient overlay**: Ensures text readability
- **Centered content**:
  - Large serif heading: "Get in Touch"
  - Descriptive subheading
- **Smooth fade-in animation** for text elements
- **Responsive design**: Adjusts height and typography for mobile

### 2. Contact Form Section
- **White card design** with shadow and rounded corners
- **Max-width**: 800px, centered horizontally
- **Form Fields**:
  - First Name & Last Name (side-by-side on desktop, stacked on mobile)
  - Email Address (required)
  - Phone Number (optional)
  - Message textarea (minimum 150px height)

#### Form Styling Features
- **Focus states**: Gold border + glow effect
- **Validation**: HTML5 validation with custom styling
- **Submit button**: 
  - Gold background with white text
  - Pill shape (50px border-radius)
  - Hover: scale-up + shadow glow
  - Loading state with spinner animation
- **Success/Error messages**: Color-coded feedback
- **Smooth transitions** on all interactions

### 3. Contact Information Cards
- **Grid layout** of contact info cards
- **Contact details include**:
  - 📞 Phone: +1 (555) 123-4567
  - ✉️ Email: info@luxuryhotel.com
  - 📍 Address: 123 Luxury Avenue, Downtown
  - 🕒 Hours: Open 24/7
- **Hover effects**: Icons bounce and turn gold
- **Social media links** with hover animations

### 4. Embedded Google Map
- **Interactive map** showing hotel location
- **Rounded corners** matching design system
- **Responsive sizing**: 400px height on desktop, 300px on mobile
- **Map overlay card** with location details
- **"Get Directions" link** to Google Maps
- **Graceful fallback** for print view

### 5. Additional Information Section
- **Three info blocks** with icons:
  - 🎯 Quick Response (2-hour response time)
  - 🔒 Privacy Secure (data protection info)
  - 🎁 Special Offers (newsletter signup benefits)
- **Hover animations**: Cards lift with icon scaling

## 📱 Responsive Design

### Mobile (< 768px)
- **Single column layout** for all sections
- **Stacked form fields** for better mobile UX
- **Touch-friendly inputs** and buttons
- **Optimized hero section** with smaller height
- **Full-width contact form** with adjusted padding

### Tablet (768px - 1024px)
- **Two-column grid** for info and map sections
- **Responsive form layout** maintaining usability
- **Balanced spacing** and typography

### Desktop (> 1024px)
- **Full two-column layouts** where appropriate
- **Side-by-side form fields** for efficient space usage
- **Larger images and typography**
- **Complete hover interaction support**

## ✨ Interactive Features

### Form Interactions
- **Real-time validation** with custom styling
- **Focus glow effects** on form inputs
- **Smooth submit animation** with loading spinner
- **Success/error feedback** with color-coded messages
- **Form reset** after successful submission

### Hover Animations
- **Contact cards**: Lift effect + icon bounce + gold highlight
- **Submit button**: Scale transform + shadow enhancement
- **Social icons**: Scale + background color change
- **Info blocks**: Card elevation + icon scaling and rotation

### Accessibility Features
- **Focus-visible outlines** for keyboard navigation
- **ARIA labels** for social media links
- **Semantic HTML structure**
- **Screen reader friendly** form labels
- **High contrast mode support**
- **Reduced motion support** for users with preferences

## 🛠 Technical Implementation

### Component Structure
```
Contact/
├── Contact.jsx (230+ lines)
├── Contact.scss (600+ lines)
└── index.js (export)
```

### React Features
- **useState** for form data management and submission states
- **Form handling** with controlled components
- **Async form submission** simulation
- **Error handling** with user feedback
- **Event handlers** for form interactions

### State Management
```javascript
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
});
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitMessage, setSubmitMessage] = useState('');
```

### Styling Architecture
- **CSS Custom Properties** for consistent theming
- **Mobile-first responsive design**
- **Component-scoped SCSS** with organized structure
- **Animation keyframes** for smooth transitions
- **Print styles** for document printing
- **Accessibility considerations** built-in

## 📊 Features & Content

### Contact Information
- **24/7 phone support**: Professional phone number
- **Email contact**: Professional email address
- **Physical address**: Detailed location information
- **Business hours**: Always available messaging
- **Social media presence**: Multiple platform links

### Form Capabilities
- **Required field validation**: Email, first name, last name, message
- **Optional fields**: Phone number for callbacks
- **Character limits**: Reasonable message length
- **Submission simulation**: 2-second delay with success/error states
- **Form reset**: Clean state after successful submission

### Map Integration
- **Google Maps embed**: Interactive map with hotel location
- **Custom styling**: Rounded corners matching design
- **Location details**: Overlay card with address
- **External navigation**: Direct link to Google Maps
- **Responsive sizing**: Adapts to screen size

## 🚀 Performance & Optimization

### Loading Optimization
- **Lazy loading** for map iframe
- **Optimized images** with proper sizing
- **Minimal JavaScript** for core functionality
- **Efficient CSS** with minimal reflows
- **Strategic animation timing** to avoid layout thrashing

### Accessibility Compliance
- **WCAG 2.1 guidelines** followed
- **Keyboard navigation** fully supported
- **Screen reader compatibility**
- **Color contrast ratios** meet AA standards
- **Focus management** throughout the form

### Browser Compatibility
- **Modern browser support** (ES6+)
- **Graceful degradation** for older browsers
- **Cross-platform testing** considerations
- **Progressive enhancement** approach

## 📧 Form Submission Flow

### User Journey
1. **User fills out form** with required information
2. **Client-side validation** checks for required fields
3. **Submit button** shows loading state with spinner
4. **2-second simulation** of server communication
5. **Success message** displayed with form reset
6. **Error handling** if submission fails

### Data Handling
- **Form data validation** before submission
- **Sanitized input handling**
- **Success/error state management**
- **User feedback** with appropriate messaging
- **Form reset** maintaining good UX

## 🎯 User Experience

### Key UX Decisions
- **Clear visual hierarchy** with proper typography
- **Intuitive form layout** with logical field grouping
- **Immediate feedback** on form interactions
- **Professional contact information** display
- **Easy navigation** to other pages
- **Mobile-first approach** for broad accessibility

### Conversion Optimization
- **Minimal required fields** to reduce friction
- **Clear call-to-action** with prominent submit button
- **Trust indicators** with professional contact details
- **Multiple contact methods** for user preference
- **Quick response promises** to encourage contact

This Contact page provides a comprehensive, luxury-branded contact solution that encourages guest communication while maintaining the hotel's premium brand image.
