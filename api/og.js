import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default function handler() {
  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at 50% 42%, #FFD062, #F9B42D)',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { fontSize: 26, letterSpacing: 8, color: '#FF5DA2', fontWeight: 700, marginBottom: 20, display: 'flex' },
              children: 'FESTIVAL',
            },
          },
          {
            type: 'div',
            props: {
              style: { fontSize: 150, fontWeight: 900, color: '#29C2D6', WebkitTextStroke: '6px #111418', transform: 'rotate(-3deg)', display: 'flex' },
              children: 'SuperFly!',
            },
          },
          {
            type: 'div',
            props: {
              style: { fontSize: 48, fontWeight: 800, color: '#16285E', marginTop: 30, marginBottom: 20, display: 'flex' },
              children: 'SE VIENE ALGO ENORME',
            },
          },
          {
            type: 'div',
            props: {
              style: { background: '#FFFFFF', border: '4px solid #111418', borderRadius: 10, padding: '16px 40px', fontSize: 40, fontWeight: 700, color: '#16285E', display: 'flex' },
              children: 'PRÓXIMAMENTE',
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
    }
  );
}
