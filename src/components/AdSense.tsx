import { useEffect } from 'react';

interface AdSenseProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

/**
 * Componente Google AdSense
 * 
 * @param slot - ID do slot do anúncio (ex: "1234567890")
 * @param format - Formato do anúncio (default: "auto")
 * @param responsive - Se o anúncio é responsivo (default: true)
 * @param className - Classes CSS adicionais
 * 
 * @example
 * <AdSense slot="1234567890" />
 * <AdSense slot="9876543210" format="horizontal" />
 */
export function AdSense({ 
  slot, 
  format = 'auto', 
  responsive = true,
  className = ''
}: AdSenseProps) {
  useEffect(() => {
    try {
      // Push do anúncio após montagem do componente
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      // Em desenvolvimento, é normal não haver anúncios
      if (process.env.NODE_ENV === 'development') {
        console.log('AdSense em modo desenvolvimento');
      } else {
        console.error('Erro ao carregar AdSense:', err);
      }
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6857835151614008"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}

// Variantes pré-configuradas para facilitar o uso

export function AdSenseHorizontal({ slot, className }: { slot: string; className?: string }) {
  return <AdSense slot={slot} format="horizontal" className={className} />;
}

export function AdSenseVertical({ slot, className }: { slot: string; className?: string }) {
  return <AdSense slot={slot} format="vertical" className={className} />;
}

export function AdSenseRectangle({ slot, className }: { slot: string; className?: string }) {
  return <AdSense slot={slot} format="rectangle" className={className} />;
}
