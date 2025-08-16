import React, { useState } from 'react';
import {
  Button,
  Input,
  Textarea,
  Badge,
  IconButton,
  Avatar,
  StarRating,
  Checkbox,
  Label,
  Loader
} from './index';
import './AtomDemo.scss';

// Demo icons (you can replace with actual icon library)
const DemoIcons = {
  Edit: () => <span>✏️</span>,
  Delete: () => <span>🗑️</span>,
  View: () => <span>👁️</span>,
  Heart: () => <span>❤️</span>
};

const AtomDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [rating, setRating] = useState(4.5);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="atom-demo">
      <div className="demo-header">
        <h1>Luxury Hotel Booking System - Atomic UI Components</h1>
        <p>Reusable atoms following luxury branding guidelines</p>
      </div>

      {/* Buttons Demo */}
      <section className="demo-section">
        <Label text="Button Atoms" variant="section" />
        <div className="demo-grid">
          <div className="demo-item">
            <Label text="Primary Buttons" />
            <div className="button-group">
              <Button variant="primary" size="small">Small</Button>
              <Button variant="primary" size="medium">Medium</Button>
              <Button variant="primary" size="large">Large</Button>
            </div>
          </div>
          <div className="demo-item">
            <Label text="Button Variants" />
            <div className="button-group">
              <Button variant="primary">Primary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="neutral">Neutral</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Input Demo */}
      <section className="demo-section">
        <Label text="Input Atoms" variant="section" />
        <div className="demo-grid">
          <div className="demo-item">
            <Input
              label="Guest Name"
              placeholder="Enter guest name"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="guest@example.com"
              error="Please enter a valid email"
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              disabled
            />
          </div>
          <div className="demo-item">
            <Textarea
              label="Special Requests"
              placeholder="Any special accommodations or requests..."
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </section>

      {/* Badge Demo */}
      <section className="demo-section">
        <Label text="Badge Atoms" variant="section" />
        <div className="demo-grid">
          <div className="demo-item">
            <Label text="Room Status" />
            <div className="badge-group">
              <Badge type="available">Available</Badge>
              <Badge type="occupied">Occupied</Badge>
              <Badge type="maintenance">Maintenance</Badge>
              <Badge type="room-type">Suite</Badge>
            </div>
          </div>
          <div className="demo-item">
            <Label text="Badge Sizes" />
            <div className="badge-group">
              <Badge type="success" size="small">Small</Badge>
              <Badge type="warning" size="medium">Medium</Badge>
              <Badge type="error" size="large">Large</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* IconButton Demo */}
      <section className="demo-section">
        <Label text="IconButton Atoms" variant="section" />
        <div className="demo-grid">
          <div className="demo-item">
            <Label text="Action Buttons" />
            <div className="icon-button-group">
              <IconButton 
                icon={DemoIcons.Edit} 
                tooltip="Edit Room" 
                variant="primary" 
              />
              <IconButton 
                icon={DemoIcons.View} 
                tooltip="View Details" 
                variant="accent" 
              />
              <IconButton 
                icon={DemoIcons.Delete} 
                tooltip="Delete Room" 
                variant="danger" 
              />
              <IconButton 
                icon={DemoIcons.Heart} 
                tooltip="Add to Favorites" 
                variant="success" 
              />
            </div>
          </div>
          <div className="demo-item">
            <Label text="Button Sizes" />
            <div className="icon-button-group">
              <IconButton icon={DemoIcons.Edit} size="small" />
              <IconButton icon={DemoIcons.Edit} size="medium" />
              <IconButton icon={DemoIcons.Edit} size="large" />
            </div>
          </div>
        </div>
      </section>

      {/* Avatar Demo */}
      <section className="demo-section">
        <Label text="Avatar Atoms" variant="section" />
        <div className="demo-grid">
          <div className="demo-item">
            <Label text="Guest Avatars" />
            <div className="avatar-group">
              <Avatar alt="John Doe" shape="circle" size="small" />
              <Avatar alt="Jane Smith" shape="circle" size="medium" />
              <Avatar alt="Mike Johnson" shape="circle" size="large" />
            </div>
          </div>
          <div className="demo-item">
            <Label text="Room Thumbnails" />
            <div className="avatar-group">
              <Avatar alt="Room 101" shape="rounded" size="medium" />
              <Avatar alt="Room 102" shape="rounded" size="medium" />
              <Avatar alt="Room 103" shape="rounded" size="medium" />
            </div>
          </div>
        </div>
      </section>

      {/* StarRating Demo */}
      <section className="demo-section">
        <Label text="StarRating Atoms" variant="section" />
        <div className="demo-grid">
          <div className="demo-item">
            <Label text="Review Ratings" />
            <div className="rating-group">
              <StarRating rating={5} />
              <StarRating rating={4.5} />
              <StarRating rating={3} />
              <StarRating rating={2.5} />
            </div>
          </div>
          <div className="demo-item">
            <Label text="Interactive Rating" />
            <StarRating 
              rating={rating} 
              interactive 
              onChange={setRating}
              size="large"
            />
          </div>
        </div>
      </section>

      {/* Checkbox Demo */}
      <section className="demo-section">
        <Label text="Checkbox Atoms" variant="section" />
        <div className="demo-grid">
          <div className="demo-item">
            <Label text="Room Selection" />
            <div className="checkbox-group">
              <Checkbox 
                checked={isChecked} 
                onChange={(e) => setIsChecked(e.target.checked)}
                label="Select Room 101" 
              />
              <Checkbox label="Select Room 102" />
              <Checkbox label="Select Room 103" disabled />
            </div>
          </div>
          <div className="demo-item">
            <Label text="Checkbox Variants" />
            <div className="checkbox-group">
              <Checkbox checked label="Primary" className="checkbox-wrapper--primary" />
              <Checkbox checked label="Success" className="checkbox-wrapper--success" />
              <Checkbox checked label="Danger" className="checkbox-wrapper--danger" />
            </div>
          </div>
        </div>
      </section>

      {/* Loader Demo */}
      <section className="demo-section">
        <Label text="Loader Atoms" variant="section" />
        <div className="demo-grid">
          <div className="demo-item">
            <Label text="Loading Variants" />
            <div className="loader-group">
              <Loader variant="spinner" color="primary" />
              <Loader variant="dots" color="accent" />
              <Loader variant="pulse" color="success" />
              <Loader variant="bars" color="error" />
            </div>
          </div>
          <div className="demo-item">
            <Label text="Loading Sizes" />
            <div className="loader-group">
              <Loader size="small" />
              <Loader size="medium" />
              <Loader size="large" />
              <Loader size="xlarge" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AtomDemo;
