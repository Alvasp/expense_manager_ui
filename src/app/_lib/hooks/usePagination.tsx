import { useEffect, useState } from "react";

export default function usePagination<T>(collection: Array<T>, itemsPerPage: number) {
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(0);
    const [items, setItems] = useState<Array<T>>([])

    useEffect(() => {
        setTotalPages(Math.ceil(collection.length / itemsPerPage));
        _setItemsInPage(1)
    }, [collection, itemsPerPage])

    const _setItemsInPage = (page: number) => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        const items = collection.slice(start, end);
        setCurrentPage(page);
        setItems(items)
    }

    const nextPage = () => {
        _setItemsInPage(currentPage + 1)
    }

    const prevPage = () => {
        _setItemsInPage(currentPage - 1)
    }

    const setPage = (page: number) => {
        _setItemsInPage(page)
    }

    return { totalPages, currentPage, items, nextPage, prevPage, setPage }
}