# Sellers.json Implementation Documentation

## 🎯 **Overview**
This document outlines the implementation of sellers.json for SWS - Strategic Web Solutions, following IAB Tech Lab transparency standards for digital advertising.

## 📋 **What is Sellers.json?**
Sellers.json is an IAB Tech Lab standard that provides transparency in the digital advertising ecosystem by allowing buyers to discover and verify the entities who are either direct sellers of or intermediaries in digital advertising opportunities.

## 🏗️ **Implementation Details**

### **File Location**
- **URL**: `https://sitesforcabo.netlify.app/sellers.json`
- **Local Path**: `public/sellers.json`

### **File Structure**
```json
{
  "version": "1.0",
  "contact_email": "bay@searchloscabos.com",
  "contact_address": "Los Cabos, Baja California Sur, Mexico",
  "identifiers": [],
  "sellers": [
    {
      "seller_id": "sws-strategic-web-solutions",
      "name": "SWS - Strategic Web Solutions",
      "domain": "sitesforcabo.netlify.app",
      "seller_type": "PUBLISHER",
      "is_confidential": false,
      "comment": "Web development agency - no advertising inventory sold"
    }
  ]
}
```

## 📊 **Field Descriptions**

### **Top-Level Object**
| Field | Value | Description |
|-------|-------|-------------|
| `version` | "1.0" | IAB Tech Lab sellers.json specification version |
| `contact_email` | "bay@searchloscabos.com" | Contact email for inquiries about this file |
| `contact_address` | "Los Cabos, Baja California Sur, Mexico" | Business address |
| `identifiers` | [] | TAG-IDs (empty for non-ad serving entities) |
| `sellers` | Array | List of seller objects |

### **Seller Object**
| Field | Value | Description |
|-------|-------|-------------|
| `seller_id` | "sws-strategic-web-solutions" | Unique identifier for SWS |
| `name` | "SWS - Strategic Web Solutions" | Official business name |
| `domain` | "sitesforcabo.netlify.app" | Primary business domain |
| `seller_type` | "PUBLISHER" | Entity type (PUBLISHER/INTERMEDIARY/BOTH) |
| `is_confidential` | false | Transparency setting (false = transparent) |
| `comment` | "Web development agency - no advertising inventory sold" | Clarification note |

## 🔧 **Technical Configuration**

### **HTTP Headers** (via netlify.toml)
```toml
[[headers]]
  for = "/sellers.json"
  [headers.values]
    Content-Type = "application/json; charset=utf-8"
    Cache-Control = "public, max-age=3600"
    Access-Control-Allow-Origin = "*"
```

### **Sitemap Integration**
The sellers.json file is included in sitemap.xml:
```xml
<url>
  <loc>https://sitesforcabo.netlify.app/sellers.json</loc>
  <lastmod>2024-12-28</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.3</priority>
</url>
```

## 📈 **Business Context**

### **Why SWS Needs Sellers.json**
1. **Industry Compliance**: Following IAB standards for transparency
2. **Trust Building**: Demonstrating commitment to advertising transparency
3. **Future-Proofing**: Ready for potential advertising partnerships
4. **Professional Standards**: Aligning with digital marketing best practices

### **SWS Business Model Clarification**
- **Primary Service**: Web development and digital solutions
- **Advertising Status**: Does not sell advertising inventory
- **Transparency**: Fully transparent (not confidential)
- **Domain Ownership**: Owns and operates sitesforcabo.netlify.app

## 🎭 **Seller Type Explanation**

### **Why "PUBLISHER"?**
SWS is classified as "PUBLISHER" because:
- **Domain Ownership**: Owns the domain being referenced
- **Direct Control**: Has direct control over the website content
- **Business Entity**: Is the primary business entity for the domain

### **Alternative Classifications**
- **INTERMEDIARY**: Would apply if SWS sold advertising on behalf of others
- **BOTH**: Would apply if SWS both owned inventory and sold for others

## 🔒 **Privacy & Transparency**

