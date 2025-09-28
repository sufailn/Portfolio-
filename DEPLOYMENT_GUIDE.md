# Portfolio Deployment Guide for Vercel

## 📋 Pre-Deployment Checklist

### 1. CV File Setup
- [ ] Replace placeholder PDF in `public/documents/Sufail_Ahammed_N_CV.pdf` with your actual CV
- [ ] Ensure file size is reasonable (< 10MB for better performance)
- [ ] Test download locally before deployment

### 2. Git Commands for Deployment
```bash
# Add your CV file
git add public/documents/Sufail_Ahammed_N_CV.pdf

# Commit changes
git commit -m "Add actual CV PDF file for download"

# Push to main branch
git push origin main
```

### 3. Vercel Deployment
- Vercel will automatically deploy when you push to main branch
- Files in `public/` folder are served as static assets
- Your CV will be accessible at: `https://yourdomain.vercel.app/documents/Sufail_Ahammed_N_CV.pdf`

### 4. Verification
After deployment, test:
- [ ] CV download button in header works
- [ ] CV download in contact section works
- [ ] PDF opens correctly in browser
- [ ] File downloads with correct filename

## 🔧 Alternative: Environment-based CV URL

If you want to use a different storage solution later, update the component:

```tsx
// In cv-download.tsx, replace the href with an environment variable
const cvUrl = process.env.NEXT_PUBLIC_CV_URL || '/documents/Sufail_Ahammed_N_CV.pdf';

// Use in your links:
href={cvUrl}
```

Then add to your `.env.local` or Vercel environment variables:
```
NEXT_PUBLIC_CV_URL=https://your-cv-storage-url.com/cv.pdf
```

## 🚀 Performance Tips

1. **Optimize PDF size**: Use tools like Adobe Acrobat or online compressors to reduce file size
2. **Consider CDN**: For better global performance, consider using Vercel's edge network (automatic)
3. **Analytics**: The component already includes Google Analytics tracking for downloads

## 📱 Mobile Considerations

The CV download works on all devices:
- **Desktop**: Direct download
- **Mobile**: Opens in browser, option to save/share
- **iOS Safari**: May open in preview mode first

## 🔒 Security Notes

- PDF files in `public/` folder are publicly accessible
- Anyone with the direct URL can download your CV
- This is normal and expected behavior for a portfolio