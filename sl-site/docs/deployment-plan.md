# SCULPTURELANDIA Website Deployment Plan

## Overview: Transitioning from Squarespace to Custom React Website

This document outlines the complete process of deploying your custom SCULPTURELANDIA React website to replace your existing Squarespace site. This is a significant technical undertaking that requires careful planning and execution.

---

## Current Situation Analysis

### What You Have Now (Squarespace)
- **Managed Hosting**: Squarespace handles servers, security, updates
- **Domain Management**: Squarespace likely manages your domain
- **SSL Certificate**: Automatically provided and renewed
- **Content Management**: Visual editor for content updates
- **Backups**: Automatic backups handled by Squarespace
- **Support**: Customer service available

### What You're Moving To (Custom React Site)
- **Static Site**: Built React application (HTML, CSS, JavaScript files)
- **Self-Managed**: You're responsible for hosting, updates, security
- **Code-Based**: Changes require code updates and redeployment
- **Modern Performance**: Faster loading, custom interactions
- **Complete Control**: Full customization capabilities

---

## Phase 1: Pre-Deployment Preparation

### 1.1 Complete Your Website
**Before deploying, ensure:**
- [ ] All sculpture photos uploaded and properly displaying
- [ ] All descriptions and content written and formatted
- [ ] All pages tested and working correctly
- [ ] Mobile responsiveness verified
- [ ] Browser compatibility tested (Chrome, Firefox, Safari, Edge)
- [ ] All links and navigation working
- [ ] Error handling in place (404 pages, etc.)

### 1.2 Domain Assessment
**Determine your current domain setup:**

**If you own the domain through Squarespace:**
- Domain registrar: Squarespace
- DNS management: Squarespace
- **Action needed**: Transfer domain or change DNS settings

**If you own the domain elsewhere:**
- Domain registrar: (GoDaddy, Namecheap, etc.)
- DNS management: May be with registrar or Squarespace
- **Action needed**: Update DNS settings

**If Squarespace owns the domain:**
- You'll need to purchase your own domain
- **Action needed**: Buy new domain or negotiate transfer

### 1.3 Content Backup
**Before switching:**
- [ ] Screenshot all current website pages
- [ ] Download all images and content from Squarespace
- [ ] Document all current URLs for redirect planning
- [ ] Save contact forms, email lists, analytics data

---

## Phase 2: Build and Test Production Version

### 2.1 Production Build Process
```bash
# 1. Install dependencies
npm install

# 2. Create optimized production build
npm run build

# 3. Test the build locally
npm run preview
```

**What this creates:**
- `dist/` folder with optimized files
- Minified JavaScript and CSS
- Compressed images and assets
- Static HTML files for each route

### 2.2 Build Optimization
**Ensure production readiness:**
- [ ] Remove console.log statements
- [ ] Optimize images (WebP format, proper sizing)
- [ ] Add meta tags for SEO
- [ ] Configure proper error pages
- [ ] Test performance with Lighthouse

---

## Phase 3: Choose Hosting Platform

### 3.1 Recommended Option: Netlify (Beginner-Friendly)

**Why Netlify:**
- ✅ Free tier available
- ✅ Automatic HTTPS/SSL
- ✅ Custom domain support
- ✅ Continuous deployment from Git
- ✅ Excellent documentation
- ✅ Built-in form handling

**Netlify Deployment Steps:**
1. Create account at netlify.com
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy automatically on code changes

**Cost**: Free for basic use, $19/month for pro features

### 3.2 Alternative: Vercel

**Why Vercel:**
- ✅ Excellent React support
- ✅ Fast global CDN
- ✅ Free tier available
- ✅ Simple deployment process

**Cost**: Free for personal use, paid plans for commercial

### 3.3 Alternative: Traditional Web Hosting

**Examples**: Bluehost, SiteGround, HostGator
**Process**:
1. Upload `dist` folder contents via FTP
2. Configure domain to point to hosting
3. Manual updates required for changes

**Cost**: $5-15/month

---

## Phase 4: Domain and DNS Management

### 4.1 Domain Transfer Process (if needed)

**If transferring from Squarespace:**
1. **Request transfer code** from Squarespace
2. **Choose new registrar** (Namecheap, Google Domains, etc.)
3. **Initiate transfer** at new registrar
4. **Wait 5-7 days** for transfer completion
5. **Update DNS settings** to point to new hosting

**Cost**: $10-15/year for domain registration

### 4.2 DNS Configuration

**What you'll need to update:**
```
A Record: yourdomainname.com → [Your hosting IP]
CNAME: www → yourdomainname.com
```

**For Netlify specifically:**
- Add custom domain in Netlify dashboard
- Netlify provides DNS instructions
- Update DNS at your domain registrar

