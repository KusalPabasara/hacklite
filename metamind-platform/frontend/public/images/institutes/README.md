# Institute Logos Directory

This directory contains all the institute logos for the career recommendations system.

## Required Logo Files

Please add the following logo files to this directory with the exact filenames:

### Healthcare Careers
- `nts-logo.png` - NTS (Nursing Training School) logo
- `medical-officer-logo.png` - Medical Officer (MO) logo

### Technical Careers  
- `vta-logo.png` - VTA (Vocational Training Authority) logo
- `german-tech-logo.png` - German Technical Training logo

### Education Careers
- `teacher-training-logo.png` - Teacher Training College logo
- `dtet-open-uni-logo.png` - DTET Open University logo
- `open-university-sl.png` - Open University Sri Lanka logo

### Agriculture Careers
- `agricultural-engineering-logo.png` - Agricultural Engineering logo

### Business Careers
- `ca-logo.png` - Chartered Accountancy (CA) logo

### Technology Careers
- `bit-logo.png` - BIT (Bachelor of Information Technology) logo

### International Programs
- `korean employment.jpeg` - Korean Employment Program logo

## File Specifications

- **Format**: PNG (preferred) or JPG
- **Size**: 200x200 pixels (square format recommended)
- **Background**: Transparent or white background preferred
- **Quality**: High resolution for crisp display

## Directory Structure

```
frontend/public/images/institutes/
├── README.md
├── nts-logo.png
├── vta-logo.png
├── german-tech-logo.png
├── agricultural-engineering-logo.png
├── medical-officer-logo.png
├── ca-logo.png
├── teacher-training-logo.png
├── dtet-open-uni-logo.png
├── open-university-sl.png
├── korean employment.jpeg
└── bit-logo.png
```

## How to Add Logos

1. **Download or obtain the official logos** for each institute
2. **Resize them** to approximately 200x200 pixels
3. **Save them as PNG files** with the exact filenames listed above
4. **Place them** in the `/frontend/public/images/institutes/` directory
5. **Test the application** to ensure logos display correctly

## Fallback Behavior

If a logo file is missing, the system will automatically display a category-themed icon instead:
- Healthcare: 🏥
- Technical: ⚙️
- Education: 🎓
- Agriculture: 🌾
- Business: 💼
- Technology: 💻

## Notes

- The logos will be displayed at 48x48 pixels (w-12 h-12) in the UI
- Square logos work best for consistent display
- Ensure logos are clear and recognizable at small sizes
- Official logos should be used when available for professional appearance
