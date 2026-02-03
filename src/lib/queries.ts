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

// robot 상세
export const ROBOT_DETAIL_QUERY = `
  *[_type == "robot"][0] {
    "id": _id,
    "name": name,
    "description": description,
    "specs": specs,
    "productLine": productLine->name,
    "industries": industries[]->name,
    "mainImage": mainImage.asset->url,
    "images": images[].asset->url,
    "video": video[].asset->url,
    "components": components[] ->name,
  }
`

// system 상세

// 제품군
export const PRODUCT_LINE_QUERY = `
  *[_type == "productLine"] | order(name asc) {
    "id": _id,
    "label": name,
    "content": description,
    "href": "/products",

    // 2. 해당 제품군에 속한 제품들을 필터링해서 가져오기(SQL의 JOIN)
    "kind": *[_type == "product" && references(^._id)] {
      "id":_id,
      "label": name,
      "href": "/products/" + slug.current,
      "specs": specs,
      "thumbnail": coalesce(mainImage.asset->url, images[0].asset->url)
    },

    // 3. 이미지 처리(이미지가 없다면 첫번째 제품의 이미지를 가져오거나 처리)
    "productImg": *[_type == "product" && references(^._id)]| order(_createdAt asc)[0].images[0].asset->url
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
    "kind": *[_type == "product" && references(^._id)] {
      "id": _id,
      "label": name,
      "href": "/solutions/" + slug.current,
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