### 4.3 SSL Certificate
- **Netlify/Vercel**: Automatic SSL (Let's Encrypt)
- **Traditional hosting**: May need manual SSL setup
- **Cost**: Free with most modern hosting platforms

---

## Phase 5: Deployment Execution

### 5.1 Soft Launch Strategy
**Recommended approach:**
1. **Deploy to subdomain first**: `new.yourdomainname.com`
2. **Test thoroughly** on the live subdomain
3. **Get feedback** from trusted users
4. **Fix any issues** found in live environment
5. **Switch main domain** only when confident

### 5.2 Domain Cutover Process

**Step-by-step cutover:**
1. **Lower DNS TTL** to 300 seconds (5 minutes) 24 hours before
2. **Deploy final version** to hosting platform
3. **Update DNS records** to point to new hosting
4. **Monitor for issues** for 24-48 hours
5. **Set up redirects** from old URLs if needed

### 5.3 Testing Checklist
- [ ] All pages load correctly
- [ ] Images and assets display properly
- [ ] Navigation works on all devices
- [ ] Contact forms function (if added)
- [ ] Page load speeds are acceptable
- [ ] SSL certificate is active and valid
- [ ] Search engines can crawl the site

---

## Phase 6: Post-Deployment Management

### 6.1 Ongoing Responsibilities

**Content Updates:**
- Changes require code editing
- Must redeploy after changes
- Consider adding a CMS later if needed

**Technical Maintenance:**
- Keep dependencies updated: `npm audit`
- Monitor hosting platform for issues
- Renew domain registration annually
- Monitor website performance and uptime

**Backup Strategy:**
- Code backed up in Git repository
- Consider regular site backups
- Document deployment process

### 6.2 Analytics and Monitoring

**Add tracking:**
- Google Analytics setup
- Google Search Console
- Performance monitoring tools
- Uptime monitoring service

---

## Cost Analysis

### Monthly Costs
| Service | Cost | Purpose |
|---------|------|---------|
| Domain Registration | ~$1/month | Your website address |
| Hosting (Netlify Free) | $0 | Website hosting |
| Hosting (Netlify Pro) | $19/month | Advanced features |
| SSL Certificate | $0 | Security (included) |
| **Total (Free tier)** | **~$1/month** | |
| **Total (Pro tier)** | **~$20/month** | |

### One-Time Costs
- Domain transfer fee: $10-15
- Development time: Your investment
- Learning curve: Time commitment

---

## Technical Skills Assessment

### Required Skills (Rate 1-5, need 3+ for each)
- [ ] **Git/GitHub usage**: Version control, repositories
- [ ] **Command line basics**: Running npm commands, file navigation
- [ ] **DNS understanding**: A records, CNAME records, TTL
- [ ] **Basic troubleshooting**: Reading error messages, debugging
- [ ] **File management**: FTP, file uploads (if not using Git deployment)

### Learning Resources
- **Git**: GitHub's Git tutorial
- **DNS**: CloudFlare's DNS learning center
- **Command line**: Basic terminal/command prompt tutorials
- **Netlify**: Official Netlify documentation and tutorials

---

## Risk Assessment and Mitigation

### Potential Issues
1. **Website downtime during transition**
   - *Mitigation*: Use subdomain testing, low TTL DNS

2. **Lost search engine rankings**
   - *Mitigation*: Maintain URL structure, set up redirects

3. **Technical problems after launch**
   - *Mitigation*: Keep Squarespace active for 30 days backup

4. **Email interruption (if using domain email)**
   - *Mitigation*: Set up email hosting before DNS changes

### Rollback Plan
**If major issues occur:**
1. Revert DNS changes to point back to Squarespace
2. Squarespace site becomes active again within 5-60 minutes
3. Fix issues on new hosting while old site is live
4. Retry deployment when ready

---

## Recommendation

### You Should Proceed If:
- ✅ You're comfortable with technical learning
- ✅ You have time for ongoing maintenance
- ✅ You want complete control over your website
- ✅ You're excited about the modern performance and features
- ✅ You can handle occasional technical troubleshooting

### Consider Waiting If:
- ❌ You prefer hands-off website management
- ❌ You don't have time for technical learning
- ❌ You're not comfortable with command line tools
- ❌ You need frequent content updates by non-technical team members

---

## Next Steps

### If You Decide to Proceed:
1. **Complete website development** (add all content and photos)
2. **Set up GitHub repository** for version control
3. **Choose hosting platform** (recommend starting with Netlify)
4. **Create test deployment** on subdomain
5. **Plan domain transfer/DNS change** timeline

### If You Need More Preparation:
1. **Practice with Git/GitHub** tutorials
2. **Learn basic command line** operations
3. **Understand your current domain setup**
4. **Consider taking a web development course**

---

## Conclusion

Transitioning from Squarespace to a custom React website is a significant step that offers tremendous benefits in terms of performance, customization, and cost savings. However, it also transfers technical responsibility to you.

The process is definitely doable with proper preparation and the right hosting platform (like Netlify), but it requires commitment to learning and ongoing maintenance.

**Recommendation**: Complete your website development first, then revisit this deployment plan when you're ready to take on the technical challenges. The modern tooling makes this much easier than it was in the past, but it's still a meaningful technical undertaking.
