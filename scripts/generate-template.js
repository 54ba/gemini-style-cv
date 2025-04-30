const { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType } = require('docx');

// Color schemes for different themes
const colorSchemes = {
    geminiDark: {
        heading: "8AB4F8",    // Light blue for headings
        text: "E0E0E0",      // Light gray for text
        background: "1E1E1E", // Dark background
        accent: "C58AF9",    // Purple accent
        secondary: "A8C7FA", // Light blue for secondary text
        cardBg: "2D2D2D",   // Card background
        cardBorder: "3D3D3D", // Card border
        listText: "C2C2C2",  // Light gray for list items
        footerText: "9AA0A6", // Gray for footer text
        shadow: "000000",    // Black for shadows
        containerBg: "2B2B2B" // Container background
    },
    chatGPTLight: {
        heading: "10A37F",    // ChatGPT green for headings
        text: "333333",      // Dark gray for text
        background: "FFFFFF", // White background
        accent: "10A37F",    // ChatGPT green accent
        secondary: "666666", // Medium gray for secondary text
        cardBg: "F7F7F7",   // Light gray card background
        cardBorder: "E5E5E5", // Light gray card border
        listText: "444444",  // Dark gray for list items
        footerText: "666666", // Medium gray for footer text
        shadow: "E5E5E5",    // Light gray for shadows
        containerBg: "F7F7F7" // Light gray container background
    }
};

// Icons for different sections
const icons = {
    summary: "✨",
    experience: "💼",
    education: "🎓",
    skills: "🛠️",
    projects: "🚀",
    certificates: "🏆",
    contact: {
        phone: "📱",
        email: "📧",
        linkedin: "🔗",
        github: "💻",
        portfolio: "🌐"
    }
};

