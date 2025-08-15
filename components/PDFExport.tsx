"use client";

import React, { useState, useMemo, RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Document, Page, Text, View, Link, StyleSheet, pdf, Font, Svg, Path, Defs, LinearGradient, Stop } from '@react-pdf/renderer';
import { toast } from "sonner";
import { useCV } from "@/contexts/CVContext";

interface PDFExportProps {
  cvRef: RefObject<HTMLDivElement | null>;
  theme: string;
}

// Register fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v15/Helvetica.ttf' },
    { src: 'https://fonts.gstatic.com/s/helvetica/v15/Helvetica-Bold.ttf', fontWeight: 'bold' },
  ],
});

// Define SVG icons
const Icons = {
  email: (color: string) => (
    <Svg width="16" height="16" viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25c-.25-.16-.4-.43-.4-.72 0-.67.73-1.07 1.3-.72L12 11l6.7-4.19c.57-.35 1.3.05 1.3.72 0 .29-.15.56-.4.72z"
      />
    </Svg>
  ),
  phone: (color: string) => (
    <Svg width="16" height="16" viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M20 15.45c-1.25 0-2.45-.2-3.57-.57-.1-.03-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.4 8.5 5.2 8.5 3.95c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM5.03 4.95h1.5c.07.88.22 1.75.45 2.58l-1.2 1.21c-.4-1.21-.66-2.47-.75-3.79zM19 18.92c-1.32-.09-2.6-.35-3.8-.76l1.2-1.2c.85.24 1.72.39 2.6.45v1.51z"
      />
    </Svg>
  ),
  location: (color: string) => (
    <Svg width="16" height="16" viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z M12 11.5c1.38 0 2.5-1.12 2.5-2.5S13.38 6.5 12 6.5 9.5 7.62 9.5 9s1.12 2.5 2.5 2.5z"
      />
    </Svg>
  ),
  link: (color: string) => (
    <Svg width="16" height="16" viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2z M8 11h8v2H8z"
      />
    </Svg>
  ),
};

// Define theme colors
const themeColors = {
  geminiDark: {
    background: '#1E1E1E',
    text: '#E0E0E0',
    heading: '#8AB4F8',
    headingGradient: ['#8AB4F8', '#C58AF9'],
    accent: '#C58AF9',
    cardBg: '#2D2D2D',
    cardBorder: '#3D3D3D',
    link: '#8AB4F8',
    skillTagBg: '#2D2D2D',
    skillTagText: '#E0E0E0',
    skillTagBorder: '#3D3D3D',
    summaryBg: '#2D2D2D',
    summaryBorder: '#3D3D3D',
    iconColor: '#8AB4F8',
    dateColor: '#A0A0A0',
    dividerColor: '#3D3D3D',
    highlightText: '#8AB4F8',
    bulletColor: '#8AB4F8',
  },
  chatGPTLight: {
    background: '#FFFFFF',
    text: '#333333',
    heading: '#10A37F',
    headingGradient: ['#10A37F', '#059669'],
    accent: '#10A37F',
    cardBg: '#F7F7F7',
    cardBorder: '#E5E5E5',
    link: '#10A37F',
    skillTagBg: '#F7F7F7',
    skillTagText: '#333333',
    skillTagBorder: '#E5E5E5',
    summaryBg: '#F7F7F7',
    summaryBorder: '#E5E5E5',
    iconColor: '#10A37F',
    dateColor: '#666666',
    dividerColor: '#E5E5E5',
    highlightText: '#10A37F',
    bulletColor: '#10A37F',
  },
};

// Helper function to format location
const formatLocation = (location: any) => {
  if (!location) return '';
  if (typeof location === 'string') return location;

  const parts = [];
  if (location.address) parts.push(location.address);
  if (location.city) parts.push(location.city);
  if (location.region) parts.push(location.region);
  if (location.postalCode) parts.push(location.postalCode);
  if (location.countryCode) parts.push(location.countryCode);

  return parts.join(', ');
};

// Add gradient title component
const GradientText = ({ text, colors, styles }: { text: string; colors: string[]; styles: any }) => (
  <View>
    <Svg width={400} height={50}>
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={colors[0]} stopOpacity={1} />
          <Stop offset="1" stopColor={colors[1]} stopOpacity={1} />
        </LinearGradient>
      </Defs>
      <Text
        x={0}
        y={35}
        style={{
          fill: "url('#grad')",
          fontSize: 32,
          fontFamily: 'Helvetica',
          fontWeight: 'bold',
        }}
      >
        {text}
      </Text>
    </Svg>
  </View>
);

