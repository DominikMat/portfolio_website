// ModalSimple.jsx
import React, { useState } from 'react';
import { Modal, Carousel, Image, Divider } from 'antd';
import Calendar from 'antd/lib/calendar';
import YouTube from 'react-youtube';
import LazyYT from './LazyYT';

export default function ModalSimple({ selected, modalOpen, setModalOpen, isMobile }) {
    const carouselItemStyle = {
        margin: 0,
        height: isMobile? '200px' : '340px',
        width: '100%',
        objectFit: 'contain',
        color: '#fff',
        lineHeight: '340px',
        background: 'transparent',
        display: 'block',
    };

    const rightPanelStyle = {
        margin: isMobile? 5 : 10,
        background: '#616161',
        borderRadius: 8,
        padding: isMobile? 10 : 20,
        color: '#fff',
    };
    const rightPanelTitleStyle = {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    };
    const rightPanelTextStyle = { fontSize: 15 };

    const [ytLoading, setYtLoading] = useState({});

    const extractYouTubeId = (url) => {
        try {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            return match && match[2].length === 11 ? match[2] : null;
        } catch {
            return null;
        }
    };

    return (
        <Modal
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            footer={null}
            width="80vw"
            height="80vh"
            centered
            style={{ margin: 0, top: 0 }}
            wrapClassName="custom-modal"
        >
            {selected && (
                <div style={{ 
                    display: 'flex', 
                    flexDirection: isMobile? 'column' : 'row',
                }}>
                    {/* Left: Carousel and description */}
                    <div style={{
                        flex: 2.5,
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 25,
                        minWidth: 0,
                        background: '#2b2b2bff'
                    }}>
                        {/* Header */}
                        <div style={{ padding: '10px', paddingBottom: isMobile? 10 : 35 }}>
                            <h1 style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 32,
                                letterSpacing: 1,
                                textAlign: 'center'
                            }}>
                                {selected.title}
                            </h1>
                        </div>

                        {/* Carousel */}
                            <div style={{ minHeight: isMobile ? '0%' : '60%', marginBottom: isMobile? 15 : 0}}>
                                <Carousel arrows centerMode={!isMobile}>
                                    {selected.images.length > 0 ? (
                                        selected.images.map((src, idx) => {
                                        const videoId = src && typeof src === 'string' && src.startsWith('http')
                                            ? extractYouTubeId(src)
                                            : null;

                                        return (
                                            <div key={idx}>
                                                {videoId ? (
                                                    <LazyYT url={src} height={340} />
                                                ) : src && src.endsWith('.mp4') ? (
                                                    <video src={src} controls muted loop style={carouselItemStyle} />
                                                ) : (
                                                    <Image src={src} alt={selected.title} style={carouselItemStyle} />
                                                )}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p style={{ textAlign: 'center', padding: 20 }}>No images found</p>
                                )}
                            </Carousel>
                        </div>

                        {/* Detailed description */}
                        <div style={{
                            flex: 1,
                            background: '#525252',
                            borderRadius: 8,
                            padding: 25,
                            color: '#fff',
                            fontSize: isMobile? '3vw' : 18,
                            overflowY: 'auto',
                            minHeight: 170
                        }}>
                            {selected.details}
                        </div>
                    </div>

                    {/* Right panel */}
                    <div style={{
                        flex: 1.2,
                        display: 'flex',
                        flexDirection: 'column',
                        background: '#16213bff',
                        borderLeft: '1px solid #444',
                        padding: isMobile? 15 : 32,
                        minWidth: isMobile? 0 : 320,
                        maxWidth: 400,
                        justifyContent: 'flex-start'
                    }}>
                        {Array.isArray(selected.stats) && selected.stats.length > 0 && (
                            <div style={rightPanelStyle}>
                                <h3 style={rightPanelTitleStyle}>Statistics</h3>
                                <table style={{ width: '100%', color: '#fff', fontSize: 16 }}>
                                    <tbody>
                                        {selected.stats.map((stat, idx) => (
                                            <tr key={idx}>
                                                <td style={{ padding: '6px 12px 6px 0', fontWeight: 600 }}>{stat.label}</td>
                                                <td style={{ padding: '6px 0' }}>{stat.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div style={rightPanelStyle}>
                            <h3 style={rightPanelTitleStyle}>Project Timeline</h3>
                            <div style={rightPanelTextStyle}>
                                <span style={{ fontWeight: 600 }}>Start:</span> {selected.startDate || 'N/A'} <br />
                                <span style={{ fontWeight: 600 }}>End:</span> {selected.endDate || 'N/A'}
                            </div>
                        </div>

                        {Array.isArray(selected.links) && selected.links.length > 0 && (
                            <div style={rightPanelStyle}>
                                <h3 style={rightPanelTitleStyle}>Links</h3>
                                <ul style={{ paddingLeft: 20, margin: 0 }}>
                                    {selected.links.map((link, idx) => (
                                        <li key={idx} style={{ marginBottom: 8 }}>
                                            {link.filePath ? (
                                                <a href={link.filePath} download target="_blank" rel="noopener noreferrer" style={{ color: '#96d0ffff' }}>
                                                    {link.title}
                                                </a>
                                            ) : link.url ? (
                                                <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#96d0ffff' }}>
                                                    {link.title}
                                                </a>
                                            ) : (
                                                link.title
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div style={rightPanelStyle}>
                            <h3 style={rightPanelTitleStyle}>Category</h3>
                            <div style={rightPanelTextStyle}>{selected.tag.toUpperCase() || 'N/A'}</div>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    );
}
