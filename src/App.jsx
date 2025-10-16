import { useState } from 'react'
import { Layout, Button, Splitter, Divider, Select } from 'antd'
import 'antd/dist/reset.css'
import ArtDisplay from './components/ArtDisplay'
import WorkCardDisplay from './components/WorkCardDisplay'
import ProjectCardDisplay from './components/ProjectCardDisplay'
import { WorkData, ArtData } from './components/CardData'
import { ProjectData } from './components/ProjectData'
import { Grid } from 'antd';
const { useBreakpoint } = Grid;
import { Header } from 'antd/es/layout/layout';


const infoPanelColour = '#0f172a'

export default function PortfolioApp() {
    const [filter, setFilter] = useState('project')
    const [selectedTag, setSelectedTag] = useState('all')

    const projects = ProjectData || []
    const workHistory = WorkData || [] 
    const artGallery = ArtData || []

    const screens = useBreakpoint();
    const isMobile = !screens.md

    // Get unique tags from projects
    const projectTags = Array.from(new Set(projects.map(p => p.tag))).filter(Boolean)

    // Filter projects by tag
    const filteredProjects = selectedTag === 'all'
        ? projects
        : projects.filter(p => p.tag === selectedTag)

    const buttonStyle = {
        fontSize: isMobile? '3vw' : '1em',
        width: isMobile? '12vw' : '100%',
        height: isMobile? '5vh' : '100%',
    }
    const tagSelectStyle = {
        fontSize: isMobile? '1vw' : '1em',
        width: isMobile? '35vw' : '100%',
        height: isMobile? '5vh' : '100%',                                    
        borderRadius: 999,           // fully rounded
        overflow: 'hidden',
        // when a tag (including 'all') is selected, give the control orange look like before
        background: selectedTag === 'all' ? undefined : '#c44800ff',
        borderColor: selectedTag === 'all' ? undefined : '#772c00ff',
        color: selectedTag === 'all' ? undefined : '#fff',
    }

    if (isMobile){
        return (
            <Layout>
                <Header style={{
                    background: infoPanelColour,
                    color: 'white',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100vw',
                    height: '15vh',
                }}>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '5vw', fontWeight: 'bold' }}>Dominik Mat</h1>
                        <h2 style={{ marginTop: 2, opacity: 0.9, fontSize: '3vw' }}>Portfolio</h2>
                    </div>
                    
                    <div style={{display: 'flex', flexDirection: 'column'}}>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>

                            <Button shape="round" style={buttonStyle} type={filter === 'project' ? 'primary' : 'default'} onClick={() => setFilter('project')}>
                                Projects
                            </Button>
                            <Button shape="round" style={buttonStyle} type={filter === 'work' ? 'primary' : 'default'} onClick={() => setFilter('work')}>
                                Work
                            </Button>
                            <Button shape="round" style={buttonStyle} type={filter === 'art' ? 'primary' : 'default'} onClick={() => setFilter('art')}>
                                Art
                            </Button>
                        </div>

                        
                        {filter === 'project' && (
                            <div style={{ alignSelf: 'center', marginBottom: 10}}>
                                <Select
                                value={selectedTag}
                                onChange={(val) => setSelectedTag(val)}
                                optionLabelProp="label"
                                style={tagSelectStyle}
                                // show readable label inside the control
                                labelInValue={false}
                                >
                                <Select.Option value="all" label="All">
                                    <div style={{
                                        padding: '6px 12px',
                                        borderRadius: 999,
                                        background: selectedTag === 'all' ? '#c44800ff' : 'transparent',
                                        color: selectedTag === 'all' ? '#fff' : undefined,
                                    }}>
                                    All
                                    </div>
                                </Select.Option>

                                {projectTags.map(tag => (
                                    <Select.Option key={tag} value={tag} label={tag}>
                                    <div style={{
                                        padding: '6px 12px',
                                        borderRadius: 999,
                                        background: selectedTag === tag ? '#c44800ff' : 'transparent',
                                        color: selectedTag === tag ? '#fff' : undefined,
                                    }}>
                                        {tag}
                                    </div>
                                    </Select.Option>
                                ))}
                                </Select>
                            </div>
                        )}

                    </div>

                </Header>
                
                <div style={{
                    background: '#2b2b2bff',
                }}>
                    
                    {filter === 'project' && <ProjectCardDisplay items={filteredProjects} isMobile={true}/>}

                    {filter === 'work' && <WorkCardDisplay items={workHistory} isMobile={true}/>}

                    {filter === 'art' && <ArtDisplay items={artGallery} isMobile={true}/>}
                    
                </div>s

            </Layout>
        )
    }

    // Desktop Devices
    return (
        <div style={{ overflowX: 'hidden' }}>
            <Splitter style={{ overflowX: 'hidden' }}>
                <Splitter.Panel
                    defaultSize="20%"
                    min="3%"
                    max="97%"
                    style={{
                        height: '100vh',
                        background: infoPanelColour,
                        color: 'white',
                        padding: '48px 32px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative',
                        overflowX: 'hidden',
                    }}
                >
                    <div>
                        <h1 style={{ margin: 0, fontSize: 50, fontWeight: 'bold' }}>Dominik Mat</h1>
                        <h2 style={{ marginTop: 8, opacity: 0.9 }}>Portfolio</h2>

                        <Divider> </Divider>

                        <div style={{ marginTop: 32, color: '#cbd5e1' }}>
                            <p>umiem salto (bez ladowania)</p>
                        </div>
                    </div>

                    <div style={{ background: infoPanelColour }}>
                        <div>
                            <a href="/cv.pdf" download style={{ color: 'white', textDecoration: 'underline' }}>
                                Pobierz CV
                            </a>
                        </div>
                        <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                            {/* Blue accent for main filter buttons */}
                            <Button
                                shape="round"
                                type={filter === 'project' ? 'primary' : 'default'}
                                onClick={() => setFilter('project')}
                            >
                                Projects
                            </Button>
                            <Button
                                shape="round"
                                type={filter === 'work' ? 'primary' : 'default'}
                                onClick={() => setFilter('work')}
                            >
                                Work
                            </Button>
                            <Button
                                shape="round"
                                type={filter === 'art' ? 'primary' : 'default'}
                                onClick={() => setFilter('art')}
                            >
                                Art
                            </Button>
                        </div>
                        {/* Tag filter, only show when Projects is selected */}
                        {filter === 'project' && (
                            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
                                {/* Orange accent for tag buttons */}
                                <Button
                                    shape="round"
                                    type={selectedTag === 'all' ? 'primary' : 'default'}
                                    onClick={() => setSelectedTag('all')}
                                    style={
                                        selectedTag === 'all'
                                            ? { background: '#c44800ff', borderColor: '#772c00ff', color: '#fff' }
                                            : {}
                                    }
                                >
                                    All
                                </Button>
                                {projectTags.map(tag => (
                                    <Button
                                        key={tag}
                                        shape="round"
                                        type={selectedTag === tag ? 'primary' : 'default'}
                                        onClick={() => setSelectedTag(tag)}
                                        style={
                                            selectedTag === tag
                                            ? { background: '#c44800ff', borderColor: '#772c00ff', color: '#fff' }
                                                : {}
                                        }
                                    >
                                        {tag}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </div>
                </Splitter.Panel>

                <Splitter.Panel
                    defaultSize="80%"
                    min="3%"
                    max="97%"
                    style={{
                        background: '#2b2b2bff',
                        height: '100vh',
                        overflow: 'hidden',
                        display: 'flex',
                    }}
                >
                    {filter === 'project' && <ProjectCardDisplay items={filteredProjects} isMobile={false}/>}

                    {filter === 'work' && <WorkCardDisplay items={workHistory} isMobile={false}/>}

                    {filter === 'art' && <ArtDisplay items={artGallery} isMobile={false}/>}

                </Splitter.Panel>
            </Splitter>
        </div>
    )
}