// Define styles for the PDF
const createStyles = (theme: "geminiDark" | "chatGPTLight") => {
  const colors = themeColors[theme];

  return StyleSheet.create({
    page: {
      padding: '40 48',
      fontFamily: 'Helvetica',
      backgroundColor: colors.background,
      color: colors.text,
    },
    section: {
      marginBottom: 28,
    },
    header: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 16,
      color: colors.heading,
    },
    subheader: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 16,
      color: colors.heading,
    },
    subheaderDivider: {
      borderBottom: `1pt solid ${colors.dividerColor}`,
      paddingBottom: 8,
      marginBottom: 16,
    },
    experienceSummary: {
      fontSize: 13,
      lineHeight: 1.6,
      color: colors.text,
      marginBottom: 12,
      marginLeft: 0,
    },
    text: {
      fontSize: 12,
      lineHeight: 1.5,
      color: colors.text,
    },
    skillTag: {
      backgroundColor: colors.skillTagBg,
      border: `1pt solid ${colors.skillTagBorder}`,
      padding: '4 8',
      borderRadius: 4,
      marginRight: 6,
      marginBottom: 6,
      fontSize: 11,
      color: colors.accent,
    },
    date: {
      fontSize: 11,
      color: colors.dateColor,
      marginBottom: 4,
      fontWeight: 'normal',
    },
    company: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    companyLink: {
      color: colors.link,
      textDecoration: 'none',
      marginLeft: 6,
      flexDirection: 'row',
      alignItems: 'center',
    },
    companyLinkIcon: {
      width: 12,
      height: 12,
      marginLeft: 4,
      color: colors.link,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 6,
    },
    description: {
      fontSize: 13,
      lineHeight: 1.6,
      color: colors.text,
      marginBottom: 14,
      marginLeft: 14,
    },
    bullet: {
      width: 4,
      height: 4,
      marginRight: 8,
      marginTop: 8,
      backgroundColor: colors.bulletColor,
      borderRadius: 2,
    },
    bulletText: {
      flex: 1,
      fontSize: 13,
      lineHeight: 1.6,
      color: colors.text,
    },
    bulletPoint: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 6,
      marginLeft: 0,
    },
    divider: {
      borderBottom: `1pt solid ${colors.dividerColor}`,
      marginVertical: 24,
    },
    flexRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      alignItems: 'center',
    },
    skillCategory: {
      marginBottom: 24,
    },
    skillCategoryTitle: {
      fontSize: 15,
      fontWeight: 'bold',
      color: colors.highlightText,
      marginBottom: 14,
    },
    contactInfo: {
      marginTop: 16,
      marginBottom: 24,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 24,
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    icon: {
      width: 16,
      height: 16,
      color: colors.iconColor,
      marginRight: 0,
    },
    profileLinks: {
      flexDirection: 'row',
      gap: 28,
      marginTop: 20,
      alignItems: 'center',
    },
    profileLink: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginRight: 24,
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: 10,
      marginBottom: 4,
    },
    experienceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 6,
    },
    experienceTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      flex: 1,
      marginRight: 20,
    },
    experienceDate: {
      fontSize: 11,
      color: colors.dateColor,
      fontWeight: 'normal',
      marginTop: 2,
    },
    sectionContent: {
      marginTop: 20,
    },
    link: {
      color: colors.link,
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    card: {
      marginBottom: 20,
      paddingBottom: 20,
      borderBottom: `1.5pt solid ${colors.dividerColor}`,
    },
    lastCard: {
      marginBottom: 0,
      paddingBottom: 0,
      borderBottom: 'none',
    },
    summaryCard: {
      padding: '16 20',
      marginBottom: 20,
      backgroundColor: colors.summaryBg,
      borderRadius: 8,
      border: `1pt solid ${colors.summaryBorder}`,
    },
    highlightText: {
      color: colors.highlightText,
      fontWeight: 'bold',
    },
    sectionContainer: {
      padding: '16 20',
      backgroundColor: colors.cardBg,
      borderRadius: 8,
      border: `1pt solid ${colors.cardBorder}`,
      marginBottom: 24,
    },
  });
};

// Add these type definitions at the top of the file
interface WorkExperience {
  company: string;
  position: string;
  website?: string;
  url?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights: string[];
  keywords?: string[];
}

