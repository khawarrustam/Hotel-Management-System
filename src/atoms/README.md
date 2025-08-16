# Luxury Hotel Booking System - Atomic UI Components

This folder contains reusable atomic UI components designed for a luxury hotel booking system admin dashboard. Each component follows modern design principles, accessibility standards, and luxury branding guidelines.

## 🎨 Design System

### Colors
- **Primary**: Royal Blue #1E3A8A
- **Accent**: Gold #FBBF24  
- **Background**: Light Gray #F9FAFB
- **Text**: Dark Slate #1F2937

### Typography
- **Headings**: "Playfair Display", serif
- **Body**: "Inter", sans-serif

### Styling
- **Border Radius**: 8px – 12px
- **Transitions**: all 0.3s ease-in-out

## 📦 Components

### Button Atom
**File**: `Button.jsx` / `Button.scss`

Versatile button component with multiple variants and sizes.

```jsx
import { Button } from './atoms';

<Button variant="primary" size="medium" onClick={handleClick}>
  Book Room
</Button>
```

**Props:**
- `variant`: 'primary' | 'accent' | 'danger' | 'neutral' | 'outline'
- `size`: 'small' | 'medium' | 'large'
- `disabled`: boolean
- `onClick`: function

### Input Field Atom
**File**: `Input.jsx` / `Input.scss`

Form input with label, validation, and multiple types.

```jsx
import { Input } from './atoms';

<Input
  label="Guest Name"
  type="text"
  placeholder="Enter guest name"
  value={value}
  onChange={onChange}
  error="This field is required"
  required
/>
```

**Props:**
- `label`: string
- `type`: 'text' | 'email' | 'number' | 'password'
- `placeholder`: string
- `value`: string
- `onChange`: function
- `error`: string
- `required`: boolean

### Textarea Atom
**File**: `Textarea.jsx` / `Textarea.scss`

Multi-line text input for longer content.

```jsx
import { Textarea } from './atoms';

<Textarea
  label="Special Requests"
  placeholder="Enter special accommodations..."
  rows={4}
  value={value}
  onChange={onChange}
/>
```

**Props:**
- `label`: string
- `placeholder`: string
- `rows`: number (default: 4)
- `value`: string
- `onChange`: function

### Badge Atom
**File**: `Badge.jsx` / `Badge.scss`

Status indicators for rooms, bookings, and other entities.

```jsx
import { Badge } from './atoms';

<Badge type="available">Available</Badge>
<Badge type="occupied">Occupied</Badge>
<Badge type="maintenance">Maintenance</Badge>
```

**Props:**
- `type`: 'success' | 'warning' | 'error' | 'info' | 'available' | 'occupied' | 'maintenance' | 'room-type'
- `size`: 'small' | 'medium' | 'large'

### IconButton Atom
**File**: `IconButton.jsx` / `IconButton.scss`

Button with icon and tooltip for actions.

```jsx
import { IconButton } from './atoms';
import { EditIcon } from 'react-icons/fa';

<IconButton
  icon={EditIcon}
  tooltip="Edit Room"
  variant="primary"
  onClick={handleEdit}
/>
```

**Props:**
- `icon`: React component
- `tooltip`: string
- `variant`: 'primary' | 'accent' | 'danger' | 'success' | 'neutral' | 'ghost'
- `size`: 'small' | 'medium' | 'large'

### Avatar Atom
**File**: `Avatar.jsx` / `Avatar.scss`

Profile pictures and room thumbnails.

```jsx
import { Avatar } from './atoms';

<Avatar
  src="/images/guest.jpg"
  alt="John Doe"
  size="medium"
  shape="circle"
/>
```

**Props:**
- `src`: string (image URL)
- `alt`: string
- `size`: 'small' | 'medium' | 'large' | 'xlarge'
- `shape`: 'circle' | 'rounded' | 'square'

### StarRating Atom
**File**: `StarRating.jsx` / `StarRating.scss`

Rating display and input component.

```jsx
import { StarRating } from './atoms';

<StarRating
  rating={4.5}
  interactive={true}
  onChange={handleRatingChange}
  size="medium"
/>
```

**Props:**
- `rating`: number (0-5)
- `maxRating`: number (default: 5)
- `interactive`: boolean
- `onChange`: function
- `size`: 'small' | 'medium' | 'large'

### Checkbox Atom
**File**: `Checkbox.jsx` / `Checkbox.scss`

Custom styled checkbox for selections.

```jsx
import { Checkbox } from './atoms';

<Checkbox
  checked={isSelected}
  onChange={handleChange}
  label="Select Room 101"
  size="medium"
/>
```

**Props:**
- `checked`: boolean
- `onChange`: function
- `label`: string
- `indeterminate`: boolean
- `size`: 'small' | 'medium' | 'large'

### Label Atom
**File**: `Label.jsx` / `Label.scss`

Styled labels for forms and sections.

```jsx
import { Label } from './atoms';

<Label
  text="Room Details"
  required={true}
  variant="section"
/>
```

**Props:**
- `text`: string
- `required`: boolean
- `variant`: 'default' | 'primary' | 'section' | 'table-header' | 'filter'
- `size`: 'small' | 'medium' | 'large'

### Loader Atom
**File**: `Loader.jsx` / `Loader.scss`

Loading indicators for various states.

```jsx
import { Loader } from './atoms';

<Loader
  variant="spinner"
  size="medium"
  color="primary"
/>
```

**Props:**
- `variant`: 'spinner' | 'dots' | 'pulse' | 'bars'
- `size`: 'small' | 'medium' | 'large' | 'xlarge'
- `color`: 'primary' | 'accent' | 'success' | 'error' | 'neutral'

## 🚀 Usage

### Installation
Import the components you need:

```jsx
import { Button, Input, Badge } from './atoms';
```

Or import everything:

```jsx
import * as Atoms from './atoms';
```

### Demo
View all components in action:

```jsx
import AtomDemo from './atoms/AtomDemo';

function App() {
  return <AtomDemo />;
}
```

## 📱 Responsiveness

All atoms are built mobile-first and include:
- Touch-friendly target sizes (44px minimum)
- Responsive typography scaling
- Flexible layouts
- Proper focus states for accessibility

## ♿ Accessibility

Components include:
- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Color contrast compliance

## 🎯 Next Steps

These atoms can be combined to create:
- **Molecules**: Tables, Cards, Modals, Forms
- **Organisms**: Navigation, Room Lists, Booking Forms
- **Templates**: Page layouts and sections
- **Pages**: Complete admin dashboard views

## 🛠️ Customization

Each component accepts a `className` prop for additional styling:

```jsx
<Button className="custom-button-style" variant="primary">
  Custom Button
</Button>
```

CSS custom properties can be used to override default colors:

```css
:root {
  --primary-color: #your-color;
  --accent-color: #your-accent;
}
```
