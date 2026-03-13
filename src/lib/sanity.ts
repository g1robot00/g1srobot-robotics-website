import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: false, //FIXME 실제 배포시 true(false: 실시간 데이터 가져옴)
})