import { client } from "@/lib/sanity"

import { INQUIRY_CONSENT_QUERY } from "@/lib/queries"
import InquiryForm from "./InquiryForm"
import { InquiryConsentDTO } from "@/types/respDto"

interface InquiryFormWrapperProps {
    productName?: string
}

export default async function InquiryFormWrapper({ productName }: InquiryFormWrapperProps) {
    const policy: InquiryConsentDTO = await client.fetch(INQUIRY_CONSENT_QUERY, {}, { next: { revalidate: 0 } });

    return (
        <InquiryForm productName={productName} policy={policy} />
    )
}
