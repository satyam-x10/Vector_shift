import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

// Utility to generate random nodes
const generateNodes = (count, width, height) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        type: Math.random() > 0.6 ? 'input' : Math.random() > 0.3 ? 'llm' : 'output',
    }));
};

export const LandingPage = () => {
    const [nodes, setNodes] = useState([]);
    const containerRef = useRef(null);
    const requestRef = useRef();

    useEffect(() => {
        setNodes(generateNodes(15, window.innerWidth, window.innerHeight));
    }, []);

    const animate = () => {
        setNodes((prevNodes) => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            return prevNodes.map((node) => {
                let { x, y, dx, dy } = node;
                x += dx;
                y += dy;

                // Bounce off walls
                if (x < 0 || x > width) dx = -dx;
                if (y < 0 || y > height) dy = -dy;

                return { ...node, x, y, dx, dy };
            });
        });
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    // Connections logic: connect nodes that are close
    const connections = [];
    nodes.forEach((nodeA, i) => {
        nodes.slice(i + 1).forEach((nodeB) => {
            const dist = Math.sqrt(Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2));
            if (dist < 300) {
                connections.push({
                    x1: nodeA.x,
                    y1: nodeA.y,
                    x2: nodeB.x,
                    y2: nodeB.y,
                    opacity: 1 - dist / 300,
                });
            }
        });
    });

    return (
        <div
            ref={containerRef}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                background: '#0d0d12',
                color: '#fff',
                fontFamily: "'Inter', sans-serif",
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* SVG Background Layer */}
            <svg
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            >
                {connections.map((conn, i) => (
                    <line
                        key={i}
                        x1={conn.x1}
                        y1={conn.y1}
                        x2={conn.x2}
                        y2={conn.y2}
                        stroke="#6366f1"
                        strokeWidth="1"
                        strokeOpacity={conn.opacity * 0.3}
                    />
                ))}
                {nodes.map((node) => (
                    <circle cx={node.x} cy={node.y} r="20" fill="#1e1e2e" stroke="#6366f1" strokeWidth="2" key={`circle-${node.id}`} opacity="0.1" />
                ))}
            </svg>

            {/* Floating Nodes Layer */}
            {nodes.map((node) => (
                <div
                    key={node.id}
                    style={{
                        position: 'absolute',
                        top: node.y,
                        left: node.x,
                        transform: 'translate(-50%, -50%)',
                        background: '#1e1e2e',
                        border: '1px solid #3f3f46',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        minWidth: '100px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                        opacity: 0.4,
                        zIndex: 0,
                        pointerEvents: 'none',
                    }}
                >
                    <div style={{
                        height: '8px',
                        width: '40%',
                        background: node.type === 'input' ? '#10b981' : node.type === 'output' ? '#f43f5e' : '#8b5cf6',
                        borderRadius: '4px',
                        marginBottom: '4px'
                    }} />
                    <div style={{ height: '6px', width: '80%', background: '#3f3f46', borderRadius: '4px' }} />
                </div>
            ))}

            {/* Main Content Overlay */}
            <div style={{
                zIndex: 10,
                padding: '40px',
                maxWidth: '800px',
            }}>
                <h1
                    style={{
                        fontSize: '5rem',
                        fontWeight: '700',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 50%, #f97316 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-3px',
                        lineHeight: 1,
                    }}
                >
                    VectorShift
                </h1>
                <p
                    style={{
                        fontSize: '1.5rem',
                        color: '#e2e8f0',
                        maxWidth: '700px',
                        margin: '0 auto 3rem auto',
                        lineHeight: '1.7',
                        fontWeight: '300',
                        letterSpacing: '0.3px',
                    }}
                >
                    The next generation of AI pipeline building.
                    <br />
                    <span style={{ color: '#94a3b8' }}>Visual. Intuitive. Powerful.</span>
                </p>

                <Link to="/pipeline" style={{ textDecoration: 'none' }}>
                    <button
                        style={{
                            position: 'relative',
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '16px 56px',
                            fontSize: '1.125rem',
                            fontWeight: '500',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            boxShadow: '0 10px 40px rgba(99, 102, 241, 0.3)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            letterSpacing: '0.5px',
                            overflow: 'hidden',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 20px 50px rgba(99, 102, 241, 0.5)';
                            const shimmer = e.currentTarget.querySelector('.shimmer');
                            if (shimmer) shimmer.style.left = '100%';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 40px rgba(99, 102, 241, 0.3)';
                            const shimmer = e.currentTarget.querySelector('.shimmer');
                            if (shimmer) shimmer.style.left = '-100%';
                        }}
                    >
                        <div
                            className="shimmer"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                transition: 'left 0.6s',
                                pointerEvents: 'none',
                            }}
                        />
                        <span style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                            Launch Builder
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </span>
                    </button>
                </Link>
            </div>

            {/* Footer */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    color: '#475569',
                    fontSize: '0.875rem',
                    zIndex: 10
                }}
            >
                © Satyam Kumar . No Rights Reserved. 2026
            </div>
        </div>
    );
};
