const PRODUCT_TYPES_CONDITION = `_type in ["system", "robot"] && references(^._id)`;

// 랜딩페이지
export const LANDING_PAGE_QUERY = `{
  "industries": *[_type == "industry"] | order(name asc) {
    "id": _id,
    "label": name,
    "href": "/solutions/",
    "icon": iconName
  },
  "productLines": *[_type == "productLine"] | order(name asc) {
    "id": _id,
    "label": name,
    "nameEn": nameEn,
    "href": "/products",
    "content": description,
    "hasProducts": count(*[${PRODUCT_TYPES_CONDITION}]) > 0,
    "thumbnail": coalesce(
      // 1순위: 현재(productLine) 테이블의 mainImage URL
      mainImage.asset->url, 

      // 2순위: 1순위가 없을 경우, 이 제품군을 참조하는 제품들 중 
      // 참조하는 제품을 찾은 뒤, 그 제품의 [대표이미지] 혹은 [갤러리 첫장] 중 있는 걸 가져옴
      *[${PRODUCT_TYPES_CONDITION}] | order(_createdAt desc)[0]{
        "url": coalesce(mainImage.asset->url, images[0].asset->url)
      }.url
    )
  },
  "useCases": *[_type == "useCase"] | order(endDate desc) {
    "id": _id,
    "title": title,
    "description": description,
    "date": endDate,
    "systems": systems[] -> {
      "id": _id,
      "name": name,
      "href": '/products/' + slug.current,
    },
    "industries": industries[] -> {
      "id": _id,
      "name": name,
    },
    "thumbnail": mainImage.asset->url,
    "images": images[].asset->url,
    "videos": videos[].asset->url
  },
  "clients": *[_id == 'siteSettings'][0].clients[]-> {
    'name': 'name',
    'logo': logo.asset->url,
  }
}`

// 시스템,로봇,부품 상세
export const UNIVERSAL_DETAIL_QUERY = `
  *[_type in ["system", "robot", "component"] && slug.current == $slug][0] {
    "id": _id,
    "type": _type,
    "name": name,
    "nameEn": nameEn,
    "href": '/products/' + slug.current,
    "description": description,
    "specs": specs,
    "specsImg": specsImg.asset->url,
    "productLine": productLine->name,
    "industries": industries[]->name,
    "images": select(
        count(images) > 0 => images[].asset->url,
        [mainImage.asset->url]
      ),
    "videos": videos[].asset->url,
    
    // 1. 시스템일 경우 연결된 로봇들을 가져옴
    "robots": robots[]-> {
      "id": _id,
      "name": name,
      "mainImage": mainImage.asset->url,
      "href": "/products/" + slug.current,
      "hasContent": defined(description) && count(specs) > 0
    },

    "components": components[] -> {
      "id": _id,
      "name": name,
      "mainImage": mainImage.asset->url,
      "href": "/products/" +slug.current,
      "hasContent": defined(description) && count(specs) > 0
    }
  }
`

// 제품군
export const PRODUCT_LINE_WITH_PRODUCTS_QUERY = `
  *[_type == "productLine" && count(*[${PRODUCT_TYPES_CONDITION}]) > 0] | order(name asc) { // 해당제품 없으면 목록 삭제
    "id": _id,
    "label": name,
    "nameEn": nameEn,
    "href": "/products/" + slug.current,
    "content": description,

    // 2. 해당 제품군에 속한 제품들을 필터링해서 가져오기(SQL의 JOIN)
    "kind": *[${PRODUCT_TYPES_CONDITION}] {
      "id":_id,
      "type": _type,
      "label": name,
      "nameEn": nameEn,
      "href": "/products/" + slug.current,
      "specs": specs,
      "thumbnail": coalesce(mainImage.asset->url, images[0].asset->url)
    },

    // 3. 이미지 처리(이미지가 없다면 첫번째 제품의 이미지를 가져오거나 처리)
    "thumbnail": *[${PRODUCT_TYPES_CONDITION}]| order(_createdAt asc)[0].images[0].asset->url
  }
`;

