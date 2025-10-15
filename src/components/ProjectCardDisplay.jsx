import { Divider, Image } from "antd"
import { Footer } from 'antd/es/layout/layout'
import { useState } from 'react'
import ProjectPopup from "./ProjectPopup"


export default function ProjetCardDisplay ( {items} ) {
    const [selected, setSelected] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)

    const onCardClick = (item) => {
        setSelected(item)
        setModalOpen(true)
    }

    return (
        <div style={{ 
            height: '100%',
            maxWidth: '80vw',
            minWidth: '80vw',
            overflowX: 'auto',       // poziomy scroll TU
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
                    {/* Image at the top (takes ~55% of height) */}
                    <Image src={item.image1} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: '35vh'}} preview={false} />

                    <div style={{ margin: 10 }}> </div>

                    {/* Image at the top (takes ~55% of height) */}
                    <Image src={item.image2} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: '35vh' }} preview={false} />

                    {/* Metadata area (title, date, description) */}
                    <Divider style={{ margin: 10 }}> </Divider>
                    <h3 style={{ margin: 0, color: "white", fontWeight: 'bold', fontSize: 30, alignSelf: 'center' }}>{item.title}</h3>
                    <Divider style={{ margin: 10 }}> </Divider>

                    <div style={{ padding: 0, display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
                        <p style={{ margin: 10, flex: 1, textAlign: 'center', fontSize: 16}}>{item.description}</p>
                    </div>

                    <Footer style={{ background: '#4c4c4cff' }}>
                        <p style={{ color: '#d1d1d1ff', marginBottom: 15, fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>{item.tag.toUpperCase()}</p>
                    </Footer>
                </div>
            ))}

            <ProjectPopup selected={selected} modalOpen={modalOpen} setModalOpen={setModalOpen} > </ProjectPopup>
            
        </div>
    )
}