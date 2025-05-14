import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react"
import type { CVData } from "@/types/cv-types"
import { EditableField } from "./EditableField"
import { useCV } from "@/contexts/CVContext"

// ChatGPT Style CV Design
export function ChatGptCvDesign() {
  const { cvData } = useCV()
  const { basics, work, education, skills, projects } = cvData

  return (
    <div className="bg-white text-gray-800 font-sans rounded-xl shadow-lg border border-gray-200 p-6 md:p-8 dark:bg-white dark:text-gray-800 dark:border-gray-200">
      <div className="space-y-6">
        {/* Header with name and title */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              <EditableField value={basics.name} path={["basics", "name"]} className="inline-block" />
            </h1>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-md border-gray-300 hover:bg-gray-100 text-gray-700"
              >
                <Link href={basics.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-5 w-5" />
                  <span className="sr-only">Portfolio</span>
                </Link>
              </Button>
              {basics.profiles.map((profile) => (
                <Button
                  key={profile.network}
                  variant="outline"
                  size="icon"
                  className="rounded-md border-gray-300 hover:bg-gray-100 text-gray-700"
                >
                  <Link href={profile.url} target="_blank" rel="noopener noreferrer">
                    {profile.network === "GitHub" && <Github className="h-5 w-5" />}
                    {profile.network === "LinkedIn" && <Linkedin className="h-5 w-5" />}
                    <span className="sr-only">{profile.network}</span>
                  </Link>
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                className="rounded-md border-gray-300 hover:bg-gray-100 text-gray-700"
              >
                <Link href={`mailto:${basics.email}`}>
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-medium text-emerald-600">
            <EditableField value={basics.label} path={["basics", "label"]} className="inline-block" />
          </h2>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <EditableField 
              value={`${basics.location.city}, ${basics.location.region}`} 
              path={["basics", "location", "city"]} 
              className="inline-block" 
            />
            <span className="mx-2">•</span>
            <EditableField value={basics.email} path={["basics", "email"]} className="text-emerald-600 hover:underline" />
          </div>
        </div>

        {/* Summary section */}
        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-900">Summary</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 leading-relaxed pt-0 card-content">
            <EditableField 
              value={basics.summary} 
              path={["basics", "summary"]} 
              multiline={true} 
              className="block w-full" 
            />
          </CardContent>
        </Card>

        {/* Experience section */}
        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-900">Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-0">
            {work.map((job, index) => (
              <div key={`${job.company}-${index}`}>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        <EditableField 
                          value={job.position} 
                          path={["work", index.toString(), "position"]} 
                          className="inline-block" 
                        />
                      </h3>
                      {job.website ? (
                        <Link
                          href={job.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-emerald-600 hover:underline flex items-center"
                        >
                          <EditableField 
                            value={job.company} 
                            path={["work", index.toString(), "company"]} 
                            className="inline-block" 
                          />
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </Link>
                      ) : (
                        <h4 className="text-gray-700">
                          <EditableField 
                            value={job.company} 
                            path={["work", index.toString(), "company"]} 
                            className="inline-block" 
                          />
                        </h4>
                      )}
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                      <EditableField 
                        value={`${job.startDate} - ${job.endDate || "Present"}`} 
                        path={["work", index.toString(), "startDate"]} 
                        className="inline-block" 
                      />
                    </Badge>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 pl-1">
                    {job.highlights.map((highlight, i) => (
                      <li key={i}>
                        <EditableField 
                          value={highlight} 
                          path={["work", index.toString(), "highlights", i.toString()]} 
                          className="inline-block ml-2" 
                        />
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {job.keywords?.map((keyword, i) => (
                      <Badge key={i} variant="outline" className="border-gray-300 text-gray-700">
                        <EditableField 
                          value={keyword} 
                          path={["work", index.toString(), "keywords", i.toString()]} 
                          className="inline-block" 
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
                {index < work.length - 1 && <Separator className="bg-gray-200 my-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education section */}
        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-900">Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      <EditableField 
                        value={`${edu.studyType} ${edu.area}`} 
                        path={["education", index.toString(), "area"]} 
                        className="inline-block" 
                      />
                    </h3>
                    <h4 className="text-gray-700">
                      <EditableField 
                        value={edu.institution} 
                        path={["education", index.toString(), "institution"]} 
                        className="inline-block" 
                      />
                    </h4>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                    <EditableField 
                      value={`${edu.startDate} - ${edu.endDate}`} 
                      path={["education", index.toString(), "startDate"]} 
                      className="inline-block" 
                    />
                  </Badge>
                </div>
                {edu.description && (
                  <div className="text-gray-700 mt-2">
                    <EditableField 
                      value={edu.description} 
                      path={["education", index.toString(), "description"]} 
                      className="inline-block" 
                    />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills section */}
        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-900">Skills</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skillGroup, index) => (
                <div key={index}>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    <EditableField 
                      value={skillGroup.name} 
                      path={["skills", index.toString(), "name"]} 
                      className="inline-block" 
                    />
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.keywords.map((skill, i) => (
                      <Badge
                        key={i}
                        className={
                          index % 2 === 0
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }
                      >
                        <EditableField 
                          value={skill} 
                          path={["skills", index.toString(), "keywords", i.toString()]} 
                          className="inline-block" 
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Projects section */}
        {projects && projects.length > 0 && (
          <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900">
                <span className="mr-2">🚀</span> Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {projects.map((project, index) => (
                <div key={index}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gray-900">
                        <EditableField 
                          value={project.name} 
                          path={["projects", index.toString(), "name"]} 
                          className="inline-block" 
                        />
                      </h3>
                      {project.url && (
                        <Link
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 hover:underline"
                        >
                          {project.url.includes("github") ? (
                            <>
                              <Github className="h-4 w-4 mr-1" />
                              View Code
                            </>
                          ) : (
                            <>
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Live Demo
                            </>
                          )}
                        </Link>
                      )}
                    </div>
                    <div className="text-gray-700">
                      <EditableField 
                        value={project.description} 
                        path={["projects", index.toString(), "description"]} 
                        multiline={true}
                        className="inline-block" 
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.keywords?.map((keyword, i) => (
                        <Badge key={i} variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
                          <EditableField 
                            value={keyword} 
                            path={["projects", index.toString(), "keywords", i.toString()]} 
                            className="inline-block" 
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {index < (projects?.length ?? 0) - 1 && <Separator className="bg-gray-200 my-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

// Gemini Dark Mode Style CV Design
export function GeminiCvDesign() {
  const { cvData } = useCV();
  const { basics, work, education, skills, projects, certificates } = cvData;

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#e0e0e0] font-sans p-6 md:p-8 rounded-xl">
      <div className="space-y-8">
        {/* Header with name and title */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#8ab4f8] to-[#c58af9] bg-clip-text text-transparent">
              <EditableField value={basics.name} path={["basics", "name"]} className="inline-block" />
            </h1>
            <div className="flex items-center gap-2">
              <Link
                href={basics.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-[#8ab4f8] text-[#8ab4f8] hover:bg-[#8ab4f8]/10"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">Portfolio</span>
              </Link>
              {basics.profiles.map((profile) => (
                profile.network && (profile.network === "GitHub" || profile.network === "LinkedIn") && (
                  <Link
                    key={profile.network}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-[#8ab4f8] text-[#8ab4f8] hover:bg-[#8ab4f8]/10"
                  >
                    {profile.network === "GitHub" && <Github className="h-4 w-4" />}
                    {profile.network === "LinkedIn" && <Linkedin className="h-4 w-4" />}
                    <span className="sr-only">{profile.network}</span>
                  </Link>
                )
              ))}
              <Link
                href={`mailto:${basics.email}`}
                className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-[#8ab4f8] text-[#8ab4f8] hover:bg-[#8ab4f8]/10"
              >
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-medium text-[#a8c7fa]">
            <EditableField value={basics.label} path={["basics", "label"]} className="inline-block" />
          </h2>
          <div className="flex items-center text-[#9aa0a6] mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <EditableField 
              value={`${basics.location.city}, ${basics.location.region}`} 
              path={["basics", "location", "city"]} 
              className="inline-block" 
            />
            <span className="mx-2">•</span>
            <EditableField 
              value={basics.email} 
              path={["basics", "email"]} 
              className="text-[#8ab4f8] hover:underline" 
            />
          </div>
        </div>

        {/* Summary section */}
        <Card className="bg-[#2d2d2d] border-[#3d3d3d] shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-[#e0e0e0]">
              <span className="mr-2 bg-gradient-to-r from-[#8ab4f8] to-[#c58af9] bg-clip-text text-transparent">✨ Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-[#c2c2c2] leading-relaxed card-content">
            <EditableField 
              value={basics.summary} 
              path={["basics", "summary"]} 
              multiline={true}
              className="block w-full" 
            />
          </CardContent>
        </Card>

        {/* Experience section */}
        <Card className="bg-[#2d2d2d] border-[#3d3d3d] shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-[#e0e0e0]">
              <span className="mr-2 bg-gradient-to-r from-[#8ab4f8] to-[#c58af9] bg-clip-text text-transparent">💼 Experience</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {work.map((job, index) => (
              <div key={`${job.company}-${index}`}>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-[#8ab4f8]">
                        <EditableField 
                          value={job.position} 
                          path={["work", index.toString(), "position"]} 
                          className="inline-block" 
                        />
                      </h3>
                      {job.website ? (
                        <Link
                          href={job.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#c58af9] hover:text-[#8ab4f8] hover:underline flex items-center"
                        >
                          <EditableField 
                            value={job.company} 
                            path={["work", index.toString(), "company"]} 
                            className="inline-block" 
                          />
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </Link>
                      ) : (
                        <h4 className="text-[#c58af9]">
                          <EditableField 
                            value={job.company} 
                            path={["work", index.toString(), "company"]} 
                            className="inline-block" 
                          />
                        </h4>
                      )}
                    </div>
                    <Badge className="bg-[#3d3d3d] text-[#8ab4f8] hover:bg-[#4d4d4d]">
                      <EditableField 
                        value={`${job.startDate} - ${job.endDate || "Present"}`} 
                        path={["work", index.toString(), "startDate"]} 
                        className="inline-block" 
                      />
                    </Badge>
                  </div>
                  <ul className="list-disc list-inside text-[#c2c2c2] space-y-1 pl-1">
                    {job.highlights.map((highlight, i) => (
                      <li key={i}>
                        <EditableField 
                          value={highlight} 
                          path={["work", index.toString(), "highlights", i.toString()]} 
                          className="inline-block ml-2" 
                        />
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {job.keywords?.map((keyword, i) => (
                      <Badge 
                        key={i} 
                        variant="outline" 
                        className="bg-[#3d3d3d] text-[#c58af9] border-[#4d4d4d] hover:bg-[#4d4d4d] hover:border-[#5d5d5d]"
                      >
                        <EditableField 
                          value={keyword} 
                          path={["work", index.toString(), "keywords", i.toString()]} 
                          className="inline-block" 
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
                {index < work.length - 1 && <Separator className="bg-[#3d3d3d] my-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Projects section */}
        {projects && projects.length > 0 && (
          <Card className="bg-[#2d2d2d] border-[#3d3d3d] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-[#e0e0e0]">
                <span className="mr-2 bg-gradient-to-r from-[#8ab4f8] to-[#c58af9] bg-clip-text text-transparent">🚀 Projects</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {projects.map((project, index) => (
                <div key={index}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-[#8ab4f8]">
                        <EditableField 
                          value={project.name} 
                          path={["projects", index.toString(), "name"]} 
                          className="inline-block" 
                        />
                      </h3>
                      {project.url && (
                        <Link
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-[#c58af9] hover:text-[#8ab4f8] hover:underline"
                        >
                          {project.url.includes("github") ? (
                            <>
                              <Github className="h-4 w-4 mr-1" />
                              View Code
                            </>
                          ) : (
                            <>
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Live Demo
                            </>
                          )}
                        </Link>
                      )}
                    </div>
                    <div className="text-[#c2c2c2]">
                      <EditableField 
                        value={project.description} 
                        path={["projects", index.toString(), "description"]} 
                        multiline={true}
                        className="inline-block" 
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.keywords?.map((keyword, i) => (
                        <Badge 
                          key={i} 
                          variant="outline" 
                          className="bg-[#3d3d3d] text-[#c58af9] border-[#4d4d4d] hover:bg-[#4d4d4d] hover:border-[#5d5d5d]"
                        >
                          <EditableField 
                            value={keyword} 
                            path={["projects", index.toString(), "keywords", i.toString()]} 
                            className="inline-block" 
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {index < (projects?.length ?? 0) - 1 && <Separator className="bg-[#3d3d3d] my-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Certifications section */}
        {certificates && certificates.length > 0 && (
          <Card className="bg-[#2d2d2d] border-[#3d3d3d] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-[#e0e0e0]">
                <span className="mr-2 bg-gradient-to-r from-[#8ab4f8] to-[#c58af9] bg-clip-text text-transparent">🏆 Certifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {certificates.map((cert, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-[#8ab4f8]">
                      <EditableField 
                        value={cert.name} 
                        path={["certificates", index.toString(), "name"]} 
                        className="inline-block" 
                      />
                    </h3>
                    <div className="text-[#c2c2c2]">
                      <EditableField 
                        value={cert.issuer} 
                        path={["certificates", index.toString(), "issuer"]} 
                        className="inline-block" 
                      />
                    </div>
                  </div>
                  <Badge className="bg-[#3d3d3d] text-[#8ab4f8] hover:bg-[#4d4d4d]">
                    <EditableField 
                      value={cert.date} 
                      path={["certificates", index.toString(), "date"]} 
                      className="inline-block" 
                    />
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <footer className="text-center text-[#9aa0a6] py-4">
          <p>
            Made with <span className="bg-gradient-to-r from-[#8ab4f8] to-[#c58af9] bg-clip-text text-transparent">💜</span> by {basics.name} • Last updated:{" "}
            {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        </footer>
      </div>
    </div>
  )
}
