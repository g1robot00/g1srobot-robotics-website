// 제품 (적용사례에서 사용)
export const PRODUCTS_QUERY = `
  *[_type == "product" && defined(slug.current)]{
    "id":_id,
    "label": name,
    slug,
    description,
    specs,
    productLine->{
      name
    },
    industries[]->{
      name
    }
  }
`;

// 제품(제품 상세)
export const PRODUCT_DETAIL_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    "id": _id,
    "name": name,
    "description": description,
    "mainImage": mainImage.asset->url,
    "images": images[].asset->url,
    "specs": specs,
    "productLine": productLine-> name,
    "industries": industries[]->name
  }
`

// 시스템,로봇,부품 상세
export const UNIVERSAL_DETAIL_QUERY = `
  *[_type in ["system", "robot", "component"] && slug.current == $slug][0] {
    "id": _id,
    "type": _type,
    "name": name,
    "description": description,
    "specs": specs,
    "productLine": productLine->name,
    "industries": industries[]->name,
    "mainImage": mainImage.asset->url,
    "images": images[].asset->url,
    "videos": videos[].asset->url,
    
    // 1. 시스템일 경우 연결된 로봇들을 가져옴
    "robots": robots[]-> {
      "id": _id,
      "name": name,
      "mainImage": mainImage.asset->url,
      "href": "/products/" + slug.current
    },

    "components": components[] -> {
      "id": _id,
      "name": name,
      "mainImage": mainImage.asset->url,
      "href": "/products/" +slug.current
    }
  }
`

// 제품군
export const PRODUCT_LINE_LIST_QUERY = `
  *[_type == "productLine"] | order(name asc) {
    "id": _id,
    "label": name,
    "href": "/products",
    "content": description,
    "kind": *[_type in ["system", "robot", "component" ] && references(^._id)] {
      "id":_id,
      "type": _type,
      "label": name,
      "href": "/products/" + slug.current,
    },
    "thumbnail": coalesce(
      // 1순위: 현재(productLine) 테이블의 mainImage URL
      mainImage.asset->url, 
      
      // 2순위: 1순위가 없을 경우, 이 제품군을 참조하는 제품들 중 
      // 참조하는 제품을 찾은 뒤, 그 제품의 [대표이미지] 혹은 [갤러리 첫장] 중 있는 걸 가져옴
      *[_type in ["system", "robot", "component"] && references(^._id)] | order(_createdAt desc)[0]{
        "url": coalesce(mainImage.asset->url, images[0].asset->url)
      }.url
      )
  }
`

export const PRODUCT_LINE_WITH_PRODUCTS_QUERY = `
  *[_type == "productLine"] | order(name asc) {
    "id": _id,
    "label": name,
    "href": "/products/" + slug.current,
    "content": description,

    // 2. 해당 제품군에 속한 제품들을 필터링해서 가져오기(SQL의 JOIN)
    "kind": *[_type in ["system", "robot", "component" ] && references(^._id)] {
      "id":_id,
      "type": _type,
      "label": name,
      "href": "/products/" + slug.current,
      "specs": specs,
      "thumbnail": coalesce(mainImage.asset->url, images[0].asset->url)
    },

    // 3. 이미지 처리(이미지가 없다면 첫번째 제품의 이미지를 가져오거나 처리)
    "thumbnail": *[_type == "product" && references(^._id)]| order(_createdAt asc)[0].images[0].asset->url
  }
`;

// 적용 사례
export const USE_CASES_QUERY = `
  *[_type == "useCase"] | order(endDate desc) {
    "title": title,
    "slug": slug.current,
    "href": "/use-cases/" + slug.current,
    "sum": summary,
    "date": endDate,
    
    "products": products[] -> {
      name
    },
    "industries": industries[] -> {
      name
    },
    "thumbnail": mainImage.asset->url,
  }
`;

// 산업
export const INDUSTRY_LIST_QUERY = `
  *[_type == "industry"] {
    "label": name,
    "slug": slug.current,
    "href": "/solutions/" + slug.current,
    "icon": iconName
  }
`;

export const INDUSTRY_WITH_PRODUCTS_QUERY = `
  *[_type == 'industry'] {
    "id": _id,
    "label": name,
    "kind": *[_type in ["system", "robot", "component" ] && references(^._id)] {
      "id": _id,
      "type": _type,
      "label": name,
      "href": "/products/" + slug.current,
      "specs": specs,
      "thumbnail": coalesce(mainImage.asset->url, images[0].asset->url)
    }
  }
`

export const INDUSTRY_DETAIL_QUERY = `

`

//기술자료
export const TECH_DOC_QUERY = `
  *[_type == 'techDoc'] {
    "id": _id,
    "title": title,
    "fileUrl": file.asset->url, // PDF 주소
    "fileName": file.asset->originalFilename, //원래 파일이름 
    "fileSize": file.asset->size  //파일용량
  }
`

// 회사소개
export const COMPANY_QUERY = `
  *[_type == 'companyConfig'][0] {
    'slogan': slogan,
    'about': ceoMessage,
    'business': businessField,
    'vision': vision,
    'clients': _*[_type == 'siteSettings'][0].clients, // FIXME 참조형태 맞는지 확인
    'history': timeline[] | order(year desc){
      'id': _key,
      year,
      'events': events[] | order(month desc){
        month,
        content
      }
    }
  }
`

// 연락수단
export const CONTACT_QUERY = `
  *[_id == 'siteSettings'][0].contact {
    phone { 'value': text, iconName },
    email { 'value': text, iconName },
    address { 'value': text, iconName }
  }
`