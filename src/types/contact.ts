import { RefObject } from "react"

export interface InquiryFormRefs {
    inquiryTypeRef: RefObject<HTMLSelectElement | null>
    emailRef: RefObject<HTMLInputElement | null>
    companyRef: RefObject<HTMLInputElement | null>
    nameRef: RefObject<HTMLInputElement | null>
    phoneRef: RefObject<HTMLInputElement | null>
    contentRef: RefObject<HTMLTextAreaElement | null>
}