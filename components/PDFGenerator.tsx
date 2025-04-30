import { Document, Page, Text, View, Link, StyleSheet, pdf } from '@react-pdf/renderer';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

interface PDFGeneratorProps {
  elementId: string;
  filename?: string;
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  link: {
    color: '#2563eb',
    textDecoration: 'underline',
  },
  section: {
    marginBottom: 20,
  },
  experienceItem: {
    marginBottom: 15,
  },
  skillTag: {
    backgroundColor: '#f3f4f6',
    padding: 4,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
    fontSize: 10,
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  projectItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
  },
});

export const PDFGenerator = ({ elementId, filename = 'document.pdf' }: PDFGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    if (isGenerating) return;

    try {
      setIsGenerating(true);
      toast.info('Preparing PDF export...');

      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Element not found');
      }

      // Create a clone of the element
      const clone = element.cloneNode(true) as HTMLElement;
      document.body.appendChild(clone);

      // Extract content
      const name = clone.querySelector('h1')?.textContent || '';
      const title = clone.querySelector('h2')?.textContent || '';
      const summary = clone.querySelector('p')?.textContent || '';
      
      // Extract experience
      const experienceItems = Array.from(clone.querySelectorAll('.experience-item')).map(item => ({
        title: item.querySelector('h3')?.textContent || '',
        company: item.querySelector('h4')?.textContent || '',
        period: item.querySelector('.period')?.textContent || '',
        description: item.querySelector('p')?.textContent || '',
        skills: Array.from(item.querySelectorAll('.skill-tag')).map(tag => tag.textContent || ''),
      }));

      // Extract education
      const educationItems = Array.from(clone.querySelectorAll('.education-item')).map(item => ({
        degree: item.querySelector('h3')?.textContent || '',
        institution: item.querySelector('h4')?.textContent || '',
        period: item.querySelector('.period')?.textContent || '',
        description: item.querySelector('p')?.textContent || '',
      }));

      // Extract skills
      const skills = Array.from(clone.querySelectorAll('.skill-category')).map(category => ({
        title: category.querySelector('h3')?.textContent || '',
        items: Array.from(category.querySelectorAll('.skill-tag')).map(tag => tag.textContent || ''),
      }));

      // Extract projects
      const projects = Array.from(clone.querySelectorAll('.project-item')).map(project => ({
        title: project.querySelector('h3')?.textContent || '',
        description: project.querySelector('p')?.textContent || '',
        skills: Array.from(project.querySelectorAll('.skill-tag')).map(tag => tag.textContent || ''),
      }));

      // Extract certifications
      const certifications = Array.from(clone.querySelectorAll('.certification-item')).map(cert => ({
        title: cert.querySelector('h3')?.textContent || '',
        issuer: cert.querySelector('h4')?.textContent || '',
        year: cert.querySelector('.year')?.textContent || '',
      }));

      // Clean up
      document.body.removeChild(clone);

      // Create PDF document
      const MyDocument = () => (
        <Document>
          <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.section}>
              <Text style={styles.header}>{name}</Text>
              <Text style={styles.subheader}>{title}</Text>
              <Text style={styles.text}>{summary}</Text>
            </View>

            {/* Experience */}
            <View style={styles.section}>
              <Text style={styles.subheader}>Experience</Text>
              {experienceItems.map((item, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.text}>{item.title} - {item.company}</Text>
                  <Text style={styles.text}>{item.period}</Text>
                  <Text style={styles.text}>{item.description}</Text>
                  <View style={styles.skillContainer}>
                    {item.skills.map((skill, skillIndex) => (
                      <Text key={skillIndex} style={styles.skillTag}>{skill}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* Education */}
            <View style={styles.section}>
              <Text style={styles.subheader}>Education</Text>
              {educationItems.map((item, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.text}>{item.degree}</Text>
                  <Text style={styles.text}>{item.institution}</Text>
                  <Text style={styles.text}>{item.period}</Text>
                  <Text style={styles.text}>{item.description}</Text>
                </View>
              ))}
            </View>

            {/* Skills */}
            <View style={styles.section}>
              <Text style={styles.subheader}>Skills</Text>
              {skills.map((category, index) => (
                <View key={index} style={styles.section}>
                  <Text style={styles.text}>{category.title}</Text>
                  <View style={styles.skillContainer}>
                    {category.items.map((skill, skillIndex) => (
                      <Text key={skillIndex} style={styles.skillTag}>{skill}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* Projects */}
            <View style={styles.section}>
              <Text style={styles.subheader}>Projects</Text>
              {projects.map((project, index) => (
                <View key={index} style={styles.projectItem}>
                  <Text style={styles.text}>{project.title}</Text>
                  <Text style={styles.text}>{project.description}</Text>
                  <View style={styles.skillContainer}>
                    {project.skills.map((skill, skillIndex) => (
                      <Text key={skillIndex} style={styles.skillTag}>{skill}</Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* Certifications */}
            <View style={styles.section}>
              <Text style={styles.subheader}>Certifications</Text>
              {certifications.map((cert, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.text}>{cert.title}</Text>
                  <Text style={styles.text}>{cert.issuer}</Text>
                  <Text style={styles.text}>{cert.year}</Text>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      );

      // Generate PDF blob
      const blob = await pdf(<MyDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      
      // Download PDF
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);

      toast.success('PDF exported successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleGeneratePDF}
      disabled={isGenerating}
      variant="outline"
      className="flex items-center gap-2"
    >
      {isGenerating ? (
        <>
          <span className="animate-spin">⌛</span>
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Export PDF
        </>
      )}
    </Button>
  );
}; 