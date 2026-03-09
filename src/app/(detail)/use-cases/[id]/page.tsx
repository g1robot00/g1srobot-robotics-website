// FIXME 오버레이로 변경됨 -> 삭제
// import { notFound } from "next/navigation"
// import { client } from "@/lib/sanity"

// import { USE_CASES_PAGE_QUERY } from "@/lib/queries"
// import { UseCasePageDTO } from "@/types/respDto";
// import UseCaseDetailContainer from "@/components/pages/use-cases/detail/UseCaseDetailContainer";

// interface PageProps {
//     params: Promise<{ id: string }>
// }

// export default async function page({params}: PageProps) {
//     const {id} = await params;

//     // FIXME USE_CASE_DETAIL_QUERY문으로 필터없이!!
//     const useCases: UseCasePageDTO[] = await client.fetch(USE_CASES_PAGE_QUERY);

//     const useCase = useCases.find(item => item.slug === id);

//     if (!useCase) {
//         notFound();
//     }

//   return (
//     <main>
//         <UseCaseDetailContainer useCase={useCase}/>
//     </main>
//   )
// }
