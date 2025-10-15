// ArtDisplayAdaptiveColumns.jsx
import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'antd'

export default function ArtDisplayAdaptiveColumns({ items = [] }) {
  const GAP_PX = 0
  const BASE_ROW_PX = 60
  const ASPECT_MULT = 2

  // <- główny parametr, zmień żeby wpływać na "wielkość" kafli
  const desiredColPx = 145

  const containerRef = useRef(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [columns, setColumns] = useState(12)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const compute = () => {
      const w = el.clientWidth
      setContainerWidth(w)

      // dynamiczne obliczenie kolumn: ile kolumn zmieści się przy desiredColPx
      const calcCols = Math.max(2, Math.floor(w / desiredColPx))
      // opcjonalny limit (12)
      const cols = Math.min(12, calcCols)
      setColumns(cols)
    }

    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    window.addEventListener('resize', compute)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', compute)
    }
  }, [desiredColPx])

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

  // oblicz szerokość jednej kolumny w px (aktualne columns)
  const colWidth = (() => {
    if (!containerWidth || columns <= 0) return 0
    const totalGaps = (columns - 1) * GAP_PX
    const available = Math.max(0, containerWidth - totalGaps)
    return available / columns
  })()

  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        width: '80vw',        // możesz zmienić na '100%' jeśli chcesz, żeby rodzic sterował
        margin: '20px',
        overflowY: 'auto',
        boxSizing: 'border-box',
        padding: 12,

        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${GAP_PX}px`,
        gridAutoFlow: 'dense',
        gridAutoRows: `${BASE_ROW_PX}px`
      }}
    >
      {items.map((item, i) => {
        const aspect = Number(item.aspect) || 1
        // cols = ile kolumn zajmuje element (1..columns)
        const rawCols = Math.round(aspect * ASPECT_MULT)
        const cols = clamp(rawCols, 1, columns)

        // policz rzeczywiste rows na podstawie colWidth
        let rows = 1
        if (colWidth > 0) {
          const itemWidthPx = cols * colWidth + (cols - 1) * GAP_PX
          const targetHeightPx = itemWidthPx / (aspect || 1)
          rows = Math.max(1, Math.ceil(targetHeightPx / BASE_ROW_PX))
          rows = clamp(rows, 1, 24)
        }

        return (
          <div
            key={item.src ?? i}
            style={{
                gridColumn: `span ${cols}`,
                gridRow: `span ${rows}`,
                overflow: 'hidden',
                borderRadius: 8,
                background: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '15px',
                marginRight: '15px',
            }}
          >
            <Image
              src={item.src}
              alt={item.title || ''}
              style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '8px',
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