interface Education {
  institution: string;
  url?: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export function PDFExport({ cvRef, theme }: PDFExportProps) {
  const { cvData } = useCV();
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const styles = useMemo(() => createStyles(theme as "geminiDark" | "chatGPTLight"), [theme]);
  const colors = useMemo(() => themeColors[theme as "geminiDark" | "chatGPTLight"], [theme]);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Create reusable components
  const ContactItem = ({ icon, text }: {
    icon: (color: string) => React.ReactElement,
    text: string
  }) => (
    <View style={styles.contactItem}>
      <View style={styles.icon}>
        {icon(colors.iconColor)}
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );

  const SectionHeader = ({ text }: { text: string }) => (
    <>
      <Text style={styles.subheader}>{text}</Text>
      <View style={styles.subheaderDivider} />
    </>
  );

  // Break down sections into smaller chunks
  const renderExperienceSection = useMemo(() => (
    cvData.work && cvData.work.length > 0 ? (
      <View style={styles.section}>
        <SectionHeader text="Experience" />
        <View style={styles.sectionContainer}>
          <View style={styles.sectionContent}>
            {cvData.work.map((job: WorkExperience, index) => (
              <View key={index} style={{
                ...styles.card,
                ...(index === cvData.work.length - 1 ? styles.lastCard : {})
              }}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.experienceTitle}>{job.position}</Text>
                  <Text style={styles.experienceDate}>
                    {job.startDate} - {job.endDate || 'Present'}
                  </Text>
                </View>
                <View style={styles.company}>
                  <Text style={styles.text}>{job.company}</Text>
                  {job.website && (
                    <Link src={job.website} style={styles.companyLink}>
                      <View style={styles.icon}>{Icons.link(colors.iconColor)}</View>
                    </Link>
                  )}
                </View>
                {job.summary && (
                  <Text style={styles.experienceSummary}>{job.summary}</Text>
                )}
                {job.highlights && job.highlights.length > 0 && (
                  <View style={{ marginTop: 8, marginBottom: job.keywords ? 12 : 0 }}>
                    {job.highlights.map((highlight: string, index: number) => (
                      <View key={index} style={styles.bulletPoint}>
                        <View style={styles.bullet} />
                        <Text style={styles.bulletText}>{highlight}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    ) : null
  ), [styles, colors]);

  const renderSkillsSection = useMemo(() => (
    cvData.skills && cvData.skills.length > 0 ? (
      <View style={styles.section}>
        <SectionHeader text="Skills" />
        <View style={styles.sectionContainer}>
          <View style={styles.sectionContent}>
            {cvData.skills.map((skillGroup) => (
              <View key={skillGroup.name} style={[
                styles.skillCategory,
                { marginBottom: 16 }
              ]}>
                <Text style={styles.skillCategoryTitle}>{skillGroup.name}</Text>
                <View style={styles.flexRow}>
                  {skillGroup.keywords && skillGroup.keywords.map((skill: string, index: number) => (
                    <Text key={index} style={styles.skillTag}>
                      {skill}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    ) : null
  ), [styles]);

  const renderEducationSection = useMemo(() => (
    cvData.education && cvData.education.length > 0 ? (
      <View style={styles.section}>
        <SectionHeader text="Education" />
        <View style={styles.sectionContainer}>
          <View style={styles.sectionContent}>
            {cvData.education.map((edu: Education, index) => (
              <View key={index} style={{
                ...styles.card,
                ...(index === cvData.education.length - 1 ? styles.lastCard : {})
              }}>
                <Text style={styles.title}>{`${edu.studyType} ${edu.area}`}</Text>
                <View style={styles.company}>
                  <Text style={styles.text}>{edu.institution}</Text>
                  {edu.url && (
                    <Link src={edu.url} style={styles.companyLink}>
                      <View style={styles.icon}>{Icons.link(colors.iconColor)}</View>
                    </Link>
                  )}
                </View>
                <Text style={styles.date}>
                  {edu.startDate} - {edu.endDate || 'Present'}
                </Text>
                {edu.description && (
                  <Text style={styles.description}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    ) : null
  ), [styles, colors]);

  // Memoize the document component with chunked sections
  const MyDocument = useMemo(() => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.section}>
          <GradientText
            text={cvData.basics.name}
            colors={colors.headingGradient}
            styles={styles}
          />
          <View style={styles.contactInfo}>
            {cvData.basics.email && (
              <ContactItem icon={Icons.email} text={cvData.basics.email} />
            )}
            {cvData.basics.phone && (
              <ContactItem icon={Icons.phone} text={cvData.basics.phone} />
            )}
            {cvData.basics.location && (
              <ContactItem
                icon={Icons.location}
                text={formatLocation(cvData.basics.location)}
              />
            )}
          </View>
          {cvData.basics.profiles && cvData.basics.profiles.length > 0 && (
            <View style={styles.profileLinks}>
              {cvData.basics.profiles.map((profile, index) => (
                <View key={index} style={styles.profileLink}>
                  <View style={styles.icon}>
                    {Icons.link(colors.iconColor)}
                  </View>
                  <Link src={profile.url} style={styles.link}>
                    {profile.network}
                  </Link>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Summary Section */}
        {cvData.basics.summary && (
          <View style={styles.section}>
            <Text style={styles.subheader}>Summary</Text>
            <View style={styles.summaryCard}>
              <Text style={styles.text}>{cvData.basics.summary}</Text>
            </View>
          </View>
        )}

        {/* Chunked Sections */}
        {renderExperienceSection}
        {renderSkillsSection}
        {renderEducationSection}
      </Page>
    </Document>
  ), [styles, colors, renderExperienceSection, renderSkillsSection, renderEducationSection]);

  const handleExport = async () => {
    setIsGenerating(true);
    setExportSuccess(false);
    try {
      // Use React-PDF's pdf() API to generate and download the PDF
      const blob = await pdf(MyDocument).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${cvData.basics.name || 'cv'}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExportSuccess(true);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Error exporting PDF. Please try again.");
    }
    setIsGenerating(false);
  };

  return (
    <div>
      <Button onClick={handleExport} variant="outline" size="sm" className="w-full sm:w-auto" data-testid="pdf-export-btn">
        <Download className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Export PDF</span>
        <span className="sm:hidden">PDF</span>
      </Button>
      {isGenerating && (
        <div data-testid="export-loading">Generating PDF...</div>
      )}
      {exportSuccess && (
        <div data-testid="export-success" style={{ color: 'green', marginTop: 8 }}>PDF exported successfully!</div>
      )}
    </div>
  );
}


