import React, { FC, useEffect, useState } from "react";
import styles from "./styles.css";

interface Category {
    id: string;
    name: string;
    url: string;
    children?: Category[];
}

const fetchCategories = async () => {
    try {
        const response = await fetch('/api/catalog_system/pub/category/tree/1',{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/vnd.vtex.ds.v10+json",
                "REST-Range": "resources=0-1000",
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error(`Failed to fetch categories: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

const renderSubcategories = (subcategories: Category[] | undefined) => {
    if (!subcategories || subcategories.length === 0) return null;

    return (
        <ul className={`${styles.dropdownMenu}`}>
            {subcategories.map((subcategory) => (
                <li key={subcategory.id}>
                    <a className={styles.dropdownItem} href={subcategory.url} title={subcategory.name}>
                        {subcategory.name}
                    </a>
                    {renderSubcategories(subcategory.children)}
                </li>
            ))}
        </ul>
    );
};

const Departamentos: FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCategories();
            setCategories(data);
        };

        fetchData();
    }, []);


    return (
        <ul className={styles.dropdownMenuIs}>
            <li className={`${styles.navItem} ${styles.dropdown}`}>
                <a className={`${styles.navLink} `} href="#">Departamentos</a>
            </li>
            <ul className={styles.dropdownMenu}>
                {categories.map((category) => (
                    <li key={category.id} className={`cat-${category.id}`}>
                        <a className={`${styles.dropdownItem} ${styles.dropdownMenuFirst}`} href={category.url} title={category.name}>
                            {category.name}
                        </a>
                        {renderSubcategories(category.children)}
                    </li>
                ))}
            </ul>
        </ul>
    );
};

export default Departamentos;