// _제품상세 네브 리스트 
export const PRODUCT_LINE_NAV_QUERY = `
  *[_type == "productLine" && count(*[${PRODUCT_TYPES_CONDITION}]) > 0] | order(name asc) {
    "id": _id,
    'name': name,
    'products': *[${PRODUCT_TYPES_CONDITION}] | order(name asc){
      'id': _id,
      'name': name,
      'href': '/products/' + slug.current
    }
  }
`

// 산업
export const INDUSTRY_WITH_PRODUCTS_QUERY = `
  *[_type == 'industry'&& count(*[${PRODUCT_TYPES_CONDITION}]) > 0] { // 해당제품 없으면 목록 삭제
    "id": _id,
    "label": name,
    "kind": *[${PRODUCT_TYPES_CONDITION}] {
      "id": _id,
      "type": _type,
      "label": name,
      "nameEn": nameEn,
      "href": "/products/" + slug.current,
      "specs": specs,
      "thumbnail": coalesce(mainImage.asset->url, images[0].asset->url)
    }
  }
`
export const INDUSTRY_NAV_QUERY = `
*[_type == "industry" && count(*[${PRODUCT_TYPES_CONDITION}]) > 0] | order(name asc) {
    "id": _id,
    'name': name,
    'products': *[${PRODUCT_TYPES_CONDITION}] | order(name asc){
      'id': _id,
      'name': name,
      'href': '/products/' + slug.current
    }
  }
`

// 적용 사례 페이지
export const USE_CASES_PAGE_QUERY = `{
  "useCases": *[_type == "useCase"] | order(endDate desc) {
    "id": _id,
    "title": title,
    "description": description,
    "date": endDate,
    "systems": systems[] -> {
      "id": _id,
      "name": name,
      "href": '/products/' + slug.current,
    },
    "industries": industries[] -> {
      "id": _id,
      "name": name,
    },
    "thumbnail": mainImage.asset->url,
    "images": images[].asset->url,
    "videos": videos[].asset->url
  },

  //필터 리스트
  "industryFilters": *[_type == "industry" && count(*[_type == "useCase" && references(^._id)]) > 0] {
    "id": _id,
    "name": name,
  },
  "systemFilters": *[_type == "system" && count(*[_type == "useCase" && references(^._id)])> 0] {
    "id": _id,
    "name": name
  }
}`;


//기술자료
export const TECH_DOC_QUERY = `
  *[_type == 'techDoc'] {
    "id": _id,
    title,
    category,
    language,
    releaseDate,
    "files": file[] {
      "key": _key,
      "url": asset->url, // PDF 주소
      "name": asset->originalFilename, //원래 파일이름 
      "size": asset->size,  //파일용량
      "extension": asset->extension //확장자(.pdf ...)
    },
    "relatedProducts": relatedProducts[] -> {
      "id": _id,
      name
    },
    // 필터용 제품 목록
    "filterOption": *[_type == "productLine" 

      // 조건 1: 이 제품군 아래에 있는 제품들 중 techDoc이 존재하는 제품이 하나라도 있는가?
      && count(*[${PRODUCT_TYPES_CONDITION}
      && count(*[_type == 'techDoc' && references(^._id)]) > 0 ]) > 0
      ] | order(name asc) {
        'id': _id,
        'name': name,
        'products' : *[${PRODUCT_TYPES_CONDITION}
          // 조건 2: 이 개별 제품을 참조하는 techDoc이 존재하는가?
          && count(*[_type == 'techDoc' && references(^._id)]) > 0 ] | order(name asc) {
            'id': _id,
            'name': name
          }
      }
    
  }
`

// 회사소개
export const COMPANY_QUERY = `
  *[_type == 'companyConfig'][0] {
    'slogan': slogan,
    'about': ceoMessage,
    'business': businessField,
    'vision': vision,
    'clients': *[_id == 'siteSettings'][0].clients[]-> {
      'name': 'name',
      'logo': logo.asset->url,
    }, 
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

// 오시는 길(연락수단 + 위치정보)
export const LOCATION_QUERY = `
  *[_id == 'siteSettings'][0].contact {
    phone { 'value': text, iconName },
    email { 'value': text, iconName },
    address {
      'value': text,
      lat,
      lng,
      'link': mapLink,
      iconName
    }
  }
`
