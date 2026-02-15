# CeylonLeaf Home Page Setup Instructions

## 🏠 Home Page Features

Your new CeylonLeaf home page has been created with the following features:

- **Public Landing Page**: Matches the design from your provided image
- **Hero Section**: Large title, subtitle, and login button
- **Statistics Display**: Shows tea estate metrics (120+ fields, 1,500+ workers, etc.)
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Authentication Integration**: Shows "Dashboard" if user is logged in, "Login" if not

## 🖼️ Adding Your Background Image

To add your tea plantation background image:

### 1. **Add Your Image File**

1. Save your tea plantation background image in the `frontend/public/` folder
2. Name it something like `tea-plantation-bg.jpg` or `ceylon-tea-estate.jpg`

### 2. **Update the CSS**

Open `frontend/src/pages/Home/Home.module.css` and find line 2:

```css
background-image: url("path-to-your-tea-plantation-image.jpg");
```

Replace it with:

```css
background-image: url("/tea-plantation-bg.jpg");
```

(Use the actual filename of your image)

### 3. **Alternative: Using Assets Folder**

If you prefer to put images in `src/assets/`:

1. Create `frontend/src/assets/images/` folder
2. Put your image there: `frontend/src/assets/images/tea-plantation-bg.jpg`
3. Import it in `Home.jsx`:
   ```jsx
   import backgroundImage from "../../assets/images/tea-plantation-bg.jpg";
   ```
4. Update the CSS to use the imported image:
   ```css
   background-image: url(var(--bg-image));
   ```
5. Set the CSS variable in the component or pass it as a style prop.

## 🎨 Customization Options

### Colors

You can customize colors in `App.css` by changing the CSS custom properties:

```css
:root {
  --primary-color: #4f46e5; /* Change login button color */
  --secondary-color: #10b981; /* Change highlight text color */
}
```

### Statistics

Update the statistics in `Home.jsx` around line 18-35:

```jsx
const stats = [
  {
    value: "120+",
    label: "Active Fields",
    icon: <FiPackage />,
  },
  // ... update with your actual numbers
];
```

### Text Content

Update the hero text in `Home.jsx` around line 65-70:

```jsx
<p className={styles.heroSubtitle}>
  Smart tools for tea estates — from field planning and worker management to{" "}
  <span className={styles.highlight}>harvest tracking</span> and seamless
  handover to the factory.
</p>
```

## 🔄 Navigation Flow

- **Public Users**: See the landing page at `/`
- **Login Button**: Takes users to `/login`
- **Authenticated Users**: Login button becomes "Dashboard" button, takes to `/dashboard`
- **Direct Access**: Users can still access `/dashboard`, `/workers`, etc. directly if authenticated

## 📱 Responsive Behavior

- **Desktop**: Full layout with statistics in a grid
- **Tablet**: Adjusted spacing and typography
- **Mobile**: Single column layout, statistics stacked

## 🚀 Testing Your Home Page

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/` (or your local dev URL)
3. You should see the CeylonLeaf landing page
4. Test the login button functionality
5. Test on different screen sizes

## 🎯 Next Steps

1. Add your background image as described above
2. Update the statistics with your real data
3. Customize colors and text to match your branding
4. Test the complete user flow: Home → Login → Dashboard

Your beautiful CeylonLeaf home page is now ready! 🌿
