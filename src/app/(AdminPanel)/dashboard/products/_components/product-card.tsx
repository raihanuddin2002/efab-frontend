"use client"

import React, { useState } from 'react'
import { ProductType } from '../types.product'
import CopyButton from '@/components/ui/copy-button'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEllipsisVertical, faFileEdit, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@/lib/cn'
import { toast } from 'react-toastify'
import Modal from '@/components/ui/modal'
import { deleteProductBrowser } from '@/app/supabase-browser-actions'
import { useRouter } from 'next/navigation'
import { paths } from '@/confiig/paths.cofig'

type Props = {
    product: ProductType
}

export default function ProductCard({
    product,
}: Props) {
    const copyDescriptionText = () => {
        const tempEl = document.createElement("div");
        tempEl.innerHTML = product?.description || '';
        const textContent = tempEl.textContent || tempEl.innerText || '';
        navigator.clipboard.writeText(textContent).then(() => {
            toast("✔ Copied to clipboard", { position: "top-center", autoClose: 500 })
        });
    };
    return (
        <div className='card max-w-[500px] w-full relative bg-slate-50'>
            <ProductCardOptions product={product} />

            <div className='content p-10'>
                <h2 className='text-2xl font-semibold'>Name: {product.name}</h2>
                <h4 className='font-bold text-2xl mb-3'>
                    Code: {product.product_code}

                    <CopyButton
                        className='ms-2'
                        value={product.product_code}
                        title='Copy Product Code'
                    />
                </h4>

                <p className='text-xl text-slate-700'>
                    Admin Price: {product?.admin_price ? "৳" + product?.admin_price : "N/A"}
                </p>

                <p className='text-xl font-bold'>
                    Selling Price: ৳{product?.selling_price}

                    <CopyButton
                        className='ms-2'
                        value={product?.selling_price?.toString()}
                        title='Copy Selling Price'
                    />
                </p>

                <p className='text-xl text-slate-700'>
                    Regular Price:  {product?.regular_price ? "৳" + product?.regular_price : "N/A"}
                </p>

                <p className='text-xl text-slate-700'>
                    Commission: ৳{Number(product?.selling_price || 0) - Number(product?.admin_price || 0)}
                </p>

                <p className='text-xl text-slate-700'>
                    Discount: {product?.discount ? product?.discount + "%" : "N/A"}
                </p>

                <div className='mt-5'>
                    <span className='font-bold text-xl'>
                        Description: {product?.description ? (
                            <FontAwesomeIcon
                                className='ms-2 cursor-pointer hover:scale-110 hover:opacity-60 transition-all'
                                icon={faCopy}
                                size='sm'
                                onClick={copyDescriptionText}
                            />
                        ) : "N/A"}
                    </span>
                    {product?.description && (
                        <span className='' dangerouslySetInnerHTML={{ __html: product?.description.slice(0, 20).trim().toString() + "..." }} />
                    )}
                </div>

                <p className='text-xl text-slate-700 mt-5'>
                    <span className='font-bold'>Note:</span> {product?.note || "N/A"}
                </p>
            </div>
        </div >
    )
}

const ProductCardOptions = ({ product }: { product: ProductType }) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleModalClose = () => {
        setOpenDeleteModal(false)
        setOpen(false)
    }

    const handleDeleteProduct = async (product_id: number) => {
        try {
            setLoading(true)
            const deletedProduct = await deleteProductBrowser(product_id)

            setOpenDeleteModal(false)
            router.refresh()
            toast.success(`Product (${deletedProduct?.product_code}) deleted successfully`)
        } catch (error) {
            console.error(error)
            toast.error("Failed to delete product")
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className='relative'>
            {/* Options button */}
            <div
                onClick={() => setOpen(!open)}
                className='w-[20px] h-[20px] text-center absolute top-4 right-4 cursor-pointer hover:scale-110 hover:opacity-50 transition-all'>
                <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    size='sm'
                />
            </div>

            {/* Options list */}
            <ul className={cn('absolute top-12 right-6 shadow-[1px_1px_5px_0px_rgba(0,0,0,0.3)] rounded max-w-[150px] w-full bg-slate-50', open ? 'block' : 'hidden')}>
                <li
                    className='px-4 py-2 hover:bg-slate-200 cursor-pointer border-b'
                    onClick={() => {
                        const value = `Name: ${product.name}\nCode: ${product.product_code}\nPrice: ${product.selling_price} tk`
                        navigator.clipboard.writeText(value).then(() => {
                            toast("✔ Copied to clipboard", { position: "top-center", autoClose: 500 })
                        });
                        setOpen(false)
                    }}
                >
                    <FontAwesomeIcon
                        className='me-2'
                        icon={faCopy}
                        size='lg'
                    />

                    <span className=''>Copy</span>
                </li>
                <li
                    onClick={() => router.push(`${paths.dashboard.products.edit}/${product.id}`)}
                    className='px-4 py-2 hover:bg-slate-200 hover:rounded-sm cursor-pointer border-b'
                >
                    <FontAwesomeIcon
                        className='me-2'
                        icon={faEdit}
                        size='sm'
                    />

                    <span>Edit</span>
                </li>
                <li
                    className='px-4 py-2 hover:bg-slate-200 hover:rounded-sm cursor-pointer text-red-700'
                    onClick={() => setOpenDeleteModal(true)}
                >
                    <FontAwesomeIcon
                        className='me-2'
                        icon={faTrash}
                        size='sm'
                    />

                    <span>Delete</span>
                </li>

            </ul>

            {/* Delete Modal */}
            <Modal
                isOpen={openDeleteModal}
                onClose={handleModalClose}
                disabled={loading}
            >
                <div className='p-6 text-center'>
                    <FontAwesomeIcon
                        icon={faTrash}
                        className='text-red-500 text-7xl mb-10'
                    />
                    <h2 className='text-2xl font-bold mb-4'>Delete? {product.name} ({product.product_code})</h2>

                    <div className='flex justify-center gap-2 mt-5'>
                        <button
                            className='px-6 py-2 bg-slate-500 text-white rounded hover:bg-slate-600 transition-all'
                            onClick={handleModalClose}
                        >
                            Cancel
                        </button>
                        <button
                            className='px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all'
                            onClick={() => handleDeleteProduct(product.id)}
                            disabled={loading}
                        >
                            {loading ? (
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    className='animate-spin'
                                />
                            ) : (
                                "Delete"
                            )}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
