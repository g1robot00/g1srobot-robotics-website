<section className='w-full h-screen'>
            <div className='w-full h-full grid grid-cols-1 md:grid-cols-3'>
                {/* 미디어 영역 */}
                <div className='md:col-span-2 flex flex-col justify-center items-center 
                                h-full bg-gray-100 md:px-10 lg:px-20 pb-5 md:py-20 '
                >
                    <div className='relative aspect-[4/3] w-full md:max-w-[90%] bg-gray-200 overflow-hidden'>
                        {allMedia[activeIndex].type === 'image'
                            ?<Image src={allMedia[activeIndex].url} 
                                alt={`${name} main`}
                                fill
                                priority
                                className='object-contain'
                            />
                            : <video key={allMedia[activeIndex].url} 
                                    src={allMedia[activeIndex].url}
                                    controls
                                    className='w-full h-full'
                            />
                        }
                    </div>

                    <ProductThumbnails allMedia={allMedia} name={name} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
                </div>

                {/* 우측 패널 */}
                <aside className='w-full h-full bg-white px-5 md:px-10 lg:px-15 border-l border-gray-200 md:overflow-y-auto scrollbar-hide
                                md:col-span-1 flex flex-col'
                >
                    <div className='flex-1 flex flex-col gap-16 py-10 md:py-20'>
                        <div className='space-y-4'>
                            <span className='text-main font-bold tracking-widest uppercase text-xs md:text-sm'>{productLine}</span>
                            <h2 className='text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight'>{name}</h2>
                        </div>
                        <div className='flex flex-col gap-6'>
                            <h3 className='font-bold text-base md:text-lg text-gray-700'>제품 사양</h3>
                            <div className='divide-y divide-gray-200 space-y-6'>
                                {specs.map((item, idx) => (
                                    <div key={`${idx}_${item}`}
                                        className='flex justify-between'
                                    >
                                        <span className='text-sm md:text-base text-gray-500'>{item.label}</span>
                                        <span className='text-base md:text-lg font-semibold'>
                                            {item.value}
                                            {item.unit}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    
                    </div>
                    <div className='sticky bottom-0 z-2 py-5 bg-white border-t border-gray-200 flex gap-3'>
                        <Button label='제품 문의하기' className={buttonStyle} showArrow />
                        <Button href='/tech-doc' label='기술자료 다운로드' className={buttonStyle} showArrow/>
                    </div>
                </aside>
            </div>
        </section>