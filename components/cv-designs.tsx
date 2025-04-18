import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Github, Linkedin, Mail, MapPin, Twitter } from "lucide-react"
import type { CVData } from "@/types/cv-types"

// ChatGPT Style CV Design
export function ChatGptCvDesign({ data }: { data: CVData }) {
  return (
    <div className="bg-white text-gray-800 font-sans rounded-xl shadow-lg border border-gray-200 p-6 md:p-8">
      <div className="space-y-6">
        {/* Header with name and title */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{data.basics.name}</h1>
            <div className="flex space-x-2">
              {data.basics.profiles.map((profile) => (
                <Button
                  key={profile.network}
                  variant="outline"
                  size="icon"
                  className="rounded-md border-gray-300 hover:bg-gray-100 text-gray-700"
                >
                  <Link href={profile.url} target="_blank" rel="noopener noreferrer">
                    {profile.network === "GitHub" && <Github className="h-5 w-5" />}
                    {profile.network === "LinkedIn" && <Linkedin className="h-5 w-5" />}
                    {profile.network === "Twitter" && <Twitter className="h-5 w-5" />}
                    <span className="sr-only">{profile.network}</span>
                  </Link>
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                className="rounded-md border-gray-300 hover:bg-gray-100 text-gray-700"
              >
                <Link href={`mailto:${data.basics.email}`}>
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-medium text-emerald-600">{data.basics.label}</h2>
          <div className="flex items-center text-gray-600 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{`${data.basics.location.city}, ${data.basics.location.region}`}</span>
            <span className="mx-2">•</span>
            <Link href={`mailto:${data.basics.email}`} className="text-emerald-600 hover:underline">
              {data.basics.email}
            </Link>
          </div>
        </div>

        {/* Summary section */}
        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-900">Summary</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 leading-relaxed pt-0 card-content">
            <p>{data.basics.summary}</p>
          </CardContent>
        </Card>

        {/* Experience section */}
        <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-900">Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-0">
            {data.work.map((job, index) => (
              <div key={`${job.company}-${index}`}>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{job.position}</h3>
                      <h4 className="text-gray-700">{job.company}</h4>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                      {job.startDate} - {job.endDate || "Present"}
                    </Badge>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 pl-1">
                    {job.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {job.keywords?.map((keyword, i) => (
                      <Badge key={i} variant="outline" className="border-gray-300 text-gray-700">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                {index < data.work.length - 1 && <Separator className="bg-gray-200 my-4" />}
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
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {edu.studyType} {edu.area}
                    </h3>
                    <h4 className="text-gray-700">{edu.institution}</h4>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                    {edu.startDate} - {edu.endDate}
                  </Badge>
                </div>
                {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
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
              {data.skills.map((skillGroup, index) => (
                <div key={index}>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{skillGroup.name}</h3>
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
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Projects section */}
        {data.projects && data.projects.length > 0 && (
          <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-900">Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              {data.projects.map((project, index) => (
                <div key={index}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                      {project.url && (
                        <Link
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-emerald-600 hover:underline"
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
                    <p className="text-gray-700">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.keywords?.map((keyword, i) => (
                        <Badge key={i} variant="outline" className="border-gray-300 text-gray-700">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {index < data.projects.length - 1 && <Separator className="bg-gray-200 my-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Certifications section */}
        {data.certificates && data.certificates.length > 0 && (
          <Card className="border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-900">Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              {data.certificates.map((cert, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">{cert.name}</h3>
                    <p className="text-gray-700">{cert.issuer}</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">{cert.date}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <footer className="text-center text-gray-600 py-4">
          <p>
            Made with 💚 by {data.basics.name} • Last updated:{" "}
            {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        </footer>
      </div>
    </div>
  )
}

// Gemini Dark Mode Style CV Design
export function GeminiCvDesign({ data }: { data: CVData }) {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#e0e0e0] font-sans p-6 md:p-8 rounded-xl">
      <div className="space-y-8">
        {/* Header with name and title */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#8ab4f8] to-[#c58af9] bg-clip-text text-transparent">
              {data.basics.name}
            </h1>
            <div className="flex space-x-2">
              {data.basics.profiles.map((profile) => (
                <Button
                  key={profile.network}
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-[#2d2d2d] border-[#3d3d3d] hover:bg-[#3d3d3d]"
                >
                  <Link href={profile.url} target="_blank" rel="noopener noreferrer">
                    {profile.network === "GitHub" && <Github className="h-5 w-5 text-[#c58af9]" />}
                    {profile.network === "LinkedIn" && <Linkedin className="h-5 w-5 text-[#8ab4f8]" />}
                    {profile.network === "Twitter" && <Twitter className="h-5 w-5 text-[#8ab4f8]" />}
                    <span className="sr-only">{profile.network}</span>
                  </Link>
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-[#2d2d2d] border-[#3d3d3d] hover:bg-[#3d3d3d]"
              >
                <Link href={`mailto:${data.basics.email}`}>
                  <Mail className="h-5 w-5 text-[#c58af9]" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-medium text-[#a8c7fa]">{data.basics.label}</h2>
          <div className="flex items-center text-[#9aa0a6] mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{`${data.basics.location.city}, ${data.basics.location.region}`}</span>
            <span className="mx-2">•</span>
            <Link href={`mailto:${data.basics.email}`} className="text-[#8ab4f8] hover:underline">
              {data.basics.email}
            </Link>
          </div>
        </div>

        {/* Summary section */}
        <Card className="bg-[#2d2d2d] border-[#3d3d3d] shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-[#e0e0e0]">
              <span className="mr-2">✨</span> Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="text-[#c2c2c2] leading-relaxed card-content">
            <p>{data.basics.summary}</p>
          </CardContent>
        </Card>

        {/* Experience section */}
        <Card className="bg-[#2d2d2d] border-[#3d3d3d] shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-[#e0e0e0]">
              <span className="mr-2">💼</span> Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.work.map((job, index) => (
              <div key={`${job.company}-${index}`}>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-[#a8c7fa]">{job.position}</h3>
                      <h4 className="text-[#e0e0e0]">{job.company}</h4>
                    </div>
                    <Badge className="bg-[#3d3d3d] text-[#a8c7fa] hover:bg-[#4d4d4d]">
                      {job.startDate} - {job.endDate || "Present"}
                    </Badge>
                  </div>
                  <ul className="list-disc list-inside text-[#c2c2c2] space-y-1 pl-1">
                    {job.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {job.keywords?.map((keyword, i) => (
                      <Badge key={i} variant="outline" className="bg-[#3d3d3d] text-[#c58af9] border-[#4d4d4d]">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                {index < data.work.length - 1 && <Separator className="bg-[#3d3d3d] my-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education section */}
        <Card className="bg-[#2d2d2d] border-[#3d3d3d] shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-[#e0e0e0]">
              <span className="mr-2">🎓</span> Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-[#a8c7fa]">
                      {edu.studyType} {edu.area}
                    </h3>
                    <h4 className="text-[#e0e0e0]">{edu.institution}</h4>
                  </div>
                  <Badge className="bg-[#3d3d3d] text-[#a8c7fa] hover:bg-[#4d4d4d]">
                    {edu.startDate} - {edu.endDate}
                  </Badge>
                </div>
                {edu.description && <p className="text-[#c2c2c2] mt-2">{edu.description}</p>}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills section */}
        <Card className="bg-[#2d2d2d] border-[#3d3d3d] shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-[#e0e0e0]">
              <span className="mr-2">🛠️</span> Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.skills.map((skillGroup, index) => (
                <div key={index}>
                  <h3 className="text-lg font-medium text-[#a8c7fa] mb-2">{skillGroup.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.keywords.map((skill, i) => (
                      <Badge
                        key={i}
                        className={
                          index % 2 === 0
                            ? "bg-[#3d3d3d] text-[#c58af9] hover:bg-[#4d4d4d]"
                            : "bg-[#3d3d3d] text-[#8ab4f8] hover:bg-[#4d4d4d]"
                        }
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Projects section */}
        {data.projects && data.projects.length > 0 && (
          <Card className="bg-[#2d2d2d] border-[#3d3d3d] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-[#e0e0e0]">
                <span className="mr-2">🚀</span> Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.projects.map((project, index) => (
                <div key={index}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-[#a8c7fa]">{project.name}</h3>
                      {project.url && (
                        <Link
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-[#8ab4f8] hover:underline"
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
                    <p className="text-[#c2c2c2]">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.keywords?.map((keyword, i) => (
                        <Badge key={i} variant="outline" className="bg-[#3d3d3d] text-[#c58af9] border-[#4d4d4d]">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {index < data.projects.length - 1 && <Separator className="bg-[#3d3d3d] my-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Certifications section */}
        {data.certificates && data.certificates.length > 0 && (
          <Card className="bg-[#2d2d2d] border-[#3d3d3d] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-[#e0e0e0]">
                <span className="mr-2">🏆</span> Certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.certificates.map((cert, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-[#a8c7fa]">{cert.name}</h3>
                    <p className="text-[#c2c2c2]">{cert.issuer}</p>
                  </div>
                  <Badge className="bg-[#3d3d3d] text-[#a8c7fa] hover:bg-[#4d4d4d]">{cert.date}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <footer className="text-center text-[#9aa0a6] py-4">
          <p>
            Made with 💜 by {data.basics.name} • Last updated:{" "}
            {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        </footer>
      </div>
    </div>
  )
}
