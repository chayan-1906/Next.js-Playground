import Image from "next/image";

const product = {
    ecommerce: 'Amazon',
    image: 'https://m.media-amazon.com/images/I/71JGCn1z1TL._SL1500_.jpg',
    url: 'https://amzn.in/d/03QZFh24',
    name: 'iPhone 17 Pro',
    description: 'iPhone 17 Pro 256 GB: 15.93 cm (6.3″) Display with Promotion up to 120Hz, A19 Pro Chip, Breakthrough Battery Life, Pro Fusion Camera System with Center Stage Front Camera; Cosmic Orange',
    brand: 'Apple',
    price: 134900,
    priceCurrency: 'INR',
    dateAvailableFirst: '2025-10-12T08:00:00+00:00',
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    image: product.image,
    name: product.name,
    description: product.description,
    brand: product.brand,
    offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: product.priceCurrency,
    },
};

function JSONLdProductPage() {
    return (
        <div>
            <script
                type={'application/ld+json'}
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')}}
            />

            {/* Back Link */}
            <a href={'/json-ld-demo'} className={'inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors'}>
                <span>{'←'}</span>
                {'Back to demos'}
            </a>

            <div className={'grid md:grid-cols-2 gap-8'}>
                {/* Product Image */}
                <div className={'bg-white rounded-2xl p-8 flex items-center justify-center'}>
                    <Image src={product.image} alt={product.name} width={400} height={400} className={'object-contain max-h-80'}/>
                </div>

                {/* Product Details */}
                <div className={'space-y-6'}>
                    <div>
                        <span className={'inline-block px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full mb-4'}>
                            {'Product Schema'}
                        </span>
                        <p className={'text-slate-400 text-sm mb-1'}>{product.brand}</p>
                        <h1 className={'text-3xl font-bold text-white mb-4'}>{product.name}</h1>
                        <p className={'text-slate-300 leading-relaxed'}>{product.description}</p>
                    </div>

                    {/* Price */}
                    <div className={'p-4 bg-slate-800/50 border border-slate-700 rounded-xl'}>
                        <p className={'text-slate-400 text-sm mb-1'}>{'Price'}</p>
                        <p className={'text-3xl font-bold text-white'}>
                            {'₹'}{product.price.toLocaleString('en-IN')}
                        </p>
                        <p className={'text-slate-500 text-sm mt-1'}>{'Available on '}{product.ecommerce}</p>
                    </div>

                    {/* CTA */}
                    <a href={product.url} target={'_blank'} rel={'noopener noreferrer'} className={'inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all'}>
                        {'Buy on '}{product.ecommerce}
                        <span>{'→'}</span>
                    </a>

                    {/* Schema Info */}
                    <div className={'p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg'}>
                        <p className={'text-slate-500 text-xs'}>
                            {'This page includes Product schema with nested Offer (price: '}
                            <code className={'text-cyan-400'}>{product.price}</code>
                            {', priceCurrency: '}
                            <code className={'text-cyan-400'}>{product.priceCurrency}</code>
                            {')'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JSONLdProductPage;
