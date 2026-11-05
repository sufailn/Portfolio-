# Portfolio Deployment Guide for Vercel

## 📋 Pre-Deployment Checklist

### 1. Custom Portfolio CMS
- Create a Neon PostgreSQL database and set `DATABASE_URL` in Vercel and local `.env.local`.
- Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and a unique random `ADMIN_SESSION_SECRET` (at least 32 characters). Never commit real values.
- Create a Vercel Blob store and set its `BLOB_READ_WRITE_TOKEN` to enable media uploads in the admin.
- Add `GEMINI_API_KEY` from Google AI Studio to enable the dashboard AI editor, which uses Gemini 3.8 Flash through the Interactions API. Keep it server-side; never add a `NEXT_PUBLIC_` prefix.
- Open `/admin` to sign in. The content table is created automatically; the first save stores the portfolio's editable content in Neon.
- The CMS manages the header, hero, career, skills, projects, workflow, contact, and footer sections. Changes to item lists are managed with Add/Remove controls.
- Uploads accept JPG, PNG, WebP, GIF, and PDF files up to 4 MB.
- The initial CMS content is seeded from the portfolio source defaults; Sanity-hosted documents are not imported automatically.

### 2. CV File Setup
- [ ] Replace placeholder PDF in `public/documents/Sufail_Ahammed_N_CV.pdf` with your actual CV
- [ ] Ensure file size is reasonable (< 10MB for better performance)
- [ ] Test download locally before deployment

### 3. Git Commands for Deployment
```bash
# Add your CV file
git add public/documents/Sufail_Ahammed_N_CV.pdf

# Commit changes
git commit -m "Add actual CV PDF file for download"

# Push to main branch
git push origin main
```

### 4. Vercel Deployment
- Vercel will automatically deploy when you push to main branch
- Files in `public/` folder are served as static assets
- Your CV will be accessible at: `https://yourdomain.vercel.app/documents/Sufail_Ahammed_N_CV.pdf`

### 5. Verification
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