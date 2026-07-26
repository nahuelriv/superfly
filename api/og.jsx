export const config = {
  runtime: 'edge',
};

export default async function handler() {
  const { ImageResponse } = await import('@vercel/og');

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at 50% 42%, #FFD062, #F9B42D)',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: 8,
            color: '#FF5DA2',
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          FESTIVAL
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 150,
            fontWeight: 900,
            color: '#29C2D6',
            WebkitTextStroke: '6px #111418',
            transform: 'rotate(-3deg)',
          }}
        >
          SuperFly!
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 48,
            fontWeight: 800,
            color: '#16285E',
            marginTop: 30,
            marginBottom: 20,
          }}
        >
          SE VIENE ALGO ENORME
        </div>

        <div
          style={{
            display: 'flex',
            background: '#FFFFFF',
            border: '4px solid #111418',
            borderRadius: 10,
            padding: '16px 40px',
            fontSize: 40,
            fontWeight: 700,
            color: '#16285E',
          }}
        >
          PRÓXIMAMENTE
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
