import Image from "next/image"

import Badge from "@/components/ui/Badge";
import UseCaseDescriptionSection from "./UseCaseDescriptionSection";
import { UseCaseDTO } from "@/types/respDto"

export default function UseCaseDetailContainer({useCase}: {useCase: UseCaseDTO}) {
    const { title, sum, date, products, industries, href, thumbnail } = useCase;

  return (
    <div className='mx-auto max-w-7xl px-5 md:px-10 lg:px-20 py-20'>
        <div className="flex flex-col gap-10 ">
            <div className=" pb-5 border-b border-gray-200">
                <div className="relative w-full h-110 mb-10 rounded-xl overflow-hidden bg-gray-100">
                    {thumbnail
                        ?<Image src={thumbnail} alt={title} fill  className="object-cover"/>
                        :<div className="w-full h-full bg-gray-200"/>
                    }
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex gap-3 items-end">
                        <h4 className='text-4xl font-bold'>{title}</h4>
                        <span className="text-lg text-gray-400">{date}</span>
                    </div>
                    <div className="flex gap-2">
                        {industries.map(item => (
                            <Badge key={item.name} label={item.name} variant="outline" className="text-md border-main text-main"/>
                        ))}
                        {products.map(item => (
                            <Badge key={item.name} label={item.name} variant="filled" className="text-md rounded-full shadow-none"/>
                        ))}
                    </div>
                    {/* <div>
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div> */}
                </div>
            </div>
            <UseCaseDescriptionSection />
        </div>
    </div>
  )
}
