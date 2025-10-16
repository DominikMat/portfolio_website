import {Card, Image} from 'antd'

export default function WorkCardDisplay ( {items, isMobile} ) {
    return (
        <div style={{ 
            width: isMobile? '100vw' : '80vw',
            height: isMobile? '85vh' : '100vh',
            overflowY: 'auto', 
            padding: 24,
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {items.map(item => (
                    <Card
                        key={item.id}
                        hoverable
                        onClick={() => onclick(item)}
                        style={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 'calc((100vh - 120px) / 3)',
                        cursor: 'pointer'
                        }}
                    >
                        {/* <div style={{ flex: '0 0 auto' }}>
                        <Image src={item.image} alt={item.title} style={{ width: '100%', height: 220, objectFit: 'cover' }} preview={false} />
                        </div> */}

                        <div style={{ paddingTop: 12, flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
                        <h4 style={{ margin: 0 }}>{item.title}</h4>
                        <small style={{ color: '#64748b', marginTop: 6 }}>{item.date}</small>
                        <p style={{ marginTop: 8, flex: 1 }}>{item.description}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}