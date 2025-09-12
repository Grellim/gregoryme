'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast, useToast } from '@/components/ui/use-toast';
import { PortfolioProject, Skill, ProfileData, Recommendation } from '@/data/types';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);

  // Sample data - in real implementation, fetch from API
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Gregory Vallim',
    subtitle: 'Full-stack developer passionate about creating innovative and impactful solutions.',
    badges: ['Full-Stack Developer', 'React & Next.js Expert', 'UI/UX Design'],
    experience: {
      title: 'Experience',
      description: 'Over 5 years developing modern web applications.',
    },
    techStack: {
      title: 'Technology Stack',
      skills: ['React', 'Next.js', 'TypeScript'],
    },
    mission: {
      title: 'My Mission',
      description: 'Create digital experiences that transform lives and businesses.',
    },
  });

  const [skillsData, setSkillsData] = useState<Skill[]>([
    {
      name: 'React',
      icon: 'M0 0v8h8V0H0zm8 8v8h8V8H8z',
      description: 'JavaScript library for building user interfaces',
      proficiency: 95,
    },
  ]);

  const [projectsData, setProjectsData] = useState<PortfolioProject[]>([
    {
      id: '1',
      title: 'Modern Web Platform',
      description: 'A complete web platform with responsive design.',
      image: '/project1.jpg',
      technologies: ['React', 'Next.js'],
      githubUrl: 'https://github.com/example',
      liveUrl: 'https://example.com',
      featured: true,
      moreInfo: 'Platform description...',
      galleryImages: ['/gallery1.jpg'],
    },
  ]);

  const [recommendationsData, setRecommendationsData] = useState<Recommendation[]>([
    {
      id: '1',
      name: 'John Doe',
      role: 'CEO',
      company: 'Tech Corp',
      message: 'Great work!',
      avatar: '/person1.jpg',
      rating: 5,
    },
  ]);

  const handleSave = async (dataType: string, data: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/save?type=${dataType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: `${dataType} data saved successfully!`,
          variant: "default",
        });
      } else {
        throw new Error('Failed to save data');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save data',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  const ProfileEditor = () => (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Edit your personal profile details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={profileData.subtitle}
              onChange={(e) => setProfileData({ ...profileData, subtitle: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience-description">Experience Description</Label>
          <Textarea
            id="experience-description"
            value={profileData.experience.description}
            onChange={(e) => setProfileData({
              ...profileData,
              experience: { ...profileData.experience, description: e.target.value }
            })}
            placeholder="Describe your experience..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="badges">Badges (comma separated)</Label>
          <Input
            id="badges"
            value={profileData.badges.join(', ')}
            onChange={(e) => setProfileData({
              ...profileData,
              badges: e.target.value.split(',').map(b => b.trim()).filter(Boolean)
            })}
            placeholder="Full-Stack Developer, React Expert, UI/UX Design"
          />
        </div>
        <Button onClick={() => handleSave('profile', profileData)} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Profile'}
        </Button>
      </CardContent>
    </Card>
  );

  const SkillsEditor = () => (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>Manage your technical skills and proficiency levels</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {skillsData.map((skill, index) => (
          <div key={skill.name} className="flex gap-4 items-center p-4 border rounded-lg">
            <div className="flex-1 space-y-2">
              <Input
                value={skill.name}
                onChange={(e) => {
                  const newSkills = [...skillsData];
                  newSkills[index].name = e.target.value;
                  setSkillsData(newSkills);
                }}
                placeholder="Skill name"
              />
              <Input
                type="number"
                value={skill.proficiency}
                onChange={(e) => {
                  const newSkills = [...skillsData];
                  newSkills[index].proficiency = Number(e.target.value);
                  setSkillsData(newSkills);
                }}
                placeholder="Proficiency (0-100)"
                min={0}
                max={100}
              />
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setSkillsData(skillsData.filter((_, i) => i !== index))}
            >
              Remove
            </Button>
          </div>
        ))}
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setSkillsData([...skillsData, {
              name: '',
              icon: '',
              description: '',
              proficiency: 0,
            }])}
          >
            Add Skill
          </Button>
          <Button onClick={() => handleSave('skills', skillsData)} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Skills'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const ProjectsEditor = () => (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>Manage your portfolio projects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {projectsData.map((project) => (
          <Card key={project.id}>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`title-${project.id}`}>Title</Label>
                <Input
                  id={`title-${project.id}`}
                  value={project.title}
                  onChange={(e) => {
                    const newProjects = projectsData.map(p => 
                      p.id === project.id ? { ...p, title: e.target.value } : p
                    );
                    setProjectsData(newProjects);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`description-${project.id}`}>Description</Label>
                <Textarea
                  id={`description-${project.id}`}
                  value={project.description}
                  onChange={(e) => {
                    const newProjects = projectsData.map(p => 
                      p.id === project.id ? { ...p, description: e.target.value } : p
                    );
                    setProjectsData(newProjects);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`technologies-${project.id}`}>Technologies (comma separated)</Label>
                <Input
                  id={`technologies-${project.id}`}
                  value={project.technologies.join(', ')}
                  onChange={(e) => {
                    const newProjects = projectsData.map(p => 
                      p.id === project.id ? { ...p, technologies: e.target.value.split(',').map(t => t.trim()) } : p
                    );
                    setProjectsData(newProjects);
                  }}
                />
              </div>
              <Button onClick={() => handleSave('projects', projectsData)} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Projects'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );

  const RecommendationsEditor = () => (
    <Card>
      <CardHeader>
        <CardTitle>Recommendations</CardTitle>
        <CardDescription>Manage client testimonials and recommendations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendationsData.map((rec) => (
          <Card key={rec.id}>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`name-${rec.id}`}>Name</Label>
                  <Input
                    id={`name-${rec.id}`}
                    value={rec.name}
                    onChange={(e) => {
                      const newRecs = recommendationsData.map(r => 
                        r.id === rec.id ? { ...r, name: e.target.value } : r
                      );
                      setRecommendationsData(newRecs);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`role-${rec.id}`}>Role</Label>
                  <Input
                    id={`role-${rec.id}`}
                    value={rec.role}
                    onChange={(e) => {
                      const newRecs = recommendationsData.map(r => 
                        r.id === rec.id ? { ...r, role: e.target.value } : r
                      );
                      setRecommendationsData(newRecs);
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`message-${rec.id}`}>Message</Label>
                <Textarea
                  id={`message-${rec.id}`}
                  value={rec.message}
                  onChange={(e) => {
                    const newRecs = recommendationsData.map(r => 
                      r.id === rec.id ? { ...r, message: e.target.value } : r
                    );
                    setRecommendationsData(newRecs);
                  }}
                  rows={4}
                />
              </div>
              <Button onClick={() => handleSave('recommendations', recommendationsData)} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Recommendations'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-10 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Content Management</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <ProfileEditor />
        </TabsContent>
        <TabsContent value="skills" className="mt-6">
          <SkillsEditor />
        </TabsContent>
        <TabsContent value="projects" className="mt-6">
          <ProjectsEditor />
        </TabsContent>
        <TabsContent value="recommendations" className="mt-6">
          <RecommendationsEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}