### **Transparency Settings**
- **is_confidential**: `false` (fully transparent)
- **Public Information**: Business name and domain are public
- **Contact Information**: Publicly available for inquiries

### **Data Sharing**
- **What's Shared**: Business name, domain, contact information
- **What's Protected**: No sensitive business data exposed
- **Purpose**: Advertising transparency and verification only

## 🚀 **Deployment & Maintenance**

### **Deployment Status**
- ✅ **File Created**: sellers.json properly formatted
- ✅ **Headers Configured**: Proper Content-Type and CORS
- ✅ **Sitemap Updated**: Included in sitemap.xml
- ✅ **Build Tested**: Successfully included in dist/
- ✅ **Ready for Production**: All configurations complete

### **Maintenance Schedule**
| Task | Frequency | Responsibility |
|------|-----------|----------------|
| File Validation | Monthly | Development Team |
| Contact Info Update | As Needed | Bay Purcell |
| Domain Changes | As Needed | Development Team |
| IAB Standard Updates | Annually | Development Team |

### **Monitoring & Validation**
- **URL Accessibility**: Monitor `https://sitesforcabo.netlify.app/sellers.json`
- **JSON Validation**: Ensure proper JSON syntax
- **Header Verification**: Confirm correct Content-Type headers
- **IAB Compliance**: Stay updated with specification changes

## 📝 **Compliance Checklist**

### **IAB Tech Lab Requirements**
- ✅ **Version 1.0**: Using current specification version
- ✅ **Required Fields**: All mandatory fields included
- ✅ **JSON Format**: Properly formatted JSON structure
- ✅ **Contact Information**: Valid contact details provided
- ✅ **Seller Classification**: Appropriate seller_type assigned

### **Technical Requirements**
- ✅ **File Accessibility**: Publicly accessible via HTTPS
- ✅ **Content-Type**: Served as application/json
- ✅ **CORS Headers**: Cross-origin access enabled
- ✅ **Caching**: Appropriate cache headers set
- ✅ **Encoding**: UTF-8 character encoding

## 🔄 **Update Procedures**

### **When to Update**
1. **Business Name Change**: Update `name` field
2. **Domain Change**: Update `domain` field
3. **Contact Change**: Update `contact_email` or `contact_address`
4. **Business Model Change**: Update `seller_type` if applicable
5. **IAB Specification Update**: Update `version` and structure

### **Update Process**
1. Edit `public/sellers.json`
2. Update `lastmod` date in sitemap.xml
3. Test build locally
4. Deploy to production
5. Verify accessibility and headers

## 📞 **Support & Contact**

### **Technical Issues**
- **Primary Contact**: bay@searchloscabos.com
- **Phone**: +52 624 264 4012
- **Business Hours**: Monday-Friday, 9:00 AM - 5:00 PM (MST)

### **IAB Tech Lab Resources**
- **Specification**: [IAB Tech Lab Sellers.json](https://iabtechlab.com/sellers-json/)
- **Validation Tools**: Available through IAB Tech Lab
- **Community Support**: IAB Tech Lab working groups

## 📊 **Validation & Testing**

### **JSON Validation**
```bash
# Test JSON syntax
cat public/sellers.json | python -m json.tool

# Validate online
# Use JSONLint.com or similar online validators
```

### **Header Testing**
```bash
# Check headers after deployment
curl -I https://sitesforcabo.netlify.app/sellers.json

# Expected headers:
# Content-Type: application/json; charset=utf-8
# Access-Control-Allow-Origin: *
# Cache-Control: public, max-age=3600
```

### **Accessibility Testing**
- **Direct URL**: https://sitesforcabo.netlify.app/sellers.json
- **Expected Response**: 200 OK with JSON content
- **Verification**: Valid JSON structure with all required fields

---

**Implementation Status**: ✅ **COMPLETE**  
**IAB Compliance**: ✅ **VERIFIED**  
**Production Ready**: ✅ **YES**  
**Last Updated**: December 28, 2024 