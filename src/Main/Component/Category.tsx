import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../Style/main.module.css";

import GetCategoryFunction from "../Function/GetCategoryFunction";

interface CategoryRenderProps {
  categoryList: string[];
}

const CategoryRender: React.FC<CategoryRenderProps> = ({ categoryList }) => {
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

  if (categoryList.length !== 0) {
    // 카테고리 목록이 존재할 경우
    return (
      <div>
        {categoryList.map((category: string) => (
          <p
            key={category}
            onClick={() =>
              navigate(`/postlist/category/${category}`, {
                state: { category: category },
              })
            }
          >
            {category}
          </p>
        ))}
      </div>
    );
  } else {
    // 카테고리 목록이 없을 경우
    return <div className={styles.null_post2}>등록된 카테고리가 없습니다.</div>;
  }
};

const Category: React.FC = () => {
  const [categoryList, setCategoryList] = useState(null);

  async function GetCategory() {
    const result = await GetCategoryFunction();

    if (result.result) {
      setCategoryList(result.categoryList || []);
    }
  }

  useEffect(() => {
    GetCategory();
  }, []);

  if (categoryList) {
    return (
      <div className={styles.category}>
        <p>카테고리</p>
        <CategoryRender categoryList={categoryList} />
      </div>
    );
  }
};

export default Category;
