import { Divider, Image } from "antd"
import { Footer } from 'antd/es/layout/layout'
import { useState } from 'react'
import ProjectPopup from "./ProjectPopup"


export default function ProjetCardDisplay ( {items, isMobile=false} ) {
    const [selected, setSelected] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    const onCardClick = (item) => {
        setSelected(item)
        setModalOpen(true)
    }

    const projectImgStyle = { 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover', 
        maxHeight: isMobile? '22vh' : '35vh' 
    }

    return (
        <div style={{ 
            width: isMobile? '100vw' : '80vw',
            height: isMobile? '85vh' : '100vh',
            overflowX: 'auto',
            padding: 16,
            display: 'flex',
            gap: 16,
        }}>

            {items.map(item => (
                <div
                    key={item.id}
                    onClick={() => onCardClick(item)}
                    style={{
                        width: '360px',
                        flex: '0 0 360px', // stała szerokość; NIE wpływa na szerokość dokumentu
                        height: '100%',    // zajmuje całą wysokość kontenera → nie zwiększa body width
                        display: 'flex',
                        flexDirection: 'column',
                        background: '#616161ff',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        borderRadius: 15
                    }}
                >
                    <Image src={item.image1} alt={item.title} style={projectImgStyle} preview={false} />

                    <div style={{ margin: isMobile? 5 : 10 }}> </div>

                    <Image src={item.image2} alt={item.title} style={projectImgStyle} preview={false} />

                    {/* Metadata area (title, date, description) */}
                    <Divider style={{ margin: 10 }}> </Divider>
                    <h3 style={{ margin: 0, color: "white", fontWeight: 'bold', fontSize: isMobile? 20:30, alignSelf: 'center' }}>{item.title}</h3>
                    <Divider style={{ margin: isMobile? 3 : 10 }}> </Divider>

                    <div style={{ padding: 0, display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
                        <p style={{ margin: 10, flex: 1, textAlign: 'center', fontSize: isMobile?11:16}}>{item.description}</p>
                    </div>

                    <Footer style={{ background: '#4c4c4cff' }}>
                        <p style={{ color: '#d1d1d1ff', marginBottom: isMobile?0:15, fontWeight: 'bold', fontSize: isMobile?12:18, textAlign: 'center' }}>{item.tag.toUpperCase()}</p>
                    </Footer>
                </div>
            ))}

            <ProjectPopup selected={selected} modalOpen={modalOpen} setModalOpen={setModalOpen} isMobile={isMobile}> </ProjectPopup>
            
        </div>
    )
}