async function generateTemplate(theme = 'geminiDark') {
    const colors = colorSchemes[theme];
    const outputFile = theme === 'geminiDark' ? 'public/cv-template-gemini-dark.docx' : 'public/cv-template-chatgpt-light.docx';

    console.log(`Generating ${theme} template with colors:`, colors);

    const doc = new Document({
        background: {
            color: colors.background,
        },
        styles: {
            default: {
                document: {
                    run: {
                        font: "Calibri",
                        size: 24,
                        color: colors.text,
                    },
                    paragraph: {
                        spacing: { line: 276, before: 200, after: 200 },
                    },
                },
            },
            paragraphStyles: [
                {
                    id: "Normal",
                    name: "Normal",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        color: colors.text,
                        size: 24,
                        font: "Calibri"
                    },
                    paragraph: {
                        spacing: {
                            line: 276,
                            before: 200,
                            after: 200
                        }
                    }
                },
                {
                    id: "Container",
                    name: "Container",
                    basedOn: "Normal",
                    run: {
                        color: colors.text
                    },
                    paragraph: {
                        spacing: {
                            line: 276,
                            before: 200,
                            after: 200
                        },
                        shading: {
                            type: ShadingType.SOLID,
                            color: colors.containerBg,
                            fill: colors.containerBg
                        },
                        margins: {
                            top: 40,
                            bottom: 40,
                            left: 40,
                            right: 40
                        },
                        indent: {
                            left: 40,
                            right: 40
                        },
                        border: {
                            top: { style: BorderStyle.SINGLE, size: 1, color: colors.cardBorder },
                            bottom: { style: BorderStyle.SINGLE, size: 1, color: colors.cardBorder },
                            left: { style: BorderStyle.SINGLE, size: 1, color: colors.cardBorder },
                            right: { style: BorderStyle.SINGLE, size: 1, color: colors.cardBorder }
                        }
                    }
                },
                {
                    id: "Card",
                    name: "Card",
                    basedOn: "Normal",
                    run: {
                        color: colors.text
                    },
                    paragraph: {
                        spacing: {
                            line: 276,
                            before: 200,
                            after: 200
                        },
                        shading: {
                            type: ShadingType.SOLID,
                            color: colors.cardBg,
                            fill: colors.cardBg
                        },
                        border: {
                            top: { style: BorderStyle.SINGLE, size: 1, color: colors.cardBorder },
                            bottom: { style: BorderStyle.SINGLE, size: 1, color: colors.cardBorder },
                            left: { style: BorderStyle.SINGLE, size: 1, color: colors.cardBorder },
                            right: { style: BorderStyle.SINGLE, size: 1, color: colors.cardBorder }
                        },
                        margins: {
                            top: 20,
                            bottom: 20,
                            left: 240,
                            right: 240
                        },
                        indent: {
                            left: 240,
                            right: 240
                        }
                    }
                },
                {
                    id: "SkillsCard",
                    name: "Skills Card",
                    basedOn: "Card",
                    quickFormat: true,
                    run: {
                        color: colors.text,
                    },
                    paragraph: {
                        spacing: { line: 276, before: 100, after: 100 },
                        margins: {
                            top: 10,
                            bottom: 10,
                            left: 120,
                            right: 120,
                        },
                        indent: {
                            left: 120,
                            right: 120,
                        },
                        shading: {
                            type: ShadingType.SOLID,
                            color: colors.cardBg,
                            fill: colors.cardBg
                        },
                        border: {
                            top: { style: BorderStyle.SINGLE, size: 1, color: colors.cardBorder },
                            bottom: { style: BorderStyle.SINGLE, size: 1, color: colors.cardBorder },
                            left: { style: BorderStyle.SINGLE, size: 1, color: colors.cardBorder },
                            right: { style: BorderStyle.SINGLE, size: 1, color: colors.cardBorder }
                        }
                    },
                },
                {
                    id: "ListParagraph",
                    name: "List Paragraph",
                    basedOn: "Normal",
                    run: {
                        color: colors.listText
                    },
                    paragraph: {
                        spacing: {
                            line: 276,
                            before: 100,
                            after: 100
                        },
                        indent: {
                            left: 360,
                            hanging: 360
                        }
                    }
                },
                {
                    id: "Keywords",
                    name: "Keywords",
                    basedOn: "Normal",
                    run: {
                        color: colors.secondary,
                        size: 22,
                        italics: true
                    },
                    paragraph: {
                        spacing: {
                            line: 276,
                            before: 100,
                            after: 200
                        }
                    }
                },
                {
                    id: "Heading1",
                    name: "Heading 1",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        color: colors.heading,
                        size: 36,
                        bold: true
                    },
                    paragraph: {
                        spacing: {
                            before: 240,
                            after: 120
                        },
                        alignment: AlignmentType.CENTER
                    }
                },
                {
                    id: "Heading2",
                    name: "Heading 2",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        color: colors.accent,
                        size: 30,
                        bold: true
                    },
                    paragraph: {
                        spacing: {
                            before: 240,
                            after: 120
                        }
                    }
                },
                {
                    id: "Heading3",
                    name: "Heading 3",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        color: colors.secondary,
                        size: 26,
                        bold: true
                    },
                    paragraph: {
                        spacing: {
                            before: 200,
                            after: 100
                        }
                    }
                },
                {
                    id: "Footer",
                    name: "Footer",
                    basedOn: "Normal",
                    run: {
                        color: colors.footerText,
                        size: 22
                    },
                    paragraph: {
                        spacing: {
                            before: 400,
                            after: 200
                        },
                        alignment: AlignmentType.CENTER
                    }
                },
                {
                    id: "Link",
                    name: "Link",
                    basedOn: "Normal",
                    run: {
                        color: colors.accent,
                        underline: true
                    },
                    paragraph: {
                        spacing: {
                            line: 276,
                            before: 100,
                            after: 100
                        }
                    }
                },
                {
                    id: "ContactInfo",
                    name: "Contact Info",
                    basedOn: "Normal",
                    run: {
                        color: colors.text,
                        size: 22
                    },
                    paragraph: {
                        spacing: {
                            line: 276,
                            before: 100,
                            after: 100
                        },
                        alignment: AlignmentType.CENTER
                    }
                }
            ],
        },
        sections: [{
            properties: {
                page: {
                    margin: {
                        top: 1440,
                        right: 1440,
                        bottom: 1440,
                        left: 1440,
                    },
                    background: {
                        color: colors.background,
                    },
                },
            },
            children: [
                // Header section with enhanced contact info
                new Paragraph({
                    text: "{name}",
                    style: "Heading1",
                }),
                new Paragraph({
                    text: "{title}",
                    style: "Heading2",
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: icons.contact.phone + " ",
                            color: colors.accent,
                        }),
                        new TextRun({
                            text: "{phone}",
                            color: colors.text,
                        }),
                        new TextRun({
                            text: " • ",
                            color: colors.text,
                        }),
                        new TextRun({
                            text: icons.contact.email + " ",
                            color: colors.accent,
                        }),
                        new TextRun({
                            text: "{email}",
                            color: colors.text,
                        }),
                    ],
                    style: "ContactInfo",
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: icons.contact.linkedin + " ",
                            color: colors.accent,
                        }),
                        new TextRun({
                            text: "LinkedIn",
                            color: colors.accent,
                            style: "Link",
                            link: {
                                url: "{linkedin}"
                            }
                        }),
                        new TextRun({
                            text: " • ",
                            color: colors.text,
                        }),
                        new TextRun({
                            text: icons.contact.github + " ",
                            color: colors.accent,
                        }),
                        new TextRun({
                            text: "GitHub",
                            color: colors.accent,
                            style: "Link",
                            link: {
                                url: "{github}"
                            }
                        }),
                        new TextRun({
                            text: " • ",
                            color: colors.text,
                        }),
                        new TextRun({
                            text: icons.contact.portfolio + " ",
                            color: colors.accent,
                        }),
                        new TextRun({
                            text: "Portfolio",
                            color: colors.accent,
                            style: "Link",
                            link: {
                                url: "{portfolio}"
                            }
                        }),
                    ],
                    style: "ContactInfo",
                }),

                // Summary section with container
                new Paragraph({
                    children: [
                        new TextRun({
                            text: icons.summary + " ",
                            color: colors.accent,
                        }),
                        new TextRun({
                            text: "Summary",
                            color: colors.accent,
                            bold: true,
                        }),
                    ],
                    style: "Heading2",
                }),
                new Paragraph({
                    text: "{summary}",
                    style: "Container",
                }),

                // Experience section with container
                new Paragraph({
                    children: [
                        new TextRun({
                            text: icons.experience + " ",
                            color: colors.accent,
                        }),
                        new TextRun({
                            text: "Experience",
                            color: colors.accent,
                            bold: true,
                        }),
                    ],
                    style: "Heading2",
                }),
                new Paragraph({
                    text: "{#work}",
                    style: "Container",
                }),
                new Paragraph({
                    text: "{position}",
                    style: "Heading3",
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "{company}",
                            bold: true,
                            color: colors.text,
                        }),
                        new TextRun({
                            text: " | {startDate} - {endDate}",
                            italics: true,
                            color: colors.secondary,
                        }),
                    ],
                    style: "Card",
                }),
                new Paragraph({
                    text: "{#highlights}",
                    style: "Normal",
                }),
                new Paragraph({
                    text: "• {.}",
                    style: "ListParagraph",
                }),
                new Paragraph({
                    text: "{/highlights}",
                    style: "Normal",
                }),
                new Paragraph({
                    text: "{keywords}",
                    style: "Keywords",
                }),
                new Paragraph({
                    text: "{/work}",
                    style: "Container",
                }),

                // Education section with container
                new Paragraph({
                    children: [
                        new TextRun({
                            text: icons.education + " ",
                            color: colors.accent,
                        }),
                        new TextRun({
                            text: "Education",
                            color: colors.accent,
                            bold: true,
                        }),
                    ],
                    style: "Heading2",
                }),
                new Paragraph({
                    text: "{#education}",
                    style: "Container",
                }),
                new Paragraph({
                    text: "{studyType} {area}",
                    style: "Heading3",
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "{institution}",
                            bold: true,
                            color: colors.text,
                        }),
                        new TextRun({
                            text: " | {startDate} - {endDate}",
                            italics: true,
                            color: colors.secondary,
                        }),
                    ],
                    style: "Card",
                }),
                new Paragraph({
                    text: "{description}",
                    style: "Normal",
                }),
                new Paragraph({
                    text: "{/education}",
                    style: "Container",
                }),

                // Skills section with container
                new Paragraph({
                    children: [
                        new TextRun({
                            text: icons.skills + " ",
                            color: colors.accent,
                        }),
                        new TextRun({
                            text: "Skills",
                            color: colors.accent,
                            bold: true,
                        }),
                    ],
                    style: "Heading2",
                }),
                new Paragraph({
                    text: "{#skills}",
                    style: "Container",
                }),
                new Paragraph({
                    text: "{name}",
                    style: "Heading3",
                }),
                new Paragraph({
                    text: "{keywords}",
                    style: "SkillsCard",
                }),
                new Paragraph({
                    text: "{/skills}",
                    style: "Container",
                }),

                // Projects section with container
                new Paragraph({
                    children: [
                        new TextRun({
                            text: icons.projects + " ",
                            color: colors.accent,
                        }),
                        new TextRun({
                            text: "Projects",
                            color: colors.accent,
                            bold: true,
                        }),
                    ],
                    style: "Heading2",
                }),
                new Paragraph({
                    text: "{#projects}",
                    style: "Container",
                }),
                new Paragraph({
                    text: "{name}",
                    style: "Heading3",
                }),
                new Paragraph({
                    text: "{description}",
                    style: "Card",
                }),
                new Paragraph({
                    text: "{keywords}",
                    style: "Keywords",
                }),
                new Paragraph({
                    text: "{/projects}",
                    style: "Container",
                }),

                // Certifications section with container
                new Paragraph({
                    children: [
                        new TextRun({
                            text: icons.certificates + " ",
                            color: colors.accent,
                        }),
                        new TextRun({
                            text: "Certifications",
                            color: colors.accent,
                            bold: true,
                        }),
                    ],
                    style: "Heading2",
                }),
                new Paragraph({
                    text: "{#certificates}",
                    style: "Container",
                }),
                new Paragraph({
                    text: "{name}",
                    style: "Heading3",
                }),
                new Paragraph({
                    text: "{issuer}",
                    style: "Card",
                }),
                new Paragraph({
                    text: "{/certificates}",
                    style: "Container",
                }),

                // Footer
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Made with 💜 by ",
                            color: colors.footerText,
                        }),
                        new TextRun({
                            text: "{name}",
                            color: colors.footerText,
                        }),
                        new TextRun({
                            text: " • Last updated: ",
                            color: colors.footerText,
                        }),
                        new TextRun({
                            text: "{lastUpdated}",
                            color: colors.footerText,
                        }),
                    ],
                    style: "Footer",
                }),
            ],
        }],
    });

    console.log("Document created with styles:", doc.styles);

    // Generate the document
    const buffer = await Packer.toBuffer(doc);
    require('fs').writeFileSync(outputFile, buffer);
    console.log(`Template generated successfully: ${outputFile}`);
}

// Generate both templates
async function generateAllTemplates() {
    await generateTemplate('geminiDark');
    await generateTemplate('chatGPTLight');
}

generateAllTemplates().catch(console.error); 